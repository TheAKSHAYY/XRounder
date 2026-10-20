DO $SEEDED_BLOCK$
DECLARE
  v_quiz_id UUID;
  v_q_id UUID;
BEGIN
  -- BCA-304N Unit 2 Quiz (50 Questions)
  INSERT INTO public.quizzes (
    unit_id, title, slug, description, instructions, passing_pct,
    time_limit_minutes, status, is_public, order_index, created_at, updated_at
  ) VALUES (
    '3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', 'BCA-304N Unit 2: Virtualization Technologies and Architectures Practice Quiz (50 MCQs)', 'bca-304n-u2-practice-quiz',
    'Official MJPRU BCA exam preparation practice quiz for BCA-304N Unit 2. 50 verified questions covering all syllabus topics with detailed explanations.', 'Select the best answer for each question. You will receive immediate feedback and full conceptual explanations.', 60,
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
    v_quiz_id, 'single', 'What is the fundamental definition of Virtualization in computer science?', 'Virtualization abstracts physical computing hardware into logical partitions, decoupling software and OS from underlying silicon.',
    'easy', 1, 0, 1, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Simulating video game graphics in high definition', false, 1, now(), now()),
    (v_q_id, 'The creation of a virtual (rather than actual) version of something, such as a hardware platform, operating system, storage device, or network resources, through an abstraction layer', true, 2, now(), now()),
    (v_q_id, 'Creating animated 3D movies', false, 3, now(), now()),
    (v_q_id, 'Writing software using virtual reality headsets', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Hypervisor (Virtual Machine Monitor - VMM)?', 'A hypervisor presents guest operating systems with a virtual operating platform and manages the execution of guest instances.',
    'easy', 1, 0, 2, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A high-speed cooling fan for server CPUs', false, 1, now(), now()),
    (v_q_id, 'A software, firmware, or hardware layer that creates, manages, and executes virtual machines, arbitrating access to the underlying physical hardware', true, 2, now(), now()),
    (v_q_id, 'An antivirus scanner that operates in the cloud', false, 3, now(), now()),
    (v_q_id, 'A network router switch', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are the two foundational categories of Hypervisors defined by Gerald Popek and Robert Goldberg?', 'Popek-Goldberg virtualization requirements classify hypervisors into Type-1 (native/bare-metal) and Type-2 (hosted).',
    'easy', 1, 0, 3, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Type-1 (Bare-Metal) and Type-2 (Hosted)', true, 1, now(), now()),
    (v_q_id, 'Fast and Slow Hypervisors', false, 2, now(), now()),
    (v_q_id, 'Public and Private Hypervisors', false, 3, now(), now()),
    (v_q_id, 'Open-Source and Closed-Source Hypervisors', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Type-1 (Bare-Metal) Hypervisor?', 'Type-1 hypervisors install directly onto bare metal hardware, controlling resources directly without OS overhead.',
    'easy', 1, 0, 4, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A hypervisor that runs as an application inside an existing host operating system', false, 1, now(), now()),
    (v_q_id, 'A hypervisor that runs directly on the host computer''s physical hardware without any underlying host operating system', true, 2, now(), now()),
    (v_q_id, 'A hypervisor made out of sheet metal', false, 3, now(), now()),
    (v_q_id, 'A hypervisor that runs without RAM', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following is a classic example of a Type-1 (Bare-Metal) Hypervisor?', 'VMware ESXi, Citrix XenServer, and KVM are enterprise bare-metal (Type-1) hypervisors.',
    'easy', 1, 0, 5, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'VMware ESXi', true, 1, now(), now()),
    (v_q_id, 'Oracle VirtualBox', false, 2, now(), now()),
    (v_q_id, 'VMware Workstation', false, 3, now(), now()),
    (v_q_id, 'Microsoft Paint', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a Type-2 (Hosted) Hypervisor?', 'Type-2 hypervisors execute within a standard host OS, abstracting guest VMs above the host operating system.',
    'easy', 1, 0, 6, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A hypervisor that runs directly on hardware', false, 1, now(), now()),
    (v_q_id, 'A hypervisor that runs as a software application on top of an existing host operating system (e.g., Windows or Linux)', true, 2, now(), now()),
    (v_q_id, 'A hypervisor hosted on a website', false, 3, now(), now()),
    (v_q_id, 'A hardware chip soldered to the motherboard', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following is an example of a Type-2 (Hosted) Hypervisor?', 'VirtualBox, VMware Workstation, and Parallels Desktop are Type-2 hosted hypervisors.',
    'easy', 1, 0, 7, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Oracle VM VirtualBox', true, 1, now(), now()),
    (v_q_id, 'VMware ESXi', false, 2, now(), now()),
    (v_q_id, 'Citrix Hypervisor', false, 3, now(), now()),
    (v_q_id, 'IBM PowerVM', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why do enterprise cloud data centers exclusively deploy Type-1 Hypervisors rather than Type-2 Hypervisors?', 'Bare-metal hypervisors bypass host OS scheduler overhead, providing direct I/O performance and deterministic resource allocation.',
    'medium', 1, 0, 8, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because Type-2 hypervisors are illegal in enterprise environments', false, 1, now(), now()),
    (v_q_id, 'Because Type-1 hypervisors offer significantly higher performance, lower latency, and better security by eliminating the overhead and vulnerabilities of a host OS', true, 2, now(), now()),
    (v_q_id, 'Because Type-1 hypervisors do not require electrical power', false, 3, now(), now()),
    (v_q_id, 'Because Type-2 hypervisors cannot run Linux', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Full Virtualization''?', 'Full virtualization simulates complete hardware architecture, enabling unmodified guest OS binaries to execute seamlessly.',
    'medium', 1, 0, 9, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Installing all software available on the internet', false, 1, now(), now()),
    (v_q_id, 'A virtualization technique where the underlying hardware is completely simulated, allowing unmodified guest operating systems to run in complete isolation', true, 2, now(), now()),
    (v_q_id, 'Upgrading a computer to 100% capacity', false, 3, now(), now()),
    (v_q_id, 'Virtualizing only the audio drivers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What technique was historically used by VMware to achieve Full Virtualization on x86 architectures prior to hardware virtualization extensions?', 'Classic x86 full virtualization employed dynamic binary translation for privileged instructions alongside direct execution of user code.',
    'hard', 1, 0, 10, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Binary Translation combined with direct execution of non-sensitive user instructions', true, 1, now(), now()),
    (v_q_id, 'Re-writing the entire guest OS source code manually', false, 2, now(), now()),
    (v_q_id, 'Overclocking the CPU clock cycle', false, 3, now(), now()),
    (v_q_id, 'Emulating the CPU using JavaScript in a web browser', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Paravirtualization''?', 'Paravirtualization (pioneered by Xen) modifies guest OS kernels to replace sensitive instructions with software hypercalls.',
    'medium', 1, 0, 11, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A virtualization technique where the guest operating system is explicitly modified to be aware of the hypervisor, communicating via hypercalls instead of executing privileged hardware instructions', true, 1, now(), now()),
    (v_q_id, 'A hypervisor that runs in parallel across two laptops', false, 2, now(), now()),
    (v_q_id, 'Virtualizing parallel ports on old printers', false, 3, now(), now()),
    (v_q_id, 'A method for virtualizing only RAM memory', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Hypercall'' in paravirtualization?', 'A hypercall is to the hypervisor what a syscall is to an OS kernel: a deliberate trap for privileged service execution.',
    'medium', 1, 0, 12, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A phone call made over the internet', false, 1, now(), now()),
    (v_q_id, 'A software trap made by a paravirtualized guest operating system to request service from the underlying hypervisor, analogous to a system call made to an OS kernel', true, 2, now(), now()),
    (v_q_id, 'An urgent warning message displayed on the console', false, 3, now(), now()),
    (v_q_id, 'A network packet sent between cloud regions', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the primary performance advantage of Paravirtualization over classic binary translation Full Virtualization?', 'Hypercalls remove the performance penalty of trapping and dynamically rewriting sensitive binary instructions.',
    'medium', 1, 0, 13, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Lower virtualization overhead and faster I/O execution because the guest kernel collaborates directly with the hypervisor', true, 1, now(), now()),
    (v_q_id, 'Paravirtualization does not require any CPU cycles', false, 2, now(), now()),
    (v_q_id, 'It allows running Windows programs on macOS without installation', false, 3, now(), now()),
    (v_q_id, 'It eliminates the need for physical storage', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a major limitation or drawback of Paravirtualization?', 'Paravirtualization requires kernel code modifications, limiting its utility for proprietary, closed-source operating systems.',
    'medium', 1, 0, 14, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'It cannot run on Intel processors', false, 1, now(), now()),
    (v_q_id, 'It requires access to and modification of the guest operating system kernel source code, preventing the execution of proprietary unmodified OSs like legacy Windows', true, 2, now(), now()),
    (v_q_id, 'It consumes 100% of RAM at all times', false, 3, now(), now()),
    (v_q_id, 'It cannot connect to network switches', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What are Intel VT-x and AMD-V?', 'Intel VT-x and AMD-V provide hardware virtualization extensions (root/non-root modes), enabling native hardware virtualization.',
    'medium', 1, 0, 15, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Graphics rendering cards for gaming', false, 1, now(), now()),
    (v_q_id, 'Hardware-Assisted Virtualization extensions built directly into modern CPU architectures to handle virtualization traps natively in silicon', true, 2, now(), now()),
    (v_q_id, 'Antivirus software programs', false, 3, now(), now()),
    (v_q_id, 'High-speed network interface cables', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How do hardware-assisted CPU extensions (like Intel VT-x) eliminate the need for binary translation in full virtualization?', 'Hardware CPU extensions introduce VMX root/non-root operation modes, allowing guest OSs to run at Ring 0 without virtualization holes.',
    'hard', 1, 0, 16, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'By introducing a new CPU privilege level (Root mode for the hypervisor, and Non-Root mode for guest VMs) so privileged instructions trap automatically to the VMM', true, 1, now(), now()),
    (v_q_id, 'By making CPUs run twice as fast', false, 2, now(), now()),
    (v_q_id, 'By replacing machine code with Python', false, 3, now(), now()),
    (v_q_id, 'By storing all virtual machines in CPU cache', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In the classical x86 protection ring architecture, which ring represents the most privileged level where the operating system kernel traditionally executes?', 'Ring 0 has unrestricted access to hardware instructions; Ring 3 is restricted user space.',
    'easy', 1, 0, 17, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Ring 3', false, 1, now(), now()),
    (v_q_id, 'Ring 2', false, 2, now(), now()),
    (v_q_id, 'Ring 1', false, 3, now(), now()),
    (v_q_id, 'Ring 0', true, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What was the famous ''x86 Virtualization Hole'' described by Popek and Goldberg?', 'Certain sensitive control registers failed silently in unprivileged rings rather than trapping, making pure x86 virtualization impossible without binary translation or hardware extensions.',
    'hard', 1, 0, 18, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical hole drilled into CPU chips', false, 1, now(), now()),
    (v_q_id, 'Certain x86 sensitive instructions (such as POPF or SMSW) were unprivileged in user mode and failed silently instead of trapping when executed outside Ring 0, violating Popek-Goldberg virtualization criteria', true, 2, now(), now()),
    (v_q_id, 'A security vulnerability in network cards', false, 3, now(), now()),
    (v_q_id, 'An error where virtual machines would disappear', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''OS-Level Virtualization'' (Containerization, e.g., Docker)?', 'Containers package user-space libraries and applications while sharing the single underlying host OS kernel.',
    'easy', 1, 0, 19, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Installing multiple operating systems on separate hard drives', false, 1, now(), now()),
    (v_q_id, 'An operating system feature in which the kernel allows the existence of multiple isolated user-space instances (containers) sharing a single host kernel', true, 2, now(), now()),
    (v_q_id, 'Emulating a mainframe computer in Java', false, 3, now(), now()),
    (v_q_id, 'Running virtual machines inside web browsers', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'How does a Container (Docker) differ from a Virtual Machine (VM)?', 'VMs carry full OS kernels and emulate hardware via hypervisors; containers share the host kernel, booting in milliseconds with minimal footprint.',
    'easy', 1, 0, 20, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Containers include a full guest operating system kernel, whereas VMs do not', false, 1, now(), now()),
    (v_q_id, 'VMs virtualize hardware and each runs a full, independent guest OS, whereas Containers share the host OS kernel and package only the application and its dependencies, making them much lighter and faster', true, 2, now(), now()),
    (v_q_id, 'VMs run only on Linux, while containers run only on Windows', false, 3, now(), now()),
    (v_q_id, 'There is no difference; they are exact synonyms', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What Linux kernel features provide the foundational isolation mechanisms for containerization (Docker)?', 'Linux cgroups govern CPU/memory resource allocations; namespaces provide isolated views of PIDs, network interfaces, mounts, and IPC.',
    'hard', 1, 0, 21, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Namespaces (for resource isolation) and Cgroups (Control Groups, for resource metering and limitation)', true, 1, now(), now()),
    (v_q_id, 'Ext4 filesystem and GRUB bootloader', false, 2, now(), now()),
    (v_q_id, 'X11 window system and ALSA audio drivers', false, 3, now(), now()),
    (v_q_id, 'BASH terminal and cron scheduler', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Server Consolidation'' achieved through virtualization?', 'Consolidation pools idle capacity by hosting dozens of virtual instances on dense multi-core physical servers.',
    'easy', 1, 0, 22, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Physically duct-taping servers together in a rack', false, 1, now(), now()),
    (v_q_id, 'Combining workloads from multiple underutilized physical servers onto a smaller number of powerful physical hosts running virtual machines, dramatically reducing hardware and power costs', true, 2, now(), now()),
    (v_q_id, 'Erasing old servers to install new operating systems', false, 3, now(), now()),
    (v_q_id, 'Selling servers to a third-party company', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Live Migration'' of a Virtual Machine (e.g., VMware vMotion)?', 'Live migration transfers memory pages iteratively and syncs CPU states across nodes, achieving millisecond cutovers without dropping TCP connections.',
    'medium', 1, 0, 23, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Carrying a physical server across a room while it is turned on', false, 1, now(), now()),
    (v_q_id, 'The process of moving a running virtual machine from one physical host server to another with zero noticeable downtime or service interruption for end users', true, 2, now(), now()),
    (v_q_id, 'Converting a virtual machine into a physical computer', false, 3, now(), now()),
    (v_q_id, 'Formatting a VM disk while copying files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Storage Virtualization''?', 'Storage virtualization abstracts physical arrays (SAN/NAS) into unified, dynamically assignable logical storage volumes (LUNs).',
    'easy', 1, 0, 24, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A virtual reality game about hard drives', false, 1, now(), now()),
    (v_q_id, 'The pooling of physical storage from multiple network storage devices into what appears to be a single, centrally managed logical storage pool', true, 2, now(), now()),
    (v_q_id, 'Formatting a hard drive into multiple partitions', false, 3, now(), now()),
    (v_q_id, 'Using USB flash drives instead of hard disks', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Network Virtualization''?', 'Network virtualization abstracts physical switching and routing topologies into software-defined overlays (VXLAN, OpenFlow).',
    'easy', 1, 0, 25, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Disconnecting all cables from a network switch', false, 1, now(), now()),
    (v_q_id, 'The process of combining hardware and software network resources and network functionality into a single, software-based administrative entity (e.g., Software-Defined Networking - SDN)', true, 2, now(), now()),
    (v_q_id, 'Browsing the internet using a virtual private browser', false, 3, now(), now()),
    (v_q_id, 'Encrypting WiFi passwords with WPA3', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Snapshot'' in virtual machine management?', 'Snapshots freeze delta disks at a point in time, enabling non-destructive testing and quick rollbacks.',
    'easy', 1, 0, 26, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A photograph taken of the server chassis', false, 1, now(), now()),
    (v_q_id, 'A point-in-time image of a virtual machine''s disk state, configuration, and optionally active memory, allowing instant rollback in case of failure', true, 2, now(), now()),
    (v_q_id, 'A screenshot of the desktop screen', false, 3, now(), now()),
    (v_q_id, 'A log of user keystrokes', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Desktop Virtualization'' (Virtual Desktop Infrastructure - VDI)?', 'VDI renders enterprise desktop operating systems inside datacenter VMs, transmitting graphical frames to remote thin clients.',
    'easy', 1, 0, 27, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Arranging desktop icons in neat folders', false, 1, now(), now()),
    (v_q_id, 'A technology that hosts a desktop operating system on a centralized server in a datacenter, streaming the desktop environment to client end-point devices over a network', true, 2, now(), now()),
    (v_q_id, 'Upgrading a laptop monitor to 4K resolution', false, 3, now(), now()),
    (v_q_id, 'Using two mice on a single computer', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Application Virtualization''?', 'Application virtualization (e.g., VMware ThinApp, App-V) isolates runtime binaries, preventing OS DLL conflicts and registry pollution.',
    'medium', 1, 0, 28, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Writing applications in virtual reality languages', false, 1, now(), now()),
    (v_q_id, 'A technology that encapsulates application software from the underlying operating system on which it is executed, allowing it to run without modifying host registry or file systems', true, 2, now(), now()),
    (v_q_id, 'Playing games on mobile phones', false, 3, now(), now()),
    (v_q_id, 'Compiling Java code into bytecode', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Memory Ballooning'' in hypervisors?', 'The hypervisor balloon driver inflates inside guest memory, prompting the guest OS to flush pages and freeing physical RAM for other VMs.',
    'hard', 1, 0, 29, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Inflating physical memory chips with compressed air', false, 1, now(), now()),
    (v_q_id, 'A memory management mechanism used by a hypervisor to reclaim unused memory from guest virtual machines by expanding a balloon driver inside the guest OS', true, 2, now(), now()),
    (v_q_id, 'A hardware defect causing RAM to overheat', false, 3, now(), now()),
    (v_q_id, 'Increasing the font size of memory addresses', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Overcommitment'' (Over-allocation) in virtualization?', 'Overcommitment banks on the statistical improbability of all guest VMs hitting peak CPU/memory demands simultaneously.',
    'medium', 1, 0, 30, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Promising a client more features than can be programmed', false, 1, now(), now()),
    (v_q_id, 'Allocating more virtual computing resources (vCPUs or virtual memory) to guest VMs than are physically available on the underlying host, relying on statistical multiplexing', true, 2, now(), now()),
    (v_q_id, 'Running CPU cores at 100% capacity permanently', false, 3, now(), now()),
    (v_q_id, 'Purchasing more server racks than fit in a room', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''vCPU'' (Virtual CPU)?', 'A vCPU is a virtual time-slice thread scheduled by the hypervisor onto an available physical CPU core or hyperthread.',
    'easy', 1, 0, 31, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical processor chip purchased at a store', false, 1, now(), now()),
    (v_q_id, 'A share or slice of a physical CPU core assigned by the hypervisor to a virtual machine', true, 2, now(), now()),
    (v_q_id, 'An imaginary computer processor used in video games', false, 3, now(), now()),
    (v_q_id, 'A software thread that runs exclusively in Python', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is Microsoft Hyper-V?', 'Hyper-V is Microsoft''s enterprise Type-1 hypervisor, powering Windows virtualization and Azure cloud backends.',
    'easy', 1, 0, 32, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A video game streaming service', false, 1, now(), now()),
    (v_q_id, 'A native Type-1 hypervisor developed by Microsoft that creates and runs virtual machines on x86-64 systems', true, 2, now(), now()),
    (v_q_id, 'A tool for editing spreadsheets in Microsoft Office', false, 3, now(), now()),
    (v_q_id, 'An antivirus firewall for Windows', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'In Hyper-V architecture, what is the ''Parent Partition'' (or Root Partition)?', 'Hyper-V root partition controls virtualization stacks, driver models, and provisions child partitions hosting guest VMs.',
    'medium', 1, 0, 33, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The first partition on a physical hard drive formatted as NTFS', false, 1, now(), now()),
    (v_q_id, 'The primary partition that runs the Windows host OS, owns the hypervisor direct control, and manages child partitions (guest VMs)', true, 2, now(), now()),
    (v_q_id, 'The folder where user documents are stored', false, 3, now(), now()),
    (v_q_id, 'A backup copy of the BIOS firmware', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is KVM (Kernel-based Virtual Machine) in the Linux ecosystem?', 'KVM is a Linux kernel module that leverages CPU virtualization extensions, converting Linux into a Type-1 bare-metal hypervisor.',
    'medium', 1, 0, 34, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A physical switch used to share a Keyboard, Video, and Mouse between multiple computers', false, 1, now(), now()),
    (v_q_id, 'A full virtualization solution for Linux on x86 hardware containing virtualization extensions (Intel VT or AMD-V), turning the Linux kernel into a Type-1 hypervisor', true, 2, now(), now()),
    (v_q_id, 'A graphical desktop environment for Ubuntu', false, 3, now(), now()),
    (v_q_id, 'A network packet sniffer tool', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is QEMU often used for in conjunction with KVM?', 'KVM executes CPU and memory instructions directly; QEMU emulates peripheral devices (NICs, disks, display adapters).',
    'medium', 1, 0, 35, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Writing text documents', false, 1, now(), now()),
    (v_q_id, 'Providing user-space hardware emulation, device modeling, and virtual disk management for KVM-accelerated virtual machines', true, 2, now(), now()),
    (v_q_id, 'Browsing web pages', false, 3, now(), now()),
    (v_q_id, 'Compiling C programs into machine code', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is a ''Virtual Disk'' format commonly used in VMware virtualization environments?', '`.vmdk` is VMware''s container format encapsulating virtual machine hard disk contents.',
    'easy', 1, 0, 36, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`.vmdk` (Virtual Machine Disk)', true, 1, now(), now()),
    (v_q_id, '`.mp3`', false, 2, now(), now()),
    (v_q_id, '`.docx`', false, 3, now(), now()),
    (v_q_id, '`.exe`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What virtual disk format is standard in Microsoft Hyper-V environments?', '`.vhd` and the modern `.vhdx` format are Microsoft''s virtual hard disk specifications.',
    'easy', 1, 0, 37, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, '`.vhd` and `.vhdx` (Virtual Hard Disk)', true, 1, now(), now()),
    (v_q_id, '`.dmg`', false, 2, now(), now()),
    (v_q_id, '`.iso`', false, 3, now(), now()),
    (v_q_id, '`.tar`', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''I/O Virtualization''?', 'I/O virtualization multiplexes physical network interface cards and HBAs among competing virtual guests.',
    'medium', 1, 0, 38, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Virtualizing the mouse pointer on screen', false, 1, now(), now()),
    (v_q_id, 'Managing and abstracting physical input/output hardware interfaces (such as network adapters and storage host bus adapters) among multiple virtual machines', true, 2, now(), now()),
    (v_q_id, 'Printing documents to PDF files', false, 3, now(), now()),
    (v_q_id, 'Converting audio signals to digital files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is SR-IOV (Single Root I/O Virtualization)?', 'SR-IOV enables direct hardware-level device sharing by creating Virtual Functions (VFs) attached directly to guest VM address spaces.',
    'hard', 1, 0, 39, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A single power supply for server racks', false, 1, now(), now()),
    (v_q_id, 'A hardware specification that allows a single PCIe physical device (e.g., a 10GbE network card) to present itself as multiple separate virtual devices (Virtual Functions) directly to VMs, bypassing hypervisor I/O overhead', true, 2, now(), now()),
    (v_q_id, 'A protocol for connecting monitors using HDMI', false, 3, now(), now()),
    (v_q_id, 'A hard drive formatting utility', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''VM Sprawl'' in virtualized data center management?', 'VM sprawl occurs when ease of provisioning leads to unmonitored, abandoned virtual machines wasting cluster capacity.',
    'easy', 1, 0, 40, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A computer virus that corrupts virtual disks', false, 1, now(), now()),
    (v_q_id, 'The uncontrolled proliferation of idle, neglected, or forgotten virtual machines consuming costly compute and storage resources across an enterprise', true, 2, now(), now()),
    (v_q_id, 'Physical servers falling out of racks', false, 3, now(), now()),
    (v_q_id, 'Spilling water on server components', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is the ''Hypervisor Overhead''?', 'Hypervisor overhead is the computational and memory tax imposed by abstraction, context switching, and trap handling.',
    'medium', 1, 0, 41, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The physical height of server cabinets', false, 1, now(), now()),
    (v_q_id, 'The additional CPU cycles, memory footprint, and latency consumed by the hypervisor layer to manage virtualization rather than running user applications', true, 2, now(), now()),
    (v_q_id, 'The monthly cost of cloud software licenses', false, 3, now(), now()),
    (v_q_id, 'The heat generated by power supplies', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Nested Virtualization''?', 'Nested virtualization allows hypervisors (like KVM or Hyper-V) to run inside an existing virtual guest instance.',
    'medium', 1, 0, 42, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Putting physical server chassis inside larger wooden boxes', false, 1, now(), now()),
    (v_q_id, 'The ability to run a hypervisor inside a virtual machine that is itself running on another hypervisor (running a VM inside a VM)', true, 2, now(), now()),
    (v_q_id, 'Organizing virtual machine files into subfolders', false, 3, now(), now()),
    (v_q_id, 'Connecting two virtual machines with a virtual cable', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Which of the following is an open-source bare-metal hypervisor that powers major cloud platforms and originated at Cambridge University?', 'The Xen Project developed the open-source Type-1 hypervisor that famously powered the early architectures of Amazon Web Services EC2.',
    'medium', 1, 0, 43, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Xen Hypervisor', true, 1, now(), now()),
    (v_q_id, 'VirtualBox', false, 2, now(), now()),
    (v_q_id, 'MS-DOS', false, 3, now(), now()),
    (v_q_id, 'Wine', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Domain 0'' (Dom0) in the Xen hypervisor architecture?', 'Dom0 is Xen''s initial privileged guest possessing direct hardware access and toolstacks to manage unprivileged DomU guests.',
    'hard', 1, 0, 44, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The primary privileged control domain that runs a modified Linux kernel, manages hardware devices, and controls guest unprivileged domains (DomU)', true, 1, now(), now()),
    (v_q_id, 'A domain name registered on the internet', false, 2, now(), now()),
    (v_q_id, 'The first row in a SQL database', false, 3, now(), now()),
    (v_q_id, 'The default user password on Linux', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''DomU'' in Xen architecture?', 'DomU represents unprivileged user guest domains isolated from bare-metal hardware access.',
    'medium', 1, 0, 45, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'The domain controller of Microsoft Active Directory', false, 1, now(), now()),
    (v_q_id, 'An unprivileged guest virtual machine domain managed by Dom0 with no direct access to physical hardware devices', true, 2, now(), now()),
    (v_q_id, 'The root user password', false, 3, now(), now()),
    (v_q_id, 'The universal serial bus controller', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Hardware Independence'' in virtualization?', 'Virtualization decouples OS images from physical motherboard chipsets, enabling portability across heterogeneous hardware.',
    'easy', 1, 0, 46, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'A computer that operates without a battery', false, 1, now(), now()),
    (v_q_id, 'The ability of a virtual machine to run on any physical host hardware without modification, because the hypervisor presents identical standardized virtual hardware to the guest OS', true, 2, now(), now()),
    (v_q_id, 'Manufacturing computers without silicon', false, 3, now(), now()),
    (v_q_id, 'Developing software that does not require an operating system', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Encapsulation'' in the context of Virtual Machines?', 'A VM''s entire operational existence is contained in files (configuration, disk images), simplifying backups, cloning, and migration.',
    'easy', 1, 0, 47, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Sealing server chassis with waterproof resin', false, 1, now(), now()),
    (v_q_id, 'The property that an entire virtual machine (operating system, applications, data, and state) is stored as a small set of standard discrete files on disk', true, 2, now(), now()),
    (v_q_id, 'Wrapping network cables in plastic insulation', false, 3, now(), now()),
    (v_q_id, 'Hiding passwords inside encrypted files', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Fault Isolation'' provided by virtualization?', 'Hardware-enforced address space isolation ensures VM crashes remain strictly quarantined within their own boundaries.',
    'easy', 1, 0, 48, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Insulating power plugs to prevent electric shocks', false, 1, now(), now()),
    (v_q_id, 'The guarantee that a software crash, security compromise, or blue screen of death in one virtual machine cannot crash or compromise adjacent virtual machines running on the same physical host', true, 2, now(), now()),
    (v_q_id, 'Detecting bad sectors on a hard drive', false, 3, now(), now()),
    (v_q_id, 'Disconnecting the internet when an error occurs', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'What is ''Hardware Emulation'' as compared to ''Virtualization''?', 'Emulation models entire target architectures in software across disparate instruction sets (ISA), incurring severe translation overhead.',
    'medium', 1, 0, 49, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Emulation translates software calls from one hardware CPU architecture to a completely different hardware architecture (e.g., ARM on x86) with significant performance penalties, whereas Virtualization executes instructions directly on matching host architecture', true, 1, now(), now()),
    (v_q_id, 'Emulation is always 100x faster than virtualization', false, 2, now(), now()),
    (v_q_id, 'Virtualization requires re-writing software, while emulation does not', false, 3, now(), now()),
    (v_q_id, 'There is no difference; they are identical', false, 4, now(), now());

  INSERT INTO public.quiz_questions (
    quiz_id, type, prompt, explanation, difficulty, points, negative_marks,
    order_index, tags, year, exam_name, created_at, updated_at
  ) VALUES (
    v_quiz_id, 'single', 'Why does Containerization offer significantly faster boot times (sub-seconds) compared to Virtual Machines (minutes)?', 'Containers merely instantiate isolated processes on an already active running host kernel, avoiding OS boot sequences.',
    'medium', 1, 0, 50, ARRAY['BCA-304N', 'Unit-2', 'BCA-304N-U2']::TEXT[], 2024, 'MJPRU BCA',
    now(), now()
  ) RETURNING id INTO v_q_id;

  INSERT INTO public.quiz_options (question_id, text, is_correct, order_index, created_at, updated_at) VALUES
    (v_q_id, 'Because containers do not boot a full operating system kernel, perform hardware device discovery, or initialize virtual BIOS/UEFI stacks', true, 1, now(), now()),
    (v_q_id, 'Because containers run on optical quantum computers', false, 2, now(), now()),
    (v_q_id, 'Because containers are written in assembly language', false, 3, now(), now()),
    (v_q_id, 'Because virtual machines are stored on floppy disks', false, 4, now(), now());

END $SEEDED_BLOCK$;
