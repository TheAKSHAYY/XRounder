import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  FlaskConical,
  SkipForward,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { QuizHeader } from "@/components/quiz/quiz-header";
import { QuestionCard } from "@/components/quiz/question-card";
import { ResultsView } from "@/components/quiz/results-view";
import { useQuizAttempt } from "@/components/quiz/use-quiz-attempt";

export const Route = createFileRoute("/quizzes/$quizId")({
  head: () => ({
    meta: [
      { title: "Quiz · BCA Gurukul" },
      {
        name: "description",
        content:
          "Take an interactive quiz with instant feedback and a detailed performance summary.",
      },
      { property: "og:title", content: "Quiz · BCA Gurukul" },
      {
        property: "og:description",
        content:
          "Take an interactive quiz with instant feedback and a detailed performance summary.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const { quizId } = Route.useParams();
  const {
    user,
    quizQ,
    contextQ,
    myAttemptsQ,
    questions,
    total,
    current,
    optionsByQ,
    stats,
    activeAttempt,
    answers,
    selection,
    feedback,
    grading,
    currentIdx,
    result,
    instantFeedback,
    elapsed,
    remainingSec,
    progressPct,
    answeredCurrent,
    openAttempt,
    startMutation,
    submitMutation,
    selectOption,
    skipQuestion,
    goNext,
    goPrev,
    finish,
    gradeNow,
  } = useQuizAttempt(quizId);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {activeAttempt && quizQ.data && (
        <QuizHeader
          subject={contextQ.data?.subject}
          unitLabel={contextQ.data?.unitLabel}
          quizTitle={quizQ.data.title}
          currentIdx={currentIdx}
          total={total}
          correct={stats.correct}
          wrong={stats.wrong}
          remainingSec={remainingSec}
          elapsed={elapsed}
          progressPct={progressPct}
        />
      )}

      <main className="mx-auto max-w-3xl px-4 py-8 pb-36 sm:px-6 sm:py-10">
        {!activeAttempt && !result && (
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All courses
          </Link>
        )}

        {!activeAttempt && !result && quizQ.data && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <header className="mt-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                <FlaskConical className="h-4 w-4 text-primary" />
                {[contextQ.data?.subject, contextQ.data?.unitLabel].filter(Boolean).join(" · ") ||
                  "Practice quiz"}
              </div>
              <h1 className="mt-3 font-display text-3xl font-semibold text-foreground">
                {quizQ.data.title}
              </h1>
              {quizQ.data.description && (
                <p className="mt-3 text-muted-foreground">{quizQ.data.description}</p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                <Badge variant="outline" className="rounded-full">
                  {total} questions
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  Pass {quizQ.data.passing_pct}%
                </Badge>
                {quizQ.data.time_limit_minutes && (
                  <Badge variant="outline" className="rounded-full">
                    <Clock className="mr-1 h-3 w-3" />
                    {quizQ.data.time_limit_minutes} min
                  </Badge>
                )}
              </div>

              {!user ? (
                <div className="mt-6 rounded-2xl border border-border bg-background p-5 text-center">
                  <p className="text-muted-foreground">
                    Sign in to take this quiz and track your results.
                  </p>
                  <Link to="/auth" className="mt-3 inline-block">
                    <Button className="rounded-full">Sign in</Button>
                  </Link>
                </div>
              ) : (
                <>
                  {quizQ.data.instructions && (
                    <div className="mt-6 whitespace-pre-wrap rounded-2xl border border-border bg-background p-5 text-sm text-muted-foreground">
                      {quizQ.data.instructions}
                    </div>
                  )}
                  <Button
                    size="lg"
                    className="mt-6 rounded-full px-8"
                    onClick={() => startMutation.mutate()}
                    disabled={startMutation.isPending || total === 0}
                  >
                    {startMutation.isPending
                      ? openAttempt
                        ? "Resuming…"
                        : "Starting…"
                      : openAttempt
                        ? "Resume quiz"
                        : "Start quiz"}
                  </Button>
                </>
              )}
            </header>

            {(myAttemptsQ.data ?? []).filter((a) => a.submitted_at).length > 0 && (
              <section className="mt-8">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Your previous attempts
                </h2>
                <ul className="mt-3 space-y-2">
                  {(myAttemptsQ.data ?? [])
                    .filter((a) => a.submitted_at)
                    .map((a, i, arr) => (
                      <li
                        key={a.id}
                        className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 text-sm"
                      >
                        <span className="text-muted-foreground">Attempt {arr.length - i}</span>
                        <span className="flex items-center gap-3">
                          <span className="font-semibold tabular-nums text-foreground">
                            {a.pct}%
                          </span>
                          <Badge
                            variant={a.passed ? "default" : "secondary"}
                            className="rounded-full"
                          >
                            {a.passed ? "Passed" : "Did not pass"}
                          </Badge>
                        </span>
                      </li>
                    ))}
                </ul>
              </section>
            )}
          </motion.div>
        )}

        {user && activeAttempt && current && (
          <QuestionCard
            current={current}
            options={optionsByQ[current.id] ?? []}
            selection={selection}
            feedback={feedback}
            grading={grading}
            instantFeedback={instantFeedback}
            onSelectOption={selectOption}
            onGradeNow={(sel) => void gradeNow(sel)}
            onGoNext={goNext}
            stats={stats}
          />
        )}

        {result && quizQ.data && (
          <ResultsView
            quizTitle={quizQ.data.title}
            passingPct={quizQ.data.passing_pct}
            result={result}
            questions={questions}
            optionsByQ={optionsByQ}
            answers={answers}
            elapsed={result.time_spent_seconds ?? elapsed}
            attemptNumber={(myAttemptsQ.data ?? []).filter((a) => a.submitted_at).length}
            onRetry={() => startMutation.mutate()}
            retryPending={startMutation.isPending}
          />
        )}
      </main>
      <SiteFooter />

      {activeAttempt && current && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <Button
              variant="outline"
              className="gap-1 rounded-full"
              onClick={goPrev}
              disabled={currentIdx === 0}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <Button variant="ghost" className="gap-1 rounded-full" onClick={skipQuestion}>
              <SkipForward className="h-4 w-4" /> Skip
            </Button>
            {currentIdx < total - 1 ? (
              <Button
                className="gap-1 rounded-full"
                onClick={goNext}
                disabled={!answeredCurrent && !feedback}
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="rounded-full"
                onClick={() => finish(answers)}
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? "Finishing…" : "Finish"}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
