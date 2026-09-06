import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function messageOf(error: unknown, fallback: string): string {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  if (error instanceof Error && error.message) return error.message;
  const maybe = error as { message?: unknown };
  if (typeof maybe.message === "string" && maybe.message) return maybe.message;
  return fallback;
}

/**
 * Inline "something went wrong" panel for a single failed section.
 * Always pass `onRetry` so the user has a clear way out.
 */
export function ErrorPanel({
  title = "We couldn't load this",
  description,
  error,
  onRetry,
  retrying,
  children,
  className,
}: {
  title?: ReactNode;
  description?: ReactNode;
  error?: unknown;
  onRetry?: () => void;
  retrying?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const detail =
    description ??
    messageOf(error, "The connection may have dropped. Please try again in a moment.");

  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-10 text-center",
        className,
      )}
    >
      <div className="grid h-12 w-12 place-items-center rounded-lg border border-destructive/30 bg-background text-destructive">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-h3 text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-prose text-sm text-muted-foreground">{detail}</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {onRetry && (
          <Button className="rounded-full" onClick={onRetry} disabled={retrying}>
            <RefreshCw className={cn("h-4 w-4", retrying && "animate-spin")} />
            {retrying ? "Retrying…" : "Try again"}
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}

/**
 * Full-page error screen for a route whose loader failed.
 */
export function RouteErrorScreen({
  title = "This page didn't load",
  error,
  onRetry,
}: {
  title?: string;
  error?: unknown;
  onRetry?: () => void;
}) {
  return (
    <div className="grid min-h-screen place-items-center bg-background p-6">
      <ErrorPanel
        className="max-w-lg border-border bg-surface"
        title={title}
        error={error}
        onRetry={onRetry}
      >
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/courses">
            <Home className="h-4 w-4" />
            Back to courses
          </Link>
        </Button>
      </ErrorPanel>
    </div>
  );
}
