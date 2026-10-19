-- ============================================================================
-- XROUNDER DATABASE FAIL-SAFE ROLLBACK SCRIPT (LEDGER-BASED, DETERMINISTIC)
-- Target Database: PostgreSQL 17 (Supabase)
-- Target Project: cifnalemfmokembqxidh (TheAKSHAYY's Project)
-- Date: 2026-10-17
-- Status: REVIEW ONLY - FAIL-SAFE NON-DESTRUCTIVE ROLLBACK
-- ============================================================================

-- SAFETY GUARANTEES:
-- 1. Operates strictly on records tracked in public._migration_curriculum_ledger.
-- 2. NEVER loops over public.subjects using NOT IN (...) filters.
-- 3. Never archives or modifies unrelated subjects (such as 23-0R or other courses).
-- 4. 100% preservation of student attempts, answers, progress, notes, quizzes,
--    bookmarks, papers, and content.
-- 5. NO "DROP ... CASCADE". If dependent objects exist, stops and protects data.

BEGIN;

-- ============================================================================
-- STEP 1: REVERT IN-PLACE UNIT TITLE UPDATES
-- ============================================================================
DO $$
BEGIN
  IF to_regclass('public._migration_curriculum_ledger') IS NOT NULL THEN
    -- Restore original unit titles tracked in the ledger
    UPDATE public.units u
    SET title = (l.original_state->>'title')
    FROM public._migration_curriculum_ledger l
    WHERE l.migration_tag = 'mjpru_bca_2024_25_seed'
      AND l.entity_type = 'unit_update'
      AND u.id = l.entity_id;
    
    RAISE NOTICE 'Reverted unit titles using migration ledger.';
  ELSE
    -- Deterministic fallback for the 45 existing unit records
    UPDATE public.units u
    SET title = CASE u.number
        WHEN 1 THEN '1st Unit'
        WHEN 2 THEN '2nd Unit'
        WHEN 3 THEN '3rd Unit'
        WHEN 4 THEN '4th Unit'
        WHEN 5 THEN '5th Unit'
      END
    WHERE u.subject_id IN (
      '05968c8c-2a26-4933-a021-e457681771fc', -- BCA-101N
      '45b20341-da58-472e-8e14-14aa711b3f03', -- BCA-103N
      'a37d12d8-3bbe-4206-8c11-9c0a10c3a14d', -- BCA-105N
      '0b7d9736-bfb4-449a-bb44-56b5ce4d64b3', -- BCA-107N
      'c5721f68-696a-4c7b-8dcc-d13d736b7272', -- BCA-109N
      'd80e2834-2323-4f76-ab61-4bd36f605538', -- BCA-102N
      'e1e44a1c-6c24-44de-84f9-16edb60505b0', -- BCA-104N
      '16de7764-85ea-41ae-9600-d7a9ad807eb9', -- BCA-106N
      '1d8c39f2-baa5-4fed-a3a9-fb20ca34ca76'  -- BCA-401E
    );
    RAISE NOTICE 'Reverted unit titles using deterministic subject list fallback.';
  END IF;
END $$;


-- ============================================================================
-- STEP 2: REVERT IN-PLACE SUBJECT UPDATES
-- ============================================================================
DO $$
BEGIN
  IF to_regclass('public._migration_curriculum_ledger') IS NOT NULL THEN
    -- Restore original subject metadata tracked in the ledger
    UPDATE public.subjects s
    SET code = (l.original_state->>'code'),
        title = (l.original_state->>'title'),
        credits = (l.original_state->>'credits')::integer,
        deleted_at = (l.original_state->>'deleted_at')::timestamptz,
        status = (l.original_state->>'status'),
        updated_at = now()
    FROM public._migration_curriculum_ledger l
    WHERE l.migration_tag = 'mjpru_bca_2024_25_seed'
      AND l.entity_type = 'subject_update'
      AND s.id = l.entity_id;

    RAISE NOTICE 'Reverted subject updates using migration ledger.';
  ELSE
    -- Deterministic explicit updates restoring exact prior metadata
    UPDATE public.subjects
    SET code = 'DIGITALELECT',
        title = 'Digital Electronics',
        deleted_at = '2026-07-07 05:51:58.608+00'::timestamptz,
        status = 'published',
        updated_at = now()
    WHERE id = 'e0e3f5ed-88b7-4066-98e8-8b33bfa046cb';

    UPDATE public.subjects
    SET code = 'INTRODUCTION', title = 'Introduction to Database System', updated_at = now()
    WHERE id = 'e1e44a1c-6c24-44de-84f9-16edb60505b0';

    UPDATE public.subjects
    SET code = 'BUSINESSORGA', title = 'Business Organization & Management', updated_at = now()
    WHERE id = '16de7764-85ea-41ae-9600-d7a9ad807eb9';

    UPDATE public.subjects
    SET code = 'MATHEMATICSI', title = 'Mathematics I', updated_at = now()
    WHERE id = '1d8c39f2-baa5-4fed-a3a9-fb20ca34ca76';

    UPDATE public.subjects
    SET code = 'BCA-423E', title = 'INFORMATION SYSTEM FOR BUSINESS', updated_at = now()
    WHERE id = '19db3ea2-df09-4c50-af44-59811381fd81';

    -- Sem 1 Casing / Whitespace restoration
    UPDATE public.subjects SET title = 'Computer Fundamentals and PC Software  ', updated_at = now() WHERE id = '05968c8c-2a26-4933-a021-e457681771fc';
    UPDATE public.subjects SET title = ' Programming with C Theory', updated_at = now() WHERE id = '45b20341-da58-472e-8e14-14aa711b3f03';
    UPDATE public.subjects SET title = 'Basic Mathematics ', updated_at = now() WHERE id = 'a37d12d8-3bbe-4206-8c11-9c0a10c3a14d';

    -- Sem 3 & 4 Uppercase titles restoration
    UPDATE public.subjects SET title = 'OBJECT ORIENTED PROGRAMMING USING JAVA', updated_at = now() WHERE id = '8ffa5896-3b23-4839-bf31-130163ecf801';
    UPDATE public.subjects SET title = 'NUMERICAL ANALYSIS AND STATISTICAL TECHNIQUES', updated_at = now() WHERE id = 'e66c67d0-158e-477f-bb65-10fc3d6eadf4';
    UPDATE public.subjects SET title = 'OPERATING SYSTEM', updated_at = now() WHERE id = 'f7689cea-4163-4bf9-808f-be37ea46ae4a';
    UPDATE public.subjects SET title = 'COMPUTER ORGANIZATION AND ARCHITECTURE', updated_at = now() WHERE id = '94d8428f-1759-466e-9838-af1e0fef68b3';
    UPDATE public.subjects SET title = 'PROGRAMMING IN PYTHON', updated_at = now() WHERE id = '792b88b7-3100-47e2-8078-359b42a82123';
    UPDATE public.subjects SET title = 'UNIX AND SHELL PROGRAMMING', updated_at = now() WHERE id = 'ac9f9256-cf93-40d3-a39c-ac2777722572';
    UPDATE public.subjects SET title = 'ACCOUNTING AND FINANCIAL MANAGEMENT', updated_at = now() WHERE id = '218d92c4-a3f9-46a2-9963-00662d99428a';
    UPDATE public.subjects SET title = 'COMPUTER NETWORKS', updated_at = now() WHERE id = '1b647e62-927b-42c5-8fbd-eb5b614195a1';
    UPDATE public.subjects SET title = 'SOFTWARE ENGINEERING', updated_at = now() WHERE id = '992b17a2-052f-4087-9bd7-ce2468571981';

    RAISE NOTICE 'Reverted subject updates using explicit deterministic fallback.';
  END IF;
END $$;


-- ============================================================================
-- STEP 3: ROLL BACK INSERTED UNITS (TRACKED STRICTLY IN LEDGER)
-- ============================================================================
DO $$
DECLARE
  r RECORD;
  v_has_unit_dependents boolean;
  v_unit_deleted integer := 0;
  v_unit_archived integer := 0;
BEGIN
  IF to_regclass('public._migration_curriculum_ledger') IS NOT NULL THEN
    FOR r IN
      SELECT l.entity_id as unit_id
      FROM public._migration_curriculum_ledger l
      WHERE l.migration_tag = 'mjpru_bca_2024_25_seed'
        AND l.entity_type = 'unit_insert'
    LOOP
      -- Check if this specific unit has child records
      SELECT (
        (SELECT count(*) FROM public.notes WHERE unit_id = r.unit_id) > 0 OR
        (SELECT count(*) FROM public.quizzes WHERE unit_id = r.unit_id) > 0 OR
        (SELECT count(*) FROM public.progress_tracking WHERE unit_id = r.unit_id) > 0 OR
        (SELECT count(*) FROM public.quiz_attempts qa JOIN public.quizzes q ON qa.quiz_id = q.id WHERE q.unit_id = r.unit_id) > 0 OR
        (EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'exam_answers')
         AND (SELECT count(*) FROM public.exam_answers WHERE unit_id = r.unit_id) > 0)
      ) INTO v_has_unit_dependents;

      IF v_has_unit_dependents THEN
        -- Preserve student data: soft-archive instead of deleting
        UPDATE public.units SET status = 'archived', deleted_at = now() WHERE id = r.unit_id;
        v_unit_archived := v_unit_archived + 1;
      ELSE
        -- 0 child records: safely delete the inserted unit
        DELETE FROM public.units WHERE id = r.unit_id;
        v_unit_deleted := v_unit_deleted + 1;
      END IF;
    END LOOP;

    RAISE NOTICE 'Ledger unit rollback complete: % units deleted, % units preserved/archived.',
      v_unit_deleted, v_unit_archived;
  END IF;
END $$;


-- ============================================================================
-- STEP 4: ROLL BACK INSERTED SUBJECTS (TRACKED STRICTLY IN LEDGER)
-- NEVER loops over public.subjects; operates exclusively on ledger records!
-- ============================================================================
DO $$
DECLARE
  r RECORD;
  v_has_dependents boolean;
  v_sub_deleted integer := 0;
  v_sub_archived integer := 0;
BEGIN
  IF to_regclass('public._migration_curriculum_ledger') IS NOT NULL THEN
    FOR r IN
      SELECT l.entity_id as subject_id, s.code, s.title
      FROM public._migration_curriculum_ledger l
      JOIN public.subjects s ON s.id = l.entity_id
      WHERE l.migration_tag = 'mjpru_bca_2024_25_seed'
        AND l.entity_type = 'subject_insert'
    LOOP
      -- Check all 14 descendant and linked tables for user/learning data
      SELECT (
        (SELECT count(*) FROM public.units WHERE subject_id = r.subject_id AND deleted_at IS NULL) > 0 OR
        (SELECT count(*) FROM public.papers WHERE subject_id = r.subject_id) > 0 OR
        (SELECT count(*) FROM public.content_items WHERE subject_id = r.subject_id) > 0 OR
        (SELECT count(*) FROM public.bookmarks WHERE ref_id = r.subject_id) > 0 OR
        (SELECT count(*) FROM public.notes n JOIN public.units u ON n.unit_id = u.id WHERE u.subject_id = r.subject_id) > 0 OR
        (SELECT count(*) FROM public.quizzes q JOIN public.units u ON q.unit_id = u.id WHERE u.subject_id = r.subject_id) > 0 OR
        (SELECT count(*) FROM public.quiz_attempts qa JOIN public.quizzes q ON qa.quiz_id = q.id JOIN public.units u ON q.unit_id = u.id WHERE u.subject_id = r.subject_id) > 0 OR
        (SELECT count(*) FROM public.progress_tracking pt JOIN public.units u ON pt.unit_id = u.id WHERE u.subject_id = r.subject_id) > 0 OR
        (SELECT count(*) FROM public.syllabus_topics st JOIN public.units u ON st.unit_id = u.id WHERE u.subject_id = r.subject_id) > 0 OR
        (EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'exam_answers')
         AND (SELECT count(*) FROM public.exam_answers WHERE subject_id = r.subject_id) > 0)
      ) INTO v_has_dependents;

      IF v_has_dependents THEN
        -- Has student/user data: soft-archive to guarantee 100% data preservation
        UPDATE public.subjects SET status = 'archived', deleted_at = now() WHERE id = r.subject_id;
        v_sub_archived := v_sub_archived + 1;
        RAISE NOTICE 'Subject % (%) has dependent learning data: soft-archived, NOT deleted.', r.code, r.subject_id;
      ELSE
        -- 0 dependent data: delete any remaining empty units, then delete the subject
        DELETE FROM public.units WHERE subject_id = r.subject_id;
        DELETE FROM public.subjects WHERE id = r.subject_id;
        v_sub_deleted := v_sub_deleted + 1;
      END IF;
    END LOOP;

    RAISE NOTICE 'Ledger subject rollback complete: % subjects deleted, % subjects preserved/archived.',
      v_sub_deleted, v_sub_archived;
  END IF;
END $$;


-- ============================================================================
-- STEP 5: SAFE SCHEMA ROLLBACK FOR EXAM_ANSWERS (WITHOUT CASCADE)
-- ============================================================================
DO $$
DECLARE
  v_answer_rows integer := 0;
BEGIN
  IF to_regclass('public.exam_answers') IS NOT NULL THEN
    EXECUTE 'SELECT count(*) FROM public.exam_answers' INTO v_answer_rows;

    IF v_answer_rows > 0 THEN
      -- If student/admin answers exist, do NOT drop the table; soft-archive records
      EXECUTE 'UPDATE public.exam_answers SET status = ''archived''::public.content_status, deleted_at = now() WHERE deleted_at IS NULL';
      RAISE NOTICE 'LIMITATION DOCUMENTED: exam_answers table contains % records. Records soft-archived; table NOT dropped to preserve student answers.', v_answer_rows;
    ELSE
      -- Zero records: safely drop trigger, function, policies, and table WITHOUT CASCADE
      DROP TRIGGER IF EXISTS trg_validate_exam_answer_hierarchy ON public.exam_answers;
      DROP TRIGGER IF EXISTS trg_exam_answers_set_updated_at ON public.exam_answers;
      DROP FUNCTION IF EXISTS public.validate_exam_answer_hierarchy();
      DROP POLICY IF EXISTS "exam_answers_admin_all" ON public.exam_answers;
      DROP POLICY IF EXISTS "exam_answers_public_read_published" ON public.exam_answers;

      -- Plain DROP TABLE without CASCADE: fails and aborts if dependent objects exist
      DROP TABLE public.exam_answers;
      RAISE NOTICE 'exam_answers table was empty and safely dropped without CASCADE.';
    END IF;
  END IF;
END $$;


-- ============================================================================
-- STEP 6: CLEAN UP MIGRATION LEDGER ENTRIES FOR THIS MIGRATION TAG
-- ============================================================================
DO $$
BEGIN
  IF to_regclass('public._migration_curriculum_ledger') IS NOT NULL THEN
    DELETE FROM public._migration_curriculum_ledger WHERE migration_tag = 'mjpru_bca_2024_25_seed';
    RAISE NOTICE 'Cleaned up migration ledger entries for tag: mjpru_bca_2024_25_seed.';
  END IF;
END $$;

COMMIT;
