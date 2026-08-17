import type { ReactNode } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";

/**
 * The single hero block for every student page (dashboard, semester, subject,
 * unit). Mirrors the admin `PageHeader` pattern so student pages stop
 * hand-rolling their own hero markup.
 */
export function StudentHero({
  eyebrow,
  title,
  description,
  progress,
  action,
  aside,
  loading,
  className,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  progress?: { value: number; label: string; caption?: ReactNode };
  action?: ReactNode;
  aside?: ReactNode;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section className={cn("rounded-lg border border-border bg-surface p-6 sm:p-9", className)}>
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-72 max-w-full" />
          <Skeleton className="h-4 w-96 max-w-full" />
          <Skeleton className="h-11 w-48" />
        </div>
      ) : (
        <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="min-w-0">
            {eyebrow && <p className="text-eyebrow text-muted-foreground">{eyebrow}</p>}
            <h1 className="mt-3 text-h1 text-foreground">{title}</h1>
            {description && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {description}
              </p>
            )}

            {progress && (
              <div className="mt-6 max-w-md">
                <ProgressBar value={progress.value} label={progress.label} />
                <div className="mt-2 flex items-center justify-between gap-3 text-[11px] font-medium text-muted-foreground">
                  <span className="min-w-0">{progress.caption}</span>
                  <span className="shrink-0 tabular-nums text-foreground">
                    {Math.round(progress.value)}%
                  </span>
                </div>
              </div>
            )}

            {children}
          </div>

          {(action || aside) && (
            <div className="min-w-0 md:pl-6">
              {aside}
              {action}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
