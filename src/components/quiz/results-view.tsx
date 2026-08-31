import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle2,
  LayoutDashboard,
  ListChecks,
  RotateCcw,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MiniStat } from "@/components/quiz/quiz-shared";
import {
  fmtDuration,
  type AnswerState,
  type Attempt,
  type Option,
  type Question,
} from "@/components/quiz/types";

function ScoreRing({ pct }: { pct: number }) {
  const r = 68;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-44 w-44">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" strokeWidth="14" className="stroke-muted" />
        <motion.circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          className={pct >= 50 ? "stroke-success" : "stroke-destructive"}
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * Math.min(100, Math.max(0, pct))) / 100 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 14 }}
          className="font-display text-4xl font-semibold tabular-nums text-foreground"
        >
          {Math.round(pct)}%
        </motion.span>
        <span className="text-xs text-muted-foreground">score</span>
      </div>
    </div>
  );
}

export function ResultsView({
  quizTitle,
  passingPct,
  result,
  questions,
  optionsByQ,
  answers,
  elapsed,
  attemptNumber,
  onRetry,
  retryPending,
  context,
}: {
  quizTitle: string;
  passingPct: number;
  result: Attempt;
  questions: Question[];
  optionsByQ: Record<string, Option[]>;
  answers: Record<string, AnswerState>;
  elapsed: number;
  attemptNumber: number;
  onRetry: () => void;
  retryPending: boolean;
  context?: {
    unitId?: string;
    unitNumber?: number;
    unitTitle?: string;
    subject?: string | null;
    subjectSlug?: string | null;
    semesterNumber?: number | null;
    courseSlug?: string | null;
  } | null;
}) {
  const [showReview, setShowReview] = useState(false);
  const pct = Number(result.pct ?? 0);

  const summary = useMemo(() => {
    let correct = 0,
      wrong = 0,
      skipped = 0;
    for (const q of questions) {
      const a = answers[q.id];
      if (!a || a.status === "skipped") skipped++;
      else if (a.status === "correct") correct++;
      else wrong++;
    }
    const answered = correct + wrong;
    return {
      correct,
      wrong,
      skipped,
      accuracy: answered ? Math.round((correct / answered) * 100) : 0,
    };
  }, [questions, answers]);

  const message =
    pct >= 90
      ? "🏆 Outstanding!"
      : pct >= 75
        ? "🎉 Great work!"
        : pct >= 50
          ? "👍 Good attempt — keep practicing."
          : "📚 Needs revision — review mistakes below.";

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
      aria-labelledby="quiz-result-heading"
    >
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-10">
          <ScoreRing pct={pct} />
          <div className="text-center sm:text-left">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Attempt {Math.max(1, attemptNumber)} · {quizTitle}
            </div>
            <h1
              id="quiz-result-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground"
            >
              {message}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground tabular-nums font-medium">
              Score {result.score} / {result.max_score} · Pass mark {passingPct}%
            </p>
            <Badge
              variant={result.passed ? "default" : "secondary"}
              className="mt-3 rounded-full px-3 py-1 font-semibold"
            >
              {result.passed ? "Passed" : "Needs Review"}
            </Badge>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <MiniStat label="Questions" value={questions.length} tone="muted" />
          <MiniStat label="Correct" value={summary.correct} tone="positive" />
          <MiniStat label="Wrong" value={summary.wrong} tone="negative" />
          <MiniStat label="Skipped" value={summary.skipped} tone="muted" />
          <MiniStat label="Accuracy" value={`${summary.accuracy}%`} tone="muted" />
          <MiniStat label="Time" value={fmtDuration(elapsed)} tone="muted" />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <Button
            onClick={onRetry}
            disabled={retryPending}
            className="gap-1.5 rounded-xl font-semibold shadow-xs"
          >
            <RotateCcw className="h-4 w-4" /> {retryPending ? "Starting…" : "Retry quiz"}
          </Button>

          <Button
            variant="outline"
            className="gap-1.5 rounded-xl font-semibold"
            onClick={() => setShowReview((v) => !v)}
          >
            <ListChecks className="h-4 w-4" /> {showReview ? "Hide review" : "Review answers"}
          </Button>

          {context?.courseSlug &&
            context.semesterNumber &&
            context.subjectSlug &&
            context.unitNumber && (
              <Button asChild variant="outline" className="gap-1.5 rounded-xl font-semibold">
                <Link
                  to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                  params={{
                    courseSlug: context.courseSlug,
                    semesterNumber: String(context.semesterNumber),
                    subjectSlug: context.subjectSlug,
                    unitNumber: String(context.unitNumber),
                  }}
                >
                  <Target className="h-4 w-4" /> Back to Unit Notes
                </Link>
              </Button>
            )}

          {context?.courseSlug && context.semesterNumber && context.subjectSlug && (
            <Button asChild variant="outline" className="gap-1.5 rounded-xl font-semibold">
              <Link
                to="/courses/$courseSlug/$semesterNumber/$subjectSlug"
                params={{
                  courseSlug: context.courseSlug,
                  semesterNumber: String(context.semesterNumber),
                  subjectSlug: context.subjectSlug,
                }}
              >
                Subject Syllabus
              </Link>
            </Button>
          )}

          <Button asChild variant="ghost" className="gap-1.5 rounded-xl font-semibold ml-auto">
            <Link to="/dashboard">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <h2 className="font-display text-xl font-semibold text-foreground">
              <Trophy className="mr-2 inline h-5 w-5 text-primary" aria-hidden="true" />
              Review your answers
            </h2>
            <ol className="mt-4 space-y-4">
              {questions.map((q, idx) => {
                const a = answers[q.id];
                const opts = optionsByQ[q.id] ?? [];
                const status = a?.status ?? "skipped";
                const correctIds = a?.correct_option_ids ?? [];
                return (
                  <li
                    key={q.id}
                    className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-medium text-foreground">
                        {idx + 1}. {q.prompt}
                      </h3>
                      <Badge
                        className={[
                          "shrink-0 rounded-full",
                          status === "correct"
                            ? "bg-success text-success-foreground"
                            : status === "wrong"
                              ? "bg-destructive text-destructive-foreground"
                              : "bg-muted text-muted-foreground",
                        ].join(" ")}
                      >
                        {status === "correct"
                          ? "Correct"
                          : status === "wrong"
                            ? "Wrong"
                            : "Skipped"}
                      </Badge>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {opts.map((o) => {
                        const picked = a?.selected.includes(o.id);
                        const isRight = correctIds.includes(o.id);
                        return (
                          <li
                            key={o.id}
                            className={[
                              "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm",
                              isRight
                                ? "border-success/50 bg-success/10 text-foreground"
                                : picked
                                  ? "border-destructive/50 bg-destructive/10 text-foreground"
                                  : "border-border text-muted-foreground",
                            ].join(" ")}
                          >
                            {isRight ? (
                              <CheckCircle2 className="h-4 w-4 text-success" />
                            ) : picked ? (
                              <XCircle className="h-4 w-4 text-destructive" />
                            ) : (
                              <span className="h-4 w-4" />
                            )}
                            <span>{o.text}</span>
                            {picked && (
                              <span className="ml-auto text-xs text-muted-foreground">
                                your answer
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                    {(a?.explanation ?? q.explanation) && (
                      <p className="mt-3 rounded-xl bg-muted/60 p-3 text-sm text-foreground/80">
                        {a?.explanation ?? q.explanation}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
