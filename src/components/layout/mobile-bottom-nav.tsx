import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Compass, Home, LayoutDashboard, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const { user } = useAuth();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const items = [
    { label: "Home", href: "/", icon: Home, active: pathname === "/" },
    { label: "Courses", href: "/courses", icon: BookOpen, active: pathname.startsWith("/courses") },
    { label: "Explore", href: "/explore", icon: Compass, active: pathname === "/explore" },
    user
      ? { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, active: pathname.startsWith("/dashboard") }
      : { label: "Sign In", href: "/auth", icon: User, active: pathname.startsWith("/auth") },
  ];

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-border/70 bg-background/90 px-2 backdrop-blur-md md:hidden"
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 min-w-[3.5rem] py-1 text-[11px] font-medium transition-colors",
              item.active
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className={cn("h-5 w-5", item.active && "text-primary")} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
