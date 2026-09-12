-- ====================================================================
-- MIGRATION: 20260912220000_production_hardening_and_search.sql
-- Description:
-- 1. Hardens public.quiz_attempt_answers RLS to prevent post-submission mutations
-- 2. Prevents last super_admin lockout on UPDATE as well as DELETE
-- 3. Hardens get_quiz_options to strictly check Course -> Semester -> Subject -> Unit -> Quiz publication tree
-- 4. Canonical student_search RPC with direct navigation metadata and content_type preservation
-- 5. Canonical student_bookmarks RPC with content_items support and unit navigation metadata
-- 6. Permits admin read access on progress_tracking for analytics
-- ====================================================================

-- 1. QUIZ ATTEMPT ANSWERS RLS HARDENING
DROP POLICY IF EXISTS "attempt_answers_owner_all" ON public.quiz_attempt_answers;
DROP POLICY IF EXISTS "attempt_answers_select" ON public.quiz_attempt_answers;
DROP POLICY IF EXISTS "attempt_answers_insert" ON public.quiz_attempt_answers;
DROP POLICY IF EXISTS "attempt_answers_update" ON public.quiz_attempt_answers;
DROP POLICY IF EXISTS "attempt_answers_delete" ON public.quiz_attempt_answers;

CREATE POLICY "attempt_answers_select" ON public.quiz_attempt_answers
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.quiz_attempts a
      WHERE a.id = quiz_attempt_answers.attempt_id
        AND (a.user_id = auth.uid() OR public.is_admin(auth.uid()))
    )
  );

CREATE POLICY "attempt_answers_insert" ON public.quiz_attempt_answers
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.quiz_attempts a
      WHERE a.id = quiz_attempt_answers.attempt_id
        AND a.user_id = auth.uid()
        AND a.submitted_at IS NULL
    )
  );

CREATE POLICY "attempt_answers_update" ON public.quiz_attempt_answers
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.quiz_attempts a
      WHERE a.id = quiz_attempt_answers.attempt_id
        AND (
          (a.user_id = auth.uid() AND a.submitted_at IS NULL)
          OR public.is_admin(auth.uid())
        )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.quiz_attempts a
      WHERE a.id = quiz_attempt_answers.attempt_id
        AND (
          (a.user_id = auth.uid() AND a.submitted_at IS NULL)
          OR public.is_admin(auth.uid())
        )
    )
  );

CREATE POLICY "attempt_answers_delete" ON public.quiz_attempt_answers
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.quiz_attempts a
      WHERE a.id = quiz_attempt_answers.attempt_id
        AND (
          (a.user_id = auth.uid() AND a.submitted_at IS NULL)
          OR public.is_admin(auth.uid())
        )
    )
  );

-- 2. PREVENT LAST SUPER_ADMIN LOCKOUT (ON UPDATE AND DELETE)
CREATE OR REPLACE FUNCTION public.prevent_role_self_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_actor UUID := auth.uid();
  v_is_super BOOLEAN;
BEGIN
  -- service_role / migrations bypass (no JWT)
  IF v_actor IS NULL THEN
    RETURN COALESCE(NEW, OLD);
  END IF;

  v_is_super := public.has_role(v_actor, 'super_admin');

  -- Only super_admin may modify user_roles at all
  IF NOT v_is_super THEN
    RAISE EXCEPTION 'Only super_admin can modify user_roles'
      USING ERRCODE = '42501';
  END IF;

  -- Prevent deleting or demoting the last super_admin
  IF (TG_OP = 'DELETE' OR (TG_OP = 'UPDATE' AND NEW.role <> 'super_admin'))
     AND OLD.role = 'super_admin' THEN
    IF (SELECT count(*) FROM public.user_roles
        WHERE role = 'super_admin' AND id <> OLD.id) = 0 THEN
      RAISE EXCEPTION 'Cannot remove or demote the last super_admin'
        USING ERRCODE = '42501';
    END IF;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$;

-- 3. HARDEN GET_QUIZ_OPTIONS: FULL PUBLICATION HIERARCHY VALIDATION
CREATE OR REPLACE FUNCTION public.get_quiz_options(_quiz_id UUID)
RETURNS TABLE(id UUID, question_id UUID, text TEXT, order_index INTEGER)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT o.id, o.question_id, o.text, o.order_index
  FROM public.quiz_options o
  JOIN public.quiz_questions q ON q.id = o.question_id
  JOIN public.quizzes z        ON z.id = q.quiz_id
  JOIN public.units u          ON u.id = z.unit_id
  JOIN public.subjects s       ON s.id = u.subject_id
  JOIN public.semesters sem    ON sem.id = s.semester_id
  JOIN public.courses c        ON c.id = sem.course_id
  WHERE z.id = _quiz_id
    AND (
      -- Intentional admin override only for authenticated admins
      (auth.uid() IS NOT NULL AND public.is_admin(auth.uid()))
      OR (
        -- Standard student/client validation: FULL academic publication tree
        z.status = 'published' AND z.deleted_at IS NULL
        AND u.status = 'published' AND u.deleted_at IS NULL
        AND s.status = 'published' AND s.deleted_at IS NULL
        AND sem.status = 'published' AND sem.deleted_at IS NULL
        AND c.status = 'published' AND c.deleted_at IS NULL
      )
    )
  ORDER BY o.order_index;
$$;

REVOKE ALL ON FUNCTION public.get_quiz_options(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_quiz_options(UUID) TO anon, authenticated;

-- 4. CANONICAL STUDENT_SEARCH RPC WITH HIERARCHY & CONTENT_TYPE PRESERVATION
CREATE OR REPLACE FUNCTION public.student_search(
  _query text,
  _max_results int DEFAULT 20
)
RETURNS TABLE (
  kind text,
  id uuid,
  title text,
  description text,
  slug text,
  rank double precision,
  course_slug text,
  semester_number int,
  subject_slug text,
  unit_number int,
  topic_id uuid,
  content_type text
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  WITH safe_query AS (
    SELECT
      _query AS raw,
      plainto_tsquery('english', _query) AS tsq,
      '%' || replace(replace(_query, '%', '\%'), '_', '\_') || '%' AS like_pattern
  )
  SELECT * FROM (
    -- 1. Courses
    SELECT
      'course'::text AS kind,
      c.id,
      c.title,
      COALESCE(c.description, '')::text AS description,
      c.slug,
      (
        ts_rank_cd(
          setweight(to_tsvector('english', COALESCE(c.title, '')), 'A') ||
          setweight(to_tsvector('english', COALESCE(c.description, '')), 'B'),
          sq.tsq
        ) * 10 +
        CASE WHEN c.title ILIKE sq.raw THEN 100 ELSE 0 END +
        CASE WHEN c.title ILIKE sq.raw || '%' THEN 50 ELSE 0 END +
        CASE WHEN c.code ILIKE sq.raw OR c.slug ILIKE sq.raw THEN 80 ELSE 0 END +
        CASE WHEN c.description ILIKE sq.like_pattern OR c.code ILIKE sq.like_pattern OR c.slug ILIKE sq.like_pattern THEN 10 ELSE 0 END
      ) AS rank,
      c.slug AS course_slug,
      NULL::int AS semester_number,
      NULL::text AS subject_slug,
      NULL::int AS unit_number,
      NULL::uuid AS topic_id,
      NULL::text AS content_type
    FROM public.courses c, safe_query sq
    WHERE c.status = 'published'
      AND c.deleted_at IS NULL
      AND (
        c.title ILIKE sq.like_pattern
        OR c.description ILIKE sq.like_pattern
        OR c.code ILIKE sq.like_pattern
        OR c.slug ILIKE sq.like_pattern
        OR (setweight(to_tsvector('english', COALESCE(c.title, '')), 'A') ||
            setweight(to_tsvector('english', COALESCE(c.description, '')), 'B')) @@ sq.tsq
      )

    UNION ALL

    -- 2. Semesters (includes course_slug)
    SELECT
      'semester'::text AS kind,
      sem.id,
      sem.title,
      COALESCE(sem.description, '')::text AS description,
      NULL::text AS slug,
      (
        ts_rank_cd(
          setweight(to_tsvector('english', COALESCE(sem.title, '')), 'A') ||
          setweight(to_tsvector('english', COALESCE(sem.description, '')), 'B'),
          sq.tsq
        ) * 10 +
        CASE WHEN sem.title ILIKE sq.raw THEN 100 ELSE 0 END +
        CASE WHEN sem.title ILIKE sq.raw || '%' THEN 50 ELSE 0 END +
        CASE WHEN sem.description ILIKE sq.like_pattern OR sem.number::text ILIKE sq.raw THEN 10 ELSE 0 END
      ) AS rank,
      c.slug AS course_slug,
      sem.number AS semester_number,
      NULL::text AS subject_slug,
      NULL::int AS unit_number,
      NULL::uuid AS topic_id,
      NULL::text AS content_type
    FROM public.semesters sem
    JOIN public.courses c ON c.id = sem.course_id, safe_query sq
    WHERE sem.status = 'published'
      AND sem.deleted_at IS NULL
      AND c.status = 'published'
      AND c.deleted_at IS NULL
      AND (
        sem.title ILIKE sq.like_pattern
        OR sem.description ILIKE sq.like_pattern
        OR sem.number::text ILIKE sq.like_pattern
        OR (setweight(to_tsvector('english', COALESCE(sem.title, '')), 'A') ||
            setweight(to_tsvector('english', COALESCE(sem.description, '')), 'B')) @@ sq.tsq
      )

    UNION ALL

    -- 3. Subjects (includes course_slug, semester_number, subject_slug)
    SELECT
      'subject'::text AS kind,
      s.id,
      s.title,
      COALESCE(s.description, '')::text AS description,
      s.slug,
      (
        ts_rank_cd(
          setweight(to_tsvector('english', COALESCE(s.title, '')), 'A') ||
          setweight(to_tsvector('english', COALESCE(s.description, '')), 'B'),
          sq.tsq
        ) * 10 +
        CASE WHEN s.title ILIKE sq.raw THEN 100 ELSE 0 END +
        CASE WHEN s.title ILIKE sq.raw || '%' THEN 50 ELSE 0 END +
        CASE WHEN s.code ILIKE sq.raw OR s.slug ILIKE sq.raw THEN 80 ELSE 0 END +
        CASE WHEN s.description ILIKE sq.like_pattern OR s.code ILIKE sq.like_pattern OR s.slug ILIKE sq.like_pattern THEN 10 ELSE 0 END
      ) AS rank,
      c.slug AS course_slug,
      sem.number AS semester_number,
      s.slug AS subject_slug,
      NULL::int AS unit_number,
      NULL::uuid AS topic_id,
      NULL::text AS content_type
    FROM public.subjects s
    JOIN public.semesters sem ON sem.id = s.semester_id
    JOIN public.courses c     ON c.id = sem.course_id, safe_query sq
    WHERE s.status = 'published'
      AND s.deleted_at IS NULL
      AND sem.status = 'published'
      AND sem.deleted_at IS NULL
      AND c.status = 'published'
      AND c.deleted_at IS NULL
      AND (
        s.title ILIKE sq.like_pattern
        OR s.description ILIKE sq.like_pattern
        OR s.code ILIKE sq.like_pattern
        OR s.slug ILIKE sq.like_pattern
        OR (setweight(to_tsvector('english', COALESCE(s.title, '')), 'A') ||
            setweight(to_tsvector('english', COALESCE(s.description, '')), 'B')) @@ sq.tsq
      )

    UNION ALL

    -- 4. Units (includes course_slug, semester_number, subject_slug, unit_number)
    SELECT
      'unit'::text AS kind,
      u.id,
      u.title,
      COALESCE(u.description, '')::text AS description,
      NULL::text AS slug,
      (
        ts_rank_cd(
          setweight(to_tsvector('english', COALESCE(u.title, '')), 'A') ||
          setweight(to_tsvector('english', COALESCE(u.description, '')), 'B'),
          sq.tsq
        ) * 10 +
        CASE WHEN u.title ILIKE sq.raw THEN 100 ELSE 0 END +
        CASE WHEN u.title ILIKE sq.raw || '%' THEN 50 ELSE 0 END +
        CASE WHEN u.description ILIKE sq.like_pattern OR u.number::text ILIKE sq.raw THEN 10 ELSE 0 END
      ) AS rank,
      c.slug AS course_slug,
      sem.number AS semester_number,
      s.slug AS subject_slug,
      u.number AS unit_number,
      NULL::uuid AS topic_id,
      NULL::text AS content_type
    FROM public.units u
    JOIN public.subjects s    ON s.id = u.subject_id
    JOIN public.semesters sem ON sem.id = s.semester_id
    JOIN public.courses c     ON c.id = sem.course_id, safe_query sq
    WHERE u.status = 'published'
      AND u.deleted_at IS NULL
      AND s.status = 'published'
      AND s.deleted_at IS NULL
      AND sem.status = 'published'
      AND sem.deleted_at IS NULL
      AND c.status = 'published'
      AND c.deleted_at IS NULL
      AND (
        u.title ILIKE sq.like_pattern
        OR u.description ILIKE sq.like_pattern
        OR (setweight(to_tsvector('english', COALESCE(u.title, '')), 'A') ||
            setweight(to_tsvector('english', COALESCE(u.description, '')), 'B')) @@ sq.tsq
      )

    UNION ALL

    -- 5. Content Items (Preserves actual content_type: note, pdf, ppt, video, assignment, link, etc.)
    SELECT
      'content_item'::text AS kind,
      ci.id,
      ci.title,
      COALESCE(ci.description, '')::text AS description,
      NULL::text AS slug,
      (
        ts_rank_cd(
          setweight(to_tsvector('english', COALESCE(ci.title, '')), 'A') ||
          setweight(to_tsvector('english', COALESCE(ci.description, '')), 'B'),
          sq.tsq
        ) * 10 +
        CASE WHEN ci.title ILIKE sq.raw THEN 100 ELSE 0 END +
        CASE WHEN ci.title ILIKE sq.raw || '%' THEN 50 ELSE 0 END +
        CASE WHEN ci.description ILIKE sq.like_pattern THEN 10 ELSE 0 END
      ) AS rank,
      c.slug AS course_slug,
      sem.number AS semester_number,
      s.slug AS subject_slug,
      u.number AS unit_number,
      ci.topic_id,
      ci.type::text AS content_type
    FROM public.content_items ci
    JOIN public.subjects s    ON s.id = ci.subject_id
    JOIN public.semesters sem ON sem.id = s.semester_id
    JOIN public.courses c     ON c.id = sem.course_id
    LEFT JOIN public.units u  ON u.id = ci.unit_id, safe_query sq
    WHERE ci.status = 'published'
      AND ci.deleted_at IS NULL
      AND (u.id IS NULL OR (u.status = 'published' AND u.deleted_at IS NULL))
      AND s.status = 'published'
      AND s.deleted_at IS NULL
      AND sem.status = 'published'
      AND sem.deleted_at IS NULL
      AND c.status = 'published'
      AND c.deleted_at IS NULL
      AND (
        ci.title ILIKE sq.like_pattern
        OR ci.description ILIKE sq.like_pattern
        OR (setweight(to_tsvector('english', COALESCE(ci.title, '')), 'A') ||
            setweight(to_tsvector('english', COALESCE(ci.description, '')), 'B')) @@ sq.tsq
      )

    UNION ALL

    -- 6. Legacy Notes (Distinguished as 'note')
    SELECT
      'note'::text AS kind,
      n.id,
      n.title,
      COALESCE(n.summary, '')::text AS description,
      NULL::text AS slug,
      (
        ts_rank_cd(
          setweight(to_tsvector('english', COALESCE(n.title, '')), 'A') ||
          setweight(to_tsvector('english', COALESCE(n.summary, '')), 'B'),
          sq.tsq
        ) * 10 +
        CASE WHEN n.title ILIKE sq.raw THEN 100 ELSE 0 END +
        CASE WHEN n.title ILIKE sq.raw || '%' THEN 50 ELSE 0 END +
        CASE WHEN n.summary ILIKE sq.like_pattern THEN 10 ELSE 0 END
      ) AS rank,
      c.slug AS course_slug,
      sem.number AS semester_number,
      s.slug AS subject_slug,
      u.number AS unit_number,
      n.topic_id,
      CASE WHEN n.file_mime = 'application/pdf' THEN 'pdf' ELSE 'note' END AS content_type
    FROM public.notes n
    JOIN public.units u       ON u.id = n.unit_id
    JOIN public.subjects s    ON s.id = u.subject_id
    JOIN public.semesters sem ON sem.id = s.semester_id
    JOIN public.courses c     ON c.id = sem.course_id, safe_query sq
    WHERE n.status = 'published'
      AND n.deleted_at IS NULL
      AND u.status = 'published'
      AND u.deleted_at IS NULL
      AND s.status = 'published'
      AND s.deleted_at IS NULL
      AND sem.status = 'published'
      AND sem.deleted_at IS NULL
      AND c.status = 'published'
      AND c.deleted_at IS NULL
      AND (
        n.title ILIKE sq.like_pattern
        OR n.summary ILIKE sq.like_pattern
        OR (setweight(to_tsvector('english', COALESCE(n.title, '')), 'A') ||
            setweight(to_tsvector('english', COALESCE(n.summary, '')), 'B')) @@ sq.tsq
      )

    UNION ALL

    -- 7. Papers
    SELECT
      'paper'::text AS kind,
      p.id,
      p.title,
      COALESCE(p.paper_type || ' (' || p.year::text || ')', '')::text AS description,
      NULL::text AS slug,
      (
        ts_rank_cd(
          setweight(to_tsvector('english', COALESCE(p.title, '')), 'A'),
          sq.tsq
        ) * 10 +
        CASE WHEN p.title ILIKE sq.raw THEN 100 ELSE 0 END +
        CASE WHEN p.title ILIKE sq.raw || '%' THEN 50 ELSE 0 END +
        CASE WHEN p.year::text ILIKE sq.raw THEN 20 ELSE 0 END
      ) AS rank,
      c.slug AS course_slug,
      sem.number AS semester_number,
      s.slug AS subject_slug,
      NULL::int AS unit_number,
      NULL::uuid AS topic_id,
      'paper'::text AS content_type
    FROM public.papers p
    JOIN public.subjects s    ON s.id = p.subject_id
    JOIN public.semesters sem ON sem.id = s.semester_id
    JOIN public.courses c     ON c.id = sem.course_id, safe_query sq
    WHERE p.status = 'published'
      AND p.deleted_at IS NULL
      AND s.status = 'published'
      AND s.deleted_at IS NULL
      AND sem.status = 'published'
      AND sem.deleted_at IS NULL
      AND c.status = 'published'
      AND c.deleted_at IS NULL
      AND (
        p.title ILIKE sq.like_pattern
        OR p.year::text ILIKE sq.like_pattern
        OR to_tsvector('english', COALESCE(p.title, '')) @@ sq.tsq
      )

    UNION ALL

    -- 8. Quizzes
    SELECT
      'quiz'::text AS kind,
      qz.id,
      qz.title,
      COALESCE(qz.description, '')::text AS description,
      NULL::text AS slug,
      (
        ts_rank_cd(
          setweight(to_tsvector('english', COALESCE(qz.title, '')), 'A') ||
          setweight(to_tsvector('english', COALESCE(qz.description, '')), 'B'),
          sq.tsq
        ) * 10 +
        CASE WHEN qz.title ILIKE sq.raw THEN 100 ELSE 0 END +
        CASE WHEN qz.title ILIKE sq.raw || '%' THEN 50 ELSE 0 END +
        CASE WHEN qz.description ILIKE sq.like_pattern THEN 10 ELSE 0 END
      ) AS rank,
      c.slug AS course_slug,
      sem.number AS semester_number,
      s.slug AS subject_slug,
      u.number AS unit_number,
      qz.topic_id,
      'quiz'::text AS content_type
    FROM public.quizzes qz
    JOIN public.units u       ON u.id = qz.unit_id
    JOIN public.subjects s    ON s.id = u.subject_id
    JOIN public.semesters sem ON sem.id = s.semester_id
    JOIN public.courses c     ON c.id = sem.course_id, safe_query sq
    WHERE qz.status = 'published'
      AND qz.deleted_at IS NULL
      AND u.status = 'published'
      AND u.deleted_at IS NULL
      AND s.status = 'published'
      AND s.deleted_at IS NULL
      AND sem.status = 'published'
      AND sem.deleted_at IS NULL
      AND c.status = 'published'
      AND c.deleted_at IS NULL
      AND (
        qz.title ILIKE sq.like_pattern
        OR qz.description ILIKE sq.like_pattern
        OR (setweight(to_tsvector('english', COALESCE(qz.title, '')), 'A') ||
            setweight(to_tsvector('english', COALESCE(qz.description, '')), 'B')) @@ sq.tsq
      )
  ) results
  ORDER BY rank DESC
  LIMIT _max_results;
$$;

REVOKE ALL ON FUNCTION public.student_search(text, int) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.student_search(text, int) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.student_search(text, int) TO service_role;

-- 5. CANONICAL STUDENT_BOOKMARKS RPC (CONTENT_ITEMS + DIRECT UNIT NAVIGATION METADATA)
CREATE OR REPLACE FUNCTION public.student_bookmarks(_limit int DEFAULT 20)
RETURNS TABLE(
  id UUID,
  kind public.bookmark_kind,
  ref_id UUID,
  title TEXT,
  created_at TIMESTAMPTZ,
  course_slug TEXT,
  semester_number INT,
  subject_slug TEXT,
  unit_number INT
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  WITH mine AS (
    SELECT b.id, b.kind, b.ref_id, b.created_at
    FROM public.bookmarks b
    WHERE b.user_id = auth.uid()
    ORDER BY b.created_at DESC
    LIMIT _limit
  )
  SELECT
    m.id,
    m.kind,
    m.ref_id,
    CASE m.kind
      WHEN 'note' THEN COALESCE(
        (SELECT ci.title FROM public.content_items ci WHERE ci.id = m.ref_id),
        (SELECT n.title FROM public.notes n WHERE n.id = m.ref_id)
      )
      WHEN 'paper' THEN (SELECT p.title FROM public.papers p WHERE p.id = m.ref_id)
      WHEN 'quiz'  THEN (SELECT q.title FROM public.quizzes q WHERE q.id = m.ref_id)
      WHEN 'unit'  THEN (SELECT u.title FROM public.units u WHERE u.id = m.ref_id)
    END AS title,
    m.created_at,
    -- Hierarchy resolution for direct routing of units
    CASE m.kind
      WHEN 'unit' THEN (
        SELECT c.slug FROM public.units u
        JOIN public.subjects s ON s.id = u.subject_id
        JOIN public.semesters sem ON sem.id = s.semester_id
        JOIN public.courses c ON c.id = sem.course_id
        WHERE u.id = m.ref_id
      )
      ELSE NULL
    END AS course_slug,
    CASE m.kind
      WHEN 'unit' THEN (
        SELECT sem.number FROM public.units u
        JOIN public.subjects s ON s.id = u.subject_id
        JOIN public.semesters sem ON sem.id = s.semester_id
        WHERE u.id = m.ref_id
      )
      ELSE NULL
    END AS semester_number,
    CASE m.kind
      WHEN 'unit' THEN (
        SELECT s.slug FROM public.units u
        JOIN public.subjects s ON s.id = u.subject_id
        WHERE u.id = m.ref_id
      )
      ELSE NULL
    END AS subject_slug,
    CASE m.kind
      WHEN 'unit' THEN (
        SELECT u.number FROM public.units u WHERE u.id = m.ref_id
      )
      ELSE NULL
    END AS unit_number
  FROM mine m;
$$;

REVOKE ALL ON FUNCTION public.student_bookmarks(int) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.student_bookmarks(int) TO authenticated;

-- 6. PERMIT ADMIN READ ACCESS ON PROGRESS_TRACKING FOR DASHBOARD ANALYTICS
DROP POLICY IF EXISTS "progress_select_own" ON public.progress_tracking;
CREATE POLICY "progress_select_own"
  ON public.progress_tracking FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin(auth.uid()));
