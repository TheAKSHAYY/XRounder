import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Flame,
  ListChecks,
  Target,
  Timer,
  TrendingUp,
  Trophy,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { fetchLearningStats, formatLearningTime } from "@/lib/profile";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/progress")({
  head: () => ({
    meta: [
      { title: "My Progress · XRounder" },
      {
        name: "description",
        content:
          "Track your unit completion, quiz accuracy, study streak and learning time across every subject.",
      },
      { property: "og:title", content: "My Progress · XRounder" },
      {
        property: "og:description",
        content: "Your units, quiz scores, streak and study time in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgressPage,
});

type ProgressRow = {
  id: string;
  unit_id: string;
  unit_title: string | null;
  subject_title: string | null;
  status: "not_started" | "in_progress" | "completed";
  progress_pct: number;
  last_activity_at: string;
};

type AttemptRow = {
  id: string;
  pct: number | null;
  passed: boolean | null;
  submitted_at: string | null;
  quizzes: { title: string | null } | null;
};

function Ring({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      className="relative grid size-24 shrink-0 place-items-center rounded-full"
      style={{
        background: `conic-gradient(var(--color-primary) ${clamped * 3.6}deg, var(--color-muted) 0deg)`,
      }}
      role="img"
      aria-label={`${clamped}% overall progress`}
    >
      <div className="grid size-[4.75rem] place-items-center rounded-full bg-card">
        <span className="font-display text-xl font-semibold text-foreground">{clamped}%</span>
      </div>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" aria-hidden />
        <span className="text-xs font-medium uppercase tracking-[0.12em]">{label}</span>
      </div>
      <p className="mt-2 font-display text-2xl font-semibold text-foreground">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ProgressPage() {
  const { user } = Route.useRouteContext();

  const statsQuery = useQuery({
    queryKey: ["progress-stats", user.id],
    queryFn: () => fetchLearningStats(user.id),
  });

  const unitsQuery = useQuery({
    queryKey: ["progress-units", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("student_progress", { _limit: 100 });
      if (error) throw error;
      return (data ?? []) as ProgressRow[];
    },
  });

  const attemptsQuery = useQuery({
    queryKey: ["progress-attempts", user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quiz_attempts")
        .select("id, pct, passed, submitted_at, quizzes(title)")
        .eq("user_id", user.id)
        .not("submitted_at", "is", null)
        .order("submitted_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data ?? []) as unknown as AttemptRow[];
    },
  });

  const stats = statsQuery.data;
  const units = unitsQuery.data ?? [];
  const attempts = attemptsQuery.data ?? [];

  const bySubject = useMemo(() => {
    const map = new Map<string, ProgressRow[]>();
    for (const row of units) {
      const key = row.subject_title ?? "Other";
      const list = map.get(key) ?? [];
      list.push(row);
      map.set(key, list);
    }
    return [...map.entries()]
      .map(([subject, rows]) => ({
        subject,
        rows,
        pct: Math.round(
          rows.reduce((sum, r) => sum + Number(r.progress_pct ?? 0), 0) / rows.length,
        ),
        completed: rows.filter((r) => r.status === "completed").length,
      }))
      .sort((a, b) => b.pct - a.pct);
  }, [units]);

  return (
    <main className="mx-auto w-full sm:max-w-6xl px-5 sm:px-6 pb-mobile-nav pt-8 sm:pt-12">
      <header className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft sm:flex-row sm:items-center sm:gap-7">
        {statsQuery.isLoading ? (
          <Skeleton className="size-24 rounded-full" />
        ) : (
          <Ring value={stats?.overallProgress ?? 0} />
        )}
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            My progress
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Every unit, quiz and streak in one place
          </h1>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground">
            {units.length === 0
              ? "Open a unit to start tracking your study progress."
              : `You have started ${units.length} unit${units.length === 1 ? "" : "s"} and completed ${stats?.unitsCompleted ?? 0}.`}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild size="sm" className="rounded-full">
              <Link to="/courses">
                Browse courses
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="rounded-full">
              <Link to="/bookmarks">Saved material</Link>
            </Button>
          </div>
        </div>
      </header>

      <section
        aria-label="Learning statistics"
        className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {statsQuery.isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[6.5rem] rounded-2xl" />
            ))
          : (
              [
                {
                  icon: Flame,
                  label: "Streak",
                  value: `${stats?.streakDays ?? 0}d`,
                  hint: "Consecutive study days",
                },
                {
                  icon: Target,
                  label: "Avg score",
                  value: `${stats?.avgScore ?? 0}%`,
                  hint: `Best ${stats?.bestScore ?? 0}%`,
                },
                {
                  icon: ListChecks,
                  label: "Questions",
                  value: `${stats?.questionsSolved ?? 0}`,
                  hint: `${stats?.completed ?? 0} quizzes finished`,
                },
                {
                  icon: Timer,
                  label: "Study time",
                  value: formatLearningTime(stats?.learningMinutes ?? 0),
                  hint: "Tracked in quizzes",
                },
              ] as const
            ).map((tile) => <StatTile key={tile.label} {...tile} />)}
      </section>

      <section aria-label="Subject progress" className="mt-8">
        <h2 className="font-display text-lg font-semibold text-foreground">Subject breakdown</h2>
        {unitsQuery.isLoading ? (
          <div className="mt-3 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : bySubject.length === 0 ? (
          <div className="mt-3">
            <EmptyState
              icon={BookOpen}
              title="No progress yet"
              description="Open any unit and your progress will show up here automatically."
              action={
                <Button asChild className="rounded-full">
                  <Link to="/courses">Find a subject</Link>
                </Button>
              }
            />
          </div>
        ) : (
          <ul className="mt-3 space-y-3">
            {bySubject.map((group) => (
              <li
                key={group.subject}
                className="rounded-2xl border border-border bg-card p-4 shadow-soft"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="min-w-0 truncate font-medium text-foreground">{group.subject}</p>
                  <Badge variant="secondary" className="rounded-full">
                    {group.completed}/{group.rows.length} units · {group.pct}%
                  </Badge>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-500"
                    style={{ width: `${Math.max(2, group.pct)}%` }}
                  />
                </div>
                <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                  {group.rows.slice(0, 6).map((row) => (
                    <li
                      key={row.id}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2
                        className={cn(
                          "size-4 shrink-0",
                          row.status === "completed" ? "text-primary" : "text-muted-foreground/40",
                        )}
                        aria-hidden
                      />
                      <span className="min-w-0 truncate">{row.unit_title ?? "Untitled unit"}</span>
                      <span className="ml-auto shrink-0 tabular-nums">
                        {Math.round(Number(row.progress_pct ?? 0))}%
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-label="Quiz performance" className="mt-8">
        <h2 className="font-display text-lg font-semibold text-foreground">Recent quiz scores</h2>
        {attemptsQuery.isLoading ? (
          <div className="mt-3 space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 rounded-xl" />
            ))}
          </div>
        ) : attempts.length === 0 ? (
          <div className="mt-3">
            <EmptyState
              icon={Trophy}
              title="No quizzes finished yet"
              description="Attempt a unit quiz to see your accuracy trend here."
            />
          </div>
        ) : (
          <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            {attempts.map((a) => (
              <li key={a.id} className="flex items-center gap-3 px-4 py-3">
                <TrendingUp
                  className={cn(
                    "size-4 shrink-0",
                    (a.pct ?? 0) >= 60 ? "text-primary" : "text-muted-foreground",
                  )}
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                  {a.quizzes?.title ?? "Quiz"}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {a.submitted_at ? new Date(a.submitted_at).toLocaleDateString() : ""}
                </span>
                <Badge
                  variant={a.passed ? "default" : "secondary"}
                  className="shrink-0 rounded-full tabular-nums"
                >
                  {Math.round(Number(a.pct ?? 0))}%
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
