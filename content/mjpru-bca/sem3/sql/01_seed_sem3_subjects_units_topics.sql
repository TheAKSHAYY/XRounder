BEGIN;
-- Update Existing Subject Codes and Titles
UPDATE public.subjects SET code = 'BCA-201N', title = 'Object Oriented Programming using JAVA', slug = 'bca-201n-object-oriented-programming-using-java', credits = 4, status = 'published', updated_at = now() WHERE id = '8ffa5896-3b23-4839-bf31-130163ecf801';
UPDATE public.subjects SET code = 'BCA-203N', title = 'Numerical Analysis and Statistical Techniques', slug = 'bca-203n-numerical-analysis-and-statistical-techniques', credits = 4, status = 'published', updated_at = now() WHERE id = 'e66c67d0-158e-477f-bb65-10fc3d6eadf4';
UPDATE public.subjects SET code = 'BCA-205N', title = 'Operating System', slug = 'bca-205n-operating-system', credits = 4, status = 'published', updated_at = now() WHERE id = 'f7689cea-4163-4bf9-808f-be37ea46ae4a';
UPDATE public.subjects SET code = 'BCA-207N', title = 'Computer Organization and Architecture', slug = 'bca-207n-computer-organization-and-architecture', credits = 4, status = 'published', updated_at = now() WHERE id = '94d8428f-1759-466e-9838-af1e0fef68b3';
UPDATE public.subjects SET code = 'BCA-411E', title = 'Discrete Mathematics', slug = 'bca-411e-discrete-mathematics', credits = 4, status = 'published', updated_at = now() WHERE id = '19db3ea2-df09-4c50-af44-59811381fd81';

-- Insert or Update 25 Units
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('4e2a6856-906d-579c-bf99-d97570e06433', '8ffa5896-3b23-4839-bf31-130163ecf801', 1, 'Java Fundamentals, JVM Architecture & Language Syntax', 'Official MJPRU BCA Unit 1: Java Fundamentals, JVM Architecture & Language Syntax for BCA-201N (Object Oriented Programming using JAVA).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('931ea332-3d62-5a88-845d-12d24fc111fe', '8ffa5896-3b23-4839-bf31-130163ecf801', 2, 'Classes, Objects, Methods, Constructors & Inheritance', 'Official MJPRU BCA Unit 2: Classes, Objects, Methods, Constructors & Inheritance for BCA-201N (Object Oriented Programming using JAVA).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('465feec2-fa34-598c-948a-afaf21612f35', '8ffa5896-3b23-4839-bf31-130163ecf801', 3, 'Interfaces, Packages, Arrays, Strings & Wrapper Classes', 'Official MJPRU BCA Unit 3: Interfaces, Packages, Arrays, Strings & Wrapper Classes for BCA-201N (Object Oriented Programming using JAVA).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('d26825c0-b0c3-5c75-9cfd-f9936187b430', '8ffa5896-3b23-4839-bf31-130163ecf801', 4, 'Exception Handling & Multithreaded Programming', 'Official MJPRU BCA Unit 4: Exception Handling & Multithreaded Programming for BCA-201N (Object Oriented Programming using JAVA).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('b0a32c41-9236-5075-9a0d-cf0cc936d248', '8ffa5896-3b23-4839-bf31-130163ecf801', 5, 'Managing Input/Output Files, Streams & Java Utilities', 'Official MJPRU BCA Unit 5: Managing Input/Output Files, Streams & Java Utilities for BCA-201N (Object Oriented Programming using JAVA).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('96e6e0ec-a7dc-5b08-818e-fb1320c77a03', 'e66c67d0-158e-477f-bb65-10fc3d6eadf4', 1, 'Mathematical Modeling, Errors & Taylor Series', 'Official MJPRU BCA Unit 1: Mathematical Modeling, Errors & Taylor Series for BCA-203N (Numerical Analysis and Statistical Techniques).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('823861ed-afab-5d0c-95d1-2ce548d7fc04', 'e66c67d0-158e-477f-bb65-10fc3d6eadf4', 2, 'Algebraic/Transcendental Equations & Interpolation', 'Official MJPRU BCA Unit 2: Algebraic/Transcendental Equations & Interpolation for BCA-203N (Numerical Analysis and Statistical Techniques).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'e66c67d0-158e-477f-bb65-10fc3d6eadf4', 3, 'Simultaneous Linear Equations, Numerical Differentiation & Integration, ODEs', 'Official MJPRU BCA Unit 3: Simultaneous Linear Equations, Numerical Differentiation & Integration, ODEs for BCA-203N (Numerical Analysis and Statistical Techniques).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'e66c67d0-158e-477f-bb65-10fc3d6eadf4', 4, 'Least-Squares Curve Fitting & Linear Programming', 'Official MJPRU BCA Unit 4: Least-Squares Curve Fitting & Linear Programming for BCA-203N (Numerical Analysis and Statistical Techniques).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('ea73fc67-550d-53f5-acd4-19053adb0116', 'e66c67d0-158e-477f-bb65-10fc3d6eadf4', 5, 'Random Variables & Theoretical Probability Distributions', 'Official MJPRU BCA Unit 5: Random Variables & Theoretical Probability Distributions for BCA-203N (Numerical Analysis and Statistical Techniques).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('f96a6a0e-7b0e-5bb8-a668-d5dbbc2ee673', 'f7689cea-4163-4bf9-808f-be37ea46ae4a', 1, 'Operating System Foundations, Architecture & Evolution', 'Official MJPRU BCA Unit 1: Operating System Foundations, Architecture & Evolution for BCA-205N (Operating System).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'f7689cea-4163-4bf9-808f-be37ea46ae4a', 2, 'Process Management, CPU Scheduling & Threads', 'Official MJPRU BCA Unit 2: Process Management, CPU Scheduling & Threads for BCA-205N (Operating System).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'f7689cea-4163-4bf9-808f-be37ea46ae4a', 3, 'Memory Management & Virtual Memory Architecture', 'Official MJPRU BCA Unit 3: Memory Management & Virtual Memory Architecture for BCA-205N (Operating System).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'f7689cea-4163-4bf9-808f-be37ea46ae4a', 4, 'Process Synchronization, Concurrency & Deadlocks', 'Official MJPRU BCA Unit 4: Process Synchronization, Concurrency & Deadlocks for BCA-205N (Operating System).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('140212af-3260-552c-9308-e371e626b20e', 'f7689cea-4163-4bf9-808f-be37ea46ae4a', 5, 'File Systems, Secondary Storage Management & Disk Scheduling', 'Official MJPRU BCA Unit 5: File Systems, Secondary Storage Management & Disk Scheduling for BCA-205N (Operating System).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('93dbb129-6c97-521e-a8f0-4c4f8c12475c', '94d8428f-1759-466e-9838-af1e0fef68b3', 1, 'Basic Organization, CPU Registers & Control Unit', 'Official MJPRU BCA Unit 1: Basic Organization, CPU Registers & Control Unit for BCA-207N (Computer Organization and Architecture).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', '94d8428f-1759-466e-9838-af1e0fef68b3', 2, 'CPU Functioning, Instruction Formats & Addressing Modes', 'Official MJPRU BCA Unit 2: CPU Functioning, Instruction Formats & Addressing Modes for BCA-207N (Computer Organization and Architecture).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('a9c00073-9807-52cd-b535-a2fdc7334f89', '94d8428f-1759-466e-9838-af1e0fef68b3', 3, 'Memory Organization, Hierarchy & Cache Architecture', 'Official MJPRU BCA Unit 3: Memory Organization, Hierarchy & Cache Architecture for BCA-207N (Computer Organization and Architecture).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', '94d8428f-1759-466e-9838-af1e0fef68b3', 4, 'Input/Output Organization, Interfaces & Data Transfer Modes', 'Official MJPRU BCA Unit 4: Input/Output Organization, Interfaces & Data Transfer Modes for BCA-207N (Computer Organization and Architecture).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('42200db4-826d-5c33-ab77-08c632943b9e', '94d8428f-1759-466e-9838-af1e0fef68b3', 5, 'Parallel Processing, Pipelining & Multiprocessor Systems', 'Official MJPRU BCA Unit 5: Parallel Processing, Pipelining & Multiprocessor Systems for BCA-207N (Computer Organization and Architecture).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('64ceb1cb-1e27-503e-abd6-757dd220abf4', '19db3ea2-df09-4c50-af44-59811381fd81', 1, 'Set Theory, Posets, Lattices & Boolean Algebra', 'Official MJPRU BCA Unit 1: Set Theory, Posets, Lattices & Boolean Algebra for BCA-411E (Discrete Mathematics).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('fc7b0943-6502-577f-9b55-ba67821c4b0a', '19db3ea2-df09-4c50-af44-59811381fd81', 2, 'Propositional Logic, Predicate Calculus & Mathematical Proofs', 'Official MJPRU BCA Unit 2: Propositional Logic, Predicate Calculus & Mathematical Proofs for BCA-411E (Discrete Mathematics).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('94294521-6157-5d4f-9937-0600e47a0186', '19db3ea2-df09-4c50-af44-59811381fd81', 3, 'Combinatorics, Recurrence Relations & Binomial Theorem', 'Official MJPRU BCA Unit 3: Combinatorics, Recurrence Relations & Binomial Theorem for BCA-411E (Discrete Mathematics).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', '19db3ea2-df09-4c50-af44-59811381fd81', 4, 'Algebraic Structures & Group Theory', 'Official MJPRU BCA Unit 4: Algebraic Structures & Group Theory for BCA-411E (Discrete Mathematics).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('4612b805-4412-5c85-8a70-f2066b6e18dd', '19db3ea2-df09-4c50-af44-59811381fd81', 5, 'Graph Theory, Trees & Network Algorithms', 'Official MJPRU BCA Unit 5: Graph Theory, Trees & Network Algorithms for BCA-411E (Discrete Mathematics).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();

DELETE FROM public.syllabus_topics WHERE unit_id IN ('4e2a6856-906d-579c-bf99-d97570e06433', '931ea332-3d62-5a88-845d-12d24fc111fe', '465feec2-fa34-598c-948a-afaf21612f35', 'd26825c0-b0c3-5c75-9cfd-f9936187b430', 'b0a32c41-9236-5075-9a0d-cf0cc936d248', '96e6e0ec-a7dc-5b08-818e-fb1320c77a03', '823861ed-afab-5d0c-95d1-2ce548d7fc04', '438015e4-6f9e-53f3-b823-70f489c69f4e', '77327cbc-9bcf-5d52-b408-33b650aa393f', 'ea73fc67-550d-53f5-acd4-19053adb0116', 'f96a6a0e-7b0e-5bb8-a668-d5dbbc2ee673', '0208c6e1-bb32-524b-a374-2ad1b17373fe', '0557765b-dbac-5908-a7f3-49ade77d15ca', 'a4e35aa8-a89b-5fbf-aa72-ac386118b06c', '140212af-3260-552c-9308-e371e626b20e', '93dbb129-6c97-521e-a8f0-4c4f8c12475c', '0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', 'a9c00073-9807-52cd-b535-a2fdc7334f89', '5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', '42200db4-826d-5c33-ab77-08c632943b9e', '64ceb1cb-1e27-503e-abd6-757dd220abf4', 'fc7b0943-6502-577f-9b55-ba67821c4b0a', '94294521-6157-5d4f-9937-0600e47a0186', '3c40208d-2d50-5404-bdb1-936bbe24f1c1', '4612b805-4412-5c85-8a70-f2066b6e18dd');

INSERT INTO public.syllabus_topics (unit_id, title, sort_order, status, created_at, updated_at) VALUES
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'History and Evolution of Java: Oak, Sun Microsystems to Oracle, Internet Integration & Applets', 1, 'published', now(), now()),
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'Core Features of Java: Simple, Object-Oriented, Platform Independent, Robust, Secure, Multi-Threaded', 2, 'published', now(), now()),
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'Paradigm Comparison: How Java Differs Architecturally and Semantically from C and C++', 3, 'published', now(), now()),
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'Java Virtual Machine (JVM) Architecture: ClassLoader Subsystem, Memory Areas, Execution Engine (JIT), GC', 4, 'published', now(), now()),
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'Java Environment Hierarchy: Java Development Kit (JDK) vs Java Runtime Environment (JRE) vs JVM', 5, 'published', now(), now()),
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'Structure of a Java Application: Package Declaration, Import Statements, Class Definition, main() Entry Point', 6, 'published', now(), now()),
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'Compilation and Execution Lifecycle: javac Source-to-Bytecode Compilation and java Bytecode Interpretation', 7, 'published', now(), now()),
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'Java Lexical Tokens: Reserved Keywords, Identifiers, Literals, Standard Operators, Separators', 8, 'published', now(), now()),
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'Primitive Data Types: Integral, Floating-Point, Character (Unicode 16-bit), Boolean, Sizes & Default Values', 9, 'published', now(), now()),
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'Variable Declarations, Scope, Lifetime & Type Casting (Widening/Implicit vs Narrowing/Explicit Conversions)', 10, 'published', now(), now()),
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'Operators & Expressions: Arithmetic, Relational, Logical, Bitwise, Assignment, Ternary, Operator Precedence', 11, 'published', now(), now()),
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'Decision Making & Branching: if, if-else, nested if, if-else-if Ladder, switch-case (Fall-through, break, default)', 12, 'published', now(), now()),
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'Iteration Constructs: while Loop (Entry-Controlled), do-while Loop (Exit-Controlled), for Loop, Enhanced for-each', 13, 'published', now(), now()),
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'Jump Statements: break Statement, continue Statement, return Statement & Labeled Break/Continue', 14, 'published', now(), now()),
  ('4e2a6856-906d-579c-bf99-d97570e06433', 'Command Line Arguments (String[] args) & Console I/O: System.out.println, System.in, java.util.Scanner', 15, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'Object-Oriented Programming Principles: Encapsulation, Data Abstraction, Inheritance, Polymorphism', 1, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'Class Definition in Java: Member Variables, Member Methods, Access Specifiers within Class', 2, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'Object Creation & Memory Layout: new Operator, Heap Allocation, Reference Variables in Stack', 3, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'Methods in Java: Declaration, Syntax, Return Types, Parameter Passing Semantics (Strict Pass-by-Value)', 4, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'Nesting of Methods & Method Overloading: Compile-Time Polymorphism via Argument Lists and Data Types', 5, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'Constructors in Java: Purpose, Default Constructor, Parameterized Constructors, Constructor Overloading', 6, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'The this Reference: Resolving Instance Variable Shadowing, Invoking Overloaded Constructors (this())', 7, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'Static Members: static Fields (Class-Level Storage), static Methods, Static Initialization Blocks', 8, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'Inheritance Fundamentals: Subclass and Superclass Concepts, extends Keyword, IS-A Relationship', 9, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'Forms of Inheritance: Single, Multilevel, Hierarchical (Why Multiple Inheritance of Classes is Disallowed)', 10, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'The super Keyword: Invoking Superclass Constructors (super()), Calling Overridden Superclass Methods', 11, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'Method Overriding: Runtime Polymorphism, Dynamic Method Dispatch, Rules and Method Signature Constraints', 12, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'The final Keyword: final Variables (Constants), final Methods (Preventing Override), final Classes', 13, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'Abstract Classes & Abstract Methods: Concept, abstract Keyword, Rules, Enforcing Contractual Implementations', 14, 'published', now(), now()),
  ('931ea332-3d62-5a88-845d-12d24fc111fe', 'Garbage Collection & Object Lifecycle: Heap Management, Object Dereferencing, System.gc(), finalize() Method', 15, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'Interfaces in Java: Concept of 100% Abstract Contract, interface Keyword, Public Static Final Constants', 1, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'Implementing Interfaces: implements Keyword, Multiple Interface Implementation (Resolving Multiple Inheritance)', 2, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'Extending Interfaces: Interface Inheritance, Nested Interfaces & Default/Static Methods in Interfaces', 3, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'Packages in Java: Meaning, Namespace Partitioning, Prevention of Name Collisions, Code Organization', 4, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'Standard Built-in Java API Packages: java.lang, java.util, java.io, java.net, java.awt, java.applet', 5, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'Creating and Using Custom Packages: package Statement, Directory Hierarchy, Compiling with -d Flag', 6, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'Importing Packages: import Statement, Specific Class Import vs Asterisk (*) Wildcard Import, Static Imports', 7, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'Package Access Protection: private, default (Package-Private), protected, public Access Modifiers Matrix', 8, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'Arrays in Java: One-Dimensional Arrays, Array Instantiation, Memory Contiguity, Length Property, Bounds Checking', 9, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'Multi-Dimensional Arrays: 2D Arrays, Matrix Allocations, Jagged (Ragged) Arrays in Java', 10, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'String Handling with java.lang.String: String Literals, String Constant Pool, Immutability Mechanics', 11, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'String Class Methods: length(), charAt(), substring(), indexOf(), equals(), compareTo(), concat(), trim()', 12, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'Mutable String Handlers: StringBuffer vs StringBuilder, Thread Safety, Buffer Growth, Mutability Methods', 13, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'Vector Class (java.util.Vector): Dynamic Array Architecture, Capacity Increment, Element Access, Synchronization', 14, 'published', now(), now()),
  ('465feec2-fa34-598c-948a-afaf21612f35', 'Wrapper Classes (java.lang): Primitive-to-Object Encapsulation, Autoboxing and Unboxing, Utility Conversion Methods', 15, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Errors vs Exceptions in Java: Syntactic/Logical Errors, System Errors vs Recoverable Exceptional Conditions', 1, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Exception Class Hierarchy: java.lang.Throwable, Error Subclasses, Exception Subclasses, RuntimeException', 2, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Checked Exceptions (Compile-Time Enforced) vs Unchecked Exceptions (Runtime unchecked)', 3, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Exception Handling Mechanism: try Block, catch Block, Execution Flow upon Exception Generation', 4, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Multiple Catch Statements: Specific-to-General Ordering Rules, Multi-Catch Syntax (Java 7+)', 5, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Nested Try-Catch Blocks: Scope of Inner and Outer Exception Handlers', 6, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'The finally Block: Execution Guarantee, Resource Deallocation Semantics, Execution with return Statements', 7, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Explicit Exception Generation: throw Statement, Re-throwing Exceptions', 8, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'The throws Clause: Exception Propagation, Method Header Declarations, Caller Responsibility', 9, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Custom / User-Defined Exceptions: Subclassing java.lang.Exception, Custom Error Messages and State', 10, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Multithreading Fundamentals: Process-Based vs Thread-Based Multitasking, Context Switching Advantages', 11, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Creating Threads: Extending java.lang.Thread Class vs Implementing java.lang.Runnable Interface', 12, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Thread Life Cycle & State Machine: New, Runnable, Blocked, Waiting, Timed Waiting, Terminated States', 13, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Thread Control Methods: start(), run(), sleep(), join(), yield(), interrupt(), isAlive()', 14, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Thread Priorities: MIN_PRIORITY (1), NORM_PRIORITY (5), MAX_PRIORITY (10), Preemptive Scheduling', 15, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Synchronization in Multithreading: Race Conditions, Critical Section, synchronized Methods & Blocks', 16, 'published', now(), now()),
  ('d26825c0-b0c3-5c75-9cfd-f9936187b430', 'Inter-Thread Communication: Object Monitor Locking, wait(), notify(), notifyAll(), Producer-Consumer Problem', 17, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'Java I/O Stream Model: Concept of Streaming Data, Sources and Sinks, Byte Streams vs Character Streams', 1, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'Byte Stream Class Hierarchy: java.io.InputStream and java.io.OutputStream Root Abstract Classes', 2, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'File Byte Streaming: FileInputStream and FileOutputStream for Reading and Writing Raw Binary/Text Data', 3, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'Buffered Byte Streaming: BufferedInputStream and BufferedOutputStream for Optimized Disk I/O', 4, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'Character Stream Class Hierarchy: java.io.Reader and java.io.Writer Root Abstract Classes, 16-bit Unicode Handling', 5, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'File Character Streaming: FileReader and FileWriter, Character Encoding Conventions', 6, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'Buffered Character Streaming: BufferedReader, BufferedWriter, readLine() and newLine() Methods', 7, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'Standard Console Input: InputStreamReader with BufferedReader, System.in Wrapping, System.console()', 8, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'Data Streams: DataInputStream and DataOutputStream for Primitive Binary Typed I/O (writeInt, readDouble)', 9, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'Object Serialization & Deserialization: ObjectOutputStream, ObjectInputStream, Serializable Marker Interface', 10, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'The transient Keyword: Excluding Sensitive Member Variables from Object Serialization', 11, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'File Class (java.io.File): Pathnames, File Metadata, exists(), isFile(), isDirectory(), length(), delete()', 12, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'Directory Management: mkdir(), mkdirs(), list(), listFiles() Operations on Filesystem Directories', 13, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'I/O Exception Handling: IOException, FileNotFoundException, EOFException, try-with-resources AutoCloseable', 14, 'published', now(), now()),
  ('b0a32c41-9236-5075-9a0d-cf0cc936d248', 'Modern Java NIO Preview: java.nio Package, Path, Paths, Files Utility Methods, High-Performance Buffers', 15, 'published', now(), now()),
  ('96e6e0ec-a7dc-5b08-818e-fb1320c77a03', 'Mathematical Modeling in Engineering & Computing: Formulation of Real-World Problems, Conservation Laws', 1, 'published', now(), now()),
  ('96e6e0ec-a7dc-5b08-818e-fb1320c77a03', 'Number Representation in Digital Computers: Floating-Point Format, Mantissa, Exponent, Machine Epsilon', 2, 'published', now(), now()),
  ('96e6e0ec-a7dc-5b08-818e-fb1320c77a03', 'Significant Figures: Rules for Identifying Significant Digits, Rounding-Off Rules', 3, 'published', now(), now()),
  ('96e6e0ec-a7dc-5b08-818e-fb1320c77a03', 'Accuracy vs Precision: Bias, Systematic Errors vs Random Inaccuracies in Numerical Methods', 4, 'published', now(), now()),
  ('96e6e0ec-a7dc-5b08-818e-fb1320c77a03', 'Error Definitions: Absolute Error (|True - Approx|), Relative Error, Percentage Error Formulas', 5, 'published', now(), now()),
  ('96e6e0ec-a7dc-5b08-818e-fb1320c77a03', 'Round-off Errors: Chopping vs Symmetric Rounding, Error Accumulation in Multi-Step Arithmetic', 6, 'published', now(), now()),
  ('96e6e0ec-a7dc-5b08-818e-fb1320c77a03', 'Truncation Errors: Error Arising from Replacing Infinite Mathematical Processes with Finite Approximations', 7, 'published', now(), now()),
  ('96e6e0ec-a7dc-5b08-818e-fb1320c77a03', 'Taylor Series Expansion: Statement, Formula, Remainder Term (Lagrange Form), Polynomial Approximation', 8, 'published', now(), now()),
  ('96e6e0ec-a7dc-5b08-818e-fb1320c77a03', 'Error Propagation: Error in Sum, Difference, Product, and Quotient of Numbers', 9, 'published', now(), now()),
  ('96e6e0ec-a7dc-5b08-818e-fb1320c77a03', 'Total Numerical Error: Interplay between Round-Off and Truncation Errors, Optimal Step Size Selection', 10, 'published', now(), now()),
  ('96e6e0ec-a7dc-5b08-818e-fb1320c77a03', 'Conditioning and Stability: Well-Posed Problems vs Ill-Conditioned Systems in Numerical Computation', 11, 'published', now(), now()),
  ('823861ed-afab-5d0c-95d1-2ce548d7fc04', 'Algebraic vs Transcendental Equations: Polynomial Roots, Trigonometric, Exponential, Logarithmic Equations', 1, 'published', now(), now()),
  ('823861ed-afab-5d0c-95d1-2ce548d7fc04', 'Initial Root Localization: Intermediate Value Theorem, Graphical and Tabular Sign-Change Detection', 2, 'published', now(), now()),
  ('823861ed-afab-5d0c-95d1-2ce548d7fc04', 'Bisection Method (Bolzano): Algorithm, Interval Halving, Guaranteed Convergence, Convergence Rate Analysis', 3, 'published', now(), now()),
  ('823861ed-afab-5d0c-95d1-2ce548d7fc04', 'Regula-Falsi Method (Method of False Position): Linear Secant Interpolation, Algorithm & Convergence Behavior', 4, 'published', now(), now()),
  ('823861ed-afab-5d0c-95d1-2ce548d7fc04', 'Secant Method: Open Two-Point Secant Iteration, Non-Bracketing Approach, Superlinear Convergence', 5, 'published', now(), now()),
  ('823861ed-afab-5d0c-95d1-2ce548d7fc04', 'Newton-Raphson Method: Derivation using Taylor Series, Tangent Iteration Formula x_{n+1} = x_n - f(x_n)/f''(x_n)', 6, 'published', now(), now()),
  ('823861ed-afab-5d0c-95d1-2ce548d7fc04', 'Convergence Analysis of Newton-Raphson: Quadratic Convergence Proof (Order 2), Failure Cases & Oscillations', 7, 'published', now(), now()),
  ('823861ed-afab-5d0c-95d1-2ce548d7fc04', 'Finite Differences: Forward Difference Operator (Delta), Backward Difference Operator (Nabla), Shift Operator (E)', 8, 'published', now(), now()),
  ('823861ed-afab-5d0c-95d1-2ce548d7fc04', 'Finite Difference Tables: Construction, Properties, Fundamental Theorem of Finite Differences', 9, 'published', now(), now()),
  ('823861ed-afab-5d0c-95d1-2ce548d7fc04', 'Newton''s Forward Difference Interpolation Formula: Derivation, Formula, Application for Interpolating Near Start', 10, 'published', now(), now()),
  ('823861ed-afab-5d0c-95d1-2ce548d7fc04', 'Newton''s Backward Difference Interpolation Formula: Derivation, Formula, Application for Interpolating Near End', 11, 'published', now(), now()),
  ('823861ed-afab-5d0c-95d1-2ce548d7fc04', 'Lagrange''s Interpolation Formula for Unequally Spaced Data: Lagrange Polynomials, Advantages, Limitations', 12, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Systems of Linear Algebraic Equations: Matrix Representation Ax = B, Consistency & Rank Conditions', 1, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Gauss Elimination Method: Forward Elimination to Upper Triangular Form, Back-Substitution', 2, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Gauss-Jordan Method: Complete Diagonalization / Identity Matrix Reduction, Matrix Inversion', 3, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Iterative Methods for Linear Systems: Jacobi Iteration Method, Diagonally Dominant Condition for Convergence', 4, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Gauss-Seidel Iteration Method: Immediate Update Mechanism, Accelerated Convergence over Jacobi Method', 5, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Numerical Differentiation: Derivatives using Newton''s Forward and Backward Difference Interpolation Polynomials', 6, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Numerical Integration Foundations: Newton-Cotes Quadrature Formulas, Trapezoidal Approximation', 7, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Trapezoidal Rule: Derivation (Linear Interpolant), Formula, Error Term (-h^3/12 * f''''(xi)), Composite Form', 8, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Simpson''s 1/3rd Rule: Derivation (Quadratic Interpolant, Even Subintervals), Formula, Error Term, Composite Form', 9, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Simpson''s 3/8th Rule: Derivation (Cubic Interpolant, Subintervals Multiple of 3), Formula, Composite Form', 10, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Ordinary Differential Equations (ODEs) Initial Value Problems: dy/dx = f(x, y), y(x0) = y0', 11, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Taylor''s Series Method for Solving 1st Order ODEs: Step-by-Step Expansion, High-Order Accuracy', 12, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Euler''s Method: Tangent Line Approximation y_{n+1} = y_n + h*f(x_n, y_n), Local and Global Truncation Errors', 13, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Modified Euler''s Method (Heun''s Predictor-Corrector): Predictor Step, Trapezoidal Corrector Step', 14, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Runge-Kutta 2nd Order Method (RK2): Derivation, Midpoint Formulation, Improved Accuracy over Euler', 15, 'published', now(), now()),
  ('438015e4-6f9e-53f3-b823-70f489c69f4e', 'Runge-Kutta 4th Order Method (RK4): Formulas for k1, k2, k3, k4, Weighted Average Slope, High-Precision Performance', 16, 'published', now(), now()),
  ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'Curve Fitting Fundamentals: Scatter Plots, Trend Lines, Interpolation vs Curve Fitting Approximation', 1, 'published', now(), now()),
  ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'Principle of Least Squares: Minimizing Sum of Squared Residuals (Errors) S = sum(y_i - f(x_i))^2', 2, 'published', now(), now()),
  ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'Linear Regression / Straight Line Fitting (y = a + bx): Derivation of Normal Equations, Slope and Intercept', 3, 'published', now(), now()),
  ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'Polynomial Regression / Parabolic Curve Fitting (y = a + bx + cx^2): Derivation of 3 Normal Equations', 4, 'published', now(), now()),
  ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'Fitting Exponential Curves (y = ae^(bx) and y = ab^x): Logarithmic Linearization Transformations', 5, 'published', now(), now()),
  ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'Fitting Power Curves (y = ax^b): Double-Logarithmic Linearization and Parameter Estimation', 6, 'published', now(), now()),
  ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'Multiple Linear Regression Overview: Dependent Variable with Two or More Independent Variables', 7, 'published', now(), now()),
  ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'Correlation Analysis: Karl Pearson''s Coefficient of Linear Correlation (r), Range [-1, +1], Interpretation', 8, 'published', now(), now()),
  ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'Rank Correlation: Spearman''s Rank Correlation Coefficient for Qualitative / Ranked Data', 9, 'published', now(), now()),
  ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'Linear Programming Problems (LPP): Components (Decision Variables, Objective Function, Constraints, Non-Negativity)', 10, 'published', now(), now()),
  ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'LPP Mathematical Formulation: Manufacturing, Diet, Transportation & Resource Allocation Enterprise Problems', 11, 'published', now(), now()),
  ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'Graphical Method for Solving LPP: Plotting Constraint Lines, Identifying Feasible Region (Bounded vs Unbounded)', 12, 'published', now(), now()),
  ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'Corner Point / Extreme Point Method: Evaluating Objective Function at Vertices, Multiple Optimal Solutions', 13, 'published', now(), now()),
  ('77327cbc-9bcf-5d52-b408-33b650aa393f', 'Infeasible and Unbounded Solutions in Linear Programming: Identification and Physical Interpretation', 14, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Random Variables: Definition, Sample Space Mapping, Discrete vs Continuous Random Variables', 1, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Probability Mass Function (PMF): Definition, Properties (P(X=x) >= 0, sum P(x) = 1), Cumulative Distribution Function (CDF)', 2, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Probability Density Function (PDF): Definition, Properties (f(x) >= 0, integral f(x)dx = 1), Cumulative Distribution Function', 3, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Mathematical Expectation (Expected Value): E(X) Formula for Discrete and Continuous Distributions, Properties of Expectation', 4, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Variance and Standard Deviation: Var(X) = E(X^2) - [E(X)]^2, Properties of Variance, Moments of Distributions', 5, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Discrete Uniform Distribution: PMF, Mean, Variance, Real-World Applications (Fair Die Toss)', 6, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Bernoulli Distribution: Single Trial with Success Probability p, Mean = p, Variance = pq', 7, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Binomial Distribution: Assumptions (n Independent Bernoulli Trials), PMF P(X=r) = nCr * p^r * q^(n-r)', 8, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Characteristics of Binomial Distribution: Mean = np, Variance = npq, Conditions (Mean > Variance), Practical Applications', 9, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Poisson Distribution: Rare Events Model, Limiting Form of Binomial Distribution (n -> inf, p -> 0, np = lambda)', 10, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Characteristics of Poisson Distribution: PMF P(X=r) = (e^(-lambda) * lambda^r) / r!, Mean = Variance = lambda', 11, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Continuous Uniform (Rectangular) Distribution: PDF, CDF, Mean = (a+b)/2, Variance = (b-a)^2 / 12', 12, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Exponential Distribution: Memoryless Property, PDF f(x) = lambda * e^(-lambda*x), Mean = 1/lambda, Reliability Models', 13, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Normal (Gaussian) Distribution: Bell-Shaped Curve, PDF Formula, Parameters Mean (mu) and Variance (sigma^2)', 14, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Properties of Normal Curve: Symmetry about Mean, Unimodal, Area Properties (Empirical Rule 68-95-99.7%)', 15, 'published', now(), now()),
  ('ea73fc67-550d-53f5-acd4-19053adb0116', 'Standard Normal Distribution (Z): Z-Score Transformation Z = (X - mu)/sigma, Standard Normal Probability Tables', 16, 'published', now(), now()),
  ('f96a6a0e-7b0e-5bb8-a668-d5dbbc2ee673', 'Operating System Definition: Extended Machine (Virtual Machine) vs Resource Manager Perspectives', 1, 'published', now(), now()),
  ('f96a6a0e-7b0e-5bb8-a668-d5dbbc2ee673', 'Primary Goals of Operating System: Convenience, Efficiency, Robustness, Hardware Abstraction', 2, 'published', now(), now()),
  ('f96a6a0e-7b0e-5bb8-a668-d5dbbc2ee673', 'Historical Evolution of Operating Systems: Serial Processing, Simple Batch Systems, Spooling Techniques', 3, 'published', now(), now()),
  ('f96a6a0e-7b0e-5bb8-a668-d5dbbc2ee673', 'Multiprogramming Systems: CPU-I/O Overlap, Memory Partitioning, High Resource Utilization', 4, 'published', now(), now()),
  ('f96a6a0e-7b0e-5bb8-a668-d5dbbc2ee673', 'Time-Sharing (Multitasking) Systems: Interactive Multi-User Support, Quantum Slicing, Low Response Time', 5, 'published', now(), now()),
  ('f96a6a0e-7b0e-5bb8-a668-d5dbbc2ee673', 'Distributed & Real-Time Operating Systems: Clustered Node Transparency, Hard vs Soft Real-Time Constraints', 6, 'published', now(), now()),
  ('f96a6a0e-7b0e-5bb8-a668-d5dbbc2ee673', 'Operating System Core Functions: Process, Memory, Storage, I/O Device, Security & User Interface Management', 7, 'published', now(), now()),
  ('f96a6a0e-7b0e-5bb8-a668-d5dbbc2ee673', 'Operating System Structural Architectures: Monolithic Kernel Architecture, Layered System Design', 8, 'published', now(), now()),
  ('f96a6a0e-7b0e-5bb8-a668-d5dbbc2ee673', 'Microkernel Architecture: Minimal Kernel Services, User-Space Server Daemons, Fault Isolation, Mach/QNX', 9, 'published', now(), now()),
  ('f96a6a0e-7b0e-5bb8-a668-d5dbbc2ee673', 'Dual-Mode Operation in Modern Hardware: User Mode vs Kernel/Supervisor Mode, Mode Bit, Protection Mechanisms', 10, 'published', now(), now()),
  ('f96a6a0e-7b0e-5bb8-a668-d5dbbc2ee673', 'System Calls: Hardware Trap Mechanism, User-to-Kernel Mode Switching, System Call Interface', 11, 'published', now(), now()),
  ('f96a6a0e-7b0e-5bb8-a668-d5dbbc2ee673', 'Categories of System Calls: Process Control (fork, exec), File Manipulation, Device Management, Information Maintenance', 12, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'Process Concept: Process Definition, Program vs Process, Memory Layout (Text, Data, Stack, Heap Segments)', 1, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'Process States & 5-State Transition Model: New, Ready, Running, Waiting (Blocked), Terminated', 2, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'Process Control Block (PCB): Structure, Task Attributes (PID, Program Counter, CPU Registers, Memory Limits, Open Files)', 3, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'Process Context Switching: Hardware State Saving, Cache Invalidation Overhead, Performance Impact', 4, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'Process Scheduling Queues: Job Queue, Ready Queue, Device/I/O Queues, Queue Transition Flow', 5, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'Schedulers in Operating Systems: Long-Term (Admission), Short-Term (CPU), Medium-Term (Swapping) Schedulers', 6, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'Process Creation & Termination: Process Trees, parent-child Relationships, fork() and exec() System Calls, Zombie/Orphan Processes', 7, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'Threads Fundamentals: Definition, Light-Weight Processes (LWP), Resource Sharing Benefits, Thread vs Process', 8, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'Multithreading Models: Many-to-One, One-to-One (Standard in Linux/Windows), Many-to-Many Kernel Models', 9, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'CPU Scheduling Concepts: Preemptive vs Non-Preemptive Scheduling Policies, Dispatcher Latency', 10, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'Scheduling Criteria: CPU Utilization, Throughput, Turnaround Time, Waiting Time, Response Time', 11, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'First-Come, First-Served (FCFS) Scheduling: Algorithm, Convoy Effect, Average Waiting Time Evaluation', 12, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'Shortest Job First (SJF) Scheduling: Non-Preemptive SJF, Preemptive SJF (Shortest Remaining Time First - SRTF), Starvation', 13, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'Priority Scheduling: Static vs Dynamic Priorities, Internal vs External Priorities, Starvation & Aging Solution', 14, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'Round Robin (RR) Scheduling: Time Quantum Selection Trade-offs, Response Time Optimization, Context Switch Overhead', 15, 'published', now(), now()),
  ('0208c6e1-bb32-524b-a374-2ad1b17373fe', 'Multilevel Queue & Multilevel Feedback Queue Scheduling: Separation of Foreground/Background Processes, Feedback Upgrading', 16, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Memory Management Overview: Memory Allocation Strategies, Address Space Protection & Sharing', 1, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Address Binding: Compile Time, Load Time, and Execution/Run Time Dynamic Address Binding', 2, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Logical vs Physical Address Space: Memory Management Unit (MMU), Base and Relocation Registers', 3, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Dynamic Loading & Dynamic Linking: Shared Libraries (.dll / .so), Memory Footprint Minimization', 4, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Contiguous Memory Allocation: Single Partition vs Fixed Multiple Partitions (MFT) vs Variable Partitions (MVT)', 5, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Dynamic Storage Allocation Algorithms: First-Fit, Best-Fit, Worst-Fit Algorithms & Comparative Performance', 6, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Fragmentation: Internal Fragmentation (Inside Allocation Blocks) vs External Fragmentation (Scattered Holes)', 7, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Compaction & Swapping: Relocation of Running Programs, Swapping Out to Backing Store', 8, 'published', now(), now());

INSERT INTO public.syllabus_topics (unit_id, title, sort_order, status, created_at, updated_at) VALUES
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Paging Architecture: Non-Contiguous Allocation, Logical Pages, Physical Frames, Page Table Architecture', 9, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Hardware Implementation of Page Tables: Page Table Base Register (PTBR), Translation Lookaside Buffer (TLB)', 10, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Effective Memory Access Time (EMAT) with TLB: Hit Ratio Calculation Formula', 11, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Segmentation: User-View of Memory, Segment Table (Base, Limit), Segment Registers, Protection Bits', 12, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Virtual Memory Concept: Execution of Partially Loaded Programs, Separation of Logical Memory from Physical Memory', 13, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Demand Paging: Pure Demand Paging, Lazy Swapper / Pager, Valid-Invalid Bit in Page Table', 14, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Page Fault Handling Procedure: Hardware Trap, OS Page Fault Handler, Disk Fetch to Free Frame, Table Update, Restart', 15, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Page Replacement Algorithms: First-In-First-Out (FIFO) & Belady''s Anomaly Demonstration', 16, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Optimal (OPT) Page Replacement: Theoretical Lower Bound Benchmark (Replacing Page Not Used for Longest Time)', 17, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Least Recently Used (LRU) Page Replacement: Approximation using Counter and Stack Implementations', 18, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Second-Chance (Clock) Algorithm: Reference Bit Mechanics, Cyclic Scanner Implementation', 19, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Thrashing: Definition, Cause (High Paging Rate, Low CPU Utilization), Degree of Multiprogramming Collapse', 20, 'published', now(), now()),
  ('0557765b-dbac-5908-a7f3-49ade77d15ca', 'Working-Set Model (Peter Denning): Working-Set Window (Delta), Working-Set Size (WSS), Preventing Thrashing', 21, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'Concurrent Processes: Cooperating vs Independent Processes, Shared Memory & Message Passing Communication', 1, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'The Critical Section Problem: Race Conditions, Producer-Consumer Buffer Counter Problem', 2, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'Requirements for Solutions to Critical Section: Mutual Exclusion, Progress, Bounded Waiting', 3, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'Software Solutions: Peterson''s Algorithm for Two Processes, Correctness Proof (Mutual Exclusion, Progress, Bounded Waiting)', 4, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'Hardware-Assisted Synchronization: Atomic Instructions (Test-and-Set, Compare-and-Swap)', 5, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'Semaphores: Dijkstra''s Primitive, Counting Semaphores vs Binary Semaphores (Mutexes)', 6, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'Semaphore Operations: wait() / P() and signal() / V() Atomic Implementations, Spinlock vs Blocking Semaphores', 7, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'Classical Synchronization Problems: Bounded-Buffer (Producer-Consumer) Problem using Semaphores', 8, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'The Readers-Writers Problem: Reader Priority vs Writer Priority, Starvation Mitigation', 9, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'The Dining Philosophers Problem: Resource Allocation Deadlock, Deadlock-Free Symmetric Solutions', 10, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'Monitors: High-Level Language Synchronization Construct, Condition Variables (wait, signal)', 11, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'Deadlock Definition: Necessary Coffman Conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait)', 12, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'Resource Allocation Graphs (RAG): Request Edges, Assignment Edges, Cycle Detection in Single vs Multi-Instance Systems', 13, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'Deadlock Prevention: Negating Coffman Conditions (Eliminating Hold & Wait, Preempting Resources, Linear Ordering of Resources)', 14, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'Deadlock Avoidance & Safe State: Concept of Safe Sequences, System Transition State Trajectory', 15, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'Banker''s Algorithm (Edsger Dijkstra): Data Structures (Available, Max, Allocation, Need), Safety and Resource-Request Algorithms', 16, 'published', now(), now()),
  ('a4e35aa8-a89b-5fbf-aa72-ac386118b06c', 'Deadlock Detection & Recovery: Wait-For Graphs for Single Instances, Matrix Detection Algorithm, Process Termination & Rollback', 17, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'File Concept: Logical Storage Abstraction, File Attributes (Name, Identifier, Type, Location, Size, Protection)', 1, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'File Operations: Create, Open, Read, Write, Seek/Reposition, Delete, Truncate, Close', 2, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'File Access Methods: Sequential Access (Tape/Card Model), Direct / Random Access (Fixed-Length Records), Indexed Access', 3, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'Directory Structures: Single-Level Directory, Two-Level Directory, Tree-Structured Hierarchical Directory', 4, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'Acyclic-Graph & General Graph Directories: Hard Links vs Symbolic (Soft) Links, Shared Subdirectories, Reference Cycles', 5, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'File System Mounting & File Protection: Access Control Lists (ACL), Unix Permission Bits (Read, Write, Execute for Owner, Group, Others)', 6, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'File Allocation Methods: Contiguous Allocation (External Fragmentation, Compaction, File Growth Issues)', 7, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'Linked Allocation: Pointer-Chained Disk Blocks, No External Fragmentation, Elimination of Random Access', 8, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'Indexed Allocation: Direct Index Blocks, Multi-Level Indexing, Combined Schemes (UNIX Inode Architecture)', 9, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'Free Space Management: Bit Vector (Bitmap), Linked Free List, Grouping, Counting Methods', 10, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'Physical Disk Geometry: Platters, Surfaces, Tracks, Sectors, Cylinders, Read/Write Heads, Rotational Latency, Seek Time', 11, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'Disk Head Scheduling Concept: Minimizing Seek Time and Head Travel Distance Across Cylinders', 12, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'First-Come, First-Served (FCFS) Disk Scheduling: Algorithm, Head Traversal Calculation, Fair but Suboptimal Performance', 13, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'Shortest Seek Time First (SSTF) Disk Scheduling: Algorithm, Head Traversal Calculation, Starvation Risks for Outlying Requests', 14, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'SCAN (Elevator) Scheduling: Unidirectional Cylinder Traversal to Boundary, Boundary Reversal', 15, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'C-SCAN (Circular SCAN) Scheduling: Unidirectional Sweep with Immediate Return to Start, Uniform Waiting Time Distribution', 16, 'published', now(), now()),
  ('140212af-3260-552c-9308-e371e626b20e', 'LOOK and C-LOOK Disk Scheduling: Optimizing SCAN and C-SCAN by Limiting Sweep to Final Active Request', 17, 'published', now(), now()),
  ('93dbb129-6c97-521e-a8f0-4c4f8c12475c', 'Computer Organization vs Computer Architecture: Functional Structure vs Programmer-Visible Attributes', 1, 'published', now(), now()),
  ('93dbb129-6c97-521e-a8f0-4c4f8c12475c', 'Von Neumann Architecture & Stored Program Concept: Unified Memory for Code and Data, Sequential Fetch Cycle', 2, 'published', now(), now()),
  ('93dbb129-6c97-521e-a8f0-4c4f8c12475c', 'Components of a Digital Computer: Processing Unit, Memory Unit, Input/Output Subsystem, System Bus', 3, 'published', now(), now()),
  ('93dbb129-6c97-521e-a8f0-4c4f8c12475c', 'Machine Instructions: Operation Codes (Opcodes), Operands, Addressing Information, Instruction Word Format', 4, 'published', now(), now()),
  ('93dbb129-6c97-521e-a8f0-4c4f8c12475c', 'Computer Registers: Program Counter (PC), Memory Address Register (MAR), Memory Data Register (MDR/MBR)', 5, 'published', now(), now()),
  ('93dbb129-6c97-521e-a8f0-4c4f8c12475c', 'Instruction Register (IR), Accumulator (AC), Temporary Registers (TR), Input/Output Registers (INPR/OUTR)', 6, 'published', now(), now()),
  ('93dbb129-6c97-521e-a8f0-4c4f8c12475c', 'Common Bus System: Multiplexer-Based vs Tri-State Buffer Based Internal Bus Interconnections', 7, 'published', now(), now()),
  ('93dbb129-6c97-521e-a8f0-4c4f8c12475c', 'Instruction Execution Cycle: Fetch, Decode, Read Effective Address (Indirect Address Phase), Execute, Interrupt Check', 8, 'published', now(), now()),
  ('93dbb129-6c97-521e-a8f0-4c4f8c12475c', 'Register Transfer Language (RTL): Symbolic Representation of Microoperations (Arithmetic, Logic, Shift)', 9, 'published', now(), now()),
  ('93dbb129-6c97-521e-a8f0-4c4f8c12475c', 'Control Unit Architecture: Hardwired Control Unit (Combinational Logic, State Counters, Decoders, Fast Execution)', 10, 'published', now(), now()),
  ('93dbb129-6c97-521e-a8f0-4c4f8c12475c', 'Microprogrammed Control Unit: Control Memory (ROM), Control Address Register (CAR), Microinstruction Formats, Flexibility', 11, 'published', now(), now()),
  ('93dbb129-6c97-521e-a8f0-4c4f8c12475c', 'General Purpose Register (GPR) Organization: Register Set, Bus Multiplexers, ALU Interface, Control Word Structure', 12, 'published', now(), now()),
  ('0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', 'Instruction Format Architecture: Three-Address, Two-Address, One-Address (Accumulator), Zero-Address (Stack) Instructions', 1, 'published', now(), now()),
  ('0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', 'Instruction Types: Data Transfer, Data Manipulation (Arithmetic, Logical, Shift), Program Control (Branches, Subroutines)', 2, 'published', now(), now()),
  ('0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', 'Addressing Modes: Purpose (Relocatability, Pointer Indexing, Memory Saving)', 3, 'published', now(), now()),
  ('0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', 'Immediate Addressing Mode: Operand Specified Explicitly Inside Instruction Word', 4, 'published', now(), now()),
  ('0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', 'Direct Addressing Mode: Instruction Contains Memory Address of Target Operand', 5, 'published', now(), now()),
  ('0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', 'Indirect Addressing Mode: Instruction Points to Memory Location Containing Actual Target Address', 6, 'published', now(), now()),
  ('0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', 'Register Addressing & Register Indirect Addressing Modes: High-Speed Register Access and Pointer Manipulation', 7, 'published', now(), now()),
  ('0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', 'Relative Addressing Mode: Program Counter (PC) Relative Offset, Branching Efficiency', 8, 'published', now(), now()),
  ('0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', 'Indexed Addressing Mode: Base Register + Index Register Calculation, Array Traversal', 9, 'published', now(), now()),
  ('0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', 'Base Register Addressing Mode: Segment Base + Displacement, Dynamic Program Relocation', 10, 'published', now(), now()),
  ('0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', 'Auto-Increment and Auto-Decrement Addressing Modes: Stack Pointer and Sequential Array Handling', 11, 'published', now(), now()),
  ('0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', 'Reduced Instruction Set Computer (RISC) vs Complex Instruction Set Computer (CISC) Paradigms', 12, 'published', now(), now()),
  ('0cd7f2eb-eb8d-5f4e-8ca9-4e22f15f6a32', 'Modern Multi-core Microprocessor Architecture: Shared L3 Cache, Point-to-Point Interconnects (QPI), Simultaneous Multithreading', 13, 'published', now(), now()),
  ('a9c00073-9807-52cd-b535-a2fdc7334f89', 'Memory Hierarchy: Speed, Capacity, Cost Trade-Offs (Registers, Cache, Main Memory, Secondary Storage)', 1, 'published', now(), now()),
  ('a9c00073-9807-52cd-b535-a2fdc7334f89', 'Main Memory Organization: RAM (SRAM vs DRAM Cells) and ROM (PROM, EPROM, EEPROM, Flash Memory)', 2, 'published', now(), now()),
  ('a9c00073-9807-52cd-b535-a2fdc7334f89', 'Memory Chip Internal Architecture: Memory Address Decoding, Coincident Decoding, Chip Select Logic', 3, 'published', now(), now()),
  ('a9c00073-9807-52cd-b535-a2fdc7334f89', 'Auxiliary / Secondary Memory: Magnetic Hard Drives, Optical Discs, Solid-State Drives (NAND Flash Architecture)', 4, 'published', now(), now()),
  ('a9c00073-9807-52cd-b535-a2fdc7334f89', 'Associative Memory (Content Addressable Memory - CAM): Parallel Comparison Hardware, Match Logic, Fast Table Lookups', 5, 'published', now(), now()),
  ('a9c00073-9807-52cd-b535-a2fdc7334f89', 'Cache Memory Fundamentals: Principle of Locality of Reference (Temporal Locality vs Spatial Locality)', 6, 'published', now(), now()),
  ('a9c00073-9807-52cd-b535-a2fdc7334f89', 'Cache Mapping Techniques: Direct Mapping (Index, Tag, Block Offset, Conflict Misses)', 7, 'published', now(), now()),
  ('a9c00073-9807-52cd-b535-a2fdc7334f89', 'Associative Mapping: Tag-Data Pairs, Zero Conflict Misses, Expensive Hardware Associative Comparator', 8, 'published', now(), now()),
  ('a9c00073-9807-52cd-b535-a2fdc7334f89', 'Set-Associative Mapping: K-Way Partitioning, Compromise between Direct and Fully Associative Schemes', 9, 'published', now(), now()),
  ('a9c00073-9807-52cd-b535-a2fdc7334f89', 'Cache Write Policies: Write-Through (Consistent Memory, Slower Writes) vs Write-Back (Dirty Bit, Higher Speed)', 10, 'published', now(), now()),
  ('a9c00073-9807-52cd-b535-a2fdc7334f89', 'Cache Replacement Policies: Least Recently Used (LRU), First-In-First-Out (FIFO), Random Replacement', 11, 'published', now(), now()),
  ('a9c00073-9807-52cd-b535-a2fdc7334f89', 'Virtual Memory Architecture: Page-Based Virtual Address Translation, Page Faults, Demand Paging Hardware Support', 12, 'published', now(), now()),
  ('5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', 'Peripheral Devices: Input Devices, Output Devices, Electromechanical vs Electronic Operating Speeds', 1, 'published', now(), now()),
  ('5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', 'I/O Interface: Need for Interface (Speed Discrepancy, Data Format Differences, Operating Mode Disparities)', 2, 'published', now(), now()),
  ('5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', 'I/O Bus vs Memory Bus: Isolated I/O (Separate I/O Instructions, IN/OUT) vs Memory-Mapped I/O (Unified Address Space)', 3, 'published', now(), now()),
  ('5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', 'Asynchronous Data Transfer: Strobe Control Protocol (Source-Initiated vs Destination-Initiated Strobe)', 4, 'published', now(), now()),
  ('5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', 'Handshaking Data Transfer Protocol: Source-Initiated vs Destination-Initiated Two-Way Handshake with Timing Diagrams', 5, 'published', now(), now()),
  ('5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', 'Modes of Data Transfer: Programmed I/O (Polling Loop, Inefficient CPU Busy-Waiting)', 6, 'published', now(), now()),
  ('5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', 'Interrupt-Initiated I/O: Hardware Interrupt Signal, Interrupt Service Routine (ISR), Context Saving', 7, 'published', now(), now()),
  ('5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', 'Priority Interrupt System: Daisy-Chaining Priority Resolution (Hardware Serial Connection)', 8, 'published', now(), now()),
  ('5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', 'Parallel Priority Interrupt: Priority Encoder, Mask Register, Interrupt Status Register', 9, 'published', now(), now()),
  ('5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', 'Direct Memory Access (DMA): Need for DMA in Block Transfers, Stealing CPU Bus Cycles (Cycle Stealing vs Burst Mode)', 10, 'published', now(), now()),
  ('5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', 'DMA Controller (DMAC) Internal Architecture: Address Register, Word Count Register, Control Register, Bus Grant (BG)', 11, 'published', now(), now()),
  ('5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', 'Input-Output Processor (IOP): Dedicated I/O Channels, Autonomous Channel Programs, Mainframe Architecture', 12, 'published', now(), now()),
  ('5fd1ea7a-96ef-5298-9dd9-0eecba20ee0c', 'Serial Communication Protocols: Synchronous vs Asynchronous Serial Transmission, Baud Rate, Parity, Start/Stop Bits', 13, 'published', now(), now()),
  ('42200db4-826d-5c33-ab77-08c632943b9e', 'Parallel Processing Concept: Concurrent Data Processing, Spatial vs Temporal Parallelism', 1, 'published', now(), now()),
  ('42200db4-826d-5c33-ab77-08c632943b9e', 'Flynn''s Hardware Classification: SISD (Single Instruction Single Data), SIMD (Vector/Array Processors)', 2, 'published', now(), now()),
  ('42200db4-826d-5c33-ab77-08c632943b9e', 'Flynn''s MISD (Multiple Instruction Single Data) and MIMD (Multiple Instruction Multiple Data / Multiprocessors)', 3, 'published', now(), now()),
  ('42200db4-826d-5c33-ab77-08c632943b9e', 'Pipelining Fundamentals: Overlapping Execution Stages, Industrial Assembly Line Analogy', 4, 'published', now(), now()),
  ('42200db4-826d-5c33-ab77-08c632943b9e', 'Space-Time Diagram for Pipelining: Segment Clock Cycles, Throughput Evaluation, Latency', 5, 'published', now(), now()),
  ('42200db4-826d-5c33-ab77-08c632943b9e', 'Pipelining Metrics: Speedup Ratio S_k = (n * t_n) / ((k + n - 1) * t_k), Efficiency, Maximum Theoretical Speedup (k)', 6, 'published', now(), now()),
  ('42200db4-826d-5c33-ab77-08c632943b9e', 'Arithmetic Pipeline: Floating-Point Addition/Subtraction Multi-Stage Pipeline (Compare Exponents, Align, Add, Normalize)', 7, 'published', now(), now()),
  ('42200db4-826d-5c33-ab77-08c632943b9e', 'Instruction Pipeline: Four-Stage Pipeline (Fetch Instruction FI, Decode Instruction DA, Fetch Operand FO, Execute EX)', 8, 'published', now(), now()),
  ('42200db4-826d-5c33-ab77-08c632943b9e', 'Pipeline Hazards: Structural Hazards (Hardware Resource Conflicts)', 9, 'published', now(), now()),
  ('42200db4-826d-5c33-ab77-08c632943b9e', 'Data Hazards: Data Dependencies (Read-After-Write RAW, Write-After-Read WAR, Write-After-Write WAW), Forwarding Solution', 10, 'published', now(), now()),
  ('42200db4-826d-5c33-ab77-08c632943b9e', 'Control / Branch Hazards: Unconditional and Conditional Branch Penalties, Pipeline Flushes, Branch Prediction Techniques', 11, 'published', now(), now()),
  ('42200db4-826d-5c33-ab77-08c632943b9e', 'Amdahl''s Law: Theoretical Speedup Limit of Parallel Systems Based on Serial Fraction S = 1 / ((1 - P) + P / N)', 12, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Sets and Elements: Set Notations, Universal Set, Empty (Null) Set, Singleton Sets, Subsets and Supersets', 1, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Set Operations: Union, Intersection, Difference, Symmetric Difference, Absolute and Relative Complements', 2, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Venn Diagrams and Visual Set Representations: Modeling Multi-Set Relationships', 3, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Laws of Set Algebra: Idempotent, Associative, Commutative, Distributive, Identity, De Morgan''s Laws', 4, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Principle of Duality in Set Theory and Boolean Structures', 5, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Partially Ordered Sets (Posets): Partial Order Relation (Reflexive, Anti-Symmetric, Transitive)', 6, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Hasse Diagrams: Visualizing Posets, Construction Rules, Covering Relations', 7, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Extremal Elements in Posets: Maximal, Minimal, Greatest (Maximum), and Least (Minimum) Elements', 8, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Bounds in Posets: Upper Bounds, Lower Bounds, Least Upper Bound (LUB / Supremum / Join), Greatest Lower Bound (GLB / Infimum / Meet)', 9, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Lattices as Algebraic Systems: Definition as Poset where every Pair has LUB and GLB (a v b, a ^ b)', 10, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Properties of Lattices: Idempotency, Commutativity, Associativity, Absorption Laws', 11, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Special Lattices: Distributive Lattices, Complemented Lattices, Bounded Lattices', 12, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Boolean Algebra Foundations: Definition as a Complemented Distributive Lattice (B, +, *, '', 0, 1)', 13, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Uniqueness of Finite Boolean Algebras: Isomorphism to Power Set Boolean Algebra (Cardinality 2^n)', 14, 'published', now(), now()),
  ('64ceb1cb-1e27-503e-abd6-757dd220abf4', 'Boolean Functions & Boolean Expressions: Truth Values, Sum-of-Products (SOP), Product-of-Sums (POS) Normal Forms', 15, 'published', now(), now()),
  ('fc7b0943-6502-577f-9b55-ba67821c4b0a', 'Propositions: Declarative Statements, Truth Values (True/False), Atomic vs Compound Propositions', 1, 'published', now(), now()),
  ('fc7b0943-6502-577f-9b55-ba67821c4b0a', 'Basic Logical Connectives: Negation (NOT ~), Conjunction (AND ^), Disjunction (OR v)', 2, 'published', now(), now()),
  ('fc7b0943-6502-577f-9b55-ba67821c4b0a', 'Conditional (Implication ->) and Biconditional (<->) Statements: Truth Tables, Antecedents and Consequents', 3, 'published', now(), now()),
  ('fc7b0943-6502-577f-9b55-ba67821c4b0a', 'Converse, Inverse, and Contrapositive of Conditional Statements: Logical Equivalence Proof of Implication and Contrapositive', 4, 'published', now(), now()),
  ('fc7b0943-6502-577f-9b55-ba67821c4b0a', 'Truth Tables for Complex Logical Formulas: Construction and Step-by-Step Evaluation', 5, 'published', now(), now()),
  ('fc7b0943-6502-577f-9b55-ba67821c4b0a', 'Tautologies, Contradictions, and Contingencies: Definitions, Truth Table Identification', 6, 'published', now(), now()),
  ('fc7b0943-6502-577f-9b55-ba67821c4b0a', 'Logical Equivalence: Equivalence Laws (Identity, Domination, Double Negation, De Morgan''s Laws for Logic)', 7, 'published', now(), now()),
  ('fc7b0943-6502-577f-9b55-ba67821c4b0a', 'Algebra of Propositions: Simplifying Boolean Propositional Expressions using Logical Equivalences', 8, 'published', now(), now()),
  ('fc7b0943-6502-577f-9b55-ba67821c4b0a', 'Rules of Inference: Modus Ponens, Modus Tollens, Hypothetical Syllogism, Disjunctive Syllogism, Resolution', 9, 'published', now(), now()),
  ('fc7b0943-6502-577f-9b55-ba67821c4b0a', 'Valid and Invalid Arguments: Fallacies, Testing Argument Validity via Truth Tables and Derivation Rules', 10, 'published', now(), now()),
  ('fc7b0943-6502-577f-9b55-ba67821c4b0a', 'Predicate Logic & Propositional Functions: Variables, Predicates P(x), Domain of Discourse', 11, 'published', now(), now()),
  ('fc7b0943-6502-577f-9b55-ba67821c4b0a', 'Quantifiers: Universal Quantifier (For All), Existential Quantifier (There Exists)', 12, 'published', now(), now()),
  ('fc7b0943-6502-577f-9b55-ba67821c4b0a', 'Negation of Quantified Statements: De Morgan''s Laws for Quantifiers (~(For All x P(x)) <=> There Exists x ~P(x))', 13, 'published', now(), now()),
  ('fc7b0943-6502-577f-9b55-ba67821c4b0a', 'Normal Forms in Propositional Logic: Disjunctive Normal Form (DNF) and Conjunctive Normal Form (CNF)', 14, 'published', now(), now()),
  ('94294521-6157-5d4f-9937-0600e47a0186', 'Fundamental Principles of Counting: Addition Principle (Rule of Sum) and Multiplication Principle (Rule of Product)', 1, 'published', now(), now()),
  ('94294521-6157-5d4f-9937-0600e47a0186', 'Factorial Notation: n!, Properties, Recursive Definition 0! = 1', 2, 'published', now(), now()),
  ('94294521-6157-5d4f-9937-0600e47a0186', 'Permutations: Linear Permutations of n Distinct Objects, Formulas P(n, r) = n! / (n - r)!', 3, 'published', now(), now()),
  ('94294521-6157-5d4f-9937-0600e47a0186', 'Permutations with Repetition: Objects Not All Distinct (n! / (n1! * n2! * ... * nk!))', 4, 'published', now(), now()),
  ('94294521-6157-5d4f-9937-0600e47a0186', 'Circular Permutations: Arrangements in a Circle ((n - 1)! for Distinct Sense, (n - 1)! / 2 for Reversible)', 5, 'published', now(), now()),
  ('94294521-6157-5d4f-9937-0600e47a0186', 'Combinations: Selection without Regard to Order, Formula C(n, r) = n! / (r! * (n - r)!)', 6, 'published', now(), now()),
  ('94294521-6157-5d4f-9937-0600e47a0186', 'Combinatorial Identities: Symmetry Identity C(n, r) = C(n, n-r), Pascal''s Identity C(n, r) + C(n, r-1) = C(n+1, r)', 7, 'published', now(), now()),
  ('94294521-6157-5d4f-9937-0600e47a0186', 'Binomial Theorem for Positive Integral Index: Statement, Expansion Formula, Pascal''s Triangle Geometry', 8, 'published', now(), now()),
  ('94294521-6157-5d4f-9937-0600e47a0186', 'Key Terms in Binomial Expansions: General (r+1)th Term Formula T_{r+1} = nCr * a^(n-r) * b^r', 9, 'published', now(), now()),
  ('94294521-6157-5d4f-9937-0600e47a0186', 'Determination of Middle Term(s) in Binomial Expansion (n is Even vs n is Odd)', 10, 'published', now(), now()),
  ('94294521-6157-5d4f-9937-0600e47a0186', 'Term Independent of Variable (Constant Term) and Finding Specific Coefficients in Expansions', 11, 'published', now(), now()),
  ('94294521-6157-5d4f-9937-0600e47a0186', 'Pigeonhole Principle: Basic Statement, Generalized Pigeonhole Principle, Applications to Discrete Sets', 12, 'published', now(), now()),
  ('94294521-6157-5d4f-9937-0600e47a0186', 'Recurrence Relations: First-Order and Second-Order Linear Homogeneous Recurrence Relations with Constant Coefficients', 13, 'published', now(), now()),
  ('94294521-6157-5d4f-9937-0600e47a0186', 'Solving Recurrence Relations: Characteristic Equation Method, Fibonacci Sequence Closed-Form Derivation', 14, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Binary Operations: Definition on a Set, Closure Property, Commutativity, Associativity, Distributivity', 1, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Identity and Invertible Elements: Existence of Unique Identity Element, Inverse of an Element', 2, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Algebraic Structures Hierarchy: Groupoids (Closure), Semigroups (Closure + Associativity)', 3, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Monoids: Semigroups with Identity Element, Matrix and String Monoids', 4, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Groups: Definition, Four Group Axioms (Closure, Associativity, Identity, Inverses)', 5, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Abelian (Commutative) Groups: Definition, Examples (Integer Addition (Z, +), Real Multiplication (R*, *))', 6, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Finite Groups and Group Order: Order of a Group |G|, Order of an Element o(a), Group Multiplication Tables (Cayley Tables)', 7, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Subgroups: Definition, Necessary and Sufficient Conditions for a Subset to be a Subgroup (Two-Step and One-Step Subgroup Tests)', 8, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Cyclic Groups: Generator Elements, Properties of Cyclic Groups, Subgroups of Cyclic Groups', 9, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Cosets: Left Cosets (aH) and Right Cosets (Ha), Properties of Cosets, Partitioning of Group into Disjoint Cosets', 10, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Lagrange''s Theorem: Statement (Order of Subgroup Divides Order of Finite Group), Proof and Corollaries', 11, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Normal Subgroups: Definition (gH = Hg for all g in G), Criterion for Normal Subgroups, Quotient (Factor) Groups', 12, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Group Homomorphisms: Definition (f(ab) = f(a)f(b)), Kernel of Homomorphism, Group Isomorphisms (Fundamental Theorem)', 13, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Burnside''s Lemma / Theorem: Orbits, Stabilizers, Orbit-Counting Theorem for Combinatorial Symmetries', 14, 'published', now(), now()),
  ('3c40208d-2d50-5404-bdb1-936bbe24f1c1', 'Applications of Group Theory to Coding: Binary Symmetric Channels, Group Codes, Generator and Parity-Check Matrices', 15, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Graph Fundamentals: Definition G = (V, E), Vertices, Edges, Directed Graphs (Digraphs) vs Undirected Graphs', 1, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Graph Terminology: Adjacent Vertices, Incident Edges, Degree of a Vertex (deg(v)), In-degree and Out-degree', 2, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Handshaking Theorem (Euler): Sum of Degrees of all Vertices = 2 * |E|, Proof and Corollaries (Number of Odd Vertices is Even)', 3, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Types of Graphs: Simple Graphs, Multigraphs, Pseudographs (Self-Loops and Parallel Edges)', 4, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Special Families of Simple Graphs: Complete Graphs (K_n), Cycle Graphs (C_n), Wheel Graphs (W_n), Regular Graphs (k-regular)', 5, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Bipartite Graphs: Definition, Characterization (Graph is Bipartite iff it has No Odd Cycles), Complete Bipartite Graphs (K_{m,n})', 6, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Subgraphs, Isomorphic Graphs, and Homeomorphic Graphs: Invariants of Graph Isomorphism', 7, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Walks, Trails, Paths, and Cycles: Connected Graphs, Connected Components, Cut-Points (Articulation Points) and Bridges', 8, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Eulerian Graphs: Eulerian Trail, Eulerian Circuit, Euler''s Theorem (Connected Graph is Eulerian iff Every Vertex has Even Degree)', 9, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Hamiltonian Graphs: Hamiltonian Path, Hamiltonian Cycle, Dirac''s Theorem and Ore''s Theorem Criteria', 10, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Planar Graphs: Euler''s Planar Formula V - E + F = 2, Non-Planar Graphs, Kuratowski''s Theorem (K_5 and K_{3,3})', 11, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Graph Coloring: Vertex Coloring, Chromatic Number chi(G), The Famous Four Color Theorem', 12, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Tree Fundamentals: Definition as Connected Acyclic Graph, Equivalent Characterizations of Trees (n vertices, n-1 edges)', 13, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Spanning Trees: Definition, Existence in Connected Graphs, Fundamental Cycles and Fundamental Cutsets', 14, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Minimum Spanning Tree (MST) Algorithms: Kruskal''s Greedy Algorithm (Disjoint Set Union) and Prim''s Algorithm', 15, 'published', now(), now()),
  ('4612b805-4412-5c85-8a70-f2066b6e18dd', 'Matrix Representations of Graphs: Adjacency Matrix (A), Properties of Adjacency Matrix Powers, Incidence Matrix (M)', 16, 'published', now(), now());

COMMIT;