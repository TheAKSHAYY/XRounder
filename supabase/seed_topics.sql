-- Seed script for Semester 1 -> Computer Fundamentals -> Unit 1 -> Topics

DO $$ 
DECLARE 
  v_course_id UUID;
  v_sem_id UUID;
  v_subject_id UUID;
  v_unit_id UUID;
BEGIN
  -- 1. Get Course (BCA)
  SELECT id INTO v_course_id FROM public.courses WHERE slug = 'bca' LIMIT 1;
  IF v_course_id IS NULL THEN
    RAISE EXCEPTION 'Course BCA not found (slug=bca).';
  END IF;

  -- 2. Get Sem 1
  SELECT id INTO v_sem_id FROM public.semesters WHERE course_id = v_course_id AND number = 1 LIMIT 1;
  IF v_sem_id IS NULL THEN
    RAISE EXCEPTION 'Semester 1 not found for course BCA.';
  END IF;

  -- 3. Get Subject (BCA-101N)
  -- The existing actual slug in the database is 'computer-fundamentals-and-pc-software-theory'
  SELECT id INTO v_subject_id FROM public.subjects WHERE semester_id = v_sem_id AND slug = 'computer-fundamentals-and-pc-software-theory' LIMIT 1;
  IF v_subject_id IS NULL THEN
    RAISE EXCEPTION 'Subject computer-fundamentals-and-pc-software-theory not found.';
  END IF;

  -- 4. Get Unit 1
  SELECT id INTO v_unit_id FROM public.units WHERE subject_id = v_subject_id AND number = 1 LIMIT 1;
  IF v_unit_id IS NULL THEN
    RAISE EXCEPTION 'Unit 1 not found for the subject.';
  END IF;

  -- 5. Insert exactly 5 topics
  INSERT INTO public.syllabus_topics (unit_id, title, sort_order, status)
  VALUES 
    (v_unit_id, 'Introduction to Computers', 1, 'published'),
    (v_unit_id, 'Characteristics of Computers', 2, 'published'),
    (v_unit_id, 'Generations of Computers', 3, 'published'),
    (v_unit_id, 'Types of Computers', 4, 'published'),
    (v_unit_id, 'Applications of Computers', 5, 'published')
  ON CONFLICT (unit_id, title) DO NOTHING; -- Ensure idempotency

END $$;
