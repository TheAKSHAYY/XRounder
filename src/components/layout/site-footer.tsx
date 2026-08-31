import { Link } from "@tanstack/react-router";

import { BrandLockup } from "@/components/brand-mark";
import { cn } from "@/lib/utils";

type FooterLink =
  | {
      label: string;
      to: "/courses" | "/auth" | "/privacy" | "/terms" | "/developer";
      search?: { mode: "signin" | "signup" | "forgot" };
      href?: never;
    }
  | { label: string; href: string; to?: never; search?: never };

export function SiteFooter({ className }: { className?: string }) {
  const product: FooterLink[] = [
    { label: "Browse Courses", to: "/courses" },
    { label: "Features", href: "/#features" },
    { label: "Curriculum", href: "/#curriculum" },
    { label: "How It Works", href: "/#how-it-works" },
  ];

  const account: FooterLink[] = [
    { label: "Sign in", to: "/auth", search: { mode: "signin" } },
    { label: "Create account", to: "/auth", search: { mode: "signup" } },
    { label: "Reset password", to: "/auth", search: { mode: "forgot" } },
  ];

  const company: FooterLink[] = [
    { label: "Developer", to: "/developer" },
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
  ];

  return (
    <footer className={cn("mt-16 border-t border-border/60 bg-surface-muted/60", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
          <div className="col-span-2 min-w-0 lg:col-span-1">
            <Link to="/" className="flex items-center">
              <BrandLockup className="h-11 shrink-0" textClassName="text-xl" />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The structured learning home for students on every course and learning path.
            </p>
          </div>
          <FooterCol title="Product" links={product} />
          <FooterCol title="Account / Support" links={account} />
          <FooterCol title="Company" links={company} />
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} XRounder. All rights reserved.</span>
          <span>Built with care for students everywhere.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="min-w-0">
      <h2 className="font-display text-sm font-semibold text-foreground">{title}</h2>
      <ul className="mt-3 space-y-1 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            {l.to ? (
              <Link
                to={l.to}
                search={l.search as never}
                className="inline-flex min-h-9 items-center text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ) : (
              <a
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
                className="inline-flex min-h-9 items-center text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
