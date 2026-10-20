DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-306N Unit 4 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '99464cfb-1c1d-560f-908f-548a6bc5911a', 'BCA-306N Unit 4: Cloud Storage Models and IoT Security Practice Quiz (50 MCQs)', 'bca-306n-u4-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-306N Unit 4. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is the Mirai Botnet famous for in IoT cybersecurity history?', 'Mirai scanned the internet for IoT devices (cameras, DVRs) protected by hardcoded credentials (`admin:admin`, `root:123456`), weaponizing them into a massive DDoS army.',
    'easy', 1, 0, 1, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'In 2016, it infected hundreds of thousands of consumer IoT devices using default factory passwords to launch a record 1.2 Tbps DDoS attack that took down major internet services', true, 1, now(), now()),
    (v_q_id, 'The first computer virus that displayed a message on screen', false, 2, now(), now()),
    (v_q_id, 'A banking trojan that stole credit card numbers', false, 3, now(), now()),
    (v_q_id, 'A software program that made Wi-Fi connections faster', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why are constrained IoT devices particularly vulnerable to cyber attacks?', 'Resource-constrained nodes often lack memory for full TLS handshakes, possess unencrypted flash memory, and are deployed in physically accessible remote locations.',
    'medium', 1, 0, 2, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Limited compute/memory prevents running complex cryptographic suites; lack of automatic patching mechanisms; frequent use of hardcoded factory default credentials', true, 1, now(), now()),
    (v_q_id, 'Because they are connected to fiber optic cables', false, 2, now(), now()),
    (v_q_id, 'Because they use 64-bit microprocessors', false, 3, now(), now()),
    (v_q_id, 'Because they have too much RAM installed', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the CIA Triad in IoT cybersecurity?', 'The foundational security model: Confidentiality (data secrecy), Integrity (preventing tampering), and Availability (ensuring uptime).',
    'easy', 1, 0, 3, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Confidentiality, Integrity, and Availability', true, 1, now(), now()),
    (v_q_id, 'Central Intelligence Agency', false, 2, now(), now()),
    (v_q_id, 'Control, Ingestion, and Analytics', false, 3, now(), now()),
    (v_q_id, 'Computers, Internet, and Actuators', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the difference between Symmetric and Asymmetric Cryptography in IoT?', 'Symmetric encryption (AES-128/256) is fast and computationally lightweight for constrained sensors; Asymmetric (ECC) is used for initial key exchange and digital identity.',
    'medium', 1, 0, 4, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Symmetric uses the same single shared key for encryption and decryption (fast, AES); Asymmetric uses a mathematically linked public/private key pair (slower, RSA/ECC)', true, 1, now(), now()),
    (v_q_id, 'Symmetric is only for software; Asymmetric is for hardware', false, 2, now(), now()),
    (v_q_id, 'Symmetric does not use keys', false, 3, now(), now()),
    (v_q_id, 'There is no difference', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why is Elliptic Curve Cryptography (ECC) preferred over RSA for constrained IoT devices?', 'Smaller key sizes mean faster mathematical point multiplication, smaller packet headers, and lower battery consumption on constrained microcontrollers.',
    'hard', 1, 0, 5, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'ECC delivers equivalent cryptographic strength with substantially smaller key sizes (e.g., 256-bit ECC matches 3072-bit RSA), saving CPU cycles, memory, and energy', true, 1, now(), now()),
    (v_q_id, 'Because ECC was invented by Apple', false, 2, now(), now()),
    (v_q_id, 'Because RSA cannot encrypt text', false, 3, now(), now()),
    (v_q_id, 'Because ECC does not require math', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Transport Layer Security (TLS) / Datagram Transport Layer Security (DTLS)?', 'TLS protects TCP communication (MQTT/HTTPS); DTLS protects datagram-based protocols (CoAP over UDP) against eavesdropping, tampering, and message forgery.',
    'medium', 1, 0, 6, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Cryptographic protocols designed to provide communications security over computer networks (TLS over TCP; DTLS over UDP for CoAP)', true, 1, now(), now()),
    (v_q_id, 'Hardware chips installed inside computer monitors', false, 2, now(), now()),
    (v_q_id, 'Web browser extensions for blocking advertisements', false, 3, now(), now()),
    (v_q_id, 'Protocols for compressing images', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Hardware Security Module (HSM) or Secure Element (SE) in IoT nodes?', 'Secure Elements (e.g., ATECC608A) resist physical decapping, side-channel power analysis, and voltage glitching attacks, preventing private key theft.',
    'hard', 1, 0, 7, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A dedicated, tamper-resistant physical microcontroller chip designed strictly to securely store cryptographic private keys and execute encryption algorithms in hardware', true, 1, now(), now()),
    (v_q_id, 'A cooling fan that prevents chip overheating', false, 2, now(), now()),
    (v_q_id, 'A high-speed external hard drive', false, 3, now(), now()),
    (v_q_id, 'A software firewall program', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Physical Unclonable Function (PUF) in semiconductor IoT security?', 'PUFs exploit microscopic nanoscale differences in silicon transistors to generate cryptographic keys that exist only when the chip is powered on, leaving no stored keys in flash.',
    'hard', 1, 0, 8, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical entity embodied in a physical structure that provides a unique ''silicon fingerprint'' derived from microscopic manufacturing variations during chip fabrication', true, 1, now(), now()),
    (v_q_id, 'A broken microchip that cannot be repaired', false, 2, now(), now()),
    (v_q_id, 'A software function that deletes duplicate files', false, 3, now(), now()),
    (v_q_id, 'A physical lock on a server room door', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Man-in-the-Middle (MitM) attack on an IoT communication link?', 'MitM attacks allow eavesdroppers to intercept telemetry, steal access tokens, or inject forged sensor readings or actuation commands.',
    'easy', 1, 0, 9, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An attacker secretly relays and potentially alters communication between two nodes who believe they are directly communicating with each other', true, 1, now(), now()),
    (v_q_id, 'A person standing between two computer monitors', false, 2, now(), now()),
    (v_q_id, 'A physical wire breaking inside a cable', false, 3, now(), now()),
    (v_q_id, 'A computer running out of battery power', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Mutual Authentication (mTLS) in IoT device-to-cloud security?', 'Standard HTTPS authenticates only the server to the browser; mTLS requires the IoT device to present its own private device certificate, guaranteeing only authorized hardware connects.',
    'medium', 1, 0, 10, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A security process where both the client (IoT device) and the server verify each other''s cryptographic X.509 digital certificates before establishing a connection', true, 1, now(), now()),
    (v_q_id, 'Two users typing passwords simultaneously', false, 2, now(), now()),
    (v_q_id, 'A device connecting to two Wi-Fi networks at once', false, 3, now(), now()),
    (v_q_id, 'A single password shared among all devices', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an X.509 Digital Certificate in IoT PKI (Public Key Infrastructure)?', 'X.509 certificates form the backbone of device trust, enabling cryptographic proof of identity without hardcoded static passwords.',
    'medium', 1, 0, 11, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A digital document formatted to an ITU-T standard that binds a cryptographic public key with an identity (device serial number/MAC) signed by a trusted Certificate Authority (CA)', true, 1, now(), now()),
    (v_q_id, 'A certificate of academic graduation', false, 2, now(), now()),
    (v_q_id, 'A receipt given when purchasing hardware', false, 3, now(), now()),
    (v_q_id, 'A software license agreement', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the principle of ''Least Privilege'' in IoT Identity and Access Management (IAM)?', 'If a temperature sensor is compromised, least privilege guarantees it cannot publish commands to industrial shut-off valves or query user identity tables.',
    'easy', 1, 0, 12, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Granting a device or user strictly the minimum permissions and resource access levels required to perform its specific operational task and nothing more', true, 1, now(), now()),
    (v_q_id, 'Allowing all employees to have root administrator access', false, 2, now(), now()),
    (v_q_id, 'Giving all devices access to all databases', false, 3, now(), now()),
    (v_q_id, 'Creating devices with zero security', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Role-Based Access Control (RBAC) in IoT cloud platforms?', 'RBAC assigns fine-grained permissions to roles rather than individual entities, simplifying security governance across millions of deployed nodes.',
    'medium', 1, 0, 13, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Restricting system access and API operations to authorized users and devices based on predefined roles (e.g., Operator, Auditor, Administrator, Field Device)', true, 1, now(), now()),
    (v_q_id, 'A protocol for controlling the rolling motion of wheels', false, 2, now(), now()),
    (v_q_id, 'A method for automatically naming files', false, 3, now(), now()),
    (v_q_id, 'An operating system for gaming consoles', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Access Token (e.g., JWT - JSON Web Token) in IoT REST APIs?', 'JWTs contain encoded claims (subject, expiry, roles) signed with an HMAC or RSA/ECDSA key, allowing stateless token verification on cloud API gateways.',
    'easy', 1, 0, 14, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A compact, URL-safe, cryptographically signed token used to securely transmit claims and authentication status between client and server', true, 1, now(), now()),
    (v_q_id, 'A physical plastic coin inserted into a machine', false, 2, now(), now()),
    (v_q_id, 'A password written on a piece of paper', false, 3, now(), now()),
    (v_q_id, 'A software file that contains computer graphics', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Replay Attack in wireless sensor networks?', 'Mitigated using cryptographic nonces, incremental sequence numbers, and synchronized timestamps in packet headers.',
    'medium', 1, 0, 15, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An attacker intercepts a valid data transmission or actuation command and maliciously re-transmits it later to duplicate an unauthorized effect (e.g., unlocking a door)', true, 1, now(), now()),
    (v_q_id, 'Playing an audio recording repeatedly', false, 2, now(), now()),
    (v_q_id, 'A video game character restarting a level', false, 3, now(), now()),
    (v_q_id, 'Restarting a computer twice', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Cryptographic Nonce?', 'Nonces ensure that even if an attacker records an exact valid radio packet, re-transmitting it fails because the nonce is rejected as already used.',
    'medium', 1, 0, 16, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An arbitrary number used only once in a cryptographic communication session to prevent replay attacks', true, 1, now(), now()),
    (v_q_id, 'A secret password that never changes', false, 2, now(), now()),
    (v_q_id, 'A programming error in C++', false, 3, now(), now()),
    (v_q_id, 'A unit of computer memory', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Firmware Tampering and how is Secure Boot used to prevent it?', 'Secure Boot establishes an immutable **Hardware Root of Trust**: if an attacker flashes modified malicious firmware, the signature check fails and the CPU refuses to boot.',
    'hard', 1, 0, 17, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Secure Boot verifies the cryptographic digital signature of the bootloader and firmware binary using hardware-fused public keys before allowing execution', true, 1, now(), now()),
    (v_q_id, 'Changing the color of a plastic device enclosure', false, 2, now(), now()),
    (v_q_id, 'A computer taking longer than usual to boot up', false, 3, now(), now()),
    (v_q_id, 'Installing an application from an app store', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is JTAG and UART interface debugging exploitation in hardware hacking?', 'Industrial IoT designers must disable or password-protect physical JTAG/UART debug ports before shipping production hardware to prevent physical extraction attacks.',
    'medium', 1, 0, 18, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Attackers physically connect to exposed hardware test pads on circuit boards to dump flash memory, extract encryption keys, or gain root shell access', true, 1, now(), now()),
    (v_q_id, 'A software virus downloaded from websites', false, 2, now(), now()),
    (v_q_id, 'A problem caused by power outages', false, 3, now(), now()),
    (v_q_id, 'A method for cleaning dust off electronics', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Side-Channel Analysis (e.g., Differential Power Analysis - DPA)?', 'DPA measures the micro-watt power consumption variations of CMOS transistors as they compute 0s and 1s, mathematically reconstructing secret cryptographic keys.',
    'hard', 1, 0, 19, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Extracting cryptographic keys by measuring physical side-channel leakages (power consumption fluctuations, electromagnetic emissions, execution timing) during encryption', true, 1, now(), now()),
    (v_q_id, 'Stealing passwords by looking over someone''s shoulder', false, 2, now(), now()),
    (v_q_id, 'Reading files from an external USB drive', false, 3, now(), now()),
    (v_q_id, 'Listening to audio conversations in a room', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Distributed Denial of Service (DDoS) attack targeting IoT Cloud Ingestion?', 'Mitigated using cloud Web Application Firewalls (WAF), Anycast network routing, and automated DDoS mitigation services (AWS Shield, Cloudflare).',
    'easy', 1, 0, 20, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Overwhelming cloud endpoints with millions of simultaneous forged requests from distributed botnets, exhausting server memory and crashing ingestion pipelines', true, 1, now(), now()),
    (v_q_id, 'A computer virus that deletes desktop icons', false, 2, now(), now()),
    (v_q_id, 'An accidental network cable disconnection', false, 3, now(), now()),
    (v_q_id, 'A database running out of hard drive space', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Zero-Trust Architecture (ZTA) in IoT network design?', 'ZTA rejects the obsolete perimeter security model (''inside the firewall is safe''); every node, whether on the local LAN or the internet, is treated as potentially compromised.',
    'medium', 1, 0, 21, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A security paradigm based on ''never trust, always verify'', requiring continuous authentication and micro-segmentation for every device and transaction', true, 1, now(), now()),
    (v_q_id, 'A company having no trust in its employees', false, 2, now(), now()),
    (v_q_id, 'A network with zero security firewalls installed', false, 3, now(), now()),
    (v_q_id, 'A computer system that does not use passwords', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Network Micro-Segmentation in IoT environments?', 'Micro-segmentation ensures that even if an attacker hacks an office smart thermostat, firewall rules prevent lateral traversal into corporate financial databases.',
    'medium', 1, 0, 22, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Dividing a network into isolated logical security zones to contain breaches and prevent compromised sensors from moving laterally across corporate IT systems', true, 1, now(), now()),
    (v_q_id, 'Cutting network cables into very short pieces', false, 2, now(), now()),
    (v_q_id, 'Installing smaller routers in offices', false, 3, now(), now()),
    (v_q_id, 'Reducing the number of employees in a department', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Data at Rest vs Data in Transit vs Data in Use?', 'Comprehensive security requires AES-256 for Data at Rest, TLS 1.3 for Data in Transit, and hardware Confidential Computing (enclaves) for Data in Use.',
    'easy', 1, 0, 23, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Data at Rest is stored on disk/flash; Data in Transit is moving across networks; Data in Use is active in RAM/CPU registers being processed', true, 1, now(), now()),
    (v_q_id, 'They refer to computer hardware that is turned off, moved in trucks, or being used', false, 2, now(), now()),
    (v_q_id, 'Data at Rest is deleted; Data in Transit is downloading; Data in Use is uploaded', false, 3, now(), now()),
    (v_q_id, 'There is no distinction in computer science', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Over-The-Air (OTA) secure image signing?', 'Prevents attackers from spoofing OTA update servers to push trojan horse firmware onto consumer or industrial device fleets.',
    'medium', 1, 0, 24, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Digitally signing firmware binary updates with a private key; the device''s bootloader verifies the signature with an embedded public key before writing to flash', true, 1, now(), now()),
    (v_q_id, 'Signing a paper receipt when purchasing software', false, 2, now(), now()),
    (v_q_id, 'Writing the developer''s name inside the source code', false, 3, now(), now()),
    (v_q_id, 'Compressing a firmware file into a zip archive', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Zero-Day Vulnerability in IoT software?', 'Zero-day exploits trade for high value on black markets because security defenses and signature-based antivirus tools cannot recognize them.',
    'medium', 1, 0, 25, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A software security flaw that is unknown to the vendor or for which no official security patch yet exists, leaving systems vulnerable to active exploitation', true, 1, now(), now()),
    (v_q_id, 'A software program that was created in zero days', false, 2, now(), now()),
    (v_q_id, 'A computer that has never been turned on', false, 3, now(), now()),
    (v_q_id, 'A defect that costs zero dollars to repair', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Shodan in IoT cybersecurity research?', 'Security researchers and attackers use Shodan to uncover millions of publicly exposed, unprotected IoT webcams, smart meters, and SCADA PLCs worldwide.',
    'easy', 1, 0, 26, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A specialized search engine that scans the entire internet to index connected IoT devices, open ports, webcams, industrial control systems, and banners', true, 1, now(), now()),
    (v_q_id, 'A brand of computer antivirus software', false, 2, now(), now()),
    (v_q_id, 'An operating system developed for supercomputers', false, 3, now(), now()),
    (v_q_id, 'A programming language used in artificial intelligence', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Privacy-by-Design in IoT engineering?', 'Mandated by regulations like GDPR: data minimization, end-to-end encryption, automatic data purging, and privacy-preserving defaults.',
    'medium', 1, 0, 27, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An engineering methodology that embeds privacy and data protection into the architecture and default settings of a product throughout its entire development lifecycle', true, 1, now(), now()),
    (v_q_id, 'Designing plastic device enclosures with dark colors', false, 2, now(), now()),
    (v_q_id, 'Hiding the price of a product from customers', false, 3, now(), now()),
    (v_q_id, 'Refusing to document software source code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the role of an Intrusion Detection System (IDS) in IoT networks?', 'Network IDSes (e.g., Snort, Zeek) analyze packet payloads, while Host-based IDSes monitor process execution and system call anomalies on gateways.',
    'medium', 1, 0, 28, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Monitoring network traffic and device telemetry for suspicious activity, policy violations, and known attack signatures, alerting administrators to anomalies', true, 1, now(), now()),
    (v_q_id, 'Physically locking the front door of an office building', false, 2, now(), now()),
    (v_q_id, 'An antivirus program that deletes spam emails', false, 3, now(), now()),
    (v_q_id, 'A firewall that turns off computer monitors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Lightweight Cryptography (LWC) standardized by NIST?', 'In 2023, NIST standardized **ASCON** as the official lightweight cipher family for authenticated encryption and hashing on constrained IoT hardware.',
    'hard', 1, 0, 29, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Cryptographic algorithms optimized for ultra-constrained microcontrollers with limited silicon area, power, and memory (e.g., ASCON, PRESENT)', true, 1, now(), now()),
    (v_q_id, 'Encryption algorithms that use simple passwords', false, 2, now(), now()),
    (v_q_id, 'A software tool for compressing image files', false, 3, now(), now()),
    (v_q_id, 'A protocol for sending text messages', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Hardcoded Credential vulnerability (CWE-798)?', 'Attackers reverse-engineer firmware binaries using tools like Ghidra, extract the hardcoded master credentials, and use them to hijack thousands of devices remotely.',
    'easy', 1, 0, 30, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Embedding administrative passwords or private cryptographic keys directly inside the source code or binary firmware of a commercial IoT product', true, 1, now(), now()),
    (v_q_id, 'A password that is very difficult to guess', false, 2, now(), now()),
    (v_q_id, 'A password made of metal hardware keys', false, 3, now(), now()),
    (v_q_id, 'A password that changes every thirty seconds', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Certificate Pinning in IoT mobile and gateway applications?', 'Defeats Man-in-the-Middle attacks where an attacker compromises a commercial Certificate Authority to issue fraudulent certificates.',
    'hard', 1, 0, 31, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Hardcoding the specific expected server certificate or public key hash inside the client application to reject forged certificates from rogue CAs', true, 1, now(), now()),
    (v_q_id, 'Physically pinning a paper certificate to an office wall', false, 2, now(), now()),
    (v_q_id, 'Saving a certificate on a USB flash drive', false, 3, now(), now()),
    (v_q_id, 'Setting a certificate password', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Air-Gapped Network in critical infrastructure IoT?', 'Nuclear power plants, defense installations, and high-security water treatment SCADA systems are air-gapped to prevent remote internet attacks.',
    'easy', 1, 0, 32, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical security isolation measure ensuring a secure computer network is physically disconnected from the public internet and all other unsecured networks', true, 1, now(), now()),
    (v_q_id, 'A network that operates over air radio waves', false, 2, now(), now()),
    (v_q_id, 'A network cooling system using compressed air', false, 3, now(), now()),
    (v_q_id, 'A wireless Wi-Fi router', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the Stuxnet worm and what critical lesson did it teach regarding industrial IoT security?', 'Stuxnet proved that even physically isolated, air-gapped industrial infrastructure is vulnerable to sophisticated USB-borne supply-chain attacks and PLC logic corruption.',
    'hard', 1, 0, 33, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A military-grade cyber weapon discovered in 2010 that bridged an air-gapped network via USB drives to sabotage Iranian uranium enrichment centrifuges by corrupting Siemens PLCs', true, 1, now(), now()),
    (v_q_id, 'A software bug that crashed Windows XP computers', false, 2, now(), now()),
    (v_q_id, 'A virus that displayed pop-up ads in web browsers', false, 3, now(), now()),
    (v_q_id, 'A program that copied files between computers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Key Rotation in enterprise cloud IoT systems?', 'If a key is silently leaked, automated key rotation ensures the stolen credential becomes completely invalid within days or weeks.',
    'medium', 1, 0, 34, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Regularly replacing cryptographic encryption keys, API tokens, and digital certificates with new ones on a scheduled basis to limit the impact of compromised keys', true, 1, now(), now()),
    (v_q_id, 'Physically turning an ignition key inside a lock', false, 2, now(), now()),
    (v_q_id, 'Rotating a wireless antenna in circles', false, 3, now(), now()),
    (v_q_id, 'Changing the name of a computer file', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Zero-Knowledge Proof (ZKP) in IoT identity authentication?', 'ZKP allows an IoT sensor to prove it belongs to an authorized fleet without ever revealing its private cryptographic secret over the network.',
    'hard', 1, 0, 35, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A cryptographic method by which one party (prover) can prove to another party (verifier) that a statement is true without conveying any information apart from the fact that it is true', true, 1, now(), now()),
    (v_q_id, 'An authentication system with zero security', false, 2, now(), now()),
    (v_q_id, 'A user logging into a system with no password', false, 3, now(), now()),
    (v_q_id, 'A test where all students receive zero marks', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Cloud Storage Multi-Tenancy security isolation in IoT backends?', 'Enforced using tenant ID partitioning, dedicated database schemas, or database kernel **Row-Level Security (RLS)**.',
    'easy', 1, 0, 36, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Ensuring that multiple corporate clients storing telemetry in a shared cloud database cannot view, query, or leak each other''s private data', true, 1, now(), now()),
    (v_q_id, 'Allowing all users to share the same password', false, 2, now(), now()),
    (v_q_id, 'A database that only works for one single company', false, 3, now(), now()),
    (v_q_id, 'A data center with multiple physical buildings', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Exploit Payload in software attacks?', 'Once a buffer overflow or injection vulnerability is triggered, the payload executes the attacker''s objective (e.g., spawning a root reverse shell or installing ransomware).',
    'medium', 1, 0, 37, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The malicious code or command sequence delivered and executed on a target vulnerable system after an exploit successfully breaches its defenses', true, 1, now(), now()),
    (v_q_id, 'The shipping box used to deliver computer hardware', false, 2, now(), now()),
    (v_q_id, 'The physical weight of a computer battery', false, 3, now(), now()),
    (v_q_id, 'The amount of data uploaded to a cloud server', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Fuzz Testing (Fuzzing) in IoT firmware security auditing?', 'Tools like AFL (American Fuzzy Lop) and libFuzzer continuously mutate network frames to detect unhandled memory corruption vulnerabilities before release.',
    'hard', 1, 0, 38, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An automated software testing technique that inputs massive volumes of malformed, pseudo-random, and unexpected data payloads into protocol parsers to uncover buffer overflows and crashes', true, 1, now(), now()),
    (v_q_id, 'Cleaning dust off microchips with a soft brush', false, 2, now(), now()),
    (v_q_id, 'Testing whether a microphone can record audio', false, 3, now(), now()),
    (v_q_id, 'Writing random comments inside source code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Buffer Overflow in C/C++ IoT firmware?', 'Because constrained microcontrollers rely on C without memory safety, buffer overflows remain the number one source of arbitrary remote code execution exploits.',
    'medium', 1, 0, 39, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An anomaly where a program writes data beyond the allocated boundary of a fixed-size memory buffer, corrupting adjacent stack memory and overwriting function return addresses', true, 1, now(), now()),
    (v_q_id, 'A computer monitor running out of display memory', false, 2, now(), now()),
    (v_q_id, 'A network cable carrying too much electricity', false, 3, now(), now()),
    (v_q_id, 'A hard drive becoming completely full', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Honeypot in IoT cybersecurity research?', 'IoT honeypots (e.g., Cowrie, IoTPOT) mimic vulnerable smart cameras and routers, logging attacker IP addresses, brute-force dictionaries, and malware payloads.',
    'easy', 1, 0, 40, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A decoy computer system, virtual device, or network service deliberately designed to attract and trap cyber attackers to study their exploitation methodologies', true, 1, now(), now()),
    (v_q_id, 'A computer covered in sweet food to attract insects', false, 2, now(), now()),
    (v_q_id, 'A database that stores employee bonuses', false, 3, now(), now()),
    (v_q_id, 'A very fast internet connection', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the principle of Defense-in-Depth in IoT security architecture?', 'No single security measure is impenetrable; defense-in-depth ensures that an attacker breaching network encryption is still blocked by device hardware security modules.',
    'medium', 1, 0, 41, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Layering multiple redundant security mechanisms (perimeter firewalls, mTLS encryption, least-privilege IAM, secure boot, tamper-resistant hardware) so if one fails, others prevent breach', true, 1, now(), now()),
    (v_q_id, 'Digging deep holes in the ground for data centers', false, 2, now(), now()),
    (v_q_id, 'Using only one exceptionally complex password', false, 3, now(), now()),
    (v_q_id, 'Installing thicker metal cases on computers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Firmware Reverse Engineering?', 'Using tools like Ghidra and IDA Pro, analysts reconstruct C source logic from raw ARM/MIPS machine instructions to find hidden backdoors and zero-days.',
    'hard', 1, 0, 42, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Decompiling and disassembling compiled binary machine code extracted from an IoT chip to understand its internal logic, algorithms, and vulnerabilities', true, 1, now(), now()),
    (v_q_id, 'Writing software backwards from end to beginning', false, 2, now(), now()),
    (v_q_id, 'Deleting a firmware file from a computer', false, 3, now(), now()),
    (v_q_id, 'Upgrading a firmware version to a newer release', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Air-Drop or Supply-Chain Attack in IoT manufacturing?', 'Attackers inject malicious backdoors into upstream SDKs, bootloader chips, or third-party dependencies, compromising millions of devices before they leave the factory.',
    'medium', 1, 0, 43, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A cyber attack that targets vulnerabilities in third-party vendor hardware components, open-source libraries, or manufacturing facilities before delivery to end consumers', true, 1, now(), now()),
    (v_q_id, 'Dropping sensors from airplanes using parachutes', false, 2, now(), now()),
    (v_q_id, 'A physical robbery of a delivery truck', false, 3, now(), now()),
    (v_q_id, 'Sending files via Bluetooth between phones', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Overvoltage / Clock Glitching in hardware physical attacks?', 'Hardware glitching momentarily destabilizes CPU logic gates, causing instructions like `if (!authenticated) return;` to be skipped completely, granting immediate root access.',
    'hard', 1, 0, 44, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Deliberately injecting precise, microsecond electrical voltage spikes or clock variations into an MCU to cause the CPU instruction pointer to skip security permission checks', true, 1, now(), now()),
    (v_q_id, 'A lightning strike destroying a computer', false, 2, now(), now()),
    (v_q_id, 'An accidental power outage in an office', false, 3, now(), now()),
    (v_q_id, 'Turning off a computer without clicking shut down', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Static Application Security Testing (SAST) in IoT CI/CD pipelines?', 'SAST tools (SonarQube, Coverity) parse ASTs to flag buffer overflows, SQL injections, and hardcoded secrets directly in pull requests before deployment.',
    'medium', 1, 0, 45, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Analyzing application source code for security vulnerabilities, memory leaks, and coding standard violations without executing the code', true, 1, now(), now()),
    (v_q_id, 'Testing a computer while it is turned off', false, 2, now(), now()),
    (v_q_id, 'Checking whether a computer is sitting on a flat table', false, 3, now(), now()),
    (v_q_id, 'Testing hardware components with an oscilloscope', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Dynamic Application Security Testing (DAST)?', 'DAST tools (OWASP ZAP) probe live REST endpoints and web portals, assessing real-world vulnerability exposure without requiring access to source code.',
    'medium', 1, 0, 46, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Testing a running application or network service from the outside with automated attack vectors to find vulnerabilities in its real-time operating state', true, 1, now(), now()),
    (v_q_id, 'Testing software while moving in a car', false, 2, now(), now()),
    (v_q_id, 'Changing the software code while it is running', false, 3, now(), now()),
    (v_q_id, 'Testing a computer monitor refresh rate', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Cross-Site Request Forgery (CSRF) in IoT web management consoles?', 'Mitigated using unique, cryptographically random Anti-CSRF tokens embedded in HTML forms and enforcing SameSite cookie attributes.',
    'medium', 1, 0, 47, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An attack that tricks an authenticated user into submitting an unauthorized malicious command to an IoT web server (e.g., changing router DNS settings)', true, 1, now(), now()),
    (v_q_id, 'A computer virus that spreads through email', false, 2, now(), now()),
    (v_q_id, 'A hardware defect in a network router', false, 3, now(), now()),
    (v_q_id, 'A software program for designing websites', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an Ephemeral Port in TCP communication?', 'Once a TCP connection closes, the ephemeral port is returned to the operating system pool, preventing port exhaustion under high concurrent loads.',
    'medium', 1, 0, 48, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A temporary, short-lived transport port allocated automatically by the client operating system from a predefined range for the duration of a communication session', true, 1, now(), now()),
    (v_q_id, 'A physical port on a computer that is made of glass', false, 2, now(), now()),
    (v_q_id, 'A network port that only works on weekends', false, 3, now(), now()),
    (v_q_id, 'A port used exclusively by satellites', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Certificate Revocation List (CRL) vs Online Certificate Status Protocol (OCSP)?', 'When an IoT device private key is stolen, the Certificate Authority revokes the certificate, and gateways reject it via OCSP stapling or CRL updates.',
    'hard', 1, 0, 49, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'CRL is a downloaded list of revoked digital certificates; OCSP is a real-time query protocol to check whether a specific certificate is still valid', true, 1, now(), now()),
    (v_q_id, 'CRL is for software; OCSP is for hardware', false, 2, now(), now()),
    (v_q_id, 'They are identical in every way', false, 3, now(), now()),
    (v_q_id, 'CRL is an operating system; OCSP is a programming language', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Data Encryption Standard (DES) and why is it forbidden in modern IoT systems?', 'NIST deprecated DES in 2005. Modern systems mandate **AES-128 / AES-256** or lightweight ciphers like **ASCON**.',
    'easy', 1, 0, 50, ARRAY['BCA-306N', 'Unit-4', 'BCA-306N-U4']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A legacy 56-bit symmetric cipher that is considered completely insecure because modern computers can brute-force the entire 56-bit key space in hours', true, 1, now(), now()),
    (v_q_id, 'Because DES was invented by a foreign government', false, 2, now(), now()),
    (v_q_id, 'Because DES uses too much electricity', false, 3, now(), now()),
    (v_q_id, 'Because DES is only for Apple computers', false, 4, now(), now());

END $SEEDED_BLOCK$;
