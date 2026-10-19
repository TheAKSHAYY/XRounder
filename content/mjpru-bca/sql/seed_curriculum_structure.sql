-- ============================================================================
-- XROUNDER DATABASE SEED: COMPLETE OFFICIAL MJPRU BCA CURRICULUM (2024-25)
-- Target Database: PostgreSQL 17 (Supabase)
-- Target Project: cifnalemfmokembqxidh (TheAKSHAYY's Project)
-- Date: 2026-10-17
-- Status: REVIEW ONLY - DO NOT EXECUTE WITHOUT EXPLICIT PERMISSION
-- ============================================================================

BEGIN;

-- ============================================================================
-- STEP 0: INITIALIZE DEDICATED MIGRATION LEDGER FOR FAIL-SAFE ROLLBACK
-- ============================================================================
CREATE TABLE IF NOT EXISTS public._migration_curriculum_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  migration_tag text NOT NULL,
  entity_type text NOT NULL, -- 'subject_insert', 'unit_insert', 'subject_update', 'unit_update'
  entity_id uuid NOT NULL,
  original_state jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_migration_ledger_tag
  ON public._migration_curriculum_ledger(migration_tag, entity_type);

-- Clear any stale records for this specific tag prior to seeding
DELETE FROM public._migration_curriculum_ledger WHERE migration_tag = 'mjpru_bca_2024_25_seed';

-- ============================================================================
-- STEP 1: IN-PLACE UPDATES OF EXISTING SUBJECTS (WITH METADATA LOGGING)
-- ============================================================================

-- 1a. Semester 2: BCA-104N (was INTRODUCTION)
INSERT INTO public._migration_curriculum_ledger (migration_tag, entity_type, entity_id, original_state)
SELECT 'mjpru_bca_2024_25_seed', 'subject_update', id,
       jsonb_build_object('code', code, 'title', title, 'credits', credits, 'deleted_at', deleted_at, 'status', status)
FROM public.subjects WHERE id = 'e1e44a1c-6c24-44de-84f9-16edb60505b0';

UPDATE public.subjects
SET code = 'BCA-104N', title = 'Introduction to Database System', credits = 4, updated_at = now()
WHERE id = 'e1e44a1c-6c24-44de-84f9-16edb60505b0';

-- 1b. Semester 2: BCA-106N (was BUSINESSORGA)
INSERT INTO public._migration_curriculum_ledger (migration_tag, entity_type, entity_id, original_state)
SELECT 'mjpru_bca_2024_25_seed', 'subject_update', id,
       jsonb_build_object('code', code, 'title', title, 'credits', credits, 'deleted_at', deleted_at, 'status', status)
FROM public.subjects WHERE id = '16de7764-85ea-41ae-9600-d7a9ad807eb9';

UPDATE public.subjects
SET code = 'BCA-106N', title = 'Business Organization & Management', credits = 4, updated_at = now()
WHERE id = '16de7764-85ea-41ae-9600-d7a9ad807eb9';

-- 1c. Semester 2: BCA-108N (was DIGITALELECT, reactivated from soft-deleted as draft pending review)
INSERT INTO public._migration_curriculum_ledger (migration_tag, entity_type, entity_id, original_state)
SELECT 'mjpru_bca_2024_25_seed', 'subject_update', id,
       jsonb_build_object('code', code, 'title', title, 'credits', credits, 'deleted_at', deleted_at, 'status', status)
FROM public.subjects WHERE id = 'e0e3f5ed-88b7-4066-98e8-8b33bfa046cb';

UPDATE public.subjects
SET code = 'BCA-108N', title = 'Digital Electronics', credits = 4, deleted_at = NULL, status = 'draft', updated_at = now()
WHERE id = 'e0e3f5ed-88b7-4066-98e8-8b33bfa046cb';

-- 1d. Semester 2: BCA-401E (was MATHEMATICSI)
INSERT INTO public._migration_curriculum_ledger (migration_tag, entity_type, entity_id, original_state)
SELECT 'mjpru_bca_2024_25_seed', 'subject_update', id,
       jsonb_build_object('code', code, 'title', title, 'credits', credits, 'deleted_at', deleted_at, 'status', status)
FROM public.subjects WHERE id = '1d8c39f2-baa5-4fed-a3a9-fb20ca34ca76';

UPDATE public.subjects
SET code = 'BCA-401E', title = 'Mathematics', credits = 4, updated_at = now()
WHERE id = '1d8c39f2-baa5-4fed-a3a9-fb20ca34ca76';

-- 1e. Semester 3: BCA-413E (was duplicate BCA-423E)
INSERT INTO public._migration_curriculum_ledger (migration_tag, entity_type, entity_id, original_state)
SELECT 'mjpru_bca_2024_25_seed', 'subject_update', id,
       jsonb_build_object('code', code, 'title', title, 'credits', credits, 'deleted_at', deleted_at, 'status', status)
FROM public.subjects WHERE id = '19db3ea2-df09-4c50-af44-59811381fd81';

UPDATE public.subjects
SET code = 'BCA-413E', title = 'Information System for Business', credits = 4, status = 'draft', updated_at = now()
WHERE id = '19db3ea2-df09-4c50-af44-59811381fd81';

-- 1f. Semester 1 Title Cleanups (log prior state before update)
INSERT INTO public._migration_curriculum_ledger (migration_tag, entity_type, entity_id, original_state)
SELECT 'mjpru_bca_2024_25_seed', 'subject_update', id,
       jsonb_build_object('code', code, 'title', title, 'credits', credits, 'deleted_at', deleted_at, 'status', status)
FROM public.subjects
WHERE id IN (
  '05968c8c-2a26-4933-a021-e457681771fc',
  '45b20341-da58-472e-8e14-14aa711b3f03',
  'a37d12d8-3bbe-4206-8c11-9c0a10c3a14d',
  '0b7d9736-bfb4-449a-bb44-56b5ce4d64b3',
  'c5721f68-696a-4c7b-8dcc-d13d736b7272'
);

UPDATE public.subjects SET title = 'Computer Fundamentals and PC Software', updated_at = now() WHERE id = '05968c8c-2a26-4933-a021-e457681771fc';
UPDATE public.subjects SET title = 'Programming with C', updated_at = now() WHERE id = '45b20341-da58-472e-8e14-14aa711b3f03';
UPDATE public.subjects SET title = 'Basic Mathematics', updated_at = now() WHERE id = 'a37d12d8-3bbe-4206-8c11-9c0a10c3a14d';
UPDATE public.subjects SET title = 'Communicative English', updated_at = now() WHERE id = '0b7d9736-bfb4-449a-bb44-56b5ce4d64b3';
UPDATE public.subjects SET title = 'Principle of Management', updated_at = now() WHERE id = 'c5721f68-696a-4c7b-8dcc-d13d736b7272';

-- 1g. Semester 3 & 4 Casing Updates (Sem 3 & 4 core subjects set to draft pending content review)
INSERT INTO public._migration_curriculum_ledger (migration_tag, entity_type, entity_id, original_state)
SELECT 'mjpru_bca_2024_25_seed', 'subject_update', id,
       jsonb_build_object('code', code, 'title', title, 'credits', credits, 'deleted_at', deleted_at, 'status', status)
FROM public.subjects
WHERE id IN (
  '8ffa5896-3b23-4839-bf31-130163ecf801',
  'e66c67d0-158e-477f-bb65-10fc3d6eadf4',
  'f7689cea-4163-4bf9-808f-be37ea46ae4a',
  '94d8428f-1759-466e-9838-af1e0fef68b3',
  '792b88b7-3100-47e2-8078-359b42a82123',
  'ac9f9256-cf93-40d3-a39c-ac2777722572',
  '218d92c4-a3f9-46a2-9963-00662d99428a',
  '1b647e62-927b-42c5-8fbd-eb5b614195a1',
  '992b17a2-052f-4087-9bd7-ce2468571981'
);

UPDATE public.subjects SET title = 'Object Oriented Programming using JAVA', credits = 4, status = 'draft', updated_at = now() WHERE id = '8ffa5896-3b23-4839-bf31-130163ecf801';
UPDATE public.subjects SET title = 'Numerical Analysis and Statistical Techniques (NAST)', credits = 4, status = 'draft', updated_at = now() WHERE id = 'e66c67d0-158e-477f-bb65-10fc3d6eadf4';
UPDATE public.subjects SET title = 'Operating System', credits = 4, status = 'draft', updated_at = now() WHERE id = 'f7689cea-4163-4bf9-808f-be37ea46ae4a';
UPDATE public.subjects SET title = 'Computer Organization and Architecture', credits = 4, status = 'draft', updated_at = now() WHERE id = '94d8428f-1759-466e-9838-af1e0fef68b3';
UPDATE public.subjects SET title = 'Programming in Python', credits = 4, status = 'draft', updated_at = now() WHERE id = '792b88b7-3100-47e2-8078-359b42a82123';
UPDATE public.subjects SET title = 'Unix and Shell Programming', credits = 4, status = 'draft', updated_at = now() WHERE id = 'ac9f9256-cf93-40d3-a39c-ac2777722572';
UPDATE public.subjects SET title = 'Accounting and Financial Management', credits = 4, status = 'draft', updated_at = now() WHERE id = '218d92c4-a3f9-46a2-9963-00662d99428a';
UPDATE public.subjects SET title = 'Computer Networks', credits = 4, status = 'draft', updated_at = now() WHERE id = '1b647e62-927b-42c5-8fbd-eb5b614195a1';
UPDATE public.subjects SET title = 'Software Engineering', credits = 4, status = 'draft', updated_at = now() WHERE id = '992b17a2-052f-4087-9bd7-ce2468571981';

-- ============================================================================
-- STEP 2: INSERT MISSING SUBJECTS AS DRAFT & LOG GENERATED UUIDS TO LEDGER
-- (All newly seeded curriculum entries are marked 'draft' until content review)
-- ============================================================================

WITH new_subjects AS (
  INSERT INTO public.subjects (semester_id, code, title, slug, credits, description, sort_order, status)
  VALUES
    -- Semester 1 Practicals (0 Units, status: draft)
    ('95c2207d-6f08-4824-9ff4-52f918ca7d60', 'BCA-101P', 'LAB: (PC Software Lab)', 'bca-101p-pc-software-lab', 2, 'Hands-on practical lab for PC Software and productivity tools.', 6, 'draft'),
    ('95c2207d-6f08-4824-9ff4-52f918ca7d60', 'BCA-103P', 'LAB: (C Programming)', 'bca-103p-c-programming-lab', 2, 'Hands-on programming laboratory in C.', 7, 'draft'),

    -- Semester 2 Electives & Practicals (0 Units for Practicals, status: draft)
    ('be0534c5-8d70-479b-9690-3dd06d688846', 'BCA-402E', 'Environment and Ecology', 'bca-402e-environment-and-ecology', 4, 'Elective course in environmental studies and natural resources.', 6, 'draft'),
    ('be0534c5-8d70-479b-9690-3dd06d688846', 'BCA-403E', 'Introduction to E-Governance', 'bca-403e-introduction-to-e-governance', 4, 'Elective course in digital governance and public administration.', 7, 'draft'),
    ('be0534c5-8d70-479b-9690-3dd06d688846', 'BCA-102P', 'LAB: (Data Structure)', 'bca-102p-data-structures-lab', 2, 'Hands-on laboratory for data structures in C.', 8, 'draft'),
    ('be0534c5-8d70-479b-9690-3dd06d688846', 'BCA-104P', 'LAB: (RDBMS)', 'bca-104p-rdbms-lab', 2, 'Hands-on laboratory for database design and SQL.', 9, 'draft'),

    -- Semester 3 Electives & Practicals (0 Units for Practicals, status: draft)
    ('4999e6d6-cd20-463e-b1e2-eceb37ba4099', 'BCA-411E', 'Discrete Mathematics', 'bca-411e-discrete-mathematics', 4, 'Elective course in logic, sets, group theory, and graph theory.', 5, 'draft'),
    ('4999e6d6-cd20-463e-b1e2-eceb37ba4099', 'BCA-412E', 'Personality and Soft Skills Development', 'bca-412e-personality-and-soft-skills-development', 4, 'Elective course in soft skills, business letters, and communication.', 6, 'draft'),
    ('4999e6d6-cd20-463e-b1e2-eceb37ba4099', 'BCA-201P', 'LAB: (JAVA Programming)', 'bca-201p-java-programming-lab', 2, 'Hands-on laboratory in Java OOP and I/O streams.', 8, 'draft'),
    ('4999e6d6-cd20-463e-b1e2-eceb37ba4099', 'BCA-203P', 'LAB: (NAST)', 'bca-203p-nast-lab', 2, 'Hands-on computational laboratory in numerical algorithms.', 9, 'draft'),

    -- Semester 4 Electives & Practicals (0 Units for Practicals, status: draft)
    ('360cb571-93fc-405d-aa84-378a5cf4de8d', 'BCA-421E', 'E-Commerce', 'bca-421e-e-commerce', 4, 'Elective course in e-business models, e-payment, and web security.', 5, 'draft'),
    ('360cb571-93fc-405d-aa84-378a5cf4de8d', 'BCA-422E', 'IT Acts and Cyber Laws', 'bca-422e-it-acts-and-cyber-laws', 4, 'Elective course in Indian cyber law, IT Act 2000, and digital contracts.', 6, 'draft'),
    ('360cb571-93fc-405d-aa84-378a5cf4de8d', 'BCA-202P', 'LAB: (Python Programming)', 'bca-202p-python-programming-lab', 2, 'Hands-on programming laboratory in Python.', 8, 'draft'),
    ('360cb571-93fc-405d-aa84-378a5cf4de8d', 'BCA-204P', 'LAB: (Unix and Shell Programming)', 'bca-204p-unix-shell-lab', 2, 'Hands-on laboratory in Unix commands and shell scripting.', 9, 'draft'),

    -- Semester 5 Core, Electives, Practicals, Training (0 Units for Practicals & Training, status: draft)
    ('539b72d8-3292-4057-8474-cd2e5ef483ec', 'BCA-301N', 'Artificial Intelligence', 'bca-301n-artificial-intelligence', 4, 'Core course in AI, search algorithms, knowledge representation, and expert systems.', 1, 'draft'),
    ('539b72d8-3292-4057-8474-cd2e5ef483ec', 'BCA-303N', 'Web Technologies', 'bca-303n-web-technologies', 4, 'Core course in modern web development, PHP, Servlets, and JSP.', 2, 'draft'),
    ('539b72d8-3292-4057-8474-cd2e5ef483ec', 'BCA-305N', 'Computer Graphics and Animation', 'bca-305n-computer-graphics-and-animation', 4, 'Core course in display devices, 2D transformations, clipping, and animation.', 3, 'draft'),
    ('539b72d8-3292-4057-8474-cd2e5ef483ec', 'BCA-431E', 'Introduction to Cyber Security', 'bca-431e-introduction-to-cyber-security', 4, 'Elective course in information security principles, firewalls, and ethical hacking.', 4, 'draft'),
    ('539b72d8-3292-4057-8474-cd2e5ef483ec', 'BCA-432E', 'GUI Programming', 'bca-432e-gui-programming', 4, 'Elective course in .NET framework, Visual Basic, ADO.NET, and ASP.NET.', 5, 'draft'),
    ('539b72d8-3292-4057-8474-cd2e5ef483ec', 'BCA-433E', 'Operation Research', 'bca-433e-operation-research', 4, 'Elective course in linear programming, transportation, and CPM/PERT analysis.', 6, 'draft'),
    ('539b72d8-3292-4057-8474-cd2e5ef483ec', 'BCA-303P', 'LAB: (Web Technologies)', 'bca-303p-web-technologies-lab', 2, 'Hands-on practical lab for HTML, CSS, JavaScript, PHP, and Servlets.', 7, 'draft'),
    ('539b72d8-3292-4057-8474-cd2e5ef483ec', 'BCA-305P', 'LAB: (Computer Graphics)', 'bca-305p-computer-graphics-lab', 2, 'Hands-on practical lab for 2D graphics algorithms and animations.', 8, 'draft'),
    ('539b72d8-3292-4057-8474-cd2e5ef483ec', 'BCA-307P', 'Industrial Training (Internship Report)', 'bca-307p-industrial-training', 4, '6 to 8 weeks industrial summer training/internship completed after Sem 4.', 9, 'draft'),

    -- Semester 6 Core, Electives, Practicals, Major Project (0 Units for Practical & Project, status: draft)
    ('bcf332d5-de47-4d5a-8dbe-ec52f8239539', 'BCA-302N', 'Introduction to Data Science', 'bca-302n-introduction-to-data-science', 4, 'Core course in data pre-processing, exploratory analysis, and predictive modeling.', 1, 'draft'),
    ('bcf332d5-de47-4d5a-8dbe-ec52f8239539', 'BCA-304N', 'Cloud Computing', 'bca-304n-cloud-computing', 4, 'Core course in distributed computing, virtualization, IaaS/PaaS/SaaS, and edge computing.', 2, 'draft'),
    ('bcf332d5-de47-4d5a-8dbe-ec52f8239539', 'BCA-306N', 'Internet of Things', 'bca-306n-internet-of-things', 4, 'Core course in IoT architecture, sensors, networking, analytics, and industrial IoT.', 3, 'draft'),
    ('bcf332d5-de47-4d5a-8dbe-ec52f8239539', 'BCA-441E', 'Software Testing', 'bca-441e-software-testing', 4, 'Elective course in testing principles, black/white-box techniques, and testing metrics.', 4, 'draft'),
    ('bcf332d5-de47-4d5a-8dbe-ec52f8239539', 'BCA-442E', 'Advanced Web Development Technologies', 'bca-442e-advanced-web-development-technologies', 4, 'Elective course in React.js, Node.js, Express, and MongoDB.', 5, 'draft'),
    ('bcf332d5-de47-4d5a-8dbe-ec52f8239539', 'BCA-443E', 'Blockchain Foundations', 'bca-443e-blockchain-foundations', 4, 'Elective course in cryptography, consensus protocols, Ethereum, and Solidity.', 6, 'draft'),
    ('bcf332d5-de47-4d5a-8dbe-ec52f8239539', 'BCA-302P', 'LAB: (Data Science)', 'bca-302p-data-science-lab', 2, 'Hands-on practical lab in Python data cleaning, visualization, and regression models.', 7, 'draft'),
    ('bcf332d5-de47-4d5a-8dbe-ec52f8239539', 'BCA-308P', 'Major Project', 'bca-308p-major-project', 6, 'Full-semester software engineering capstone project and defense.', 8, 'draft')
  ON CONFLICT (semester_id, code) DO NOTHING
  RETURNING id
)
INSERT INTO public._migration_curriculum_ledger (migration_tag, entity_type, entity_id)
SELECT 'mjpru_bca_2024_25_seed', 'subject_insert', id FROM new_subjects;

-- ============================================================================
-- STEP 3: SEED EXACT, VERIFIED UNIT TITLES FROM OFFICIAL MJPRU 2024-25 SYLLABUS
-- (LOG PRIOR UNIT TITLES BEFORE UPGRADE; ZERO UNITS FOR PRACTICALS)
-- ============================================================================

-- 3a. Log original titles of existing units before updating
INSERT INTO public._migration_curriculum_ledger (migration_tag, entity_type, entity_id, original_state)
SELECT 'mjpru_bca_2024_25_seed', 'unit_update', u.id,
       jsonb_build_object('number', u.number, 'title', u.title, 'subject_id', u.subject_id)
FROM public.units u
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

DO $$
DECLARE
  v_sub_id uuid;
BEGIN
  -- ---------------------------------------------------------------------------
  -- Sem 1 Unit Updates (Existing unit records preserved, titles upgraded)
  -- ---------------------------------------------------------------------------
  SELECT id INTO v_sub_id FROM public.subjects WHERE code = 'BCA-101N' AND semester_id = '95c2207d-6f08-4824-9ff4-52f918ca7d60';
  UPDATE public.units SET title = 'Computers Evolution, Architecture, Memory & Software Types' WHERE subject_id = v_sub_id AND number = 1;
  UPDATE public.units SET title = 'Overview of Operating Systems, DOS & Windows Management' WHERE subject_id = v_sub_id AND number = 2;
  UPDATE public.units SET title = 'PC Maintenance, Hardware, Motherboard & Internet Fundamentals' WHERE subject_id = v_sub_id AND number = 3;
  UPDATE public.units SET title = 'Word Processing (MS Word) & Presentation (MS PowerPoint)' WHERE subject_id = v_sub_id AND number = 4;
  UPDATE public.units SET title = 'Spreadsheet (MS Excel) - Formulas, Functions & Macros' WHERE subject_id = v_sub_id AND number = 5;

  SELECT id INTO v_sub_id FROM public.subjects WHERE code = 'BCA-103N' AND semester_id = '95c2207d-6f08-4824-9ff4-52f918ca7d60';
  UPDATE public.units SET title = 'C Fundamentals, Structure, Data Types & Operators' WHERE subject_id = v_sub_id AND number = 1;
  UPDATE public.units SET title = 'Control Statements, Branching & Looping Constructs' WHERE subject_id = v_sub_id AND number = 2;
  UPDATE public.units SET title = 'Arrays, 2D Arrays, Strings & String Handling Functions' WHERE subject_id = v_sub_id AND number = 3;
  UPDATE public.units SET title = 'Functions, Parameter Passing, Recursion & Scope' WHERE subject_id = v_sub_id AND number = 4;
  UPDATE public.units SET title = 'Pointers, Structures, Unions & Dynamic Memory Allocation' WHERE subject_id = v_sub_id AND number = 5;

  SELECT id INTO v_sub_id FROM public.subjects WHERE code = 'BCA-105N' AND semester_id = '95c2207d-6f08-4824-9ff4-52f918ca7d60';
  UPDATE public.units SET title = 'Divisibility, Prime Factorization, Fractions & Binomial Theorem' WHERE subject_id = v_sub_id AND number = 1;
  UPDATE public.units SET title = 'Sequences, Series & Progressions (AP, GP, HP, AM, GM, HM)' WHERE subject_id = v_sub_id AND number = 2;
  UPDATE public.units SET title = 'Matrices and Determinants - Operations & Inverse' WHERE subject_id = v_sub_id AND number = 3;
  UPDATE public.units SET title = 'Differential Calculus - Chain Rule, Logs & Trigonometric Differentiation' WHERE subject_id = v_sub_id AND number = 4;
  UPDATE public.units SET title = 'Integral Calculus - Substitution, Trigonometric Identities & Parts' WHERE subject_id = v_sub_id AND number = 5;

  SELECT id INTO v_sub_id FROM public.subjects WHERE code = 'BCA-107N' AND semester_id = '95c2207d-6f08-4824-9ff4-52f918ca7d60';
  UPDATE public.units SET title = 'Language Communication, Process, Components & Barriers' WHERE subject_id = v_sub_id AND number = 1;
  UPDATE public.units SET title = 'English Skills - Reading, Listening, Verbal & Non-Verbal Techniques' WHERE subject_id = v_sub_id AND number = 2;
  UPDATE public.units SET title = 'Effective Writing - Abstracts, Summaries, Notes & Technical Reports' WHERE subject_id = v_sub_id AND number = 3;
  UPDATE public.units SET title = 'Grammar I - Parts of Speech, Subject-Predicate, Phrases, Clauses & Tenses' WHERE subject_id = v_sub_id AND number = 4;
  UPDATE public.units SET title = 'Grammar II - Active/Passive Voice, Concord & Reported Speech' WHERE subject_id = v_sub_id AND number = 5;

  SELECT id INTO v_sub_id FROM public.subjects WHERE code = 'BCA-109N' AND semester_id = '95c2207d-6f08-4824-9ff4-52f918ca7d60';
  UPDATE public.units SET title = 'Management Fundamentals, Fayol & Taylor Principles, Theories' WHERE subject_id = v_sub_id AND number = 1;
  UPDATE public.units SET title = 'Planning, Decision Making, Organizing & Departmentation' WHERE subject_id = v_sub_id AND number = 2;
  UPDATE public.units SET title = 'Staffing, Directing, Motivation (Maslow, Herzberg) & Controlling' WHERE subject_id = v_sub_id AND number = 3;
  UPDATE public.units SET title = 'Organizational Behavior - Personality, Learning, Perception & Attitudes' WHERE subject_id = v_sub_id AND number = 4;
  UPDATE public.units SET title = 'Computer Applications in Functional Management (Finance, HR, Marketing)' WHERE subject_id = v_sub_id AND number = 5;

  -- ---------------------------------------------------------------------------
  -- Sem 2 Unit Updates (Existing unit records preserved, titles upgraded)
  -- ---------------------------------------------------------------------------
  SELECT id INTO v_sub_id FROM public.subjects WHERE code = 'BCA-102N' AND semester_id = 'be0534c5-8d70-479b-9690-3dd06d688846';
  UPDATE public.units SET title = 'Introduction to Data Structures: Arrays & Sparse Matrices' WHERE subject_id = v_sub_id AND number = 1;
  UPDATE public.units SET title = 'Sorting & Searching Techniques: Insertion, Selection, Merge, Hashing' WHERE subject_id = v_sub_id AND number = 2;
  UPDATE public.units SET title = 'Stacks and Queues: Operations, Polish Notations, Priority Queues' WHERE subject_id = v_sub_id AND number = 3;
  UPDATE public.units SET title = 'Lists and Binary Trees: Traversal, Insertion & Deletion' WHERE subject_id = v_sub_id AND number = 4;
  UPDATE public.units SET title = 'AVL Trees, m-Way Trees, Multilevel Indexing & B-Trees' WHERE subject_id = v_sub_id AND number = 5;

  SELECT id INTO v_sub_id FROM public.subjects WHERE code = 'BCA-104N' AND semester_id = 'be0534c5-8d70-479b-9690-3dd06d688846';
  UPDATE public.units SET title = 'Database Architecture, Relational Model, Independence & DBA' WHERE subject_id = v_sub_id AND number = 1;
  UPDATE public.units SET title = 'Entity-Relationship Modeling: Entities, Attributes, Keys & ER Diagrams' WHERE subject_id = v_sub_id AND number = 2;
  UPDATE public.units SET title = 'Relational Model, Functional Dependencies & Normalization (1NF, 2NF, 3NF)' WHERE subject_id = v_sub_id AND number = 3;
  UPDATE public.units SET title = 'Structured Query Language (SQL): DDL, DML, Queries & Views' WHERE subject_id = v_sub_id AND number = 4;
  UPDATE public.units SET title = 'Database Security, Integrity, Defense Mechanisms & Recent Trends' WHERE subject_id = v_sub_id AND number = 5;

  SELECT id INTO v_sub_id FROM public.subjects WHERE code = 'BCA-106N' AND semester_id = 'be0534c5-8d70-479b-9690-3dd06d688846';
  UPDATE public.units SET title = 'Business Concepts, Forms of Organization, Sole Proprietorship & Partnership' WHERE subject_id = v_sub_id AND number = 1;
  UPDATE public.units SET title = 'Management Thought: Fayol 14 Principles, Taylor & Weber Bureaucracy' WHERE subject_id = v_sub_id AND number = 2;
  UPDATE public.units SET title = 'Planning, Decision Making Processes, Strategy & Departmentation' WHERE subject_id = v_sub_id AND number = 3;
  UPDATE public.units SET title = 'Organization Structure, Span of Management, Authority & Decentralization' WHERE subject_id = v_sub_id AND number = 4;
  UPDATE public.units SET title = 'Motivation Theories, Leadership Styles, Coordination & Control Process' WHERE subject_id = v_sub_id AND number = 5;

  SELECT id INTO v_sub_id FROM public.subjects WHERE code = 'BCA-401E' AND semester_id = 'be0534c5-8d70-479b-9690-3dd06d688846';
  UPDATE public.units SET title = 'Set Theory, Operations, Cartesian Products & Power Sets' WHERE subject_id = v_sub_id AND number = 1;
  UPDATE public.units SET title = 'Relations, Functions, Equivalence & Mathematical Induction' WHERE subject_id = v_sub_id AND number = 2;
  UPDATE public.units SET title = 'Functions of Several Variables, Partial Differentiation & Vector Calculus' WHERE subject_id = v_sub_id AND number = 3;
  UPDATE public.units SET title = 'Infinite Series, Convergence Tests, Ratio Test & Logarithmic Tests' WHERE subject_id = v_sub_id AND number = 4;
  UPDATE public.units SET title = 'Mean Value Theorems, Maclaurin Series, Maxima & Minima' WHERE subject_id = v_sub_id AND number = 5;
END $$;

-- Table to hold verified syllabus units for atomic insert & ledger tracking
CREATE TEMP TABLE tmp_verified_syllabus_units (
  subject_code text,
  semester_id uuid,
  unit_number integer,
  unit_title text
) ON COMMIT DROP;

INSERT INTO tmp_verified_syllabus_units VALUES
  -- BCA-108N Digital Electronics (Sem 2, 5 Units, Syllabus p. 16-17)
  ('BCA-108N', 'be0534c5-8d70-479b-9690-3dd06d688846', 1, 'Boolean Algebra Basics, Logic Gates & K-Map Simplification'),
  ('BCA-108N', 'be0534c5-8d70-479b-9690-3dd06d688846', 2, 'Number Systems (Binary, Octal, Hex), BCD, Gray & Excess-3 Codes'),
  ('BCA-108N', 'be0534c5-8d70-479b-9690-3dd06d688846', 3, 'Arithmetic Circuits: Adders, Subtractors, MUX, DEMUX, Encoders & Decoders'),
  ('BCA-108N', 'be0534c5-8d70-479b-9690-3dd06d688846', 4, 'Flip-Flops (SR, JK, D, T), Master-Slave & Shift Registers'),
  ('BCA-108N', 'be0534c5-8d70-479b-9690-3dd06d688846', 5, 'Counters (Ripple, Synchronous, Ring) & Memory Devices (RAM, ROM, PAL & PLA)'),

  -- BCA-402E Environment and Ecology (Sem 2, 5 Units, Syllabus p. 36-37)
  ('BCA-402E', 'be0534c5-8d70-479b-9690-3dd06d688846', 1, 'Natural Resources: Forest, Water, Minerals, Food, Energy & Land Resources'),
  ('BCA-402E', 'be0534c5-8d70-479b-9690-3dd06d688846', 2, 'Ecosystems: Concept, Structure, Energy Flow, Food Chains & Pyramids'),
  ('BCA-402E', 'be0534c5-8d70-479b-9690-3dd06d688846', 3, 'Biodiversity and its Conservation: Hot-spots, Threats & Endangered Species'),
  ('BCA-402E', 'be0534c5-8d70-479b-9690-3dd06d688846', 4, 'Environmental Pollution (Air, Water, Soil, Noise, E-Waste) & Solid Waste'),
  ('BCA-402E', 'be0534c5-8d70-479b-9690-3dd06d688846', 5, 'Social Issues, Sustainable Development, Global Warming & Ozone Depletion'),

  -- BCA-403E Introduction to E-Governance (Sem 2, 5 Units, Syllabus p. 37-38)
  ('BCA-403E', 'be0534c5-8d70-479b-9690-3dd06d688846', 1, 'E-Governance: Introduction, Scope, Components, Digital Divide & Social Media'),
  ('BCA-403E', 'be0534c5-8d70-479b-9690-3dd06d688846', 2, 'E-Governance Approaches in India: NeGP, Strategy & Mission Mode Projects'),
  ('BCA-403E', 'be0534c5-8d70-479b-9690-3dd06d688846', 3, 'E-Governance Project Development: Lifecycle, PPP Model & Security'),
  ('BCA-403E', 'be0534c5-8d70-479b-9690-3dd06d688846', 4, 'Capacity Building, Change Management & Governance Structures'),
  ('BCA-403E', 'be0534c5-8d70-479b-9690-3dd06d688846', 5, 'Government Process Re-engineering, Legal Reforms & Case Studies (G2C, G2B)'),

  -- BCA-201N Object Oriented Programming using JAVA (Sem 3, 5 Units, Syllabus p. 17-18)
  ('BCA-201N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 1, 'Java Introduction: Applets, OOP Basics, JVM, Data Types & Control Flow'),
  ('BCA-201N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 2, 'Classes, Objects, Methods, Constructors, Inheritance & Abstract Classes'),
  ('BCA-201N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 3, 'Interfaces, Packages, Java API Packages, Strings & Wrapper Classes'),
  ('BCA-201N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 4, 'Exception Handling (try-catch-finally) & Multithreaded Programming'),
  ('BCA-201N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 5, 'Java I/O Streams, File Class, Byte & Character Streams, Serialization'),

  -- BCA-203N NAST (Sem 3, 5 Units, Syllabus p. 19-20)
  ('BCA-203N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 1, 'Mathematical Modeling, Round-Off Errors, Truncation Errors & Taylor Series'),
  ('BCA-203N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 2, 'Algebraic & Transcendental Equations (Bisection, Newton-Raphson) & Interpolation'),
  ('BCA-203N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 3, 'Simultaneous Linear Equations, Numerical Integration & Differential Equations'),
  ('BCA-203N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 4, 'Least-Squares Regression, Polynomial Regression & Linear Programming (LPP)'),
  ('BCA-203N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 5, 'Random Variables, Probability Distributions (Binomial, Poisson, Normal)'),

  -- BCA-205N Operating System (Sem 3, 5 Units, Syllabus p. 20-21)
  ('BCA-205N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 1, 'Operating System Overview: Batch, Multiprogramming, Timesharing & Structure'),
  ('BCA-205N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 2, 'Process Management: States, PCB, Context Switching, Scheduling & Threads'),
  ('BCA-205N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 3, 'Memory Management: Paging, Segmentation, Virtual Memory & Page Replacement'),
  ('BCA-205N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 4, 'Concurrent Processes: Semaphores, Monitors & Deadlock Handling'),
  ('BCA-205N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 5, 'File & Secondary Storage Management: Directory Structure, Disk Scheduling'),

  -- BCA-207N COA (Sem 3, 5 Units, Syllabus p. 21-22)
  ('BCA-207N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 1, 'Basic Computer Organization: Stored Program Concept, ALU, Control Unit & Registers'),
  ('BCA-207N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 2, 'CPU Functioning: Instruction Formats, Addressing Modes & Multi-Core Systems'),
  ('BCA-207N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 3, 'Memory Organization: Hierarchy, Cache, Virtual Memory & Associative Memory'),
  ('BCA-207N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 4, 'I/O Organization: Peripheral Devices, Interrupts, DMA & Serial Communication'),
  ('BCA-207N', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 5, 'Parallel Processing: Pipelining, Flynn Classification & Speedup Ratio'),

  -- BCA-411E Discrete Mathematics (Sem 3, 5 Units, Syllabus p. 38-39)
  ('BCA-411E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 1, 'Set Theory, Boolean Algebra, Lattices, Duality & Boolean Functions'),
  ('BCA-411E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 2, 'Propositional Logic: Truth Tables, Tautologies, Quantifiers & Predicates'),
  ('BCA-411E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 3, 'Combinatorics: Permutations, Combinations & Binomial Expansion'),
  ('BCA-411E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 4, 'Group Theory: Semigroups, Monoids, Groups, Cosets & Homomorphisms'),
  ('BCA-411E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 5, 'Graph Theory: Paths, Eulerian/Hamiltonian Graphs, Trees & Matrix Representations'),

  -- BCA-412E Personality Development (Sem 3, 5 Units, Syllabus p. 40)
  ('BCA-412E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 1, 'Personality Development Basics: Components, Scope & Communication Skills'),
  ('BCA-412E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 2, 'Grooming Personality: Motivation, Leadership, Team Building & Time Management'),
  ('BCA-412E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 3, 'Written Communication: Email Etiquette, Job Applications & Resume Writing'),
  ('BCA-412E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 4, 'Business Letters: Enquiries, Quotations, Orders & Complaints'),
  ('BCA-412E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 5, 'Oral Communication: Interviews, Viva Voce, Presentations & Group Discussions'),

  -- BCA-413E Information System for Business (Sem 3, 5 Units, Syllabus p. 41)
  ('BCA-413E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 1, 'Information Systems Overview: Hardware, Software Types & Moore Law'),
  ('BCA-413E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 2, 'Data, Databases, Big Data, Networking & Security Triad'),
  ('BCA-413E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 3, 'Decision Support Systems, Business Processes & ERP Systems'),
  ('BCA-413E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 4, 'System Development Lifecycle (SDLC), Globalization & Digital Divide'),
  ('BCA-413E', '4999e6d6-cd20-463e-b1e2-eceb37ba4099', 5, 'Ethics in Information Systems: Intellectual Property, Patents & Trends'),

  -- BCA-202N Python (Sem 4, 5 Units, Syllabus p. 22-23)
  ('BCA-202N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 1, 'Python Overview: Interpreter, Shell, Indentation, Identifiers & Strings'),
  ('BCA-202N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 2, 'Operators, Expressions, Data Types & Input/Output Statements'),
  ('BCA-202N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 3, 'Control Statements: Branching, Loops, Functions & Arguments'),
  ('BCA-202N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 4, 'Classes and Objects: OOP, Operator Overloading, Inheritance & Polymorphism'),
  ('BCA-202N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 5, 'Iterators, Generators, Testing, Debugging & Web Scraping in Python'),

  -- BCA-204N Unix (Sem 4, STRICTLY 4 UNITS - Official Syllabus p. 23-24 has only Units I to IV)
  ('BCA-204N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 1, 'Unix Architecture, Command Format, File System (Inodes) & Process Management'),
  ('BCA-204N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 2, 'Secondary Storage, Compression, Special Tools (grep, sed, awk) & System Calls'),
  ('BCA-204N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 3, 'Shell Programming: vi Editor, Variables, Metacharacters & Positional Parameters'),
  ('BCA-204N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 4, 'Conditional & Looping Control Structures (if, case, while, for)'),

  -- BCA-206N Accounting (Sem 4, 5 Units, Syllabus p. 24-25)
  ('BCA-206N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 1, 'Accountancy Fundamentals: Double Entry, Rules of Debit/Credit, Journal & Ledger'),
  ('BCA-206N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 2, 'Trial Balance, Final Accounts (Trading, Profit & Loss, Balance Sheet)'),
  ('BCA-206N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 3, 'Ratio Analysis: Liquidity, Solvency, Turnover & Profitability Ratios'),
  ('BCA-206N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 4, 'Management Accounting Scope, Standard Costing & Cost Variance'),
  ('BCA-206N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 5, 'Budgeting: Types of Budgets, Budgetary Control & Cost Sheets'),

  -- BCA-208N Computer Networks (Sem 4, 5 Units, Syllabus p. 26)
  ('BCA-208N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 1, 'Computer Networks Overview: Topologies, Media & Reference Models (OSI, TCP/IP)'),
  ('BCA-208N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 2, 'Network Models: Client/Server, Peer-to-Peer & Layer Functionalities'),
  ('BCA-208N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 3, 'Addressing & Routing: IPv4, IPv6, ARP, DHCP, ICMP & IGMP'),
  ('BCA-208N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 4, 'Network Applications: DNS, Telnet, Email (SMTP, POP, IMAP), FTP & SNMP'),
  ('BCA-208N', '360cb571-93fc-405d-aa84-378a5cf4de8d', 5, 'Network Security: Cryptography, Digital Signatures, TLS, Firewalls & VPNs'),

  -- BCA-421E E-Commerce (Sem 4, 5 Units, Syllabus p. 42)
  ('BCA-421E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 1, 'E-Commerce Models (B2B, B2C, C2B, C2C), Advantages & Technical Limitations'),
  ('BCA-421E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 2, 'Electronic Payment Systems: E-Cash, E-Checks, Micropayments & SET Protocol'),
  ('BCA-421E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 3, 'E-Business Strategies: Business Models, Strategic Alignment & Supply Chain'),
  ('BCA-421E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 4, 'Application Integration: Middleware, RPC, RMI, EAI, Web Services & Cloud'),
  ('BCA-421E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 5, 'E-Security: Risks, Firewalls & The Information Technology Act 2000 Highlights'),

  -- BCA-422E Cyber Laws (Sem 4, 5 Units, Syllabus p. 43-44)
  ('BCA-422E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 1, 'Cyber Law Fundamentals: Cyber Crimes, Digital Signatures & Indian Jurisprudence'),
  ('BCA-422E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 2, 'Evolution of Cyber Crime: Spoofing, Denial of Service, Cyber Terrorism & Fraud'),
  ('BCA-422E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 3, 'Digital Contracts: Digital Signatures, Certifying Authorities & Liabilities'),
  ('BCA-422E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 4, 'IT Act 2000 & Amendments: Electronic Records, Scope & Jurisdiction'),
  ('BCA-422E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 5, 'Copyright Protection on the Internet, Management Issues & ODR'),

  -- BCA-423E Software Engineering (Sem 4, 5 Units, Syllabus p. 44-45)
  ('BCA-423E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 1, 'Software Engineering Introduction: SDLC Models (Waterfall, Spiral, Agile) & CMM'),
  ('BCA-423E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 2, 'Requirements Analysis & Specification: SRS Document, Metrics & OO Analysis'),
  ('BCA-423E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 3, 'Software Project Planning: Cost Estimation (COCOMO) & Configuration Management'),
  ('BCA-423E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 4, 'Software Design: Architecture, Function-Oriented & Object-Oriented Design'),
  ('BCA-423E', '360cb571-93fc-405d-aa84-378a5cf4de8d', 5, 'Software Testing & Maintenance: Black/White-Box, Reliability & Standards'),

  -- BCA-301N AI (Sem 5, 5 Units, Syllabus p. 27)
  ('BCA-301N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 1, 'AI Introduction: History, Turing Test, Symbolic/Connectionist AI & Agents'),
  ('BCA-301N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 2, 'Problem Solving as State Space Search: A*, AO*, Hill-Climbing & Game Playing'),
  ('BCA-301N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 3, 'Knowledge Representation & Logic: Prepositional/Predicate Logic & Resolution'),
  ('BCA-301N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 4, 'Reasoning: Forward/Backward Reasoning, Semantic Networks & Frames'),
  ('BCA-301N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 5, 'AI Applications: Introduction to Natural Language Processing & Expert Systems'),

  -- BCA-303N Web Technologies (Sem 5, 5 Units, Syllabus p. 28)
  ('BCA-303N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 1, 'Web Basics: HTML5, CSS3, JavaScript Event Handling & Form Validation'),
  ('BCA-303N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 2, 'XML Technologies (DTD, Schemas, DOM, SAX) & PHP Programming'),
  ('BCA-303N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 3, 'Web Servers & Java Servlets: Lifecycle, Request/Response & Sessions'),
  ('BCA-303N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 4, 'Database Access via JDBC, PHP-MySQL Connectivity & Struts Overview'),
  ('BCA-303N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 5, 'JSP Application Development: Architecture, Directives, Scripting & Beans'),

  -- BCA-305N Computer Graphics (Sem 5, 5 Units, Syllabus p. 29-30)
  ('BCA-305N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 1, 'Computer Graphics Introduction: Display Devices (Raster/Random Scan) & Hardware'),
  ('BCA-305N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 2, '2D Transformations, Clipping Algorithms (Cohen-Sutherland) & 3D Projections'),
  ('BCA-305N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 3, 'Scan Conversion Algorithms: Bresenham Line & Circle Drawing, Ellipses'),
  ('BCA-305N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 4, 'Curves & Surfaces: Spline Representation, Bezier Curves & B-Spline Surfaces'),
  ('BCA-305N', '539b72d8-3292-4057-8474-cd2e5ef483ec', 5, 'Computer Animation: Principles of Animation, Morphing & Tweaking Techniques'),

  -- BCA-431E Cyber Security (Sem 5, 5 Units, Syllabus p. 45-46)
  ('BCA-431E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 1, 'Cyber Security Basics: CIA Triad, Cyber Space Concepts & Vulnerabilities'),
  ('BCA-431E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 2, 'Attack Classes: Active/Passive Attacks & Security Models (CIA, Parkerian Hexad)'),
  ('BCA-431E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 3, 'Security Policies: Formulation, Organizational Roles & Responsibilities'),
  ('BCA-431E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 4, 'Countermeasures: Firewalls, Cryptography, IDS/IPS & Hardening Techniques'),
  ('BCA-431E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 5, 'Penetration Testing, Ethical Hacking Concepts & Fraud Prevention'),

  -- BCA-432E GUI Programming (Sem 5, 5 Units, Syllabus p. 46-47)
  ('BCA-432E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 1, '.NET Framework Architecture: CLR, CTS, MSIL, Visual Studio & Visual Basic'),
  ('BCA-432E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 2, 'Form Controls, Menus, Dialog Boxes, Events & Exception Handling'),
  ('BCA-432E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 3, 'Object-Oriented Programming in .NET: Classes, Inheritance & Polymorphism'),
  ('BCA-432E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 4, 'ADO.NET Architecture: Datasets, DataReaders, DataAdapters & DataGridView'),
  ('BCA-432E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 5, 'ASP.NET Web Forms: Client/Server Architecture, Web Controls & Validation'),

  -- BCA-433E Operation Research (Sem 5, 5 Units, Syllabus p. 48)
  ('BCA-433E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 1, 'Operations Research Overview & Linear Programming Problem (LPP Formulation)'),
  ('BCA-433E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 2, 'Transportation & Assignment Problems: Northwest Corner, Vogel & Hungarian'),
  ('BCA-433E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 3, 'Sequencing Models: Processing n Jobs through 2, 3, and m Machines'),
  ('BCA-433E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 4, 'Dynamic Programming: Bellman Principle, Capital Budgeting & Shortest Paths'),
  ('BCA-433E', '539b72d8-3292-4057-8474-cd2e5ef483ec', 5, 'Simulation & Project Management: Monte Carlo Simulation & CPM/PERT Analysis'),

  -- BCA-302N Data Science (Sem 6, 5 Units, Syllabus p. 31-32)
  ('BCA-302N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 1, 'Data Science Overview: Evolution, Roles, Project Lifecycle & Applications'),
  ('BCA-302N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 2, 'Data Pre-Processing: Cleaning, Integration, Transformation & Discretization'),
  ('BCA-302N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 3, 'Exploratory Data Analytics: Descriptive Statistics, Box Plots & Correlation'),
  ('BCA-302N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 4, 'Predictive Modeling: Linear Regression, Polynomial Regression & Pipelines'),
  ('BCA-302N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 5, 'Model Evaluation: Cross-Validation, Overfitting/Underfitting & Ridge Regression'),

  -- BCA-304N Cloud Computing (Sem 6, 5 Units, Syllabus p. 32-33)
  ('BCA-304N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 1, 'Parallel & Distributed Computing Evolution, Cloud Reference Model & Utility'),
  ('BCA-304N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 2, 'Virtualization Technologies: Hypervisors, Full vs Paravirtualization'),
  ('BCA-304N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 3, 'Cloud Architecture & Service Models: IaaS, PaaS, SaaS & Deployment Models'),
  ('BCA-304N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 4, 'Platform Management: Storage, Web Services, Web OS & Case Studies'),
  ('BCA-304N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 5, 'Cloud Economics, Edge/Fog Computing Paradigms & Mobile Cloud Infrastructure'),

  -- BCA-306N Internet of Things (Sem 6, 5 Units, Syllabus p. 33-34)
  ('BCA-306N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 1, 'IoT Genesis, Architecture, Functional Stack & Compute Hierarchy'),
  ('BCA-306N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 2, 'IoT Networking: Sensors, Actuators, Smart Objects & IP Networking'),
  ('BCA-306N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 3, 'Data & Analytics for IoT: Machine Learning & Edge Streaming Analytics'),
  ('BCA-306N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 4, 'Cloud Storage Models, IoT Communication APIs & Security Practices'),
  ('BCA-306N', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 5, 'Industrial IoT Applications: Smart Cities, Utilities, Oil & Gas, Mining'),

  -- BCA-441E Software Testing (Sem 6, 5 Units, Syllabus p. 49-50)
  ('BCA-441E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 1, 'Software Testing Fundamentals: Error Classification, Principles & Debugging'),
  ('BCA-441E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 2, 'Approaches to Testing: White-Box, Black-Box, Gray-Box & Unit Testing'),
  ('BCA-441E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 3, 'Specialized Testing: GUI Testing, Client/Server & Real-Time System Testing'),
  ('BCA-441E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 4, 'Testing Strategies & Metrics: Agile Testing, Acceptance, Regression & Load'),
  ('BCA-441E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 5, 'Testing Tools Overview: JUnit, Apache JMeter, WinRunner, LoadRunner'),

  -- BCA-442E Advanced Web Dev (Sem 6, 5 Units, Syllabus p. 50-51)
  ('BCA-442E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 1, 'Modern JavaScript (ES6+): DOM Manipulation, Async/Await & Event Handling'),
  ('BCA-442E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 2, 'React.js Framework: JSX, Components, State/Props, Lifecycle & Hooks'),
  ('BCA-442E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 3, 'Node.js & Express.js: Runtime Architecture, Modules & RESTful APIs'),
  ('BCA-442E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 4, 'NoSQL Databases: MongoDB Architecture, CRUD & Mongoose ODM Integration'),
  ('BCA-442E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 5, 'Full-Stack Integration: Python/Node Backend Connection & Deployment'),

  -- BCA-443E Blockchain Foundations (Sem 6, 5 Units, Syllabus p. 51-52)
  ('BCA-443E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 1, 'Blockchain Fundamentals: Bitcoin Architecture, Cryptographic Hashing & Wallets'),
  ('BCA-443E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 2, 'Blockchain Types (Public/Private/Consortium) & Ethereum Setup (Gas, MetaMask)'),
  ('BCA-443E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 3, 'Mining & Consensus Protocols: Proof of Work (PoW) & Attack Vectors (51% Attack)'),
  ('BCA-443E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 4, 'Proof of Stake (PoS), Byzantine Fault Tolerance & Smart Contracts'),
  ('BCA-443E', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 5, 'Solidity Development: Syntax, Contract Deployment (Ganache) & Events');

-- Insert units for newly seeded theory subjects as 'draft' and log them to ledger
WITH inserted_units AS (
  INSERT INTO public.units (subject_id, number, title, sort_order, status)
  SELECT s.id, t.unit_number, t.unit_title, t.unit_number, 'draft'
  FROM tmp_verified_syllabus_units t
  JOIN public.subjects s ON s.code = t.subject_code AND s.semester_id = t.semester_id
  ON CONFLICT (subject_id, number) DO UPDATE SET title = EXCLUDED.title
  RETURNING id
)
INSERT INTO public._migration_curriculum_ledger (migration_tag, entity_type, entity_id)
SELECT 'mjpru_bca_2024_25_seed', 'unit_insert', id FROM inserted_units;

COMMIT;
