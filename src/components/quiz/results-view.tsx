import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  LayoutDashboard,
  RotateCcw,
  Sparkles,
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
import { cn } from "@/lib/utils";

function ScoreRing({ pct }: { pct: number }) {
  const r = 68;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-44 w-44 shrink-0">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" strokeWidth="14" className="stroke-muted" />
        <motion.circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          className={
            pct >= 70 ? "stroke-success" : pct >= 50 ? "stroke-warning" : "stroke-destructive"
          }
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
        <span className="text-xs text-muted-foreground font-medium">accuracy</span>
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

  const isMastered = pct >= 70;
  const unitLabel = context?.unitNumber ? `Unit ${context.unitNumber}` : "Unit";

  const message =
    pct >= 90
      ? "🏆 Outstanding Mastery!"
      : pct >= 70
        ? "🎉 Great Work — Unit Mastered!"
        : pct >= 50
          ? "👍 Good Attempt — Needs Targeted Revision"
          : "📚 Needs Revision Before Exams";

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
      aria-labelledby="quiz-result-heading"
    >
      {/* ─── 1. Scorecard Hero ─── */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-10">
          <ScoreRing pct={pct} />
          <div className="text-center sm:text-left flex-1 min-w-0">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Attempt {Math.max(1, attemptNumber)} · {quizTitle}
            </div>
            <h1
              id="quiz-result-heading"
              className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            >
              {message}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground tabular-nums font-medium">
              Score {result.score} / {result.max_score} · Target threshold {passingPct}%
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge
                variant={isMastered ? "success" : "warning"}
                className="rounded-full px-3 py-1 font-semibold text-xs"
              >
                {isMastered ? "Passed & Mastered" : "Revision Recommended"}
              </Badge>
              {summary.wrong > 0 && (
                <span className="text-xs text-muted-foreground">
                  · {summary.wrong} question{summary.wrong === 1 ? "" : "s"} missed
                </span>
              )}
            </div>
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
      </div>

      {/* ─── 2. WHAT SHOULD YOU DO NEXT? (Turns DATA into ACTION) ─── */}
      <div
        className={cn(
          "rounded-3xl border p-6 sm:p-8 shadow-soft transition-all",
          isMastered
            ? "border-success/30 bg-linear-to-br from-success/10 via-card to-card"
            : "border-warning/30 bg-linear-to-br from-warning/10 via-card to-card",
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary font-mono">
              <Sparkles className="h-3.5 w-3.5" /> What Should You Do Next?
            </div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
              {isMastered
                ? `Ready for the Next Step in ${context?.subject ?? "Your Course"}`
                : `Targeted Revision for ${unitLabel}: ${context?.unitTitle ?? quizTitle}`}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {isMastered
                ? `You have achieved strong mastery on this quiz (${Math.round(pct)}%). Move forward to the next syllabus unit, or test your retention with a multi-unit mock exam.`
                : `You missed ${summary.wrong} question${summary.wrong === 1 ? "" : "s"} in this attempt (${Math.round(pct)}% accuracy). Re-read the unit notes in the Unit Hub to solidify the concepts, then take a retest to prove your score improvement.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {!isMastered &&
              context?.courseSlug &&
              context.semesterNumber &&
              context.subjectSlug &&
              context.unitNumber && (
                <Button
                  asChild
                  variant="warning"
                  className="h-11 px-5 rounded-2xl text-xs font-bold shadow-xs"
                >
                  <Link
                    to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                    params={{
                      courseSlug: context.courseSlug,
                      semesterNumber: String(context.semesterNumber),
                      subjectSlug: context.subjectSlug,
                      unitNumber: String(context.unitNumber),
                    }}
                  >
                    <BookOpen className="h-4 w-4 mr-1.5" /> Start Unit Revision
                  </Link>
                </Button>
              )}

            {!isMastered && (
              <Button
                onClick={onRetry}
                disabled={retryPending}
                variant="outline"
                className="h-11 px-4 rounded-2xl text-xs font-bold"
              >
                <RotateCcw className="h-4 w-4 mr-1.5" />{" "}
                {retryPending ? "Starting…" : "Take Retest Now"}
              </Button>
            )}

            {isMastered && context?.courseSlug && context.semesterNumber && context.subjectSlug && (
              <Button
                asChild
                variant="cta"
                className="h-11 px-5 rounded-2xl text-xs font-bold shadow-xs"
              >
                <Link
                  to="/courses/$courseSlug/$semesterNumber/$subjectSlug"
                  params={{
                    courseSlug: context.courseSlug,
                    semesterNumber: String(context.semesterNumber),
                    subjectSlug: context.subjectSlug,
                  }}
                >
                  <span>Continue Subject Syllabus</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
            )}

            {isMastered && (
              <Button asChild variant="outline" className="h-11 px-4 rounded-2xl text-xs font-bold">
                <Link to="/mock-test">
                  <FlaskConical className="h-4 w-4 mr-1.5" /> Challenge Mock Exam
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ─── 3. Secondary Actions Toolbar ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl font-semibold text-xs h-9 gap-1.5"
            onClick={() => setShowReview((v) => !v)}
          >
            <ListChecks className="h-4 w-4 text-primary" />{" "}
            {showReview ? "Hide answer review" : "Review question explanations"}
          </Button>

          {context?.courseSlug &&
            context.semesterNumber &&
            context.subjectSlug &&
            context.unitNumber && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="rounded-xl text-xs h-9 font-medium text-muted-foreground hover:text-foreground"
              >
                <Link
                  to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                  params={{
                    courseSlug: context.courseSlug,
                    semesterNumber: String(context.semesterNumber),
                    subjectSlug: context.subjectSlug,
                    unitNumber: String(context.unitNumber),
                  }}
                >
                  <Target className="h-3.5 w-3.5 mr-1" /> Unit Hub
                </Link>
              </Button>
            )}
        </div>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="rounded-xl text-xs h-9 font-medium text-muted-foreground hover:text-foreground"
        >
          <Link to="/dashboard">
            <LayoutDashboard className="h-3.5 w-3.5 mr-1" /> Go to Dashboard
          </Link>
        </Button>
      </div>

      {/* ─── 4. Detailed Question Review ─── */}
      <AnimatePresence>
        {showReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden pt-4"
          >
            <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2 mb-4">
              <Trophy className="h-4 w-4 text-primary" aria-hidden="true" />
              Detailed Question Explanations
            </h2>
            <ol className="space-y-4">
              {questions.map((q, idx) => {
                const a = answers[q.id];
                const opts = optionsByQ[q.id] ?? [];
                const status = a?.status ?? "skipped";
                const correctIds = a?.correct_option_ids ?? [];
                return (
                  <li
                    key={q.id}
                    className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-foreground text-sm sm:text-base leading-snug">
                        {idx + 1}. {q.prompt}
                      </h3>
                      <Badge
                        className={cn(
                          "shrink-0 rounded-full text-[10px] font-bold uppercase",
                          status === "correct"
                            ? "bg-success text-success-foreground"
                            : status === "wrong"
                              ? "bg-destructive text-destructive-foreground"
                              : "bg-muted text-muted-foreground",
                        )}
                      >
                        {status === "correct"
                          ? "Correct"
                          : status === "wrong"
                            ? "Incorrect"
                            : "Skipped"}
                      </Badge>
                    </div>
                    <ul className="mt-3.5 space-y-2">
                      {opts.map((o) => {
                        const picked = a?.selected.includes(o.id);
                        const isRight = correctIds.includes(o.id);
                        return (
                          <li
                            key={o.id}
                            className={cn(
                              "flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm transition-colors",
                              isRight
                                ? "border-success/50 bg-success/10 text-foreground font-semibold"
                                : picked
                                  ? "border-destructive/50 bg-destructive/10 text-foreground font-semibold"
                                  : "border-border/60 text-muted-foreground bg-muted/20",
                            )}
                          >
                            {isRight ? (
                              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                            ) : picked ? (
                              <XCircle className="h-4 w-4 text-destructive shrink-0" />
                            ) : (
                              <span className="h-4 w-4 shrink-0 rounded-full border border-muted-foreground/30" />
                            )}
                            <span className="flex-1">{o.text}</span>
                            {picked && (
                              <span className="ml-auto text-[11px] text-muted-foreground font-mono">
                                (Your answer)
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                    {(a?.explanation ?? q.explanation) && (
                      <div className="mt-3 rounded-xl bg-muted/50 p-3 text-xs text-foreground/90 border-l-2 border-primary/50">
                        <span className="font-bold text-foreground block mb-0.5">Explanation:</span>
                        {a?.explanation ?? q.explanation}
                      </div>
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
