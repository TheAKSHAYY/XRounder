DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-442E Unit 4 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'BCA-442E Unit 4: SQL vs NoSQL and MongoDB Database Architecture Practice Quiz (50 MCQs)', 'bca-442e-u4-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-442E Unit 4. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is the fundamental difference between Relational (SQL) and NoSQL databases?', 'SQL (PostgreSQL, MySQL) enforces structured schemas; NoSQL (MongoDB, Cassandra) supports document, key-value, column-family, and graph data models.',
    'easy', 1, 0, 1, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'SQL databases use rigid tabular schemas with relations and ACID transactions; NoSQL databases use flexible, schema-less models optimized for horizontal scaling', true, 1, now(), now()),
    (v_q_id, 'SQL is for software; NoSQL is for hardware', false, 2, now(), now()),
    (v_q_id, 'SQL databases cannot store text', false, 3, now(), now()),
    (v_q_id, 'There is no difference between them', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the acronym NoSQL stand for in modern database terminology?', 'Reflects that modern systems frequently employ polyglot persistence, combining SQL for transactional data with NoSQL for high-velocity or unstructured data.',
    'easy', 1, 0, 2, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Not Only SQL', true, 1, now(), now()),
    (v_q_id, 'No SQL Ever', false, 2, now(), now()),
    (v_q_id, 'New Operating System Query Language', false, 3, now(), now()),
    (v_q_id, 'Non-Sequential Query Language', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the 4 primary categories of NoSQL databases?', 'Document (MongoDB), Key-Value (Redis), Wide-Column (Cassandra), Graph (Neo4j).',
    'medium', 1, 0, 3, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Document stores, Key-Value stores, Wide-Column stores, and Graph databases', true, 1, now(), now()),
    (v_q_id, 'Relational, Hierarchical, Network, and Flat file', false, 2, now(), now()),
    (v_q_id, 'Memory, Disk, Tape, and Cloud', false, 3, now(), now()),
    (v_q_id, 'Input, Output, Processing, and Storage', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the CAP Theorem (Brewer''s Theorem) in distributed database theory?', 'Since network partitions (P) are inevitable in real-world distributed networks, distributed databases must choose between CP (Consistency) or AP (Availability).',
    'easy', 1, 0, 4, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A distributed data store can simultaneously provide at most two out of: Consistency, Availability, and Partition Tolerance', true, 1, now(), now()),
    (v_q_id, 'A theorem stating that all computers become obsolete in two years', false, 2, now(), now()),
    (v_q_id, 'A formula for calculating database licensing costs', false, 3, now(), now()),
    (v_q_id, 'A rule defining how many hard drives are required in servers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between ACID and BASE database properties?', 'Traditional RDBMSes adhere to ACID; distributed NoSQL databases trade immediate consistency for high availability and partition tolerance (BASE).',
    'medium', 1, 0, 5, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'ACID guarantees strict immediate consistency (Atomicity, Consistency, Isolation, Durability); BASE prioritizes availability and eventual consistency (Basically Available, Soft state, Eventual consistency)', true, 1, now(), now()),
    (v_q_id, 'ACID is for chemistry; BASE is for biology', false, 2, now(), now()),
    (v_q_id, 'ACID is obsolete; BASE is modern', false, 3, now(), now()),
    (v_q_id, 'They are exact synonyms', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is MongoDB?', 'MongoDB replaces relational rows with BSON documents, providing rich nested document structures and horizontal sharding.',
    'easy', 1, 0, 6, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open-source, high-performance, document-oriented NoSQL database that stores data as JSON-like documents with dynamic schemas', true, 1, now(), now()),
    (v_q_id, 'A relational database management system like Oracle', false, 2, now(), now()),
    (v_q_id, 'A programming language developed by Google', false, 3, now(), now()),
    (v_q_id, 'A web browser developed by Mozilla', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What format does MongoDB use internally to store and transmit documents?', 'BSON extends JSON with additional data types (Date, ObjectId, Binary, Decimal128) and is optimized for fast binary traversal on disk.',
    'easy', 1, 0, 7, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'BSON (Binary JSON)', true, 1, now(), now()),
    (v_q_id, 'Plain XML', false, 2, now(), now()),
    (v_q_id, 'CSV text', false, 3, now(), now()),
    (v_q_id, 'YAML', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Collection in MongoDB equivalent to in a relational SQL database?', 'In mapping terminology: Database $\to$ Database, Table $\to$ Collection, Row $\to$ Document, Column $\to$ Field.',
    'easy', 1, 0, 8, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A Table', true, 1, now(), now()),
    (v_q_id, 'A Row', false, 2, now(), now()),
    (v_q_id, 'A Column', false, 3, now(), now()),
    (v_q_id, 'A Primary Key', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Document in MongoDB equivalent to in an RDBMS?', 'A document is an individual record composed of field-value pairs stored in BSON format inside a collection.',
    'easy', 1, 0, 9, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A Row (or Tuple)', true, 1, now(), now()),
    (v_q_id, 'A Table', false, 2, now(), now()),
    (v_q_id, 'A Database', false, 3, now(), now()),
    (v_q_id, 'A Foreign Key', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the `_id` field in every MongoDB document?', 'Every document must have an immutable `_id`. If omitted during insertion, MongoDB automatically assigns a unique 12-byte `ObjectId`.',
    'easy', 1, 0, 10, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A mandatory primary key field that uniquely identifies the document within a collection (defaults to a 12-byte `ObjectId`)', true, 1, now(), now()),
    (v_q_id, 'The name of the user who created the document', false, 2, now(), now()),
    (v_q_id, 'The date when the document was deleted', false, 3, now(), now()),
    (v_q_id, 'A foreign key pointing to another database', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the 12-byte MongoDB `ObjectId` consist of?', 'Because the first 4 bytes encode a Unix timestamp, `ObjectId` instances are naturally roughly sorted in chronological creation order.',
    'hard', 1, 0, 11, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A 4-byte timestamp, a 5-byte random value (machine/process identifier), and a 3-byte incrementing counter', true, 1, now(), now()),
    (v_q_id, 'A 12-letter English word', false, 2, now(), now()),
    (v_q_id, 'A random number generated by a computer', false, 3, now(), now()),
    (v_q_id, 'A 12-digit credit card number', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the maximum allowed size of a single BSON document in MongoDB?', 'The 16MB document limit prevents memory bloat and ensures high-speed network transmission; larger files (videos, PDFs) use **GridFS**.',
    'medium', 1, 0, 12, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '16 Megabytes (MB)', true, 1, now(), now()),
    (v_q_id, '1 Megabyte', false, 2, now(), now()),
    (v_q_id, '1 Gigabyte', false, 3, now(), now()),
    (v_q_id, 'Unlimited', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is GridFS in MongoDB?', 'GridFS splits large files into 255KB chunks stored in two collections: `fs.chunks` (binary binary chunks) and `fs.files` (metadata).',
    'medium', 1, 0, 13, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A specification for storing and retrieving files that exceed the 16MB BSON document size limit by dividing files into chunks', true, 1, now(), now()),
    (v_q_id, 'A high-speed fiber optic networking cable', false, 2, now(), now()),
    (v_q_id, 'A tool for formatting hard drives', false, 3, now(), now()),
    (v_q_id, 'A graphical user interface layout manager', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do you insert a single document into a MongoDB collection using the mongo shell or driver?', '`insertOne()` inserts a single document; `insertMany([doc1, doc2])` inserts an array of documents.',
    'easy', 1, 0, 14, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`db.collection.insertOne({ name: ''Akshay'', sem: 6 })`', true, 1, now(), now()),
    (v_q_id, '`db.collection.add({ name: ''Akshay'' })`', false, 2, now(), now()),
    (v_q_id, '`INSERT INTO collection VALUES (''Akshay'')`', false, 3, now(), now()),
    (v_q_id, '`db.collection.put({ name: ''Akshay'' })`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do you query all documents where `semester` equals 6 in MongoDB?', '`find(query, projection)` queries documents matching the filter criteria.',
    'easy', 1, 0, 15, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`db.students.find({ semester: 6 })`', true, 1, now(), now()),
    (v_q_id, '`db.students.select({ semester: 6 })`', false, 2, now(), now()),
    (v_q_id, '`db.students.get(semester == 6)`', false, 3, now(), now()),
    (v_q_id, '`db.students.search(6)`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between `find()` and `findOne()` in MongoDB?', '`findOne()` reads only the first matching document and immediately releases the cursor, making it faster for unique queries.',
    'easy', 1, 0, 16, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`find()` returns a cursor pointing to all matching documents; `findOne()` returns the single first matching document directly', true, 1, now(), now()),
    (v_q_id, '`find()` is for numbers; `findOne()` is for strings', false, 2, now(), now()),
    (v_q_id, '`find()` deletes the documents', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which operator is used in MongoDB to update specific fields without overwriting the entire document?', '`db.users.updateOne({ _id: 1 }, { $set: { status: ''active'' } })` updates only the `status` field, preserving all other fields.',
    'easy', 1, 0, 17, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`$set`', true, 1, now(), now()),
    (v_q_id, '`$update`', false, 2, now(), now()),
    (v_q_id, '`$modify`', false, 3, now(), now()),
    (v_q_id, '`$change`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What happens if you update a document in MongoDB without using update operators like `$set`?', 'In older MongoDB versions, executing `update({ _id: 1 }, { status: ''active'' })` replaced the entire document with just `{ status: ''active'' }`.',
    'medium', 1, 0, 18, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The entire document is replaced with the new object, wiping out all previous fields except `_id`', true, 1, now(), now()),
    (v_q_id, 'The database throws a syntax error', false, 2, now(), now()),
    (v_q_id, 'Nothing happens', false, 3, now(), now()),
    (v_q_id, 'The document is deleted', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which update operator increments the value of a numeric field by a specified amount in MongoDB?', 'Example: `db.quizzes.updateOne({ _id: id }, { $inc: { attempts: 1 } })` atomically increments the counter by 1.',
    'easy', 1, 0, 19, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`$inc`', true, 1, now(), now()),
    (v_q_id, '`$add`', false, 2, now(), now()),
    (v_q_id, '`$plus`', false, 3, now(), now()),
    (v_q_id, '`$sum`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which array update operator adds an element to an array field in MongoDB?', 'Example: `db.students.updateOne({ _id: id }, { $push: { tags: ''BCA'' } })` appends `''BCA''` to the `tags` array.',
    'easy', 1, 0, 20, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`$push`', true, 1, now(), now()),
    (v_q_id, '`$append`', false, 2, now(), now()),
    (v_q_id, '`$insert`', false, 3, now(), now()),
    (v_q_id, '`$add`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which array operator adds an element to an array ONLY if it does not already exist (preventing duplicates)?', '`$addToSet` treats the array like a mathematical set, ensuring uniqueness.',
    'medium', 1, 0, 21, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`$addToSet`', true, 1, now(), now()),
    (v_q_id, '`$pushUnique`', false, 2, now(), now()),
    (v_q_id, '`$insertSet`', false, 3, now(), now()),
    (v_q_id, '`$set`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which operator deletes a specific field from a MongoDB document?', 'Example: `db.users.updateOne({ _id: id }, { $unset: { temporaryToken: "" } })` deletes the `temporaryToken` field.',
    'medium', 1, 0, 22, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`$unset`', true, 1, now(), now()),
    (v_q_id, '`$delete`', false, 2, now(), now()),
    (v_q_id, '`$remove`', false, 3, now(), now()),
    (v_q_id, '`$drop`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do you delete all documents matching a condition in MongoDB?', '`deleteMany()` removes all matching documents; `deleteOne()` removes only the first matching document.',
    'easy', 1, 0, 23, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`db.collection.deleteMany({ status: ''inactive'' })`', true, 1, now(), now()),
    (v_q_id, '`db.collection.drop({ status: ''inactive'' })`', false, 2, now(), now()),
    (v_q_id, '`DELETE FROM collection WHERE status = ''inactive''`', false, 3, now(), now()),
    (v_q_id, '`db.collection.removeMany()`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does `db.collection.drop()` do in MongoDB?', 'Equivalent to `DROP TABLE` in SQL: drops the entire collection and indexes from storage.',
    'easy', 1, 0, 24, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Completely deletes the entire collection, including all documents and all associated indexes, from the database', true, 1, now(), now()),
    (v_q_id, 'Deletes a single document', false, 2, now(), now()),
    (v_q_id, 'Clears the screen in the mongo shell', false, 3, now(), now()),
    (v_q_id, 'Removes temporary files from memory', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between Embedded Documents and Document References in MongoDB data modeling?', 'Embedding provides fast single-query retrieval for bounded 1-to-few relations; Referencing prevents data duplication for large or many-to-many relations.',
    'medium', 1, 0, 25, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Embedded documents store child objects directly inside the parent document; References store child objects in separate collections linked via `_id`', true, 1, now(), now()),
    (v_q_id, 'Embedded is for text; References is for numbers', false, 2, now(), now()),
    (v_q_id, 'Embedded is slower than References', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the MongoDB Aggregation Pipeline?', 'Analogous to SQL `GROUP BY` and joins: documents flow through stages like `$match`, `$group`, `$sort`, and `$project`.',
    'easy', 1, 0, 26, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A framework for data modeling and transformation where documents pass through a multi-stage pipeline to produce aggregated results', true, 1, now(), now()),
    (v_q_id, 'A physical pipeline carrying water to servers', false, 2, now(), now()),
    (v_q_id, 'A tool for compressing database files', false, 3, now(), now()),
    (v_q_id, 'A database backup utility', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the `$match` stage do in an aggregation pipeline?', 'Placing `$match` at the very beginning of a pipeline leverages indexes to minimize the number of documents processed downstream.',
    'medium', 1, 0, 27, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Filters documents to allow only those that match specified condition criteria to pass into the next pipeline stage (like SQL `WHERE`)', true, 1, now(), now()),
    (v_q_id, 'Matches passwords with usernames', false, 2, now(), now()),
    (v_q_id, 'Compares two database tables', false, 3, now(), now()),
    (v_q_id, 'Finds matching strings in text', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the `$group` stage do in an aggregation pipeline?', 'Equivalent to SQL `GROUP BY`: `db.orders.aggregate([{ $group: { _id: ''$customer'', total: { $sum: ''$amount'' } } }])`.',
    'medium', 1, 0, 28, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Groups input documents by a specified `_id` expression and applies accumulator expressions (e.g., `$sum`, `$avg`, `$max`)', true, 1, now(), now()),
    (v_q_id, 'Groups users into chat rooms', false, 2, now(), now()),
    (v_q_id, 'Organizes files into folders on disk', false, 3, now(), now()),
    (v_q_id, 'A team of developers working together', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the `$project` stage do in an aggregation pipeline?', 'Used to reduce payload bandwidth by filtering out unnecessary heavy fields before sending results to the client.',
    'medium', 1, 0, 29, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Reshapes documents by specifying which fields to include, exclude, rename, or compute as new synthetic fields (like SQL `SELECT`)', true, 1, now(), now()),
    (v_q_id, 'Projects video onto a wall', false, 2, now(), now()),
    (v_q_id, 'Creates a new software project', false, 3, now(), now()),
    (v_q_id, 'Estimates the completion date of a project', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the `$unwind` stage do in an aggregation pipeline?', 'If a document has an array of 3 tags, `$unwind: ''$tags''` outputs 3 distinct documents, each containing one of the individual tags.',
    'hard', 1, 0, 30, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Deconstructs an array field from the input documents to output a document for each element in the array', true, 1, now(), now()),
    (v_q_id, 'Rewinds an audio recording', false, 2, now(), now()),
    (v_q_id, 'Cancels a database transaction', false, 3, now(), now()),
    (v_q_id, 'Deletes an array from memory', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the `$lookup` stage do in an aggregation pipeline?', 'Brings relational join capability to MongoDB: `$lookup: { from: ''authors'', localField: ''authorId'', foreignField: ''_id'', as: ''authorDetails'' }`.',
    'hard', 1, 0, 31, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Performs a left outer equijoin to another collection in the same database to filter in documents from the joined collection', true, 1, now(), now()),
    (v_q_id, 'Looks up a word in an English dictionary', false, 2, now(), now()),
    (v_q_id, 'Searches for files on a computer hard drive', false, 3, now(), now()),
    (v_q_id, 'A tool for checking employee attendance', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Index in MongoDB and why is it used?', 'Without indexes, MongoDB must perform a full collection scan (COLLSCAN) scanning every single document on disk.',
    'easy', 1, 0, 32, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A special data structure (B-Tree) that stores a small portion of the collection''s data in an easy-to-traverse form to drastically speed up queries', true, 1, now(), now()),
    (v_q_id, 'A table of contents in a textbook', false, 2, now(), now()),
    (v_q_id, 'The first page of a website', false, 3, now(), now()),
    (v_q_id, 'A list of employee phone numbers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do you create an ascending index on the `email` field in MongoDB?', '`1` specifies ascending index order; `-1` specifies descending index order.',
    'easy', 1, 0, 33, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`db.users.createIndex({ email: 1 })`', true, 1, now(), now()),
    (v_q_id, '`db.users.addIndex(''email'')`', false, 2, now(), now()),
    (v_q_id, '`CREATE INDEX email ON users`', false, 3, now(), now()),
    (v_q_id, '`db.users.index({ email: true })`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Compound Index in MongoDB?', 'Supports queries that filter and sort on multiple fields simultaneously, adhering to the Equality-Sort-Range (ESR) rule.',
    'medium', 1, 0, 34, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An index where a single index structure holds references to multiple fields within a collection: `createIndex({ semester: 1, gpa: -1 })`', true, 1, now(), now()),
    (v_q_id, 'An index that accrues compound financial interest', false, 2, now(), now()),
    (v_q_id, 'An index made of multiple databases', false, 3, now(), now()),
    (v_q_id, 'A temporary index deleted daily', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Unique Index in MongoDB?', 'Enforces database-level uniqueness constraints (e.g., preventing two users from registering with the same email).',
    'easy', 1, 0, 35, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An index that causes MongoDB to reject duplicate values for the indexed field: `createIndex({ email: 1 }, { unique: true })`', true, 1, now(), now()),
    (v_q_id, 'An index that has a unique name', false, 2, now(), now()),
    (v_q_id, 'An index that is only used once', false, 3, now(), now()),
    (v_q_id, 'An index that cannot be deleted', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Covered Query in MongoDB?', 'The ultimate high-performance query: when all queried fields and all projected return fields are inside the index, execution latency is sub-millisecond in RAM.',
    'hard', 1, 0, 36, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A query that can be satisfied entirely from index keys without having to examine or read any actual documents from disk', true, 1, now(), now()),
    (v_q_id, 'A query that is hidden from hackers', false, 2, now(), now()),
    (v_q_id, 'A query covered by a software warranty', false, 3, now(), now()),
    (v_q_id, 'A query written inside comments', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the `.explain(''executionStats'')` method do in MongoDB?', 'Essential for query optimization: allows developers to verify whether a query is using an index (IXSCAN) or performing a slow full scan (COLLSCAN).',
    'medium', 1, 0, 37, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Returns detailed execution statistics about a query plan (e.g., COLLSCAN vs IXSCAN, total documents examined, execution time in ms)', true, 1, now(), now()),
    (v_q_id, 'Explains the source code in plain English', false, 2, now(), now()),
    (v_q_id, 'A tool for teaching students how to write queries', false, 3, now(), now()),
    (v_q_id, 'Generates user documentation automatically', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Replica Set in MongoDB architecture?', 'Consists of one Primary node (handles writes) and multiple Secondary nodes (replicate oplog for automated failover).',
    'easy', 1, 0, 38, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A cluster of MongoDB servers that maintain the same data set, providing high availability, redundancy, and automated failover', true, 1, now(), now()),
    (v_q_id, 'A set of duplicate backup tapes', false, 2, now(), now()),
    (v_q_id, 'A group of identical software developers', false, 3, now(), now()),
    (v_q_id, 'A database that only stores copies of images', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Oplog (Operations Log) in MongoDB replica sets?', 'Secondary nodes continuously read and apply the Primary''s oplog entries to maintain exact synchronization.',
    'medium', 1, 0, 39, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A special capped collection (`local.oplog.rs`) that records a rolling historical log of all operations that modify database state', true, 1, now(), now()),
    (v_q_id, 'A list of employee login passwords', false, 2, now(), now()),
    (v_q_id, 'A log tracking computer processor temperature', false, 3, now(), now()),
    (v_q_id, 'A file recording network errors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Sharding in MongoDB?', 'Provides horizontal scaling beyond the hardware limits of any single physical server using a chosen Shard Key.',
    'medium', 1, 0, 40, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The method for distributing data horizontally across multiple physical machines (shards) to support massive data sets and high throughput', true, 1, now(), now()),
    (v_q_id, 'Cutting a hard drive into pieces', false, 2, now(), now()),
    (v_q_id, 'Sharing database passwords with colleagues', false, 3, now(), now()),
    (v_q_id, 'A tool for compressing database files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the three core components of a MongoDB Sharded Cluster?', 'Clients talk to `mongos` routers; `mongos` queries Config Servers to determine which Shards hold the requested data chunks.',
    'hard', 1, 0, 41, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Shard nodes, Query Routers (`mongos`), and Config Servers', true, 1, now(), now()),
    (v_q_id, 'Input, Output, and Processing', false, 2, now(), now()),
    (v_q_id, 'Client, Server, and Database', false, 3, now(), now()),
    (v_q_id, 'Master, Worker, and Task', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Shard Key in MongoDB?', 'Choosing an effective shard key (high cardinality, low frequency, non-monotonically increasing) is vital to avoid hotspotting a single shard.',
    'hard', 1, 0, 42, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The indexed field or fields that determine the distribution of the collection''s documents across the cluster''s shards', true, 1, now(), now()),
    (v_q_id, 'A physical metal key used to unlock a server room', false, 2, now(), now()),
    (v_q_id, 'A secret encryption key used for passwords', false, 3, now(), now()),
    (v_q_id, 'A license key required to install MongoDB', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is MongoDB Atlas?', 'Eliminates database administrative overhead by providing multi-cloud clusters, automated security patching, and automated scaling in minutes.',
    'easy', 1, 0, 43, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A fully managed cloud database service developed by MongoDB, automating provisioning, scaling, backups, and security across AWS, GCP, and Azure', true, 1, now(), now()),
    (v_q_id, 'A physical geography map book', false, 2, now(), now()),
    (v_q_id, 'A satellite navigation system', false, 3, now(), now()),
    (v_q_id, 'A programming language developed by MongoDB', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mongoose in Node.js application development?', 'Enforces schema discipline over MongoDB''s native schema-less flexibility, providing type validation and lifecycle hooks (`pre(''save'')`).',
    'easy', 1, 0, 44, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An Object Data Modeling (ODM) library for MongoDB and Node.js that provides schema validation, middleware hooks, and model casting', true, 1, now(), now()),
    (v_q_id, 'A small carnivore animal that eats snakes', false, 2, now(), now()),
    (v_q_id, 'A database engine developed by Apache', false, 3, now(), now()),
    (v_q_id, 'A web browser developed by Google', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Mongoose, what is a Schema vs a Model?', '`const userSchema = new mongoose.Schema({...}); const User = mongoose.model(''User'', userSchema);`.',
    'medium', 1, 0, 45, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A Schema defines the structure and validation rules for documents; a Model is a compiled constructor compiled from the Schema used to query and create documents', true, 1, now(), now()),
    (v_q_id, 'A Schema is software; a Model is hardware', false, 2, now(), now()),
    (v_q_id, 'They are identical in every way', false, 3, now(), now()),
    (v_q_id, 'A Schema is for SQL; a Model is for NoSQL', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Mongoose Middleware (Hook)?', '`userSchema.pre(''save'', async function() { this.password = await bcrypt.hash(this.password, 10); });`.',
    'medium', 1, 0, 46, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Functions that execute control during the execution of asynchronous Mongoose actions (e.g., pre-save hooks to hash passwords before database storage)', true, 1, now(), now()),
    (v_q_id, 'Hardware cables in a server room', false, 2, now(), now()),
    (v_q_id, 'A tool for connecting two computers together', false, 3, now(), now()),
    (v_q_id, 'A database table storing passwords', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between Write Concern `w: 1` and `w: ''majority''` in MongoDB?', '`w: ''majority''` guarantees durability against failovers, ensuring committed writes will never be rolled back if the primary crashes.',
    'hard', 1, 0, 47, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`w: 1` confirms write after only the Primary acknowledges; `w: ''majority''` confirms write only after a majority of replica nodes commit to disk/memory', true, 1, now(), now()),
    (v_q_id, '`w: 1` is for one user; `majority` is for two users', false, 2, now(), now()),
    (v_q_id, '`w: 1` is slower than `majority`', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Capped Collection in MongoDB?', 'Once the allocated disk size is filled, newly inserted documents automatically overwrite the oldest documents (used for logging and caching).',
    'medium', 1, 0, 48, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A fixed-size collection that supports high-throughput operations that insert and retrieve documents based on insertion order (acts like a circular buffer)', true, 1, now(), now()),
    (v_q_id, 'A collection with a physical plastic cap', false, 2, now(), now()),
    (v_q_id, 'A collection that costs money to use', false, 3, now(), now()),
    (v_q_id, 'A collection that can only store 10 documents', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Change Streams in MongoDB?', 'Applications subscribe to collections and receive instant real-time notifications via WebSockets whenever documents are created, updated, or deleted.',
    'medium', 1, 0, 49, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A feature that allows applications to access real-time data changes without the complexity and risk of tailing the oplog', true, 1, now(), now()),
    (v_q_id, 'A river flowing through a data center', false, 2, now(), now()),
    (v_q_id, 'A tool for changing database passwords', false, 3, now(), now()),
    (v_q_id, 'A feature that renames database collections', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is TTL (Time-To-Live) Index in MongoDB?', 'Used for ephemeral data (session tokens, password reset links, log entries): `createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })`.',
    'easy', 1, 0, 50, ARRAY['BCA-442E', 'Unit-4', 'BCA-442E-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A special single-field index that MongoDB uses to automatically delete documents from a collection after a specified amount of time', true, 1, now(), now()),
    (v_q_id, 'A tool for measuring the lifespan of batteries', false, 2, now(), now()),
    (v_q_id, 'A software license that expires in 30 days', false, 3, now(), now()),
    (v_q_id, 'An index that speeds up time in video games', false, 4, now(), now());

END $SEEDED_BLOCK$;
