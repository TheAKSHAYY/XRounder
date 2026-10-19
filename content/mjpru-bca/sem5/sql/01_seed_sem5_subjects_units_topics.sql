BEGIN;
-- Insert or Update 5 Subjects for Semester 5
INSERT INTO public.subjects (id, semester_id, code, title, slug, credits, status, sort_order, created_at, updated_at)
VALUES
  ('62e939cd-ec83-549a-a29b-59b885c538d9', '539b72d8-3292-4057-8474-cd2e5ef483ec', 'BCA-301N', 'Artificial Intelligence', 'bca-301n-artificial-intelligence', 4, 'published', 1, now(), now()),
  ('308bcc38-ea72-598c-811e-653b3fdcdcba', '539b72d8-3292-4057-8474-cd2e5ef483ec', 'BCA-303N', 'Web Technologies', 'bca-303n-web-technologies', 4, 'published', 2, now(), now()),
  ('c77f2700-69fe-5fac-b9ef-6ac573d958e4', '539b72d8-3292-4057-8474-cd2e5ef483ec', 'BCA-305N', 'Computer Graphics and Animation', 'bca-305n-computer-graphics-and-animation', 4, 'published', 3, now(), now()),
  ('2b80aa54-152e-5b8c-849c-0fbe0b523f59', '539b72d8-3292-4057-8474-cd2e5ef483ec', 'BCA-431E', 'Introduction to Cyber Security', 'bca-431e-introduction-to-cyber-security', 4, 'published', 4, now(), now()),
  ('6a958708-bec6-5df2-b290-9b0ed41d6cc6', '539b72d8-3292-4057-8474-cd2e5ef483ec', 'BCA-432E', 'GUI Programming', 'bca-432e-gui-programming', 4, 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET
  semester_id = EXCLUDED.semester_id, code = EXCLUDED.code, title = EXCLUDED.title,
  slug = EXCLUDED.slug, credits = EXCLUDED.credits, status = 'published',
  sort_order = EXCLUDED.sort_order, updated_at = now();

-- Insert or Update 25 Units for Semester 5
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('cb6eba4f-49d5-5c37-af9c-1d1b2d2b634f', '62e939cd-ec83-549a-a29b-59b885c538d9', 1, 'Introduction & Foundations of Artificial Intelligence', 'Official MJPRU BCA Unit 1: Introduction & Foundations of Artificial Intelligence for BCA-301N (Artificial Intelligence).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', '62e939cd-ec83-549a-a29b-59b885c538d9', 2, 'AI Problem Solving & State Space Search Techniques', 'Official MJPRU BCA Unit 2: AI Problem Solving & State Space Search Techniques for BCA-301N (Artificial Intelligence).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('764eacbb-fee3-569f-b664-c298ddc775a9', '62e939cd-ec83-549a-a29b-59b885c538d9', 3, 'Knowledge Representation & Classical Logic', 'Official MJPRU BCA Unit 3: Knowledge Representation & Classical Logic for BCA-301N (Artificial Intelligence).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('f5531dfe-5fc0-5526-9ec5-8233b742bb68', '62e939cd-ec83-549a-a29b-59b885c538d9', 4, 'Reasoning Techniques & Structured Knowledge Representation', 'Official MJPRU BCA Unit 4: Reasoning Techniques & Structured Knowledge Representation for BCA-301N (Artificial Intelligence).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('ba6f1839-340f-5efc-b7cd-74cb5c9a25de', '62e939cd-ec83-549a-a29b-59b885c538d9', 5, 'AI Applications, Expert Systems & Natural Language Processing', 'Official MJPRU BCA Unit 5: AI Applications, Expert Systems & Natural Language Processing for BCA-301N (Artificial Intelligence).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('9d5fd180-b3de-52c6-81d2-40981c0f757b', '308bcc38-ea72-598c-811e-653b3fdcdcba', 1, 'Web Basics, HTML5, CSS3 & Client-Side JavaScript', 'Official MJPRU BCA Unit 1: Web Basics, HTML5, CSS3 & Client-Side JavaScript for BCA-303N (Web Technologies).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('b38e3aa6-b72d-5b22-b98d-ad3c748d4a50', '308bcc38-ea72-598c-811e-653b3fdcdcba', 2, 'XML Technologies & Server-Side PHP Programming', 'Official MJPRU BCA Unit 2: XML Technologies & Server-Side PHP Programming for BCA-303N (Web Technologies).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9', '308bcc38-ea72-598c-811e-653b3fdcdcba', 3, 'Web Servers, Java Servlet Architecture & Session Management', 'Official MJPRU BCA Unit 3: Web Servers, Java Servlet Architecture & Session Management for BCA-303N (Web Technologies).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('a87cc4e0-6705-5a63-bd49-71c515cd279a', '308bcc38-ea72-598c-811e-653b3fdcdcba', 4, 'Database Access with JDBC, PHP-MySQL & MVC Frameworks', 'Official MJPRU BCA Unit 4: Database Access with JDBC, PHP-MySQL & MVC Frameworks for BCA-303N (Web Technologies).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('2c937fe4-96fb-5a2b-9256-48fef51f613f', '308bcc38-ea72-598c-811e-653b3fdcdcba', 5, 'JavaServer Pages (JSP) & JavaBean Architecture', 'Official MJPRU BCA Unit 5: JavaServer Pages (JSP) & JavaBean Architecture for BCA-303N (Web Technologies).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('1c65979d-2be0-55e5-80f5-ce91af8c4225', 'c77f2700-69fe-5fac-b9ef-6ac573d958e4', 1, 'Introduction to Computer Graphics, Hardware & Display Devices', 'Official MJPRU BCA Unit 1: Introduction to Computer Graphics, Hardware & Display Devices for BCA-305N (Computer Graphics and Animation).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('430e8853-ce2d-5441-8c38-e276958b1442', 'c77f2700-69fe-5fac-b9ef-6ac573d958e4', 2, '2D Transformations, Window-to-Viewport Mapping & 3D Projections', 'Official MJPRU BCA Unit 2: 2D Transformations, Window-to-Viewport Mapping & 3D Projections for BCA-305N (Computer Graphics and Animation).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('f8b15c04-3d58-59e4-8ec3-68f83b0918fe', 'c77f2700-69fe-5fac-b9ef-6ac573d958e4', 3, 'Scan Conversion Algorithms for Primitives & Curves', 'Official MJPRU BCA Unit 3: Scan Conversion Algorithms for Primitives & Curves for BCA-305N (Computer Graphics and Animation).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f', 'c77f2700-69fe-5fac-b9ef-6ac573d958e4', 4, 'Curves, Surfaces & Spline Representations', 'Official MJPRU BCA Unit 4: Curves, Surfaces & Spline Representations for BCA-305N (Computer Graphics and Animation).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('59188dd6-6b5c-5b1d-9c19-b0b8924ead2d', 'c77f2700-69fe-5fac-b9ef-6ac573d958e4', 5, 'Computer Animation Principles & Advanced Techniques', 'Official MJPRU BCA Unit 5: Computer Animation Principles & Advanced Techniques for BCA-305N (Computer Graphics and Animation).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('9a72b703-7561-57b7-81fb-929bdf3f20fd', '2b80aa54-152e-5b8c-849c-0fbe0b523f59', 1, 'Introduction to Cyber Security, Cyberspace & Threats', 'Official MJPRU BCA Unit 1: Introduction to Cyber Security, Cyberspace & Threats for BCA-431E (Introduction to Cyber Security).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('0d25abda-3786-520e-bfaf-c25fdb49d3bc', '2b80aa54-152e-5b8c-849c-0fbe0b523f59', 2, 'Classes of Security Attacks & Security Models', 'Official MJPRU BCA Unit 2: Classes of Security Attacks & Security Models for BCA-431E (Introduction to Cyber Security).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('7ea00fff-11c2-52dd-8185-03c3d21940c4', '2b80aa54-152e-5b8c-849c-0fbe0b523f59', 3, 'Cyber Security Policy, Governance & Stakeholders', 'Official MJPRU BCA Unit 3: Cyber Security Policy, Governance & Stakeholders for BCA-431E (Introduction to Cyber Security).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('2c6daea1-ce26-5b85-a594-f87b5bf054ba', '2b80aa54-152e-5b8c-849c-0fbe0b523f59', 4, 'Security Countermeasures, Firewalls & Cryptography', 'Official MJPRU BCA Unit 4: Security Countermeasures, Firewalls & Cryptography for BCA-431E (Introduction to Cyber Security).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('8237013e-e858-5df9-92cb-10b7404fb1a1', '2b80aa54-152e-5b8c-849c-0fbe0b523f59', 5, 'Security Testing, Ethical Hacking & Fraud Prevention', 'Official MJPRU BCA Unit 5: Security Testing, Ethical Hacking & Fraud Prevention for BCA-431E (Introduction to Cyber Security).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('1154c5fc-1194-5bee-9ee2-f1513ee63e99', '6a958708-bec6-5df2-b290-9b0ed41d6cc6', 1, '.NET Framework Architecture & Visual Basic Language Primitives', 'Official MJPRU BCA Unit 1: .NET Framework Architecture & Visual Basic Language Primitives for BCA-432E (GUI Programming).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('94da78bd-fa1b-5c07-bb40-47999b1454dc', '6a958708-bec6-5df2-b290-9b0ed41d6cc6', 2, 'Windows Forms, Controls, Menus & Exception Handling', 'Official MJPRU BCA Unit 2: Windows Forms, Controls, Menus & Exception Handling for BCA-432E (GUI Programming).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('5f2bfd88-2103-5fb2-9abd-622fef5cc070', '6a958708-bec6-5df2-b290-9b0ed41d6cc6', 3, 'Object-Oriented Programming & Class Libraries in .NET', 'Official MJPRU BCA Unit 3: Object-Oriented Programming & Class Libraries in .NET for BCA-432E (GUI Programming).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('f09c2fd0-ca9a-50f2-ae5d-e2b5d3f1a546', '6a958708-bec6-5df2-b290-9b0ed41d6cc6', 4, 'ADO.NET Architecture & Database Connectivity', 'Official MJPRU BCA Unit 4: ADO.NET Architecture & Database Connectivity for BCA-432E (GUI Programming).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('aafff8d5-7b26-510f-9689-ffcfa22dddbf', '6a958708-bec6-5df2-b290-9b0ed41d6cc6', 5, 'ASP.NET 4.0 Web Forms & Application Deployment', 'Official MJPRU BCA Unit 5: ASP.NET 4.0 Web Forms & Application Deployment for BCA-432E (GUI Programming).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();

DELETE FROM public.syllabus_topics WHERE unit_id IN ('cb6eba4f-49d5-5c37-af9c-1d1b2d2b634f', 'f67a4b00-a5ff-5356-8a99-6ff53d3363a6', '764eacbb-fee3-569f-b664-c298ddc775a9', 'f5531dfe-5fc0-5526-9ec5-8233b742bb68', 'ba6f1839-340f-5efc-b7cd-74cb5c9a25de', '9d5fd180-b3de-52c6-81d2-40981c0f757b', 'b38e3aa6-b72d-5b22-b98d-ad3c748d4a50', '90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9', 'a87cc4e0-6705-5a63-bd49-71c515cd279a', '2c937fe4-96fb-5a2b-9256-48fef51f613f', '1c65979d-2be0-55e5-80f5-ce91af8c4225', '430e8853-ce2d-5441-8c38-e276958b1442', 'f8b15c04-3d58-59e4-8ec3-68f83b0918fe', 'bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f', '59188dd6-6b5c-5b1d-9c19-b0b8924ead2d', '9a72b703-7561-57b7-81fb-929bdf3f20fd', '0d25abda-3786-520e-bfaf-c25fdb49d3bc', '7ea00fff-11c2-52dd-8185-03c3d21940c4', '2c6daea1-ce26-5b85-a594-f87b5bf054ba', '8237013e-e858-5df9-92cb-10b7404fb1a1', '1154c5fc-1194-5bee-9ee2-f1513ee63e99', '94da78bd-fa1b-5c07-bb40-47999b1454dc', '5f2bfd88-2103-5fb2-9abd-622fef5cc070', 'f09c2fd0-ca9a-50f2-ae5d-e2b5d3f1a546', 'aafff8d5-7b26-510f-9689-ffcfa22dddbf');

INSERT INTO public.syllabus_topics (unit_id, title, sort_order, status, created_at, updated_at) VALUES
  ('cb6eba4f-49d5-5c37-af9c-1d1b2d2b634f', 'Definitions and Core Philosophies of Artificial Intelligence: Thinking Humanly vs Rationally', 1, 'published', now(), now()),
  ('cb6eba4f-49d5-5c37-af9c-1d1b2d2b634f', 'Historical Evolution of AI: Dartmouth Workshop (1956), AI Winters, Expert Systems Boom & Modern Deep Learning', 2, 'published', now(), now()),
  ('cb6eba4f-49d5-5c37-af9c-1d1b2d2b634f', 'Philosophical Foundations of AI: Mind-Body Dualism, Materialism & Physical Symbol System Hypothesis (PSSH)', 3, 'published', now(), now()),
  ('cb6eba4f-49d5-5c37-af9c-1d1b2d2b634f', 'Alan Turing''s Imitation Game: The Turing Test, Loopholes, Total Turing Test & Loebner Prize', 4, 'published', now(), now()),
  ('cb6eba4f-49d5-5c37-af9c-1d1b2d2b634f', 'John Searle''s Chinese Room Thought Experiment: Syntax vs Semantics, Strong AI vs Weak AI Critique', 5, 'published', now(), now()),
  ('cb6eba4f-49d5-5c37-af9c-1d1b2d2b634f', 'Symbolic AI (GOFAI) vs Connectionist AI: Logic-Based Manipulation vs Neural Networks & Distributed Representations', 6, 'published', now(), now()),
  ('cb6eba4f-49d5-5c37-af9c-1d1b2d2b634f', 'Concept of Intelligent Agents: Definition, Agent Function, Agent Program, Sensors, Actuators & Environment Interaction', 7, 'published', now(), now()),
  ('cb6eba4f-49d5-5c37-af9c-1d1b2d2b634f', 'PEAS Framework: Performance Measure, Environment, Actuators, Sensors Characterization for Autonomous Agents', 8, 'published', now(), now()),
  ('cb6eba4f-49d5-5c37-af9c-1d1b2d2b634f', 'Environment Categorization: Fully vs Partially Observable, Deterministic vs Stochastic, Episodic vs Sequential', 9, 'published', now(), now()),
  ('cb6eba4f-49d5-5c37-af9c-1d1b2d2b634f', 'Agent Architecture Taxonomies: Simple Reflex Agents, Model-Based Reflex Agents, Goal-Based Agents & Utility-Based Agents', 10, 'published', now(), now()),
  ('cb6eba4f-49d5-5c37-af9c-1d1b2d2b634f', 'Learning Agents Framework: Critic, Learning Element, Learning Goals & Performance Element', 11, 'published', now(), now()),
  ('cb6eba4f-49d5-5c37-af9c-1d1b2d2b634f', 'Ethical Considerations and Future of AI: Algorithmic Bias, Autonomous Decision Making & Safety Alignment', 12, 'published', now(), now()),
  ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', 'Problem Solving as State Space Search: Initial State, State Space Graph, Transition Model, Goal State & Path Cost', 1, 'published', now(), now()),
  ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', 'Production Systems Architecture: Working Memory, Production Rules (Condition-Action), Inference Engine & Conflict Resolution', 2, 'published', now(), now()),
  ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', 'Control Strategies & Problem Characteristics: Modularity, Recoverability, Predictability & Knowledge Necessity', 3, 'published', now(), now()),
  ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', 'Uninformed Search Strategies: Breadth-First Search (BFS) Algorithm, Completeness, Time & Space Complexity (O(b^d))', 4, 'published', now(), now()),
  ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', 'Depth-First Search (DFS) & Depth-Limited Search (DLS): Algorithm, Backtracking Mechanism & Memory Efficiency (O(bm))', 5, 'published', now(), now()),
  ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', 'Iterative Deepening Search (IDS) & Uniform Cost Search (Dijkstra-Variant): Optimality and Trade-offs', 6, 'published', now(), now()),
  ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', 'Informed (Heuristic) Search: Heuristic Functions h(n), Admissibility Condition (h(n) <= h*(n)) & Consistency/Monotonicity', 7, 'published', now(), now()),
  ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', 'Greedy Best-First Search: Evaluation Function f(n) = h(n), Greedy Traversal & Susceptibility to Local Extrema', 8, 'published', now(), now()),
  ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', 'A* Search Algorithm: f(n) = g(n) + h(n), Mathematical Proof of Optimality on Tree and Graph Searches', 9, 'published', now(), now()),
  ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', 'Local Search & Optimization: Pure Hill Climbing, Steepest-Ascent, Stochastic Hill Climbing, Foothills, Plateaus & Ridges', 10, 'published', now(), now()),
  ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', 'Problem Reduction & AND/OR Graphs: AO* Search Algorithm, Branching, Futility & Hyper-Arcs', 11, 'published', now(), now()),
  ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', 'Constraint Satisfaction Problems (CSP): Backtracking Search, Constraint Propagation & Forward Checking', 12, 'published', now(), now()),
  ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', 'Adversarial Search & Game Playing: Two-Player Zero-Sum Games, Minimax Decision Rule, Backup Values', 13, 'published', now(), now()),
  ('f67a4b00-a5ff-5356-8a99-6ff53d3363a6', 'Alpha-Beta Pruning: Alpha Cutoffs, Beta Cutoffs, Optimal Move Ordering & Effective Branching Factor Reduction', 14, 'published', now(), now()),
  ('764eacbb-fee3-569f-b664-c298ddc775a9', 'Knowledge Representation Requirements: Representational Adequacy, Inferential Adequacy, Inferential Efficiency & Acquisitional Efficiency', 1, 'published', now(), now()),
  ('764eacbb-fee3-569f-b664-c298ddc775a9', 'Propositional Logic: Syntax, Semantics, Truth Tables, Logical Connectives, Validity, Satisfiability & Tautologies', 2, 'published', now(), now()),
  ('764eacbb-fee3-569f-b664-c298ddc775a9', 'First-Order Predicate Logic (FOPL): Universal (∀) and Existential (∃) Quantifiers, Predicates, Terms, Functions & Arity', 3, 'published', now(), now()),
  ('764eacbb-fee3-569f-b664-c298ddc775a9', 'Conversion to Conjunctive Normal Form (CNF): 9-Step Standard Procedure (Eliminating Implications, De Morgan''s, Skolemization)', 4, 'published', now(), now()),
  ('764eacbb-fee3-569f-b664-c298ddc775a9', 'Skolemization Paradigm: Skolem Constants vs Skolem Functions for Existential Quantifiers', 5, 'published', now(), now()),
  ('764eacbb-fee3-569f-b664-c298ddc775a9', 'Clause Form Transformation: Prenex Normal Form, Eliminating Universal Quantifiers & Dropping Conjunctions', 6, 'published', now(), now()),
  ('764eacbb-fee3-569f-b664-c298ddc775a9', 'Unification Algorithm in FOPL: Most General Unifier (MGU), Substitution Sets & Occur Check Implementation', 7, 'published', now(), now()),
  ('764eacbb-fee3-569f-b664-c298ddc775a9', 'Resolution Refutation Principle: J. Alan Robinson''s Rule of Inference, Proof by Contradiction in Clause Logic', 8, 'published', now(), now()),
  ('764eacbb-fee3-569f-b664-c298ddc775a9', 'Resolution Refutation Trees: Linear Resolution, Binary Resolution & Resolvent Construction', 9, 'published', now(), now()),
  ('764eacbb-fee3-569f-b664-c298ddc775a9', 'Deduction, Induction, and Abduction: Formal Distinctions, Defeasible Reasoning & Soundness', 10, 'published', now(), now()),
  ('764eacbb-fee3-569f-b664-c298ddc775a9', 'Automated Theorem Proving: Robinson''s Algorithm Application to Mathematical & Logical Proofs', 11, 'published', now(), now()),
  ('764eacbb-fee3-569f-b664-c298ddc775a9', 'Question Answering Systems: Green''s Method, Answer Literals, Binding Accumulation & Extracting Variable Substitutions', 12, 'published', now(), now()),
  ('f5531dfe-5fc0-5526-9ec5-8233b742bb68', 'Forward Chaining (Data-Driven Reasoning): Modus Ponens Execution, Cycle of Matching, Activation & Firing', 1, 'published', now(), now()),
  ('f5531dfe-5fc0-5526-9ec5-8233b742bb68', 'Backward Chaining (Goal-Driven Reasoning): Hypothesis Testing, Sub-Goal Decomposition & Stack-Based Processing', 2, 'published', now(), now()),
  ('f5531dfe-5fc0-5526-9ec5-8233b742bb68', 'Conflict Resolution Strategies: Specificity Rule, Recency Principle, Priority Order & Refractoriness', 3, 'published', now(), now()),
  ('f5531dfe-5fc0-5526-9ec5-8233b742bb68', 'Pattern Matching Paradigms: Rete Matching Algorithm, Alpha Networks, Beta Memory & Discrimination Trees', 4, 'published', now(), now()),
  ('f5531dfe-5fc0-5526-9ec5-8233b742bb68', 'Indexing Schemes for Large Knowledge Bases: Content-Addressable Indexing, Hash-Indexed Rules & Discrimination Trees', 5, 'published', now(), now()),
  ('f5531dfe-5fc0-5526-9ec5-8233b742bb68', 'Semantic Networks: Quillian''s Model, Nodes, Labeled Directed Edges, ISA and AKO Hierarchies, Property Inheritance', 6, 'published', now(), now()),
  ('f5531dfe-5fc0-5526-9ec5-8233b742bb68', 'Exception Handling in Semantic Nets: Overriding Defaults, Multiple Inheritance Conflicts & Diamond Problem', 7, 'published', now(), now()),
  ('f5531dfe-5fc0-5526-9ec5-8233b742bb68', 'Frames Representation (Marvin Minsky): Frame Structure, Slots, Fillers, Facets, Default Values, Demonic Triggers (if-needed, if-added)', 8, 'published', now(), now()),
  ('f5531dfe-5fc0-5526-9ec5-8233b742bb68', 'Conceptual Dependency (CD) Theory (Roger Schank): Primitive Acts (ATRANS, PTRANS, MTRANS, MBUILD, INGEST, EXPEL, MOVE, GRASP)', 9, 'published', now(), now()),
  ('f5531dfe-5fc0-5526-9ec5-8233b742bb68', 'CD Conceptual Roles: Actor, Objective, Recipient, Directive & Conceptual Tenses', 10, 'published', now(), now()),
  ('f5531dfe-5fc0-5526-9ec5-8233b742bb68', 'Scripts Knowledge Representation: Schank''s Scripts, Causal Chains, Restaurant Script Standard Paradigm', 11, 'published', now(), now()),
  ('f5531dfe-5fc0-5526-9ec5-8233b742bb68', 'Components of Scripts: Entry Conditions, Props, Roles, Tracks & Scenes Progression', 12, 'published', now(), now()),
  ('ba6f1839-340f-5efc-b7cd-74cb5c9a25de', 'Introduction to Expert Systems: Definition, Domain Specificity, Human Expert vs AI Expert Comparison', 1, 'published', now(), now()),
  ('ba6f1839-340f-5efc-b7cd-74cb5c9a25de', 'Architecture of Expert Systems: Knowledge Base, Inference Engine, Working Memory, User Interface & Explanation Facility', 2, 'published', now(), now()),
  ('ba6f1839-340f-5efc-b7cd-74cb5c9a25de', 'Knowledge Acquisition Process: Knowledge Engineers, Domain Experts, Protocol Analysis & Elicitation Bottleneck', 3, 'published', now(), now()),
  ('ba6f1839-340f-5efc-b7cd-74cb5c9a25de', 'Explanation Subsystem: ''How'' Explanations (Sub-goal Trees) and ''Why'' Explanations (Rule Tracing)', 4, 'published', now(), now()),
  ('ba6f1839-340f-5efc-b7cd-74cb5c9a25de', 'Rule-Based Expert Systems: MYCIN (Infectious Diseases Diagnosis, Certainty Factors CF), DENDRAL & PROSPECTOR Case Studies', 5, 'published', now(), now()),
  ('ba6f1839-340f-5efc-b7cd-74cb5c9a25de', 'Certainty Factor Theory: Measures of Belief (MB), Measures of Disbelief (MD), Combining Evidence in MYCIN', 6, 'published', now(), now()),
  ('ba6f1839-340f-5efc-b7cd-74cb5c9a25de', 'Expert System Shells: Architecture, CLIPS, JESS, Separation of Domain Knowledge from Inference Mechanisms', 7, 'published', now(), now()),
  ('ba6f1839-340f-5efc-b7cd-74cb5c9a25de', 'Natural Language Processing (NLP) Overview: Communication Pipeline, Ambiguity Challenges (Lexical, Syntactic, Semantic, Pragmatic)', 8, 'published', now(), now()),
  ('ba6f1839-340f-5efc-b7cd-74cb5c9a25de', 'Morphological Analysis & Tokenization: Stems, Roots, Affixes, Lemmatization vs Porter Stemmer Algorithm', 9, 'published', now(), now()),
  ('ba6f1839-340f-5efc-b7cd-74cb5c9a25de', 'Syntactic Analysis: Context-Free Grammars (CFG), Parse Trees, Top-Down vs Bottom-Up Parsing, Cocke-Younger-Kasami (CYK)', 10, 'published', now(), now()),
  ('ba6f1839-340f-5efc-b7cd-74cb5c9a25de', 'Semantic Analysis & Pragmatics: Compositional Semantics, Word Sense Disambiguation (WSD), Discourse Analysis & Reference Resolution', 11, 'published', now(), now()),
  ('ba6f1839-340f-5efc-b7cd-74cb5c9a25de', 'Contemporary AI Paradigms: Introduction to Machine Learning (Supervised, Unsupervised, RL), Artificial Neural Networks (ANN), SVM & Fuzzy Logic Basics', 12, 'published', now(), now()),
  ('9d5fd180-b3de-52c6-81d2-40981c0f757b', 'Internet and World Wide Web Architecture: Client-Server Model, Web Browsers, Web Servers & URL Anatomy', 1, 'published', now(), now()),
  ('9d5fd180-b3de-52c6-81d2-40981c0f757b', 'HTTP/HTTPS Protocol: Request-Response Lifecycle, Methods (GET, POST, PUT, DELETE, HEAD), Status Codes (200, 301, 404, 500)', 2, 'published', now(), now()),
  ('9d5fd180-b3de-52c6-81d2-40981c0f757b', 'MIME Types & Content Negotiation: Media Types (text/html, application/json, multipart/form-data), Web Programmers Toolbox', 3, 'published', now(), now()),
  ('9d5fd180-b3de-52c6-81d2-40981c0f757b', 'HTML Document Structure & Semantic Tags: <!DOCTYPE html>, <html>, <head>, <meta>, <header>, <nav>, <section>, <article>, <footer>', 4, 'published', now(), now()),
  ('9d5fd180-b3de-52c6-81d2-40981c0f757b', 'HTML Form Elements & Layout Controls: Lists (<ol>, <ul>, <dl>), Tables (<thead>, <tbody>, rowspan, colspan), Forms (<input>, <select>, <textarea>)', 5, 'published', now(), now()),
  ('9d5fd180-b3de-52c6-81d2-40981c0f757b', 'Cascading Style Sheets (CSS): Syntax, Selectors (Element, Class, ID, Pseudo-classes), Specificity Hierarchy', 6, 'published', now(), now()),
  ('9d5fd180-b3de-52c6-81d2-40981c0f757b', 'CSS Integration Paradigms: Inline Styles, Internal Stylesheets (<style>), External Stylesheets (<link rel=''stylesheet''>)', 7, 'published', now(), now()),
  ('9d5fd180-b3de-52c6-81d2-40981c0f757b', 'CSS Box Model: Content, Padding, Border, Margin, box-sizing Property, Flexbox & CSS Grid Basics', 8, 'published', now(), now()),
  ('9d5fd180-b3de-52c6-81d2-40981c0f757b', 'JavaScript Fundamentals: Variables (var, let, const), Data Types, Operators, Type Coercion, Control Flow Constructs', 9, 'published', now(), now()),
  ('9d5fd180-b3de-52c6-81d2-40981c0f757b', 'JavaScript Functions & Scope: Function Declarations, Function Expressions, Arrow Functions, Lexical Scope, Closures', 10, 'published', now(), now()),
  ('9d5fd180-b3de-52c6-81d2-40981c0f757b', 'DOM Manipulation & Event Handling: Document Object Model, getElementById, querySelector, Event Listeners (onclick, onsubmit, onchange)', 11, 'published', now(), now()),
  ('9d5fd180-b3de-52c6-81d2-40981c0f757b', 'Client-Side Form Validation: Regular Expressions (Regex), Real-Time Field Feedback, preventDefault() & Sanitization', 12, 'published', now(), now()),
  ('b38e3aa6-b72d-5b22-b98d-ad3c748d4a50', 'Introduction to XML: Extensible Markup Language, Syntax Rules, Well-Formed vs Valid XML Documents', 1, 'published', now(), now()),
  ('b38e3aa6-b72d-5b22-b98d-ad3c748d4a50', 'Document Type Definition (DTD): Internal vs External DTD, Elements, Attributes (CDATA, ID, IDREF), Entities', 2, 'published', now(), now()),
  ('b38e3aa6-b72d-5b22-b98d-ad3c748d4a50', 'XML Schemas (XSD): Data Typing, Schema Definition, Complex Types vs Simple Types, Namespaces', 3, 'published', now(), now()),
  ('b38e3aa6-b72d-5b22-b98d-ad3c748d4a50', 'Presenting XML: Extensible Stylesheet Language (XSL), XSL Transformations (XSLT), XPath Expressions', 4, 'published', now(), now()),
  ('b38e3aa6-b72d-5b22-b98d-ad3c748d4a50', 'XHTML: Strict, Transitional & Frameset Specifications, Differences Between HTML and XHTML Syntax', 5, 'published', now(), now()),
  ('b38e3aa6-b72d-5b22-b98d-ad3c748d4a50', 'XML Parsing APIs: Document Object Model (DOM) Tree-Based Parser vs Simple API for XML (SAX) Event-Driven Parser', 6, 'published', now(), now()),
  ('b38e3aa6-b72d-5b22-b98d-ad3c748d4a50', 'PHP Server-Side Architecture: PHP Engine, Server Interaction (Apache/Nginx mod_php), <?php ... ?> Tagging', 7, 'published', now(), now()),
  ('b38e3aa6-b72d-5b22-b98d-ad3c748d4a50', 'PHP Language Primitives: Variables ($ prefix), Dynamic Typing, Constants, Arithmetic, Logical and Bitwise Operators', 8, 'published', now(), now()),
  ('b38e3aa6-b72d-5b22-b98d-ad3c748d4a50', 'PHP Control Structures: Conditional Statements (if-else, switch-case), Iterative Loops (for, while, do-while, foreach)', 9, 'published', now(), now()),
  ('b38e3aa6-b72d-5b22-b98d-ad3c748d4a50', 'PHP Arrays: Indexed Arrays, Associative Arrays, Multidimensional Arrays, Array Manipulation Functions', 10, 'published', now(), now()),
  ('b38e3aa6-b72d-5b22-b98d-ad3c748d4a50', 'PHP Functions & Parameter Mechanisms: User-Defined Functions, Default Arguments, Pass by Value vs Pass by Reference (&)', 11, 'published', now(), now()),
  ('b38e3aa6-b72d-5b22-b98d-ad3c748d4a50', 'PHP Superglobals & Form Handling: $_GET, $_POST, $_REQUEST, $_SERVER, Form Data Sanitization (htmlspecialchars, strip_tags)', 12, 'published', now(), now()),
  ('90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9', 'Web Servers Overview: Apache Tomcat, Web Server vs Application Server, Java Servlet Development Kit (JSDK)', 1, 'published', now(), now()),
  ('90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9', 'Servlet Architecture: Java Servlet Specification, Advantages over CGI (Multithreading, Platform Independence, Persistence)', 2, 'published', now(), now()),
  ('90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9', 'Servlet Lifecycle: Class Loading, Instantiation, init() Initialization, service() Dispatch, destroy() Cleanup', 3, 'published', now(), now()),
  ('90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9', 'Deployment and Configuration: Web Application Directory Structure, web.xml Deployment Descriptor, <servlet> and <servlet-mapping>', 4, 'published', now(), now()),
  ('90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9', 'Servlet API Core Packages: javax.servlet and javax.servlet.http Hierarchy, Servlet Interface, GenericServlet Class', 5, 'published', now(), now()),
  ('90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9', 'HttpServlet Class: Handling HTTP Requests, doGet(), doPost(), doPut(), doDelete() Method Implementations', 6, 'published', now(), now()),
  ('90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9', 'HttpServletRequest Interface: Retrieving Form Parameters (getParameter, getParameterValues), Headers, Cookies & InputStreams', 7, 'published', now(), now()),
  ('90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9', 'HttpServletResponse Interface: Setting MIME Content-Type, Character Encoding, Headers, Status Codes & PrintWriter Output', 8, 'published', now(), now()),
  ('90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9', 'Servlet Initialization & Context: Reading ServletConfig init-parameters, ServletContext Application-Wide Parameters', 9, 'published', now(), now()),
  ('90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9', 'State Management in Web Applications: Stateless Nature of HTTP Protocol, Challenges in Multi-Step Workflows', 10, 'published', now(), now()),
  ('90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9', 'Cookies API: Creating Cookies, Setting Max-Age, Path, Domain, Secure and HttpOnly Flags, Client-Side Storage', 11, 'published', now(), now()),
  ('90113b29-25c8-5d2e-bdc2-fe3da8bc3ac9', 'HttpSession Interface: Session Tracking, Session ID (JSESSIONID), URL Rewriting, getSession(boolean), Session Invalidation & Timeouts', 12, 'published', now(), now()),
  ('a87cc4e0-6705-5a63-bd49-71c515cd279a', 'Database Access in Web Applications: Two-Tier vs Three-Tier Architecture, Persistence Layer Principles', 1, 'published', now(), now()),
  ('a87cc4e0-6705-5a63-bd49-71c515cd279a', 'Java Database Connectivity (JDBC) Architecture: Driver Manager, Connection, Statement, PreparedStatement & ResultSet', 2, 'published', now(), now()),
  ('a87cc4e0-6705-5a63-bd49-71c515cd279a', 'JDBC Driver Types: Type 1 (JDBC-ODBC Bridge), Type 2 (Native-API Driver), Type 3 (Network-Protocol Driver), Type 4 (Thin Driver)', 3, 'published', now(), now()),
  ('a87cc4e0-6705-5a63-bd49-71c515cd279a', 'Executing SQL Statements via JDBC: executeQuery(), executeUpdate(), execute(), Scrollable & Updatable ResultSets', 4, 'published', now(), now()),
  ('a87cc4e0-6705-5a63-bd49-71c515cd279a', 'Parameterized Queries with PreparedStatement: Preventing SQL Injection Vulnerabilities, In-Memory Compilation', 5, 'published', now(), now()),
  ('a87cc4e0-6705-5a63-bd49-71c515cd279a', 'Advanced JDBC Features: Database Transactions (commit, rollback, setAutoCommit(false)), Savepoints, Batch Updates', 6, 'published', now(), now()),
  ('a87cc4e0-6705-5a63-bd49-71c515cd279a', 'javax.sql Package: DataSource Interface, Connection Pooling Mechanisms, High-Performance Database Pooling', 7, 'published', now(), now()),
  ('a87cc4e0-6705-5a63-bd49-71c515cd279a', 'Accessing Database from Servlets: Connecting Servlet Controller to Backend RDBMS, Forwarding Results to View', 8, 'published', now(), now()),
  ('a87cc4e0-6705-5a63-bd49-71c515cd279a', 'PHP-MySQL Connectivity: mysqli Extension (Procedural vs Object-Oriented API), PDO (PHP Data Objects) Extension', 9, 'published', now(), now()),
  ('a87cc4e0-6705-5a63-bd49-71c515cd279a', 'Executing Database Queries in PHP: Establishing Connection, Prepared Statements (bind_param, execute), Fetching Associative Rows', 10, 'published', now(), now()),
  ('a87cc4e0-6705-5a63-bd49-71c515cd279a', 'Model-View-Controller (MVC) Pattern: Separation of Concerns, Model (Business Logic), View (Presentation), Controller (Flow)', 11, 'published', now(), now()),
  ('a87cc4e0-6705-5a63-bd49-71c515cd279a', 'Apache Struts Framework: Architecture, ActionServlet (Front Controller), ActionForm, Action Class, struts-config.xml Workflow', 12, 'published', now(), now()),
  ('2c937fe4-96fb-5a2b-9256-48fef51f613f', 'Introduction to JavaServer Pages (JSP): JSP Motivation, Comparison of Servlets vs JSP Pages, Separation of Roles', 1, 'published', now(), now()),
  ('2c937fe4-96fb-5a2b-9256-48fef51f613f', 'JSP Page Anatomy & Lifecycle: Translation Phase (JSP to Servlet Source), Compilation Phase (.class), Instantiation, _jspInit, _jspService, _jspDestroy', 2, 'published', now(), now()),
  ('2c937fe4-96fb-5a2b-9256-48fef51f613f', 'JSP Directive Elements: <%@ page ... %>, <%@ include ... %>, <%@ taglib ... %>, Attributes (import, contentType, session, errorPage)', 3, 'published', now(), now()),
  ('2c937fe4-96fb-5a2b-9256-48fef51f613f', 'JSP Scripting Elements: Scriptlets (<% ... %>), Expressions (<%= ... %>), Declarations (<%! ... %>), Syntax & Best Practices', 4, 'published', now(), now()),
  ('2c937fe4-96fb-5a2b-9256-48fef51f613f', 'JSP Implicit Objects: request, response, out (JspWriter), session, application, config, pageContext, page, exception', 5, 'published', now(), now()),
  ('2c937fe4-96fb-5a2b-9256-48fef51f613f', 'JSP Standard Action Elements: <jsp:include> (Dynamic Inclusion vs Directive Static Inclusion), <jsp:forward>, <jsp:param>', 6, 'published', now(), now()),
  ('2c937fe4-96fb-5a2b-9256-48fef51f613f', 'JavaBeans Architecture: JavaBean Specification, Zero-Argument Constructor, Private Properties, Getters and Setters, Serializable', 7, 'published', now(), now()),
  ('2c937fe4-96fb-5a2b-9256-48fef51f613f', 'Deploying JavaBeans in JSP: <jsp:useBean> Tag, Scope Attributes (page, request, session, application)', 8, 'published', now(), now()),
  ('2c937fe4-96fb-5a2b-9256-48fef51f613f', 'Setting and Getting Bean Properties: <jsp:setProperty name=''...'' property=''*''/> Automapping, <jsp:getProperty>', 9, 'published', now(), now()),
  ('2c937fe4-96fb-5a2b-9256-48fef51f613f', 'JSP Expression Language (EL): Syntax (${expression}), Implicit Objects (param, header, cookie), Operators, Simplifying Data Access', 10, 'published', now(), now()),
  ('2c937fe4-96fb-5a2b-9256-48fef51f613f', 'JSTL (JSP Standard Tag Library): Core Tags (<c:out>, <c:set>, <c:if>, <c:forEach>, <c:choose>), Formatting & SQL Tags', 11, 'published', now(), now()),
  ('2c937fe4-96fb-5a2b-9256-48fef51f613f', 'Security & Performance Optimization in JSP: Preventing XSS Attacks, Disabling Scriptlets, Custom Error Pages & Caching Strategies', 12, 'published', now(), now()),
  ('1c65979d-2be0-55e5-80f5-ce91af8c4225', 'History and Evolution of Computer Graphics: Whirlwind Computer, Sketchpad (Ivan Sutherland), Evolution to GPU-Driven Real-Time Rendering', 1, 'published', now(), now()),
  ('1c65979d-2be0-55e5-80f5-ce91af8c4225', 'Definition and Broad Classifications: Interactive vs Passive Graphics, Vector Graphics vs Bitmap/Raster Graphics', 2, 'published', now(), now()),
  ('1c65979d-2be0-55e5-80f5-ce91af8c4225', 'Major Applications of Computer Graphics: CAD/CAM, Scientific Visualization, Entertainment & Animation, Medical Imaging, Graphic User Interfaces', 3, 'published', now(), now()),
  ('1c65979d-2be0-55e5-80f5-ce91af8c4225', 'Cathode Ray Tube (CRT) Physics: Electron Gun, Accelerating Anode, Deflection Yoke, Phosphor Screen, Persistence, Aspect Ratio', 4, 'published', now(), now()),
  ('1c65979d-2be0-55e5-80f5-ce91af8c4225', 'Refresh CRT Display Systems: Frame Buffer, Refresh Rate (Hz), Interlacing vs Non-Interlaced Scanning', 5, 'published', now(), now()),
  ('1c65979d-2be0-55e5-80f5-ce91af8c4225', 'Raster Scan Display Architecture: Electron Beam Traversal, Horizontal Retrace, Vertical Retrace, Raster Scan Controller', 6, 'published', now(), now()),
  ('1c65979d-2be0-55e5-80f5-ce91af8c4225', 'Random Scan (Vector / Calligraphic) Display Systems: Electron Beam Directed Deflection, High-Resolution Line Rendering, Comparison with Raster Displays', 7, 'published', now(), now()),
  ('1c65979d-2be0-55e5-80f5-ce91af8c4225', 'Color CRT Systems: Beam Penetration Method (Two Layers) vs Shadow Mask CRT Method (Delta/In-Line Triads, Color Purity)', 8, 'published', now(), now()),
  ('1c65979d-2be0-55e5-80f5-ce91af8c4225', 'Flat Panel Display Technologies: Plasma Display Panels (Gas Discharge, UV Light, Phosphors), Liquid Crystal Display (LCD - Twisted Nematic, TFT-LCD)', 9, 'published', now(), now()),
  ('1c65979d-2be0-55e5-80f5-ce91af8c4225', 'Light Emitting Diode (LED) & Organic LED (OLED) Displays: Working Principles, Advantages over Traditional Backlit Panels', 10, 'published', now(), now()),
  ('1c65979d-2be0-55e5-80f5-ce91af8c4225', 'Interactive Input Devices: Digitizing Graphics Tablets, Light Pens, Optical Mice, Joysticks, Trackballs, Data Gloves', 11, 'published', now(), now()),
  ('1c65979d-2be0-55e5-80f5-ce91af8c4225', 'Graphics Software Architectures & Standards: GKS (Graphical Kernel System), PHIGS, OpenGL & DirectX Hardware Abstraction', 12, 'published', now(), now()),
  ('430e8853-ce2d-5441-8c38-e276958b1442', '2D Geometric Transformations: Translation (P'' = P + T), Scaling (x'' = x*Sx, y'' = y*Sy), Rotation about the Origin (θ)', 1, 'published', now(), now()),
  ('430e8853-ce2d-5441-8c38-e276958b1442', 'Matrix Representations of 2D Transformations: Coordinate Vectors, Transformation Matrices, Linearity and Limitations', 2, 'published', now(), now()),
  ('430e8853-ce2d-5441-8c38-e276958b1442', 'Homogeneous Coordinate Systems: Need for Homogeneous Representation, Projective Geometry, Matrix Representation (3x3)', 3, 'published', now(), now()),
  ('430e8853-ce2d-5441-8c38-e276958b1442', 'Composite 2D Transformations: Matrix Multiplication Order, Non-Commutative Nature, Successive Translations, Scalings, Rotations', 4, 'published', now(), now()),
  ('430e8853-ce2d-5441-8c38-e276958b1442', 'General 2D Rotation about an Arbitrary Point (xr, yr): Translation to Origin, Rotation, Inverse Translation Sequence', 5, 'published', now(), now()),
  ('430e8853-ce2d-5441-8c38-e276958b1442', 'Other 2D Transformations: Reflection (About X-Axis, Y-Axis, Origin, Line y = x), Shear Transformations (X-Shear, Y-Shear)', 6, 'published', now(), now()),
  ('430e8853-ce2d-5441-8c38-e276958b1442', 'Window-to-Viewport Coordinate Transformation: World Coordinate System (WCS), Viewing Coordinates, Normalized Device Coordinates (NDC)', 7, 'published', now(), now()),
  ('430e8853-ce2d-5441-8c38-e276958b1442', 'Viewing Pipeline & Clipping Operations: Interior vs Exterior Clipping, Point Clipping Algorithm against Rectangular Window', 8, 'published', now(), now()),
  ('430e8853-ce2d-5441-8c38-e276958b1442', 'Cohen-Sutherland Line Clipping Algorithm: 4-Bit Outcodes (Top, Bottom, Right, Left), Trivial Accept, Trivial Reject, Intersection Calculations', 9, 'published', now(), now()),
  ('430e8853-ce2d-5441-8c38-e276958b1442', 'Midpoint Subdivision Line Clipping Algorithm: Binary Search Approach, Hardware Implementations for Line Clipping', 10, 'published', now(), now()),
  ('430e8853-ce2d-5441-8c38-e276958b1442', 'Polygon Clipping: Sutherland-Hodgeman Polygon Clipping Algorithm, Edge-by-Edge Processing (Left, Right, Bottom, Top), Vertex Output Rules', 11, 'published', now(), now()),
  ('430e8853-ce2d-5441-8c38-e276958b1442', 'Text Clipping Techniques: All-or-None String Clipping, All-or-None Character Clipping, Component Character/Stroke Clipping', 12, 'published', now(), now()),
  ('430e8853-ce2d-5441-8c38-e276958b1442', '3D Geometric Transformations: 3D Homogeneous Coordinates (4x4 Matrices), 3D Translation, 3D Scaling, 3D Rotation (X, Y, Z axes)', 13, 'published', now(), now()),
  ('430e8853-ce2d-5441-8c38-e276958b1442', '3D Projections: Taxonomy, Parallel Projection (Orthographic, Oblique - Cavalier, Cabinet), Perspective Projection (Vanishing Points, Center of Projection)', 14, 'published', now(), now()),
  ('f8b15c04-3d58-59e4-8ec3-68f83b0918fe', 'Scan Conversion Fundamentals: Frame Buffer, Video Memory, Bit Planes, Pixel Grid Mapping, Anti-Aliasing Challenges', 1, 'published', now(), now()),
  ('f8b15c04-3d58-59e4-8ec3-68f83b0918fe', 'Point and Line Primitive Plotting: Line Equation y = mx + c, Incremental Methods, Floating-Point Calculations', 2, 'published', now(), now()),
  ('f8b15c04-3d58-59e4-8ec3-68f83b0918fe', 'Digital Differential Analyzer (DDA) Line Drawing Algorithm: Slope Cases (|m| < 1 vs |m| > 1), Incremental Form, Derivation and Step-by-Step Execution', 3, 'published', now(), now()),
  ('f8b15c04-3d58-59e4-8ec3-68f83b0918fe', 'Bresenham''s Line Drawing Algorithm: Integer Arithmetic Only, Decision Parameter dk Derivation, Mathematical Proof of Incremental Updates', 4, 'published', now(), now());

INSERT INTO public.syllabus_topics (unit_id, title, sort_order, status, created_at, updated_at) VALUES
  ('f8b15c04-3d58-59e4-8ec3-68f83b0918fe', 'Comparison of Line Algorithms: Computational Efficiency, Speed, Visual Smoothness of DDA vs Bresenham''s Algorithm', 5, 'published', now(), now()),
  ('f8b15c04-3d58-59e4-8ec3-68f83b0918fe', 'Circle Geometric Characteristics: Implicit Equation (x^2 + y^2 = R^2), Eight-Way Symmetry Property of Circles', 6, 'published', now(), now()),
  ('f8b15c04-3d58-59e4-8ec3-68f83b0918fe', 'Midpoint Circle Drawing Algorithm: Implicit Function f(x,y), Decision Parameter pk Derivation, Midpoint Evaluation, Step-by-Step Plotting', 7, 'published', now(), now()),
  ('f8b15c04-3d58-59e4-8ec3-68f83b0918fe', 'Bresenham''s Circle Drawing Algorithm: Error Term Formulation, Selection Between Diagonal and Horizontal Pixels', 8, 'published', now(), now()),
  ('f8b15c04-3d58-59e4-8ec3-68f83b0918fe', 'Ellipse Geometric Properties: Implicit Equation (b^2*x^2 + a^2*y^2 - a^2*b^2 = 0), Four-Way Symmetry Property', 9, 'published', now(), now()),
  ('f8b15c04-3d58-59e4-8ec3-68f83b0918fe', 'Midpoint Ellipse Algorithm: Division into Region 1 (Slope dy/dx > -1) and Region 2 (Slope dy/dx < -1), Decision Parameters p1k and p2k Derivations', 10, 'published', now(), now()),
  ('f8b15c04-3d58-59e4-8ec3-68f83b0918fe', 'Polygon Fill Area Primitives: Inside-Outside Tests (Odd-Even Rule, Winding Number Method)', 11, 'published', now(), now()),
  ('f8b15c04-3d58-59e4-8ec3-68f83b0918fe', 'Polygon Filling Algorithms: Boundary-Fill Algorithm (4-Connected vs 8-Connected), Flood-Fill Algorithm, Scan-Line Polygon Fill Algorithm & Edge Table', 12, 'published', now(), now()),
  ('bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f', 'Curved Lines and Surfaces: Analytic Equations vs Parametric Representations, Limitations of Non-Parametric Equations', 1, 'published', now(), now()),
  ('bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f', 'Quadric Surfaces: Mathematical Formulations and Geometric Properties of Spheres, Ellipsoids & Torus', 2, 'published', now(), now()),
  ('bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f', 'Superquadrics: Superellipse and Superellipsoid Geometric Formulations, Exponent Variations for Industrial Shape Modeling', 3, 'published', now(), now()),
  ('bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f', 'Spline Representations: Definition, Control Points, Interpolating Curves vs Approximating Curves, Convex Hull Property', 4, 'published', now(), now()),
  ('bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f', 'Parametric Continuity (C0, C1, C2) vs Geometric Continuity (G0, G1, G2): Tangent Vectors, Curvature Alignment at Segment Boundaries', 5, 'published', now(), now()),
  ('bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f', 'Cubic Spline Curves: Need for Cubic Representation, Natural Cubic Splines, Boundary Conditions (Clamped, Free)', 6, 'published', now(), now()),
  ('bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f', 'Bezier Curves: Pierre Bezier Formulation, Bernstein Polynomials Basis Functions, Mathematical Formula P(t) = Σ B_i,n(t) * P_i', 7, 'published', now(), now()),
  ('bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f', 'Properties of Bezier Curves: Affine Invariance, Convex Hull Property, Endpoint Interpolation, Tangency Condition, Variation Diminishing Property', 8, 'published', now(), now()),
  ('bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f', 'Algorithms for Drawing Bezier Curves: De Casteljau''s Algorithm, Recursive Midpoint Subdivision, Direct Polynomial Evaluation', 9, 'published', now(), now()),
  ('bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f', 'Bezier Surfaces: Tensor Product Bezier Patches, Control Net, Evaluation and Surface Rendering', 10, 'published', now(), now()),
  ('bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f', 'B-Spline Curves: Limitations of Bezier Curves (Global Control, Degree Tied to Number of Control Points), Cox-de Boor Recursive Definition', 11, 'published', now(), now()),
  ('bb57b883-05ba-5a6f-9a89-ef1f1e5edb1f', 'Properties of B-Splines: Local Control, Knot Vectors (Uniform, Open Uniform, Non-Uniform), Non-Uniform Rational B-Splines (NURBS) Overview', 12, 'published', now(), now()),
  ('59188dd6-6b5c-5b1d-9c19-b0b8924ead2d', 'Foundations of Animation: Persistence of Vision, Stroboscopic Effect, Frame Rates (24 fps Cinema, 30/60 fps Video)', 1, 'published', now(), now()),
  ('59188dd6-6b5c-5b1d-9c19-b0b8924ead2d', 'History and Taxonomy of Animation: Traditional Cel Animation, Stop-Motion Animation, Computer-Generated Imagery (CGI 2D vs 3D)', 2, 'published', now(), now()),
  ('59188dd6-6b5c-5b1d-9c19-b0b8924ead2d', '12 Basic Principles of Animation (Disney): Squash and Stretch, Anticipation, Staging, Straight Ahead vs Pose to Pose', 3, 'published', now(), now()),
  ('59188dd6-6b5c-5b1d-9c19-b0b8924ead2d', 'Principles of Animation Continued: Follow Through & Overlapping Action, Slow In and Slow Out, Arcs, Secondary Action, Timing, Exaggeration, Solid Drawing, Appeal', 4, 'published', now(), now()),
  ('59188dd6-6b5c-5b1d-9c19-b0b8924ead2d', 'Keyframing Paradigm: Keyframes, In-Betweens (Tweening), Automated Interpolation (Linear, Ease-In, Ease-Out, Spline Interpolation)', 5, 'published', now(), now()),
  ('59188dd6-6b5c-5b1d-9c19-b0b8924ead2d', 'Morphing Techniques: Image Morphing, Feature-Based Morphing (Beier-Neely Field Morphing), Mesh Warping, Cross-Dissolving Transitions', 6, 'published', now(), now()),
  ('59188dd6-6b5c-5b1d-9c19-b0b8924ead2d', 'Tweaking and Warping: Deformation Grids, Free-Form Deformation (FFD), Coordinate Distortions', 7, 'published', now(), now()),
  ('59188dd6-6b5c-5b1d-9c19-b0b8924ead2d', 'Kinematics in Animation: Forward Kinematics (FK - Joint Angles Hierarchies) vs Inverse Kinematics (IK - End-Effector Goal Solvers)', 8, 'published', now(), now()),
  ('59188dd6-6b5c-5b1d-9c19-b0b8924ead2d', 'Motion Capture (Mocap): Sensor Modalities (Optical, Inertial, Magnetic), Marker Tracking, Retargeting to 3D Skeletal Rigs', 9, 'published', now(), now()),
  ('59188dd6-6b5c-5b1d-9c19-b0b8924ead2d', 'Physical Simulation in Animation: Particle Systems (Smoke, Fire, Explosions), Cloth Dynamics, Rigid Body Collisions', 10, 'published', now(), now()),
  ('59188dd6-6b5c-5b1d-9c19-b0b8924ead2d', 'Rendering and Shading in 3D: Wireframe, Hidden Surface Removal (Z-Buffer, Back-Face Culling), Shading Models (Flat, Gouraud, Phong)', 11, 'published', now(), now()),
  ('59188dd6-6b5c-5b1d-9c19-b0b8924ead2d', 'Animation Software Tools & Workflows: Blender, Maya, Unity, Production Pipeline (Pre-production, Production, Post-production Compositing)', 12, 'published', now(), now()),
  ('9a72b703-7561-57b7-81fb-929bdf3f20fd', 'Introduction to Cyber Security: Definition, Scope, Need for Security in Digitized Society & Economic Impacts', 1, 'published', now(), now()),
  ('9a72b703-7561-57b7-81fb-929bdf3f20fd', 'Concept of Cyberspace: Architecture, Virtual Interconnected Environments, Cyber Ecosystem Components & Infrastructure', 2, 'published', now(), now()),
  ('9a72b703-7561-57b7-81fb-929bdf3f20fd', 'Evolution of Cyber Crimes and Cyber Attacks: Historical Trajectory, Hobbyist Hackers to State-Sponsored Advanced Persistent Threats (APTs)', 3, 'published', now(), now()),
  ('9a72b703-7561-57b7-81fb-929bdf3f20fd', 'Fundamental Security Concepts: Assets, Threats, Vulnerabilities, Exploits, Risks & Attack Surfaces', 4, 'published', now(), now()),
  ('9a72b703-7561-57b7-81fb-929bdf3f20fd', 'Threat Modeling: STRIDE Model (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)', 5, 'published', now(), now()),
  ('9a72b703-7561-57b7-81fb-929bdf3f20fd', 'The Fundamental Security Triad: Confidentiality (Privacy, Secrecy), Integrity (Data Authenticity, Non-Alteration) & Availability (Reliable Access)', 6, 'published', now(), now()),
  ('9a72b703-7561-57b7-81fb-929bdf3f20fd', 'Authentication and Non-Repudiation: Identity Verification Factors (Something You Know, Have, Are) & Digital Evidence Integrity', 7, 'published', now(), now()),
  ('9a72b703-7561-57b7-81fb-929bdf3f20fd', 'Access Control Principles: Subject, Object, Principle of Least Privilege, Separation of Duties & Defense in Depth', 8, 'published', now(), now()),
  ('9a72b703-7561-57b7-81fb-929bdf3f20fd', 'Categories of Cyber Criminals: Script Kiddies, Cyber Insiders, Hacktivists, Organized Cyber syndicates & Nation-State Actors', 9, 'published', now(), now()),
  ('9a72b703-7561-57b7-81fb-929bdf3f20fd', 'Classification of Vulnerabilities: Common Vulnerabilities and Exposures (CVE), CVSS Scoring System, Zero-Day Exploits', 10, 'published', now(), now()),
  ('9a72b703-7561-57b7-81fb-929bdf3f20fd', 'Overview of Malicious Software (Malware): Viruses, Worms, Trojan Horses, Spyware, Adware, Ransomware & Rootkits', 11, 'published', now(), now()),
  ('9a72b703-7561-57b7-81fb-929bdf3f20fd', 'Social Engineering Attacks: Phishing (Spear, Whaling), Pretexting, Baiting, Vishing, Smishing & Human Exploitation Vectors', 12, 'published', now(), now()),
  ('0d25abda-3786-520e-bfaf-c25fdb49d3bc', 'Taxonomy of Security Attacks: Passive Attacks (Eavesdropping, Traffic Analysis) vs Active Attacks (Masquerade, Replay, Modification, Denial of Service)', 1, 'published', now(), now()),
  ('0d25abda-3786-520e-bfaf-c25fdb49d3bc', 'Network-Level Attacks: Man-in-the-Middle (MitM), ARP Spoofing, DNS Cache Poisoning, IP Spoofing & Session Hijacking', 2, 'published', now(), now()),
  ('0d25abda-3786-520e-bfaf-c25fdb49d3bc', 'Denial of Service (DoS) and Distributed Denial of Service (DDoS): Smurf Attack, SYN Flood, UDP Flood, NTP Amplification, Botnets', 3, 'published', now(), now()),
  ('0d25abda-3786-520e-bfaf-c25fdb49d3bc', 'Application-Level Attacks: SQL Injection (SQLi), Cross-Site Scripting (XSS - Stored, Reflected, DOM-Based), Cross-Site Request Forgery (CSRF)', 4, 'published', now(), now()),
  ('0d25abda-3786-520e-bfaf-c25fdb49d3bc', 'Buffer Overflow Attacks: Stack-Based Buffer Overflows, Return-Oriented Programming (ROP), Pointer Corruption & Defense (ASLR, DEP)', 5, 'published', now(), now()),
  ('0d25abda-3786-520e-bfaf-c25fdb49d3bc', 'Impact of Cyber Attacks: Financial Losses, Reputational Damage, Operational Disruptions, Legal Penalties & Critical Infrastructure Failures', 6, 'published', now(), now()),
  ('0d25abda-3786-520e-bfaf-c25fdb49d3bc', 'Principles of Cyber Security Architecture: Simplicity, Fail-Safe Defaults, Complete Mediation, Open Design, Separation of Privilege', 7, 'published', now(), now()),
  ('0d25abda-3786-520e-bfaf-c25fdb49d3bc', 'Classic Security Models: Bell-LaPadula Model (Confidentiality: No Read Up, No Write Down), Biba Model (Integrity: No Read Down, No Write Up)', 8, 'published', now(), now()),
  ('0d25abda-3786-520e-bfaf-c25fdb49d3bc', 'Commercial Security Models: Clark-Wilson Model (Well-Formed Transactions, Separation of Duties), Chinese Wall Model (Conflict of Interest)', 9, 'published', now(), now()),
  ('0d25abda-3786-520e-bfaf-c25fdb49d3bc', 'The CIA Triad: Core Tenets, Mutual Trade-offs, Availability vs Confidentiality Tensions in High-Speed Computing', 10, 'published', now(), now()),
  ('0d25abda-3786-520e-bfaf-c25fdb49d3bc', 'The Star Model: Comprehensive Interlocking Framework for Cyber Security Strategy and Risk Governance', 11, 'published', now(), now()),
  ('0d25abda-3786-520e-bfaf-c25fdb49d3bc', 'The Parkerian Hexad (Donn Parker): Confidentiality, Integrity, Availability, Authenticity, Possession/Control, and Utility Extensions', 12, 'published', now(), now()),
  ('7ea00fff-11c2-52dd-8185-03c3d21940c4', 'Defining a Cyber Security Policy: Concept, Objectives, Hierarchy (Policies, Standards, Guidelines, Procedures)', 1, 'published', now(), now()),
  ('7ea00fff-11c2-52dd-8185-03c3d21940c4', 'Types of Security Policies: Program Policy, Issue-Specific Policy (ISSP), System-Specific Policy (SSSP)', 2, 'published', now(), now()),
  ('7ea00fff-11c2-52dd-8185-03c3d21940c4', 'Acceptable Use Policy (AUP): Permitted Organizational Resource Usage, Internet, Email, Personal Device Guidelines (BYOD)', 3, 'published', now(), now()),
  ('7ea00fff-11c2-52dd-8185-03c3d21940c4', 'General Security Expectations: Confidentiality Agreements, Password Hygiene, Clean Desk Policy & Clear Screen Policy', 4, 'published', now(), now()),
  ('7ea00fff-11c2-52dd-8185-03c3d21940c4', 'Roles and Responsibilities: Board of Directors, Chief Information Security Officer (CISO), Security Operations Center (SOC), System Administrators', 5, 'published', now(), now()),
  ('7ea00fff-11c2-52dd-8185-03c3d21940c4', 'Organizational Stakeholders: Internal Users, Third-Party Vendors, Customers, External Regulators & Supply Chain Partners', 6, 'published', now(), now()),
  ('7ea00fff-11c2-52dd-8185-03c3d21940c4', 'Incident Response Policy & Management: CIRT/CSIRT Formation, Preparation, Detection & Analysis, Containment, Eradication, Recovery & Post-Incident Review', 7, 'published', now(), now()),
  ('7ea00fff-11c2-52dd-8185-03c3d21940c4', 'Business Continuity Planning (BCP) & Disaster Recovery (DR): Recovery Time Objective (RTO), Recovery Point Objective (RPO), Backup Strategies', 8, 'published', now(), now()),
  ('7ea00fff-11c2-52dd-8185-03c3d21940c4', 'Risk Management Framework (NIST RMF): Categorize, Select, Implement, Assess, Authorize & Monitor Information Systems', 9, 'published', now(), now()),
  ('7ea00fff-11c2-52dd-8185-03c3d21940c4', 'Regulatory and Compliance Standards: ISO/IEC 27001 (ISMS), PCI-DSS (Payment Cards), HIPAA (Healthcare), GDPR (Data Privacy)', 10, 'published', now(), now()),
  ('7ea00fff-11c2-52dd-8185-03c3d21940c4', 'Indian Cyber Regulatory Context: IT Act 2000 (Section 43, 66, 72A), CERT-In Mandatory Incident Reporting Guidelines', 11, 'published', now(), now()),
  ('7ea00fff-11c2-52dd-8185-03c3d21940c4', 'Cyber Security Auditing & Compliance Monitoring: Continuous Monitoring, Log Retention Policies, Third-Party Vendor Risk Audits', 12, 'published', now(), now()),
  ('2c6daea1-ce26-5b85-a594-f87b5bf054ba', 'Security Countermeasure Architecture: Preventative, Detective, Corrective, Compensating & Deterrent Controls', 1, 'published', now(), now()),
  ('2c6daea1-ce26-5b85-a594-f87b5bf054ba', 'Firewall Technologies: Definition, Packet Filtering Firewalls (Stateless vs Stateful Inspection), Circuit-Level Gateways', 2, 'published', now(), now()),
  ('2c6daea1-ce26-5b85-a594-f87b5bf054ba', 'Application-Level Gateways (Proxy Firewalls) & Next-Generation Firewalls (NGFW): Deep Packet Inspection (DPI), Intrusion Prevention, SSL Decryption', 3, 'published', now(), now()),
  ('2c6daea1-ce26-5b85-a594-f87b5bf054ba', 'Firewall Architectures: Dual-Homed Host, Screened Host, Screened Subnet (Demilitarized Zone - DMZ) Topologies', 4, 'published', now(), now()),
  ('2c6daea1-ce26-5b85-a594-f87b5bf054ba', 'Antivirus and Anti-Malware Systems: Signature-Based Scanning, Heuristic Analysis, Behavior Monitoring, Sandboxing Execution', 5, 'published', now(), now()),
  ('2c6daea1-ce26-5b85-a594-f87b5bf054ba', 'System Hardening Techniques: Disabling Default Accounts, Closing Unused Ports/Services, Patch Management, OS Configuration Baselines', 6, 'published', now(), now()),
  ('2c6daea1-ce26-5b85-a594-f87b5bf054ba', 'Fundamentals of Cryptography: Plaintext, Ciphertext, Ciphers, Keys, Cryptanalysis, Kerckhoffs''s Principle', 7, 'published', now(), now()),
  ('2c6daea1-ce26-5b85-a594-f87b5bf054ba', 'Symmetric (Secret Key) Cryptography: Stream Ciphers vs Block Ciphers, Substitution-Permutation Networks, Feistel Cipher Structure', 8, 'published', now(), now()),
  ('2c6daea1-ce26-5b85-a594-f87b5bf054ba', 'Symmetric Encryption Standards: Data Encryption Standard (DES), Triple-DES (3DES), Advanced Encryption Standard (AES - 128, 192, 256 bits)', 9, 'published', now(), now()),
  ('2c6daea1-ce26-5b85-a594-f87b5bf054ba', 'Asymmetric (Public Key) Cryptography: Trapdoor One-Way Functions, Key Pairs (Public/Private), RSA Algorithm & Elliptic Curve Cryptography (ECC)', 10, 'published', now(), now()),
  ('2c6daea1-ce26-5b85-a594-f87b5bf054ba', 'Cryptographic Hash Functions: Properties (Pre-image Resistance, Collision Resistance), MD5, SHA-1, SHA-256, Message Authentication Codes (MAC, HMAC)', 11, 'published', now(), now()),
  ('2c6daea1-ce26-5b85-a594-f87b5bf054ba', 'Digital Signatures & Public Key Infrastructure (PKI): Digital Signatures (Non-Repudiation), X.509 Digital Certificates, Certificate Authorities (CA), SSL/TLS Handshake', 12, 'published', now(), now()),
  ('8237013e-e858-5df9-92cb-10b7404fb1a1', 'Cyber Security Testing Methodologies: Vulnerability Assessment (VA) vs Penetration Testing (PT), VAPT Workflows', 1, 'published', now(), now()),
  ('8237013e-e858-5df9-92cb-10b7404fb1a1', 'Penetration Testing Phases: Reconnaissance (OSINT), Scanning & Enumeration, Vulnerability Exploitation, Post-Exploitation, Reporting', 2, 'published', now(), now()),
  ('8237013e-e858-5df9-92cb-10b7404fb1a1', 'Penetration Testing Types: Black Box (Zero Knowledge), White Box (Full Knowledge), Gray Box (Partial Knowledge) Testing', 3, 'published', now(), now()),
  ('8237013e-e858-5df9-92cb-10b7404fb1a1', 'Intrusion Detection Systems (IDS): Network-Based (NIDS) vs Host-Based (HIDS), Signature-Based vs Anomaly-Based Detection, False Positives/Negatives', 4, 'published', now(), now()),
  ('8237013e-e858-5df9-92cb-10b7404fb1a1', 'Intrusion Prevention Systems (IPS): In-Line Traffic Filtering, Automated Rule Enforcement, Honeypots & Decoy Systems', 5, 'published', now(), now()),
  ('8237013e-e858-5df9-92cb-10b7404fb1a1', 'Security Information and Event Management (SIEM): Log Aggregation, Normalization, Real-Time Correlation, Security Orchestration (SOAR)', 6, 'published', now(), now()),
  ('8237013e-e858-5df9-92cb-10b7404fb1a1', 'Basic Concepts of Ethical Hacking: Hacker Types (White Hat, Black Hat, Gray Hat), Ethical Hacking Code of Conduct, Legal Authorization (Rules of Engagement)', 7, 'published', now(), now()),
  ('8237013e-e858-5df9-92cb-10b7404fb1a1', 'Ethical Hacking Toolkits: Nmap (Port Scanning), Wireshark (Packet Sniffing), Metasploit (Exploit Framework), Burp Suite (Web Testing)', 8, 'published', now(), now()),
  ('8237013e-e858-5df9-92cb-10b7404fb1a1', 'Identity Theft: Types (Financial, Medical, Criminal), Modus Operandi, Credential Harvesting, Defense and Identity Protection Mechanisms', 9, 'published', now(), now()),
  ('8237013e-e858-5df9-92cb-10b7404fb1a1', 'Cyber Stalking and Cyber Harassment: Definition, Tracking Technologies (Spyware, Geolocation Exploits), Legal Remedies & Personal Defense Strategies', 10, 'published', now(), now()),
  ('8237013e-e858-5df9-92cb-10b7404fb1a1', 'Online Investment Fraud & Financial Scams: Ponzi Schemes, Cryptocurrency Rug Pulls, Advance Fee Fraud (419), Fake Banking Portals', 11, 'published', now(), now()),
  ('8237013e-e858-5df9-92cb-10b7404fb1a1', 'Cyber Hygiene Best Practices: Multi-Factor Authentication (MFA), Password Managers, Secure Backup 3-2-1 Rule, Safe Browsing Habits', 12, 'published', now(), now()),
  ('1154c5fc-1194-5bee-9ee2-f1513ee63e99', 'Overview of Microsoft .NET Framework: Motivation, Evolution from COM/Win32, Multi-Language Integration Paradigm', 1, 'published', now(), now()),
  ('1154c5fc-1194-5bee-9ee2-f1513ee63e99', '.NET Architecture: Common Language Runtime (CLR), Just-In-Time (JIT) Compilers (Pre-JIT, Normal JIT, Econo-JIT)', 2, 'published', now(), now()),
  ('1154c5fc-1194-5bee-9ee2-f1513ee63e99', 'Code Loading and Execution Process: Source Code Compilation to Microsoft Intermediate Language (MSIL), Metadata, Assembly (.dll / .exe)', 3, 'published', now(), now()),
  ('1154c5fc-1194-5bee-9ee2-f1513ee63e99', 'Common Type System (CTS): Value Types (Primitive, Enum, Struct) vs Reference Types (Class, Interface, Array, Delegate)', 4, 'published', now(), now()),
  ('1154c5fc-1194-5bee-9ee2-f1513ee63e99', 'Common Language Specification (CLS): Rules for Cross-Language Interoperability, Cross-Language Inheritance', 5, 'published', now(), now()),
  ('1154c5fc-1194-5bee-9ee2-f1513ee63e99', 'Event-Driven Programming Paradigm: Event Queue, Event Handlers, Delegates as Type-Safe Function Pointers', 6, 'published', now(), now()),
  ('1154c5fc-1194-5bee-9ee2-f1513ee63e99', 'Visual Studio 2010 IDE Architecture: Solution Explorer, Toolbox, Properties Window, Code Editor, Output & Error List Windows', 7, 'published', now(), now()),
  ('1154c5fc-1194-5bee-9ee2-f1513ee63e99', 'Introduction to Visual Basic (.NET): Syntax Structure, Statements, Comments, Case-Insensitivity', 8, 'published', now(), now()),
  ('1154c5fc-1194-5bee-9ee2-f1513ee63e99', 'VB Data Types, Variables & Constants: Primitive Data Types (Integer, Double, String, Boolean, Date), Dim, Static, Const', 9, 'published', now(), now()),
  ('1154c5fc-1194-5bee-9ee2-f1513ee63e99', 'Type Conversion Mechanisms: Implicit vs Explicit Conversion, CType, DirectCast, CBool, CInt, CStr Functions, Parse and TryParse', 10, 'published', now(), now()),
  ('1154c5fc-1194-5bee-9ee2-f1513ee63e99', 'Operators & Control Statements: Arithmetic, Relational, Logical Operators, If...Then...ElseIf...End If, Select Case Selection', 11, 'published', now(), now()),
  ('1154c5fc-1194-5bee-9ee2-f1513ee63e99', 'Looping Structures, Arrays & Procedures: For...Next, For Each...Next, Do While/Until, Single/Multidimensional Arrays, Sub vs Function, ByVal vs ByRef', 12, 'published', now(), now()),
  ('94da78bd-fa1b-5c07-bb40-47999b1454dc', 'Windows Forms Architecture: System.Windows.Forms Namespace, Form Lifecycle (Load, Activated, Shown, Closing, Closed)', 1, 'published', now(), now()),
  ('94da78bd-fa1b-5c07-bb40-47999b1454dc', 'Basic Form Controls: Label, TextBox, Button, CheckBox, RadioButton, GroupBox, Panel - Properties, Methods and Events', 2, 'published', now(), now()),
  ('94da78bd-fa1b-5c07-bb40-47999b1454dc', 'List and Selection Controls: ListBox, ComboBox, CheckedListBox (Items Collection, SelectedIndex, SelectedItem)', 3, 'published', now(), now()),
  ('94da78bd-fa1b-5c07-bb40-47999b1454dc', 'Advanced Visual Controls: PictureBox, Timer Control (Tick Event, Interval), ProgressBar, TrackBar, ScrollBars (HScrollBar, VScrollBar)', 4, 'published', now(), now()),
  ('94da78bd-fa1b-5c07-bb40-47999b1454dc', 'Hierarchical & Tabular Data Controls: ListView (LargeIcon, SmallIcon, Details, Columns), TreeView (TreeNode, AfterSelect Event)', 5, 'published', now(), now()),
  ('94da78bd-fa1b-5c07-bb40-47999b1454dc', 'Navigation & Layout Controls: ToolStrip, StatusStrip, MenuStrip, ContextMenuStrip, FlowLayoutPanel, TableLayoutPanel', 6, 'published', now(), now()),
  ('94da78bd-fa1b-5c07-bb40-47999b1454dc', 'Standard Common Dialog Boxes: OpenFileDialog, SaveFileDialog, FontDialog, ColorDialog, PrintDialog (ShowDialog, Filter Property)', 7, 'published', now(), now()),
  ('94da78bd-fa1b-5c07-bb40-47999b1454dc', 'Designing Professional Menus: Menu Strip, Access Keys (& prefix), Shortcut Keys, Checked Items, Context Menus', 8, 'published', now(), now()),
  ('94da78bd-fa1b-5c07-bb40-47999b1454dc', 'Major Error Categories: Compile-Time (Syntax) Errors, Runtime (Execution) Errors, Logical (Semantic) Errors', 9, 'published', now(), now()),
  ('94da78bd-fa1b-5c07-bb40-47999b1454dc', 'Structured Exception Handling in .NET: Try...Catch...Finally Blocks, Filtering Exceptions (Catch ex As FormatException)', 10, 'published', now(), now()),
  ('94da78bd-fa1b-5c07-bb40-47999b1454dc', 'User-Defined Custom Exceptions: Inheriting from System.Exception Class, Throwing Custom Exceptions with Meaningful Messages', 11, 'published', now(), now()),
  ('94da78bd-fa1b-5c07-bb40-47999b1454dc', 'Visual Studio Debugging Techniques: Setting Breakpoints, Step Into (F11), Step Over (F10), Watch Window, Immediate Window, Call Stack', 12, 'published', now(), now()),
  ('5f2bfd88-2103-5fb2-9abd-622fef5cc070', 'Object-Oriented Programming Principles in .NET: Abstraction, Encapsulation, Inheritance, Polymorphism', 1, 'published', now(), now()),
  ('5f2bfd88-2103-5fb2-9abd-622fef5cc070', 'Class and Object Definition: Class Declaration, Object Instantiation (New Keyword), Class Members (Fields, Properties, Methods, Events)', 2, 'published', now(), now()),
  ('5f2bfd88-2103-5fb2-9abd-622fef5cc070', 'Constructors and Destructors: Sub New Constructor, Parameterized Constructors, Constructor Overloading, Finalize and Dispose Pattern', 3, 'published', now(), now()),
  ('5f2bfd88-2103-5fb2-9abd-622fef5cc070', 'Property Procedures in VB: Private Backing Fields, Property...Get...Set...End Property, Auto-Implemented Properties', 4, 'published', now(), now()),
  ('5f2bfd88-2103-5fb2-9abd-622fef5cc070', 'Inheritance Mechanisms: Single Inheritance, Inherits Keyword, MustInherit (Abstract Classes), NotInheritable (Sealed Classes)', 5, 'published', now(), now()),
  ('5f2bfd88-2103-5fb2-9abd-622fef5cc070', 'Method Overloading vs Method Overriding: Overloads Keyword (Compile-Time Polymorphism), Overrides and Overridable Keywords (Runtime Polymorphism)', 6, 'published', now(), now()),
  ('5f2bfd88-2103-5fb2-9abd-622fef5cc070', 'MyBase and MyClass Keywords: Invoking Base Class Constructors and Methods, Resolving Member Shadowing', 7, 'published', now(), now()),
  ('5f2bfd88-2103-5fb2-9abd-622fef5cc070', 'Interfaces in .NET: Interface Declaration, Implements Keyword, Multiple Interface Implementation, Standard Interfaces (IComparable, IDisposable)', 8, 'published', now(), now()),
  ('5f2bfd88-2103-5fb2-9abd-622fef5cc070', 'Access Modifiers in .NET: Public, Private, Protected, Friend (Internal), Protected Friend Scope Semantics', 9, 'published', now(), now()),
  ('5f2bfd88-2103-5fb2-9abd-622fef5cc070', 'Namespaces in .NET: Organizing Types, Namespace...End Namespace, Imports Statement, Preventing Class Naming Collisions', 10, 'published', now(), now()),
  ('5f2bfd88-2103-5fb2-9abd-622fef5cc070', 'Delegates and Events: Declaring Delegates, Delegate Sub/Function, Event Keyword, RaiseEvent, AddHandler and RemoveHandler', 11, 'published', now(), now()),
  ('5f2bfd88-2103-5fb2-9abd-622fef5cc070', 'Creating and Consuming Class Libraries: Class Library Project (.dll), Compiling Reusable Assemblies, Adding Project References', 12, 'published', now(), now()),
  ('f09c2fd0-ca9a-50f2-ae5d-e2b5d3f1a546', 'Introduction to ADO.NET: Motivation, Evolution from Classic ADO, XML Integration, Disconnected Architecture Paradigm', 1, 'published', now(), now()),
  ('f09c2fd0-ca9a-50f2-ae5d-e2b5d3f1a546', 'ADO.NET Architecture: Two Core Components - .NET Data Providers (Connected) and DataSet (Disconnected)', 2, 'published', now(), now()),
  ('f09c2fd0-ca9a-50f2-ae5d-e2b5d3f1a546', '.NET Data Provider Core Objects: Connection (SqlConnection, OleDbConnection), Command (SqlCommand), DataReader, DataAdapter', 3, 'published', now(), now()),
  ('f09c2fd0-ca9a-50f2-ae5d-e2b5d3f1a546', 'Managing Database Connections: Connection Strings (Data Source, Initial Catalog, Integrated Security), Open(), Close(), Using Statement', 4, 'published', now(), now()),
  ('f09c2fd0-ca9a-50f2-ae5d-e2b5d3f1a546', 'Executing Database Commands: SqlCommand Object, CommandType (Text, StoredProcedure), ExecuteNonQuery(), ExecuteScalar(), ExecuteReader()', 5, 'published', now(), now()),
  ('f09c2fd0-ca9a-50f2-ae5d-e2b5d3f1a546', 'Fast Forward-Only Data Access: SqlDataReader, Read() Method, Type-Safe Column Access, Minimal Memory Footprint', 6, 'published', now(), now()),
  ('f09c2fd0-ca9a-50f2-ae5d-e2b5d3f1a546', 'Disconnected Data Architecture: SqlDataAdapter, Fill() Method, Update() Method, SqlCommandBuilder for Automated SQL Generation', 7, 'published', now(), now()),
  ('f09c2fd0-ca9a-50f2-ae5d-e2b5d3f1a546', 'In-Memory Database Hierarchy: DataSet, DataTableCollection, DataTable, DataColumn, DataRow, DataRelation', 8, 'published', now(), now()),
  ('f09c2fd0-ca9a-50f2-ae5d-e2b5d3f1a546', 'Data Table Operations: Adding Rows (NewRow(), Rows.Add()), Modifying Rows, Row States (Added, Modified, Deleted, Unchanged)', 9, 'published', now(), now()),
  ('f09c2fd0-ca9a-50f2-ae5d-e2b5d3f1a546', 'Filtering and Sorting with DataView: DataView Object, RowFilter Expression, Sort Property, Binding to Controls', 10, 'published', now(), now()),
  ('f09c2fd0-ca9a-50f2-ae5d-e2b5d3f1a546', 'DataGridView Control: Architecture, Column Types (TextBox, ComboBox, Button, CheckBox), AutoGenerateColumns, Cell Formatting', 11, 'published', now(), now()),
  ('f09c2fd0-ca9a-50f2-ae5d-e2b5d3f1a546', 'Data Binding Paradigms: Simple Data Binding (Single Property), Complex Data Binding (DataSource, DataMember), BindingSource Component', 12, 'published', now(), now()),
  ('aafff8d5-7b26-510f-9689-ffcfa22dddbf', 'Introduction to ASP.NET 4.0: Web Architecture, Comparison of ASP.NET Web Forms vs Windows Forms (Stateless vs Stateful)', 1, 'published', now(), now()),
  ('aafff8d5-7b26-510f-9689-ffcfa22dddbf', 'ASP.NET Web Applications Structure: Web Pages (.aspx), Code-Behind Files (.aspx.vb), App_Data, App_Code, Bin Folders', 2, 'published', now(), now()),
  ('aafff8d5-7b26-510f-9689-ffcfa22dddbf', 'Benefits of ASP.NET Web Pages: Server Controls, Automatic ViewState Management, Event Model, Rapid Development', 3, 'published', now(), now()),
  ('aafff8d5-7b26-510f-9689-ffcfa22dddbf', 'Configuration and Application Files: web.config Architecture (System.web, ConnectionStrings, AppSettings), global.asax Application Lifecycle', 4, 'published', now(), now()),
  ('aafff8d5-7b26-510f-9689-ffcfa22dddbf', 'Thin-Client Architecture: Client-Side Browser Rendering vs Server-Side Processing Pipeline, Postback Mechanism (IsPostBack Property)', 5, 'published', now(), now()),
  ('aafff8d5-7b26-510f-9689-ffcfa22dddbf', 'ASP.NET Standard Server Controls: Label, TextBox, Button, LinkButton, ImageButton, DropDownList, CheckBoxList, RadioButtonList', 6, 'published', now(), now()),
  ('aafff8d5-7b26-510f-9689-ffcfa22dddbf', 'ASP.NET Validation Controls: RequiredFieldValidator, RangeValidator, CompareValidator, RegularExpressionValidator, CustomValidator, ValidationSummary', 7, 'published', now(), now()),
  ('aafff8d5-7b26-510f-9689-ffcfa22dddbf', 'Site Layout and Navigation: Master Pages (.master), ContentPlaceHolder, Content Pages, SiteMapPath, Menu Control, TreeView Navigation', 8, 'published', now(), now()),
  ('aafff8d5-7b26-510f-9689-ffcfa22dddbf', 'Themes and Skins: Theme Folders, Skin Files (.skin), Cascading Style Sheets, Applying Themes Programmatically and Statically', 9, 'published', now(), now()),
  ('aafff8d5-7b26-510f-9689-ffcfa22dddbf', 'Data-Driven Web Pages with GridView: GridView Web Server Control, SqlDataSource Configuration, Paging, Sorting, In-Line Editing and Deleting', 10, 'published', now(), now()),
  ('aafff8d5-7b26-510f-9689-ffcfa22dddbf', 'State Management in ASP.NET: Client-Side (ViewState, HiddenField, Cookies, QueryString) vs Server-Side (Session, Application, Cache)', 11, 'published', now(), now()),
  ('aafff8d5-7b26-510f-9689-ffcfa22dddbf', 'Application Deployment Wizards: Publish Web Site Wizard, Creating Windows Installer (.msi) Setup Projects, Prerequisites, GAC Deployment', 12, 'published', now(), now());

COMMIT;