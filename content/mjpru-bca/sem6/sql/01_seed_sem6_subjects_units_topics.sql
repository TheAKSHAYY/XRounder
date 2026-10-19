BEGIN;
-- Insert or Update 5 Subjects for Semester 6
INSERT INTO public.subjects (id, semester_id, code, title, slug, credits, status, sort_order, created_at, updated_at)
VALUES
  ('552b2f6b-3a20-51cd-a38f-74c5c1dd264f', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 'BCA-302N', 'Introduction to Data Science', 'bca-302n-introduction-to-data-science', 4, 'published', 1, now(), now()),
  ('2472ea21-6f22-58ca-be95-4e69358584d8', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 'BCA-304N', 'Cloud Computing', 'bca-304n-cloud-computing', 4, 'published', 2, now(), now()),
  ('a7abc181-9ab8-5f55-84ba-2f618850b0f4', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 'BCA-306N', 'Internet of Things', 'bca-306n-internet-of-things', 4, 'published', 3, now(), now()),
  ('e0ab16d7-4783-5b2a-b54a-248ae304f19f', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 'BCA-441E', 'Software Testing', 'bca-441e-software-testing', 4, 'published', 4, now(), now()),
  ('48778a47-9585-56ea-b9e4-fcd8f2d82622', 'bcf332d5-de47-4d5a-8dbe-ec52f8239539', 'BCA-442E', 'Advanced Web Development Technologies', 'bca-442e-advanced-web-development-technologies', 4, 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET
  semester_id = EXCLUDED.semester_id, code = EXCLUDED.code, title = EXCLUDED.title,
  slug = EXCLUDED.slug, credits = EXCLUDED.credits, status = 'published',
  sort_order = EXCLUDED.sort_order, updated_at = now();

-- Insert or Update Units for Semester 6
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('fb8b37f9-6fc2-589b-a7de-4c3b4c6f3a83', '552b2f6b-3a20-51cd-a38f-74c5c1dd264f', 1, 'Introduction to Data Science and Foundations', 'Evolution of Data Science, Data Science Roles, Stages in a Data Science Project, Applications, and Data Security Issues.', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('2a7f47ac-c05c-5763-9251-f8d90031747f', '552b2f6b-3a20-51cd-a38f-74c5c1dd264f', 2, 'Data Collection and Data Pre-Processing', 'Data Collection Strategies, Data Pre-Processing Overview, Data Cleaning, Data Integration and Transformation, Data Reduction, and Discretization.', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', '552b2f6b-3a20-51cd-a38f-74c5c1dd264f', 3, 'Exploratory Data Analytics (EDA)', 'Descriptive Statistics, Mean, Standard Deviation, Skewness and Kurtosis, Box Plots, Pivot Table, Heat Map, Correlation Statistics, and ANOVA.', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('cf4515e9-da99-5068-b6e1-a4b80c235dc6', '552b2f6b-3a20-51cd-a38f-74c5c1dd264f', 4, 'Model Development', 'Simple and Multiple Regression, Model Evaluation using Visualization, Residual Plot, Distribution Plot, Polynomial Regression and Pipelines, In-sample Evaluation, Prediction.', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', '552b2f6b-3a20-51cd-a38f-74c5c1dd264f', 5, 'Model Evaluation and Optimization', 'Generalization Error, Out-of-Sample Evaluation Metrics, Cross Validation, Overfitting, Under Fitting and Model Selection, Ridge Regression, and Grid Search.', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('a6006172-65c5-5e2f-b3e6-d4c227abf563', '2472ea21-6f22-58ca-be95-4e69358584d8', 1, 'Introduction to Parallel, Distributed and Cloud Computing', 'Parallel and Distributed Computing, Cloud Characteristics and Benefits, Historical Developments, Distributed Systems, Virtualization, Web 2.0, SOA, Utility Computing, Reference Model.', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', '2472ea21-6f22-58ca-be95-4e69358584d8', 2, 'Virtualization Technologies and Architectures', 'Characteristics of Virtualized Environments, Taxonomy of Virtualization, Virtualization and Cloud, Pros and Cons, Xen, VMware, Hyper-V.', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('21e7349c-a1d3-5efc-8961-c0ffa8227c4d', '2472ea21-6f22-58ca-be95-4e69358584d8', 3, 'Cloud Computing Architecture and Infrastructure (IaaS)', 'Cloud Architecture, Service Models (IaaS, PaaS, SaaS), Deployment Models (Public, Private, Hybrid, Community), IaaS Details, Server, Storage and Network Virtualization.', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('874914b5-12e1-5f49-982a-a54c625d20f0', '2472ea21-6f22-58ca-be95-4e69358584d8', 4, 'Platform as a Service (PaaS) and Software as a Service (SaaS)', 'PaaS Introduction, Computation and Storage Management, SaaS Introduction, Cloud Services, Web Services, Web 2.0, Web OS, and Case Studies of IaaS, PaaS, SaaS.', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('fdf96420-371c-58b9-bcb7-92e6977e01f6', '2472ea21-6f22-58ca-be95-4e69358584d8', 5, 'Cloud Economics, Open Challenges and Emerging Paradigms', 'Economics of the Cloud, Open Challenges, Emerging Computing Paradigms (Edge, Mobile Cloud, Fog Computing), IoT Cloud, and Cloud Simulators.', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('9bec8258-17ab-5753-8fb5-d49d02bc82d9', 'a7abc181-9ab8-5f55-84ba-2f618850b0f4', 1, 'Introduction to IoT and Architectures', 'Genesis of IoT, Digitization, IoT Challenges, Comparing IoT Architectures, Simplified IoT Architecture, Core IoT Functional Stack, Data Management and Compute Stack.', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('68abe907-5dc7-555e-8a8a-306b1b00ea60', 'a7abc181-9ab8-5f55-84ba-2f618850b0f4', 2, 'Engineering for IoT Networks and Protocols', 'Sensors, Actuators, Smart Objects, Sensor Networks, IoT Access Technologies, IP as Network Layer, Application Protocols for IoT.', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('89bfb023-b67d-5187-b82f-664f1885c743', 'a7abc181-9ab8-5f55-84ba-2f618850b0f4', 3, 'Data and Analytics for IoT', 'Data Analytics for IoT, Machine Learning, Big Data Analytics Tools, Edge Streaming Analytics, Network Analytics.', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('99464cfb-1c1d-560f-908f-548a6bc5911a', 'a7abc181-9ab8-5f55-84ba-2f618850b0f4', 4, 'Cloud Storage Models and IoT Security', 'Cloud Storage Models, Communication APIs, IoT Security Challenges, and IoT System Security Practices.', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('f7a3784b-d0ca-524b-9616-5f643fe4acfb', 'a7abc181-9ab8-5f55-84ba-2f618850b0f4', 5, 'IoT in Industry and Vertical Applications', 'Industrial IoT (IIoT), Manufacturing, Oil and Gas, Utilities, Smart Cities, Transportation, Mining, and Public Safety.', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('7387ca29-487c-5de1-be94-087257a4c1ae', 'e0ab16d7-4783-5b2a-b54a-248ae304f19f', 1, 'Software Testing Fundamentals and Debugging', 'Introduction to Software Testing, Nature of Errors, Faults, and Failures, Testing Principles, Testing Fundamentals, STLC, and Debugging.', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('8741448e-79a6-5f6f-8305-88fc28150f12', 'e0ab16d7-4783-5b2a-b54a-248ae304f19f', 2, 'Approaches to Testing (White Box, Black Box, Gray Box and Integration)', 'White Box Testing, Black Box Testing, Gray Box Testing, Unit Testing, Integration Testing (Top-down, Bottom-up, Big-bang, Sandwich).', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('71b054ef-8ae4-5b17-ac66-87638111c841', 'e0ab16d7-4783-5b2a-b54a-248ae304f19f', 3, 'Testing for Specialized Environments', 'Testing GUIs, Testing Client/Server Architectures, Testing Documentation and Help Facilities, Testing for Real-Time Systems.', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('8befecdd-89c6-528b-91eb-ea637a8bb03a', 'e0ab16d7-4783-5b2a-b54a-248ae304f19f', 4, 'Software Testing Strategies and Software Metrics', 'Validation Testing, System Testing, Verification, Performance Testing, Regression Testing, Agile Testing, Acceptance Testing, Smoke/Load Testing, Basic Metrics, Complexity Metrics.', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('2b5a3994-7e81-569b-a568-9ff7d969c933', 'e0ab16d7-4783-5b2a-b54a-248ae304f19f', 5, 'Specialized Testing and Automated Testing Tools', 'Test Case Design, IEEE Test Documentation, JUnit, Apache JMeter, WinRunner, LoadRunner, Rational Robot.', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('304ea51d-c15d-587f-beb4-a82087b80385', '48778a47-9585-56ea-b9e4-fcd8f2d82622', 1, 'JavaScript Fundamentals and Modern ECMAScript', 'JavaScript Syntax, Internal/External JS, DOM & Window Object, Variables, Types, Math/String, Objects, Arrays, Dates, Conditionals, Loops, and Functions.', 'published', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('9ede825c-c2bb-5edd-8258-c240dd59905f', '48778a47-9585-56ea-b9e4-fcd8f2d82622', 2, 'React.js Framework, State Management and Tooling', 'JSX, Components, State and Props, Lifecycle, Rendering Lists, Portals, Error Handling, Routers, Redux, Redux Saga, Immutable.js, SSR, Unit Testing, Webpack.', 'published', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('627b394e-7e9b-5c99-809f-0f3412bf114e', '48778a47-9585-56ea-b9e4-fcd8f2d82622', 3, 'Node.js and Express.js Server-Side Engineering', 'Node.js Overview, Setup, Console, Command Utilities, Modules, Concepts, Events, Express.js, and Database Access.', 'published', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('96f26227-188c-54dc-ac74-7e6c92c66ffd', '48778a47-9585-56ea-b9e4-fcd8f2d82622', 4, 'SQL vs NoSQL and MongoDB Database Architecture', 'SQL and NoSQL Concepts, Create and Manage MongoDB, Data Migration, MongoDB with PHP, MongoDB with NodeJS, Services Offered by MongoDB.', 'published', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.units (id, subject_id, number, title, summary, status, sort_order, created_at, updated_at)
VALUES ('8b70b91b-b66b-546c-9e8f-151f6592c49d', '48778a47-9585-56ea-b9e4-fcd8f2d82622', 5, 'Python Web Integration and Full-Stack MongoDB Connectivity', 'Python Installation and Configuration, Developing Python Applications, Connecting MongoDB with Python (PyMongo), and Full-Stack Integration.', 'published', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, status = 'published', sort_order = EXCLUDED.sort_order, updated_at = now();

-- Insert or Update Syllabus Topics for Semester 6
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e7939376-53ad-5f39-ac7f-db9ba71cafb3', 'fb8b37f9-6fc2-589b-a7de-4c3b4c6f3a83', 'Introduction to Data Science & Multidisciplinary Nature', 'bca-302n-u1-t1-introduction-to-data-science-and-multidi', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('18b0245a-8ff8-5328-b249-5e5c34e4eeac', 'fb8b37f9-6fc2-589b-a7de-4c3b4c6f3a83', 'Evolution of Data Science & Big Data Revolution', 'bca-302n-u1-t2-evolution-of-data-science-and-big-data-r', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('61aa1d97-90c0-5717-ab52-f7be74b06a07', 'fb8b37f9-6fc2-589b-a7de-4c3b4c6f3a83', 'Data Science Roles: Data Scientist, Analyst, Engineer & ML Engineer', 'bca-302n-u1-t3-data-science-roles-data-scientist,-analy', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('d23da8a1-7229-56a0-a709-6603e1a3eb25', 'fb8b37f9-6fc2-589b-a7de-4c3b4c6f3a83', 'Stages in a Data Science Project: Problem Formulation & Data Pipeline', 'bca-302n-u1-t4-stages-in-a-data-science-project-problem', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('081f6a06-6cad-5470-a8fe-59b034d9898a', 'fb8b37f9-6fc2-589b-a7de-4c3b4c6f3a83', 'Data Collection, Exploration, Modeling, Validation & Deployment Stages', 'bca-302n-u1-t5-data-collection,-exploration,-modeling,-', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a26a29ad-d7df-5b65-8d54-5839ad04ae2e', 'fb8b37f9-6fc2-589b-a7de-4c3b4c6f3a83', 'Applications of Data Science in Healthcare, Finance, E-commerce & Logistics', 'bca-302n-u1-t6-applications-of-data-science-in-healthca', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('829839d8-d479-5d13-9b25-0ee2973ddfc0', 'fb8b37f9-6fc2-589b-a7de-4c3b4c6f3a83', 'Data Security Issues: Privacy, Anonymization & Data Governance Regulations', 'bca-302n-u1-t7-data-security-issues-privacy,-anonymizat', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('7da2105a-49fe-5a78-adda-9b4a82ed4ad3', 'fb8b37f9-6fc2-589b-a7de-4c3b4c6f3a83', 'Ethical Considerations & Algorithmic Bias in Data Science', 'bca-302n-u1-t8-ethical-considerations-and-algorithmic-b', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('68976a9a-4073-59e3-95bd-5c89bfda928a', 'fb8b37f9-6fc2-589b-a7de-4c3b4c6f3a83', 'Data Science Tools Ecosystem: Python, R, Jupyter, SQL & Cloud Platforms', 'bca-302n-u1-t9-data-science-tools-ecosystem-python,-r,-', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c083c61f-5be5-5dd6-86c3-4e592acdbd66', 'fb8b37f9-6fc2-589b-a7de-4c3b4c6f3a83', 'Comparison: Data Science vs Data Analytics vs Business Intelligence vs AI', 'bca-302n-u1-t10-comparison-data-science-vs-data-analytic', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('68f3dc2e-3bec-5496-a56f-0d5db2b11e01', 'fb8b37f9-6fc2-589b-a7de-4c3b4c6f3a83', 'Types of Data: Structured, Semi-Structured & Unstructured Big Data', 'bca-302n-u1-t11-types-of-data-structured,-semi-structure', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('3ef94e8c-661e-5aa1-983e-3c7be4406f88', 'fb8b37f9-6fc2-589b-a7de-4c3b4c6f3a83', 'Data Literacy & Communication of Insights to Stakeholders', 'bca-302n-u1-t12-data-literacy-and-communication-of-insig', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('ed3bc7c5-23e5-5828-816d-e3af0354c2c9', '2a7f47ac-c05c-5763-9251-f8d90031747f', 'Data Collection Strategies: Primary vs Secondary Sources, APIs & Web Scraping', 'bca-302n-u2-t1-data-collection-strategies-primary-vs-se', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5b9d2cd1-996c-5025-ae42-80b2071a2155', '2a7f47ac-c05c-5763-9251-f8d90031747f', 'Data Pre-Processing Overview & The Garbage-In Garbage-Out Principle', 'bca-302n-u2-t2-data-pre-processing-overview-and-the-gar', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('2aa55831-a2cf-5186-9d38-644c0f5d151b', '2a7f47ac-c05c-5763-9251-f8d90031747f', 'Data Cleaning: Handling Missing Data (Mean/Median Imputation, Dropping, KNN)', 'bca-302n-u2-t3-data-cleaning-handling-missing-data-mean', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a6a47813-73f4-5bda-afb2-e0df632328e9', '2a7f47ac-c05c-5763-9251-f8d90031747f', 'Noisy Data Smoothing: Binning Methods, Clustering & Regression Smoothing', 'bca-302n-u2-t4-noisy-data-smoothing-binning-methods,-cl', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('0e921cfb-1c6a-5064-bf97-ff3b24362f33', '2a7f47ac-c05c-5763-9251-f8d90031747f', 'Outlier Detection: Z-Score, Interquartile Range (IQR) & Isolation Forests', 'bca-302n-u2-t5-outlier-detection-z-score,-interquartile', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('6e5ee924-9929-5216-8ef3-b300c1d2022a', '2a7f47ac-c05c-5763-9251-f8d90031747f', 'Data Integration: Handling Redundancy, Correlation Analysis & Chi-Square Tests', 'bca-302n-u2-t6-data-integration-handling-redundancy,-co', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a99e025e-ca9f-50eb-a435-90aa9c6c7f13', '2a7f47ac-c05c-5763-9251-f8d90031747f', 'Data Transformation: Normalization (Min-Max Scaling) & Standardization (Z-Score)', 'bca-302n-u2-t7-data-transformation-normalization-min-ma', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c4324847-afa9-50ff-82e4-699518e740a9', '2a7f47ac-c05c-5763-9251-f8d90031747f', 'Data Transformation: Log Transforms, Box-Cox & Categorical Encoding (One-Hot, Label)', 'bca-302n-u2-t8-data-transformation-log-transforms,-box-', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('aabdb79b-db8c-50a2-a687-d00f61f00b10', '2a7f47ac-c05c-5763-9251-f8d90031747f', 'Data Reduction Strategies: Dimensionality Reduction Concepts & Feature Selection', 'bca-302n-u2-t9-data-reduction-strategies-dimensionality', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5004de6c-b56a-580a-b1d0-c31f00c262fb', '2a7f47ac-c05c-5763-9251-f8d90031747f', 'Principal Component Analysis (PCA) Fundamentals & Eigenvector Decomposition', 'bca-302n-u2-t10-principal-component-analysis-pca-fundame', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('06aff4ab-8ab1-52f5-847a-a76884fb60a7', '2a7f47ac-c05c-5763-9251-f8d90031747f', 'Numerosity Reduction: Sampling Strategies, Clustering & Aggregation', 'bca-302n-u2-t11-numerosity-reduction-sampling-strategies', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('d8ef4703-94fe-5dcb-852b-f4345bdd2b07', '2a7f47ac-c05c-5763-9251-f8d90031747f', 'Data Discretization: Equal-Width, Equal-Frequency Binning & Concept Hierarchy', 'bca-302n-u2-t12-data-discretization-equal-width,-equal-f', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('9b2daecf-958c-5935-9c22-97aa9825a29b', 'ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', 'Exploratory Data Analysis (EDA) Philosophy, Objectives & Workflow', 'bca-302n-u3-t1-exploratory-data-analysis-eda-philosophy', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c644c52c-43d7-5222-846f-188f22bbe05d', 'ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', 'Descriptive Statistics: Measures of Central Tendency (Mean, Median, Mode)', 'bca-302n-u3-t2-descriptive-statistics-measures-of-centr', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('3b064edb-64c2-548b-8f70-13fcb07045c2', 'ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', 'Measures of Dispersion: Variance, Standard Deviation, Range & Interquartile Range', 'bca-302n-u3-t3-measures-of-dispersion-variance,-standar', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('6baf6d6b-997a-52ba-8690-6d29b83a51b8', 'ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', 'Shape of Data Distribution: Skewness (Positive vs Negative) & Kurtosis (Peakedness)', 'bca-302n-u3-t4-shape-of-data-distribution-skewness-posi', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('49cd0daf-88ef-5fcb-b2fb-018cd17b6343', 'ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', 'Visualizing Five-Number Summary using Box Plots (Whiskers, Medians & Outliers)', 'bca-302n-u3-t5-visualizing-five-number-summary-using-bo', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('0bf01749-9f5c-5639-a615-f9b4d47c80f9', 'ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', 'Pivot Tables: Multi-Dimensional Cross-Tabulation & Aggregation in Python/Pandas', 'bca-302n-u3-t6-pivot-tables-multi-dimensional-cross-tab', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('1ae6700b-7281-5540-bd1f-1c686b1e5ac4', 'ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', 'Heat Maps: Correlation Matrices & Density Heatmaps with Seaborn/Matplotlib', 'bca-302n-u3-t7-heat-maps-correlation-matrices-and-densi', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('38d21804-dec9-5f62-b87c-65187bb32ead', 'ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', 'Correlation Statistics: Covariance vs Pearson Linear Correlation Coefficient', 'bca-302n-u3-t8-correlation-statistics-covariance-vs-pea', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e37af319-6309-514f-99bd-492b00f31855', 'ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', 'Non-Parametric Correlation: Spearman''s Rank Correlation & Kendall''s Tau', 'bca-302n-u3-t9-non-parametric-correlation-spearman's-ra', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('43ab3f73-6eef-5ffe-a644-83c33ded03a9', 'ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', 'Hypothesis Testing Foundations: Null vs Alternative Hypothesis & p-Values', 'bca-302n-u3-t10-hypothesis-testing-foundations-null-vs-a', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('8a8c5408-711f-5945-a118-ab573d83c590', 'ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', 'Analysis of Variance (ANOVA): One-Way ANOVA, F-Statistic & Between-Group Variance', 'bca-302n-u3-t11-analysis-of-variance-anova-one-way-anova', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e8b27913-686f-5a19-8065-9b02cb672f2e', 'ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', 'Two-Way ANOVA & Post-Hoc Tests for Group Comparisons', 'bca-302n-u3-t12-two-way-anova-and-post-hoc-tests-for-gro', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('7130e4c4-7600-50d7-8ee3-7cb62b82cbf1', 'ea2cd1a5-282d-50fb-9140-85eaa10d8ecd', 'Visual EDA Tools: Histograms, KDE Density Plots, Pairplots & Scatter Plots', 'bca-302n-u3-t13-visual-eda-tools-histograms,-kde-density', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('d2a05cea-13d3-521b-a190-55de542a12a2', 'cf4515e9-da99-5068-b6e1-a4b80c235dc6', 'Model Development Fundamentals: Supervised Learning & Regression Paradigm', 'bca-302n-u4-t1-model-development-fundamentals-supervise', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('552dd485-b831-5bb8-8663-22ff8c1188be', 'cf4515e9-da99-5068-b6e1-a4b80c235dc6', 'Simple Linear Regression: Mathematical Formulation, Slope (Beta-1) & Intercept (Beta-0)', 'bca-302n-u4-t2-simple-linear-regression-mathematical-fo', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e30505ce-226f-587c-82a0-5dd76695a9dd', 'cf4515e9-da99-5068-b6e1-a4b80c235dc6', 'Ordinary Least Squares (OLS) Method & Loss Function Minimization', 'bca-302n-u4-t3-ordinary-least-squares-ols-method-and-lo', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('26f96909-1d32-5b17-87bc-20036acdcdd9', 'cf4515e9-da99-5068-b6e1-a4b80c235dc6', 'Multiple Linear Regression: Formulation, Matrix Notation & Multi-Feature Relationships', 'bca-302n-u4-t4-multiple-linear-regression-formulation,-', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('82a50b8a-c795-5772-a9ba-8acb99a23d8d', 'cf4515e9-da99-5068-b6e1-a4b80c235dc6', 'Multicollinearity in Multiple Regression & Variance Inflation Factor (VIF)', 'bca-302n-u4-t5-multicollinearity-in-multiple-regression', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('cdff7160-6b69-5cb1-b0b3-45ab3202d90e', 'cf4515e9-da99-5068-b6e1-a4b80c235dc6', 'Model Evaluation using Visualization: Scatter Plots with Regression Lines', 'bca-302n-u4-t6-model-evaluation-using-visualization-sca', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('aaa239cc-4268-5a9d-bf6e-8d44be0d5908', 'cf4515e9-da99-5068-b6e1-a4b80c235dc6', 'Residual Plots: Detecting Non-Linearity, Heteroscedasticity & Residual Normality', 'bca-302n-u4-t7-residual-plots-detecting-non-linearity,-', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c5ec377e-4c97-5750-8d61-f80b4592a1f0', 'cf4515e9-da99-5068-b6e1-a4b80c235dc6', 'Distribution Plots: Actual vs Predicted Value Distribution Comparisons', 'bca-302n-u4-t8-distribution-plots-actual-vs-predicted-v', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('608ba979-b8d9-5c90-8ed9-50c06a09d60e', 'cf4515e9-da99-5068-b6e1-a4b80c235dc6', 'Polynomial Regression: Higher-Degree Features & Modeling Non-Linear Phenomena', 'bca-302n-u4-t9-polynomial-regression-higher-degree-feat', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('601bdadb-48e3-5a89-812b-f53a86463749', 'cf4515e9-da99-5068-b6e1-a4b80c235dc6', 'Scikit-Learn Pipelines: Combining Transformers, Scalers & Regression Models', 'bca-302n-u4-t10-scikit-learn-pipelines-combining-transfo', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('55215356-4b97-5a9e-9e06-44ffe65397d5', 'cf4515e9-da99-5068-b6e1-a4b80c235dc6', 'Measures for In-Sample Evaluation: Mean Squared Error (MSE) & Root MSE (RMSE)', 'bca-302n-u4-t11-measures-for-in-sample-evaluation-mean-s', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('eadb7c56-ba0d-5b44-bb79-1d4c281eb6b0', 'cf4515e9-da99-5068-b6e1-a4b80c235dc6', 'R-Squared (Coefficient of Determination) vs Adjusted R-Squared', 'bca-302n-u4-t12-r-squared-coefficient-of-determination-v', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('495d323f-f45d-50e0-911d-f5d5125e8fdc', 'cf4515e9-da99-5068-b6e1-a4b80c235dc6', 'Prediction and Decision Making: Confidence Intervals & Prediction Thresholds', 'bca-302n-u4-t13-prediction-and-decision-making-confidenc', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('687f826c-0068-54b4-8108-bdb32d066731', '63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', 'Generalization Error: In-Sample vs Out-of-Sample Performance', 'bca-302n-u5-t1-generalization-error-in-sample-vs-out-of', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('06230c1f-a57b-5944-bd74-a3cf6c7fd27b', '63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', 'Out-of-Sample Evaluation Metrics: RMSE, MAE, Mean Absolute Percentage Error (MAPE)', 'bca-302n-u5-t2-out-of-sample-evaluation-metrics-rmse,-m', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('2f63dcdb-6fd4-59a4-b27e-8ba4829b105c', '63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', 'Classification vs Regression Metrics: Precision, Recall, F1-Score & ROC-AUC Overview', 'bca-302n-u5-t3-classification-vs-regression-metrics-pre', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('ac01d913-303c-5ea4-aa20-3ec7ba3c1f91', '63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', 'The Problem of Overfitting: High Variance, Memorization & Complexity Hazards', 'bca-302n-u5-t4-the-problem-of-overfitting-high-variance', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c7606758-1cef-577b-ac11-cb4db6ab0214', '63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', 'The Problem of Underfitting: High Bias, Inadequate Features & Model Simplicity', 'bca-302n-u5-t5-the-problem-of-underfitting-high-bias,-i', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e4d0c804-4051-5c86-9f66-d5b0c09a9a39', '63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', 'The Bias-Variance Tradeoff: Mathematical Balance for Optimal Performance', 'bca-302n-u5-t6-the-bias-variance-tradeoff-mathematical-', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('ef035ff3-d624-573a-b9e7-dd29619e2c74', '63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', 'Train-Test Split vs Validation Set Architecture', 'bca-302n-u5-t7-train-test-split-vs-validation-set-archi', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('3f6d10bc-694c-550f-a80b-415d58221b57', '63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', 'Cross-Validation Techniques: K-Fold Cross Validation, Stratified K-Fold & Leave-One-Out', 'bca-302n-u5-t8-cross-validation-techniques-k-fold-cross', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('43b46d01-7b6a-5350-b2ee-738ea26e3d52', '63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', 'Regularization Principles: Shrinkage Methods to Combat Overfitting', 'bca-302n-u5-t9-regularization-principles-shrinkage-meth', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('239db8ed-1177-5359-8333-30a72e0003dc', '63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', 'Ridge Regression (L2 Regularization): Penalty Term, Loss Function & Coefficient Shrinkage', 'bca-302n-u5-t10-ridge-regression-l2-regularization-penal', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('13b95209-7cbd-5235-97ba-7ae719eadf83', '63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', 'Lasso Regression (L1 Regularization): Feature Selection & Sparse Solutions', 'bca-302n-u5-t11-lasso-regression-l1-regularization-featu', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('beb8c617-12ef-5060-80ec-991ee531edb6', '63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', 'Hyperparameter Optimization: Grid Search Cross-Validation (GridSearchCV)', 'bca-302n-u5-t12-hyperparameter-optimization-grid-search-', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('0863a3b8-3e4c-55ee-bcfd-ddf135b33489', '63a3f6ef-6aff-5c2b-89ea-9b9288fa1a67', 'Randomized Search Cross-Validation (RandomizedSearchCV) & Automated Model Selection', 'bca-302n-u5-t13-randomized-search-cross-validation-rando', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c4ff7d4f-4348-53f9-853b-e07afd916034', 'a6006172-65c5-5e2f-b3e6-d4c227abf563', 'Parallel Computing Foundations: Multiprocessors, Pipelining & Flynn''s Taxonomy', 'bca-304n-u1-t1-parallel-computing-foundations-multiproc', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('aa693fb6-7ec0-5e48-923e-89c70bab49af', 'a6006172-65c5-5e2f-b3e6-d4c227abf563', 'Distributed Computing: Architecture, Network Latency, Scalability & Fault Tolerance', 'bca-304n-u1-t2-distributed-computing-architecture,-netw', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('f43ffddb-349e-5a5d-bca1-765d96318622', 'a6006172-65c5-5e2f-b3e6-d4c227abf563', 'Cloud Computing: NIST Definition, Five Essential Characteristics & Benefits', 'bca-304n-u1-t3-cloud-computing-nist-definition,-five-es', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5cf2e6ad-f899-51ed-927b-bb971f6b673a', 'a6006172-65c5-5e2f-b3e6-d4c227abf563', 'On-Demand Self-Service, Broad Network Access, Resource Pooling & Rapid Elasticity', 'bca-304n-u1-t4-on-demand-self-service,-broad-network-ac', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('27831e21-84ac-562b-a90f-a1ff5de766a2', 'a6006172-65c5-5e2f-b3e6-d4c227abf563', 'Measured Service: Pay-per-Use Accounting & Cost Economics', 'bca-304n-u1-t5-measured-service-pay-per-use-accounting-', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a5fba9d9-43ce-5ee0-ac04-ad3cc41e028b', 'a6006172-65c5-5e2f-b3e6-d4c227abf563', 'Evolutionary Milestones: Mainframes, Clusters, Grids, Virtualization & Cloud', 'bca-304n-u1-t6-evolutionary-milestones-mainframes,-clus', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('66db0961-75cc-5214-8a66-e647fb53e863', 'a6006172-65c5-5e2f-b3e6-d4c227abf563', 'Distributed Systems & Grid Computing: Transition to Service-Centric Cloud', 'bca-304n-u1-t7-distributed-systems-and-grid-computing-t', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('4cb339ea-05b7-5132-b244-928c475f67d9', 'a6006172-65c5-5e2f-b3e6-d4c227abf563', 'Web 2.0 Technologies, Rich Internet Applications & RESTful Architectures', 'bca-304n-u1-t8-web-2.0-technologies,-rich-internet-appl', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('871a463c-8b12-5896-ba47-7d3295132ebc', 'a6006172-65c5-5e2f-b3e6-d4c227abf563', 'Service-Oriented Computing (SOA): Loose Coupling, XML, SOAP & Microservices', 'bca-304n-u1-t9-service-oriented-computing-soa-loose-cou', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('9e4efe73-cf0d-55e6-9c3d-c8c0183d4eeb', 'a6006172-65c5-5e2f-b3e6-d4c227abf563', 'Utility Computing Paradigm: Computing as the 5th Public Utility', 'bca-304n-u1-t10-utility-computing-paradigm-computing-as-', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('45316732-b616-5c3a-bff5-01ed198fd78c', 'a6006172-65c5-5e2f-b3e6-d4c227abf563', 'Cloud Computing Reference Model: Infrastructure, Platform, Application & User Layers', 'bca-304n-u1-t11-cloud-computing-reference-model-infrastr', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('67212f61-e10b-5652-b3e3-6ede2f44ec06', 'a6006172-65c5-5e2f-b3e6-d4c227abf563', 'Public vs Private vs Hybrid Foundations in the Cloud Computing Ecosystem', 'bca-304n-u1-t12-public-vs-private-vs-hybrid-foundations-', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('fcc9fa41-3856-5234-86b8-9f07fee3c75e', '3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', 'Introduction to Virtualization: Core Principles, Abstraction & Decoupling', 'bca-304n-u2-t1-introduction-to-virtualization-core-prin', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5e3199b9-9d3d-5cfc-a0fc-a8a96a8e2c42', '3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', 'Characteristics of Virtualized Environments: Partitioning, Isolation & Encapsulation', 'bca-304n-u2-t2-characteristics-of-virtualized-environme', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('33d59610-3809-57a8-9c1a-e6eb03f3cd0f', '3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', 'Taxonomy of Virtualization Techniques: Machine-Level vs OS-Level Virtualization', 'bca-304n-u2-t3-taxonomy-of-virtualization-techniques-ma', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('cb7d90c8-220c-5674-b156-0e01e1b080d4', '3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', 'Hardware-Assisted Virtualization (Intel VT-x, AMD-V) & Popek-Goldberg Theorem', 'bca-304n-u2-t4-hardware-assisted-virtualization-intel-v', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e8b8f0a4-9483-57e2-ae74-c0bc8d925bb5', '3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', 'Full Virtualization: Architecture, Binary Translation & Emulation', 'bca-304n-u2-t5-full-virtualization-architecture,-binary', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a3ad3fd4-7dd1-541a-9e73-9ca17f752b90', '3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', 'Paravirtualization: Hypercalls, Modified Guest OS & Kernel Interfacing', 'bca-304n-u2-t6-paravirtualization-hypercalls,-modified-', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('331a4824-3b53-5cbe-8649-194e54927ab9', '3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', 'Operating System-Level Virtualization: Containers, Namespaces, Cgroups & Docker', 'bca-304n-u2-t7-operating-system-level-virtualization-co', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('04232997-dab5-5734-8417-51227bbb1f50', '3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', 'Virtualization and Cloud Computing: Role in Resource Pooling & Dynamic Provisioning', 'bca-304n-u2-t8-virtualization-and-cloud-computing-role-', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a1ffa84b-940d-512e-aa6d-01b032425d54', '3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', 'Pros and Cons of Virtualization: Server Consolidation, Agility vs Overhead & VM Sprawl', 'bca-304n-u2-t9-pros-and-cons-of-virtualization-server-c', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('186b6f5e-42f8-5d0a-b732-3ed8f6a07588', '3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', 'Hypervisor Architecture: Type 1 Bare-Metal Hypervisors vs Type 2 Hosted Hypervisors', 'bca-304n-u2-t10-hypervisor-architecture-type-1-bare-meta', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('8f02bf69-3dcc-508d-be89-0aa98845c92a', '3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', 'Technology Example: Xen Hypervisor Architecture & Dom0/DomU Paravirtualization', 'bca-304n-u2-t11-technology-example-xen-hypervisor-archit', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('988bd8c9-49d7-596d-9a2d-bc63f5043301', '3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', 'Technology Example: VMware ESXi Architecture & Full Virtualization Mechanics', 'bca-304n-u2-t12-technology-example-vmware-esxi-architect', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('3a02e177-4e00-5a92-bcec-8c755b0d6405', '3d0e7a69-a6e2-5e28-b1fb-3dc0a0ef9719', 'Technology Example: Microsoft Hyper-V Architecture, Parent Partition & Enclave VHDs', 'bca-304n-u2-t13-technology-example-microsoft-hyper-v-arc', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('dc94f9a8-d02c-52e9-9aed-7b9d767a28b9', '21e7349c-a1d3-5efc-8961-c0ffa8227c4d', 'Cloud Computing Architecture: Logical Layers, Management Core & Client Interfaces', 'bca-304n-u3-t1-cloud-computing-architecture-logical-lay', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('9f21ebf0-aa78-5028-a39a-d8d749962bec', '21e7349c-a1d3-5efc-8961-c0ffa8227c4d', 'Service Models Overview: The SPI Tier Model (SaaS, PaaS, IaaS)', 'bca-304n-u3-t2-service-models-overview-the-spi-tier-mod', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('fe8720d8-68f6-571f-9ea5-7986dc434935', '21e7349c-a1d3-5efc-8961-c0ffa8227c4d', 'Shared Responsibility Model: Customer vs Cloud Service Provider (CSP) Roles', 'bca-304n-u3-t3-shared-responsibility-model-customer-vs-', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('3b35aece-ad5d-5401-b32a-58059d4f4651', '21e7349c-a1d3-5efc-8961-c0ffa8227c4d', 'Cloud Deployment Models: Public Cloud Architecture, Multitenancy & Scalability', 'bca-304n-u3-t4-cloud-deployment-models-public-cloud-arc', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('42102334-6e12-5cc1-aefe-de12c5f58cbd', '21e7349c-a1d3-5efc-8961-c0ffa8227c4d', 'Private Cloud: On-Premise, Hosted Private Clouds & Security Governance', 'bca-304n-u3-t5-private-cloud-on-premise,-hosted-private', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c86e5b5c-dcea-5e0d-b587-74cfae6c1485', '21e7349c-a1d3-5efc-8961-c0ffa8227c4d', 'Hybrid Cloud Architecture: Cloud Bursting, Workload Portability & Hybrid Integration', 'bca-304n-u3-t6-hybrid-cloud-architecture-cloud-bursting', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('52bb3b2c-8775-5518-8038-0c97519fcecd', '21e7349c-a1d3-5efc-8961-c0ffa8227c4d', 'Community Cloud: Shared Infrastructure for Specific Industry Verticals', 'bca-304n-u3-t7-community-cloud-shared-infrastructure-fo', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('6df69fbf-43ad-5391-91d6-f9913d6ae4d4', '21e7349c-a1d3-5efc-8961-c0ffa8227c4d', 'Infrastructure as a Service (IaaS): Architecture, Provisioning & Billing', 'bca-304n-u3-t8-infrastructure-as-a-service-iaas-archite', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('0dc24887-b4c0-5533-9331-0ace065e864e', '21e7349c-a1d3-5efc-8961-c0ffa8227c4d', 'Server Virtualization in IaaS: Dynamic Resource Allocation, VCPU & Live VM Migration', 'bca-304n-u3-t9-server-virtualization-in-iaas-dynamic-re', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c6583a0c-754e-5f9c-929b-da506d634f81', '21e7349c-a1d3-5efc-8961-c0ffa8227c4d', 'Storage Virtualization: Storage Area Networks (SAN), NAS, Block vs Object Storage', 'bca-304n-u3-t10-storage-virtualization-storage-area-netw', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('93f5536e-9ffa-5e59-aced-add94c91cb8f', '21e7349c-a1d3-5efc-8961-c0ffa8227c4d', 'Network Virtualization: Software-Defined Networking (SDN), Virtual Switches & OpenFlow', 'bca-304n-u3-t11-network-virtualization-software-defined-', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('278cee6b-ea9b-5162-b6a8-e0c4b4f699d2', '21e7349c-a1d3-5efc-8961-c0ffa8227c4d', 'Virtual Private Clouds (VPC), Subnets, Route Tables & Network Security Groups (NSGs)', 'bca-304n-u3-t12-virtual-private-clouds-vpc,-subnets,-rou', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('48b1bac5-8c9f-589a-bd2e-466e29f56fd6', '874914b5-12e1-5f49-982a-a54c625d20f0', 'Platform as a Service (PaaS): Architecture, Development Environment & Middleware', 'bca-304n-u4-t1-platform-as-a-service-paas-architecture,', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('f07887fe-e6e9-5fe8-a20b-45d483173350', '874914b5-12e1-5f49-982a-a54c625d20f0', 'PaaS Management of Computation: Automated Container Orchestration & Autoscaling', 'bca-304n-u4-t2-paas-management-of-computation-automated', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('787b8c18-66c6-5f74-8e15-4a5f562046c0', '874914b5-12e1-5f49-982a-a54c625d20f0', 'PaaS Storage Management: Cloud Databases, Managed Relational & NoSQL Services', 'bca-304n-u4-t3-paas-storage-management-cloud-databases,', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('ef84b4c3-6042-55ee-9ae6-cc7ab8851b4e', '874914b5-12e1-5f49-982a-a54c625d20f0', 'Software as a Service (SaaS): Multitenant Architecture, Feature Toggling & Subscriptions', 'bca-304n-u4-t4-software-as-a-service-saas-multitenant-a', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('966e24b6-f6fe-5d79-9d16-acda8ba8ad8c', '874914b5-12e1-5f49-982a-a54c625d20f0', 'Cloud Services: Microservices Architecture, API Gateways & Event-Driven Functions', 'bca-304n-u4-t5-cloud-services-microservices-architectur', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('dd4d2ee8-7e87-524e-8081-7f41e836be81', '874914b5-12e1-5f49-982a-a54c625d20f0', 'Web Services in Cloud: REST vs SOAP Protocols, JSON Payloads & Service Registries', 'bca-304n-u4-t6-web-services-in-cloud-rest-vs-soap-proto', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a2184f09-3ab0-5003-964d-59b7bbc3c626', '874914b5-12e1-5f49-982a-a54c625d20f0', 'Web 2.0 Principles in Cloud Platforms: Social Collaboration, Asynchrony & Rich Interfaces', 'bca-304n-u4-t7-web-2.0-principles-in-cloud-platforms-so', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a562f6c4-6565-58c2-b212-e555995d28a0', '874914b5-12e1-5f49-982a-a54c625d20f0', 'Web OS (Web Operating System) Concepts: Browser-Based Desktops & Cloud Workspaces', 'bca-304n-u4-t8-web-os-web-operating-system-concepts-bro', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('52f51f3f-a8d6-52ca-b375-a5b39680d8c6', '874914b5-12e1-5f49-982a-a54c625d20f0', 'IaaS Case Study: Amazon Web Services (AWS EC2, S3, EBS, VPC Architecture)', 'bca-304n-u4-t9-iaas-case-study-amazon-web-services-aws-', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('8ad478a5-68b0-56ca-93b5-34b94c293c6e', '874914b5-12e1-5f49-982a-a54c625d20f0', 'PaaS Case Study: Google App Engine, Microsoft Azure App Services & Heroku', 'bca-304n-u4-t10-paas-case-study-google-app-engine,-micro', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('303865a5-9670-5339-8102-f58e88c53317', '874914b5-12e1-5f49-982a-a54c625d20f0', 'SaaS Case Study: Salesforce CRM, Google Workspace & Microsoft 365 Architecture', 'bca-304n-u4-t11-saas-case-study-salesforce-crm,-google-w', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('7eb7bae9-5b61-5c46-9892-fe25d03ca8fa', '874914b5-12e1-5f49-982a-a54c625d20f0', 'Enterprise Migration to Cloud: Lift-and-Shift, Re-Platforming & Cloud-Native Refactoring', 'bca-304n-u4-t12-enterprise-migration-to-cloud-lift-and-s', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('cadedb6b-04fa-5d22-92de-b1faecb6ec3a', 'fdf96420-371c-58b9-bcb7-92e6977e01f6', 'Economics of Cloud Computing: Capital Expenditure (CapEx) vs Operational (OpEx)', 'bca-304n-u5-t1-economics-of-cloud-computing-capital-exp', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('9712254c-9523-5f66-b05d-6b4f16054b4a', 'fdf96420-371c-58b9-bcb7-92e6977e01f6', 'Total Cost of Ownership (TCO) & Return on Investment (ROI) Calculations', 'bca-304n-u5-t2-total-cost-of-ownership-tco-and-return-o', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('baf8eaac-b515-5a27-b733-1311af2501af', 'fdf96420-371c-58b9-bcb7-92e6977e01f6', 'Cloud Pricing Models: On-Demand, Reserved Instances, Spot Instances & Dynamic Bidding', 'bca-304n-u5-t3-cloud-pricing-models-on-demand,-reserved', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('25b4fe9f-ee4c-5db4-b8be-2213a2ea4351', 'fdf96420-371c-58b9-bcb7-92e6977e01f6', 'Service Level Agreements (SLAs), Availability Metrics (99.999% Five Nines) & Penalties', 'bca-304n-u5-t4-service-level-agreements-slas,-availabil', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c9c3cbfa-ef9a-5410-9832-68e0de82d10c', 'fdf96420-371c-58b9-bcb7-92e6977e01f6', 'Open Challenges in Cloud: Multi-Tenancy Security, Data Privacy & Confidential Computing', 'bca-304n-u5-t5-open-challenges-in-cloud-multi-tenancy-s', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('4e0de62b-1e89-53ab-b453-e2fc781ade69', 'fdf96420-371c-58b9-bcb7-92e6977e01f6', 'Vendor Lock-in, Interoperability, Cloud Portability & Cloud Standards (Oasis, DMTF)', 'bca-304n-u5-t6-vendor-lock-in,-interoperability,-cloud-', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('d2497ae4-e4b1-5991-8dd8-2c9f5c93619b', 'fdf96420-371c-58b9-bcb7-92e6977e01f6', 'Emerging Computing Paradigms: Edge Computing Architecture & Ultra-Low Latency', 'bca-304n-u5-t7-emerging-computing-paradigms-edge-comput', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('7e6187f4-0a39-53b7-b2ec-688e3825b8d6', 'fdf96420-371c-58b9-bcb7-92e6977e01f6', 'Fog Computing: Decentralized Computing Nodes between Edge Devices and Cloud Core', 'bca-304n-u5-t8-fog-computing-decentralized-computing-no', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('06150a82-e65f-54a3-8cf3-4d9ddb794287', 'fdf96420-371c-58b9-bcb7-92e6977e01f6', 'Mobile Cloud Computing (MCC): Offloading Mobile Computation & Energy Optimization', 'bca-304n-u5-t9-mobile-cloud-computing-mcc-offloading-mo', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('57e69089-1276-55d3-af8a-6ffd832a88c9', 'fdf96420-371c-58b9-bcb7-92e6977e01f6', 'Introduction to IoT Cloud: Ingestion Pipelines, Telemetry Processing & Digital Twins', 'bca-304n-u5-t10-introduction-to-iot-cloud-ingestion-pipe', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('fb6600f8-467c-51f5-bf97-6135dd35dc3c', 'fdf96420-371c-58b9-bcb7-92e6977e01f6', 'Cloud Simulators: Introduction to CloudSim Architecture & Discrete-Event Simulation', 'bca-304n-u5-t11-cloud-simulators-introduction-to-cloudsi', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('7a81b624-c766-5444-ab2a-5224f49ea679', 'fdf96420-371c-58b9-bcb7-92e6977e01f6', 'Advanced Simulators: GreenCloud for Energy Consumption & SimGrid for Grids/Clouds', 'bca-304n-u5-t12-advanced-simulators-greencloud-for-energ', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('f6522c7b-6966-56f4-ab1a-e048d1a97425', 'fdf96420-371c-58b9-bcb7-92e6977e01f6', 'Green Cloud Computing: Data Center Energy Efficiency, PUE & Carbon Footprint Reduction', 'bca-304n-u5-t13-green-cloud-computing-data-center-energy', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e9961e56-df36-5536-aefa-8c3c02982ea0', '9bec8258-17ab-5753-8fb5-d49d02bc82d9', 'Genesis of the Internet of Things (IoT) & Evolution from M2M Communications', 'bca-306n-u1-t1-genesis-of-the-internet-of-things-iot-an', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('2aac2071-0674-5faf-9aa4-5c515f961de1', '9bec8258-17ab-5753-8fb5-d49d02bc82d9', 'IoT and Digitization: Transforming Physical Assets into Connected Data Endpoints', 'bca-306n-u1-t2-iot-and-digitization-transforming-physic', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('52297b9a-5418-5c07-b17e-f2ac8ad30375', '9bec8258-17ab-5753-8fb5-d49d02bc82d9', 'IoT Challenges: Scale, Heterogeneity, Energy Constraints, Interoperability & Security', 'bca-306n-u1-t3-iot-challenges-scale,-heterogeneity,-ene', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('415066e1-3866-53da-8688-c5c67e82a2d1', '9bec8258-17ab-5753-8fb5-d49d02bc82d9', 'Comparing IoT Architectures: Three-Layer, Four-Layer, Five-Layer & ITU-T Reference Models', 'bca-306n-u1-t4-comparing-iot-architectures-three-layer,', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e12b5257-4edf-512c-8bd1-8151ca34d5d0', '9bec8258-17ab-5753-8fb5-d49d02bc82d9', 'A Simplified IoT Architecture: Things, Network, Edge, Fog, Cloud & Applications', 'bca-306n-u1-t5-a-simplified-iot-architecture-things,-ne', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('125c85c3-ab4e-5976-a3e8-9b9392b7d00f', '9bec8258-17ab-5753-8fb5-d49d02bc82d9', 'The Core IoT Functional Stack: Sensors/Actuators, Communications, Data Accumulation', 'bca-306n-u1-t6-the-core-iot-functional-stack-sensors-ac', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('954cdb8d-2046-5688-9186-364bd7ce0b60', '9bec8258-17ab-5753-8fb5-d49d02bc82d9', 'Core Functional Stack: Data Abstraction, Application Logic & Business Integrations', 'bca-306n-u1-t7-core-functional-stack-data-abstraction,-', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('7be56387-2a02-54d4-97e5-2edf974e450c', '9bec8258-17ab-5753-8fb5-d49d02bc82d9', 'IoT Data Management Stack: Ingestion, Storage, Filtering & Processing Pipelines', 'bca-306n-u1-t8-iot-data-management-stack-ingestion,-sto', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('0106fa34-b6c0-532e-b655-55cecad3d784', '9bec8258-17ab-5753-8fb5-d49d02bc82d9', 'IoT Compute Stack: Edge Computing vs Fog Nodes vs Centralized Cloud Infrastructure', 'bca-306n-u1-t9-iot-compute-stack-edge-computing-vs-fog-', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('51bf9b78-97fe-5c61-8dec-931280d46a18', '9bec8258-17ab-5753-8fb5-d49d02bc82d9', 'Data Velocity, Volume & Variety in IoT Ecosystems (Real-Time vs Batch)', 'bca-306n-u1-t10-data-velocity,-volume-and-variety-in-iot', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('4b6068e5-8a49-5756-b502-0882ec1d3b28', '9bec8258-17ab-5753-8fb5-d49d02bc82d9', 'IoT Enabling Technologies: RFID, WSN, Barcodes, Embedded Systems & Microcontrollers', 'bca-306n-u1-t11-iot-enabling-technologies-rfid,-wsn,-bar', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('fdb580b6-de3a-5e9a-8175-5b12abc87037', '9bec8258-17ab-5753-8fb5-d49d02bc82d9', 'Comparison: IoT vs M2M vs Cyber-Physical Systems (CPS) vs SCADA', 'bca-306n-u1-t12-comparison-iot-vs-m2m-vs-cyber-physical-', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e5c308f6-1c1e-5742-97be-6810c9075006', '68abe907-5dc7-555e-8a8a-306b1b00ea60', 'Sensors: Working Principles, Transducers, Analog vs Digital Sensors & Classifications', 'bca-306n-u2-t1-sensors-working-principles,-transducers,', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('2533abc8-c3de-5793-97d9-3d37dbf4648f', '68abe907-5dc7-555e-8a8a-306b1b00ea60', 'Actuators: Relays, Servomotors, Solenoids, Stepper Motors & Electro-Pneumatics', 'bca-306n-u2-t2-actuators-relays,-servomotors,-solenoids', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('783d0603-4d56-5b86-88ce-b8f3c8f05b66', '68abe907-5dc7-555e-8a8a-306b1b00ea60', 'Smart Objects: Architecture, Processing Power, Memory & Power Management', 'bca-306n-u2-t3-smart-objects-architecture,-processing-p', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('121e7fcb-2efb-59e6-a515-1615b8988d8e', '68abe907-5dc7-555e-8a8a-306b1b00ea60', 'Wireless Sensor Networks (WSN): Node Architecture, Topologies (Star, Mesh, Cluster)', 'bca-306n-u2-t4-wireless-sensor-networks-wsn-node-archit', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('10fa6cfc-c25e-55d7-bc13-3569cbde3e6d', '68abe907-5dc7-555e-8a8a-306b1b00ea60', 'IoT Access Technologies: IEEE 802.15.4 Physical and MAC Layer Specifications', 'bca-306n-u2-t5-iot-access-technologies-ieee-802.15.4-ph', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('350fab4d-aefb-5ad1-ba78-248b3e80d200', '68abe907-5dc7-555e-8a8a-306b1b00ea60', 'Short-Range Wireless: Zigbee, Z-Wave, Bluetooth Low Energy (BLE 5.0) & NFC', 'bca-306n-u2-t6-short-range-wireless-zigbee,-z-wave,-blu', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('afc20a76-5265-5df4-b246-ebfc10b4285b', '68abe907-5dc7-555e-8a8a-306b1b00ea60', 'Long-Range Low-Power Technologies: LoRaWAN Architecture, Chirp Spread Spectrum & Sigfox', 'bca-306n-u2-t7-long-range-low-power-technologies-lorawa', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('7e018ea1-d403-52df-b75f-d8e8eb83f5b7', '68abe907-5dc7-555e-8a8a-306b1b00ea60', 'Cellular IoT: NB-IoT (Narrowband IoT), LTE-M & 5G Massive Machine-Type Communications', 'bca-306n-u2-t8-cellular-iot-nb-iot-narrowband-iot,-lte-', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('0a8bfe17-1a53-55a2-b29b-bbb367e77fb9', '68abe907-5dc7-555e-8a8a-306b1b00ea60', 'IP as the IoT Network Layer: Challenges of IPv4 & The Inevitability of IPv6', 'bca-306n-u2-t9-ip-as-the-iot-network-layer-challenges-o', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('73ce3302-1bd7-5ab1-af25-956ea8c65b4e', '68abe907-5dc7-555e-8a8a-306b1b00ea60', '6LoWPAN: Adaptation Layer, Header Compression, Fragmentation & Mesh Routing', 'bca-306n-u2-t10-6lowpan-adaptation-layer,-header-compres', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('2d827592-4460-500e-8be7-476036ff4270', '68abe907-5dc7-555e-8a8a-306b1b00ea60', 'RPL (Routing Protocol for Low-Power and Lossy Networks) & Objective Functions', 'bca-306n-u2-t11-rpl-routing-protocol-for-low-power-and-l', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('2d0d7539-67c6-596e-93bd-a5984307ed00', '68abe907-5dc7-555e-8a8a-306b1b00ea60', 'IoT Application Protocol: MQTT (Message Queuing Telemetry Transport, Pub/Sub, QoS 0/1/2)', 'bca-306n-u2-t12-iot-application-protocol-mqtt-message-qu', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('1d85048d-9cd7-58c5-8c48-4618d6cab33f', '68abe907-5dc7-555e-8a8a-306b1b00ea60', 'IoT Application Protocol: CoAP (Constrained Application Protocol, RESTful, UDP, Observe)', 'bca-306n-u2-t13-iot-application-protocol-coap-constraine', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('382e761d-3436-52c5-9a16-5fde078e1556', '68abe907-5dc7-555e-8a8a-306b1b00ea60', 'Comparison: MQTT vs CoAP vs AMQP vs HTTP vs WebSockets for Constrained Devices', 'bca-306n-u2-t14-comparison-mqtt-vs-coap-vs-amqp-vs-http-', 14, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('afcab588-914a-5a88-98f8-29e5fd1b31b7', '89bfb023-b67d-5187-b82f-664f1885c743', 'Introduction to Data Analytics for IoT: Ingestion, Pre-Processing & Value Extraction', 'bca-306n-u3-t1-introduction-to-data-analytics-for-iot-i', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c8a281be-3e89-5fab-a482-fa2b51693311', '89bfb023-b67d-5187-b82f-664f1885c743', 'Characteristics of IoT Data: Time-Series, Geospatial, High-Volume & Streaming Noise', 'bca-306n-u3-t2-characteristics-of-iot-data-time-series,', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('8ebe5a1c-264d-5080-aeb5-fbbb7d2b38ea', '89bfb023-b67d-5187-b82f-664f1885c743', 'Role of Machine Learning in IoT: Supervised, Unsupervised & Reinforcement Paradigms', 'bca-306n-u3-t3-role-of-machine-learning-in-iot-supervis', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('8e68d674-911c-5637-8bf9-dfb7b1102c03', '89bfb023-b67d-5187-b82f-664f1885c743', 'Anomaly Detection in IoT Sensor Streams: Thresholding, Isolation Forests & Autoencoders', 'bca-306n-u3-t4-anomaly-detection-in-iot-sensor-streams-', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('b3439d43-d2f4-5f53-ad05-bac858418448', '89bfb023-b67d-5187-b82f-664f1885c743', 'Predictive Maintenance: Degradation Modeling, RUL (Remaining Useful Life) Estimation', 'bca-306n-u3-t5-predictive-maintenance-degradation-model', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('646acd76-24e4-540f-bf61-71f000541cda', '89bfb023-b67d-5187-b82f-664f1885c743', 'Big Data Analytics Tools for IoT: Apache Kafka for High-Throughput Event Streaming', 'bca-306n-u3-t6-big-data-analytics-tools-for-iot-apache-', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('0c2f3aae-62f9-5ea0-ab8c-3d1a3e7283db', '89bfb023-b67d-5187-b82f-664f1885c743', 'Distributed Processing Engines: Apache Spark Streaming, Apache Flink & Hadoop Ecosystem', 'bca-306n-u3-t7-distributed-processing-engines-apache-sp', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('1faa3ce3-8115-564d-afa7-45f73aa404f9', '89bfb023-b67d-5187-b82f-664f1885c743', 'Edge Streaming Analytics: Real-Time Complex Event Processing (CEP) at the Sensor Edge', 'bca-306n-u3-t8-edge-streaming-analytics-real-time-compl', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5a5d3dda-38f4-5803-ad0f-5b3889bafdda', '89bfb023-b67d-5187-b82f-664f1885c743', 'Edge AI: TinyML, Model Quantization, Pruning & TensorFlow Lite for Microcontrollers', 'bca-306n-u3-t9-edge-ai-tinyml,-model-quantization,-prun', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5e8d1147-a1c6-5605-a571-bbeeb826f9e1', '89bfb023-b67d-5187-b82f-664f1885c743', 'Network Analytics: Bandwidth Consumption, Latency Monitoring & Packet Loss Analysis', 'bca-306n-u3-t10-network-analytics-bandwidth-consumption,', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5ddf5472-5081-5702-8321-2d4afd343b9d', '89bfb023-b67d-5187-b82f-664f1885c743', 'Data Fusion in IoT: Multi-Sensor Data Aggregation, Kalman Filtering & Weighting', 'bca-306n-u3-t11-data-fusion-in-iot-multi-sensor-data-agg', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('bd0537d9-c9d8-5341-8749-ee57b94e41e1', '89bfb023-b67d-5187-b82f-664f1885c743', 'Visualization Dashboards for IoT: Grafana, ThingsBoard & PowerBI Stream Ingestion', 'bca-306n-u3-t12-visualization-dashboards-for-iot-grafana', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('b4a63615-b989-52e2-9e57-629fcea235c6', '99464cfb-1c1d-560f-908f-548a6bc5911a', 'Cloud Storage Models for IoT: Time-Series Databases (InfluxDB, TimescaleDB, Prometheus)', 'bca-306n-u4-t1-cloud-storage-models-for-iot-time-series', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('525336d9-5128-5dd5-a4dc-2c99e5df523b', '99464cfb-1c1d-560f-908f-548a6bc5911a', 'NoSQL Document & Wide-Column Stores for IoT: MongoDB, Cassandra & DynamoDB', 'bca-306n-u4-t2-nosql-document-and-wide-column-stores-fo', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('06c3e750-d88c-5683-ba3a-f980fa4775eb', '99464cfb-1c1d-560f-908f-548a6bc5911a', 'Object Storage for Telemetry Blobs & Firmware Images: AWS S3, MinIO & Azure Blob', 'bca-306n-u4-t3-object-storage-for-telemetry-blobs-and-f', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('d7decefc-62a4-5e08-bc1c-eae68545b294', '99464cfb-1c1d-560f-908f-548a6bc5911a', 'Communication APIs of IoT Systems: RESTful Web APIs, JSON/CBOR Payloads', 'bca-306n-u4-t4-communication-apis-of-iot-systems-restfu', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('577d82e7-a2cd-56b2-881a-af599bdabbcc', '99464cfb-1c1d-560f-908f-548a6bc5911a', 'Bidirectional Communication APIs: WebSockets & gRPC Protocol Buffers', 'bca-306n-u4-t5-bidirectional-communication-apis-websock', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('443b5058-2781-5ab1-a6bf-7d46c8802bd1', '99464cfb-1c1d-560f-908f-548a6bc5911a', 'IoT Security Challenges: Limited Hardware Resources, Default Passwords & Attack Surfaces', 'bca-306n-u4-t6-iot-security-challenges-limited-hardware', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('bea266f1-6d61-549a-8f3c-dafb3809992b', '99464cfb-1c1d-560f-908f-548a6bc5911a', 'Threat Taxonomy: Device-Level Attacks, Firmware Tampering, Side-Channel & Physical Attacks', 'bca-306n-u4-t7-threat-taxonomy-device-level-attacks,-fi', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('901e7a30-c1b4-5b19-8f96-f3310215b6f8', '99464cfb-1c1d-560f-908f-548a6bc5911a', 'Network-Level Attacks in IoT: Man-in-the-Middle (MitM), Sybil, Sinkhole & DDoS (Mirai Botnet)', 'bca-306n-u4-t8-network-level-attacks-in-iot-man-in-the-', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e9553623-f389-5fc4-97c6-cc9118d93904', '99464cfb-1c1d-560f-908f-548a6bc5911a', 'Cloud & Application Attacks: API Vulnerabilities, SQL/NoSQL Injections & Data Breaches', 'bca-306n-u4-t9-cloud-and-application-attacks-api-vulner', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c2aeef59-47ed-5976-adeb-7da798573f51', '99464cfb-1c1d-560f-908f-548a6bc5911a', 'IoT Security Best Practices: Hardware Root of Trust, Secure Boot & Cryptographic Enclaves', 'bca-306n-u4-t10-iot-security-best-practices-hardware-roo', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e01d1a09-bec6-5c6b-b668-aa68b9fc7e07', '99464cfb-1c1d-560f-908f-548a6bc5911a', 'Secure Firmware Over-The-Air (FOTA) Updates: Code Signing, Rollback Protection & Hashes', 'bca-306n-u4-t11-secure-firmware-over-the-air-fota-update', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5ccea763-af39-5483-8380-236e2868797f', '99464cfb-1c1d-560f-908f-548a6bc5911a', 'Identity and Access Management (IAM), Mutual TLS (mTLS) & X.509 Device Certificates', 'bca-306n-u4-t12-identity-and-access-management-iam,-mutu', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('4e35da21-7b58-52b7-9a5d-a2acb693fa40', '99464cfb-1c1d-560f-908f-548a6bc5911a', 'Zero Trust Architecture for IoT Endpoints & Network Microsegmentation', 'bca-306n-u4-t13-zero-trust-architecture-for-iot-endpoint', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('fcc52c31-093c-55d4-b50c-7c19b4682485', 'f7a3784b-d0ca-524b-9616-5f643fe4acfb', 'Industrial IoT (IIoT) & Industry 4.0: Cyber-Physical Production Systems (CPPS)', 'bca-306n-u5-t1-industrial-iot-iiot-and-industry-4.0-cyb', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e1a68bb6-0203-5cbf-a9ee-4cf62f7454aa', 'f7a3784b-d0ca-524b-9616-5f643fe4acfb', 'Smart Manufacturing: Digital Twins, Automated Quality Inspection & Robotic Automation', 'bca-306n-u5-t2-smart-manufacturing-digital-twins,-autom', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('3bf85519-280d-5e39-937a-9e09819a7513', 'f7a3784b-d0ca-524b-9616-5f643fe4acfb', 'IoT in Oil and Gas: Remote Pipeline Telemetry, Leak Detection, Valve Monitoring & Safety', 'bca-306n-u5-t3-iot-in-oil-and-gas-remote-pipeline-telem', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c893f033-bbc6-5072-890c-26c47f248ab2', 'f7a3784b-d0ca-524b-9616-5f643fe4acfb', 'IoT in Utilities: Smart Grids, Advanced Metering Infrastructure (AMI) & Water Distribution', 'bca-306n-u5-t4-iot-in-utilities-smart-grids,-advanced-m', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('68f78797-f2f4-5a66-b607-d3340a7991a5', 'f7a3784b-d0ca-524b-9616-5f643fe4acfb', 'Smart and Connected Cities: Architecture, Urban Sensors, Smart Lighting & Waste Management', 'bca-306n-u5-t5-smart-and-connected-cities-architecture,', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e2aa3d81-db87-5cd3-97e7-d1d94d0f2b95', 'f7a3784b-d0ca-524b-9616-5f643fe4acfb', 'Intelligent Transportation Systems (ITS): Connected Vehicles (V2X), Fleet Tracking & Telematics', 'bca-306n-u5-t6-intelligent-transportation-systems-its-c', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5144c457-7501-5859-9c4e-c43716fe4957', 'f7a3784b-d0ca-524b-9616-5f643fe4acfb', 'Smart Parking & Traffic Congestion Mitigation using Real-time Vision/Magnetic Sensors', 'bca-306n-u5-t7-smart-parking-and-traffic-congestion-mit', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('530ca9f4-b766-5dcd-81de-0d43b2cc8a67', 'f7a3784b-d0ca-524b-9616-5f643fe4acfb', 'IoT in Mining: Underground Gas Telemetry, Geotechnical Stability & Autonomous Haulers', 'bca-306n-u5-t8-iot-in-mining-underground-gas-telemetry,', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('b2baf07c-2ab4-5ad1-a460-889ff2bf939b', 'f7a3784b-d0ca-524b-9616-5f643fe4acfb', 'IoT in Agriculture (Smart Farming): Soil Moisture Telemetry, Automated Drip & Drone Sprayers', 'bca-306n-u5-t9-iot-in-agriculture-smart-farming-soil-mo', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('43bd73e3-ad89-5df4-945e-67a578d33116', 'f7a3784b-d0ca-524b-9616-5f643fe4acfb', 'IoT in Healthcare (IoMT): Remote Patient Monitoring, Wearables & Smart Infusion Pumps', 'bca-306n-u5-t10-iot-in-healthcare-iomt-remote-patient-mo', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5b55b0bc-842f-52f9-bb20-023322bffcc9', 'f7a3784b-d0ca-524b-9616-5f643fe4acfb', 'Public Safety & Disaster Response: Wildfire Detection, Flood Warnings & First Responder IoT', 'bca-306n-u5-t11-public-safety-and-disaster-response-wild', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5420d516-75a2-53e8-85ab-dcd54019a2b9', 'f7a3784b-d0ca-524b-9616-5f643fe4acfb', 'Future Trends in IoT: 6G Integration, Swarm Intelligence, Ambient Backscatter & Green IoT', 'bca-306n-u5-t12-future-trends-in-iot-6g-integration,-swa', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('b287ea4a-5384-53a1-9d74-af0883bf3845', '7387ca29-487c-5de1-be94-087257a4c1ae', 'Introduction to Software Testing: Definition, Objectives & Purpose in SDLC', 'bca-441e-u1-t1-introduction-to-software-testing-definit', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('0186b402-c029-5e76-b9c8-33ae100b43c3', '7387ca29-487c-5de1-be94-087257a4c1ae', 'Software Quality Assurance (SQA) vs Software Testing vs Quality Control (QC)', 'bca-441e-u1-t2-software-quality-assurance-sqa-vs-softwa', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('31b2541c-b918-5a20-b33f-179d4bc705c2', '7387ca29-487c-5de1-be94-087257a4c1ae', 'Nature of Errors: Human Errors (Mistakes), Faults (Defects/Bugs) & System Failures', 'bca-441e-u1-t3-nature-of-errors-human-errors-mistakes,-', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('fa7ef24b-b97b-546c-8a70-672bbfd6d2b6', '7387ca29-487c-5de1-be94-087257a4c1ae', 'The Cost of Defects: Defect Amplification Model & Cost of Late Bug Detection', 'bca-441e-u1-t4-the-cost-of-defects-defect-amplification', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('100abb90-8b2e-5d4e-9795-4397a4fad126', '7387ca29-487c-5de1-be94-087257a4c1ae', 'Seven Fundamental Principles of Software Testing (ISTQB Standard Axioms)', 'bca-441e-u1-t5-seven-fundamental-principles-of-software', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('6937c5b2-51fd-5f74-88ff-a19dfcc028d4', '7387ca29-487c-5de1-be94-087257a4c1ae', 'Testing Fundamentals: Verification vs Validation (V-Model Architecture)', 'bca-441e-u1-t6-testing-fundamentals-verification-vs-val', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('3790bc4e-0efe-5ee2-89e8-0d373aa05dbb', '7387ca29-487c-5de1-be94-087257a4c1ae', 'Software Testing Life Cycle (STLC): Requirement Analysis, Test Planning & Strategy', 'bca-441e-u1-t7-software-testing-life-cycle-stlc-require', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('2101c3f7-d718-57b3-a33c-ec4ecce64579', '7387ca29-487c-5de1-be94-087257a4c1ae', 'Test Design, Test Environment Setup, Test Execution & Defect Reporting', 'bca-441e-u1-t8-test-design,-test-environment-setup,-tes', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('4eb0c3c3-3381-5902-934b-b974e0478a3d', '7387ca29-487c-5de1-be94-087257a4c1ae', 'Test Artifacts: Test Plan Document, Test Scenarios, Test Cases & Traceability Matrix (RTM)', 'bca-441e-u1-t9-test-artifacts-test-plan-document,-test-', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('26bfd879-22d7-53f3-9af8-80cc97ac0752', '7387ca29-487c-5de1-be94-087257a4c1ae', 'Debugging Fundamentals: Differences between Testing and Debugging', 'bca-441e-u1-t10-debugging-fundamentals-differences-betwe', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e8738b07-cab8-5fab-a4b2-381b5fae382f', '7387ca29-487c-5de1-be94-087257a4c1ae', 'Debugging Techniques: Brute Force, Backtracking, Cause Elimination & Slicing', 'bca-441e-u1-t11-debugging-techniques-brute-force,-backtr', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('dce01f4a-c762-5c93-adeb-5a8ae6fad67f', '7387ca29-487c-5de1-be94-087257a4c1ae', 'Defect Life Cycle: Bug States (New, Open, Assigned, Fixed, Retest, Closed, Deferred)', 'bca-441e-u1-t12-defect-life-cycle-bug-states-new,-open,-', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('d16af295-57ac-599d-95c0-31de3297e163', '8741448e-79a6-5f6f-8305-88fc28150f12', 'Taxonomy of Testing Approaches: White Box vs Black Box vs Gray Box Testing', 'bca-441e-u2-t1-taxonomy-of-testing-approaches-white-box', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('64e1c2b6-ea58-52ac-a3fc-90f8fb68fd16', '8741448e-79a6-5f6f-8305-88fc28150f12', 'White Box Testing: Structural Testing, Code Visibility & Internal Logic Verification', 'bca-441e-u2-t2-white-box-testing-structural-testing,-co', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('66f9d8ca-219b-58b2-b858-3a9f49849a0a', '8741448e-79a6-5f6f-8305-88fc28150f12', 'Control Flow Testing: Statement Coverage, Decision/Branch Coverage & Condition Coverage', 'bca-441e-u2-t3-control-flow-testing-statement-coverage,', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('0972ba2b-16ec-5892-8dd7-31165f8d2fe5', '8741448e-79a6-5f6f-8305-88fc28150f12', 'Path Coverage: Independent Execution Paths & Flow Graph Notation', 'bca-441e-u2-t4-path-coverage-independent-execution-path', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c7d7eaf7-645f-5079-8093-b2bdd28c3991', '8741448e-79a6-5f6f-8305-88fc28150f12', 'Cyclomatic Complexity: McCabe''s Formula (V(G) = E - N + 2P) & Test Case Derivation', 'bca-441e-u2-t5-cyclomatic-complexity-mccabe's-formula-v', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('9f5cb0ec-e47b-5c16-94eb-d6b84a91ff60', '8741448e-79a6-5f6f-8305-88fc28150f12', 'Data Flow Testing: Definition-Use (DU) Chains, Variable Anomalies (UR, DD, DU)', 'bca-441e-u2-t6-data-flow-testing-definition-use-du-chai', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5469044e-e345-52cb-8e41-1027828f4378', '8741448e-79a6-5f6f-8305-88fc28150f12', 'Black Box Testing: Functional Testing, Specifications-Driven Without Code Access', 'bca-441e-u2-t7-black-box-testing-functional-testing,-sp', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('de5c4005-2918-5191-b9eb-b221314e0428', '8741448e-79a6-5f6f-8305-88fc28150f12', 'Equivalence Class Partitioning (ECP): Valid and Invalid Input Equivalence Classes', 'bca-441e-u2-t8-equivalence-class-partitioning-ecp-valid', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('4504b7af-6053-59c4-b41f-fc4711c49c05', '8741448e-79a6-5f6f-8305-88fc28150f12', 'Boundary Value Analysis (BVA): Normal, Robust, Extreme Boundary Testing (Min, Min+, Nom, Max-, Max)', 'bca-441e-u2-t9-boundary-value-analysis-bva-normal,-robu', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('1b6f0996-bfbc-590a-aa32-966dfae8424a', '8741448e-79a6-5f6f-8305-88fc28150f12', 'Decision Table Testing & Cause-Effect Graphing for Complex Logical Business Rules', 'bca-441e-u2-t10-decision-table-testing-and-cause-effect-', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('f2bcb36a-cce9-5628-994c-cdf8a7fc07d0', '8741448e-79a6-5f6f-8305-88fc28150f12', 'State Transition Testing & Use Case-Based Testing Techniques', 'bca-441e-u2-t11-state-transition-testing-and-use-case-ba', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('19ad7f27-93d9-5d7a-95f5-216aaa28ffca', '8741448e-79a6-5f6f-8305-88fc28150f12', 'Gray Box Testing: Combining Functional Understanding with Database/Architecture Insights', 'bca-441e-u2-t12-gray-box-testing-combining-functional-un', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('b4f8d4b5-c3b6-523d-85be-36f2e64b6989', '8741448e-79a6-5f6f-8305-88fc28150f12', 'Unit Testing: Driver Modules, Stub Modules & Test Isolation', 'bca-441e-u2-t13-unit-testing-driver-modules,-stub-module', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('cd30afa2-cd57-5a51-a333-254de386b187', '8741448e-79a6-5f6f-8305-88fc28150f12', 'Integration Testing: Top-Down Approach with Stubs (Depth-First vs Breadth-First)', 'bca-441e-u2-t14-integration-testing-top-down-approach-wi', 14, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('7de321d9-b610-5304-bd8b-f0b242841bea', '8741448e-79a6-5f6f-8305-88fc28150f12', 'Integration Testing: Bottom-Up Approach with Drivers & Sandwich (Hybrid) Strategy', 'bca-441e-u2-t15-integration-testing-bottom-up-approach-w', 15, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('354b08f6-33b3-5c0d-a73d-6e6e0134f633', '8741448e-79a6-5f6f-8305-88fc28150f12', 'Big-Bang Integration: Limitations, Fault Isolation Hazards & Anti-Patterns', 'bca-441e-u2-t16-big-bang-integration-limitations,-fault-', 16, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('b728f0bc-2e49-547b-a757-5cc39749a791', '71b054ef-8ae4-5b17-ac66-87638111c841', 'Testing Graphical User Interfaces (GUIs): Principles, Visual Consistency & Layouts', 'bca-441e-u3-t1-testing-graphical-user-interfaces-guis-p', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('d6caed33-35c2-5262-8b24-579043366fe3', '71b054ef-8ae4-5b17-ac66-87638111c841', 'GUI Testing Challenges: Event-Driven Nature, Asynchrony & Dynamic Visual Components', 'bca-441e-u3-t2-gui-testing-challenges-event-driven-natu', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('f80022a0-5770-505a-aae9-46cb31c547bb', '71b054ef-8ae4-5b17-ac66-87638111c841', 'Usability Testing, Responsiveness, Cross-Browser Compatibility & Accessibility (WCAG)', 'bca-441e-u3-t3-usability-testing,-responsiveness,-cross', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('03bcd6b1-1dac-5018-a842-cd62c04c4ee9', '71b054ef-8ae4-5b17-ac66-87638111c841', 'Testing Client/Server Architectures: Multi-Tier Architectures (Presentation, Logic, DB)', 'bca-441e-u3-t4-testing-client-server-architectures-mult', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('019d0f98-8847-5463-bf43-5d6595a43130', '71b054ef-8ae4-5b17-ac66-87638111c841', 'Client-Side Testing: Form Validations, Caching, Session Handling & Local Storage', 'bca-441e-u3-t5-client-side-testing-form-validations,-ca', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('97daee7e-dac2-5c60-a9d1-1f157c27ceb5', '71b054ef-8ae4-5b17-ac66-87638111c841', 'Server-Side Testing: Concurrency, API Endpoints, Request-Response Latency & Throughput', 'bca-441e-u3-t6-server-side-testing-concurrency,-api-end', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e833fabe-1a72-54b3-89ee-0be59676e28e', '71b054ef-8ae4-5b17-ac66-87638111c841', 'Database Integrity Testing: SQL Triggers, ACID Properties, Data Corruption & Rollbacks', 'bca-441e-u3-t7-database-integrity-testing-sql-triggers,', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c6e5d488-048d-5b19-a9f0-c6a2fa0f7ebb', '71b054ef-8ae4-5b17-ac66-87638111c841', 'Testing Documentation and Help Facilities: User Guides, Installation Manuals & Tooltips', 'bca-441e-u3-t8-testing-documentation-and-help-facilitie', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('2e7ab868-2bb2-56b5-a295-64bf1706abd6', '71b054ef-8ae4-5b17-ac66-87638111c841', 'Documentation Accuracy, Completeness, Clarity & Readability Metrics', 'bca-441e-u3-t9-documentation-accuracy,-completeness,-cl', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c0e20649-1a72-5fcd-8eb5-548bc160b689', '71b054ef-8ae4-5b17-ac66-87638111c841', 'Testing for Real-Time Systems: Determinism, Deadlines, Hard vs Soft Real-Time Constraints', 'bca-441e-u3-t10-testing-for-real-time-systems-determinis', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('4f1540b3-26f8-5a74-80f7-e7a3a6696395', '71b054ef-8ae4-5b17-ac66-87638111c841', 'Interrupt Handling, Clock Synchronization, Race Conditions & Timing Analysis', 'bca-441e-u3-t11-interrupt-handling,-clock-synchronizatio', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('9c563e53-7341-5510-8729-09869f2841ef', '71b054ef-8ae4-5b17-ac66-87638111c841', 'Hardware-in-the-Loop (HIL) Simulation & Fault Injection in Embedded Systems', 'bca-441e-u3-t12-hardware-in-the-loop-hil-simulation-and-', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('294b5fb2-99bd-5941-b3c7-f491fd5b14d3', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Software Testing Strategies: Phased Approach from Unit to System Deployment', 'bca-441e-u4-t1-software-testing-strategies-phased-appro', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('cda00b88-c6bb-52a9-bb44-a13e6c004ced', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Verification vs Validation: Static Testing Techniques (Reviews, Walkthroughs, Inspections)', 'bca-441e-u4-t2-verification-vs-validation-static-testin', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('2a34fcdb-5300-5cb5-82f7-67c6300f5d1b', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'System Testing: Validating Fully Integrated Software against System Requirements (SRS)', 'bca-441e-u4-t3-system-testing-validating-fully-integrat', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('78cacb0d-79f4-5543-9aaf-1e346b71d66f', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Performance Testing Overview: Speed, Scalability, Stability & Resource Utilization', 'bca-441e-u4-t4-performance-testing-overview-speed,-scal', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('ece1938e-096e-59af-a7bf-c703e349387e', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Stress Testing (Breaking Points), Volume Testing (Data Flooding) & Spike Testing', 'bca-441e-u4-t5-stress-testing-breaking-points,-volume-t', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('7f563f00-8f67-5bef-ac27-cabae5e79091', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Endurance/Soak Testing: Memory Leaks, Resource Depletion over Prolonged Usage', 'bca-441e-u4-t6-endurance-soak-testing-memory-leaks,-res', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('cffba18d-e1bf-575a-89c5-74a1e2062b2a', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Regression Testing: Objectives, Selective Retesting vs Retest All, Ripple Effect Analysis', 'bca-441e-u4-t7-regression-testing-objectives,-selective', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('7e0c0585-d00a-50f6-8e80-8184c0e0c6c1', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Regression Test Suite Optimization: Test Case Prioritization & Minimization Strategies', 'bca-441e-u4-t8-regression-test-suite-optimization-test-', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('1e9513b0-de18-518e-bc31-1f61ecfffa2b', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Agile Testing Principles: Whole-Team Approach, Testing in Sprints, Continuous Feedback', 'bca-441e-u4-t9-agile-testing-principles-whole-team-appr', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('bc9b8b63-ce6e-517f-8b3b-a16c081f5ebd', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Test-Driven Development (TDD: Red-Green-Refactor) & Behavior-Driven Development (BDD)', 'bca-441e-u4-t10-test-driven-development-tdd-red-green-re', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('39775268-92ea-5117-900c-80b7bd23c44d', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Acceptance Testing: User Acceptance Testing (UAT), Alpha Testing & Beta Testing in Field', 'bca-441e-u4-t11-acceptance-testing-user-acceptance-testi', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('0b7b7155-aff1-5976-99cd-7e4ddcb91c0f', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Smoke Testing (Build Verification) vs Sanity Testing (Targeted Health Check)', 'bca-441e-u4-t12-smoke-testing-build-verification-vs-sani', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('f163a762-0af6-518e-9c5c-e97ae5c5c582', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Load Testing: Simulating Concurrent Users & Measuring Response Time vs Load Curves', 'bca-441e-u4-t13-load-testing-simulating-concurrent-users', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('519ce5b6-bc29-5d9e-9977-e8517beef98a', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Software Quality Metrics: Defect Density, Defect Removal Efficiency (DRE), MTTF & MTBF', 'bca-441e-u4-t14-software-quality-metrics-defect-density,', 14, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('57303314-20fd-5458-990c-a21147b23419', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Complexity Metrics: Halstead''s Software Science (Program Length, Volume, Effort, Difficulty)', 'bca-441e-u4-t15-complexity-metrics-halstead's-software-s', 15, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('0b6b0e19-abdf-5566-9b4f-5d19e591c179', '8befecdd-89c6-528b-91eb-ea637a8bb03a', 'Cyclomatic Complexity Applied: Identifying Refactoring Candidates & Risk Hotspots', 'bca-441e-u4-t16-cyclomatic-complexity-applied-identifyin', 16, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('43d4c7d4-5d97-5413-ae89-f811240d8715', '2b5a3994-7e81-569b-a568-9ff7d969c933', 'Test Case Design Methodologies: Negative Testing, Boundary Conditions & Edge Cases', 'bca-441e-u5-t1-test-case-design-methodologies-negative-', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('fa513621-4810-531d-b5a2-7ad8dd0fe98b', '2b5a3994-7e81-569b-a568-9ff7d969c933', 'IEEE 829 Standard for Software Test Documentation: Test Plan, Test Log, Incident Report', 'bca-441e-u5-t2-ieee-829-standard-for-software-test-docu', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c6bebd81-1d91-5f12-8539-17f628bb995a', '2b5a3994-7e81-569b-a568-9ff7d969c933', 'Introduction to Automated Testing: Test Automation Pyramid, ROI & Feasibility Analysis', 'bca-441e-u5-t3-introduction-to-automated-testing-test-a', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('4718267c-fe5f-5414-b1c8-9bd1a36e97b1', '2b5a3994-7e81-569b-a568-9ff7d969c933', 'Unit Testing with JUnit: Test Architecture, Assertions, Fixtures (@Before, @After, @Test)', 'bca-441e-u5-t4-unit-testing-with-junit-test-architectur', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('f6a1c7ac-a112-5c39-9405-2a336538246e', '2b5a3994-7e81-569b-a568-9ff7d969c933', 'Parametric Testing, Mocking Dependencies & Test Runners in JUnit 5', 'bca-441e-u5-t5-parametric-testing,-mocking-dependencies', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('326b9725-7fa2-5507-ba0d-826999a44562', '2b5a3994-7e81-569b-a568-9ff7d969c933', 'Performance and Load Testing with Apache JMeter: Architecture & Thread Groups', 'bca-441e-u5-t6-performance-and-load-testing-with-apache', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('8a8c2e76-a54d-585f-81f3-c46dc2f1dd75', '2b5a3994-7e81-569b-a568-9ff7d969c933', 'JMeter Components: Samplers (HTTP, JDBC), Timers, Listeners (Graph Results, Tree View)', 'bca-441e-u5-t7-jmeter-components-samplers-http,-jdbc,-t', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('cb2c32d1-cb74-5a10-83e5-0cbca5412897', '2b5a3994-7e81-569b-a568-9ff7d969c933', 'Building and Analyzing JMeter Test Plans for Scalability & Concurrency Bottlenecks', 'bca-441e-u5-t8-building-and-analyzing-jmeter-test-plans', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('ee0518eb-9248-5545-a85b-3190b9e88d0b', '2b5a3994-7e81-569b-a568-9ff7d969c933', 'Legacy and Enterprise Automation Tools: Mercury/HP WinRunner Architecture', 'bca-441e-u5-t9-legacy-and-enterprise-automation-tools-m', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('76e5c228-d208-591a-8fc2-efecd45b2453', '2b5a3994-7e81-569b-a568-9ff7d969c933', 'Record and Playback Mechanisms, GUI Checkpoints & Object Repositories in WinRunner', 'bca-441e-u5-t10-record-and-playback-mechanisms,-gui-chec', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('4998f841-9243-5621-84e9-c4f08e1b76b5', '2b5a3994-7e81-569b-a568-9ff7d969c933', 'Enterprise Performance Testing with HP/Micro Focus LoadRunner (VuGen, Controller, Analysis)', 'bca-441e-u5-t11-enterprise-performance-testing-with-hp-m', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c5e8d0e3-782d-5504-a6fa-3ece44616f1b', '2b5a3994-7e81-569b-a568-9ff7d969c933', 'Automated Functional Testing with IBM Rational Robot: Object-Oriented Recording & SQA Basic', 'bca-441e-u5-t12-automated-functional-testing-with-ibm-ra', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a1f54432-5405-524e-aec6-152e716567a8', '2b5a3994-7e81-569b-a568-9ff7d969c933', 'Modern Automation Overview: Selenium WebDriver, Cypress, Playwright & Postman APIs', 'bca-441e-u5-t13-modern-automation-overview-selenium-webd', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('b5dbbc40-a1b5-5332-a33b-6a2b7ac2950d', '304ea51d-c15d-587f-beb4-a82087b80385', 'Introduction to JavaScript: Client-Side Scripting, V8 Engine & Execution Context', 'bca-442e-u1-t1-introduction-to-javascript-client-side-s', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('9927adb3-c689-5a68-b32b-d7e5164d6f40', '304ea51d-c15d-587f-beb4-a82087b80385', 'Applying JavaScript: Inline, Internal (<script>) & External JS (.js), Module Scripts', 'bca-442e-u1-t2-applying-javascript-inline,-internal-<sc', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('cc00c2e4-ac69-5ad4-965e-0a9b81ea7647', '304ea51d-c15d-587f-beb4-a82087b80385', 'Understanding JS Syntax: Strict Mode (''use strict''), Lexical Grammar & ASI', 'bca-442e-u1-t3-understanding-js-syntax-strict-mode-'use', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('51a4a070-ce32-5fc1-b6e2-aaed6269acce', '304ea51d-c15d-587f-beb4-a82087b80385', 'Introduction to Browser Object Model (Window Object, Screen, History, Location, Navigator)', 'bca-442e-u1-t4-introduction-to-browser-object-model-win', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('f0d35a87-fad2-5b3d-b812-9e4428054e53', '304ea51d-c15d-587f-beb4-a82087b80385', 'Document Object Model (DOM): Document Object, DOM Tree, Node Types & Element Selection', 'bca-442e-u1-t5-document-object-model-dom-document-objec', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('d379e2ad-c50f-5917-86be-3af5cd4c552a', '304ea51d-c15d-587f-beb4-a82087b80385', 'DOM Manipulation: Manipulating Text, HTML, Styles, Attributes & Creating Elements', 'bca-442e-u1-t6-dom-manipulation-manipulating-text,-html', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c1a6756c-08a6-50bb-a3bb-c83ee6310726', '304ea51d-c15d-587f-beb4-a82087b80385', 'Event Handling: Event Listeners, Event Object, Event Bubbling & Capturing, Delegation', 'bca-442e-u1-t7-event-handling-event-listeners,-event-ob', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('de526d27-3a52-5c52-a24c-186cbac6aca7', '304ea51d-c15d-587f-beb4-a82087b80385', 'Variables and Scoping: var (Function Scope, Hoisting) vs let & const (Block Scope, TDZ)', 'bca-442e-u1-t8-variables-and-scoping-var-function-scope', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5fc8c726-542a-5953-b9ea-415cc9b45ca0', '304ea51d-c15d-587f-beb4-a82087b80385', 'Data Types and Type Conversion: Primitives vs Reference Types, Coercion vs Explicit Casting', 'bca-442e-u1-t9-data-types-and-type-conversion-primitive', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('ea5531b7-8553-5a44-a544-bc3e0ee7be15', '304ea51d-c15d-587f-beb4-a82087b80385', 'Math Object & Methods (Math.round, floor, ceil, random) & Number Operations', 'bca-442e-u1-t10-math-object-and-methods-math.round,-floo', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('157c16dd-7384-5ea3-9bf6-d18cdf28d896', '304ea51d-c15d-587f-beb4-a82087b80385', 'String Manipulation: String Methods, Concatenation, Template Literals & Regular Expressions', 'bca-442e-u1-t11-string-manipulation-string-methods,-conc', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('6cf38ad4-7931-5381-9f41-76269424366e', '304ea51d-c15d-587f-beb4-a82087b80385', 'Objects and Arrays: Object Literals, Methods, Object Destructuring, Array Methods (map, filter, reduce)', 'bca-442e-u1-t12-objects-and-arrays-object-literals,-meth', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('8bc631a7-221c-5368-bd84-8132b6251628', '304ea51d-c15d-587f-beb4-a82087b80385', 'Date and Time: Date Object, Timestamps, Formatting & Epoch Computations', 'bca-442e-u1-t13-date-and-time-date-object,-timestamps,-f', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('d2149cba-e880-5fbd-ad42-5ee447be0d0e', '304ea51d-c15d-587f-beb4-a82087b80385', 'Conditional Statements & Switch Case: Truthy/Falsy Values, Ternary Operator, Nullish Coalescing', 'bca-442e-u1-t14-conditional-statements-and-switch-case-t', 14, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('be604d57-bdc9-5bcc-a093-02b7d6055701', '304ea51d-c15d-587f-beb4-a82087b80385', 'Looping Structures: for, while, do-while, for...in (Keys) & for...of (Iterables)', 'bca-442e-u1-t15-looping-structures-for,-while,-do-while,', 15, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('29b53f20-88b3-56d2-952c-6f393aa9a23a', '304ea51d-c15d-587f-beb4-a82087b80385', 'Functions: Declarations, Expressions, Arrow Functions, Default Parameters, Rest/Spread', 'bca-442e-u1-t16-functions-declarations,-expressions,-arr', 16, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('9af6ae59-5e82-596e-b57b-791a23413bd9', '304ea51d-c15d-587f-beb4-a82087b80385', 'Advanced JavaScript Concepts: Closures, Lexical Environment, Currying & IIFE', 'bca-442e-u1-t17-advanced-javascript-concepts-closures,-l', 17, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('04ad3724-a64a-5f9d-88f9-e62b7939743e', '304ea51d-c15d-587f-beb4-a82087b80385', 'Asynchronous JavaScript Foundations: Callbacks, Promises, async/await & Microtask Queue', 'bca-442e-u1-t18-asynchronous-javascript-foundations-call', 18, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('eba442f2-1117-5327-8cc2-bbe63e8d03da', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'Introduction to React.js: Component-Based Architecture, Declarative UI & Virtual DOM', 'bca-442e-u2-t1-introduction-to-react.js-component-based', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('b3748f5e-f186-508a-aba9-183254843a0b', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'Reconciliation and Diffing Algorithm: Fiber Architecture & Performance Optimization', 'bca-442e-u2-t2-reconciliation-and-diffing-algorithm-fib', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('b947ebd1-54f1-570a-9a3f-f7e45ae65a50', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'Templating using JSX: Syntax Rules, Expressions in JSX, JSX to React.createElement Compilation', 'bca-442e-u2-t3-templating-using-jsx-syntax-rules,-expre', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('71453abe-72fd-563a-9d77-aaa5665be51c', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'React Components: Functional Components vs Class Components', 'bca-442e-u2-t4-react-components-functional-components-v', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('8de576cc-7f28-5964-afcd-33ea55c1c549', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'State and Props: Unidirectional Data Flow, Immutability & Passing Data Down Hierarchies', 'bca-442e-u2-t5-state-and-props-unidirectional-data-flow', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('79ea4878-8676-574c-9c34-46d16da5314e', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'React Hooks: useState, useEffect, useContext, useRef, useMemo & useCallback', 'bca-442e-u2-t6-react-hooks-usestate,-useeffect,-usecont', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('0a4ede8a-9052-53ed-8453-6644bd2256d7', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'Component Lifecycle: Mounting, Updating & Unmounting Phases (Class vs Hook Parity)', 'bca-442e-u2-t7-component-lifecycle-mounting,-updating-a', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('b1f427ba-e9a7-5d60-9754-f4a6fca406dc', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'Rendering Lists and Keys: Why Keys Matter in Virtual DOM Reconciliation', 'bca-442e-u2-t8-rendering-lists-and-keys-why-keys-matter', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('856e1601-2e52-5f62-80db-b51a634bc723', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'React Portals: Rendering Outside the Parent DOM Hierarchy (Modals, Tooltips)', 'bca-442e-u2-t9-react-portals-rendering-outside-the-pare', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e67b6b9e-b39e-5072-8fa4-2a58169d2e75', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'Error Handling in React: Error Boundaries (componentDidCatch, getDerivedStateFromError)', 'bca-442e-u2-t10-error-handling-in-react-error-boundaries', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('d0a879f4-4120-5f82-8635-9e8af980a983', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'Client-Side Routing with React Router: BrowserRouter, Routes, Route, Link & useParams', 'bca-442e-u2-t11-client-side-routing-with-react-router-br', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a250f64c-9385-5c5d-ba26-24701ffcc88d', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'State Management with Redux: Core Principles, Single Source of Truth & Pure Reducers', 'bca-442e-u2-t12-state-management-with-redux-core-princip', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5dc92986-7b99-5b80-a7ae-c388073b2224', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'Redux Architecture: Store, Actions, Action Creators, Dispatch & useSelector/useDispatch', 'bca-442e-u2-t13-redux-architecture-store,-actions,-actio', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('395d8a3c-59cd-5d8c-87de-5e641f326828', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'Asynchronous Side Effects with Redux Saga: Generator Functions, Call/Put/TakeEffects', 'bca-442e-u2-t14-asynchronous-side-effects-with-redux-sag', 14, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('2c598c1c-abed-5f07-a8d7-4d34cc465074', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'Immutable.js: Persistent Data Structures, List, Map & Structural Sharing Benefits', 'bca-442e-u2-t15-immutable.js-persistent-data-structures,', 15, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a63e7139-ed2e-5409-a744-10b397118e62', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'Server-Side Rendering (SSR) Concepts: Hydration, SEO Advantages & Next.js Overview', 'bca-442e-u2-t16-server-side-rendering-ssr-concepts-hydra', 16, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5e010a24-ed16-55d3-b887-0d0259d4c7b7', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'Unit Testing React Components: Jest Testing Framework & React Testing Library (RTL)', 'bca-442e-u2-t17-unit-testing-react-components-jest-testi', 17, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('f05ed9fe-6d58-5cf7-8fb7-65ae61b40be9', '9ede825c-c2bb-5edd-8258-c240dd59905f', 'Module Bundling with Webpack: Entry, Output, Loaders (Babel), Plugins & Code Splitting', 'bca-442e-u2-t18-module-bundling-with-webpack-entry,-outp', 18, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5dcbdaab-2d41-590e-969f-c4ebfc9c4ae9', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'Node.js Overview: Chrome V8 Engine, Architecture & Single-Threaded Event Loop', 'bca-442e-u3-t1-node.js-overview-chrome-v8-engine,-archi', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('99f20841-edec-5600-8e85-9a8b83ed1e8e', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'Node.js Setup, Environment Configuration, Package.json & NPM/NPX Command Utilities', 'bca-442e-u3-t2-node.js-setup,-environment-configuration', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('10942268-55c3-5a79-9d2c-9e8551d3dbc3', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'Node.js Console, Debugging Tools, REPL & Environment Variables (dotenv)', 'bca-442e-u3-t3-node.js-console,-debugging-tools,-repl-a', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('b1658095-8c73-586d-91da-0fa1ca315680', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'Node.js Module System: CommonJS (require, module.exports) vs ES Modules (import, export)', 'bca-442e-u3-t4-node.js-module-system-commonjs-require,-', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('ab78ceb8-aba7-5dad-8ba4-5b430c579961', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'Built-in Node.js Modules: fs (File System, sync vs async), path, os, http & url', 'bca-442e-u3-t5-built-in-node.js-modules-fs-file-system,', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('921093c9-d169-54a2-9029-962505e2dec9', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'Node.js Core Concepts: Non-blocking I/O, Libuv Thread Pool & Asynchronous Execution', 'bca-442e-u3-t6-node.js-core-concepts-non-blocking-i-o,-', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('31ca66f8-aa48-5443-93a0-b9c38ca21e0b', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'Streams and Buffers in Node.js: Readable, Writable, Duplex & Transform Streams, Piping', 'bca-442e-u3-t7-streams-and-buffers-in-node.js-readable,', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('6161b66b-a3dc-552a-956c-c23e6a9a962e', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'Node.js Events: EventEmitter Class, Emitting Events, on(), once() & Custom Event Handlers', 'bca-442e-u3-t8-node.js-events-eventemitter-class,-emitt', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('1285955a-161f-5986-bc94-5e5adc64cb7d', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'Building Web Servers with Node.js http Module: Request & Response Pipeline', 'bca-442e-u3-t9-building-web-servers-with-node.js-http-m', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('34af6267-c1fe-5c3c-90cf-fc51483d6add', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'Introduction to Express.js: Minimalist Web Framework Architecture', 'bca-442e-u3-t10-introduction-to-express.js-minimalist-we', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e9cc9a9b-7e26-544b-8638-a5986f565c99', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'Express.js Routing: Route Parameters, Query Strings & Modular Routers (express.Router)', 'bca-442e-u3-t11-express.js-routing-route-parameters,-que', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('b0fc39cb-a9b7-544f-9215-734cf48a63e5', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'Express.js Middleware Architecture: Application-Level, Router-Level, Built-in & Error Middleware', 'bca-442e-u3-t12-express.js-middleware-architecture-appli', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a31f7d81-21c7-5557-b825-73d5cf5ec89f', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'Handling Forms and JSON: body-parser, express.json() & express.urlencoded()', 'bca-442e-u3-t13-handling-forms-and-json-body-parser,-exp', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('81f888b9-9a03-5a8e-892a-9ed2831e8e15', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'Node.js Database Access: Connection Pools, CRUD Operations with Relational & NoSQL Stores', 'bca-442e-u3-t14-node.js-database-access-connection-pools', 14, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a9e2e808-1aec-58b6-adfe-1d6582c98912', '627b394e-7e9b-5c99-809f-0f3412bf114e', 'RESTful API Development with Express: REST Principles, Status Codes & Error Handling', 'bca-442e-u3-t15-restful-api-development-with-express-res', 15, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('d0da0477-543f-59b2-a9c5-ecdc2380c14b', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'SQL vs NoSQL Paradigms: Relational vs Document-Oriented vs Key-Value vs Graph Stores', 'bca-442e-u4-t1-sql-vs-nosql-paradigms-relational-vs-doc', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('4fc09395-e4e2-59b9-8b0b-268fe6de1d65', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'ACID vs BASE Properties: CAP Theorem (Consistency, Availability, Partition Tolerance)', 'bca-442e-u4-t2-acid-vs-base-properties-cap-theorem-cons', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('7b7806e3-85cb-528e-b65b-bc8ea1b098c1', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'Introduction to MongoDB: BSON Format, Collections, Documents & Dynamic Schemas', 'bca-442e-u4-t3-introduction-to-mongodb-bson-format,-col', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('98c66350-47cc-5b66-a742-11d8835d7ddb', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'Installing and Configuring MongoDB: mongod Daemon, mongosh Shell & GUI (Compass)', 'bca-442e-u4-t4-installing-and-configuring-mongodb-mongo', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('0a94ab83-b393-5387-857c-f9021a6043fb', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'Creating and Managing MongoDB: Database Creation, Collections, Capped Collections', 'bca-442e-u4-t5-creating-and-managing-mongodb-database-c', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('f1a25288-e526-5866-87b4-572a681418f6', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'MongoDB CRUD Operations: insertOne/insertMany, find/findOne with Query Operators', 'bca-442e-u4-t6-mongodb-crud-operations-insertone-insert', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('8d42f9ca-c134-512f-a456-13c0be50de83', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'Advanced Querying in MongoDB: Comparison ($gt, $lt), Logical ($and, $or), Array ($elemMatch)', 'bca-442e-u4-t7-advanced-querying-in-mongodb-comparison-', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('9307e2f7-af4f-5866-99ad-e2c7f50cebf2', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'Update Operations: updateOne/updateMany, $set, $unset, $inc, $push, $pull, upsert', 'bca-442e-u4-t8-update-operations-updateone-updatemany,-', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a02fab30-8a79-5ea3-9335-22d4461511ce', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'Delete Operations: deleteOne/deleteMany & Drop Collections', 'bca-442e-u4-t9-delete-operations-deleteone-deletemany-a', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('bfdcb1a5-a0b5-537b-8fd8-ed75e4c80486', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'MongoDB Indexing: Single Field, Compound, Multikey, Text & Unique Indexes, Performance', 'bca-442e-u4-t10-mongodb-indexing-single-field,-compound,', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('dda50f2a-1ff4-519d-a7aa-2171f986251d', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'Aggregation Framework in MongoDB: Pipeline Stages ($match, $group, $project, $sort, $lookup)', 'bca-442e-u4-t11-aggregation-framework-in-mongodb-pipelin', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('8215ebb9-e1f4-5d05-9a76-035405ddd7dd', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'Migration of Data into MongoDB: Importing JSON/CSV via mongoimport, ETL Strategies', 'bca-442e-u4-t12-migration-of-data-into-mongodb-importing', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('7ab2c826-9c81-5ad4-81dc-5acdff410211', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'Connecting MongoDB with PHP: MongoDB Driver for PHP, BSON Classes & Performing Queries', 'bca-442e-u4-t13-connecting-mongodb-with-php-mongodb-driv', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('eead972e-8487-5c3e-9209-bc3dcf2c4194', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'Connecting MongoDB with Node.js: Official MongoDB Driver & Mongoose ODM', 'bca-442e-u4-t14-connecting-mongodb-with-node.js-official', 14, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('a4b04f2e-7c6a-5c55-bcab-acfbbef11aa5', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'Mongoose ODM Architecture: Schemas, Models, Validation, Middleware (Pre/Post Hooks)', 'bca-442e-u4-t15-mongoose-odm-architecture-schemas,-model', 15, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('60c87413-02cb-5357-b9b5-1b382984638c', '96f26227-188c-54dc-ac74-7e6c92c66ffd', 'Services Offered by MongoDB: MongoDB Atlas Cloud, Atlas Search, Triggers & Vector Search', 'bca-442e-u4-t16-services-offered-by-mongodb-mongodb-atla', 16, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('dd66a7af-b528-5659-b9c5-7c80b9b7733b', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'Python Installation, Setup & Environment Variables on Windows and Linux', 'bca-442e-u5-t1-python-installation,-setup-and-environme', 1, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('297b6a26-a10a-580f-a40a-22b1738a6154', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'Python Virtual Environments (venv), PIP Package Management & requirements.txt', 'bca-442e-u5-t2-python-virtual-environments-venv,-pip-pa', 2, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('2b6925c4-8518-50f7-8ef2-450133546752', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'Python Core Features for Web Engineers: Datatypes, Dictionaries, Lists & Comprehensions', 'bca-442e-u5-t3-python-core-features-for-web-engineers-d', 3, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('e645f235-3e6a-5413-b3dc-5503909e0bb9', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'Object-Oriented Programming in Python: Classes, Methods, Inheritance & Modules', 'bca-442e-u5-t4-object-oriented-programming-in-python-cl', 4, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('24b00132-f9df-5420-978d-4571b699600b', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'Developing a Python Application: Overview of Web Frameworks (Flask, FastAPI, Django)', 'bca-442e-u5-t5-developing-a-python-application-overview', 5, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('f0dd497d-04e3-5496-afd9-abdb0f3aded7', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'Building Lightweight REST APIs with Flask: Routes, Request Objects & jsonify Responses', 'bca-442e-u5-t6-building-lightweight-rest-apis-with-flas', 6, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('4a50c77b-9a30-5836-90c8-ae5aca6fd5b9', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'Introduction to PyMongo: Installation, MongoClient Connection & Database Handles', 'bca-442e-u5-t7-introduction-to-pymongo-installation,-mo', 7, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('5d1b79b3-c9a4-5317-a8d9-a8d13020bcc8', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'Connecting MongoDB with Python: Connection Strings, Atlas Cloud Connections & Auth', 'bca-442e-u5-t8-connecting-mongodb-with-python-connectio', 8, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('029912a0-6a96-5f48-9048-6c0387a462ae', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'Performing CRUD Operations from Python: insert_one, insert_many, find, update_one, delete', 'bca-442e-u5-t9-performing-crud-operations-from-python-i', 9, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('c1f51493-59ee-5059-bc0e-cab7f4813cd5', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'Advanced PyMongo Queries: Filtering, Sorting, Limiting & Regular Expression Queries', 'bca-442e-u5-t10-advanced-pymongo-queries-filtering,-sort', 10, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('0ce67f51-182a-50ca-95f5-eef6e7e35c81', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'PyMongo Aggregation: Executing Multi-Stage Aggregation Pipelines in Python', 'bca-442e-u5-t11-pymongo-aggregation-executing-multi-stag', 11, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('9ae791bd-f6ba-514b-97fe-73f95d2fd3c5', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'Handling MongoDB ObjectId & BSON to JSON Serialization in Python Web Services', 'bca-442e-u5-t12-handling-mongodb-objectid-and-bson-to-js', 12, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('b4422acf-404e-5344-94a0-b13d98c80ca2', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'Integrating Python Backend with Frontend Applications: CORS, JSON Endpoints & Fetch API', 'bca-442e-u5-t13-integrating-python-backend-with-frontend', 13, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('7dfeaa92-07af-5bfa-bcc1-248b1d6174ef', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'Full-Stack Architecture Synthesis: React Frontend, Python/Node Backend & MongoDB Database', 'bca-442e-u5-t14-full-stack-architecture-synthesis-react-', 14, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();
INSERT INTO public.syllabus_topics (id, unit_id, title, slug, sort_order, created_at, updated_at)
VALUES ('10bedf93-c042-5e19-b45f-3a1cb96e3e67', '8b70b91b-b66b-546c-9e8f-151f6592c49d', 'Deployment and Security Considerations: Environment Secrets, Production WSGI/ASGI Servers', 'bca-442e-u5-t15-deployment-and-security-considerations-e', 15, now(), now())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, slug = EXCLUDED.slug, sort_order = EXCLUDED.sort_order, updated_at = now();

COMMIT;
