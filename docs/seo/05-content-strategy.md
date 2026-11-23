# XRounder — Content & Semantic SEO Strategy

**Domain:** `https://www.xrounder.in`  
**Target Syllabus:** MJPRU Bachelor of Computer Applications (BCA)  
**Academic Session:** 2024–25 Onwards (CBCS & NEP 2020 Pattern)  
**Audit Date:** 2026-11-23  

---

## 1. Content Architecture Principles

### 1.1 Strict 5-Tier Educational Hierarchy
Content is organized following how universities structure degrees and how students prepare for exams:
$$\text{Course (BCA)} \longrightarrow \text{Semester (1–6)} \longrightarrow \text{Subject} \longrightarrow \text{Unit (1–5)} \longrightarrow \text{Notes, Papers, Quizzes}$$

1. **Course Hub (`/courses/bca`):**
   - Introduces the degree, university affiliation (MJPRU Bareilly), duration (3 years / 6 semesters), and complete curriculum roadmap.
   - Links to all 6 semesters.
2. **Semester Hub (`/courses/bca/:sem`):**
   - Outlines semester objectives, total credits, theory vs practical exam breakdown (30 internal + 70 external marks), and all enrolled subjects.
3. **Subject Hub (`/courses/bca/:sem/:subject`):**
   - Displays official university course code (e.g., `BCA-101N`), credit weight, and all modular units.
   - Provides quick tabs for Syllabus, Notes, Past Question Papers, and MCQ Quizzes.
4. **Unit Learning Hub (`/courses/bca/:sem/:subject/:unit`):**
   - Presents unit lecture outline, key concepts, study articles, attached reference documents, and unit practice questions.
5. **Learning Content Assets:**
   - **Notes (`/notes/:noteId`):** In-depth, readable study articles with Markdown headings, diagrams, code blocks, and key exam definitions.
   - **Past Papers (`/papers/:paperId`):** Official previous year university exam questions organized by year and exam type.
   - **Quizzes (`/quizzes/:quizId`):** Practice questions with instant evaluation and detailed conceptual explanations.

---

## 2. On-Page Semantic SEO & Heading Structure

To satisfy Google's Helpful Content standards and accessibility requirements:
1. **Single Primary H1:** Every route must contain exactly one informative, human-readable `<h1>` matching the search query intent.
   - Example (Subject Page): `<h1>Computer Fundamentals and PC Software (BCA-101N)</h1>`
   - Example (Unit Page): `<h1>Unit 1: Computer Evolution, Architecture & Software Types</h1>`
   - Example (Note Page): `<h1>Von Neumann Architecture & Computer Organization</h1>`
   - Example (Paper Page): `<h1>BCA-101N Computer Fundamentals (2023) — MJPRU Question Paper</h1>`
2. **Structured H2/H3 Subheadings:**
   - H2: `Syllabus Overview & Course Objectives`
   - H2: `Units & Modular Breakdown`
   - H2: `Examination Scheme & Mark Distribution`
   - H2: `Previous Year Question Papers (PYQs)`
   - H2: `Practice MCQs & Self-Assessment`
3. **Contextual Internal Linking:**
   - Every subject page contextually links directly to related past question papers in `/papers` matching that subject's paper code.
   - Every unit page contextually links to its dedicated MCQ practice test in `/quizzes`.
   - Every note page includes a return anchor to its parent unit and links to the next sequential topic.

---

## 3. High-Value MJPRU Educational Keywords Matrix

| Subject Code | Official Title | Semester | Primary Keyword Target |
| :--- | :--- | :---: | :--- |
| **BCA-101N** | Computer Fundamentals & PC Software | Sem 1 | "mjpru bca 101n notes computer fundamentals" |
| **BCA-103N** | Programming with C | Sem 1 | "bca 103n c programming notes mjpru" |
| **BCA-105N** | Basic Mathematics | Sem 1 | "mjpru bca 105n basic mathematics 1st sem notes" |
| **BCA-107N** | Communicative English | Sem 1 | "bca 107n communicative english notes bareilly" |
| **BCA-109N** | Principle of Management | Sem 1 | "bca 109n principle of management notes mjpru" |
| **BCA-102N** | Data Structures using C | Sem 2 | "bca 102n data structures notes mjpru 2nd sem" |
| **BCA-104N** | Introduction to Database System | Sem 2 | "bca 104n dbms notes mjpru" |
| **BCA-106N** | Business Organization & Management | Sem 2 | "bca 106n business organization notes" |
| **BCA-108N** | Digital Electronics | Sem 2 | "bca 108n digital electronics notes logic gates" |
| **BCA-201N** | OOPs using JAVA | Sem 3 | "mjpru bca java notes 3rd semester bca 201n" |
| **BCA-203N** | Numerical Analysis & Statistics (NAST)| Sem 3 | "bca 203n nast notes rohilkhand university" |
| **BCA-205N** | Operating System | Sem 3 | "bca 205n operating system notes mjpru" |
| **BCA-207N** | Computer Organization & Architecture | Sem 3 | "bca 207n coa notes computer architecture" |
| **BCA-202N** | Programming in Python | Sem 4 | "bca 202n python notes 4th sem mjpru" |
| **BCA-204N** | Unix and Shell Programming | Sem 4 | "bca 204n unix shell programming notes" |
| **BCA-208N** | Computer Networks | Sem 4 | "bca 208n computer networks notes osi model" |
| **BCA-301N** | Artificial Intelligence | Sem 5 | "bca 301n artificial intelligence notes" |
| **BCA-303N** | Web Technologies | Sem 5 | "bca 303n web technologies notes html css php" |
| **BCA-302N** | Introduction to Data Science | Sem 6 | "bca 302n data science notes 6th sem mjpru" |
| **BCA-304N** | Cloud Computing | Sem 6 | "bca 304n cloud computing notes bareilly" |

---

## 4. Content Gap Backlog & Ongoing Curation Plan

For subjects with syllabus outlines already seeded:
1. Maintain syllabus accuracy according to the 52-page MJPRU official handbook.
2. Ingest authentic past examination question papers into the `/papers` repository.
3. Never seed computer-hallucinated or thin dummy answers. If notes are pending review, clearly state "Curated study notes in review for 2024-25 scheme" rather than publishing empty filler text.
