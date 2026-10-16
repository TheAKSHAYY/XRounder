import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { useGuest } from "@/hooks/use-guest";
import { GuestBadge } from "@/components/guest/guest-badge";
import { BrandLockup } from "@/components/brand-mark";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SoundToggle } from "@/components/ui/sound-toggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { QuickCourseBrowser } from "@/components/courses/quick-course-browser";

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
  const { isGuest } = useGuest();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const anchors: Array<{ label: string; href?: string; to?: string }> = marketing
    ? [
        { label: "Degree Roadmap", href: "#curriculum-roadmap" },
        { label: "BCA Syllabus", href: "#syllabus" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Exam Rescue", href: "#hero-rescue-machine" },
        { label: "Browse Courses", to: "/courses" },
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
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/90 backdrop-blur-md shadow-xs"
          : "border-b border-border/40 bg-background/60 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex h-16 w-full sm:max-w-6xl items-center gap-3 px-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center select-none" aria-label="XRounder home">
          <BrandLockup className="h-8 sm:h-10" textClassName="text-base sm:text-xl font-bold" />
        </Link>

        <nav aria-label="Main" className="ml-6 hidden items-center gap-1 md:flex">
          {anchors.map((a) =>
            a.to ? (
              <Link
                key={a.label}
                to={a.to}
                className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                activeProps={{ className: "text-foreground font-semibold" }}
              >
                {a.label}
              </Link>
            ) : (
              <a
                key={a.label}
                href={a.href}
                onClick={(e) => scrollTo(e, a.href!)}
                className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                {a.label}
              </a>
            ),
          )}
          {!marketing && (
            <>
              <QuickCourseBrowser
                trigger={
                  <button
                    type="button"
                    className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                  >
                    Courses
                  </button>
                }
              />
              {!user && (
                <Link
                  to="/explore"
                  className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground font-semibold" }}
                >
                  Explore
                </Link>
              )}
              <Link
                to="/study-plan"
                className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground font-semibold" }}
              >
                Study plan
              </Link>
            </>
          )}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          {isGuest && <GuestBadge className="hidden md:inline-flex" />}
          <SoundToggle />
          <ThemeToggle />

          {loading ? (
            <div
              className="h-9 w-20 sm:h-10 sm:w-28 animate-pulse rounded-xl bg-muted"
              aria-hidden
            />
          ) : user ? (
            <Button
              asChild
              size="sm"
              className="btn-squishy btn-cta h-9 sm:h-10 rounded-xl px-3 sm:px-4 text-xs sm:text-sm font-semibold shadow-xs shrink-0"
            >
              <Link to="/dashboard">
                Dashboard
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="btn-squishy hidden h-10 rounded-xl px-3.5 text-sm font-medium lg:inline-flex text-muted-foreground hover:text-foreground"
              >
                <Link to="/auth" search={{ mode: "signin" }}>
                  Sign in
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="btn-squishy btn-cta h-9 sm:h-10 rounded-xl px-2.5 sm:px-4 text-xs sm:text-sm font-semibold shadow-xs shrink-0"
              >
                <Link to="/auth" search={{ mode: "signup" }}>
                  <span className="hidden sm:inline">Start Learning</span>
                  <span className="sm:hidden">Start</span>
                  <ArrowRight className="ml-1 sm:ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </Button>
            </>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl md:hidden shrink-0"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,85vw)]">
              <SheetHeader>
                <div className="flex items-center justify-between pr-6">
                  <SheetTitle className="font-display">Navigation</SheetTitle>
                  {isGuest && <GuestBadge />}
                </div>
              </SheetHeader>
              <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1">
                {anchors.map((a) =>
                  a.to ? (
                    <Link
                      key={a.label}
                      to={a.to}
                      className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {a.label}
                    </Link>
                  ) : (
                    <a
                      key={a.label}
                      href={a.href}
                      onClick={(e) => scrollTo(e, a.href!)}
                      className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {a.label}
                    </a>
                  ),
                )}
                {!marketing && (
                  <>
                    <QuickCourseBrowser
                      trigger={
                        <button
                          type="button"
                          className="flex w-full min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground text-left cursor-pointer"
                        >
                          Courses
                        </button>
                      }
                    />
                    {!user && (
                      <Link
                        to="/explore"
                        className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        Explore
                      </Link>
                    )}
                  </>
                )}
                <Link
                  to="/study-plan"
                  className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  Study plan
                </Link>
                <Link
                  to="/developer"
                  className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  Developer
                </Link>
                <Link
                  to="/help"
                  className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  Help
                </Link>

                <div className="mt-4 pt-4 border-t border-border/60">
                  {user ? (
                    <Button
                      asChild
                      size="sm"
                      className="btn-cta h-11 w-full rounded-xl font-semibold"
                    >
                      <Link to="/dashboard">
                        Go to Dashboard <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        asChild
                        size="sm"
                        className="btn-cta h-11 w-full rounded-xl font-semibold"
                      >
                        <Link to="/auth" search={{ mode: "signup" }}>
                          Start Learning <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-11 w-full rounded-xl font-medium"
                      >
                        <Link to="/auth" search={{ mode: "signin" }}>
                          Sign In
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
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
