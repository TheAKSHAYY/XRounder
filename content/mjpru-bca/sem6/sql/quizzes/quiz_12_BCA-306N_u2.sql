DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-306N Unit 2 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '68abe907-5dc7-555e-8a8a-306b1b00ea60', 'BCA-306N Unit 2: Engineering for IoT Networks and Protocols Practice Quiz (50 MCQs)', 'bca-306n-u2-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-306N Unit 2. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is IEEE 802.15.4 in IoT network engineering?', 'IEEE 802.15.4 is the fundamental PHY/MAC standard designed for low-power, low-data-rate, short-range wireless communications (basis for Zigbee, 6LoWPAN, Thread).',
    'easy', 1, 0, 1, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A technical standard defining the Physical layer and MAC sublayer for low-rate wireless personal area networks (LR-WPANs)', true, 1, now(), now()),
    (v_q_id, 'A high-speed fiber optic networking standard', false, 2, now(), now()),
    (v_q_id, 'A protocol for satellite television broadcasting', false, 3, now(), now()),
    (v_q_id, 'A standard for USB-C cables', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the typical maximum data rate of IEEE 802.15.4 at the 2.4 GHz ISM band?', 'At 2.4 GHz, IEEE 802.15.4 operates at a maximum data throughput of 250 kbps using O-QPSK modulation across 16 channels.',
    'medium', 1, 0, 2, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '250 kbps', true, 1, now(), now()),
    (v_q_id, '54 Mbps', false, 2, now(), now()),
    (v_q_id, '1 Gbps', false, 3, now(), now()),
    (v_q_id, '10 kbps', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is 6LoWPAN?', '6LoWPAN (RFC 4944 / RFC 6282) provides an adaptation layer that enables IPv6 packets to be transmitted over constrained IEEE 802.15.4 frames.',
    'easy', 1, 0, 3, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'IPv6 over Low-Power Wireless Personal Area Networks', true, 1, now(), now()),
    (v_q_id, 'A 6-node local area network', false, 2, now(), now()),
    (v_q_id, 'A 64-bit encryption algorithm', false, 3, now(), now()),
    (v_q_id, 'A low-power Bluetooth headset profile', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why is an adaptation layer required by 6LoWPAN between IPv6 and IEEE 802.15.4?', '6LoWPAN performs packet fragmentation, reassembly, and stateful header compression (compressing 40-byte IPv6 headers down to 2–4 bytes) to fit into 127-byte frames.',
    'hard', 1, 0, 4, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'IPv6 requires an MTU of at least 1280 bytes, whereas IEEE 802.15.4 has a maximum physical payload size of only 127 bytes', true, 1, now(), now()),
    (v_q_id, 'IPv6 uses letters while 802.15.4 only uses numbers', false, 2, now(), now()),
    (v_q_id, 'To convert analog audio into digital packets', false, 3, now(), now()),
    (v_q_id, 'Because IPv6 is owned by Microsoft', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Zigbee?', 'Zigbee builds Network and Application layers on top of IEEE 802.15.4, supporting self-healing mesh networking with up to 65,000 nodes.',
    'easy', 1, 0, 5, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A high-level communication protocol suite based on IEEE 802.15.4 used for low-power, low-bandwidth personal and home mesh networks', true, 1, now(), now()),
    (v_q_id, 'A brand of cellular smartphone', false, 2, now(), now()),
    (v_q_id, 'An operating system for supercomputers', false, 3, now(), now()),
    (v_q_id, 'A programming language developed by Google', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the three device types in a Zigbee mesh network?', 'Zigbee networks consist of exactly one Coordinator (forms network, stores keys), Routers (pass traffic, mains powered), and End Devices (sleep, battery powered).',
    'medium', 1, 0, 6, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Coordinator, Router, and End Device', true, 1, now(), now()),
    (v_q_id, 'Master, Slave, and Repeater', false, 2, now(), now()),
    (v_q_id, 'Server, Client, and Gateway', false, 3, now(), now()),
    (v_q_id, 'Transmitter, Receiver, and Amplifier', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is LoRa (Long Range) and LoRaWAN?', 'LoRa provides the physical radio modulation (Semtech); LoRaWAN governs the regional networking, star-of-stars topology, and encryption architecture.',
    'medium', 1, 0, 7, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'LoRa is a proprietary physical chirped spread-spectrum (CSS) modulation; LoRaWAN is the open MAC and network protocol standard for LPWANs', true, 1, now(), now()),
    (v_q_id, 'LoRa is a software company; LoRaWAN is a hardware chip', false, 2, now(), now()),
    (v_q_id, 'LoRa is a short-range infrared system', false, 3, now(), now()),
    (v_q_id, 'A protocol used strictly inside computer motherboards', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the typical communication range of LoRaWAN in rural vs urban environments?', 'LoRaWAN offers extraordinary link budgets ($> 150\,\text{dB}$) capable of spanning up to 15 kilometers in rural environments on low power.',
    'easy', 1, 0, 8, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '10–15 km in rural open terrain; 2–5 km in dense urban environments', true, 1, now(), now()),
    (v_q_id, '100 meters maximum', false, 2, now(), now()),
    (v_q_id, '500 kilometers via satellite only', false, 3, now(), now()),
    (v_q_id, '10 centimeters', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Bluetooth Low Energy (BLE / Bluetooth Smart)?', 'BLE operates in the 2.4 GHz band, optimizing connection establishment ($< 3\,\text{ms}$) and low duty-cycle bursts to run on coin cells for years.',
    'easy', 1, 0, 9, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A wireless personal area network technology designed for very low power consumption and duty cycles, distinct from classic Bluetooth', true, 1, now(), now()),
    (v_q_id, 'A Bluetooth version that transmits uncompressed video', false, 2, now(), now()),
    (v_q_id, 'A wired audio cable specification', false, 3, now(), now()),
    (v_q_id, 'A protocol for automotive radar', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Generic Attribute Profile (GATT) in BLE architecture?', 'GATT governs the organization of data in BLE: a Server exposes Services (collections of data), which contain Characteristics (atomic values like Heart Rate).',
    'medium', 1, 0, 10, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A service-and-characteristic hierarchy that defines how two BLE devices transfer data using Services, Characteristics, and Descriptors', true, 1, now(), now()),
    (v_q_id, 'A graphical user interface layout manager', false, 2, now(), now()),
    (v_q_id, 'A tool for calibrating antenna power', false, 3, now(), now()),
    (v_q_id, 'A battery voltage testing algorithm', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is MQTT (Message Queuing Telemetry Transport)?', 'MQTT (invented by Andy Stanford-Clark and Arlen Nipper in 1999) runs over TCP/IP, featuring a tiny 2-byte fixed header ideal for telemetry.',
    'easy', 1, 0, 11, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A lightweight, publish-subscribe network protocol designed for constrained devices and low-bandwidth, high-latency, or unreliable networks', true, 1, now(), now()),
    (v_q_id, 'A database management engine developed by Oracle', false, 2, now(), now()),
    (v_q_id, 'A video conferencing protocol', false, 3, now(), now()),
    (v_q_id, 'An encryption algorithm used in military radios', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the three Quality of Service (QoS) levels in MQTT?', 'MQTT QoS levels define delivery guarantees: QoS 0 (fire and forget), QoS 1 (acknowledged delivery, possible duplicates), QoS 2 (4-way handshake, no duplicates).',
    'medium', 1, 0, 12, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'QoS 0 (At most once), QoS 1 (At least once), and QoS 2 (Exactly once)', true, 1, now(), now()),
    (v_q_id, 'QoS Low, QoS Medium, and QoS High', false, 2, now(), now()),
    (v_q_id, 'QoS 1 (Bronze), QoS 2 (Silver), QoS 3 (Gold)', false, 3, now(), now()),
    (v_q_id, 'QoS Fast, QoS Normal, QoS Secure', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In MQTT, what is a ''Last Will and Testament'' (LWT) message?', 'If a client unexpectedly drops connection (TCP keepalive timeout), the Broker immediately broadcasts its pre-registered LWT message to notify subscribers of node failure.',
    'medium', 1, 0, 13, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A message registered with the broker during connection that the broker automatically publishes to a topic if the client disconnects ungracefully', true, 1, now(), now()),
    (v_q_id, 'A legal document signed by the developer', false, 2, now(), now()),
    (v_q_id, 'A notification sent when a battery reaches 0%', false, 3, now(), now()),
    (v_q_id, 'A message that deletes all user data', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the default unencrypted and encrypted port for standard MQTT traffic?', 'MQTT standardizes port 1883 for cleartext TCP traffic and port 8883 for secure TLS/SSL encrypted traffic.',
    'medium', 1, 0, 14, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Port 1883 (TCP) and Port 8883 (TLS/SSL)', true, 1, now(), now()),
    (v_q_id, 'Port 80 and Port 443', false, 2, now(), now()),
    (v_q_id, 'Port 21 and Port 22', false, 3, now(), now()),
    (v_q_id, 'Port 3306 and Port 5432', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is CoAP (Constrained Application Protocol)?', 'CoAP (RFC 7252) provides a RESTful request/response model over UDP, using tiny 4-byte binary headers and optional asynchronous transaction tracking.',
    'easy', 1, 0, 15, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A specialized web transfer protocol for constrained nodes and constrained networks, designed as a lightweight UDP alternative to HTTP', true, 1, now(), now()),
    (v_q_id, 'A protocol for streaming high-definition television', false, 2, now(), now()),
    (v_q_id, 'A compiler optimization tool', false, 3, now(), now()),
    (v_q_id, 'A proprietary Cisco firewall standard', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why does CoAP use UDP as its default transport layer instead of TCP?', 'TCP''s connection-oriented handshake, keepalive packets, and heavy sliding window state overhead overwhelm 8-bit/16-bit microcontrollers, making UDP ideal.',
    'medium', 1, 0, 16, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To eliminate the three-way handshake overhead, packet size bloat, and connection state maintenance of TCP on constrained microcontrollers', true, 1, now(), now()),
    (v_q_id, 'Because UDP has better encryption than TCP', false, 2, now(), now()),
    (v_q_id, 'Because TCP was discontinued in 2020', false, 3, now(), now()),
    (v_q_id, 'Because UDP guarantees zero packet loss', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the four message types supported by CoAP?', 'CoAP provides reliability over UDP via message types: CON requires an ACK; NON is unacknowledged; RST indicates error or rejection.',
    'medium', 1, 0, 17, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Confirmable (CON), Non-confirmable (NON), Acknowledgement (ACK), and Reset (RST)', true, 1, now(), now()),
    (v_q_id, 'Get, Post, Put, and Delete', false, 2, now(), now()),
    (v_q_id, 'Start, Stop, Pause, and Resume', false, 3, now(), now()),
    (v_q_id, 'Request, Response, Error, and Terminate', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the ''Observe'' option (RFC 7641) in CoAP?', 'CoAP Observe inverts standard REST polling into a publish-subscribe-like notification stream over a single GET request.',
    'hard', 1, 0, 18, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An extension that allows clients to subscribe to a resource, receiving asynchronous state notifications whenever the resource changes', true, 1, now(), now()),
    (v_q_id, 'A feature that activates video streaming', false, 2, now(), now()),
    (v_q_id, 'A debugging tool for inspecting memory', false, 3, now(), now()),
    (v_q_id, 'A function that measures Wi-Fi signal strength', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is RPL (Routing Protocol for Low-Power and Lossy Networks)?', 'RPL (RFC 6550) is the IETF standard routing protocol for 6LoWPAN mesh networks, organizing nodes into hierarchical DODAG topologies.',
    'hard', 1, 0, 19, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A distance-vector routing protocol for LLNs that constructs Destination-Oriented Directed Acyclic Graphs (DODAGs) rooted at border routers', true, 1, now(), now()),
    (v_q_id, 'A protocol for routing video over 5G networks', false, 2, now(), now()),
    (v_q_id, 'A database query optimizer', false, 3, now(), now()),
    (v_q_id, 'A high-speed optical fiber protocol', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an ''Objective Function'' (OF) in RPL routing?', 'The Objective Function (e.g., MRHOF based on Expected Transmission Count - ETX) calculates node ''Rank'', ensuring packets flow along optimal paths toward the root.',
    'hard', 1, 0, 20, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A mathematical specification that dictates how routing metrics (link quality, hop count, residual node energy) are translated into node rank', true, 1, now(), now()),
    (v_q_id, 'The business goal of a company', false, 2, now(), now()),
    (v_q_id, 'A function that cleans noisy sensor data', false, 3, now(), now()),
    (v_q_id, 'A C++ compiler optimization flag', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is NB-IoT (Narrowband IoT)?', 'NB-IoT operates on licensed cellular carriers (in-band, guard-band, or standalone 200 kHz channels), delivering deep underground signal penetration and 10-year battery life.',
    'medium', 1, 0, 21, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A 3GPP cellular LPWAN radio standard deployed on licensed cellular spectrum bands (200 kHz bandwidth) for massive machine-type communications', true, 1, now(), now()),
    (v_q_id, 'A local Wi-Fi protocol for laptops', false, 2, now(), now()),
    (v_q_id, 'A short-range infrared remote protocol', false, 3, now(), now()),
    (v_q_id, 'A satellite communications standard', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is LTE-M (Long Term Evolution for Machines / Cat-M1)?', 'LTE-M operates on 1.4 MHz bandwidth, supporting mobile connected assets (fleet tracking, wearable devices) with handover between cell towers.',
    'medium', 1, 0, 22, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A 3GPP cellular standard offering higher bandwidth (up to 1 Mbps), voice support (VoLTE), and seamless mobility compared to NB-IoT', true, 1, now(), now()),
    (v_q_id, 'A legacy 2G protocol', false, 2, now(), now()),
    (v_q_id, 'An operating system developed for automobiles', false, 3, now(), now()),
    (v_q_id, 'A wired fiber standard', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary difference between LoRaWAN and NB-IoT regarding spectrum licensing?', 'LoRaWAN uses license-free industrial scientific and medical (ISM) frequencies, while NB-IoT requires commercial telecom cellular SIM cards and subscription plans.',
    'medium', 1, 0, 23, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'LoRaWAN operates in unlicensed ISM bands (868 MHz in Europe, 915 MHz in US); NB-IoT operates in licensed cellular operator spectrum', true, 1, now(), now()),
    (v_q_id, 'LoRaWAN requires buying expensive FCC licenses; NB-IoT is free', false, 2, now(), now()),
    (v_q_id, 'Both operate on 5 GHz Wi-Fi bands', false, 3, now(), now()),
    (v_q_id, 'Neither uses radio waves', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is AMQP (Advanced Message Queuing Protocol)?', 'AMQP (used in RabbitMQ, Azure Service Bus) provides enterprise-grade message queuing, flexible exchange routing, and robust guaranteed delivery for IoT backends.',
    'medium', 1, 0, 24, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open standard application layer protocol for message-oriented middleware, providing queuing, topic routing, and transactional message delivery', true, 1, now(), now()),
    (v_q_id, 'A protocol for controlling drone motors', false, 2, now(), now()),
    (v_q_id, 'A software program for video streaming', false, 3, now(), now()),
    (v_q_id, 'A legacy dial-up modem standard', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is XMPP (Extensible Messaging and Presence Protocol) in IoT?', 'Originally developed for instant messaging (Jabber), XMPP''s decentralized architecture and presence management are used for smart home and connected device automation.',
    'medium', 1, 0, 25, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An open XML-based communication protocol for real-time messaging, presence tracking, and multi-party chat adapted for IoT device communication', true, 1, now(), now()),
    (v_q_id, 'A programming language used in web browsers', false, 2, now(), now()),
    (v_q_id, 'A protocol for printing documents over a network', false, 3, now(), now()),
    (v_q_id, 'A high-speed database protocol', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Maximum Transmission Unit (MTU) of an IEEE 802.15.4 frame at the PHY layer?', 'The physical layer payload (PSDU) of IEEE 802.15.4 is strictly constrained to a maximum of 127 bytes.',
    'medium', 1, 0, 26, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '127 octets (bytes)', true, 1, now(), now()),
    (v_q_id, '1500 bytes', false, 2, now(), now()),
    (v_q_id, '64 kilobytes', false, 3, now(), now()),
    (v_q_id, '512 bytes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)?', 'CSMA/CA avoids destructive simultaneous transmissions on shared RF frequencies by sensing carrier energy and executing exponential random backoff delays.',
    'medium', 1, 0, 27, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A channel access protocol where nodes listen to the shared wireless medium before transmitting, backing off randomly if the channel is busy', true, 1, now(), now()),
    (v_q_id, 'A routing protocol for finding shortest paths', false, 2, now(), now()),
    (v_q_id, 'An encryption algorithm used in military radios', false, 3, now(), now()),
    (v_q_id, 'A method for charging batteries', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Thread in smart home IoT networking?', 'Thread provides self-healing, border-routed IPv6 mesh connectivity for smart home devices without requiring proprietary hubs.',
    'medium', 1, 0, 28, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An IPv6-based, low-power, secure mesh networking technology built on IEEE 802.15.4 and 6LoWPAN (used heavily in the Matter standard)', true, 1, now(), now()),
    (v_q_id, 'A multithreading feature in the Linux kernel', false, 2, now(), now()),
    (v_q_id, 'A high-speed fiber optic cable', false, 3, now(), now()),
    (v_q_id, 'A programming framework developed by Apple', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Matter in modern IoT home automation?', 'Matter (developed by the CSA) runs over Thread, Wi-Fi, and Ethernet, eliminating ecosystem fragmentation across consumer smart home vendors.',
    'easy', 1, 0, 29, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A unified, royalty-free application layer connectivity standard that enables cross-compatibility across Apple Home, Google Home, Amazon Alexa, and Samsung SmartThings', true, 1, now(), now()),
    (v_q_id, 'A physical material used to fabricate microchips', false, 2, now(), now()),
    (v_q_id, 'A software tool for compressing video', false, 3, now(), now()),
    (v_q_id, 'A cloud storage database', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Modbus in industrial automation?', 'Developed by Modicon in 1979, Modbus remains the universal standard for reading registers and coils across industrial factory instrumentation.',
    'medium', 1, 0, 30, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A legacy serial master/slave communication protocol (RS-485 / TCP) widely used for connecting industrial electronic devices to PLCs and SCADA systems', true, 1, now(), now()),
    (v_q_id, 'A modern JavaScript web framework', false, 2, now(), now()),
    (v_q_id, 'A relational database management system', false, 3, now(), now()),
    (v_q_id, 'A deep learning neural network library', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the CAN bus (Controller Area Network)?', 'Invented by Robert Bosch, CAN bus uses differential signaling (CAN High / CAN Low) to provide noise-immune, real-time message priority routing in automobiles.',
    'medium', 1, 0, 31, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A robust vehicle bus standard designed to allow microcontrollers and electronic control units (ECUs) to communicate without a host computer', true, 1, now(), now()),
    (v_q_id, 'A public Wi-Fi network in bus terminals', false, 2, now(), now()),
    (v_q_id, 'A protocol for sending text messages between phones', false, 3, now(), now()),
    (v_q_id, 'An enterprise cloud database service', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an IP Gateway vs a Protocol Translation Gateway?', 'Simple gateways perform layer 3 packet routing; protocol translation gateways terminate non-IP serial/mesh protocols and construct new IP payloads for cloud ingestion.',
    'medium', 1, 0, 32, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An IP gateway simply routes IP packets between subnets; a protocol translation gateway converts non-IP application payloads (e.g., Modbus to MQTT)', true, 1, now(), now()),
    (v_q_id, 'An IP gateway is made of metal; a translation gateway is software', false, 2, now(), now()),
    (v_q_id, 'They are identical in every way', false, 3, now(), now()),
    (v_q_id, 'An IP gateway cannot connect to the internet', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In LoRaWAN network architecture, what is the role of a ''Gateway''?', 'LoRaWAN gateways are dumb forwarders: they demodulate radio chirps and send raw encrypted frames over cellular/Ethernet to the Network Server.',
    'hard', 1, 0, 33, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A transparent packet forwarder that receives RF packets from end nodes and encapsulates them into IP packets for the central Network Server', true, 1, now(), now()),
    (v_q_id, 'A device that decrypts all application data', false, 2, now(), now()),
    (v_q_id, 'A battery charger for sensors', false, 3, now(), now()),
    (v_q_id, 'A device that stores all user passwords', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the three device classes in LoRaWAN (Class A, Class B, Class C)?', 'LoRaWAN classes trade off downlink responsiveness against battery life: Class A opens receive windows only after transmitting; Class C listens continuously on mains power.',
    'hard', 1, 0, 34, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Class A (Lowest power, downlink only after uplink), Class B (Scheduled downlink ping slots), Class C (Continuous listening, highest power)', true, 1, now(), now()),
    (v_q_id, 'Class A (Fastest), Class B (Medium), Class C (Slowest)', false, 2, now(), now()),
    (v_q_id, 'Class A (Commercial), Class B (Government), Class C (Military)', false, 3, now(), now()),
    (v_q_id, 'Class A (Wired), Class B (Wireless), Class C (Optical)', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Duty Cycle regulation in European ISM bands (868 MHz)?', 'European ETSI regulations enforce a strict 1% duty cycle limit on 868 MHz channels to prevent rogue transmitters from permanently jamming the shared unlicensed radio spectrum.',
    'hard', 1, 0, 35, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Legal restriction limiting a device to transmitting on a given frequency for at most 1% of the time (36 seconds per hour)', true, 1, now(), now()),
    (v_q_id, 'The clock speed of the microcontroller', false, 2, now(), now()),
    (v_q_id, 'The percentage of time a battery takes to charge', false, 3, now(), now()),
    (v_q_id, 'The warranty lifespan of a sensor', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Spreading Factor (SF) in LoRa modulation?', 'Higher spreading factors (e.g., SF12) increase range and signal-to-noise tolerance by stretching symbols over time, at the expense of lower bitrates and higher battery consumption.',
    'hard', 1, 0, 36, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The ratio between the chip rate and symbol rate (SF7 to SF12), trading off data rate for receiver sensitivity and communication range', true, 1, now(), now()),
    (v_q_id, 'The physical width of the antenna', false, 2, now(), now()),
    (v_q_id, 'The number of users connected to a gateway', false, 3, now(), now()),
    (v_q_id, 'The speed of light in optical cables', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Adaptive Data Rate (ADR) in LoRaWAN?', 'ADR instructs nodes close to a gateway to use lower spreading factors (SF7) and reduced transmit power, maximizing battery lifespan and network capacity.',
    'medium', 1, 0, 37, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A mechanism where the network server dynamically optimizes each node''s Spreading Factor and Tx power based on radio link quality', true, 1, now(), now()),
    (v_q_id, 'A tool that increases internet download speeds on phones', false, 2, now(), now()),
    (v_q_id, 'A feature that automatically pays monthly cellular bills', false, 3, now(), now()),
    (v_q_id, 'An antenna rotation motor', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is BLE Advertising in Beacon technology (e.g., iBeacon, Eddystone)?', 'Beacons broadcast proximity telemetry (UUID, Major, Minor, Tx Power) allowing nearby smartphones to calculate localized indoor positioning.',
    'medium', 1, 0, 38, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Periodic broadcast of short identification packets on dedicated advertising channels (Channels 37, 38, 39) without establishing a paired connection', true, 1, now(), now()),
    (v_q_id, 'Pop-up advertisements displayed in web browsers', false, 2, now(), now()),
    (v_q_id, 'Sending spam emails to customers', false, 3, now(), now()),
    (v_q_id, 'Playing audio commercials over Bluetooth speakers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the maximum payload size of a legacy BLE 4.x advertising packet?', 'Legacy BLE advertising packets are strictly constrained to 31 bytes total (including AD structures for flags, device name, and manufacturer data).',
    'medium', 1, 0, 39, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '31 bytes', true, 1, now(), now()),
    (v_q_id, '1500 bytes', false, 2, now(), now()),
    (v_q_id, '1024 bytes', false, 3, now(), now()),
    (v_q_id, '64 bytes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What improvement was introduced in Bluetooth 5.0 for IoT long-range deployments?', 'Bluetooth 5 Coded PHY incorporates convolutional forward error correction (S=2 and S=8 coding), multiplying radio range by up to $4\times$ at low bitrates.',
    'hard', 1, 0, 40, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Coded PHY (125 kbps and 500 kbps) utilizing Forward Error Correction (FEC) to achieve ranges up to 1 kilometer', true, 1, now(), now()),
    (v_q_id, 'Replacing radio waves with infrared light', false, 2, now(), now()),
    (v_q_id, 'Requiring wired ethernet cables', false, 3, now(), now()),
    (v_q_id, 'Eliminating encryption entirely', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is MQTT-SN (MQTT for Sensor Networks)?', 'MQTT-SN replaces variable-length UTF-8 topic strings with 2-byte Topic IDs and runs seamlessly over UDP, avoiding TCP connection state overhead.',
    'medium', 1, 0, 41, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An adaptation of MQTT designed specifically for non-TCP, low-bandwidth, high-latency wireless networks (e.g., Zigbee) running over UDP', true, 1, now(), now()),
    (v_q_id, 'A secure version of MQTT that runs on satellites', false, 2, now(), now()),
    (v_q_id, 'A protocol used strictly inside social media platforms', false, 3, now(), now()),
    (v_q_id, 'An operating system for sensors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary role of a ''Keep-Alive'' timer in MQTT communication?', 'If no application data is published within the Keep-Alive interval, the client sends a 2-byte `PINGREQ` packet, and the broker confirms with `PINGRESP` to keep the TCP socket open.',
    'medium', 1, 0, 42, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The maximum time interval that can elapse between messages from a client before the broker assumes the connection is lost', true, 1, now(), now()),
    (v_q_id, 'The lifespan of the physical hardware chip', false, 2, now(), now()),
    (v_q_id, 'The duration of battery charging cycles', false, 3, now(), now()),
    (v_q_id, 'The frequency of data backups', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is JSON-LD and CBOR in IoT data serialization?', 'CBOR (RFC 8949) shrinks JSON payloads into compact binary byte streams, drastically slashing packet size and transmission energy on constrained wireless links.',
    'medium', 1, 0, 43, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'JSON-LD provides linked data semantics; CBOR (Concise Binary Object Representation) provides ultra-compact binary encoding of JSON data structures', true, 1, now(), now()),
    (v_q_id, 'They are legacy programming languages', false, 2, now(), now()),
    (v_q_id, 'They are antenna design tools', false, 3, now(), now()),
    (v_q_id, 'They are database backup formats', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Mesh Network Topology in IoT?', 'Mesh topologies eliminate single points of failure by allowing packets to hop across intermediate peer nodes to reach a border router or gateway.',
    'easy', 1, 0, 44, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A network topology where nodes connect directly, dynamically, and non-hierarchically to as many other nodes as possible, relaying data cooperatively', true, 1, now(), now()),
    (v_q_id, 'A network where every node connects to one central server', false, 2, now(), now()),
    (v_q_id, 'A network where nodes form a single linear chain', false, 3, now(), now()),
    (v_q_id, 'A network with no wireless connections', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Star-of-Stars Network Topology in LoRaWAN?', 'In LoRaWAN, end-devices do not mesh; they broadcast packets that are received by all listening gateways in range, which forward them to the central Network Server.',
    'medium', 1, 0, 45, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'End devices communicate over single-hop LoRa links to multiple gateways, which in turn connect over standard IP networks to a central Network Server', true, 1, now(), now()),
    (v_q_id, 'All nodes are connected in a circle', false, 2, now(), now()),
    (v_q_id, 'Sensors communicate with each other in a peer-to-peer mesh', false, 3, now(), now()),
    (v_q_id, 'Every device has its own private satellite', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the IEEE standard for Wi-Fi HaLow designed for IoT?', 'Wi-Fi HaLow (802.11ah) operates in sub-1 GHz unlicensed bands, delivering longer range ($> 1\,\text{km}$) and lower power consumption than traditional 2.4/5 GHz Wi-Fi.',
    'hard', 1, 0, 46, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'IEEE 802.11ah', true, 1, now(), now()),
    (v_q_id, 'IEEE 802.11ax', false, 2, now(), now()),
    (v_q_id, 'IEEE 802.11b', false, 3, now(), now()),
    (v_q_id, 'IEEE 802.11ac', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In MQTT, what is a ''Topic Filter'' containing wildcard characters?', '`sensor/+/temperature` matches `sensor/kitchen/temperature`; `sensor/#` matches all subordinate topics under `sensor/`.',
    'medium', 1, 0, 47, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Using `+` for single-level wildcard matching and `#` for multi-level wildcard matching across topic hierarchies', true, 1, now(), now()),
    (v_q_id, 'Using `*` and `?` as in regular operating system shells', false, 2, now(), now()),
    (v_q_id, 'Using `%` and `_` as in SQL queries', false, 3, now(), now()),
    (v_q_id, 'MQTT does not support topic wildcards', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Retained Message'' in MQTT broker functionality?', 'Retained messages ensure new subscribers immediately receive the most recent known good status value (e.g., current light state) without waiting for the next publishing event.',
    'medium', 1, 0, 48, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A message flagged by the publisher that the broker permanently stores and immediately delivers to any new client that subscribes to that topic', true, 1, now(), now()),
    (v_q_id, 'A message that is never deleted under any circumstance', false, 2, now(), now()),
    (v_q_id, 'A message that is encrypted with a secret password', false, 3, now(), now()),
    (v_q_id, 'A message that is sent only once a year', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the function of the CoAP Block-Wise Transfer (RFC 7959) extension?', 'Block-wise transfer (Block1 for request payloads, Block2 for response payloads) splits large resources into discrete chunks managed at the application layer.',
    'hard', 1, 0, 49, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Enables fragmented transmission of payloads larger than the network MTU across multiple atomic CoAP request-response pairs without requiring IP fragmentation', true, 1, now(), now()),
    (v_q_id, 'A method for blocking malicious IP addresses', false, 2, now(), now()),
    (v_q_id, 'A tool for deleting corrupt database blocks', false, 3, now(), now()),
    (v_q_id, 'An encryption algorithm', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Industrial Fieldbus?', 'Fieldbuses replace point-to-point analog 4–20 mA wiring loops with multidrop digital communication networks connecting PLCs, sensors, and actuators.',
    'medium', 1, 0, 50, ARRAY['BCA-306N', 'Unit-2', 'BCA-306N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A family of industrial computer network protocols used for real-time distributed control in manufacturing plants (e.g., Profibus, Foundation Fieldbus, Modbus)', true, 1, now(), now()),
    (v_q_id, 'A highway reserved for industrial utility trucks', false, 2, now(), now()),
    (v_q_id, 'A high-speed public internet provider', false, 3, now(), now()),
    (v_q_id, 'A server room cooling duct', false, 4, now(), now());

END $SEEDED_BLOCK$;
