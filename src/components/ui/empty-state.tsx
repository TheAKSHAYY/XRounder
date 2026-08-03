import type { ComponentType, ReactNode } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared empty state. Every empty state should pass an `action` — a clear next
 * step, not just explanatory text.
 */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: {
  icon?: ComponentType<{ className?: string }>;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-border/70 bg-surface/50 px-6 py-14 text-center",
        className,
      )}
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-2xl" />
        <div className="grid h-14 w-14 place-items-center rounded-lg border border-border/70 bg-background text-primary shadow-sm">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <h3 className="text-h3 text-foreground">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-5 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  );
}
