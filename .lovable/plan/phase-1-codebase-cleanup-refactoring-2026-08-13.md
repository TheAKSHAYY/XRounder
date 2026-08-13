# Phase 1 — Codebase Cleanup & Refactoring

No UI, design, route, or behavior changes. Only structure, typing, and dead-code removal. Every step ends with a typecheck plus a preview smoke check of the touched screens.

## Scope check (from a first pass over the code)

- 34k lines of TS/TSX. Largest files: `admin/developer.tsx` (1139), `quizzes.$quizId.tsx` (995), `admin/homepage.tsx` (957), `admin/courses.$courseId.tsx` (895), `routes/index.tsx` (859), unit page (773), `routes/developer.tsx` (736).
- ~24 shadcn `ui/*` files have no import from outside `src/components/ui` (e.g. `chart`, `carousel`, `menubar`, `resizable`, `input-otp`). Some are internal deps of `sidebar.tsx` or are wired through other paths, so each candidate gets verified before deletion.
- `src/assets/` holds only `dev-avatar.jpg.asset.json` while the real image sits in `public/` — leftover to reconcile.
- `any` appears in ~11 app files (heaviest: `announcements.functions.ts`, `explorer.functions.ts`, `create-wizard.tsx`), plus `Router<any>` in `src/router.tsx`.
- `tsconfig.json` has `noUnusedLocals`/`noUnusedParameters` off and ESLint disables `@typescript-eslint/no-unused-vars`, so unused code is invisible today.

## Work order

### Step 1 — Make dead code detectable
- Add `knip` (dev-only) to list unused files, exports, and dependencies; treat its report as candidates, not truth.
- Turn `@typescript-eslint/no-unused-vars` back on as a warning with the `_`-prefix escape hatch. Leave `noUnusedLocals` off until the cleanup lands, then enable it.

### Step 2 — Remove dead code
- Delete unused `ui/*` primitives only after confirming no relative/internal import references them; keep anything `sidebar.tsx` or `sonner` needs.
- Remove unused hooks, helpers, exports, imports, variables, and any Lovable-generated placeholder blocks.
- Reconcile `src/assets/dev-avatar.jpg.asset.json` with `public/dev-avatar.jpg` so the image has one source of truth.
- Drop npm dependencies that nothing imports after the above.

### Step 3 — Consolidate duplication (behavior-identical extractions)
- Shared student data hooks: progress, learning stats, and quiz-attempt queries are currently re-declared across dashboard, progress, subject, and unit pages — move to `src/features/**/hooks`.
- Shared admin table/toolbar/mutation patterns repeated across the ~18 admin routes — lift into existing `components/admin/ui` primitives.
- Shared formatting/date/slug/percentage helpers scattered inline — move to `src/lib/format.ts` and reuse `localDayKey` everywhere instead of ad-hoc `toISOString()`.

### Step 4 — Split oversized files
Each split keeps the exact same rendered output; the route file becomes composition only.
- `quizzes.$quizId.tsx` → quiz-runner, question card, results view, attempt state hook.
- `admin/developer.tsx`, `admin/homepage.tsx`, `admin/courses.$courseId.tsx` → per-section components under `components/admin/**`.
- `routes/index.tsx`, `routes/developer.tsx` → landing sections under `components/marketing/**`.
- unit + subject route files → view components plus data hooks.

### Step 5 — Folder structure (moderate, not a rewrite)
Keep `src/routes` as-is (routes are file-based and must not move). Introduce:

```text
src/
  features/<domain>/{components,hooks,api,types}.ts   # student, quiz, admin, profile
  components/{ui,layout,shared}                       # primitives only
  hooks/                                              # cross-feature only
  lib/                                                # framework-agnostic utils
  services/                                           # supabase clients + *.functions.ts wrappers
  types/                                              # shared domain types
  constants/                                          # routes, labels, enums
```
Moves are done with `mv` plus import rewrites, in small batches so each batch typechecks green. `*.functions.ts` stay client-safe (never under `src/server/`).

### Step 6 — TypeScript hardening
- Replace `any` with generated Supabase row types (`Tables<"...">`) or explicit interfaces; keep `Router<any>` only if TanStack's types require it, otherwise narrow.
- Remove unsafe assertions, type server-function inputs with the existing `zod`/validator pattern, and type component props explicitly.
- Then enable `noUnusedLocals` and `noUnusedParameters`.

### Step 7 — Consistency & safe perf
- One import order (external → `@/` → relative), consistent file naming (kebab-case files, PascalCase components, `use-*` hooks), one error-handling shape for mutations (toast + logged error).
- Only obviously safe perf work: drop redundant `useEffect`/state that mirrors query data, remove needless wrapper divs where markup is unchanged, memoize only measured hot lists. No speculative `memo`/`useCallback`.
- Run Prettier and ESLint across the repo last.

### Step 8 — Report
Deliver: files changed and why, removed dead code, consolidated duplication, remaining tech debt, bugs found during the pass, and architecture concerns for Phase 2.

## Guardrails
- No new libraries except `knip` (dev-only tooling); it can be removed after the pass if you prefer.
- No design tokens, class names, copy, routes, RLS, or business rules touched.
- Untouched by this phase: the pending Supabase migration file, the leaderboard/exam-prep gaps from the audit.
