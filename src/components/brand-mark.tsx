import markAsset from "@/assets/xrounder-mark.png.asset.json";
import logoAsset from "@/assets/xrounder-logo.png.asset.json";
import logoDarkTextAsset from "@/assets/xrounder-logo-dark.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * BrandMark — the XRounder logo mark (the red brush-stroke X).
 * Transparent PNG, square box, aspect ratio kept. Works on any surface.
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
 * BrandLockup — the full XRounder logo (red X + ROUNDER wordmark + flame).
 * Automatically swaps the wordmark colour for light and dark surfaces.
 */
export function BrandLockup({
  className,
  tone = "auto",
}: {
  className?: string;
  /** "auto" follows the theme, "light" forces the near-white wordmark (dark surfaces). */
  tone?: "auto" | "light" | "dark";
}) {
  const base = cn("h-10 w-auto object-contain", className);

  if (tone === "light") {
    return <img src={logoAsset.url} alt="XRounder" className={base} loading="eager" />;
  }
  if (tone === "dark") {
    return <img src={logoDarkTextAsset.url} alt="XRounder" className={base} loading="eager" />;
  }

  return (
    <>
      <img
        src={logoDarkTextAsset.url}
        alt="XRounder"
        className={cn(base, "dark:hidden")}
        loading="eager"
      />
      <img
        src={logoAsset.url}
        alt=""
        aria-hidden
        className={cn(base, "hidden dark:block")}
        loading="eager"
      />
    </>
  );
}
