# XRounder — Complete Technical SEO Audit

**Domain:** `https://www.xrounder.in`  
**Framework:** TanStack Start (React 19 + TanStack Router + TanStack Query + Tailwind CSS v4 + Vite + Nitro)  
**Hosting/Target:** Cloudflare Pages / Workers (via Nitro preset)  
**Database:** PostgreSQL (Supabase)  
**Audit Date:** 2026-11-23  
**Status:** Actionable Findings Identified  

---

## 1. Crawlability & Indexing Architecture

### 1.1 robots.txt Analysis
- **Location:** `public/robots.txt`
- **Current Directive:**
  ```txt
  User-agent: *
  Allow: /

  Disallow: /admin
  Disallow: /admin/
  Disallow: /_authenticated/
  Disallow: /setup
  Disallow: /reset-password

  Sitemap: https://www.xrounder.in/sitemap.xml
  ```
- **Findings:**
  - ✅ Search engines are allowed to crawl the root and public paths.
  - ✅ Administrative and authenticated routes (`/admin`, `/_authenticated/`) are cleanly blocked.
  - ⚠️ `/auth` (the student login/signup route) is currently accessible without a `noindex` directive, risking indexing of an empty auth form instead of educational content.
  - ✅ Sitemap endpoint directive correctly specifies the absolute HTTPS canonical location.

### 1.2 XML Sitemap Architecture (`/sitemap.xml`)
- **Route Implementation:** `src/routes/sitemap[.]xml.tsx`
- **Generation Method:** Dynamic server route serving `application/xml; charset=utf-8` with HTTP caching headers (`Cache-Control: public, max-age=3600, s-maxage=86400`).
- **Current Coverage:**
  - Static URLs: `/`, `/courses`, `/explore`, `/mock-test`, `/developer`, `/privacy`, `/terms`.
  - Dynamic URLs: Published courses (`/courses/:courseSlug`), published semesters (`/courses/:courseSlug/:sem`), published subjects (`/courses/:courseSlug/:sem/:subject`), published units (`/courses/:courseSlug/:sem/:subject/:unit`).
- **Critical Sitemaps Gaps (P0):**
  1. `/papers` (PYQ Archive Hub) is completely missing from static entries.
  2. Individual published question papers (`/papers/:paperId`) are not queried or emitted.
  3. Individual published notes (`/notes/:noteId`) are not queried or emitted.
  4. Individual published practice quizzes (`/quizzes/:quizId`) are not queried or emitted.
- **Remediation Plan:** Query published `papers`, `notes` (status='published', visibility='public'), and `quizzes` (status='published', is_public=true) with their respective `updated_at` dates to form an exhaustive, dynamic educational sitemap.

### 1.3 HTTP Response Codes & Canonicalization
- **Protocol:** Enforced HTTPS.
- **Canonical Consistency:** All surveyed public routes include `<link rel="canonical" href="..." />` pointing to `https://www.xrounder.in/...` without trailing slashes (except the home page `/`).
- **Noindex Protection:** Auth and private user dashboards must strictly omit or mark with `noindex, nofollow`.

---

## 2. JavaScript Rendering & Server-Side Hydration

### 2.1 TanStack Start SSR Assessment
- **Architecture:** TanStack Start compiles server handlers and client bundles via Vite and Nitro.
- **Server Data Loading:**
  - On `/courses/$courseSlug`, `/courses/.../$semesterNumber`, `/courses/.../$subjectSlug`, `/courses/.../$subjectSlug/$unitNumber`:
    - `loader` function executes on server to fetch curriculum entities.
    - `head: ({ loaderData })` injects dynamic `<title>`, `<meta name="description">`, and JSON-LD structured data into the raw server-rendered HTML.
    - Result: Googlebot inspects complete, rich metadata on the initial fetch before running JavaScript.
- **Critical SSR Defect in Leaf Routes (P1):**
  - In `src/routes/notes.$noteId.tsx`:
    - **No `loader` defined!** The component uses client-only `useQuery`.
    - `head: ({ params })` outputs static placeholder title: `"Study Note & Reading Material · XRounder"`.
    - Result: Search engines crawling note pages see identical titles across all notes, destroying search visibility for subject-specific searches.
  - In `src/routes/papers.$paperId.tsx`:
    - **No `loader` defined!**
    - `head: ({ params })` outputs static placeholder title: `"University Question Paper · XRounder"`.
  - In `src/routes/quizzes.$quizId.tsx`:
    - `loader` prefetches questions but does not fetch or return quiz metadata.
    - `head: ({ params })` outputs static placeholder title: `"MCQ Practice Quiz · XRounder"`.
- **Remediation Plan:**
  - Add loaders to `notes.$noteId.tsx` and `papers.$paperId.tsx` that load the respective entity and its parent subject/unit hierarchy.
  - Return loader data into `head: ({ loaderData, params })` to generate highly descriptive, keyword-targeted titles and descriptions.

---

## 3. Metadata & Open Graph Social Cards

### 3.1 Social Sharing Asset Alignment (AGENTS.md Compliance)
- **AGENTS.md Rule:** *"Keep share images in leaf-route metadata, never the root layout... use a 1200x630 compressed image with matching Open Graph and Twitter URLs."*
- **Current State:**
  - Several routes (`notes.$noteId`, `papers.$paperId`, `quizzes.$quizId`, `courses.index`, `explore`, `mock-test`) link to `/og-image.png` which is **563 KB**.
  - High-performance, optimized card `xrounder-share.jpg` exists in `public/` at **100 KB** (exact 1200x630 resolution).
  - `/papers/index.tsx` completely lacks Open Graph image tags and Twitter card tags.
- **Remediation Plan:** Standardize all public leaf routes on `https://www.xrounder.in/xrounder-share.jpg` with matching `og:image` and `twitter:image`.

---

## 4. Structured Data (Schema.org) Audit

| Route Pattern | Current Schema Markup | Target Schema Markup | Status |
| :--- | :--- | :--- | :--- |
| `/` | `WebSite`, `EducationalOrganization` | `WebSite`, `EducationalOrganization` | Valid ✅ |
| `/courses` | `BreadcrumbList` | `BreadcrumbList` + `ItemList` | Needs Enhancement ⚠️ |
| `/courses/:courseSlug` | `BreadcrumbList`, `Course` | `BreadcrumbList`, `Course` | Valid ✅ |
| `/courses/.../:semesterNumber` | `BreadcrumbList` | `BreadcrumbList` | Valid ✅ |
| `/courses/.../:subjectSlug` | `BreadcrumbList`, `Course` | `BreadcrumbList`, `Course` | Valid ✅ |
| `/courses/.../:unitNumber` | `BreadcrumbList` | `BreadcrumbList` + `LearningResource` | Needs Enhancement ⚠️ |
| `/papers` | None | `BreadcrumbList`, `CollectionPage` | Missing ❌ |
| `/papers/:paperId` | None | `BreadcrumbList`, `LearningResource` | Missing ❌ |
| `/notes/:noteId` | None | `BreadcrumbList`, `Article` / `LearningResource` | Missing ❌ |
| `/quizzes/:quizId` | None | `BreadcrumbList`, `Quiz` | Missing ❌ |

---

## 5. Technical Audit Summary Scorecard

- **Crawlability:** 85/100 (Passable, needs `/auth` noindex)
- **Indexation Coverage:** 60/100 (Major deficit: notes, papers, quizzes omitted from sitemap)
- **Metadata Uniqueness:** 55/100 (Deficit: static titles on notes, papers, quizzes)
- **Structured Data:** 65/100 (Good breadcrumbs on course hierarchy, missing on resources)
- **Asset Optimization:** 80/100 (Heavy PNG OG image used instead of optimized 100KB JPG)
