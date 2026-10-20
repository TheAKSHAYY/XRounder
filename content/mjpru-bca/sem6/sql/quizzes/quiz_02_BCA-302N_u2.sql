DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-302N Unit 2 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '2a7f47ac-c05c-5763-9251-f8d90031747f', 'BCA-302N Unit 2: Data Collection and Data Pre-Processing Practice Quiz (50 MCQs)', 'bca-302n-u2-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-302N Unit 2. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is the primary objective of data pre-processing in machine learning workflows?', 'Real-world data is typically dirty, incomplete, and inconsistently scaled; preprocessing cleans and structures it for reliable mathematical modeling.',
    'easy', 1, 0, 1, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To increase file sizes for cloud billing', false, 1, now(), now()),
    (v_q_id, 'To transform raw, noisy, incomplete real-world data into a clean, consistent format suitable for algorithm training', true, 2, now(), now()),
    (v_q_id, 'To compile Python scripts into binary machine code', false, 3, now(), now()),
    (v_q_id, 'To encrypt hard drive partitions', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which missing data mechanism describes a scenario where the probability of missingness depends entirely on observed variables and not the missing value itself?', 'Missing at Random (MAR) means the propensity for a data point to be missing is related to other observed data, but not the missing data itself.',
    'hard', 1, 0, 2, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Missing Completely at Random (MCAR)', false, 1, now(), now()),
    (v_q_id, 'Missing at Random (MAR)', true, 2, now(), now()),
    (v_q_id, 'Missing Not at Random (MNAR)', false, 3, now(), now()),
    (v_q_id, 'Deterministic Data Erasure', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Missing Completely at Random'' (MCAR) signify?', 'Under MCAR, missingness is completely random and unbiased by any variable in the dataset.',
    'medium', 1, 0, 3, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The missing values depend strongly on the unobserved variable itself', false, 1, now(), now()),
    (v_q_id, 'The probability of missingness is entirely independent of both observed and unobserved data', true, 2, now(), now()),
    (v_q_id, 'The entire column was dropped intentionally by the database administrator', false, 3, now(), now()),
    (v_q_id, 'The missing data occurs only on odd-numbered rows', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which technique handles missing numerical values by substituting the arithmetic mean of observed values?', 'Mean imputation replaces missing values in a numerical column with the mean of available observations.',
    'easy', 1, 0, 4, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Mean Imputation', true, 1, now(), now()),
    (v_q_id, 'Listwise Deletion', false, 2, now(), now()),
    (v_q_id, 'Hot-Deck Sampling', false, 3, now(), now()),
    (v_q_id, 'One-Hot Encoding', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a major mathematical drawback of using Mean Imputation for missing values?', 'Mean imputation concentrates probability density at the mean, artificially deflating variance and attenuating standard errors.',
    'medium', 1, 0, 5, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It changes the column data type to a string', false, 1, now(), now()),
    (v_q_id, 'It artificially reduces the variance of the variable and distorts covariance with other features', true, 2, now(), now()),
    (v_q_id, 'It causes infinite loops in CPU processing', false, 3, now(), now()),
    (v_q_id, 'It converts negative numbers into positive numbers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Listwise Deletion'' (Complete Case Analysis)?', 'Listwise deletion discards every observation that contains at least one missing entry.',
    'easy', 1, 0, 6, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Deleting the first ten rows of every table', false, 1, now(), now()),
    (v_q_id, 'Excluding any record (entire row) that has one or more missing values across analyzed variables', true, 2, now(), now()),
    (v_q_id, 'Removing the list data structure in Python memory', false, 3, now(), now()),
    (v_q_id, 'Renaming column headers to remove spaces', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Under which condition can Listwise Deletion introduce severe bias into a model?', 'If data is not MCAR, listwise deletion distorts the sample distribution, biasing model parameter estimates.',
    'medium', 1, 0, 7, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'When data is Missing Completely at Random (MCAR)', false, 1, now(), now()),
    (v_q_id, 'When missingness is not random (MAR or MNAR), leading to systemic exclusion of specific population subgroups', true, 2, now(), now()),
    (v_q_id, 'When the dataset has fewer than 10 columns', false, 3, now(), now()),
    (v_q_id, 'When using a Linux operating system', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''K-Nearest Neighbors (KNN) Imputation''?', 'KNN imputation calculates Euclidean or Gower distances between instances to borrow values from the K nearest neighbors.',
    'medium', 1, 0, 8, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Imputing missing values using the average or mode of the K most similar data instances in the feature space', true, 1, now(), now()),
    (v_q_id, 'Replacing missing values with random numbers between 1 and K', false, 2, now(), now()),
    (v_q_id, 'Deleting K rows whenever a null is encountered', false, 3, now(), now()),
    (v_q_id, 'Assigning the alphabet letter K to missing cells', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an ''Outlier'' in statistical data analysis?', 'An outlier is an extreme data point whose divergence from the rest of the sample suggests abnormal variation or measurement error.',
    'easy', 1, 0, 9, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A data point that lies outside the boundary of the computer screen', false, 1, now(), now()),
    (v_q_id, 'An observation that deviates markedly from the overall pattern of distribution of the remaining data', true, 2, now(), now()),
    (v_q_id, 'A software engineer who works outside the office', false, 3, now(), now()),
    (v_q_id, 'A variable stored in an external file', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In box plot analysis, an observation is considered an outlier if it falls below:', 'Tukey''s box plot rule identifies lower outliers as points falling below Q1 - 1.5 * IQR (where IQR = Q3 - Q1).',
    'easy', 1, 0, 10, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Q1 - 1.5 * IQR', true, 1, now(), now()),
    (v_q_id, 'Q1 + 1.5 * IQR', false, 2, now(), now()),
    (v_q_id, 'Median - 2 * IQR', false, 3, now(), now()),
    (v_q_id, 'Mean - Standard Deviation', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In box plot analysis, what defines an upper outlier?', 'Tukey''s rule defines upper outliers as observations exceeding Q3 + 1.5 * IQR.',
    'easy', 1, 0, 11, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A value greater than Q3 + 1.5 * IQR', true, 1, now(), now()),
    (v_q_id, 'A value greater than Q2 * 1.5', false, 2, now(), now()),
    (v_q_id, 'A value greater than Maximum * 2', false, 3, now(), now()),
    (v_q_id, 'A value equal to the mean', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Z-Score of a data point x in a distribution with mean μ and standard deviation σ?', 'The standard Z-score formula is Z = (x - mean) / standard_deviation.',
    'easy', 1, 0, 12, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Z = (x - μ) / σ', true, 1, now(), now()),
    (v_q_id, 'Z = (x + μ) * σ', false, 2, now(), now()),
    (v_q_id, 'Z = (x * σ) / μ', false, 3, now(), now()),
    (v_q_id, 'Z = σ / (x - μ)', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In a standard normal distribution, observations with an absolute Z-Score exceeding which threshold are conventionally flagged as outliers?', 'In standard Gaussian distributions, 99.7% of data lies within 3 standard deviations; values with |Z| > 3 are rare and typically treated as outliers.',
    'medium', 1, 0, 13, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '|Z| > 0.5', false, 1, now(), now()),
    (v_q_id, '|Z| > 1.0', false, 2, now(), now()),
    (v_q_id, '|Z| > 3.0', true, 3, now(), now()),
    (v_q_id, '|Z| > 100.0', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Winsorization'' (or Capping) of outliers?', 'Winsorizing caps extreme values at a designated percentile threshold rather than dropping the records entirely.',
    'medium', 1, 0, 14, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Deleting all outlier rows from the dataset permanently', false, 1, now(), now()),
    (v_q_id, 'Replacing extreme outlier values with the nearest non-outlier percentile limit (e.g., 1st or 99th percentile)', true, 2, now(), now()),
    (v_q_id, 'Converting outliers into imaginary numbers', false, 3, now(), now()),
    (v_q_id, 'Multiplying outliers by zero', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the formula for Min-Max Feature Scaling (Normalization) to rescale values into the interval [0, 1]?', 'Min-Max Normalization rescales a feature to [0, 1] using (x - x_min) / (x_max - x_min).',
    'easy', 1, 0, 15, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'x_scaled = (x - x_min) / (x_max - x_min)', true, 1, now(), now()),
    (v_q_id, 'x_scaled = (x - x_mean) / x_std', false, 2, now(), now()),
    (v_q_id, 'x_scaled = x * (x_max - x_min)', false, 3, now(), now()),
    (v_q_id, 'x_scaled = (x_max - x) / x_min', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary difference between Normalization (Min-Max) and Standardization (Z-score scaling)?', 'Standardization centers features at mean 0 and standard deviation 1, accommodating outliers better than Min-Max scaling which compresses distribution ranges.',
    'medium', 1, 0, 16, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Normalization bounds data strictly between [0, 1], while Standardization centers data at mean 0 with unit variance without bounding the extremes', true, 1, now(), now()),
    (v_q_id, 'Normalization handles strings, while Standardization handles floats', false, 2, now(), now()),
    (v_q_id, 'Standardization eliminates all outliers automatically', false, 3, now(), now()),
    (v_q_id, 'There is no difference; they are identical formulas', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why is feature scaling essential before training algorithms like K-Means Clustering and Support Vector Machines (SVM)?', 'Distance-based algorithms weigh attributes disproportionately if one feature has an order of magnitude larger scale (e.g., salary vs age).',
    'medium', 1, 0, 17, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because these algorithms rely on geometric distance metrics (e.g., Euclidean distance) that are dominated by features with arbitrarily larger numerical ranges', true, 1, now(), now()),
    (v_q_id, 'Because Python cannot multiply unscaled numbers', false, 2, now(), now()),
    (v_q_id, 'Because scaling speeds up hard disk read operations', false, 3, now(), now()),
    (v_q_id, 'Because unscaled numbers cause syntax errors in compilers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which machine learning models are inherently invariant to monotonic feature scaling?', 'Tree-based algorithms split nodes based on order inequalities and thresholds, making them completely invariant to monotonic numerical scaling.',
    'medium', 1, 0, 18, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'K-Nearest Neighbors (KNN)', false, 1, now(), now()),
    (v_q_id, 'Decision Trees and Random Forests', true, 2, now(), now()),
    (v_q_id, 'Support Vector Machines with RBF kernel', false, 3, now(), now()),
    (v_q_id, 'Principal Component Analysis (PCA)', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''One-Hot Encoding'' in categorical feature preprocessing?', 'One-Hot Encoding transforms categorical levels into binary columns where exactly one bit is ''hot'' (1) and all others are 0.',
    'easy', 1, 0, 19, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Converting categorical strings into a single running integer column (1, 2, 3...)', false, 1, now(), now()),
    (v_q_id, 'Creating a new binary (0 or 1) indicator column for each unique category in a categorical feature', true, 2, now(), now()),
    (v_q_id, 'Hashing the column values using MD5 checksums', false, 3, now(), now()),
    (v_q_id, 'Capitalizing all string characters', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What critical mathematical problem arises if all N binary columns from One-Hot Encoding are included in a linear regression model with an intercept?', 'The Dummy Variable Trap occurs because the sum of all dummy columns equals 1 (a linear combination of the intercept), causing multicollinearity; N-1 dummies must be used.',
    'hard', 1, 0, 20, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The Dummy Variable Trap (Perfect Multicollinearity)', true, 1, now(), now()),
    (v_q_id, 'Catastrophic Floating Point Overflow', false, 2, now(), now()),
    (v_q_id, 'Infinite Variance Inflation', false, 3, now(), now()),
    (v_q_id, 'Zero Division Error', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'When should ''Ordinal Encoding'' be preferred over ''One-Hot Encoding''?', 'Ordinal encoding maps ordered levels to integers (e.g., Poor=0, Average=1, Excellent=2), preserving the ordinal relationships.',
    'easy', 1, 0, 21, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'When the categorical feature has no natural ordering (e.g., colors: Red, Blue, Green)', false, 1, now(), now()),
    (v_q_id, 'When the categorical feature possesses a distinct, meaningful inherent rank or hierarchy (e.g., Low, Medium, High)', true, 2, now(), now()),
    (v_q_id, 'When the dataset contains more than one million rows', false, 3, now(), now()),
    (v_q_id, 'When training deep neural networks exclusively', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Target Encoding'' (Mean Encoding)?', 'Target encoding maps each categorical level to the posterior expected value of the target variable within that category.',
    'hard', 1, 0, 22, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Replacing each categorical value with the average target variable value for that category', true, 1, now(), now()),
    (v_q_id, 'Replacing every feature with the target variable column directly', false, 2, now(), now()),
    (v_q_id, 'Sorting the dataset according to the target column', false, 3, now(), now()),
    (v_q_id, 'Deleting the target column before training', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary risk associated with Target Encoding?', 'Target encoding directly exposes target information to feature columns; without cross-validation smoothing, it causes severe overfitting.',
    'hard', 1, 0, 23, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'High computational latency during testing', false, 1, now(), now()),
    (v_q_id, 'Severe Target Leakage and Overfitting, especially for rare categorical levels', true, 2, now(), now()),
    (v_q_id, 'Creating negative numbers in positive distributions', false, 3, now(), now()),
    (v_q_id, 'Corrupting the database index schema', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Data Integration'' in the data preparation phase?', 'Data integration reconciles disparate schemas, naming conventions, and data formats from multiple sources into a consistent consolidated store.',
    'easy', 1, 0, 24, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Combining data from multiple heterogeneous sources into a unified, coherent data store', true, 1, now(), now()),
    (v_q_id, 'Dividing a single CSV file into multiple small files', false, 2, now(), now()),
    (v_q_id, 'Encrypting database tables before transmission', false, 3, now(), now()),
    (v_q_id, 'Translating SQL queries into Java functions', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the ''Entity Identification Problem'' in data integration?', 'Entity identification matches real-world entities across disparate datasets where schemas, keys, or naming conventions differ.',
    'medium', 1, 0, 25, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Identifying which company manufactures a server', false, 1, now(), now()),
    (v_q_id, 'Recognizing that real-world entities are referred to by different identifiers across databases (e.g., ''Cust_ID'' vs ''Client_Num'')', true, 2, now(), now()),
    (v_q_id, 'Determining the MAC address of a network router', false, 3, now(), now()),
    (v_q_id, 'Locating the power button on an edge gateway', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Data Redundancy'' in database integration?', 'Redundancy occurs when the same attribute is stored in multiple locations, consuming unnecessary storage and risking inconsistency.',
    'easy', 1, 0, 26, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Having zero backup copies of a database', false, 1, now(), now()),
    (v_q_id, 'The unnecessary duplication of data fields across multiple tables, which can cause update anomalies and inconsistency', true, 2, now(), now()),
    (v_q_id, 'Compressing tables using gzip algorithms', false, 3, now(), now()),
    (v_q_id, 'Running two queries in parallel', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which statistical test is used during data integration to detect correlation between categorical attributes and eliminate redundant features?', 'The Chi-Square test determines whether there is a statistically significant association between two categorical variables.',
    'medium', 1, 0, 27, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Chi-Square (χ²) Test of Independence', true, 1, now(), now()),
    (v_q_id, 'T-Test of Means', false, 2, now(), now()),
    (v_q_id, 'Euclidean Vector Metric', false, 3, now(), now()),
    (v_q_id, 'Mann-Whitney U Test', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Data Transformation''?', 'Data transformation encompasses aggregation, scaling, normalization, attribute construction, and discretization.',
    'easy', 1, 0, 28, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Moving physical hard drives to another facility', false, 1, now(), now()),
    (v_q_id, 'The process of converting data from one format, structure, or scale into another suitable for analytical modeling', true, 2, now(), now()),
    (v_q_id, 'Deleting old log files automatically', false, 3, now(), now()),
    (v_q_id, 'Rewriting Python code into C++ code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Log Transformation'' commonly used for in data preprocessing?', 'Taking the natural log (log(x) or log(1+x)) compresses extreme right-tail values, reducing skewness and conforming closer to normal assumptions.',
    'medium', 1, 0, 29, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To convert numbers into Roman numerals', false, 1, now(), now()),
    (v_q_id, 'To stabilize variance, reduce positive (right) skewness, and make heavy-tailed distributions more Gaussian-like', true, 2, now(), now()),
    (v_q_id, 'To multiply all values by 10', false, 3, now(), now()),
    (v_q_id, 'To delete zero values', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Box-Cox Transformation?', 'Box-Cox finds an optimal power parameter λ to transform non-normal positive data into an approximately normal distribution.',
    'hard', 1, 0, 30, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical packaging technique for hard disks', false, 1, now(), now()),
    (v_q_id, 'A parametric power transformation technique that transforms non-normal dependent variables into approximately normal shapes', true, 2, now(), now()),
    (v_q_id, 'A method for drawing 3D box plots', false, 3, now(), now()),
    (v_q_id, 'A technique for converting integers to booleans', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Data Reduction'' in data preprocessing?', 'Data reduction decreases representation size through dimensionality reduction, numerosity reduction, or compression without losing analytical fidelity.',
    'easy', 1, 0, 31, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Erasing half of the database to save cloud storage fees', false, 1, now(), now()),
    (v_q_id, 'Techniques that reduce the volume or dimensionality of a dataset while producing identical or substantially similar analytical results', true, 2, now(), now()),
    (v_q_id, 'Running algorithms at lower CPU frequencies', false, 3, now(), now()),
    (v_q_id, 'Reducing font sizes in terminal logs', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Dimensionality Reduction''?', 'Dimensionality reduction condenses high-dimensional feature spaces into lower-dimensional representations while retaining essential information.',
    'easy', 1, 0, 32, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Reducing the physical dimensions of a server rack', false, 1, now(), now()),
    (v_q_id, 'The process of reducing the number of random variables (features/columns) under consideration in a dataset', true, 2, now(), now()),
    (v_q_id, 'Changing 3D plots into 2D plots', false, 3, now(), now()),
    (v_q_id, 'Limiting the number of users connected to a database', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the ''Curse of Dimensionality''?', 'As dimensionality increases, data points become exponentially equidistant in feature space, severely degrading distance-based algorithms.',
    'medium', 1, 0, 33, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A computer hardware virus affecting high-end GPUs', false, 1, now(), now()),
    (v_q_id, 'The exponential increase in volume and computational sparsity that occurs when adding features, causing distance metrics to lose discriminative power', true, 2, now(), now()),
    (v_q_id, 'A limit on the maximum number of rows in Excel', false, 3, now(), now()),
    (v_q_id, 'The difficulty of naming database tables', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which unsupervised linear transformation technique is most widely used for dimensionality reduction by projecting data onto orthogonal axes of maximum variance?', 'PCA identifies orthogonal principal component vectors that maximize variance in descending order, reducing dimensionality.',
    'medium', 1, 0, 34, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Principal Component Analysis (PCA)', true, 1, now(), now()),
    (v_q_id, 'Linear Discriminant Analysis (LDA)', false, 2, now(), now()),
    (v_q_id, 'One-Hot Encoding', false, 3, now(), now()),
    (v_q_id, 'K-Means Clustering', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Principal Component Analysis (PCA), what do the Eigenvalues of the covariance matrix represent?', 'Eigenvalues quantify the variance captured along their associated eigenvector directions.',
    'hard', 1, 0, 35, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The number of rows in the dataset', false, 1, now(), now()),
    (v_q_id, 'The amount of variance explained by each corresponding Principal Component (Eigenvector)', true, 2, now(), now()),
    (v_q_id, 'The error rate of the classification model', false, 3, now(), now()),
    (v_q_id, 'The execution time of the matrix algorithm in seconds', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Numerosity Reduction''?', 'Numerosity reduction replaces raw data points with parametric models (regression) or non-parametric summaries (clustering, sampling).',
    'medium', 1, 0, 36, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Replacing Roman numerals with Arabic numerals', false, 1, now(), now()),
    (v_q_id, 'Techniques that reduce the number of data instances (rows) by replacing data with alternative, smaller representations (e.g., clustering, sampling, histograms)', true, 2, now(), now()),
    (v_q_id, 'Deleting all prime numbers from a column', false, 3, now(), now()),
    (v_q_id, 'Converting 64-bit floats to 32-bit floats', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Stratified Random Sampling''?', 'Stratified sampling preserves subgroup proportions (e.g., class balances) in representative sample subsets.',
    'medium', 1, 0, 37, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Sampling data points completely at random without replacement', false, 1, now(), now()),
    (v_q_id, 'Dividing the population into mutually exclusive subgroups (strata) and sampling randomly from each stratum in proportion to its representation', true, 2, now(), now()),
    (v_q_id, 'Selecting every 10th row from a CSV file', false, 3, now(), now()),
    (v_q_id, 'Sampling only the top 100 rows', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Data Discretization''?', 'Discretization transforms continuous variables into discrete categorical bands (e.g., age into age brackets: <18, 18-35, 36-60, 60+).',
    'easy', 1, 0, 38, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Hiding data from unauthorized users', false, 1, now(), now()),
    (v_q_id, 'The process of converting continuous numerical attributes into discrete intervals, categories, or bins', true, 2, now(), now()),
    (v_q_id, 'Replacing text with emojis', false, 3, now(), now()),
    (v_q_id, 'Compressing files using zip archives', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which discretization technique divides the range of a continuous variable into N intervals of equal numerical width?', 'Equal-width binning divides the range (max - min) into N intervals of equal size: width = (max - min) / N.',
    'easy', 1, 0, 39, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Equal-Frequency Binning', false, 1, now(), now()),
    (v_q_id, 'Equal-Width Binning', true, 2, now(), now()),
    (v_q_id, 'K-Means Discretization', false, 3, now(), now()),
    (v_q_id, 'Decision Tree Splitting', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Equal-Frequency Binning'' (Quantile Binning)?', 'Equal-frequency binning uses quantiles (e.g., quartiles, deciles) so each bin contains an equal count of observations.',
    'easy', 1, 0, 40, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Dividing the continuous variable such that each resulting bin contains approximately the same number of data samples', true, 1, now(), now()),
    (v_q_id, 'Setting the frequency of the CPU clock to an equal value across cores', false, 2, now(), now()),
    (v_q_id, 'Dividing the dataset into bins of identical numerical widths', false, 3, now(), now()),
    (v_q_id, 'Creating bins based solely on user birth dates', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a major limitation of Equal-Width Binning when dealing with skewed distributions containing severe outliers?', 'Extreme outliers inflate the range, resulting in sparse or empty bins across most of the interval.',
    'medium', 1, 0, 41, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It cannot handle floating point numbers', false, 1, now(), now()),
    (v_q_id, 'Outliers can dominate the min-max range, causing most data points to fall into a single bin while other bins remain empty', true, 2, now(), now()),
    (v_q_id, 'It changes the order of rows in the database', false, 3, now(), now()),
    (v_q_id, 'It requires GPU hardware', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Concept Hierarchy'' in data discretization?', 'Concept hierarchies organize discrete attributes into hierarchical abstraction levels for multi-level data cube aggregation.',
    'medium', 1, 0, 42, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The hierarchy of employees in a software company', false, 1, now(), now()),
    (v_q_id, 'A sequence of mappings from a set of low-level concepts to higher-level, more general concepts (e.g., Street -> City -> State -> Country)', true, 2, now(), now()),
    (v_q_id, 'The directory structure of an operating system', false, 3, now(), now()),
    (v_q_id, 'The order of function calls in a stack frame', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Feature Extraction'' as opposed to ''Feature Selection''?', 'Selection retains a subset of existing variables; extraction projects the original attributes into a novel latent coordinate space (e.g., PCA).',
    'medium', 1, 0, 43, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Feature selection creates brand new attributes, while feature extraction deletes columns', false, 1, now(), now()),
    (v_q_id, 'Feature Selection chooses a subset of original features without altering them, while Feature Extraction transforms original features into a new, lower-dimensional feature space', true, 2, now(), now()),
    (v_q_id, 'There is no difference; they are exact synonyms', false, 3, now(), now()),
    (v_q_id, 'Feature extraction only works on image files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which technique is an example of a ''Filter Method'' for Feature Selection?', 'Filter methods evaluate intrinsic statistical properties (correlation, mutual information, ANOVA F-value) independently of any machine learning model.',
    'medium', 1, 0, 44, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Forward Stepwise Selection', false, 1, now(), now()),
    (v_q_id, 'Pearson Correlation Coefficient ranking against the target', true, 2, now(), now()),
    (v_q_id, 'Recursive Feature Elimination (RFE)', false, 3, now(), now()),
    (v_q_id, 'Lasso L1 Regularization', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do ''Wrapper Methods'' for feature selection operate?', 'Wrapper methods evaluate candidate subsets by training a learning algorithm and measuring predictive accuracy.',
    'hard', 1, 0, 45, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'They wrap CSV files in encrypted archives', false, 1, now(), now()),
    (v_q_id, 'They use a predictive model as an evaluation engine to search and score different feature subsets iteratively (e.g., RFE, genetic algorithms)', true, 2, now(), now()),
    (v_q_id, 'They wrap Python code in C++ libraries', false, 3, now(), now()),
    (v_q_id, 'They plot features on wrapping circle diagrams', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Embedded Feature Selection''?', 'Embedded methods incorporate variable selection directly inside the algorithm objective function during optimization.',
    'medium', 1, 0, 46, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Installing hardware sensors inside computer chips', false, 1, now(), now()),
    (v_q_id, 'Feature selection performed internally as an integral part of the model training process (e.g., Lasso regression coefficients, Decision Tree feature importances)', true, 2, now(), now()),
    (v_q_id, 'Embedding SQL queries into HTML web pages', false, 3, now(), now()),
    (v_q_id, 'Selecting features using cloud APIs', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Data Scrubbing'' (or Data Cleansing)?', 'Data scrubbing audits datasets to correct syntax errors, strip whitespace, unify formats, and eliminate contradictory values.',
    'easy', 1, 0, 47, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Washing hard drive platters with soap and water', false, 1, now(), now()),
    (v_q_id, 'The process of identifying, correcting, or removing corrupt, inaccurate, duplicate, or irrelevant records from a dataset', true, 2, now(), now()),
    (v_q_id, 'Overwriting random bits on an SSD', false, 3, now(), now()),
    (v_q_id, 'Renaming database files on disk', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'When merging two datasets based on a common key, what is a ''Cross Join'' (Cartesian Product)?', 'A Cartesian product pairs every row of table A with every row of table B, expanding row counts geometrically.',
    'easy', 1, 0, 48, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A join that matches records where keys are identical', false, 1, now(), now()),
    (v_q_id, 'A join that combines every row of the first dataset with every row of the second dataset, producing N * M rows', true, 2, now(), now()),
    (v_q_id, 'A join that deletes non-matching rows', false, 3, now(), now()),
    (v_q_id, 'A join that only selects the first row of each table', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Data Imputation''?', 'Imputation replaces missing values with estimated values derived from observed distributions.',
    'easy', 1, 0, 49, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Filing a legal lawsuit over stolen intellectual property', false, 1, now(), now()),
    (v_q_id, 'The statistical practice of replacing missing or null data values with substituted estimates', true, 2, now(), now()),
    (v_q_id, 'Encrypting database transactions', false, 3, now(), now()),
    (v_q_id, 'Converting databases into JSON files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the Scikit-Learn `SimpleImputer` class do in Python?', '`SimpleImputer` in Scikit-Learn replaces null values in arrays using standard statistical strategies (mean, median, most_frequent, constant).',
    'easy', 1, 0, 50, ARRAY['BCA-302N', 'Unit-2', 'BCA-302N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It trains deep neural networks on image data', false, 1, now(), now()),
    (v_q_id, 'It provides basic strategies for imputing missing values using the mean, median, most frequent, or a constant value', true, 2, now(), now()),
    (v_q_id, 'It downloads datasets from the internet', false, 3, now(), now()),
    (v_q_id, 'It formats tables into HTML', false, 4, now(), now());

END $SEEDED_BLOCK$;
