import { Link, useRouterState } from "@tanstack/react-router";
import { Bookmark, GraduationCap, Home, Search, User } from "lucide-react";

import { cn } from "@/lib/utils";

const TABS = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/courses", label: "Courses", icon: GraduationCap },
  { to: "/bookmarks", label: "Saved", icon: Bookmark },
  { to: "/search", label: "Search", icon: Search },
  { to: "/profile", label: "Profile", icon: User },
] as const;

/**
 * Fixed bottom navigation for mobile only. Pages get `pb-mobile-nav` so
 * content never hides behind it.
 */
export function MobileTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {TABS.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(`${to}/`);
          return (
            <li key={to} className="min-w-0">
              <Link
                to={to}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-[3.25rem] flex-col items-center justify-center gap-1 px-1 py-2 text-[0.6875rem] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="size-5 shrink-0" strokeWidth={active ? 2.4 : 2} aria-hidden />
                <span className="truncate">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
