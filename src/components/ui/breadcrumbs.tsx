import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

import { cn } from "@/lib/utils";

export type Crumb = {
  label: string;
  to?: string;
  params?: Record<string, string>;
};

/**
 * Orientation for deep-linked students: course › semester › subject › unit.
 * Collapses the middle crumbs on very small screens so it never overflows.
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground">
        <li className="flex shrink-0 items-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 rounded-sm hover:text-foreground"
            aria-label="Dashboard"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex min-w-0 items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
              {item.to && !last ? (
                <Link
                  to={item.to}
                  params={item.params as never}
                  className="max-w-[10rem] truncate rounded-sm hover:text-foreground sm:max-w-[16rem]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="max-w-[12rem] truncate font-medium text-foreground sm:max-w-none"
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
