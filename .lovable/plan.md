
This is a very large scope (9 areas). To keep quality high and reviewable, I'll split it into 5 sequential phases. Each phase is self-contained and you approve before I move to the next.

## Phase 1 — Auth cleanup + content counts foundation (small, unblocks the rest)
- Remove Phone/OTP login from `src/routes/auth.tsx` and delete `src/components/auth/phone-auth-form.tsx`. Keep email/password + Google.
- Add a single `getSubjectStats(subjectId)` / `getUnitStats(unitId)` server function in `src/lib/content.functions.ts` returning `{ units, notes, pdfs, videos, mcqs, lastUpdated }`. Reused by both admin and student.
- Add `content_items` count aggregation used by both panels (avoids N+1).

## Phase 2 — Admin Subject & Content Management redesign
- New `/admin/courses/$courseId` subject panel: expandable Unit cards (accordion) instead of long list. Each card shows counts (Notes / PDFs / Videos / MCQs) + inline actions.
- CRUD confirmed via `ConfirmDialog` for every destructive op; toasts (sonner) on success/error.
- Search + status filter toolbar; pagination when >25 items.
- Drag-and-drop unit reorder using `@dnd-kit` (already installed) — fallback ↑/↓ stays.
- Loading skeletons via existing `TableSkeleton` / new `CardSkeleton`.
- Audit every button in `admin/content.tsx`, `courses.$courseId.tsx`, `quizzes.tsx`, `papers.tsx` — wire up any dead handlers.

## Phase 3 — Student Subject/Unit pages + mobile
- Subject cards on `/courses/$courseSlug/$semesterNumber` show: name, semester, #Units, #Notes, #MCQs, progress %, last updated.
- Unit rows on subject detail show: #Notes, #PDFs, #Videos, #MCQs, est. reading time (word count / 200 wpm from notes).
- Responsive audit sweep using the `grid-cols-[minmax(0,1fr)_auto]` pattern (per project rules). No horizontal scroll; wrap long titles; scrollable tables become card lists at `sm:`.

## Phase 4 — Quiz redesign (live feedback)
- Rework `src/routes/quizzes.$quizId.tsx`:
  - Header shows Q x/N, progress bar, live Correct/Wrong/Score counters.
  - On answer select: green/red border + tick/cross icon + `animate-scale-in`; on wrong, highlight correct answer.
  - Advance on next click (no auto-skip) so user sees feedback.
- Results page enhancements: time taken, performance message tiers, Retry + Review buttons already exist — polish.

## Phase 5 — Polish + verification
- Skeletons + empty states across remaining admin pages.
- Console-error sweep via preview.
- Playwright smoke pass: admin CRUD, student subject/unit, quiz flow, mobile viewport 375px.

## Technical notes
- Reordering uses existing `admin_reorder_units` RPC.
- Counts computed server-side and cached with react-query `staleTime: 30s`.
- No schema changes required beyond what's already migrated.
- Material Design 3 "feel" achieved via existing tokens + `SectionCard`/`PageContainer` primitives — not a new component library.

## Out of scope (call out now)
- Full "rank" leaderboard for quizzes needs a new table + backfill — I'll show placeholder unless you want the leaderboard built (say the word and I add it as Phase 4b).
- Real-time collaborative editing.
- Video transcoding / streaming optimization.

---

Reply with **"start phase 1"** (or specify a different starting phase). I'll implement one phase per turn so you can review as we go.
