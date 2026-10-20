DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-306N Unit 5 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    'f7a3784b-d0ca-524b-9616-5f643fe4acfb', 'BCA-306N Unit 5: IoT in Industry and Vertical Applications Practice Quiz (50 MCQs)', 'bca-306n-u5-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-306N Unit 5. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is Industry 4.0 (The Fourth Industrial Revolution)?', 'Industry 4.0 integrates smart manufacturing, Cyber-Physical Systems (CPS), Big Data, autonomous robotics, and IoT sensor connectivity.',
    'easy', 1, 0, 1, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The ongoing automation and digitization of traditional manufacturing and industrial practices using smart technology, IoT, cyber-physical systems, and cloud analytics', true, 1, now(), now()),
    (v_q_id, 'The invention of the steam engine in the 18th century', false, 2, now(), now()),
    (v_q_id, 'The introduction of electricity in factories', false, 3, now(), now()),
    (v_q_id, 'The invention of personal computers in the 1980s', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are Cyber-Physical Systems (CPS)?', 'CPS tightly couples computation, networking, and physical dynamics, where physical processes affect computations and computations control physical processes.',
    'medium', 1, 0, 2, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Engineered systems that orchestrate seamless integration between computational algorithms and physical mechanical components via feedback loops', true, 1, now(), now()),
    (v_q_id, 'Virtual reality video games', false, 2, now(), now()),
    (v_q_id, 'Computers that only run physical simulations', false, 3, now(), now()),
    (v_q_id, 'Mechanical machines without electronic components', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Smart Manufacturing, what is an ''Overall Equipment Effectiveness'' (OEE) metric?', 'An OEE score of 100% means manufacturing only good parts, as fast as possible, with zero unscheduled downtime.',
    'medium', 1, 0, 3, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A gold-standard metric measuring manufacturing productivity by multiplying Availability, Performance, and Quality: $\text{OEE} = A \times P \times Q$', true, 1, now(), now()),
    (v_q_id, 'The total electricity consumed by a factory in a year', false, 2, now(), now()),
    (v_q_id, 'The number of employees working on an assembly line', false, 3, now(), now()),
    (v_q_id, 'The square footage of a factory floor', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Smart Grid in modern electric utility management?', 'Smart Grids provide bidirectional flows of electricity and real-time telemetry, balancing supply from distributed renewables with dynamic consumer demand.',
    'easy', 1, 0, 4, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An electricity network that uses digital communications, IoT sensors, and automated controls to detect and react to local changes in usage and electrical issues', true, 1, now(), now()),
    (v_q_id, 'A high-voltage power cable with no electronic sensors', false, 2, now(), now()),
    (v_q_id, 'A solar panel installed on a private home', false, 3, now(), now()),
    (v_q_id, 'An electric utility company billing software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Advanced Metering Infrastructure (AMI)?', 'AMI smart meters eliminate manual meter reading, support dynamic Time-of-Use (ToU) electricity pricing, and automatically detect localized power outages.',
    'medium', 1, 0, 5, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An integrated system of smart electric meters, communication networks, and data management systems enabling bidirectional communication between utilities and customers', true, 1, now(), now()),
    (v_q_id, 'A water pipe with a mechanical meter', false, 2, now(), now()),
    (v_q_id, 'A tool for measuring electrical resistance with a dial', false, 3, now(), now()),
    (v_q_id, 'An invoice printed by a utility company', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How is IoT applied in the Oil & Gas industry?', 'Upstream, midstream, and downstream operations use IoT telemetry to prevent environmental catastrophes, pipeline ruptures, and hazardous refinery leaks.',
    'easy', 1, 0, 6, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Real-time pipeline leak detection using acoustic/pressure sensors, offshore rig preventative maintenance, and automated flare stack monitoring', true, 1, now(), now()),
    (v_q_id, 'Manually inspecting thousands of miles of desert pipelines on foot', false, 2, now(), now()),
    (v_q_id, 'Using paper logbooks to record oil flow', false, 3, now(), now()),
    (v_q_id, 'Drilling oil wells without using computers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is SCADA (Supervisory Control and Data Acquisition)?', 'SCADA interfaces with Programmable Logic Controllers (PLCs) and remote terminal units (RTUs) to monitor and control industrial infrastructure.',
    'medium', 1, 0, 7, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An industrial automation control system architecture comprising computers, networked data communications, and graphical user interfaces for high-level process supervisory management', true, 1, now(), now()),
    (v_q_id, 'A computer programming language like Python', false, 2, now(), now()),
    (v_q_id, 'A database management engine developed by IBM', false, 3, now(), now()),
    (v_q_id, 'A type of fiber optic networking cable', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Programmable Logic Controller (PLC)?', 'PLCs are built to withstand extreme temperatures, electrical noise, moisture, and vibration while executing deterministic real-time control loops.',
    'easy', 1, 0, 8, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An industrial digital computer ruggedized for the control of manufacturing processes, assembly lines, and robotic devices', true, 1, now(), now()),
    (v_q_id, 'A home gaming console like PlayStation', false, 2, now(), now()),
    (v_q_id, 'A laptop computer used in offices', false, 3, now(), now()),
    (v_q_id, 'A microchip found inside smartphones', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Smart City in modern urban IoT engineering?', 'Smart Cities deploy integrated sensors across traffic management, water distribution, waste collection, air quality monitoring, and public safety.',
    'easy', 1, 0, 9, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A municipality that uses information and communication technologies (ICT) and IoT to increase operational efficiency, share information with the public, and improve citizen welfare', true, 1, now(), now()),
    (v_q_id, 'A city that has universities and libraries', false, 2, now(), now()),
    (v_q_id, 'A city where all buildings are painted white', false, 3, now(), now()),
    (v_q_id, 'A city with free public bus transportation', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does IoT optimize Municipal Waste Management in Smart Cities?', 'Dynamic route planning based on real-time bin fullness telemetry reduces city fuel consumption, truck emissions, and prevents overflowing urban trash cans.',
    'easy', 1, 0, 10, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Smart trash dumpsters equipped with ultrasonic level sensors report when they are 80% full, allowing trash collection trucks to dynamically optimize driving routes', true, 1, now(), now()),
    (v_q_id, 'Instructing citizens to burn trash at home', false, 2, now(), now()),
    (v_q_id, 'Collecting trash from every street twice an hour regardless of fullness', false, 3, now(), now()),
    (v_q_id, 'Manufacturing plastic trash cans that never get dirty', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Smart Street Lighting in municipal IoT?', 'Saves cities up to 70% in municipal electricity consumption while providing real-time alerts when a fixture burns out.',
    'easy', 1, 0, 11, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'LED streetlights equipped with light sensors and motion detectors that automatically dim when streets are empty and brighten when pedestrians or cars approach', true, 1, now(), now()),
    (v_q_id, 'Turning on all street lights 24 hours a day', false, 2, now(), now()),
    (v_q_id, 'Replacing street lights with candles', false, 3, now(), now()),
    (v_q_id, 'Street lights that change colors randomly for parties', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How is IoT utilized in Smart Parking systems?', 'Eliminates up to 30% of downtown urban traffic congestion caused by drivers aimlessly circling city blocks searching for vacant parking stalls.',
    'easy', 1, 0, 12, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Magnetometer or ultrasonic sensors embedded in parking spaces detect vehicle presence and broadcast parking availability to driver navigation smartphone apps', true, 1, now(), now()),
    (v_q_id, 'Hiring thousands of parking attendants to wave flags', false, 2, now(), now()),
    (v_q_id, 'Banning cars from parking in cities entirely', false, 3, now(), now()),
    (v_q_id, 'Drawing parking lines on streets with paint', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is V2X (Vehicle-to-Everything) communication in Connected and Autonomous Vehicles?', 'V2X enables vehicles to broadcast velocity, trajectory, and braking status, warning nearby cars of impending collisions and synchronizing with smart traffic signals.',
    'medium', 1, 0, 13, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A vehicular communication system that incorporates V2V (Vehicle-to-Vehicle), V2I (Vehicle-to-Infrastructure), V2P (Vehicle-to-Pedestrian), and V2N (Vehicle-to-Network)', true, 1, now(), now()),
    (v_q_id, 'A car engine that runs on electricity', false, 2, now(), now()),
    (v_q_id, 'A smartphone app that plays music in a car', false, 3, now(), now()),
    (v_q_id, 'A camera mounted on a car dashboard', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is DSRC (Dedicated Short-Range Communications) in intelligent transportation?', 'DSRC delivers ultra-low-latency ($< 2\,\text{ms}$) vehicle safety communications without requiring cellular network subscription infrastructure.',
    'hard', 1, 0, 14, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A 5.9 GHz two-way short-to-medium-range wireless communication capability specifically designed for automotive use based on IEEE 802.11p', true, 1, now(), now()),
    (v_q_id, 'A satellite navigation system like GPS', false, 2, now(), now()),
    (v_q_id, 'A cable connecting a car battery to the engine', false, 3, now(), now()),
    (v_q_id, 'An FM radio broadcast station', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Cellular V2X (C-V2X) based on 3GPP standards?', 'C-V2X provides both direct device-to-device sidelink for immediate collision avoidance and network-to-cloud communications for macroscopic traffic optimization.',
    'medium', 1, 0, 15, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A vehicular communication standard utilizing cellular networks (4G LTE and 5G NR) supporting both direct sidelink (PC5) and network communications', true, 1, now(), now()),
    (v_q_id, 'A car that has a cellular smartphone mounted on the dashboard', false, 2, now(), now()),
    (v_q_id, 'A cellular network that only works on trains', false, 3, now(), now()),
    (v_q_id, 'A satellite telephone used in airplanes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Platooning in connected commercial freight transportation?', 'V2V inter-vehicle communication synchronizes braking within milliseconds, allowing trucks to follow within meters safely, cutting diesel consumption by 15%.',
    'medium', 1, 0, 16, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Linking two or more trucks in a convoy using V2V automated driving systems to travel closely together at high speeds, reducing aerodynamic drag and fuel use', true, 1, now(), now()),
    (v_q_id, 'Parking trucks in a straight line overnight', false, 2, now(), now()),
    (v_q_id, 'Loading cargo onto trucks with forklifts', false, 3, now(), now()),
    (v_q_id, 'Driving trucks on railroad tracks', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Precision Agriculture (Smart Farming)?', 'Precision agriculture applies water, fertilizer, and pesticides only where and when needed, maximizing crop yield while minimizing chemical runoff.',
    'easy', 1, 0, 17, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A farming management concept based on observing, measuring, and responding to inter and intra-field variability in crops using IoT sensors, GPS, and drones', true, 1, now(), now()),
    (v_q_id, 'Farming done exclusively inside greenhouses', false, 2, now(), now()),
    (v_q_id, 'Using only organic fertilizers without computers', false, 3, now(), now()),
    (v_q_id, 'Watering entire fields uniformly regardless of soil dampness', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which IoT sensor is used to monitor soil moisture for automated precision drip irrigation?', 'Capacitive soil sensors measure dielectric permittivity of the soil, triggering automated solenoid irrigation valves only when root-zone moisture drops below thresholds.',
    'easy', 1, 0, 18, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Capacitive or Tensiometric Soil Moisture Sensor', true, 1, now(), now()),
    (v_q_id, 'Microphone', false, 2, now(), now()),
    (v_q_id, 'Gyroscope', false, 3, now(), now()),
    (v_q_id, 'Ultrasonic sensor', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Normalized Difference Vegetation Index (NDVI) used in drone agricultural imaging?', 'Healthy chlorophyll absorbs red light and strongly reflects near-infrared; damaged or drought-stressed plants reflect less NIR, revealing crop stress before visual wilting.',
    'hard', 1, 0, 19, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A numerical indicator that uses visible red and near-infrared spectral bands to analyze whether a crop contains live green vegetation: $\text{NDVI} = \frac{\text{NIR} - \text{Red}}{\text{NIR} + \text{Red}}$', true, 1, now(), now()),
    (v_q_id, 'The height of corn plants measured in centimeters', false, 2, now(), now()),
    (v_q_id, 'The amount of rainfall recorded in millimeters', false, 3, now(), now()),
    (v_q_id, 'The price of wheat on international commodities markets', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does IoT improve Safety in Underground Mining operations?', 'Automated environmental sensing warns miners of explosive gas buildups and seismic roof instability minutes before catastrophic cave-ins or explosions occur.',
    'easy', 1, 0, 20, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Monitoring toxic gas levels (methane, carbon monoxide), structural rock vibration, and tracking worker personnel locations using wearable tags and wireless mesh', true, 1, now(), now()),
    (v_q_id, 'Requiring miners to carry flashlights', false, 2, now(), now()),
    (v_q_id, 'Building wider mine shafts with concrete', false, 3, now(), now()),
    (v_q_id, 'Banning heavy machinery in underground tunnels', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Internet of Medical Things (IoMT)?', 'IoMT enables continuous remote patient monitoring, automatic drug dosing delivery, and early warning alerting for cardiac anomalies in real time.',
    'easy', 1, 0, 21, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A collection of medical devices and applications connected to healthcare IT systems using networking technologies (smart insulin pumps, wearable ECG monitors)', true, 1, now(), now()),
    (v_q_id, 'A website where medical students read textbooks', false, 2, now(), now()),
    (v_q_id, 'A software program for billing hospital patients', false, 3, now(), now()),
    (v_q_id, 'A hospital pharmacy inventory spreadsheet', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Electronic Health Record (EHR) integration challenge with IoMT devices?', 'Medical telemetry must adhere to Fast Healthcare Interoperability Resources (FHIR) protocols to integrate securely with hospital records without exposing patient PII.',
    'medium', 1, 0, 22, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Ensuring streaming medical sensor data complies with strict interoperability standards (HL7 / FHIR) and legal privacy mandates (HIPAA) without latency bottlenecks', true, 1, now(), now()),
    (v_q_id, 'Writing patient medical histories on paper charts', false, 2, now(), now()),
    (v_q_id, 'Connecting computers to electric wall sockets', false, 3, now(), now()),
    (v_q_id, 'Finding doctors who know how to use computers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does IoT optimize Cold Chain Logistics (e.g., vaccine and food transportation)?', 'Guarantees that sensitive biological pharmaceuticals (vaccines) and perishable foodstuffs remain within precise thermal windows (e.g., $-20^\circ\text{C}$ to $-80^\circ\text{C}$) across global sea and air transit.',
    'easy', 1, 0, 23, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Sensors continuously log temperature, humidity, and GPS coordinates inside refrigerated shipping containers, triggering instant alerts if cooling breaches acceptable limits', true, 1, now(), now()),
    (v_q_id, 'Packing boxes with extra cardboard paper', false, 2, now(), now()),
    (v_q_id, 'Shipping vaccines only in winter months', false, 3, now(), now()),
    (v_q_id, 'Driving delivery trucks faster', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Condition-Based Monitoring (CBM) system in heavy industry?', 'Unlike reactive breakdown maintenance or rigid calendar maintenance, CBM performs interventions based on measured physical deterioration trends.',
    'medium', 1, 0, 24, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A maintenance strategy that monitors the actual real-time condition of an asset (vibration, lubricant oil quality, temperature) to determine what maintenance needs to be done', true, 1, now(), now()),
    (v_q_id, 'Inspecting machinery only after a serious workplace injury occurs', false, 2, now(), now()),
    (v_q_id, 'Replacing machine parts every Monday morning', false, 3, now(), now()),
    (v_q_id, 'Painting factory equipment with protective paint', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Intelligent Transport System (ITS)?', 'ITS combines electronic toll collection (RFID/FasTag), variable message highway signs, automated speed enforcement, and coordinated emergency dispatch.',
    'easy', 1, 0, 25, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An advanced application which aims to provide innovative services relating to different modes of transport and traffic management, enabling users to be better informed and make safer use of transport networks', true, 1, now(), now()),
    (v_q_id, 'A subway train that travels very fast', false, 2, now(), now()),
    (v_q_id, 'A smartphone with a digital map app', false, 3, now(), now()),
    (v_q_id, 'A highway with no speed limits', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is RFID (Radio Frequency Identification) and its two primary categories?', 'Passive RFID tags cost pennies and have unlimited lifespans for supply chain tracking; active RFID tags broadcast telemetry over hundreds of meters for high-value asset tracking.',
    'easy', 1, 0, 26, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A wireless technology using radio frequency electromagnetic fields to identify tagged objects; categorized as Passive (no battery, powered by reader RF field) and Active (battery powered)', true, 1, now(), now()),
    (v_q_id, 'A barcode scanner using optical lasers', false, 2, now(), now()),
    (v_q_id, 'An infrared remote control system', false, 3, now(), now()),
    (v_q_id, 'A magnetic stripe card reader on ATMs', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Near Field Communication (NFC)?', 'Operating at 13.56 MHz, NFC supports contactless mobile credit card payments (Google Pay, Apple Pay) and peer-to-peer data exchange at intimate physical proximities.',
    'easy', 1, 0, 27, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A short-range ($< 4\,\text{cm}$) high-frequency wireless communication technology derived from RFID standards, enabling contactless payments and simple pairing', true, 1, now(), now()),
    (v_q_id, 'A wireless protocol that connects buildings 10 kilometers apart', false, 2, now(), now()),
    (v_q_id, 'A cable used inside television sets', false, 3, now(), now()),
    (v_q_id, 'A satellite communications standard', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Ambient Assisted Living (AAL) in healthcare IoT?', 'AAL non-invasively monitors daily living activities (bed occupancy, gait stability, medication adherence), alerting family or emergency responders to sudden falls.',
    'medium', 1, 0, 28, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Concepts, products, and services utilizing smart sensors, wearable fall detectors, and ambient intelligence to support independent living for elderly and disabled individuals', true, 1, now(), now()),
    (v_q_id, 'A nursing home with many nurses on duty', false, 2, now(), now()),
    (v_q_id, 'A hospital emergency room', false, 3, now(), now()),
    (v_q_id, 'A physical exercise program for seniors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How is IoT utilized in Structural Health Monitoring (SHM) of bridges and dams?', 'Continuous strain and displacement measurements prevent catastrophic structural collapses by identifying concrete fatigue and structural movement years in advance.',
    'medium', 1, 0, 29, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Piezoelectric accelerometers, strain gauges, and tiltmeters embedded in concrete structures detect micro-cracks, mechanical stress, and seismic settlement over decades', true, 1, now(), now()),
    (v_q_id, 'Painting bridges with waterproof paint', false, 2, now(), now()),
    (v_q_id, 'Driving heavy trucks across bridges to test if they collapse', false, 3, now(), now()),
    (v_q_id, 'Looking at bridges with binoculars', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Smart Water Metering and Distribution System in smart cities?', 'Reduces municipal Non-Revenue Water (NRW) loss by identifying underground distribution leaks through hydraulic pressure anomaly modeling.',
    'medium', 1, 0, 30, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A network of smart water flow meters and acoustic leak detectors that measures water consumption in real time and detects underground pipe bursts before sinkholes form', true, 1, now(), now()),
    (v_q_id, 'A water filter attached to a kitchen sink', false, 2, now(), now()),
    (v_q_id, 'Digging up streets to inspect pipes manually every month', false, 3, now(), now()),
    (v_q_id, 'A water dam with a hydro-electric turbine', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Automated Guided Vehicle (AGV) in smart warehouse logistics?', 'AGVs communicate over low-latency Wi-Fi / Private 5G to coordinate collision-free fleet inventory routing inside fulfillment centers (e.g., Amazon Kiva robots).',
    'medium', 1, 0, 31, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A mobile autonomous robot that follows marked lines or wires on the floor, or uses LiDAR vision and SLAM to navigate warehouse floors transporting pallet inventory', true, 1, now(), now()),
    (v_q_id, 'A forklift driven by a human operator', false, 2, now(), now()),
    (v_q_id, 'A conveyor belt carrying packages in a factory', false, 3, now(), now()),
    (v_q_id, 'A delivery truck on a public highway', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is SLAM (Simultaneous Localization and Mapping) in mobile IoT robotics?', 'Using LiDAR and depth cameras, autonomous mobile robots navigate dynamic warehouse environments without pre-laid magnetic floor tracks.',
    'hard', 1, 0, 32, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The computational problem of constructing or updating a map of an unknown environment while simultaneously keeping track of an autonomous robot''s location within it', true, 1, now(), now()),
    (v_q_id, 'A protocol for shutting down computers during storms', false, 2, now(), now()),
    (v_q_id, 'A tool for measuring the battery life of robots', false, 3, now(), now()),
    (v_q_id, 'A collision between two warehouse robots', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Optical Character Recognition (OCR) used for in automated logistics IoT?', 'Automatic Number Plate Recognition (ANPR) and container code recognition automate gate entry and cargo sorting without manual typing.',
    'easy', 1, 0, 33, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Scanning and extracting text from shipping container serial numbers, vehicle license plates (ANPR), and package tracking waybills using computer vision', true, 1, now(), now()),
    (v_q_id, 'Printing shipping labels on paper', false, 2, now(), now()),
    (v_q_id, 'Measuring the weight of packages on scales', false, 3, now(), now()),
    (v_q_id, 'Taking photos of warehouse employees', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How is IoT applied in Smart Airport Passenger Management?', 'Eliminates lost luggage claims and dynamically deploys airport security staffing to choke points based on real-time pedestrian queue density.',
    'easy', 1, 0, 34, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'BLE beacons and Wi-Fi tracking analyze passenger queue dwell times at security checkpoints, and RFID baggage tags track luggage from check-in to aircraft cargo holds', true, 1, now(), now()),
    (v_q_id, 'Announcing flight delays over loudspeakers', false, 2, now(), now()),
    (v_q_id, 'Printing paper boarding passes at ticket counters', false, 3, now(), now()),
    (v_q_id, 'Selling duty-free goods to travelers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Acoustic Emission Testing in industrial pressure vessel monitoring?', 'Non-destructive testing (NDT) acoustic sensors detect the microscopic ultrasonic ''clicks'' of expanding metal fractures long before structural rupture occurs.',
    'hard', 1, 0, 35, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Listening to microscopic ultrasonic sound waves emitted by materials when undergoing crack propagation, deformation, or high-pressure gas leaks', true, 1, now(), now()),
    (v_q_id, 'Measuring the noise level of factory music speakers', false, 2, now(), now()),
    (v_q_id, 'Testing whether microphones work properly', false, 3, now(), now()),
    (v_q_id, 'Listening to radio broadcasts in factories', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Thermal Imaging Sensor (Thermography) used for in electrical substations?', 'Overheating is the universal precursor to electrical fire; radiometric infrared cameras trigger automated shut-offs before electrical switchgear explodes.',
    'medium', 1, 0, 36, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Detecting abnormal heat signatures and hot spots on high-voltage transformers and circuit breakers that indicate loose connections or internal arcing', true, 1, now(), now()),
    (v_q_id, 'Measuring the outside air temperature', false, 2, now(), now()),
    (v_q_id, 'Keeping electrical equipment warm during winter', false, 3, now(), now()),
    (v_q_id, 'Taking colorful photographs of power plants', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Geofencing in fleet management IoT?', 'Logistics companies track asset movement, ensuring refrigerated trucks stick to authorized routes and sending customer notifications when a delivery van is 1 km away.',
    'easy', 1, 0, 37, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A virtual perimeter defined around a real-world geographic area using GPS, triggering automated alerts when a tracked vehicle enters or exits the boundary', true, 1, now(), now()),
    (v_q_id, 'Building physical wooden fences around parking lots', false, 2, now(), now()),
    (v_q_id, 'A tool for measuring land acreage with survey tools', false, 3, now(), now()),
    (v_q_id, 'A satellite navigation antenna', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an On-Board Diagnostics (OBD-II) port in connected automotive IoT?', 'OBD-II dongles with cellular connectivity stream real-time automotive diagnostics to telematics and pay-how-you-drive insurance platforms.',
    'easy', 1, 0, 38, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A standardized vehicle hardware port that provides real-time engine telemetry (RPM, fuel consumption, diagnostic trouble codes - DTCs) to plugged-in IoT dongles', true, 1, now(), now()),
    (v_q_id, 'A cigarette lighter socket used to charge phones', false, 2, now(), now()),
    (v_q_id, 'A socket where mechanics plug in battery chargers', false, 3, now(), now()),
    (v_q_id, 'An audio jack for connecting headphones', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Pay-How-You-Drive (PHYD) Telematics Insurance?', 'Insurance companies incentivize safe driving habits by lowering policy premiums for drivers who avoid speeding and midnight driving based on IoT sensor records.',
    'medium', 1, 0, 39, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Usage-based automotive insurance where premium costs are calculated dynamically based on real-time driving behavior (speed, harsh braking, cornering forces, mileage)', true, 1, now(), now()),
    (v_q_id, 'Paying for insurance with a credit card online', false, 2, now(), now()),
    (v_q_id, 'An insurance policy that covers repairs after an accident', false, 3, now(), now()),
    (v_q_id, 'A discount given to drivers who wash their cars', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Battery Management System (BMS) in Electric Vehicles (EVs) and Grid Storage?', 'The BMS balances cell charge, prevents thermal runaway (battery fires), and computes real-time State-of-Health (SoH) and available driving range.',
    'medium', 1, 0, 40, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An electronic control system that monitors and manages individual rechargeable battery cells, regulating voltage, thermal temperature, and state of charge (SoC)', true, 1, now(), now()),
    (v_q_id, 'A battery charger plugged into a wall outlet', false, 2, now(), now()),
    (v_q_id, 'An alternator that charges a car battery while driving', false, 3, now(), now()),
    (v_q_id, 'A physical metal case holding batteries', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is State of Charge (SoC) vs State of Health (SoH) in battery analytics?', 'SoC fluctuates between 0% and 100% on a single drive; SoH permanently declines from 100% to 70% over thousands of charge cycles as lithium dendrites form.',
    'medium', 1, 0, 41, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'SoC is the current battery fuel level percentage (like a fuel gauge); SoH is the long-term degradation percentage comparing maximum present capacity to original factory capacity', true, 1, now(), now()),
    (v_q_id, 'SoC is for new batteries; SoH is for old batteries', false, 2, now(), now()),
    (v_q_id, 'They are identical measurements', false, 3, now(), now()),
    (v_q_id, 'SoC measures voltage; SoH measures current', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does IoT improve Fire and Smoke Emergency Response in Smart Buildings?', 'Provides incident commanders with dynamic situational awareness of flame propagation, structural collapse risk, and victim GPS coordinates in thick smoke.',
    'easy', 1, 0, 42, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Interconnected smart smoke detectors and thermal sensors transmit live indoor heat maps and trapped occupancy locations to firefighters'' tablets before they enter the building', true, 1, now(), now()),
    (v_q_id, 'Playing a siren sound over speakers', false, 2, now(), now()),
    (v_q_id, 'Sprinkling water on every floor of the building', false, 3, now(), now()),
    (v_q_id, 'Instructing people to use stairs instead of elevators', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Smart Meter Tampering Detection in electric utilities?', 'Drastically reduces electrical utility theft (non-technical losses) by timestamping and geo-locating illegal physical meter interference.',
    'medium', 1, 0, 43, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Sensors inside the smart meter that detect magnetic field manipulation, meter cover removal, or current bypass wires, alerting utility security instantly', true, 1, now(), now()),
    (v_q_id, 'Locking electric meters inside metal boxes', false, 2, now(), now()),
    (v_q_id, 'Cutting electricity to all houses once a week', false, 3, now(), now()),
    (v_q_id, 'Hiring inspectors to read meters manually', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Automatic Number Plate Recognition (ANPR) system in smart highway tolling?', 'Enables barrier-free, free-flow highway tolling (open road tolling) without requiring vehicles to slow down or stop at toll plazas.',
    'easy', 1, 0, 44, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'High-speed optical cameras combined with machine learning OCR algorithms that automatically identify vehicle registration plates at full highway driving speeds', true, 1, now(), now()),
    (v_q_id, 'A toll booth where a human collector takes cash', false, 2, now(), now()),
    (v_q_id, 'A machine that dispenses paper tickets', false, 3, now(), now()),
    (v_q_id, 'A police officer stopping cars on the side of the road', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Ambient Noise Monitoring in urban environmental quality control?', 'Cities deploy noise sensors to identify illegal nighttime construction, traffic roar, and nightclub zoning violations.',
    'easy', 1, 0, 45, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A network of calibrated acoustic sound-level meters measuring decibels (dB) across urban zones to map noise pollution and enforce industrial sound regulations', true, 1, now(), now()),
    (v_q_id, 'Measuring how loudly people speak on telephones', false, 2, now(), now()),
    (v_q_id, 'Playing music in public parks', false, 3, now(), now()),
    (v_q_id, 'Testing hearing aids in hospitals', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Drone Fleet Management System in agricultural and delivery IoT?', 'Coordinates autonomous drone swarms for agricultural crop spraying and medical package delivery without mid-air collisions.',
    'medium', 1, 0, 46, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A centralized cloud platform that coordinates autonomous flight paths, geofencing safety boundaries, battery swap automation, and payload delivery logistics for fleets of UAVs', true, 1, now(), now()),
    (v_q_id, 'A remote control held by a human pilot', false, 2, now(), now()),
    (v_q_id, 'A hangar where drones are stored overnight', false, 3, now(), now()),
    (v_q_id, 'A video camera mounted on a drone', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Ambient Backscatter Communication in zero-power IoT research?', 'Enables completely battery-free sensors to transmit data by toggling their antenna impedance, modulating their reflection of ambient electromagnetic waves.',
    'hard', 1, 0, 47, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A wireless technique where battery-less devices communicate by selectively reflecting or absorbing existing ambient RF signals (e.g., commercial Wi-Fi or TV broadcasts)', true, 1, now(), now()),
    (v_q_id, 'Broadcasting radio commercials on FM channels', false, 2, now(), now()),
    (v_q_id, 'Shining laser pointers between buildings', false, 3, now(), now()),
    (v_q_id, 'Using mirrors to reflect sunlight', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Green IoT in sustainable technological development?', 'Focuses on lifecycle sustainability: reducing toxic electronic waste (e-waste) via transient dissolvable silicon and slashing data center power consumption.',
    'easy', 1, 0, 48, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Designing energy-efficient hardware, biodegradable sensor materials, low-power protocols, and energy-harvesting technologies to minimize the carbon footprint and e-waste of IoT', true, 1, now(), now()),
    (v_q_id, 'Painting all sensors with green colored paint', false, 2, now(), now()),
    (v_q_id, 'Installing sensors exclusively in botanical gardens', false, 3, now(), now()),
    (v_q_id, 'Manufacturing sensors using green plastic', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Matter and Thread smart home alliance''s primary impact on consumers?', 'Ensures that an Apple iPhone, a Google Nest speaker, and an Amazon Alexa can all control the exact same smart lock or light bulb simultaneously.',
    'easy', 1, 0, 49, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Eliminating vendor lock-in by allowing smart devices from different brands to interoperate natively across a unified, local, secure IPv6 mesh network', true, 1, now(), now()),
    (v_q_id, 'Making smart light bulbs brighter', false, 2, now(), now()),
    (v_q_id, 'Requiring consumers to purchase expensive new hubs', false, 3, now(), now()),
    (v_q_id, 'Limiting smart home devices to only work with one company', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary factor driving the integration of 5G New Radio (NR) in Industrial IoT?', '5G URLLC provides the deterministic wire-like reliability and microsecond latency required to replace physical industrial Ethernet cables in robotics.',
    'medium', 1, 0, 50, ARRAY['BCA-306N', 'Unit-5', 'BCA-306N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Ultra-Reliable Low-Latency Communication (URLLC: $< 1\,\text{ms}$ latency) and Massive Machine-Type Communication (mMTC: up to 1 million devices per square kilometer)', true, 1, now(), now()),
    (v_q_id, 'Higher subscription costs for telecom carriers', false, 2, now(), now()),
    (v_q_id, 'Faster download of movies on smartphones', false, 3, now(), now()),
    (v_q_id, 'Requiring new cellular antennas on every street corner', false, 4, now(), now());

END $SEEDED_BLOCK$;
