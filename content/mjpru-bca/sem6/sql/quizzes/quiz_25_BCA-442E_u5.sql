DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-442E Unit 5 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'BCA-442E Unit 5: Python Web Integration and Full-Stack MongoDB Connectivity Practice Quiz (50 MCQs)', 'bca-442e-u5-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-442E Unit 5. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is Python''s role in modern full-stack web and data engineering?', 'Python is widely used for web backends (Django, Flask, FastAPI), data pipelines, machine learning, and automation scripting.',
    'easy', 1, 0, 1, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A high-level, interpreted programming language known for readability, rapid development, rich web frameworks, and seamless data science integration', true, 1, now(), now()),
    (v_q_id, 'A physical snake kept in computer laboratories', false, 2, now(), now()),
    (v_q_id, 'A database management system like Oracle', false, 3, now(), now()),
    (v_q_id, 'An operating system developed for supercomputers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Python Virtual Environment (`venv` / `virtualenv`) and why is it essential?', 'Isolating dependencies ensures Project A requiring Django 3.2 does not break when Project B upgrades to Django 5.0 on the same machine.',
    'easy', 1, 0, 2, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An isolated directory tree containing a specific Python interpreter and third-party packages, preventing dependency version conflicts between projects', true, 1, now(), now()),
    (v_q_id, 'A virtual reality video game developed in Python', false, 2, now(), now()),
    (v_q_id, 'A simulated computer hardware motherboard', false, 3, now(), now()),
    (v_q_id, 'A tool for running Python code without an operating system', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do you create a Python virtual environment in modern Python 3?', 'The standard built-in command `python -m venv <dir>` creates an isolated environment containing private `bin/Scripts` and `site-packages`.',
    'easy', 1, 0, 3, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`python -m venv myenv`', true, 1, now(), now()),
    (v_q_id, '`pip install venv`', false, 2, now(), now()),
    (v_q_id, '`python create environment`', false, 3, now(), now()),
    (v_q_id, '`make venv`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do you activate a virtual environment on Windows PowerShell vs Linux/macOS?', 'Activating the environment modifies the system `PATH` to point to the local environment''s Python interpreter and pip binaries.',
    'easy', 1, 0, 4, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Windows: `.\myenv\Scripts\Activate.ps1`; Linux/macOS: `source myenv/bin/activate`', true, 1, now(), now()),
    (v_q_id, 'Windows: `start python`; Linux: `run python`', false, 2, now(), now()),
    (v_q_id, 'Windows: `activate.exe`; Linux: `activate.sh`', false, 3, now(), now()),
    (v_q_id, 'Virtual environments do not require activation', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is `pip` in the Python ecosystem?', '`pip install <package>` downloads and installs libraries and their dependencies from PyPI into the active environment.',
    'easy', 1, 0, 5, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The standard package manager for Python used to install and manage third-party software packages from the Python Package Index (PyPI)', true, 1, now(), now()),
    (v_q_id, 'A computer sound effect played on errors', false, 2, now(), now()),
    (v_q_id, 'A tool for compressing image files', false, 3, now(), now()),
    (v_q_id, 'A database query language like SQL', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the purpose of a `requirements.txt` file in Python projects?', 'Guarantees that developers and CI/CD server pipelines install identical package versions across all machines.',
    'easy', 1, 0, 6, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To specify all external third-party package dependencies and their exact versions, allowing other developers to install them via `pip install -r requirements.txt`', true, 1, now(), now()),
    (v_q_id, 'A list of employee requirements for getting hired', false, 2, now(), now()),
    (v_q_id, 'A document containing customer feature requests', false, 3, now(), now()),
    (v_q_id, 'A file listing computer hardware specifications', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is PyMongo?', 'PyMongo provides idiomatic Python APIs (`MongoClient`) to execute BSON document CRUD operations and aggregation pipelines.',
    'easy', 1, 0, 7, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The official Python distribution library containing tools for interacting with MongoDB databases from Python applications', true, 1, now(), now()),
    (v_q_id, 'A programming language developed by MongoDB', false, 2, now(), now()),
    (v_q_id, 'A web browser developed in Python', false, 3, now(), now()),
    (v_q_id, 'A tool for formatting hard drives', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do you connect to a local MongoDB instance using PyMongo in Python?', '`MongoClient` opens a connection pool to the specified MongoDB connection string URI.',
    'easy', 1, 0, 8, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`from pymongo import MongoClient; client = MongoClient(''mongodb://localhost:27017/'')`', true, 1, now(), now()),
    (v_q_id, '`import mongo; db = mongo.connect()`', false, 2, now(), now()),
    (v_q_id, '`client = pymongo.start(''localhost'')`', false, 3, now(), now()),
    (v_q_id, '`open(''mongodb://localhost'')`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In PyMongo, how do you select a database named `university_db` and a collection named `courses`?', 'PyMongo supports both dictionary-style lookup (`client[''db_name'']`) and attribute-style lookup (`client.db_name`).',
    'easy', 1, 0, 9, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`db = client[''university_db'']; courses = db[''courses'']`', true, 1, now(), now()),
    (v_q_id, '`db = client.open(''university_db''); courses = db.open(''courses'')`', false, 2, now(), now()),
    (v_q_id, '`db = select database university_db;`', false, 3, now(), now()),
    (v_q_id, '`courses = client.get(''courses'')`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do you insert a document into a collection in PyMongo?', '`insert_one()` returns an `InsertOneResult` object whose `.inserted_id` property contains the generated `ObjectId`.',
    'easy', 1, 0, 10, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`collection.insert_one({''course_code'': ''BCA-306N'', ''credits'': 4})`', true, 1, now(), now()),
    (v_q_id, '`collection.add({''course_code'': ''BCA-306N''})`', false, 2, now(), now()),
    (v_q_id, '`collection.save({''course_code'': ''BCA-306N''})`', false, 3, now(), now()),
    (v_q_id, '`collection.write({''course_code'': ''BCA-306N''})`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do you query documents matching a filter in PyMongo?', '`find()` returns an iterable PyMongo `Cursor` object that yields native Python dictionary representations of BSON documents.',
    'easy', 1, 0, 11, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`cursor = collection.find({''credits'': 4})`', true, 1, now(), now()),
    (v_q_id, '`result = collection.search({''credits'': 4})`', false, 2, now(), now()),
    (v_q_id, '`data = collection.query({''credits'': 4})`', false, 3, now(), now()),
    (v_q_id, '`cursor = collection.get(credits=4)`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do you update a document in PyMongo using update operators?', 'Requires explicit MongoDB atomic update operators like `$set` to prevent overwriting other fields in the document.',
    'easy', 1, 0, 12, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`collection.update_one({''course_code'': ''BCA-306N''}, {''$set'': {''status'': ''published''}})`', true, 1, now(), now()),
    (v_q_id, '`collection.update({''course_code'': ''BCA-306N''}, {''status'': ''published''})`', false, 2, now(), now()),
    (v_q_id, '`collection.modify({''status'': ''published''})`', false, 3, now(), now()),
    (v_q_id, '`collection.change({''course_code'': ''BCA-306N''})`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does `collection.delete_one({''_id'': target_id})` do in PyMongo?', '`delete_one()` deletes at most one document; `delete_many()` deletes all documents matching the filter.',
    'easy', 1, 0, 13, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Deletes the single first document matching the specified filter criteria from the collection', true, 1, now(), now()),
    (v_q_id, 'Deletes the entire collection', false, 2, now(), now()),
    (v_q_id, 'Deletes the Python script from disk', false, 3, now(), now()),
    (v_q_id, 'Deletes the database', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is BSON `ObjectId` in Python and how do you query a document by its string ID?', 'Because `_id` is stored as binary `ObjectId`, querying with a plain Python string fails unless converted to `bson.ObjectId`.',
    'medium', 1, 0, 14, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`from bson import ObjectId; collection.find_one({''_id'': ObjectId(''60c72b2f...'')})`', true, 1, now(), now()),
    (v_q_id, '`collection.find_one({''_id'': ''60c72b2f...''})`', false, 2, now(), now()),
    (v_q_id, '`collection.find_by_id(''60c72b2f...'')`', false, 3, now(), now()),
    (v_q_id, '`collection.get_id(''60c72b2f...'')`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why does passing a PyMongo document directly to `json.dumps(doc)` throw a `TypeError`?', '`TypeError: Object of type ObjectId is not JSON serializable`; solved using `bson.json_util` or custom Pydantic serializers.',
    'medium', 1, 0, 15, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because standard Python `json.dumps` does not know how to serialize native BSON `ObjectId` and `datetime` objects', true, 1, now(), now()),
    (v_q_id, 'Because PyMongo documents are encrypted', false, 2, now(), now()),
    (v_q_id, 'Because JSON does not support Python dictionaries', false, 3, now(), now()),
    (v_q_id, 'Because MongoDB documents are too large', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does `bson.json_util` solve the BSON-to-JSON serialization issue in Python?', '`from bson import json_util; json_str = json_util.dumps(mongo_document)` produces valid JSON strings.',
    'medium', 1, 0, 16, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It provides `dumps()` and `loads()` functions that serialize BSON objects (ObjectId, dates) into Extended JSON format', true, 1, now(), now()),
    (v_q_id, 'It deletes all ObjectId fields from documents', false, 2, now(), now()),
    (v_q_id, 'It converts all numbers into strings', false, 3, now(), now()),
    (v_q_id, 'It translates Python into JavaScript', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Motor in the Python MongoDB ecosystem?', 'Unlike blocking PyMongo, Motor integrates non-blockingly with Python''s `asyncio` event loop: `await collection.find_one(...)`.',
    'medium', 1, 0, 17, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An asynchronous Python driver for MongoDB designed for use with `asyncio` and async frameworks like FastAPI or Tornado', true, 1, now(), now()),
    (v_q_id, 'An electric motor used in robotics', false, 2, now(), now()),
    (v_q_id, 'A tool for making Python code run faster', false, 3, now(), now()),
    (v_q_id, 'A database engine developed by Apache', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is WSGI (Web Server Gateway Interface) in Python web architecture?', 'PEP 3333 standardized WSGI, allowing any WSGI-compliant application (Flask) to run on any WSGI-compliant server (Gunicorn, uWSGI).',
    'medium', 1, 0, 18, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The universal synchronous specification for communication between web servers and Python web applications (Flask, Django)', true, 1, now(), now()),
    (v_q_id, 'An asynchronous web framework developed by Google', false, 2, now(), now()),
    (v_q_id, 'A tool for styling web pages with CSS', false, 3, now(), now()),
    (v_q_id, 'A database connector for PostgreSQL', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ASGI (Asynchronous Server Gateway Interface) in modern Python?', 'ASGI allows Python servers (Uvicorn) to handle thousands of concurrent open WebSocket connections and async request streams.',
    'medium', 1, 0, 19, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The modern asynchronous successor to WSGI, providing support for async/await, WebSockets, HTTP/2, and background tasks (FastAPI, Starlette)', true, 1, now(), now()),
    (v_q_id, 'A synchronous web framework like Flask', false, 2, now(), now()),
    (v_q_id, 'A database management system', false, 3, now(), now()),
    (v_q_id, 'A protocol for sending email messages', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Flask in Python web development?', 'Flask provides only core routing, request handling, and templating, allowing developers to plug in PyMongo, SQLAlchemy, etc.',
    'easy', 1, 0, 20, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A lightweight, flexible, and unopinionated micro-framework based on Werkzeug and Jinja2, giving developers freedom in choosing components', true, 1, now(), now()),
    (v_q_id, 'A heavy monolithic framework with built-in ORM', false, 2, now(), now()),
    (v_q_id, 'A database engine developed by Oracle', false, 3, now(), now()),
    (v_q_id, 'A programming language developed by Microsoft', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is FastAPI?', 'FastAPI is one of the fastest Python frameworks available, offering native async support, automatic OpenAPI docs, and data validation.',
    'easy', 1, 0, 21, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A modern, high-performance web framework for building APIs with Python 3.8+ based on standard Python type hints, Starlette, and Pydantic', true, 1, now(), now()),
    (v_q_id, 'A fast web browser developed in Python', false, 2, now(), now()),
    (v_q_id, 'A tool for making computer processors run faster', false, 3, now(), now()),
    (v_q_id, 'A software program for editing video files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Pydantic in Python and FastAPI?', 'Defines typed data models (`class User(BaseModel): name: str; age: int`); invalid input payloads are rejected automatically with HTTP 422.',
    'easy', 1, 0, 22, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A data validation and settings management library that enforces type hints at runtime and provides user-friendly error messages', true, 1, now(), now()),
    (v_q_id, 'A database management engine like MySQL', false, 2, now(), now()),
    (v_q_id, 'A tool for drawing computer graphics', false, 3, now(), now()),
    (v_q_id, 'A Python package for playing audio', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Django in Python web development?', 'Django provides everything out of the box (ORM, admin UI, authentication, CSRF defense), following the ''Don''t Repeat Yourself'' (DRY) principle.',
    'easy', 1, 0, 23, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A high-level, ''batteries-included'' web framework that encourages rapid development and clean design, including built-in ORM, admin panel, and auth', true, 1, now(), now()),
    (v_q_id, 'A lightweight micro-framework like Flask', false, 2, now(), now()),
    (v_q_id, 'A database query language like SQL', false, 3, now(), now()),
    (v_q_id, 'A web browser developed by Apple', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Gunicorn (Green Unicorn)?', 'Gunicorn forks master/worker processes to handle concurrent requests in production behind reverse proxies like Nginx.',
    'easy', 1, 0, 24, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A Python WSGI HTTP server for UNIX, based on a pre-fork worker model widely used to run production Flask and Django apps', true, 1, now(), now()),
    (v_q_id, 'A mythological green horse with a horn', false, 2, now(), now()),
    (v_q_id, 'A database management engine developed by IBM', false, 3, now(), now()),
    (v_q_id, 'A text editor like Visual Studio Code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Uvicorn in modern Python deployment?', 'Uvicorn is the standard production server for ASGI apps: `gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app`.',
    'medium', 1, 0, 25, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A lightning-fast ASGI web server implementation for Python, powered by `uvloop` and `httptools` used to run FastAPI applications', true, 1, now(), now()),
    (v_q_id, 'A single-threaded development server', false, 2, now(), now()),
    (v_q_id, 'A database developed by Microsoft', false, 3, now(), now()),
    (v_q_id, 'A web browser developed by Google', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Object-Document Mapper (ODM) like MongoEngine or Beanie?', 'Analogous to ORMs (SQLAlchemy) for SQL: ODMs define schemas as Python classes and provide methods like `student.save()`.',
    'medium', 1, 0, 26, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A library that maps MongoDB BSON documents to native Python classes, providing schema definition, validation, and helper methods', true, 1, now(), now()),
    (v_q_id, 'A tool for converting Python into JavaScript', false, 2, now(), now()),
    (v_q_id, 'A hardware component inside computer processors', false, 3, now(), now()),
    (v_q_id, 'A database query language like SQL', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Beanie in the modern Python async ecosystem?', 'Beanie integrates seamlessly with FastAPI: models inherit from Pydantic `BaseModel` and `Document`, providing native typing and async CRUD.',
    'hard', 1, 0, 27, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An asynchronous Object Document Mapper (ODM) for MongoDB and Python built on top of Motor and Pydantic', true, 1, now(), now()),
    (v_q_id, 'A warm hat worn by software developers', false, 2, now(), now()),
    (v_q_id, 'A database engine developed by Oracle', false, 3, now(), now()),
    (v_q_id, 'A tool for editing video files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Jinja2 in Flask web development?', 'Jinja2 compiles HTML templates with embedded Python expressions into optimized bytecode on the server.',
    'easy', 1, 0, 28, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A fast, secure, and widely used templating engine for Python that renders dynamic HTML pages using template tags like `{{ variable }}` and `{% for %}`', true, 1, now(), now()),
    (v_q_id, 'A programming language developed by Sun Microsystems', false, 2, now(), now()),
    (v_q_id, 'A database connector for MySQL', false, 3, now(), now()),
    (v_q_id, 'A software program for editing photographs', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between Server-Side Templating (Jinja2) and a Decoupled Single-Page App (React + FastAPI)?', 'Decoupled architectures provide superior user experience, offline support, and allow the same backend API to serve web, mobile, and IoT clients.',
    'medium', 1, 0, 29, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Jinja2 generates complete HTML pages on the server on every request; Decoupled SPAs render UI in the browser and exchange raw JSON with the API', true, 1, now(), now()),
    (v_q_id, 'Jinja2 is for mobile; React is for desktop', false, 2, now(), now()),
    (v_q_id, 'Jinja2 does not use HTML', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Route Decorator in Flask or FastAPI (e.g., `@app.get(''/courses'')`)?', 'When an HTTP request arrives matching the URL pattern, the framework invokes the decorated function to process the request.',
    'easy', 1, 0, 30, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A Python decorator that binds a URL path and HTTP method to a specific Python view function', true, 1, now(), now()),
    (v_q_id, 'A tool for decorating websites with holiday graphics', false, 2, now(), now()),
    (v_q_id, 'A comment written in Python code', false, 3, now(), now()),
    (v_q_id, 'A function that deletes routes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does FastAPI generate interactive API documentation automatically?', 'Navigating to `http://localhost:8000/docs` displays an interactive Swagger UI where developers can test endpoints directly in the browser.',
    'easy', 1, 0, 31, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'By inspecting Pydantic models and type hints to generate an OpenAPI (Swagger) JSON specification served at `/docs` and `/redoc`', true, 1, now(), now()),
    (v_q_id, 'By hiring technical writers to write documents', false, 2, now(), now()),
    (v_q_id, 'By scanning text comments in files', false, 3, now(), now()),
    (v_q_id, 'FastAPI does not generate documentation', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Dependency Injection in FastAPI?', 'FastAPI automatically resolves dependencies (e.g., validating JWT tokens or opening DB connections) before executing the route handler.',
    'medium', 1, 0, 32, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A design pattern implemented via `Depends()` that allows declaring reusable dependencies (database sessions, authentication checks) in route signatures', true, 1, now(), now()),
    (v_q_id, 'Injecting computer viruses into databases', false, 2, now(), now()),
    (v_q_id, 'A hardware failure in computer memory', false, 3, now(), now()),
    (v_q_id, 'A tool for updating software packages', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a NoSQL Injection vulnerability in Python-MongoDB applications?', 'A query `db.users.find({''user'': u, ''pass'': p})` evaluates to true for all users if an attacker inputs `p = {''$gt'': ''''}`; prevented by strict Pydantic typing.',
    'hard', 1, 0, 33, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An attack where untrusted user input containing MongoDB operator dictionaries (e.g., `{"$gt": ""}`) is passed directly into queries, bypassing authentication', true, 1, now(), now()),
    (v_q_id, 'A syringe used to clean computer hardware', false, 2, now(), now()),
    (v_q_id, 'A syntax error that crashes the database', false, 3, now(), now()),
    (v_q_id, 'A tool for deleting duplicate database rows', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does Pydantic prevent NoSQL Injection in FastAPI applications?', 'Because Pydantic rejects non-string inputs before they reach the database driver, attackers cannot inject MongoDB query operators.',
    'medium', 1, 0, 34, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'By strictly enforcing that input fields conform to primitive types (e.g., `password: str`), rejecting any incoming dictionary or operator objects with HTTP 422', true, 1, now(), now()),
    (v_q_id, 'By encrypting all database records with AES', false, 2, now(), now()),
    (v_q_id, 'By turning off the database', false, 3, now(), now()),
    (v_q_id, 'By deleting user inputs', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Connection Pooling in PyMongo and why is it essential?', 'Opening a new TCP/TLS connection to MongoDB takes 10–50ms; connection pooling reuses established sockets, handling thousands of queries per second.',
    'medium', 1, 0, 35, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Maintaining an internal pool of active, reusable TCP socket connections to the database to eliminate the latency of re-authenticating on every request', true, 1, now(), now()),
    (v_q_id, 'A swimming pool located in a computer company office', false, 2, now(), now()),
    (v_q_id, 'Connecting multiple computers with copper cables', false, 3, now(), now()),
    (v_q_id, 'A tool for sharing internet connections', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why should `MongoClient` be instantiated ONCE globally per application process rather than inside each request handler?', '`MongoClient` is thread-safe and manages its own internal pool; instantiating it once per process is best practice.',
    'medium', 1, 0, 36, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because creating a new `MongoClient` on every request spawns new connection pools, exhausting server sockets and causing memory leaks', true, 1, now(), now()),
    (v_q_id, 'Because MongoDB only allows one client per year', false, 2, now(), now()),
    (v_q_id, 'Because `MongoClient` deletes files on creation', false, 3, now(), now()),
    (v_q_id, 'It makes no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Asynchronous Generator in Python (`async def` with `yield`)?', 'Used in Motor to stream cursor documents from MongoDB without buffering millions of documents into memory at once.',
    'hard', 1, 0, 37, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A coroutine that yields values asynchronously over time, iterated using `async for item in async_gen():`', true, 1, now(), now()),
    (v_q_id, 'A machine that generates electricity asynchronously', false, 2, now(), now()),
    (v_q_id, 'A tool for generating random numbers in Python', false, 3, now(), now()),
    (v_q_id, 'A function that compiles code into machine language', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is CORS Middleware in FastAPI?', 'Permits frontend applications running on different ports or domains to make secure cross-origin AJAX requests.',
    'easy', 1, 0, 38, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`app.add_middleware(CORSMiddleware, allow_origins=[''http://localhost:3000''], ...)` allowing browser SPAs to communicate with the API', true, 1, now(), now()),
    (v_q_id, 'A middleware that speeds up Python code', false, 2, now(), now()),
    (v_q_id, 'A tool for compressing JSON responses', false, 3, now(), now()),
    (v_q_id, 'A database connection pool manager', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Docker Containerization in full-stack Python web deployment?', 'Guarantees that the software runs identically across local developer laptops, testing environments, and production Kubernetes clusters.',
    'easy', 1, 0, 39, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Packaging the Python application code, runtime, system libraries, and configuration into an immutable, portable Docker container image', true, 1, now(), now()),
    (v_q_id, 'Placing computers inside shipping containers on cargo ships', false, 2, now(), now()),
    (v_q_id, 'Compressing files into a zip archive', false, 3, now(), now()),
    (v_q_id, 'A method for deleting outdated software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is `docker-compose` in a full-stack Python + React + MongoDB application?', 'Launches the React frontend container, FastAPI backend container, and MongoDB database container with unified networking in a single command (`docker-compose up`).',
    'easy', 1, 0, 40, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A tool for defining and running multi-container Docker applications using a single YAML configuration file (`docker-compose.yml`)', true, 1, now(), now()),
    (v_q_id, 'A music composition software written in Python', false, 2, now(), now()),
    (v_q_id, 'A tool for writing Docker source code', false, 3, now(), now()),
    (v_q_id, 'A web browser developed by Docker', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Environment Isolation in 12-Factor App methodology?', 'The exact same container image is deployed across dev, staging, and prod, varying only in environment variable bindings.',
    'medium', 1, 0, 41, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Strictly separating development, staging, and production environments using environment variables rather than hardcoded configuration files', true, 1, now(), now()),
    (v_q_id, 'Keeping developers in separate office rooms', false, 2, now(), now()),
    (v_q_id, 'Using computers that are not connected to the internet', false, 3, now(), now()),
    (v_q_id, 'A method for recycling computer hardware', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Celery in the Python web ecosystem?', 'Offloads time-consuming tasks (sending batch emails, generating heavy PDF reports, training ML models) to background worker processes.',
    'medium', 1, 0, 42, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open-source asynchronous distributed task queue / job queue based on distributed message passing (using Redis or RabbitMQ as broker)', true, 1, now(), now()),
    (v_q_id, 'A green vegetable eaten by software engineers', false, 2, now(), now()),
    (v_q_id, 'A database management engine developed by IBM', false, 3, now(), now()),
    (v_q_id, 'A text editor like Visual Studio Code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Redis used for in a full-stack Python web architecture?', 'Provides sub-millisecond read/write latency in RAM, caching database query results to take load off primary MongoDB or PostgreSQL clusters.',
    'easy', 1, 0, 43, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An in-memory data structure store used as a distributed cache, session store, message broker, and rate limiter', true, 1, now(), now()),
    (v_q_id, 'A relational database management system like MySQL', false, 2, now(), now()),
    (v_q_id, 'A software program for editing photographs', false, 3, now(), now()),
    (v_q_id, 'A web browser developed by Google', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Blueprints in Flask?', 'Prevents sprawling monolithic `app.py` files by separating route controllers into distinct modular packages.',
    'easy', 1, 0, 44, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A way to organize a Flask application into modular, reusable components and sub-routes (e.g., auth blueprint, courses blueprint)', true, 1, now(), now()),
    (v_q_id, 'An architectural drawing of a building floorplan', false, 2, now(), now()),
    (v_q_id, 'A tool for designing website graphics', false, 3, now(), now()),
    (v_q_id, 'A database schema migration file', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Alembic in Python database migrations?', 'Tracks and applies relational database schema alterations over time, allowing teams to roll forward or roll back table structures.',
    'medium', 1, 0, 45, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A lightweight database migration tool for usage with the SQLAlchemy Database Toolkit for Python', true, 1, now(), now()),
    (v_q_id, 'A tool for distilling chemicals in laboratories', false, 2, now(), now()),
    (v_q_id, 'A database query language like SQL', false, 3, now(), now()),
    (v_q_id, 'A software program for compressing video', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Reverse Proxy (e.g., Nginx) in Python web application architectures?', 'Nginx absorbs internet traffic at high concurrency, buffers slow client connections, and passes clean requests to backend Python workers.',
    'medium', 1, 0, 46, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A web server positioned in front of Python application servers (Gunicorn/Uvicorn) to handle SSL/TLS termination, static file serving, and load balancing', true, 1, now(), now()),
    (v_q_id, 'A proxy server that runs backwards', false, 2, now(), now()),
    (v_q_id, 'A tool for hiding computer IP addresses illegally', false, 3, now(), now()),
    (v_q_id, 'A broken network router', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is SSL/TLS Termination at a reverse proxy?', 'Unburdens application servers from expensive cryptographic SSL handshakes, centralizing certificate renewal (Let''s Encrypt).',
    'medium', 1, 0, 47, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Decrypting incoming HTTPS traffic at the reverse proxy (Nginx) and forwarding unencrypted HTTP traffic to backend internal application servers', true, 1, now(), now()),
    (v_q_id, 'Deleting SSL certificates from a computer', false, 2, now(), now()),
    (v_q_id, 'Terminating an employee for security violations', false, 3, now(), now()),
    (v_q_id, 'A hardware failure in network cables', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Gzip / Brotli compression in web API response delivery?', 'The browser sends `Accept-Encoding: gzip, br`; the server compresses the JSON payload and sends `Content-Encoding: gzip`, accelerating page load.',
    'easy', 1, 0, 48, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Compressing HTTP response payloads on-the-fly before transmission over the network, reducing bandwidth by up to 70%', true, 1, now(), now()),
    (v_q_id, 'Deleting unnecessary letters from words', false, 2, now(), now()),
    (v_q_id, 'A tool for compressing video files', false, 3, now(), now()),
    (v_q_id, 'A method for encrypting passwords with AES', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Stateless Session Architecture in full-stack web applications?', 'Enables true horizontal auto-scaling: any incoming request can be routed to any backend server instance without session stickiness issues.',
    'medium', 1, 0, 49, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An architecture where server instances retain no client session state in memory; session state is stored in signed client JWT tokens or distributed Redis caches', true, 1, now(), now()),
    (v_q_id, 'A computer network with zero servers', false, 2, now(), now()),
    (v_q_id, 'A web application that has no users', false, 3, now(), now()),
    (v_q_id, 'A software program that forgets user data immediately', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Health Check Endpoint (`/health` or `/ready`) in cloud container deployments?', 'If the health check fails (e.g., database connection drops), the load balancer stops routing traffic to the unhealthy container pod and restarts it.',
    'easy', 1, 0, 50, ARRAY['BCA-442E', 'Unit-5', 'BCA-442E-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A dedicated HTTP endpoint that returns status 200 OK if the application and its dependent database connections are healthy, used by Kubernetes and load balancers', true, 1, now(), now()),
    (v_q_id, 'A medical examination given to software engineers', false, 2, now(), now()),
    (v_q_id, 'A tool for measuring computer battery health', false, 3, now(), now()),
    (v_q_id, 'A software program that exercises computers', false, 4, now(), now());

END $SEEDED_BLOCK$;
