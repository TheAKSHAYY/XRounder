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
