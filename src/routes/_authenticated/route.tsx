import { createFileRoute, Outlet, redirect, useRouterState } from "@tanstack/react-router";

import { useAuth, waitForAuth } from "@/hooks/use-auth";
import { AppNavbar } from "@/components/app-navbar";
import { MobileTabBar } from "@/components/student/mobile-tab-bar";

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
