DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-306N Unit 1 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '9bec8258-17ab-5753-8fb5-d49d02bc82d9', 'BCA-306N Unit 1: Introduction to IoT and Architectures Practice Quiz (50 MCQs)', 'bca-306n-u1-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-306N Unit 1. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'Who coined the term ''Internet of Things'' in 1999 during a presentation at Procter & Gamble?', 'Kevin Ashton coined the term ''Internet of Things'' in 1999 while working on RFID supply chain tracking at P&G.',
    'easy', 1, 0, 1, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Tim Berners-Lee', false, 1, now(), now()),
    (v_q_id, 'Kevin Ashton', true, 2, now(), now()),
    (v_q_id, 'Vint Cerf', false, 3, now(), now()),
    (v_q_id, 'Mark Weiser', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the core definition of the Internet of Things (IoT)?', 'IoT is the network of physical objects embedded with sensors, actuators, and communication tech to sense and interact with the physical world.',
    'easy', 1, 0, 2, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A global network of physical devices embedded with sensors, software, and connectivity to exchange data', true, 1, now(), now()),
    (v_q_id, 'A proprietary operating system for mainframe computers', false, 2, now(), now()),
    (v_q_id, 'A software program solely for editing photographs', false, 3, now(), now()),
    (v_q_id, 'A high-speed fiber optic cable standard', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What was the famous conceptual precursor to IoT that connected a toaster to the internet in 1990?', 'John Romkey created the first internet-connected toaster in 1990 at Interop, which could be turned on/off via SNMP over the internet.',
    'medium', 1, 0, 3, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'John Romkey''s Internet Toaster', true, 1, now(), now()),
    (v_q_id, 'The Trojan Room Coffee Pot', false, 2, now(), now()),
    (v_q_id, 'The Carnegie Mellon Coke Machine', false, 3, now(), now()),
    (v_q_id, 'ARPANET Weather Sensor', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What was the Trojan Room Coffee Pot at Cambridge University famous for in IoT history?', 'In 1991, researchers at Cambridge set up a network camera pointed at the Trojan Room coffee pot so employees could monitor coffee levels from their desks.',
    'medium', 1, 0, 4, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The first network-connected webcam monitoring coffee levels', true, 1, now(), now()),
    (v_q_id, 'The first automated espresso machine', false, 2, now(), now()),
    (v_q_id, 'A military communications satellite', false, 3, now(), now()),
    (v_q_id, 'The first computerized banking ATM', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary difference between IoT and M2M (Machine-to-Machine)?', 'M2M typically refers to point-to-point communication between dedicated machines, whereas IoT leverages open IP standards, cloud computing, and horizontal multi-system integration.',
    'medium', 1, 0, 5, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'M2M typically uses point-to-point isolated cellular/wired links; IoT integrates open IP networks, cloud platforms, and big data analytics', true, 1, now(), now()),
    (v_q_id, 'M2M uses the public internet while IoT does not', false, 2, now(), now()),
    (v_q_id, 'M2M is solely software while IoT is solely hardware', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In IoT architectures, what is the primary role of the Perception/Sensing Layer?', 'The Perception layer is the physical interface to the real world, converting physical phenomena (temperature, pressure) into electrical signals.',
    'easy', 1, 0, 6, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Collecting physical environmental data via sensors and executing physical commands via actuators', true, 1, now(), now()),
    (v_q_id, 'Executing deep learning model training', false, 2, now(), now()),
    (v_q_id, 'Managing user billing subscriptions', false, 3, now(), now()),
    (v_q_id, 'Displaying GUI dashboards to end users', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the three layers in the basic foundational IoT architectural model?', 'The fundamental 3-layer IoT architecture consists of the Perception (Sensing) Layer, Network (Transmission) Layer, and Application Layer.',
    'easy', 1, 0, 7, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Perception Layer, Network Layer, Application Layer', true, 1, now(), now()),
    (v_q_id, 'Presentation Layer, Session Layer, Transport Layer', false, 2, now(), now()),
    (v_q_id, 'Client Layer, Server Layer, Database Layer', false, 3, now(), now()),
    (v_q_id, 'Input Layer, Processing Layer, Storage Layer', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the ITU-T IoT Reference Model, what are the four distinct planes?', 'ITU-T Y.2060 specifies: Device layer, Network layer, Service Support & Application Support layer, and Application layer, alongside management and security capabilities.',
    'hard', 1, 0, 8, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Application, Service Support & Application Support, Network, and Device planes', true, 1, now(), now()),
    (v_q_id, 'Hardware, Software, Firmware, and Cloud planes', false, 2, now(), now()),
    (v_q_id, 'Kernel, User, Memory, and Disk planes', false, 3, now(), now()),
    (v_q_id, 'Physical, Logical, Virtual, and Meta planes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the Cisco IoT Reference Model, how many logical levels are defined?', 'The Cisco IoT World Forum Reference Model defines 7 levels: Physical Devices, Connectivity, Edge Computing, Data Accumulation, Data Abstraction, Application, and Collaboration/Processes.',
    'medium', 1, 0, 9, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '3 Levels', false, 1, now(), now()),
    (v_q_id, '5 Levels', false, 2, now(), now()),
    (v_q_id, '7 Levels', true, 3, now(), now()),
    (v_q_id, '10 Levels', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the Cisco 7-Level IoT Reference Model, what occurs at Level 3 (Edge Computing)?', 'Level 3 (Edge Computing) performs initial data filtering, aggregation, and anomaly detection at the edge before WAN transmission.',
    'medium', 1, 0, 10, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Data formatting and packet evaluation close to the sensors to reduce cloud data volume', true, 1, now(), now()),
    (v_q_id, 'Physical fabrication of silicon chips', false, 2, now(), now()),
    (v_q_id, 'Displaying executive reports to the CEO', false, 3, now(), now()),
    (v_q_id, 'Archiving tape backups for 10 years', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an ''IoT Gateway''?', 'An IoT Gateway translates heterogeneous local sensor communication protocols (e.g., Modbus, Zigbee) into standard IP packets (MQTT over TCP) for cloud ingestion.',
    'easy', 1, 0, 11, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A device that bridges constrained local IoT sensor networks (Zigbee, BLE) with IP-based wide-area networks (WAN, Cloud)', true, 1, now(), now()),
    (v_q_id, 'A physical security door in a data center', false, 2, now(), now()),
    (v_q_id, 'A software compiler for C++', false, 3, now(), now()),
    (v_q_id, 'A billing portal for credit card authorization', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Constrained Device'' mean in the context of IoT?', 'Constrained devices (RFC 7228 Class 0/1/2) have 8-bit or 32-bit MCUs, single-digit kilobytes of RAM, and must run on coin-cell batteries for years.',
    'easy', 1, 0, 12, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A device with severely limited processing power, volatile memory (RAM), storage, and battery power', true, 1, now(), now()),
    (v_q_id, 'A device locked inside a physical cabinet', false, 2, now(), now()),
    (v_q_id, 'A device running Windows Server 2022', false, 3, now(), now()),
    (v_q_id, 'A device connected to a 10Gbps fiber connection', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary challenge posed by the ''Data Deluge'' in IoT systems?', 'Billions of IoT nodes continuously emitting telemetry at millisecond intervals create staggering data volumes requiring edge filtering and stream processing.',
    'medium', 1, 0, 13, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Massive high-velocity streams of unstructured sensor telemetry overwhelming network bandwidth and centralized cloud ingestion pipelines', true, 1, now(), now()),
    (v_q_id, 'Lack of sufficient computer monitors', false, 2, now(), now()),
    (v_q_id, 'Sensors running too cold in data centers', false, 3, now(), now()),
    (v_q_id, 'Too few cables available in stores', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Smart Object'' in IoT terminology?', 'A Smart Object combines sensing/actuation, computational processing, and network communication in an integrated physical package.',
    'easy', 1, 0, 14, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical item equipped with a sensor/actuator, a micro-controller, a power supply, and a communication interface', true, 1, now(), now()),
    (v_q_id, 'Any smartphone manufactured after 2020', false, 2, now(), now()),
    (v_q_id, 'A flat-screen television with HDMI', false, 3, now(), now()),
    (v_q_id, 'A passive RFID tag with no memory', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What role does ''Digitization'' play in the transformation of modern industrial IoT?', 'Digitization converts physical physical machine vibrations, temperatures, and operations into digital telemetry, enabling real-time algorithmic control.',
    'medium', 1, 0, 15, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Converting analog physical processes and mechanical telemetry into digital data streams for automated analysis', true, 1, now(), now()),
    (v_q_id, 'Scanning paper documents into PDF files', false, 2, now(), now()),
    (v_q_id, 'Replacing keyboards with computer mice', false, 3, now(), now()),
    (v_q_id, 'Using digital clocks in offices', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary difference between physical design and logical design in IoT?', 'Physical design deals with the physical things and network protocol stacks; Logical design specifies abstract functional blocks, communication models, and application APIs.',
    'medium', 1, 0, 16, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Physical design covers hardware nodes, sensors, and protocols; Logical design covers functional blocks, communication models, and APIs', true, 1, now(), now()),
    (v_q_id, 'Physical design is software; Logical design is hardware', false, 2, now(), now()),
    (v_q_id, 'Physical design covers databases; Logical design covers wires', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which IoT functional block handles user identity, device discovery, and network topology tracking?', 'The Device Management functional block coordinates device provisioning, OTA firmware updates, health monitoring, and security credentials.',
    'medium', 1, 0, 17, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Device Management Block', true, 1, now(), now()),
    (v_q_id, 'Application Block', false, 2, now(), now()),
    (v_q_id, 'Power Conditioning Block', false, 3, now(), now()),
    (v_q_id, 'Actuator Driver Block', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In IoT communication models, what is the Request-Response model?', 'In Request-Response (e.g., HTTP), the client initiates a request to the server, and the server replies with the requested resource.',
    'easy', 1, 0, 18, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A client sends a request to a server, and the server fetches data and sends back a response synchronously or asynchronously', true, 1, now(), now()),
    (v_q_id, 'Sensors publish data to a broker without knowing who reads it', false, 2, now(), now()),
    (v_q_id, 'A server pushes data continuously to a passive device', false, 3, now(), now()),
    (v_q_id, 'Two devices exchange encrypted keys indefinitely', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the Publish-Subscribe (Pub/Sub) communication model, what is the role of the ''Broker''?', 'In Pub/Sub (MQTT), the Broker completely decouples publishers from subscribers, routing payloads based on hierarchical topic strings.',
    'easy', 1, 0, 19, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An intermediary server that receives messages from publishers and routes them to subscribed clients based on topics', true, 1, now(), now()),
    (v_q_id, 'A financial consultant managing cryptocurrency', false, 2, now(), now()),
    (v_q_id, 'A physical cable connecting two sensors', false, 3, now(), now()),
    (v_q_id, 'A compiler that translates C into assembly', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Push-Pull communication model in IoT?', 'In Push-Pull, data producers push items into queues (e.g., Apache Kafka / RabbitMQ), and consumer workers pull messages at their own processing rate.',
    'medium', 1, 0, 20, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Publishers push messages into a shared queue, and consumers pull messages from the queue asynchronously', true, 1, now(), now()),
    (v_q_id, 'Two sensors physically pushing against each other', false, 2, now(), now()),
    (v_q_id, 'A server continuously pinging a dead client', false, 3, now(), now()),
    (v_q_id, 'A database deleting old records', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Exclusive Pair communication model?', 'Exclusive Pair (WebSockets) maintains a persistent, open full-duplex TCP connection between client and server for real-time low-latency exchanges.',
    'medium', 1, 0, 21, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A bidirectional, fully duplex communication channel established between a client and a server (e.g., WebSockets)', true, 1, now(), now()),
    (v_q_id, 'A device that only works with one specific brand of battery', false, 2, now(), now()),
    (v_q_id, 'Two sensors monitoring the same temperature', false, 3, now(), now()),
    (v_q_id, 'A redundant backup server', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is REST (Representational State Transfer) in IoT Communication APIs?', 'RESTful APIs allow IoT devices and cloud platforms to interact using standard web verbs and URIs, typically serializing state in JSON.',
    'easy', 1, 0, 22, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A stateless architectural style that uses HTTP methods (GET, POST, PUT, DELETE) to manipulate device resources via URIs', true, 1, now(), now()),
    (v_q_id, 'A protocol for putting microcontroller chips to sleep', false, 2, now(), now()),
    (v_q_id, 'A proprietary protocol owned by IBM', false, 3, now(), now()),
    (v_q_id, 'A real-time binary audio codec', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do WebSocket APIs differ from REST APIs in constrained IoT deployments?', 'WebSockets eliminate the recurring overhead of HTTP request-response headers by keeping a bidirectional, persistent socket open.',
    'medium', 1, 0, 23, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'WebSockets maintain a single persistent TCP connection with minimal 2-byte framing overhead, whereas REST incurs repeated HTTP header overhead', true, 1, now(), now()),
    (v_q_id, 'WebSockets are only for audio streaming', false, 2, now(), now()),
    (v_q_id, 'REST is always faster than WebSockets', false, 3, now(), now()),
    (v_q_id, 'WebSockets do not support encryption', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Level 1 IoT Deployment in standard IoT level taxonomies?', 'IoT Level 1 consists of a single node/device that performs sensing, local data analysis, local storage, and local control (e.g., smart home thermostat).',
    'medium', 1, 0, 24, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A single node that senses, analyzes, stores data locally, and provides local monitoring via an attached GUI', true, 1, now(), now()),
    (v_q_id, 'A global multi-cloud distributed system', false, 2, now(), now()),
    (v_q_id, 'A cluster of 1,000 edge nodes with Kafka streaming', false, 3, now(), now()),
    (v_q_id, 'A deep space satellite array', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Level 5 IoT Deployment?', 'IoT Level 5 involves multiple end-nodes, a centralized cloud storage repository, cloud analytics/ML, and edge coordinators managing local telemetry.',
    'hard', 1, 0, 25, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Multiple end nodes, an edge coordinator, and cloud-based data storage and machine learning analytics', true, 1, now(), now()),
    (v_q_id, 'A single microcontroller without internet access', false, 2, now(), now()),
    (v_q_id, 'Two computers connected via a crossover ethernet cable', false, 3, now(), now()),
    (v_q_id, 'A quantum computer executing Shor''s algorithm', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary constraint of Level 6 IoT Deployment?', 'IoT Level 6 represents high-throughput industrial and smart city deployments where distributed sensors stream into real-time Complex Event Processing (CEP) and automated actuation.',
    'hard', 1, 0, 26, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'High-velocity streaming data requiring complex distributed cloud analytics, real-time CEP engines, and automated multi-actuator feedback loops', true, 1, now(), now()),
    (v_q_id, 'Lack of wireless sensors', false, 2, now(), now()),
    (v_q_id, 'Only supporting 8-bit microprocessors', false, 3, now(), now()),
    (v_q_id, 'Inability to use web browsers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the role of an ''Actuator'' in an IoT system?', 'While sensors detect physical properties, actuators take action (e.g., opening a valve, starting an electric motor, turning on a relay).',
    'easy', 1, 0, 27, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A hardware component that converts electrical control signals into physical mechanical motion, heat, light, or force', true, 1, now(), now()),
    (v_q_id, 'A software program that compiles Python scripts', false, 2, now(), now()),
    (v_q_id, 'A sensor that measures humidity', false, 3, now(), now()),
    (v_q_id, 'An optical fiber cable', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between an Active Sensor and a Passive Sensor?', 'Active sensors emit energy into the environment and measure the return reflection; passive sensors directly absorb ambient energy.',
    'medium', 1, 0, 28, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Active sensors require an external power source to emit a probe signal (e.g., radar, ultrasonic); Passive sensors detect existing ambient energy (e.g., photodiode, thermocouple)', true, 1, now(), now()),
    (v_q_id, 'Active sensors run software; passive sensors do not', false, 2, now(), now()),
    (v_q_id, 'Active sensors are larger than passive sensors', false, 3, now(), now()),
    (v_q_id, 'Active sensors only work on weekends', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Transducer?', 'Transducers convert physical phenomena into electrical signals (sensors) or electrical signals into physical actions (actuators).',
    'easy', 1, 0, 29, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical device that converts one form of energy into another (encompasses both sensors and actuators)', true, 1, now(), now()),
    (v_q_id, 'A software firewall', false, 2, now(), now()),
    (v_q_id, 'A cloud load balancer', false, 3, now(), now()),
    (v_q_id, 'A binary compiler', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Signal Conditioning in IoT hardware frontends?', 'Signal conditioning involves operational amplifiers, low-pass filters, and analog-to-digital converters to clean noisy, low-voltage analog inputs.',
    'medium', 1, 0, 30, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Manipulating analog sensor signals (amplification, filtering, ADC conversion) to make them suitable for MCU processing', true, 1, now(), now()),
    (v_q_id, 'Training a neural network model', false, 2, now(), now()),
    (v_q_id, 'Encrypting passwords with SHA-256', false, 3, now(), now()),
    (v_q_id, 'Installing an operating system', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Analog-to-Digital Conversion (ADC) resolution?', 'A 10-bit ADC provides $2^{10} = 1024$ discrete voltage steps, while a 12-bit ADC provides 4096 steps, determining sensing measurement precision.',
    'medium', 1, 0, 31, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The number of discrete digital quantization levels (bits) used to represent the continuous analog voltage range', true, 1, now(), now()),
    (v_q_id, 'The screen resolution of the IoT monitor', false, 2, now(), now()),
    (v_q_id, 'The clock frequency of the Wi-Fi chip', false, 3, now(), now()),
    (v_q_id, 'The speed of the network router', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which open-source hardware prototyping platform popularized physical computing using an ATmega328P microcontroller?', 'The Arduino platform introduced accessible C/C++ physical computing and hardware interfacing using 8-bit AVR microcontrollers.',
    'easy', 1, 0, 32, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Arduino Uno', true, 1, now(), now()),
    (v_q_id, 'Raspberry Pi 4', false, 2, now(), now()),
    (v_q_id, 'NVIDIA Jetson Nano', false, 3, now(), now()),
    (v_q_id, 'Apple Mac Mini', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does a Single Board Computer (SBC) like Raspberry Pi differ from a Microcontroller Board like Arduino?', 'Raspberry Pi is a full computer with an SoC running a multi-tasking OS (Linux); Arduino is a dedicated real-time microcontroller executing a single firmware loop.',
    'easy', 1, 0, 33, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Raspberry Pi runs a full operating system (Linux) on an ARM microprocessor; Arduino runs bare-metal firmware or RTOS on a microcontroller', true, 1, now(), now()),
    (v_q_id, 'Arduino has more RAM than Raspberry Pi', false, 2, now(), now()),
    (v_q_id, 'Raspberry Pi cannot connect to the internet', false, 3, now(), now()),
    (v_q_id, 'Arduino runs 64-bit Windows', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the ESP8266 / ESP32 famous for in the IoT maker and industrial communities?', 'Espressif''s ESP8266 and ESP32 revolutionised IoT by bundling Wi-Fi, Bluetooth, dual-core processors, and low-power sleep modes onto a sub-$3 module.',
    'easy', 1, 0, 34, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Providing low-cost, high-performance 32-bit compute with integrated Wi-Fi and Bluetooth on a single SoC', true, 1, now(), now()),
    (v_q_id, 'The first mechanical relay computer', false, 2, now(), now()),
    (v_q_id, 'A supercomputer used for nuclear simulations', false, 3, now(), now()),
    (v_q_id, 'A proprietary Apple chip', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Deep Sleep mode in battery-powered IoT microcontrollers?', 'Deep sleep reduces current draw to $5 - 15\,\mu\text{A}$, allowing coin-cell powered sensors to run for years by waking up only briefly on timers or interrupts.',
    'medium', 1, 0, 35, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A power-saving state where the CPU core, clocks, and high-frequency peripherals are turned off, consuming microamperes ($\mu\text{A}$)', true, 1, now(), now()),
    (v_q_id, 'A state where the screen turns black', false, 2, now(), now()),
    (v_q_id, 'A computer crashing and restarting', false, 3, now(), now()),
    (v_q_id, 'A software bug in the operating system', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an ''Edge Compute Stack'' in IoT data management?', 'The Edge Compute Stack includes containerized microservices (Docker/EdgeX Foundry) executing local filtering, inference, and buffering close to the data source.',
    'medium', 1, 0, 36, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The software layers on edge gateways handling protocol parsing, data normalization, stream analytics, and local storage', true, 1, now(), now()),
    (v_q_id, 'The physical stacking of server chassis in a rack', false, 2, now(), now()),
    (v_q_id, 'A database index structure', false, 3, now(), now()),
    (v_q_id, 'The list of employees managing servers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In IoT data management, what is ''Complex Event Processing'' (CEP)?', 'CEP engines (e.g., Apache Flink, Esper) evaluate sliding time windows across heterogeneous streams to trigger instant alert thresholds.',
    'hard', 1, 0, 37, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Analyzing continuous streams of multiple sensor events in real-time to detect meaningful patterns, temporal sequences, and anomalies', true, 1, now(), now()),
    (v_q_id, 'Backing up hard drives to magnetic tape', false, 2, now(), now()),
    (v_q_id, 'Formatting an SD card', false, 3, now(), now()),
    (v_q_id, 'Writing a simple SQL SELECT statement', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the function of a Real-Time Operating System (RTOS) like FreeRTOS or Zephyr in IoT?', 'An RTOS guarantees predictable execution timing (deterministic deadlines) and lightweight multithreading within kilobytes of RAM.',
    'medium', 1, 0, 38, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Providing deterministic task scheduling, minimal interrupt latency, and tiny memory footprint for microcontrollers', true, 1, now(), now()),
    (v_q_id, 'Running office productivity suites like Word and Excel', false, 2, now(), now()),
    (v_q_id, 'Displaying 4K video animations', false, 3, now(), now()),
    (v_q_id, 'Managing web hosting billing systems', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Watchdog Timer (WDT) in IoT embedded nodes?', 'If the firmware fails to periodically reset (''kick'') the Watchdog Timer due to an infinite loop or deadlock, the WDT triggers a full hardware reboot.',
    'medium', 1, 0, 39, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A hardware timer that automatically resets the microcontroller if the firmware hangs, deadlocks, or crashes', true, 1, now(), now()),
    (v_q_id, 'A digital clock on the wall of a data center', false, 2, now(), now()),
    (v_q_id, 'A stopwatch used during athletic training', false, 3, now(), now()),
    (v_q_id, 'A tool for measuring network latency', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Firmware Over-The-Air (FOTA) update in IoT deployments?', 'FOTA allows fleet operators to remotely patch security vulnerabilities, update algorithms, and fix bugs across millions of deployed devices.',
    'easy', 1, 0, 40, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Wireless transmission and flashing of new firmware binaries to remote IoT devices without requiring physical physical access', true, 1, now(), now()),
    (v_q_id, 'Upgrading antennas with larger copper wires', false, 2, now(), now()),
    (v_q_id, 'Broadcasting FM radio signals', false, 3, now(), now()),
    (v_q_id, 'Replacing batteries manually', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an ''A/B Partition'' layout in robust IoT FOTA update architectures?', 'Dual-bank A/B partitioning prevents ''bricking'' devices by allowing rollback to Partition B if the newly flashed Partition A fails cryptographic or boot checks.',
    'hard', 1, 0, 41, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Maintaining two independent flash memory partitions so the device can boot into the previous working firmware if the new update fails or gets corrupted', true, 1, now(), now()),
    (v_q_id, 'Dividing sensor data into alpha and beta testing', false, 2, now(), now()),
    (v_q_id, 'Formatting a disk with FAT32 and NTFS', false, 3, now(), now()),
    (v_q_id, 'Splitting code between two developers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Sensor Fusion'' in advanced IoT perception systems?', 'Sensor fusion algorithms (e.g., Kalman Filters) integrate accelerometer, gyroscope, and magnetometer readings to compute precise 3D spatial orientation.',
    'hard', 1, 0, 42, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Combining sensory data derived from disparate sources to produce information with less uncertainty than would be possible individually', true, 1, now(), now()),
    (v_q_id, 'Physically melting two sensors together with heat', false, 2, now(), now()),
    (v_q_id, 'Connecting two wires with solder', false, 3, now(), now()),
    (v_q_id, 'Deleting duplicate sensor readings', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Inertial Measurement Unit (IMU)?', 'IMUs are essential for tracking motion, robotics orientation, drone stability, and industrial vibration analytics.',
    'easy', 1, 0, 43, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An electronic device that measures and reports a body''s specific force, angular rate, and magnetic field using accelerometers, gyroscopes, and magnetometers', true, 1, now(), now()),
    (v_q_id, 'A device that measures room temperature', false, 2, now(), now()),
    (v_q_id, 'A cloud server that stores financial logs', false, 3, now(), now()),
    (v_q_id, 'A power supply regulator', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a MEMS (Micro-Electro-Mechanical Systems) sensor?', 'MEMS technology enables microscopic silicon gyroscopes, accelerometers, and pressure transducers to be mass-manufactured at pennies per chip.',
    'medium', 1, 0, 44, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Microscopic integrated devices combining mechanical elements, sensors, and electronic circuits on a common silicon substrate', true, 1, now(), now()),
    (v_q_id, 'A mechanical clock mechanism', false, 2, now(), now()),
    (v_q_id, 'A large hydraulic industrial pump', false, 3, now(), now()),
    (v_q_id, 'An optical fiber repeater', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary cause of battery degradation in outdoor IoT deployments?', 'Wireless transmissions (radio Tx/Rx) consume $> 80\%$ of battery energy, and freezing/blistering temperatures severely degrade Li-ion/LiSOCl2 cell capacity.',
    'medium', 1, 0, 45, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Extreme temperature fluctuations affecting battery chemistry and frequent un-throttled wireless radio transmissions', true, 1, now(), now()),
    (v_q_id, 'Too many files saved on flash storage', false, 2, now(), now()),
    (v_q_id, 'Dust accumulating on plastic enclosures', false, 3, now(), now()),
    (v_q_id, 'Reading analog sensors too accurately', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Energy Harvesting in zero-power IoT nodes?', 'Energy harvesting leverages ambient kinetic vibrations (piezoelectric), light (photovoltaic), or heat differentials (Peltier/Seebeck) for perpetual battery-less operation.',
    'medium', 1, 0, 46, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Capturing ambient energy from the surrounding environment (solar, thermal gradients, vibrations, RF waves) to power the node without batteries', true, 1, now(), now()),
    (v_q_id, 'Burning coal to generate electricity', false, 2, now(), now()),
    (v_q_id, 'Plugging sensors into high-voltage wall outlets', false, 3, now(), now()),
    (v_q_id, 'Charging batteries manually every night', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary advantage of Time-Series Databases (TSDB) like InfluxDB or TimescaleDB for IoT?', 'TSDBs leverage specialized indexing and delta-of-delta compression to ingest and query millions of sequential sensor metrics per second efficiently.',
    'medium', 1, 0, 47, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Optimized for high-throughput write ingestion, compression, and time-bucket aggregations on timestamped sensor records', true, 1, now(), now()),
    (v_q_id, 'They only store image files', false, 2, now(), now()),
    (v_q_id, 'They do not require memory', false, 3, now(), now()),
    (v_q_id, 'They are strictly written in JavaScript', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Ambient Sensor?', 'Ambient sensors track surrounding environmental parameters without directly contacting target physical substances.',
    'easy', 1, 0, 48, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A sensor that measures external ambient environmental parameters (temperature, humidity, ambient light, air quality)', true, 1, now(), now()),
    (v_q_id, 'A sensor that only works in musical theaters', false, 2, now(), now()),
    (v_q_id, 'A sensor that monitors CPU fan speeds inside servers', false, 3, now(), now()),
    (v_q_id, 'A microphone recording podcast audio', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Digital Twin in IoT architecture?', 'A Digital Twin uses live sensor telemetry to simulate, analyze, predict, and optimize the operational state of physical machinery (e.g., jet engines, wind turbines).',
    'medium', 1, 0, 49, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A dynamic virtual software replica of a physical asset, process, or system that mirrors its real-world telemetry and behavior in real-time', true, 1, now(), now()),
    (v_q_id, 'Two identical physical sensors mounted on the same wall', false, 2, now(), now()),
    (v_q_id, 'A backup copy of an operating system ISO', false, 3, now(), now()),
    (v_q_id, 'A developer who writes code identical to another developer', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What constitutes the primary difference between Northbound and Southbound APIs in IoT gateways?', 'In gateway engineering, Southbound protocols communicate down to constrained field devices, while Northbound protocols bridge aggregated data up to enterprise cloud systems.',
    'hard', 1, 0, 50, ARRAY['BCA-306N', 'Unit-1', 'BCA-306N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Southbound APIs interface downward with physical sensors and field buses (Modbus, CAN, Zigbee); Northbound APIs interface upward with cloud platforms (MQTT, REST)', true, 1, now(), now()),
    (v_q_id, 'Northbound interfaces with power supplies; Southbound interfaces with cooling', false, 2, now(), now()),
    (v_q_id, 'Northbound is solely for Windows; Southbound is for Linux', false, 3, now(), now()),
    (v_q_id, 'There is no distinction', false, 4, now(), now());

END $SEEDED_BLOCK$;
