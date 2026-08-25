import markAsset from "@/assets/xrounder-mark.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * BrandMark — the XRounder logo mark: the hand-painted red brush-stroke X
 * taken straight from the source artwork (transparent PNG, square box).
 * Never substitute a font/CSS "X" for this.
 */
export function BrandMark({ className }: { className?: string; variant?: "filled" | "inverse" }) {
  return (
    <span className={cn("relative inline-grid shrink-0 place-items-center", className)}>
      <img
        src={markAsset.url}
        alt="XRounder"
        className="h-full w-full object-contain"
        loading="eager"
        decoding="async"
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
      ? "text-primary-foreground"
      : tone === "dark"
        ? "text-foreground"
        : "text-foreground";

  return (
    <span
      className={cn("inline-flex items-center text-lg sm:text-xl", className, textClassName)}
      aria-label="XRounder"
    >
      <img
        src={markAsset.url}
        alt=""
        aria-hidden
        className="h-[1.9em] w-auto shrink-0 object-contain"
        loading="eager"
        decoding="async"
      />
      <span
        className={cn(
          "-ml-[0.08em] font-sans font-extrabold leading-none tracking-[-0.02em]",
          wordTone,
        )}
      >
        Rounder
      </span>
    </span>
  );
}

