# MJPRU BCA Curriculum Reconciliation & Migration Plan (Independent Audit)

**Generated:** 2026-10-17  
**Database:** PostgreSQL 17.6 (Supabase Project: `cifnalemfmokembqxidh`)  
**Status:** **FOR REVIEW ONLY — NO PRODUCTION WRITES CONDUCTED**  

---

## 1. Executive Summary & Audit Verification

Following a comprehensive read-only audit against the live Supabase database and reconciliation against the official **52-page MJPRU BCA Syllabus (w.e.f. 2024–25)**, this plan establishes a 100% fail-safe path for aligning the platform without risking student data loss, premature content publication, or integrity violations.

### Key Audit Highlights:
1. **Live Student Data Shielded:**
   - `quiz_attempts`: **10 active student attempts** under Quiz `9a3ec1d7` (`Computer fundamentel` in Unit 2 of `BCA-101N`).
   - `quiz_attempt_answers`: **113 recorded student answers**.
   - `progress_tracking`: **12 student progress records** across `BCA-101N`, `BCA-102N`, `BCA-105N`, and `MATHEMATICSI`.
   - `notes`: **7 active note records** under `BCA-101N` Units 1 & 2.
   - `quizzes`: **6 quizzes**, **116 questions**, and corresponding option records.
2. **Database Write Integrity:**
   - **Zero production writes executed.**
   - All proposed code changes, migrations, and seeds remain unexecuted pending explicit approval.
3. **Curriculum Publication Policy (Draft by Default):**
   - **Only verified active subjects with existing student content remain published:** Sem 1 (BCA-101N, 103N, 105N, 107N, 109N) and Sem 2 (BCA-102N, 104N, 106N, 401E) = **9 published subjects**.
   - **All newly seeded subjects, reactivated subjects, and unreviewed semesters are set to `'draft'`:** 31 newly inserted subjects + reactivated BCA-108N + Sem 3/4 subjects pending content review = **42 draft official subjects** (+1 legacy draft `23-0R` = 43 draft/inactive subjects).
   - All newly seeded units are set to `status = 'draft'`.
4. **Official Syllabus Accuracy & BCA-204N Anomaly:**
   - 29 of 30 theory subjects have exactly 5 units (10 lectures each) verified against the syllabus PDF.
   - **BCA-204N (Unix and Shell Programming):** Strictly **4 units** (Units I–IV, 40 lectures) as defined on Page 24 of the official syllabus. No fictitious 5th unit is seeded.
   - **Practical & Lab Course Rule:** In strict adherence to academic specifications, **0 theoretical units** are created for practical labs (10 courses), industrial training (BCA-307P), or the major project (BCA-308P).

---

## 2. Independent Code & Slug Collision Audit

Both proposed subject codes and proposed subject slugs were audited **independently** against all 21 existing database records and across all proposed entries:

```
Audit Dimension                    Test Result
---------------------------------  -------------------------
1. Duplicate Codes per Semester    0 duplicates found (PASS)
2. Duplicate Slugs per Semester    0 duplicates found (PASS)
3. Global Duplicate Slugs (Repo)   0 duplicates found (PASS)
4. Global Duplicate Codes (Repo)   0 duplicates found (PASS)
```

Every course code (`BCA-101N` through `BCA-443E`, `BCA-101P` through `BCA-308P`) is unique program-wide. Every slug is unique program-wide.

---

## 3. Fail-Safe Rollback Strategy & Descendant Table Dependency Graph

### 3.1 The Cascade Hierarchy
Inspecting foreign key constraints on the live PostgreSQL schema revealed a deep cascade hierarchy across 14 tables:
```
subjects (id)
 ├── units (ON DELETE CASCADE)
 │    ├── syllabus_topics (ON DELETE CASCADE)
 │    │    └── exam_answers (ON DELETE SET NULL)
 │    ├── notes (ON DELETE CASCADE)
 │    │    └── note_views (ON DELETE CASCADE)
 │    ├── progress_tracking (ON DELETE CASCADE)
 │    └── quizzes (ON DELETE CASCADE)
 │         ├── quiz_questions (ON DELETE CASCADE)
 │         │    ├── quiz_options (ON DELETE CASCADE)
 │         │    └── quiz_attempt_answers (ON DELETE CASCADE)
 │         └── quiz_attempts (ON DELETE CASCADE)
 │              └── quiz_attempt_answers (ON DELETE CASCADE)
 ├── papers (ON DELETE CASCADE)
 ├── bookmarks (polymorphic ref_id)
 ├── content_items (ON DELETE SET NULL)
 └── exam_answers (ON DELETE CASCADE)
```

### 3.2 Exact Rollback Restoration Values:
The rollback script restores exact prior values for every in-place modified subject:
- `e0e3f5ed-88b7-4066-98e8-8b33bfa046cb`: Reverted to `code = 'DIGITALELECT'`, `title = 'Digital Electronics'`, `deleted_at = '2026-07-07 05:51:58.608+00'`. Units removed only if 0 dependent notes/quizzes exist; soft-archived otherwise.
- `e1e44a1c-6c24-44de-84f9-16edb60505b0`: Reverted to `code = 'INTRODUCTION'`, `title = 'Introduction to Database System'`.
- `16de7764-85ea-41ae-9600-d7a9ad807eb9`: Reverted to `code = 'BUSINESSORGA'`, `title = 'Business Organization & Management'`.
- `1d8c39f2-baa5-4fed-a3a9-fb20ca34ca76`: Reverted to `code = 'MATHEMATICSI'`, `title = 'Mathematics I'`.
- `19db3ea2-df09-4c50-af44-59811381fd81`: Reverted to `code = 'BCA-423E'`, `title = 'INFORMATION SYSTEM FOR BUSINESS'`.
- Sem 1, 3, 4 subjects: Reverted to their exact prior casing and whitespace strings.
- Units: Reverted to generic placeholder strings (`1st Unit` through `5th Unit`) preserving all UUIDs and student history.
- Newly inserted subjects: Inspected across all 14 tables. If any student attempt, note, or progress row exists, deletion is blocked and the row is soft-archived (`status = 'archived'`).
- Schema Drop: Plain `DROP TABLE public.exam_answers;` without `CASCADE`.

---

## 4. Complete Before/After Subject Matrix (All 6 Semesters · 51 Courses)

| Sem | Course Code | Official Course Title | Type & Credits | Live Database Status | Units in DB | Planned Status | Student Data Status |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| **1** | BCA-101N | Computer Fundamentals and PC Software | Theory (4 Cr) | Existing (`05968c8c`) | 5 | Published | 10 attempts, 113 answers, 7 notes preserved |
| **1** | BCA-103N | Programming with C | Theory (4 Cr) | Existing (`45b20341`) | 5 | Published | 5 units preserved |
| **1** | BCA-105N | Basic Mathematics | Theory (4 Cr) | Existing (`a37d12d8`) | 5 | Published | 1 progress record, 5 units preserved |
| **1** | BCA-107N | Communicative English | Theory (4 Cr) | Existing (`0b7d9736`) | 5 | Published | 5 units preserved |
| **1** | BCA-109N | Principle of Management | Theory (4 Cr) | Existing (`c5721f68`) | 5 | Published | 5 units preserved |
| **1** | BCA-101P | LAB: (PC Software Lab) | Practical (2 Cr) | Missing | 0 | **Draft** | **0 units seeded (No fake units)** |
| **1** | BCA-103P | LAB: (C Programming) | Practical (2 Cr) | Missing | 0 | **Draft** | **0 units seeded (No fake units)** |
| *1* | *23-0R* | *maths (Draft Test)* | *Theory (4 Cr)* | *Existing (`a4d50234`)* | *1* | *Draft (Inactive)* | *Preserved as-is (Excluded from official count)* |
| **2** | BCA-102N | Data Structures using C | Theory (4 Cr) | Existing (`d80e2834`) | 5 | Published | 1 progress record, 5 units preserved |
| **2** | BCA-104N | Introduction to Database System | Theory (4 Cr) | Existing (`e1e44a1c`, code `INTRODUCTION`) | 5 | Published | 5 units preserved, UUID & slug preserved |
| **2** | BCA-106N | Business Organization & Management | Theory (4 Cr) | Existing (`16de7764`, code `BUSINESSORGA`) | 5 | Published | 5 units preserved, UUID & slug preserved |
| **2** | BCA-108N | Digital Electronics | Theory (4 Cr) | Existing (`e0e3f5ed`, code `DIGITALELECT`) | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **2** | BCA-401E | Mathematics (Elective E1-1) | Theory (4 Cr) | Existing (`1d8c39f2`, code `MATHEMATICSI`) | 5 | Published | 1 progress record, 5 units preserved |
| **2** | BCA-402E | Environment and Ecology (Elective E1-2) | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **2** | BCA-403E | Introduction to E-Governance (Elective E1-3) | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **2** | BCA-102P | LAB: (Data Structure) | Practical (2 Cr) | Missing | 0 | **Draft** | **0 units seeded (No fake units)** |
| **2** | BCA-104P | LAB: (RDBMS) | Practical (2 Cr) | Missing | 0 | **Draft** | **0 units seeded (No fake units)** |
| **3** | BCA-201N | Object oriented programming using JAVA | Theory (4 Cr) | Existing (`8ffa5896`) | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **3** | BCA-203N | Numerical Analysis and Statistical Techniques (NAST) | Theory (4 Cr) | Existing (`e66c67d0`) | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **3** | BCA-205N | Operating System | Theory (4 Cr) | Existing (`f7689cea`) | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **3** | BCA-207N | Computer Organization and Architecture | Theory (4 Cr) | Existing (`94d8428f`) | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **3** | BCA-411E | Discrete Mathematics (Elective E2-1) | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **3** | BCA-412E | Personality and Soft Skills Development (Elective E2-2) | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **3** | BCA-413E | Information System for Business (Elective E2-3) | Theory (4 Cr) | Existing (`19db3ea2`, duplicate code `BCA-423E`) | 0 | **Draft** | Correct code `BCA-423E` → `BCA-413E` |
| **3** | BCA-201P | LAB: (JAVA Programming) | Practical (2 Cr) | Missing | 0 | **Draft** | **0 units seeded (No fake units)** |
| **3** | BCA-203P | LAB: (NAST) | Practical (2 Cr) | Missing | 0 | **Draft** | **0 units seeded (No fake units)** |
| **4** | BCA-202N | Programming in Python | Theory (4 Cr) | Existing (`792b88b7`) | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **4** | BCA-204N | Unix and Shell Programming | Theory (4 Cr) | Existing (`ac9f9256`) | 0 | **Draft** | Seed **4 verified units** (Syllabus p. 24) |
| **4** | BCA-206N | Accounting and Financial Management | Theory (4 Cr) | Existing (`218d92c4`) | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **4** | BCA-208N | Computer Networks | Theory (4 Cr) | Existing (`1b647e62`) | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **4** | BCA-421E | E-Commerce (Elective E3-1) | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **4** | BCA-422E | IT Acts and Cyber Laws (Elective E3-2) | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **4** | BCA-423E | Software Engineering (Elective E3-3) | Theory (4 Cr) | Existing (`992b17a2`) | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **4** | BCA-202P | LAB: (Python Programming) | Practical (2 Cr) | Missing | 0 | **Draft** | **0 units seeded (No fake units)** |
| **4** | BCA-204P | LAB: (Unix and Shell Programming) | Practical (2 Cr) | Missing | 0 | **Draft** | **0 units seeded (No fake units)** |
| **5** | BCA-301N | Artificial Intelligence | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **5** | BCA-303N | Web Technologies | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **5** | BCA-305N | Computer Graphics and Animation | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **5** | BCA-431E | Introduction to Cyber Security (Elective E4-1) | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **5** | BCA-432E | GUI Programming (Elective E4-2) | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **5** | BCA-433E | Operation Research (Elective E4-3) | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **5** | BCA-303P | LAB: (Web Technologies) | Practical (2 Cr) | Missing | 0 | **Draft** | **0 units seeded (No fake units)** |
| **5** | BCA-305P | LAB: (Computer Graphics) | Practical (2 Cr) | Missing | 0 | **Draft** | **0 units seeded (No fake units)** |
| **5** | BCA-307P | Industrial Training (Internship Report) | Project/Training (4 Cr) | Missing | 0 | **Draft** | **0 units seeded (60-80 hrs internship)** |
| **6** | BCA-302N | Introduction to Data Science | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **6** | BCA-304N | Cloud Computing | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **6** | BCA-306N | Internet of Things | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **6** | BCA-441E | Software Testing (Elective E5-1) | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **6** | BCA-442E | Advanced Web Development Technologies (Elective E5-2) | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **6** | BCA-443E | Blockchain Foundations (Elective E5-3) | Theory (4 Cr) | Missing | 0 | **Draft** | Seed 5 verified units from syllabus as draft |
| **6** | BCA-302P | LAB: (Data Science) | Practical (2 Cr) | Missing | 0 | **Draft** | **0 units seeded (No fake units)** |
| **6** | BCA-308P | Major Project | Project (6 Cr) | Missing | 0 | **Draft** | **0 units seeded (12 hrs/week project)** |

---

## 5. Verification Queries & Exact Counts Reconciliation

### Reconciliation Summary:
- **Total Subjects:** 21 (before) $\rightarrow$ 52 (after). Delta = +31 newly inserted subjects.
  - Published subjects: 9 (live subjects with content).
  - Draft subjects: 43 (42 official unreviewed + 1 legacy test `23-0R`).
- **Total Units:** 46 (before) $\rightarrow$ 190 (after). Delta = +144 newly inserted units.
  - 45 existing official units updated in place with verified syllabus module titles.
  - 1 existing unit under draft test subject `23-0R` untouched.
  - 144 newly inserted units: 28 theory subjects $\times$ 5 units + 1 theory subject (BCA-204N) $\times$ 4 units = 144 units.
  - All 13 practical, industrial training, and major project courses have strictly 0 units (no fake units).
  - Total official units: 45 existing + 144 inserted = 189 units across 38 theory courses (+1 draft unit = 190 total units).

```sql
-- Post-migration status and count verification
SELECT 
  sem.number AS semester,
  count(s.id) FILTER (WHERE s.status = 'published' AND s.deleted_at IS NULL) AS published_subjects,
  count(s.id) FILTER (WHERE s.status = 'draft' OR s.deleted_at IS NOT NULL) AS draft_or_inactive_subjects,
  count(s.id) AS total_subjects
FROM public.semesters sem
LEFT JOIN public.subjects s ON s.semester_id = sem.id
WHERE sem.course_id = 'cb0c4026-0d38-4401-8c57-c88b485ad121'
GROUP BY sem.number
ORDER BY sem.number;

-- EXPECTED VERIFICATION TABLE:
-- semester | published_subjects | draft_or_inactive_subjects | total_subjects
-- ---------+--------------------+----------------------------+---------------
--        1 |                  5 |                          3 |              8
--        2 |                  4 |                          5 |              9
--        3 |                  0 |                          9 |              9
--        4 |                  0 |                          9 |              9
--        5 |                  0 |                          9 |              9
--        6 |                  0 |                          8 |              8
-- TOTAL    |                  9 |                         43 |             52
```
