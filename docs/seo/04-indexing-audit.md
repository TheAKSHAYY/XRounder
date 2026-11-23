# XRounder — Indexing & Discoverability Audit

**Domain:** `https://www.xrounder.in`  
**Target:** Search Engine Crawlers & Educational Discovery  
**Audit Date:** 2026-11-23  

---

## 1. Indexable Public URLs vs Excluded Private URLs

### 1.1 Indexable Public Routes (Allow & Include in Sitemap)
1. `/` (Homepage & Platform Introduction)
2. `/courses` (All Courses Directory)
3. `/courses/:courseSlug` (Degree Program Overview e.g. BCA)
4. `/courses/:courseSlug/:semesterNumber` (Semester Curricular Hub e.g. BCA Sem 1)
5. `/courses/:courseSlug/:semesterNumber/:subjectSlug` (Subject Overview & Syllabus)
6. `/courses/:courseSlug/:semesterNumber/:subjectSlug/:unitNumber` (Unit Learning Hub)
7. `/notes/:noteId` (Curriculum Study Notes & Reading Material)
8. `/papers` (PYQ University Archive Hub)
9. `/papers/:paperId` (Individual Examination Question Paper)
10. `/quizzes/:quizId` (MCQ Practice Quiz & Self-Assessment)
11. `/mock-test` (Multi-Unit Practice Test Generator)
12. `/explore` (Guest Learning Explorer)
13. `/developer` (Platform Vision, Author & Technology Stack)
14. `/privacy` (Student Privacy Policy)
15. `/terms` (Platform Terms of Service)

### 1.2 Excluded Private / Administrative Routes (Disallow in robots.txt / Noindex)
1. `/_authenticated/*` (Personal student dashboards, bookmarks, study history, settings)
2. `/admin/*` (Content management, moderation, user administration, SEO manager)
3. `/setup` (Initial administrator bootstrapping)
4. `/reset-password` (Transactional account recovery)
5. `/auth` (Login and account registration form — protected with `noindex, follow`)
6. `/[.mcp]/*` & `/[.well-known]/*` (Machine and tool API endpoints)

---

## 2. Duplicate Content & Parameter Normalization

### 2.1 Trailing Slash Consistency
- Standardized rule: **No trailing slashes** on sub-paths.
- Canonical target: `https://www.xrounder.in/courses` (never `/courses/`), `https://www.xrounder.in/papers` (never `/papers/`).
- Root path canonical target: `https://www.xrounder.in/` (slash strictly preserved).

### 2.2 Query Parameter Neutralization
- On `/courses?search=...`, `/papers?subject=...&year=...`, and `/explore?q=...`:
  - Search filters and facet selections dynamically change client views.
  - **Canonical Enforcement:** The `<link rel="canonical">` tag on these pages points directly to the clean, parameter-free URL (`https://www.xrounder.in/courses`, `https://www.xrounder.in/papers`, etc.).
  - This prevents Googlebot from indexing thousands of duplicate facet URLs.

---

## 3. Soft 404 Prevention

### 3.1 Error Handling & HTTP Status
- In TanStack Start:
  - If a route slug does not exist (e.g. invalid course slug or non-existent note UUID), `notFound()` is thrown from loaders.
  - `__root.tsx` renders `NotFoundComponent` displaying clear 404 messaging and a link to return home.
- Verified: Zero empty white screens or infinite loading spinners when an invalid ID is requested.

---

## 4. Crawl Depth & Internal Path Discoverability

```
Level 0:  [Homepage /]  ────────────────────────────────────────────────────────┐
                 │                                                              │
Level 1:  [Courses /courses]   [Papers Hub /papers]   [Mock Test /mock-test]   [Footer Links]
                 │                      │                       │
Level 2:  [Course /courses/bca]         │                       │
                 │                      │                       │
Level 3:  [Semesters /courses/bca/1..6] │                       │
                 │                      │                       │
Level 4:  [Subjects /courses/bca/1/:subj]                      │
                 │                      │                       │
Level 5:  [Units /courses/bca/1/:subj/:unit]                    │
           ├── [Notes /notes/:id] <─────┘                       │
           └── [Quizzes /quizzes/:id] <─────────────────────────┘
```

Every level has bi-directional crawl paths via Breadcrumbs and navigation cards, ensuring Googlebot can crawl from the root to any unit in $\le 5$ clicks.
