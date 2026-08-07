import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Standard page body wrapper for student/public routes — the counterpart of the
 * admin `PageContainer`. Centralises max-width, gutters and vertical rhythm on
 * an 8px scale so no route hand-rolls its own container again.
 *
 * default → max-w-6xl (catalog/landing), narrow → max-w-4xl (reading),
 * wide → max-w-7xl (dashboards).
 */
export function PageMain({
  children,
  width = "default",
  className,
}: {
  children: ReactNode;
  width?: "narrow" | "default" | "wide";
  className?: string;
}) {
  const max = width === "narrow" ? "max-w-4xl" : width === "wide" ? "max-w-7xl" : "max-w-6xl";
  return (
    <main className={cn("mx-auto w-full px-4 py-8 sm:px-6 sm:py-10 lg:py-12", max, className)}>
      {children}
    </main>
  );
}
