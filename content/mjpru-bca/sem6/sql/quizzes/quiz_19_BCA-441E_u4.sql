DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-441E Unit 4 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'BCA-441E Unit 4: Software Testing Strategies and Software Metrics Practice Quiz (50 MCQs)', 'bca-441e-u4-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-441E Unit 4. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
    60, 'published', true, 4, now(), now()
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
    v_quiz_id, 'single', 'What is the primary objective of System Testing in the software testing hierarchy?', 'System testing treats the software as an integrated whole, validating end-to-end workflows, security, recovery, and performance.',
    'easy', 1, 0, 1, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Evaluating the complete, fully integrated software system against high-level specified business and functional requirements', true, 1, now(), now()),
    (v_q_id, 'Testing individual C++ functions in isolation', false, 2, now(), now()),
    (v_q_id, 'Testing whether hardware cables fit into wall sockets', false, 3, now(), now()),
    (v_q_id, 'Testing how fast a developer can type code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Software Testing Pyramid popularized by Mike Cohn?', 'Unit tests are cheap and fast; UI tests are slow and brittle. The pyramid ensures rapid developer feedback and low maintenance overhead.',
    'easy', 1, 0, 2, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A visual model showing that test suites should have a broad base of fast Unit Tests, a middle layer of Service/API Tests, and a narrow apex of UI/E2E Tests', true, 1, now(), now()),
    (v_q_id, 'A geometric pyramid built by ancient Egyptians', false, 2, now(), now()),
    (v_q_id, 'A management structure with a CEO at the top', false, 3, now(), now()),
    (v_q_id, 'A model advocating 100% manual testing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary drawback of an Inverted Testing Pyramid (''Ice Cream Cone'' Anti-Pattern)?', 'When teams neglect unit tests and rely solely on UI regression, testing takes hours or days to run and constantly breaks due to minor cosmetic changes.',
    'medium', 1, 0, 3, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Massive reliance on brittle, slow, expensive manual/UI tests at the top with virtually no automated unit tests, leading to long release cycles and high bug leakage', true, 1, now(), now()),
    (v_q_id, 'The tests taste too sweet like ice cream', false, 2, now(), now()),
    (v_q_id, 'The software code file becomes upside down', false, 3, now(), now()),
    (v_q_id, 'It requires freezing computer hardware in ice', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Agile Testing?', 'Testers, developers, and product owners collaborate in 2-week sprints, preventing defects rather than inspecting for them at the end.',
    'easy', 1, 0, 4, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A collaborative testing practice that follows agile software principles, integrating testing continuously throughout iterations rather than as a separate post-coding phase', true, 1, now(), now()),
    (v_q_id, 'Testing while running around an office building', false, 2, now(), now()),
    (v_q_id, 'Testing software developed by sports athletes', false, 3, now(), now()),
    (v_q_id, 'Testing software very quickly without thinking', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Test-Driven Development (TDD) and its three-phase cycle?', 'TDD forces modular architecture and comprehensive test coverage from the very first line of production code.',
    'easy', 1, 0, 5, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Red (Write a failing test) -> Green (Write minimal code to pass) -> Refactor (Clean code while keeping tests green)', true, 1, now(), now()),
    (v_q_id, 'Plan -> Code -> Pray', false, 2, now(), now()),
    (v_q_id, 'Write code -> Deploy -> Fix bugs in production', false, 3, now(), now()),
    (v_q_id, 'Design -> Test -> Delete code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Behavior-Driven Development (BDD)?', 'BDD frameworks (Cucumber, SpecFlow) enable business stakeholders and developers to share an unambiguous living specification.',
    'easy', 1, 0, 6, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An agile methodology where software behavior is specified in collaborative, human-readable natural language using the Gherkin syntax (Given-When-Then)', true, 1, now(), now()),
    (v_q_id, 'Testing the psychological behavior of software engineers', false, 2, now(), now()),
    (v_q_id, 'A tool for disciplining unruly developers', false, 3, now(), now()),
    (v_q_id, 'A training program for guide dogs', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In BDD Gherkin syntax, what do `Given`, `When`, and `Then` represent?', '`Given a logged-in student, When they complete a quiz, Then their score is saved and leaderboard is updated.`',
    'easy', 1, 0, 7, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`Given` = Preconditions/Context; `When` = Action/Event; `Then` = Expected Outcome/Assertion', true, 1, now(), now()),
    (v_q_id, '`Given` = Past; `When` = Present; `Then` = Future', false, 2, now(), now()),
    (v_q_id, '`Given` = Input; `When` = Processing; `Then` = Storage', false, 3, now(), now()),
    (v_q_id, '`Given` = Code; `When` = Compile; `Then` = Deploy', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Software Metric in software engineering?', 'Metrics provide objective visibility into quality, productivity, complexity, defect density, and readiness for release.',
    'easy', 1, 0, 8, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A quantitative measure of the degree to which a software system, component, or process possesses a given property', true, 1, now(), now()),
    (v_q_id, 'A ruler used to measure computer screens in centimeters', false, 2, now(), now()),
    (v_q_id, 'A formula for calculating electrical voltage', false, 3, now(), now()),
    (v_q_id, 'A software program developed in Europe', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Defect Density and how is it mathematically formulated?', 'Allows comparative quality benchmarking across software projects of disparate sizes (e.g., 2.5 defects per 1,000 lines of code).',
    'medium', 1, 0, 9, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '$$\text{Defect Density} = \frac{\text{Total Confirmed Defects}}{\text{Size in KLOC or Function Points}}$$', true, 1, now(), now()),
    (v_q_id, 'Defect Density = Bugs multiplied by lines of code', false, 2, now(), now()),
    (v_q_id, 'Defect Density = Number of developers divided by testers', false, 3, now(), now()),
    (v_q_id, 'Defect Density = Time taken to fix a bug', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Maurice Halstead''s Software Science (1977) metric suite based on?', 'Halstead treats code as an algorithmic text, calculating Program Length, Vocabulary, Volume, Difficulty, and Development Effort.',
    'medium', 1, 0, 10, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Four primitive counts: distinct operators ($\eta_1$), distinct operands ($\eta_2$), total operators ($N_1$), and total operands ($N_2$)', true, 1, now(), now()),
    (v_q_id, 'The number of hours a programmer sleeps', false, 2, now(), now()),
    (v_q_id, 'The number of lines of comments in code', false, 3, now(), now()),
    (v_q_id, 'The price of the computer hardware', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Halstead Metrics, what is Program Vocabulary ($\eta$)?', 'Represents the total unique tokens that a programmer must comprehend to understand the program implementation.',
    'medium', 1, 0, 11, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '$$\eta = \eta_1 + \eta_2$$ (The sum of distinct operators and distinct operands)', true, 1, now(), now()),
    (v_q_id, 'The list of words known by a developer', false, 2, now(), now()),
    (v_q_id, 'The number of English dictionary words in comments', false, 3, now(), now()),
    (v_q_id, 'The total lines of source code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Halstead Metrics, what is Program Volume ($V$)?', 'Volume represents the minimal number of binary bits required to encode the algorithm in memory.',
    'hard', 1, 0, 12, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '$$V = N \times \log_2(\eta)$$ where $N = N_1 + N_2$ and $\eta = \eta_1 + \eta_2$', true, 1, now(), now()),
    (v_q_id, 'The loudness of audio speakers connected to a computer', false, 2, now(), now()),
    (v_q_id, 'The physical cubic size of a computer chassis', false, 3, now(), now()),
    (v_q_id, 'The total megabytes of software installed on disk', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Halstead Metrics, what is Program Difficulty ($D$)?', 'Measures the cognitive effort required to write or understand the program, proportional to operator diversity and operand reuse.',
    'hard', 1, 0, 13, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '$$D = \left(\frac{\eta_1}{2}\right) \times \left(\frac{N_2}{\eta_2}\right)$$', true, 1, now(), now()),
    (v_q_id, 'How hard an exam was for students', false, 2, now(), now()),
    (v_q_id, 'The number of bugs found in a module', false, 3, now(), now()),
    (v_q_id, 'The salary required by a developer', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Halstead Metrics, how is Development Effort ($E$) calculated?', 'Represents the mental effort and cognitive discriminatory operations required to implement the algorithm.',
    'medium', 1, 0, 14, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '$$E = D \times V$$ (Difficulty multiplied by Volume)', true, 1, now(), now()),
    (v_q_id, 'Effort = Lines of code multiplied by hours worked', false, 2, now(), now()),
    (v_q_id, 'Effort = Number of developers in a company', false, 3, now(), now()),
    (v_q_id, 'Effort = Total bugs fixed in a sprint', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the Chidamber & Kemerer (C&K) Object-Oriented Metrics?', 'The C&K metrics quantitatively measure inheritance depth, coupling, and class cohesion in object-oriented codebases.',
    'hard', 1, 0, 15, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A standardized suite of metrics measuring OO software complexity: WMC, DIT, NOC, CBO, RFC, and LCOM', true, 1, now(), now()),
    (v_q_id, 'A programming language developed in 1994', false, 2, now(), now()),
    (v_q_id, 'A set of rules for naming Java variables', false, 3, now(), now()),
    (v_q_id, 'A legal contract for hiring software engineers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In C&K Metrics, what is Weighted Methods per Class (WMC)?', 'High WMC flags a ''God Class'' that attempts to do too much, violating the Single Responsibility Principle and increasing defect rates.',
    'medium', 1, 0, 16, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The sum of the cyclomatic complexities of all methods declared in a class', true, 1, now(), now()),
    (v_q_id, 'The physical weight of the source code file on disk', false, 2, now(), now()),
    (v_q_id, 'The number of static methods in a class', false, 3, now(), now()),
    (v_q_id, 'The number of times a class is called by other classes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In C&K Metrics, what is Depth of Inheritance Tree (DIT)?', 'Deep inheritance trees ($DIT > 5$) increase code reuse but severely inflate cognitive complexity and make unit testing difficult.',
    'medium', 1, 0, 17, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The maximum architectural path length from a given class to the root ancestor class in the inheritance hierarchy', true, 1, now(), now()),
    (v_q_id, 'The age of an oak tree in an office garden', false, 2, now(), now()),
    (v_q_id, 'The number of folders in a software project', false, 3, now(), now()),
    (v_q_id, 'The number of subclasses in a program', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In C&K Metrics, what is Coupling Between Object Classes (CBO)?', 'High CBO indicates tight coupling, reducing modularity, making unit test isolation painful, and increasing ripple-effect regressions.',
    'medium', 1, 0, 18, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The number of other classes to which a given class is coupled (uses methods or instance variables of)', true, 1, now(), now()),
    (v_q_id, 'Two classes that have identical names', false, 2, now(), now()),
    (v_q_id, 'Classes written by the same developer', false, 3, now(), now()),
    (v_q_id, 'The speed of message passing between classes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In C&K Metrics, what is Lack of Cohesion in Methods (LCOM)?', 'High LCOM suggests that a class is performing disparate, unrelated responsibilities and should be refactored into smaller classes.',
    'medium', 1, 0, 19, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A measure of the degree to which methods in a class share access to the same instance variables', true, 1, now(), now()),
    (v_q_id, 'A class that has no comments', false, 2, now(), now()),
    (v_q_id, 'Methods that have syntax errors', false, 3, now(), now()),
    (v_q_id, 'A class written in multiple programming languages', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mean Time Between Failures (MTBF)?', 'The universal reliability engineering metric combining Mean Time to Failure (MTTF) and Mean Time to Repair (MTTR).',
    'easy', 1, 0, 20, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '$$\text{MTBF} = \text{MTTF} + \text{MTTR}$$ (The average operational time between consecutive system failures)', true, 1, now(), now()),
    (v_q_id, 'The time it takes to restart a computer', false, 2, now(), now()),
    (v_q_id, 'The average time a developer works before taking a break', false, 3, now(), now()),
    (v_q_id, 'The frequency of office fire drills', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mean Time to Repair (MTTR)?', 'DevOps and SRE teams focus on minimizing MTTR through automated container self-healing, rolling deployments, and observability.',
    'easy', 1, 0, 21, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The average clock time required to diagnose, patch, and restore a failed system back to full operational status', true, 1, now(), now()),
    (v_q_id, 'The time it takes to buy replacement hardware', false, 2, now(), now()),
    (v_q_id, 'The duration of an employee warranty', false, 3, now(), now()),
    (v_q_id, 'The time taken to install an update', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is System Availability ($A$) formulated mathematically from reliability metrics?', 'Demonstrates that high availability can be achieved either by building ultra-reliable software (high MTTF) or by automating instantaneous recovery (near-zero MTTR).',
    'medium', 1, 0, 22, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '$$A = \frac{\text{MTTF}}{\text{MTTF} + \text{MTTR}} = \frac{\text{MTTF}}{\text{MTBF}}$$', true, 1, now(), now()),
    (v_q_id, 'Availability = Total hours worked divided by days', false, 2, now(), now()),
    (v_q_id, 'Availability = Uptime multiplied by downtime', false, 3, now(), now()),
    (v_q_id, 'Availability = Total server memory in gigabytes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Software Reliability Growth Model (SRGM)?', 'SRGMs allow project managers to statistically predict how many more weeks of testing are required before the software achieves target release reliability.',
    'hard', 1, 0, 23, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A mathematical model (e.g., Jelinski-Moranda, Goel-Okumoto) that forecasts the decline in software failure rate as defects are discovered and removed over testing time', true, 1, now(), now()),
    (v_q_id, 'A business plan for expanding software sales', false, 2, now(), now()),
    (v_q_id, 'A chart showing employee salary increases', false, 3, now(), now()),
    (v_q_id, 'A software program that upgrades itself', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the Jelinski-Moranda SRGM, what is the core assumption?', '$$\lambda(t) = \phi [N - (i - 1)]$$; models software hardening as a Poisson process where failures become exponentially rarer over time.',
    'hard', 1, 0, 24, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Software contains a fixed number of initial faults $N$, and each fault removed reduces the hazard failure rate by an equal constant amount $\phi$', true, 1, now(), now()),
    (v_q_id, 'All bugs are caused by hardware defects', false, 2, now(), now()),
    (v_q_id, 'Software bugs grow like biological bacteria', false, 3, now(), now()),
    (v_q_id, 'Testing never eliminates any bugs', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Code Churn in software development analytics?', 'High code churn right before a release indicates architectural instability and strongly correlates with high production defect rates.',
    'medium', 1, 0, 25, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The rate at which lines of code are added, modified, or deleted within a codebase over a specified period', true, 1, now(), now()),
    (v_q_id, 'A machine used to make butter in agriculture', false, 2, now(), now()),
    (v_q_id, 'A database deleting corrupted records', false, 3, now(), now()),
    (v_q_id, 'The number of developers resigning from a team', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Test Execution Velocity in agile metrics?', 'Tracks whether test automation execution is keeping pace with rapid developer commit velocity.',
    'easy', 1, 0, 26, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The number of test cases executed by the QA team or CI/CD pipeline within a given time interval (e.g., tests passed per hour or per sprint)', true, 1, now(), now()),
    (v_q_id, 'The speed of the computer processor running tests', false, 2, now(), now()),
    (v_q_id, 'The speed of typing test cases on a keyboard', false, 3, now(), now()),
    (v_q_id, 'The download speed of test automation tools', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Defect Leakage Rate?', 'A critical KPI for QA teams; high leakage indicates inadequate test coverage, stale test cases, or flawed staging environments.',
    'medium', 1, 0, 27, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The percentage of defects that escaped internal QA testing and were discovered by end-users in production: $\frac{\text{Defects in Prod}}{\text{Total Defects}} \times 100\%$', true, 1, now(), now()),
    (v_q_id, 'Water leaking onto computer hardware', false, 2, now(), now()),
    (v_q_id, 'A computer memory leak causing a crash', false, 3, now(), now()),
    (v_q_id, 'Stealing confidential company software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Defect Age (Bug Dwell Time) metric?', 'Lowering defect age through continuous automated testing prevents bugs from becoming deeply entrenched across dependent modules.',
    'medium', 1, 0, 28, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The duration of time between when a defect is first introduced into the codebase and when it is finally detected and fixed', true, 1, now(), now()),
    (v_q_id, 'The age of the developer who wrote the bug', false, 2, now(), now()),
    (v_q_id, 'How long a software company has been in business', false, 3, now(), now()),
    (v_q_id, 'The copyright expiration date of software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Test Case Effectiveness (TCE)?', 'Measures how effectively a test suite uncovers defects before release.',
    'medium', 1, 0, 29, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '$$\text{TCE} = \frac{\text{Defects Found by Tests}}{\text{Defects Found by Tests} + \text{Defects Missed}} \times 100\%$$', true, 1, now(), now()),
    (v_q_id, 'The speed at which a test case runs', false, 2, now(), now()),
    (v_q_id, 'The number of words in a test case document', false, 3, now(), now()),
    (v_q_id, 'The price of writing a test case', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Code Coverage vs Requirements Coverage?', 'A test suite can achieve 100% code coverage while having 50% requirements coverage if half of the required business features were never coded.',
    'medium', 1, 0, 30, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Code coverage measures physical lines/branches of code executed; Requirements coverage measures percentage of functional specifications tested', true, 1, now(), now()),
    (v_q_id, 'They are identical in every way', false, 2, now(), now()),
    (v_q_id, 'Code coverage is for managers; Requirements coverage is for programmers', false, 3, now(), now()),
    (v_q_id, 'Code coverage only applies to Python', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Branch Coverage Target standard in safety-critical systems (e.g., ISO 26262 ASIL-B/C)?', 'Automotive and industrial functional safety standards mandate 100% statement and branch coverage for safety-critical components.',
    'easy', 1, 0, 31, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '100% Branch Coverage (every decision branch must be proven tested)', true, 1, now(), now()),
    (v_q_id, '50% Branch Coverage', false, 2, now(), now()),
    (v_q_id, 'Branch coverage is not required for safety', false, 3, now(), now()),
    (v_q_id, '10% Branch Coverage', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mean Time to Detect (MTTD)?', 'Lowering MTTD through real-time APM telemetry (Datadog, Prometheus) allows teams to contain outages before broad customer impact.',
    'easy', 1, 0, 32, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The average time that elapses between when a security incident or software defect occurs and when it is detected by monitoring or QA systems', true, 1, now(), now()),
    (v_q_id, 'The time it takes to read an email', false, 2, now(), now()),
    (v_q_id, 'The time taken to write a software program', false, 3, now(), now()),
    (v_q_id, 'The lifespan of a computer monitor', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mean Time to Acknowledge (MTTA)?', 'Tracks incident response team alertness and prevents on-call alert fatigue.',
    'easy', 1, 0, 33, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The average time between when an automated system alert is triggered and when an engineering responder acknowledges and begins investigating it', true, 1, now(), now()),
    (v_q_id, 'The time it takes to say thank you', false, 2, now(), now()),
    (v_q_id, 'The time taken to sign a business contract', false, 3, now(), now()),
    (v_q_id, 'The duration of an office meeting', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Test Suite Flakiness Rate in CI/CD pipelines?', 'High flakiness ($> 2\%$) erodes developer trust, causing teams to ignore CI build failures and merge breaking code.',
    'medium', 1, 0, 34, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The percentage of automated test runs that fail spuriously due to timing, network, or test environment issues rather than true code bugs', true, 1, now(), now()),
    (v_q_id, 'The number of pastry recipes found online', false, 2, now(), now()),
    (v_q_id, 'The percentage of tests that pass on the first try', false, 3, now(), now()),
    (v_q_id, 'The speed of the network router', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Regression Test Selection (RTS)?', 'RTS slashes CI build duration from hours to minutes while retaining 100% safety against regression bugs.',
    'hard', 1, 0, 35, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Algorithms that analyze code modifications in a pull request and dynamically execute only the subset of tests whose execution paths intersect the modified code', true, 1, now(), now()),
    (v_q_id, 'Selecting tests at random from a hat', false, 2, now(), now()),
    (v_q_id, 'Running all 10,000 tests on every commit', false, 3, now(), now()),
    (v_q_id, 'Deleting tests that fail', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Test Case Prioritization (TCP)?', 'Maximizes the **Average Percentage of Faults Detected (APFD)**, providing developers with failure feedback in minutes.',
    'medium', 1, 0, 36, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Ordering test cases in an execution schedule such that tests with the highest historical failure rate and risk execute first', true, 1, now(), now()),
    (v_q_id, 'Running tests in alphabetical order', false, 2, now(), now()),
    (v_q_id, 'Letting the youngest developer choose which test to run', false, 3, now(), now()),
    (v_q_id, 'Running tests only on weekends', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the APFD (Average Percentage of Faults Detected) metric?', 'Higher APFD values ($0.8 - 0.95$) prove that a prioritization algorithm front-loads failing tests at the beginning of the CI run.',
    'hard', 1, 0, 37, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A quantitative metric measuring how rapidly a prioritized test suite uncovers defects during its execution run', true, 1, now(), now()),
    (v_q_id, 'The average price of fixing a bug', false, 2, now(), now()),
    (v_q_id, 'The percentage of developers who pass an exam', false, 3, now(), now()),
    (v_q_id, 'A formula for measuring computer screen brightness', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Burn-Down Chart in agile sprint testing?', 'Enables self-organizing teams to visualize whether sprint deliverables and testing activities are on track to complete by sprint end.',
    'easy', 1, 0, 38, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A publicly displayed graphical chart showing the remaining work (story points/tasks) versus time in a sprint', true, 1, now(), now()),
    (v_q_id, 'A chart showing how hot computer servers are running', false, 2, now(), now()),
    (v_q_id, 'A financial record of money spent on snacks', false, 3, now(), now()),
    (v_q_id, 'A chart showing how many computers were broken', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Velocity in agile team performance measurement?', 'Averages historical sprint completions to forecast how many user stories the team can realistically commit to in future sprints.',
    'easy', 1, 0, 39, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A metric measuring the amount of work (in story points) an agile team successfully delivers and tests during a single sprint', true, 1, now(), now()),
    (v_q_id, 'The physical speed of developers walking', false, 2, now(), now()),
    (v_q_id, 'The download speed of internet connections', false, 3, now(), now()),
    (v_q_id, 'The clock frequency of computer processors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Continuous Integration (CI)?', 'Pioneered by Extreme Programming: eliminates ''Merge Hell'' by verifying every single commit with automated builds and unit tests.',
    'easy', 1, 0, 40, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The practice of merging developer working copies to a shared mainline several times a day, accompanied by automated building and testing', true, 1, now(), now()),
    (v_q_id, 'Writing software continuously for 24 hours without sleeping', false, 2, now(), now()),
    (v_q_id, 'A continuous cable connecting two computers', false, 3, now(), now()),
    (v_q_id, 'A software program that runs forever', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Continuous Delivery (CD) vs Continuous Deployment?', 'Continuous Deployment achieves maximum agility: a commit that passes automated lint, unit, integration, and security gates goes live in production automatically.',
    'medium', 1, 0, 41, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Continuous Delivery automatically prepares every green build for production release with manual approval; Continuous Deployment automatically deploys directly to production with zero human intervention', true, 1, now(), now()),
    (v_q_id, 'They are identical in every way', false, 2, now(), now()),
    (v_q_id, 'Continuous Delivery is for hardware; Deployment is for software', false, 3, now(), now()),
    (v_q_id, 'Continuous Delivery is slower than Waterfall', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Static Code Quality Gate in CI/CD (e.g., SonarQube)?', 'Enforces uncompromised code quality standards programmatically, automatically rejecting pull requests that violate security or complexity rules.',
    'easy', 1, 0, 42, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A set of automated threshold conditions (e.g., 0 Blocker Bugs, $> 80\%$ Coverage, $< 3\%$ Duplication) that must pass before code can merge', true, 1, now(), now()),
    (v_q_id, 'A physical gate at a data center entrance', false, 2, now(), now()),
    (v_q_id, 'A password required to login to GitHub', false, 3, now(), now()),
    (v_q_id, 'A legal agreement between software companies', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Lead Time for Changes in DORA (DevOps Research and Assessment) metrics?', 'Elite DevOps performers achieve lead times of under 1 hour; low performers take months.',
    'medium', 1, 0, 43, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The amount of clock time it takes for a commit to go from being authored by a developer to running successfully in production', true, 1, now(), now()),
    (v_q_id, 'The time taken to purchase a computer', false, 2, now(), now()),
    (v_q_id, 'The duration of an office meeting', false, 3, now(), now()),
    (v_q_id, 'The time a manager takes to read an email', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Deployment Frequency in DORA metrics?', 'A primary indicator of software agility: deploying small batches frequently lowers release risk compared to monolithic annual releases.',
    'easy', 1, 0, 44, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'How often an organization successfully releases software to production (e.g., multiple times per day vs monthly)', true, 1, now(), now()),
    (v_q_id, 'The radio frequency of Wi-Fi routers', false, 2, now(), now()),
    (v_q_id, 'The frequency of computer processor clock cycles', false, 3, now(), now()),
    (v_q_id, 'How often employees attend conferences', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Change Failure Rate (CFR) in DORA metrics?', 'Elite organizations achieve CFR $< 5\%$, demonstrating that rapid release velocity does NOT sacrifice operational stability.',
    'medium', 1, 0, 45, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The percentage of deployments to production that fail, cause an outage, or require an immediate hotfix or rollback', true, 1, now(), now()),
    (v_q_id, 'The percentage of employees who change jobs', false, 2, now(), now()),
    (v_q_id, 'The rate at which computer hardware breaks down', false, 3, now(), now()),
    (v_q_id, 'The percentage of code lines modified during editing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Time to Restore Service (MTTR) in DORA metrics?', 'Elite teams restore service in $< 1\,\text{hour}$ using automated rollbacks, feature flag disabling, and container orchestration.',
    'easy', 1, 0, 46, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The time it takes to recover from a production failure or unplanned outage', true, 1, now(), now()),
    (v_q_id, 'The time taken to reinstall Windows on a PC', false, 2, now(), now()),
    (v_q_id, 'The time taken to restart an office Wi-Fi router', false, 3, now(), now()),
    (v_q_id, 'The lifespan of a computer monitor', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Static Application Profiling (Linting) vs Dynamic Analysis in SonarQube?', 'Combining static AST inspection with dynamic coverage reports provides complete multidimensional quality governance.',
    'medium', 1, 0, 47, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Static analysis inspects AST and control flow rules at compile time; Dynamic analysis measures test execution coverage and runtime memory traces', true, 1, now(), now()),
    (v_q_id, 'Static is manual; Dynamic is automated', false, 2, now(), now()),
    (v_q_id, 'Static is for Python; Dynamic is for Java', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Code Smell in software quality?', 'Coined by Kent Beck: smells are not bugs (code still works), but they degrade maintainability and increase future defect vulnerability.',
    'easy', 1, 0, 48, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A surface indication in code that usually corresponds to a deeper architectural problem or design flaw (e.g., Duplicate Code, Long Method, Large Class)', true, 1, now(), now()),
    (v_q_id, 'A physical odor emitted by computer hardware', false, 2, now(), now()),
    (v_q_id, 'A computer monitor that smells like smoke', false, 3, now(), now()),
    (v_q_id, 'A defect that causes software to delete files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Technical Debt in software engineering?', 'Coined by Ward Cunningham: like financial debt, technical debt accrues compound interest in the form of slower future development velocity until paid off.',
    'easy', 1, 0, 49, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The implied future cost of additional rework caused by choosing an easy, fast, or subpar technical shortcut now instead of a better architectural approach', true, 1, now(), now()),
    (v_q_id, 'Money owed to banks for purchasing computer hardware', false, 2, now(), now()),
    (v_q_id, 'The cost of paying software developer salaries', false, 3, now(), now()),
    (v_q_id, 'The electrical bill of a data center', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Cyclomatic Complexity Threshold in clean code governance?', 'Enforced by automated linters to prevent developers from writing sprawling, unmaintainable nested conditional statements.',
    'easy', 1, 0, 50, ARRAY['BCA-441E', 'Unit-4', 'BCA-441E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Limiting individual function cyclomatic complexity to a maximum of 10 to ensure modularity and ease of unit testing', true, 1, now(), now()),
    (v_q_id, 'Limiting code files to 10 bytes', false, 2, now(), now()),
    (v_q_id, 'Writing programs with only 10 variables', false, 3, now(), now()),
    (v_q_id, 'Allowing a program to run for only 10 seconds', false, 4, now(), now());

END $SEEDED_BLOCK$;
