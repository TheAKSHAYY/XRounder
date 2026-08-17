import { cn } from "@/lib/utils";

/**
 * The single progress bar for the whole app (dashboard, semester, subject,
 * unit, quiz). Replaces three near-identical bespoke implementations.
 */
export function ProgressBar({
  value,
  label,
  tone = "primary",
  size = "sm",
  className,
  trackClassName,
}: {
  value: number;
  label: string;
  /** `primary` on light surfaces, `onPrimary` inside a primary-filled hero. */
  tone?: "primary" | "muted" | "success" | "accent" | "onPrimary";
  size?: "xs" | "sm" | "md";
  className?: string;
  trackClassName?: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const height = size === "xs" ? "h-1" : size === "md" ? "h-2.5" : "h-1.5";
  const track = tone === "onPrimary" ? "bg-primary-foreground/20" : "bg-muted";
  const fill =
    tone === "onPrimary"
      ? "bg-primary-foreground"
      : tone === "muted"
        ? "bg-primary/60"
        : tone === "success"
          ? "bg-success"
          : tone === "accent"
            ? "bg-accent"
            : "bg-primary";

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-full",
        height,
        track,
        trackClassName,
        className,
      )}
      role="progressbar"
      aria-label={label}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${pct} percent`}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-500 ease-out", fill)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
