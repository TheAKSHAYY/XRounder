DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-441E Unit 3 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '71b054ef-8ae4-5b17-ac66-87638111c841', 'BCA-441E Unit 3: Testing for Specialized Environments Practice Quiz (50 MCQs)', 'bca-441e-u3-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-441E Unit 3. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
    60, 'published', true, 3, now(), now()
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
    v_quiz_id, 'single', 'What is Graphical User Interface (GUI) Testing?', 'GUI testing validates that visual elements render properly, respond to user events, and display data accurately across viewports.',
    'easy', 1, 0, 1, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The process of testing the visible graphical interface of an application (buttons, menus, textboxes, layouts) to ensure visual and functional correctness', true, 1, now(), now()),
    (v_q_id, 'Testing computer graphic video games', false, 2, now(), now()),
    (v_q_id, 'Testing computer monitor hardware cables', false, 3, now(), now()),
    (v_q_id, 'Designing logos in graphic design software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary difficulty associated with automated GUI testing?', 'UI elements frequently change IDs or positions, causing automated scripts with hardcoded locators to fail even when business logic works.',
    'medium', 1, 0, 2, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'GUI tests are notoriously brittle and flaky; minor shifts in HTML layout, CSS classes, or asynchronous timing can break test scripts', true, 1, now(), now()),
    (v_q_id, 'Computers cannot see colors on monitors', false, 2, now(), now()),
    (v_q_id, 'Web browsers refuse to run automated scripts', false, 3, now(), now()),
    (v_q_id, 'GUI testing requires expensive 3D glasses', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Page Object Model (POM) in UI automation?', 'POM wraps web pages inside reusable classes; if an HTML button ID changes, developers update only one class instead of fifty test scripts.',
    'medium', 1, 0, 3, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A design pattern that creates an object repository for web UI elements, decoupling test assertions from underlying HTML DOM locators', true, 1, now(), now()),
    (v_q_id, 'A model for printing web pages on paper', false, 2, now(), now()),
    (v_q_id, 'A template for writing HTML web pages', false, 3, now(), now()),
    (v_q_id, 'A tool for measuring website page loading speed', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Visual Regression Testing?', 'Visual regression tools (Percy, Applitools) catch unintended pixel shifts, broken CSS margins, and font clipping that functional tests miss.',
    'medium', 1, 0, 4, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Capturing screenshots of web pages and using image diffing algorithms to compare them against golden baseline screenshots to detect unintended layout shifts', true, 1, now(), now()),
    (v_q_id, 'Testing whether software graphics look old-fashioned', false, 2, now(), now()),
    (v_q_id, 'A medical vision test for software developers', false, 3, now(), now()),
    (v_q_id, 'Testing software on black-and-white monitors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Client/Server Architecture Testing?', 'Validates that client requests correctly transmit over HTTP/TCP, backend services process payloads, and databases maintain ACID consistency.',
    'easy', 1, 0, 5, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing the interaction, network communication protocols, and data synchronization between client frontends and backend servers', true, 1, now(), now()),
    (v_q_id, 'Testing computers inside an office server room', false, 2, now(), now()),
    (v_q_id, 'Testing whether a client is satisfied with a server''s customer service', false, 3, now(), now()),
    (v_q_id, 'Testing cables connecting two computers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Network Latency and Bandwidth Throttling in client/server testing?', 'Throttling verifies whether client applications display loading spinners, handle timeouts, and prevent freezing on slow mobile networks.',
    'medium', 1, 0, 6, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Artificially simulating poor network connections (3G, packet loss, high ping) to verify how gracefully client applications handle slow connections', true, 1, now(), now()),
    (v_q_id, 'Restricting internet access for employees in an office', false, 2, now(), now()),
    (v_q_id, 'A physical clamp placed on network cables', false, 3, now(), now()),
    (v_q_id, 'A technique for speeding up internet downloads', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Real-Time System Testing?', 'In real-time systems (flight controls, medical pacemakers), arriving at the correct mathematical answer after the deadline is a catastrophic failure.',
    'medium', 1, 0, 7, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing systems where operational correctness depends strictly on delivering calculated results within deterministic clock deadlines', true, 1, now(), now()),
    (v_q_id, 'Testing software while watching a physical wall clock', false, 2, now(), now()),
    (v_q_id, 'Testing software that streams live television broadcasts', false, 3, now(), now()),
    (v_q_id, 'Testing software that is currently being written', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Hard Real-Time System vs a Soft Real-Time System?', 'An automotive airbag controller is Hard Real-Time ($< 30\,\text{ms}$); video streaming frame rendering is Soft Real-Time (brief stutter is tolerable).',
    'easy', 1, 0, 8, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Hard real-time systems cause catastrophic failure or loss of life if a deadline is missed; Soft real-time systems suffer degraded quality without destruction', true, 1, now(), now()),
    (v_q_id, 'Hard systems use metal hardware; Soft systems use plastic', false, 2, now(), now()),
    (v_q_id, 'Hard systems are difficult to test; Soft systems are easy', false, 3, now(), now()),
    (v_q_id, 'Hard systems only run on mainframes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Worst-Case Execution Time (WCET) in real-time systems testing?', 'Engineers must mathematically prove that $\text{WCET} \le \text{Deadline}$ under maximum CPU load to guarantee safety compliance.',
    'hard', 1, 0, 9, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The absolute maximum time a computational task can take to execute under the most unfavorable hardware and input conditions', true, 1, now(), now()),
    (v_q_id, 'The slowest time a developer took to fix a bug', false, 2, now(), now()),
    (v_q_id, 'The duration of an office electrical power outage', false, 3, now(), now()),
    (v_q_id, 'The time taken to install an operating system', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Priority Inversion in concurrent real-time operating systems?', 'Famously afflicted the Mars Pathfinder spacecraft in 1997; solved by implementing **Priority Inheritance Protocols** in RTOS kernels.',
    'hard', 1, 0, 10, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A condition where a low-priority task holds a shared resource required by a high-priority task, causing the high-priority task to miss its deadline', true, 1, now(), now()),
    (v_q_id, 'Inverting the order of numbers in an array', false, 2, now(), now()),
    (v_q_id, 'Promoting a junior tester to project manager', false, 3, now(), now()),
    (v_q_id, 'Turning a computer upside down', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Documentation and Help Facilities Testing?', 'Misleading, inaccurate, or outdated documentation causes customer support ticket spikes and severe user frustration.',
    'easy', 1, 0, 11, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Verifying that user guides, API manuals, error messages, and context-sensitive help dialogs are accurate, readable, and match actual software behavior', true, 1, now(), now()),
    (v_q_id, 'Testing whether office printers can print user manuals', false, 2, now(), now()),
    (v_q_id, 'Checking the grammar of emails sent by managers', false, 3, now(), now()),
    (v_q_id, 'Testing software documentation stored in file cabinets', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Error Message Usability Testing?', 'Poor error: ''Error 0x80040154''; Good error: ''Credit card expired. Please update your payment details in Account Settings.''',
    'easy', 1, 0, 12, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Verifying that error messages explain what went wrong in plain language, avoid technical jargon, and provide clear actionable recovery steps', true, 1, now(), now()),
    (v_q_id, 'Testing whether computer error sounds are loud enough', false, 2, now(), now()),
    (v_q_id, 'Making error messages appear in red text', false, 3, now(), now()),
    (v_q_id, 'Deleting all error messages from the software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is API (Application Programming Interface) Testing?', 'API tests execute in milliseconds without UI overhead, verifying business logic, HTTP status codes, schema contracts, and authentication.',
    'easy', 1, 0, 13, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing backend software interfaces directly at the message layer (sending HTTP requests to REST/SOAP endpoints and asserting JSON response payloads)', true, 1, now(), now()),
    (v_q_id, 'Testing computer keyboard buttons', false, 2, now(), now()),
    (v_q_id, 'Testing whether two applications can share a screen', false, 3, now(), now()),
    (v_q_id, 'A test given to API developers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Contract Testing (e.g., Pact framework) in microservices architecture?', 'Contract testing prevents breaking API changes between distributed microservice teams before deploying code into staging environments.',
    'hard', 1, 0, 14, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Verifying that a service provider and service consumer adhere to an agreed-upon API request/response schema without testing live deployed systems together', true, 1, now(), now()),
    (v_q_id, 'A legal contract signed between two companies', false, 2, now(), now()),
    (v_q_id, 'A contract signed by software testers upon hiring', false, 3, now(), now()),
    (v_q_id, 'An agreement regarding software pricing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Performance Testing?', 'Validates non-functional quality attributes: response times ($< 200\,\text{ms}$), memory footprints, and server CPU limits.',
    'easy', 1, 0, 15, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Evaluating the responsiveness, speed, throughput, resource usage, and stability of a software application under a given operational workload', true, 1, now(), now()),
    (v_q_id, 'Measuring the typing speed of software developers', false, 2, now(), now()),
    (v_q_id, 'Testing how fast a computer can calculate mathematical formulas', false, 3, now(), now()),
    (v_q_id, 'Evaluating whether employees work hard', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Load Testing?', 'Proves that a banking website can handle 50,000 concurrent users on salary day without crashing or degrading response times.',
    'easy', 1, 0, 16, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Simulating anticipated normal and peak concurrent user traffic volumes to verify whether the system maintains acceptable performance metrics', true, 1, now(), now()),
    (v_q_id, 'Testing whether a truck can carry heavy computer hardware', false, 2, now(), now()),
    (v_q_id, 'Loading software onto thousands of USB drives', false, 3, now(), now()),
    (v_q_id, 'Testing a computer with many applications open', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Stress Testing (Torture Testing)?', 'Ensures that when extreme traffic strikes, the application degrades gracefully (sheds load with HTTP 503) rather than corrupting databases.',
    'easy', 1, 0, 17, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Pushing an application beyond its maximum operational capacity until it breaks, to observe its failure mode and recovery behavior', true, 1, now(), now()),
    (v_q_id, 'Yelling at software developers to make them work faster', false, 2, now(), now()),
    (v_q_id, 'Testing software under stressful office deadlines', false, 3, now(), now()),
    (v_q_id, 'Testing software in very hot rooms', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Spike Testing in performance engineering?', 'Simulates sudden events like a televised Super Bowl commercial or breaking news alert driving 100,000 users to a website in 10 seconds.',
    'medium', 1, 0, 18, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Suddenly and dramatically increasing the user load on a system to observe whether it can handle instantaneous traffic surges', true, 1, now(), now()),
    (v_q_id, 'Testing sharp metal components inside computers', false, 2, now(), now()),
    (v_q_id, 'Measuring voltage spikes with an oscilloscope', false, 3, now(), now()),
    (v_q_id, 'A test that fails immediately', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Soak Testing (Endurance Testing)?', 'Detects memory leaks, unclosed database connection pools, log file disk exhaustion, and garbage collection pauses that only appear over time.',
    'medium', 1, 0, 19, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Running a system under an expected continuous operational load for an extended duration (days or weeks) to uncover slow memory leaks and resource degradation', true, 1, now(), now()),
    (v_q_id, 'Submerging computer hardware in water to test waterproofing', false, 2, now(), now()),
    (v_q_id, 'Testing software while taking a bath', false, 3, now(), now()),
    (v_q_id, 'Leaving a computer turned off for a month', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Scalability Testing?', 'Determines the operational breaking points and proves whether adding $2\times$ servers delivers $2\times$ transaction throughput.',
    'medium', 1, 0, 20, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Evaluating the software''s ability to handle growing workloads by scaling up (more CPU/RAM) or scaling out (adding more servers/containers)', true, 1, now(), now()),
    (v_q_id, 'Testing whether software can be installed on larger computer monitors', false, 2, now(), now()),
    (v_q_id, 'Testing software in different geographic regions', false, 3, now(), now()),
    (v_q_id, 'Measuring the weight of servers on a scale', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Security Testing?', 'Validates authentication, authorization, cryptography, input validation, and resistance against hacking exploits.',
    'easy', 1, 0, 21, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Evaluating an information system to uncover vulnerabilities, threats, and risks, ensuring that data is protected from unauthorized access or malicious attacks', true, 1, now(), now()),
    (v_q_id, 'Testing the physical door locks of a data center', false, 2, now(), now()),
    (v_q_id, 'Hiring armed security guards for an office building', false, 3, now(), now()),
    (v_q_id, 'A background check conducted on software testers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Penetration Testing (Ethical Hacking)?', 'Ethical hackers use the exact tools and techniques as malicious attackers to discover security flaws before criminals exploit them.',
    'easy', 1, 0, 22, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An authorized simulated cyberattack performed on a computer system to identify exploitable security vulnerabilities', true, 1, now(), now()),
    (v_q_id, 'Hacking into a bank to steal money illegally', false, 2, now(), now()),
    (v_q_id, 'A test measuring the physical sharpness of needles', false, 3, now(), now()),
    (v_q_id, 'Testing how deep a drill can penetrate metal', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is SQL Injection (SQLi) and how is it tested?', 'Tested manually and with automated tools (SQLmap) to prove that prepared statements and parameterized queries prevent database compromise.',
    'easy', 1, 0, 23, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Injecting malicious SQL syntax into user input fields to manipulate backend database queries, tested using payloads like `'' OR ''1''=''1`', true, 1, now(), now()),
    (v_q_id, 'A physical syringe used to clean computer hardware', false, 2, now(), now()),
    (v_q_id, 'An error caused by typing SQL queries too quickly', false, 3, now(), now()),
    (v_q_id, 'A tool for deleting duplicate database rows', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Cross-Site Scripting (XSS) and how is it tested?', 'Testers inject payloads like `<script>alert(''XSS'')</script>` into form fields to check whether inputs are properly sanitized and encoded.',
    'easy', 1, 0, 24, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Injecting malicious JavaScript payloads into web applications that are subsequently executed in the browsers of other unsuspecting users', true, 1, now(), now()),
    (v_q_id, 'A software program that designs crosswords', false, 2, now(), now()),
    (v_q_id, 'An error caused by clicking links too quickly', false, 3, now(), now()),
    (v_q_id, 'A tool for translating websites into different languages', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Cross-Site Request Forgery (CSRF)?', 'Tested by verifying that sensitive state-changing requests require unique, cryptographically random Anti-CSRF tokens.',
    'medium', 1, 0, 25, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An attack that tricks an authenticated user''s browser into submitting an unauthorized malicious request to a trusted web application', true, 1, now(), now()),
    (v_q_id, 'A software program that copies files across computers', false, 2, now(), now()),
    (v_q_id, 'An error that occurs when two websites share a server', false, 3, now(), now()),
    (v_q_id, 'A tool for forging digital certificates', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Distributed Denial of Service (DDoS) testing?', 'Validates cloud Web Application Firewalls (WAF), CDN edge caching, and upstream scrubbing center mitigations.',
    'medium', 1, 0, 26, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Simulating distributed botnet traffic flooding network gateways and application endpoints to evaluate bandwidth resilience and rate limiting', true, 1, now(), now()),
    (v_q_id, 'Turning off all computers in an office at the same time', false, 2, now(), now()),
    (v_q_id, 'A software bug that crashes an operating system', false, 3, now(), now()),
    (v_q_id, 'Testing whether internet cables are plugged in properly', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Fuzz Testing (Fuzzing)?', 'Fuzzers (AFL, Peach Fuzzer) test protocol parsers and file decoders with corrupted inputs to expose unhandled memory buffer overflows.',
    'medium', 1, 0, 27, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Automated black-box testing that inputs massive streams of random, malformed, and unexpected data into software parsers to find crashes and memory leaks', true, 1, now(), now()),
    (v_q_id, 'Cleaning computer monitors with a fuzzy cloth', false, 2, now(), now()),
    (v_q_id, 'Testing microphones with fuzzy wind covers', false, 3, now(), now()),
    (v_q_id, 'Writing code using fuzzy logic formulas', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Static Application Security Testing (SAST) vs Dynamic Application Security Testing (DAST)?', 'SAST catches security flaws early in development; DAST catches configuration errors and runtime authentication flaws in staging environments.',
    'medium', 1, 0, 28, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'SAST inspects source code at rest from the inside (White-box); DAST probes running applications from the outside over the network (Black-box)', true, 1, now(), now()),
    (v_q_id, 'SAST is manual; DAST is automated', false, 2, now(), now()),
    (v_q_id, 'SAST is for hardware; DAST is for software', false, 3, now(), now()),
    (v_q_id, 'There is no difference between them', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Chaos Engineering (e.g., Netflix Chaos Monkey)?', 'Pioneered by Netflix: if critical infrastructure can survive random automated server killings during business hours, customer outages are avoided.',
    'hard', 1, 0, 29, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Deliberately injecting random server crashes, network dropouts, and hardware failures into production environments to test system resilience', true, 1, now(), now()),
    (v_q_id, 'Writing disorganized software code carelessly', false, 2, now(), now()),
    (v_q_id, 'Allowing software testers to work without a plan', false, 3, now(), now()),
    (v_q_id, 'A theory explaining how the universe began', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Disaster Recovery Testing in enterprise IT environments?', 'Validates that database replication, DNS failover, and operational procedures satisfy business RTO and RPO benchmarks under catastrophe.',
    'medium', 1, 0, 30, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Simulating complete regional data center destruction (earthquake, flood) to verify whether secondary hot-standby systems automatically failover safely', true, 1, now(), now()),
    (v_q_id, 'Testing whether office buildings can survive natural disasters', false, 2, now(), now()),
    (v_q_id, 'A physical fire drill for office employees', false, 3, now(), now()),
    (v_q_id, 'Testing whether computers can be repaired after an explosion', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Headless Browser Testing in modern UI test automation?', 'Headless browsers (Puppeteer, Playwright) render HTML/CSS and execute JavaScript in RAM without the CPU overhead of drawing monitor pixels.',
    'medium', 1, 0, 31, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Running automated browser test suites without displaying a visible graphical window, accelerating execution inside CI/CD pipelines', true, 1, now(), now()),
    (v_q_id, 'Testing computers without video graphics cards installed', false, 2, now(), now()),
    (v_q_id, 'Testing software developed for headless robots', false, 3, now(), now()),
    (v_q_id, 'A software testing tool with no user documentation', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Cross-Browser Testing in web quality assurance?', 'Uncovers layout rendering quirks, unsupported CSS flexbox/grid features, and JavaScript engine deviations between Blink, Gecko, and WebKit.',
    'easy', 1, 0, 32, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Verifying that a web application renders, operates, and performs consistently across Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge', true, 1, now(), now()),
    (v_q_id, 'Testing whether browsers can communicate with each other', false, 2, now(), now()),
    (v_q_id, 'Installing multiple browsers on the same computer', false, 3, now(), now()),
    (v_q_id, 'Testing how fast a browser can download software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Responsive Web Design (RWD) Testing?', 'Tests viewport boundaries (375px mobile, 768px tablet, 1440px desktop) to ensure zero horizontal text clipping or overlapping buttons.',
    'easy', 1, 0, 33, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Verifying that a website dynamically adapts its visual layout, images, and navigation menus to various screen viewports (mobile, tablet, desktop)', true, 1, now(), now()),
    (v_q_id, 'Testing whether a website responds quickly to user clicks', false, 2, now(), now()),
    (v_q_id, 'Testing whether a website can be translated into Spanish', false, 3, now(), now()),
    (v_q_id, 'Testing whether an application can send email responses', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is A/B Testing (Split Testing) in web optimization?', 'Data-driven experimentation: comparing baseline Variant A against experimental Variant B to statistically prove customer preference.',
    'easy', 1, 0, 34, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Displaying two distinct variants of a web page (A and B) to randomized user groups to measure which variant produces higher business conversions', true, 1, now(), now()),
    (v_q_id, 'Testing whether students get an A or B grade on an exam', false, 2, now(), now()),
    (v_q_id, 'Testing software on two different computers', false, 3, now(), now()),
    (v_q_id, 'Testing whether a button is blue or green', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mobile Application Testing across device fragmentation?', 'Device farms (BrowserStack, AWS Device Farm) execute automated test suites across physical smartphones to detect vendor-specific OEM bugs.',
    'medium', 1, 0, 35, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing mobile apps across hundreds of distinct physical smartphone models with varying screen sizes, OS versions (Android/iOS), and hardware capabilities', true, 1, now(), now()),
    (v_q_id, 'Testing mobile phones while walking around an office', false, 2, now(), now()),
    (v_q_id, 'Testing whether a phone can be dropped without breaking', false, 3, now(), now()),
    (v_q_id, 'A test given to mobile phone sales employees', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Battery Drain Testing in mobile application QA?', 'Apps that abuse background GPS location polling, high-frequency wake-locks, or excessive cellular radios are rejected by app store reviewers.',
    'medium', 1, 0, 36, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Measuring the electrical energy consumed by a mobile application over time to ensure it does not deplete user smartphone batteries prematurely', true, 1, now(), now()),
    (v_q_id, 'Testing whether a battery can be recharged quickly', false, 2, now(), now()),
    (v_q_id, 'Testing how long a flashlight battery lasts', false, 3, now(), now()),
    (v_q_id, 'A test given to battery manufacturing companies', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an APK and IPA in mobile application testing?', 'Testers install compiled APK/IPA binaries onto physical test devices and emulators to verify mobile installation and runtime behavior.',
    'easy', 1, 0, 37, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'APK is the Android application package file; IPA is the iOS application archive file', true, 1, now(), now()),
    (v_q_id, 'They are proprietary encryption algorithms', false, 2, now(), now()),
    (v_q_id, 'They are programming languages developed by Google and Apple', false, 3, now(), now()),
    (v_q_id, 'They are testing tools used for web browsers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Hardware-in-the-Loop (HIL) Testing in real-time embedded systems?', 'Allows aerospace and automotive engineers to test physical electronic control units (ECUs) under simulated extreme crash conditions safely.',
    'hard', 1, 0, 38, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Connecting real physical controller hardware to a high-speed real-time simulation computer that mathematically mimics the environment and sensors', true, 1, now(), now()),
    (v_q_id, 'A computer cable looped into a circle', false, 2, now(), now()),
    (v_q_id, 'A testing laboratory with many computer desks in a circle', false, 3, now(), now()),
    (v_q_id, 'A software program that loops indefinitely', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Database Migration Testing in enterprise applications?', 'Validates that data types map correctly, no records are dropped or truncated, and historical transactions remain identical.',
    'medium', 1, 0, 39, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Verifying that data transferred from a legacy database system to a new database schema retains 100% data integrity, completeness, and accuracy', true, 1, now(), now()),
    (v_q_id, 'Moving physical server computers to a new building', false, 2, now(), now()),
    (v_q_id, 'Upgrading database software to a newer version', false, 3, now(), now()),
    (v_q_id, 'Testing whether birds migrate during winter months', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mutation in database testing?', 'Ensures that adding foreign keys or changing column constraints does not trigger database locks or break existing API routes.',
    'medium', 1, 0, 40, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Modifying database schema, table structures, or stored procedures and verifying that all downstream queries and applications continue to function', true, 1, now(), now()),
    (v_q_id, 'A genetic variation in biological organisms', false, 2, now(), now()),
    (v_q_id, 'A software virus corrupting database records', false, 3, now(), now()),
    (v_q_id, 'A technique for deleting database backups', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Golden Master (Baseline) in visual regression testing?', 'If a new build shifts a button by 5 pixels, image diffing tools compare against the Golden Master and highlight the altered pixels in red.',
    'easy', 1, 0, 41, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An approved, verified screenshot of a web page used as the standard benchmark against which all future test screenshots are compared', true, 1, now(), now()),
    (v_q_id, 'A gold trophy awarded to the best software tester', false, 2, now(), now()),
    (v_q_id, 'A master copy of software stored in a bank vault', false, 3, now(), now()),
    (v_q_id, 'A software developer with 20 years of experience', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an API Mock Server (e.g., WireMock, MSW)?', 'Allows frontend engineers to develop and test UI features even before the backend engineering team has finished building the real APIs.',
    'easy', 1, 0, 42, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A simulator that intercepts HTTP requests and returns predefined fake responses without invoking the actual backend production services', true, 1, now(), now()),
    (v_q_id, 'A server that makes fun of software developers', false, 2, now(), now()),
    (v_q_id, 'A computer that does not have an operating system', false, 3, now(), now()),
    (v_q_id, 'A broken computer server in a data center', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Zero-Downtime Deployment Testing (e.g., Blue-Green Deployments)?', 'In Blue-Green deployment, Blue is live; Green receives the new release; after tests pass, traffic router flips immediately to Green with zero outage.',
    'medium', 1, 0, 43, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing whether a new software release can be deployed into production without disconnecting active users or experiencing server downtime', true, 1, now(), now()),
    (v_q_id, 'A software project that never releases any new updates', false, 2, now(), now()),
    (v_q_id, 'Testing software while the server is turned off', false, 3, now(), now()),
    (v_q_id, 'A test that runs for zero seconds', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Canary Deployment in modern software release strategies?', 'If the new version produces a spike in HTTP 500 errors or latency, traffic is rolled back instantly before affecting 98% of users.',
    'medium', 1, 0, 44, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Rolling out a new software release to a tiny subset of real production users (e.g., 2%) first to monitor error rates before wide deployment', true, 1, now(), now()),
    (v_q_id, 'Testing software inside coal mines with yellow birds', false, 2, now(), now()),
    (v_q_id, 'A software program that plays bird sounds', false, 3, now(), now()),
    (v_q_id, 'A test conducted exclusively by junior developers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Dark Launching in web application feature releases?', 'Tests backend database scaling, caching, and server load under live production traffic without users noticing the new feature.',
    'medium', 1, 0, 45, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Deploying a new feature to production servers so it runs in the background or for internal staff without exposing UI elements to the public', true, 1, now(), now()),
    (v_q_id, 'Launching a website at midnight in the dark', false, 2, now(), now()),
    (v_q_id, 'A cyberattack that takes down a website', false, 3, now(), now()),
    (v_q_id, 'Testing a website with a black background', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Feature Flagging (Feature Toggles)?', 'If a newly launched feature causes crashes, developers toggle the feature flag to ''off'' in seconds without triggering an emergency code rollback.',
    'easy', 1, 0, 46, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A software development technique that allows features to be remotely turned on or off in production code via configuration without deploying new code', true, 1, now(), now()),
    (v_q_id, 'A country''s national flag displayed on a website', false, 2, now(), now()),
    (v_q_id, 'An error that occurs when writing conditional statements', false, 3, now(), now()),
    (v_q_id, 'A tool for marking software bugs as resolved', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is End-to-End (E2E) Testing?', 'Simulates genuine user journeys (e.g., Register Account $\to$ Add Course to Cart $\to$ Complete Payment $\to$ Verify Enrollment in DB).',
    'easy', 1, 0, 47, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing a complete software application flow from beginning to end, ensuring all integrated sub-systems and databases work together seamlessly', true, 1, now(), now()),
    (v_q_id, 'Testing both ends of a physical copper wire', false, 2, now(), now()),
    (v_q_id, 'Testing software from January to December', false, 3, now(), now()),
    (v_q_id, 'A test that has an end but no beginning', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Flaky Test in automated testing?', 'Caused by race conditions, asynchronous timing delays, network jitter, or non-deterministic test order dependencies; destroys team confidence in CI/CD.',
    'medium', 1, 0, 48, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An automated test that exhibits both passing and failing results across different runs without any changes to the underlying code or environment', true, 1, now(), now()),
    (v_q_id, 'A test that is easy to break like a pastry', false, 2, now(), now()),
    (v_q_id, 'A test written by an unreliable software developer', false, 3, now(), now()),
    (v_q_id, 'A test that only runs on winter mornings', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Idempotency Testing in RESTful web APIs?', 'If a payment gateway request times out and the user clicks ''Submit'' twice, idempotency keys guarantee the customer is billed exactly once.',
    'medium', 1, 0, 49, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Verifying that making multiple identical HTTP requests (e.g., multiple identical PUT or DELETE requests) produces the exact same system state as a single request', true, 1, now(), now()),
    (v_q_id, 'Testing software that has no electrical power', false, 2, now(), now()),
    (v_q_id, 'Testing whether two numbers are equal', false, 3, now(), now()),
    (v_q_id, 'A method for measuring internet download speeds', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Synthetic Monitoring (Synthetics)?', 'Alerts operations teams to production outages before paying customers encounter broken checkout flows and file complaints.',
    'easy', 1, 0, 50, ARRAY['BCA-441E', 'Unit-3', 'BCA-441E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Automated scripts that periodically simulate user actions (e.g., every 5 minutes) against live production systems to monitor uptime and latency proactively', true, 1, now(), now()),
    (v_q_id, 'Using artificial intelligence to write user manuals', false, 2, now(), now()),
    (v_q_id, 'Testing synthetic plastic materials in laboratories', false, 3, now(), now()),
    (v_q_id, 'A software program that generates fake financial data', false, 4, now(), now());

END $SEEDED_BLOCK$;
