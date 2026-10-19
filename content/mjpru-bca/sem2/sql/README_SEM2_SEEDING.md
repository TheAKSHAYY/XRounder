# MJPRU BCA Semester 2 Complete Database Seed

This directory contains the complete verified SQL dataset for MJPRU BCA Semester 2.

## Files:
1. `01_seed_sem2_subjects_units_topics.sql`:
   - Updates 3 existing subjects to standard MJPRU codes and titles (`BCA-104N`, `BCA-106N`, `BCA-401E`).
   - Inserts missing subject `BCA-108N` (Digital Electronics) and its 5 units.
   - Updates 20 unit titles and summaries to official MJPRU syllabus titles.
   - Inserts all **199 syllabus curriculum topics** into `public.syllabus_topics`.
2. `02_seed_sem2_notes.sql`:
   - Inserts all **25 comprehensive master revision notes** (Section A, B, C questions, code, and diagrams) into `public.notes`.
3. `03_seed_sem2_quizzes_and_mcqs.sql`:
   - Inserts all **25 unit practice quizzes** into `public.quizzes`.
   - Inserts **1252 verified MCQs** into `public.quiz_questions`.
   - Inserts **5008 options** into `public.quiz_options`.

Total Dataset Metrics:
- Subjects: 5 (BCA-102N, BCA-104N, BCA-106N, BCA-108N, BCA-401E)
- Units: 25
- Topics: 199
- Master Revision Notes: 25
- Practice Quizzes: 25
- Questions: 1252
- Options: 5008
