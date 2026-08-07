import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/**
 * The single public/site header. Every non-authenticated page uses this so
 * header height (h-16), gutters and CTA placement never drift between routes.
 *
 * `marketing` adds the on-page anchor nav used by the landing page only.
 */
export function SiteHeader({
  marketing = false,
  className,
}: {
  marketing?: boolean;
  className?: string;
}) {
  const { user, loading } = useAuth();

  const anchors = marketing
    ? [
        { label: "Features", href: "#features" },
        { label: "Journey", href: "#journey" },
        { label: "FAQ", href: "#faq" },
      ]
    : [];

  function scrollTo(e: React.MouseEvent, href: string) {
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    e.preventDefault();
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth",
    });
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/65",
        className,
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="BCA Gurukul home">
          <BrandMark className="h-9 w-9 shrink-0" />
          <span className="truncate font-display text-base font-semibold text-foreground sm:text-lg">
            BCA Gurukul
          </span>
        </Link>

        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 md:flex">
          {anchors.map((a) => (
            <a
              key={a.href}
              href={a.href}
              onClick={(e) => scrollTo(e, a.href)}
              className="inline-flex min-h-11 items-center rounded-md px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {a.label}
            </a>
          ))}
          <Link
            to="/courses"
            className="inline-flex min-h-11 items-center rounded-md px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Courses
          </Link>
          <Link
            to="/developer"
            className="inline-flex min-h-11 items-center rounded-md px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Developer
          </Link>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <ThemeToggle />

          {loading ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-muted" aria-hidden />
          ) : user ? (
            <Button asChild size="sm" className="h-10 rounded-full px-4">
              <Link to="/dashboard">
                Dashboard
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden h-10 rounded-full px-4 sm:inline-flex"
              >
                <Link to="/auth" search={{ mode: "signin" }}>
                  Sign in
                </Link>
              </Button>
              <Button asChild size="sm" className="h-10 rounded-full px-4">
                <Link to="/auth" search={{ mode: "signup" }}>
                  Get started
                </Link>
              </Button>
            </>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,85vw)]">
              <SheetHeader>
                <SheetTitle className="font-display">Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1">
                {anchors.map((a) => (
                  <a
                    key={a.href}
                    href={a.href}
                    onClick={(e) => scrollTo(e, a.href)}
                    className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {a.label}
                  </a>
                ))}
                <Link
                  to="/courses"
                  className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  Courses
                </Link>
                <Link
                  to="/developer"
                  className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  Developer
                </Link>
                <Link
                  to="/help"
                  className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  Help
                </Link>
                {!user && (
                  <Link
                    to="/auth"
                    search={{ mode: "signin" }}
                    className="mt-2 flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-primary hover:bg-muted"
                  >
                    Sign in
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/** Back-compat alias — older routes imported this name. */
export const PublicHeader = SiteHeader;
