-- ============================================================================
-- MJPRU BCA SEMESTER 2: SUBJECTS, UNITS & SYLLABUS TOPICS
-- Target Semester: be0534c5-8d70-479b-9690-3dd06d688846 (Semester 2)
-- ============================================================================
BEGIN;

-- 1. Update Existing Subject Codes and Titles
UPDATE public.subjects SET code = 'BCA-104N', title = 'Introduction to Database System', slug = 'bca-104n-introduction-to-database-system', updated_at = now() WHERE id = 'e1e44a1c-6c24-44de-84f9-16edb60505b0';
UPDATE public.subjects SET code = 'BCA-106N', title = 'Business Organization & Management', slug = 'bca-106n-business-organization-and-management', updated_at = now() WHERE id = '16de7764-85ea-41ae-9600-d7a9ad807eb9';
UPDATE public.subjects SET code = 'BCA-401E', title = 'Mathematics II', slug = 'bca-401e-mathematics-ii', updated_at = now() WHERE id = '1d8c39f2-baa5-4fed-a3a9-fb20ca34ca76';

-- 2. Insert Missing Subject BCA-108N (Digital Electronics) if not present
INSERT INTO public.subjects (id, semester_id, code, title, slug, type, credits, status, created_at, updated_at)
VALUES ('bca10800-0002-4000-8000-000000000108', 'be0534c5-8d70-479b-9690-3dd06d688846', 'BCA-108N', 'Digital Electronics', 'bca-108n-digital-electronics', 'theory', 4, 'published', now(), now())
ON CONFLICT (id) DO UPDATE SET code = 'BCA-108N', title = 'Digital Electronics', slug = 'bca-108n-digital-electronics', status = 'published', updated_at = now();

-- 3. Insert or Update Units for all 5 Subjects
UPDATE public.units SET title = 'Introduction to Data Structures, Complexity & Arrays', summary = 'Official MJPRU BCA Unit 1: Introduction to Data Structures, Complexity & Arrays for BCA-102N (Data Structures using C).', status = 'published', updated_at = now() WHERE id = 'ba474b73-58b8-4728-847b-aabb00b9bb6b';
UPDATE public.units SET title = 'Searching, Sorting Techniques & Hashing', summary = 'Official MJPRU BCA Unit 2: Searching, Sorting Techniques & Hashing for BCA-102N (Data Structures using C).', status = 'published', updated_at = now() WHERE id = 'f5a68165-ba67-4174-8fa1-ab0a947cf0b7';
UPDATE public.units SET title = 'Stacks, Queues & Expression Conversions', summary = 'Official MJPRU BCA Unit 3: Stacks, Queues & Expression Conversions for BCA-102N (Data Structures using C).', status = 'published', updated_at = now() WHERE id = '53bd5982-c943-4f1c-b590-538d2da61a1a';
UPDATE public.units SET title = 'Linked Lists & Binary Trees', summary = 'Official MJPRU BCA Unit 4: Linked Lists & Binary Trees for BCA-102N (Data Structures using C).', status = 'published', updated_at = now() WHERE id = '661c3be6-4072-4dad-b5c5-006a796149b1';
UPDATE public.units SET title = 'AVL Trees, M-way Search Trees & B-Trees', summary = 'Official MJPRU BCA Unit 5: AVL Trees, M-way Search Trees & B-Trees for BCA-102N (Data Structures using C).', status = 'published', updated_at = now() WHERE id = 'ddf16cc1-c0b4-47c2-94ef-c4c53a1ae803';
UPDATE public.units SET title = 'Database Concepts, DBMS Architecture & Data Independence', summary = 'Official MJPRU BCA Unit 1: Database Concepts, DBMS Architecture & Data Independence for BCA-104N (Introduction to Database System).', status = 'published', updated_at = now() WHERE id = '61010ab6-9c95-4a87-aaab-4960161894a1';
UPDATE public.units SET title = 'Entity-Relationship (E-R) Modeling & Conceptual Design', summary = 'Official MJPRU BCA Unit 2: Entity-Relationship (E-R) Modeling & Conceptual Design for BCA-104N (Introduction to Database System).', status = 'published', updated_at = now() WHERE id = 'c5f7f235-66b4-40e5-90a1-c51017b09cef';
UPDATE public.units SET title = 'Relational Data Model, Constraints & Normalization', summary = 'Official MJPRU BCA Unit 3: Relational Data Model, Constraints & Normalization for BCA-104N (Introduction to Database System).', status = 'published', updated_at = now() WHERE id = 'a62a03f9-7839-40fa-99b3-2bd54a85c960';
UPDATE public.units SET title = 'Structured Query Language (SQL) & Table Management', summary = 'Official MJPRU BCA Unit 4: Structured Query Language (SQL) & Table Management for BCA-104N (Introduction to Database System).', status = 'published', updated_at = now() WHERE id = '532c7166-9acf-4af8-aa7b-0d6453823ee5';
UPDATE public.units SET title = 'Database Security, Integrity, Control & Recent Trends', summary = 'Official MJPRU BCA Unit 5: Database Security, Integrity, Control & Recent Trends for BCA-104N (Introduction to Database System).', status = 'published', updated_at = now() WHERE id = '0ec279fb-4293-4eef-ac5d-1896e25d5b9c';
UPDATE public.units SET title = 'Business Concepts, Trade, Industry & Forms of Organization', summary = 'Official MJPRU BCA Unit 1: Business Concepts, Trade, Industry & Forms of Organization for BCA-106N (Business Organization & Management).', status = 'published', updated_at = now() WHERE id = 'f71cce92-2184-435e-bf56-2a950da9abce';
UPDATE public.units SET title = 'Management Foundations, Thoughts & Bureaucracy', summary = 'Official MJPRU BCA Unit 2: Management Foundations, Thoughts & Bureaucracy for BCA-106N (Business Organization & Management).', status = 'published', updated_at = now() WHERE id = '761004b1-a216-4fb7-bcb6-daabbf0c98d7';
UPDATE public.units SET title = 'Planning Concepts & Decision-Making Processes', summary = 'Official MJPRU BCA Unit 3: Planning Concepts & Decision-Making Processes for BCA-106N (Business Organization & Management).', status = 'published', updated_at = now() WHERE id = 'dc6d99e6-0a42-4e8d-9267-e8aee059db0e';
UPDATE public.units SET title = 'Organization Structure, Delegation & Decentralization', summary = 'Official MJPRU BCA Unit 4: Organization Structure, Delegation & Decentralization for BCA-106N (Business Organization & Management).', status = 'published', updated_at = now() WHERE id = '4cd661cb-dee7-4e9a-bafb-35ee7eae4c8e';
UPDATE public.units SET title = 'Motivation, Leadership, Coordination & Control Systems', summary = 'Official MJPRU BCA Unit 5: Motivation, Leadership, Coordination & Control Systems for BCA-106N (Business Organization & Management).', status = 'published', updated_at = now() WHERE id = '0bfafb6e-d07b-476b-ada4-dac708f30667';
INSERT INTO public.units (id, subject_id, number, title, slug, summary, status, order_index, created_at, updated_at)
VALUES ('bca10801-0002-4000-8000-000000000108', 'bca10800-0002-4000-8000-000000000108', 1, 'Boolean Algebra Basics, Logic Gates & K-Maps', 'bca-108n-unit-1', 'Official MJPRU BCA Unit 1: Boolean Algebra Basics, Logic Gates & K-Maps for BCA-108N (Digital Electronics).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, slug, summary, status, order_index, created_at, updated_at)
VALUES ('bca10802-0002-4000-8000-000000000108', 'bca10800-0002-4000-8000-000000000108', 2, 'Number Systems, Binary Codes & Error Detection', 'bca-108n-unit-2', 'Official MJPRU BCA Unit 2: Number Systems, Binary Codes & Error Detection for BCA-108N (Digital Electronics).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, slug, summary, status, order_index, created_at, updated_at)
VALUES ('bca10803-0002-4000-8000-000000000108', 'bca10800-0002-4000-8000-000000000108', 3, 'Arithmetic Circuits & Combinational Logic Design', 'bca-108n-unit-3', 'Official MJPRU BCA Unit 3: Arithmetic Circuits & Combinational Logic Design for BCA-108N (Digital Electronics).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, slug, summary, status, order_index, created_at, updated_at)
VALUES ('bca10804-0002-4000-8000-000000000108', 'bca10800-0002-4000-8000-000000000108', 4, 'Latches, Flip-Flops & Shift Registers', 'bca-108n-unit-4', 'Official MJPRU BCA Unit 4: Latches, Flip-Flops & Shift Registers for BCA-108N (Digital Electronics).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, slug, summary, status, order_index, created_at, updated_at)
VALUES ('bca10805-0002-4000-8000-000000000108', 'bca10800-0002-4000-8000-000000000108', 5, 'Counters, Modulo Circuits & Programmable Logic', 'bca-108n-unit-5', 'Official MJPRU BCA Unit 5: Counters, Modulo Circuits & Programmable Logic for BCA-108N (Digital Electronics).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', updated_at = now();
UPDATE public.units SET title = 'Set Theory, Set Operations & Applications', summary = 'Official MJPRU BCA Unit 1: Set Theory, Set Operations & Applications for BCA-401E (Mathematics II).', status = 'published', updated_at = now() WHERE id = '7844c00f-50ca-4135-b0d4-daaeca67d7ee';
UPDATE public.units SET title = 'Relations, Equivalence & Types of Functions', summary = 'Official MJPRU BCA Unit 2: Relations, Equivalence & Types of Functions for BCA-401E (Mathematics II).', status = 'published', updated_at = now() WHERE id = 'f271ca33-4e1e-4aea-a31e-c4d8909fd49e';
UPDATE public.units SET title = 'Functions of Several Variables & Partial Differentiation', summary = 'Official MJPRU BCA Unit 3: Functions of Several Variables & Partial Differentiation for BCA-401E (Mathematics II).', status = 'published', updated_at = now() WHERE id = 'ac0fb7be-e747-43a9-918d-c9f6cd2ae5e0';
UPDATE public.units SET title = 'Infinite Series & Tests of Convergence', summary = 'Official MJPRU BCA Unit 4: Infinite Series & Tests of Convergence for BCA-401E (Mathematics II).', status = 'published', updated_at = now() WHERE id = '92e71595-e501-433f-89dc-b4e303e6178b';
UPDATE public.units SET title = 'Mean Value Theorems, Taylor/Maclaurin Series & Extrema', summary = 'Official MJPRU BCA Unit 5: Mean Value Theorems, Taylor/Maclaurin Series & Extrema for BCA-401E (Mathematics II).', status = 'published', updated_at = now() WHERE id = '291be6f9-6552-4446-bcc9-1e062af8bfcd';

-- 4. Insert Syllabus Topics
DELETE FROM public.syllabus_topics WHERE unit_id IN ('ba474b73-58b8-4728-847b-aabb00b9bb6b', 'f5a68165-ba67-4174-8fa1-ab0a947cf0b7', '53bd5982-c943-4f1c-b590-538d2da61a1a', '661c3be6-4072-4dad-b5c5-006a796149b1', 'ddf16cc1-c0b4-47c2-94ef-c4c53a1ae803', '61010ab6-9c95-4a87-aaab-4960161894a1', 'c5f7f235-66b4-40e5-90a1-c51017b09cef', 'a62a03f9-7839-40fa-99b3-2bd54a85c960', '532c7166-9acf-4af8-aa7b-0d6453823ee5', '0ec279fb-4293-4eef-ac5d-1896e25d5b9c', 'f71cce92-2184-435e-bf56-2a950da9abce', '761004b1-a216-4fb7-bcb6-daabbf0c98d7', 'dc6d99e6-0a42-4e8d-9267-e8aee059db0e', '4cd661cb-dee7-4e9a-bafb-35ee7eae4c8e', '0bfafb6e-d07b-476b-ada4-dac708f30667', 'bca10801-0002-4000-8000-000000000108', 'bca10802-0002-4000-8000-000000000108', 'bca10803-0002-4000-8000-000000000108', 'bca10804-0002-4000-8000-000000000108', 'bca10805-0002-4000-8000-000000000108', '7844c00f-50ca-4135-b0d4-daaeca67d7ee', 'f271ca33-4e1e-4aea-a31e-c4d8909fd49e', 'ac0fb7be-e747-43a9-918d-c9f6cd2ae5e0', '92e71595-e501-433f-89dc-b4e303e6178b', '291be6f9-6552-4446-bcc9-1e062af8bfcd');

INSERT INTO public.syllabus_topics (unit_id, title, sort_order, status, created_at, updated_at)
VALUES
  ('ba474b73-58b8-4728-847b-aabb00b9bb6b', 'Basic Terminology & Elementary Data Organizations', 1, 'published', now(), now()),
  ('ba474b73-58b8-4728-847b-aabb00b9bb6b', 'Need of Data Structures & Classification (Linear vs Non-Linear, Static vs Dynamic)', 2, 'published', now(), now()),
  ('ba474b73-58b8-4728-847b-aabb00b9bb6b', 'Operations on Data Structures (Traversing, Insertion, Deletion, Searching, Sorting, Merging)', 3, 'published', now(), now()),
  ('ba474b73-58b8-4728-847b-aabb00b9bb6b', 'Algorithm Complexity: Time-Space Trade-off & Asymptotic Notations (Big-O, Omega, Theta)', 4, 'published', now(), now()),
  ('ba474b73-58b8-4728-847b-aabb00b9bb6b', 'Arrays: Memory Representation of Single and Multidimensional Arrays (Row-Major vs Column-Major)', 5, 'published', now(), now()),
  ('ba474b73-58b8-4728-847b-aabb00b9bb6b', 'Address Calculation in 1D, 2D, and 3D Arrays', 6, 'published', now(), now()),
  ('ba474b73-58b8-4728-847b-aabb00b9bb6b', 'Sparse Arrays: Concept, Representation & Lower/Upper Triangular and Tri-diagonal Matrices', 7, 'published', now(), now()),
  ('ba474b73-58b8-4728-847b-aabb00b9bb6b', 'Addition and Subtraction Operations on Sparse Arrays', 8, 'published', now(), now()),
  ('f5a68165-ba67-4174-8fa1-ab0a947cf0b7', 'Searching Techniques: Linear Search (Algorithm, Complexity & Implementation)', 1, 'published', now(), now()),
  ('f5a68165-ba67-4174-8fa1-ab0a947cf0b7', 'Binary Search: Divide & Conquer Approach, Prerequisite, Algorithm & Complexity Analysis', 2, 'published', now(), now()),
  ('f5a68165-ba67-4174-8fa1-ab0a947cf0b7', 'Hashing Concepts: Hash Functions (Division, Mid-Square, Folding), Collision Resolution Strategies', 3, 'published', now(), now()),
  ('f5a68165-ba67-4174-8fa1-ab0a947cf0b7', 'Collision Handling: Open Addressing (Linear Probing, Quadratic Probing, Double Hashing) vs Separate Chaining', 4, 'published', now(), now()),
  ('f5a68165-ba67-4174-8fa1-ab0a947cf0b7', 'Insertion Sort: Working Principle, Algorithm, Trace & Time Complexity Analysis', 5, 'published', now(), now()),
  ('f5a68165-ba67-4174-8fa1-ab0a947cf0b7', 'Selection Sort: Working Principle, Minimum Element Selection, Algorithm & Trace', 6, 'published', now(), now()),
  ('f5a68165-ba67-4174-8fa1-ab0a947cf0b7', 'Merge Sort: Divide, Conquer & Combine Algorithm, Recurrence Relation & Trace', 7, 'published', now(), now()),
  ('53bd5982-c943-4f1c-b590-538d2da61a1a', 'Stack ADT: Definition, LIFO Principle, Array Representation & Primitive Operations (Push, Pop, Peek, IsEmpty, IsFull)', 1, 'published', now(), now()),
  ('53bd5982-c943-4f1c-b590-538d2da61a1a', 'Stack Applications: Function Call Mechanism, Recursion Handling & Reversal', 2, 'published', now(), now()),
  ('53bd5982-c943-4f1c-b590-538d2da61a1a', 'Polish Notations: Infix, Prefix, and Postfix Notations', 3, 'published', now(), now()),
  ('53bd5982-c943-4f1c-b590-538d2da61a1a', 'Conversion from Infix to Postfix Expression using Stack Algorithm', 4, 'published', now(), now()),
  ('53bd5982-c943-4f1c-b590-538d2da61a1a', 'Evaluation of Postfix Expression using Stack Algorithm with Step-by-Step Trace', 5, 'published', now(), now()),
  ('53bd5982-c943-4f1c-b590-538d2da61a1a', 'Queue ADT: Definition, FIFO Principle, Array Representation & Primitive Operations (Enqueue, Dequeue)', 6, 'published', now(), now()),
  ('53bd5982-c943-4f1c-b590-538d2da61a1a', 'Circular Queues: Concept, Need, Full & Empty Condition Calculations', 7, 'published', now(), now()),
  ('53bd5982-c943-4f1c-b590-538d2da61a1a', 'Double-Ended Queues (D-queues): Input-Restricted and Output-Restricted Deques', 8, 'published', now(), now()),
  ('53bd5982-c943-4f1c-b590-538d2da61a1a', 'Priority Queues: Concept, Array/Heap Implementation & Applications', 9, 'published', now(), now()),
  ('661c3be6-4072-4dad-b5c5-006a796149b1', 'Introduction to Linked Lists: Dynamic Memory Allocation vs Static Arrays', 1, 'published', now(), now()),
  ('661c3be6-4072-4dad-b5c5-006a796149b1', 'Singly Linked List: Node Structure, Traversal, Searching, Insertion (Start, End, Middle) & Deletion', 2, 'published', now(), now()),
  ('661c3be6-4072-4dad-b5c5-006a796149b1', 'Doubly Linked Lists (Two-Way Lists): Structure, Forward/Backward Traversal, Insertion & Deletion', 3, 'published', now(), now()),
  ('661c3be6-4072-4dad-b5c5-006a796149b1', 'Circular Linked Lists: Singly Circular and Doubly Circular Lists', 4, 'published', now(), now()),
  ('661c3be6-4072-4dad-b5c5-006a796149b1', 'Header Linked Lists: Grounded Header and Circular Header Lists', 5, 'published', now(), now()),
  ('661c3be6-4072-4dad-b5c5-006a796149b1', 'Trees: Introduction, Basic Terminology (Root, Node, Degree, Level, Height, Subtree)', 6, 'published', now(), now()),
  ('661c3be6-4072-4dad-b5c5-006a796149b1', 'Binary Trees: Definition, Full, Complete, Extended (Strict) Binary Tree Properties', 7, 'published', now(), now()),
  ('661c3be6-4072-4dad-b5c5-006a796149b1', 'Binary Tree Traversals: Inorder (LNR), Preorder (NLR), Postorder (LRN)', 8, 'published', now(), now()),
  ('661c3be6-4072-4dad-b5c5-006a796149b1', 'Recursive Algorithms for Tree Operations: Traversal, Node Insertion, and Deletion', 9, 'published', now(), now()),
  ('ddf16cc1-c0b4-47c2-94ef-c4c53a1ae803', 'Binary Search Trees (BST): Properties, Insertion, Searching, and Deletion Cases', 1, 'published', now(), now()),
  ('ddf16cc1-c0b4-47c2-94ef-c4c53a1ae803', 'AVL Trees: Definition, Balance Factor (-1, 0, +1) & Height-Balanced Tree Concept', 2, 'published', now(), now()),
  ('ddf16cc1-c0b4-47c2-94ef-c4c53a1ae803', 'AVL Tree Rotations: LL, RR, LR, and RL Rotations with Rebalancing Examples', 3, 'published', now(), now()),
  ('ddf16cc1-c0b4-47c2-94ef-c4c53a1ae803', 'M-Way Search Trees: Concept, Multi-way Branching, Properties and Search Operations', 4, 'published', now(), now()),
  ('ddf16cc1-c0b4-47c2-94ef-c4c53a1ae803', 'Multilevel Indexing & Tree-Based Indexes: Concept, Advantages over Sequential Indexes', 5, 'published', now(), now()),
  ('ddf16cc1-c0b4-47c2-94ef-c4c53a1ae803', 'B-Trees: Formal Definition, Properties (Order m, Key Limits, Node Splitting & Merging)', 6, 'published', now(), now()),
  ('ddf16cc1-c0b4-47c2-94ef-c4c53a1ae803', 'B-Tree Construction & Key Insertion Algorithm with Step-by-Step Examples', 7, 'published', now(), now()),
  ('ddf16cc1-c0b4-47c2-94ef-c4c53a1ae803', 'B+ Trees: Concept, Linked Leaf Nodes & Comparison with B-Trees', 8, 'published', now(), now()),
  ('61010ab6-9c95-4a87-aaab-4960161894a1', 'Database Definition, File Processing System vs DBMS: Redundancy, Inconsistency & Isolation', 1, 'published', now(), now()),
  ('61010ab6-9c95-4a87-aaab-4960161894a1', 'DBMS Architecture: ANSI-SPARC Three-Level Architecture (Internal, Conceptual, External)', 2, 'published', now(), now()),
  ('61010ab6-9c95-4a87-aaab-4960161894a1', 'Data Independence: Physical Data Independence vs Logical Data Independence', 3, 'published', now(), now()),
  ('61010ab6-9c95-4a87-aaab-4960161894a1', 'Data Models Overview: Hierarchical, Network, Relational, and Object-Oriented Models', 4, 'published', now(), now()),
  ('61010ab6-9c95-4a87-aaab-4960161894a1', 'Role & Responsibilities of Database Administrator (DBA)', 5, 'published', now(), now()),
  ('61010ab6-9c95-4a87-aaab-4960161894a1', 'Classification of Database Users: Sophisticated, Naive/End Users, Application Programmers, Specialized', 6, 'published', now(), now()),
  ('61010ab6-9c95-4a87-aaab-4960161894a1', 'Front-End Tools, DBMS Interfaces & Utilities', 7, 'published', now(), now()),
  ('c5f7f235-66b4-40e5-90a1-c51017b09cef', 'E-R Modeling Concepts: Entity Types, Entity Sets, Weak Entities vs Strong Entities', 1, 'published', now(), now()),
  ('c5f7f235-66b4-40e5-90a1-c51017b09cef', 'Attributes: Simple, Composite, Single-Valued, Multi-Valued, Stored, Derived & Key Attributes', 2, 'published', now(), now()),
  ('c5f7f235-66b4-40e5-90a1-c51017b09cef', 'Relationship Types & Degrees: Unary (Recursive), Binary, Ternary Relationships', 3, 'published', now(), now()),
  ('c5f7f235-66b4-40e5-90a1-c51017b09cef', 'Mapping Cardinalities: One-to-One (1:1), One-to-Many (1:N), Many-to-One (N:1), Many-to-Many (M:N)', 4, 'published', now(), now()),
  ('c5f7f235-66b4-40e5-90a1-c51017b09cef', 'Participation Constraints: Total Participation vs Partial Participation', 5, 'published', now(), now()),
  ('c5f7f235-66b4-40e5-90a1-c51017b09cef', 'E-R Diagram Notations: Symbols, Entities, Attributes, Relationships & Roles', 6, 'published', now(), now()),
  ('c5f7f235-66b4-40e5-90a1-c51017b09cef', 'Database Design using E-R Diagrams: Real-world Case Studies (University, Hospital, Banking)', 7, 'published', now(), now()),
  ('c5f7f235-66b4-40e5-90a1-c51017b09cef', 'Reduction of E-R Schemas to Relational Tables with Integrity Rules', 8, 'published', now(), now()),
  ('a62a03f9-7839-40fa-99b3-2bd54a85c960', 'Relational Model Concepts: Relations, Tuples, Attributes, Cardinality, Degree & Domain', 1, 'published', now(), now()),
  ('a62a03f9-7839-40fa-99b3-2bd54a85c960', 'Relational Integrity Constraints: Domain Constraints, Key Constraints, Entity Integrity Constraint', 2, 'published', now(), now()),
  ('a62a03f9-7839-40fa-99b3-2bd54a85c960', 'Referential Integrity Constraint & Foreign Keys (CASCADE, SET NULL, RESTRICT Actions)', 3, 'published', now(), now()),
  ('a62a03f9-7839-40fa-99b3-2bd54a85c960', 'Functional Dependency (FD): Definition, Trivial vs Non-Trivial FDs, Armstrong''s Axioms', 4, 'published', now(), now()),
  ('a62a03f9-7839-40fa-99b3-2bd54a85c960', 'Closure of Attribute Sets and Candidate Key Determination', 5, 'published', now(), now()),
  ('a62a03f9-7839-40fa-99b3-2bd54a85c960', 'Database Anomalies: Insertion, Deletion, and Modification/Update Anomalies', 6, 'published', now(), now()),
  ('a62a03f9-7839-40fa-99b3-2bd54a85c960', 'Normalization: First Normal Form (1NF) - Elimination of Multi-Valued Attributes', 7, 'published', now(), now()),
  ('a62a03f9-7839-40fa-99b3-2bd54a85c960', 'Second Normal Form (2NF) - Elimination of Partial Functional Dependencies', 8, 'published', now(), now()),
  ('a62a03f9-7839-40fa-99b3-2bd54a85c960', 'Third Normal Form (3NF) - Elimination of Transitive Dependencies', 9, 'published', now(), now()),
  ('532c7166-9acf-4af8-aa7b-0d6453823ee5', 'SQL Language Architecture: DDL (Data Definition Language), DML (Data Manipulation Language), DCL, TCL', 1, 'published', now(), now()),
  ('532c7166-9acf-4af8-aa7b-0d6453823ee5', 'Data Types in SQL: Numeric, Character (CHAR/VARCHAR), Date, Time, Boolean', 2, 'published', now(), now()),
  ('532c7166-9acf-4af8-aa7b-0d6453823ee5', 'DDL Commands: CREATE TABLE, ALTER TABLE (ADD, MODIFY, DROP Column), DROP TABLE, TRUNCATE', 3, 'published', now(), now()),
  ('532c7166-9acf-4af8-aa7b-0d6453823ee5', 'Constraints in SQL: PRIMARY KEY, UNIQUE, NOT NULL, CHECK, DEFAULT, FOREIGN KEY REFERENCES', 4, 'published', now(), now()),
  ('532c7166-9acf-4af8-aa7b-0d6453823ee5', 'DML Commands: INSERT INTO, UPDATE SET WHERE, DELETE FROM WHERE', 5, 'published', now(), now()),
  ('532c7166-9acf-4af8-aa7b-0d6453823ee5', 'SQL Queries: SELECT Clause, WHERE Filtering, ORDER BY, DISTINCT, LIKE Wildcards, BETWEEN, IN', 6, 'published', now(), now()),
  ('532c7166-9acf-4af8-aa7b-0d6453823ee5', 'Aggregate Functions: COUNT, SUM, AVG, MIN, MAX & GROUP BY, HAVING Clause Filtering', 7, 'published', now(), now()),
  ('532c7166-9acf-4af8-aa7b-0d6453823ee5', 'SQL Joins: Inner Join, Left Outer Join, Right Outer Join, Full Outer Join, Cross Join', 8, 'published', now(), now()),
  ('532c7166-9acf-4af8-aa7b-0d6453823ee5', 'Subqueries: Nested Queries, Correlated Subqueries & Table Views (CREATE VIEW)', 9, 'published', now(), now()),
  ('0ec279fb-4293-4eef-ac5d-1896e25d5b9c', 'Database Security Threats: SQL Injection, Unauthorized Access, Privilege Abuse, Data Loss', 1, 'published', now(), now()),
  ('0ec279fb-4293-4eef-ac5d-1896e25d5b9c', 'Defense Mechanisms: Authentication, Authorization, Role-Based Access Control (RBAC), Data Encryption', 2, 'published', now(), now()),
  ('0ec279fb-4293-4eef-ac5d-1896e25d5b9c', 'Granting and Revoking Privileges: GRANT and REVOKE SQL Statements', 3, 'published', now(), now()),
  ('0ec279fb-4293-4eef-ac5d-1896e25d5b9c', 'Transaction Concepts: ACID Properties (Atomicity, Consistency, Isolation, Durability)', 4, 'published', now(), now()),
  ('0ec279fb-4293-4eef-ac5d-1896e25d5b9c', 'Concurrency Control Overview: Lock-Based Protocols, Deadlocks & Recovery Techniques', 5, 'published', now(), now()),
  ('0ec279fb-4293-4eef-ac5d-1896e25d5b9c', 'Recent Trends in DBMS: Distributed Databases (Architecture, Fragmentation, Replication)', 6, 'published', now(), now()),
  ('0ec279fb-4293-4eef-ac5d-1896e25d5b9c', 'Deductive Databases & Rule-Based Query Evaluation', 7, 'published', now(), now()),
  ('0ec279fb-4293-4eef-ac5d-1896e25d5b9c', 'NoSQL Databases & Big Data Storage Overview', 8, 'published', now(), now()),
  ('f71cce92-2184-435e-bf56-2a950da9abce', 'Concepts: Business, Trade, Industry and Commerce Definition & Characteristics', 1, 'published', now(), now()),
  ('f71cce92-2184-435e-bf56-2a950da9abce', 'Features of Modern Business: Economic Activity, Risk & Profit Motive', 2, 'published', now(), now()),
  ('f71cce92-2184-435e-bf56-2a950da9abce', 'Classification of Trade: Internal (Wholesale/Retail) vs International (Import/Export/Entrepot) & Aids to Trade', 3, 'published', now(), now()),
  ('f71cce92-2184-435e-bf56-2a950da9abce', 'Industry Classification: Primary, Secondary, Tertiary/Service Industries', 4, 'published', now(), now()),
  ('f71cce92-2184-435e-bf56-2a950da9abce', 'Relationship between Trade, Industry and Commerce & Core Functions of Business', 5, 'published', now(), now()),
  ('f71cce92-2184-435e-bf56-2a950da9abce', 'Sole Proprietorship: Meaning, Features, Merits, Demerits & Suitability', 6, 'published', now(), now()),
  ('f71cce92-2184-435e-bf56-2a950da9abce', 'Partnership: Meaning, Characteristics, Rights/Duties, Kinds of Partners, Partnership Deed & Registration', 7, 'published', now(), now()),
  ('f71cce92-2184-435e-bf56-2a950da9abce', 'Limited Liability Partnership (LLP): Concept, Distinctions from General Partnership & Companies', 8, 'published', now(), now()),
  ('761004b1-a216-4fb7-bcb6-daabbf0c98d7', 'Definition & Scope of Management: Is Management an Art, Science, or Profession?', 1, 'published', now(), now()),
  ('761004b1-a216-4fb7-bcb6-daabbf0c98d7', 'Manager Defined: Manager vs Leader Roles and Behavioral Differences', 2, 'published', now(), now()),
  ('761004b1-a216-4fb7-bcb6-daabbf0c98d7', 'Levels of Management: Top, Middle, Lower/Operational Management and Hierarchy', 3, 'published', now(), now()),
  ('761004b1-a216-4fb7-bcb6-daabbf0c98d7', 'Managerial Skills (Robert Katz): Conceptual, Human, and Technical Skills', 4, 'published', now(), now()),
  ('761004b1-a216-4fb7-bcb6-daabbf0c98d7', 'Classical Management Thoughts: Henri Fayol''s 14 Principles of Management & Administrative Theory', 5, 'published', now(), now()),
  ('761004b1-a216-4fb7-bcb6-daabbf0c98d7', 'F.W. Taylor''s Scientific Management: Principles, Time/Motion Study, Differential Piece-Rate System', 6, 'published', now(), now()),
  ('761004b1-a216-4fb7-bcb6-daabbf0c98d7', 'Max Weber''s Theory of Bureaucracy: Rational-Legal Authority, Hierarchy, Rules & Merits/Demerits', 7, 'published', now(), now()),
  ('dc6d99e6-0a42-4e8d-9267-e8aee059db0e', 'Planning: Definition, Characteristics, Importance & Primacy in Management', 1, 'published', now(), now()),
  ('dc6d99e6-0a42-4e8d-9267-e8aee059db0e', 'Steps in the Planning Process: Objective Setting, Forecasting, Identifying/Evaluating Alternatives', 2, 'published', now(), now()),
  ('dc6d99e6-0a42-4e8d-9267-e8aee059db0e', 'Limitations of Planning: Rigidity, Time Consumption, Environmental Uncertainties', 3, 'published', now(), now()),
  ('dc6d99e6-0a42-4e8d-9267-e8aee059db0e', 'Types of Plans: Strategic vs Tactical, Operational, Standing Plans (Policies, Procedures, Rules) vs Single-Use Plans (Budgets, Programs)', 4, 'published', now(), now()),
  ('dc6d99e6-0a42-4e8d-9267-e8aee059db0e', 'Decision Making: Definition, Characteristics & Significance in Business', 5, 'published', now(), now()),
  ('dc6d99e6-0a42-4e8d-9267-e8aee059db0e', 'Rational Decision-Making Process: Problem Diagnosis, Alternative Generation, Evaluation & Implementation', 6, 'published', now(), now()),
  ('dc6d99e6-0a42-4e8d-9267-e8aee059db0e', 'Types of Decisions: Programmed vs Non-Programmed, Strategic vs Routine, Major vs Minor, Individual vs Group Decisions', 7, 'published', now(), now()),
  ('4cd661cb-dee7-4e9a-bafb-35ee7eae4c8e', 'Meaning of Organizing & Organization Structure Definition', 1, 'published', now(), now()),
  ('4cd661cb-dee7-4e9a-bafb-35ee7eae4c8e', 'Organization Charts: Types, Principles & Visual Representation of Hierarchy', 2, 'published', now(), now()),
  ('4cd661cb-dee7-4e9a-bafb-35ee7eae4c8e', 'Formal vs Informal Organization: Characteristics, Differences, Benefits & Disadvantages', 3, 'published', now(), now()),
  ('4cd661cb-dee7-4e9a-bafb-35ee7eae4c8e', 'Span of Management (Span of Control): Narrow vs Wide Span & Factors Determining Span', 4, 'published', now(), now()),
  ('4cd661cb-dee7-4e9a-bafb-35ee7eae4c8e', 'Line and Staff Organization Concepts: Line Authority, Staff Authority & Line-Staff Conflicts', 5, 'published', now(), now()),
  ('4cd661cb-dee7-4e9a-bafb-35ee7eae4c8e', 'Delegation of Authority: Meaning, Elements (Authority, Responsibility, Accountability), Advantages & Barriers', 6, 'published', now(), now()),
  ('4cd661cb-dee7-4e9a-bafb-35ee7eae4c8e', 'Decentralization: Concept, Distinction from Delegation, Merits, Demerits & Factors Influencing Degree of Decentralization', 7, 'published', now(), now()),
  ('0bfafb6e-d07b-476b-ada4-dac708f30667', 'Motivation: Definition, Meaning, Nature, Financial vs Non-Financial Incentives', 1, 'published', now(), now()),
  ('0bfafb6e-d07b-476b-ada4-dac708f30667', 'Theories of Motivation: Abraham Maslow''s Need Hierarchy Theory (Physiological to Self-Actualization)', 2, 'published', now(), now()),
  ('0bfafb6e-d07b-476b-ada4-dac708f30667', 'Herzberg''s Two-Factor / Hygiene Approach to Motivation (Hygiene Factors vs Motivators)', 3, 'published', now(), now()),
  ('0bfafb6e-d07b-476b-ada4-dac708f30667', 'Leadership: Definition, Traits of Successful Leaders & Leadership vs Management', 4, 'published', now(), now()),
  ('0bfafb6e-d07b-476b-ada4-dac708f30667', 'Leadership Styles: Autocratic, Democratic / Participative, Laissez-Faire / Free-Rein Styles', 5, 'published', now(), now()),
  ('0bfafb6e-d07b-476b-ada4-dac708f30667', 'Blake and Mouton''s Managerial Grid: Task vs People Orientation (1,1; 9,1; 1,9; 5,5; 9,9)', 6, 'published', now(), now()),
  ('0bfafb6e-d07b-476b-ada4-dac708f30667', 'Coordination: Definition, Essence of Management, Need, Difficulties & Techniques for Effective Coordination', 7, 'published', now(), now()),
  ('0bfafb6e-d07b-476b-ada4-dac708f30667', 'Control: Definition, Nature, The Control Process (Standards, Measurement, Comparison, Corrective Action)', 8, 'published', now(), now()),
  ('0bfafb6e-d07b-476b-ada4-dac708f30667', 'Essentials of a Good Control System: Merits, Demerits, and Modern Control Techniques', 9, 'published', now(), now()),
  ('bca10801-0002-4000-8000-000000000108', 'Introduction to Digital Systems & Binary Logic', 1, 'published', now(), now()),
  ('bca10801-0002-4000-8000-000000000108', 'Laws and Theorems of Boolean Algebra (Idempotent, Boundedness, Involution, Distributive, De Morgan''s Laws)', 2, 'published', now(), now()),
  ('bca10801-0002-4000-8000-000000000108', 'Basic Logic Gates: Truth Tables, Symbols and Operation of NOT, AND, OR Gates', 3, 'published', now(), now()),
  ('bca10801-0002-4000-8000-000000000108', 'Universal Gates: NAND and NOR Gates & Implementing Basic Logic using Universal Gates', 4, 'published', now(), now()),
  ('bca10801-0002-4000-8000-000000000108', 'Exclusive Gates: EX-OR and EX-NOR Gates, Truth Tables, Parity Generation & Checking', 5, 'published', now(), now()),
  ('bca10801-0002-4000-8000-000000000108', 'Boolean Expressions: Sum of Products (SOP) and Product of Sums (POS) Canonical Forms', 6, 'published', now(), now()),
  ('bca10801-0002-4000-8000-000000000108', 'Karnaugh Maps (K-Maps): 2-Variable, 3-Variable, and 4-Variable K-Map Minimization', 7, 'published', now(), now()),
  ('bca10801-0002-4000-8000-000000000108', 'Don''t Care Conditions in K-Map Simplification with Practical Examples', 8, 'published', now(), now()),
  ('bca10802-0002-4000-8000-000000000108', 'Review of Number Systems: Binary, Octal, Decimal, and Hexadecimal Number Systems', 1, 'published', now(), now()),
  ('bca10802-0002-4000-8000-000000000108', 'Number Base Conversions: Between Binary, Octal, Decimal, and Hexadecimal', 2, 'published', now(), now()),
  ('bca10802-0002-4000-8000-000000000108', 'Binary Arithmetic: Unsigned Addition, Subtraction, Multiplication & Division', 3, 'published', now(), now()),
  ('bca10802-0002-4000-8000-000000000108', 'Complements: r''s and (r-1)''s Complements (1''s and 2''s Complements) & Signed Binary Subtraction', 4, 'published', now(), now()),
  ('bca10802-0002-4000-8000-000000000108', 'Binary Coded Decimal (BCD): 8421 Code, BCD Addition & Invalid BCD Correction', 5, 'published', now(), now()),
  ('bca10802-0002-4000-8000-000000000108', 'Gray Codes: Definition, Properties, Binary-to-Gray and Gray-to-Binary Conversions', 6, 'published', now(), now()),
  ('bca10802-0002-4000-8000-000000000108', 'Excess-3 Code: Self-Complementing Property and Applications', 7, 'published', now(), now()),
  ('bca10802-0002-4000-8000-000000000108', 'Alphanumeric Codes & Parity Codes for Error Detection', 8, 'published', now(), now()),
  ('bca10803-0002-4000-8000-000000000108', 'Half Adder and Full Adder: Circuit Design, Truth Tables & Boolean Expressions', 1, 'published', now(), now()),
  ('bca10803-0002-4000-8000-000000000108', 'Half Subtractor and Full Subtractor: Logic Circuit Design & Truth Tables', 2, 'published', now(), now()),
  ('bca10803-0002-4000-8000-000000000108', 'Parallel Binary Adder/Subtractor using 2''s Complement Logic & 7483 IC Overview', 3, 'published', now(), now()),
  ('bca10803-0002-4000-8000-000000000108', 'Binary Multipliers and Dividers Overview', 4, 'published', now(), now()),
  ('bca10803-0002-4000-8000-000000000108', 'Multiplexers (Data Selectors): 2:1, 4:1, 8:1 MUX Design, Truth Tables & Function Realization', 5, 'published', now(), now()),
  ('bca10803-0002-4000-8000-000000000108', 'De-Multiplexers (Data Distributors): 1:2, 1:4, 1:8 DEMUX Design and Operation', 6, 'published', now(), now()),
  ('bca10803-0002-4000-8000-000000000108', 'Decoders: 2-to-4, 3-to-8 Binary Decoders, BCD-to-7-Segment Decoder Operation', 7, 'published', now(), now()),
  ('bca10803-0002-4000-8000-000000000108', 'Encoders: Decimal-to-BCD Encoders and Priority Encoders', 8, 'published', now(), now()),
  ('bca10804-0002-4000-8000-000000000108', 'Latches vs Flip-Flops: Level Triggering vs Edge Triggering Concepts', 1, 'published', now(), now()),
  ('bca10804-0002-4000-8000-000000000108', 'S-R Flip-Flop: NOR and NAND Latch Implementation, Clocked S-R Flip-Flop & Truth Table', 2, 'published', now(), now()),
  ('bca10804-0002-4000-8000-000000000108', 'D (Data) Flip-Flop and T (Toggle) Flip-Flop: Working Principle and Characteristic Equations', 3, 'published', now(), now()),
  ('bca10804-0002-4000-8000-000000000108', 'J-K Flip-Flop: Eliminating the Indeterminate State, Truth Table & Excitation Table', 4, 'published', now(), now()),
  ('bca10804-0002-4000-8000-000000000108', 'Race-Around Condition in J-K Flip-Flop: Causes and Prevention', 5, 'published', now(), now()),
  ('bca10804-0002-4000-8000-000000000108', 'Master-Slave J-K Flip-Flop: Operation, Timing Diagrams & Overcoming Race Conditions', 6, 'published', now(), now()),
  ('bca10804-0002-4000-8000-000000000108', 'Conversion / Realization of One Flip-Flop using Another Flip-Flop', 7, 'published', now(), now()),
  ('bca10804-0002-4000-8000-000000000108', 'Shift Registers Overview & Classification', 8, 'published', now(), now()),
  ('bca10804-0002-4000-8000-000000000108', 'SISO (Serial-In Serial-Out), SIPO, PISO, and PIPO Shift Registers', 9, 'published', now(), now()),
  ('bca10804-0002-4000-8000-000000000108', 'Bi-Directional Shift Registers and Universal Shift Register Operation', 10, 'published', now(), now()),
  ('bca10805-0002-4000-8000-000000000108', 'Asynchronous (Ripple) Counters: Up-Counter, Down-Counter, Timing Diagrams & Propagation Delay', 1, 'published', now(), now()),
  ('bca10805-0002-4000-8000-000000000108', 'Synchronous Counters: Design Steps, State Diagram, Excitation Tables, Up/Down Counters', 2, 'published', now(), now()),
  ('bca10805-0002-4000-8000-000000000108', 'Modulo Counters: Mod-N Counters, Decade / BCD Counter (Mod-10) Design', 3, 'published', now(), now()),
  ('bca10805-0002-4000-8000-000000000108', 'Ring Counter: Operation, State Sequence & Clock Waveforms', 4, 'published', now(), now()),
  ('bca10805-0002-4000-8000-000000000108', 'Johnson (Twisted Ring) Counter: Self-Starting Property & Waveforms', 5, 'published', now(), now()),
  ('bca10805-0002-4000-8000-000000000108', 'Memory Devices: RAM (SRAM vs DRAM Cells) and ROM Types (PROM, EPROM, EEPROM, Flash)', 6, 'published', now(), now()),
  ('bca10805-0002-4000-8000-000000000108', 'Programmable Logic Devices: PAL (Programmable Array Logic) vs PLA (Programmable Logic Array) Architecture', 7, 'published', now(), now()),
  ('7844c00f-50ca-4135-b0d4-daaeca67d7ee', 'Sets Definition, Representation (Roster vs Set-Builder Form), Subsets & Proper Subsets', 1, 'published', now(), now()),
  ('7844c00f-50ca-4135-b0d4-daaeca67d7ee', 'Equal Sets, Equivalent Sets, Universal Sets, Finite and Infinite Sets', 2, 'published', now(), now()),
  ('7844c00f-50ca-4135-b0d4-daaeca67d7ee', 'Set Operations: Union, Intersection, Difference, Symmetric Difference, and Complements', 3, 'published', now(), now()),
  ('7844c00f-50ca-4135-b0d4-daaeca67d7ee', 'Properties & Laws of Set Operations: Commutative, Associative, Distributive, De Morgan''s Laws', 4, 'published', now(), now()),
  ('7844c00f-50ca-4135-b0d4-daaeca67d7ee', 'Cartesian Product of Sets, Ordered Pairs & Cardinality Properties', 5, 'published', now(), now()),
  ('7844c00f-50ca-4135-b0d4-daaeca67d7ee', 'Power Set: Definition, Cardinality Calculation (2^n) & Properties', 6, 'published', now(), now()),
  ('7844c00f-50ca-4135-b0d4-daaeca67d7ee', 'Venn Diagrams and Practical Word Problem Applications involving Cardinality Formulae', 7, 'published', now(), now()),
  ('f271ca33-4e1e-4aea-a31e-c4d8909fd49e', 'Binary Relations: Domain, Range, and Inverse of a Relation', 1, 'published', now(), now()),
  ('f271ca33-4e1e-4aea-a31e-c4d8909fd49e', 'Properties of Relations: Reflexive, Symmetric, Transitive, and Anti-Symmetric Relations', 2, 'published', now(), now()),
  ('f271ca33-4e1e-4aea-a31e-c4d8909fd49e', 'Equivalence Relations: Definition, Equivalence Classes, Partitions of Sets & Proofs', 3, 'published', now(), now()),
  ('f271ca33-4e1e-4aea-a31e-c4d8909fd49e', 'Partial Order Relations: Posets, Hasse Diagrams & Chain/Antichain Concepts', 4, 'published', now(), now()),
  ('f271ca33-4e1e-4aea-a31e-c4d8909fd49e', 'Functions: Definition as Special Relations, Domain, Co-domain, and Range', 5, 'published', now(), now()),
  ('f271ca33-4e1e-4aea-a31e-c4d8909fd49e', 'Types of Functions: One-to-One (Injective), Onto (Surjective), Bijective, Into Functions', 6, 'published', now(), now()),
  ('f271ca33-4e1e-4aea-a31e-c4d8909fd49e', 'Composition of Functions: Associativity of Composite Functions & Inverse Functions', 7, 'published', now(), now()),
  ('f271ca33-4e1e-4aea-a31e-c4d8909fd49e', 'Principle of Mathematical Induction: First and Second Principles with Proofs', 8, 'published', now(), now()),
  ('ac0fb7be-e747-43a9-918d-c9f6cd2ae5e0', 'Functions of Several Variables: Limit and Continuity of Two-Variable Functions', 1, 'published', now(), now()),
  ('ac0fb7be-e747-43a9-918d-c9f6cd2ae5e0', 'Indeterminate Forms and Evaluation Techniques', 2, 'published', now(), now()),
  ('ac0fb7be-e747-43a9-918d-c9f6cd2ae5e0', 'Partial Differentiation: First-Order and Higher-Order Partial Derivatives', 3, 'published', now(), now()),
  ('ac0fb7be-e747-43a9-918d-c9f6cd2ae5e0', 'Chain Rule for Functions of Two and Three Independent Variables', 4, 'published', now(), now()),
  ('ac0fb7be-e747-43a9-918d-c9f6cd2ae5e0', 'Euler''s Theorem for Homogeneous Functions and Verification with Examples', 5, 'published', now(), now()),
  ('ac0fb7be-e747-43a9-918d-c9f6cd2ae5e0', 'Jacobians: Definition, Properties, Chain Rule for Jacobians & Functional Dependence', 6, 'published', now(), now()),
  ('ac0fb7be-e747-43a9-918d-c9f6cd2ae5e0', 'Extrema of Functions of Two Variables: Necessary and Sufficient Conditions for Maxima and Minima', 7, 'published', now(), now()),
  ('ac0fb7be-e747-43a9-918d-c9f6cd2ae5e0', 'Vector Differentiation: Scalar and Vector Fields, Gradient, Divergence, and Curl Operators', 8, 'published', now(), now()),
  ('92e71595-e501-433f-89dc-b4e303e6178b', 'Infinite Series: Sequence of Partial Sums, Convergent, Divergent, and Oscillatory Series', 1, 'published', now(), now()),
  ('92e71595-e501-433f-89dc-b4e303e6178b', 'Alternating Series & Leibniz''s Alternating Series Test', 2, 'published', now(), now()),
  ('92e71595-e501-433f-89dc-b4e303e6178b', 'Absolute Convergence vs Conditional Convergence of Series', 3, 'published', now(), now()),
  ('92e71595-e501-433f-89dc-b4e303e6178b', 'Positive Term Series Tests: p-Series Test (1/n^p convergence conditions)', 4, 'published', now(), now()),
  ('92e71595-e501-433f-89dc-b4e303e6178b', 'Comparison Tests: Direct Comparison Test and Limit Comparison Test', 5, 'published', now(), now()),
  ('92e71595-e501-433f-89dc-b4e303e6178b', 'D''Alembert''s Ratio Test: Statement, Proof Outline & Applied Problems', 6, 'published', now(), now()),
  ('92e71595-e501-433f-89dc-b4e303e6178b', 'Cauchy''s Root Test (nth Root Test) with Worked Examples', 7, 'published', now(), now()),
  ('92e71595-e501-433f-89dc-b4e303e6178b', 'Raabe''s Test and Logarithmic Ratio Test for Higher-Order Convergence Decisions', 8, 'published', now(), now()),
  ('291be6f9-6552-4446-bcc9-1e062af8bfcd', 'Rolle''s Theorem: Statement, Geometric Interpretation & Verification Conditions', 1, 'published', now(), now()),
  ('291be6f9-6552-4446-bcc9-1e062af8bfcd', 'Lagrange''s Mean Value Theorem: Statement, Geometric Meaning & Applications', 2, 'published', now(), now()),
  ('291be6f9-6552-4446-bcc9-1e062af8bfcd', 'Cauchy''s Mean Value Theorem: Statement and Analytical Significance', 3, 'published', now(), now()),
  ('291be6f9-6552-4446-bcc9-1e062af8bfcd', 'Taylor''s Theorem with Remainder Term and Maclaurin''s Theorem', 4, 'published', now(), now()),
  ('291be6f9-6552-4446-bcc9-1e062af8bfcd', 'Maclaurin Series Expansion for Elementary Functions: sin(x), cos(x), tan(x), e^x, log(1+x), log(1-x)', 5, 'published', now(), now()),
  ('291be6f9-6552-4446-bcc9-1e062af8bfcd', 'Indeterminate Forms: L''Hospital''s Rule applied to 0/0, infinity/infinity, 0*infinity, 1^infinity', 6, 'published', now(), now()),
  ('291be6f9-6552-4446-bcc9-1e062af8bfcd', 'Applications of Maxima and Minima to Practical Geometric and Economic Optimization Problems', 7, 'published', now(), now());

COMMIT;