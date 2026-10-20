DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-304N Unit 5 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    'fdf96420-371c-58b9-bcb7-92e6977e01f6', 'BCA-304N Unit 5: Cloud Economics, Open Challenges and Emerging Paradigms Practice Quiz (50 MCQs)', 'bca-304n-u5-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-304N Unit 5. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is the primary difference between CapEx (Capital Expenditure) and OpEx (Operational Expenditure) in cloud economics?', 'CapEx demands upfront capital expenditures for datacenters and hardware; OpEx shifts IT to recurring operational expenses tied to demand.',
    'easy', 1, 0, 1, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'CapEx involves upfront financial investments in long-term physical assets (datacenters, servers), while OpEx represents ongoing recurring operational expenses paid on a consumption basis (pay-as-you-go)', true, 1, now(), now()),
    (v_q_id, 'CapEx is for software, OpEx is for hardware', false, 2, now(), now()),
    (v_q_id, 'CapEx is paid monthly, OpEx is paid once every ten years', false, 3, now(), now()),
    (v_q_id, 'There is no difference; they are interchangeable accounting terms', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does TCO stand for in cloud financial planning?', 'Total Cost of Ownership evaluates the complete financial lifecycle cost of hosting infrastructure (hardware, power, cooling, real estate, personnel).',
    'easy', 1, 0, 2, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Total Cost of Ownership', true, 1, now(), now()),
    (v_q_id, 'Technical Cloud Operations', false, 2, now(), now()),
    (v_q_id, 'Time-Critical Organization', false, 3, now(), now()),
    (v_q_id, 'Throughput Configuration Option', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following is typically included in an on-premises datacenter TCO calculation but eliminated or reduced in a public cloud model?', 'Datacenter TCO incorporates real estate, electrical power, cooling HVAC, hardware depreciation, and facility staffing.',
    'medium', 1, 0, 3, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Electricity, datacenter floor space leasing, cooling HVAC infrastructure, and physical security guards', true, 1, now(), now()),
    (v_q_id, 'The cost of writing software code', false, 2, now(), now()),
    (v_q_id, 'The salaries of marketing executives', false, 3, now(), now()),
    (v_q_id, 'Internet domain registration fees', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Service Level Agreement (SLA) in cloud computing contracts?', 'An SLA formally specifies guaranteed service standards (e.g., 99.99% uptime), reporting mechanisms, and financial remedies if breached.',
    'easy', 1, 0, 4, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A sales flyer advertising new cloud features', false, 1, now(), now()),
    (v_q_id, 'A legally binding contract between a cloud service provider and consumer that defines guaranteed service performance metrics (such as availability, uptime percentage) and financial penalties/credits for outages', true, 2, now(), now()),
    (v_q_id, 'A user manual for installing Linux', false, 3, now(), now()),
    (v_q_id, 'A certificate showing a server passed inspection', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Four Nines'' (99.99%) availability in an SLA mathematically equate to in terms of maximum allowable unplanned downtime per year?', '99.99% uptime permits at most (365 * 24 * 60) * 0.0001 = 52.56 minutes of total unplanned downtime per calendar year.',
    'medium', 1, 0, 5, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Approximately 52.6 minutes of downtime per year', true, 1, now(), now()),
    (v_q_id, 'Approximately 8.76 hours of downtime per year', false, 2, now(), now()),
    (v_q_id, 'Exactly 30 days of downtime per year', false, 3, now(), now()),
    (v_q_id, 'Zero downtime is allowed', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Five Nines'' (99.999%) availability equate to per year?', '99.999% availability permits less than 5.26 minutes of unplanned outage across an entire year.',
    'medium', 1, 0, 6, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Approximately 5.26 minutes of downtime per year', true, 1, now(), now()),
    (v_q_id, 'Approximately 52 minutes of downtime per year', false, 2, now(), now()),
    (v_q_id, '5 hours of downtime per year', false, 3, now(), now()),
    (v_q_id, '10 seconds of downtime per month', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Service Credit'' in a cloud SLA context?', 'Service credits reimburse consumers a percentage of billing fees if provider uptime falls below contracted SLA thresholds.',
    'easy', 1, 0, 7, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Free airline miles given to software engineers', false, 1, now(), now()),
    (v_q_id, 'A financial refund or credit applied against future billing invoices granted to the customer when the cloud provider fails to meet agreed uptime SLA thresholds', true, 2, now(), now()),
    (v_q_id, 'A gift card to buy software books', false, 3, now(), now()),
    (v_q_id, 'A bonus payment made to the cloud salesperson', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the ''Shared Responsibility Model'' for Cloud Security?', 'The provider secures underlying hardware, facilities, and virtualization (''of the cloud''); consumers secure data, configurations, and credentials (''in the cloud'').',
    'easy', 1, 0, 8, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The cloud provider is 100% responsible for all security, while the customer has zero responsibility', false, 1, now(), now()),
    (v_q_id, 'A security framework where the provider secures the underlying cloud infrastructure (''Security OF the Cloud''), while the customer secures their data, OS, identities, and application code (''Security IN the Cloud'')', true, 2, now(), now()),
    (v_q_id, 'The government is responsible for all server security', false, 3, now(), now()),
    (v_q_id, 'Security is shared equally among all internet users', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the Shared Responsibility Model, who is responsible for configuring firewall rules (Security Groups) and IAM permissions in an IaaS environment?', 'The customer is responsible for configuring access controls, identity policies, network security groups, and encryption.',
    'easy', 1, 0, 9, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The Cloud Customer (Consumer)', true, 1, now(), now()),
    (v_q_id, 'The Cloud Provider exclusively', false, 2, now(), now()),
    (v_q_id, 'The physical hardware manufacturer', false, 3, now(), now()),
    (v_q_id, 'The internet router technician', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Data at Rest Encryption''?', 'Encryption at rest protects stored data on disk/SAN arrays using algorithms like AES-256.',
    'easy', 1, 0, 10, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Encrypting data while a computer is turned off', false, 1, now(), now()),
    (v_q_id, 'The cryptographic protection of data stored on persistent physical media (hard drives, SSDs, backup tapes) to prevent unauthorized access if physical drives are stolen or accessed out-of-band', true, 2, now(), now()),
    (v_q_id, 'Encrypting files only during night hours', false, 3, now(), now()),
    (v_q_id, 'Encrypting text inside RAM memory registers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Data in Transit Encryption''?', 'Encryption in transit safeguards network communication streams across public/private paths against eavesdropping and man-in-the-middle attacks.',
    'easy', 1, 0, 11, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Encrypting data stored in moving delivery vans', false, 1, now(), now()),
    (v_q_id, 'The cryptographic protection of data packets as they travel across public or private networks (e.g., using TLS/HTTPS or IPsec VPNs) to prevent interception and tampering', true, 2, now(), now()),
    (v_q_id, 'Encrypting data on backup tapes', false, 3, now(), now()),
    (v_q_id, 'Printing encrypted codes on paper', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Data in Use Encryption'' (Confidential Computing)?', 'Confidential computing isolates active data in hardware-enforced memory enclaves, protecting it even from hypervisors or cloud admins.',
    'hard', 1, 0, 12, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Encrypting spreadsheets while an employee types', false, 1, now(), now()),
    (v_q_id, 'Protecting data while it is actively processed in memory and CPU registers using hardware-based Trusted Execution Environments (TEEs, like Intel SGX or AMD SEV)', true, 2, now(), now()),
    (v_q_id, 'Encrypting data on USB thumb drives', false, 3, now(), now()),
    (v_q_id, 'Setting a password on a PDF file', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Edge Computing''?', 'Edge computing processes sensor and device data locally near the physical perimeter, slashing round-trip network delays and cloud bandwidth.',
    'easy', 1, 0, 13, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Computing done on the sharp edge of a desk', false, 1, now(), now()),
    (v_q_id, 'A distributed computing paradigm that brings computation, data storage, and analytics closer to the physical location where data is generated (the ''edge'' of the network) to reduce latency and bandwidth consumption', true, 2, now(), now()),
    (v_q_id, 'Computing performed on high-altitude airplanes', false, 3, now(), now()),
    (v_q_id, 'An old computing paradigm that was replaced by mainframes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary motivation for deploying Edge Computing rather than sending all data to a centralized Cloud?', 'Real-time mission-critical applications (sub-millisecond robotics, telemedicine) cannot endure latency or disconnection risks of centralized cloud round-trips.',
    'medium', 1, 0, 14, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Centralized cloud servers do not support internet connections', false, 1, now(), now()),
    (v_q_id, 'Ultra-low latency requirements (e.g., autonomous driving, industrial robotics), bandwidth constraints, intermittent internet connectivity, and immediate local decision-making', true, 2, now(), now()),
    (v_q_id, 'Edge computing hardware is always free of charge', false, 3, now(), now()),
    (v_q_id, 'To prevent software from using electricity', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does Edge Computing differ fundamentally from Cloud Computing?', 'Cloud offers centralized, massive, elastic scale; Edge provides decentralized, proximate, real-time micro-processing.',
    'easy', 1, 0, 15, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Edge computing centralizes all data in global mega-datacenters, while Cloud computing distributes data to sensors', false, 1, now(), now()),
    (v_q_id, 'Cloud computing centralizes vast computational power in distant regional datacenters, while Edge computing decentralizes small-footprint processing directly to local gateways and physical edge devices', true, 2, now(), now()),
    (v_q_id, 'There is no difference; they are exact duplicates', false, 3, now(), now()),
    (v_q_id, 'Cloud computing only runs on Linux, while edge only runs on Windows', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Fog Computing'' (a term coined by Cisco)?', 'Fog computing provides a hierarchical intermediate compute/storage tier between resource-constrained edge devices and distant cloud backends.',
    'medium', 1, 0, 16, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Computing done in foggy outdoor weather', false, 1, now(), now()),
    (v_q_id, 'An architectural layer that extends cloud computing capabilities down to the edge of an enterprise network, acting as an intermediary continuum between edge IoT devices and centralized cloud datacenters', true, 2, now(), now()),
    (v_q_id, 'Cooling servers with artificial fog', false, 3, now(), now()),
    (v_q_id, 'A cloud platform that only works on rainy days', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary distinction between Fog Computing and Edge Computing?', 'Edge resides directly on or near terminal sensors; Fog spans the intermediate local area networking nodes orchestrating edge clusters.',
    'medium', 1, 0, 17, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Fog computing is centralized, while Cloud computing is local', false, 1, now(), now()),
    (v_q_id, 'Edge computing typically processes data directly on devices or attached local controllers, whereas Fog computing encompasses the multi-tiered local area network infrastructure (switches, local fog nodes) between the edge and the cloud', true, 2, now(), now()),
    (v_q_id, 'Edge computing only handles video, while Fog handles audio', false, 3, now(), now()),
    (v_q_id, 'They were invented by the exact same researcher in 1950', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In an autonomous vehicle, why must obstacle detection algorithms execute at the Edge rather than in the Cloud?', 'Sub-10ms braking responses require real-time on-board edge inference; network latency or signal loss would cause fatal crashes.',
    'easy', 1, 0, 18, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because cloud servers do not have enough memory', false, 1, now(), now()),
    (v_q_id, 'Because a vehicle traveling at 100 km/h cannot tolerate the 100-200ms network round-trip latency or potential cellular dead-zones of the cloud when life-critical braking decisions must be made in milliseconds', true, 2, now(), now()),
    (v_q_id, 'Because vehicles are prohibited from connecting to the internet', false, 3, now(), now()),
    (v_q_id, 'Because autonomous vehicles do not have cameras', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Mobile Cloud Computing'' (MCC)?', 'MCC offloads compute-heavy tasks from battery-constrained mobile devices to remote cloud backends.',
    'medium', 1, 0, 19, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Moving physical datacenter servers onto trucks', false, 1, now(), now()),
    (v_q_id, 'An infrastructure where both data storage and data processing are moved away from mobile devices and into remote cloud datacenters, overcoming mobile battery and processing constraints', true, 2, now(), now()),
    (v_q_id, 'A cloud that can only be accessed on flip phones', false, 3, now(), now()),
    (v_q_id, 'A cloud server powered by mobile batteries', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Computation Offloading'' (Cyber Foraging) in Mobile Cloud Computing?', 'Offloading migrates execution of heavy algorithm segments to cloud surrogates, extending mobile battery endurance.',
    'medium', 1, 0, 20, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Turning off a mobile phone to save power', false, 1, now(), now()),
    (v_q_id, 'The runtime practice of transferring resource-intensive computational tasks (e.g., 3D graphics rendering, video encoding) from a resource-constrained mobile device to a powerful nearby surrogate server or cloud node', true, 2, now(), now()),
    (v_q_id, 'Deleting unused mobile apps to free disk space', false, 3, now(), now()),
    (v_q_id, 'Stealing computer processing power from neighbors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an ''IoT Gateway'' in edge-to-cloud architectures?', 'IoT gateways bridge constrained device protocols (Zigbee, Modbus) with IP clouds, pre-filtering telemetry before transmission.',
    'easy', 1, 0, 21, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical gate in a fence surrounding a datacenter', false, 1, now(), now()),
    (v_q_id, 'A hardware device or software program that connects local IoT sensor networks to the cloud, performing protocol translation, data aggregation, filtering, and local edge processing', true, 2, now(), now()),
    (v_q_id, 'A website that sells IoT sensors', false, 3, now(), now()),
    (v_q_id, 'A network cable that connects two sensors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Digital Twin'' in modern cloud and industrial IoT ecosystems?', 'Digital Twins pair real-world physical machinery with live virtual models, enabling predictive maintenance and stress simulation.',
    'medium', 1, 0, 22, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Two identical laptops purchased together', false, 1, now(), now()),
    (v_q_id, 'A dynamic, real-time virtual digital simulation or model of a physical asset, process, or system, continuously updated using live sensor data from the physical counterpart', true, 2, now(), now()),
    (v_q_id, 'A software engineer who writes code identical to another engineer', false, 3, now(), now()),
    (v_q_id, 'A backup copy of a computer hard drive', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is CloudSim?', 'CloudSim is the leading academic Java toolkit for simulating virtualized datacenters, VM allocation policies, and energy metrics.',
    'easy', 1, 0, 23, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A video game simulating life in the clouds', false, 1, now(), now()),
    (v_q_id, 'A generalized open-source framework and simulation toolkit developed in Java for modeling, simulating, and experimenting with cloud computing infrastructures and resource management policies', true, 2, now(), now()),
    (v_q_id, 'A cloud-based flight simulator', false, 3, now(), now()),
    (v_q_id, 'A tool for animating clouds in movies', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why do researchers use cloud simulators like CloudSim rather than real commercial clouds for academic research?', 'Simulators provide deterministic, controllable, cost-free environments to stress-test novel scheduling and energy-efficient algorithms.',
    'medium', 1, 0, 24, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because commercial clouds are completely illegal for researchers to use', false, 1, now(), now()),
    (v_q_id, 'Because CloudSim allows repeatable, controllable, risk-free, and zero-cost experimental evaluation of resource allocation, VM scheduling, and energy policies across massive simulated datacenter scales', true, 2, now(), now()),
    (v_q_id, 'Because CloudSim executes 1000x faster than real physical electrons', false, 3, now(), now()),
    (v_q_id, 'Because CloudSim requires no computer hardware', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is iFogSim?', 'iFogSim extends CloudSim to evaluate latency, energy consumption, and network congestion in hierarchical Fog and IoT topologies.',
    'medium', 1, 0, 25, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An Apple iPhone application for checking weather fog', false, 1, now(), now()),
    (v_q_id, 'A simulation toolkit built on top of CloudSim specifically designed for modeling and simulating resource management and application scheduling in Fog and IoT computing environments', true, 2, now(), now()),
    (v_q_id, 'A software program for driving cars in foggy weather', false, 3, now(), now()),
    (v_q_id, 'A cloud simulator that runs exclusively on macOS', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In CloudSim, what does a `DatacenterBroker` represent?', 'The DatacenterBroker mediates between users and providers, scheduling Cloudlet workloads onto allocated VM instances.',
    'hard', 1, 0, 26, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A commercial salesperson who sells cloud subscriptions', false, 1, now(), now()),
    (v_q_id, 'An entity that acts on behalf of a cloud consumer, negotiating with datacenter providers and submitting VM provisioning requests and Cloudlet tasks according to policy', true, 2, now(), now()),
    (v_q_id, 'A physical network switch inside the datacenter', false, 3, now(), now()),
    (v_q_id, 'An automated bank wire transfer program', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In CloudSim, what is a `Cloudlet`?', 'A Cloudlet models computational tasks with defined length (Million Instructions), I/O operations, and resource requirements.',
    'medium', 1, 0, 27, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A tiny water droplet inside a rain cloud', false, 1, now(), now()),
    (v_q_id, 'A modeling abstraction that represents a user application task or computational workload to be scheduled and executed on a virtual machine, characterized by its instruction length in MIPS', true, 2, now(), now()),
    (v_q_id, 'A miniature physical server chassis', false, 3, now(), now()),
    (v_q_id, 'A small text file saved on a cloud server', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In CloudSim, what does `BAP` (Broker Allocation Policy) or `VmAllocationPolicy` govern?', 'VmAllocationPolicy dictates how virtual machines are assigned to physical hosts during cluster provisioning.',
    'hard', 1, 0, 28, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The financial pricing of cloud services', false, 1, now(), now()),
    (v_q_id, 'The algorithmic policy used by a datacenter to allocate and place virtual machines onto physical host machines (e.g., First Fit, Best Fit, Energy-Aware placement)', true, 2, now(), now()),
    (v_q_id, 'The physical layout of power cables in racks', false, 3, now(), now()),
    (v_q_id, 'The speed of cooling fans', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does `MIPS` stand for when benchmarking compute capacity in CloudSim?', 'MIPS measures computational throughput, defining processing capacity of PEs (Processing Elements) in CloudSim.',
    'easy', 1, 0, 29, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Million Instructions Per Second', true, 1, now(), now()),
    (v_q_id, 'Maximum Internet Packet Speed', false, 2, now(), now()),
    (v_q_id, 'Multi-Instance Processing System', false, 3, now(), now()),
    (v_q_id, 'Memory Indexing Pointer Service', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Energy-Aware Cloud Computing'' (Green Cloud Computing)?', 'Green computing optimizes cooling, dynamic voltage frequency scaling (DVFS), and VM consolidation to curb datacenter carbon emissions.',
    'easy', 1, 0, 30, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Painting server racks with green eco-friendly paint', false, 1, now(), now()),
    (v_q_id, 'The study and implementation of architectural designs, VM consolidation algorithms, and hardware power-management techniques to minimize electrical power consumption and carbon footprints in datacenters', true, 2, now(), now()),
    (v_q_id, 'Running servers exclusively using wind turbines', false, 3, now(), now()),
    (v_q_id, 'A cloud platform dedicated to gardening websites', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is DVFS (Dynamic Voltage and Frequency Scaling) in energy-efficient cloud management?', 'DVFS throttles CPU clock frequency and core voltages down during low-load intervals, achieving quadratic power savings (P ~ V²f).',
    'hard', 1, 0, 31, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A technique to change the color of server LED lights', false, 1, now(), now()),
    (v_q_id, 'A hardware power management technique where the operating frequency and voltage of a processor are dynamically adjusted to conserve electrical energy during low workload periods', true, 2, now(), now()),
    (v_q_id, 'A method for adjusting network bandwidth speeds', false, 3, now(), now()),
    (v_q_id, 'An audio processing filter for sound files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''VM Consolidation'' in green cloud data centers?', 'Consolidation leverages live migration to condense workloads onto fewer hosts, turning idle servers off to eliminate baseline power draw.',
    'medium', 1, 0, 32, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Erasing old virtual machines permanently', false, 1, now(), now()),
    (v_q_id, 'Dynamically packing active virtual machines onto the minimum number of physical host servers using live migration, allowing idle physical hosts to be switched into low-power sleep modes', true, 2, now(), now()),
    (v_q_id, 'Buying more physical servers to reduce density', false, 3, now(), now()),
    (v_q_id, 'Consolidating all customer bills into a single invoice', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Cloud Vendor Lock-in'' and how does containerization (Docker/Kubernetes) mitigate it?', 'Containers abstract underlying OS and cloud proprietary runtimes, enabling seamless portability across multi-cloud infrastructure.',
    'easy', 1, 0, 33, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A legal contract that locks employees into working for one company', false, 1, now(), now()),
    (v_q_id, 'Vendor lock-in traps users in proprietary cloud APIs; containerization packages applications and their runtimes into standardized portable units that can run identically on any cloud provider or on-premises', true, 2, now(), now()),
    (v_q_id, 'Containers prevent cloud servers from being physically stolen', false, 3, now(), now()),
    (v_q_id, 'Lock-in is a physical padlock placed on server racks', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is FinOps (Cloud Financial Operations)?', 'FinOps unites engineering, finance, and product teams to optimize cloud unit economics and enforce spend governance.',
    'easy', 1, 0, 34, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A banking software program used by cloud companies', false, 1, now(), now()),
    (v_q_id, 'An evolving operational discipline and cultural practice that brings financial accountability to the variable spend model of cloud, enabling cross-functional teams to make data-driven trade-offs between cost, speed, and quality', true, 2, now(), now()),
    (v_q_id, 'A computer algorithm that automatically invests money in the stock market', false, 3, now(), now()),
    (v_q_id, 'A method for avoiding paying taxes on cloud services', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Reserved Instance'' (RI) in cloud pricing models?', 'Reserved instances reward predictable steady-state workload commitments with substantial cost savings over on-demand rates.',
    'easy', 1, 0, 35, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A server kept in reserve in case of a military emergency', false, 1, now(), now()),
    (v_q_id, 'A billing commitment where a consumer commits to purchasing compute capacity for a 1-year or 3-year term in exchange for significant discounts (up to 72%) compared to on-demand pricing', true, 2, now(), now()),
    (v_q_id, 'An instance that can only be used by company executives', false, 3, now(), now()),
    (v_q_id, 'A virtual machine that is kept permanently turned off', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Spot Instance'' (or Preemptible VM)?', 'Spot instances monetize excess provider capacity at massive discounts, subject to immediate preemption when baseline demand surges.',
    'medium', 1, 0, 36, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An instance used to spot errors in software code', false, 1, now(), now()),
    (v_q_id, 'Unused spare compute capacity offered by cloud providers at steep discounts (up to 90%), which the provider can reclaim (terminate) with short notice (e.g., 2 minutes) when on-demand capacity is needed', true, 2, now(), now()),
    (v_q_id, 'A server painted with polka dots', false, 3, now(), now()),
    (v_q_id, 'An instance located in a specific GPS spot', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which type of workload is ideal for execution on Spot Instances?', 'Fault-tolerant, stateless batch workloads can absorb abrupt node terminations and resume processing on alternative instances.',
    'medium', 1, 0, 37, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Mission-critical transaction databases that cannot tolerate any interruption', false, 1, now(), now()),
    (v_q_id, 'Fault-tolerant, stateless, batch-processing workloads (such as genomic analysis, big data MapReduce, video rendering, or machine learning training)', true, 2, now(), now()),
    (v_q_id, 'Emergency 911 dispatch communication servers', false, 3, now(), now()),
    (v_q_id, 'Live real-time hospital patient monitoring systems', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Data Egress Fee'' in cloud billing?', 'Data ingress (inbound) is typically free, whereas data egress (outbound transfer) incurs metered bandwidth fees.',
    'medium', 1, 0, 38, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The fee paid to enter a cloud datacenter building', false, 1, now(), now()),
    (v_q_id, 'The fee charged by cloud providers for transferring network data out of their cloud infrastructure to the public internet or to a different cloud provider', true, 2, now(), now()),
    (v_q_id, 'The cost of deleting old database files', false, 3, now(), now()),
    (v_q_id, 'The cost of writing new data into a database', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why are high Data Egress Fees often cited as a significant contributor to Cloud Vendor Lock-in?', 'Exorbitant per-gigabyte egress costs create economic gravity wells that penalize organizations seeking to repatriate data.',
    'medium', 1, 0, 39, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because cloud providers delete customer accounts if egress fees are not paid in cash', false, 1, now(), now()),
    (v_q_id, 'Because moving massive enterprise datasets (petabytes) out of a cloud provider to an alternative provider incurs exorbitant network transfer bills', true, 2, now(), now()),
    (v_q_id, 'Because internet service providers block egress traffic', false, 3, now(), now()),
    (v_q_id, 'Because egress traffic is technically impossible over fiber optics', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Cloud Bursting'' to handle sudden unpredictable traffic surges?', 'Cloud bursting preserves on-premises investments while renting public cloud capacity strictly for unpredictable seasonal peaks.',
    'easy', 1, 0, 40, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A catastrophic failure of cloud servers during an earthquake', false, 1, now(), now()),
    (v_q_id, 'An architecture where baseline traffic is served by on-premises private infrastructure, and when demand spikes exceed capacity, overflow traffic is dynamically routed to public cloud instances', true, 2, now(), now()),
    (v_q_id, 'Streaming audio and video simultaneously', false, 3, now(), now()),
    (v_q_id, 'A sudden burst of light inside server cabinets', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Zero Trust Architecture'' (ZTA) in modern cloud security?', 'Zero Trust assumes network perimeters are breached; all requests are authenticated, authorized, and encrypted per-transaction.',
    'medium', 1, 0, 41, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A policy where companies refuse to trust any software developers', false, 1, now(), now()),
    (v_q_id, 'A security paradigm based on the principle of ''Never Trust, Always Verify'', requiring strict identity verification and least-privilege access for every entity attempting to access resources, regardless of network perimeter location', true, 2, now(), now()),
    (v_q_id, 'A computer network with zero firewalls', false, 3, now(), now()),
    (v_q_id, 'A software program that has zero lines of code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In cloud disaster recovery, which strategy has the lowest RTO and RPO, but the highest financial cost?', 'Active-Active deployments run live traffic across redundant multi-region clusters simultaneously, offering near-zero RTO/RPO.',
    'medium', 1, 0, 42, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Backup and Restore (Cold Standby)', false, 1, now(), now()),
    (v_q_id, 'Pilot Light', false, 2, now(), now()),
    (v_q_id, 'Warm Standby', false, 3, now(), now()),
    (v_q_id, 'Multi-Region Active-Active (Hot Standby)', true, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In cloud disaster recovery, what is a ''Pilot Light'' strategy?', 'Pilot light maintains live database state replicas, provisioning web and app server fleets only when disaster strikes.',
    'medium', 1, 0, 43, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Keeping a tiny gas flame burning inside the server room', false, 1, now(), now()),
    (v_q_id, 'A disaster recovery strategy where minimal core infrastructure components (like database replication) run continuously in the cloud, while compute servers remain turned off until failover occurs', true, 2, now(), now()),
    (v_q_id, 'Flying an airplane to inspect datacenter roofs', false, 3, now(), now()),
    (v_q_id, 'Testing software once every five years', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Cold Standby'' in disaster recovery?', 'Cold standby has minimal ongoing cost (storage snapshots only) but requires hours or days to rebuild environments after outages.',
    'easy', 1, 0, 44, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Storing server hardware in a giant refrigerator', false, 1, now(), now()),
    (v_q_id, 'Taking periodic backups of data and rebuilding infrastructure from scratch in the secondary region only after a disaster occurs, resulting in the highest RTO and RPO', true, 2, now(), now()),
    (v_q_id, 'Running servers at freezing temperatures to improve performance', false, 3, now(), now()),
    (v_q_id, 'An unstaffed datacenter with no heat', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Chaos Engineering'' (pioneered by Netflix with Chaos Monkey)?', 'Chaos engineering purposefully terminates production instances and injects latency to surface brittle dependencies before catastrophic outages occur.',
    'medium', 1, 0, 45, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Allowing monkeys to play with server hardware', false, 1, now(), now()),
    (v_q_id, 'The discipline of experimenting on a distributed software system in production by intentionally injecting failures (killing servers, severing network links) to build confidence in the system''s capability to withstand turbulent conditions', true, 2, now(), now()),
    (v_q_id, 'Writing software without any planning or architecture', false, 3, now(), now()),
    (v_q_id, 'A mathematical theory about chaotic weather patterns', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Cloud Repatriation''?', 'Repatriation shifts mature, predictable-scale workloads from expensive public clouds back to owned on-premises hardware.',
    'medium', 1, 0, 46, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Deporting illegal software programs from a country', false, 1, now(), now()),
    (v_q_id, 'The emerging trend of moving workloads, applications, and data away from public cloud environments back to on-premises private datacenters or colocation facilities to reduce costs or regain control', true, 2, now(), now()),
    (v_q_id, 'Translating software documentation into foreign languages', false, 3, now(), now()),
    (v_q_id, 'Sending old computers back to their manufacturer', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Serverless Framework'' / AWS SAM?', 'Serverless tooling abstracts cloud formation templates, accelerating local debugging and automated CI/CD deployments.',
    'easy', 1, 0, 47, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A framework for running computers without electricity', false, 1, now(), now()),
    (v_q_id, 'Developer toolings and abstraction layers that simplify the configuration, testing, and deployment of serverless functions and event triggers using declarative YAML templates', true, 2, now(), now()),
    (v_q_id, 'A wooden frame used to hold server hardware', false, 3, now(), now()),
    (v_q_id, 'An operating system for mainframes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Cold Start'' refer to in Serverless / FaaS architectures?', 'Cold starts incur initialization penalties (spawning sandbox containers, loading language runtimes) on initial function invocations.',
    'medium', 1, 0, 48, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Starting a computer in a cold room in winter', false, 1, now(), now()),
    (v_q_id, 'The latency delay experienced when a serverless function is invoked for the first time or after being idle, because the cloud provider must spin up a new container runtime and load application code', true, 2, now(), now()),
    (v_q_id, 'A computer that fails to boot', false, 3, now(), now()),
    (v_q_id, 'Restarting a server after an electrical outage', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How can Serverless ''Cold Starts'' be mitigated in production environments?', 'Provisioned concurrency pre-warms container runtimes, ensuring sub-millisecond execution without cold initialization pauses.',
    'medium', 1, 0, 49, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'By keeping function container runtimes warm using scheduled ping requests or provisioned concurrency configurations', true, 1, now(), now()),
    (v_q_id, 'By moving servers to warmer tropical countries', false, 2, now(), now()),
    (v_q_id, 'By deleting the serverless function entirely', false, 3, now(), now()),
    (v_q_id, 'By using only 8-bit computers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary role of a ''Cloud Access Security Broker'' (CASB)?', 'CASBs enforce enterprise security policies (DLP, threat prevention, encryption, shadow IT discovery) across SaaS and multi-cloud estates.',
    'hard', 1, 0, 50, ARRAY['BCA-304N', 'Unit-5', 'BCA-304N-U5']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical broker who sells datacenter insurance', false, 1, now(), now()),
    (v_q_id, 'An on-premises or cloud-hosted software tool that sits between cloud service consumers and cloud service providers to enforce enterprise security, governance, and compliance policies across multiple cloud applications', true, 2, now(), now()),
    (v_q_id, 'A password cracking tool used by hackers', false, 3, now(), now()),
    (v_q_id, 'A network cable that connects two buildings', false, 4, now(), now());

END $SEEDED_BLOCK$;
