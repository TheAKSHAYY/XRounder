DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-441E Unit 2 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '8741448e-79a6-5f6f-8305-88fc28150f12', 'BCA-441E Unit 2: Approaches to Testing (White Box, Black Box, Gray Box and Integration) Practice Quiz (50 MCQs)', 'bca-441e-u2-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-441E Unit 2. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
    60, 'published', true, 2, now(), now()
  )
  ON CONFLICT (unit_id, slug) DO UPDATE SET
    title = EXCLUDED.title, description = EXCLUDED.description, instructions = EXCLUDED.instructions,
    status = 'published', is_public = true, updated_at = now()
  RETURNING id INTO v_quiz_id;

  DELETE FROM public.quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is White Box Testing also commonly referred to as?', 'Because internal logic, data structures, and source code statements are completely visible to the tester.',
    'easy', 1, 0, 1, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Glass Box Testing, Clear Box Testing, or Structural Testing', true, 1, now(), now()),
    (v_q_id, 'Black Box Testing', false, 2, now(), now()),
    (v_q_id, 'Opaque Box Testing', false, 3, now(), now()),
    (v_q_id, 'Blind Testing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary basis for designing White Box test cases?', 'White box testing directly derives tests from the physical code structure to verify statement, branch, and path execution.',
    'easy', 1, 0, 2, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Control flow graphs, statement paths, conditions, and internal code logic', true, 1, now(), now()),
    (v_q_id, 'Marketing requirements documents', false, 2, now(), now()),
    (v_q_id, 'End-user customer interviews', false, 3, now(), now()),
    (v_q_id, 'Competitor product feature lists', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Statement Coverage in white box testing?', '$$\text{Statement Coverage} = \frac{\text{Executed Statements}}{\text{Total Executable Statements}} \times 100\%$$. Note: 100% statement coverage does NOT guarantee 100% branch coverage.',
    'medium', 1, 0, 3, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The percentage of executable source code statements traversed by a test suite relative to total executable statements', true, 1, now(), now()),
    (v_q_id, 'The number of comments written in code', false, 2, now(), now()),
    (v_q_id, 'The percentage of requirements listed in a document', false, 3, now(), now()),
    (v_q_id, 'The number of print statements in a program', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why does 100% Statement Coverage NOT guarantee 100% Branch Coverage?', 'Consider `if (x > 0) y = 1;`. A test with $x=5$ executes all statements (100%), but completely fails to test the branch when $x \le 0$.',
    'hard', 1, 0, 4, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because an `if` statement without an `else` branch can execute its body (100% statement coverage) without testing the `false` condition branch', true, 1, now(), now()),
    (v_q_id, 'Because statements and branches are identical', false, 2, now(), now()),
    (v_q_id, 'Because compilers delete branch statements', false, 3, now(), now()),
    (v_q_id, 'Because statement coverage only applies to Java', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Branch (Decision) Coverage?', 'Branch coverage verifies that all edges in a control flow graph are traversed at least once.',
    'medium', 1, 0, 5, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Ensuring that every decision point in control flow structures evaluates to both TRUE and FALSE outcomes across the test suite', true, 1, now(), now()),
    (v_q_id, 'Making sure every branch of a company is tested', false, 2, now(), now()),
    (v_q_id, 'Testing code on multiple computer branches', false, 3, now(), now()),
    (v_q_id, 'Executing a program on different days of the week', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Condition Coverage (Predicate Coverage)?', 'In `if (A || B)`, condition coverage requires testing $A=\text{true}$, $A=\text{false}$, $B=\text{true}$, and $B=\text{false}$.',
    'medium', 1, 0, 6, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Ensuring that each individual boolean sub-condition in a compound decision evaluates to both true and false independently', true, 1, now(), now()),
    (v_q_id, 'Checking the physical weather conditions during testing', false, 2, now(), now()),
    (v_q_id, 'Ensuring that computers have adequate air conditioning', false, 3, now(), now()),
    (v_q_id, 'Testing whether employees have good working conditions', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Multiple Condition Coverage (MCC)?', 'For $n$ sub-conditions, MCC tests all $2^n$ permutations, guaranteeing exhaustive logical evaluation at the cost of exponential test explosion.',
    'hard', 1, 0, 7, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing all possible $2^n$ truth table combinations of $n$ boolean sub-conditions within a compound decision', true, 1, now(), now()),
    (v_q_id, 'Testing multiple programs simultaneously', false, 2, now(), now()),
    (v_q_id, 'Running tests on multiple computers', false, 3, now(), now()),
    (v_q_id, 'Writing multiple assertions in a test', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Modified Condition/Decision Coverage (MC/DC)?', 'Mandated by the FAA (DO-178C Level A) for safety-critical avionics software: proves every condition independently controls the decision.',
    'hard', 1, 0, 8, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A testing criterion requiring each condition to independently affect the decision outcome, achieving high rigor with only $n+1$ tests instead of $2^n$', true, 1, now(), now()),
    (v_q_id, 'A military radio encryption algorithm', false, 2, now(), now()),
    (v_q_id, 'A compiler optimization technique', false, 3, now(), now()),
    (v_q_id, 'A database query language', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Path Coverage in white box testing?', 'The strongest form of structural coverage; practically impossible on programs with loops because loops create infinite theoretical paths.',
    'hard', 1, 0, 9, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Executing all possible linearly independent and loop-variant execution paths from entry to exit in a program', true, 1, now(), now()),
    (v_q_id, 'Testing the file path of a program on disk', false, 2, now(), now()),
    (v_q_id, 'Measuring the physical distance traveled by network packets', false, 3, now(), now()),
    (v_q_id, 'Testing how long a mouse path travels on screen', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Who invented Cyclomatic Complexity in 1976?', 'Thomas McCabe formulated cyclomatic complexity as a quantitative measure of logical complexity based on graph theory.',
    'easy', 1, 0, 10, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Thomas J. McCabe', true, 1, now(), now()),
    (v_q_id, 'Edsger Dijkstra', false, 2, now(), now()),
    (v_q_id, 'Alan Turing', false, 3, now(), now()),
    (v_q_id, 'John von Neumann', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In McCabe''s Cyclomatic Complexity formula $V(G) = E - N + 2P$, what do $E, N,$ and $P$ represent?', 'Cyclomatic complexity measures the number of linearly independent paths in a directed Control Flow Graph (CFG).',
    'medium', 1, 0, 11, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '$E$ = Edges, $N$ = Nodes, $P$ = Connected Components (typically 1 for a single program)', true, 1, now(), now()),
    (v_q_id, '$E$ = Errors, $N$ = Numbers, $P$ = Programs', false, 2, now(), now()),
    (v_q_id, '$E$ = Equations, $N$ = Networks, $P$ = Paths', false, 3, now(), now()),
    (v_q_id, '$E$ = Execution, $N$ = Nulls, $P$ = Pointers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'If a program has 4 binary decision points (`if` statements), what is its Cyclomatic Complexity using the Predicate Node formula $V(G) = P + 1$?', 'For simple programs with $P$ binary decision nodes, $V(G) = P + 1$. Thus, 4 decision nodes yield a complexity of 5.',
    'easy', 1, 0, 12, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '$V(G) = 4 + 1 = 5$', true, 1, now(), now()),
    (v_q_id, '$V(G) = 4 \times 2 = 8$', false, 2, now(), now()),
    (v_q_id, '$V(G) = 4 - 1 = 3$', false, 3, now(), now()),
    (v_q_id, '$V(G) = 16$', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the practical significance of Cyclomatic Complexity in Basis Path Testing?', 'Cyclomatic complexity provides an upper bound on the minimum number of test cases needed to execute every statement at least once.',
    'medium', 1, 0, 13, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It defines the exact number of linearly independent paths required to achieve full branch and statement coverage', true, 1, now(), now()),
    (v_q_id, 'It dictates the maximum price of the software', false, 2, now(), now()),
    (v_q_id, 'It tells how many hours it takes to compile code', false, 3, now(), now()),
    (v_q_id, 'It measures the hard drive space of the program', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'According to software engineering industry benchmarks, what does a Cyclomatic Complexity score above 20 indicate?', 'Scores 1–10 are simple/low risk; 11–20 are moderate risk; 21–50 are high risk; $> 50$ are untestable ''God'' routines that must be refactored.',
    'medium', 1, 0, 14, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'High complexity, difficult to test, low maintainability, and high defect probability', true, 1, now(), now()),
    (v_q_id, 'Excellent, high-performance code', false, 2, now(), now()),
    (v_q_id, 'A program with zero bugs', false, 3, now(), now()),
    (v_q_id, 'A program that requires 20 developers to run', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Basis Path Testing?', 'Basis path testing guarantees that every statement and branch in the program is executed at least once during test execution.',
    'medium', 1, 0, 15, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A white-box testing technique that derives test cases by identifying a linearly independent basis set of paths through a program''s Control Flow Graph', true, 1, now(), now()),
    (v_q_id, 'Testing how fast files copy across a network path', false, 2, now(), now()),
    (v_q_id, 'Testing the basic features of a computer operating system', false, 3, now(), now()),
    (v_q_id, 'Running tests on a fundamental hardware board', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Black Box Testing also known as?', 'Because testers evaluate external system behavior against specifications without inspecting internal source code.',
    'easy', 1, 0, 16, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Behavioral Testing or Specification-Based Testing', true, 1, now(), now()),
    (v_q_id, 'Structural Testing', false, 2, now(), now()),
    (v_q_id, 'Glass Box Testing', false, 3, now(), now()),
    (v_q_id, 'Unit Testing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Equivalence Partitioning (EP)?', 'Testers select one representative value from each valid and invalid partition, reducing millions of potential inputs to a manageable set.',
    'easy', 1, 0, 17, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Dividing the input domain into partitions of equivalent data where the system is expected to treat all values within a partition identically', true, 1, now(), now()),
    (v_q_id, 'Dividing testing duties equally among all employees', false, 2, now(), now()),
    (v_q_id, 'Splitting code into two equal halves', false, 3, now(), now()),
    (v_q_id, 'Formatting a hard drive into two equal partitions', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Equivalence Partitioning, what is an ''Invalid Partition''?', 'Robust testing requires testing both valid partitions (happy paths) and invalid partitions to prove the system rejects bad data gracefully.',
    'medium', 1, 0, 18, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A partition containing input values that fall outside the acceptable range or data type, designed to test system error handling', true, 1, now(), now()),
    (v_q_id, 'A partition on a broken hard drive', false, 2, now(), now()),
    (v_q_id, 'A test case written with spelling errors', false, 3, now(), now()),
    (v_q_id, 'A partition that should never be tested', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'A system accepts student examination scores between 0 and 100 inclusive. What are the Equivalence Partitions?', 'Three partitions: one valid interval $[0, 100]$, and two invalid intervals: negative scores ($< 0$) and scores exceeding maximum ($> 100$).',
    'easy', 1, 0, 19, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Valid: [0, 100]; Invalid: Score < 0; Invalid: Score > 100', true, 1, now(), now()),
    (v_q_id, 'Valid: [1, 99]; Invalid: 0 and 100', false, 2, now(), now()),
    (v_q_id, 'Valid: All positive numbers; Invalid: Negative numbers', false, 3, now(), now()),
    (v_q_id, 'Valid: Scores ending in 5; Invalid: All other scores', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Boundary Value Analysis (BVA)?', 'Empirical studies prove that programmers make disproportionately more off-by-one errors at boundaries than in the middle of ranges.',
    'easy', 1, 0, 20, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A testing technique that focuses on values at the boundaries of input equivalence partitions (min, max, just below, just above)', true, 1, now(), now()),
    (v_q_id, 'Measuring the physical boundary of a computer screen', false, 2, now(), now()),
    (v_q_id, 'Testing whether network cables reach the boundary of an office', false, 3, now(), now()),
    (v_q_id, 'Analyzing the financial limits of a project budget', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'For an input range $1 \le X \le 50$, what are the standard 2-boundary BVA test values?', 'Standard BVA tests: Just below min (0), Min (1), Just above min (2), Just below max (49), Max (50), Just above max (51).',
    'medium', 1, 0, 21, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '0, 1, 2, 49, 50, 51', true, 1, now(), now()),
    (v_q_id, '1, 25, 50', false, 2, now(), now()),
    (v_q_id, '0, 50, 100', false, 3, now(), now()),
    (v_q_id, '-1, 1, 50, 52', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Robustness Boundary Value Analysis?', 'Robustness testing specifically pushes values just outside boundaries to verify defensive error handling and exception trapping.',
    'medium', 1, 0, 22, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing beyond standard boundaries by explicitly testing extreme invalid values (e.g., $X_{\min} - 1$ and $X_{\max} + 1$)', true, 1, now(), now()),
    (v_q_id, 'Testing whether computer hardware can survive being dropped', false, 2, now(), now()),
    (v_q_id, 'Testing software with very large font sizes', false, 3, now(), now()),
    (v_q_id, 'Running tests on rugged industrial laptops', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Decision Table Testing?', 'Decision tables systematically list all combinations of conditions ($2^n$) to guarantee no conditional branch or policy rule is overlooked.',
    'medium', 1, 0, 23, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A black-box technique that tabulates complex combinations of input conditions and their resulting business actions in a matrix format', true, 1, now(), now()),
    (v_q_id, 'A meeting table where managers make decisions', false, 2, now(), now()),
    (v_q_id, 'A database table that stores user decisions', false, 3, now(), now()),
    (v_q_id, 'A flowchart drawn on an office whiteboard', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is State Transition Testing?', 'Essential for systems with clear historical states (e.g., ATM transactions: Card Inserted $\to$ PIN Entered $\to$ Authenticated).',
    'medium', 1, 0, 24, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A black-box testing technique that models a system as a Finite State Machine (FSM) to verify states, transitions, inputs, and actions', true, 1, now(), now()),
    (v_q_id, 'Testing whether water changes from liquid to ice in a simulation', false, 2, now(), now()),
    (v_q_id, 'Testing a computer when moving between different rooms', false, 3, now(), now()),
    (v_q_id, 'Upgrading an operating system from Windows 10 to 11', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a State Transition Matrix?', 'Helps testers identify both valid state transitions and illegal transitions (e.g., dispensing cash before PIN authentication).',
    'medium', 1, 0, 25, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A 2D table listing current states along one axis and input events along the other, showing the resulting next states', true, 1, now(), now()),
    (v_q_id, 'A mathematical matrix used in 3D computer graphics', false, 2, now(), now()),
    (v_q_id, 'A spreadsheet tracking employee salaries', false, 3, now(), now()),
    (v_q_id, 'A network routing table in routers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Use Case Testing?', 'Validates end-to-end user workflows, business process flows, and exceptional alternate paths from an actor''s operational perspective.',
    'easy', 1, 0, 26, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A black-box testing technique that derives test cases from business use cases describing interactions between actors and the system', true, 1, now(), now()),
    (v_q_id, 'Testing whether software can be used for playing music', false, 2, now(), now()),
    (v_q_id, 'Testing software that is used by police departments', false, 3, now(), now()),
    (v_q_id, 'A legal case involving software patent infringement', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Gray Box Testing?', 'Testers design tests from the outside (black box) but use internal architectural knowledge (database schemas, logs) to verify state changes.',
    'easy', 1, 0, 27, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A hybrid testing technique where the tester has partial knowledge of internal data structures, database schemas, or architecture', true, 1, now(), now()),
    (v_q_id, 'Testing computers painted gray', false, 2, now(), now()),
    (v_q_id, 'Testing software during stormy weather', false, 3, now(), now()),
    (v_q_id, 'An outdated testing methodology discontinued in 1990', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In database-driven web applications, how is Gray Box Testing typically utilized?', 'The tester interacts with the black-box UI, but verifies white-box backend database states, foreign key integrity, and stored procedure executions.',
    'medium', 1, 0, 28, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Submitting forms via the public web GUI and directly executing SQL queries on the backend database to verify data integrity and storage', true, 1, now(), now()),
    (v_q_id, 'Writing SQL queries using a text editor', false, 2, now(), now()),
    (v_q_id, 'Deleting the database to see if the website crashes', false, 3, now(), now()),
    (v_q_id, 'Formatting hard drives in data centers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Unit Testing?', 'Unit tests isolate atomic functions, mocking out external dependencies (databases, networks) to verify core algorithmic correctness.',
    'easy', 1, 0, 29, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The testing of individual software components, methods, or modules in isolation from the rest of the application', true, 1, now(), now()),
    (v_q_id, 'Testing whether an entire company works together as a unit', false, 2, now(), now()),
    (v_q_id, 'Testing a single computer monitor', false, 3, now(), now()),
    (v_q_id, 'Testing whether software runs for one unit of time', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Test Driver in integration testing?', 'Used in Bottom-Up integration testing to simulate higher-level calling modules that have not yet been developed.',
    'medium', 1, 0, 30, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A dummy test harness or calling program that invokes a module under test and passes test arguments to it', true, 1, now(), now()),
    (v_q_id, 'A device driver that controls computer hardware like printers', false, 2, now(), now()),
    (v_q_id, 'A person who drives delivery trucks for a computer company', false, 3, now(), now()),
    (v_q_id, 'A software program that speeds up computer processors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Test Stub in integration testing?', 'Used in Top-Down integration testing to simulate subordinate modules that have not yet been coded.',
    'medium', 1, 0, 31, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A dummy mock program that simulates the behavior of a lower-level module called by the unit under test, returning hardcoded responses', true, 1, now(), now()),
    (v_q_id, 'A short pencil used during manual testing', false, 2, now(), now()),
    (v_q_id, 'A broken computer cable', false, 3, now(), now()),
    (v_q_id, 'A receipt given when purchasing software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Top-Down Integration Testing?', 'Validates major high-level architectural control logic and user interfaces early; requires writing numerous dummy stubs.',
    'medium', 1, 0, 32, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An incremental integration strategy where testing begins with the top-level control module, using stubs for lower-level unbuilt modules', true, 1, now(), now()),
    (v_q_id, 'Testing from the top floor of an office building down to the basement', false, 2, now(), now()),
    (v_q_id, 'Writing code from top to bottom of a file', false, 3, now(), now()),
    (v_q_id, 'Testing the most expensive computers first', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Bottom-Up Integration Testing?', 'Simplifies test creation because drivers are easier to write than complex stubs; however, high-level architectural flaws are discovered late.',
    'medium', 1, 0, 33, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An incremental integration strategy that begins by testing primitive leaf-level modules first, using drivers to invoke them', true, 1, now(), now()),
    (v_q_id, 'Testing from the basement of an office building up to the roof', false, 2, now(), now()),
    (v_q_id, 'Writing code from bottom to top', false, 3, now(), now()),
    (v_q_id, 'Testing low-cost software before expensive software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Sandwich (Hybrid) Integration Testing?', 'Optimizes engineering velocity by allowing UI teams (Top-Down) and database/core teams (Bottom-Up) to integrate concurrently.',
    'medium', 1, 0, 34, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A combination of Top-Down and Bottom-Up integration testing, where a middle target layer is chosen and testing converges from both directions', true, 1, now(), now()),
    (v_q_id, 'Testing software while eating a sandwich in an office', false, 2, now(), now()),
    (v_q_id, 'Testing software sandwiched between two firewalls', false, 3, now(), now()),
    (v_q_id, 'Testing software on three computers simultaneously', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Big-Bang Integration Testing?', 'Not recommended for complex systems: when failures occur, pinpointing which specific module or interface caused the crash is extremely difficult.',
    'easy', 1, 0, 35, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A non-incremental strategy where all developed modules are combined simultaneously into a single build and tested all at once', true, 1, now(), now()),
    (v_q_id, 'Testing an explosion simulation software program', false, 2, now(), now()),
    (v_q_id, 'Testing software during a thunderstorm', false, 3, now(), now()),
    (v_q_id, 'The creation of the universe in physics', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Regression Testing?', 'Guarantees that fixing Bug A does not inadvertently introduce Bug B into an unrelated, previously working module.',
    'easy', 1, 0, 36, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Re-running existing functional and non-functional tests to ensure that recent code modifications or bug fixes have not broken existing functionality', true, 1, now(), now()),
    (v_q_id, 'Testing whether software can run backwards', false, 2, now(), now()),
    (v_q_id, 'A statistical technique used in data science', false, 3, now(), now()),
    (v_q_id, 'Testing software on older computers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Smoke Test (Build Verification Test)?', 'If the smoke test fails (e.g., application won''t launch or login crashes), the build is rejected immediately, saving QA team time.',
    'easy', 1, 0, 37, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A rapid, automated preliminary test suite executed on every new build to verify that vital core features function before handing over to QA', true, 1, now(), now()),
    (v_q_id, 'Testing whether a computer catches fire when turned on', false, 2, now(), now()),
    (v_q_id, 'Testing smoke detectors in office ceilings', false, 3, now(), now()),
    (v_q_id, 'A test that produces smoke on the screen', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Sanity Test?', 'Unlike wide smoke tests, sanity tests are narrow and deep, validating only the specific bug fix and closely adjacent components.',
    'medium', 1, 0, 38, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A narrow, focused test performed after receiving a minor bug fix to verify that the reported defect has been resolved without full regression', true, 1, now(), now()),
    (v_q_id, 'A mental health evaluation given to software testers', false, 2, now(), now()),
    (v_q_id, 'A test to verify whether a computer is operating sensibly', false, 3, now(), now()),
    (v_q_id, 'Testing software without getting angry', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between Smoke Testing and Sanity Testing?', 'Smoke tests assess overall build stability for QA readiness; sanity tests verify a specific defect resolution before release.',
    'medium', 1, 0, 39, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Smoke testing is wide and shallow across all core modules; Sanity testing is narrow and deep on a specific bug-fix module', true, 1, now(), now()),
    (v_q_id, 'Smoke testing is manual; Sanity testing is automated', false, 2, now(), now()),
    (v_q_id, 'Smoke testing is for hardware; Sanity testing is for software', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Acceptance Testing?', 'The final phase of testing before production deployment, proving the system meets contractual and operational business requirements.',
    'easy', 1, 0, 40, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Formal testing conducted to determine whether a software system satisfies its acceptance criteria and enables clients to accept the delivery', true, 1, now(), now()),
    (v_q_id, 'Accepting that software always has bugs', false, 2, now(), now()),
    (v_q_id, 'A company accepting job applications from testers', false, 3, now(), now()),
    (v_q_id, 'Testing whether a credit card is accepted online', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Alpha Testing?', 'Alpha testing occurs before public release, allowing internal teams to catch critical defects in a controlled laboratory setting.',
    'easy', 1, 0, 41, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Internal acceptance testing conducted by company employees and QA staff at the developer''s site in a controlled staging environment', true, 1, now(), now()),
    (v_q_id, 'Testing the first Greek letter in an alphabet app', false, 2, now(), now()),
    (v_q_id, 'Testing conducted by senior executives only', false, 3, now(), now()),
    (v_q_id, 'Testing performed on animals', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Beta Testing?', 'Beta testing exposes the software to diverse user environments, hardware configurations, and unexpected real-world usage patterns.',
    'easy', 1, 0, 42, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'External testing conducted by real end-users at their own locations in uncontrolled real-world operational environments', true, 1, now(), now()),
    (v_q_id, 'Testing the second Greek letter in an alphabet app', false, 2, now(), now()),
    (v_q_id, 'Testing conducted strictly by computer programmers', false, 3, now(), now()),
    (v_q_id, 'Testing performed only in laboratories', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is User Acceptance Testing (UAT)?', 'UAT provides business stakeholders with final sign-off authority before authorizing enterprise rollout.',
    'easy', 1, 0, 43, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing conducted by end-users or clients to verify that the software delivers the required business workflows and value', true, 1, now(), now()),
    (v_q_id, 'Testing whether users are friendly to each other', false, 2, now(), now()),
    (v_q_id, 'A test measuring user typing speed', false, 3, now(), now()),
    (v_q_id, 'A test given to job applicants', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Operational Acceptance Testing (OAT)?', 'OAT verifies that system administrators and DevOps teams can operate, monitor, backup, and restore the software reliably in production.',
    'medium', 1, 0, 44, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing system administration, backup/restore, disaster recovery, failover, and maintenance procedures before production release', true, 1, now(), now()),
    (v_q_id, 'Testing whether surgeons can use software in hospital operating rooms', false, 2, now(), now()),
    (v_q_id, 'Testing how many operations a computer executes per second', false, 3, now(), now()),
    (v_q_id, 'Testing financial office operations', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Compatibility Testing?', 'Ensures consistent behavior across Windows, macOS, Android, iOS, Chrome, Safari, and diverse display resolutions.',
    'easy', 1, 0, 45, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Evaluating whether an application functions correctly across different hardware architectures, operating systems, browsers, and network environments', true, 1, now(), now()),
    (v_q_id, 'Testing whether two employees are compatible coworkers', false, 2, now(), now()),
    (v_q_id, 'Testing whether a software program can fall in love', false, 3, now(), now()),
    (v_q_id, 'A psychological personality quiz', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Localization Testing (L10n) vs Internationalization Testing (I18n)?', 'Internationalization adapts the core engine for global use; Localization verifies the specific translation (e.g., Hindi, Japanese, right-to-left Arabic).',
    'medium', 1, 0, 46, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'I18n tests that the software architecture supports global languages and formats without code changes; L10n tests specific local cultural translations, currencies, and dates', true, 1, now(), now()),
    (v_q_id, 'They are identical in every way', false, 2, now(), now()),
    (v_q_id, 'I18n is for Europe; L10n is for Asia', false, 3, now(), now()),
    (v_q_id, 'I18n is for hardware; L10n is for software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Accessibility Testing (Section 508 / WCAG)?', 'Evaluates compatibility with screen readers (NVDA, JAWS), keyboard-only navigation, color contrast ratios, and text alternatives.',
    'easy', 1, 0, 47, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Verifying that a software application can be comfortably navigated and used by people with disabilities (visual, auditory, motor, cognitive impairments)', true, 1, now(), now()),
    (v_q_id, 'Testing whether an office building has wheelchair ramps', false, 2, now(), now()),
    (v_q_id, 'Testing whether software is accessible from home over VPN', false, 3, now(), now()),
    (v_q_id, 'Testing how fast a website loads on mobile phones', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Compliance / Regulatory Testing?', 'Prevents multi-million-dollar fines and criminal liability by validating compliance with healthcare, financial, and privacy laws.',
    'medium', 1, 0, 48, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Verifying that software adheres to external legal regulations, industry standards, and data protection mandates (e.g., HIPAA, GDPR, PCI-DSS)', true, 1, now(), now()),
    (v_q_id, 'Testing whether employees follow company dress codes', false, 2, now(), now()),
    (v_q_id, 'Testing whether software passes government tax audits', false, 3, now(), now()),
    (v_q_id, 'A driving license test for delivery trucks', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Concurrency Testing in multi-user applications?', 'Uncovers race conditions, lost updates, and database deadlocks that only occur under simultaneous parallel transactions.',
    'medium', 1, 0, 49, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing system stability, data integrity, and transactional isolation when multiple users access the exact same records simultaneously', true, 1, now(), now()),
    (v_q_id, 'Testing two different software programs at the same time', false, 2, now(), now()),
    (v_q_id, 'Testing software while listening to music', false, 3, now(), now()),
    (v_q_id, 'Testing computers connected to the same electrical outlet', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary role of a ''Traceability Matrix'' (RTM - Requirements Traceability Matrix)?', 'The RTM proves that every single business requirement has corresponding test cases and ensures zero orphaned features exist.',
    'easy', 1, 0, 50, ARRAY['BCA-441E', 'Unit-2', 'BCA-441E-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A document that maps and traces user requirements forward to test cases and backward to code implementations, proving 100% test coverage', true, 1, now(), now()),
    (v_q_id, 'A matrix used in linear algebra mathematics', false, 2, now(), now()),
    (v_q_id, 'A spreadsheet tracking employee vacation days', false, 3, now(), now()),
    (v_q_id, 'A tool for tracing stolen laptop hardware', false, 4, now(), now());

END $SEEDED_BLOCK$;
