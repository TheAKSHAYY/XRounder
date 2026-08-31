import { supabase } from "@/integrations/supabase/client";
import { syncGuestPrefsToProfile } from "@/lib/learning-prefs";

/**
 * Resolve where a user should land after authenticating.
 * - Admins / Super Admins → /admin
 * - First-time users (no profile or no onboarded_at / course / semester) → /onboarding
 * - Everyone else → /dashboard
 *
 * Role is always read from the database (user_roles table) via `has_role`.
 * Never trust frontend role claims.
 */
export async function resolvePostAuthRoute(userId: string): Promise<string> {
  const [{ data: isSuper }, { data: isAdmin }] = await Promise.all([
    supabase.rpc("has_role", { _user_id: userId, _role: "super_admin" }),
    supabase.rpc("has_role", { _user_id: userId, _role: "admin" }),
  ]);
  if (isSuper || isAdmin) return "/admin";

  // Safely sync any guest preferences set prior to signing in
  await syncGuestPrefsToProfile(userId);

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarded_at, current_course_id, current_semester_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (
    !profile ||
    (!profile.onboarded_at && (!profile.current_course_id || !profile.current_semester_id))
  ) {
    return "/onboarding";
  }
  return "/dashboard";
}
