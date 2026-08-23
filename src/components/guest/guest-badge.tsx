import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Small, always-visible marker that the visitor is browsing without an
 * account. Doubles as a shortcut into signup so conversion is one tap away.
 */
export function GuestBadge({ className }: { className?: string }) {
  return (
    <Link
      to="/auth"
      search={{ mode: "signup" }}
      className={cn(
        "inline-flex min-h-8 items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/20",
        className,
      )}
      title="You're exploring as a guest — create a free account to save progress"
    >
      <Compass className="h-3.5 w-3.5" aria-hidden />
      Guest
    </Link>
  );
}
