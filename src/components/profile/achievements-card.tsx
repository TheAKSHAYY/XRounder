import { Lock, Trophy } from "lucide-react";

import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Skeleton } from "@/components/ui/skeleton";
import type { Achievement } from "@/lib/profile";

export function AchievementsCard({
  achievements,
  loading,
}: {
  achievements: Achievement[];
  loading: boolean;
}) {
  const unlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="rounded-xl border border-border bg-surface p-4 shadow-soft sm:p-5"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h2 id="achievements-heading" className="text-h3 text-foreground">
            Achievements &amp; badges
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Unlocked automatically as you study — nothing to claim.
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium tabular-nums text-muted-foreground">
          {unlocked}/{achievements.length}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-lg" />)
          : achievements.map((a) => (
              <div
                key={a.id}
                className={cn(
                  "flex min-w-0 flex-col rounded-lg border p-3",
                  a.unlocked
                    ? "border-accent/30 bg-accent/8"
                    : "border-dashed border-border/70 bg-background",
                )}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={cn(
                      "grid h-7 w-7 shrink-0 place-items-center rounded-md",
                      a.unlocked
                        ? "bg-accent/20 text-accent-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {a.unlocked ? (
                      <Trophy className="h-3.5 w-3.5" />
                    ) : (
                      <Lock className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <div
                      className={cn(
                        "truncate text-sm font-medium",
                        a.unlocked ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {a.title}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {a.unlocked ? a.description : a.requirement}
                    </p>
                  </div>
                </div>
                {!a.unlocked && (
                  <ProgressBar
                    value={a.progress}
                    label={`${a.title} progress`}
                    size="xs"
                    tone="muted"
                    className="mt-auto pt-3"
                  />
                )}
              </div>
            ))}
      </div>
    </section>
  );
}
