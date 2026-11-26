-- ============================================================================
-- MIGRATION: 20261126172000_harden_rpc_permissions.sql
-- Description:
-- 1. Removes public/anon/authenticated access from public.seed_runner_exec(text),
--    pins its search_path, and adds an unprivileged-caller guard (when present).
-- 2. Revokes direct anon/PUBLIC EXECUTE privileges from public.grade_quiz_answer
--    and public.submit_quiz_attempt (previously left granted via Supabase
--    default privileges), keeping EXECUTE limited to signed-in users.
-- 3. Replaces `v_attempt.user_id <> auth.uid()` with explicit NULL-safe
--    authentication and ownership checks (`auth.uid() IS NULL` and
--    `IS DISTINCT FROM`) and serializes grading and submission on the attempt row.
-- ============================================================================

-- 1. Lock down internal seed helper (idempotent if absent on fresh DBs)
DO $do$
BEGIN
  IF to_regprocedure('public.seed_runner_exec(text)') IS NOT NULL THEN
    EXECUTE $fn$
      CREATE OR REPLACE FUNCTION public.seed_runner_exec(p_sql TEXT)
      RETURNS TEXT
      LANGUAGE plpgsql
      SECURITY DEFINER
      SET search_path = public
      AS $body$
      DECLARE
        v_claim_role TEXT := COALESCE(
          NULLIF(current_setting('request.jwt.claim.role', true), ''),
          NULLIF(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role',
          ''
        );
      BEGIN
        IF auth.uid() IS NOT NULL OR v_claim_role IN ('anon', 'authenticated') THEN
          RAISE EXCEPTION 'Forbidden: internal seed function requires service_role'
            USING ERRCODE = '42501';
        END IF;

        EXECUTE p_sql;
        RETURN 'OK';
      EXCEPTION
        WHEN SQLSTATE '42501' THEN
          RAISE;
        WHEN OTHERS THEN
          RETURN SQLERRM;
      END;
      $body$;
    $fn$;

    REVOKE ALL ON FUNCTION public.seed_runner_exec(TEXT) FROM PUBLIC, anon, authenticated;
    GRANT EXECUTE ON FUNCTION public.seed_runner_exec(TEXT) TO service_role;
  END IF;
END
$do$;

-- 2. Harden per-question instant grading RPC: signed-in owner on unsubmitted attempt only
CREATE OR REPLACE FUNCTION public.grade_quiz_answer(
  _attempt_id UUID,
  _question_id UUID,
  _selected UUID[]
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_id UUID := auth.uid();
  v_attempt public.quiz_attempts;
  v_question public.quiz_questions;
  v_correct UUID[];
  v_norm UUID[];
  v_is_correct BOOLEAN;
BEGIN
  IF v_caller_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;

  SELECT * INTO v_attempt
    FROM public.quiz_attempts
   WHERE id = _attempt_id
   FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Attempt not found';
  END IF;
  IF v_attempt.user_id IS DISTINCT FROM v_caller_id THEN
    RAISE EXCEPTION 'Not your attempt' USING ERRCODE = '42501';
  END IF;
  IF v_attempt.submitted_at IS NOT NULL THEN
    RAISE EXCEPTION 'Already submitted';
  END IF;

  SELECT * INTO v_question
    FROM public.quiz_questions
   WHERE id = _question_id;
  IF NOT FOUND OR v_question.quiz_id <> v_attempt.quiz_id THEN
    RAISE EXCEPTION 'Question does not belong to this attempt';
  END IF;

  SELECT COALESCE(ARRAY_AGG(id ORDER BY id), '{}')
    INTO v_correct
    FROM public.quiz_options
   WHERE question_id = _question_id
     AND is_correct = true;

  SELECT COALESCE(ARRAY_AGG(x ORDER BY x), '{}')
    INTO v_norm
    FROM unnest(COALESCE(_selected, '{}'::uuid[])) x;

  v_is_correct := v_norm = v_correct AND array_length(v_correct, 1) IS NOT NULL;

  INSERT INTO public.quiz_attempt_answers(
    attempt_id,
    question_id,
    selected_option_ids,
    is_correct,
    points_awarded
  )
  VALUES (
    _attempt_id,
    _question_id,
    COALESCE(_selected, '{}'::uuid[]),
    v_is_correct,
    CASE WHEN v_is_correct THEN v_question.points ELSE 0 END
  )
  ON CONFLICT (attempt_id, question_id) DO UPDATE
    SET selected_option_ids = EXCLUDED.selected_option_ids,
        is_correct = EXCLUDED.is_correct,
        points_awarded = EXCLUDED.points_awarded;

  RETURN jsonb_build_object(
    'is_correct', v_is_correct,
    'correct_option_ids', to_jsonb(v_correct),
    'explanation', v_question.explanation
  );
END;
$$;

REVOKE ALL ON FUNCTION public.grade_quiz_answer(UUID, UUID, UUID[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.grade_quiz_answer(UUID, UUID, UUID[]) TO authenticated;

-- 3. Harden quiz submission RPC: signed-in owner on unsubmitted attempt only
CREATE OR REPLACE FUNCTION public.submit_quiz_attempt(
  _attempt_id UUID,
  _answers JSONB
)
RETURNS public.quiz_attempts
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_id UUID := auth.uid();
  v_attempt public.quiz_attempts;
  v_quiz public.quizzes;
  v_answers JSONB := COALESCE(_answers, '{}'::jsonb);
  v_total NUMERIC := 0;
  v_score NUMERIC := 0;
  q RECORD;
  v_selected UUID[];
  v_correct UUID[];
  v_is_correct BOOLEAN;
  v_points NUMERIC;
BEGIN
  IF v_caller_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;

  SELECT * INTO v_attempt
    FROM public.quiz_attempts
   WHERE id = _attempt_id
   FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Attempt not found';
  END IF;
  IF v_attempt.user_id IS DISTINCT FROM v_caller_id THEN
    RAISE EXCEPTION 'Not your attempt' USING ERRCODE = '42501';
  END IF;
  IF v_attempt.submitted_at IS NOT NULL THEN
    RAISE EXCEPTION 'Already submitted';
  END IF;

  SELECT * INTO v_quiz
    FROM public.quizzes
   WHERE id = v_attempt.quiz_id;

  FOR q IN
    SELECT id, points
      FROM public.quiz_questions
     WHERE quiz_id = v_quiz.id
  LOOP
    v_total := v_total + q.points;

    SELECT ARRAY(
      SELECT (jsonb_array_elements_text(COALESCE(v_answers -> q.id::text, '[]'::jsonb)))::uuid
    ) INTO v_selected;

    SELECT COALESCE(ARRAY_AGG(id ORDER BY id), '{}')
      INTO v_correct
      FROM public.quiz_options
     WHERE question_id = q.id
       AND is_correct = true;

    v_is_correct := (
      SELECT COALESCE(ARRAY_AGG(x ORDER BY x), '{}')
        FROM unnest(v_selected) x
    ) = v_correct AND array_length(v_correct, 1) IS NOT NULL;

    v_points := CASE WHEN v_is_correct THEN q.points ELSE 0 END;
    v_score := v_score + v_points;

    INSERT INTO public.quiz_attempt_answers(
      attempt_id,
      question_id,
      selected_option_ids,
      is_correct,
      points_awarded
    )
    VALUES (_attempt_id, q.id, v_selected, v_is_correct, v_points)
    ON CONFLICT (attempt_id, question_id) DO UPDATE
      SET selected_option_ids = EXCLUDED.selected_option_ids,
          is_correct = EXCLUDED.is_correct,
          points_awarded = EXCLUDED.points_awarded;
  END LOOP;

  UPDATE public.quiz_attempts
     SET submitted_at = now(),
         score = v_score,
         max_score = v_total,
         pct = CASE WHEN v_total > 0 THEN ROUND((v_score / v_total) * 100, 2) ELSE 0 END,
         passed = CASE WHEN v_total > 0 THEN ((v_score / v_total) * 100) >= v_quiz.passing_pct ELSE false END,
         time_spent_seconds = EXTRACT(EPOCH FROM (now() - started_at))::int,
         updated_at = now()
   WHERE id = _attempt_id
   RETURNING * INTO v_attempt;

  RETURN v_attempt;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_quiz_attempt(UUID, JSONB) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_quiz_attempt(UUID, JSONB) TO authenticated;
