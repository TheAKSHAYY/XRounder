DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-306N Unit 3 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '89bfb023-b67d-5187-b82f-664f1885c743', 'BCA-306N Unit 3: Data and Analytics for IoT Practice Quiz (50 MCQs)', 'bca-306n-u3-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-306N Unit 3. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is the primary role of Data Analytics in IoT systems?', 'Without analytics, raw sensor readings (millions of integers) are meaningless; analytics uncovers trends, anomalies, and equipment failure precursors.',
    'easy', 1, 0, 1, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Transforming raw, heterogeneous sensor telemetry streams into actionable operational intelligence and predictive decisions', true, 1, now(), now()),
    (v_q_id, 'Printing physical paper invoices for customers', false, 2, now(), now()),
    (v_q_id, 'Manufacturing electronic sensors in cleanrooms', false, 3, now(), now()),
    (v_q_id, 'Installing copper network cables in buildings', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the four recognized stages of IoT Analytics maturity?', 'Gartner''s analytics maturity model progresses from descriptive hindsight to predictive foresight and automated prescriptive optimization.',
    'medium', 1, 0, 2, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Descriptive (What happened?), Diagnostic (Why did it happen?), Predictive (What will happen?), and Prescriptive (What should we do?)', true, 1, now(), now()),
    (v_q_id, 'Input, Output, Processing, and Storage', false, 2, now(), now()),
    (v_q_id, 'Alpha, Beta, Release, and Deprecation', false, 3, now(), now()),
    (v_q_id, 'Local, Regional, National, and Global', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Edge Streaming Analytics in IoT architectures?', 'Edge streaming analytics processes data in motion (in-memory) at the network periphery to provide sub-millisecond reaction times for safety-critical systems.',
    'medium', 1, 0, 3, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Executing real-time machine learning inference, statistical filtering, and threshold alerting directly on edge gateways without cloud latency', true, 1, now(), now()),
    (v_q_id, 'Streaming video games to television monitors', false, 2, now(), now()),
    (v_q_id, 'Downloading music albums over broadband', false, 3, now(), now()),
    (v_q_id, 'Recording audio podcasts on computers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Apache Kafka''s role in large-scale IoT data architectures?', 'Kafka ingests millions of concurrent sensor messages per second into partition-ordered, persistent topic logs, decoupling producers from consumer microservices.',
    'medium', 1, 0, 4, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A distributed event streaming platform functioning as a fault-tolerant, high-throughput pub/sub ingestion buffer between IoT devices and analytics engines', true, 1, now(), now()),
    (v_q_id, 'A relational database management system like MySQL', false, 2, now(), now()),
    (v_q_id, 'An operating system for smart sensors', false, 3, now(), now()),
    (v_q_id, 'A programming language developed by Apache', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Concept Drift'' in IoT machine learning models?', 'Sensors physically degrade, seasons change, and industrial machinery wears down, causing input feature distributions ($P(X)$ or $P(Y|X)$) to shift away from training baselines.',
    'hard', 1, 0, 5, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The statistical degradation of an ML model''s predictive accuracy over time as physical environmental conditions or sensor hardware characteristics change', true, 1, now(), now()),
    (v_q_id, 'A drone physically drifting off course in the wind', false, 2, now(), now()),
    (v_q_id, 'A programmer changing their mind about a feature', false, 3, now(), now()),
    (v_q_id, 'A computer monitor losing color calibration', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Apache Spark Streaming (or Structured Streaming) used for in IoT?', 'Spark Streaming processes live data streams from Kafka or Flume, applying complex window aggregations, joins, and machine learning models at massive scale.',
    'medium', 1, 0, 6, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Scalable, fault-tolerant distributed stream processing that processes live IoT event streams using micro-batching or continuous processing engines', true, 1, now(), now()),
    (v_q_id, 'Displaying 3D animations in web browsers', false, 2, now(), now()),
    (v_q_id, 'Compiling C programs into assembly code', false, 3, now(), now()),
    (v_q_id, 'Formatting hard drives in data centers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between a Tumbling Window and a Sliding Window in stream analytics?', 'A 5-minute tumbling window evaluates data every 5 minutes with zero overlap; a 5-minute sliding window with a 1-minute slide recalculates metrics every minute.',
    'hard', 1, 0, 7, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Tumbling windows are fixed-size, non-overlapping, contiguous time intervals; Sliding windows advance by an interval smaller than window size and overlap', true, 1, now(), now()),
    (v_q_id, 'Tumbling windows rotate in circles; sliding windows move straight', false, 2, now(), now()),
    (v_q_id, 'Tumbling windows are for video; sliding windows are for audio', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Anomaly Detection in industrial IoT sensor analytics?', 'Anomaly detection flags abnormal vibration spikes or pressure drops that signal imminent mechanical component failure before catastrophic breakdown occurs.',
    'easy', 1, 0, 8, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Identifying unusual patterns, outliers, or deviations in telemetry streams that do not conform to expected operational equipment behavior', true, 1, now(), now()),
    (v_q_id, 'Deleting corrupted sensor records from databases', false, 2, now(), now()),
    (v_q_id, 'Resetting microcontrollers when they overheat', false, 3, now(), now()),
    (v_q_id, 'Calibrating temperature readings to Fahrenheit', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which unsupervised machine learning algorithm is widely used for anomaly detection in multi-sensor telemetry?', 'Isolation Forest isolates anomalies by randomly selecting a feature and split value; anomalous points require far fewer recursive partitions to isolate than normal points.',
    'medium', 1, 0, 9, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Isolation Forest', true, 1, now(), now()),
    (v_q_id, 'Linear Search', false, 2, now(), now()),
    (v_q_id, 'Bubble Sort', false, 3, now(), now()),
    (v_q_id, 'Round-Robin Scheduling', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Autoencoder neural network and how is it used for IoT anomaly detection?', 'Autoencoders learn the latent manifold of normal operational telemetry. When an anomaly occurs, the network fails to reconstruct it accurately, resulting in a spike in reconstruction loss.',
    'hard', 1, 0, 10, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A neural network trained to compress and reconstruct normal sensor patterns; high reconstruction error on new inputs flags an operational anomaly', true, 1, now(), now()),
    (v_q_id, 'A robot that automatically writes code', false, 2, now(), now()),
    (v_q_id, 'A computer program that repairs broken sensors', false, 3, now(), now()),
    (v_q_id, 'A network router that forwards packets', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Predictive Maintenance (PdM) in Industrial IoT (IIoT)?', 'Predictive maintenance uses vibration, acoustic, and thermal telemetry with machine learning to replace parts based on actual wear, preventing unscheduled downtime.',
    'easy', 1, 0, 11, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Techniques designed to predict exactly when an in-service physical machine will fail so maintenance can be performed just before failure occurs', true, 1, now(), now()),
    (v_q_id, 'Fixing machines only after they catastrophically break down', false, 2, now(), now()),
    (v_q_id, 'Replacing every part on a fixed calendar schedule regardless of wear', false, 3, now(), now()),
    (v_q_id, 'Cleaning factory floors daily', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Remaining Useful Life (RUL) in predictive maintenance?', 'RUL estimation models (using survival analysis, LSTM networks, or degradation regression) tell engineers how many hours or flight cycles a turbine has before failure.',
    'medium', 1, 0, 12, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The estimated operational time, cycles, or mileage remaining before an industrial physical component ceases to perform its intended function safely', true, 1, now(), now()),
    (v_q_id, 'The expiration date printed on a battery', false, 2, now(), now()),
    (v_q_id, 'The warranty period of a computer', false, 3, now(), now()),
    (v_q_id, 'The lifespan of the software operating system', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Fast Fourier Transform (FFT) used for in vibration sensor analytics?', 'FFT decomposes complex time-domain accelerometer waveforms into constituent frequencies, exposing bearing ball-pass frequencies (BPFO/BPFI) that indicate micro-cracks.',
    'hard', 1, 0, 13, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Transforming time-domain vibration signals into frequency-domain spectra to identify characteristic mechanical fault frequencies (bearings, gears)', true, 1, now(), now()),
    (v_q_id, 'Compressing video files for streaming', false, 2, now(), now()),
    (v_q_id, 'Encrypting database passwords', false, 3, now(), now()),
    (v_q_id, 'Formatting flash memory drives', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Network Analytics in IoT infrastructure management?', 'Network analytics monitors the health, coverage quality, and traffic congestion of distributed IoT mesh and LPWAN infrastructure.',
    'medium', 1, 0, 14, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Analyzing network telemetry (packet loss, latency, jitter, RSSI, SNR) to diagnose wireless communication degradation and optimize routing', true, 1, now(), now()),
    (v_q_id, 'Counting the number of websites visited by employees', false, 2, now(), now()),
    (v_q_id, 'Measuring the physical length of ethernet cables', false, 3, now(), now()),
    (v_q_id, 'Designing graphic logos for telecom companies', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Received Signal Strength Indicator (RSSI) in wireless IoT diagnostics?', 'RSSI indicates radio link quality: a value of $-50\,\text{dBm}$ indicates excellent signal, while $-115\,\text{dBm}$ is near the receiver sensitivity threshold.',
    'medium', 1, 0, 15, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A measurement of the estimated power level (in dBm, typically negative) present in a received radio signal', true, 1, now(), now()),
    (v_q_id, 'The battery voltage of the transmitter', false, 2, now(), now()),
    (v_q_id, 'The speed of the network router in megabits', false, 3, now(), now()),
    (v_q_id, 'The price of the wireless antenna', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Signal-to-Noise Ratio (SNR) in wireless IoT?', 'Positive SNR indicates the signal is stronger than ambient RF noise; LoRa modulation can demodulate signals down to $-20\,\text{dB}$ SNR below the noise floor.',
    'medium', 1, 0, 16, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The ratio of the power of a wanted signal to the background noise power corrupting the signal (expressed in decibels)', true, 1, now(), now()),
    (v_q_id, 'The volume level of audio speakers', false, 2, now(), now()),
    (v_q_id, 'The ratio of working sensors to broken sensors', false, 3, now(), now()),
    (v_q_id, 'The speed of the processor divided by memory size', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is TinyML in edge IoT analytics?', 'TinyML frameworks (TensorFlow Lite for Microcontrollers, Edge Impulse) quantize neural networks (INT8) to run real-time inference on ARM Cortex-M microcontrollers.',
    'medium', 1, 0, 17, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A field of machine learning focused on deploying ultra-low-power ML models on resource-constrained microcontrollers consuming milliwatts of power', true, 1, now(), now()),
    (v_q_id, 'A very small database developed by Microsoft', false, 2, now(), now()),
    (v_q_id, 'A simplified version of Python for children', false, 3, now(), now()),
    (v_q_id, 'A tool for compressing text documents', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Quantization in deep learning edge model optimization?', 'Post-training quantization dramatically reduces flash memory footprint and execution latency on MCUs without hardware floating-point units (FPUs).',
    'hard', 1, 0, 18, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Converting 32-bit floating-point weights (FP32) to 8-bit integers (INT8) to reduce model memory footprint by 75% and accelerate integer arithmetic', true, 1, now(), now()),
    (v_q_id, 'Deleting half of the layers in a neural network', false, 2, now(), now()),
    (v_q_id, 'Training a model for twice as many epochs', false, 3, now(), now()),
    (v_q_id, 'Converting Python code into JavaScript', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Pruning in neural network compression for IoT edge devices?', 'Weight pruning eliminates up to 80% of parameters in convolutional and dense layers, slashing storage requirements and multiply-accumulate (MAC) operations.',
    'hard', 1, 0, 19, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Removing non-essential, redundant weight connections and neurons that contribute minimally to model accuracy to create sparse, compact networks', true, 1, now(), now()),
    (v_q_id, 'Deleting outdated training data files', false, 2, now(), now()),
    (v_q_id, 'Turning off the power supply to the computer', false, 3, now(), now()),
    (v_q_id, 'Disconnecting redundant network cables', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Federated Learning in distributed IoT analytics?', 'Federated Learning preserves user privacy by training models locally on smartphones or edge gateways, transmitting only mathematical gradients to the cloud aggregator.',
    'medium', 1, 0, 20, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A decentralized machine learning framework where edge devices train models locally on private data and share only model weight updates with a central server', true, 1, now(), now()),
    (v_q_id, 'Storing all data on one central government computer', false, 2, now(), now()),
    (v_q_id, 'A company purchasing multiple cloud providers', false, 3, now(), now()),
    (v_q_id, 'A legal agreement between universities', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Apache Flink in IoT real-time stream processing?', 'Flink provides true event-driven stream processing with sub-second latency, exact-once state consistency, and robust out-of-order event handling via watermarks.',
    'hard', 1, 0, 21, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open-source distributed processing framework designed for stateful computations over unbounded and bounded data streams with event-time semantics', true, 1, now(), now()),
    (v_q_id, 'A tool for editing video files', false, 2, now(), now()),
    (v_q_id, 'A database for storing user passwords', false, 3, now(), now()),
    (v_q_id, 'A web browser developed by the Apache foundation', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Watermark'' in stream processing analytics?', 'Watermarks tell the stream engine (e.g., Flink) that no further events with timestamps older than $t$ will arrive, allowing the engine to close and compute windows.',
    'hard', 1, 0, 22, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A temporal mechanism used to track event-time progress and determine when all data up to a certain point in time has arrived for a sliding window', true, 1, now(), now()),
    (v_q_id, 'A copyright logo stamped on images', false, 2, now(), now()),
    (v_q_id, 'A sensor that detects water leaks on factory floors', false, 3, now(), now()),
    (v_q_id, 'A measurement of network cable dampness', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Confusion Matrix in predictive classification evaluation for IoT?', 'The confusion matrix tabulates predicted classes against ground-truth labels, serving as the basis for calculating precision, recall, and F1-score.',
    'easy', 1, 0, 23, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A specific table layout that visualizes the performance of an algorithm (True Positives, False Positives, True Negatives, False Negatives)', true, 1, now(), now()),
    (v_q_id, 'A mathematical error in an equation', false, 2, now(), now()),
    (v_q_id, 'A database that has become corrupted', false, 3, now(), now()),
    (v_q_id, 'A disorganized network diagram', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why is Recall often prioritized over Precision in IoT predictive maintenance?', 'In safety and industrial monitoring, missing a true breakdown can cause millions in damage or fatalities, making high recall (minimizing False Negatives) paramount.',
    'medium', 1, 0, 24, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because failing to predict a catastrophic machine failure (False Negative) is far more costly and hazardous than an unnecessary preventive inspection (False Positive)', true, 1, now(), now()),
    (v_q_id, 'Because Precision is too difficult to calculate', false, 2, now(), now()),
    (v_q_id, 'Because Recall uses smaller numbers', false, 3, now(), now()),
    (v_q_id, 'Because False Positives destroy machinery', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the F1-Score in machine learning analytics?', '$$F_1 = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$$; penalizes models that sacrifice one metric to artificially inflate the other.',
    'medium', 1, 0, 25, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The harmonic mean of Precision and Recall, providing a balanced metric for evaluating models on imbalanced datasets', true, 1, now(), now()),
    (v_q_id, 'The highest grade awarded to an algorithm', false, 2, now(), now()),
    (v_q_id, 'The speed of the computer in gigahertz', false, 3, now(), now()),
    (v_q_id, 'The percentage of memory used by the program', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Time-Series Forecasting in energy grid IoT management?', 'Forecasting algorithms anticipate peak load demand hours in advance, allowing grid operators to balance battery storage and spin up peaker plants efficiently.',
    'easy', 1, 0, 26, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Predicting future electrical demand and renewable energy generation using historical load telemetry and weather features (ARIMA, Prophet, LSTM)', true, 1, now(), now()),
    (v_q_id, 'Measuring current electricity voltage with a voltmeter', false, 2, now(), now()),
    (v_q_id, 'Turning off street lights at night', false, 3, now(), now()),
    (v_q_id, 'Printing electric utility bills', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an LSTM (Long Short-Term Memory) neural network?', 'LSTMs mitigate the vanishing gradient problem of vanilla RNNs, making them the standard deep learning model for sequential telemetry prediction.',
    'medium', 1, 0, 27, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A recurrent neural network (RNN) architecture equipped with gating mechanisms (input, forget, output gates) capable of learning long-term temporal dependencies in sensor time-series', true, 1, now(), now()),
    (v_q_id, 'A type of physical RAM memory stick', false, 2, now(), now()),
    (v_q_id, 'A flash storage drive used in digital cameras', false, 3, now(), now()),
    (v_q_id, 'A computer processor manufactured by Intel', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mean Absolute Scaled Error (MASE) in time-series forecasting?', 'MASE $< 1$ indicates that the predictive model outperforms a naive persistence forecast (predicting that the next value equals the current value).',
    'hard', 1, 0, 28, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A scale-independent forecast accuracy metric comparing the forecast error against a naive one-step random-walk persistence baseline', true, 1, now(), now()),
    (v_q_id, 'A measurement of sensor physical dimensions', false, 2, now(), now()),
    (v_q_id, 'A database query execution time metric', false, 3, now(), now()),
    (v_q_id, 'The percentage of dropped network packets', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Apache NiFi used for in IoT data ingestion?', 'NiFi automates data movement between heterogeneous edge protocols, cloud stores, and message queues with visual flow management and detailed data provenance.',
    'medium', 1, 0, 29, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An easy-to-use, powerful, and reliable system to process, route, and distribute data across enterprise systems using a visual drag-and-drop web UI', true, 1, now(), now()),
    (v_q_id, 'A tool for drawing computer graphics', false, 2, now(), now()),
    (v_q_id, 'An operating system for gaming computers', false, 3, now(), now()),
    (v_q_id, 'An encryption algorithm for Wi-Fi passwords', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Data Provenance (Data Lineage) in IoT analytics governance?', 'Data provenance allows engineers and auditors to trace back any corrupted calculation or erroneous insight to its original raw sensor input.',
    'medium', 1, 0, 30, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The documented historical record of the origin, transformations, pipeline custody, and delivery of a data point from sensor to cloud dashboard', true, 1, now(), now()),
    (v_q_id, 'The monetary price paid to purchase a dataset', false, 2, now(), now()),
    (v_q_id, 'The physical brand name of the sensor hardware', false, 3, now(), now()),
    (v_q_id, 'The language used by the database developer', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Downsampling (Decimation) in IoT time-series storage?', 'Downsampling drastically slashes storage volume and query latency for multi-year trend analysis without losing macroscopic historical patterns.',
    'easy', 1, 0, 31, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Aggregating raw high-frequency sensor readings (e.g., 1 reading/sec) into broader statistical summaries (e.g., 1-hour average, min, max) for long-term historical storage', true, 1, now(), now()),
    (v_q_id, 'Deleting half of the physical sensors in a factory', false, 2, now(), now()),
    (v_q_id, 'Lowering the display brightness of monitors', false, 3, now(), now()),
    (v_q_id, 'Reducing internet speed to save money', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Data Imputation in sensor telemetry streams?', 'Sensors intermittently disconnect; imputation algorithms fill temporal gaps to maintain continuous contiguous time-series arrays for downstream ML models.',
    'easy', 1, 0, 32, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Replacing missing or corrupted sensor readings caused by network dropouts with statistically plausible estimates (linear interpolation, forward-fill, spline)', true, 1, now(), now()),
    (v_q_id, 'Permanently deleting missing records', false, 2, now(), now()),
    (v_q_id, 'Stopping the entire factory when a sensor fails', false, 3, now(), now()),
    (v_q_id, 'Printing an error message on paper', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Deadband (Dead Zone) filter in edge IoT data collection?', 'Deadband filtering drastically reduces wireless radio transmissions and battery drain by suppressing redundant, unchanging telemetry (e.g., temperature remaining at $21.0^\circ\text{C}$).',
    'medium', 1, 0, 33, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A filtering rule where a sensor node transmits a reading only if the current value differs from the previously transmitted value by more than a specified threshold ($\Delta$)', true, 1, now(), now()),
    (v_q_id, 'A broken sensor that cannot measure data', false, 2, now(), now()),
    (v_q_id, 'A geographical area with zero wireless coverage', false, 3, now(), now()),
    (v_q_id, 'A security firewall blocking all ports', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Principal Component Analysis (PCA) used for in multi-sensor IoT telemetry?', 'PCA orthogonalizes high-dimensional multi-sensor arrays (e.g., 64 acoustic sensors), extracting the dominant variance dimensions while eliminating collinear noise.',
    'medium', 1, 0, 34, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Unsupervised linear dimensionality reduction that compresses dozens of correlated sensor channels into a smaller set of uncorrelated principal components', true, 1, now(), now()),
    (v_q_id, 'A method for repairing broken hardware circuits', false, 2, now(), now()),
    (v_q_id, 'An operating system for microcontrollers', false, 3, now(), now()),
    (v_q_id, 'A tool for formatting flash storage drives', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Cross-Correlation Analysis in distributed sensor arrays?', 'Cross-correlation of acoustic or seismic wave arrivals across spaced sensors allows precise triangulation of physical impact locations and pipeline leaks.',
    'hard', 1, 0, 35, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A mathematical measure of the similarity between two sensor signals as a function of the displacement of one relative to the other, used to calculate time-of-arrival delays', true, 1, now(), now()),
    (v_q_id, 'Comparing the prices of two different sensor brands', false, 2, now(), now()),
    (v_q_id, 'Checking whether two wires are touching', false, 3, now(), now()),
    (v_q_id, 'Running two databases simultaneously', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Kalman Filter in sensor estimation?', 'Kalman filters combine theoretical physics kinematic models with noisy real-world sensor measurements to produce mathematically optimal estimates of velocity and position.',
    'hard', 1, 0, 36, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An optimal recursive algorithm that estimates the true state of a dynamic system from a series of noisy measurements observed over time', true, 1, now(), now()),
    (v_q_id, 'A physical mesh filter that removes dust from electronics', false, 2, now(), now()),
    (v_q_id, 'A software program that filters spam emails', false, 3, now(), now()),
    (v_q_id, 'A digital sound equalizer', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Extended Kalman Filter (EKF)?', 'Real-world kinematics (robotics, drone navigation) are non-linear; the EKF linearizes system dynamics using Jacobian matrices at each time step.',
    'hard', 1, 0, 37, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A non-linear version of the Kalman filter that linearizes around an estimate of the current mean and covariance using Taylor series expansions', true, 1, now(), now()),
    (v_q_id, 'A Kalman filter with more memory installed', false, 2, now(), now()),
    (v_q_id, 'A filter used exclusively in water purification plants', false, 3, now(), now()),
    (v_q_id, 'A filter written in the C++ programming language', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Shanon-Nyquist Sampling Theorem in analog sensor data acquisition?', '$$f_s \ge 2 f_{\max}$$; sampling below the Nyquist rate causes high-frequency mechanical vibrations to alias into false low-frequency artifacts.',
    'medium', 1, 0, 38, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To capture all information from an analog signal without aliasing, the sampling frequency ($f_s$) must be at least twice the maximum frequency component ($f_{\max}$) of the signal', true, 1, now(), now()),
    (v_q_id, 'A theorem stating that all computers become obsolete in two years', false, 2, now(), now()),
    (v_q_id, 'A rule defining how many batteries are required for a sensor', false, 3, now(), now()),
    (v_q_id, 'A law governing the maximum length of copper cables', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Anti-Aliasing Filtering in IoT hardware frontends?', 'Hardware anti-aliasing filters physically attenuate high-frequency noise prior to digitization, preventing irreversible mathematical aliasing distortion.',
    'medium', 1, 0, 39, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An analog low-pass filter placed before the Analog-to-Digital Converter (ADC) that eliminates signal frequencies higher than half the sampling rate (Nyquist frequency)', true, 1, now(), now()),
    (v_q_id, 'A software algorithm for smoothing fonts on screens', false, 2, now(), now()),
    (v_q_id, 'A firewall that blocks malicious packets', false, 3, now(), now()),
    (v_q_id, 'A cooling fan that prevents chip overheating', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is K-Means Clustering used for in IoT customer or device profiling?', 'K-Means clusters smart meter consumption profiles into distinct user behavioral classes (e.g., nighttime off-peak users, commercial daytime consumers).',
    'easy', 1, 0, 40, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An unsupervised partitioning algorithm that groups devices or operational behaviors into $K$ distinct clusters based on feature similarity (Euclidean distance)', true, 1, now(), now()),
    (v_q_id, 'A method for sorting numbers in alphabetical order', false, 2, now(), now()),
    (v_q_id, 'A compiler that generates machine code', false, 3, now(), now()),
    (v_q_id, 'A tool for testing network bandwidth', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the ''Silhouette Score'' in clustering validation?', 'A high silhouette score ($> 0.7$) indicates well-separated, cohesive clusters, helping data scientists select the optimal parameter $K$.',
    'medium', 1, 0, 41, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A metric measuring how similar an object is to its own cluster compared to other clusters, ranging from $-1$ to $+1$', true, 1, now(), now()),
    (v_q_id, 'The physical shadow cast by a wireless antenna', false, 2, now(), now()),
    (v_q_id, 'The percentage of memory consumed by a cluster', false, 3, now(), now()),
    (v_q_id, 'The speed of the network router', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Decision Tree in IoT classification?', 'Decision trees offer exceptional human interpretability, making them popular for generating explicit diagnostic rule logic on edge gateways.',
    'easy', 1, 0, 42, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A supervised learning model that predicts target values by learning simple decision rules inferred from sensor features organized in a tree structure', true, 1, now(), now()),
    (v_q_id, 'A flowchart drawn by human managers on paper', false, 2, now(), now()),
    (v_q_id, 'A database query language', false, 3, now(), now()),
    (v_q_id, 'A physical antenna that branches like a tree', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Random Forest in IoT predictive modeling?', 'Random Forests drastically reduce variance and overfitting compared to individual decision trees, delivering robust accuracy on noisy sensor data.',
    'easy', 1, 0, 43, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An ensemble learning method that constructs a multitude of decorrelated decision trees during training and outputs the mode or mean prediction across the trees', true, 1, now(), now()),
    (v_q_id, 'A forest where wireless sensors are installed on trees', false, 2, now(), now()),
    (v_q_id, 'A disorganized computer file directory', false, 3, now(), now()),
    (v_q_id, 'A random number generator algorithm', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Gradient Boosting (e.g., XGBoost, LightGBM) in industrial IoT analytics?', 'XGBoost and LightGBM are dominant algorithms for tabular industrial telemetry, offering state-of-the-art accuracy on component failure classification.',
    'medium', 1, 0, 44, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An ensemble technique that builds trees sequentially, where each new tree is trained to correct the residual errors made by the previous trees', true, 1, now(), now()),
    (v_q_id, 'A method for increasing the electrical voltage of batteries', false, 2, now(), now()),
    (v_q_id, 'A tool for making internet connections faster', false, 3, now(), now()),
    (v_q_id, 'An algorithm for brightening computer screens', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Over-the-Wire Data Compression in IoT sensor transmission?', 'Compressing payloads reduces the number of bytes transmitted over cellular or Wi-Fi radios, directly extending the battery life of remote field gateways.',
    'medium', 1, 0, 45, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Applying algorithms like gzip, zstandard, or Snappy to telemetry payloads before wireless transmission to reduce radio airtime and save energy', true, 1, now(), now()),
    (v_q_id, 'Physically squeezing copper cables with pliers', false, 2, now(), now()),
    (v_q_id, 'Deleting half of the numbers in a file', false, 3, now(), now()),
    (v_q_id, 'Lowering the resolution of photographs', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Root Cause Analysis (RCA) in IoT operational incidents?', 'RCA correlates alarm sequences, sensor histories, and operator actions to establish why a transformer tripped or why a turbine seized.',
    'easy', 1, 0, 46, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A systematic problem-solving process that drills down into historical telemetry data to identify the fundamental underlying cause of a system failure', true, 1, now(), now()),
    (v_q_id, 'Analyzing the roots of plants in smart agriculture', false, 2, now(), now()),
    (v_q_id, 'Scanning a computer for administrative passwords', false, 3, now(), now()),
    (v_q_id, 'Formatting a hard drive after a crash', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Heat Mapping in spatial IoT sensor visualization?', 'Heat maps provide operators with instantaneous visual intuition of hot spots, vibration zones, and pedestrian density across facilities.',
    'easy', 1, 0, 47, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A graphical representation of data where individual values contained in a geographic or spatial matrix are represented as colors (e.g., warehouse temperatures)', true, 1, now(), now()),
    (v_q_id, 'Measuring the temperature of computer processors', false, 2, now(), now()),
    (v_q_id, 'An algorithm that prevents overheating in servers', false, 3, now(), now()),
    (v_q_id, 'A map of volcanic activity around the world', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Edge Intelligence (Edge AI)?', 'Edge AI combines low-latency inference, privacy preservation, offline autonomous operation, and reduced cloud bandwidth consumption.',
    'easy', 1, 0, 48, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The deployment of artificial intelligence algorithms directly on local hardware devices where data is generated, rather than relying exclusively on cloud processing', true, 1, now(), now()),
    (v_q_id, 'A computer that can physically walk and talk', false, 2, now(), now()),
    (v_q_id, 'A high-speed internet connection to the cloud', false, 3, now(), now()),
    (v_q_id, 'An operating system developed by Microsoft', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is MQTT Sparkplug B in industrial IIoT data architecture?', 'Sparkplug B overlays operational technology (OT) semantics onto MQTT, providing automatic node discovery, metrics schemas, and death certificates for SCADA systems.',
    'hard', 1, 0, 49, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open-source specification that standardizes MQTT topic namespaces, payload schemas (Protobuf), and session state management for industrial automation', true, 1, now(), now()),
    (v_q_id, 'A physical component in gasoline automobile engines', false, 2, now(), now()),
    (v_q_id, 'A battery charging circuit for electric cars', false, 3, now(), now()),
    (v_q_id, 'A database indexing algorithm', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary trade-off between Edge Analytics and Cloud Analytics in IoT?', 'Edge excels at millisecond reflexive closed-loop actuation; Cloud excels at heavy deep learning training, big data warehousing, and macroscopic fleet-wide optimization.',
    'medium', 1, 0, 50, ARRAY['BCA-306N', 'Unit-3', 'BCA-306N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Edge delivers ultra-low latency and offline autonomy with limited compute; Cloud provides massive compute and global historical aggregation with higher latency and bandwidth cost', true, 1, now(), now()),
    (v_q_id, 'Edge is completely free while cloud is always expensive', false, 2, now(), now()),
    (v_q_id, 'Edge can only process text while cloud can only process images', false, 3, now(), now()),
    (v_q_id, 'There is no trade-off', false, 4, now(), now());

END $SEEDED_BLOCK$;
