import { AnimatePresence, motion } from "motion/react";
import { Check, CheckCircle2, X, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kbd, MiniStat } from "@/components/quiz/quiz-shared";
import type { Feedback, Option, Question } from "@/components/quiz/types";

function OptionButton({
  letter,
  text,
  selected,
  isCorrectOption,
  revealed,
  disabled,
  onClick,
}: {
  letter: string;
  text: string;
  selected: boolean;
  isCorrectOption: boolean;
  revealed: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  const wrongPick = revealed && selected && !isCorrectOption;
  const rightPick = revealed && isCorrectOption;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      animate={
        rightPick && selected
          ? { scale: [1, 1.04, 1] }
          : wrongPick
            ? { x: [0, -8, 8, -6, 6, 0] }
            : { scale: 1, x: 0 }
      }
      transition={{ duration: wrongPick ? 0.4 : 0.32 }}
      aria-pressed={selected}
      className={[
        "flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        rightPick
          ? "border-success bg-success/15 shadow-[0_0_0_4px_color-mix(in_oklab,var(--success)_18%,transparent)]"
          : wrongPick
            ? "border-destructive bg-destructive/15"
            : selected
              ? "border-primary bg-primary/10"
              : "border-border bg-surface hover:border-primary/50 hover:bg-primary/5",
        disabled && !revealed ? "opacity-70" : "",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm font-semibold",
          rightPick
            ? "border-success bg-success text-success-foreground"
            : wrongPick
              ? "border-destructive bg-destructive text-destructive-foreground"
              : selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground",
        ].join(" ")}
        aria-hidden="true"
      >
        {rightPick ? <Check className="h-4 w-4" /> : wrongPick ? <X className="h-4 w-4" /> : letter}
      </span>
      <span className="min-w-0 flex-1 text-base leading-relaxed text-foreground">{text}</span>
    </motion.button>
  );
}

export function QuestionCard({
  current,
  options,
  selection,
  feedback,
  grading,
  instantFeedback,
  onSelectOption,
  onGradeNow,
  onGoNext,
  stats,
}: {
  current: Question;
  options: Option[];
  selection: string[];
  feedback: Feedback | null;
  grading: boolean;
  instantFeedback: boolean;
  onSelectOption: (optionId: string) => void;
  onGradeNow: (sel: string[]) => void;
  onGoNext: () => void;
  stats: { correct: number; wrong: number; skipped: number; accuracy: number };
}) {
  return (
    <section>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -36 }}
          transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
          className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-7"
        >
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {current.type === "multiple" ? "Select all that apply" : "Select one answer"}
          </div>
          <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">
            {current.prompt}
          </h2>

          <ul className="mt-6 space-y-3">
            {options.map((o, i) => (
              <li key={o.id}>
                <OptionButton
                  letter={String.fromCharCode(65 + i)}
                  text={o.text}
                  selected={selection.includes(o.id)}
                  isCorrectOption={!!feedback && feedback.correct_option_ids?.includes(o.id)}
                  revealed={!!feedback}
                  disabled={!!feedback || grading}
                  onClick={() => onSelectOption(o.id)}
                />
              </li>
            ))}
          </ul>

          {/* Multi-select check button */}
          {current.type === "multiple" && !feedback && (
            <Button
              className="mt-5 rounded-full"
              disabled={selection.length === 0 || grading}
              onClick={() => (instantFeedback ? onGradeNow(selection) : onGoNext())}
            >
              {grading ? "Checking…" : "Check answer"}
            </Button>
          )}

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={[
                  "mt-6 rounded-2xl border p-4 text-sm",
                  feedback.is_correct
                    ? "border-success/40 bg-success/10 text-success"
                    : "border-destructive/40 bg-destructive/10 text-destructive",
                ].join(" ")}
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center gap-2 font-semibold">
                  {feedback.is_correct ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  {feedback.is_correct
                    ? "Correct Answer!"
                    : `Wrong Answer! Correct answer: ${options
                        .filter((o) => feedback.correct_option_ids?.includes(o.id))
                        .map((o) => o.text)
                        .join(", ")}`}
                </div>
                {feedback.explanation && (
                  <p className="mt-2 text-foreground/80">{feedback.explanation}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-6 text-xs text-muted-foreground">
            Keys: <Kbd>1</Kbd>–<Kbd>{Math.min(options.length, 9)}</Kbd> answer · <Kbd>S</Kbd> skip ·{" "}
            <Kbd>←</Kbd>/<Kbd>→</Kbd> navigate
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Live stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MiniStat label="Correct" value={stats.correct} tone="positive" />
        <MiniStat label="Wrong" value={stats.wrong} tone="negative" />
        <MiniStat label="Skipped" value={stats.skipped} tone="muted" />
        <MiniStat label="Accuracy" value={`${stats.accuracy}%`} tone="muted" />
      </div>
    </section>
  );
}
