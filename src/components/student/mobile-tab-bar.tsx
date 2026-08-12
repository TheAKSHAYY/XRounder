import { Link, useRouterState } from "@tanstack/react-router";
import { Bookmark, GraduationCap, Home, TrendingUp, User } from "lucide-react";

import { cn } from "@/lib/utils";

const TABS = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/courses", label: "Courses", icon: GraduationCap },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/bookmarks", label: "Saved", icon: Bookmark },
  { to: "/profile", label: "Profile", icon: User },
] as const;

/**
 * Fixed bottom navigation for mobile only. Pages get `pb-mobile-nav` so
 * content never hides behind it. Each tab is a >=44px target and the active
 * tab is marked with both colour and a top rail (never colour alone).
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
                  "relative flex min-h-[3.5rem] flex-col items-center justify-center gap-1 px-1 py-2 text-[0.6875rem] font-medium transition-colors duration-200 active:bg-muted/60",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-4 top-0 h-0.5 rounded-full bg-primary transition-opacity duration-200",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
                <Icon
                  className={cn(
                    "size-5 shrink-0 transition-transform duration-200",
                    active && "scale-110",
                  )}
                  strokeWidth={active ? 2.4 : 2}
                  aria-hidden
                />
                <span className="max-w-full truncate">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
