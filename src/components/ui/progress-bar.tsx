import { cn } from "@/lib/utils";

/**
 * The single progress bar for the whole app (dashboard, semester, subject,
 * unit, quiz). Replaces three near-identical bespoke implementations.
 */
export function ProgressBar({
  value,
  label,
  tone = "accent",
  size = "sm",
  className,
  trackClassName,
}: {
  value: number;
  label: string;
  /** `accent` (muted olive) by default per Rule 4, `primary` on neutral, `onPrimary` inside dark panels. */
  tone?: "accent" | "primary" | "muted" | "success" | "onPrimary";
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
        ? "bg-accent/60"
        : tone === "success"
          ? "bg-success"
          : tone === "primary"
            ? "bg-primary"
            : "bg-accent";

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
