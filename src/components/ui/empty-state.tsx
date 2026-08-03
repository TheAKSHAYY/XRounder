import type { ComponentType, ReactNode } from "react";
import { Inbox } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type EmptyAction = {
  label: string;
  to?: string;
  params?: Record<string, string>;
  href?: string;
  onClick?: () => void;
  icon?: ComponentType<{ className?: string }>;
};

function ActionButton({
  action,
  variant,
}: {
  action: EmptyAction;
  variant: "default" | "outline";
}) {
  const Icon = action.icon;
  const content = (
    <>
      {action.label}
      {Icon && <Icon className="h-4 w-4" />}
    </>
  );

  if (action.to) {
    return (
      <Button asChild variant={variant} className="rounded-full">
        <Link to={action.to} params={action.params as never}>
          {content}
        </Link>
      </Button>
    );
  }
  if (action.href) {
    return (
      <Button asChild variant={variant} className="rounded-full">
        <a href={action.href} target="_blank" rel="noreferrer">
          {content}
        </a>
      </Button>
    );
  }
  return (
    <Button variant={variant} className="rounded-full" onClick={action.onClick}>
      {content}
    </Button>
  );
}

/**
 * Shared empty state. Every empty state should give a clear next step —
 * pass `primaryAction` (or a custom `action` node), not just explanatory text.
 */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  tip,
  primaryAction,
  secondaryAction,
  action,
  tone = "default",
  variant = "default",
  className,
}: {
  icon?: ComponentType<{ className?: string }>;
  title: ReactNode;
  description?: ReactNode;
  tip?: ReactNode;
  primaryAction?: EmptyAction;
  secondaryAction?: EmptyAction;
  action?: ReactNode;
  tone?: "default" | "accent";
  variant?: "default" | "panel";
  className?: string;
}) {
  const accent = tone === "accent";
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border px-6 text-center",
        variant === "panel"
          ? "border-border/70 bg-surface py-10"
          : "border-dashed border-border/70 bg-surface/50 py-14",
        className,
      )}
    >
      <div className="relative mb-4">
        <div
          className={cn(
            "absolute inset-0 -z-10 rounded-full blur-2xl",
            accent ? "bg-accent/20" : "bg-primary/10",
          )}
        />
        <div
          className={cn(
            "grid h-14 w-14 place-items-center rounded-lg border border-border/70 bg-background shadow-sm",
            accent ? "text-accent-foreground" : "text-primary",
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>

      <h3 className="text-h3 text-foreground">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-prose text-sm text-muted-foreground">{description}</p>
      )}
      {tip && (
        <p className="mt-3 max-w-prose rounded-full border border-border/70 bg-surface-muted px-3.5 py-1.5 text-xs text-muted-foreground">
          {tip}
        </p>
      )}

      {(primaryAction || secondaryAction || action) && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {primaryAction && <ActionButton action={primaryAction} variant="default" />}
          {secondaryAction && <ActionButton action={secondaryAction} variant="outline" />}
          {action}
        </div>
      )}
    </div>
  );
}
