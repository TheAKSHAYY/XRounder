DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-304N Unit 1 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    'a6006172-65c5-5e2f-b3e6-d4c227abf563', 'BCA-304N Unit 1: Introduction to Parallel, Distributed and Cloud Computing Practice Quiz (50 MCQs)', 'bca-304n-u1-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-304N Unit 1. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'According to the National Institute of Standards and Technology (NIST), what is Cloud Computing?', 'The official NIST Special Publication 800-145 defines cloud computing as an on-demand, ubiquitous network-accessible shared pool of configurable computing resources.',
    'easy', 1, 0, 1, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical underground storage facility for backup magnetic tapes', false, 1, now(), now()),
    (v_q_id, 'A model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources that can be rapidly provisioned with minimal management effort', true, 2, now(), now()),
    (v_q_id, 'An operating system installed exclusively on personal desktop computers', false, 3, now(), now()),
    (v_q_id, 'A high-speed optical fiber cable connecting continents', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How many essential characteristics of Cloud Computing are defined in the NIST model?', 'NIST defines five essential characteristics: On-demand self-service, Broad network access, Resource pooling, Rapid elasticity, and Measured service.',
    'easy', 1, 0, 2, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Three (3)', false, 1, now(), now()),
    (v_q_id, 'Four (4)', false, 2, now(), now()),
    (v_q_id, 'Five (5)', true, 3, now(), now()),
    (v_q_id, 'Seven (7)', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which NIST characteristic allows a consumer to unilaterally provision computing capabilities (such as server time and network storage) automatically without human interaction with the service provider?', 'On-demand self-service permits automated provisioning of compute/storage without human intervention from the provider.',
    'easy', 1, 0, 3, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Resource Pooling', false, 1, now(), now()),
    (v_q_id, 'On-Demand Self-Service', true, 2, now(), now()),
    (v_q_id, 'Rapid Elasticity', false, 3, now(), now()),
    (v_q_id, 'Broad Network Access', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which NIST characteristic states that capabilities are available over the network and accessed through standard mechanisms by heterogeneous thin or thick client platforms?', 'Broad network access ensures resources are accessible over telecommunications networks via mobile phones, laptops, and workstations.',
    'easy', 1, 0, 4, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Broad Network Access', true, 1, now(), now()),
    (v_q_id, 'Measured Service', false, 2, now(), now()),
    (v_q_id, 'Multi-tenancy', false, 3, now(), now()),
    (v_q_id, 'Resource Pooling', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Resource Pooling'' mean in the NIST cloud model?', 'Resource pooling serves multi-tenant consumers by dynamically allocating physical and virtual resources with location independence.',
    'medium', 1, 0, 5, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Combining physical water coolant pools in data centers', false, 1, now(), now()),
    (v_q_id, 'The provider''s computing resources are pooled to serve multiple consumers using a multi-tenant model, with different physical and virtual resources dynamically assigned according to demand', true, 2, now(), now()),
    (v_q_id, 'Merging user passwords into a single file', false, 3, now(), now()),
    (v_q_id, 'Sharing a single keyboard between multiple operators', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which NIST characteristic describes capabilities that can be elastically provisioned and released to scale rapidly outward and inward commensurate with demand?', 'Rapid elasticity allows dynamic autoscaling of compute/storage capacity up or down to handle fluctuating workloads.',
    'easy', 1, 0, 6, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Rapid Elasticity', true, 1, now(), now()),
    (v_q_id, 'Measured Service', false, 2, now(), now()),
    (v_q_id, 'On-Demand Self-Service', false, 3, now(), now()),
    (v_q_id, 'Broad Network Access', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Measured Service'' mean in cloud computing?', 'Measured service provides transparency by monitoring, controlling, and billing resource usage (bandwidth, storage, compute hours) based on consumption.',
    'easy', 1, 0, 7, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Measuring the physical dimensions and weight of server cabinets', false, 1, now(), now()),
    (v_q_id, 'Cloud systems automatically control and optimize resource use by leveraging a metering capability at some level of abstraction appropriate to the type of service (pay-per-use)', true, 2, now(), now()),
    (v_q_id, 'Measuring the room temperature of the data center', false, 3, now(), now()),
    (v_q_id, 'Counting the number of lines of source code in cloud applications', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Parallel Computing?', 'Parallel computing breaks problems into discrete parts executed concurrently on multiple processors.',
    'easy', 1, 0, 8, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Executing instructions strictly one after another on a single core processor', false, 1, now(), now()),
    (v_q_id, 'A form of computation in which many calculations or the execution of processes are carried out simultaneously on multiple processing elements', true, 2, now(), now()),
    (v_q_id, 'Typing code with two hands in parallel', false, 3, now(), now()),
    (v_q_id, 'Connecting two monitors to a single laptop', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Parallel Computing, what distinguishes Shared Memory architecture from Distributed Memory architecture?', 'Shared memory architectures share physical memory across cores (e.g., SMP); distributed systems coordinate separate node memories via network message passing (MPI).',
    'medium', 1, 0, 9, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Shared memory systems access a common global physical address space, while distributed memory systems have distinct private memories connected via a network message passing interface', true, 1, now(), now()),
    (v_q_id, 'Shared memory is always slower than distributed memory', false, 2, now(), now()),
    (v_q_id, 'Distributed memory systems cannot execute parallel loops', false, 3, now(), now()),
    (v_q_id, 'Shared memory requires no operating system', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Distributed Computing?', 'A distributed system consists of autonomous networked computers that coordinate through message-passing to appear as a single coherent system.',
    'easy', 1, 0, 10, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A single CPU executing sequential machine instructions', false, 1, now(), now()),
    (v_q_id, 'A field of computer science that studies systems whose components are located on different networked computers, communicating and coordinating actions by passing messages', true, 2, now(), now()),
    (v_q_id, 'A system where all computers are placed in a single cabinet', false, 3, now(), now()),
    (v_q_id, 'Distributing software CDs by postal mail', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Grid Computing''?', 'Grid computing aggregates heterogeneous, geographically dispersed supercomputing resources to execute massive batch workloads.',
    'medium', 1, 0, 11, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An electrical power distribution utility', false, 1, now(), now()),
    (v_q_id, 'A distributed computing architecture that coordinates loosely coupled, heterogeneous, geographically dispersed computers to solve large-scale computational problems', true, 2, now(), now()),
    (v_q_id, 'A database table formatted with grid lines', false, 3, now(), now()),
    (v_q_id, 'A 2D graphics rendering engine', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does Cloud Computing differ fundamentally from Grid Computing?', 'Cloud focuses on virtualized, multi-tenant, elastic service delivery (IaaS/PaaS/SaaS); grid focuses on federated batch job scheduling across academic/scientific clusters.',
    'medium', 1, 0, 12, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Grid computing provides on-demand virtualization, while cloud computing does not', false, 1, now(), now()),
    (v_q_id, 'Cloud computing dynamically provisions virtualized resources with elastic pay-as-you-go self-service for general workloads, whereas Grid computing focuses on federated batch jobs across administrative domains', true, 2, now(), now()),
    (v_q_id, 'Grid computing is modern, while cloud computing is obsolete', false, 3, now(), now()),
    (v_q_id, 'There is no difference; they are exact duplicates', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Utility Computing''?', 'Utility computing packages IT capabilities as metered services billed on actual consumption rates.',
    'easy', 1, 0, 13, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Writing utility scripts in Bash or Python', false, 1, now(), now()),
    (v_q_id, 'A service provisioning model in which computing resources (processing, storage, bandwidth) are packaged and metered like traditional public utilities (water, electricity, gas)', true, 2, now(), now()),
    (v_q_id, 'Fixing power supplies in computers', false, 3, now(), now()),
    (v_q_id, 'Installing antivirus utility tools', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which historical computing paradigm from the 1960s anticipated utility computing and time-sharing networks?', 'In 1961, John McCarthy prophesied that computation might someday be organized as a public utility, just like the telephone system.',
    'medium', 1, 0, 14, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'John McCarthy''s vision of computing as a public utility', true, 1, now(), now()),
    (v_q_id, 'Alan Turing''s Enigma machine', false, 2, now(), now()),
    (v_q_id, 'Charles Babbage''s Difference Engine', false, 3, now(), now()),
    (v_q_id, 'Tim Berners-Lee''s World Wide Web', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the NIST Cloud Computing Reference Architecture, which actor is an entity that maintains a business relationship with, and uses service from, Cloud Providers?', 'The Cloud Consumer is the end person or organization that utilizes cloud services.',
    'easy', 1, 0, 15, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Cloud Consumer', true, 1, now(), now()),
    (v_q_id, 'Cloud Carrier', false, 2, now(), now()),
    (v_q_id, 'Cloud Auditor', false, 3, now(), now()),
    (v_q_id, 'Cloud Broker', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the NIST Cloud Reference Model, what is the role of a ''Cloud Provider''?', 'A Cloud Provider (e.g., AWS, Azure, Google Cloud) owns, operates, and provisions cloud infrastructure and services.',
    'easy', 1, 0, 16, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An entity responsible for making a service available to interested parties', true, 1, now(), now()),
    (v_q_id, 'An entity that regulates government laws', false, 2, now(), now()),
    (v_q_id, 'An entity that manufactures fiber optic glass', false, 3, now(), now()),
    (v_q_id, 'A third party that only conducts security audits', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the role of a ''Cloud Auditor'' in the NIST reference architecture?', 'A Cloud Auditor independently verifies security compliance, privacy controls, performance metrics, and contractual SLAs.',
    'medium', 1, 0, 17, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A party that can conduct independent assessment of cloud services, information system operations, performance, and security of the cloud implementation', true, 1, now(), now()),
    (v_q_id, 'A software program that speeds up downloads', false, 2, now(), now()),
    (v_q_id, 'A person who designs user interface graphics', false, 3, now(), now()),
    (v_q_id, 'A cloud salesperson', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary function of a ''Cloud Broker''?', 'Cloud Brokers aggregate, integrate, or customize cloud services from multiple providers for consumers.',
    'medium', 1, 0, 18, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To manufacture computer chips for servers', false, 1, now(), now()),
    (v_q_id, 'An entity that manages the use, performance, and delivery of cloud services, and negotiates relationships between Cloud Providers and Cloud Consumers', true, 2, now(), now()),
    (v_q_id, 'To sell used desktop computers', false, 3, now(), now()),
    (v_q_id, 'To repair fiber optic cables underground', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Cloud Carrier'' in the NIST cloud model?', 'Cloud Carriers are telecommunications and network operators providing the network transport pipeline between providers and consumers.',
    'medium', 1, 0, 19, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical delivery truck that transports hard drives', false, 1, now(), now()),
    (v_q_id, 'An intermediary that provides connectivity and transport of cloud services from Cloud Providers to Cloud Consumers (e.g., Telecom/ISP network providers)', true, 2, now(), now()),
    (v_q_id, 'A flight carrier transporting cloud engineers', false, 3, now(), now()),
    (v_q_id, 'A shipping container housing server racks', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Multi-Tenancy'' in cloud computing architecture?', 'Multi-tenancy enables shared underlying infrastructure while maintaining logical isolation of data and configuration per tenant.',
    'medium', 1, 0, 20, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Having multiple people physically sit at one desk', false, 1, now(), now()),
    (v_q_id, 'An architectural principle where a single instance of software and its supporting infrastructure serves multiple distinct customer organizations (tenants) with secure data isolation', true, 2, now(), now()),
    (v_q_id, 'Renting ten separate physical servers', false, 3, now(), now()),
    (v_q_id, 'Connecting ten monitors to one computer', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary economic benefit of Cloud Computing for startups and modern enterprises?', 'Cloud shifts capital outlays (datacenter construction, servers) to operational variable expenses aligned with real usage.',
    'easy', 1, 0, 21, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Eliminating the need to hire software programmers', false, 1, now(), now()),
    (v_q_id, 'Converting massive upfront Capital Expenditures (CapEx) in physical hardware into predictable, operational, pay-as-you-go Operational Expenditures (OpEx)', true, 2, now(), now()),
    (v_q_id, 'Guaranteeing that software will never have bugs', false, 3, now(), now()),
    (v_q_id, 'Making physical computers indestructible', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Time-to-Market'' benefit refer to in cloud adoption?', 'Cloud agility lets developers launch infrastructure globally in seconds, slashing time-to-market for new features.',
    'easy', 1, 0, 22, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The time it takes to travel to a computer store', false, 1, now(), now()),
    (v_q_id, 'The ability to rapidly provision infrastructure in minutes rather than months, enabling rapid development, testing, and deployment of business applications', true, 2, now(), now()),
    (v_q_id, 'The time it takes to print receipts', false, 3, now(), now()),
    (v_q_id, 'The daily opening hours of stock markets', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Vendor Lock-in'' mean in the context of cloud computing risks?', 'Vendor lock-in arises when proprietary APIs, data formats, or architectures make switching providers technically and economically difficult.',
    'medium', 1, 0, 23, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical lock placed on server rack doors', false, 1, now(), now()),
    (v_q_id, 'The difficulty, prohibitive cost, and technical friction of migrating applications, configurations, and data from one cloud provider to another or back on-premises', true, 2, now(), now()),
    (v_q_id, 'A cloud vendor going out of business overnight', false, 3, now(), now()),
    (v_q_id, 'A vendor locking the office doors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which term describes the capability of a cloud system to withstand component failures and maintain operational continuity without human intervention?', 'Fault tolerance enables systems to continue operating properly in the event of hardware or subsystem failure through redundancy.',
    'easy', 1, 0, 24, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'High Availability and Fault Tolerance', true, 1, now(), now()),
    (v_q_id, 'Broad Network Access', false, 2, now(), now()),
    (v_q_id, 'Single-Tenant Isolation', false, 3, now(), now()),
    (v_q_id, 'Hard Drive Formatting', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Vertical Scaling'' (Scaling Up)?', 'Vertical scaling (scale up) increases CPU, memory, or disk on an existing node; it has hardware architectural ceilings.',
    'easy', 1, 0, 25, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Mounting servers vertically on the wall', false, 1, now(), now()),
    (v_q_id, 'Adding more physical or virtual resources (such as CPU cores, RAM, or storage) to an existing single server node', true, 2, now(), now()),
    (v_q_id, 'Adding more servers to a distributed cluster', false, 3, now(), now()),
    (v_q_id, 'Increasing the font size on a terminal', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Horizontal Scaling'' (Scaling Out)?', 'Horizontal scaling (scale out) adds more commodity instances, theoretically providing unbounded elasticity.',
    'easy', 1, 0, 26, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Laying server racks flat on the floor', false, 1, now(), now()),
    (v_q_id, 'Adding more individual server nodes or virtual machines to a distributed system to share the workload across a cluster', true, 2, now(), now()),
    (v_q_id, 'Upgrading a single computer''s RAM from 16GB to 64GB', false, 3, now(), now()),
    (v_q_id, 'Decreasing the number of network cables', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which scaling model is inherently favored by modern cloud-native architectures?', 'Cloud-native applications leverage horizontal elasticity, scaling instance counts dynamically behind load balancers.',
    'easy', 1, 0, 27, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Horizontal Scaling (Scale Out) with automated load balancing', true, 1, now(), now()),
    (v_q_id, 'Vertical Scaling (Scale Up) until physical hardware limits are reached', false, 2, now(), now()),
    (v_q_id, 'Manual server re-soldering', false, 3, now(), now()),
    (v_q_id, 'Fixed unchangeable single-server provisioning', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an ''Availability Zone'' (AZ) in commercial cloud infrastructure (e.g., AWS, Azure, GCP)?', 'Availability Zones are isolated physical locations within a cloud Region designed for fault-tolerant high availability.',
    'medium', 1, 0, 28, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A geographical continent', false, 1, now(), now()),
    (v_q_id, 'One or more discrete, physically separated data centers within a region, equipped with redundant power, networking, and low-latency optical connectivity', true, 2, now(), now()),
    (v_q_id, 'A time zone where cloud services operate', false, 3, now(), now()),
    (v_q_id, 'A specific folder on a hard drive', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What constitutes a ''Cloud Region''?', 'A Region is a distinct geographical area hosting multiple redundant Availability Zones.',
    'easy', 1, 0, 29, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A specific country''s legal jurisdiction', false, 1, now(), now()),
    (v_q_id, 'A separate geographic area that contains multiple, isolated, and physically separated Availability Zones connected via a dedicated low-latency fiber network', true, 2, now(), now()),
    (v_q_id, 'A single physical server chassis', false, 3, now(), now()),
    (v_q_id, 'An IP address range', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Latency'' in cloud network communications?', 'Latency measures network delay (usually in milliseconds) between request dispatch and response reception.',
    'easy', 1, 0, 30, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The total storage capacity of an object store', false, 1, now(), now()),
    (v_q_id, 'The time delay taken for a data packet to travel from the source client to the cloud destination and return (round-trip time)', true, 2, now(), now()),
    (v_q_id, 'The monthly price of internet access', false, 3, now(), now()),
    (v_q_id, 'The physical weight of optical cables', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Throughput'' (Bandwidth) in cloud networking?', 'Throughput measures data transfer rate across a transmission medium over a given time duration.',
    'easy', 1, 0, 31, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The number of users logged into a website', false, 1, now(), now()),
    (v_q_id, 'The quantity of data successfully transmitted across a network channel per unit of time (e.g., Gigabits per second)', true, 2, now(), now()),
    (v_q_id, 'The latency of disk seek operations', false, 3, now(), now()),
    (v_q_id, 'The physical length of network cables', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why does data sovereignty pose a regulatory challenge in global cloud computing?', 'Data sovereignty laws dictate that data stored in foreign datacenters must comply with local privacy and access regulations.',
    'medium', 1, 0, 32, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because cloud servers operate in space', false, 1, now(), now()),
    (v_q_id, 'Because data is subject to the legal jurisdictions and privacy laws of the physical nation-state in which the data center physically resides', true, 2, now(), now()),
    (v_q_id, 'Because data cannot be moved across ocean cables', false, 3, now(), now()),
    (v_q_id, 'Because encryption is illegal in all countries', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Disaster Recovery'' (DR) in cloud architecture?', 'Cloud DR leverages geo-replication, snapshots, and multi-region failover to maintain business continuity during catastrophes.',
    'easy', 1, 0, 33, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A set of policies, tools, and procedures to enable the recovery or continuation of vital technology infrastructure and systems following a natural or human-induced disaster', true, 1, now(), now()),
    (v_q_id, 'A team of firefighters stationed at a server facility', false, 2, now(), now()),
    (v_q_id, 'An insurance policy paid to cloud vendors', false, 3, now(), now()),
    (v_q_id, 'Erasing corrupt databases after an attack', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is RTO in cloud disaster recovery planning?', 'RTO specifies the targeted duration within which a business process must be restored after a service disruption.',
    'medium', 1, 0, 34, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Return on Technology Operations', false, 1, now(), now()),
    (v_q_id, 'Recovery Time Objective: the maximum acceptable duration of time that a system can remain offline following a disaster', true, 2, now(), now()),
    (v_q_id, 'Real-Time Optimization', false, 3, now(), now()),
    (v_q_id, 'Resource Tracking Order', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is RPO in cloud disaster recovery?', 'RPO defines the maximum tolerable data loss measured in time units preceding the outage.',
    'medium', 1, 0, 35, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Recovery Point Objective: the maximum acceptable age of files or data that must be recovered from backup storage for normal operations to resume (acceptable data loss duration)', true, 1, now(), now()),
    (v_q_id, 'Rapid Provisioning Order', false, 2, now(), now()),
    (v_q_id, 'Resource Payment Option', false, 3, now(), now()),
    (v_q_id, 'Remote Terminal Output', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which computing model preceded the modern cloud by allowing multiple users to share a central mainframe computer via dumb terminals?', 'Time-sharing systems (pioneered in the 1960s with CTSS and Multics) partitioned mainframe CPU time across interactive terminals.',
    'medium', 1, 0, 36, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Peer-to-Peer Networking', false, 1, now(), now()),
    (v_q_id, 'Time-Sharing Systems', true, 2, now(), now()),
    (v_q_id, 'Quantum Computing', false, 3, now(), now()),
    (v_q_id, 'Blockchain', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In client-server architecture, what is a ''Thick Client'' (Fat Client)?', 'Thick clients perform substantial client-side computational processing, contrasting with thin clients that merely render server outputs.',
    'easy', 1, 0, 37, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A computer with a heavy physical metal case', false, 1, now(), now()),
    (v_q_id, 'A client computer that performs the majority of data processing and business logic locally, relying on the server primarily for data storage', true, 2, now(), now()),
    (v_q_id, 'A smartphone with low processing power', false, 3, now(), now()),
    (v_q_id, 'A web browser running only basic HTML', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In cloud environments, what is a ''Thin Client''?', 'Thin clients offload computation, memory, and storage to remote cloud backends, serving primarily as input/output terminals.',
    'easy', 1, 0, 38, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A computer designed to be as physically thin as possible', false, 1, now(), now()),
    (v_q_id, 'A lightweight client computer or browser application that relies almost entirely on central cloud servers for computational processing and storage', true, 2, now(), now()),
    (v_q_id, 'A client machine with no network connection', false, 3, now(), now()),
    (v_q_id, 'A client that can only display black-and-white text', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''P2P'' (Peer-to-Peer) computing mean?', 'P2P networks distribute tasks and bandwidth among equal peers without central coordination servers.',
    'easy', 1, 0, 39, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Provider-to-Provider cloud routing', false, 1, now(), now()),
    (v_q_id, 'A decentralized communications model in which each party (peer) has equivalent capabilities and either party can initiate a communication session or share resources without a central server', true, 2, now(), now()),
    (v_q_id, 'Point-to-Point dedicated leased line', false, 3, now(), now()),
    (v_q_id, 'Packet-to-Packet network routing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does a Peer-to-Peer network differ from a Client-Server cloud model?', 'Cloud models use centralized provider architectures; P2P aggregates resources collaboratively from decentralized edge nodes.',
    'medium', 1, 0, 40, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Client-Server centralizes control, storage, and processing in designated provider servers, whereas P2P distributes resources symmetrically across participating client nodes', true, 1, now(), now()),
    (v_q_id, 'P2P is always centralized, while Client-Server is decentralized', false, 2, now(), now()),
    (v_q_id, 'Client-Server does not use TCP/IP networking', false, 3, now(), now()),
    (v_q_id, 'P2P cannot transfer files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Autonomic Computing'' in cloud infrastructure management?', 'Autonomic computing (IBM paradigm) incorporates self-configuration, self-optimization, self-healing, and self-protection into cloud control loops.',
    'hard', 1, 0, 41, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Computing done inside moving automobiles', false, 1, now(), now()),
    (v_q_id, 'Self-managing computing systems that can automatically configure, optimize, protect, and heal themselves with minimal human intervention', true, 2, now(), now()),
    (v_q_id, 'A computer that runs without electrical power', false, 3, now(), now()),
    (v_q_id, 'Computers designed exclusively for robotics', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Dynamic Provisioning'' mean in cloud operations?', 'Dynamic provisioning matches resource allocations instantaneously to real-time workload fluctuations.',
    'easy', 1, 0, 42, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Manually installing hard drives when an email is received', false, 1, now(), now()),
    (v_q_id, 'The automated, real-time allocation of computational, storage, and networking resources as required by active application workloads', true, 2, now(), now()),
    (v_q_id, 'Formatting server drives once a year', false, 3, now(), now()),
    (v_q_id, 'Setting fixed CPU frequencies', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following is an example of an open-source private cloud computing software platform?', 'OpenStack is an open-source cloud operating system controlling large pools of compute, storage, and networking resources in enterprise datacenters.',
    'easy', 1, 0, 43, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'OpenStack', true, 1, now(), now()),
    (v_q_id, 'Microsoft Word', false, 2, now(), now()),
    (v_q_id, 'Adobe Acrobat', false, 3, now(), now()),
    (v_q_id, 'Mozilla Firefox', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Serverless Computing''?', 'In serverless (FaaS), developers deploy code functions; the cloud provider manages servers, capacity, and zero-scale billing automatically.',
    'easy', 1, 0, 44, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Computing without any physical servers existing anywhere in the world', false, 1, now(), now()),
    (v_q_id, 'A cloud execution model where the cloud provider dynamically manages the allocation, provisioning, and scaling of servers, charging consumers based on actual execution time rather than pre-purchased server capacity', true, 2, now(), now()),
    (v_q_id, 'A desktop computer with no internet connection', false, 3, now(), now()),
    (v_q_id, 'Running software exclusively on analog circuits', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which cloud concept describes the ability to run applications across multiple distinct cloud providers (e.g., AWS and Google Cloud simultaneously)?', 'A multi-cloud strategy deploys workloads across multiple heterogeneous providers to prevent lock-in and optimize costs/resilience.',
    'easy', 1, 0, 45, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Multi-Cloud Strategy', true, 1, now(), now()),
    (v_q_id, 'Single-Tenant Isolation', false, 2, now(), now()),
    (v_q_id, 'Private Cloud Hosting', false, 3, now(), now()),
    (v_q_id, 'Mainframe Computing', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary motivation for an enterprise adopting a ''Hybrid Cloud'' architecture?', 'Hybrid cloud blends private cloud compliance and sensitive data control with public cloud bursts and flexibility.',
    'medium', 1, 0, 46, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'To double the monthly cloud bill', false, 1, now(), now()),
    (v_q_id, 'To combine the security, governance, and control of on-premises private infrastructure with the elastic scalability and cost-efficiency of the public cloud', true, 2, now(), now()),
    (v_q_id, 'Because private clouds are illegal in certain countries', false, 3, now(), now()),
    (v_q_id, 'To eliminate the use of internet routers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Cloud Bursting''?', 'Cloud bursting routes overflow traffic from internal private infrastructure into public cloud instances during peak demand.',
    'medium', 1, 0, 47, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical explosion in a cloud data center', false, 1, now(), now()),
    (v_q_id, 'An application deployment configuration where an application runs in a private cloud or datacenter and ''bursts'' into a public cloud when demand spikes exceed private capacity', true, 2, now(), now()),
    (v_q_id, 'Deleting old cloud accounts automatically', false, 3, now(), now()),
    (v_q_id, 'A sudden loss of internet connectivity', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Over-Provisioning'' in traditional on-premises IT infrastructure?', 'Traditional IT over-provisions expensive hardware to survive peak traffic bursts, leaving assets idle ~80% of the time.',
    'easy', 1, 0, 48, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Purchasing and maintaining peak-demand hardware capacity that remains underutilized (idle) during normal operating hours', true, 1, now(), now()),
    (v_q_id, 'Supplying too much electrical power to server racks', false, 2, now(), now()),
    (v_q_id, 'Installing more than one operating system on a laptop', false, 3, now(), now()),
    (v_q_id, 'Writing code with too many functions', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does Cloud Elasticity directly eliminate the financial waste of Over-Provisioning?', 'Cloud elasticity provisions resources on-demand, closely matching infrastructure curves to workload demand.',
    'easy', 1, 0, 49, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'By making hardware free of charge', false, 1, now(), now()),
    (v_q_id, 'By dynamically scaling resources up during peak traffic and scaling them down during off-peak hours, ensuring consumers pay only for what is actively consumed', true, 2, now(), now()),
    (v_q_id, 'By forcing all users to log off during peak hours', false, 3, now(), now()),
    (v_q_id, 'By slowing down CPU clock speeds', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the role of an ''Orchestration Engine'' (e.g., Kubernetes) in modern cloud computing?', 'Orchestration platforms manage container lifecycles, health monitoring, service discovery, and automated horizontal scaling.',
    'medium', 1, 0, 50, ARRAY['BCA-304N', 'Unit-1', 'BCA-304N-U1']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Playing classical music in the datacenter', false, 1, now(), now()),
    (v_q_id, 'Automating the deployment, scaling, networking, and lifecycle management of containerized applications across clusters of host servers', true, 2, now(), now()),
    (v_q_id, 'Writing software documentation automatically', false, 3, now(), now()),
    (v_q_id, 'Formatting USB drives', false, 4, now(), now());

END $SEEDED_BLOCK$;
