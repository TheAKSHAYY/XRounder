-- Seed ONE complete published learning path for testing and real student use:
-- BCA -> Semester 1 -> Programming in C -> Units 1-5 -> Notes & Content Items -> MCQs -> Past Papers

DO $$
DECLARE
  v_course_id UUID;
  v_sem_id UUID;
  v_subject_id UUID;
  v_unit1_id UUID;
  v_unit2_id UUID;
  v_unit3_id UUID;
  v_unit4_id UUID;
  v_unit5_id UUID;
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
  v_q4_id UUID;
  v_q5_id UUID;
BEGIN
  -- 1. Course: Bachelor of Computer Applications (BCA)
  INSERT INTO public.courses (code, title, slug, description, duration_years, total_semesters, status, sort_order)
  VALUES (
    'BCA',
    'Bachelor of Computer Applications',
    'bca',
    'Comprehensive three-year undergraduate program focusing on computer science, programming fundamentals, software development, and database management.',
    3,
    6,
    'published',
    1
  )
  ON CONFLICT (code) DO UPDATE SET
    title = EXCLUDED.title,
    slug = EXCLUDED.slug,
    description = EXCLUDED.description,
    duration_years = EXCLUDED.duration_years,
    total_semesters = EXCLUDED.total_semesters,
    status = 'published',
    deleted_at = NULL
  RETURNING id INTO v_course_id;

  -- 2. Semester: Semester 1
  INSERT INTO public.semesters (course_id, number, title, description, status)
  VALUES (
    v_course_id,
    1,
    'Semester 1',
    'Foundational semester covering core computer programming, mathematical foundations, and digital electronics.',
    'published'
  )
  ON CONFLICT (course_id, number) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    status = 'published',
    deleted_at = NULL
  RETURNING id INTO v_sem_id;

  -- Ensure Semesters 2 to 6 exist
  FOR i IN 2..6 LOOP
    INSERT INTO public.semesters (course_id, number, title, description, status)
    VALUES (
      v_course_id,
      i,
      'Semester ' || i,
      'Advanced coursework and applied software engineering modules for Semester ' || i || '.',
      'published'
    )
    ON CONFLICT (course_id, number) DO UPDATE SET
      status = 'published',
      deleted_at = NULL;
  END LOOP;

  -- 3. Subject: Programming in C (BCA101)
  INSERT INTO public.subjects (semester_id, code, title, slug, description, credits, status, sort_order)
  VALUES (
    v_sem_id,
    'BCA101',
    'Programming in C',
    'programming-in-c',
    'Master procedural programming principles, data types, control flow structures, memory pointers, dynamic allocation, and file I/O operations in ANSI C.',
    4,
    'published',
    1
  )
  ON CONFLICT (semester_id, code) DO UPDATE SET
    title = EXCLUDED.title,
    slug = EXCLUDED.slug,
    description = EXCLUDED.description,
    credits = EXCLUDED.credits,
    status = 'published',
    deleted_at = NULL
  RETURNING id INTO v_subject_id;

  -- Ensure other subjects in Semester 1 exist
  INSERT INTO public.subjects (semester_id, code, title, slug, description, credits, status, sort_order)
  VALUES 
    (v_sem_id, 'BCA102', 'Computer Fundamentals & IT', 'computer-fundamentals-it', 'Introduction to computer architecture, operating systems, networking fundamentals, and information technology concepts.', 4, 'published', 2),
    (v_sem_id, 'BCA103', 'Mathematical Foundation', 'mathematical-foundation', 'Discrete mathematics, set theory, propositional logic, relations, and matrix algebra for computer science applications.', 4, 'published', 3),
    (v_sem_id, 'BCA104', 'Digital Electronics', 'digital-electronics', 'Number systems, boolean algebra, logic gates, combinational and sequential circuit design.', 4, 'published', 4)
  ON CONFLICT (semester_id, code) DO UPDATE SET
    status = 'published',
    deleted_at = NULL;

  -- 4. Units for Programming in C
  -- Unit 1
  INSERT INTO public.units (subject_id, number, title, summary, status, sort_order)
  VALUES (
    v_subject_id,
    1,
    'Introduction to C & Basic Syntax',
    'Historical overview, structure of a C program, compilation pipeline, basic data types, variables, constants, arithmetic operators, and standard I/O with printf/scanf.',
    'published',
    1
  )
  ON CONFLICT (subject_id, number) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    status = 'published',
    deleted_at = NULL
  RETURNING id INTO v_unit1_id;

  -- Unit 2
  INSERT INTO public.units (subject_id, number, title, summary, status, sort_order)
  VALUES (
    v_subject_id,
    2,
    'Control Structures & Decision Making',
    'Conditional branching with if, if-else, nested if-else, and switch-case statements. Iterative looping constructs: while, do-while, for loops, and jump statements.',
    'published',
    2
  )
  ON CONFLICT (subject_id, number) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    status = 'published',
    deleted_at = NULL
  RETURNING id INTO v_unit2_id;

  -- Unit 3
  INSERT INTO public.units (subject_id, number, title, summary, status, sort_order)
  VALUES (
    v_subject_id,
    3,
    'Arrays & String Manipulation',
    'One-dimensional and multi-dimensional array memory layouts, matrix arithmetic, character arrays, and string handling functions in string.h.',
    'published',
    3
  )
  ON CONFLICT (subject_id, number) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    status = 'published',
    deleted_at = NULL
  RETURNING id INTO v_unit3_id;

  -- Unit 4
  INSERT INTO public.units (subject_id, number, title, summary, status, sort_order)
  VALUES (
    v_subject_id,
    4,
    'Functions & Modular Programming',
    'Function definitions, declarations, prototypes, parameter passing mechanisms (call by value vs call by reference), storage classes, and recursion.',
    'published',
    4
  )
  ON CONFLICT (subject_id, number) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    status = 'published',
    deleted_at = NULL
  RETURNING id INTO v_unit4_id;

  -- Unit 5
  INSERT INTO public.units (subject_id, number, title, summary, status, sort_order)
  VALUES (
    v_subject_id,
    5,
    'Pointers & Dynamic Memory Allocation',
    'Pointer concepts, pointer arithmetic, pointers to pointers, arrays of pointers, dynamic memory allocation with malloc, calloc, realloc, and free.',
    'published',
    5
  )
  ON CONFLICT (subject_id, number) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    status = 'published',
    deleted_at = NULL
  RETURNING id INTO v_unit5_id;

  -- 5. Content Items for Unit 1
  INSERT INTO public.content_items (subject_id, unit_id, type, title, description, status, sort_order)
  VALUES 
    (
      v_subject_id,
      v_unit1_id,
      'note',
      'Unit 1 Study Guide: C Language Fundamentals & Memory Basics',
      E'# Chapter 1: Introduction to C\n\nC is a general-purpose, procedural computer programming language developed in 1972 by Dennis Ritchie at Bell Laboratories.\n\n## 1. Structure of a C Program\nEvery C program adheres to a clean structural layout:\n\n```c\n#include <stdio.h>\n\n// Main entry point\nint main(void) {\n    printf("Welcome to XRounder Learning Platform!\\n");\n    return 0;\n}\n```\n\n## 2. Basic Data Types & Memory Sizes\n- `char`: 1 byte (represents single ASCII character)\n- `int`: 4 bytes (standard integer representation)\n- `float`: 4 bytes (single-precision IEEE 754 floating point)\n- `double`: 8 bytes (double-precision floating point)\n\n## 3. Standard Input and Output\n- `printf("%d", num)`: Formatted console output\n- `scanf("%d", &num)`: Formatted console input requiring address-of operator `&`',
      'published',
      1
    ),
    (
      v_subject_id,
      v_unit1_id,
      'note',
      'Operators and Precedence Rules in C',
      E'# Operators in C\n\nOperators are foundation symbols used to manipulate data and variables in calculations.\n\n### Categories:\n1. **Arithmetic**: `+`, `-`, `*`, `/`, `%` (Modulus returns remainder)\n2. **Relational**: `==`, `!=`, `<`, `>`, `<=`, `>=`\n3. **Logical**: `&&` (AND), `||` (OR), `!` (NOT)\n4. **Bitwise**: `&`, `|`, `^`, `~`, `<<`, `>>`\n5. **Assignment**: `=`, `+=`, `-=`, `*=`, `/=`\n\n### Operator Precedence Hierarchy\nUnary operators (`++`, `--`, `!`) execute before multiplicative (`*`, `/`, `%`), which execute before additive (`+`, `-`).',
      'published',
      2
    )
  ON CONFLICT DO NOTHING;

  -- 6. Content Items for Unit 2
  INSERT INTO public.content_items (subject_id, unit_id, type, title, description, status, sort_order)
  VALUES 
    (
      v_subject_id,
      v_unit2_id,
      'note',
      'Unit 2 Study Guide: Conditional Branching & Loops',
      E'# Control Structures in C\n\nControl statements alter the default sequential execution flow of statements.\n\n## 1. Decision Making (`if-else`)\n\n```c\nif (grade >= 90) {\n    printf("Distinction\\n");\n} else if (grade >= 75) {\n    printf("First Class\\n");\n} else {\n    printf("Passed\\n");\n}\n```\n\n## 2. Iterative Loops\n- **for loop**: Best when iteration count is predetermined.\n- **while loop**: Entry-controlled loop that checks condition before execution.\n- **do-while loop**: Exit-controlled loop that executes at least once.',
      'published',
      1
    )
  ON CONFLICT DO NOTHING;

  -- 7. Previous Year Question Papers (PYQs)
  INSERT INTO public.papers (subject_id, title, year, exam_type, paper_number, status)
  VALUES 
    (v_subject_id, 'Programming in C End-Term Examination', 2024, 'end_term', 1, 'published'),
    (v_subject_id, 'Programming in C Mid-Semester Test', 2024, 'mid_term', 1, 'published'),
    (v_subject_id, 'Programming in C University Examination', 2023, 'end_term', 1, 'published')
  ON CONFLICT DO NOTHING;

  -- 8. Practice MCQ Quiz for Unit 1
  INSERT INTO public.quizzes (unit_id, title, slug, description, instructions, passing_pct, time_limit_minutes, status, order_index)
  VALUES (
    v_unit1_id,
    'Unit 1: C Fundamentals & Syntax Mastery Quiz',
    'unit-1-c-fundamentals-quiz',
    '5 core questions testing knowledge of C compilation, data types, format specifiers, and operator precedence.',
    'Select the best answer for each question. You have 10 minutes to complete this quiz. Instant feedback is provided.',
    60,
    10,
    'published',
    1
  )
  ON CONFLICT (unit_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions,
    passing_pct = EXCLUDED.passing_pct,
    time_limit_minutes = EXCLUDED.time_limit_minutes,
    status = 'published',
    deleted_at = NULL
  RETURNING id INTO v_quiz_id;

  -- Clean existing questions for this quiz to avoid duplicate appends
  DELETE FROM public.quiz_questions WHERE quiz_id = v_quiz_id;

  -- Question 1
  INSERT INTO public.quiz_questions (quiz_id, type, prompt, explanation, points, order_index)
  VALUES (
    v_quiz_id,
    'single',
    'Who is recognized as the creator of the C programming language?',
    'Dennis Ritchie developed the C programming language in 1972 at Bell Labs for the Unix operating system.',
    1,
    1
  ) RETURNING id INTO v_q1_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index) VALUES
    (v_q1_id, 'Bjarne Stroustrup', false, 1),
    (v_q1_id, 'Dennis Ritchie', true, 2),
    (v_q1_id, 'James Gosling', false, 3),
    (v_q1_id, 'Guido van Rossum', false, 4);

  -- Question 2
  INSERT INTO public.quiz_questions (quiz_id, type, prompt, explanation, points, order_index)
  VALUES (
    v_quiz_id,
    'single',
    'Which format specifier is used in printf() to print a single-precision floating point number in C?',
    '%f is used for single-precision float numbers, %lf for double, %d for integer, and %c for character.',
    1,
    2
  ) RETURNING id INTO v_q2_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index) VALUES
    (v_q2_id, '%d', false, 1),
    (v_q2_id, '%s', false, 2),
    (v_q2_id, '%f', true, 3),
    (v_q2_id, '%c', false, 4);

  -- Question 3
  INSERT INTO public.quiz_questions (quiz_id, type, prompt, explanation, points, order_index)
  VALUES (
    v_quiz_id,
    'single',
    'What is the return type of the main function in standard ANSI C?',
    'According to ANSI C standards, main() returns an integer (int) status code to the operating system (0 indicating successful termination).',
    1,
    3
  ) RETURNING id INTO v_q3_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index) VALUES
    (v_q3_id, 'void', false, 1),
    (v_q3_id, 'int', true, 2),
    (v_q3_id, 'float', false, 3),
    (v_q3_id, 'char', false, 4);

  -- Question 4
  INSERT INTO public.quiz_questions (quiz_id, type, prompt, explanation, points, order_index)
  VALUES (
    v_quiz_id,
    'single',
    'What is the result of the integer expression (17 % 5) in C?',
    'The modulus operator (%) returns the remainder of integer division. 17 divided by 5 equals 3 with a remainder of 2.',
    1,
    4
  ) RETURNING id INTO v_q4_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index) VALUES
    (v_q4_id, '3', false, 1),
    (v_q4_id, '2', true, 2),
    (v_q4_id, '3.4', false, 3),
    (v_q4_id, '0', false, 4);

  -- Question 5
  INSERT INTO public.quiz_questions (quiz_id, type, prompt, explanation, points, order_index)
  VALUES (
    v_quiz_id,
    'single',
    'Which operator is used to obtain the memory address of a variable in C?',
    'The unary ampersand (&) operator returns the memory address of its operand, essential when using scanf() or assigning pointers.',
    1,
    5
  ) RETURNING id INTO v_q5_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index) VALUES
    (v_q5_id, '*', false, 1),
    (v_q5_id, '&', true, 2),
    (v_q5_id, '->', false, 3),
    (v_q5_id, '#', false, 4);

END $$;
