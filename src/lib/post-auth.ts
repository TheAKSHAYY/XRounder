import { supabase } from "@/integrations/supabase/client";
import { syncGuestPrefsToProfile } from "@/lib/learning-prefs";

const CACHE_KEY = "xr.post_auth_route";

type CachedRoute = { userId: string; dest: string; at: number };

/**
 * Instantly readable last-known destination for a user, so returning visitors
 * land on their home page without waiting for role/profile round trips.
 */
export function getCachedPostAuthRoute(userId: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedRoute;
    if (parsed?.userId !== userId || typeof parsed.dest !== "string") return null;
    return parsed.dest;
  } catch {
    return null;
  }
}

function cachePostAuthRoute(userId: string, dest: string) {
  if (typeof window === "undefined") return;
  try {
    // Onboarding is transient — never cache it, or users get stuck there.
    if (dest === "/onboarding") {
      window.localStorage.removeItem(CACHE_KEY);
      return;
    }
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ userId, dest, at: Date.now() } satisfies CachedRoute),
    );
  } catch {
    // ignore storage failures
  }
}

export function clearCachedPostAuthRoute() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CACHE_KEY);
  } catch {
    // ignore
  }
}

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
  const [{ data: isSuper }, { data: isAdmin }, profileRes] = await Promise.all([
    supabase.rpc("has_role", { _user_id: userId, _role: "super_admin" }),
    supabase.rpc("has_role", { _user_id: userId, _role: "admin" }),
    supabase
      .from("profiles")
      .select("onboarded_at, current_course_id, current_semester_id")
      .eq("user_id", userId)
      .maybeSingle(),
  ]);

  if (isSuper || isAdmin) {
    cachePostAuthRoute(userId, "/admin");
    return "/admin";
  }

  // Guest preference sync is a background nicety — never block the redirect.
  void syncGuestPrefsToProfile(userId).catch(() => {});

  const profile = profileRes.data;
  if (
    !profile ||
    (!profile.onboarded_at && (!profile.current_course_id || !profile.current_semester_id))
  ) {
    cachePostAuthRoute(userId, "/onboarding");
    return "/onboarding";
  }
  cachePostAuthRoute(userId, "/dashboard");
  return "/dashboard";
}
