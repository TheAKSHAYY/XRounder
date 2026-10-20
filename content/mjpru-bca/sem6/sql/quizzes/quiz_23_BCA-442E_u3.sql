DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-442E Unit 3 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '627b394e-7e9b-5c99-809f-0f3412bf114e', 'BCA-442E Unit 3: Node.js and Express.js Server-Side Engineering Practice Quiz (50 MCQs)', 'bca-442e-u3-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-442E Unit 3. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is Node.js and who created it in 2009?', 'Ryan Dahl created Node.js to bring event-driven, non-blocking asynchronous I/O to server-side web development.',
    'easy', 1, 0, 1, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open-source, cross-platform JavaScript runtime built on Chrome''s V8 engine, created by Ryan Dahl', true, 1, now(), now()),
    (v_q_id, 'A relational database created by Oracle', false, 2, now(), now()),
    (v_q_id, 'A web browser developed by Apple', false, 3, now(), now()),
    (v_q_id, 'An operating system developed by Microsoft', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is libuv in Node.js architecture?', 'libuv abstracts operating system asynchronous I/O primitives (epoll on Linux, kqueue on macOS, IOCP on Windows) into a unified loop.',
    'medium', 1, 0, 2, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A multi-platform C library that handles the event loop, non-blocking asynchronous I/O, and thread pool management', true, 1, now(), now()),
    (v_q_id, 'A graphics library for drawing buttons', false, 2, now(), now()),
    (v_q_id, 'A database connector for PostgreSQL', false, 3, now(), now()),
    (v_q_id, 'A sound library for playing audio', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does Node.js achieve high concurrency despite running on a single main JavaScript thread?', 'Non-blocking asynchronous I/O ensures the main execution thread never sits idle waiting for network or disk operations.',
    'easy', 1, 0, 3, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'By delegating blocking operations (file I/O, crypto, network requests) to the libuv thread pool and OS kernel, handling results asynchronously via callbacks', true, 1, now(), now()),
    (v_q_id, 'By cloning the CPU into multiple physical chips', false, 2, now(), now()),
    (v_q_id, 'By running code twice as fast as other languages', false, 3, now(), now()),
    (v_q_id, 'By using quantum computing processors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the default number of worker threads in the libuv thread pool?', 'libuv allocates 4 background C worker threads by default to handle blocking file operations, DNS lookups, and crypto hashing.',
    'medium', 1, 0, 4, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '4 threads (configurable via `UV_THREADPOOL_SIZE` up to 1024)', true, 1, now(), now()),
    (v_q_id, '1 thread', false, 2, now(), now()),
    (v_q_id, '64 threads', false, 3, now(), now()),
    (v_q_id, '1000 threads', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between `process.nextTick()` and `setImmediate()` in Node.js?', '`process.nextTick()` drains microtasks aggressively; excessive recursive calls can starve the event loop entirely.',
    'hard', 1, 0, 5, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`process.nextTick()` executes immediately after the current operation finishes before any event loop phase transitions; `setImmediate()` executes in the Check phase', true, 1, now(), now()),
    (v_q_id, '`setImmediate()` runs before `process.nextTick()`', false, 2, now(), now()),
    (v_q_id, 'They are identical in every way', false, 3, now(), now()),
    (v_q_id, '`process.nextTick()` runs on the next day', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the purpose of `package.json` in a Node.js project?', 'Defines dependencies (`dependencies`, `devDependencies`), entry point (`main`), and executable tasks (`npm start`, `npm test`).',
    'easy', 1, 0, 6, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The manifest file that holds project metadata, dependency package lists, script commands, and configuration settings', true, 1, now(), now()),
    (v_q_id, 'A file that stores all user passwords', false, 2, now(), now()),
    (v_q_id, 'A compiled binary machine code file', false, 3, now(), now()),
    (v_q_id, 'A temporary cache file deleted daily', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between `dependencies` and `devDependencies` in `package.json`?', 'Running `npm install --production` skips `devDependencies`, keeping production server deployment images small and secure.',
    'easy', 1, 0, 7, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`dependencies` are required for production runtime; `devDependencies` are only required during development and testing (e.g., nodemon, jest)', true, 1, now(), now()),
    (v_q_id, '`dependencies` are free; `devDependencies` cost money', false, 2, now(), now()),
    (v_q_id, '`devDependencies` are for hardware only', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the purpose of `package-lock.json`?', 'Guarantees that deploying the project on a server tomorrow installs the exact identical dependency tree as on the developer''s laptop today.',
    'medium', 1, 0, 8, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Locks the exact resolved versions and cryptographic integrity hashes of every installed dependency to guarantee reproducible builds across environments', true, 1, now(), now()),
    (v_q_id, 'A file that locks the computer keyboard', false, 2, now(), now()),
    (v_q_id, 'A password manager for developers', false, 3, now(), now()),
    (v_q_id, 'A file that prevents anyone from editing code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between CommonJS (`require`) and ES Modules (`import`) in Node.js?', 'Modern Node.js supports native ES Modules by setting `"type": "module"` in `package.json` or using the `.mjs` file extension.',
    'medium', 1, 0, 9, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'CommonJS is synchronous and uses `require()` / `module.exports`; ES Modules is asynchronous, static, and uses `import` / `export`', true, 1, now(), now()),
    (v_q_id, 'CommonJS is for Python; ES Modules is for Java', false, 2, now(), now()),
    (v_q_id, 'CommonJS was invented in 2024', false, 3, now(), now()),
    (v_q_id, 'They are identical in every way', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the `EventEmitter` class in Node.js (`events` module)?', 'Streams, HTTP servers, and sockets in Node.js inherit from `EventEmitter` to signal lifecycle milestones asynchronously.',
    'medium', 1, 0, 10, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A core class that enables event-driven architecture by providing `.on()` to register listeners and `.emit()` to fire named events', true, 1, now(), now()),
    (v_q_id, 'A tool for broadcasting radio signals', false, 2, now(), now()),
    (v_q_id, 'A hardware sensor that detects heat', false, 3, now(), now()),
    (v_q_id, 'A method for sending marketing emails', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Buffer in Node.js?', 'Essential for reading binary files, image streams, TCP network sockets, and cryptographic ciphertext.',
    'medium', 1, 0, 11, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A global class that handles raw binary data directly allocated outside the V8 JavaScript heap in native memory', true, 1, now(), now()),
    (v_q_id, 'A tool for polishing computer screens', false, 2, now(), now()),
    (v_q_id, 'A temporary folder on a hard drive', false, 3, now(), now()),
    (v_q_id, 'An error message displayed on monitors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the 4 fundamental stream types in Node.js?', 'Streams process large datasets chunk-by-chunk without loading entire multi-gigabyte files into RAM.',
    'medium', 1, 0, 12, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Readable, Writable, Duplex (both readable & writable), and Transform (modifies data as it is written/read)', true, 1, now(), now()),
    (v_q_id, 'Input, Output, Storage, and Processing', false, 2, now(), now()),
    (v_q_id, 'Fast, Normal, Slow, and Paused', false, 3, now(), now()),
    (v_q_id, 'Text, Binary, Image, and Audio', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Backpressure in Node.js Streams?', 'When a consumer''s internal buffer fills up, `.pipe()` pauses the incoming stream until the buffer drains, preventing Out-Of-Memory crashes.',
    'hard', 1, 0, 13, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A condition where data is read or written faster than the downstream consumer can process, handled automatically by `.pipe()`', true, 1, now(), now()),
    (v_q_id, 'Air pressure inside computer cooling fans', false, 2, now(), now()),
    (v_q_id, 'A physical blockage inside network cables', false, 3, now(), now()),
    (v_q_id, 'A programming error that crashes databases', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Express.js?', 'The dominant backend Node.js framework for developing RESTful APIs and server-side web applications.',
    'easy', 1, 0, 14, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A minimalist, flexible, and unopinionated web application framework for Node.js that simplifies routing and middleware handling', true, 1, now(), now()),
    (v_q_id, 'A delivery service for physical computer hardware', false, 2, now(), now()),
    (v_q_id, 'A database management system like MongoDB', false, 3, now(), now()),
    (v_q_id, 'A web browser developed by Mozilla', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Middleware in Express.js?', 'Middleware can execute code, modify `req` and `res` objects, end the request cycle, or pass control to `next()`.',
    'easy', 1, 0, 15, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A function that has access to the request (`req`), response (`res`), and next middleware function (`next`) in the application’s request-response cycle', true, 1, now(), now()),
    (v_q_id, 'Hardware cables located in the middle of a server rack', false, 2, now(), now()),
    (v_q_id, 'Software that connects a keyboard to a computer', false, 3, now(), now()),
    (v_q_id, 'A database table storing middle names', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What happens if an Express middleware function does NOT call `next()` and does NOT send a response (`res.send()`)?', 'Every middleware must either terminate the cycle by sending a response or call `next()` to pass execution along.',
    'easy', 1, 0, 16, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The client request will hang indefinitely until the browser or network gateway times out with an error', true, 1, now(), now()),
    (v_q_id, 'The server automatically restarts', false, 2, now(), now()),
    (v_q_id, 'The code throws a syntax error', false, 3, now(), now()),
    (v_q_id, 'The database is deleted', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between `app.use()` and `app.get()` in Express?', '`app.use(''/api'', authMiddleware)` executes for GET, POST, PUT, DELETE requests starting with `/api`.',
    'easy', 1, 0, 17, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`app.use()` mounts middleware for all HTTP methods on matching paths; `app.get()` handles strictly HTTP GET requests', true, 1, now(), now()),
    (v_q_id, '`app.use()` is for databases; `app.get()` is for HTML', false, 2, now(), now()),
    (v_q_id, '`app.get()` is obsolete in modern Express', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do you extract URL route parameters in Express (e.g., from `/courses/:courseId`)?', '`req.params` parses colon route parameters; `req.query` parses URL query strings (`?sort=asc`); `req.body` parses POST payloads.',
    'easy', 1, 0, 18, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`req.params.courseId`', true, 1, now(), now()),
    (v_q_id, '`req.query.courseId`', false, 2, now(), now()),
    (v_q_id, '`req.body.courseId`', false, 3, now(), now()),
    (v_q_id, '`req.headers.courseId`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do you extract URL query string parameters in Express (e.g., `/search?query=bca&limit=10`)?', 'Express automatically parses URL query strings into a key-value object accessible on `req.query`.',
    'easy', 1, 0, 19, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`req.query.query` and `req.query.limit`', true, 1, now(), now()),
    (v_q_id, '`req.params.query`', false, 2, now(), now()),
    (v_q_id, '`req.body.query`', false, 3, now(), now()),
    (v_q_id, '`req.headers.query`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What middleware is required in Express to parse incoming JSON request payloads in `req.body`?', 'Built directly into Express (replaces the older external `body-parser` library) to parse incoming `Content-Type: application/json` payloads.',
    'easy', 1, 0, 20, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`app.use(express.json());`', true, 1, now(), now()),
    (v_q_id, '`app.use(express.text());`', false, 2, now(), now()),
    (v_q_id, '`app.use(express.static());`', false, 3, now(), now()),
    (v_q_id, '`app.use(express.formData());`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the signature of an Error-Handling Middleware in Express.js?', 'Express specifically checks the function''s `length === 4` property to identify it as an error-handling middleware.',
    'medium', 1, 0, 21, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A function that takes exactly four arguments: `(err, req, res, next) => {}`', true, 1, now(), now()),
    (v_q_id, 'A function with two arguments: `(err, req) => {}`', false, 2, now(), now()),
    (v_q_id, 'A function with zero arguments', false, 3, now(), now()),
    (v_q_id, 'A function that has `try` and `catch` in its name', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is CORS (Cross-Origin Resource Sharing) in web API development?', 'Configured in Express using the `cors` middleware to set `Access-Control-Allow-Origin` headers for frontend SPAs.',
    'easy', 1, 0, 22, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A security mechanism that allows or restricts web applications running on one origin domain from requesting resources from a different origin domain', true, 1, now(), now()),
    (v_q_id, 'A tool for sharing passwords between developers', false, 2, now(), now()),
    (v_q_id, 'A method for increasing internet speeds', false, 3, now(), now()),
    (v_q_id, 'A protocol for connecting monitors to computers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Helmet in Express.js security?', '`app.use(helmet())` automatically protects against common web vulnerabilities like clickjacking and MIME sniffing.',
    'medium', 1, 0, 23, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A middleware package that sets various HTTP security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options) to secure Express apps', true, 1, now(), now()),
    (v_q_id, 'A physical helmet worn in server data centers', false, 2, now(), now()),
    (v_q_id, 'A tool for preventing computers from falling', false, 3, now(), now()),
    (v_q_id, 'An encryption algorithm developed by IBM', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Nodemon in Node.js development?', 'Eliminates the tedious need to manually stop (`Ctrl+C`) and restart (`node server.js`) the server after every code modification.',
    'easy', 1, 0, 24, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A development utility that automatically restarts the Node.js application whenever source code files in the project directory are edited and saved', true, 1, now(), now()),
    (v_q_id, 'A database management system like MongoDB', false, 2, now(), now()),
    (v_q_id, 'A testing framework for Java', false, 3, now(), now()),
    (v_q_id, 'A software program for drawing graphics', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the purpose of `express.static()` middleware?', '`app.use(express.static(''public''));` serves files located in the `public` folder directly over HTTP.',
    'easy', 1, 0, 25, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To serve static files (HTML, CSS, client JavaScript, images) directly from a specified directory', true, 1, now(), now()),
    (v_q_id, 'To prevent a server from moving physically', false, 2, now(), now()),
    (v_q_id, 'To freeze an application so it cannot be updated', false, 3, now(), now()),
    (v_q_id, 'To encrypt files with AES-256', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between `res.send()`, `res.json()`, and `res.end()`?', '`res.json()` converts non-object values (null, undefined) to valid JSON and sets proper headers automatically.',
    'medium', 1, 0, 26, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`res.json()` explicitly formats and sends JSON with `Content-Type: application/json`; `res.send()` sends general responses; `res.end()` ends without data', true, 1, now(), now()),
    (v_q_id, 'They are identical in every way', false, 2, now(), now()),
    (v_q_id, '`res.json()` only works with Python', false, 3, now(), now()),
    (v_q_id, '`res.end()` turns off the server', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Cluster module in Node.js?', 'Allows single-threaded Node.js to scale horizontally across multi-core server processors (e.g., spawning 8 workers on an 8-core CPU).',
    'medium', 1, 0, 27, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A built-in module that enables creating child processes (workers) that run simultaneously and share the same server port to utilize all CPU cores', true, 1, now(), now()),
    (v_q_id, 'A cluster of computer monitors on a desk', false, 2, now(), now()),
    (v_q_id, 'A tool for clustering data in machine learning', false, 3, now(), now()),
    (v_q_id, 'A physical rack holding multiple computers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is PM2 in Node.js production deployment?', 'The standard production CLI manager: `pm2 start server.js -i max` runs instances across all available CPU cores with auto-restart on crashes.',
    'medium', 1, 0, 28, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A production process manager for Node.js applications with a built-in load balancer, automated restarts on crash, and zero-downtime reloads', true, 1, now(), now()),
    (v_q_id, 'A text editor like Notepad', false, 2, now(), now()),
    (v_q_id, 'A web browser developed by Google', false, 3, now(), now()),
    (v_q_id, 'A tool for testing network bandwidth', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Environment Variable (`process.env`) in Node.js?', 'Managed in development using the `dotenv` package (`import ''dotenv/config''`), keeping secret credentials out of Git repositories.',
    'easy', 1, 0, 29, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Global variables provided by the execution environment used to store configuration secrets (database URLs, API keys, ports) outside source code', true, 1, now(), now()),
    (v_q_id, 'Variables that control office air conditioning', false, 2, now(), now()),
    (v_q_id, 'Variables that change colors on computer screens', false, 3, now(), now()),
    (v_q_id, 'Variables that delete temporary files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is JWT (JSON Web Token) authentication architecture in Express REST APIs?', 'The server verifies the digital signature of incoming `Authorization: Bearer <token>` headers without querying a session database on every request.',
    'medium', 1, 0, 30, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A stateless token-based authentication mechanism where the server issues a signed JWT to the client upon login, which the client transmits in headers', true, 1, now(), now()),
    (v_q_id, 'A method for saving passwords in plain text', false, 2, now(), now()),
    (v_q_id, 'A tool for encrypting hard drives', false, 3, now(), now()),
    (v_q_id, 'An operating system user account', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the three parts of a JSON Web Token (JWT)?', 'Formatted as three Base64URL-encoded strings separated by dots: `header.payload.signature`.',
    'easy', 1, 0, 31, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Header (algorithm & token type), Payload (claims/user data), and Signature (HMAC/RSA hash)', true, 1, now(), now()),
    (v_q_id, 'Username, Password, and Email', false, 2, now(), now()),
    (v_q_id, 'Input, Output, and Processing', false, 3, now(), now()),
    (v_q_id, 'First Name, Middle Name, and Last Name', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Bcrypt in Node.js authentication?', '`bcrypt.hash(password, 12)` generates a slow, salt-protected hash that thwarts rainbow table and GPU dictionary attacks.',
    'medium', 1, 0, 32, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A password-hashing function based on the Blowfish cipher incorporating salt and adaptive work factor cost to resist brute-force attacks', true, 1, now(), now()),
    (v_q_id, 'A tool for compressing video files', false, 2, now(), now()),
    (v_q_id, 'A database query language', false, 3, now(), now()),
    (v_q_id, 'A web server framework like Express', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the purpose of `express-rate-limit` middleware?', 'Restricts IP addresses to a maximum number of requests within a sliding time window (e.g., max 5 login attempts per 15 minutes).',
    'easy', 1, 0, 33, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To limit repeated requests to public APIs and endpoints (like login forms) to prevent brute-force attacks and Denial of Service (DoS)', true, 1, now(), now()),
    (v_q_id, 'To increase internet download speeds', false, 2, now(), now()),
    (v_q_id, 'To limit employee work hours', false, 3, now(), now()),
    (v_q_id, 'To measure computer processor speed', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Memory Leak in Node.js and what tool is used to detect it?', 'Taking heap snapshots and comparing memory diffs identifies objects that retain references and escape garbage collection.',
    'medium', 1, 0, 34, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Unintended accumulation of memory in the V8 heap caused by uncleaned global caches, closures, or listeners, diagnosed using heap snapshots in Chrome DevTools', true, 1, now(), now()),
    (v_q_id, 'A physical crack on a RAM stick', false, 2, now(), now()),
    (v_q_id, 'A program deleting files from disk', false, 3, now(), now()),
    (v_q_id, 'An error caused by unplugging a server', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the `fs` (File System) module in Node.js?', 'Offers asynchronous callback, promise-based (`fs/promises`), and synchronous (`fs.readFileSync()`) file manipulation methods.',
    'easy', 1, 0, 35, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A built-in module providing both synchronous and asynchronous APIs to interact with the file system (reading, writing, deleting files)', true, 1, now(), now()),
    (v_q_id, 'A module for creating fonts', false, 2, now(), now()),
    (v_q_id, 'A database engine developed by Node.js', false, 3, now(), now()),
    (v_q_id, 'A tool for formatting hard drives', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why should synchronous file methods (e.g., `fs.readFileSync`) be AVOIDED in production Express web servers?', 'Blocking the event loop for even 50ms degrades latency for hundreds of other concurrent incoming HTTP requests.',
    'medium', 1, 0, 36, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because synchronous methods block the single Node.js event loop thread, freezing the server and delaying all concurrent user requests until file I/O finishes', true, 1, now(), now()),
    (v_q_id, 'Because synchronous methods are illegal in JavaScript', false, 2, now(), now()),
    (v_q_id, 'Because synchronous methods delete the file', false, 3, now(), now()),
    (v_q_id, 'Because they only work on Windows', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Path Traversal vulnerability (Directory Traversal) in Node.js file serving?', 'Mitigated using `path.normalize()` and verifying that the resolved absolute path starts strictly within the designated public directory.',
    'medium', 1, 0, 37, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An exploit where an attacker inputs `../` sequences into file download endpoints to read sensitive system files (e.g., `/etc/passwd`) outside the web root', true, 1, now(), now()),
    (v_q_id, 'A software program that walks through computer directories', false, 2, now(), now()),
    (v_q_id, 'A physical path inside a computer data center', false, 3, now(), now()),
    (v_q_id, 'A tool for organizing music files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the `path` module in Node.js?', '`path.join(__dirname, ''uploads'', filename)` automatically formats correct directory slash separators across Windows, Linux, and macOS.',
    'easy', 1, 0, 38, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A built-in module providing utilities for working with and resolving file and directory paths across different operating systems (Windows `\` vs POSIX `/`)', true, 1, now(), now()),
    (v_q_id, 'A tool for drawing lines on computer monitors', false, 2, now(), now()),
    (v_q_id, 'A program that tracks mouse movements', false, 3, now(), now()),
    (v_q_id, 'A database for storing URL links', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is `__dirname` in CommonJS Node.js modules?', 'Provides reliable absolute path resolution regardless of what directory the node command was executed from.',
    'easy', 1, 0, 39, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A global variable representing the absolute directory path of the currently executing JavaScript source file', true, 1, now(), now()),
    (v_q_id, 'The name of the user who logged into the computer', false, 2, now(), now()),
    (v_q_id, 'The name of the operating system', false, 3, now(), now()),
    (v_q_id, 'A function that deletes folders', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In ES Modules (ESM) where `__dirname` is not defined, how is the current file directory resolved?', 'Node.js 20.11+ natively introduced `import.meta.dirname` and `import.meta.filename` for ES Modules.',
    'medium', 1, 0, 40, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`import.meta.dirname` (in modern Node) or `path.dirname(fileURLToPath(import.meta.url))`', true, 1, now(), now()),
    (v_q_id, '`process.cwd()`', false, 2, now(), now()),
    (v_q_id, '`window.location`', false, 3, now(), now()),
    (v_q_id, '`document.baseURI`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Asynchronous Middleware Wrapper in Express.js?', 'Prevents unhandled promise rejections: `const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);`.',
    'medium', 1, 0, 41, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A utility function that wraps async route handlers to automatically catch rejected promises and forward errors to `next(err)`', true, 1, now(), now()),
    (v_q_id, 'A tool for wrapping physical computer wires with tape', false, 2, now(), now()),
    (v_q_id, 'A program that converts JavaScript into Python', false, 3, now(), now()),
    (v_q_id, 'An encryption algorithm', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between `npm install` and `npm ci`?', '`npm ci` (Clean Install) removes `node_modules` and builds the exact locked dependency tree, guaranteeing 100% build reproducibility in CI pipelines.',
    'medium', 1, 0, 42, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`npm install` can update `package-lock.json`; `npm ci` installs strictly the exact dependencies from `package-lock.json` and is faster for CI/CD pipelines', true, 1, now(), now()),
    (v_q_id, 'They are identical in every way', false, 2, now(), now()),
    (v_q_id, '`npm ci` is only for Windows', false, 3, now(), now()),
    (v_q_id, '`npm ci` deletes all project source code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Semantic Versioning (SemVer) used by NPM (`major.minor.patch`)?', 'Example: `^1.2.3` permits minor and patch updates ($< 2.0.0$); `~1.2.3` permits only patch updates ($< 1.3.0$).',
    'easy', 1, 0, 43, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A versioning format where: `major` = breaking API changes; `minor` = backwards-compatible new features; `patch` = backwards-compatible bug fixes', true, 1, now(), now()),
    (v_q_id, 'A way to grade software developers', false, 2, now(), now()),
    (v_q_id, 'A tool for counting words in source code', false, 3, now(), now()),
    (v_q_id, 'A method for pricing commercial software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the `http` module in Node.js?', 'Express is built directly on top of Node''s native `http.createServer()` architecture.',
    'easy', 1, 0, 44, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A core module providing classes and methods for creating low-level HTTP web servers and making client HTTP requests: `http.createServer()`', true, 1, now(), now()),
    (v_q_id, 'A web browser developed by Google', false, 2, now(), now()),
    (v_q_id, 'A tool for formatting hard drives', false, 3, now(), now()),
    (v_q_id, 'A protocol for sending email messages', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is WebSockets in Node.js (e.g., `ws` or `Socket.io`)?', 'Enables real-time applications (chat apps, live sports scores, collaborative document editing) without continuous HTTP polling.',
    'easy', 1, 0, 45, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A protocol providing full-duplex, bidirectional communication channels over a single persistent TCP connection between client and server', true, 1, now(), now()),
    (v_q_id, 'A socket where computers are plugged into electrical walls', false, 2, now(), now()),
    (v_q_id, 'A tool for designing website layouts', false, 3, now(), now()),
    (v_q_id, 'A database management system like MySQL', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Socket.io and how does it differ from raw WebSockets?', 'Raw WebSockets is a protocol; Socket.io is an enterprise library that falls back to long-polling if corporate firewalls block WebSockets.',
    'medium', 1, 0, 46, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A library that provides WebSocket communication along with automated fallbacks (HTTP long-polling), reconnection logic, and room/namespace abstractions', true, 1, now(), now()),
    (v_q_id, 'A hardware chip installed inside routers', false, 2, now(), now()),
    (v_q_id, 'A programming language developed by Apple', false, 3, now(), now()),
    (v_q_id, 'An operating system for gaming consoles', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Server-Sent Events (SSE) compared to WebSockets?', 'SSE uses standard HTTP (`text/event-stream`), reconnects automatically, and is lighter than WebSockets when communication is purely server-to-client.',
    'medium', 1, 0, 47, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A unidirectional technology where a client receives continuous automatic updates from a server via standard HTTP without client-to-server messaging', true, 1, now(), now()),
    (v_q_id, 'A video conferencing software application', false, 2, now(), now()),
    (v_q_id, 'A tool for sending email newsletters', false, 3, now(), now()),
    (v_q_id, 'A database query language', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Content-Security-Policy (CSP) in web application security?', 'The most potent defense against Cross-Site Scripting (XSS), restricting executable scripts strictly to whitelisted domains or cryptographic nonces.',
    'hard', 1, 0, 48, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An HTTP response header that restricts the resources (scripts, images, stylesheets) that the browser is allowed to load for a given page', true, 1, now(), now()),
    (v_q_id, 'A security policy for computer company employees', false, 2, now(), now()),
    (v_q_id, 'A firewall that blocks email attachments', false, 3, now(), now()),
    (v_q_id, 'A password manager built into web browsers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Morgan in Express.js application development?', '`app.use(morgan(''dev''))` provides developers with real-time colored request traces during debugging.',
    'easy', 1, 0, 49, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An HTTP request logger middleware for Node.js that formats and prints incoming request logs (method, URL, status code, response time) to the console', true, 1, now(), now()),
    (v_q_id, 'A software program that plays music in offices', false, 2, now(), now()),
    (v_q_id, 'A database management engine developed by IBM', false, 3, now(), now()),
    (v_q_id, 'A text editor like Visual Studio Code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the `node_modules` directory in a Node.js project?', 'Often contains hundreds of megabytes of nested dependencies; should always be added to `.gitignore` to prevent repository bloat.',
    'easy', 1, 0, 50, ARRAY['BCA-442E', 'Unit-3', 'BCA-442E-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The directory where NPM downloads, extracts, and stores third-party libraries and their transitive dependencies', true, 1, now(), now()),
    (v_q_id, 'A directory that stores user passwords', false, 2, now(), now()),
    (v_q_id, 'A temporary folder deleted automatically every hour', false, 3, now(), now()),
    (v_q_id, 'A folder that contains the computer''s operating system', false, 4, now(), now());

END $SEEDED_BLOCK$;
