DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-441E Unit 1 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '7387ca29-487c-5de1-be94-087257a4c1ae', 'BCA-441E Unit 1: Software Testing Fundamentals and Debugging Practice Quiz (50 MCQs)', 'bca-441e-u1-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-441E Unit 1. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
    60, 'published', true, 1, now(), now()
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
    v_quiz_id, 'single', 'According to IEEE Standard 610.12, what is the formal definition of Software Testing?', 'IEEE 610.12 defines testing as evaluating an item to discover deviations from requirements and assess quality attributes.',
    'easy', 1, 0, 1, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The process of analyzing a software item to detect differences between existing and required conditions and to evaluate its features', true, 1, now(), now()),
    (v_q_id, 'The process of writing computer code using a keyboard', false, 2, now(), now()),
    (v_q_id, 'The physical manufacturing of silicon microprocessors', false, 3, now(), now()),
    (v_q_id, 'The marketing and distribution of commercial software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the fundamental difference between an Error, a Defect (Bug), and a Failure?', 'A programmer commits an Error, creating a Defect/Bug in code. When executed, that defect causes a dynamic Failure.',
    'easy', 1, 0, 2, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An Error is a human mistake; a Defect is the flaw in code/document; a Failure is the observable deviation during runtime', true, 1, now(), now()),
    (v_q_id, 'They are exact synonyms in computer science', false, 2, now(), now()),
    (v_q_id, 'An Error is hardware; a Defect is software; a Failure is network', false, 3, now(), now()),
    (v_q_id, 'A Failure causes an Error which causes a Defect', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What did Edsger W. Dijkstra famously state regarding the limits of software testing?', 'Dijkstra emphasized that testing demonstrates where bugs exist, but cannot prove that zero hidden bugs remain.',
    'easy', 1, 0, 3, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '''Program testing can be used to show the presence of bugs, but never to show their absence!''', true, 1, now(), now()),
    (v_q_id, '''Testing guarantees 100% bug-free software if automated.''', false, 2, now(), now()),
    (v_q_id, '''Testing should only be performed by the developer who wrote the code.''', false, 3, now(), now()),
    (v_q_id, '''Compilers eliminate all software errors automatically.''', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary distinction between Verification and Validation (V&V)?', 'Verification ensures specifications and standards are met without code execution; Validation confirms the software satisfies genuine user requirements.',
    'easy', 1, 0, 4, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Verification asks ''Are we building the product right?'' (static checking); Validation asks ''Are we building the right product?'' (dynamic execution against user needs)', true, 1, now(), now()),
    (v_q_id, 'Verification is done by clients; Validation is done by developers', false, 2, now(), now()),
    (v_q_id, 'Verification is automated; Validation is manual', false, 3, now(), now()),
    (v_q_id, 'There is no difference between them', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the ''Pesticide Paradox'' in software testing (Boris Beizer)?', 'Bugs adapt to predictable test vectors; testers must regularly revise and diversify test cases to uncover new defect classes.',
    'medium', 1, 0, 5, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'If the same tests are repeated over and over, eventually the same test suite ceases to find new defects', true, 1, now(), now()),
    (v_q_id, 'Software bugs are caused by actual biological insects', false, 2, now(), now()),
    (v_q_id, 'Antivirus software deletes testing files', false, 3, now(), now()),
    (v_q_id, 'Testing tools degrade in performance after 30 days', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does the Cost of Quality (CoQ) escalate as a defect progresses through the SDLC?', 'Fixing a requirements defect costs trivial editing time; fixing that same defect in live production involves emergency patching, data repair, and legal liability.',
    'medium', 1, 0, 6, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Exponentially (detecting a bug in production can cost up to 100x more than catching it in requirements)', true, 1, now(), now()),
    (v_q_id, 'Linearly (costs exactly $10 per phase)', false, 2, now(), now()),
    (v_q_id, 'It decreases over time', false, 3, now(), now()),
    (v_q_id, 'It remains completely constant across all phases', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does Debugging differ fundamentally from Testing?', 'Testing finds the failure symptom; debugging is the investigative process of finding and fixing the exact faulty line of source code.',
    'easy', 1, 0, 7, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing is the systematic search for defects and failures; Debugging is the diagnostic activity to locate and remove the root cause in code', true, 1, now(), now()),
    (v_q_id, 'Testing is done by developers; Debugging is done by customers', false, 2, now(), now()),
    (v_q_id, 'Testing requires compilers; Debugging does not', false, 3, now(), now()),
    (v_q_id, 'There is no distinction', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Defect Clustering'' (The Pareto Principle in testing)?', 'Complex, poorly designed, or highly interconnected modules harbor the vast majority of application bugs.',
    'medium', 1, 0, 8, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Approximately 80% of software defects are concentrated in roughly 20% of the software modules', true, 1, now(), now()),
    (v_q_id, 'Defects naturally delete each other over time', false, 2, now(), now()),
    (v_q_id, 'All modules always contain exactly identical numbers of defects', false, 3, now(), now()),
    (v_q_id, 'Bugs only occur on Friday afternoons', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Exhaustive Testing and why is it practically impossible?', 'Combinatorial input spaces and asynchronous paths create trillions of execution permutations, making exhaustive testing mathematically infeasible.',
    'easy', 1, 0, 9, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing every possible combinatorial permutation of input data and execution paths; impossible due to infinite state spaces', true, 1, now(), now()),
    (v_q_id, 'Testing every computer in a company', false, 2, now(), now()),
    (v_q_id, 'Testing software for 24 hours without stopping', false, 3, now(), now()),
    (v_q_id, 'A test suite that has zero assertions', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Static Testing?', 'Static techniques (code reviews, linters) inspect artifacts at rest, identifying syntax errors and logic flaws before code is ever compiled.',
    'easy', 1, 0, 10, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing software work products (specifications, code, models) without executing the code (reviews, walkthroughs, static analysis)', true, 1, now(), now()),
    (v_q_id, 'Testing a computer while it is turned off', false, 2, now(), now()),
    (v_q_id, 'Testing a computer placed on a static workbench', false, 3, now(), now()),
    (v_q_id, 'Running automated tests without touching the mouse', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Dynamic Testing?', 'Dynamic testing requires executing the program on a machine, checking actual outputs against expected outputs.',
    'easy', 1, 0, 11, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Executing compiled code with concrete input data to evaluate dynamic outputs, memory usage, and runtime behavior', true, 1, now(), now()),
    (v_q_id, 'Testing software that contains video animations', false, 2, now(), now()),
    (v_q_id, 'Testing while moving across a network', false, 3, now(), now()),
    (v_q_id, 'Typing code very quickly', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Formal Inspection (Fagan Inspection)?', 'Developed by Michael Fagan at IBM, inspections follow a formal 6-step lifecycle: Planning, Overview, Preparation, Meeting, Rework, Follow-up.',
    'medium', 1, 0, 12, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A highly structured, disciplined peer review process with formal roles (Author, Moderator, Reader, Recorder, Inspector) and entry/exit criteria', true, 1, now(), now()),
    (v_q_id, 'A government legal audit of financial accounts', false, 2, now(), now()),
    (v_q_id, 'A surprise test given to developers by managers', false, 3, now(), now()),
    (v_q_id, 'An automated security scan using antivirus', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Walkthrough in static testing?', 'Unlike formal inspections, walkthroughs are led by the author, have no formal moderator, and focus on knowledge transfer and informal feedback.',
    'medium', 1, 0, 13, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An informal to semi-formal review led by the author of the document to explain the work product and gather feedback from peers', true, 1, now(), now()),
    (v_q_id, 'Physically walking around a data center room', false, 2, now(), now()),
    (v_q_id, 'A step-by-step user guide for playing video games', false, 3, now(), now()),
    (v_q_id, 'A tool for measuring network bandwidth', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the ''Shift-Left'' testing philosophy?', 'Shift-Left advocates testing from Day 1 to lower the cost of defect resolution and foster shared quality ownership.',
    'easy', 1, 0, 14, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Moving testing activities earlier in the development lifecycle (during requirements and design) to prevent bugs early rather than detecting them late', true, 1, now(), now()),
    (v_q_id, 'Pressing the left arrow key on a keyboard during testing', false, 2, now(), now()),
    (v_q_id, 'Aligning all computer code to the left margin', false, 3, now(), now()),
    (v_q_id, 'Moving developer desks to the left side of an office', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the initial state of a newly discovered defect in a standard Bug Lifecycle?', 'When a tester discovers an anomaly, they document reproduction steps and submit it into the bug tracking system in the ''New'' state.',
    'easy', 1, 0, 15, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'New (or Logged)', true, 1, now(), now()),
    (v_q_id, 'Closed', false, 2, now(), now()),
    (v_q_id, 'Verified', false, 3, now(), now()),
    (v_q_id, 'Deferred', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What occurs when a developer marks a bug report as ''Rejected''?', 'If the software behaves exactly as documented in requirements, or the tester misunderstood functionality, the defect is rejected with explanation.',
    'medium', 1, 0, 16, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The developer claims the reported behavior is by-design, an invalid test case, or not an actual defect', true, 1, now(), now()),
    (v_q_id, 'The computer was thrown into the trash', false, 2, now(), now()),
    (v_q_id, 'The tester was fired from the company', false, 3, now(), now()),
    (v_q_id, 'The software was rolled back to an earlier release', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Deferred'' state in defect tracking?', 'Triage committees defer non-critical cosmetic or low-frequency bugs to avoid destabilizing an imminent software release.',
    'medium', 1, 0, 17, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The bug is acknowledged as valid, but its repair is postponed to a future release milestone due to low severity or release constraints', true, 1, now(), now()),
    (v_q_id, 'The bug deleted itself automatically', false, 2, now(), now()),
    (v_q_id, 'The developer refused to fix the bug forever', false, 3, now(), now()),
    (v_q_id, 'The bug only occurs on weekends', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Defect Severity?', 'Severity is technical: Critical (system crash, data loss), Major (feature broken without workaround), Moderate, or Minor (cosmetic).',
    'easy', 1, 0, 18, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The degree of impact that a defect has on the technical operation, stability, or capability of the software system', true, 1, now(), now()),
    (v_q_id, 'How urgently the business manager wants the bug fixed', false, 2, now(), now()),
    (v_q_id, 'The emotional anger of the customer', false, 3, now(), now()),
    (v_q_id, 'The physical size of the software code file', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Defect Priority?', 'Priority is business-driven: a typo in the corporate header logo is low severity (zero technical impact) but High Priority (brand damage).',
    'easy', 1, 0, 19, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The business urgency and order in which a defect should be fixed by the engineering team', true, 1, now(), now()),
    (v_q_id, 'The technical impact of the bug on the database kernel', false, 2, now(), now()),
    (v_q_id, 'The number of lines of code required to patch the bug', false, 3, now(), now()),
    (v_q_id, 'The salary of the developer assigned to the bug', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''High Severity, Low Priority'' defect scenario?', 'The technical impact is total crash (High Severity), but because virtually no paying customers trigger it, fixing it is Low Priority.',
    'medium', 1, 0, 20, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A catastrophic system crash that occurs only under an obscure, obsolete hardware/OS combination that 0.01% of customers use', true, 1, now(), now()),
    (v_q_id, 'A spelling error on the login homepage', false, 2, now(), now()),
    (v_q_id, 'The checkout button failing for all mobile users', false, 3, now(), now()),
    (v_q_id, 'A broken link in an internal employee wiki', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Backtracking in debugging?', 'Backtracking works well for small programs: following variable values up the call stack until the point of divergence is reached.',
    'medium', 1, 0, 21, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Starting at the point where a failure symptom occurs and tracing backwards through execution logic to find the erroneous statement', true, 1, now(), now()),
    (v_q_id, 'Walking backwards while writing computer code', false, 2, now(), now()),
    (v_q_id, 'Deleting the last 100 lines of source code', false, 3, now(), now()),
    (v_q_id, 'Restoring a backup from yesterday', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Cause Elimination (Hypothesis-Driven Debugging)?', 'A rigorous scientific debugging approach: hypothesize, isolate variables, execute test probes, and deductively eliminate non-causes.',
    'medium', 1, 0, 22, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Formulating hypotheses regarding potential causes, devising experiments to test each hypothesis, and eliminating disproven candidates', true, 1, now(), now()),
    (v_q_id, 'Deleting random lines of code until the program runs', false, 2, now(), now()),
    (v_q_id, 'Replacing computer hardware parts one by one', false, 3, now(), now()),
    (v_q_id, 'Rewriting the entire software application from scratch', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Heisenbug?', 'Named after Heisenberg''s uncertainty principle: inserting print statements or running in a debugger changes thread timing, masking race conditions.',
    'hard', 1, 0, 23, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A software bug that disappears or alters its behavior when one attempts to isolate, observe, or debug it (often due to timing/memory probes)', true, 1, now(), now()),
    (v_q_id, 'A bug caused by radioactive decay in microchips', false, 2, now(), now()),
    (v_q_id, 'A bug named after an infamous computer hacker', false, 3, now(), now()),
    (v_q_id, 'A bug that permanently damages hardware circuits', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Bohrbug?', 'Named after the deterministic Bohr atom model: easily reproducible in test environments once input conditions are duplicated.',
    'medium', 1, 0, 24, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A deterministic, reproducible bug that consistently manifests under a specific, repeatable set of input conditions', true, 1, now(), now()),
    (v_q_id, 'A bug caused by magnetic interference', false, 2, now(), now()),
    (v_q_id, 'A bug that only occurs on quantum computers', false, 3, now(), now()),
    (v_q_id, 'A bug that creates boring error messages', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Mandelbug?', 'Named after Benoit Mandelbrot: caused by complex multi-tier dependencies, operating system scheduling quirks, and asynchronous race conditions.',
    'hard', 1, 0, 25, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A bug whose underlying causes are so complex and chaotic that its behavior appears non-deterministic or intermittent', true, 1, now(), now()),
    (v_q_id, 'A bug discovered in fractal graphics software', false, 2, now(), now()),
    (v_q_id, 'A hardware defect in German computers', false, 3, now(), now()),
    (v_q_id, 'A bug caused by loose network cables', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Software Fault Injection?', 'Fault injection tests whether safety-critical systems detect anomalies and transition gracefully into deterministic fail-safe states.',
    'medium', 1, 0, 26, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Deliberately introducing faults, network delays, or memory corruptions into a system to evaluate its error handling and fault tolerance', true, 1, now(), now()),
    (v_q_id, 'Injecting malicious computer viruses into customer machines', false, 2, now(), now()),
    (v_q_id, 'A hardware defect caused by soldering irons', false, 3, now(), now()),
    (v_q_id, 'A method for destroying computer motherboards', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the IEEE 829 Standard for Software Test Documentation?', 'IEEE 829 outlines 8 core test documentation stages ensuring rigorous traceability across the entire testing lifecycle.',
    'medium', 1, 0, 27, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A standard specifying the form and content of individual test documents (Test Plan, Test Design Spec, Test Case Spec, Test Log, Incident Report)', true, 1, now(), now()),
    (v_q_id, 'A standard for manufacturing optical mice', false, 2, now(), now()),
    (v_q_id, 'A protocol for sending emails over the internet', false, 3, now(), now()),
    (v_q_id, 'A standard for building computer power supplies', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Test Plan?', 'The Test Plan establishes what will be tested, what will NOT be tested, entry/exit criteria, test environment needs, and risk mitigations.',
    'easy', 1, 0, 28, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A formal document detailing the scope, approach, resources, schedule, and deliverables of intended testing activities', true, 1, now(), now()),
    (v_q_id, 'A list of employee phone numbers in the QA department', false, 2, now(), now()),
    (v_q_id, 'The source code of automated test scripts', false, 3, now(), now()),
    (v_q_id, 'A spreadsheet tracking weekly work hours', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Test Case?', 'Test cases provide reproducible, deterministic instructions that any tester can follow to verify a requirement.',
    'easy', 1, 0, 29, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A set of preconditions, input values, execution steps, expected results, and postconditions developed for a specific test objective', true, 1, now(), now()),
    (v_q_id, 'A physical protective plastic case for carrying laptops', false, 2, now(), now()),
    (v_q_id, 'A legal lawsuit filed against a software company', false, 3, now(), now()),
    (v_q_id, 'A folder storing software source code files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Test Oracle?', 'Oracles include user requirements, legacy system outputs, mathematical formulas, or human domain expert judgment.',
    'medium', 1, 0, 30, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A mechanism or source of truth used to determine whether the actual output of a software program matches its expected behavior', true, 1, now(), now()),
    (v_q_id, 'A relational database company', false, 2, now(), now()),
    (v_q_id, 'A fortune teller predicting computer crashes', false, 3, now(), now()),
    (v_q_id, 'A hardware component inside computer processors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Test Coverage?', 'Coverage metrics indicate testing thoroughness, highlighting unexercised areas of code or unverified business requirements.',
    'easy', 1, 0, 31, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A quantitative metric measuring the degree to which a specified coverage item (code statements, branches, requirements) has been exercised by tests', true, 1, now(), now()),
    (v_q_id, 'The physical warranty coverage of a computer monitor', false, 2, now(), now()),
    (v_q_id, 'The number of testers working in a company', false, 3, now(), now()),
    (v_q_id, 'The percentage of internet bandwidth used during testing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Defect Removal Efficiency (DRE)?', 'High DRE ($> 95\%$) proves that internal testing successfully filters out almost all defects before shipping to customers.',
    'medium', 1, 0, 32, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '$$\text{DRE} = \frac{E}{E + D} \times 100\%$$ where $E$ is defects found before release and $D$ is defects found by users after release', true, 1, now(), now()),
    (v_q_id, 'The speed at which a developer fixes a bug in hours', false, 2, now(), now()),
    (v_q_id, 'The percentage of code deleted during refactoring', false, 3, now(), now()),
    (v_q_id, 'The monetary cost of hiring software testers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mutational Testing (Mutation Analysis)?', 'If a mutant survives (tests still pass despite altered logic), it exposes gaps in test suite assertion quality.',
    'hard', 1, 0, 33, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Deliberately introducing small syntactic changes (mutants) into source code to evaluate whether the existing test suite detects and kills the mutants', true, 1, now(), now()),
    (v_q_id, 'Testing software exposed to biological radiation', false, 2, now(), now()),
    (v_q_id, 'A virus that mutates computer files', false, 3, now(), now()),
    (v_q_id, 'Running tests on different operating systems', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Killed Mutant'' in mutation testing?', 'High mutation score (percentage of mutants killed) demonstrates high test suite fault-detection capability.',
    'hard', 1, 0, 34, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A mutant code variation that causes at least one test in the test suite to fail, proving the test suite successfully caught the code modification', true, 1, now(), now()),
    (v_q_id, 'A computer bug that was permanently deleted', false, 2, now(), now()),
    (v_q_id, 'A broken computer processor', false, 3, now(), now()),
    (v_q_id, 'A software project that was cancelled', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Code Inspection vs Code Walkthrough?', 'Inspections strictly separate author and moderator roles to eliminate defensive cognitive bias, achieving higher defect discovery rates.',
    'medium', 1, 0, 35, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Inspection is formal, led by a trained moderator with checklist metrics; Walkthrough is informal and author-led for review', true, 1, now(), now()),
    (v_q_id, 'Inspection is automated; Walkthrough is manual', false, 2, now(), now()),
    (v_q_id, 'Inspection is for hardware; Walkthrough is for software', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the ''Absence-of-Errors'' Fallacy in testing principles?', 'Building a 100% bug-free system that nobody wants or that solves the wrong problem is an ultimate engineering failure.',
    'medium', 1, 0, 36, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Finding and fixing thousands of bugs is useless if the system does not satisfy real user expectations or business goals', true, 1, now(), now()),
    (v_q_id, 'A system that has zero bugs in production', false, 2, now(), now()),
    (v_q_id, 'A developer claiming their code has no bugs', false, 3, now(), now()),
    (v_q_id, 'A software program that runs forever without stopping', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Exploratory Testing?', 'Cem Kaner and James Bach popularized exploratory testing as a disciplined, unscripted cognitive investigation complementing automated regression.',
    'medium', 1, 0, 37, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Simultaneous learning, test design, and test execution where the tester dynamically designs new tests based on insights gained from previous runs', true, 1, now(), now()),
    (v_q_id, 'Testing software on space exploration satellites', false, 2, now(), now()),
    (v_q_id, 'Running automated scripts while browsing the internet', false, 3, now(), now()),
    (v_q_id, 'A beginner guessing random computer buttons', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Session-Based Test Management (SBTM)?', 'SBTM structures exploratory testing with formal time boxes (typically 90 minutes) and measurable charter deliverables.',
    'hard', 1, 0, 38, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A method for managing exploratory testing using uninterrupted, time-boxed testing sessions guided by a formal Charter and debriefing report', true, 1, now(), now()),
    (v_q_id, 'A database session management protocol', false, 2, now(), now()),
    (v_q_id, 'An employee timecard clocking system', false, 3, now(), now()),
    (v_q_id, 'A technique for recording video game sessions', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Risk-Based Testing (RBT)?', '$$\text{Risk} = \text{Likelihood of Failure} \times \text{Business Impact}$$; ensures high-risk modules receive maximum testing scrutiny under tight deadlines.',
    'medium', 1, 0, 39, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An approach where testing effort, depth, and priority are organized based on the probability of failure and the business impact of that failure', true, 1, now(), now()),
    (v_q_id, 'Testing dangerous nuclear power software carelessly', false, 2, now(), now()),
    (v_q_id, 'Gambling money on software release dates', false, 3, now(), now()),
    (v_q_id, 'Testing software without writing any test cases', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Entry Criterion in a software test plan?', 'Examples: Build successfully compiles with 0 errors, unit test coverage $\ge 80\%$, test environment provisioned with sanitized data.',
    'easy', 1, 0, 40, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The set of formal conditions and prerequisites that must be satisfied before testing can officially commence in a given phase', true, 1, now(), now()),
    (v_q_id, 'The physical security badge needed to enter an office', false, 2, now(), now()),
    (v_q_id, 'The minimum grade required to pass an exam', false, 3, now(), now()),
    (v_q_id, 'The price of purchasing test automation software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Exit Criterion (Definition of Done) in a test plan?', 'Examples: 100% critical test cases passed, zero open Blocker/Critical defects, automated regression suite green.',
    'easy', 1, 0, 41, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The agreed-upon criteria that must be achieved before a testing phase can be formally concluded and approved for release', true, 1, now(), now()),
    (v_q_id, 'The door used to leave a testing laboratory', false, 2, now(), now()),
    (v_q_id, 'The moment when all testers go home for the day', false, 3, now(), now()),
    (v_q_id, 'When the testing project runs out of money', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Rubber Duck Debugging?', 'Articulating thought processes out loud forces the conscious mind to re-evaluate implicit assumptions, uncovering the bug without outside help.',
    'easy', 1, 0, 42, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A debugging method where a programmer explains source code line-by-line to an inanimate object (like a rubber duck) to discover logic errors', true, 1, now(), now()),
    (v_q_id, 'Playing with toys in an office bathtub', false, 2, now(), now()),
    (v_q_id, 'A software algorithm for drawing cartoon characters', false, 3, now(), now()),
    (v_q_id, 'A testing tool developed by the rubber industry', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Memory Leak and how does dynamic testing detect it?', 'Dynamic profilers (Valgrind, Chrome DevTools Memory tab) track allocations over time, identifying heap objects that retain references indefinitely.',
    'medium', 1, 0, 43, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A program allocates memory on the heap but fails to release it back, causing memory consumption to grow until the program crashes (OOM)', true, 1, now(), now()),
    (v_q_id, 'A physical crack on a computer RAM stick', false, 2, now(), now()),
    (v_q_id, 'A computer monitor leaking liquid crystal', false, 3, now(), now()),
    (v_q_id, 'A program deleting files from a hard drive', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Profiling in software performance engineering?', 'Profilers generate flame graphs and call trees, identifying algorithmic bottlenecks where a program spends 90% of its execution time.',
    'medium', 1, 0, 44, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Dynamic analysis that measures the memory consumption, CPU utilization, call stack frequency, and execution duration of functions in a program', true, 1, now(), now()),
    (v_q_id, 'Creating a user account profile on a social network', false, 2, now(), now()),
    (v_q_id, 'Taking a photograph of computer hardware', false, 3, now(), now()),
    (v_q_id, 'Checking credit scores of software developers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Core Dump?', 'Developers load core dump files into debuggers (GDB) with debug symbols to inspect variable values and stack frames at the moment of fatal crash.',
    'medium', 1, 0, 45, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A recorded state of the working memory of an application process at the precise moment it crashed, saved to a file for post-mortem analysis', true, 1, now(), now()),
    (v_q_id, 'Throwing old computer hardware into a landfill', false, 2, now(), now()),
    (v_q_id, 'Deleting the root directory of an operating system', false, 3, now(), now()),
    (v_q_id, 'Emptying the recycle bin on a desktop', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Conditional Breakpoint in IDE debuggers?', 'Saves hours during loops by avoiding manual stepping through thousands of non-problematic iterations.',
    'easy', 1, 0, 46, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A breakpoint that pauses program execution only when a specified boolean condition evaluates to true (e.g., `i == 9999`)', true, 1, now(), now()),
    (v_q_id, 'A breakpoint that breaks the computer screen', false, 2, now(), now()),
    (v_q_id, 'A breakpoint that only pauses on weekends', false, 3, now(), now()),
    (v_q_id, 'A breakpoint that deletes the source code line', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Static Analysis Tool (Linter) in software development?', 'Linters (ESLint, Pylint, SonarQube) automatically enforce coding standards and detect dangerous anti-patterns during continuous integration.',
    'easy', 1, 0, 47, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A program that analyzes source code for programmatic errors, stylistic bugs, code smells, and security flaws without executing the code', true, 1, now(), now()),
    (v_q_id, 'A tool for cleaning dust off keyboards', false, 2, now(), now()),
    (v_q_id, 'A program that formats hard drives', false, 3, now(), now()),
    (v_q_id, 'A compiler that converts C++ into Java', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Pair Testing in agile software development?', 'Combines developer technical architecture knowledge with tester exploratory critical mindset for rapid bug discovery and cross-pollination.',
    'medium', 1, 0, 48, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Two team members (typically a developer and a tester, or two testers) working together concurrently on one machine to execute tests', true, 1, now(), now()),
    (v_q_id, 'Testing two identical computers side by side', false, 2, now(), now()),
    (v_q_id, 'Testing software twice before releasing it', false, 3, now(), now()),
    (v_q_id, 'Testing two different software programs at once', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between Black-box Debugging and White-box Debugging?', 'White-box debugging uses breakpoints and variable watches inside an IDE; black-box debugging analyzes log traces, network frames, and diagnostic error codes.',
    'medium', 1, 0, 49, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Black-box debugging analyzes external logs, inputs, and outputs without modifying source code; White-box debugging steps through code line-by-line with symbols', true, 1, now(), now()),
    (v_q_id, 'Black-box is done at night; White-box is done during the day', false, 2, now(), now()),
    (v_q_id, 'Black-box is for hardware; White-box is for software', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Bug Triage in software project management?', 'Triage ensures that engineering resources are focused strictly on high-impact business defects before minor cosmetic issues.',
    'easy', 1, 0, 50, ARRAY['BCA-441E', 'Unit-1', 'BCA-441E-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A collaborative meeting where developers, testers, and product managers review newly reported bugs to evaluate severity, verify priority, and assign owners', true, 1, now(), now()),
    (v_q_id, 'A medical examination given to software engineers', false, 2, now(), now()),
    (v_q_id, 'A legal trial held to punish programmers who make bugs', false, 3, now(), now()),
    (v_q_id, 'A process for automatically deleting low-quality bugs', false, 4, now(), now());

END $SEEDED_BLOCK$;
