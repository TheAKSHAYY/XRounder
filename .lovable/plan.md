# Profile Section Upgrade

Rebuild `/profile` into a production-quality student profile: compact header, editable personal + academic info, real learning statistics, achievements, completion meter, and account/security/notification controls — all on the existing auth and Supabase schema.

## What exists today

- `/profile` is a single page: identity card, avatar upload to the `avatars` bucket, and three fields (full name, display name, bio).
- `profiles` table has: `full_name, display_name, bio, avatar_url, locale, timezone, current_course_id, current_semester_id, onboarded_at`.
- Real activity data already exists: `quiz_attempts` (score, pct, passed, time_spent_seconds, submitted_at), `quiz_attempt_answers`, `bookmarks`, `progress_tracking`, `note_views`, `user_sessions`.
- No columns for phone, date of birth, gender, college/university, roll number, academic session, or notification preferences — these need to be added.
- Settings page currently only holds theme choices and a link back to profile.

## Database change (one migration)

Add nullable columns to `profiles` (no new tables, no duplicate user records):
`phone`, `date_of_birth`, `gender`, `college`, `university`, `roll_number`, `academic_session`, `current_year`, and `notification_prefs jsonb` (quiz reminders, new material, announcements, exam reminders, achievements — defaults on).

Existing RLS on `profiles` (own-row read/update) already covers these; the migration adds no new policies. Since Cloud is disconnected, the SQL is written to `.lovable/profile_fields_migration.sql` for you to run in the Supabase SQL editor — the page will handle missing columns gracefully until then.

## Layout

```text
Desktop (2 col)                       Mobile (stacked)
+---------------------------+-------+  +----------------+
| Profile header (compact)  | Compl.|  | Header         |
| Personal information      | Quick |  | Completion     |
| Academic information      | acts  |  | Quick actions  |
| Learning activity         | Acct  |  | Personal info  |
| Achievements              | Secur.|  | Academic       |
+---------------------------+-------+  | Stats (2 col)  |
                                       | Achievements   |
                                       | Account/Sec.   |
```

## Sections

1. **Header** — avatar with initials fallback and camera overlay button, name, email, `Student` badge, semester + college line, inline completion percentage, Edit Profile action. Compact, app-like, no oversized banner.
2. **Personal information** — full name, display name, phone, date of birth, gender, college, university, roll number. Email shown read-only (owned by auth). Inline validation (phone digits, DOB not future, max lengths), disabled inputs while saving, `Editing → Saving… → Saved ✓` states, unsaved-changes guard on navigation.
3. **Academic information** — chip/card grid: course and semester resolved from `current_course_id` / `current_semester_id`, current year, academic session, college, university, enrolled-subject count, overall progress ring from `progress_tracking`.
4. **Learning activity** — real aggregates only: quizzes attempted, quizzes completed (submitted), average score, highest score, questions solved (`quiz_attempt_answers`), bookmarks, study time (`time_spent_seconds`), study streak (consecutive days from attempt/view dates), overall progress. Skeletons while loading, empty state when the user has no activity yet.
5. **Achievements** — derived from the same aggregates: First Quiz, 10 Quizzes, 100 Questions, 7-Day Streak, Top Performer (90%+ attempt), Semester Completed. Locked badges rendered muted with the unlock requirement.
6. **Profile completion** — percentage over the tracked profile fields, progress bar, list of missing fields, CTA scrolling to the relevant section.
7. **Quick actions** — links to existing modules: Bookmarks, Dashboard results, Search, Settings, Help. No duplicate pages.
8. **Account & settings** — email preferences and notification toggles (switches persisting to `notification_prefs`), theme switcher reusing the existing theme provider, language/locale select, link to full Settings, Logout.
9. **Security** — Change password (Supabase password update), last login timestamp, active sessions from `user_sessions`, Delete Account. Destructive actions go through the existing `ConfirmDialog`.

## Technical notes

- All reads/writes use the browser Supabase client with the authenticated `user.id`; TanStack Query keys `profile-full`, `profile-stats`, `profile-sessions`, invalidated on save so the navbar avatar (`profile-mini`) stays in sync.
- Page split into focused components under `src/components/profile/` (header, personal form, academic card, stats grid, achievements, completion card, quick actions, account panel, security panel); the route file composes them.
- Reuses existing primitives: `Breadcrumbs`, `StatChip`, `ProgressBar`, `ProgressRing`, `Skeleton`, `Switch`, `Select`, `ConfirmDialog`, sonner toasts. Semantic tokens only — no hardcoded colors, no new gradients or glass effects.
- Avatar keeps the current `avatars` bucket flow, plus local preview before save, remove action, image type/size validation, and loading state. No storage credentials in client code.
- Mobile-first: 2-column stat grid, full-width cards, `tap-target` buttons, `min-w-0`/`truncate` on text rows to prevent horizontal scroll.
- Verified after build: profile load, edit + persist, avatar upload/remove, toggles, logout, 320px–1440px layout, empty and error states.
