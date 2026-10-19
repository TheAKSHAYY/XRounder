BEGIN;
-- Update Existing Subject Titles, Slugs, and Credits for Semester 4
UPDATE public.subjects SET code = 'BCA-202N', title = 'Programming in Python', slug = 'bca-202n-programming-in-python', credits = 4, status = 'published', updated_at = now() WHERE id = '792b88b7-3100-47e2-8078-359b42a82123';
UPDATE public.subjects SET code = 'BCA-204N', title = 'Unix and Shell Programming', slug = 'bca-204n-unix-and-shell-programming', credits = 4, status = 'published', updated_at = now() WHERE id = 'ac9f9256-cf93-40d3-a39c-ac2777722572';
UPDATE public.subjects SET code = 'BCA-206N', title = 'Accounting and Financial Management', slug = 'bca-206n-accounting-and-financial-management', credits = 4, status = 'published', updated_at = now() WHERE id = '218d92c4-a3f9-46a2-9963-00662d99428a';
UPDATE public.subjects SET code = 'BCA-208N', title = 'Computer Networks', slug = 'bca-208n-computer-networks', credits = 4, status = 'published', updated_at = now() WHERE id = '1b647e62-927b-42c5-8fbd-eb5b614195a1';
UPDATE public.subjects SET code = 'BCA-423E', title = 'Software Engineering', slug = 'bca-423e-software-engineering', credits = 4, status = 'published', updated_at = now() WHERE id = '992b17a2-052f-4087-9bd7-ce2468571981';

-- Insert or Update 25 Units for Semester 4
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('b143db93-3cf1-5948-9bd2-cce35fb1a46f', '792b88b7-3100-47e2-8078-359b42a82123', 1, 'Introduction & Overview of Python Programming', 'Official MJPRU BCA Unit 1: Introduction & Overview of Python Programming for BCA-202N (Programming in Python).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('c4a7ae5d-8bfb-5927-a617-a3980ee5c02a', '792b88b7-3100-47e2-8078-359b42a82123', 2, 'Operators, Expressions & Creating Python Programs', 'Official MJPRU BCA Unit 2: Operators, Expressions & Creating Python Programs for BCA-202N (Programming in Python).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('15140dd2-9187-5af3-bbe4-6817a037e910', '792b88b7-3100-47e2-8078-359b42a82123', 3, 'Decision Making, Branching, Iteration & Functions', 'Official MJPRU BCA Unit 3: Decision Making, Branching, Iteration & Functions for BCA-202N (Programming in Python).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6', '792b88b7-3100-47e2-8078-359b42a82123', 4, 'Classes, Objects, Inheritance & Advanced OOP', 'Official MJPRU BCA Unit 4: Classes, Objects, Inheritance & Advanced OOP for BCA-202N (Programming in Python).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('82debd1e-19e8-581f-8185-375fbdc445d5', '792b88b7-3100-47e2-8078-359b42a82123', 5, 'Iterators, Generators, Web Scraping & Testing', 'Official MJPRU BCA Unit 5: Iterators, Generators, Web Scraping & Testing for BCA-202N (Programming in Python).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('bf814b8a-b559-5daf-a826-8d2a70f13154', 'ac9f9256-cf93-40d3-a39c-ac2777722572', 1, 'Unix Architecture, Commands & Process Management', 'Official MJPRU BCA Unit 1: Unix Architecture, Commands & Process Management for BCA-204N (Unix and Shell Programming).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('e8f94cc9-23a5-5aa7-aba2-c305e1b5b511', 'ac9f9256-cf93-40d3-a39c-ac2777722572', 2, 'Unix File System, Inodes & Storage Administration', 'Official MJPRU BCA Unit 2: Unix File System, Inodes & Storage Administration for BCA-204N (Unix and Shell Programming).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('b9aba0b1-8f25-5981-a5bb-9857aede1d19', 'ac9f9256-cf93-40d3-a39c-ac2777722572', 3, 'Special Tools, Filters & Stream Editors (grep, sed, awk)', 'Official MJPRU BCA Unit 3: Special Tools, Filters & Stream Editors (grep, sed, awk) for BCA-204N (Unix and Shell Programming).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('aaf6ba32-75e1-5b3e-abb6-d42df7743c66', 'ac9f9256-cf93-40d3-a39c-ac2777722572', 4, 'vi Editor, Shell Environment & Scripting Fundamentals', 'Official MJPRU BCA Unit 4: vi Editor, Shell Environment & Scripting Fundamentals for BCA-204N (Unix and Shell Programming).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('9761708d-16f7-576c-a6d1-1fb45bac7533', 'ac9f9256-cf93-40d3-a39c-ac2777722572', 5, 'Control Structures, Functions & System Administration', 'Official MJPRU BCA Unit 5: Control Structures, Functions & System Administration for BCA-204N (Unix and Shell Programming).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('2862cab2-2317-5572-83d2-3668f51631ed', '218d92c4-a3f9-46a2-9963-00662d99428a', 1, 'Introduction to Accountancy, Journal & Ledger', 'Official MJPRU BCA Unit 1: Introduction to Accountancy, Journal & Ledger for BCA-206N (Accounting and Financial Management).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', '218d92c4-a3f9-46a2-9963-00662d99428a', 2, 'Trial Balance & Financial Statements (with Adjustments)', 'Official MJPRU BCA Unit 2: Trial Balance & Financial Statements (with Adjustments) for BCA-206N (Accounting and Financial Management).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('f5e1dbb4-ec74-530a-8100-f432a388f675', '218d92c4-a3f9-46a2-9963-00662d99428a', 3, 'Ratio Analysis & Financial Statement Interpretation', 'Official MJPRU BCA Unit 3: Ratio Analysis & Financial Statement Interpretation for BCA-206N (Accounting and Financial Management).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('8a101322-1639-516a-9533-d85f09a299d4', '218d92c4-a3f9-46a2-9963-00662d99428a', 4, 'Management Accounting, Cost Accounting & Standard Costing', 'Official MJPRU BCA Unit 4: Management Accounting, Cost Accounting & Standard Costing for BCA-206N (Accounting and Financial Management).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('2f398a62-c561-577e-b7b7-711b3526b32c', '218d92c4-a3f9-46a2-9963-00662d99428a', 5, 'Budgeting, Budgetary Control & Unit Costing (Cost Sheet)', 'Official MJPRU BCA Unit 5: Budgeting, Budgetary Control & Unit Costing (Cost Sheet) for BCA-206N (Accounting and Financial Management).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('bd736f61-09d0-5821-b1a0-24271a2d0833', '1b647e62-927b-42c5-8fbd-eb5b614195a1', 1, 'Computer Networks, Topologies & Reference Models', 'Official MJPRU BCA Unit 1: Computer Networks, Topologies & Reference Models for BCA-208N (Computer Networks).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('37faa7a4-65df-5cef-9c27-88f370bcf244', '1b647e62-927b-42c5-8fbd-eb5b614195a1', 2, 'Network Models, Layer Functionalities & Protocols', 'Official MJPRU BCA Unit 2: Network Models, Layer Functionalities & Protocols for BCA-208N (Computer Networks).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('2835f2ed-948e-5377-bb43-f572e7e47ede', '1b647e62-927b-42c5-8fbd-eb5b614195a1', 3, 'Addressing, Internet Protocol & Routing Algorithms', 'Official MJPRU BCA Unit 3: Addressing, Internet Protocol & Routing Algorithms for BCA-208N (Computer Networks).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('f0acb400-ece5-5fa8-8e5f-005951bd5d0b', '1b647e62-927b-42c5-8fbd-eb5b614195a1', 4, 'Application Layer Protocols & Network Management', 'Official MJPRU BCA Unit 4: Application Layer Protocols & Network Management for BCA-208N (Computer Networks).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('d2f7a40a-5d00-5a8b-bc46-a9a1714ff67f', '1b647e62-927b-42c5-8fbd-eb5b614195a1', 5, 'Network Security, Cryptography & Secure Protocols', 'Official MJPRU BCA Unit 5: Network Security, Cryptography & Secure Protocols for BCA-208N (Computer Networks).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('1d14535f-4acc-5f0b-a6ff-640784fb2a4b', '992b17a2-052f-4087-9bd7-ce2468571981', 1, 'Introduction to Software Engineering & Life Cycle Models', 'Official MJPRU BCA Unit 1: Introduction to Software Engineering & Life Cycle Models for BCA-423E (Software Engineering).', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('08a5e1de-2fb0-5799-936e-4073b00b027d', '992b17a2-052f-4087-9bd7-ce2468571981', 2, 'Requirements Analysis, Specification (SRS) & Modeling', 'Official MJPRU BCA Unit 2: Requirements Analysis, Specification (SRS) & Modeling for BCA-423E (Software Engineering).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('1af7ec2f-3e14-51e4-88a2-14fc5cf15835', '992b17a2-052f-4087-9bd7-ce2468571981', 3, 'Software Project Planning, Cost Estimation & SCM', 'Official MJPRU BCA Unit 3: Software Project Planning, Cost Estimation & SCM for BCA-423E (Software Engineering).', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('257f27a7-7fc7-5a7a-bf86-4827249b1d9e', '992b17a2-052f-4087-9bd7-ce2468571981', 4, 'Software Design Principles, Architecture & Strategies', 'Official MJPRU BCA Unit 4: Software Design Principles, Architecture & Strategies for BCA-423E (Software Engineering).', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('bdc2265d-5322-5fef-82b8-31f64062fa3f', '992b17a2-052f-4087-9bd7-ce2468571981', 5, 'Software Testing, Maintenance, Reliability & Reengineering', 'Official MJPRU BCA Unit 5: Software Testing, Maintenance, Reliability & Reengineering for BCA-423E (Software Engineering).', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();

DELETE FROM public.syllabus_topics WHERE unit_id IN ('b143db93-3cf1-5948-9bd2-cce35fb1a46f', 'c4a7ae5d-8bfb-5927-a617-a3980ee5c02a', '15140dd2-9187-5af3-bbe4-6817a037e910', '9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6', '82debd1e-19e8-581f-8185-375fbdc445d5', 'bf814b8a-b559-5daf-a826-8d2a70f13154', 'e8f94cc9-23a5-5aa7-aba2-c305e1b5b511', 'b9aba0b1-8f25-5981-a5bb-9857aede1d19', 'aaf6ba32-75e1-5b3e-abb6-d42df7743c66', '9761708d-16f7-576c-a6d1-1fb45bac7533', '2862cab2-2317-5572-83d2-3668f51631ed', '7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'f5e1dbb4-ec74-530a-8100-f432a388f675', '8a101322-1639-516a-9533-d85f09a299d4', '2f398a62-c561-577e-b7b7-711b3526b32c', 'bd736f61-09d0-5821-b1a0-24271a2d0833', '37faa7a4-65df-5cef-9c27-88f370bcf244', '2835f2ed-948e-5377-bb43-f572e7e47ede', 'f0acb400-ece5-5fa8-8e5f-005951bd5d0b', 'd2f7a40a-5d00-5a8b-bc46-a9a1714ff67f', '1d14535f-4acc-5f0b-a6ff-640784fb2a4b', '08a5e1de-2fb0-5799-936e-4073b00b027d', '1af7ec2f-3e14-51e4-88a2-14fc5cf15835', '257f27a7-7fc7-5a7a-bf86-4827249b1d9e', 'bdc2265d-5322-5fef-82b8-31f64062fa3f');

INSERT INTO public.syllabus_topics (unit_id, title, sort_order, status, created_at, updated_at) VALUES
  ('b143db93-3cf1-5948-9bd2-cce35fb1a46f', 'History and Evolution of Python: Guido van Rossum, Design Philosophy, Python 2 vs Python 3', 1, 'published', now(), now()),
  ('b143db93-3cf1-5948-9bd2-cce35fb1a46f', 'Core Characteristics of Python: Interpreted, High-Level, Dynamically Typed, Cross-Platform', 2, 'published', now(), now()),
  ('b143db93-3cf1-5948-9bd2-cce35fb1a46f', 'Python Interpreter Architecture: CPython, JIT (PyPy), Bytecode (.pyc) Compilation, Python Virtual Machine (PVM)', 3, 'published', now(), now()),
  ('b143db93-3cf1-5948-9bd2-cce35fb1a46f', 'Interactive Python Shell, REPL Environment, IDLE & Command Line Execution Modes', 4, 'published', now(), now()),
  ('b143db93-3cf1-5948-9bd2-cce35fb1a46f', 'Structure of a Python Script: Header, Shebang (#/usr/bin/env python), Module Imports, Main Function Idiom (__name__ == ''__main__'')', 5, 'published', now(), now()),
  ('b143db93-3cf1-5948-9bd2-cce35fb1a46f', 'Python Indentation Paradigm: Whitespace Rules, Syntactic Code Blocks vs Braces in C/Java', 6, 'published', now(), now()),
  ('b143db93-3cf1-5948-9bd2-cce35fb1a46f', 'Lexical Elements and Atoms: Python Keywords (import keyword; keyword.kwlist), Valid Identifiers, Naming Conventions (PEP 8)', 7, 'published', now(), now()),
  ('b143db93-3cf1-5948-9bd2-cce35fb1a46f', 'Python Literals: Integer, Float, Complex Numbers (a + bj), Boolean (True/False), NoneType Singleton', 8, 'published', now(), now()),
  ('b143db93-3cf1-5948-9bd2-cce35fb1a46f', 'Python Strings: Single, Double, Triple Quotes (Docstrings), Raw Strings (r''\n''), Escape Sequences', 9, 'published', now(), now()),
  ('b143db93-3cf1-5948-9bd2-cce35fb1a46f', 'String Indexing & Advanced Slicing: Positive/Negative Indices, Slicing [start:stop:step], Immutability of Strings', 10, 'published', now(), now()),
  ('b143db93-3cf1-5948-9bd2-cce35fb1a46f', 'String Formatting Techniques: % Operator, str.format() Method, Formatted String Literals (f-strings)', 11, 'published', now(), now()),
  ('b143db93-3cf1-5948-9bd2-cce35fb1a46f', 'Basic Console I/O: input() Function, Type Conversion (int(), float()), print() Function (sep, end parameters)', 12, 'published', now(), now()),
  ('c4a7ae5d-8bfb-5927-a617-a3980ee5c02a', 'Arithmetic Operators: Addition (+), Subtraction (-), Multiplication (*), True Division (/), Floor Division (//), Modulo (%), Exponentiation (**)', 1, 'published', now(), now()),
  ('c4a7ae5d-8bfb-5927-a617-a3980ee5c02a', 'Relational / Comparison Operators: ==, !=, >, <, >=, <=, Chained Comparisons (a < b < c)', 2, 'published', now(), now()),
  ('c4a7ae5d-8bfb-5927-a617-a3980ee5c02a', 'Logical Operators: and, or, not (Short-Circuit Evaluation Semantics)', 3, 'published', now(), now()),
  ('c4a7ae5d-8bfb-5927-a617-a3980ee5c02a', 'Bitwise Operators: Bitwise AND (&), OR (|), XOR (^), Inversion (~), Left Shift (<<), Right Shift (>>)', 4, 'published', now(), now()),
  ('c4a7ae5d-8bfb-5927-a617-a3980ee5c02a', 'Assignment and Augmented Operators: =, +=, -=, *=, /=, //=, %=, **=', 5, 'published', now(), now()),
  ('c4a7ae5d-8bfb-5927-a617-a3980ee5c02a', 'Identity and Membership Operators: is vs == (Object Identity vs Value Equality), in and not in Operators', 6, 'published', now(), now()),
  ('c4a7ae5d-8bfb-5927-a617-a3980ee5c02a', 'Ternary Conditional Expression: x if condition else y Syntax and Precedence', 7, 'published', now(), now()),
  ('c4a7ae5d-8bfb-5927-a617-a3980ee5c02a', 'Operator Precedence & Associativity Hierarchy: BEDMAS / PEMDAS Order of Evaluation', 8, 'published', now(), now()),
  ('c4a7ae5d-8bfb-5927-a617-a3980ee5c02a', 'Python Collection Primitives: Lists (Mutable, Ordered, Indexable), List Methods (append, extend, pop, sort)', 9, 'published', now(), now()),
  ('c4a7ae5d-8bfb-5927-a617-a3980ee5c02a', 'Tuples: Immutable Sequences, Packing and Unpacking, Single Element Tuple Syntax (1,)', 10, 'published', now(), now()),
  ('c4a7ae5d-8bfb-5927-a617-a3980ee5c02a', 'Dictionaries (dict): Key-Value Mappings, Hashing Requirements, Dict Methods (keys, values, items, get, update)', 11, 'published', now(), now()),
  ('c4a7ae5d-8bfb-5927-a617-a3980ee5c02a', 'Sets (set): Unordered Unique Elements, Set Operations (Union |, Intersection &, Difference -, Symmetric Difference ^)', 12, 'published', now(), now()),
  ('15140dd2-9187-5af3-bbe4-6817a037e910', 'Conditional Branching: if Statement, if-else Statement, if-elif-else Ladder Architecture', 1, 'published', now(), now()),
  ('15140dd2-9187-5af3-bbe4-6817a037e910', 'Nested Decision Structures and Truth Value Testing (Truthy and Falsy Values)', 2, 'published', now(), now()),
  ('15140dd2-9187-5af3-bbe4-6817a037e910', 'While Loop: Entry-Controlled Iteration, Infinite Loops, while-else Construct Execution Semantics', 3, 'published', now(), now()),
  ('15140dd2-9187-5af3-bbe4-6817a037e910', 'For Loop: Sequence Iteration, range(start, stop, step) Generator, for-else Construct Execution Semantics', 4, 'published', now(), now()),
  ('15140dd2-9187-5af3-bbe4-6817a037e910', 'Loop Control Jump Statements: break (Immediate Loop Termination), continue (Skip Current Iteration), pass (Null Statement)', 5, 'published', now(), now()),
  ('15140dd2-9187-5af3-bbe4-6817a037e910', 'List Comprehensions: Compact Syntax [expr for item in iterable if condition], Nested Comprehensions', 6, 'published', now(), now()),
  ('15140dd2-9187-5af3-bbe4-6817a037e910', 'Dictionary and Set Comprehensions: {k: v for ...} and {x for ...}', 7, 'published', now(), now()),
  ('15140dd2-9187-5af3-bbe4-6817a037e910', 'Defining Functions in Python: def Keyword, Function Signature, docstrings (__doc__)', 8, 'published', now(), now()),
  ('15140dd2-9187-5af3-bbe4-6817a037e910', 'Function Parameters and Arguments: Positional Arguments, Keyword Arguments, Default Parameter Trap (Mutable Defaults)', 9, 'published', now(), now()),
  ('15140dd2-9187-5af3-bbe4-6817a037e910', 'Arbitrary Variable-Length Arguments: *args (Positional Tuple) and **kwargs (Keyword Dictionary)', 10, 'published', now(), now()),
  ('15140dd2-9187-5af3-bbe4-6817a037e910', 'Variable Scope & Lifetime: LEGB Rule (Local, Enclosing, Global, Built-in), global and nonlocal Keywords', 11, 'published', now(), now()),
  ('15140dd2-9187-5af3-bbe4-6817a037e910', 'Functional Programming Primitives: Anonymous Functions (lambda), map(), filter(), reduce() (functools)', 12, 'published', now(), now()),
  ('9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6', 'Object-Oriented Philosophy in Python: Classes as Types, Everything is an Object', 1, 'published', now(), now()),
  ('9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6', 'Class Definition: class Keyword, Instance Attributes vs Class Attributes, Self Parameter Mechanics', 2, 'published', now(), now()),
  ('9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6', 'Constructor & Destructor Methods: __init__() Initializer, __new__() Allocator, __del__() Finalizer', 3, 'published', now(), now()),
  ('9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6', 'Encapsulation and Information Hiding: Public Members, Protected (_var Convention), Private (__var Name Mangling)', 4, 'published', now(), now()),
  ('9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6', 'Property Decorators: @property, @setter, @deleter for Controlled Attribute Access', 5, 'published', now(), now()),
  ('9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6', 'Inheritance Architecture: Single Inheritance, Multilevel Inheritance, Hierarchical Inheritance, Multiple Inheritance', 6, 'published', now(), now()),
  ('9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6', 'Method Resolution Order (MRO): C3 Superclass Linearization Algorithm, ClassName.__mro__, super() Function', 7, 'published', now(), now()),
  ('9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6', 'Polymorphism & Duck Typing: ''If it walks like a duck and quacks like a duck, it is a duck''', 8, 'published', now(), now()),
  ('9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6', 'Method Overriding vs Method Overloading: Why Python Does Not Support Native Overloading (Dispatch by Default/args)', 9, 'published', now(), now()),
  ('9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6', 'Operator Overloading & Dunder (Magic) Methods: __str__, __repr__, __add__, __sub__, __mul__, __eq__, __len__, __getitem__', 10, 'published', now(), now()),
  ('9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6', 'Class Composition and Aggregation: HAS-A Relationships vs IS-A Inheritance', 11, 'published', now(), now()),
  ('9a752c7b-0f28-5ebf-a33e-8e49cf7c78f6', 'Abstract Base Classes (abc Module): @abstractmethod Decorator, Enforcing Contractual Subclass Implementations', 12, 'published', now(), now()),
  ('82debd1e-19e8-581f-8185-375fbdc445d5', 'Iteration Protocol: Iterable vs Iterator, __iter__() and __next__() Methods, StopIteration Exception', 1, 'published', now(), now()),
  ('82debd1e-19e8-581f-8185-375fbdc445d5', 'Custom Iterator Implementation: Building State-Tracking Iterable Classes', 2, 'published', now(), now()),
  ('82debd1e-19e8-581f-8185-375fbdc445d5', 'Generators in Python: yield Statement, Generator Functions, Execution Pausing and Resumption State', 3, 'published', now(), now()),
  ('82debd1e-19e8-581f-8185-375fbdc445d5', 'Generator Expressions: Memory-Efficient Lazy Stream Evaluation (expr for item in iterable)', 4, 'published', now(), now()),
  ('82debd1e-19e8-581f-8185-375fbdc445d5', 'Python Exception Handling: try, except, else, finally Blocks, Exception Hierarchy (BaseException, Exception)', 5, 'published', now(), now()),
  ('82debd1e-19e8-581f-8185-375fbdc445d5', 'Raising and Creating Custom Exceptions: raise Statement, Subclassing Exception Class', 6, 'published', now(), now()),
  ('82debd1e-19e8-581f-8185-375fbdc445d5', 'Assertions in Python: assert Statement, AssertionError, Debugging Flag (-O Flag Optimization)', 7, 'published', now(), now()),
  ('82debd1e-19e8-581f-8185-375fbdc445d5', 'Python Testing and Debugging: pdb (Python Debugger - n, s, c, p commands), unittest Framework (TestCase, assertEqual)', 8, 'published', now(), now()),
  ('82debd1e-19e8-581f-8185-375fbdc445d5', 'Web Scraping Fundamentals: HTTP Requests Protocol, RESTful APIs, urllib vs requests Library (GET, POST, Headers)', 9, 'published', now(), now()),
  ('82debd1e-19e8-581f-8185-375fbdc445d5', 'HTML Parsing with Beautiful Soup (bs4): Soup Objects, NavigableStrings, Tag Finding (find, find_all, select CSS Selectors)', 10, 'published', now(), now()),
  ('82debd1e-19e8-581f-8185-375fbdc445d5', 'Data Extraction & Sanitization: Scraping Tables, Attributes, Text Content, Handling Pagination', 11, 'published', now(), now()),
  ('82debd1e-19e8-581f-8185-375fbdc445d5', 'Ethical Web Scraping Practices: robots.txt Compliance, Request Throttling, User-Agent Headers, Rate Limiting', 12, 'published', now(), now()),
  ('bf814b8a-b559-5daf-a826-8d2a70f13154', 'History and Evolution of UNIX: Ken Thompson, Dennis Ritchie, Bell Labs, BSD, POSIX, Linux Foundation', 1, 'published', now(), now()),
  ('bf814b8a-b559-5daf-a826-8d2a70f13154', 'Salient Features of UNIX: Multi-user, Multitasking, Portability, Hierarchical File System, Tool-Building Philosophy', 2, 'published', now(), now()),
  ('bf814b8a-b559-5daf-a826-8d2a70f13154', 'UNIX System Architecture: Hardware Layer, Kernel Layer, System Call Interface, Shell Layer, Application Utilities', 3, 'published', now(), now()),
  ('bf814b8a-b559-5daf-a826-8d2a70f13154', 'UNIX Command Syntax & Format: Command Name, Options (Flags -a, --long), Command Arguments, Standard Output', 4, 'published', now(), now()),
  ('bf814b8a-b559-5daf-a826-8d2a70f13154', 'Internal (Built-in) vs External (Disk-Based) Commands: type Command, which Command, Command Path Hash Table', 5, 'published', now(), now()),
  ('bf814b8a-b559-5daf-a826-8d2a70f13154', 'General Utilities & Help Facilities: man Pages (Sections 1-8), whatis, apropos, date, cal, echo, clear, banner', 6, 'published', now(), now()),
  ('bf814b8a-b559-5daf-a826-8d2a70f13154', 'Directory Management Commands: pwd, mkdir (-p flag), rmdir, cd (Path Traversal . and ..)', 7, 'published', now(), now()),
  ('bf814b8a-b559-5daf-a826-8d2a70f13154', 'File Manipulation Commands: ls (Options -l, -a, -R, -t, -h), touch, cp (-r, -i), mv, rm (-r, -f), cat, more, less, head, tail (-f)', 8, 'published', now(), now()),
  ('bf814b8a-b559-5daf-a826-8d2a70f13154', 'Disk & System Status Commands: df (-h), du (-sh), free, uname (-a), who, w, whoami, id, uptime', 9, 'published', now(), now()),
  ('bf814b8a-b559-5daf-a826-8d2a70f13154', 'UNIX Process Management: Process Concept, PID, PPID, Process States (Running, Sleeping, Stopped, Zombie), ps Command (aux, -ef)', 10, 'published', now(), now()),
  ('bf814b8a-b559-5daf-a826-8d2a70f13154', 'Process Scheduling & Background Execution: Ampersand (&), nohup, jobs, fg, bg, nice, renice Priorities (-20 to 19)', 11, 'published', now(), now()),
  ('bf814b8a-b559-5daf-a826-8d2a70f13154', 'Process Termination & Signals: kill Command, killall, Standard Signals (SIGTERM 15, SIGKILL 9, SIGINT 2, SIGHUP 1), top Command', 12, 'published', now(), now()),
  ('e8f94cc9-23a5-5aa7-aba2-c305e1b5b511', 'Hierarchical File System Architecture: Root (/), /bin, /sbin, /etc, /dev, /home, /lib, /tmp, /usr, /var', 1, 'published', now(), now()),
  ('e8f94cc9-23a5-5aa7-aba2-c305e1b5b511', 'UNIX File Types: Regular (Ordinary) Files (-), Directories (d), Character Devices (c), Block Devices (b), FIFO Pipes (p), Sockets (s), Links (l)', 2, 'published', now(), now()),
  ('e8f94cc9-23a5-5aa7-aba2-c305e1b5b511', 'Physical Disk Architecture in UNIX: Boot Block, Super Block, Inode Table (ILIST), Data Blocks', 3, 'published', now(), now()),
  ('e8f94cc9-23a5-5aa7-aba2-c305e1b5b511', 'The Super Block: File System Metadata, Total Free Inodes, Free Data Block Pointer Lists, File System State Flags', 4, 'published', now(), now()),
  ('e8f94cc9-23a5-5aa7-aba2-c305e1b5b511', 'The UNIX Inode: Inode Number (ls -i), Inode Structure, File Attributes, Direct Pointers (0-11), Indirect Pointers (Single, Double, Triple)', 5, 'published', now(), now()),
  ('e8f94cc9-23a5-5aa7-aba2-c305e1b5b511', 'In-Core Inode vs Disk Inode: Active File Tracking, Reference Counts, Mount Point Crossing', 6, 'published', now(), now()),
  ('e8f94cc9-23a5-5aa7-aba2-c305e1b5b511', 'Directory Implementation: Directory Entries as (Filename, Inode Number) Pairs, Conversion of Pathname to Inode', 7, 'published', now(), now()),
  ('e8f94cc9-23a5-5aa7-aba2-c305e1b5b511', 'Hard Links vs Symbolic (Soft) Links: ln vs ln -s, Inode Sharing, Cross-Filesystem Constraints, Dangling Links', 8, 'published', now(), now()),
  ('e8f94cc9-23a5-5aa7-aba2-c305e1b5b511', 'Secondary Storage Management: Disk Partitioning (fdisk, parted), Creating Filesystems (mkfs, mke2fs)', 9, 'published', now(), now()),
  ('e8f94cc9-23a5-5aa7-aba2-c305e1b5b511', 'Mounting & Unmounting Filesystems: mount Command, umount Command, /etc/fstab Configuration Table', 10, 'published', now(), now()),
  ('e8f94cc9-23a5-5aa7-aba2-c305e1b5b511', 'Checking & Repairing Filesystems: fsck Utility, Bad Block Detection, Disk Compression Utilities (gzip, gunzip, bzip2, tar -cvf, tar -xvf)', 11, 'published', now(), now()),
  ('e8f94cc9-23a5-5aa7-aba2-c305e1b5b511', 'UNIX System Calls: open, creat, read, write, lseek, close, fork, exec, wait, exit, pipe System Calls', 12, 'published', now(), now()),
  ('b9aba0b1-8f25-5981-a5bb-9857aede1d19', 'Standard I/O Streams in UNIX: Standard Input (stdin, 0), Standard Output (stdout, 1), Standard Error (stderr, 2)', 1, 'published', now(), now()),
  ('b9aba0b1-8f25-5981-a5bb-9857aede1d19', 'Redirection Operators: Output Redirection (> and >>), Input Redirection (<), Error Redirection (2>, 2>&1)', 2, 'published', now(), now()),
  ('b9aba0b1-8f25-5981-a5bb-9857aede1d19', 'UNIX Pipelines: Pipeline (|) Operator, Chaining Multiple Programs, The tee Utility (Splitting Output Stream)', 3, 'published', now(), now()),
  ('b9aba0b1-8f25-5981-a5bb-9857aede1d19', 'Basic Filter Commands: sort (-n, -r, -k), uniq (-c, -d), cut (-d, -f, -c), paste, tr (Character Translation and Deletion)', 4, 'published', now(), now()),
  ('b9aba0b1-8f25-5981-a5bb-9857aede1d19', 'Information Filters: wc (Word, Line, Byte Count), comm, diff, cmp, find Utility (Searching by Name, Type, Size, Exec Action)', 5, 'published', now(), now()),
  ('b9aba0b1-8f25-5981-a5bb-9857aede1d19', 'Regular Expressions in UNIX: Basic Regular Expressions (BRE) vs Extended Regular Expressions (ERE)', 6, 'published', now(), now()),
  ('b9aba0b1-8f25-5981-a5bb-9857aede1d19', 'Regex Metacharacters: Anchors (^, $), Wildcard (.), Character Classes ([abc], [^0-9]), Quantifiers (*, +, ?, {m,n}), Grouping ()', 7, 'published', now(), now()),
  ('b9aba0b1-8f25-5981-a5bb-9857aede1d19', 'Pattern Searching with grep: grep, egrep (grep -E), fgrep (grep -F), Options (-i, -v, -n, -c, -l, -w)', 8, 'published', now(), now()),
  ('b9aba0b1-8f25-5981-a5bb-9857aede1d19', 'Stream Editor (sed) Architecture: Non-Interactive Stream Processing, Pattern Space and Hold Buffer', 9, 'published', now(), now()),
  ('b9aba0b1-8f25-5981-a5bb-9857aede1d19', 'sed Commands: Substitution (s/pattern/replacement/flags - g, p), Deletion (d), Printing (p), Appending (a), Inserting (i)', 10, 'published', now(), now()),
  ('b9aba0b1-8f25-5981-a5bb-9857aede1d19', 'The AWK Programming Language: Pattern-Action Structure (pattern { action }), Built-in Variables (FS, OFS, RS, ORS, NR, NF, FILENAME)', 11, 'published', now(), now()),
  ('b9aba0b1-8f25-5981-a5bb-9857aede1d19', 'AWK Scripting Constructs: BEGIN and END Blocks, Field Referencing ($0, $1..$NF), Formatted Printing (printf), Conditionals and Loops', 12, 'published', now(), now()),
  ('aaf6ba32-75e1-5b3e-abb6-d42df7743c66', 'Text Editing in UNIX: The vi / vim Editor, Operational Modes (Command Mode, Insert Mode, Last-Line / Ex Mode)', 1, 'published', now(), now()),
  ('aaf6ba32-75e1-5b3e-abb6-d42df7743c66', 'vi Cursor Navigation & Editing Commands: h, j, k, l, w, b, 0, $, gg, G, i, a, o, x, dd, yy, p, u, Ctrl-R', 2, 'published', now(), now()),
  ('aaf6ba32-75e1-5b3e-abb6-d42df7743c66', 'vi Search, Replace & Save Commands: /pattern, ?pattern, :s/old/new/g, :%s/old/new/gc, :w, :q, :wq, :q!', 3, 'published', now(), now()),
  ('aaf6ba32-75e1-5b3e-abb6-d42df7743c66', 'Shell Architecture & Types: Bourne Shell (sh), C Shell (csh), Korn Shell (ksh), Bourne-Again Shell (bash), Z Shell (zsh)', 4, 'published', now(), now()),
  ('aaf6ba32-75e1-5b3e-abb6-d42df7743c66', 'Shell Command-Line Processing: Tokenization, History Expansion, Alias Substitution, Parameter Expansion, Filename Globbing (*, ?, [a-z])', 5, 'published', now(), now()),
  ('aaf6ba32-75e1-5b3e-abb6-d42df7743c66', 'Writing and Executing a Shell Script: Shebang line (#!/bin/bash), Execution Permissions (chmod +x), ./script.sh vs sh script.sh', 6, 'published', now(), now()),
  ('aaf6ba32-75e1-5b3e-abb6-d42df7743c66', 'Shell Variables: User-Defined Variables, Assignment Syntax (var=val, No Spaces), Variable Dereferencing ($var, ${var})', 7, 'published', now(), now()),
  ('aaf6ba32-75e1-5b3e-abb6-d42df7743c66', 'System & Environment Variables: HOME, PATH, USER, SHELL, PWD, PS1, export Command, Environment Persistence (~/.bashrc, ~/.bash_profile)', 8, 'published', now(), now()),
  ('aaf6ba32-75e1-5b3e-abb6-d42df7743c66', 'Console Input and Output in Scripts: echo (-e, -n), read Statement (Options -p, -s, -t), Command Substitution ($(cmd) and `cmd`)', 9, 'published', now(), now()),
  ('aaf6ba32-75e1-5b3e-abb6-d42df7743c66', 'Arithmetic Evaluation in Shell: expr Command, Double Parentheses (( expression )), let Command, bc (Arbitrary Precision Calculator)', 10, 'published', now(), now()),
  ('aaf6ba32-75e1-5b3e-abb6-d42df7743c66', 'Positional Parameters & Special Script Arguments: $0 (Script Name), $1..$9, ${10}, $# (Arg Count), $* vs $@, $? (Exit Status), $$ (PID)', 11, 'published', now(), now()),
  ('aaf6ba32-75e1-5b3e-abb6-d42df7743c66', 'Conditional Testing with test Command: Bracket Syntax [ condition ] vs [[ extended condition ]], File Tests (-f, -d, -r, -w, -x, -s)', 12, 'published', now(), now()),
  ('aaf6ba32-75e1-5b3e-abb6-d42df7743c66', 'String & Numeric Comparison Tests: String Tests (=, !=, -z, -n), Integer Tests (-eq, -ne, -lt, -le, -gt, -ge)', 13, 'published', now(), now()),
  ('9761708d-16f7-576c-a6d1-1fb45bac7533', 'Conditional Control Structures: Simple if-then-fi, if-then-else-fi, if-then-elif-else-fi Multi-Way Branching', 1, 'published', now(), now()),
  ('9761708d-16f7-576c-a6d1-1fb45bac7533', 'Pattern Matching with case Statement: case $var in pattern1) ... ;; pattern2) ... ;; *) ... ;; esac Architecture', 2, 'published', now(), now()),
  ('9761708d-16f7-576c-a6d1-1fb45bac7533', 'Looping Structures - while Loop: Condition-Based Entry-Controlled Iteration, Infinite while Loops', 3, 'published', now(), now()),
  ('9761708d-16f7-576c-a6d1-1fb45bac7533', 'Looping Structures - until Loop: Iterating Until Condition Evaluates to True', 4, 'published', now(), now()),
  ('9761708d-16f7-576c-a6d1-1fb45bac7533', 'Looping Structures - for Loop: Word List Iteration (for var in list; do ... done), C-Style For Loop (for ((i=0; i<n; i++)))', 5, 'published', now(), now()),
  ('9761708d-16f7-576c-a6d1-1fb45bac7533', 'Jumping Control Structures: break (Exit Loop), break n (Break Nested Loops), continue (Skip to Next Iteration), exit status', 6, 'published', now(), now()),
  ('9761708d-16f7-576c-a6d1-1fb45bac7533', 'Shell Functions: Defining Functions (fname() { ... }), Passing Arguments to Functions ($1, $2 inside functions), return vs echo Output', 7, 'published', now(), now()),
  ('9761708d-16f7-576c-a6d1-1fb45bac7533', 'File Descriptors and Advanced I/O Redirection: Custom File Descriptors (exec 3<file), Here Documents (<<EOF), Here Strings (<<<)', 8, 'published', now(), now()),
  ('9761708d-16f7-576c-a6d1-1fb45bac7533', 'Signal Trapping in Scripts: trap Command, Handling SIGINT (Ctrl-C), Cleaning Up Temporary Files on Script Abort', 9, 'published', now(), now()),
  ('9761708d-16f7-576c-a6d1-1fb45bac7533', 'UNIX File Permissions & Security: User, Group, Others (rwx), Octal Notation (chmod 755, 644), chown, chgrp, umask Mechanics', 10, 'published', now(), now()),
  ('9761708d-16f7-576c-a6d1-1fb45bac7533', 'System Administration & Automation: Cron Daemon, crontab File Format (* * * * * command), at Command for Single Execution', 11, 'published', now(), now()),
  ('9761708d-16f7-576c-a6d1-1fb45bac7533', 'Backup & Archival Scripting: Automated Log Rotation, Compression Scripts, Remote Copying with scp and rsync', 12, 'published', now(), now()),
  ('2862cab2-2317-5572-83d2-3668f51631ed', 'Introduction to Accountancy: Definition of Accounting, Book-keeping vs Accounting, Objectives of Accounting', 1, 'published', now(), now()),
  ('2862cab2-2317-5572-83d2-3668f51631ed', 'Advantages and Limitations of Financial Accounting, Users of Accounting Information (Internal vs External)', 2, 'published', now(), now()),
  ('2862cab2-2317-5572-83d2-3668f51631ed', 'Accounting Principles, Concepts & Conventions: Entity Concept, Money Measurement, Going Concern, Accounting Period Concept', 3, 'published', now(), now()),
  ('2862cab2-2317-5572-83d2-3668f51631ed', 'Cost Concept, Dual Aspect Concept, Realization Concept, Accrual Concept, Matching Principle, Full Disclosure, Materiality, Prudence (Conservatism)', 4, 'published', now(), now()),
  ('2862cab2-2317-5572-83d2-3668f51631ed', 'Double Entry System of Book-Keeping: Fundamental Philosophy, Advantages, Classification of Accounts (Personal, Real, Nominal)', 5, 'published', now(), now()),
  ('2862cab2-2317-5572-83d2-3668f51631ed', 'Rules of Debit and Credit: Traditional British Approach (Golden Rules: Personal, Real, Nominal Accounts)', 6, 'published', now(), now()),
  ('2862cab2-2317-5572-83d2-3668f51631ed', 'Modern American Accounting Equation Approach: Assets = Liabilities + Capital; Debit/Credit Rules for Assets, Liabilities, Capital, Revenues, Expenses', 7, 'published', now(), now()),
  ('2862cab2-2317-5572-83d2-3668f51631ed', 'The Journal: Meaning, Format, Source Documents (Vouchers, Invoices), Compound Journal Entries, Trade Discount vs Cash Discount', 8, 'published', now(), now()),
  ('2862cab2-2317-5572-83d2-3668f51631ed', 'The Accounting Equation: Effect of Business Transactions on Accounting Equation, Balancing the Equation', 9, 'published', now(), now()),
  ('2862cab2-2317-5572-83d2-3668f51631ed', 'Ledger Accounts: Meaning, Importance, Difference between Journal and Ledger, Ledger Account Format (T-Account)', 10, 'published', now(), now()),
  ('2862cab2-2317-5572-83d2-3668f51631ed', 'Ledger Posting Mechanics: Posting Debit and Credit Entries from Journal to Respective Ledger Accounts, Balancing of Ledger Accounts', 11, 'published', now(), now()),
  ('2862cab2-2317-5572-83d2-3668f51631ed', 'Cash Book: Meaning, Types (Single Column, Double Column, Three Column Cash Book with Cash, Bank, and Discount Columns), Petty Cash Book (Imprest System)', 12, 'published', now(), now()),
  ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'Trial Balance: Meaning, Definition, Special Features, Objectives, Limitations (Errors Not Disclosed by Trial Balance)', 1, 'published', now(), now()),
  ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'Methods of Preparing Trial Balance: Total Method, Balance Method, Total-and-Balance Method', 2, 'published', now(), now()),
  ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'Classification of Errors in Accounting: Errors of Omission, Errors of Commission, Errors of Principle, Compensating Errors', 3, 'published', now(), now()),
  ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'Suspense Account: Purpose, Rectification of Single-Sided and Double-Sided Errors before and after Trial Balance', 4, 'published', now(), now()),
  ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'Financial Statements (Final Accounts): Objectives, Structure, Distinction between Capital Expenditure and Revenue Expenditure', 5, 'published', now(), now()),
  ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'Trading Account: Meaning, Purpose, Format, Calculation of Cost of Goods Sold (COGS), Gross Profit or Gross Loss', 6, 'published', now(), now()),
  ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'Profit and Loss Account: Meaning, Purpose, Format, Operating vs Non-Operating Expenses, Net Profit or Net Loss', 7, 'published', now(), now()),
  ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'Balance Sheet: Meaning, Definition, Marshalling of Assets and Liabilities (Order of Liquidity vs Order of Permanence)', 8, 'published', now(), now()),
  ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'End-of-Year Adjustments in Financial Statements: Closing Stock (Cost or Net Realizable Value, whichever is lower)', 9, 'published', now(), now()),
  ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'Outstanding Expenses (Expenses Incurred but Not Paid) and Prepaid Expenses (Unexpired Expenses)', 10, 'published', now(), now()),
  ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'Accrued Income (Income Earned but Not Received) and Income Received in Advance (Unearned Income)', 11, 'published', now(), now()),
  ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'Depreciation on Fixed Assets: Meaning, Need, Straight Line Method vs Written Down Value (WDV) Method', 12, 'published', now(), now()),
  ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'Bad Debts and Provision for Bad and Doubtful Debts: Concept, Calculation, Treatment in P&L and Balance Sheet', 13, 'published', now(), now()),
  ('7158e5ed-3e31-5088-b263-d3d6e4b8efad', 'Provision for Discount on Debtors and Creditors, Interest on Capital, Interest on Drawings, Interest on Bank Loans', 14, 'published', now(), now()),
  ('f5e1dbb4-ec74-530a-8100-f432a388f675', 'Ratio Analysis: Meaning, Definition, Importance and Objectives in Financial Decision Making', 1, 'published', now(), now()),
  ('f5e1dbb4-ec74-530a-8100-f432a388f675', 'Limitations of Ratio Analysis: Historical Data Dependence, Inflation Distortion, Window Dressing, Lack of Qualitative Factors', 2, 'published', now(), now()),
  ('f5e1dbb4-ec74-530a-8100-f432a388f675', 'Classification of Accounting Ratios: Liquidity, Solvency / Leverage, Profitability, and Activity / Turnover Ratios', 3, 'published', now(), now()),
  ('f5e1dbb4-ec74-530a-8100-f432a388f675', 'Liquidity Ratios: Current Ratio (Formula, Standard Benchmark 2:1, Significance), Quick Ratio / Acid Test Ratio (Standard Benchmark 1:1)', 4, 'published', now(), now()),
  ('f5e1dbb4-ec74-530a-8100-f432a388f675', 'Absolute Liquid Ratio / Cash Ratio: Cash + Marketable Securities to Current Liabilities', 5, 'published', now(), now()),
  ('f5e1dbb4-ec74-530a-8100-f432a388f675', 'Solvency Ratios: Debt-Equity Ratio (Long-Term Debt to Shareholders'' Equity, Benchmark 2:1), Proprietary Ratio, Total Assets to Debt Ratio', 6, 'published', now(), now()),
  ('f5e1dbb4-ec74-530a-8100-f432a388f675', 'Interest Coverage Ratio (Debt Service Ratio): EBIT / Fixed Interest Charges, Measuring Default Risk', 7, 'published', now(), now());

INSERT INTO public.syllabus_topics (unit_id, title, sort_order, status, created_at, updated_at) VALUES
  ('f5e1dbb4-ec74-530a-8100-f432a388f675', 'Activity / Turnover / Efficiency Ratios: Inventory / Stock Turnover Ratio (COGS / Average Inventory) and Inventory Holding Period (in days)', 8, 'published', now(), now()),
  ('f5e1dbb4-ec74-530a-8100-f432a388f675', 'Debtors / Trade Receivables Turnover Ratio (Credit Sales / Average Receivables) and Average Collection Period', 9, 'published', now(), now()),
  ('f5e1dbb4-ec74-530a-8100-f432a388f675', 'Creditors / Trade Payables Turnover Ratio (Credit Purchases / Average Payables) and Average Payment Period', 10, 'published', now(), now()),
  ('f5e1dbb4-ec74-530a-8100-f432a388f675', 'Working Capital Turnover Ratio: Net Sales / Net Working Capital', 11, 'published', now(), now()),
  ('f5e1dbb4-ec74-530a-8100-f432a388f675', 'Profitability Ratios: Gross Profit Ratio ((Gross Profit / Net Sales) * 100), Operating Profit Ratio, Operating Ratio', 12, 'published', now(), now()),
  ('f5e1dbb4-ec74-530a-8100-f432a388f675', 'Net Profit Ratio ((Net Profit / Net Sales) * 100), Return on Capital Employed (ROCE / ROI), Return on Equity (ROE), Earnings Per Share (EPS)', 13, 'published', now(), now()),
  ('8a101322-1639-516a-9533-d85f09a299d4', 'Introduction to Management Accounting: Meaning, Definition, Nature, Objectives, and Scope', 1, 'published', now(), now()),
  ('8a101322-1639-516a-9533-d85f09a299d4', 'Advantages and Limitations of Management Accounting, Role in Strategic Planning and Managerial Decision Making', 2, 'published', now(), now()),
  ('8a101322-1639-516a-9533-d85f09a299d4', 'Comparative Analysis: Financial Accounting vs Management Accounting (Audience, Time Horizon, Mandatory vs Optional)', 3, 'published', now(), now()),
  ('8a101322-1639-516a-9533-d85f09a299d4', 'Comparative Analysis: Cost Accounting vs Management Accounting (Scope, Quantitative vs Qualitative Focus)', 4, 'published', now(), now()),
  ('8a101322-1639-516a-9533-d85f09a299d4', 'The Management Accountant: Organizational Position, Roles, Responsibilities, Ethical Conduct (IMA Standards)', 5, 'published', now(), now()),
  ('8a101322-1639-516a-9533-d85f09a299d4', 'Cost Accounting Fundamentals: Definition of Cost, Costing, Cost Accounting, Cost Unit, Cost Center (Profit Center vs Investment Center)', 6, 'published', now(), now()),
  ('8a101322-1639-516a-9533-d85f09a299d4', 'Classification of Costs: By Element (Material, Labor, Expenses), By Function (Production, Admin, Selling), By Behavior (Fixed, Variable, Semi-Variable)', 7, 'published', now(), now()),
  ('8a101322-1639-516a-9533-d85f09a299d4', 'Standard Costing: Meaning, Concept, Objectives, Advantages and Limitations in Cost Control', 8, 'published', now(), now()),
  ('8a101322-1639-516a-9533-d85f09a299d4', 'Standard Costing vs Historical Costing, Standard Costing vs Budgetary Control', 9, 'published', now(), now()),
  ('8a101322-1639-516a-9533-d85f09a299d4', 'Establishment of Cost Standards: Ideal Standards vs Attainable Current Standards for Direct Materials, Direct Labor, Overheads', 10, 'published', now(), now()),
  ('8a101322-1639-516a-9533-d85f09a299d4', 'Variance Analysis Overview: Favorable vs Unfavorable (Adverse) Variances, Material Cost Variances (Price and Usage Variances)', 11, 'published', now(), now()),
  ('8a101322-1639-516a-9533-d85f09a299d4', 'Labor Variances Overview: Labor Rate Variance, Labor Efficiency Variance, Idle Time Variance', 12, 'published', now(), now()),
  ('2f398a62-c561-577e-b7b7-711b3526b32c', 'Budgeting Fundamentals: Definition of Budget, Characteristics, Distinction between Budgets and Forecasts', 1, 'published', now(), now()),
  ('2f398a62-c561-577e-b7b7-711b3526b32c', 'Essentials of an Effective Budgeting System: Management Support, Goal Congruence, Cost-Benefit Justification', 2, 'published', now(), now()),
  ('2f398a62-c561-577e-b7b7-711b3526b32c', 'Budgetary Control: Meaning, Objectives, Implementation Steps, Advantages and Operational Limitations', 3, 'published', now(), now()),
  ('2f398a62-c561-577e-b7b7-711b3526b32c', 'Classification of Budgets by Time Horizon: Long-Term Budgets, Short-Term Budgets, Current Budgets', 4, 'published', now(), now()),
  ('2f398a62-c561-577e-b7b7-711b3526b32c', 'Classification of Budgets by Function: Sales Budget, Production Budget, Raw Materials Budget, Cash Budget, Capital Expenditure Budget', 5, 'published', now(), now()),
  ('2f398a62-c561-577e-b7b7-711b3526b32c', 'Master Budget: Integration of all Functional Budgets, Summary Budgeted Profit & Loss and Budgeted Balance Sheet', 6, 'published', now(), now()),
  ('2f398a62-c561-577e-b7b7-711b3526b32c', 'Fixed Budget vs Flexible Budget: Concept, Need for Flexible Budgeting at Varying Activity Capacity Levels (60%, 80%, 100%)', 7, 'published', now(), now()),
  ('2f398a62-c561-577e-b7b7-711b3526b32c', 'Zero-Based Budgeting (ZBB): Meaning, Peter Pyhrr Concept, Decision Packages, Cost-Benefit Ranking, Advantages over Incremental Budgeting', 8, 'published', now(), now()),
  ('2f398a62-c561-577e-b7b7-711b3526b32c', 'Unit Costing (Output Costing): Concept, Industries Applying Unit Costing (Mines, Brickworks, Paper Mills, Breweries)', 9, 'published', now(), now()),
  ('2f398a62-c561-577e-b7b7-711b3526b32c', 'Components of Total Cost: Prime Cost (Direct Material + Direct Labor + Direct Expenses), Works / Factory Cost', 10, 'published', now(), now()),
  ('2f398a62-c561-577e-b7b7-711b3526b32c', 'Cost of Production (Works Cost + Office/Admin Overheads), Total Cost / Cost of Sales (Cost of Production + Selling/Distribution Overheads)', 11, 'published', now(), now()),
  ('2f398a62-c561-577e-b7b7-711b3526b32c', 'Preparation of Cost Sheet: Detailed Step-by-Step Format with Work-in-Progress and Finished Goods Adjustments', 12, 'published', now(), now()),
  ('2f398a62-c561-577e-b7b7-711b3526b32c', 'Tender Price / Quotation Statement: Determination of Selling Price and Estimated Profit Margin for Enterprise Job Orders', 13, 'published', now(), now()),
  ('bd736f61-09d0-5821-b1a0-24271a2d0833', 'Computer Networks Overview: Definition, Goals, Resource Sharing, High Reliability, Scalability, Communication Medium', 1, 'published', now(), now()),
  ('bd736f61-09d0-5821-b1a0-24271a2d0833', 'Data Communication Fundamentals: Components (Sender, Receiver, Transmission Medium, Message, Protocols)', 2, 'published', now(), now()),
  ('bd736f61-09d0-5821-b1a0-24271a2d0833', 'Data Transmission Modes: Simplex (Unidirectional), Half-Duplex (Both Directions, One at a Time), Full-Duplex (Simultaneous)', 3, 'published', now(), now()),
  ('bd736f61-09d0-5821-b1a0-24271a2d0833', 'Network Topologies: Bus, Star, Ring, Mesh, Tree, and Hybrid Topologies (Advantages, Disadvantages, Fault Tolerance)', 4, 'published', now(), now()),
  ('bd736f61-09d0-5821-b1a0-24271a2d0833', 'Network Classifications by Geographic Scope: Local Area Network (LAN), Metropolitan Area Network (MAN), Wide Area Network (WAN), PAN', 5, 'published', now(), now()),
  ('bd736f61-09d0-5821-b1a0-24271a2d0833', 'Transmission Media: Guided Media (Twisted Pair Cable - UTP/STP, Coaxial Cable - Thinnet/Thicknet, Fiber Optic Cable - Single/Multi-mode)', 6, 'published', now(), now()),
  ('bd736f61-09d0-5821-b1a0-24271a2d0833', 'Unguided (Wireless) Media: Radio Waves, Microwaves (Line-of-Sight), Infrared Transmission, Satellite Communication', 7, 'published', now(), now()),
  ('bd736f61-09d0-5821-b1a0-24271a2d0833', 'Network Hardware Interconnection Devices: Repeaters, Hubs (Active vs Passive), Bridges, LAN Switches (Layer 2 Switching)', 8, 'published', now(), now()),
  ('bd736f61-09d0-5821-b1a0-24271a2d0833', 'Internetworking Devices: Routers (Routing Tables, Packet Forwarding), Gateways (Protocol Translation)', 9, 'published', now(), now()),
  ('bd736f61-09d0-5821-b1a0-24271a2d0833', 'Protocols and Layering Concepts: Protocol Hierarchy, Services vs Protocols, Interfaces, Encapsulation and Decapsulation (PDU)', 10, 'published', now(), now()),
  ('bd736f61-09d0-5821-b1a0-24271a2d0833', 'OSI Reference Model: Seven Layers Overview (Physical, Data Link, Network, Transport, Session, Presentation, Application)', 11, 'published', now(), now()),
  ('bd736f61-09d0-5821-b1a0-24271a2d0833', 'TCP/IP Reference Model: Four Layers Overview (Network Access, Internet, Transport, Application) and Comparison with OSI Model', 12, 'published', now(), now()),
  ('37faa7a4-65df-5cef-9c27-88f370bcf244', 'Network Architecture Paradigms: Client-Server Architecture (Dedicated Servers) vs Peer-to-Peer (P2P) Architecture', 1, 'published', now(), now()),
  ('37faa7a4-65df-5cef-9c27-88f370bcf244', 'Physical Layer Functionalities: Bit Representation, Line Coding (NRZ, Manchester, Differential Manchester), Data Rate Bounds (Nyquist & Shannon Theorems)', 2, 'published', now(), now()),
  ('37faa7a4-65df-5cef-9c27-88f370bcf244', 'Data Link Layer Functionalities: Framing, Bit Stuffing, Byte Stuffing, Error Control (Parity, Checksum, Cyclic Redundancy Check - CRC)', 3, 'published', now(), now()),
  ('37faa7a4-65df-5cef-9c27-88f370bcf244', 'Flow Control Mechanisms: Stop-and-Wait ARQ, Sliding Window Protocols (Go-Back-N ARQ, Selective Repeat ARQ)', 4, 'published', now(), now()),
  ('37faa7a4-65df-5cef-9c27-88f370bcf244', 'Medium Access Control (MAC) Sublayer: Channel Allocation, Pure ALOHA vs Slotted ALOHA (Efficiency Derivation)', 5, 'published', now(), now()),
  ('37faa7a4-65df-5cef-9c27-88f370bcf244', 'Carrier Sense Multiple Access (CSMA): 1-Persistent, Non-Persistent, p-Persistent CSMA Protocols', 6, 'published', now(), now()),
  ('37faa7a4-65df-5cef-9c27-88f370bcf244', 'CSMA/CD (Collision Detection) in Ethernet (IEEE 802.3): Minimum Frame Size Formula, Exponential Backoff Algorithm', 7, 'published', now(), now()),
  ('37faa7a4-65df-5cef-9c27-88f370bcf244', 'CSMA/CA (Collision Avoidance) in Wireless LANs (IEEE 802.11): RTS/CTS Handshake, Interframe Spacing (DIFS, SIFS)', 8, 'published', now(), now()),
  ('37faa7a4-65df-5cef-9c27-88f370bcf244', 'Network Layer Functionalities: Packet Switching vs Circuit Switching vs Message Switching, Routing Strategies (Static vs Dynamic)', 9, 'published', now(), now()),
  ('37faa7a4-65df-5cef-9c27-88f370bcf244', 'Transport Layer Functionalities: End-to-End Delivery, Port Addressing, Multiplexing and Demultiplexing', 10, 'published', now(), now()),
  ('37faa7a4-65df-5cef-9c27-88f370bcf244', 'Transmission Control Protocol (TCP): Connection-Oriented, 3-Way Handshake (SYN, SYN-ACK, ACK), Flow Control (Sliding Window), Congestion Control', 11, 'published', now(), now()),
  ('37faa7a4-65df-5cef-9c27-88f370bcf244', 'User Datagram Protocol (UDP): Connectionless, Lightweight, Header Format (8 Bytes), Real-Time Streaming and Voice Applications', 12, 'published', now(), now()),
  ('2835f2ed-948e-5377-bb43-f572e7e47ede', 'Logical Addressing in TCP/IP: IPv4 32-Bit Address Space, Dotted-Decimal Notation, Binary Representation', 1, 'published', now(), now()),
  ('2835f2ed-948e-5377-bb43-f572e7e47ede', 'Classful Addressing: Class A, Class B, Class C, Class D (Multicast), Class E (Experimental), Default Subnet Masks', 2, 'published', now(), now()),
  ('2835f2ed-948e-5377-bb43-f572e7e47ede', 'Subnetting & Supernetting: Subnet Masking, Calculating Network ID, Broadcast ID, Number of Usable Host IP Addresses', 3, 'published', now(), now()),
  ('2835f2ed-948e-5377-bb43-f572e7e47ede', 'Classless Inter-Domain Routing (CIDR): Slash (/) Notation, Prefix Length, Hierarchical Route Aggregation', 4, 'published', now(), now()),
  ('2835f2ed-948e-5377-bb43-f572e7e47ede', 'IPv4 Datagram Header Format: Version, IHL, Type of Service (ToS), Total Length, Identification, Flags (DF, MF), Fragment Offset, TTL, Protocol, Header Checksum', 5, 'published', now(), now()),
  ('2835f2ed-948e-5377-bb43-f572e7e47ede', 'IP Packet Fragmentation and Reassembly: MTU Constraints, Fragmentation Calculations', 6, 'published', now(), now()),
  ('2835f2ed-948e-5377-bb43-f572e7e47ede', 'IPv6 Addressing Architecture: 128-Bit Address Space, Colon-Hexadecimal Notation, Zero Compression Rules (::)', 7, 'published', now(), now()),
  ('2835f2ed-948e-5377-bb43-f572e7e47ede', 'IPv6 Header Format: Fixed 40-Byte Header, Extension Headers, Advantages over IPv4 (Massive Space, Built-in IPSec, Simplified Header)', 8, 'published', now(), now()),
  ('2835f2ed-948e-5377-bb43-f572e7e47ede', 'IPv4 to IPv6 Transition Mechanisms: Dual Stack, Tunneling (6to4), Network Address Translation - Protocol Translation (NAT-PT)', 9, 'published', now(), now()),
  ('2835f2ed-948e-5377-bb43-f572e7e47ede', 'Address Resolution Protocol (ARP): Mapping IP Address to Physical MAC Address, ARP Request (Broadcast) & ARP Reply (Unicast), ARP Cache', 10, 'published', now(), now()),
  ('2835f2ed-948e-5377-bb43-f572e7e47ede', 'Reverse Address Resolution Protocol (RARP), BOOTP, and Dynamic Host Configuration Protocol (DHCP) DORA Process (Discover, Offer, Request, Acknowledge)', 11, 'published', now(), now()),
  ('2835f2ed-948e-5377-bb43-f572e7e47ede', 'Internet Control Message Protocol (ICMP): Error Reporting (Destination Unreachable, Time Exceeded), Query Messages (Echo Request/Reply for ping)', 12, 'published', now(), now()),
  ('2835f2ed-948e-5377-bb43-f572e7e47ede', 'Internet Group Management Protocol (IGMP): Multicast Group Joining and Membership Maintenance, Multicast Routing Overview', 13, 'published', now(), now()),
  ('f0acb400-ece5-5fa8-8e5f-005951bd5d0b', 'Application Layer Overview: Client-Server Programming Paradigm, Socket API (Socket, Bind, Listen, Accept, Connect, Send, Recv)', 1, 'published', now(), now()),
  ('f0acb400-ece5-5fa8-8e5f-005951bd5d0b', 'Domain Name System (DNS): Distributed Hierarchical Database, Name Space (Root, TLD, Second-Level, Subdomains)', 2, 'published', now(), now()),
  ('f0acb400-ece5-5fa8-8e5f-005951bd5d0b', 'DNS Operation: Recursive vs Iterative Query Resolution, DNS Caching, DNS Resource Records (A, AAAA, CNAME, MX, NS, PTR)', 3, 'published', now(), now()),
  ('f0acb400-ece5-5fa8-8e5f-005951bd5d0b', 'Dynamic DNS (DDNS): Automated IP Address Mapping for Dynamic Host Configurations', 4, 'published', now(), now()),
  ('f0acb400-ece5-5fa8-8e5f-005951bd5d0b', 'Remote Logging - TELNET: Virtual Terminal Protocol, Network Virtual Terminal (NVT), Security Vulnerabilities (Plaintext Passwords)', 5, 'published', now(), now()),
  ('f0acb400-ece5-5fa8-8e5f-005951bd5d0b', 'Secure Shell (SSH): Encrypted Remote Terminal Connection, Public-Key Authentication, Port Forwarding / Tunneling', 6, 'published', now(), now()),
  ('f0acb400-ece5-5fa8-8e5f-005951bd5d0b', 'Electronic Mail Architecture: User Agent (MUA), Message Transfer Agent (MTA), Message Access Agent (MAA)', 7, 'published', now(), now()),
  ('f0acb400-ece5-5fa8-8e5f-005951bd5d0b', 'Email Protocols: Simple Mail Transfer Protocol (SMTP, Port 25/587), Post Office Protocol (POP3, Port 110), Internet Message Access Protocol (IMAP4, Port 143)', 8, 'published', now(), now()),
  ('f0acb400-ece5-5fa8-8e5f-005951bd5d0b', 'File Transfer Protocol (FTP): Dual Connection Architecture (Control Connection Port 21, Data Connection Port 20), Active vs Passive FTP Modes', 9, 'published', now(), now()),
  ('f0acb400-ece5-5fa8-8e5f-005951bd5d0b', 'Hypertext Transfer Protocol (HTTP): Client-Server Request-Response Model, Uniform Resource Identifier (URI/URL)', 10, 'published', now(), now()),
  ('f0acb400-ece5-5fa8-8e5f-005951bd5d0b', 'HTTP Methods (GET, POST, PUT, DELETE, HEAD), Status Codes (200 OK, 301 Redirect, 404 Not Found, 500 Server Error)', 11, 'published', now(), now()),
  ('f0acb400-ece5-5fa8-8e5f-005951bd5d0b', 'Persistent vs Non-Persistent HTTP, HTTP/1.1 vs HTTP/2 vs HTTP/3, Cookies and Web Caching', 12, 'published', now(), now()),
  ('f0acb400-ece5-5fa8-8e5f-005951bd5d0b', 'Simple Network Management Protocol (SNMP): Architecture (Manager, Agent, MIB, SMI), SNMP Operations (Get, Set, Trap), UDP Port 161/162', 13, 'published', now(), now()),
  ('d2f7a40a-5d00-5a8b-bc46-a9a1714ff67f', 'Network Security Fundamentals: Security Goals (Confidentiality, Integrity, Availability - CIA Triad), Non-Repudiation, Authentication', 1, 'published', now(), now()),
  ('d2f7a40a-5d00-5a8b-bc46-a9a1714ff67f', 'Threats and Cyber Attacks: Passive Attacks (Eavesdropping, Traffic Analysis) vs Active Attacks (Masquerade, Replay, Modification, Denial of Service - DoS/DDoS)', 2, 'published', now(), now()),
  ('d2f7a40a-5d00-5a8b-bc46-a9a1714ff67f', 'Cryptography Basics: Plaintext, Ciphertext, Encryption, Decryption, Kerckhoffs''s Principle', 3, 'published', now(), now()),
  ('d2f7a40a-5d00-5a8b-bc46-a9a1714ff67f', 'Symmetric-Key (Secret-Key) Cryptography: Principles, Advantages, Shared Secret Distribution Problem, DES, Triple-DES, Advanced Encryption Standard (AES)', 4, 'published', now(), now()),
  ('d2f7a40a-5d00-5a8b-bc46-a9a1714ff67f', 'Asymmetric-Key (Public-Key) Cryptography: Key Pairs (Public Key, Private Key), Mathematical Trapdoor Functions, RSA Algorithm', 5, 'published', now(), now()),
  ('d2f7a40a-5d00-5a8b-bc46-a9a1714ff67f', 'Message Authentication & Integrity: Cryptographic Hash Functions (MD5, SHA-256), Collision Resistance, Message Authentication Codes (MAC / HMAC)', 6, 'published', now(), now()),
  ('d2f7a40a-5d00-5a8b-bc46-a9a1714ff67f', 'Digital Signatures: Signing with Private Key, Verification with Public Key, Non-Repudiation Proof, Digital Certificates (X.509 Standard, Certificate Authority - CA)', 7, 'published', now(), now()),
  ('d2f7a40a-5d00-5a8b-bc46-a9a1714ff67f', 'Key Management & Distribution: Public Key Infrastructure (PKI), Diffie-Hellman Key Exchange Algorithm (Discrete Logarithm Problem)', 8, 'published', now(), now()),
  ('d2f7a40a-5d00-5a8b-bc46-a9a1714ff67f', 'Network Layer Security - IP Security (IPSec): Architecture, Authentication Header (AH), Encapsulating Security Payload (ESP), Transport Mode vs Tunnel Mode', 9, 'published', now(), now()),
  ('d2f7a40a-5d00-5a8b-bc46-a9a1714ff67f', 'Transport Layer Security (TLS / SSL): Handshake Protocol, Record Protocol, HTTPS (Port 443), Securing Web Transactions', 10, 'published', now(), now()),
  ('d2f7a40a-5d00-5a8b-bc46-a9a1714ff67f', 'Application Layer Security: Pretty Good Privacy (PGP) for Email Security (Confidentiality, Authentication, Compression, Radix-64 Conversion)', 11, 'published', now(), now()),
  ('d2f7a40a-5d00-5a8b-bc46-a9a1714ff67f', 'Perimeter Defense: Firewalls (Packet Filtering Firewalls, Stateful Inspection Firewalls, Application Proxy Firewalls), Virtual Private Networks (VPNs - IPsec/SSL VPNs)', 12, 'published', now(), now()),
  ('1d14535f-4acc-5f0b-a6ff-640784fb2a4b', 'Introduction to Software Engineering: Definition, IEEE Definition, Software Crisis, Software Myths (Management, Customer, Practitioner Myths)', 1, 'published', now(), now()),
  ('1d14535f-4acc-5f0b-a6ff-640784fb2a4b', 'Software Characteristics: Software is Engineered not Manufactured, Software Does Not ''Wear Out'' (Bathtub Curve vs Software Curve)', 2, 'published', now(), now()),
  ('1d14535f-4acc-5f0b-a6ff-640784fb2a4b', 'Software Development Life Cycle (SDLC): Core Phases (Requirement, Analysis, Design, Coding, Testing, Deployment, Maintenance)', 3, 'published', now(), now()),
  ('1d14535f-4acc-5f0b-a6ff-640784fb2a4b', 'Waterfall Model (Classical & Iterative): Sequential Lifecycle, Gate Reviews, Advantages, Limitations (Inflexible to Requirement Changes)', 4, 'published', now(), now()),
  ('1d14535f-4acc-5f0b-a6ff-640784fb2a4b', 'Prototyping Model: Working Mockups, User Feedback Loop, Throwaway vs Evolutionary Prototyping', 5, 'published', now(), now()),
  ('1d14535f-4acc-5f0b-a6ff-640784fb2a4b', 'Rapid Application Development (RAD) Model: Component-Based Construction, Time-Boxing, High-Speed Development Requirements', 6, 'published', now(), now()),
  ('1d14535f-4acc-5f0b-a6ff-640784fb2a4b', 'Evolutionary & Incremental Models: Delivering Working Increments, Staged Development, Managing Changing Requirements', 7, 'published', now(), now()),
  ('1d14535f-4acc-5f0b-a6ff-640784fb2a4b', 'Spiral Model (Barry Boehm): Risk-Driven Framework, Four Quadrants (Objective Setting, Risk Assessment & Reduction, Development & Validation, Planning Next Phase)', 8, 'published', now(), now()),
  ('1d14535f-4acc-5f0b-a6ff-640784fb2a4b', 'Agile Methodologies: Agile Manifesto (4 Values, 12 Principles), Scrum Framework (Product Owner, Scrum Master, Sprints, Daily Standup), Extreme Programming (XP)', 9, 'published', now(), now()),
  ('1d14535f-4acc-5f0b-a6ff-640784fb2a4b', 'Capability Maturity Model (CMM / CMMI): Five Maturity Levels (Initial, Repeatable, Defined, Managed, Optimizing), Key Process Areas (KPAs)', 10, 'published', now(), now()),
  ('1d14535f-4acc-5f0b-a6ff-640784fb2a4b', 'Software Quality Concepts: Quality Attributes (ISO/IEC 9126, McCall''s Quality Factors), Quality Assurance (SQA) vs Quality Control', 11, 'published', now(), now()),
  ('1d14535f-4acc-5f0b-a6ff-640784fb2a4b', 'Software Metrics & Measurement: Product Metrics vs Process Metrics vs Project Metrics, Token Count (Halstead''s Software Science), Lines of Code (LOC)', 12, 'published', now(), now()),
  ('08a5e1de-2fb0-5799-936e-4073b00b027d', 'Requirements Engineering Process: Inception, Elicitation, Elaboration, Negotiation, Specification, Validation, Management', 1, 'published', now(), now()),
  ('08a5e1de-2fb0-5799-936e-4073b00b027d', 'Requirements Elicitation Techniques: Interviews, Questionnaires, FAST (Facilitated Application Specification Techniques), JAD, Brainstorming', 2, 'published', now(), now()),
  ('08a5e1de-2fb0-5799-936e-4073b00b027d', 'Types of Requirements: Functional Requirements (User Interactions, System Behaviors) vs Non-Functional Requirements (Performance, Security, Reliability)', 3, 'published', now(), now()),
  ('08a5e1de-2fb0-5799-936e-4073b00b027d', 'Software Requirements Specification (SRS): Meaning, Importance, Target Audience, IEEE 830 Recommended Practice for SRS', 4, 'published', now(), now()),
  ('08a5e1de-2fb0-5799-936e-4073b00b027d', 'Characteristics of a Good SRS: Correct, Unambiguous, Complete, Consistent, Ranked for Importance/Stability, Verifiable, Modifiable, Traceable', 5, 'published', now(), now()),
  ('08a5e1de-2fb0-5799-936e-4073b00b027d', 'Specification Languages & Formal Methods: Natural Language, Structured English, Z-Notation, Finite State Machines (FSM)', 6, 'published', now(), now()),
  ('08a5e1de-2fb0-5799-936e-4073b00b027d', 'Requirements Validation: Requirements Reviews, Walkthroughs, Audits, Prototyping, Acceptance Test Generation', 7, 'published', now(), now()),
  ('08a5e1de-2fb0-5799-936e-4073b00b027d', 'Requirements Monitoring and Control: Requirements Traceability Matrix (RTM - Forward and Backward Traceability), Change Control Boards (CCB)', 8, 'published', now(), now()),
  ('08a5e1de-2fb0-5799-936e-4073b00b027d', 'Structured Analysis Modeling: Data Flow Diagrams (DFD - Level 0 Context Diagram, Level 1, Level 2 Decomposition Rules), Data Dictionaries', 9, 'published', now(), now()),
  ('08a5e1de-2fb0-5799-936e-4073b00b027d', 'Entity-Relationship Diagrams (ERD) in Requirements Modeling: Entities, Attributes, Relationships, Cardinality', 10, 'published', now(), now()),
  ('08a5e1de-2fb0-5799-936e-4073b00b027d', 'Object-Oriented Analysis (OOA) Modeling with UML: Use Case Diagrams (Actors, Use Cases, <<include>>, <<extend>> Relationships)', 11, 'published', now(), now()),
  ('08a5e1de-2fb0-5799-936e-4073b00b027d', 'UML Structural and Behavioral Diagrams: Class Diagrams, Sequence Diagrams, Statechart Diagrams, Activity Diagrams', 12, 'published', now(), now()),
  ('1af7ec2f-3e14-51e4-88a2-14fc5cf15835', 'Software Project Management Overview: The 4 P''s (People, Product, Process, Project), Project Manager Roles', 1, 'published', now(), now()),
  ('1af7ec2f-3e14-51e4-88a2-14fc5cf15835', 'Software Project Estimation: Size-Oriented Metrics (KLOC), Function-Oriented Metrics (Function Point Analysis - FPA)', 2, 'published', now(), now()),
  ('1af7ec2f-3e14-51e4-88a2-14fc5cf15835', 'Function Point Analysis (Albrecht): Five Function Types (ILF, EIF, EI, EO, EQ), Complexity Weighting, Value Adjustment Factor (VAF), FP Formula', 3, 'published', now(), now()),
  ('1af7ec2f-3e14-51e4-88a2-14fc5cf15835', 'Empirical Estimation Models: COCOMO Model (Constructive Cost Model by Barry Boehm), Basic COCOMO Modes (Organic, Semidetached, Embedded)', 4, 'published', now(), now()),
  ('1af7ec2f-3e14-51e4-88a2-14fc5cf15835', 'COCOMO Mathematical Equations: Effort = a * (KLOC)^b (Person-Months), Development Time = c * (Effort)^d (Months)', 5, 'published', now(), now()),
  ('1af7ec2f-3e14-51e4-88a2-14fc5cf15835', 'Intermediate COCOMO: Cost Drivers (Product, Hardware, Personnel, Project Attributes), Effort Multipliers (EAF)', 6, 'published', now(), now()),
  ('1af7ec2f-3e14-51e4-88a2-14fc5cf15835', 'Detailed COCOMO (COCOMO II): Application Composition, Early Design, Post-Architecture Estimation Models', 7, 'published', now(), now()),
  ('1af7ec2f-3e14-51e4-88a2-14fc5cf15835', 'Project Scheduling & Tracking: Work Breakdown Structure (WBS), Task Networks, Effort Distribution (40-20-40 Rule)', 8, 'published', now(), now()),
  ('1af7ec2f-3e14-51e4-88a2-14fc5cf15835', 'Critical Path Method (CPM) and PERT: Earliest Start/Finish, Latest Start/Finish, Slack Time, Gantt Charts, Milestone Tracking', 9, 'published', now(), now()),
  ('1af7ec2f-3e14-51e4-88a2-14fc5cf15835', 'Software Team Organizations: Democratic Decentralized (DD), Controlled Decentralized (CD), Controlled Centralized (Chief Programmer Team)', 10, 'published', now(), now()),
  ('1af7ec2f-3e14-51e4-88a2-14fc5cf15835', 'Risk Management: Reactive vs Proactive Risk Strategies, Risk Identification, Risk Projection (Impact and Likelihood Rating), RMMM Plan', 11, 'published', now(), now()),
  ('1af7ec2f-3e14-51e4-88a2-14fc5cf15835', 'Software Configuration Management (SCM): Need for SCM, Baselines, SCM Process (Identification, Version Control, Change Control, Configuration Auditing)', 12, 'published', now(), now()),
  ('257f27a7-7fc7-5a7a-bf86-4827249b1d9e', 'Software Design Concept: Transforming Analysis Model to Design Model, Design Quality Guidelines', 1, 'published', now(), now()),
  ('257f27a7-7fc7-5a7a-bf86-4827249b1d9e', 'Fundamental Design Concepts: Abstraction (Data, Procedural), Architecture, Modularity, Information Hiding (Parnas Principle)', 2, 'published', now(), now()),
  ('257f27a7-7fc7-5a7a-bf86-4827249b1d9e', 'Functional Independence: Cohesion and Coupling (The Golden Rule: High Cohesion and Low Coupling)', 3, 'published', now(), now()),
  ('257f27a7-7fc7-5a7a-bf86-4827249b1d9e', 'Types of Cohesion (Worst to Best): Coincidental, Logical, Temporal, Procedural, Communicational, Sequential, Functional Cohesion', 4, 'published', now(), now()),
  ('257f27a7-7fc7-5a7a-bf86-4827249b1d9e', 'Types of Coupling (Worst to Best): Content, Common (Global), Control, Stamp (Data Structure), Data, Uncoupled', 5, 'published', now(), now()),
  ('257f27a7-7fc7-5a7a-bf86-4827249b1d9e', 'Architectural Design Styles: Data-Centered (Repository/Blackboard), Data-Flow (Pipe-and-Filter), Call-and-Return, Layered Architecture, Client-Server', 6, 'published', now(), now()),
  ('257f27a7-7fc7-5a7a-bf86-4827249b1d9e', 'Structured Design Methodology: Structure Charts, Transform Analysis (Transform Center Flow) vs Transaction Analysis', 7, 'published', now(), now()),
  ('257f27a7-7fc7-5a7a-bf86-4827249b1d9e', 'Object-Oriented Design (OOD): SOLID Design Principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion)', 8, 'published', now(), now()),
  ('257f27a7-7fc7-5a7a-bf86-4827249b1d9e', 'Design Patterns: Creational (Singleton, Factory Method), Structural (Adapter, Decorator), Behavioral (Observer, Strategy)', 9, 'published', now(), now()),
  ('257f27a7-7fc7-5a7a-bf86-4827249b1d9e', 'User Interface (UI) Design: Golden Rules (Theo Mandel - Place User in Control, Reduce Memory Load, Make UI Consistent), Usability Engineering', 10, 'published', now(), now()),
  ('257f27a7-7fc7-5a7a-bf86-4827249b1d9e', 'Design Specification and Verification: Design Walkthroughs, Critical Design Reviews (CDR), Design Translation Process (Mapping Design to Source Code)', 11, 'published', now(), now()),
  ('257f27a7-7fc7-5a7a-bf86-4827249b1d9e', 'Design Metrics: Architectural Complexity Metrics, Cyclomatic Complexity (Thomas McCabe: V(G) = E - N + 2P or P + 1)', 12, 'published', now(), now()),
  ('bdc2265d-5322-5fef-82b8-31f64062fa3f', 'Software Testing Fundamentals: Verification vs Validation (V&V - Boehm''s Question), Error vs Fault (Defect/Bug) vs Failure', 1, 'published', now(), now()),
  ('bdc2265d-5322-5fef-82b8-31f64062fa3f', 'Testing Psychology & Principles: Exhaustive Testing is Impossible, Pesticide Paradox, Early Testing Saves Costs', 2, 'published', now(), now()),
  ('bdc2265d-5322-5fef-82b8-31f64062fa3f', 'White-Box (Glass-Box / Structural) Testing: Basis Path Testing, Control Flow Graphs (CFG), Cyclomatic Complexity Formula', 3, 'published', now(), now()),
  ('bdc2265d-5322-5fef-82b8-31f64062fa3f', 'Coverage Criteria: Statement Coverage, Branch / Decision Coverage, Condition Coverage, Path Coverage', 4, 'published', now(), now()),
  ('bdc2265d-5322-5fef-82b8-31f64062fa3f', 'Black-Box (Functional / Behavioral) Testing: Equivalence Partitioning (Valid and Invalid Classes), Boundary Value Analysis (BVA)', 5, 'published', now(), now()),
  ('bdc2265d-5322-5fef-82b8-31f64062fa3f', 'Specialized Black-Box Techniques: Cause-Effect Graphing, Decision Table Testing, Error Guessing', 6, 'published', now(), now()),
  ('bdc2265d-5322-5fef-82b8-31f64062fa3f', 'Strategic Levels of Testing: Unit Testing (Stubs and Drivers), Integration Testing (Top-Down, Bottom-Up, Big-Bang, Sandwich)', 7, 'published', now(), now()),
  ('bdc2265d-5322-5fef-82b8-31f64062fa3f', 'System Testing (Sanity, Smoke, Stress, Load, Performance, Security Testing), Regression Testing, Acceptance Testing (Alpha & Beta Testing)', 8, 'published', now(), now()),
  ('bdc2265d-5322-5fef-82b8-31f64062fa3f', 'Debugging Process & Strategies: Brute Force, Backtracking, Cause Elimination, Automated Debugging Tools', 9, 'published', now(), now()),
  ('bdc2265d-5322-5fef-82b8-31f64062fa3f', 'Software Maintenance: Meaning, Need, Categories of Maintenance (Corrective, Adaptive, Perfective, Preventive Maintenance)', 10, 'published', now(), now()),
  ('bdc2265d-5322-5fef-82b8-31f64062fa3f', 'Software Maintenance Cost Drivers: Lehman''s Laws of Software Evolution, Reverse Engineering and Software Reengineering Cycle', 11, 'published', now(), now()),
  ('bdc2265d-5322-5fef-82b8-31f64062fa3f', 'Software Reliability and Availability: Mean Time Between Failures (MTBF = MTTF + MTTR), Availability Formula (A = MTTF / (MTTF + MTTR))', 12, 'published', now(), now()),
  ('bdc2265d-5322-5fef-82b8-31f64062fa3f', 'Cleanroom Software Engineering Approach: Zero-Defect Philosophy, Formal Specification, Statistical Usage Testing without Unit Testing', 13, 'published', now(), now()),
  ('bdc2265d-5322-5fef-82b8-31f64062fa3f', 'Software Reuse & Standards: Component-Based Software Engineering (CBSE), IEEE Software Engineering Standards (IEEE 730, 829, 830, 1012, 1074)', 14, 'published', now(), now());

COMMIT;