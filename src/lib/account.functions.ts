import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Permanently deletes the calling user's own auth account. */
export const deleteMyAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    // Check if the user is a super_admin; prevent self-deletion if last active super admin
    const { data: isSuper } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "super_admin",
    });

    if (isSuper) {
      const { loose } = await import("@/lib/supabase-loose");
      const sb = loose(context.supabase);
      const { data: superRoles } = await sb
        .from("user_roles")
        .select("user_id")
        .eq("role", "super_admin");

      const otherSuperIds = (superRoles ?? [])
        .map((r: { user_id: string }) => r.user_id)
        .filter((id: string) => id !== context.userId);

      if (otherSuperIds.length === 0) {
        throw new Error(
          "Cannot delete account: You are the last Super Admin on this platform. Assign another Super Admin first.",
        );
      }

      const { data: activeProfiles } = await sb
        .from("profiles")
        .select("user_id,suspended")
        .in("user_id", otherSuperIds);

      const activeCount = (activeProfiles ?? []).filter(
        (p: { suspended?: boolean | null }) => !p.suspended,
      ).length;

      if (activeCount === 0) {
        throw new Error(
          "Cannot delete account: All other Super Admins are suspended or inactive.",
        );
      }
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
