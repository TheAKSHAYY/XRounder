import { Link } from "@tanstack/react-router";

import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/utils";

type FooterLink =
  | {
      label: string;
      to: "/courses" | "/auth" | "/privacy" | "/terms" | "/developer" | "/help";
      search?: { mode: "signin" | "signup" | "forgot" };
      href?: never;
    }
  | { label: string; href: string; to?: never; search?: never };

/**
 * The single site footer. `marketing` enables the landing-page anchor links;
 * on other routes those anchors don't exist, so they're replaced with routes.
 */
export function SiteFooter({
  marketing = false,
  className,
}: {
  marketing?: boolean;
  className?: string;
}) {
  const product: FooterLink[] = marketing
    ? [
        { label: "Browse courses", to: "/courses" },
        { label: "Features", href: "#features" },
        { label: "Learning journey", href: "#journey" },
        { label: "FAQ", href: "#faq" },
      ]
    : [
        { label: "Browse courses", to: "/courses" },
        { label: "Help centre", to: "/help" },
      ];

  return (
    <footer className={cn("mt-16 border-t border-border/60 bg-surface-muted/60", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0">
            <Link to="/" className="flex items-center gap-3">
              <BrandMark className="h-10 w-10 shrink-0" />
              <span className="font-display text-base font-semibold text-foreground">
                BCA Gurukul
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The structured learning home for BCA students across India.
            </p>
          </div>
          <FooterCol title="Product" links={product} />
          <FooterCol
            title="Account"
            links={[
              { label: "Sign in", to: "/auth", search: { mode: "signin" } },
              { label: "Create account", to: "/auth", search: { mode: "signup" } },
              { label: "Reset password", to: "/auth", search: { mode: "forgot" } },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "Developer", to: "/developer" },
              { label: "Privacy", to: "/privacy" },
              { label: "Terms", to: "/terms" },
            ]}
          />
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} BCA Gurukul. All rights reserved.</span>
          <span>Built with care for BCA students.</span>
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
                  const el = document.getElementById(l.href.slice(1));
                  if (l.href.startsWith("#") && el) {
                    e.preventDefault();
                    window.scrollTo({
                      top: el.getBoundingClientRect().top + window.scrollY - 80,
                      behavior: "smooth",
                    });
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
