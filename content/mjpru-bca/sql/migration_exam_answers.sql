-- ============================================================================
-- XROUNDER DATABASE MIGRATION: EXAM ANSWERS TABLE & CONTENT WORKFLOW (OPTION B)
-- Target Database: PostgreSQL 17 (Supabase)
-- Target Project: cifnalemfmokembqxidh (TheAKSHAYY's Project)
-- Date: 2026-10-17
-- Status: REVIEW ONLY - DO NOT EXECUTE WITHOUT EXPLICIT PERMISSION
-- ============================================================================

BEGIN;

-- 1. Create Enums if they do not exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'content_provenance') THEN
    CREATE TYPE public.content_provenance AS ENUM (
      'manual',
      'ai_assisted',
      'ai_generated'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'content_status') THEN
    CREATE TYPE public.content_status AS ENUM (
      'draft',
      'reviewed',
      'verified',
      'published',
      'archived'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'exam_mark_tier') THEN
    CREATE TYPE public.exam_mark_tier AS ENUM (
      '2_marks',
      '5_marks',
      '10_marks',
      '15_marks'
    );
  END IF;
END $$;

-- 2. Create exam_answers table
CREATE TABLE IF NOT EXISTS public.exam_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  unit_id uuid NOT NULL REFERENCES public.units(id) ON DELETE CASCADE,
  topic_id uuid REFERENCES public.syllabus_topics(id) ON DELETE SET NULL,
  question_text text NOT NULL,
  answer_body text NOT NULL,
  mark_tier public.exam_mark_tier NOT NULL,
  marks integer NOT NULL CHECK (marks > 0),
  status public.content_status NOT NULL DEFAULT 'draft',
  provenance public.content_provenance NOT NULL DEFAULT 'manual',
  source_reference text,
  verified_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  verified_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- 3. High-performance indexes
CREATE INDEX IF NOT EXISTS idx_exam_answers_subject_unit
  ON public.exam_answers(subject_id, unit_id)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_exam_answers_unit_status
  ON public.exam_answers(unit_id, status)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_exam_answers_topic
  ON public.exam_answers(topic_id)
  WHERE topic_id IS NOT NULL AND deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_exam_answers_mark_tier
  ON public.exam_answers(mark_tier)
  WHERE deleted_at IS NULL;

-- 4. Automatic updated_at trigger (using live public.set_updated_at())
DROP TRIGGER IF EXISTS trg_exam_answers_set_updated_at ON public.exam_answers;
CREATE TRIGGER trg_exam_answers_set_updated_at
  BEFORE UPDATE ON public.exam_answers
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- 5. Hierarchy integrity validation trigger function
CREATE OR REPLACE FUNCTION public.validate_exam_answer_hierarchy()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_unit_subject_id uuid;
  v_topic_unit_id uuid;
BEGIN
  -- 5a. Verify unit belongs to subject
  SELECT subject_id INTO v_unit_subject_id
  FROM public.units
  WHERE id = NEW.unit_id;

  IF v_unit_subject_id IS NULL THEN
    RAISE EXCEPTION 'Hierarchy violation: unit_id % does not exist', NEW.unit_id;
  END IF;

  IF v_unit_subject_id <> NEW.subject_id THEN
    RAISE EXCEPTION 'Hierarchy violation: unit_id % belongs to subject % but record specified subject_id %',
      NEW.unit_id, v_unit_subject_id, NEW.subject_id;
  END IF;

  -- 5b. Verify topic (if provided) belongs to unit
  IF NEW.topic_id IS NOT NULL THEN
    SELECT unit_id INTO v_topic_unit_id
    FROM public.syllabus_topics
    WHERE id = NEW.topic_id;

    IF v_topic_unit_id IS NULL THEN
      RAISE EXCEPTION 'Hierarchy violation: topic_id % does not exist', NEW.topic_id;
    END IF;

    IF v_topic_unit_id <> NEW.unit_id THEN
      RAISE EXCEPTION 'Hierarchy violation: topic_id % belongs to unit % but record specified unit_id %',
        NEW.topic_id, v_topic_unit_id, NEW.unit_id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_validate_exam_answer_hierarchy ON public.exam_answers;
CREATE TRIGGER trg_validate_exam_answer_hierarchy
  BEFORE INSERT OR UPDATE ON public.exam_answers
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_exam_answer_hierarchy();

-- 6. Grants & Permissions (matching notes/quizzes tables)
GRANT ALL ON TABLE public.exam_answers TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.exam_answers TO authenticated;
GRANT SELECT ON TABLE public.exam_answers TO anon;

-- 7. Row Level Security (RLS)
ALTER TABLE public.exam_answers ENABLE ROW LEVEL SECURITY;

-- 7a. Admin Full Management (ALL operations)
DROP POLICY IF EXISTS "exam_answers_admin_all" ON public.exam_answers;
CREATE POLICY "exam_answers_admin_all"
  ON public.exam_answers
  FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- 7b. Public / Student Read Access (Strict Published Tree Visibility)
-- Only published answers under an entirely published, active hierarchy are accessible.
-- All draft, reviewed, verified, or archived answers remain completely invisible.
DROP POLICY IF EXISTS "exam_answers_public_read_published" ON public.exam_answers;
CREATE POLICY "exam_answers_public_read_published"
  ON public.exam_answers
  FOR SELECT
  TO public
  USING (
    status = 'published'::public.content_status
    AND deleted_at IS NULL
    AND EXISTS (
      SELECT 1
      FROM public.units u
      JOIN public.subjects s ON s.id = u.subject_id
      JOIN public.semesters sem ON sem.id = s.semester_id
      JOIN public.courses c ON c.id = sem.course_id
      WHERE u.id = exam_answers.unit_id
        AND u.status = 'published' AND u.deleted_at IS NULL
        AND s.status = 'published' AND s.deleted_at IS NULL
        AND sem.status = 'published' AND sem.deleted_at IS NULL
        AND c.status = 'published' AND c.deleted_at IS NULL
    )
    AND (
      topic_id IS NULL OR EXISTS (
        SELECT 1
        FROM public.syllabus_topics st
        WHERE st.id = exam_answers.topic_id
          AND st.status = 'published'
          AND st.deleted_at IS NULL
      )
    )
  );

-- ============================================================================
-- 8. HIERARCHY VERIFICATION TEST SUITE (EXACT STRING ASSERTION & ROLLBACK-SAFE)
-- Executed inside the transaction BEFORE commit to guarantee complete rollback if any test fails.
-- ============================================================================
DO $$
DECLARE
  v_test_sub1 uuid;
  v_test_sub2 uuid;
  v_test_unit1 uuid;
  v_test_unit2 uuid;
  v_test_topic1 uuid;
  v_error_message text := '';
  v_error_state text := '';
  v_probe_marker text := '__TEST_HIERARCHY_PROBE_' || gen_random_uuid()::text;
BEGIN
  -- Select test fixtures from existing database
  SELECT id INTO v_test_sub1 FROM public.subjects ORDER BY id LIMIT 1;
  SELECT id INTO v_test_sub2 FROM public.subjects WHERE id <> v_test_sub1 ORDER BY id LIMIT 1;
  SELECT id INTO v_test_unit1 FROM public.units WHERE subject_id = v_test_sub1 LIMIT 1;
  SELECT id INTO v_test_unit2 FROM public.units WHERE subject_id = v_test_sub2 LIMIT 1;

  IF v_test_sub1 IS NOT NULL AND v_test_sub2 IS NOT NULL AND v_test_unit1 IS NOT NULL THEN
    -- TEST 1: Subject-Unit Hierarchy Violation Assertion
    BEGIN
      -- Intentional violation: v_test_unit1 belongs to v_test_sub1, but v_test_sub2 is supplied
      INSERT INTO public.exam_answers (
        subject_id, unit_id, question_text, answer_body, mark_tier, marks, status
      ) VALUES (
        v_test_sub2, v_test_unit1, v_probe_marker, 'Test Probe Body', '5_marks', 5, 'draft'
      );

      -- If insert unexpectedly succeeded, delete probe and fail
      DELETE FROM public.exam_answers WHERE question_text = v_probe_marker;
      RAISE EXCEPTION 'Hierarchy validation test 1 FAILED: Invalid record was accepted without error!';

    EXCEPTION
      WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS
          v_error_message = MESSAGE_TEXT,
          v_error_state = RETURNED_SQLSTATE;

        -- Assert the exact expected hierarchy-violation error message pattern
        IF v_error_message NOT LIKE 'Hierarchy violation: unit_id % belongs to subject % but record specified subject_id %' THEN
          RAISE EXCEPTION 'Hierarchy validation test 1 FAILED with unexpected error (State: %, Msg: %)',
            v_error_state, v_error_message;
        ELSE
          RAISE NOTICE 'Hierarchy validation test 1 PASSED: Exactly verified exception message: "%"', v_error_message;
        END IF;
    END;

    -- TEST 2: Unit-Topic Hierarchy Violation Assertion (if syllabus_topics exist)
    IF v_test_unit2 IS NOT NULL THEN
      SELECT id INTO v_test_topic1 FROM public.syllabus_topics WHERE unit_id = v_test_unit1 LIMIT 1;

      IF v_test_topic1 IS NOT NULL THEN
        BEGIN
          -- Intentional violation: topic1 belongs to unit1, but unit2 is supplied
          INSERT INTO public.exam_answers (
            subject_id, unit_id, topic_id, question_text, answer_body, mark_tier, marks, status
          ) VALUES (
            v_test_sub2, v_test_unit2, v_test_topic1, v_probe_marker, 'Test Probe Body Topic Mismatch', '5_marks', 5, 'draft'
          );

          DELETE FROM public.exam_answers WHERE question_text = v_probe_marker;
          RAISE EXCEPTION 'Hierarchy validation test 2 FAILED: Invalid topic record was accepted without error!';

        EXCEPTION
          WHEN OTHERS THEN
            GET STACKED DIAGNOSTICS
              v_error_message = MESSAGE_TEXT,
              v_error_state = RETURNED_SQLSTATE;

            -- Assert the exact expected topic hierarchy error message pattern
            IF v_error_message NOT LIKE 'Hierarchy violation: topic_id % belongs to unit % but record specified unit_id %' THEN
              RAISE EXCEPTION 'Hierarchy validation test 2 FAILED with unexpected error (State: %, Msg: %)',
                v_error_state, v_error_message;
            ELSE
              RAISE NOTICE 'Hierarchy validation test 2 PASSED: Exactly verified topic exception message: "%"', v_error_message;
            END IF;
        END;
      END IF;
    END IF;

    -- Guaranteed probe record cleanup (rollback-safe)
    DELETE FROM public.exam_answers WHERE question_text = v_probe_marker;
  END IF;
END $$;

COMMIT;
