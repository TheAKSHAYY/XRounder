-- Run this once in the Supabase SQL editor.
-- Instant per-question grading for the redesigned quiz experience.
-- Returns correctness + correct option ids + explanation for a single question,
-- without ever exposing quiz_options.is_correct to the client ahead of time.

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
  v_attempt public.quiz_attempts;
  v_question public.quiz_questions;
  v_correct UUID[];
  v_norm UUID[];
  v_is_correct BOOLEAN;
BEGIN
  SELECT * INTO v_attempt FROM public.quiz_attempts WHERE id = _attempt_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Attempt not found'; END IF;
  IF v_attempt.user_id <> auth.uid() THEN RAISE EXCEPTION 'Not your attempt'; END IF;
  IF v_attempt.submitted_at IS NOT NULL THEN RAISE EXCEPTION 'Already submitted'; END IF;

  SELECT * INTO v_question FROM public.quiz_questions WHERE id = _question_id;
  IF NOT FOUND OR v_question.quiz_id <> v_attempt.quiz_id THEN
    RAISE EXCEPTION 'Question does not belong to this attempt';
  END IF;

  SELECT COALESCE(ARRAY_AGG(id ORDER BY id), '{}') INTO v_correct
    FROM public.quiz_options WHERE question_id = _question_id AND is_correct = true;

  SELECT COALESCE(ARRAY_AGG(x ORDER BY x), '{}') INTO v_norm
    FROM unnest(COALESCE(_selected, '{}'::uuid[])) x;

  v_is_correct := v_norm = v_correct AND array_length(v_correct, 1) IS NOT NULL;

  INSERT INTO public.quiz_attempt_answers(attempt_id, question_id, selected_option_ids, is_correct, points_awarded)
  VALUES (_attempt_id, _question_id, COALESCE(_selected, '{}'::uuid[]), v_is_correct,
          CASE WHEN v_is_correct THEN v_question.points ELSE 0 END)
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

REVOKE ALL ON FUNCTION public.grade_quiz_answer(UUID, UUID, UUID[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.grade_quiz_answer(UUID, UUID, UUID[]) TO authenticated;
