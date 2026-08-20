# XRounder

An enterprise-grade universal Learning Management System (LMS) for students on any course, built as a
multi-course content platform with a full admin CMS.

Content is organised as a strict hierarchy:

```text
Course  →  Semester  →  Subject  →  Unit  →  Content (notes, PDFs, PPTs, videos, links, assignments)
                                     └────  Quizzes → Questions → Attempts
```

---

## Table of contents

- [Feature overview](#feature-overview)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Routing map](#routing-map)
- [Data model](#data-model)
- [Security model](#security-model)
- [Design system](#design-system)
- [Local development](#local-development)
- [Environment variables](#environment-variables)
- [Conventions and gotchas](#conventions-and-gotchas)

---

## Feature overview

### Student experience

| Area | What it does |
| --- | --- |
| Dashboard | Personalised focus bar, "continue where you left off" hero, content rails, announcement banner |
| Course / Semester home | Progress hero, subject grid with per-subject content chips and quick stats |
| Subject detail | Vertical "learning path" timeline of units with status medallions |
| Unit learning page | Sticky progress header, ~68ch reading measure, attachments, "mark as complete" footer |
| Quizzes | One-question-at-a-time paged runner, keyboard hotkeys, animated option feedback |
| Quiz results | Score hero, summary tiles, per-question review with explanations |
| Extras | Global search, bookmarks, profile, settings, onboarding, help |

### Admin CMS

| Module | Route | Purpose |
| --- | --- | --- |
| Dashboard | `/admin` | Focus bar, attention cards, 7-day trend strip |
| Content | `/admin/content` | Unified content workspace (list, create, edit, bulk actions, legacy import) |
| Courses | `/admin/courses` | Course → semester → subject → unit tree, unit reordering |
| Subjects | `/admin/subjects` | Expandable subject cards with inline content counts |
| Question bank | `/admin/quizzes` | Quizzes, questions, JSON/CSV/TXT bulk MCQ import |
| Papers | `/admin/papers` | Previous-year question papers |
| Announcements | `/admin/announcements` | Site-wide announcements shown on the student dashboard |
| Media / Tags / Inbox / Explorer / Homepage | `/admin/*` | Supporting content operations |
| Settings | `/admin/settings` | Grouped configuration |

### Super admin

`/admin/superadmin/*` — users (incl. suspend/reinstate), roles, audit log, feature
flags, branding, and SEO controls.

### Shell features

- Collapsible grouped sidebar
- Global command palette (`⌘K` / `Ctrl+K`)
- Global quick-add
- Keyboard shortcuts dialog
- Reusable admin primitives: `PageContainer`, `PageHeader`, `SectionCard`, `Toolbar`,
  `FormSection`, `StatCard`, `StatusBadge`, `EmptyState`, `TableSkeleton`, `ConfirmDialog`

---

## Tech stack

- **Framework**: TanStack Start v1 (React 19, SSR, file-based routing) on Vite 7
- **Runtime target**: Cloudflare Workers (edge)
- **Data / auth**: Supabase (Postgres, Auth, Storage, Realtime) with RLS everywhere
- **Server logic**: `createServerFn` RPC + server routes under `src/routes/api`
- **State / data fetching**: TanStack Query
- **Styling**: Tailwind CSS v4 via `src/styles.css` theme tokens, shadcn/ui + Radix
- **Forms**: react-hook-form + Zod
- **Toasts**: sonner

---

## Project structure

```text
src/
  routes/                 file-based routes (never edit routeTree.gen.ts)
    __root.tsx            root layout, head metadata, auth state subscriber
    _authenticated/       auth-gated subtree (ssr:false gate in route.tsx)
      admin/              admin CMS
        superadmin/       super-admin only
  components/
    admin/                admin shell, sidebar, command palette, ui primitives
    ui/                   shadcn primitives
  lib/
    *.functions.ts        createServerFn RPC (client-safe module path)
    *.server.ts           server-only helpers
  integrations/supabase/  generated client, admin client, auth middleware, types
  styles.css              Tailwind v4 theme + semantic design tokens
supabase/migrations/      SQL migrations (schema + grants + RLS + policies)
```

---

## Routing map

**Public**

`/` · `/courses` · `/courses/$courseSlug` · `/courses/$courseSlug/$semesterNumber` ·
`/courses/$courseSlug/$semesterNumber/$subjectSlug` ·
`/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber` ·
`/notes/$noteId` · `/papers/$paperId` · `/quizzes/$quizId` ·
`/developer` · `/privacy` · `/terms` · `/auth` · `/reset-password` · `/sitemap.xml`

**Authenticated** (`src/routes/_authenticated/`)

`/dashboard` · `/search` · `/bookmarks` · `/profile` · `/settings` · `/onboarding` · `/help`

**Admin** (`/admin/*`) and **Super admin** (`/admin/superadmin/*`) as listed above.

---

## Data model

Core tables (all in `public`, all with explicit `GRANT`s + RLS):

- `courses`, `semesters`, `subjects`, `units` — the content hierarchy
- `content_items` — unified content (`type`: note / pdf / ppt / video / link / assignment),
  with `status` (draft/published/archived), `visibility` (public/students/private),
  soft delete via `deleted_at`
- `papers` — previous-year question papers
- `quizzes`, `quiz_questions`, `quiz_attempts` — assessment
- `announcements` — dashboard banners
- `profiles` — user profile + suspension fields
- `user_roles` + `app_role` enum — roles live **only** here, never on `profiles`

Legacy `notes` rows are migrated into `content_items` via the
**Import legacy notes** action on `/admin/content`.

---

## Security model

- **Roles**: separate `user_roles` table, `app_role` enum, `has_role()` /
  `is_admin()` security-definer functions used inside RLS policies.
- **Grants**: every public table has explicit `GRANT`s for `authenticated` and
  `service_role`; `anon` only where a permissive public-read policy exists.
- **RLS**: published + public content is anon-readable; students read published
  content; admins read/write everything; owners read their own rows.
- **Route gating**: `src/routes/_authenticated/route.tsx` (`ssr: false`) redirects
  unauthenticated users to `/auth`. Protected server functions use
  `requireSupabaseAuth`; the bearer token is attached by `functionMiddleware` in
  `src/start.ts`.
- **Service role**: only ever imported inside a server-function handler via
  `await import("@/integrations/supabase/client.server")`.
- **MCP endpoint**: `/mcp` is protected with Supabase OAuth (JWKS verification).
- **Storage**: granular, metadata-gated policies per bucket (notes, papers, assignments).

---

## Design system

Defined entirely as semantic tokens in `src/styles.css` — never hardcode hex values
or `text-white` / `bg-black` in components.

- Primary: deep indigo `oklch(0.36 0.13 268)`
- Accent: warm saffron `oklch(0.78 0.16 60)`
- Background: warm off-white
- Headings/display: **Fraunces** (serif) · Body: **Inter**
- Deliberately scholarly + modern; no generic purple-gradient-on-white AI aesthetic.

---

## Local development

```bash
bun install
bun run dev        # http://localhost:8080
bun run build:dev  # development build (used for verification)
bun run build      # production build
bun run lint
```

Database changes go through SQL migrations in `supabase/migrations/`. Every
`CREATE TABLE` in `public` must be followed by `GRANT`s, then
`ENABLE ROW LEVEL SECURITY`, then policies.

---

## Environment variables

Browser (`import.meta.env`):

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_PROJECT_ID
```

Server (`process.env`, read **inside** handlers):

```
SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY
SUPABASE_PROJECT_ID
SUPABASE_SERVICE_ROLE_KEY   # privileged operations only
```

---

## Conventions and gotchas

1. **Admin list + detail routes must use `.index.tsx`.**
   A bare `foo.tsx` next to `foo.$id.tsx` silently becomes a parent layout that
   needs `<Outlet />`; forgetting it makes detail pages render nothing with no
   error. This bit us on `content.tsx`, `courses.tsx`, and `quizzes.tsx` — all are
   now `*.index.tsx`.
2. **Never edit `src/routeTree.gen.ts`** — it is generated from `src/routes/`.
3. **Loaders are isomorphic.** Secrets, admin clients, and DB writes belong in
   `createServerFn`, not directly in a loader.
4. **Public route loaders must not call `requireSupabaseAuth`** — SSR/prerender has
   no bearer token and will 401 the build.
5. **`*.functions.ts` files are thin**: imports, types, and server-function
   declarations only. Helpers go in `*.server.ts` or inside the handler.
6. **Soft deletes**: `content_items` deletion sets `deleted_at`; if an RLS policy
   rejects the update, the server function falls back to a hard delete.
7. **No Supabase Edge Functions** — app logic uses `createServerFn`; external
   callers use server routes under `src/routes/api/public/*`.
