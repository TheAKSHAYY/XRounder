DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-441E Unit 5 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '2b5a3994-7e81-569b-a568-9ff7d969c933', 'BCA-441E Unit 5: Specialized Testing and Automated Testing Tools Practice Quiz (50 MCQs)', 'bca-441e-u5-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-441E Unit 5. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
    60, 'published', true, 5, now(), now()
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
    v_quiz_id, 'single', 'What is Test Automation?', 'Test automation eliminates repetitive human manual testing effort, accelerating regression cycles and preventing human execution mistakes.',
    'easy', 1, 0, 1, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The use of software tools to control the execution of tests, compare actual outcomes with predicted outcomes, and set test preconditions automatically', true, 1, now(), now()),
    (v_q_id, 'Hiring robots to type on physical keyboards', false, 2, now(), now()),
    (v_q_id, 'Writing code without using a computer screen', false, 3, now(), now()),
    (v_q_id, 'A machine that cleans office keyboards', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is JUnit in the Java programming ecosystem?', 'Created by Kent Beck and Erich Gamma, JUnit is the foundational unit testing framework that inspired the xUnit family across all languages.',
    'easy', 1, 0, 2, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open-source unit testing framework for Java, providing annotations and assertion libraries to automate test execution', true, 1, now(), now()),
    (v_q_id, 'A proprietary operating system developed by Sun Microsystems', false, 2, now(), now()),
    (v_q_id, 'A database management engine like MySQL', false, 3, now(), now()),
    (v_q_id, 'A software program for designing 3D graphics', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In JUnit 5 (Jupiter), what does the `@Test` annotation signify?', '`@Test` marks public or package-private methods containing assertions for execution by the JUnit test engine.',
    'easy', 1, 0, 3, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Declares that the annotated method is a test method to be executed by the test runner', true, 1, now(), now()),
    (v_q_id, 'Declares that the method is broken and should be skipped', false, 2, now(), now()),
    (v_q_id, 'Compiles the method into machine code', false, 3, now(), now()),
    (v_q_id, 'Deletes the method from memory', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In JUnit 5, what is the purpose of the `@BeforeEach` annotation?', 'Replaces JUnit 4''s `@Before`, guaranteeing fresh, clean fixture state (e.g., instantiating a new object) before every test runs.',
    'medium', 1, 0, 4, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Executes the annotated method before each individual `@Test` method in the current test class, setting up isolated test fixtures', true, 1, now(), now()),
    (v_q_id, 'Executes the method once a year', false, 2, now(), now()),
    (v_q_id, 'Executes the method before the computer turns on', false, 3, now(), now()),
    (v_q_id, 'Deletes all temporary files on disk', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In JUnit 5, what is the purpose of the `@AfterEach` annotation?', 'Used to close database connections, delete temporary test files, or reset global state after each test.',
    'medium', 1, 0, 5, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Executes the annotated method after each individual test method completes, performing teardown and resource cleanup', true, 1, now(), now()),
    (v_q_id, 'Turns off the computer after testing', false, 2, now(), now()),
    (v_q_id, 'Deletes the source code file', false, 3, now(), now()),
    (v_q_id, 'Sends an email to the project manager', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In JUnit 5, how do `@BeforeAll` and `@AfterAll` differ from `@BeforeEach` and `@AfterEach`?', 'Used for expensive one-time setup operations (e.g., spinning up a Docker database container) shared across all tests in the class.',
    'medium', 1, 0, 6, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`@BeforeAll` and `@AfterAll` execute exactly once for the entire test class (must be static by default); `@BeforeEach` and `@AfterEach` execute for every test method', true, 1, now(), now()),
    (v_q_id, 'They are identical in every way', false, 2, now(), now()),
    (v_q_id, '`@BeforeAll` is only for Python; `@BeforeEach` is for Java', false, 3, now(), now()),
    (v_q_id, '`@BeforeAll` runs in the background', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In JUnit 5, which annotation is used to temporarily disable or ignore a test case?', 'JUnit 5 uses `@Disabled("Reason")`; JUnit 4 previously used `@Ignore`.',
    'easy', 1, 0, 7, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`@Disabled`', true, 1, now(), now()),
    (v_q_id, '`@Ignore`', false, 2, now(), now()),
    (v_q_id, '`@Skip`', false, 3, now(), now()),
    (v_q_id, '`@Delete`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Assertion in JUnit testing?', 'If the assertion condition is false, the assertion throws an `AssertionFailedError`, marking the test method as Failed.',
    'easy', 1, 0, 8, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A static utility method (e.g., `assertEquals()`, `assertTrue()`) that validates whether expected values match actual runtime values', true, 1, now(), now()),
    (v_q_id, 'An angry argument between two developers', false, 2, now(), now()),
    (v_q_id, 'A comment written in source code', false, 3, now(), now()),
    (v_q_id, 'A tool for measuring memory usage', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In JUnit 5, what is the advantage of `assertAll()` (Grouped Assertions)?', 'Grouped assertions ensure that if assertion 1 fails, assertions 2, 3, and 4 are still evaluated, providing a complete diagnostic picture.',
    'medium', 1, 0, 9, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Executes all bundled assertions and reports all failures together, rather than terminating early at the first failed assertion', true, 1, now(), now()),
    (v_q_id, 'Makes test execution twice as fast', false, 2, now(), now()),
    (v_q_id, 'Automatically fixes bugs in the code', false, 3, now(), now()),
    (v_q_id, 'Deletes failing assertions', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In JUnit 5, which method is used to assert that a specific exception is thrown by a piece of code?', 'Example: `assertThrows(ArithmeticException.class, () -> calc.divide(10, 0));` verifies expected defensive exceptions.',
    'medium', 1, 0, 10, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`assertThrows(Class<T> expectedType, Executable executable)`', true, 1, now(), now()),
    (v_q_id, '`catchException()`', false, 2, now(), now()),
    (v_q_id, '`expectError()`', false, 3, now(), now()),
    (v_q_id, '`verifyFailure()`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Parameterized Test in JUnit 5 (`@ParameterizedTest`)?', 'Eliminates duplicate boilerplate test code by executing the same test logic across multiple input data vectors.',
    'medium', 1, 0, 11, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A test that runs multiple times with different argument values injected from sources like `@ValueSource`, `@CsvSource`, or `@MethodSource`', true, 1, now(), now()),
    (v_q_id, 'A test that takes a long time to run', false, 2, now(), now()),
    (v_q_id, 'A test that uses mathematical parameters in equations', false, 3, now(), now()),
    (v_q_id, 'A test that measures the parameters of a computer screen', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Apache JMeter in software performance testing?', 'JMeter simulates heavy concurrent thread loads on HTTP, REST, SOAP, JDBC, FTP, and TCP servers to analyze throughput and response latency.',
    'easy', 1, 0, 12, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open-source Java application designed to load test functional behavior and measure performance of web applications and APIs under concurrent virtual user load', true, 1, now(), now()),
    (v_q_id, 'An electricity meter for measuring power consumption in offices', false, 2, now(), now()),
    (v_q_id, 'A software program for editing audio files', false, 3, now(), now()),
    (v_q_id, 'A web browser developed by the Apache foundation', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Thread Group'' in an Apache JMeter test plan?', 'A Thread Group of 500 threads with a 50-second ramp-up spawns 10 new virtual users every second until 500 concurrent users are active.',
    'easy', 1, 0, 13, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The fundamental element that controls the number of simulated concurrent virtual users, ramp-up time, and loop execution count', true, 1, now(), now()),
    (v_q_id, 'A group of software developers working together', false, 2, now(), now()),
    (v_q_id, 'A thread in a CPU processor', false, 3, now(), now()),
    (v_q_id, 'A chat room where testers send messages', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Apache JMeter, what is a ''Sampler''?', 'Samplers do the actual work of generating network traffic and measuring the elapsed response time in milliseconds.',
    'medium', 1, 0, 14, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A component that sends a specific request to a target server (e.g., HTTP Request, JDBC Request, FTP Request) and waits for a response', true, 1, now(), now()),
    (v_q_id, 'A person who tastes food in a restaurant', false, 2, now(), now()),
    (v_q_id, 'A tool that records audio samples', false, 3, now(), now()),
    (v_q_id, 'A small piece of hardware given away for free', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Apache JMeter, what is a ''Listener''?', 'Listeners process raw telemetry to calculate minimum, maximum, median, 95th percentile latency, and throughput (TPS).',
    'medium', 1, 0, 15, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A component that collects, visualizes, and tabulates test results and performance metrics (e.g., View Results Tree, Summary Report, Aggregate Graph)', true, 1, now(), now()),
    (v_q_id, 'A person who listens to music in an office', false, 2, now(), now()),
    (v_q_id, 'A microphone connected to a computer', false, 3, now(), now()),
    (v_q_id, 'A program that records telephone conversations', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Apache JMeter, what is an ''Assertion'' component?', 'Example: Response Assertion checking that HTTP status code is `200 OK` and response body contains `"status":"success"`.',
    'medium', 1, 0, 16, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A component that evaluates the server response (status code, headers, response body) to determine whether the test passed or failed', true, 1, now(), now()),
    (v_q_id, 'A comment written in an XML file', false, 2, now(), now()),
    (v_q_id, 'A tool for increasing internet download speeds', false, 3, now(), now()),
    (v_q_id, 'A physical button on a computer keyboard', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Apache JMeter, what is a ''Timer'' component used for?', 'Without timers, 100 virtual users would fire thousands of requests per second, skewing performance metrics away from realistic human usage.',
    'medium', 1, 0, 17, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To introduce realistic delays (think time) between sampler requests to simulate human user behavior rather than continuous robotic hammering', true, 1, now(), now()),
    (v_q_id, 'To measure how long an employee works each day', false, 2, now(), now()),
    (v_q_id, 'A digital clock displayed on the computer screen', false, 3, now(), now()),
    (v_q_id, 'A tool that shuts down the computer after 10 minutes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why must production load tests in Apache JMeter be executed in Non-GUI CLI mode?', 'Running in GUI mode distorts results: `jmeter -n -t plan.jmx -l results.jtl -e -o /report` ensures maximum load generation capacity.',
    'hard', 1, 0, 18, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because rendering the graphical user interface consumes substantial JVM heap memory and CPU cycles, corrupting performance latency measurements', true, 1, now(), now()),
    (v_q_id, 'Because the GUI mode is illegal to use in commercial companies', false, 2, now(), now()),
    (v_q_id, 'Because CLI mode is only for Linux computers', false, 3, now(), now()),
    (v_q_id, 'Because GUI mode does not support internet connections', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Throughput (Transactions Per Second - TPS) in Apache JMeter reports?', 'TPS is the primary capacity metric: higher throughput indicates the system handles larger volumes of concurrent customer traffic.',
    'easy', 1, 0, 19, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The number of requests or transactions processed successfully by the target server per unit of time (seconds, minutes)', true, 1, now(), now()),
    (v_q_id, 'The speed of the computer processor running JMeter', false, 2, now(), now()),
    (v_q_id, 'The percentage of memory consumed by the server', false, 3, now(), now()),
    (v_q_id, 'The physical weight of the server in kilograms', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the 95th Percentile Response Time in performance testing?', 'Far more representative than arithmetic mean because mean hides severe latency spikes experienced by unlucky tail-end users.',
    'medium', 1, 0, 20, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The response time threshold below which 95% of all observed user requests fell, isolating the slowest 5% of outliers', true, 1, now(), now()),
    (v_q_id, 'The average response time of the fastest 95 requests', false, 2, now(), now()),
    (v_q_id, 'A grade of 95% awarded to an algorithm', false, 3, now(), now()),
    (v_q_id, 'The speed of the network router in megabits', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mercury WinRunner in software testing history?', 'WinRunner popularized capture-and-replay GUI automation in the 1990s using its proprietary Test Scripting Language (TSL).',
    'easy', 1, 0, 21, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A pioneer commercial GUI automated functional testing tool developed by Mercury Interactive that recorded and played back user interactions using TSL', true, 1, now(), now()),
    (v_q_id, 'A racing video game developed for Windows', false, 2, now(), now()),
    (v_q_id, 'A tool for making computer processors run faster', false, 3, now(), now()),
    (v_q_id, 'An operating system developed in 1995', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What was the Test Scripting Language (TSL) used in WinRunner?', 'TSL allowed testers to edit recorded scripts, add conditional loops, and interface with GUI objects programmatically.',
    'medium', 1, 0, 22, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A proprietary C-like procedural scripting language used by Mercury WinRunner to automate GUI test actions and assertions', true, 1, now(), now()),
    (v_q_id, 'A language used by NASA satellites', false, 2, now(), now()),
    (v_q_id, 'A modern dialect of JavaScript', false, 3, now(), now()),
    (v_q_id, 'A database query language like SQL', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is HP LoadRunner?', 'Acquired by HP (later Micro Focus / OpenText), LoadRunner is the legacy enterprise gold standard for performance testing SAP, Citrix, and web applications.',
    'easy', 1, 0, 23, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An enterprise-grade commercial performance and load testing software tool capable of simulating thousands of concurrent virtual users across diverse protocols', true, 1, now(), now()),
    (v_q_id, 'A delivery truck used by Hewlett Packard', false, 2, now(), now()),
    (v_q_id, 'A computer battery charging tool', false, 3, now(), now()),
    (v_q_id, 'A hardware router manufactured by HP', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the core components of the HP LoadRunner architecture?', 'VuGen records scripts; Controller designs scenarios; Load Generators simulate virtual users; Analysis aggregates performance graphs.',
    'hard', 1, 0, 24, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Virtual User Generator (VuGen), Controller, Load Generator, and Analysis', true, 1, now(), now()),
    (v_q_id, 'Input, Output, Processing, and Storage', false, 2, now(), now()),
    (v_q_id, 'Client, Server, Database, and Router', false, 3, now(), now()),
    (v_q_id, 'Editor, Compiler, Linker, and Debugger', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is IBM Rational Robot in testing history?', 'Part of the IBM Rational Software suite, Rational Robot was widely used for automated testing of Windows 32-bit client/server applications.',
    'medium', 1, 0, 25, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A legacy automated functional and regression test tool that recorded and executed test scripts in SQA Basic for client-server applications', true, 1, now(), now()),
    (v_q_id, 'A physical mechanical robot manufactured by IBM', false, 2, now(), now()),
    (v_q_id, 'An artificial intelligence program that writes software', false, 3, now(), now()),
    (v_q_id, 'A computer game developed in 1998', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Record-and-Playback in automated testing tools?', 'Allows non-technical testers to generate automated test scripts without writing code; however, recorded scripts are notoriously fragile.',
    'easy', 1, 0, 26, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A feature that records human tester mouse clicks, typing, and navigation steps, automatically generating an executable test script for playback', true, 1, now(), now()),
    (v_q_id, 'Recording video of a tester''s face with a webcam', false, 2, now(), now()),
    (v_q_id, 'Playing music in an office while testing', false, 3, now(), now()),
    (v_q_id, 'A tool for recording telephone calls', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why are Record-and-Playback scripts considered fragile and high-maintenance?', 'A 5-pixel shift in button position or a 100ms asynchronous network delay causes recorded playback scripts to fail catastrophically.',
    'medium', 1, 0, 27, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'They rely on hardcoded absolute screen coordinates, brittle DOM paths, or static timing delays that break whenever visual layout slightly changes', true, 1, now(), now()),
    (v_q_id, 'Because the computer screen runs out of ink', false, 2, now(), now()),
    (v_q_id, 'Because recorded scripts delete themselves after 24 hours', false, 3, now(), now()),
    (v_q_id, 'Because scripts are written in pencil', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Data-Driven Testing (DDT) Framework?', 'Separates test logic from test data, allowing a single automated script to execute hundreds of test scenarios simply by adding rows to an Excel sheet.',
    'medium', 1, 0, 28, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An automation framework where test input and expected output data are externalized into external files (Excel, CSV, JSON, DB) while test logic remains in a single script', true, 1, now(), now()),
    (v_q_id, 'A framework where tests write data into hard drives', false, 2, now(), now()),
    (v_q_id, 'A framework that only tests database software', false, 3, now(), now()),
    (v_q_id, 'A framework developed by data science teams', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Keyword-Driven (Table-Driven) Testing Framework?', 'Allows non-technical business analysts to construct automated tests by assembling predefined keywords in spreadsheets without touching code.',
    'medium', 1, 0, 29, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An automation framework where test steps are expressed as discrete action keywords (e.g., `Click`, `EnterText`, `Verify`) in a tabular spreadsheet', true, 1, now(), now()),
    (v_q_id, 'A framework that searches for keywords in books', false, 2, now(), now()),
    (v_q_id, 'A framework used by search engine companies', false, 3, now(), now()),
    (v_q_id, 'A framework that uses computer keyboards', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Hybrid Test Automation Framework?', 'The modern industry standard: modular page objects, externalized data sources, custom keywords, and integrated HTML reporting.',
    'medium', 1, 0, 30, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A framework that combines the best architectural elements of Data-Driven, Keyword-Driven, and Modular automation frameworks', true, 1, now(), now()),
    (v_q_id, 'A car engine that runs on gasoline and electricity', false, 2, now(), now()),
    (v_q_id, 'A framework that runs on Windows and Linux simultaneously', false, 3, now(), now()),
    (v_q_id, 'A framework written in two programming languages', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Selenium WebDriver in modern web test automation?', 'The universal industry standard for automated cross-browser testing across Chrome, Firefox, Safari, and Edge.',
    'easy', 1, 0, 31, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open-source browser automation framework that controls browser engines natively using browser drivers and W3C WebDriver standard protocols', true, 1, now(), now()),
    (v_q_id, 'A chemical element used in computer batteries', false, 2, now(), now()),
    (v_q_id, 'A web browser developed by Google', false, 3, now(), now()),
    (v_q_id, 'A software program for editing video files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the W3C WebDriver Standard?', 'Standardized the JSON Wire Protocol into a native browser standard, ensuring identical automation behavior across all browser vendors.',
    'medium', 1, 0, 32, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An official W3C specification that standardizes the RESTful HTTP wire protocol used by test automation tools to interact with web browsers', true, 1, now(), now()),
    (v_q_id, 'A standard for manufacturing computer keyboards', false, 2, now(), now()),
    (v_q_id, 'A protocol for sending emails between browsers', false, 3, now(), now()),
    (v_q_id, 'A software license agreement', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Cypress in modern web testing?', 'Unlike Selenium (which runs outside the browser and commands via HTTP), Cypress runs inside the browser, offering ultra-fast, flakeless execution.',
    'medium', 1, 0, 33, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A next-generation, front-end testing tool built for the modern web that executes directly inside the same browser run loop as the application', true, 1, now(), now()),
    (v_q_id, 'A species of tree planted near data centers', false, 2, now(), now()),
    (v_q_id, 'A computer processor manufactured by AMD', false, 3, now(), now()),
    (v_q_id, 'A software program for compressing images', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Playwright in modern test automation?', 'Supports Chromium, WebKit, and Firefox with native bidirectional WebSocket connections, automatic waiting, and zero setup friction.',
    'easy', 1, 0, 34, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open-source automation library by Microsoft enabling fast, reliable, headless and headed cross-browser testing using the Chrome DevTools Protocol (CDP)', true, 1, now(), now()),
    (v_q_id, 'A person who writes theatrical plays', false, 2, now(), now()),
    (v_q_id, 'A software tool for editing audio scripts', false, 3, now(), now()),
    (v_q_id, 'A proprietary operating system developed by Microsoft', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mockito in Java unit testing?', 'Used in conjunction with JUnit to mock out complex dependencies: `when(mockRepo.findById(1)).thenReturn(mockUser);`.',
    'medium', 1, 0, 35, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A popular open-source mocking framework that allows the creation of mock objects, stubbing method calls, and verifying interactions in unit tests', true, 1, now(), now()),
    (v_q_id, 'A Cuban mint and lime cocktail drink', false, 2, now(), now()),
    (v_q_id, 'A software program for editing photographs', false, 3, now(), now()),
    (v_q_id, 'A database management engine developed by Apache', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between a Mock and a Stub in automated testing (Gerard Meszaros)?', 'Stubs verify **state** (what the method returns); Mocks verify **behavior** (verifying that `save()` was called exactly once with specific parameters).',
    'hard', 1, 0, 36, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A Stub provides pre-programmed canned answers to method calls during the test; a Mock also verifies that expected method interactions actually occurred', true, 1, now(), now()),
    (v_q_id, 'Mocks are real; Stubs are fake', false, 2, now(), now()),
    (v_q_id, 'Stubs are for Java; Mocks are for Python', false, 3, now(), now()),
    (v_q_id, 'There is no difference between them', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is TestNG in Java testing?', 'Widely used in enterprise Selenium test suites due to its rich XML configuration, parallel test suite execution, and flexible `@DataProvider` support.',
    'medium', 1, 0, 37, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A testing framework inspired by JUnit and NUnit introducing advanced features like data providers, test grouping, dependency testing, and multi-thread execution', true, 1, now(), now()),
    (v_q_id, 'A television network broadcasting technology news', false, 2, now(), now()),
    (v_q_id, 'A new programming language developed by Google', false, 3, now(), now()),
    (v_q_id, 'A tool for compressing video files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is PyTest in Python software engineering?', 'Replaces legacy boilerplate `unittest.TestCase` with clean, idiomatic Python assertions and composable dependency-injected fixtures.',
    'easy', 1, 0, 38, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A mature, full-featured Python testing framework that uses simple native `assert` statements, powerful fixtures, and a vast plugin ecosystem', true, 1, now(), now()),
    (v_q_id, 'A tool for testing Python typing speed', false, 2, now(), now()),
    (v_q_id, 'A software program for drawing charts', false, 3, now(), now()),
    (v_q_id, 'A compiler that converts Python into C++', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Postman in API testing and development?', 'Provides a graphical UI for constructing HTTP requests, writing JavaScript test assertions, and running automated collection test runners (Newman).',
    'easy', 1, 0, 39, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A collaboration platform for API development that allows developers to design, mock, debug, automate, and monitor REST/SOAP HTTP requests', true, 1, now(), now()),
    (v_q_id, 'A person who delivers physical letters to offices', false, 2, now(), now()),
    (v_q_id, 'A software program for managing email inboxes', false, 3, now(), now()),
    (v_q_id, 'A tool for printing shipping labels on boxes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Newman in API test automation?', 'Enables teams to export Postman collections and run them inside GitHub Actions or Jenkins: `newman run collection.json -e env.json`.',
    'medium', 1, 0, 40, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The official command-line collection runner for Postman that allows Postman API test suites to execute headlessly in CI/CD server pipelines', true, 1, now(), now()),
    (v_q_id, 'A character on a popular television comedy', false, 2, now(), now()),
    (v_q_id, 'A programming language developed by IBM', false, 3, now(), now()),
    (v_q_id, 'A database indexing engine', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is SoapUI in web services testing?', 'The premier tool for legacy enterprise SOAP testing, parsing WSDL contracts and generating automated schema validation suites.',
    'medium', 1, 0, 41, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open-source test automation tool specifically designed for testing SOAP web services and RESTful APIs with WSDL inspection and WS-Security', true, 1, now(), now()),
    (v_q_id, 'A soap brand used to clean computer hardware', false, 2, now(), now()),
    (v_q_id, 'A web browser developed for washing machines', false, 3, now(), now()),
    (v_q_id, 'A tool for creating website animations', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Appium in mobile test automation?', 'Appium enables writing one test script that executes identically on both Android (via UiAutomator2) and iOS (via XCUITest).',
    'medium', 1, 0, 42, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open-source, cross-platform test automation framework for native, hybrid, and mobile web applications on iOS and Android using the WebDriver protocol', true, 1, now(), now()),
    (v_q_id, 'A chemical element discovered in computer chips', false, 2, now(), now()),
    (v_q_id, 'A mobile phone manufactured by Google', false, 3, now(), now()),
    (v_q_id, 'An app store for downloading smartphone games', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Robot Framework?', 'Built in Python, Robot Framework allows non-programmers to write human-readable test cases using tabular keyword libraries.',
    'medium', 1, 0, 43, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A generic open-source automation framework for acceptance testing and robotic process automation (RPA) utilizing a keyword-driven tabular syntax', true, 1, now(), now()),
    (v_q_id, 'A physical mechanical robot assembled in a factory', false, 2, now(), now()),
    (v_q_id, 'A software program that plays chess games', false, 3, now(), now()),
    (v_q_id, 'A tool for cleaning computer hardware', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is SonarQube in continuous software quality inspection?', 'Integrates into CI/CD pipelines to enforce static code Quality Gates, tracking technical debt, test coverage, and OWASP security compliance.',
    'easy', 1, 0, 44, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open-source platform for continuous code quality and security inspection, analyzing code across 30+ languages for bugs, vulnerabilities, and code smells', true, 1, now(), now()),
    (v_q_id, 'A sonar device used on submarine ships', false, 2, now(), now()),
    (v_q_id, 'A musical instrument played in digital orchestras', false, 3, now(), now()),
    (v_q_id, 'An operating system developed for audio editing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Jacoco (Java Code Coverage Library)?', 'Generates detailed visual HTML code coverage reports and enforces minimum coverage thresholds in Maven and Gradle builds.',
    'medium', 1, 0, 45, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A free, open-source code coverage library for Java that measures line, instruction, and branch coverage during JUnit test execution', true, 1, now(), now()),
    (v_q_id, 'A hot tub used for employee relaxation', false, 2, now(), now()),
    (v_q_id, 'A brand of coffee popular with programmers', false, 3, now(), now()),
    (v_q_id, 'A software tool for formatting hard drives', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Istanbul / NYC in JavaScript test coverage?', 'Instruments JavaScript code to generate visual coverage summaries when running Jest, Mocha, or Vitest suites.',
    'medium', 1, 0, 46, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A widely used code coverage tool for JavaScript and Node.js that tracks statement, branch, function, and line execution during test runs', true, 1, now(), now()),
    (v_q_id, 'A city in Turkey where computers are made', false, 2, now(), now()),
    (v_q_id, 'A web browser developed in Europe', false, 3, now(), now()),
    (v_q_id, 'A programming language developed by Facebook', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is K6 (by Grafana) in modern load testing?', 'A lightweight, CLI-first alternative to JMeter that treats performance tests as code stored directly in Git repositories.',
    'medium', 1, 0, 47, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A modern, developer-centric open-source load testing tool where performance test scripts are written in ES6 JavaScript with a high-performance Go runner', true, 1, now(), now()),
    (v_q_id, 'A mountain climbed by adventurous software testers', false, 2, now(), now()),
    (v_q_id, 'A sports car manufactured in Germany', false, 3, now(), now()),
    (v_q_id, 'An encryption algorithm developed by Grafana', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Gatling in load testing?', 'Simulates tens of thousands of virtual users on a single machine with minimal CPU overhead, generating rich HTML performance reports.',
    'medium', 1, 0, 48, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open-source load testing framework based on Scala, Akka, and Netty designed for high performance, utilizing an asynchronous non-blocking engine', true, 1, now(), now()),
    (v_q_id, 'A vintage multi-barrel machine gun', false, 2, now(), now()),
    (v_q_id, 'A software tool for editing video files', false, 3, now(), now()),
    (v_q_id, 'A database management engine developed by IBM', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Self-Healing Test Automation in AI-powered testing?', 'Reduces test maintenance by up to 70% by dynamically adapting to minor UI redesigns without requiring human tester intervention.',
    'medium', 1, 0, 49, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'AI algorithms that detect when an HTML element locator has changed, automatically analyzing DOM context to adapt and keep test scripts executing without failing', true, 1, now(), now()),
    (v_q_id, 'A broken computer screen that repairs its own glass', false, 2, now(), now()),
    (v_q_id, 'A software virus that deletes itself after being discovered', false, 3, now(), now()),
    (v_q_id, 'A computer battery that recharges without electricity', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Primary Criterion for choosing between Commercial and Open-Source Testing Tools?', 'Open-source excels in modern web/CI/CD pipelines with skilled developers; commercial tools provide turnkey support for legacy enterprise stacks.',
    'easy', 1, 0, 50, ARRAY['BCA-441E', 'Unit-5', 'BCA-441E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Evaluating total cost of ownership (TCO), vendor support SLAs, specialized enterprise protocol needs (SAP/Citrix), and team programming skills', true, 1, now(), now()),
    (v_q_id, 'Picking whichever tool has the prettiest logo', false, 2, now(), now()),
    (v_q_id, 'Buying the most expensive tool available', false, 3, now(), now()),
    (v_q_id, 'Using only tools written in C++', false, 4, now(), now());

END $SEEDED_BLOCK$;
