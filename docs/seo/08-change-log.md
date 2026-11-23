# XRounder — SEO & Discoverability Change Log

**Platform:** XRounder (https://www.xrounder.in/)  
**Target Audience:** MJPRU BCA Students  
**Implementation Date:** 2026-11-23  

---

## 1. Summary of Changes

| Ref | Type | Target File | Description | Impact |
| :--- | :--- | :--- | :--- | :--- |
| **P0-01** | Feature | `src/routes/sitemap[.]xml.tsx` | Expanded XML sitemap generation to index static `/papers`, plus all published `papers`, `notes`, and `quizzes` dynamically with lastmod. | Unlocks discovery for hundreds of study assets |
| **P0-02** | Security / Indexing | `public/robots.txt` & `src/routes/auth.tsx` | Added `Disallow: /auth` to robots.txt and `{ name: "robots", content: "noindex, follow" }` to auth route metadata. | Prevents indexing thin auth form; focuses crawler budget on content |
| **P1-01** | Bug Fix / Dynamic SEO | `src/routes/notes.$noteId.tsx` | Implemented server `loader` with `fetchNote()` and dynamic `head()` generating note title, subject, unit, Schema.org `Article`/`LearningResource`, and `BreadcrumbList`. | Replaces generic boilerplate title with high-intent long-tail keywords |
| **P1-02** | Bug Fix / Dynamic SEO | `src/routes/papers.$paperId.tsx` | Implemented server `loader` with `fetchPaperDetails()` and dynamic `head()` generating paper title, year, subject, Schema.org `LearningResource`, and breadcrumbs. | Enables search discovery for specific university exam papers |
| **P1-03** | Enhancement | `src/routes/quizzes.$quizId.tsx` | Returned quiz metadata from loader to `head()` generating dynamic title, description, and Schema.org `Quiz` markup. | Optimizes practice quiz pages for MCQ test searches |
| **P2-01** | Performance & Compliance | Multiple leaf routes (`courses`, `explore`, `mock-test`, `privacy`, `terms`, `notes`, `papers`, `quizzes`) | Standardized all `og:image` and `twitter:image` tags to `https://www.xrounder.in/xrounder-share.jpg` (100 KB, 1200x630 compressed JPEG), replacing heavy 563 KB PNG. | 82.2% payload reduction per social crawl; adheres to AGENTS.md |
| **P2-02** | Internal Linking | `src/components/layout/site-footer.tsx` | Added "Previous Papers" (`/papers`) to global site footer links. | Provides universal internal link equity to the PYQ repository |
| **P2-03** | Metadata & Schema | `src/routes/papers.index.tsx` | Added complete Open Graph card, Twitter card, and Schema.org `CollectionPage` + `BreadcrumbList` graphs. | Rich social cards and search snippets for the question papers archive |

---

## 2. Granular Code Changes

### 2.1 `src/routes/sitemap[.]xml.tsx`
- Added `/papers` to static sitemap entries list.
- Implemented queries against `papers`, `notes` (status='published', visibility='public'), and `quizzes` (status='published', is_public=true) tables.
- Added mapped entries with ISO formatted `lastmod` dates and priority weights.

### 2.2 `public/robots.txt`
- Added `Disallow: /auth` directive to protect student login URLs from crawler exhaustion.

### 2.3 `src/routes/auth.tsx`
- Added `{ name: "robots", content: "noindex, follow" }` to head metadata.

### 2.4 `src/routes/notes.$noteId.tsx`
- Added `fetchNote(queryClient, noteId)` ensuring cached prefetching during SSR and client navigation.
- Configured dynamic `title: "${note.title}${subjectPart}${unitPart}${coursePart}"`.
- Added Schema.org `BreadcrumbList` and `LearningResource` JSON-LD graphs.
- Updated social share images to `xrounder-share.jpg`.

### 2.5 `src/routes/papers.$paperId.tsx`
- Added `fetchPaperDetails(queryClient, paperId)`.
- Configured dynamic `title: "${paper.title} (${paper.year}) — University Question Paper · XRounder"`.
- Added Schema.org `BreadcrumbList` and `LearningResource` graphs.
- Replaced image tags with `xrounder-share.jpg`.

### 2.6 `src/routes/quizzes.$quizId.tsx`
- Updated loader to return `{ quiz }`.
- Generated dynamic title: `${quiz.title} — Online MCQ Practice Quiz · XRounder`.
- Injected Schema.org `Quiz` and `BreadcrumbList` structured data.

### 2.7 `src/routes/papers.index.tsx`
- Added missing `og:image`, `og:image:width`, `og:image:height`, `og:image:alt`, `twitter:card`, `twitter:image`.
- Injected Schema.org `BreadcrumbList` and `CollectionPage`.

### 2.8 `src/components/layout/site-footer.tsx`
- Added `{ label: "Previous Papers", to: "/papers" }` to `FOOTER_LINKS`.
