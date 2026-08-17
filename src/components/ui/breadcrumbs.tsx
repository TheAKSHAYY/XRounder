import { Link } from "@tanstack/react-router";
import { ChevronRight, Home, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

export type Crumb = {
  label: string;
  to?: string;
  params?: Record<string, string>;
};

/**
 * Orientation for deep-linked students: course › semester › subject › unit.
 * On mobile the middle crumbs collapse behind an ellipsis (only home, the
 * parent and the current page stay visible) so the trail never overflows.
 */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const collapsed = items.length > 2;

  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex min-w-0 items-center gap-x-1.5 text-xs text-muted-foreground sm:flex-wrap sm:gap-y-1">
        <li className="flex shrink-0 items-center">
          <Link
            to="/dashboard"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground"
            aria-label="Dashboard"
          >
            <Home className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </li>

        {collapsed && (
          <li className="flex shrink-0 items-center gap-1.5 sm:hidden" aria-hidden>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <MoreHorizontal className="h-3.5 w-3.5 opacity-60" />
          </li>
        )}

        {items.map((item, i) => {
          const last = i === items.length - 1;
          const secondToLast = i === items.length - 2;
          // Mobile shows only the parent + current crumb.
          const hideOnMobile = collapsed && !last && !secondToLast;
          return (
            <li
              key={`${item.label}-${i}`}
              className={cn("flex min-w-0 items-center gap-1.5", hideOnMobile && "hidden sm:flex")}
            >
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
              {item.to && !last ? (
                <Link
                  to={item.to}
                  params={item.params as never}
                  className="max-w-[8rem] truncate rounded-sm hover:text-foreground sm:max-w-[16rem]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="max-w-[11rem] truncate font-medium text-foreground sm:max-w-none"
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
