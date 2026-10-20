DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-302N Unit 5 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', 'BCA-302N Unit 5: Model Evaluation and Optimization Practice Quiz (50 MCQs)', 'bca-302n-u5-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-302N Unit 5. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is ''Generalization Error'' in machine learning?', 'Generalization error measures how well model representations perform on novel, unseen data.',
    'easy', 1, 0, 1, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A syntax error produced by compilers when compiling code', false, 1, now(), now()),
    (v_q_id, 'A measure of how accurately an algorithm is able to predict target values for previously unseen out-of-sample data', true, 2, now(), now()),
    (v_q_id, 'An error caused by faulty RAM modules', false, 3, now(), now()),
    (v_q_id, 'The difference between floating point and integer precision', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the fundamental Bias-Variance Tradeoff, what does ''Bias'' represent?', 'Bias error stems from erroneous assumptions (e.g., assuming linear relationships for complex non-linear phenomena).',
    'easy', 1, 0, 2, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The physical tilt of a laptop monitor', false, 1, now(), now()),
    (v_q_id, 'The error introduced by approximating a complicated real-world problem with an overly simplistic model (leading to underfitting)', true, 2, now(), now()),
    (v_q_id, 'The random noise in the measurement sensors', false, 3, now(), now()),
    (v_q_id, 'The execution time of the algorithm', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Variance'' represent in the Bias-Variance Tradeoff?', 'High variance means the model fits specific training noise too closely, failing to generalize across different sample splits.',
    'easy', 1, 0, 3, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The spread of the training data features around zero', false, 1, now(), now()),
    (v_q_id, 'The sensitivity of the model to small fluctuations and random noise in the training set (leading to overfitting)', true, 2, now(), now()),
    (v_q_id, 'The storage size of the dataset on disk', false, 3, now(), now()),
    (v_q_id, 'The number of hyperparameter combinations tested', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'A model characterized by High Bias and Low Variance typically suffers from:', 'High bias causes underfitting: the model fails to capture underlying patterns on both training and test data.',
    'easy', 1, 0, 4, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Underfitting (the model is too simple to capture the underlying structure of the data)', true, 1, now(), now()),
    (v_q_id, 'Overfitting', false, 2, now(), now()),
    (v_q_id, 'Zero training error', false, 3, now(), now()),
    (v_q_id, 'Data leakage', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'A model characterized by Low Bias and High Variance typically suffers from:', 'Low bias with high variance yields overfitting: stellar training performance but poor validation scores.',
    'easy', 1, 0, 5, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Underfitting', false, 1, now(), now()),
    (v_q_id, 'Overfitting (the model has memorized the training set, including noise and outliers, and fails on unseen test data)', true, 2, now(), now()),
    (v_q_id, 'Fast execution time', false, 3, now(), now()),
    (v_q_id, 'Zero parameters', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the theoretical decomposition of the expected generalization error of a supervised learning model?', 'Expected MSE decomposes into squared bias, model variance, and irreducible environmental noise σ².',
    'hard', 1, 0, 6, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Error = (Bias)² + Variance + Irreducible Error (Noise)', true, 1, now(), now()),
    (v_q_id, 'Error = Bias + Variance * 2', false, 2, now(), now()),
    (v_q_id, 'Error = Bias / Variance', false, 3, now(), now()),
    (v_q_id, 'Error = (Bias * Variance) - Noise', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Irreducible Error'' in machine learning?', 'Irreducible error σ² arises from unobserved variables or measurement noise beyond algorithmic control.',
    'medium', 1, 0, 7, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Errors caused by bugs in the Python interpreter', false, 1, now(), now()),
    (v_q_id, 'Noise inherent in the data generation process itself that cannot be eliminated by any machine learning model', true, 2, now(), now()),
    (v_q_id, 'Errors that cause computers to crash', false, 3, now(), now()),
    (v_q_id, 'Data entry mistakes that can easily be corrected', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the simplest and most common validation strategy in machine learning?', 'The holdout method partitions available data into distinct training and testing subsets (e.g., 80/20 split).',
    'easy', 1, 0, 8, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Train-Test Split (Holdout Method)', true, 1, now(), now()),
    (v_q_id, 'Training on 100% of data and evaluating on 100% of data', false, 2, now(), now()),
    (v_q_id, 'Deleting test data before training', false, 3, now(), now()),
    (v_q_id, 'Testing models on synthetic random noise', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In standard Train-Test Split validation, what is a typical split ratio used in practice?', 'An 80/20 or 70/30 split provides ample training samples while maintaining a statistically significant evaluation sample.',
    'easy', 1, 0, 9, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '99% testing, 1% training', false, 1, now(), now()),
    (v_q_id, '70% to 80% training data, and 20% to 30% testing data', true, 2, now(), now()),
    (v_q_id, '10% training, 90% testing', false, 3, now(), now()),
    (v_q_id, '50% training, 50% hyperparameter tuning, 0% testing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a major limitation of a single Holdout Train-Test Split, especially on small datasets?', 'On smaller datasets, single splits suffer from high sampling variance depending on partition boundaries.',
    'medium', 1, 0, 10, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It consumes too much cloud storage', false, 1, now(), now()),
    (v_q_id, 'Performance estimates can be highly sensitive to the specific random split, exhibiting high variance depending on which samples ended up in the test set', true, 2, now(), now()),
    (v_q_id, 'It only works on decision tree models', false, 3, now(), now()),
    (v_q_id, 'It modifies the original dataset files permanently', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''K-Fold Cross-Validation''?', 'K-Fold Cross-Validation rotates validation across K non-overlapping folds, averaging performance across all K iterations.',
    'easy', 1, 0, 11, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Running a model K times on the entire dataset', false, 1, now(), now()),
    (v_q_id, 'A resampling technique that partitions data into K equal folds, iteratively training on K-1 folds and evaluating on the remaining fold K times', true, 2, now(), now()),
    (v_q_id, 'Multiplying model parameters by K', false, 3, now(), now()),
    (v_q_id, 'Splitting code into K separate Python scripts', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In standard 5-Fold Cross-Validation, how many distinct models are trained?', 'In 5-fold CV, 5 distinct models are trained, each evaluated on a different 20% holdout fold.',
    'easy', 1, 0, 12, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '1', false, 1, now(), now()),
    (v_q_id, '5', true, 2, now(), now()),
    (v_q_id, '25', false, 3, now(), now()),
    (v_q_id, '10', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary advantage of K-Fold Cross-Validation over a single train-test split?', 'K-fold CV maximizes data utilization and provides unbiased variance estimates of out-of-sample error.',
    'medium', 1, 0, 13, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It requires zero computational power', false, 1, now(), now()),
    (v_q_id, 'Every single observation is used for validation exactly once, providing a much more reliable and low-variance estimate of generalization performance', true, 2, now(), now()),
    (v_q_id, 'It guarantees 100% accuracy on all future data', false, 3, now(), now()),
    (v_q_id, 'It eliminates the need for data cleaning', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Stratified K-Fold Cross-Validation''?', 'Stratified K-fold ensures class proportions in each fold match the full population distribution.',
    'medium', 1, 0, 14, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Cross-validation where data is split randomly without checking labels', false, 1, now(), now()),
    (v_q_id, 'A variation of K-Fold cross-validation designed for classification where each fold contains approximately the same percentage of each target class as the complete dataset', true, 2, now(), now()),
    (v_q_id, 'Cross-validation performed on stratified rock samples', false, 3, now(), now()),
    (v_q_id, 'Cross-validation where K is always set to 100', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Leave-One-Out Cross-Validation'' (LOOCV)?', 'LOOCV sets K = N, training N times on N-1 observations and testing on the single left-out observation.',
    'medium', 1, 0, 15, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An extreme case of K-Fold CV where K equals N (the total number of observations), training on N-1 samples and testing on exactly one sample per iteration', true, 1, now(), now()),
    (v_q_id, 'Leaving one feature out of the model training', false, 2, now(), now()),
    (v_q_id, 'Leaving out the test set completely', false, 3, now(), now()),
    (v_q_id, 'Excluding the worst-performing model', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary computational disadvantage of Leave-One-Out Cross-Validation (LOOCV) on large datasets?', 'For large N, training N separate models causes severe computational latency.',
    'medium', 1, 0, 16, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It can only run on Linux computers', false, 1, now(), now()),
    (v_q_id, 'It requires training the model N separate times, which becomes computationally prohibitive when N is large', true, 2, now(), now()),
    (v_q_id, 'It increases model bias dramatically', false, 3, now(), now()),
    (v_q_id, 'It deletes one row from the database permanently', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Regularization'' in machine learning and regression modeling?', 'Regularization adds a penalty term to the optimization objective, constraining model parameter magnitudes to prevent overfitting.',
    'easy', 1, 0, 17, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A legal technique for complying with government data rules', false, 1, now(), now()),
    (v_q_id, 'A technique that discourages learning overly complex or flexible models by adding a penalty term to the loss function to prevent overfitting', true, 2, now(), now()),
    (v_q_id, 'The process of sorting data in ascending regular order', false, 3, now(), now()),
    (v_q_id, 'Writing clean code following PEP 8 standards', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Ridge Regression'' (also known as Tikhonov Regularization or L2 Regularization)?', 'Ridge adds an L2 penalty (λ Σβ_j²) to the loss function, shrinking coefficients toward zero without setting them strictly to zero.',
    'easy', 1, 0, 18, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A regression model that forces coefficients to be exactly zero', false, 1, now(), now()),
    (v_q_id, 'A linear regression variant that adds an L2 penalty proportional to the sum of squared coefficients to the OLS loss function: Loss = RSS + λ Σ(β_j)²', true, 2, now(), now()),
    (v_q_id, 'A model that fits data along geological mountain ridges', false, 3, now(), now()),
    (v_q_id, 'A model that only uses integer coefficients', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Ridge Regression, what does the hyperparameter λ (or `alpha` in Scikit-Learn) control?', 'Alpha (λ) governs penalty severity: λ = 0 yields standard OLS; large λ shrinks coefficients asymptotically toward zero.',
    'medium', 1, 0, 19, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The learning rate of gradient descent', false, 1, now(), now()),
    (v_q_id, 'The strength of the regularization penalty, balancing goodness-of-fit against coefficient shrinkage', true, 2, now(), now()),
    (v_q_id, 'The number of folds in cross-validation', false, 3, now(), now()),
    (v_q_id, 'The number of features to select', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What happens in Ridge Regression when the regularization parameter λ approaches zero (λ -> 0)?', 'When λ = 0, the penalty vanishes, reverting the objective function back to standard OLS.',
    'easy', 1, 0, 20, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'All coefficients become exactly zero', false, 1, now(), now()),
    (v_q_id, 'The Ridge Regression estimator converges to the standard Ordinary Least Squares (OLS) estimator', true, 2, now(), now()),
    (v_q_id, 'The model execution crashes', false, 3, now(), now()),
    (v_q_id, 'All coefficients become infinite', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What happens in Ridge Regression when λ becomes extremely large (λ -> ∞)?', 'Large λ penalizes non-zero weights heavily, shrinking all slopes toward zero and resulting in high bias (underfitting).',
    'medium', 1, 0, 21, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'All feature coefficients β_j shrink asymptotically towards zero (intercept β₀ remains as the mean of Y)', true, 1, now(), now()),
    (v_q_id, 'All coefficients explode to infinity', false, 2, now(), now()),
    (v_q_id, 'The model achieves zero training error', false, 3, now(), now()),
    (v_q_id, 'The model becomes severely overfitted', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Can Ridge Regression perform automated feature selection by setting coefficients strictly to zero?', 'Because the L2 penalty is smooth and circular (differentiable at zero), Ridge shrinks coefficients asymptotically but keeps all features active.',
    'hard', 1, 0, 22, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Yes, Ridge always sets 50% of coefficients to exactly zero', false, 1, now(), now()),
    (v_q_id, 'No, Ridge shrinks coefficients continuously close to zero, but rarely sets them exactly to zero', true, 2, now(), now()),
    (v_q_id, 'Yes, Ridge only retains non-zero coefficients', false, 3, now(), now()),
    (v_q_id, 'Only when trained on GPU hardware', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Lasso Regression'' (Least Absolute Shrinkage and Selection Operator, or L1 Regularization)?', 'Lasso adds an L1 penalty (λ Σ|β_j|), generating sparse weight vectors.',
    'easy', 1, 0, 23, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A regression model that adds an L1 penalty proportional to the sum of the absolute values of the coefficients: Loss = RSS + λ Σ|β_j|', true, 1, now(), now()),
    (v_q_id, 'A model used exclusively in cowboy cattle ranching', false, 2, now(), now()),
    (v_q_id, 'A regression model with circular penalty contours', false, 3, now(), now()),
    (v_q_id, 'A model that minimizes absolute errors without coefficients', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What unique and powerful property distinguishes Lasso Regression (L1) from Ridge Regression (L2)?', 'L1 penalty contours have sharp corners on parameter axes; constrained minima frequently land exactly on axes, setting irrelevant weights to 0.',
    'hard', 1, 0, 24, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Lasso can shrink coefficients to exactly zero, effectively performing automatic feature selection and producing sparse models', true, 1, now(), now()),
    (v_q_id, 'Lasso executes 1000x faster than Ridge', false, 2, now(), now()),
    (v_q_id, 'Lasso can only be used on classification problems', false, 3, now(), now()),
    (v_q_id, 'Lasso does not require hyperparameter tuning', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why does the L1 penalty in Lasso produce sparse models with exact zeros while the L2 penalty in Ridge does not?', 'The diamond geometry of the L1 ball intersects loss ellipses on coordinate axes where parameter values equal zero.',
    'hard', 1, 0, 25, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Geometrically, the L1 constraint region is a diamond with sharp vertices along coordinate axes where contours typically intersect first, while L2 is a smooth sphere', true, 1, now(), now()),
    (v_q_id, 'Because L1 uses division while L2 uses multiplication', false, 2, now(), now()),
    (v_q_id, 'Because L1 is an open-source algorithm while L2 is proprietary', false, 3, now(), now()),
    (v_q_id, 'Because L2 is only defined for imaginary numbers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Elastic Net'' Regularization?', 'Elastic Net blends L1 and L2 penalties, overcoming Lasso''s limitations on collinear feature groups.',
    'medium', 1, 0, 26, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical bungee cord used in computer assembly', false, 1, now(), now()),
    (v_q_id, 'A regularization technique that combines both L1 (Lasso) and L2 (Ridge) penalties: Loss = RSS + λ₁ Σ|β_j| + λ₂ Σ(β_j)²', true, 2, now(), now()),
    (v_q_id, 'A deep neural network connecting cloud servers', false, 3, now(), now()),
    (v_q_id, 'An algorithm that stretches dataset rows dynamically', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'When is Elastic Net typically preferred over standard Lasso Regression?', 'Lasso arbitrarily picks one feature among correlated predictors; Elastic Net retains grouped correlation structure.',
    'hard', 1, 0, 27, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'When the number of features P is much larger than observations N (P >> N) or when groups of correlated predictors exist', true, 1, now(), now()),
    (v_q_id, 'When the dataset has zero missing values', false, 2, now(), now()),
    (v_q_id, 'When all features are completely uncorrelated', false, 3, now(), now()),
    (v_q_id, 'When using non-relational databases', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why is it mandatory to standardize (scale) features before applying Ridge, Lasso, or Elastic Net regularization?', 'Regularization is scale-sensitive; features with large units naturally have smaller coefficients, causing unscaled features to be penalized unequally.',
    'hard', 1, 0, 28, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because unscaled features cause floating point overflows in Python', false, 1, now(), now()),
    (v_q_id, 'Because regularization penalizes coefficient magnitude; features with naturally smaller numerical scales will receive arbitrarily larger coefficients and be unfairly penalized', true, 2, now(), now()),
    (v_q_id, 'Because Scikit-Learn will throw an exception otherwise', false, 3, now(), now()),
    (v_q_id, 'Because scaling deletes outliers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Hyperparameter Tuning''?', 'Hyperparameters cannot be learned directly via gradient descent; they must be tuned via search procedures across validation splits.',
    'easy', 1, 0, 29, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Tuning the guitar strings in an audio dataset', false, 1, now(), now()),
    (v_q_id, 'The process of finding the optimal set of hyperparameters (e.g., regularization strength λ, polynomial degree) that minimizes validation error', true, 2, now(), now()),
    (v_q_id, 'Overclocking the computer CPU frequency', false, 3, now(), now()),
    (v_q_id, 'Writing comments in Python code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Grid Search'' (e.g., `GridSearchCV` in Scikit-Learn)?', '`GridSearchCV` systematically tests every combination across a specified parameter grid, identifying the top validation configuration.',
    'easy', 1, 0, 30, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A visual search through spreadsheet grids', false, 1, now(), now()),
    (v_q_id, 'An exhaustive search algorithm that trains and evaluates models across all combinations of specified hyperparameter values using cross-validation', true, 2, now(), now()),
    (v_q_id, 'Searching for electrical power grids using satellite images', false, 3, now(), now()),
    (v_q_id, 'A method for ordering data in a table', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Randomized Search'' (`RandomizedSearchCV`) as compared to Grid Search?', '`RandomizedSearchCV` samples parameter candidates randomly, exploring large parameter spaces faster and more efficiently than exhaustive grid search.',
    'medium', 1, 0, 31, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A search algorithm that randomly deletes parameters', false, 1, now(), now()),
    (v_q_id, 'An optimization strategy that samples a fixed number of parameter combinations randomly from specified probability distributions, saving significant compute time', true, 2, now(), now()),
    (v_q_id, 'A technique that guesses predictions randomly', false, 3, now(), now()),
    (v_q_id, 'A method for randomizing dataset rows', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary risk of tuning hyperparameters on the same Test Set used for final evaluation?', 'Tuning hyperparameters on the test set overfits the test partition; an isolated holdout test set is necessary for unbiased validation.',
    'hard', 1, 0, 32, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Information Leakage (Data Snooping), causing overoptimistic performance estimates that fail to generalize to true production data', true, 1, now(), now()),
    (v_q_id, 'The test set files will be corrupted', false, 2, now(), now()),
    (v_q_id, 'The model will execute more slowly', false, 3, now(), now()),
    (v_q_id, 'The computer memory will be exhausted', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Three-Way Data Split'' in machine learning?', 'Three-way splitting ensures clean separation between parameter fitting (train), model selection (validation), and final auditing (test).',
    'medium', 1, 0, 33, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Splitting data into three separate hard drives', false, 1, now(), now()),
    (v_q_id, 'Partitioning data into Training Set (for parameter estimation), Validation Set (for hyperparameter tuning and model selection), and Test Set (for final unbiased evaluation)', true, 2, now(), now()),
    (v_q_id, 'Dividing data by morning, afternoon, and night', false, 3, now(), now()),
    (v_q_id, 'Splitting code into three functions', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the `best_params_` attribute contain in a fitted `GridSearchCV` object in Scikit-Learn?', '`best_params_` outputs the parameter dictionary achieving maximum average validation score.',
    'easy', 1, 0, 34, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The total time elapsed during execution', false, 1, now(), now()),
    (v_q_id, 'The dictionary of parameter setting combinations that gave the best score on the holdout validation folds', true, 2, now(), now()),
    (v_q_id, 'The memory addresses of the models', false, 3, now(), now()),
    (v_q_id, 'The coefficients of the worst model', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Validation Curve'' used for in model diagnostics?', 'Validation curves illustrate how varying a hyperparameter shifts performance along the bias-variance spectrum.',
    'medium', 1, 0, 35, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Plotting training and validation scores against varying values of a single hyperparameter (e.g., tree depth, regularization alpha) to visualize underfitting and overfitting', true, 1, now(), now()),
    (v_q_id, 'Plotting the financial revenue of a company over time', false, 2, now(), now()),
    (v_q_id, 'Plotting CPU clock frequency against voltage', false, 3, now(), now()),
    (v_q_id, 'Drawing smooth curves on presentation slides', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Learning Curve'' in model evaluation?', 'Learning curves plot train vs validation error against sample size to diagnose data sufficiency and model capacity.',
    'medium', 1, 0, 36, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A plot of student grades over an academic semester', false, 1, now(), now()),
    (v_q_id, 'A plot showing training and validation scores as a function of the number of training samples, diagnosing whether a model suffers from high bias or high variance', true, 2, now(), now()),
    (v_q_id, 'The time required for an engineer to learn Python', false, 3, now(), now()),
    (v_q_id, 'A curve showing download progress of a dataset', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'If both the Training Error and Validation Error on a Learning Curve are high and plateau close together, the model suffers from:', 'Converging high training and validation errors indicate the model lacks capacity to capture true patterns (underfitting).',
    'medium', 1, 0, 37, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'High Variance (Overfitting)', false, 1, now(), now()),
    (v_q_id, 'High Bias (Underfitting)', true, 2, now(), now()),
    (v_q_id, 'Data Leakage', false, 3, now(), now()),
    (v_q_id, 'Zero Error', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'If the Training Error is very low, but the Validation Error is high and a large gap persists between them on a Learning Curve, the model suffers from:', 'A wide generalization gap between training fit and validation performance is the hallmark of overfitting.',
    'medium', 1, 0, 38, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'High Variance (Overfitting)', true, 1, now(), now()),
    (v_q_id, 'High Bias (Underfitting)', false, 2, now(), now()),
    (v_q_id, 'Optimal Convergence', false, 3, now(), now()),
    (v_q_id, 'Underparameterization', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What effective strategy should be pursued to fix High Variance (Overfitting)?', 'Overfitting is mitigated by expanding sample size, feature selection, and increasing regularization penalties.',
    'easy', 1, 0, 39, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Adding more polynomial features and increasing model capacity', false, 1, now(), now()),
    (v_q_id, 'Gathering more training data, applying regularization (L1/L2), and reducing feature complexity', true, 2, now(), now()),
    (v_q_id, 'Decreasing regularization strength to zero', false, 3, now(), now()),
    (v_q_id, 'Deleting the validation set', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What effective strategy should be pursued to fix High Bias (Underfitting)?', 'Underfitting requires expanding expressive capacity, feature engineering, and relaxing regularization constraints.',
    'easy', 1, 0, 40, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Increasing model complexity (e.g., adding polynomial features, neural network layers) and decreasing regularization strength', true, 1, now(), now()),
    (v_q_id, 'Collecting fewer data samples', false, 2, now(), now()),
    (v_q_id, 'Increasing regularization penalty λ to infinity', false, 3, now(), now()),
    (v_q_id, 'Deleting half the features randomly', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Scikit-Learn, which class implements Ridge Regression with built-in cross-validation for efficient alpha selection?', '`RidgeCV` performs efficient generalized cross-validation across alpha candidates.',
    'easy', 1, 0, 41, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`RidgeCV`', true, 1, now(), now()),
    (v_q_id, '`LassoCV`', false, 2, now(), now()),
    (v_q_id, '`GridSearchCV`', false, 3, now(), now()),
    (v_q_id, '`LinearRegressionCV`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Scikit-Learn, which class implements Lasso Regression with built-in cross-validation?', '`LassoCV` fits Lasso along a regularization path with automated cross-validation.',
    'easy', 1, 0, 42, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`LassoCV`', true, 1, now(), now()),
    (v_q_id, '`RidgeCV`', false, 2, now(), now()),
    (v_q_id, '`ElasticNetCV`', false, 3, now(), now()),
    (v_q_id, '`SGDRegressor`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Data Leakage'' (Target Leakage) in model development?', 'Data leakage occurs when validation or future information contaminates training, generating falsely elevated evaluation metrics.',
    'hard', 1, 0, 43, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'When data files are accidentally leaked on the internet', false, 1, now(), now()),
    (v_q_id, 'A critical error where information from outside the training dataset (such as target values or future data) is inadvertently used to create the model, resulting in unrealistic performance', true, 2, now(), now()),
    (v_q_id, 'Water leaking onto server hardware', false, 3, now(), now()),
    (v_q_id, 'When a computer program runs out of memory', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following represents a common source of Data Leakage?', 'Fitting transformations across the entire dataset exposes test-set distributions to training inputs.',
    'hard', 1, 0, 44, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Fitting a Min-Max Scaler on the entire dataset before performing Train-Test split', true, 1, now(), now()),
    (v_q_id, 'Using 5-fold cross validation inside a pipeline', false, 2, now(), now()),
    (v_q_id, 'Standardizing features using only training fold statistics', false, 3, now(), now()),
    (v_q_id, 'Writing automated unit tests for preprocessing functions', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Early Stopping'' in iterative model training (e.g., Gradient Descent)?', 'Early stopping monitors validation loss, terminating training when validation improvement stalls to prevent overfitting.',
    'medium', 1, 0, 45, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Shutting down the computer before finishing', false, 1, now(), now()),
    (v_q_id, 'Halting the optimization process as soon as validation loss begins to increase, preventing the model from overfitting to training noise', true, 2, now(), now()),
    (v_q_id, 'Killing background tasks manually', false, 3, now(), now()),
    (v_q_id, 'Stopping when training error reaches exactly zero', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In regression, what is the ''Baseline Model'' against which all developed models should be benchmarked?', 'A dummy regressor predicting the sample mean serves as the baseline; viable models must demonstrate superior performance over this baseline.',
    'easy', 1, 0, 46, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A complex 50-layer deep convolutional neural network', false, 1, now(), now()),
    (v_q_id, 'A trivial heuristic model that always predicts the mean (or median) of the target variable for every observation', true, 2, now(), now()),
    (v_q_id, 'A random number generator between 0 and 100', false, 3, now(), now()),
    (v_q_id, 'A model that copies the first column of the dataset', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does `DummyRegressor(strategy=''mean'')` in Scikit-Learn do?', '`DummyRegressor` provides a null reference benchmark to verify if trained models provide legitimate predictive signal.',
    'easy', 1, 0, 47, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It trains an advanced ensemble of regression trees', false, 1, now(), now()),
    (v_q_id, 'It acts as a baseline estimator that always predicts the training target mean, regardless of input feature values', true, 2, now(), now()),
    (v_q_id, 'It throws a syntax error if input features are missing', false, 3, now(), now()),
    (v_q_id, 'It generates random predictions from a Gaussian distribution', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Model Drift'' (or Concept Drift) in post-deployment model evaluation?', 'Real-world data dynamics drift from historical training snapshots, necessitating performance monitoring and retraining.',
    'medium', 1, 0, 48, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'When the physical hard drive vibrates out of place', false, 1, now(), now()),
    (v_q_id, 'The gradual degradation of model predictive accuracy over time due to shifts in real-world environmental patterns and distributions', true, 2, now(), now()),
    (v_q_id, 'When variable names are renamed in software updates', false, 3, now(), now()),
    (v_q_id, 'When users change their passwords', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is A/B Testing in machine learning deployment evaluation?', 'A/B testing evaluates live statistical performance between incumbent and candidate models in production environments.',
    'easy', 1, 0, 49, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing code using only the keys A and B on the keyboard', false, 1, now(), now()),
    (v_q_id, 'An experimental randomized trial where users are split between model version A (control) and model version B (challenger) to measure real-world performance differences', true, 2, now(), now()),
    (v_q_id, 'Training two models on odd and even rows', false, 3, now(), now()),
    (v_q_id, 'Comparing the size of two database files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why should model performance be continually monitored post-deployment using dashboards and automated alerts?', 'Production telemetry monitors feature drift and error spikes, triggering automated retraining pipelines.',
    'easy', 1, 0, 50, ARRAY['BCA-302N', 'Unit-5', 'BCA-302N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To prevent software licenses from expiring', false, 1, now(), now()),
    (v_q_id, 'To detect data drift, concept drift, and performance regressions early, triggering timely model retraining before business operations are impaired', true, 2, now(), now()),
    (v_q_id, 'To make sure cooling fans continue spinning', false, 3, now(), now()),
    (v_q_id, 'To ensure developers do not forget their login credentials', false, 4, now(), now());

END $SEEDED_BLOCK$;
