DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-302N Unit 3 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    'ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', 'BCA-302N Unit 3: Exploratory Data Analytics (EDA) Practice Quiz (50 MCQs)', 'bca-302n-u3-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-302N Unit 3. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is the primary philosophical objective of Exploratory Data Analysis (EDA)?', 'EDA emphasizes data discovery, visual diagnostics, and statistical summaries before formulating formal parametric models.',
    'easy', 1, 0, 1, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To immediately prove a preconceived theory at all costs', false, 1, now(), now()),
    (v_q_id, 'To understand data distributions, detect anomalies, discover patterns, and validate assumptions without imposing rigid modeling assumptions', true, 2, now(), now()),
    (v_q_id, 'To deploy machine learning models to production servers', false, 3, now(), now()),
    (v_q_id, 'To generate automatic invoices for data storage', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which measure of central tendency is most sensitive to extreme outliers in a skewed numerical dataset?', 'The arithmetic mean sums all values and divides by N, pulling heavily in the direction of extreme outlier values.',
    'easy', 1, 0, 2, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Arithmetic Mean', true, 1, now(), now()),
    (v_q_id, 'Median', false, 2, now(), now()),
    (v_q_id, 'Mode', false, 3, now(), now()),
    (v_q_id, 'Trimmed Median', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why is the Median considered a ''robust'' statistic for skewed distributions?', 'The median is positional (50th percentile); shifting extreme values does not alter the center rank.',
    'easy', 1, 0, 3, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because it requires supercomputers to calculate', false, 1, now(), now()),
    (v_q_id, 'Because it represents the 50th percentile (middle value), remaining unaffected by the magnitude of extreme values in the tails', true, 2, now(), now()),
    (v_q_id, 'Because it is always equal to the standard deviation', false, 3, now(), now()),
    (v_q_id, 'Because it can only be calculated on prime numbers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Mode of a dataset?', 'The mode is the most frequently occurring value in a discrete distribution or categorical column.',
    'easy', 1, 0, 4, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The arithmetic difference between maximum and minimum', false, 1, now(), now()),
    (v_q_id, 'The value that appears with the highest frequency in a data collection', true, 2, now(), now()),
    (v_q_id, 'The square root of the variance', false, 3, now(), now()),
    (v_q_id, 'The average of the first and third quartiles', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the relationship between Mean, Median, and Mode in a perfectly symmetrical, unimodal Gaussian distribution?', 'In a perfectly symmetrical unimodal distribution, the center of gravity (mean), the middle rank (median), and peak frequency (mode) coincide.',
    'easy', 1, 0, 5, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Mean > Median > Mode', false, 1, now(), now()),
    (v_q_id, 'Mode > Median > Mean', false, 2, now(), now()),
    (v_q_id, 'Mean = Median = Mode', true, 3, now(), now()),
    (v_q_id, 'Median = (Mean + Mode) / 2', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In a Positively (Right) Skewed distribution, what is the typical ordering of the three central tendency measures?', 'In positive skew, extreme values in the right tail pull the mean upward, resulting in Mode < Median < Mean.',
    'medium', 1, 0, 6, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Mode < Median < Mean', true, 1, now(), now()),
    (v_q_id, 'Mean < Median < Mode', false, 2, now(), now()),
    (v_q_id, 'Median < Mode < Mean', false, 3, now(), now()),
    (v_q_id, 'Mean = Median = Mode', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In a Negatively (Left) Skewed distribution, what is the typical ordering?', 'In negative skew, extreme low values in the left tail drag the mean downward, yielding Mean < Median < Mode.',
    'medium', 1, 0, 7, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Mean < Median < Mode', true, 1, now(), now()),
    (v_q_id, 'Mode < Median < Mean', false, 2, now(), now()),
    (v_q_id, 'Median < Mean < Mode', false, 3, now(), now()),
    (v_q_id, 'Mean = Mode > Median', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the Sample Variance (s²) measure?', 'Sample variance s² = Σ(x_i - mean)² / (n - 1), quantifying dispersion around the mean.',
    'easy', 1, 0, 8, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The average distance of points from the origin (zero)', false, 1, now(), now()),
    (v_q_id, 'The average squared deviation of each data point from the sample mean, divided by (n - 1)', true, 2, now(), now()),
    (v_q_id, 'The square of the maximum value minus the minimum value', false, 3, now(), now()),
    (v_q_id, 'The ratio of mean to median', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why is Bessel''s Correction (dividing by n - 1 instead of n) applied when calculating sample variance?', 'Dividing by n underestimates population variance because deviations are calculated from the sample mean; n-1 yields an unbiased estimator.',
    'medium', 1, 0, 9, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To prevent division by zero when n is zero', false, 1, now(), now()),
    (v_q_id, 'To correct for downward bias and produce an unbiased estimator of the true population variance', true, 2, now(), now()),
    (v_q_id, 'To make numbers integers rather than floats', false, 3, now(), now()),
    (v_q_id, 'To match the formulas used in Python 2', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Standard Deviation (σ)?', 'Standard deviation is the square root of variance, restoring the scale back to the original unit of measurement.',
    'easy', 1, 0, 10, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The square of the variance', false, 1, now(), now()),
    (v_q_id, 'The positive square root of the variance, expressed in the same physical units as the original data', true, 2, now(), now()),
    (v_q_id, 'The difference between Q3 and Q1', false, 3, now(), now()),
    (v_q_id, 'The ratio of mode to mean', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does Skewness mathematically quantify?', 'Skewness is the third standardized moment measuring distribution asymmetry (left-tail vs right-tail imbalance).',
    'medium', 1, 0, 11, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The degree of asymmetry of a distribution around its mean', true, 1, now(), now()),
    (v_q_id, 'The peakedness and tail weight of a probability distribution', false, 2, now(), now()),
    (v_q_id, 'The linear correlation between two distinct columns', false, 3, now(), now()),
    (v_q_id, 'The total number of rows in a dataset', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'A distribution with Skewness equal to zero is:', 'A skewness of zero indicates statistical symmetry around the mean.',
    'easy', 1, 0, 12, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Completely flat across all values', false, 1, now(), now()),
    (v_q_id, 'Perfectly symmetric around its central location', true, 2, now(), now()),
    (v_q_id, 'Bimodal with two equal peaks', false, 3, now(), now()),
    (v_q_id, 'Exponentially growing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does Kurtosis measure in statistical exploratory data analytics?', 'Kurtosis is the fourth standardized moment, capturing tail weight and the likelihood of extreme deviations.',
    'medium', 1, 0, 13, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The linear slope of a regression line', false, 1, now(), now()),
    (v_q_id, 'The ''tailedness'' (propensity to produce outliers) and peakedness of a probability distribution relative to a normal distribution', true, 2, now(), now()),
    (v_q_id, 'The median absolute deviation', false, 3, now(), now()),
    (v_q_id, 'The number of categorical unique values', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'A standard normal distribution has an excess kurtosis of:', 'The normal distribution has a kurtosis of 3; ''Excess Kurtosis'' subtracts 3, yielding 0 for standard normal distributions.',
    'medium', 1, 0, 14, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Zero (0)', true, 1, now(), now()),
    (v_q_id, 'Three (3)', false, 2, now(), now()),
    (v_q_id, 'One (1)', false, 3, now(), now()),
    (v_q_id, 'Minus three (-3)', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'A distribution described as ''Leptokurtic'' has:', 'Leptokurtic distributions have positive excess kurtosis (>0), exhibiting fat tails and frequent outlier occurrence.',
    'medium', 1, 0, 15, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Excess kurtosis > 0, characterized by heavy tails and a higher probability of extreme outliers compared to a normal distribution', true, 1, now(), now()),
    (v_q_id, 'Excess kurtosis < 0, with thin tails and a flat top', false, 2, now(), now()),
    (v_q_id, 'Zero variance', false, 3, now(), now()),
    (v_q_id, 'Negative standard deviation', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'A ''Platykurtic'' distribution is characterized by:', 'Platykurtic distributions (excess kurtosis < 0) produce fewer extreme outliers and flatter central profiles (e.g., uniform distribution).',
    'medium', 1, 0, 16, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Excess kurtosis < 0, featuring light tails and a flatter peak than a Gaussian distribution', true, 1, now(), now()),
    (v_q_id, 'Excess kurtosis > 3, with sharp spikes', false, 2, now(), now()),
    (v_q_id, 'Infinite variance', false, 3, now(), now()),
    (v_q_id, 'A single categorical value', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which five values constitute Tukey''s ''Five-Number Summary'' in Exploratory Data Analytics?', 'Tukey''s Five-Number Summary consists of Min, Q1 (25th%), Q2/Median (50th%), Q3 (75th%), and Max.',
    'easy', 1, 0, 17, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Mean, Mode, Median, Variance, Standard Deviation', false, 1, now(), now()),
    (v_q_id, 'Minimum, First Quartile (Q1), Median (Q2), Third Quartile (Q3), and Maximum', true, 2, now(), now()),
    (v_q_id, 'Z-Score, T-Score, P-Value, F-Score, Chi-Square', false, 3, now(), now()),
    (v_q_id, '0%, 10%, 50%, 90%, 100% percentiles', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Interquartile Range (IQR)?', 'The Interquartile Range represents the spread of the middle 50% of the distribution: IQR = Q3 - Q1.',
    'easy', 1, 0, 18, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'IQR = Q3 - Q1', true, 1, now(), now()),
    (v_q_id, 'IQR = Max - Min', false, 2, now(), now()),
    (v_q_id, 'IQR = Q2 - Q1', false, 3, now(), now()),
    (v_q_id, 'IQR = (Q3 + Q1) / 2', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In a standard Box Plot (Box-and-Whisker Plot), what does the central rectangular box represent?', 'The box boundaries mark the 25th percentile (Q1) and 75th percentile (Q3), with a line inside marking the 50th percentile (median).',
    'easy', 1, 0, 19, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The entire range of all data points from Min to Max', false, 1, now(), now()),
    (v_q_id, 'The interquartile range containing the middle 50% of data, spanning from Q1 to Q3', true, 2, now(), now()),
    (v_q_id, 'The confidence interval of the sample mean', false, 3, now(), now()),
    (v_q_id, 'The standard deviation multiplied by two', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In a Box Plot, where do the ''whiskers'' extend to by standard convention?', 'Whiskers extend to the most extreme data points within [Q1 - 1.5*IQR, Q3 + 1.5*IQR]; points beyond are plotted as individual outlier points.',
    'medium', 1, 0, 20, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To positive and negative infinity', false, 1, now(), now()),
    (v_q_id, 'To the lowest and highest data points within 1.5 * IQR from Q1 and Q3 respectively', true, 2, now(), now()),
    (v_q_id, 'To exactly three standard deviations above and below the mean', false, 3, now(), now()),
    (v_q_id, 'To the 10th and 90th percentiles', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Pivot Table'' in data analysis?', 'Pivot tables aggregate transactional records into multidimensional matrices using grouping functions (sum, mean, count).',
    'easy', 1, 0, 21, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A table that rotates 90 degrees when printed', false, 1, now(), now()),
    (v_q_id, 'An analytical data summarization tool that aggregates, sorts, reorganizes, and groups multidimensional data along row and column axes', true, 2, now(), now()),
    (v_q_id, 'A physical revolving table in a hardware laboratory', false, 3, now(), now()),
    (v_q_id, 'A relational table with only two columns', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Cross-Tabulation'' (Contingency Table)?', 'Contingency tables display the joint bivariate frequency distribution of categorical variables.',
    'medium', 1, 0, 22, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A table showing the frequency distribution of the variables at the intersection of two or more categorical factors', true, 1, now(), now()),
    (v_q_id, 'A SQL query that deletes crossed records', false, 2, now(), now()),
    (v_q_id, 'A table comparing two different database management systems', false, 3, now(), now()),
    (v_q_id, 'A table with encrypted cross-site scripting tags', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Heat Map'' in exploratory data visualization?', 'Heat maps display tabular matrices (such as correlation matrices) using color gradients to depict magnitude.',
    'easy', 1, 0, 23, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A weather radar map showing temperatures across cities', false, 1, now(), now()),
    (v_q_id, 'A graphical representation of data where individual values contained in a 2D matrix are represented as colors', true, 2, now(), now()),
    (v_q_id, 'A thermal sensor reading of server CPUs', false, 3, now(), now()),
    (v_q_id, 'A line plot with red and orange line colors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In a Heat Map displaying a Correlation Matrix, what does a cell with a value of +1.0 indicate?', 'A correlation coefficient of +1.0 indicates that as variable X increases, variable Y increases in exact linear proportion.',
    'easy', 1, 0, 24, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Complete independence between the two variables', false, 1, now(), now()),
    (v_q_id, 'Perfect positive linear correlation between the two variables', true, 2, now(), now()),
    (v_q_id, 'An error in matrix calculation', false, 3, now(), now()),
    (v_q_id, 'Negative correlation', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does Pearson''s Correlation Coefficient (r) measure?', 'Pearson''s r measures the linear co-variation between two continuous variables on a scale from -1.0 to +1.0.',
    'easy', 1, 0, 25, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The non-linear monotonic relationship between two variables', false, 1, now(), now()),
    (v_q_id, 'The strength and direction of the linear relationship between two continuous variables', true, 2, now(), now()),
    (v_q_id, 'The difference between two population medians', false, 3, now(), now()),
    (v_q_id, 'The categorical independence of attributes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the valid mathematical range of Pearson''s Correlation Coefficient (r)?', 'Pearson''s r is bounded strictly between -1.0 (perfect negative linear correlation) and +1.0 (perfect positive linear correlation).',
    'easy', 1, 0, 26, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'From 0 to infinity', false, 1, now(), now()),
    (v_q_id, 'From -1.0 to +1.0', true, 2, now(), now()),
    (v_q_id, 'From -100 to +100', false, 3, now(), now()),
    (v_q_id, 'From 0 to 1.0', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'If Pearson''s r between feature X and target Y is 0.0, what does this mathematically prove?', 'Pearson''s r evaluates only linear association; variables with r = 0 can have strong non-linear relationships (e.g., Y = X²).',
    'medium', 1, 0, 27, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'There is zero linear relationship between X and Y (though a non-linear relationship may still exist)', true, 1, now(), now()),
    (v_q_id, 'X and Y are completely independent in every possible way', false, 2, now(), now()),
    (v_q_id, 'X and Y are identical variables', false, 3, now(), now()),
    (v_q_id, 'The model will have 100% predictive accuracy', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does Spearman''s Rank Correlation Coefficient differ from Pearson''s Correlation Coefficient?', 'Spearman''s rho calculates Pearson''s correlation on ranked data, making it non-parametric and sensitive to monotonic curves.',
    'medium', 1, 0, 28, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Spearman evaluates monotonic relationships based on the ranked values of data rather than linear relationships on raw numerical values', true, 1, now(), now()),
    (v_q_id, 'Spearman only works on text strings', false, 2, now(), now()),
    (v_q_id, 'Spearman produces values from -10 to +10', false, 3, now(), now()),
    (v_q_id, 'Spearman requires normal distributions while Pearson does not', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'When is Spearman''s Rank Correlation preferred over Pearson''s Correlation?', 'Spearman is robust against outliers and detects non-linear monotonic trends where Pearson''s r underperforms.',
    'medium', 1, 0, 29, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'When the data violates normality assumptions, contains significant outliers, or exhibits monotonic non-linear relationships', true, 1, now(), now()),
    (v_q_id, 'When the data is perfectly Gaussian and linear', false, 2, now(), now()),
    (v_q_id, 'When working with only two data points', false, 3, now(), now()),
    (v_q_id, 'When using deep learning models', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does the adage ''Correlation does not imply Causation'' mean in data science?', 'Two variables may correlate due to coincidence or a shared third confounding factor (spurious correlation) rather than direct causality.',
    'easy', 1, 0, 30, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Correlation is completely useless and should never be calculated', false, 1, now(), now()),
    (v_q_id, 'A statistical association between two variables does not prove that one variable causes the change in the other (confounding variables may exist)', true, 2, now(), now()),
    (v_q_id, 'Causation can never be proven by any scientific experiment', false, 3, now(), now()),
    (v_q_id, 'Correlation formulas are mathematically flawed', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ANOVA stand for in statistical data analysis?', 'ANOVA stands for Analysis of Variance, a statistical test comparing means across multiple groups.',
    'easy', 1, 0, 31, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Analysis of Variance', true, 1, now(), now()),
    (v_q_id, 'Automated Numerical Operations for Vector Analysis', false, 2, now(), now()),
    (v_q_id, 'Association Network of Variables and Attributes', false, 3, now(), now()),
    (v_q_id, 'Algorithmic Number Organization and Validation', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary purpose of a One-Way ANOVA test?', 'One-way ANOVA compares variance between groups against variance within groups to test if group means differ significantly.',
    'medium', 1, 0, 32, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To determine whether the means of three or more independent groups are statistically significantly different from each other', true, 1, now(), now()),
    (v_q_id, 'To test if two categorical columns have the same mode', false, 2, now(), now()),
    (v_q_id, 'To calculate the correlation between two continuous floats', false, 3, now(), now()),
    (v_q_id, 'To reduce the dimensions of a matrix to one', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the test statistic calculated in an ANOVA test?', 'ANOVA calculates the F-ratio: F = (Between-Group Variance / Within-Group Variance).',
    'medium', 1, 0, 33, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Z-statistic', false, 1, now(), now()),
    (v_q_id, 'Student''s t-statistic', false, 2, now(), now()),
    (v_q_id, 'F-statistic (Fisher-Snedecor F-ratio)', true, 3, now(), now()),
    (v_q_id, 'Chi-Square statistic', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In an ANOVA F-test, what does a large F-statistic accompanied by a p-value < 0.05 indicate?', 'A high F-statistic indicates between-group variance dominates within-group noise, rejecting H0 of equal group means.',
    'medium', 1, 0, 34, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The null hypothesis is retained; all group means are identical', false, 1, now(), now()),
    (v_q_id, 'The null hypothesis is rejected; at least one group mean is statistically significantly different from the others', true, 2, now(), now()),
    (v_q_id, 'The data has zero variance', false, 3, now(), now()),
    (v_q_id, 'The test was mathematically invalid', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Null Hypothesis (H₀) in a One-Way ANOVA test?', 'The null hypothesis states that all tested group population means are equal.',
    'easy', 1, 0, 35, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'All group population means are equal (μ₁ = μ₂ = ... = μₖ)', true, 1, now(), now()),
    (v_q_id, 'All group standard deviations are unequal', false, 2, now(), now()),
    (v_q_id, 'The correlation between features is 1.0', false, 3, now(), now()),
    (v_q_id, 'At least one group mean is different', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What post-hoc statistical test is commonly run after an ANOVA test rejects the null hypothesis to identify which specific pairs of groups differ?', 'Tukey''s HSD test performs pairwise comparisons while controlling family-wise error rates.',
    'hard', 1, 0, 36, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Tukey''s Honestly Significant Difference (HSD) test', true, 1, now(), now()),
    (v_q_id, 'Min-Max Normalization', false, 2, now(), now()),
    (v_q_id, 'Pearson correlation matrix', false, 3, now(), now()),
    (v_q_id, 'K-Means Clustering', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does a Scatter Plot Matrix (Pairplot) visualize in Exploratory Data Analytics?', 'A Pairplot renders an N x N matrix of scatterplots showing bivariate interactions between every pair of features.',
    'medium', 1, 0, 37, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The CPU usage over time during model training', false, 1, now(), now()),
    (v_q_id, 'Pairwise bivariate scatter plots for all feature combinations alongside univariate distribution histograms on the diagonal', true, 2, now(), now()),
    (v_q_id, 'A 3D rendering of cloud servers', false, 3, now(), now()),
    (v_q_id, 'A list of database table foreign keys', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Kernel Density Estimation'' (KDE) plot?', 'KDE convolves kernel functions (Gaussian) over sample points to estimate non-parametric probability density functions.',
    'medium', 1, 0, 38, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A low-level plot of Linux operating system kernel logs', false, 1, now(), now()),
    (v_q_id, 'A smoothed continuous probability density curve representing the underlying distribution of a continuous variable', true, 2, now(), now()),
    (v_q_id, 'A 2D scatter plot with circular kernels', false, 3, now(), now()),
    (v_q_id, 'A bar chart showing disk sector health', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does a Q-Q (Quantile-Quantile) Plot evaluate?', 'A Q-Q plot compares empirical sample quantiles against theoretical distribution quantiles; points on a 45-degree line confirm distributional fit.',
    'hard', 1, 0, 39, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Whether two database tables have identical row counts', false, 1, now(), now()),
    (v_q_id, 'Whether a sample dataset follows a specified theoretical probability distribution (such as a normal distribution)', true, 2, now(), now()),
    (v_q_id, 'The execution time of SQL queries', false, 3, now(), now()),
    (v_q_id, 'The number of questions answered in a quiz', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'If points on a Normal Q-Q Plot curve upwards away from the reference line at both ends, this signifies:', 'Deviations in the tails of Q-Q plots diagnose kurtosis and heavy-tailed non-Gaussian behavior.',
    'hard', 1, 0, 40, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Heavy tails (a leptokurtic distribution with more extreme outliers than normal)', true, 1, now(), now()),
    (v_q_id, 'Light tails with zero variance', false, 2, now(), now()),
    (v_q_id, 'Perfect Gaussian normality', false, 3, now(), now()),
    (v_q_id, 'The dataset contains only zeros', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the ''Empirical Rule'' (68-95-99.7 Rule) for normal distributions?', 'In Gaussian distributions, exactly ~68.27% of observations lie within μ ± 1σ, ~95.45% within μ ± 2σ, and ~99.73% within μ ± 3σ.',
    'easy', 1, 0, 41, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '68% of data falls within 1σ, 95% within 2σ, and 99.7% within 3σ of the mean', true, 1, now(), now()),
    (v_q_id, '68% of data is positive, 95% is integer, 99.7% is float', false, 2, now(), now()),
    (v_q_id, '68% of queries pass, 95% cache, 99.7% fail', false, 3, now(), now()),
    (v_q_id, 'All numbers equal 100%', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Median Absolute Deviation (MAD)?', 'MAD = median(|X_i - median(X)|), providing an outlier-resistant dispersion metric superior to standard deviation for skewed data.',
    'hard', 1, 0, 42, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The distance of the median from zero', false, 1, now(), now()),
    (v_q_id, 'A robust measure of statistical dispersion calculated as the median of absolute deviations from the data median', true, 2, now(), now()),
    (v_q_id, 'The square of the standard deviation', false, 3, now(), now()),
    (v_q_id, 'The difference between mean and mode', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Bar Chart'' primarily used for as opposed to a ''Histogram''?', 'Histograms plot continuous quantitative variables into adjacent bins; bar charts compare distinct categorical groups.',
    'easy', 1, 0, 43, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Bar charts display discrete categorical frequencies with spaces between bars, whereas Histograms display continuous numerical frequency distributions across binned intervals', true, 1, now(), now()),
    (v_q_id, 'Bar charts only display numbers, while histograms only display words', false, 2, now(), now()),
    (v_q_id, 'Bar charts are always 3D, while histograms are 2D', false, 3, now(), now()),
    (v_q_id, 'There is no difference; they are identical', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Multicollinearity'' detected during Exploratory Data Analytics?', 'Multicollinearity occurs when predictor variables are collinear, inflating variance of regression coefficients.',
    'medium', 1, 0, 44, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A situation where two or more independent predictor features are highly linearly correlated with each other', true, 1, now(), now()),
    (v_q_id, 'A bug in Python where columns are duplicated on disk', false, 2, now(), now()),
    (v_q_id, 'A database containing multiple primary keys', false, 3, now(), now()),
    (v_q_id, 'A chart rendered in more than three colors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which metric is commonly calculated to quantify the severity of Multicollinearity in a feature set?', 'VIF measures how much the variance of an estimated regression coefficient increases due to collinearity; VIF > 5 or 10 indicates high multicollinearity.',
    'hard', 1, 0, 45, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Variance Inflation Factor (VIF)', true, 1, now(), now()),
    (v_q_id, 'Root Mean Squared Error (RMSE)', false, 2, now(), now()),
    (v_q_id, 'Adjusted R-Squared', false, 3, now(), now()),
    (v_q_id, 'Standard Normal Quantile', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does a VIF equal to 1.0 indicate for a predictor variable?', 'A VIF of 1 indicates the variable is completely orthogonal (uncorrelated) to other predictors.',
    'medium', 1, 0, 46, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Severe perfect multicollinearity', false, 1, now(), now()),
    (v_q_id, 'Zero correlation between that predictor and all other independent features in the model', true, 2, now(), now()),
    (v_q_id, 'The predictor is an exact duplicate of the target', false, 3, now(), now()),
    (v_q_id, 'An error occurred during calculation', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Pandas, which method returns summary statistics (count, mean, std, min, 25%, 50%, 75%, max) for numerical columns?', 'The `describe()` method generates descriptive statistics summarizing central tendency, dispersion, and shape of a dataset''s distribution.',
    'easy', 1, 0, 47, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'df.describe()', true, 1, now(), now()),
    (v_q_id, 'df.info()', false, 2, now(), now()),
    (v_q_id, 'df.summary()', false, 3, now(), now()),
    (v_q_id, 'df.head()', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Pandas, which method displays column data types, non-null counts, and memory usage?', '`df.info()` provides a concise technical summary of DataFrame columns, non-null counts, and memory consumption.',
    'easy', 1, 0, 48, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'df.info()', true, 1, now(), now()),
    (v_q_id, 'df.describe()', false, 2, now(), now()),
    (v_q_id, 'df.tail()', false, 3, now(), now()),
    (v_q_id, 'df.shape()', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What type of plot is best suited to visualize changes in a continuous metric over chronological time intervals?', 'Time series line plots show continuous trends, seasonality, and temporal dynamics over sequential time points.',
    'easy', 1, 0, 49, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Line Chart (Time Series Plot)', true, 1, now(), now()),
    (v_q_id, 'Pie Chart', false, 2, now(), now()),
    (v_q_id, 'Histogram', false, 3, now(), now()),
    (v_q_id, 'Box Plot', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does a Violin Plot combine in statistical data visualization?', 'Violin plots merge the five-number summary of box plots with the mirrored density traces of KDE.',
    'medium', 1, 0, 50, ARRAY['BCA-302N', 'Unit-3', 'BCA-302N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A line plot and a scatter plot', false, 1, now(), now()),
    (v_q_id, 'A Box Plot and a Kernel Density Estimation (KDE) plot showing the probability density of the data at different values', true, 2, now(), now()),
    (v_q_id, 'A bar chart and a pie chart', false, 3, now(), now()),
    (v_q_id, 'A 3D surface plot and a heatmap', false, 4, now(), now());

END $SEEDED_BLOCK$;
