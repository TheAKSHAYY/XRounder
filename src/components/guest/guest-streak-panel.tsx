import { Flame, Minus, Plus, Target } from "lucide-react";

import { useGuestActivity } from "@/lib/guest-activity";
import { setGuestDailyGoal } from "@/lib/guest";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Daily goal + streak for a guest, computed from real browser-local study
 * actions (note opened, note finished, quiz session, question answered).
 */
export function GuestStreakPanel() {
  const { streak } = useGuestActivity();
  const pct = Math.min(100, Math.round((streak.today / streak.dailyGoal) * 100));
  const left = Math.max(0, streak.dailyGoal - streak.today);

  return (
    <section className="mt-10 rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Daily goal
          </span>
          <h2 className="mt-1 flex items-center gap-2 font-display text-2xl font-semibold text-foreground">
            <Flame
              className={cn("h-6 w-6 shrink-0", streak.current > 0 ? "text-primary" : "text-muted-foreground")}
            />
            {streak.current > 0
              ? `${streak.current}-day streak`
              : "Start your streak today"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {streak.goalMet
              ? "Today's goal is done — come back tomorrow to keep the streak alive."
              : `Do ${left} more study action${left === 1 ? "" : "s"} today to keep the streak going.`}
          </p>
        </div>
        {streak.best > 0 && (
          <Badge variant="secondary" className="shrink-0 whitespace-nowrap rounded-full">
            Best {streak.best} {streak.best === 1 ? "day" : "days"}
          </Badge>
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            {streak.today} / {streak.dailyGoal} today
          </span>
          <span>{pct}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <ul className="flex items-end gap-2">
          {streak.last7.map((day) => (
            <li key={day.key} className="flex w-9 flex-col items-center gap-1">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-semibold",
                  day.met
                    ? "border-primary/40 bg-primary text-primary-foreground"
                    : day.count > 0
                      ? "border-accent/40 bg-accent/10 text-foreground"
                      : "border-border bg-background text-muted-foreground",
                  day.isToday && "ring-2 ring-accent/50",
                )}
              >
                {day.count > 0 ? day.count : "·"}
              </span>
              <span className="text-[10px] font-medium uppercase text-muted-foreground">
                {day.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Target className="h-3.5 w-3.5" /> Goal
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Lower daily goal"
            className="h-8 w-8 rounded-full"
            onClick={() => setGuestDailyGoal(streak.dailyGoal - 1)}
            disabled={streak.dailyGoal <= 1}
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="w-4 text-center text-sm font-semibold text-foreground">
            {streak.dailyGoal}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Raise daily goal"
            className="h-8 w-8 rounded-full"
            onClick={() => setGuestDailyGoal(streak.dailyGoal + 1)}
            disabled={streak.dailyGoal >= 10}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Streaks are stored in this browser only. Sign up to keep them on your account.
      </p>
    </section>
  );
}
