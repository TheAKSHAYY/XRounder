## Scope

Visual/UX only. No data models, Supabase queries, RLS, auth, or routing changes. Brand identity (Fraunces + Inter, indigo/saffron) stays; it just gets applied consistently.

This is roughly 4 phases of work across ~30 files. I'd ship it in the order below so each phase is reviewable in the preview.

---

### Phase 1 — Foundations (tokens + global fixes)

**`src/styles.css`**
- Add a type scale as utilities: `.text-h1` … `.text-h4` (Fraunces, responsive clamp) plus `.text-body`/`.text-caption`. Replace ad-hoc `text-3xl sm:text-[2.25rem]` one-offs later, per page.
- Codify radius-per-surface rules on top of the existing `--radius` scale: cards/tiles = `rounded-lg`, inputs/inner surfaces = `rounded-md`, modals/sheets = `rounded-xl`, pills/buttons/avatars = `rounded-full`. Document it in a comment block so future work follows it.
- Finish the four broken alternate themes (Midnight, Ocean, Emerald, Purple): every theme block gets the full token set the root defines — background/foreground, card, popover, muted, accent, border, input, ring, destructive, sidebar tokens — so no near-white borders on dark surfaces.
- Rewrite `.high-contrast` using tokens instead of hardcoded hex.
- Add `overflow-x-hidden` + `max-w-full` safety rules on `html, body`, `img`, `svg`, `video`, and a `.no-overflow` guard for hero sections.

**`src/routes/__root.tsx`**
- Skip-to-content link (visible on focus) targeting the single `<main>`.
- Global focus-visible ring style via tokens.
- Root wrapper gets `overflow-x-hidden` and mobile bottom-nav safe padding (`pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0`).

**Mobile overflow audit**: sweep hero sections, card grids, and marquee/animated blocks for negative margins and fixed widths; convert multi-item header rows to the `grid-cols-[minmax(0,1fr)_auto]` + `min-w-0` + `shrink-0` pattern.

---

### Phase 2 — Shared components

New files under `src/components/ui/` and `src/components/student/`:

| Component | Replaces |
|---|---|
| `<ProgressBar>` | 3 bespoke bars (dashboard, semester, quiz) |
| `<ProgressRing>` | quiz result ring + new student usage |
| `<StatChip>` | admin `StatCard` variants + student `MiniChip`/quick-stats |
| `<StudentHero>` | 4 hand-rolled hero blocks |
| `<ContentCard>` | subject/unit/note/paper cards |
| `<Breadcrumbs>` | new; course > semester > subject > unit |
| `<MobileTabBar>` | new; Home, Courses, Quiz, Search, Profile — fixed, `md:hidden`, 44px+ targets, active state from router |
| `<EmptyState>` (extend existing admin one, move to shared) | flat empty states without CTAs |

`StatCard` in admin becomes a thin wrapper over `StatChip` so admin pages don't all need edits.

---

### Phase 3 — Page refactors

- `dashboard.tsx`, `courses.$courseSlug.$semesterNumber.index.tsx`, `…$subjectSlug.index.tsx`, `…$unitNumber.tsx`: consume `StudentHero` / `ContentCard` / `ProgressBar` / `StatChip`; drop duplicated markup; apply the type scale and radius rules. Breadcrumbs on subject + unit pages.
- `quizzes.$quizId.tsx`: swap its bar/ring for the shared ones, keep all quiz logic and animations untouched.
- Hardcoded color cleanup: `google-signin-button.tsx`, `admin/homepage.tsx`, `admin/tags.tsx`.

---

### Phase 4 — Thin screens, a11y, empty states

- `/help`: real structure — search field (client-side filter over static content), grouped FAQ accordion, "getting started" cards, contact-support CTA.
- `/profile`: profile header (avatar, name, course/semester), stat chips, achievements placeholder section, then the existing settings form in a `SectionCard`.
- `/bookmarks`: filter toolbar (type: notes/papers/quizzes) + grouping by subject, card grid, CTA empty state.
- A11y sweep: aria-labels on all icon-only buttons, 44px minimum touch targets, visible focus states, single `<main>`, heading-level order.
- Every empty state gets a primary CTA (Browse courses / Take a quiz / Clear filters).

---

### Technical notes

- Type scale ships as `@utility` blocks in `src/styles.css` (Tailwind v4 — no `tailwind.config.js`).
- Theme tokens use `oklch`; alternate themes are plain class blocks already wired through `theme-provider.tsx`, so no provider changes needed beyond keeping all five selectable.
- Bottom tab bar reads the active route via `useRouterState` for highlighting — read-only, no routing changes.
- Verification each phase: typecheck + build, plus Playwright screenshots at 390px and 1280px to confirm zero horizontal overflow.
