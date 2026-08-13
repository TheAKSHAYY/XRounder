import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertAdmin } from "@/lib/role-guards.server";

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

export const listAnnouncementsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const sb = context.supabase as any;
    const { data, error } = await sb
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
    const sb = context.supabase as any;
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
      const { error } = await sb.from("announcements").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await sb
      .from("announcements")
      .insert({ ...payload, created_by: context.userId })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: (row as { id: string }).id };
  });

export const deleteAnnouncement = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const sb = context.supabase as any;
    const { error } = await sb.from("announcements").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// -------- Active announcements for students / everyone --------
export const listActiveAnnouncements = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const sb = context.supabase as any;
    const nowIso = new Date().toISOString();
    const { data, error } = await sb
      .from("announcements")
      .select("id,title,body,severity,audience,course_id,starts_at,ends_at,created_at")
      .eq("published", true)
      .lte("starts_at", nowIso)
      .or(`ends_at.is.null,ends_at.gt.${nowIso}`)
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) throw new Error(error.message);
    return (data ?? []) as Announcement[];
  });

// -------- User suspension (super admin) --------
export const setUserSuspended = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string; suspended: boolean; reason?: string }) => d)
  .handler(async ({ data, context }) => {
    const { data: isSuper } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "super_admin",
    });
    if (!isSuper) throw new Error("Forbidden: super_admin required");
    if (data.userId === context.userId) throw new Error("You cannot suspend yourself.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const sb = supabaseAdmin as any;

    // Ban / unban the auth user so they cannot get new sessions.
    const { error: banErr } = await supabaseAdmin.auth.admin.updateUserById(data.userId, {
      ban_duration: data.suspended ? "876000h" : "none", // ~100 years, or clear
    });
    if (banErr) throw new Error(banErr.message);

    // Reflect state on profile for UI badges.
    const { error: profErr } = await sb
      .from("profiles")
      .update({
        suspended: data.suspended,
        suspended_reason: data.suspended ? (data.reason ?? null) : null,
        suspended_at: data.suspended ? new Date().toISOString() : null,
      })
      .eq("user_id", data.userId);
    if (profErr) throw new Error(profErr.message);

    await sb.from("audit_logs").insert({
      actor_id: context.userId,
      action: data.suspended ? "user.suspend" : "user.unsuspend",
      entity_type: "user",
      entity_id: data.userId,
      metadata: { reason: data.reason ?? null },
    });

    // Revoke live sessions on suspend.
    if (data.suspended) {
      await sb
        .from("user_sessions")
        .update({ revoked_at: new Date().toISOString() })
        .eq("user_id", data.userId)
        .is("revoked_at", null);
    }
    return { ok: true };
  });

// -------- Reorder units --------
export const reorderUnits = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { subjectId: string; unitIds: string[] }) => d)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const sb = context.supabase as any;
    const { error } = await sb.rpc("admin_reorder_units", {
      _subject_id: data.subjectId,
      _unit_ids: data.unitIds,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
