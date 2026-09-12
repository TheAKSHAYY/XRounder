import { createFileRoute, Outlet, redirect, useRouterState } from "@tanstack/react-router";

import { waitForAuth } from "@/hooks/use-auth";
import { AppNavbar } from "@/components/app-navbar";
import { MobileTabBar } from "@/components/student/mobile-tab-bar";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  beforeLoad: async ({ location }) => {
    const auth = await waitForAuth();
    if (!auth.isAuthenticated || !auth.user) {
      throw redirect({ to: "/auth", search: { redirect: location.href } });
    }

    // 1. Never trap admin or super-admin routes in student onboarding
    if (location.pathname.startsWith("/admin")) {
      return { user: auth.user };
    }

    // 2. Allow onboarding itself, profile, settings, and help without redirect loops
    const exemptPaths = ["/onboarding", "/profile", "/settings", "/help"];
    if (exemptPaths.includes(location.pathname)) {
      return { user: auth.user };
    }

    // 3. Prevent admins/super_admins from being trapped in onboarding when viewing student pages
    const { data: isAdmin } = await supabase.rpc("is_admin", { _user_id: auth.user.id });
    if (isAdmin) {
      return { user: auth.user };
    }

    // 4. For regular students, check onboarding status
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarded_at, current_semester_id")
      .eq("user_id", auth.user.id)
      .maybeSingle();

    if (!profile?.onboarded_at && !profile?.current_semester_id) {
      throw redirect({ to: "/onboarding" });
    }

    return { user: auth.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Admin shell renders its own chrome.
  const hideChrome = pathname.startsWith("/admin");
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {!hideChrome && <AppNavbar />}
      <div className={hideChrome ? undefined : "pb-mobile-nav"}>
        <Outlet />
      </div>
      {!hideChrome && <MobileTabBar />}
    </div>
  );
}
