-- Profile upgrade: extra student profile fields + notification preferences.
-- Safe to re-run. No new tables, no policy changes (existing own-row RLS covers these).

alter table public.profiles
  add column if not exists phone text,
  add column if not exists date_of_birth date,
  add column if not exists gender text,
  add column if not exists college text,
  add column if not exists university text,
  add column if not exists roll_number text,
  add column if not exists academic_session text,
  add column if not exists current_year integer,
  add column if not exists notification_prefs jsonb not null default jsonb_build_object(
    'quiz_reminders', true,
    'new_material', true,
    'announcements', true,
    'exam_reminders', true,
    'achievements', true,
    'email_updates', true
  );

alter table public.profiles
  add constraint profiles_current_year_range
  check (current_year is null or (current_year >= 1 and current_year <= 6))
  not valid;
