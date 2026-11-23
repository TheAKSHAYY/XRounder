# XRounder — SEO & Discoverability Implementation Backlog

**Domain:** `https://www.xrounder.in`  
**Status:** In Active Execution  
**Audit Date:** 2026-11-23  

---

## Priority Tiers

- **P0:** Critical indexing or site-breaking problems.
- **P1:** High-impact technical and discoverability problems.
- **P2:** Content optimization, metadata, internal linking, and performance.
- **P3:** Long-term SEO improvements and experiments.

---

## Backlog Items

### ITEM P0-01: Incomplete XML Sitemap Coverage
- **Priority:** P0
- **Problem:** Dynamic XML sitemap (`/sitemap.xml`) only indexes top-level course hierarchy; `/papers` is missing, and individual published notes (`/notes/:id`), papers (`/papers/:id`), and quizzes (`/quizzes/:id`) are completely omitted.
- **Evidence:** `src/routes/sitemap[.]xml.tsx` lines 39–178 only queries `courses`, `semesters`, `subjects`, and `units`.
- **Affected URLs:** `https://www.xrounder.in/sitemap.xml`, all `/papers/*`, `/notes/*`, `/quizzes/*` URLs.
- **Root Cause:** Hardcoded query logic never added queries for `papers`, `notes`, or `quizzes` tables.
- **Expected Benefit:** Search engines instantly discover hundreds of published notes, university past papers, and MCQ tests via Search Console and automated crawls.
- **Implementation Plan:**
  1. Add `/papers` to static entries list.
  2. Query published `papers` (`status = 'published'`, `deleted_at IS NULL`) and append `/papers/:id`.
  3. Query published public `notes` (`status = 'published'`, `visibility = 'public'`, `deleted_at IS NULL`) and append `/notes/:id`.
  4. Query published public `quizzes` (`status = 'published'`, `is_public = TRUE`, `deleted_at IS NULL`) and append `/quizzes/:id`.
  5. Include `<lastmod>` timestamps formatted as `YYYY-MM-DD`.
- **Files Requiring Changes:** `src/routes/sitemap[.]xml.tsx`
- **Testing Method:** Verify XML output, route compilation, and valid XML formatting.
- **Final Status:** PENDING

---

### ITEM P0-02: Missing robots.txt Directive for /auth
- **Priority:** P0
- **Problem:** `/auth` page is crawlable by default and has indexable canonical metadata, creating risk of search engines ranking an empty authentication screen.
- **Evidence:** `public/robots.txt` omits `/auth`, and `src/routes/auth.tsx` has `{ rel: "canonical", href: "https://www.xrounder.in/auth" }` without `noindex`.
- **Affected URLs:** `https://www.xrounder.in/auth`
- **Root Cause:** Auth route metadata lacks robots directive.
- **Expected Benefit:** Prevents search engines from indexing sign-in screen; consolidates search authority on public educational pages.
- **Implementation Plan:** Add `{ name: "robots", content: "noindex, follow" }` to `src/routes/auth.tsx`.
- **Files Requiring Changes:** `src/routes/auth.tsx`
- **Testing Method:** Verify `auth.tsx` head metadata contains robots noindex.
- **Final Status:** PENDING

---

### ITEM P1-01: Static Generic Metadata on Note Pages
- **Priority:** P1
- **Problem:** Every note URL (`/notes/$noteId`) renders identical static title `"Study Note & Reading Material · XRounder"` and identical description.
- **Evidence:** `src/routes/notes.$noteId.tsx` lacks a loader and has hardcoded strings in `head()`.
- **Affected URLs:** All `/notes/:noteId` URLs.
- **Root Cause:** Route was implemented with client-only `useQuery` without TanStack Router server `loader` populating `loaderData`.
- **Expected Benefit:** Highly targeted long-tail search impressions for specific topics (e.g. "Von Neumann Architecture notes BCA", "C programming control statements notes").
- **Implementation Plan:**
  1. Add `loader` to fetch note details, unit title, and subject title.
  2. In `head: ({ loaderData, params })`, dynamically construct title: `${note.title} — ${subject.title} (Unit ${unit.number}) Notes · XRounder`.
  3. Construct dynamic description and Schema.org `Article` / `LearningResource` structured data.
- **Files Requiring Changes:** `src/routes/notes.$noteId.tsx`
- **Testing Method:** Typecheck and SSR metadata inspection.
- **Final Status:** PENDING

---

### ITEM P1-02: Static Generic Metadata on Paper Pages
- **Priority:** P1
- **Problem:** Every paper URL (`/papers/$paperId`) renders identical title `"University Question Paper · XRounder"`.
- **Evidence:** `src/routes/papers.$paperId.tsx` lacks a loader and has hardcoded strings in `head()`.
- **Affected URLs:** All `/papers/:paperId` URLs.
- **Root Cause:** Paper route lacks server loader and dynamic metadata mapping.
- **Expected Benefit:** Captures high-intent student searches for university past papers (e.g. "BCA 101N 2023 question paper MJPRU").
- **Implementation Plan:**
  1. Add `loader` to fetch paper record with subject info.
  2. Dynamically set title: `${paper.title} (${paper.year}) — Previous Year Question Paper · XRounder`.
  3. Add Schema.org `LearningResource` markup and canonical metadata.
- **Files Requiring Changes:** `src/routes/papers.$paperId.tsx`
- **Testing Method:** Typecheck and head metadata validation.
- **Final Status:** PENDING

---

### ITEM P1-03: Static Metadata on Quiz Pages
- **Priority:** P1
- **Problem:** Every quiz URL (`/quizzes/$quizId`) renders identical title `"MCQ Practice Quiz · XRounder"`.
- **Evidence:** `src/routes/quizzes.$quizId.tsx` prefetches questions but does not return quiz details to `head()`.
- **Affected URLs:** All `/quizzes/:quizId` URLs.
- **Root Cause:** `loader` returns void; `head` lacks loaderData.
- **Expected Benefit:** Ranks for online mock test and MCQ practice queries.
- **Implementation Plan:**
  1. Have `loader` fetch and return quiz metadata (title, description).
  2. Dynamically set title: `${quiz.title} — Online MCQ Practice Quiz · XRounder`.
  3. Add Schema.org `Quiz` structured data.
- **Files Requiring Changes:** `src/routes/quizzes.$quizId.tsx`
- **Testing Method:** Typecheck and head metadata validation.
- **Final Status:** PENDING

---

### ITEM P2-01: Social Sharing Image & Metadata Standardization
- **Priority:** P2
- **Problem:** Several routes reference heavy `og-image.png` (563 KB) or lack Open Graph / Twitter tags altogether (`papers.index.tsx`).
- **Evidence:** Codebase review in `papers.index.tsx`, `notes.$noteId.tsx`, `explore.tsx`, `mock-test.tsx`.
- **Affected URLs:** `/papers`, `/notes/*`, `/quizzes/*`, `/explore`, `/mock-test`.
- **Root Cause:** Non-standardized image references; missing tags on `papers.index.tsx`.
- **Expected Benefit:** Complies with project rule in `AGENTS.md` (compressed 1200x630 share image in leaf routes); reduces social crawler payload from 563 KB to 100 KB; rich social card previews on WhatsApp, Twitter, and LinkedIn.
- **Implementation Plan:** Replace image URLs with `https://www.xrounder.in/xrounder-share.jpg` (1200x630) and add full OG/Twitter card tags to `/papers`.
- **Files Requiring Changes:** `src/routes/papers.index.tsx`, `src/routes/notes.$noteId.tsx`, `src/routes/papers.$paperId.tsx`, `src/routes/quizzes.$quizId.tsx`, `src/routes/explore.tsx`, `src/routes/mock-test.tsx`.
- **Testing Method:** Verification of meta tags across routes.
- **Final Status:** PENDING

---

### ITEM P2-02: Universal Internal Link Equity for Question Papers (/papers)
- **Priority:** P2
- **Problem:** The `/papers` archive is not linked from the global site footer, restricting internal link equity to only direct navigation.
- **Evidence:** `src/components/layout/site-footer.tsx` lines 14–21 omits `/papers`.
- **Affected URLs:** Global footer on all public pages.
- **Root Cause:** Footer links array omitted "Previous Papers".
- **Expected Benefit:** Spreads PageRank and internal link equity to `/papers` from every single page on the site.
- **Implementation Plan:** Add `{ label: "Previous Papers", to: "/papers" }` to `FOOTER_LINKS` in `src/components/layout/site-footer.tsx`.
- **Files Requiring Changes:** `src/components/layout/site-footer.tsx`
- **Testing Method:** Verify footer links rendered and navigation tested.
- **Final Status:** PENDING
