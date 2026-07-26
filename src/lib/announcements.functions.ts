import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type Announcement = {
  id: string;
  title: string;
  body: string;
  severity: "info" | "success" | "warning" | "critical";
  audience: "all" | "students" | "admins";
  course_id: string | null;
  published: boolean;
  starts_at: string;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
};

async function assertAdmin(supabase: any, userId: string) {
  const [{ data: isAdmin }, { data: isSuper }] = await Promise.all([
    supabase.rpc("has_role", { _user_id: userId, _role: "admin" }),
    supabase.rpc("has_role", { _user_id: userId, _role: "super_admin" }),
  ]);
  if (!isAdmin && !isSuper) throw new Error("Forbidden: admin required");
}

export const listAnnouncementsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return (data ?? []) as Announcement[];
  });

export const upsertAnnouncement = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (d: {
      id?: string;
      title: string;
      body: string;
      severity: Announcement["severity"];
      audience: Announcement["audience"];
      course_id?: string | null;
      published: boolean;
      starts_at?: string;
      ends_at?: string | null;
    }) => d,
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const payload = {
      title: data.title.trim(),
      body: data.body.trim(),
      severity: data.severity,
      audience: data.audience,
      course_id: data.course_id ?? null,
      published: data.published,
      starts_at: data.starts_at ?? new Date().toISOString(),
      ends_at: data.ends_at ?? null,
    };
    if (!payload.title || !payload.body) throw new Error("Title and body are required");

    if (data.id) {
      const { error } = await context.supabase
        .from("announcements")
        .update(payload)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await context.supabase
      .from("announcements")
      .insert({ ...payload, created_by: context.userId })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id as string };
  });

export const deleteAnnouncement = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("announcements").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
