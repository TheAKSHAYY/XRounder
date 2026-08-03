import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Circular progress indicator — quiz results, subject completion, profile.
 */
export function ProgressRing({
  value,
  size = 96,
  thickness = 8,
  label,
  children,
  tone = "primary",
  className,
}: {
  value: number;
  size?: number;
  thickness?: number;
  label: string;
  children?: ReactNode;
  tone?: "primary" | "success" | "accent" | "destructive";
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const stroke =
    tone === "success"
      ? "var(--color-success)"
      : tone === "accent"
        ? "var(--color-accent)"
        : tone === "destructive"
          ? "var(--color-destructive)"
          : "var(--color-primary)";

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-label={label}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${pct} percent`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.2,0.7,0.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        {children ?? (
          <span className="font-serif text-xl font-semibold tabular-nums text-foreground">
            {pct}%
          </span>
        )}
      </div>
    </div>
  );
}
