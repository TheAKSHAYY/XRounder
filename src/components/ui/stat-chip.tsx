import type { ComponentType, ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * The single stat tile / chip for the whole app. Replaces admin `StatCard`,
 * student `MiniChip`, `StatTile` and `ContentPill`.
 *
 * variants:
 *   card  — bordered tile with big value + icon badge (dashboards)
 *   tile  — compact bordered tile, label over value (hero stat rows)
 *   chip  — inline pill with icon + count + label (dense metadata rows)
 */
export function StatChip({
  label,
  value,
  icon: Icon,
  hint,
  to,
  params,
  href,
  loading,
  variant = "card",
  tone = "default",
  className,
}: {
  label: ReactNode;
  value?: number | string | null;
  icon?: ComponentType<{ className?: string }>;
  hint?: ReactNode;
  to?: string;
  params?: Record<string, string>;
  href?: string;
  loading?: boolean;
  variant?: "card" | "tile" | "chip";
  tone?: "default" | "muted" | "accent";
  className?: string;
}) {
  if (variant === "chip") {
    const empty = value === 0 || value === "0";
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
          empty
            ? "border-border bg-transparent text-muted-foreground/70"
            : tone === "accent"
              ? "border-accent/30 bg-accent/10 text-accent-foreground"
              : "border-primary/20 bg-primary/5 text-primary",
          className,
        )}
      >
        {Icon && <Icon className="h-3 w-3 shrink-0" />}
        <span className="tabular-nums">{value ?? 0}</span>
        <span>{label}</span>
      </span>
    );
  }

  const inner =
    variant === "tile" ? (
      <div
        className={cn("min-w-0 rounded-lg border border-border/70 bg-surface px-4 py-3", className)}
      >
        <div className="text-eyebrow text-muted-foreground">{label}</div>
        <div className="mt-1 font-serif text-lg font-semibold tabular-nums text-foreground">
          {loading ? <Skeleton className="h-6 w-14" /> : (value ?? 0)}
        </div>
        {hint && <div className="mt-0.5 truncate text-xs text-muted-foreground">{hint}</div>}
      </div>
    ) : (
      <div
        className={cn(
          "group flex items-start justify-between gap-3 rounded-lg border border-border/70 bg-surface p-4 transition hover:border-primary/40 hover:shadow-sm",
          className,
        )}
      >
        <div className="min-w-0">
          <div className="text-eyebrow text-muted-foreground">{label}</div>
          <div className="mt-1.5 font-serif text-2xl font-semibold tabular-nums text-foreground">
            {loading ? <Skeleton className="h-7 w-16" /> : (value ?? 0)}
          </div>
          {hint && <div className="mt-0.5 text-xs text-muted-foreground">{hint}</div>}
        </div>
        {Icon && (
          <div className="shrink-0 rounded-md bg-primary/10 p-2 text-primary transition group-hover:bg-primary/15">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
    );

  if (href) {
    return (
      <a href={href} className="block min-w-0">
        {inner}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} params={params as never} className="block min-w-0">
        {inner}
      </Link>
    );
  }
  return inner;
}
