DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-302N Unit 1 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    'fb8b37f9-6fc2-589b-a7de-4c3b4c6f3a83', 'BCA-302N Unit 1: Introduction to Data Science and Foundations Practice Quiz (50 MCQs)', 'bca-302n-u1-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-302N Unit 1. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is the primary definition of Data Science in modern computer science?', 'Data Science is an interdisciplinary field integrating domain knowledge, mathematics/statistics, and computing to extract knowledge from structured and unstructured data.',
    'easy', 1, 0, 1, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A discipline that solely focuses on writing relational database queries', false, 1, now(), now()),
    (v_q_id, 'An interdisciplinary field combining statistics, domain expertise, and computer science to extract actionable insights from data', true, 2, now(), now()),
    (v_q_id, 'The process of manufacturing physical silicon storage drives', false, 3, now(), now()),
    (v_q_id, 'The graphic design of scientific infographics', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Drew Conway''s famous Data Science Venn Diagram, what are the three foundational pillars?', 'Conway''s Data Science Venn diagram illustrates Data Science at the intersection of Hacking Skills, Math & Stats Knowledge, and Substantive Expertise.',
    'easy', 1, 0, 2, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Hardware, Networking, and Operating Systems', false, 1, now(), now()),
    (v_q_id, 'Computer Science / Hacking Skills, Math & Statistics Knowledge, and Substantive Domain Expertise', true, 2, now(), now()),
    (v_q_id, 'SQL, Java, and C++ Programming', false, 3, now(), now()),
    (v_q_id, 'Accounting, Finance, and Public Relations', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which historical term was proposed by statistician John Tukey in 1962, laying the theoretical groundwork for modern data science?', 'In 1962, John Tukey published ''The Future of Data Analysis'', redefining statistics towards computational exploratory analysis.',
    'medium', 1, 0, 3, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Data Analysis', true, 1, now(), now()),
    (v_q_id, 'Artificial General Intelligence', false, 2, now(), now()),
    (v_q_id, 'Cybernetics', false, 3, now(), now()),
    (v_q_id, 'Cloud Warehousing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary difference between Data Science and Business Intelligence (BI)?', 'BI typically inspects historical data to diagnose past performance, whereas Data Science leverages predictive modeling, ML, and statistical inference to forecast and optimize future outcomes.',
    'medium', 1, 0, 4, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'BI focuses on historical descriptive reporting (''what happened''), whereas Data Science emphasizes predictive and prescriptive modeling (''what will happen'')', true, 1, now(), now()),
    (v_q_id, 'BI uses machine learning, while Data Science only uses spreadsheets', false, 2, now(), now()),
    (v_q_id, 'BI is strictly open-source, whereas Data Science is closed-source', false, 3, now(), now()),
    (v_q_id, 'There is no difference; they are exact synonyms', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which role in a data organization is primarily responsible for designing, building, and maintaining scalable data ingestion pipelines and ETL infrastructure?', 'Data Engineers build data pipelines, architectures, and data warehouses (ETL/ELT) ensuring reliable data flow for scientists and analysts.',
    'easy', 1, 0, 5, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Data Analyst', false, 1, now(), now()),
    (v_q_id, 'Data Engineer', true, 2, now(), now()),
    (v_q_id, 'Machine Learning Product Manager', false, 3, now(), now()),
    (v_q_id, 'Business Analyst', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary focus of a Machine Learning (ML) Engineer?', 'ML Engineers bridge data science research and production engineering by building scalable model inference pipelines and MLOps workflows.',
    'easy', 1, 0, 6, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Creating marketing campaigns', false, 1, now(), now()),
    (v_q_id, 'Deploying, scaling, and operationalizing machine learning models into production systems (MLOps)', true, 2, now(), now()),
    (v_q_id, 'Writing legal contracts for data ownership', false, 3, now(), now()),
    (v_q_id, 'Manually entering survey responses into databases', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the industry standard methodology CRISP-DM stand for?', 'CRISP-DM stands for Cross-Industry Standard Process for Data Mining, the most widely adopted methodology for data analytics projects.',
    'easy', 1, 0, 7, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Cross-Industry Standard Process for Data Mining', true, 1, now(), now()),
    (v_q_id, 'Corporate Research Information System Platform - Data Management', false, 2, now(), now()),
    (v_q_id, 'Computational Reasoning and Intelligent Signal Processing - Data Method', false, 3, now(), now()),
    (v_q_id, 'Centralized Real-Time Integration for Statistical Prediction', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How many primary phases are defined in the CRISP-DM lifecycle?', 'CRISP-DM comprises six iterative phases: Business Understanding, Data Understanding, Data Preparation, Modeling, Evaluation, and Deployment.',
    'easy', 1, 0, 8, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Three', false, 1, now(), now()),
    (v_q_id, 'Four', false, 2, now(), now()),
    (v_q_id, 'Six', true, 3, now(), now()),
    (v_q_id, 'Ten', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the first and most critical phase of the CRISP-DM process?', 'Business Understanding defines project objectives and requirements from a business perspective, translating them into a data science problem definition.',
    'medium', 1, 0, 9, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Model Training', false, 1, now(), now()),
    (v_q_id, 'Data Cleaning', false, 2, now(), now()),
    (v_q_id, 'Business Understanding', true, 3, now(), now()),
    (v_q_id, 'Data Visualization', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the CRISP-DM methodology, which phase typically consumes the largest percentage (often 70-80%) of project time?', 'Data Preparation (collecting, cleaning, transforming, and formatting raw data) empirically accounts for 70-80% of project effort.',
    'medium', 1, 0, 10, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Deployment', false, 1, now(), now()),
    (v_q_id, 'Data Preparation', true, 2, now(), now()),
    (v_q_id, 'Model Evaluation', false, 3, now(), now()),
    (v_q_id, 'Business Understanding', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following is considered ''structured data''?', 'Structured data resides in fixed fields within a record or file, such as relational databases and CSV spreadsheets with predefined schemas.',
    'easy', 1, 0, 11, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Video stream from surveillance cameras', false, 1, now(), now()),
    (v_q_id, 'Audio recordings of customer service calls', false, 2, now(), now()),
    (v_q_id, 'A relational database table containing employee records with fixed schemas', true, 3, now(), now()),
    (v_q_id, 'Scanned PDF invoices with hand-written notes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Unstructured data is characterized by:', 'Unstructured data (text, images, video, audio) lacks a formal relational data model or schema.',
    'easy', 1, 0, 12, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Strict adherence to relational database tables with foreign keys', false, 1, now(), now()),
    (v_q_id, 'Lack of a predefined conceptual schema or organized data model', true, 2, now(), now()),
    (v_q_id, 'Being stored exclusively in memory arrays', false, 3, now(), now()),
    (v_q_id, 'Having zero binary representations', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which format is classified as semi-structured data?', 'JSON, XML, and YAML are semi-structured data formats that use internal tags and markers to separate data elements without rigid tabular constraints.',
    'easy', 1, 0, 13, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'JSON (JavaScript Object Notation)', true, 1, now(), now()),
    (v_q_id, 'MP3 Audio', false, 2, now(), now()),
    (v_q_id, 'Raw uncompressed video stream', false, 3, now(), now()),
    (v_q_id, 'Solid-state memory registers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary ethical issue associated with training an automated loan approval algorithm on historical banking records?', 'Algorithmic bias occurs when machine learning models inadvertently codify and amplify systemic historical prejudices present in training datasets.',
    'hard', 1, 0, 14, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The model might execute in sub-millisecond time', false, 1, now(), now()),
    (v_q_id, 'Historical biases in loan decisions may be learned and propagated by the model, discriminating against protected demographics', true, 2, now(), now()),
    (v_q_id, 'Relational databases cannot handle numerical floats', false, 3, now(), now()),
    (v_q_id, 'The model will require too much electrical power', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the ''Right to Explanation'' enshrined in major data privacy regulations like the GDPR (General Data Protection Regulation)?', 'Under GDPR, data subjects have the right to receive meaningful human-comprehensible explanations regarding automated algorithmic decisions.',
    'medium', 1, 0, 15, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The requirement that users explain how their computers work', false, 1, now(), now()),
    (v_q_id, 'The entitlement of individuals to obtain meaningful information about the logic involved in automated decisions affecting them', true, 2, now(), now()),
    (v_q_id, 'The requirement that all algorithms be programmed in C', false, 3, now(), now()),
    (v_q_id, 'The rule that companies must explain how they price products', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the context of data security, what is ''Differential Privacy''?', 'Differential privacy adds calibrated mathematical noise to query results, providing formal probabilistic bounds against re-identification of individuals.',
    'hard', 1, 0, 16, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Encrypting hard drives with two different symmetric keys', false, 1, now(), now()),
    (v_q_id, 'A mathematical framework that allows querying aggregate datasets while guaranteeing that individual records cannot be identified', true, 2, now(), now()),
    (v_q_id, 'Deleting half of the database randomly', false, 3, now(), now()),
    (v_q_id, 'Using different passwords for different users', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does Data Anonymization entail?', 'Data anonymization strips, masks, or hashes personal identifiers, preventing linkage back to specific real-world individuals.',
    'easy', 1, 0, 17, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Changing the font size of customer names', false, 1, now(), now()),
    (v_q_id, 'Permanently altering or removing personally identifiable information (PII) so that data subjects cannot be identified', true, 2, now(), now()),
    (v_q_id, 'Restricting data access to weekends only', false, 3, now(), now()),
    (v_q_id, 'Translating text into foreign languages', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does Data Science transform the healthcare industry?', 'In healthcare, data science enables early pathology detection through computer vision, disease outbreak forecasting, and targeted drug discovery.',
    'medium', 1, 0, 18, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'By eliminating the need for all medical staff', false, 1, now(), now()),
    (v_q_id, 'Through predictive patient diagnostics, genomic analysis, personalized medicine, and medical imaging analysis', true, 2, now(), now()),
    (v_q_id, 'By replacing all physical hospitals with cloud servers', false, 3, now(), now()),
    (v_q_id, 'By solely automating invoice printing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following is a classic application of predictive data science in e-commerce?', 'E-commerce platforms utilize collaborative filtering and matrix factorization to recommend relevant products based on historical user browsing and purchasing patterns.',
    'easy', 1, 0, 19, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Collaborative filtering recommendation engines', true, 1, now(), now()),
    (v_q_id, 'Physical barcode laser printing', false, 2, now(), now()),
    (v_q_id, 'Warehouse air conditioning control', false, 3, now(), now()),
    (v_q_id, 'Cash register mechanical levers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the role of Exploratory Data Analysis (EDA) in the data science lifecycle?', 'John Tukey''s EDA philosophy emphasizes graphical and statistical inspection of raw data prior to any formal modeling.',
    'medium', 1, 0, 20, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Writing the final executive legal contract', false, 1, now(), now()),
    (v_q_id, 'Investigating datasets to discover underlying patterns, spot anomalies, test hypotheses, and verify assumptions using summary statistics and visualizations', true, 2, now(), now()),
    (v_q_id, 'Formatting hard drives for cloud clusters', false, 3, now(), now()),
    (v_q_id, 'Deleting unlabelled records without review', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which Python library is the foundational standard for numerical computing, multidimensional arrays, and linear algebra in Data Science?', 'NumPy (Numerical Python) provides the N-dimensional array object (ndarray), mathematical functions, and linear algebra routines fundamental to scientific computing.',
    'easy', 1, 0, 21, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'NumPy', true, 1, now(), now()),
    (v_q_id, 'Django', false, 2, now(), now()),
    (v_q_id, 'Pygame', false, 3, now(), now()),
    (v_q_id, 'BeautifulSoup', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary purpose of the Pandas library in Python?', 'Pandas provides DataFrame objects for tabular, heterogeneous, labeled data manipulation, merging, reshaping, and statistical aggregation.',
    'easy', 1, 0, 22, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Rendering 3D video game characters', false, 1, now(), now()),
    (v_q_id, 'Data manipulation and analysis using high-performance DataFrame and Series data structures', true, 2, now(), now()),
    (v_q_id, 'Handling low-level TCP/IP network sockets', false, 3, now(), now()),
    (v_q_id, 'Managing operating system kernel threads', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Data Lake?', 'A Data Lake ingests raw structured and unstructured data at scale without requiring upfront schema enforcement (schema-on-read).',
    'medium', 1, 0, 23, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical water cooling pond for data centers', false, 1, now(), now()),
    (v_q_id, 'A centralized repository that allows storing vast amounts of raw data in its native format (structured, semi-structured, and unstructured)', true, 2, now(), now()),
    (v_q_id, 'A relational database with only 10 tables', false, 3, now(), now()),
    (v_q_id, 'A backup tape drive kept in an underground vault', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does a Data Warehouse differ from a Data Lake?', 'Data warehouses enforce strict schema-on-write architectures tailored for high-speed SQL analytics and business intelligence.',
    'medium', 1, 0, 24, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A Data Warehouse stores only uncompressed audio files', false, 1, now(), now()),
    (v_q_id, 'A Data Warehouse stores clean, curated, highly structured data with a predefined relational schema optimized for querying (schema-on-write)', true, 2, now(), now()),
    (v_q_id, 'A Data Warehouse is always cheaper than a Data Lake', false, 3, now(), now()),
    (v_q_id, 'Data Warehouses cannot connect to SQL tools', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In CRISP-DM, if model evaluation reveals that the predictive model fails to meet business objectives, what should the team do?', 'CRISP-DM is intrinsically cyclical; failure at the evaluation phase triggers iterative loops back to earlier phases (problem formulation or feature engineering).',
    'medium', 1, 0, 25, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Immediately deploy the model to production anyway', false, 1, now(), now()),
    (v_q_id, 'Iterate back to Business Understanding or Data Preparation to re-scope features or refine objectives', true, 2, now(), now()),
    (v_q_id, 'Delete the entire codebase and cancel the contract', false, 3, now(), now()),
    (v_q_id, 'Switch to manual paper ledgers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Data Governance?', 'Data governance establishes policies for data quality, stewardship, provenance, compliance, and lifecycle management.',
    'medium', 1, 0, 26, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Electing political leaders using computer voting', false, 1, now(), now()),
    (v_q_id, 'The holistic framework of policies, processes, roles, and metrics that ensure effective and secure data management throughout an organization', true, 2, now(), now()),
    (v_q_id, 'The physical security guard patrolling a server room', false, 3, now(), now()),
    (v_q_id, 'Writing firmware for network routers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does PII stand for in data privacy and data science ethics?', 'PII refers to any information that can be used to distinguish or trace an individual''s identity (e.g., name, Social Security Number, biometric records).',
    'easy', 1, 0, 27, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Public Information Interface', false, 1, now(), now()),
    (v_q_id, 'Personally Identifiable Information', true, 2, now(), now()),
    (v_q_id, 'Predictive Inference Indicator', false, 3, now(), now()),
    (v_q_id, 'Private Internet Index', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary danger of ''Data Snooping'' or ''P-Hacking'' in data science research?', 'P-hacking or data snooping tests numerous hypotheses on the same dataset until an artificial correlation crosses the alpha threshold, generating non-reproducible models.',
    'hard', 1, 0, 28, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It slows down network download speeds', false, 1, now(), now()),
    (v_q_id, 'Repeatedly searching through data until an accidental statistically significant relationship is found, leading to false discoveries', true, 2, now(), now()),
    (v_q_id, 'It damages solid state drives', false, 3, now(), now()),
    (v_q_id, 'It makes plots appear in black and white', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Concept Drift'' in deployed machine learning systems?', 'Concept drift occurs when the statistical properties of the target variable and its relationship to input features change over time in production.',
    'hard', 1, 0, 29, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A software bug where variable names are renamed automatically', false, 1, now(), now()),
    (v_q_id, 'The statistical degradation of model predictive accuracy over time due to changes in the underlying distribution and real-world relationships of target variables', true, 2, now(), now()),
    (v_q_id, 'The physical overheating of graphics processing units', false, 3, now(), now()),
    (v_q_id, 'Users forgetting their system login credentials', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following describes ''Data Provenance'' (or Data Lineage)?', 'Data provenance/lineage tracks the lifecycle journey of data from source extraction through transformations to consumption.',
    'medium', 1, 0, 30, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The retail market value of raw hard disk drives', false, 1, now(), now()),
    (v_q_id, 'A documented record tracing the origins, transformations, and movements of data across its lifecycle', true, 2, now(), now()),
    (v_q_id, 'The speed at which data travels through optical cables', false, 3, now(), now()),
    (v_q_id, 'The compression ratio of a zip file', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In financial data science, what is ''Algorithmic Fraud Detection''?', 'Machine learning models identify fraudulent credit card transactions by evaluating millisecond deviation scores against baseline spending profiles.',
    'easy', 1, 0, 31, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Manually printing and auditing paper checks', false, 1, now(), now()),
    (v_q_id, 'Real-time classification models scanning transaction streams to identify anomalous or suspicious behavioral patterns indicating fraud', true, 2, now(), now()),
    (v_q_id, 'Selling stolen credit card data on dark web forums', false, 3, now(), now()),
    (v_q_id, 'Calculating simple bank branch interest rates annually', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which data visualization library in Python is built on top of Matplotlib and integrates closely with Pandas data structures?', 'Seaborn provides a high-level statistical visualization interface built on Matplotlib, featuring rich built-in themes and color palettes.',
    'easy', 1, 0, 32, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Seaborn', true, 1, now(), now()),
    (v_q_id, 'Pygame', false, 2, now(), now()),
    (v_q_id, 'Flask', false, 3, now(), now()),
    (v_q_id, 'Scrapy', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary purpose of an API (Application Programming Interface) in data science data acquisition?', 'Web APIs (RESTful endpoints) enable automated data collection by providing structured JSON/XML payloads on HTTP requests.',
    'easy', 1, 0, 33, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To visually design interactive presentations', false, 1, now(), now()),
    (v_q_id, 'To allow programmatic, standardized retrieval of structured data from web services and servers', true, 2, now(), now()),
    (v_q_id, 'To cool server hardware with liquid nitrogen', false, 3, now(), now()),
    (v_q_id, 'To manually format CSV strings in a text editor', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which cloud service model provides serverless compute environments for executing data science preprocessing scripts without provisioning VMs?', 'FaaS enables running event-driven data parsing pipelines on demand without server administration overhead.',
    'medium', 1, 0, 34, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'FaaS (Function as a Service, e.g., AWS Lambda, Google Cloud Functions)', true, 1, now(), now()),
    (v_q_id, 'IaaS (Infrastructure as a Service)', false, 2, now(), now()),
    (v_q_id, 'SaaS (Software as a Service)', false, 3, now(), now()),
    (v_q_id, 'DaaS (Desktop as a Service)', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is meant by the ''Volume'' dimension of Big Data?', 'Volume represents the colossal magnitude of data generated continuously from IoT, transactions, and user activity.',
    'easy', 1, 0, 35, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The loudness of cooling fans in a server rack', false, 1, now(), now()),
    (v_q_id, 'The sheer physical and logical scale and quantity of generated data (terabytes to petabytes)', true, 2, now(), now()),
    (v_q_id, 'The speed of streaming data arrival', false, 3, now(), now()),
    (v_q_id, 'The diversity of unstructured file formats', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the ''Velocity'' dimension of Big Data signify?', 'Velocity describes the frequency and speed of incoming data streams requiring instantaneous ingestion and real-time processing.',
    'easy', 1, 0, 36, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The speed of CPU clock cycles in gigahertz', false, 1, now(), now()),
    (v_q_id, 'The rate at which new data is generated, ingested, and required to be processed in real time', true, 2, now(), now()),
    (v_q_id, 'The physical speed of hard disk read heads', false, 3, now(), now()),
    (v_q_id, 'The speed of an analyst typing SQL queries', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the ''Variety'' dimension of Big Data highlight?', 'Variety refers to heterogeneous data types ranging from traditional relational tables to unstructured multimedia and logs.',
    'easy', 1, 0, 37, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Different price tiers of cloud subscription plans', false, 1, now(), now()),
    (v_q_id, 'The diverse structural forms of data, spanning tabular, audio, video, sensor signals, and text', true, 2, now(), now()),
    (v_q_id, 'The variety of colors used in dashboard charts', false, 3, now(), now()),
    (v_q_id, 'The different brands of server hardware', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the fourth classic ''V'' of Big Data that addresses data trustworthiness and accuracy?', 'Veracity denotes the trustworthiness, accuracy, data quality, and reliability of collected datasets.',
    'easy', 1, 0, 38, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Vagueness', false, 1, now(), now()),
    (v_q_id, 'Veracity', true, 2, now(), now()),
    (v_q_id, 'Volatility', false, 3, now(), now()),
    (v_q_id, 'Voltage', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In predictive modeling, what is the ''Ground Truth''?', 'Ground truth refers to the empirically observed, validated target values used to train and assess supervised learning models.',
    'medium', 1, 0, 39, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The physical soil composition beneath a data center', false, 1, now(), now()),
    (v_q_id, 'The verified, empirical real-world target outcome (labels) against which model predictions are measured', true, 2, now(), now()),
    (v_q_id, 'The theoretical maximum storage capacity of a hard drive', false, 3, now(), now()),
    (v_q_id, 'The legal terms of service agreed to by web users', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Synthetic Data'' in modern data science?', 'Synthetic data is generated algorithmically (using GANs or statistical sampling) to train models while preserving privacy and expanding scarce datasets.',
    'medium', 1, 0, 40, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Data stored on artificial plastic memory disks', false, 1, now(), now()),
    (v_q_id, 'Artificially generated data that mimics the statistical properties of real data without containing real individuals'' private records', true, 2, now(), now()),
    (v_q_id, 'Faulty data corrupted by computer viruses', false, 3, now(), now()),
    (v_q_id, 'Data manually guessed by software developers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which ethical framework principle mandates that algorithms must not inflict unnecessary harm or injustice upon human subjects?', 'The bioethical and algorithmic principle of non-maleficence requires that data systems avoid harm, exploitation, or discrimination.',
    'medium', 1, 0, 41, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Principle of Non-Maleficence', true, 1, now(), now()),
    (v_q_id, 'Principle of Maximum Profitability', false, 2, now(), now()),
    (v_q_id, 'Law of Diminishing Returns', false, 3, now(), now()),
    (v_q_id, 'Moore''s Law', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an ''Unbalanced Dataset'' (or Class Imbalance) in classification problems?', 'Class imbalance occurs when instances of one class dominate the training distribution, requiring specialized sampling techniques.',
    'medium', 1, 0, 42, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A dataset where numerical floats do not sum to 100', false, 1, now(), now()),
    (v_q_id, 'A situation where one target class significantly outnumbers other classes (e.g., 99.9% non-fraud vs 0.1% fraud)', true, 2, now(), now()),
    (v_q_id, 'A CSV file with unequal column widths', false, 3, now(), now()),
    (v_q_id, 'A database distributed across unequal hard drive partitions', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary role of a ''Data Dictionary'' (Metadata Catalog)?', 'A data dictionary documents schema definitions, attributes, data types, constraints, and semantic meanings across datasets.',
    'easy', 1, 0, 43, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To translate Python code into spoken English', false, 1, now(), now()),
    (v_q_id, 'To provide standardized metadata descriptions including column definitions, data types, allowed values, and business rules', true, 2, now(), now()),
    (v_q_id, 'To list the names of all employees who have access to the office', false, 3, now(), now()),
    (v_q_id, 'To store dictionary objects in Python memory', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In CRISP-DM, what is the output of the ''Data Preparation'' phase?', 'Data Preparation produces the final modeled tabular dataset (features and target matrices) ready for algorithm ingestion.',
    'easy', 1, 0, 44, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The final trained deep neural network model', false, 1, now(), now()),
    (v_q_id, 'The clean, transformed, feature-engineered dataset ready for consumption by machine learning algorithms', true, 2, now(), now()),
    (v_q_id, 'A printed invoice for client billing', false, 3, now(), now()),
    (v_q_id, 'The initial project charter document', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why is ''Reproducibility'' considered a cornerstone of rigorous scientific data analysis?', 'Reproducibility ensures findings can be independently validated, audited, and verified using version-controlled code and deterministic data pipelines.',
    'medium', 1, 0, 45, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It guarantees that cloud compute costs remain zero', false, 1, now(), now()),
    (v_q_id, 'It ensures that another researcher using the same data and analytical code can achieve identical empirical results', true, 2, now(), now()),
    (v_q_id, 'It prevents computers from crashing during training', false, 3, now(), now()),
    (v_q_id, 'It allows multiple developers to edit code simultaneously', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Data Drift'' as compared to ''Concept Drift''?', 'Data drift (covariate shift) refers to statistical shifts in the input feature space P(X), whereas concept drift refers to changes in the target relationship P(Y|X).',
    'hard', 1, 0, 46, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Data Drift occurs when input feature distributions P(X) change over time, even if the underlying conditional relationship P(Y|X) remains unchanged', true, 1, now(), now()),
    (v_q_id, 'Data Drift refers to hard drives drifting off their server mounts', false, 2, now(), now()),
    (v_q_id, 'Data Drift is an intentional feature of relational databases', false, 3, now(), now()),
    (v_q_id, 'There is no difference between Data Drift and Concept Drift', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following is a key metric in evaluating business value generated by a data science deployment?', 'Data science projects are ultimately evaluated on measurable business impact, such as revenue uplift, customer churn reduction, or operational cost savings.',
    'easy', 1, 0, 47, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Return on Investment (ROI) and cost reduction', true, 1, now(), now()),
    (v_q_id, 'The total number of semicolons in the Python code', false, 2, now(), now()),
    (v_q_id, 'The color theme selected in the code editor', false, 3, now(), now()),
    (v_q_id, 'The physical weight of the server racks', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Federated Learning'' in privacy-preserving data science?', 'Federated learning trains algorithms across decentralized edge nodes holding local data samples without exchanging the underlying raw data.',
    'hard', 1, 0, 48, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Centralizing all worldwide data into a single supercomputer', false, 1, now(), now()),
    (v_q_id, 'A decentralized machine learning approach where models are trained locally on edge devices/servers without exchanging raw private user data', true, 2, now(), now()),
    (v_q_id, 'Teaching government officials how to code in Python', false, 3, now(), now()),
    (v_q_id, 'Connecting multiple SQL databases with standard foreign keys', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which open-source standard is commonly used for reproducible data science notebooks combining executable code, narrative prose, and visualizations?', 'Project Jupyter provides interactive web-based computational environments combining live code, LaTeX, equations, and interactive charts.',
    'easy', 1, 0, 49, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Jupyter Notebooks', true, 1, now(), now()),
    (v_q_id, 'Adobe Photoshop', false, 2, now(), now()),
    (v_q_id, 'Microsoft Word', false, 3, now(), now()),
    (v_q_id, 'VLC Media Player', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What constitutes ''Data Extraction'' in an ETL pipeline?', 'Data extraction is the initial stage of ETL where data is ingested from disparate transactional sources into an analytical staging area.',
    'easy', 1, 0, 50, ARRAY['BCA-302N', 'Unit-1', 'BCA-302N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Compressing files into .tar.gz archives', false, 1, now(), now()),
    (v_q_id, 'Retrieving raw data from heterogeneous sources (databases, CRM, APIs, flat files) for staging', true, 2, now(), now()),
    (v_q_id, 'Permanently deleting redundant database indexes', false, 3, now(), now()),
    (v_q_id, 'Plotting line charts on an executive dashboard', false, 4, now(), now());

END $SEEDED_BLOCK$;
