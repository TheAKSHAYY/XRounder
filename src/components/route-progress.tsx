import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Thin top progress bar shown while a route navigation is in flight.
 * Gives instant feedback on tap, even before the next screen is ready.
 */
export function RouteProgress() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      return;
    }
    const t = setTimeout(() => setVisible(false), 220);
    return () => clearTimeout(t);
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-0.5 overflow-hidden"
    >
      <div
        className={
          isLoading
            ? "h-full w-full origin-left bg-primary animate-route-progress"
            : "h-full w-full bg-primary opacity-0 transition-opacity duration-200"
        }
      />
    </div>
  );
}
