import { Check, Flame, Timer, X } from "lucide-react";
import { motion } from "motion/react";

import { fmtDuration } from "@/components/quiz/types";
import { Pill } from "@/components/quiz/quiz-shared";
import { SoundToggle } from "@/components/ui/sound-toggle";

export function QuizHeader({
  subject,
  unitLabel,
  quizTitle,
  currentIdx,
  total,
  correct,
  wrong,
  remainingSec,
  elapsed,
  progressPct,
  combo,
}: {
  subject: string | null | undefined;
  unitLabel: string | null | undefined;
  quizTitle: string;
  currentIdx: number;
  total: number;
  correct: number;
  wrong: number;
  remainingSec: number | null;
  elapsed: number;
  progressPct: number;
  combo?: number;
}) {
  return (
    <div className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-xs font-medium text-muted-foreground">
              {[subject, unitLabel].filter(Boolean).join(" · ") || quizTitle}
            </div>
            <div className="mt-0.5 font-display text-sm font-semibold tabular-nums text-foreground">
              Question {currentIdx + 1} of {total}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {combo && combo >= 2 ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="hidden sm:inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/15 px-2.5 py-1 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 shadow-xs"
              >
                <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500 animate-pulse" />
                <span>{combo} COMBO</span>
              </motion.div>
            ) : null}
            <Pill
              icon={<Check className="h-3.5 w-3.5 text-success" />}
              value={correct}
              label="correct"
            />
            <Pill
              icon={<X className="h-3.5 w-3.5 text-destructive" />}
              value={wrong}
              label="wrong"
            />
            <Pill
              icon={<Timer className="h-3.5 w-3.5 text-muted-foreground" />}
              value={remainingSec !== null ? fmtDuration(remainingSec) : fmtDuration(elapsed)}
              label={remainingSec !== null ? "left" : "elapsed"}
            />
            <SoundToggle />
          </div>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-accent shadow-xs"
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
            role="progressbar"
            aria-valuenow={Math.round(progressPct)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
  );
}
