import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertSuperAdmin } from "@/lib/role-guards.server";
import { loose } from "@/lib/supabase-loose";
import { logAudit, tryAdminClient } from "@/lib/admin-client.server";

export type AppRole = "super_admin" | "admin" | "instructor" | "student";

export type AdminUserRow = {
  user_id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  roles: AppRole[];
  suspended: boolean;
  suspended_reason: string | null;
};

export const listUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { search?: string; limit?: number } | undefined) => data ?? {})
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context.supabase, context.userId);

    const limit = Math.min(data?.limit ?? 200, 1000);
    const sb = loose(context.supabase);

    // Base list comes from profiles + user_roles, which super admins can read
    // through RLS. This keeps the page working without a service-role key.
    const [profilesRes, rolesRes] = await Promise.all([
      sb
        .from("profiles")
        .select("user_id,full_name,avatar_url,created_at,suspended,suspended_reason")
        .order("created_at", { ascending: false })
        .limit(limit),
      sb.from("user_roles").select("user_id,role"),
    ]);
    if (profilesRes.error) throw new Error(profilesRes.error.message);
    if (rolesRes.error) throw new Error(rolesRes.error.message);

    const roleMap = new Map<string, AppRole[]>();
    for (const r of (rolesRes.data ?? []) as Array<{ user_id: string; role: AppRole }>) {
      const arr = roleMap.get(r.user_id) ?? [];
      arr.push(r.role);
      roleMap.set(r.user_id, arr);
    }

    type ProfileRow = {
      user_id: string;
      full_name: string | null;
      avatar_url: string | null;
      created_at: string | null;
      suspended?: boolean | null;
      suspended_reason?: string | null;
    };

    let rows: AdminUserRow[] = ((profilesRes.data ?? []) as ProfileRow[]).map((p) => ({
      user_id: p.user_id,
      email: null,
      full_name: p.full_name ?? null,
      avatar_url: p.avatar_url ?? null,
      created_at: p.created_at ?? "",
      last_sign_in_at: null,
      roles: roleMap.get(p.user_id) ?? [],
      suspended: !!p.suspended,
      suspended_reason: p.suspended_reason ?? null,
    }));

    // Enrich with auth data (email, last sign-in) when a service key exists.
    const admin = await tryAdminClient();
    if (admin) {
      try {
        const { data: authList } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
        const authMap = new Map(authList?.users.map((u) => [u.id, u]) ?? []);
        rows = rows.map((r) => {
          const u = authMap.get(r.user_id);
          return u
            ? {
                ...r,
                email: u.email ?? null,
                created_at: r.created_at || u.created_at,
                last_sign_in_at: u.last_sign_in_at ?? null,
              }
            : r;
        });
        // Include auth users that have no profile row yet.
        for (const u of authList?.users ?? []) {
          if (!rows.some((r) => r.user_id === u.id)) {
            rows.push({
              user_id: u.id,
              email: u.email ?? null,
              full_name: null,
              avatar_url: null,
              created_at: u.created_at,
              last_sign_in_at: u.last_sign_in_at ?? null,
              roles: roleMap.get(u.id) ?? [],
              suspended: false,
              suspended_reason: null,
            });
          }
        }
      } catch {
        // Fall back to profile-only data.
      }
    }

    const search = (data?.search ?? "").toLowerCase().trim();
    if (search) {
      rows = rows.filter(
        (r) =>
          (r.email ?? "").toLowerCase().includes(search) ||
          (r.full_name ?? "").toLowerCase().includes(search),
      );
    }
    rows.sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""));
    return rows;
  });

export const grantRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { userId: string; role: AppRole }) => data)
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context.supabase, context.userId);
    const sb = loose(context.supabase);
    const { data: existing } = await sb
      .from("user_roles")
      .select("id")
      .eq("user_id", data.userId)
      .eq("role", data.role)
      .maybeSingle();
    if (!existing) {
      const { error } = await sb
        .from("user_roles")
        .insert({ user_id: data.userId, role: data.role, granted_by: context.userId });
      if (error) throw new Error(error.message);
    }
    await logAudit(context.supabase, {
      actor_id: context.userId,
      action: "role.grant",
      entity_type: "user_role",
      entity_id: data.userId,
      metadata: { role: data.role },
    });
    return { ok: true };
  });

export const revokeRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { userId: string; role: AppRole }) => data)
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context.supabase, context.userId);
    if (data.userId === context.userId && data.role === "super_admin") {
      throw new Error("You cannot revoke your own super_admin role.");
    }
    const { error } = await loose(context.supabase)
      .from("user_roles")
      .delete()
      .eq("user_id", data.userId)
      .eq("role", data.role);
    if (error) throw new Error(error.message);
    await logAudit(context.supabase, {
      actor_id: context.userId,
      action: "role.revoke",
      entity_type: "user_role",
      entity_id: data.userId,
      metadata: { role: data.role },
    });
    return { ok: true };
  });

export type AuditLogRow = {
  id: string;
  actor_id: string | null;
  actor_email: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: string | null;
  ip: string | null;
  created_at: string;
};

export const listAuditLogs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { limit?: number; action?: string } | undefined) => data ?? {})
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context.supabase, context.userId);
    const limit = Math.min(data?.limit ?? 200, 1000);
    let q = loose(context.supabase)
      .from("audit_logs")
      .select("id,actor_id,action,entity_type,entity_id,metadata,ip,created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (data?.action) q = q.ilike("action", `%${data.action}%`);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);

    type Row = Omit<AuditLogRow, "metadata" | "actor_email"> & { metadata: unknown };
    const list = (rows ?? []) as Row[];

    const actorIds = Array.from(new Set(list.map((r) => r.actor_id).filter(Boolean))) as string[];
    const nameMap = new Map<string, string>();
    if (actorIds.length) {
      const admin = await tryAdminClient();
      if (admin) {
        try {
          const { data: authList } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
          for (const u of authList?.users ?? []) {
            if (u.email && actorIds.includes(u.id)) nameMap.set(u.id, u.email);
          }
        } catch {
          /* fall through to profile names */
        }
      }
      if (nameMap.size === 0) {
        const { data: profs } = await loose(context.supabase)
          .from("profiles")
          .select("user_id,full_name")
          .in("user_id", actorIds);
        for (const p of (profs ?? []) as Array<{ user_id: string; full_name: string | null }>) {
          if (p.full_name) nameMap.set(p.user_id, p.full_name);
        }
      }
    }

    return list.map((r) => ({
      ...r,
      metadata: r.metadata ? JSON.stringify(r.metadata) : null,
      actor_email: r.actor_id ? (nameMap.get(r.actor_id) ?? null) : null,
    })) as AuditLogRow[];
  });

export type FeatureFlagRow = {
  key: string;
  module: string | null;
  description: string | null;
  enabled: boolean;
  rollout_pct: number | null;
  kill_switch: boolean;
  updated_at: string;
};

export const listFeatureFlags = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertSuperAdmin(context.supabase, context.userId);
    const { data, error } = await loose(context.supabase)
      .from("feature_flags")
      .select("key,module,description,enabled,rollout_pct,kill_switch,updated_at")
      .order("module")
      .order("key");
    if (error) throw new Error(error.message);
    return (data ?? []) as FeatureFlagRow[];
  });

export const updateFeatureFlag = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: { key: string; enabled?: boolean; kill_switch?: boolean; rollout_pct?: number }) => data,
  )
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context.supabase, context.userId);
    const patch: {
      updated_by: string;
      updated_at: string;
      enabled?: boolean;
      kill_switch?: boolean;
      rollout_pct?: number;
    } = { updated_by: context.userId, updated_at: new Date().toISOString() };
    if (typeof data.enabled === "boolean") patch.enabled = data.enabled;
    if (typeof data.kill_switch === "boolean") patch.kill_switch = data.kill_switch;
    if (typeof data.rollout_pct === "number") patch.rollout_pct = data.rollout_pct;
    const { error } = await loose(context.supabase)
      .from("feature_flags")
      .update(patch)
      .eq("key", data.key);
    if (error) throw new Error(error.message);
    await logAudit(context.supabase, {
      actor_id: context.userId,
      action: "flag.update",
      entity_type: "feature_flag",
      entity_id: data.key,
      metadata: patch,
    });
    return { ok: true };
  });

export type PlatformStats = {
  total_users: number;
  admins: number;
  super_admins: number;
  active_sessions: number;
  audit_events_24h: number;
};

export const getPlatformStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertSuperAdmin(context.supabase, context.userId);
    const sb = loose(context.supabase);
    const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const [users, admins, supers, sessions, audits] = await Promise.all([
      sb.from("profiles").select("user_id", { count: "exact", head: true }),
      sb.from("user_roles").select("user_id", { count: "exact", head: true }).eq("role", "admin"),
      sb
        .from("user_roles")
        .select("user_id", { count: "exact", head: true })
        .eq("role", "super_admin"),
      sb.from("user_sessions").select("id", { count: "exact", head: true }).is("revoked_at", null),
      sb.from("audit_logs").select("id", { count: "exact", head: true }).gte("created_at", since),
    ]);
    return {
      total_users: users.count ?? 0,
      admins: admins.count ?? 0,
      super_admins: supers.count ?? 0,
      active_sessions: sessions.count ?? 0,
      audit_events_24h: audits.count ?? 0,
    } as PlatformStats;
  });
