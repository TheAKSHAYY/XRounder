import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Circle } from "lucide-react";

import { useGuestActivity } from "@/lib/guest-activity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The five-step learning loop, ticked off by what this visitor actually did.
 * Every state comes from real browser-local activity — nothing is faked.
 */
export function GuestJourneyPanel() {
  const { journey, journeyPct, hasActivity } = useGuestActivity();
  const next = journey.find((s) => s.current) ?? null;

  return (
    <section className="mt-10 rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            Your learning loop
          </span>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            Learn → Practice → Detect → Revise → Retest
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {hasActivity
              ? "Each step ticks itself as you study — this is your own activity, live."
              : "Start with any unit note and watch the loop fill in as you go."}
          </p>
        </div>
        <Badge variant="secondary" className="shrink-0 whitespace-nowrap rounded-full">
          {journeyPct}% complete
        </Badge>
      </div>

      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500"
          style={{ width: `${journeyPct}%` }}
        />
      </div>

      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {journey.map((stage, i) => (
          <li
            key={stage.key}
            className={cn(
              "flex h-full flex-col rounded-2xl border p-4 transition-colors",
              stage.done
                ? "border-primary/40 bg-primary/5"
                : stage.current
                  ? "border-accent/50 bg-accent/5"
                  : "border-border bg-background",
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                  stage.done
                    ? "bg-primary text-primary-foreground"
                    : stage.current
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {stage.done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className="min-w-0 truncate text-sm font-semibold text-foreground">
                {stage.label}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{stage.detail}</p>
            {stage.current && (
              <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
                <Circle className="h-2 w-2 fill-current" /> Next up
              </span>
            )}
          </li>
        ))}
      </ol>

      {next?.href && (
        <div className="mt-6">
          <Button asChild size="lg" className="h-11 rounded-full px-6">
            <Link to={next.href}>
              {next.cta} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}
