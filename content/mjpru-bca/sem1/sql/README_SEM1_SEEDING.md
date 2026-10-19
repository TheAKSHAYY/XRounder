# MJPRU BCA Semester 1 Complete Database Seed

This directory contains the complete verified SQL dataset for MJPRU BCA Semester 1.

## Files:
1. `01_seed_sem1_units_and_topics.sql`:
   - Updates 25 unit titles from generic labels to official MJPRU titles.
   - Inserts all **304 syllabus curriculum topics** into `public.syllabus_topics`.
2. `02_seed_sem1_notes.sql`:
   - Inserts all **25 comprehensive master revision notes** (Section A, B, C questions, code, and diagrams) into `public.notes`.
3. `03_seed_sem1_quizzes_and_mcqs.sql`:
   - Inserts all **25 unit practice quizzes** into `public.quizzes`.
   - Inserts **1250 verified MCQs** into `public.quiz_questions`.
   - Inserts **5000 options** into `public.quiz_options`.

Total Dataset Metrics:
- Subjects: 5 (BCA-101N, BCA-103N, BCA-105N, BCA-107N, BCA-109N)
- Units: 25
- Topics: 304
- Master Revision Notes: 25
- Practice Quizzes: 25
- Questions: 1250 (50 questions per unit)
- Options: 5000 (4 options per question)
