import markAsset from "@/assets/xrounder-mark.png.asset.json";
import logoAsset from "@/assets/xrounder-logo.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * BrandMark — the XRounder logo mark (the red X with its flame accent).
 * Used in navbars, sidebars, footers, mobile layouts and the favicon.
 * The artwork is used as-is: transparent PNG, square box, aspect ratio kept.
 */
export function BrandMark({
  className,
  variant = "filled",
}: {
  className?: string;
  /**
   * Kept for call-site compatibility. "inverse" is used on dark surfaces and
   * adds a soft light plate so the mark keeps contrast.
   */
  variant?: "filled" | "inverse";
}) {
  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center",
        variant === "inverse" && "rounded-[28%] bg-primary-foreground/95 p-[10%]",
        className,
      )}
    >
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
 * BrandLockup — the full XRounder logo (mark + wordmark).
 * The supplied wordmark is near-white, so this lockup is only for dark
 * surfaces. On light surfaces use <BrandMark /> plus the "XRounder" text.
 */
export function BrandLockup({ className }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="XRounder"
      className={cn("h-10 w-auto object-contain", className)}
      loading="eager"
      decoding="async"
    />
  );
}
