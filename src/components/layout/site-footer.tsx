import { Link } from "@tanstack/react-router";

import { BrandLockup } from "@/components/brand-mark";
import { cn } from "@/lib/utils";

type FooterLink =
  | {
      label: string;
      to: "/courses" | "/privacy" | "/terms" | "/developer" | "/mock-test";
      href?: never;
    }
  | { label: string; href: string; to?: never };

const FOOTER_LINKS: FooterLink[] = [
  { label: "Courses", to: "/courses" },
  { label: "Roadmap", href: "/#curriculum-roadmap" },
  { label: "Mock Test", to: "/mock-test" },
  { label: "Developer", to: "/developer" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
];

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "relative mt-12 sm:mt-16 border-t border-border/70 bg-card/60 backdrop-blur-md py-6 sm:py-7",
        className,
      )}
    >
      <div className="mx-auto flex w-full sm:max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand & Minimal Tagline */}
        <div className="flex items-center gap-2.5">
          <Link to="/" className="flex items-center" aria-label="XRounder home">
            <BrandLockup className="h-8 shrink-0" textClassName="text-base sm:text-lg font-bold" />
          </Link>
          <span className="text-xs text-muted-foreground hidden md:inline">
            · Master BCA. Zero Exam Panic.
          </span>
        </div>

        {/* Compact Horizontal Nav Links */}
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground font-medium"
        >
          {FOOTER_LINKS.map((l) =>
            l.to ? (
              <Link
                key={l.label}
                to={l.to}
                className="transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  if (typeof window === "undefined") return;
                  const isHome = window.location.pathname === "/";
                  const hashIndex = l.href.indexOf("#");
                  if (isHome && hashIndex !== -1) {
                    const targetId = l.href.slice(hashIndex + 1);
                    const el = document.getElementById(targetId);
                    if (el) {
                      e.preventDefault();
                      window.scrollTo({
                        top: el.getBoundingClientRect().top + window.scrollY - 80,
                        behavior: "smooth",
                      });
                    }
                  }
                }}
                className="transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ),
          )}
        </nav>

        {/* Copyright */}
        <div className="text-[11px] text-muted-foreground font-mono">
          © {new Date().getFullYear()} XRounder
        </div>
      </div>
    </footer>
  );
}
