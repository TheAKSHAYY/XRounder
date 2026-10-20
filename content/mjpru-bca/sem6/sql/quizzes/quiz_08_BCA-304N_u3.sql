DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-304N Unit 3 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '21e7349c-a1d3-5efc-8961-c0ffa8227c4d', 'BCA-304N Unit 3: Cloud Computing Architecture and Infrastructure (IaaS) Practice Quiz (50 MCQs)', 'bca-304n-u3-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-304N Unit 3. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What does the acronym SPI stand for in the foundational Cloud Computing Service Models?', 'The SPI model defines the three core cloud service archetypes: SaaS, PaaS, and IaaS.',
    'easy', 1, 0, 1, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Security, Privacy, and Integrity', false, 1, now(), now()),
    (v_q_id, 'SaaS, PaaS, and IaaS (Software, Platform, and Infrastructure as a Service)', true, 2, now(), now()),
    (v_q_id, 'System, Program, and Interface', false, 3, now(), now()),
    (v_q_id, 'Speed, Performance, and Interoperability', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the Cloud Computing Shared Responsibility Model, which model gives the customer the highest level of control and configuration responsibility over the operating system, middleware, and runtimes?', 'IaaS delivers raw compute, storage, and networking; customers are responsible for installing, configuring, patching, and maintaining operating systems and application stacks.',
    'easy', 1, 0, 2, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'SaaS (Software as a Service)', false, 1, now(), now()),
    (v_q_id, 'PaaS (Platform as a Service)', false, 2, now(), now()),
    (v_q_id, 'IaaS (Infrastructure as a Service)', true, 3, now(), now()),
    (v_q_id, 'FaaS (Function as a Service)', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which cloud service model delivers complete, ready-to-use end-user software applications over the internet on a subscription basis, abstracting all underlying infrastructure, code, and servers?', 'SaaS provides fully managed end-user software (e.g., Gmail, Salesforce, Microsoft 365) accessed via web browsers.',
    'easy', 1, 0, 3, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Infrastructure as a Service (IaaS)', false, 1, now(), now()),
    (v_q_id, 'Platform as a Service (PaaS)', false, 2, now(), now()),
    (v_q_id, 'Software as a Service (SaaS)', true, 3, now(), now()),
    (v_q_id, 'Hardware as a Service (HaaS)', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following is a classic example of an Infrastructure as a Service (IaaS) offering?', 'AWS EC2 provisions virtual machines where users configure their own guest OS, networking, and applications.',
    'easy', 1, 0, 4, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Amazon Elastic Compute Cloud (AWS EC2)', true, 1, now(), now()),
    (v_q_id, 'Google Docs', false, 2, now(), now()),
    (v_q_id, 'Salesforce CRM', false, 3, now(), now()),
    (v_q_id, 'Microsoft Office 365', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which cloud service model provides a managed development and deployment environment (including runtimes, libraries, and database management) where developers can build and run applications without managing virtual machines?', 'PaaS delivers managed development runtimes (e.g., AWS Elastic Beanstalk, Heroku, Google App Engine) where developers focus purely on application code.',
    'easy', 1, 0, 5, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'IaaS (Infrastructure as a Service)', false, 1, now(), now()),
    (v_q_id, 'PaaS (Platform as a Service)', true, 2, now(), now()),
    (v_q_id, 'SaaS (Software as a Service)', false, 3, now(), now()),
    (v_q_id, 'BaaS (Backup as a Service)', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following is an example of a Platform as a Service (PaaS) product?', 'Heroku abstracts server infrastructure, allowing developers to push code that is deployed automatically into managed web dynos.',
    'easy', 1, 0, 6, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Heroku', true, 1, now(), now()),
    (v_q_id, 'Amazon EC2 bare instance', false, 2, now(), now()),
    (v_q_id, 'Physical Ethernet Switch', false, 3, now(), now()),
    (v_q_id, 'Microsoft Word executable on desktop', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following is an example of a Software as a Service (SaaS) application?', 'Google Workspace delivers complete productivity software via browser interfaces on a SaaS model.',
    'easy', 1, 0, 7, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Google Workspace (Google Drive, Docs, Sheets)', true, 1, now(), now()),
    (v_q_id, 'AWS Virtual Private Cloud (VPC)', false, 2, now(), now()),
    (v_q_id, 'VMware ESXi Hypervisor', false, 3, now(), now()),
    (v_q_id, 'Ubuntu Linux Server ISO', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In an IaaS deployment, who is responsible for applying security patches to the guest operating system (e.g., Windows Server or Ubuntu)?', 'In IaaS, the customer retains ownership and patching responsibility for the guest OS, runtime software, and applications.',
    'medium', 1, 0, 8, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The Cloud Provider exclusively', false, 1, now(), now()),
    (v_q_id, 'The Cloud Consumer (Customer)', true, 2, now(), now()),
    (v_q_id, 'The hardware chip manufacturer', false, 3, now(), now()),
    (v_q_id, 'The local internet service provider', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In a SaaS deployment, who is responsible for data backups, high availability, hardware maintenance, and operating system security patching?', 'In SaaS, the provider manages the entire technology stack from physical datacenters up to application features.',
    'easy', 1, 0, 9, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The Cloud Consumer exclusively', false, 1, now(), now()),
    (v_q_id, 'The Cloud Provider', true, 2, now(), now()),
    (v_q_id, 'The local city municipality', false, 3, now(), now()),
    (v_q_id, 'The end user who accesses the website', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Compute Virtualization'' in IaaS clouds?', 'Compute virtualization abstracts physical silicon cores and memory into provisionable vCPU/RAM slices for guest VMs.',
    'easy', 1, 0, 10, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The mathematical simulation of physics on computers', false, 1, now(), now()),
    (v_q_id, 'The abstraction of physical server CPU and memory resources into isolated virtual machines managed by a hypervisor layer', true, 2, now(), now()),
    (v_q_id, 'Printing computer processor schematics on paper', false, 3, now(), now()),
    (v_q_id, 'Connecting two desktop computers via USB', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Block Storage'' in cloud environments (e.g., AWS EBS, Azure Managed Disks)?', 'Block storage delivers raw, unformatted sector volumes via iSCSI or Fibre Channel, ideal for OS boot disks and low-latency databases.',
    'medium', 1, 0, 11, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Storage that blocks unauthorized users from logging in', false, 1, now(), now()),
    (v_q_id, 'Storage that manages data as raw, fixed-sized blocks without file-level metadata, behaving like an unformatted physical hard drive attached directly to a virtual machine', true, 2, now(), now()),
    (v_q_id, 'Storing data inside concrete blocks', false, 3, now(), now()),
    (v_q_id, 'A database that records cryptocurrency blocks', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Object Storage'' in cloud environments (e.g., AWS S3, Google Cloud Storage, Azure Blob Storage)?', 'Object storage manages unstructured data as discrete objects in flat namespaces with rich metadata, accessed over standard HTTP protocols.',
    'medium', 1, 0, 12, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Storing physical objects inside warehouse boxes', false, 1, now(), now()),
    (v_q_id, 'A storage architecture that manages data as discrete objects containing raw binary data, customizable metadata, and a globally unique identifier accessed via HTTP/REST APIs', true, 2, now(), now()),
    (v_q_id, 'A database storing only 3D graphics objects', false, 3, now(), now()),
    (v_q_id, 'A file system with strict directory trees', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does Object Storage differ fundamentally from traditional File Storage (Hierarchical File Systems)?', 'Object storage avoids hierarchical folder nesting, using flat address spaces and HTTP endpoints to scale to exabytes.',
    'medium', 1, 0, 13, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Object storage uses a hierarchical nested tree of directories and subdirectories, while file storage does not', false, 1, now(), now()),
    (v_q_id, 'Object storage uses a flat address space where every file is an object with unique ID and HTTP URL, whereas File Storage relies on hierarchical folder directory paths and POSIX locks', true, 2, now(), now()),
    (v_q_id, 'Object storage can only store text files under 1 KB', false, 3, now(), now()),
    (v_q_id, 'Object storage is stored strictly inside CPU cache', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''File Storage'' in cloud services (e.g., AWS EFS, Azure Files)?', 'Cloud file storage presents shared POSIX-compliant hierarchical file systems over NFS/SMB for multi-instance file sharing.',
    'medium', 1, 0, 14, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Filing paper documents in cabinet folders', false, 1, now(), now()),
    (v_q_id, 'A shared network storage architecture that organizes data into a hierarchical directory tree accessible by multiple virtual machines simultaneously via standard protocols like NFS or SMB', true, 2, now(), now()),
    (v_q_id, 'Compressing files into zip archives', false, 3, now(), now()),
    (v_q_id, 'A single user desktop hard drive', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Virtual Private Cloud'' (VPC)?', 'A VPC partitions isolated software-defined network enclaves within public clouds, granting consumers full subnet and routing sovereignty.',
    'easy', 1, 0, 15, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical computer kept in a private bedroom', false, 1, now(), now()),
    (v_q_id, 'A logically isolated virtual network dedicated to a cloud consumer''s account, allowing complete control over IP address ranges, subnets, route tables, and network gateways', true, 2, now(), now()),
    (v_q_id, 'A private company that builds cloud datacenters', false, 3, now(), now()),
    (v_q_id, 'A secret website hidden on the dark web', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Public Subnet'' in a Cloud Virtual Private Cloud (VPC)?', 'A public subnet contains a route table entry pointing default egress (0.0.0.0/0) to an Internet Gateway.',
    'medium', 1, 0, 16, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A subnet accessible to anyone in the world without a password', false, 1, now(), now()),
    (v_q_id, 'A VPC subnet whose traffic is routed directly to an Internet Gateway (IGW), allowing instances within it to have public IP addresses and communicate directly with the internet', true, 2, now(), now()),
    (v_q_id, 'A subnet located in a public library', false, 3, now(), now()),
    (v_q_id, 'A subnet that does not require IP addresses', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Private Subnet'' in a VPC?', 'Private subnets lack direct internet routes, safeguarding sensitive backends (databases, application servers).',
    'medium', 1, 0, 17, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A subnet that cannot execute any programs', false, 1, now(), now()),
    (v_q_id, 'A VPC subnet that has no direct route to the Internet Gateway, isolating instances from inbound internet traffic for heightened security (e.g., backend databases)', true, 2, now(), now()),
    (v_q_id, 'A subnet owned by a private military contractor', false, 3, now(), now()),
    (v_q_id, 'A subnet with encrypted IP addresses', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What cloud networking device enables instances in a Private Subnet to initiate outbound internet connections (for software updates) while blocking inbound connections from the internet?', 'A NAT Gateway provides one-way outbound connectivity for private instances without exposing their private IP addresses to unsolicited incoming internet traffic.',
    'medium', 1, 0, 18, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Network Address Translation (NAT) Gateway', true, 1, now(), now()),
    (v_q_id, 'Internet Gateway (IGW)', false, 2, now(), now()),
    (v_q_id, 'Hub Switch', false, 3, now(), now()),
    (v_q_id, 'DNS Server', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Security Group'' in cloud virtual networking?', 'Security groups act as stateful firewalls at the instance level; return traffic for allowed requests is permitted automatically.',
    'easy', 1, 0, 19, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A team of security guards at the datacenter', false, 1, now(), now()),
    (v_q_id, 'A virtual stateful firewall that controls inbound and outbound network traffic at the virtual machine network interface (ENI) level', true, 2, now(), now()),
    (v_q_id, 'An encrypted folder on the operating system', false, 3, now(), now()),
    (v_q_id, 'A user group in Microsoft Windows', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary difference between a ''Security Group'' and a ''Network Access Control List'' (NACL) in cloud networking?', 'Security groups are stateful instance-level firewalls; NACLs are stateless subnet-level packet filters evaluating rules in numerical order.',
    'hard', 1, 0, 20, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Security Groups are stateful and operate at the instance level, whereas NACLs are stateless and operate at the subnet boundary level', true, 1, now(), now()),
    (v_q_id, 'Security Groups handle passwords, while NACLs handle IP addresses', false, 2, now(), now()),
    (v_q_id, 'Security Groups are only for Windows, while NACLs are for Linux', false, 3, now(), now()),
    (v_q_id, 'There is no difference; they are exact duplicates', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Software-Defined Networking'' (SDN)?', 'SDN centralizes routing logic in a software controller, separating control decisions from underlying physical packet forwarding.',
    'medium', 1, 0, 21, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Writing software programs using computer networks', false, 1, now(), now()),
    (v_q_id, 'An approach to network management that decouples the network control plane (decision-making) from the data forwarding plane (underlying packet routers)', true, 2, now(), now()),
    (v_q_id, 'A network made out of software instead of cables', false, 3, now(), now()),
    (v_q_id, 'A virtual modem used on dial-up internet', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In SDN architecture, what is the role of the ''Control Plane''?', 'The control plane dictates routing policy, topology intelligence, and flow table programming across the network.',
    'medium', 1, 0, 22, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Physically transmitting electrical pulses across cables', false, 1, now(), now()),
    (v_q_id, 'Determining how network traffic is routed and managed by maintaining forwarding tables and network topology maps', true, 2, now(), now()),
    (v_q_id, 'Cooling the router hardware with fans', false, 3, now(), now()),
    (v_q_id, 'Managing user account passwords', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In SDN architecture, what is the role of the ''Data Plane'' (Forwarding Plane)?', 'The data plane executes wire-speed packet forwarding according to rules pushed down from the control plane.',
    'medium', 1, 0, 23, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Designing the user interface for routers', false, 1, now(), now()),
    (v_q_id, 'Forwarding network packets from an incoming interface to an outgoing interface based on the instructions programmed by the control plane', true, 2, now(), now()),
    (v_q_id, 'Writing legal contracts for internet providers', false, 3, now(), now()),
    (v_q_id, 'Storing database records in memory', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which standardized communications protocol allows an SDN controller to interact directly with the forwarding plane of network switches and routers?', 'OpenFlow is the foundational communications interface enabling SDN controllers to manipulate switch forwarding tables.',
    'medium', 1, 0, 24, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'OpenFlow', true, 1, now(), now()),
    (v_q_id, 'BGP', false, 2, now(), now()),
    (v_q_id, 'SMTP', false, 3, now(), now()),
    (v_q_id, 'FTP', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Public Cloud'' deployment model?', 'Public clouds (AWS, Google Cloud, Azure) offer shared, multitenant infrastructure accessible over the internet to any subscribing entity.',
    'easy', 1, 0, 25, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A cloud owned and operated by a municipal government for public park visitors', false, 1, now(), now()),
    (v_q_id, 'A cloud infrastructure in which computing services are rendered over an open public network for use by the general public or multiple business organizations, owned by a commercial third-party provider', true, 2, now(), now()),
    (v_q_id, 'A computer that does not require a login password', false, 3, now(), now()),
    (v_q_id, 'A cloud that is publicly broadcast on television', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary advantage of a Public Cloud deployment?', 'Public clouds provide massive scalability, elastic on-demand capacity, and operational cost models without datacenter management.',
    'easy', 1, 0, 26, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Unlimited free hardware with no billing', false, 1, now(), now()),
    (v_q_id, 'Massive economies of scale, near-zero upfront capital expenditures, rapid self-service provisioning, and high reliability managed by global provider teams', true, 2, now(), now()),
    (v_q_id, 'The customer gets physical ownership of the servers', false, 3, now(), now()),
    (v_q_id, 'Complete immunity from all cyber attacks', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Private Cloud'' deployment model?', 'Private clouds dedicate dedicated compute/storage hardware solely to a single enterprise tenant for compliance and governance.',
    'easy', 1, 0, 27, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A cloud infrastructure provisioned for exclusive use by a single organization comprising multiple consumers (e.g., business units), operated on-premises or by a third party', true, 1, now(), now()),
    (v_q_id, 'A secret cloud used exclusively by intelligence agencies', false, 2, now(), now()),
    (v_q_id, 'A cloud server disconnected from the electrical grid', false, 3, now(), now()),
    (v_q_id, 'A personal laptop running VirtualBox', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary driver for an enterprise choosing a Private Cloud over a Public Cloud?', 'Enterprises choose private clouds when regulatory mandates or corporate policies forbid multi-tenant public infrastructure.',
    'medium', 1, 0, 28, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It is always cheaper than public clouds', false, 1, now(), now()),
    (v_q_id, 'Strict regulatory compliance, data sovereignty, security governance, and total control over proprietary hardware and sensitive workloads', true, 2, now(), now()),
    (v_q_id, 'Private clouds do not require internet access', false, 3, now(), now()),
    (v_q_id, 'Private clouds eliminate the need for system administrators', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Community Cloud'' deployment model in the NIST taxonomy?', 'Community clouds pool infrastructure across organizations with shared missions (e.g., healthcare hospital networks, university consortia).',
    'medium', 1, 0, 29, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A cloud service shared by neighborhood residents to chat online', false, 1, now(), now()),
    (v_q_id, 'A cloud infrastructure provisioned for exclusive use by a specific community of consumers from organizations that have shared concerns (e.g., mission, security requirements, policy, and compliance)', true, 2, now(), now()),
    (v_q_id, 'A social media platform like Facebook or Twitter', false, 3, now(), now()),
    (v_q_id, 'An open-source forum website', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Hybrid Cloud'' deployment model?', 'Hybrid clouds bridge disparate private and public environments via secure connectivity (VPN, Direct Connect) for workload orchestration.',
    'easy', 1, 0, 30, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A cloud that runs on gasoline and electricity', false, 1, now(), now()),
    (v_q_id, 'A cloud infrastructure composed of two or more distinct cloud infrastructures (private, community, or public) that remain unique entities, but are bound together by standardized or proprietary technology that enables data and application portability', true, 2, now(), now()),
    (v_q_id, 'A cloud server combined with a desktop PC', false, 3, now(), now()),
    (v_q_id, 'A cloud provider that sells both hardware and software', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Direct Connect'' or ''ExpressRoute'' in enterprise cloud networking?', 'Dedicated cloud interconnects bypass public internet routing to deliver guaranteed throughput, deterministic latency, and heightened security.',
    'medium', 1, 0, 31, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A dedicated private physical fiber-optic telecommunications connection from an enterprise datacenter directly to a cloud provider''s network, bypassing the public internet', true, 1, now(), now()),
    (v_q_id, 'A high-speed public internet browser', false, 2, now(), now()),
    (v_q_id, 'Connecting a server directly to a wall power socket', false, 3, now(), now()),
    (v_q_id, 'A phone call between an engineer and cloud support', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an ''Elastic Load Balancer'' (ELB)?', 'Load balancers distribute ingress network traffic across server pools, performing health checks and automated traffic shifting.',
    'easy', 1, 0, 32, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical rubber band used to bundle server cables', false, 1, now(), now()),
    (v_q_id, 'A cloud service that automatically distributes incoming application traffic across multiple healthy target instances (such as EC2 instances or containers) to ensure high availability and prevent overload', true, 2, now(), now()),
    (v_q_id, 'A device that balances electrical voltage in datacenters', false, 3, now(), now()),
    (v_q_id, 'A software program that balances database table rows', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'At which layer of the OSI model does an Application Load Balancer (ALB) operate?', 'ALBs evaluate Layer 7 HTTP/HTTPS headers, cookies, and URL paths to route traffic intelligently.',
    'medium', 1, 0, 33, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Layer 3 (Network Layer)', false, 1, now(), now()),
    (v_q_id, 'Layer 4 (Transport Layer)', false, 2, now(), now()),
    (v_q_id, 'Layer 7 (Application Layer - HTTP/HTTPS)', true, 3, now(), now()),
    (v_q_id, 'Layer 2 (Data Link Layer)', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'At which layer of the OSI model does a Network Load Balancer (NLB) operate?', 'NLBs operate at Layer 4 (TCP/UDP), routing millions of requests per second at ultra-low sub-millisecond latencies.',
    'medium', 1, 0, 34, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Layer 7 (Application Layer)', false, 1, now(), now()),
    (v_q_id, 'Layer 4 (Transport Layer - TCP/UDP)', true, 2, now(), now()),
    (v_q_id, 'Layer 1 (Physical Layer)', false, 3, now(), now()),
    (v_q_id, 'Layer 6 (Presentation Layer)', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Health Check'' performed by a cloud load balancer?', 'Load balancers poll target endpoints with health checks, automatically isolating unresponsive or failing instances.',
    'easy', 1, 0, 35, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Measuring the physical temperature of the server room', false, 1, now(), now()),
    (v_q_id, 'Periodically sending diagnostic requests (e.g., HTTP GET or TCP ping) to target instances to verify they are operational and able to process traffic', true, 2, now(), now()),
    (v_q_id, 'Checking if the company''s financial balance is healthy', false, 3, now(), now()),
    (v_q_id, 'Scanning code for spelling mistakes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an ''Auto Scaling Group'' (ASG)?', 'Auto-scaling groups dynamically adjust instance counts to maintain target metric baselines (e.g., 60% CPU utilization).',
    'easy', 1, 0, 36, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A collection of cloud instances that dynamically expands or contracts in number based on defined scaling policies, metrics (CPU utilization, request count), or schedules', true, 1, now(), now()),
    (v_q_id, 'A group of software engineers who write code together', false, 2, now(), now()),
    (v_q_id, 'An automated tool that resizes pictures on a website', false, 3, now(), now()),
    (v_q_id, 'A cluster of hard drives formatted simultaneously', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Target Tracking Scaling'' in cloud auto-scaling?', 'Target tracking functions like a thermostat, scaling capacity automatically to maintain a steady metric target value.',
    'medium', 1, 0, 37, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Tracking user mouse movements across a screen', false, 1, now(), now()),
    (v_q_id, 'A scaling policy that automatically adjusts the capacity of an auto-scaling group to keep a specific metric (e.g., average CPU utilization) at or near a designated target value', true, 2, now(), now()),
    (v_q_id, 'Tracking military targets using satellite imagery', false, 3, now(), now()),
    (v_q_id, 'Tracking the delivery of server hardware packages', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Scheduled Scaling''?', 'Scheduled scaling scales instance pools ahead of predictable cyclical demand spikes (e.g., 9 AM office start times).',
    'easy', 1, 0, 38, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Scaling that occurs randomly during the night', false, 1, now(), now()),
    (v_q_id, 'A scaling policy that adds or removes instances at predefined calendar dates and times based on predictable traffic patterns (e.g., business opening hours)', true, 2, now(), now()),
    (v_q_id, 'Formatting hard drives on a monthly basis', false, 3, now(), now()),
    (v_q_id, 'Restarting servers every Monday morning', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Cool-down Period'' in cloud auto-scaling policies?', 'Cool-down periods ensure newly launched instances have enough time to warm up and absorb load before triggering subsequent scale events.',
    'medium', 1, 0, 39, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The time it takes for a hot server to cool down with fans', false, 1, now(), now()),
    (v_q_id, 'A configurable time interval following a scaling activity during which the auto-scaling group will not execute any further scaling actions, allowing the newly added instances to stabilize', true, 2, now(), now()),
    (v_q_id, 'The time an engineer rests between typing code', false, 3, now(), now()),
    (v_q_id, 'The weekend when server datacenters are closed', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an ''Elastic IP Address'' (Static Public IP)?', 'Elastic IPs provide static public endpoints that mask instance failures by remapping instantly to standby replacements.',
    'easy', 1, 0, 40, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'An IP address made out of flexible rubber', false, 1, now(), now()),
    (v_q_id, 'A persistent public IPv4 address allocated to a cloud account that can be rapidly remapped dynamically between instances in case of failure', true, 2, now(), now()),
    (v_q_id, 'An IP address that changes every five seconds', false, 3, now(), now()),
    (v_q_id, 'A private IP address used only inside home routers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Content Delivery Network'' (CDN, e.g., CloudFront, Cloudflare)?', 'CDNs cache content at Points of Presence (PoPs) globally, slashing round-trip time and offloading origin servers.',
    'easy', 1, 0, 41, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A television cable network delivering movies', false, 1, now(), now()),
    (v_q_id, 'A geographically distributed network of proxy edge servers that cache static and dynamic web content closer to end-users to reduce latency and accelerate delivery', true, 2, now(), now()),
    (v_q_id, 'A shipping network transporting computers', false, 3, now(), now()),
    (v_q_id, 'A local area network in a school', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is an ''Edge Location'' (Point of Presence - PoP) in a CDN architecture?', 'PoPs are distributed edge nodes located close to dense population hubs to serve cached content rapidly.',
    'easy', 1, 0, 42, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical server perched on the edge of a cliff', false, 1, now(), now()),
    (v_q_id, 'A geographically distributed datacenter site where a CDN caches web content locally to deliver it to nearby regional consumers with minimal network latency', true, 2, now(), now()),
    (v_q_id, 'The outer edge of a hard disk platter', false, 3, now(), now()),
    (v_q_id, 'The location of a WiFi router in a room', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Cache Hit'' mean in a CDN or cloud caching layer?', 'A cache hit serves content from the local proxy cache, eliminating the latency and compute load of origin round-trips.',
    'easy', 1, 0, 43, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical collision between two server racks', false, 1, now(), now()),
    (v_q_id, 'A situation where requested content is found directly in the local cache, allowing it to be served immediately to the user without querying the origin server', true, 2, now(), now()),
    (v_q_id, 'A database query failing due to network errors', false, 3, now(), now()),
    (v_q_id, 'Hitting the computer monitor to make it work', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What does ''Cache Invalidation'' mean in CDN administration?', 'Invalidation forces edge caches to purge stale assets and fetch refreshed content from origin backends.',
    'medium', 1, 0, 44, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Declaring that a computer program is completely invalid', false, 1, now(), now()),
    (v_q_id, 'The process of explicitly purging or expiring cached files from CDN edge locations so that the newest version is retrieved from the origin server', true, 2, now(), now()),
    (v_q_id, 'Erasing the browser history on a laptop', false, 3, now(), now()),
    (v_q_id, 'Deleting an entire website', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''DNS'' (Domain Name System) in cloud infrastructure (e.g., Amazon Route 53)?', 'DNS resolves symbolic hostnames into network routable IP addresses, providing traffic routing and health-check failover.',
    'easy', 1, 0, 45, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A dynamic network scanner', false, 1, now(), now()),
    (v_q_id, 'A hierarchical distributed naming system that translates human-readable domain names (like example.com) into numerical IP addresses (like 192.0.2.1)', true, 2, now(), now()),
    (v_q_id, 'A digital security certificate', false, 3, now(), now()),
    (v_q_id, 'A hardware switch for optical cables', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Latency-Based Routing'' in cloud DNS management?', 'Latency routing directs users to the datacenter yielding the fastest round-trip time based on real-time network telemetry.',
    'medium', 1, 0, 46, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Routing network traffic down the slowest possible path', false, 1, now(), now()),
    (v_q_id, 'Routing end-user requests to the cloud region that provides the lowest network latency for that specific user''s geographic location', true, 2, now(), now()),
    (v_q_id, 'Routing traffic to servers that have broken network cards', false, 3, now(), now()),
    (v_q_id, 'Delaying requests by five seconds intentionally', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Geo-DNS'' (Geolocation Routing)?', 'Geolocation routing directs traffic based on caller geography, facilitating localization and regulatory compliance.',
    'easy', 1, 0, 47, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A routing policy based on the geological rock formations under datacenters', false, 1, now(), now()),
    (v_q_id, 'A DNS routing policy that resolves domain requests to specific IP addresses based on the geographic location (country, continent) of the requesting client', true, 2, now(), now()),
    (v_q_id, 'Tracking users using mobile phone GPS', false, 3, now(), now()),
    (v_q_id, 'Routing network cables along roads', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Weighted Routing'' in DNS traffic management?', 'Weighted routing splits traffic proportionally, enabling canary releases and phased workload migrations.',
    'medium', 1, 0, 48, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Weighing physical servers on a scale', false, 1, now(), now()),
    (v_q_id, 'A routing policy that distributes incoming requests across multiple resource endpoints in proportion to assigned percentage weights (e.g., 90% to version A, 10% to version B)', true, 2, now(), now()),
    (v_q_id, 'Routing heavy data packets through thicker cables', false, 3, now(), now()),
    (v_q_id, 'Assigning priority to users with paid subscriptions', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Canary Deployment'' in cloud release engineering?', 'Canary deployments expose updates to a fraction of live traffic, verifying telemetry before complete fleet promotion.',
    'medium', 1, 0, 49, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Deploying software in underground coal mines', false, 1, now(), now()),
    (v_q_id, 'A deployment technique where a new software release is rolled out to a tiny subset of users (e.g., 5%) to validate stability before rolling it out to the entire infrastructure', true, 2, now(), now()),
    (v_q_id, 'Deploying software using yellow-colored servers', false, 3, now(), now()),
    (v_q_id, 'A deployment that is executed by robots', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Blue/Green Deployment'' in cloud operations?', 'Blue/Green deployments maintain duplicate production environments, switching router/load-balancer pointers for instantaneous, rollback-safe cutovers.',
    'medium', 1, 0, 50, ARRAY['BCA-304N', 'Unit-3', 'BCA-304N-U3']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Painting servers blue and green', false, 1, now(), now()),
    (v_q_id, 'A zero-downtime release strategy that maintains two identical production environments (Blue and Green), routing all active traffic to one while the other is updated and tested, followed by an instantaneous cutover', true, 2, now(), now()),
    (v_q_id, 'Running open-source and proprietary software together', false, 3, now(), now()),
    (v_q_id, 'A method for recycling old server hardware', false, 4, now(), now());

END $SEEDED_BLOCK$;
