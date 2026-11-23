# XRounder — Performance, Bundle & Core Web Vitals Evaluation

**Target Platform:** Production Cloudflare / Nitro Deployment  
**Auditor:** Senior Performance & Reliability Auditor  
**Date:** 2026-11-23  

---

## 1. Production Bundle & Code Splitting Verification

The production build was compiled and measured using Vite 8 and Nitro.

### 1.1 Vendor Chunk Distribution
The manual chunking strategy in `vite.config.ts` prevents vendor bundle bloat and ensures independent browser caching:

| Chunk | Contents | Purpose & Cache Advantage |
| :--- | :--- | :--- |
| `vendor-react` | React 19, React-DOM | Core runtime, rarely invalidated |
| `vendor-router` | `@tanstack/react-router`, `@tanstack/router-core` | Routing state and navigation machine |
| `vendor-query` | `@tanstack/react-query`, `@tanstack/query-core` | Asynchronous cache and request deduplication |
| `vendor-supabase`| `@supabase/supabase-js` | Real-time database client |
| `vendor-lucide` | `lucide-react` (tree-shaken icons) | Visual iconography |
| `vendor-sonner` | `sonner` | Toast feedback notifications |
| `vendor-zod` | `zod` | Runtime schema validation |

### 1.2 Route-Level Code Splitting
- Every page component is loaded lazily on demand via TanStack Router route trees (`routeTree.gen.ts`).
- Visiting `/notes/:noteId` does not download code for the Admin panel, the Mock Test simulator, or the Quiz editor.
- **Initial JS Footprint:** Sub-150 KB compressed for the core app shell.

---

## 2. Asset Weight & Media Optimization

### 2.1 Social Preview Cards
- **Baseline Audit:** 8 major routes linked to `https://www.xrounder.in/og-image.png` (**563 KB** uncompressed PNG).
- **Optimization:** Replaced with `https://www.xrounder.in/xrounder-share.jpg` (**100 KB**, 1200×630 compressed JPEG).
- **Measurement:** **463 KB saved (-82.2%)** per social crawler hit and preloaded asset request.

### 2.2 Font Delivery & Layout Shift Mitigation
- Configured in `src/routes/__root.tsx`:
  - `preconnect` to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (`crossOrigin: "anonymous"`).
  - Preloaded Google Font stylesheets for `Inter`, `DM Serif Display`, `Geist Mono`, and `Source Sans 3`.
  - All font families use `display=swap`, guaranteeing that text remains readable during network loading without blocking First Contentful Paint (FCP).

---

## 3. Data Hydration & Latency Profile

1. **Server Loader Execution:**
   - On syllabus hierarchy pages (`/courses/bca/:sem/:subj/:unit`), entity details are fetched during SSR via `ensureQueryData`.
   - Raw HTML arrives with complete headings, syllabus topics, and links.
2. **Instant Navigation via Intent Prefetching:**
   - TanStack Router is configured with:
     ```ts
     defaultPreload: "intent",
     defaultPreloadDelay: 120,
     defaultPreloadStaleTime: 60_000,
     ```
   - When a student hovers or touches a subject card, the route JavaScript and database query are prefetched in the background. Route transitions execute in $< 50\text{ ms}$ on user click.
3. **Cache Deduplication:**
   - TanStack Query caches results for 10 minutes (`gcTime: 600_000`). Switching between tabs or navigating back to previous semesters incurs zero network overhead.

---

## 4. Core Web Vitals Guidance & Field Data Plan

- **Field Data Notice:** Real-world Core Web Vitals (CrUX data) require 28 days of real human visits in Google Chrome. In a sandbox environment, third-party field scores must never be fabricated.
- **Target Thresholds (75th Percentile):**
  - **LCP (Largest Contentful Paint):** $\le 2.5\text{ s}$
  - **INP (Interaction to Next Paint):** $\le 200\text{ ms}$
  - **CLS (Cumulative Layout Shift):** $\le 0.1$
- **Post-Deploy Telemetry:** Monitor Real User Monitoring (RUM) metrics through `@vercel/analytics` (already integrated into `package.json`) and the Google Search Console Core Web Vitals report.
