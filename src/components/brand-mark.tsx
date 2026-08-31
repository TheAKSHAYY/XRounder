import { cn } from "@/lib/utils";

const LOGO_MARK_SRC = "/xrounder-mark.png";

/**
 * BrandMark — the XRounder logo mark: the hand-painted red brush-stroke X
 * taken straight from the source artwork (transparent PNG, square box).
 * Never substitute a font/CSS "X" for this.
 */
export function BrandMark({ className }: { className?: string; variant?: "filled" | "inverse" }) {
  return (
    <span className={cn("relative inline-grid shrink-0 place-items-center", className)}>
      <img
        src={LOGO_MARK_SRC}
        alt="XRounder"
        width={36}
        height={36}
        className="h-full w-full object-contain"
        loading="eager"
        decoding="async"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/favicon.png";
        }}
      />
    </span>
  );
}

/**
 * BrandLockup — the full XRounder logo: the custom brush-stroke X (large,
 * vivid red, image asset) immediately followed by "Rounder" set in the clean
 * bold display face. The X is intentionally larger than the wordmark and the
 * spacing is tight, matching the source logo.
 *
 * `className` controls the overall lockup height (e.g. "h-10").
 */
export function BrandLockup({
  className,
  textClassName,
  tone = "auto",
}: {
  className?: string;
  textClassName?: string;
  /** "light" forces a near-white wordmark (dark surfaces), "dark" forces near-black. */
  tone?: "auto" | "light" | "dark";
}) {
  const wordTone =
    tone === "light"
      ? "text-white dark:text-white"
      : tone === "dark"
        ? "text-slate-950 dark:text-slate-900"
        : "text-slate-900 dark:text-slate-50";

  return (
    <span
      className={cn("inline-flex items-center gap-1.5 leading-none select-none", className)}
      aria-label="XRounder"
    >
      <img
        src={LOGO_MARK_SRC}
        alt=""
        aria-hidden
        width={36}
        height={36}
        className="h-[1.5em] w-auto max-w-none shrink-0 object-contain drop-shadow-xs"
        loading="eager"
        decoding="async"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/favicon.png";
        }}
      />

      <span
        className={cn(
          "font-display text-lg sm:text-xl font-extrabold leading-none tracking-[-0.03em] transition-colors",
          wordTone,
          textClassName,
        )}
      >
        Rounder
      </span>
    </span>
  );
}
