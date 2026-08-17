import {
  Award,
  BookMarked,
  Clock,
  Flame,
  ListChecks,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatChip } from "@/components/ui/stat-chip";
import { formatLearningTime, type LearningStats } from "@/lib/profile";

export function LearningStatsCard({ stats, loading }: { stats: LearningStats; loading: boolean }) {
  const empty = !loading && stats.attempts === 0 && stats.unitsStarted === 0;

  return (
    <section
      id="activity"
      aria-labelledby="activity-heading"
      className="rounded-xl border border-border bg-surface p-4 shadow-soft sm:p-5"
    >
      <h2 id="activity-heading" className="text-h3 text-foreground">
        Learning activity
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Everything here is measured from your real quiz and study history.
      </p>

      {empty ? (
        <div className="mt-4">
          <EmptyState
            icon={Target}
            title="No activity yet"
            description="Attempt your first quiz or open a unit and your statistics will appear here."
            primaryAction={{ label: "Browse courses", to: "/courses" }}
          />
        </div>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            <StatChip
              label="Quizzes attempted"
              value={stats.attempts}
              icon={ListChecks}
              loading={loading}
            />
            <StatChip
              label="Quizzes completed"
              value={stats.completed}
              icon={Trophy}
              loading={loading}
            />
            <StatChip
              label="Average score"
              value={`${stats.avgScore}%`}
              icon={TrendingUp}
              loading={loading}
            />
            <StatChip
              label="Highest score"
              value={`${stats.bestScore}%`}
              icon={Award}
              loading={loading}
            />
            <StatChip
              label="Questions solved"
              value={stats.questionsSolved}
              icon={Target}
              loading={loading}
            />
            <StatChip
              label="Bookmarks"
              value={stats.bookmarks}
              icon={BookMarked}
              to="/bookmarks"
              loading={loading}
            />
            <StatChip
              label="Study streak"
              value={stats.streakDays === 1 ? "1 day" : `${stats.streakDays} days`}
              icon={Flame}
              loading={loading}
            />
            <StatChip
              label="Learning time"
              value={formatLearningTime(stats.learningMinutes)}
              icon={Clock}
              loading={loading}
            />
          </div>

          <div className="mt-4 rounded-lg border border-border/70 bg-background p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">Overall unit progress</span>
              <span className="text-muted-foreground tabular-nums">
                {stats.unitsCompleted}/{stats.unitsStarted} units · {stats.overallProgress}%
              </span>
            </div>
            <ProgressBar
              value={stats.overallProgress}
              label="Overall unit progress"
              className="mt-2"
            />
          </div>
        </>
      )}
    </section>
  );
}
