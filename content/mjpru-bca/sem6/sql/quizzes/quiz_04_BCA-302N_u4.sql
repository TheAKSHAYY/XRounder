DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-302N Unit 4 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    'cf4515e9-da99-5068-b6e1-a4b80c235dc6', 'BCA-302N Unit 4: Model Development Practice Quiz (50 MCQs)', 'bca-302n-u4-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-302N Unit 4. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is the fundamental goal of Simple Linear Regression?', 'Simple linear regression models the dependent variable Y as a linear function of an explanatory variable X, intercept β₀, and slope β₁.',
    'easy', 1, 0, 1, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To group unlabeled data into K clusters', false, 1, now(), now()),
    (v_q_id, 'To model the linear relationship between a single independent predictor variable X and a continuous target variable Y: Y = β₀ + β₁X + ε', true, 2, now(), now()),
    (v_q_id, 'To classify images into dog or cat categories', false, 3, now(), now()),
    (v_q_id, 'To sort database rows alphabetically', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the simple linear regression equation Y = β₀ + β₁X, what does β₁ represent geometrically?', 'The slope β₁ dictates the rate of change and direction of the predicted target per unit increase in X.',
    'easy', 1, 0, 2, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The Y-intercept (value of Y when X = 0)', false, 1, now(), now()),
    (v_q_id, 'The slope of the regression line, indicating the change in Y for a one-unit change in X', true, 2, now(), now()),
    (v_q_id, 'The random error term', false, 3, now(), now()),
    (v_q_id, 'The coefficient of determination', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the parameter β₀ represent in the linear regression line Y = β₀ + β₁X?', 'The intercept β₀ is where the fitted hyperplane crosses the vertical Y-axis (X = 0).',
    'easy', 1, 0, 3, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The Y-intercept, which is the expected value of Y when X is equal to zero', true, 1, now(), now()),
    (v_q_id, 'The correlation coefficient', false, 2, now(), now()),
    (v_q_id, 'The standard error of the estimate', false, 3, now(), now()),
    (v_q_id, 'The maximum possible value of Y', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What mathematical optimization criterion is minimized by the Ordinary Least Squares (OLS) estimator?', 'OLS minimizes the sum of squared vertical differences (residuals) between observed values and fitted values.',
    'easy', 1, 0, 4, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The sum of absolute differences |Y - Ŷ|', false, 1, now(), now()),
    (v_q_id, 'The Residual Sum of Squares (RSS): Σ(y_i - ŷ_i)²', true, 2, now(), now()),
    (v_q_id, 'The product of all error terms', false, 3, now(), now()),
    (v_q_id, 'The maximum outlier error', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Residual'' (e_i) in regression analysis?', 'The residual is the vertical prediction error e_i = y_i - ŷ_i for observation i.',
    'easy', 1, 0, 5, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The difference between the observed true target value and the model predicted value: e_i = y_i - ŷ_i', true, 1, now(), now()),
    (v_q_id, 'The execution time of the regression script', false, 2, now(), now()),
    (v_q_id, 'The ratio of the slope to the intercept', false, 3, now(), now()),
    (v_q_id, 'The number of features deleted during preprocessing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following is a fundamental assumption of the Classical Linear Regression Model (Gauss-Markov)?', 'The Gauss-Markov assumptions require linearity, zero conditional mean of errors, homoscedasticity, no autocorrelation, and no perfect multicollinearity.',
    'hard', 1, 0, 6, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Features must be non-linear polynomials', false, 1, now(), now()),
    (v_q_id, 'Homoscedasticity: the variance of the error terms ε_i must be constant across all levels of X', true, 2, now(), now()),
    (v_q_id, 'The target variable must be a discrete integer', false, 3, now(), now()),
    (v_q_id, 'Residuals must have a non-zero mean', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Homoscedasticity'' mean in regression residuals analysis?', 'Homoscedasticity signifies constant error variance; violations are termed heteroscedasticity.',
    'medium', 1, 0, 7, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The variance of residual errors is constant across all predicted values', true, 1, now(), now()),
    (v_q_id, 'The residuals increase exponentially as predictions grow', false, 2, now(), now()),
    (v_q_id, 'The errors follow a uniform distribution from 0 to 1', false, 3, now(), now()),
    (v_q_id, 'The data has zero missing values', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Heteroscedasticity'' in regression diagnostics?', 'Heteroscedasticity occurs when residual spread fans out or varies systematically across fitted values.',
    'medium', 1, 0, 8, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Constant variance across all observations', false, 1, now(), now()),
    (v_q_id, 'A condition where the variance of the error terms is systematic and non-constant (e.g., funnel-shaped residuals)', true, 2, now(), now()),
    (v_q_id, 'A situation where all residuals are exactly zero', false, 3, now(), now()),
    (v_q_id, 'A dataset with equal numbers of rows and columns', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How is Heteroscedasticity typically detected visually in regression diagnostics?', 'A fan-shaped or funnel pattern in residual vs fitted plots indicates non-constant variance.',
    'medium', 1, 0, 9, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Using a Residual vs Fitted Plot, observing a distinct fan or cone-shaped pattern of scatter', true, 1, now(), now()),
    (v_q_id, 'Using a pie chart of categorical counts', false, 2, now(), now()),
    (v_q_id, 'By checking if the code compiles without errors', false, 3, now(), now()),
    (v_q_id, 'By viewing a bar chart of student grades', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the Gauss-Markov Theorem state regarding the OLS estimator when classical assumptions hold?', 'The Gauss-Markov theorem proves that under standard assumptions, OLS estimators have minimum variance among all linear unbiased estimators.',
    'hard', 1, 0, 10, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'OLS is BLUE: Best Linear Unbiased Estimator (it has the minimum variance among all linear unbiased estimators)', true, 1, now(), now()),
    (v_q_id, 'OLS always produces 100% accurate predictions', false, 2, now(), now()),
    (v_q_id, 'OLS is biased but fast', false, 3, now(), now()),
    (v_q_id, 'OLS requires quantum computers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Multiple Linear Regression?', 'Multiple linear regression extends bivariate regression to multidimensional feature spaces.',
    'easy', 1, 0, 11, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Running simple linear regression multiple times in parallel', false, 1, now(), now()),
    (v_q_id, 'An extension of linear regression that models the relationship between two or more independent features and a continuous target: Y = β₀ + β₁X₁ + β₂X₂ + ... + βₚXₚ + ε', true, 2, now(), now()),
    (v_q_id, 'A model that outputs multiple target columns simultaneously', false, 3, now(), now()),
    (v_q_id, 'A regression model with multiple layers of neural networks', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In matrix notation, what is the closed-form analytical solution (Normal Equation) for the OLS coefficient vector β?', 'The normal equation minimizing RSS in matrix form is β = (XᵀX)⁻¹Xᵀy.',
    'hard', 1, 0, 12, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'β = (XᵀX)⁻¹XᵀY', true, 1, now(), now()),
    (v_q_id, 'β = XᵀY / XᵀX', false, 2, now(), now()),
    (v_q_id, 'β = (X + Y)⁻¹Xᵀ', false, 3, now(), now()),
    (v_q_id, 'β = X(YᵀY)⁻¹', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Under which condition does the matrix (XᵀX) become non-invertible (singular), preventing direct analytical solution via the Normal Equation?', 'If features are collinear or features exceed observations (P > N), XᵀX is rank-deficient and cannot be inverted.',
    'hard', 1, 0, 13, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'When the number of observations N is greater than 100', false, 1, now(), now()),
    (v_q_id, 'When perfect multicollinearity exists (features are linearly dependent) or when number of features P > number of samples N', true, 2, now(), now()),
    (v_q_id, 'When all numbers are positive', false, 3, now(), now()),
    (v_q_id, 'When using 64-bit operating systems', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Gradient Descent'' in the context of linear model optimization?', 'Gradient descent iteratively updates weights: w = w - α * ∇Loss(w), stepping down the loss surface.',
    'medium', 1, 0, 14, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An analytical single-step closed-form formula', false, 1, now(), now()),
    (v_q_id, 'An iterative first-order optimization algorithm that updates parameters in the direction opposite to the gradient of the loss function to locate a minimum', true, 2, now(), now()),
    (v_q_id, 'A method for sorting numbers in descending order', false, 3, now(), now()),
    (v_q_id, 'A hardware cooling technique for processors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Gradient Descent, what does the ''Learning Rate'' (α) parameter control?', 'The learning rate α scales the gradient step; too small converges slowly, while too large can cause divergence.',
    'medium', 1, 0, 15, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The number of CPU cores used', false, 1, now(), now()),
    (v_q_id, 'The step size taken in the parameter space towards the cost function minimum at each iteration', true, 2, now(), now()),
    (v_q_id, 'The percentage of data loaded into memory', false, 3, now(), now()),
    (v_q_id, 'The speed of the network card', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Residual Plot'' used for in regression evaluation?', 'Residual plots assess linearity and homoscedasticity; an ideal plot displays an unstructured random cloud of points around zero.',
    'easy', 1, 0, 16, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To plot residuals on the vertical axis against predicted fitted values on the horizontal axis to verify regression assumptions', true, 1, now(), now()),
    (v_q_id, 'To display the distribution of student test grades', false, 2, now(), now()),
    (v_q_id, 'To plot the physical coordinates of servers', false, 3, now(), now()),
    (v_q_id, 'To monitor memory usage over time', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In an ideal, well-specified linear regression model, how should the Residual Plot appear?', 'A random dispersion around zero confirms that the linear function captured all structural relationships.',
    'medium', 1, 0, 17, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A random, homoscedastic scatter of points centered around zero with no discernible curved or funnel patterns', true, 1, now(), now()),
    (v_q_id, 'A clear U-shaped parabolic curve', false, 2, now(), now()),
    (v_q_id, 'A straight diagonal line with a slope of 45 degrees', false, 3, now(), now()),
    (v_q_id, 'All points clustered tightly on the far right', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does a curved, U-shaped pattern in a Residual Plot indicate?', 'Systematic curvature in residuals indicates uncaptured non-linear relationships.',
    'medium', 1, 0, 18, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The relationship between predictors and the target is non-linear, suggesting polynomial terms or non-linear models are needed', true, 1, now(), now()),
    (v_q_id, 'The model has achieved perfection', false, 2, now(), now()),
    (v_q_id, 'The data has zero variance', false, 3, now(), now()),
    (v_q_id, 'The computer processor made an arithmetic error', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Distribution Plot'' of residuals used to verify in regression diagnostics?', 'Linear regression hypothesis tests (t-tests, F-tests) assume normally distributed error terms.',
    'medium', 1, 0, 19, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Whether the residual errors follow an approximately Normal (Gaussian) distribution with mean zero', true, 1, now(), now()),
    (v_q_id, 'Whether the dataset has enough rows', false, 2, now(), now()),
    (v_q_id, 'Whether the features are stored in alphabetical order', false, 3, now(), now()),
    (v_q_id, 'The download speed of the model weights', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Polynomial Regression?', 'Polynomial regression models non-linear relationships by creating higher-order polynomial powers of features while remaining linear in parameters.',
    'easy', 1, 0, 20, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A form of regression where the relationship between the independent variable X and target Y is modeled as an nth degree polynomial: Y = β₀ + β₁X + β₂X² + ... + βₙXⁿ + ε', true, 1, now(), now()),
    (v_q_id, 'A regression algorithm designed exclusively for polygon graphics', false, 2, now(), now()),
    (v_q_id, 'A model where coefficients are non-linear powers', false, 3, now(), now()),
    (v_q_id, 'A model that only accepts complex numbers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why is Polynomial Regression still considered a ''Linear Model''?', 'Linearity in regression refers to linearity in parameters β, not the predictors X.',
    'medium', 1, 0, 21, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because its graph is always a straight line', false, 1, now(), now()),
    (v_q_id, 'Because the model is linear in the unknown parameters (coefficients β), even though the feature variables are transformed non-linearly', true, 2, now(), now()),
    (v_q_id, 'Because it is trained using linear accelerators', false, 3, now(), now()),
    (v_q_id, 'Because it only accepts integers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What major risk increases exponentially as the degree of a Polynomial Regression model increases (e.g., degree 15 on 20 data points)?', 'High-degree polynomials flex to fit sample noise, leading to catastrophic generalization error on unseen data.',
    'medium', 1, 0, 22, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Severe Overfitting, capturing noise and exhibiting extreme oscillatory fluctuations between training points', true, 1, now(), now()),
    (v_q_id, 'Underfitting with high bias', false, 2, now(), now()),
    (v_q_id, 'The file size decreasing to zero bytes', false, 3, now(), now()),
    (v_q_id, 'The loss function becoming negative', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Machine Learning Pipeline'' (e.g., Scikit-Learn `Pipeline`)?', 'Pipelines encapsulate preprocessing, feature selection, and estimation into a single object, preventing data leakage.',
    'medium', 1, 0, 23, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical plumbing pipe for liquid cooling', false, 1, now(), now()),
    (v_q_id, 'A software construct that chains multiple data transformation steps (imputation, scaling) together with a final estimator into a unified object', true, 2, now(), now()),
    (v_q_id, 'A method for downloading datasets via torrents', false, 3, now(), now()),
    (v_q_id, 'A pipeline for deploying Docker containers to Kubernetes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why is encapsulating feature scaling and model training inside a Scikit-Learn `Pipeline` critical?', 'Fitting scalers outside pipelines leaks test-set distributional knowledge into training representations.',
    'hard', 1, 0, 24, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It speeds up computer execution by 1000x', false, 1, now(), now()),
    (v_q_id, 'It guarantees that scaling parameters (mean and std) are learned strictly from training folds, preventing data leakage from test sets during cross-validation', true, 2, now(), now()),
    (v_q_id, 'It automatically writes unit tests', false, 3, now(), now()),
    (v_q_id, 'It converts Python scripts to C++ code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the Coefficient of Determination (R²) represent in regression evaluation?', 'R² = 1 - (SS_res / SS_tot), measuring the proportion of target variance explained by predictors.',
    'easy', 1, 0, 25, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The proportion of variance in the dependent target variable that is explained by the independent features in the model', true, 1, now(), now()),
    (v_q_id, 'The square of the standard error of the estimate', false, 2, now(), now()),
    (v_q_id, 'The probability that the model is correct', false, 3, now(), now()),
    (v_q_id, 'The slope of the line multiplied by two', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the valid mathematical range of R² in a training evaluation with an intercept?', 'On training data with an intercept, R² ranges from 0 to 1; on test sets, poor models can yield negative R².',
    'medium', 1, 0, 26, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Between -1.0 and +1.0', false, 1, now(), now()),
    (v_q_id, 'Between 0.0 and 1.0 (though it can be negative on out-of-sample test sets when predictions are worse than the mean)', true, 2, now(), now()),
    (v_q_id, 'Between 0 and 100 without decimals', false, 3, now(), now()),
    (v_q_id, 'From 1 to infinity', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a major limitation of standard R² when adding many new predictor features to a multiple linear regression model?', 'R² mechanically increases with every added predictor, rewarding overparameterization.',
    'medium', 1, 0, 27, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'R² can never be calculated on more than two features', false, 1, now(), now()),
    (v_q_id, 'Standard R² monotonically increases (or remains constant), never decreasing, even if completely irrelevant noise features are added', true, 2, now(), now()),
    (v_q_id, 'R² becomes zero whenever three features are present', false, 3, now(), now()),
    (v_q_id, 'R² turns into an imaginary number', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does ''Adjusted R²'' resolve the limitation of standard R²?', 'Adjusted R² penalizes model complexity; it increases only if a new term improves fit more than expected by chance.',
    'medium', 1, 0, 28, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'By penalizing the score for every additional independent feature added to the model: R²_adj = 1 - [(1 - R²)(n - 1) / (n - p - 1)]', true, 1, now(), now()),
    (v_q_id, 'By taking the square root of R²', false, 2, now(), now()),
    (v_q_id, 'By multiplying R² by the sample size', false, 3, now(), now()),
    (v_q_id, 'By rounding R² to the nearest integer', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mean Squared Error (MSE)?', 'MSE measures average squared prediction error, heavily penalizing large outliers.',
    'easy', 1, 0, 29, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The average of absolute errors', false, 1, now(), now()),
    (v_q_id, 'The average of the squared differences between observed values and predicted values: MSE = (1/n) Σ(y_i - ŷ_i)²', true, 2, now(), now()),
    (v_q_id, 'The square of the mean target value', false, 3, now(), now()),
    (v_q_id, 'The ratio of errors to sample size', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Root Mean Squared Error (RMSE)?', 'RMSE takes the square root of MSE, interpreting errors in the same units as the target variable.',
    'easy', 1, 0, 30, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The square of the MSE', false, 1, now(), now()),
    (v_q_id, 'The square root of the Mean Squared Error: RMSE = sqrt(MSE), bringing the error metric back to the original units of the target variable', true, 2, now(), now()),
    (v_q_id, 'The absolute value of the mean error', false, 3, now(), now()),
    (v_q_id, 'The reciprocal of MSE', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mean Absolute Error (MAE)?', 'MAE calculates average absolute magnitude of errors, providing a linear, outlier-robust metric.',
    'easy', 1, 0, 31, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'MAE = (1/n) Σ|y_i - ŷ_i|', true, 1, now(), now()),
    (v_q_id, 'MAE = (1/n) Σ(y_i - ŷ_i)²', false, 2, now(), now()),
    (v_q_id, 'MAE = sqrt(MSE)', false, 3, now(), now()),
    (v_q_id, 'MAE = max(|y_i - ŷ_i|)', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does RMSE compare to MAE in terms of sensitivity to extreme outlier prediction errors?', 'Squaring errors in RMSE gives disproportionate weight to large outliers, whereas MAE scales linearly.',
    'medium', 1, 0, 32, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'RMSE penalizes large outlier errors much more heavily than MAE because individual errors are squared before averaging', true, 1, now(), now()),
    (v_q_id, 'MAE penalizes outliers more than RMSE', false, 2, now(), now()),
    (v_q_id, 'They are mathematically identical in every scenario', false, 3, now(), now()),
    (v_q_id, 'RMSE completely ignores outliers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mean Absolute Percentage Error (MAPE)?', 'MAPE expresses prediction accuracy as a scale-independent percentage of actual values.',
    'medium', 1, 0, 33, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The average percentage by which predictions deviate from actual values: MAPE = (100%/n) Σ|(y_i - ŷ_i) / y_i|', true, 1, now(), now()),
    (v_q_id, 'The percentage of correct predictions in classification', false, 2, now(), now()),
    (v_q_id, 'The maximum error expressed as a fraction', false, 3, now(), now()),
    (v_q_id, 'The correlation coefficient expressed as a percentage', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a critical limitation of Mean Absolute Percentage Error (MAPE)?', 'When true values y_i are zero or near zero, division results in undefined or explosive values.',
    'medium', 1, 0, 34, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It cannot be calculated on negative numbers or when actual target values equal zero (division by zero)', true, 1, now(), now()),
    (v_q_id, 'It is too fast to compute on modern computers', false, 2, now(), now()),
    (v_q_id, 'It only accepts integer variables', false, 3, now(), now()),
    (v_q_id, 'It produces numbers greater than 1000 in all cases', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In regression analysis, what does a t-test on an individual coefficient β_j evaluate?', 'The t-statistic evaluates whether a single regression weight differs significantly from zero.',
    'medium', 1, 0, 35, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Whether the entire model has an R² > 0.5', false, 1, now(), now()),
    (v_q_id, 'Whether that specific predictor has a statistically significant linear relationship with the target (testing H₀: β_j = 0)', true, 2, now(), now()),
    (v_q_id, 'Whether the feature has missing values', false, 3, now(), now()),
    (v_q_id, 'Whether the feature follows a uniform distribution', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the overall F-test evaluate in multiple linear regression?', 'The global F-test checks if the predictors collectively explain a significant proportion of target variance.',
    'medium', 1, 0, 36, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Whether at least one of the predictor coefficients is significantly different from zero (testing H₀: β₁ = β₂ = ... = βₚ = 0)', true, 1, now(), now()),
    (v_q_id, 'Whether the intercept equals zero', false, 2, now(), now()),
    (v_q_id, 'Whether the sample size is sufficient', false, 3, now(), now()),
    (v_q_id, 'Whether the computer processor is running at full capacity', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the Durbin-Watson test detect in regression diagnostics?', 'The Durbin-Watson statistic tests for first-order autocorrelation in residuals; values near 2 indicate zero autocorrelation.',
    'hard', 1, 0, 37, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Multicollinearity among independent features', false, 1, now(), now()),
    (v_q_id, 'Autocorrelation (serial correlation) among residual error terms', true, 2, now(), now()),
    (v_q_id, 'Heteroscedasticity of residuals', false, 3, now(), now()),
    (v_q_id, 'Non-normality of predictor features', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Cook''s Distance'' used for in regression analysis?', 'Cook''s distance measures aggregate change in fitted values when an observation is omitted, pinpointing influential outliers.',
    'hard', 1, 0, 38, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Measuring the cooking temperature of data servers', false, 1, now(), now()),
    (v_q_id, 'Identifying highly influential data points that exert disproportionate leverage on the estimated regression coefficients', true, 2, now(), now()),
    (v_q_id, 'Measuring the distance between two database tables', false, 3, now(), now()),
    (v_q_id, 'Calculating the execution time of linear regression', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Leverage'' in regression diagnostics?', 'Leverage (hat matrix diagonal h_ii) flags points with extreme predictor values that can pull the regression line.',
    'hard', 1, 0, 39, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The financial debt of the company using the model', false, 1, now(), now()),
    (v_q_id, 'A measure of how far an observation''s predictor feature values deviate from the mean of those features (identifying extreme values in the X space)', true, 2, now(), now()),
    (v_q_id, 'The mechanical force applied to cooling fans', false, 3, now(), now()),
    (v_q_id, 'The slope of the regression line', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Partial Residual Plot'' (Component-Plus-Residual Plot) used for?', 'Partial residual plots diagnose non-linear relationships for specific predictors in multiple regression.',
    'hard', 1, 0, 40, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To visually inspect the relationship between an individual predictor and the target while controlling for the effects of all other independent features', true, 1, now(), now()),
    (v_q_id, 'To plot residuals in different pastel colors', false, 2, now(), now()),
    (v_q_id, 'To divide residuals among team members', false, 3, now(), now()),
    (v_q_id, 'To plot memory usage of background processes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''In-Sample Evaluation'' mean in predictive modeling?', 'In-sample evaluation measures fit on training observations, which typically underestimates true out-of-sample error.',
    'easy', 1, 0, 41, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Evaluating the model on the exact same dataset that was used to train the model', true, 1, now(), now()),
    (v_q_id, 'Evaluating the model on brand new data from next year', false, 2, now(), now()),
    (v_q_id, 'Evaluating the model inside a clean-room laboratory', false, 3, now(), now()),
    (v_q_id, 'Evaluating only the first 5 rows of data', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Out-of-Sample Evaluation'' mean?', 'Out-of-sample evaluation tests generalization on holdout data to assess real-world performance.',
    'easy', 1, 0, 42, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing the model on unseen data that was not utilized in any way during parameter estimation or training', true, 1, now(), now()),
    (v_q_id, 'Deleting samples from the database', false, 2, now(), now()),
    (v_q_id, 'Testing code on a computer with no internet connection', false, 3, now(), now()),
    (v_q_id, 'Measuring the file size of the trained model', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary danger of relying solely on In-Sample Evaluation metrics?', 'Overfitted models memorize training noise; in-sample scores create an illusion of predictive power.',
    'easy', 1, 0, 43, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Models may execute too quickly', false, 1, now(), now()),
    (v_q_id, 'A severely overfitted model can achieve near-zero training error (R² = 1.0) while completely failing on new out-of-sample data', true, 2, now(), now()),
    (v_q_id, 'The model weights will be deleted automatically', false, 3, now(), now()),
    (v_q_id, 'It violates open-source software licenses', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Interaction Effect'' in multiple regression?', 'Interaction terms capture synergistic effects where one feature modulates the impact of another.',
    'medium', 1, 0, 44, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'When two users edit the same database row simultaneously', false, 1, now(), now()),
    (v_q_id, 'A situation where the effect of one predictor variable on the target depends on the value of another predictor variable (modeled via product terms X₁ * X₂)', true, 2, now(), now()),
    (v_q_id, 'When graphics cards interact through SLI bridges', false, 3, now(), now()),
    (v_q_id, 'When code interacts with operating system APIs', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Scikit-Learn, which class is used to fit a standard Ordinary Least Squares multiple linear regression model?', '`LinearRegression` in Scikit-Learn fits an OLS regression using LAPACK routines.',
    'easy', 1, 0, 45, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`sklearn.linear_model.LinearRegression`', true, 1, now(), now()),
    (v_q_id, '`sklearn.tree.DecisionTreeRegressor`', false, 2, now(), now()),
    (v_q_id, '`sklearn.cluster.KMeans`', false, 3, now(), now()),
    (v_q_id, '`sklearn.svm.SVC`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Scikit-Learn''s `LinearRegression`, which attribute stores the learned regression coefficients (slopes)?', 'The estimated slopes are stored in `model.coef_`, while the intercept is stored in `model.intercept_`.',
    'easy', 1, 0, 46, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`model.coef_`', true, 1, now(), now()),
    (v_q_id, '`model.intercept_`', false, 2, now(), now()),
    (v_q_id, '`model.weights_`', false, 3, now(), now()),
    (v_q_id, '`model.params_`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the `fit()` method do in Scikit-Learn estimators?', '`fit(X, y)` estimates mathematical parameters from training features and targets.',
    'easy', 1, 0, 47, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It resizes the computer window to fit the monitor', false, 1, now(), now()),
    (v_q_id, 'It estimates the model parameters (weights, coefficients) from the training data X and y', true, 2, now(), now()),
    (v_q_id, 'It plots the regression line in a new window', false, 3, now(), now()),
    (v_q_id, 'It exports data to an Excel spreadsheet', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the `predict()` method do in Scikit-Learn estimators?', '`predict(X)` applies learned coefficients to new feature matrices to generate predicted values.',
    'easy', 1, 0, 48, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It generates predictions for given input features using the learned model parameters', true, 1, now(), now()),
    (v_q_id, 'It guesses future stock market prices randomly', false, 2, now(), now()),
    (v_q_id, 'It prints text to the system console', false, 3, now(), now()),
    (v_q_id, 'It deletes test labels from the database', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Stepwise Regression''?', 'Stepwise regression systematically evaluates feature subsets using forward addition, backward elimination, or bidirectional steps.',
    'medium', 1, 0, 49, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Writing code one line at a time', false, 1, now(), now()),
    (v_q_id, 'A step-by-step automated feature selection procedure that iteratively adds or removes predictors based on statistical significance (e.g., p-values or AIC)', true, 2, now(), now()),
    (v_q_id, 'Running linear regression on staircase data', false, 3, now(), now()),
    (v_q_id, 'Executing models on walking robot hardware', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Akaike Information Criterion (AIC) used for in model selection?', 'AIC quantifies information loss, rewarding goodness-of-fit while penalizing model complexity (lower AIC is preferred).',
    'hard', 1, 0, 50, ARRAY['BCA-302N', 'Unit-4', 'BCA-302N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Measuring CPU temperature during training', false, 1, now(), now()),
    (v_q_id, 'An estimator of out-of-sample prediction error that balances model goodness-of-fit with a penalty for the number of estimated parameters: AIC = 2k - 2ln(L)', true, 2, now(), now()),
    (v_q_id, 'A measure of graphical image clarity', false, 3, now(), now()),
    (v_q_id, 'The financial cost of running a cloud cluster', false, 4, now(), now());

END $SEEDED_BLOCK$;
