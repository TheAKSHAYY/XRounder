-- P0: apply features that previously existed only as unapplied .lovable/*.sql files.

-- ===== announcements_migration =====
-- =====================================================================
-- Admin Panel: Announcements + User Suspension + Unit Reorder
-- Run this in Supabase Dashboard → SQL Editor
-- =====================================================================

-- 1. Announcements
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  severity text not null default 'info' check (severity in ('info','success','warning','critical')),
  audience text not null default 'all' check (audience in ('all','students','admins')),
  course_id uuid references public.courses(id) on delete cascade,
  published boolean not null default true,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists announcements_active_idx
  on public.announcements (published, starts_at desc)
  where published = true;

grant select on public.announcements to anon, authenticated;
grant insert, update, delete on public.announcements to authenticated;
grant all on public.announcements to service_role;

alter table public.announcements enable row level security;

drop policy if exists "public read active announcements" on public.announcements;
create policy "public read active announcements"
  on public.announcements for select
  using (
    published = true
    and starts_at <= now()
    and (ends_at is null or ends_at > now())
  );

drop policy if exists "admin read all announcements" on public.announcements;
create policy "admin read all announcements"
  on public.announcements for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'super_admin'));

drop policy if exists "admin write announcements" on public.announcements;
create policy "admin write announcements"
  on public.announcements for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'super_admin'))
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'super_admin'));

drop trigger if exists set_announcements_updated_at on public.announcements;
create trigger set_announcements_updated_at
  before update on public.announcements
  for each row execute function public.set_updated_at();

do $$ begin
  begin
    alter publication supabase_realtime add table public.announcements;
  exception when duplicate_object then null;
  end;
end $$;

-- 2. Profile suspension flag
alter table public.profiles
  add column if not exists suspended boolean not null default false,
  add column if not exists suspended_reason text,
  add column if not exists suspended_at timestamptz;

-- 3. Unit reorder RPC
create or replace function public.admin_reorder_units(
  _subject_id uuid,
  _unit_ids uuid[]
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  is_admin boolean;
  i int;
begin
  select public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'super_admin')
    into is_admin;
  if not coalesce(is_admin, false) then
    raise exception 'Forbidden: admin role required';
  end if;

  for i in 1 .. array_length(_unit_ids, 1) loop
    update public.units
      set sort_order = i,
          number = i,
          updated_at = now()
      where id = _unit_ids[i] and subject_id = _subject_id;
  end loop;
end;
$$;

grant execute on function public.admin_reorder_units(uuid, uuid[]) to authenticated;

-- ===== avatars_storage_migration =====
-- Profile photo uploads: public "avatars" bucket, each user owns a folder named after their uid.
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update set public = true;

drop policy if exists "avatars_public_read" on storage.objects;
create policy "avatars_public_read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'avatars');

drop policy if exists "avatars_owner_insert" on storage.objects;
create policy "avatars_owner_insert"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "avatars_owner_update" on storage.objects;
create policy "avatars_owner_update"
on storage.objects for update to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "avatars_owner_delete" on storage.objects;
create policy "avatars_owner_delete"
on storage.objects for delete to authenticated
using (
  bucket_id = 'avatars'
  and (
    (storage.foldername(name))[1] = auth.uid()::text
    or public.is_admin(auth.uid())
  )
);

-- ===== grade_quiz_answer_migration =====
-- Run this once in the Supabase SQL editor.
-- Instant per-question grading for the redesigned quiz experience.
-- Returns correctness + correct option ids + explanation for a single question,
-- without ever exposing quiz_options.is_correct to the client ahead of time.

CREATE OR REPLACE FUNCTION public.grade_quiz_answer(
  _attempt_id UUID,
  _question_id UUID,
  _selected UUID[]
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_attempt public.quiz_attempts;
  v_question public.quiz_questions;
  v_correct UUID[];
  v_norm UUID[];
  v_is_correct BOOLEAN;
BEGIN
  SELECT * INTO v_attempt FROM public.quiz_attempts WHERE id = _attempt_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Attempt not found'; END IF;
  IF v_attempt.user_id <> auth.uid() THEN RAISE EXCEPTION 'Not your attempt'; END IF;
  IF v_attempt.submitted_at IS NOT NULL THEN RAISE EXCEPTION 'Already submitted'; END IF;

  SELECT * INTO v_question FROM public.quiz_questions WHERE id = _question_id;
  IF NOT FOUND OR v_question.quiz_id <> v_attempt.quiz_id THEN
    RAISE EXCEPTION 'Question does not belong to this attempt';
  END IF;

  SELECT COALESCE(ARRAY_AGG(id ORDER BY id), '{}') INTO v_correct
    FROM public.quiz_options WHERE question_id = _question_id AND is_correct = true;

  SELECT COALESCE(ARRAY_AGG(x ORDER BY x), '{}') INTO v_norm
    FROM unnest(COALESCE(_selected, '{}'::uuid[])) x;

  v_is_correct := v_norm = v_correct AND array_length(v_correct, 1) IS NOT NULL;

  INSERT INTO public.quiz_attempt_answers(attempt_id, question_id, selected_option_ids, is_correct, points_awarded)
  VALUES (_attempt_id, _question_id, COALESCE(_selected, '{}'::uuid[]), v_is_correct,
          CASE WHEN v_is_correct THEN v_question.points ELSE 0 END)
  ON CONFLICT (attempt_id, question_id) DO UPDATE
    SET selected_option_ids = EXCLUDED.selected_option_ids,
        is_correct = EXCLUDED.is_correct,
        points_awarded = EXCLUDED.points_awarded;

  RETURN jsonb_build_object(
    'is_correct', v_is_correct,
    'correct_option_ids', to_jsonb(v_correct),
    'explanation', v_question.explanation
  );
END;
$$;

REVOKE ALL ON FUNCTION public.grade_quiz_answer(UUID, UUID, UUID[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.grade_quiz_answer(UUID, UUID, UUID[]) TO authenticated;

-- ===== profile_fields_migration =====
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
