DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-304N Unit 4 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '874914b5-12e1-5f49-982a-a54c625d20f0', 'BCA-304N Unit 4: Platform as a Service (PaaS) and Software as a Service (SaaS) Practice Quiz (50 MCQs)', 'bca-304n-u4-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-304N Unit 4. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is the primary architectural concept underpinning Platform as a Service (PaaS)?', 'PaaS abstracts infrastructure layers, exposing managed runtimes (Node, Python, Java) and APIs to developers.',
    'easy', 1, 0, 1, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Providing physical metal racks to customers', false, 1, now(), now()),
    (v_q_id, 'Providing an abstracted execution environment, runtime frameworks, and managed middleware so developers build applications without managing OS or hardware infrastructure', true, 2, now(), now()),
    (v_q_id, 'Selling pre-packaged shrink-wrapped software CDs', false, 3, now(), now()),
    (v_q_id, 'Offering physical keyboard and mouse rentals', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which early PaaS offering by Google pioneered serverless application hosting with automated scaling in 2008?', 'Google App Engine launched in 2008 as a pioneer PaaS, allowing developers to run web apps with zero server configuration.',
    'easy', 1, 0, 2, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Google App Engine (GAE)', true, 1, now(), now()),
    (v_q_id, 'Google Kubernetes Engine (GKE)', false, 2, now(), now()),
    (v_q_id, 'Google Compute Engine (GCE)', false, 3, now(), now()),
    (v_q_id, 'Google Cloud Storage', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In AWS Elastic Beanstalk (PaaS), what is the role of the platform?', 'Elastic Beanstalk automates deployment, provisioning, load balancing, and scaling while retaining complete underlying IaaS control.',
    'medium', 1, 0, 3, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It requires the user to physically solder motherboard components', false, 1, now(), now()),
    (v_q_id, 'It automatically handles deployment details such as capacity provisioning, load balancing, auto-scaling, and application health monitoring based on uploaded application code', true, 2, now(), now()),
    (v_q_id, 'It is an operating system installed on desktop computers', false, 3, now(), now()),
    (v_q_id, 'It is a physical plant grown in Amazon datacenters', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Web Service'' in distributed cloud computing?', 'Web services enable programmatic machine-to-machine communication across heterogeneous systems using standard web protocols.',
    'easy', 1, 0, 4, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A website that displays local news', false, 1, now(), now()),
    (v_q_id, 'A standardized software system designed to support interoperable machine-to-machine interaction over a network using XML or JSON messaging protocols (HTTP, SOAP, REST)', true, 2, now(), now()),
    (v_q_id, 'A cleaning service that cleans datacenter hardware', false, 3, now(), now()),
    (v_q_id, 'A company that sells internet connections', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does SOAP stand for in enterprise web services?', 'SOAP is an XML-based messaging protocol specification for exchanging structured information in the implementation of web services.',
    'easy', 1, 0, 5, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Simple Object Access Protocol', true, 1, now(), now()),
    (v_q_id, 'System Operations and Authentication Platform', false, 2, now(), now()),
    (v_q_id, 'Standard Open Application Protocol', false, 3, now(), now()),
    (v_q_id, 'Service Oriented Architecture Process', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What protocol is used as the foundational envelope and messaging format for SOAP web services?', 'SOAP messages are strictly formatted XML documents comprising an Envelope, Header, and Body.',
    'easy', 1, 0, 6, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'XML (Extensible Markup Language)', true, 1, now(), now()),
    (v_q_id, 'Plain unformatted text', false, 2, now(), now()),
    (v_q_id, 'JPEG images', false, 3, now(), now()),
    (v_q_id, 'CSV spreadsheets', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is WSDL in SOAP web services?', 'WSDL documents contractually describe public methods, parameters, and protocol bindings of a SOAP web service in XML.',
    'medium', 1, 0, 7, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Web Security Definition Layer', false, 1, now(), now()),
    (v_q_id, 'Web Services Description Language: an XML-based interface definition language used for describing the functionality, operations, and network endpoints of a web service', true, 2, now(), now()),
    (v_q_id, 'Windows System Device List', false, 3, now(), now()),
    (v_q_id, 'World Wide Distributed Link', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does REST stand for in modern cloud architecture?', 'REST is an architectural style formulated by Roy Fielding in 2000, governing distributed hypermedia systems over HTTP.',
    'easy', 1, 0, 8, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Representational State Transfer', true, 1, now(), now()),
    (v_q_id, 'Remote Execution System Technology', false, 2, now(), now()),
    (v_q_id, 'Reliable Enterprise Service Transmission', false, 3, now(), now()),
    (v_q_id, 'Relational Entity Schema Table', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following is a core architectural constraint of RESTful Web Services?', 'REST enforces stateless communication; no client context is stored on the server between requests, enabling horizontal scalability.',
    'medium', 1, 0, 9, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Server must store client session state in server memory permanently', false, 1, now(), now()),
    (v_q_id, 'Statelessness: every request from client to server must contain all of the information necessary to understand and complete the request', true, 2, now(), now()),
    (v_q_id, 'All messages must use binary machine code', false, 3, now(), now()),
    (v_q_id, 'Only one client can connect to the server at a time', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which HTTP method is conventionally used in RESTful APIs to retrieve an existing resource representation without causing side effects (Idempotent and Safe)?', 'GET is a safe, idempotent HTTP method used exclusively for retrieving resource representations.',
    'easy', 1, 0, 10, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'POST', false, 1, now(), now()),
    (v_q_id, 'GET', true, 2, now(), now()),
    (v_q_id, 'DELETE', false, 3, now(), now()),
    (v_q_id, 'PATCH', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In RESTful API design, which HTTP method is typically used to create a brand-new subordinate resource?', 'POST is used to create new entities, submitting data to be processed by the identified resource.',
    'easy', 1, 0, 11, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'GET', false, 1, now(), now()),
    (v_q_id, 'POST', true, 2, now(), now()),
    (v_q_id, 'HEAD', false, 3, now(), now()),
    (v_q_id, 'OPTIONS', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In RESTful API design, what does ''Idempotence'' mean?', 'An idempotent HTTP method (PUT, DELETE, GET) yields identical server-side state upon repeated identical invocations.',
    'medium', 1, 0, 12, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A method that can only be executed during daytime hours', false, 1, now(), now()),
    (v_q_id, 'An operation that produces the exact same side-effect and system state on the server whether it is executed once or multiple times consecutively (e.g., PUT, DELETE)', true, 2, now(), now()),
    (v_q_id, 'A method that deletes all database records', false, 3, now(), now()),
    (v_q_id, 'A request that executes in zero milliseconds', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why are RESTful APIs overwhelmingly preferred over SOAP for cloud-native web and mobile applications?', 'REST''s simplicity, HTTP verbs, and lightweight JSON serialization yield superior performance over heavy XML SOAP envelopes.',
    'medium', 1, 0, 13, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because SOAP is strictly prohibited by law', false, 1, now(), now()),
    (v_q_id, 'REST is lightweight, human-readable, leverages native HTTP methods, natively supports lightweight JSON payloads, and is easier to parse in modern web clients', true, 2, now(), now()),
    (v_q_id, 'Because REST does not require an internet connection', false, 3, now(), now()),
    (v_q_id, 'Because SOAP can only run on supercomputers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Web 2.0'' in the evolution of internet technologies?', 'Web 2.0 transitioned the web to participatory, interactive ecosystems driven by social collaboration, AJAX, and rich APIs.',
    'easy', 1, 0, 14, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The second version of the HTTP protocol (HTTP/2)', false, 1, now(), now()),
    (v_q_id, 'The evolution of the web from static, read-only websites to dynamic, interactive, collaborative platforms emphasizing user-generated content, interoperability, and rich web applications', true, 2, now(), now()),
    (v_q_id, 'A new brand of fiber optic cables', false, 3, now(), now()),
    (v_q_id, 'A programming language that replaced HTML', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What technology enabled asynchronous client-side data exchange without requiring full web page reloads, accelerating Web 2.0 and cloud applications?', 'AJAX allows browsers to send and receive data asynchronously in the background, updating DOM elements without page reloads.',
    'easy', 1, 0, 15, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'AJAX (Asynchronous JavaScript and XML / `fetch` API)', true, 1, now(), now()),
    (v_q_id, 'Floppy disk drives', false, 2, now(), now()),
    (v_q_id, 'VGA monitor cables', false, 3, now(), now()),
    (v_q_id, 'PostScript printing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Web Operating System'' (Web OS or Cloud Desktop)?', 'A Web OS provides a browser-hosted desktop workspace, delivering applications and persistent cloud storage through a web GUI.',
    'medium', 1, 0, 16, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An operating system designed exclusively for web server hardware', false, 1, now(), now()),
    (v_q_id, 'A virtual operating system interface running inside a standard web browser, providing users with desktop-like applications, file management, and utilities hosted entirely in the cloud', true, 2, now(), now()),
    (v_q_id, 'An operating system with no graphical user interface', false, 3, now(), now()),
    (v_q_id, 'The firmware inside a network router', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Multi-Tenant Architecture in Software as a Service (SaaS)?', 'SaaS multi-tenancy shares underlying application code and database infrastructure across tenants while enforcing logical data partitioning.',
    'medium', 1, 0, 17, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Each customer has a dedicated physical server and independent database', false, 1, now(), now()),
    (v_q_id, 'A software architecture where a single shared application instance and database serves multiple customer organizations (tenants), utilizing logical partitioning to keep data strictly separated', true, 2, now(), now()),
    (v_q_id, 'Renting ten software programs at once', false, 3, now(), now()),
    (v_q_id, 'A website designed for multiple computer screens', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary economic advantage of a Multi-Tenant SaaS architecture for the software vendor?', 'Vendors maintain a single codebase, rolling out instantaneous patches and sharing infrastructure costs across all customers.',
    'easy', 1, 0, 18, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Zero software development costs', false, 1, now(), now()),
    (v_q_id, 'Drastically lower operational and infrastructure costs, unified centralized maintenance, and the ability to roll out updates to all customers simultaneously', true, 2, now(), now()),
    (v_q_id, 'Charging customers for physical server hardware', false, 3, now(), now()),
    (v_q_id, 'Eliminating all customer support tickets', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Single-Tenant'' SaaS architecture?', 'Single-tenant architectures isolate hardware, OS, and database completely for a single client, maximizing security at higher cost.',
    'medium', 1, 0, 19, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A software system with only one registered user', false, 1, now(), now()),
    (v_q_id, 'A dedicated software instance and dedicated supporting infrastructure provisioned exclusively for a single customer organization', true, 2, now(), now()),
    (v_q_id, 'An operating system that can only run one program at a time', false, 3, now(), now()),
    (v_q_id, 'A software program sold in a retail box', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In SaaS database multi-tenancy, what is the ''Shared Database, Separate Schemas'' approach?', 'Separate schemas inside a shared database balance logical isolation and operational consolidation.',
    'hard', 1, 0, 20, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'All tenants share the exact same tables with a `tenant_id` column', false, 1, now(), now()),
    (v_q_id, 'Tenants share the same physical database instance, but each tenant possesses its own distinct logical schema (set of tables and views)', true, 2, now(), now()),
    (v_q_id, 'Each tenant has an isolated physical server', false, 3, now(), now()),
    (v_q_id, 'Databases are completely deleted after each query', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In SaaS database design, what is the ''Shared Database, Shared Schema'' approach?', 'The pooled (shared schema) approach uses discriminator columns (`tenant_id`) across shared tables, yielding maximum density and lowest cost.',
    'hard', 1, 0, 21, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Each tenant has a separate database on a different hard drive', false, 1, now(), now()),
    (v_q_id, 'All tenants share the exact same physical database and the exact same relational tables, with tenant data partitioned using a `Tenant_ID` discriminator column in each row', true, 2, now(), now()),
    (v_q_id, 'Databases that are accessible by anyone without authentication', false, 3, now(), now()),
    (v_q_id, 'A database that has no primary keys', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary security risk of the Shared Database, Shared Schema multi-tenant model?', 'Bugs in application query filters can accidentally expose one tenant''s records to another tenant on shared tables.',
    'hard', 1, 0, 22, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The database server will explode from overheating', false, 1, now(), now()),
    (v_q_id, 'Tenant data cross-contamination or leakage if application queries fail to strictly enforce the `WHERE tenant_id = ?` isolation filter', true, 2, now(), now()),
    (v_q_id, 'Data files turning into images', false, 3, now(), now()),
    (v_q_id, 'The database losing all internet connectivity', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is GFS (Google File System)?', 'Pioneered by Ghemawat et al. in 2003, GFS provides fault-tolerant distributed storage optimized for massive append-only batch workflows on commodity nodes.',
    'medium', 1, 0, 23, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A global file sorting program', false, 1, now(), now()),
    (v_q_id, 'A proprietary scalable distributed file system developed by Google to provide efficient, reliable access to data using large clusters of commodity hardware', true, 2, now(), now()),
    (v_q_id, 'A graphics file format like PNG or JPEG', false, 3, now(), now()),
    (v_q_id, 'A file system for Android mobile phones', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the Google File System (GFS) architecture, what are the two main node types?', 'GFS uses a central Master holding metadata and chunk locations, while Chunkservers store the actual 64MB data chunks on local disks.',
    'hard', 1, 0, 24, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A single Master (now Active/Standby) and multiple Chunkservers', true, 1, now(), now()),
    (v_q_id, 'Router and Switch', false, 2, now(), now()),
    (v_q_id, 'Client and Browser', false, 3, now(), now()),
    (v_q_id, 'Frontend and Backend', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In GFS, what is the standard fixed size of a data chunk?', 'GFS uses large 64 MB chunk sizes to minimize master metadata overhead and reduce network connection handshakes for streaming reads.',
    'medium', 1, 0, 25, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '512 Bytes', false, 1, now(), now()),
    (v_q_id, '4 Kilobytes', false, 2, now(), now()),
    (v_q_id, '64 Megabytes (64 MB)', true, 3, now(), now()),
    (v_q_id, '10 Gigabytes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What open-source distributed file system was created as an exact open-source clone of the Google File System architecture?', 'HDFS, created by Doug Cutting as part of Apache Hadoop, directly mirrors GFS''s architecture (NameNode = Master, DataNodes = Chunkservers).',
    'easy', 1, 0, 26, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'HDFS (Hadoop Distributed File System)', true, 1, now(), now()),
    (v_q_id, 'Linux Ext4', false, 2, now(), now()),
    (v_q_id, 'Apple APFS', false, 3, now(), now()),
    (v_q_id, 'Microsoft NTFS', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In HDFS architecture, what is the equivalent of the GFS Master node?', 'The NameNode manages filesystem namespace, directory trees, and maps block allocations to worker DataNodes.',
    'easy', 1, 0, 27, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'DataNode', false, 1, now(), now()),
    (v_q_id, 'NameNode', true, 2, now(), now()),
    (v_q_id, 'TaskTracker', false, 3, now(), now()),
    (v_q_id, 'NodeManager', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In HDFS architecture, what is the role of a ''DataNode''?', 'DataNodes store raw data blocks on local physical disks, serving read/write requests from clients.',
    'easy', 1, 0, 28, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Managing user passwords', false, 1, now(), now()),
    (v_q_id, 'Storing and retrieving actual data blocks on local storage as directed by the NameNode, and reporting periodic block reports and heartbeats', true, 2, now(), now()),
    (v_q_id, 'Routing internet packets between cloud regions', false, 3, now(), now()),
    (v_q_id, 'Compiling Java MapReduce jobs', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'By default, what is the standard replication factor for data blocks in HDFS to ensure fault tolerance against hardware failures?', 'HDFS defaults to a replication factor of 3 (two copies on the same rack, one copy on a remote rack) to survive node and rack outages.',
    'easy', 1, 0, 29, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '1 (No replication)', false, 1, now(), now()),
    (v_q_id, '2', false, 2, now(), now()),
    (v_q_id, '3 (Three copies across different racks)', true, 3, now(), now()),
    (v_q_id, '10', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is AWS S3 (Simple Storage Service)?', 'AWS S3 is Amazon''s scalable object store designed for 11 nines of durability, storing files as objects within buckets.',
    'easy', 1, 0, 30, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A serverless relational SQL database', false, 1, now(), now()),
    (v_q_id, 'An industry-standard object storage service offering 99.999999999% (11 9s) of data durability, high scalability, and availability via HTTP APIs', true, 2, now(), now()),
    (v_q_id, 'A virtual machine hypervisor', false, 3, now(), now()),
    (v_q_id, 'A physical tape backup drive', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Amazon S3, what is a ''Bucket''?', 'An S3 Bucket is a globally unique top-level namespace container for objects, defining access policies and regional residency.',
    'easy', 1, 0, 31, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical container used for mopping datacenter floors', false, 1, now(), now()),
    (v_q_id, 'A top-level logical container for storing objects (files) with a globally unique name across all AWS accounts worldwide', true, 2, now(), now()),
    (v_q_id, 'A database table with five columns', false, 3, now(), now()),
    (v_q_id, 'A specific folder inside a virtual machine', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Event-Driven Architecture'' in cloud services (e.g., AWS Lambda responding to S3 uploads)?', 'Event-driven systems decouple producers and consumers, invoking serverless compute handlers instantaneously upon trigger events.',
    'medium', 1, 0, 32, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An architecture where engineers organize annual parties', false, 1, now(), now()),
    (v_q_id, 'A software architecture pattern where decoupled services produce, detect, and react to state changes (events) in real time', true, 2, now(), now()),
    (v_q_id, 'A network that only operates during special events', false, 3, now(), now()),
    (v_q_id, 'A database that records historical events', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Amazon Web Services, what is AWS Identity and Access Management (IAM)?', 'AWS IAM manages authentication and authorization, granting least-privilege permissions via role and policy definitions.',
    'easy', 1, 0, 33, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A service that measures internet speed', false, 1, now(), now()),
    (v_q_id, 'A web service that securely controls access to AWS services and resources, managing users, groups, roles, and fine-grained JSON permission policies', true, 2, now(), now()),
    (v_q_id, 'An antivirus scanner for EC2 instances', false, 3, now(), now()),
    (v_q_id, 'A tool for editing video files in the cloud', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In AWS IAM, what is the critical difference between a ''User'' and a ''Role''?', 'IAM Roles issue temporary, rotating credentials via STS, avoiding hardcoded static keys inside application code or EC2 instances.',
    'medium', 1, 0, 34, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Users are for machines, while Roles are for humans', false, 1, now(), now()),
    (v_q_id, 'A User has permanent long-term credentials (password, access keys), whereas a Role is assumed dynamically by entities or services, providing temporary short-lived security credentials', true, 2, now(), now()),
    (v_q_id, 'Roles can only be used on weekends', false, 3, now(), now()),
    (v_q_id, 'There is no difference; they are exact synonyms', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the Principle of Least Privilege dictate in cloud identity management?', 'Least privilege restricts access rights to the bare minimum required for routine execution, limiting the blast radius of compromises.',
    'easy', 1, 0, 35, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Granting users all administrator permissions by default so they never get access errors', false, 1, now(), now()),
    (v_q_id, 'Granting users, programs, and services only the minimum permissions strictly necessary to complete their specific assigned tasks', true, 2, now(), now()),
    (v_q_id, 'Denying all access to all cloud servers permanently', false, 3, now(), now()),
    (v_q_id, 'Only granting permissions to employees with senior job titles', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is AWS CloudWatch?', 'CloudWatch aggregates operational telemetry, tracks metrics, stores logs, and triggers automated auto-scaling or alarm actions.',
    'easy', 1, 0, 36, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A digital wristwatch manufactured by Amazon', false, 1, now(), now()),
    (v_q_id, 'A monitoring and observability service providing data and actionable insights for AWS resources, collecting metrics, logs, and configuring automated alarms', true, 2, now(), now()),
    (v_q_id, 'A tool for watching movies in the cloud', false, 3, now(), now()),
    (v_q_id, 'A weather radar system', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is AWS CloudTrail?', 'CloudTrail logs API governance records (who made which API call from what IP address at what time), crucial for forensics and compliance.',
    'easy', 1, 0, 37, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical hiking path near Amazon headquarters', false, 1, now(), now()),
    (v_q_id, 'A service that provides event history and audit trails of all AWS account activity, logging every API call made via the console, SDKs, or CLI for security auditing', true, 2, now(), now()),
    (v_q_id, 'A tool for tracking physical delivery trucks', false, 3, now(), now()),
    (v_q_id, 'A software for designing web graphics', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Infrastructure as Code'' (IaC, e.g., Terraform, AWS CloudFormation)?', 'IaC manages declarative infrastructure blueprints in version control, ensuring deterministic, reproducible, auditable environment deployments.',
    'medium', 1, 0, 38, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Writing code directly on the physical metal casing of servers', false, 1, now(), now()),
    (v_q_id, 'The practice of managing, provisioning, and configuring computer datacenter infrastructure through machine-readable definition files rather than manual interactive tools', true, 2, now(), now()),
    (v_q_id, 'Writing code in assembly language', false, 3, now(), now()),
    (v_q_id, 'Converting computer programs into printed books', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary advantage of Infrastructure as Code (IaC)?', 'IaC guarantees idempotency, version-controlled auditability, and eliminates human errors and environment drift.',
    'medium', 1, 0, 39, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It makes cloud hardware 100% free of charge', false, 1, now(), now()),
    (v_q_id, 'Eliminating configuration drift, enabling version-controlled infrastructure, automated testing, and identical rapid environment replication (Dev, Stage, Prod)', true, 2, now(), now()),
    (v_q_id, 'It allows computers to run without electrical power', false, 3, now(), now()),
    (v_q_id, 'It replaces all software engineers with hardware', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is HashiCorp Terraform?', 'Terraform provisions multi-cloud infrastructure declaratively using state files and pluggable provider APIs.',
    'easy', 1, 0, 40, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A video game about space exploration', false, 1, now(), now()),
    (v_q_id, 'An open-source, provider-agnostic Infrastructure as Code tool that uses declarative HashiCorp Configuration Language (HCL) to provision resources across multi-cloud environments', true, 2, now(), now()),
    (v_q_id, 'A database engine developed by Oracle', false, 3, now(), now()),
    (v_q_id, 'An operating system for supercomputers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Microsoft Azure?', 'Azure is Microsoft''s global enterprise public cloud ecosystem spanning compute, data, AI, and developer services.',
    'easy', 1, 0, 41, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A blue color theme for Microsoft Windows', false, 1, now(), now()),
    (v_q_id, 'Microsoft''s public cloud computing platform providing IaaS, PaaS, and SaaS services across global datacenters', true, 2, now(), now()),
    (v_q_id, 'A video game console manufactured by Microsoft', false, 3, now(), now()),
    (v_q_id, 'A web browser that replaced Internet Explorer', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Microsoft Azure, what is a ''Resource Group''?', 'Azure Resource Groups aggregate logically related infrastructure assets into a single management, billing, and RBAC boundary.',
    'easy', 1, 0, 42, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical group of people who manage servers', false, 1, now(), now()),
    (v_q_id, 'A logical container that holds related Azure resources (VMs, storage, virtual networks) for an application, allowing unified lifecycle management, billing, and access control', true, 2, now(), now()),
    (v_q_id, 'A group of hard drives formatted simultaneously', false, 3, now(), now()),
    (v_q_id, 'A folder on a user''s Windows desktop', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Microsoft Azure, what is Azure Blob Storage?', 'Azure Blob Storage is Microsoft''s massively scalable object store for unstructured data, big data analytics, and archives.',
    'easy', 1, 0, 43, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A video game streaming service', false, 1, now(), now()),
    (v_q_id, 'Azure''s object storage solution for the cloud, optimized for storing massive amounts of unstructured data (text, binary, video, backups)', true, 2, now(), now()),
    (v_q_id, 'A relational database that only accepts integers', false, 3, now(), now()),
    (v_q_id, 'A tool for defragmenting physical hard drives', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Google Cloud Platform (GCP)?', 'GCP offers public cloud services built upon the distributed computing foundations powering Google''s planetary-scale consumer applications.',
    'easy', 1, 0, 44, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical retail store selling Google hardware', false, 1, now(), now()),
    (v_q_id, 'A suite of cloud computing services offered by Google that runs on the same internal infrastructure that Google uses for its consumer products like Google Search and YouTube', true, 2, now(), now()),
    (v_q_id, 'An Android application for editing photos', false, 3, now(), now()),
    (v_q_id, 'A website for searching Wikipedia articles', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Google BigQuery?', 'BigQuery is Google''s serverless analytics warehouse executing petabyte-scale SQL queries in seconds via Dremel execution trees.',
    'easy', 1, 0, 45, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A giant magnifying glass for viewing server chips', false, 1, now(), now()),
    (v_q_id, 'A fully managed, serverless, highly scalable cloud enterprise data warehouse designed for high-speed SQL queries on petabyte-scale datasets using columnar storage', true, 2, now(), now()),
    (v_q_id, 'A search engine for finding large text files', false, 3, now(), now()),
    (v_q_id, 'A social media platform for data scientists', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Google Cloud Spanner?', 'Cloud Spanner combines horizontal distributed scale with strict ACID transactional consistency globally using atomic clocks (TrueTime).',
    'hard', 1, 0, 46, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A mechanical wrench used by Google technicians', false, 1, now(), now()),
    (v_q_id, 'A fully managed, mission-critical, globally distributed, horizontally scalable NewSQL database that provides ACID transactions with external consistency across continents', true, 2, now(), now()),
    (v_q_id, 'A tool for fixing broken computer monitors', false, 3, now(), now()),
    (v_q_id, 'A local database installed on Android phones', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Microservices Architecture'' in cloud application design?', 'Microservices decompose monolithic backends into autonomous, loosely coupled services aligned around business domains.',
    'medium', 1, 0, 47, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Writing code that has fewer than 100 lines per file', false, 1, now(), now()),
    (v_q_id, 'An architectural approach where a single application is composed of many small, independently deployable, loosely coupled services communicating via lightweight APIs (HTTP/REST or gRPC)', true, 2, now(), now()),
    (v_q_id, 'Running software on microscopic silicon chips', false, 3, now(), now()),
    (v_q_id, 'Installing applications on micro-SD cards', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does a Microservices Architecture compare to a Monolithic Architecture?', 'Monoliths bundle all features in one process; microservices offer independent scalability, polyglot development, and fault isolation at the expense of distributed complexity.',
    'medium', 1, 0, 48, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Monoliths combine all functionality into a single unified codebase and deployment artifact, whereas Microservices isolate functions into independent deployable units that can be scaled and updated separately', true, 1, now(), now()),
    (v_q_id, 'Microservices are always simpler to deploy and debug than monoliths', false, 2, now(), now()),
    (v_q_id, 'Monoliths cannot connect to relational databases', false, 3, now(), now()),
    (v_q_id, 'There is no architectural difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an ''API Gateway'' in a cloud microservices architecture?', 'API Gateways decouple client interfaces from internal microservice topologies, enforcing cross-cutting concerns (auth, throttling, telemetry).',
    'medium', 1, 0, 49, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical metal door in the server room', false, 1, now(), now()),
    (v_q_id, 'A single entry-point reverse proxy server that sits between external clients and internal microservices, handling routing, composition, authentication, rate limiting, and SSL termination', true, 2, now(), now()),
    (v_q_id, 'A router that connects two continents', false, 3, now(), now()),
    (v_q_id, 'A tool that writes API documentation automatically', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Service Mesh'' (e.g., Istio, Linkerd) in cloud microservices?', 'A service mesh injects sidecar proxies (Envoy) alongside service containers, managing inter-service mTLS, routing, retries, and telemetry transparently.',
    'hard', 1, 0, 50, ARRAY['BCA-304N', 'Unit-4', 'BCA-304N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical wire mesh covering server cabinets', false, 1, now(), now()),
    (v_q_id, 'A dedicated infrastructure layer for handling service-to-service communication, providing observability, mutual TLS (mTLS) encryption, traffic routing, and resiliency (circuit breaking) using sidecar proxies', true, 2, now(), now()),
    (v_q_id, 'A fishing net used to collect ocean sensors', false, 3, now(), now()),
    (v_q_id, 'A software tool for drawing 3D network diagrams', false, 4, now(), now());

END $SEEDED_BLOCK$;
