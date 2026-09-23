import { Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, ListChecks, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearPlan, toggleStep, useSavedPlan } from "@/lib/saved-plan";

export function ActivePlanPanel({ showLink = true }: { showLink?: boolean }) {
  const saved = useSavedPlan();
  if (!saved) return null;
  const doneCount = saved.done.filter(Boolean).length;
  const total = saved.plan.steps.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  return (
    <section className="rounded-3xl border border-border bg-background p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            Your active plan
          </span>
          <h2 className="mt-1 font-display text-xl font-semibold text-foreground">
            {saved.plan.title}
          </h2>
        </div>
        <span className="shrink-0 whitespace-nowrap text-sm font-semibold text-foreground">
          {doneCount}/{total} done
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <ul className="mt-4 grid gap-2">
        {saved.plan.steps.map((s, i) => (
          <li key={`${s.title}-${i}`}>
            <button
              type="button"
              onClick={() => toggleStep(i)}
              className="flex w-full items-start gap-3 rounded-2xl border border-border bg-surface p-3 text-left transition-colors hover:border-primary/40"
            >
              {saved.done[i] ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              ) : (
                <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
              )}
              <span className="min-w-0">
                <span
                  className={`block text-sm font-semibold ${saved.done[i] ? "text-muted-foreground line-through" : "text-foreground"}`}
                >
                  {s.title}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {s.minutes} min · {s.action}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {pct === 100 && (
        <p className="mt-4 rounded-2xl border border-primary/40 bg-primary/5 p-3 text-sm text-foreground">
          Plan complete. Make a fresh plan for what's next.
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {showLink && (
          <Button asChild size="sm" variant="outline" className="rounded-full">
            <Link to="/study-plan">
              <ListChecks className="mr-1.5 h-4 w-4" /> {pct === 100 ? "New plan" : "Open planner"}
            </Link>
          </Button>
        )}
        <Button size="sm" variant="ghost" className="rounded-full" onClick={clearPlan}>
          <Trash2 className="mr-1.5 h-4 w-4" /> Remove plan
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Ticking a step counts toward your daily goal. Saved in this browser.
      </p>
    </section>
  );
}
