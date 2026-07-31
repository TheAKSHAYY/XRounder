import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FlaskConical,
  LayoutDashboard,
  ListChecks,
  RotateCcw,
  SkipForward,
  Target,
  Timer,
  Trophy,
  X,
  XCircle,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { PublicHeader } from "./courses.index";

export const Route = createFileRoute("/quizzes/$quizId")({
  head: () => ({
    meta: [
      { title: "Quiz · BCA Gurukul" },
      { name: "description", content: "Take an interactive quiz with instant feedback and a detailed performance summary." },
      { property: "og:title", content: "Quiz · BCA Gurukul" },
      { property: "og:description", content: "Take an interactive quiz with instant feedback and a detailed performance summary." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

type Option = { id: string; question_id: string; text: string; order_index: number };
type Question = {
  id: string;
  quiz_id: string;
  type: "single" | "multiple" | "true_false";
  prompt: string;
  explanation: string | null;
  points: number;
  order_index: number;
};
type Attempt = {
  id: string;
  submitted_at: string | null;
  score: number | null;
  max_score: number | null;
  pct: number | null;
  passed: boolean | null;
  time_spent_seconds?: number | null;
};
type Feedback = {
  is_correct: boolean;
  correct_option_ids: string[];
  explanation: string | null;
};
type AnswerState = {
  selected: string[];
  status: "correct" | "wrong" | "skipped";
  correct_option_ids: string[];
  explanation: string | null;
};

const CORRECT_DELAY = 1000;
const WRONG_DELAY = 1800;

function fmtDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

function QuizPage() {
  const { quizId } = Route.useParams();
  const { user } = useAuth();
  const qc = useQueryClient();

  const quizQ = useQuery({
    queryKey: ["public-quiz", quizId],
    queryFn: async () => {
      const { data, error } = await supabase.from("quizzes").select("*").eq("id", quizId).maybeSingle();
      if (error) throw error;
      if (!data || data.status !== "published") throw notFound();
      return data;
    },
  });

  // Subject / unit context for the header
  const contextQ = useQuery({
    queryKey: ["public-quiz-context", quizQ.data?.unit_id],
    enabled: !!quizQ.data?.unit_id,
    queryFn: async () => {
      const { data } = await supabase
        .from("units")
        .select("id, number, title, subjects(id, title, slug)")
        .eq("id", quizQ.data!.unit_id)
        .maybeSingle();
      const row = data as unknown as
        | { number: number; title: string; subjects: { title: string } | null }
        | null;
      return row
        ? { unitLabel: `Unit ${row.number} · ${row.title}`, subject: row.subjects?.title ?? null }
        : null;
    },
  });

  const questionsQ = useQuery({
    queryKey: ["public-quiz-questions", quizId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quiz_questions").select("*").eq("quiz_id", quizId).order("order_index");
      if (error) throw error;
      return (data ?? []) as Question[];
    },
  });

  const optionsQ = useQuery({
    queryKey: ["public-quiz-options", quizId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_quiz_options", { _quiz_id: quizId });
      if (error) throw error;
      return (data ?? []) as Option[];
    },
  });

  const myAttemptsQ = useQuery({
    queryKey: ["public-quiz-attempts", quizId, user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quiz_attempts").select("*").eq("quiz_id", quizId).eq("user_id", user!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Attempt[];
    },
  });

  const [activeAttempt, setActiveAttempt] = useState<Attempt | null>(null);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [selection, setSelection] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [grading, setGrading] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [result, setResult] = useState<Attempt | null>(null);
  const [instantFeedback, setInstantFeedback] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  const startedAtRef = useRef<number | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const questions = questionsQ.data ?? [];
  const total = questions.length;
  const current = activeAttempt ? questions[currentIdx] : null;

  const optionsByQ = useMemo(() => {
    const map: Record<string, Option[]> = {};
    for (const o of optionsQ.data ?? []) (map[o.question_id] ??= []).push(o);
    return map;
  }, [optionsQ.data]);

  const stats = useMemo(() => {
    let correct = 0, wrong = 0, skipped = 0, points = 0;
    for (const q of questions) {
      const a = answers[q.id];
      if (!a) continue;
      if (a.status === "correct") { correct++; points += q.points; }
      else if (a.status === "wrong") wrong++;
      else skipped++;
    }
    const answered = correct + wrong;
    return {
      correct,
      wrong,
      skipped,
      points,
      answered,
      accuracy: answered ? Math.round((correct / answered) * 100) : 0,
    };
  }, [questions, answers]);

  const startMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Sign in to take this quiz");
      const { data, error } = await supabase
        .from("quiz_attempts").insert({ quiz_id: quizId, user_id: user.id }).select("*").single();
      if (error) throw error;
      return data as Attempt;
    },
    onSuccess: (a) => {
      setActiveAttempt(a);
      setAnswers({});
      setSelection([]);
      setFeedback(null);
      setCurrentIdx(0);
      setResult(null);
      setElapsed(0);
      setInstantFeedback(true);
      startedAtRef.current = Date.now();
      qc.invalidateQueries({ queryKey: ["public-quiz-attempts", quizId, user?.id] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const submitMutation = useMutation({
    mutationFn: async (finalAnswers: Record<string, AnswerState>) => {
      if (!activeAttempt) throw new Error("No active attempt");
      const payload: Record<string, string[]> = {};
      for (const q of questions) payload[q.id] = finalAnswers[q.id]?.selected ?? [];
      const { data, error } = await supabase.rpc("submit_quiz_attempt", {
        _attempt_id: activeAttempt.id,
        _answers: payload as never,
      });
      if (error) throw error;
      return data as unknown as Attempt;
    },
    onSuccess: (a) => {
      setResult(a);
      setActiveAttempt(null);
      qc.invalidateQueries({ queryKey: ["public-quiz-attempts", quizId, user?.id] });
      if ((a.pct ?? 0) >= 80) {
        confetti({ particleCount: 140, spread: 78, origin: { y: 0.3 }, disableForReducedMotion: true });
        setTimeout(() => confetti({ particleCount: 90, spread: 100, origin: { y: 0.35 }, disableForReducedMotion: true }), 320);
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const clearTimer = () => {
    if (advanceTimer.current) { clearTimeout(advanceTimer.current); advanceTimer.current = null; }
  };
  useEffect(() => clearTimer, []);

  const goToIndex = useCallback((i: number, all: Record<string, AnswerState>) => {
    clearTimer();
    const q = questions[i];
    setCurrentIdx(i);
    const prev = q ? all[q.id] : undefined;
    setSelection(prev?.selected ?? []);
    setFeedback(
      prev && prev.status !== "skipped"
        ? { is_correct: prev.status === "correct", correct_option_ids: prev.correct_option_ids, explanation: prev.explanation }
        : null,
    );
  }, [questions]);

  const finish = useCallback((all: Record<string, AnswerState>) => {
    clearTimer();
    submitMutation.mutate(all);
  }, [submitMutation]);

  const commitAndAdvance = useCallback(
    (questionId: string, state: AnswerState, delay: number) => {
      const all = { ...answers, [questionId]: state };
      setAnswers(all);
      const isLast = currentIdx >= total - 1;
      clearTimer();
      advanceTimer.current = setTimeout(() => {
        if (isLast) finish(all);
        else goToIndex(currentIdx + 1, all);
      }, delay);
    },
    [answers, currentIdx, total, finish, goToIndex],
  );

  const gradeNow = useCallback(
    async (sel: string[]) => {
      if (!current || !activeAttempt || grading) return;
      setGrading(true);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error } = await (supabase.rpc as any)("grade_quiz_answer", {
          _attempt_id: activeAttempt.id,
          _question_id: current.id,
          _selected: sel,
        });
        if (error) throw error;
        const fb = data as Feedback;
        setFeedback(fb);
        commitAndAdvance(
          current.id,
          {
            selected: sel,
            status: fb.is_correct ? "correct" : "wrong",
            correct_option_ids: fb.correct_option_ids ?? [],
            explanation: fb.explanation ?? current.explanation,
          },
          fb.is_correct ? CORRECT_DELAY : WRONG_DELAY,
        );
      } catch {
        // Grading RPC unavailable — fall back to classic "answer now, grade at the end".
        setInstantFeedback(false);
        setAnswers((prev) => ({
          ...prev,
          [current.id]: { selected: sel, status: "wrong", correct_option_ids: [], explanation: current.explanation },
        }));
      } finally {
        setGrading(false);
      }
    },
    [current, activeAttempt, grading, commitAndAdvance],
  );

  const selectOption = useCallback(
    (optionId: string) => {
      if (!current || feedback) return;
      const multi = current.type === "multiple";
      if (multi) {
        setSelection((prev) => (prev.includes(optionId) ? prev.filter((x) => x !== optionId) : [...prev, optionId]));
        return;
      }
      const sel = [optionId];
      setSelection(sel);
      if (instantFeedback) void gradeNow(sel);
      else setAnswers((prev) => ({ ...prev, [current.id]: { selected: sel, status: "wrong", correct_option_ids: [], explanation: current.explanation } }));
    },
    [current, feedback, instantFeedback, gradeNow],
  );

  const skipQuestion = useCallback(() => {
    if (!current) return;
    const all = {
      ...answers,
      [current.id]: { selected: [], status: "skipped" as const, correct_option_ids: [], explanation: current.explanation },
    };
    setAnswers(all);
    if (currentIdx >= total - 1) finish(all);
    else goToIndex(currentIdx + 1, all);
  }, [current, answers, currentIdx, total, finish, goToIndex]);

  const goNext = useCallback(() => {
    if (currentIdx >= total - 1) finish(answers);
    else goToIndex(currentIdx + 1, answers);
  }, [currentIdx, total, answers, finish, goToIndex]);

  const goPrev = useCallback(() => {
    if (currentIdx > 0) goToIndex(currentIdx - 1, answers);
  }, [currentIdx, answers, goToIndex]);

  // Elapsed timer
  useEffect(() => {
    if (!activeAttempt) return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - (startedAtRef.current ?? Date.now())) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [activeAttempt]);

  const timeLimitMin = quizQ.data?.time_limit_minutes as number | null | undefined;
  const remainingSec = timeLimitMin ? Math.max(0, timeLimitMin * 60 - elapsed) : null;
  useEffect(() => {
    if (remainingSec === 0 && activeAttempt && !submitMutation.isPending) finish(answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSec]);

  // Keyboard: 1-9 select, arrows navigate, s skip
  useEffect(() => {
    if (!activeAttempt || !current) return;
    const opts = optionsByQ[current.id] ?? [];
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") { e.preventDefault(); goNext(); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); return; }
      if (e.key.toLowerCase() === "s") { e.preventDefault(); skipQuestion(); return; }
      if (/^[1-9]$/.test(e.key)) {
        const opt = opts[parseInt(e.key, 10) - 1];
        if (opt) { e.preventDefault(); selectOption(opt.id); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeAttempt, current, optionsByQ, goNext, goPrev, selectOption, skipQuestion]);

  const progressPct = total ? ((currentIdx + (feedback ? 1 : 0)) / total) * 100 : 0;
  const answeredCurrent = !!current && !!answers[current.id];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      {/* Live quiz header */}
      {activeAttempt && quizQ.data && (
        <div className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
          <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-xs font-medium text-muted-foreground">
                  {[contextQ.data?.subject, contextQ.data?.unitLabel].filter(Boolean).join(" · ") || quizQ.data.title}
                </div>
                <div className="mt-0.5 font-display text-sm font-semibold tabular-nums text-foreground">
                  Question {currentIdx + 1} of {total}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Pill icon={<Check className="h-3.5 w-3.5 text-success" />} value={stats.correct} label="correct" />
                <Pill icon={<X className="h-3.5 w-3.5 text-destructive" />} value={stats.wrong} label="wrong" />
                <Pill
                  icon={<Timer className="h-3.5 w-3.5 text-muted-foreground" />}
                  value={remainingSec !== null ? fmtDuration(remainingSec) : fmtDuration(elapsed)}
                  label={remainingSec !== null ? "left" : "elapsed"}
                />
              </div>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-primary"
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
      )}

      <main className="mx-auto max-w-3xl px-4 py-8 pb-36 sm:px-6 sm:py-10">
        {!activeAttempt && !result && (
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All courses
          </Link>
        )}

        {/* Start screen */}
        {!activeAttempt && !result && quizQ.data && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <header className="mt-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                <FlaskConical className="h-4 w-4 text-primary" />
                {[contextQ.data?.subject, contextQ.data?.unitLabel].filter(Boolean).join(" · ") || "Practice quiz"}
              </div>
              <h1 className="mt-3 font-display text-3xl font-semibold text-foreground">{quizQ.data.title}</h1>
              {quizQ.data.description && <p className="mt-3 text-muted-foreground">{quizQ.data.description}</p>}
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                <Badge variant="outline" className="rounded-full">{total} questions</Badge>
                <Badge variant="outline" className="rounded-full">Pass {quizQ.data.passing_pct}%</Badge>
                {quizQ.data.time_limit_minutes && (
                  <Badge variant="outline" className="rounded-full">
                    <Clock className="mr-1 h-3 w-3" />{quizQ.data.time_limit_minutes} min
                  </Badge>
                )}
              </div>

              {!user ? (
                <div className="mt-6 rounded-2xl border border-border bg-background p-5 text-center">
                  <p className="text-muted-foreground">Sign in to take this quiz and track your results.</p>
                  <Link to="/auth" className="mt-3 inline-block"><Button className="rounded-full">Sign in</Button></Link>
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
                    {startMutation.isPending ? "Starting…" : "Start quiz"}
                  </Button>
                </>
              )}
            </header>

            {(myAttemptsQ.data ?? []).filter((a) => a.submitted_at).length > 0 && (
              <section className="mt-8">
                <h2 className="font-display text-lg font-semibold text-foreground">Your previous attempts</h2>
                <ul className="mt-3 space-y-2">
                  {(myAttemptsQ.data ?? []).filter((a) => a.submitted_at).map((a, i, arr) => (
                    <li key={a.id} className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 text-sm">
                      <span className="text-muted-foreground">Attempt {arr.length - i}</span>
                      <span className="flex items-center gap-3">
                        <span className="font-semibold tabular-nums text-foreground">{a.pct}%</span>
                        <Badge variant={a.passed ? "default" : "secondary"} className="rounded-full">
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

        {/* Active question */}
        {user && activeAttempt && current && (
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
                  {(optionsByQ[current.id] ?? []).map((o, i) => (
                    <li key={o.id}>
                      <OptionButton
                        letter={String.fromCharCode(65 + i)}
                        text={o.text}
                        selected={selection.includes(o.id)}
                        isCorrectOption={!!feedback && feedback.correct_option_ids?.includes(o.id)}
                        revealed={!!feedback}
                        disabled={!!feedback || grading}
                        onClick={() => selectOption(o.id)}
                      />
                    </li>
                  ))}
                </ul>

                {/* Multi-select check button */}
                {current.type === "multiple" && !feedback && (
                  <Button
                    className="mt-5 rounded-full"
                    disabled={selection.length === 0 || grading}
                    onClick={() => (instantFeedback ? void gradeNow(selection) : goNext())}
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
                        {feedback.is_correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        {feedback.is_correct
                          ? "Correct Answer!"
                          : `Wrong Answer! Correct answer: ${(optionsByQ[current.id] ?? [])
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
                  Keys: <Kbd>1</Kbd>–<Kbd>{Math.min((optionsByQ[current.id] ?? []).length, 9)}</Kbd> answer ·{" "}
                  <Kbd>S</Kbd> skip · <Kbd>←</Kbd>/<Kbd>→</Kbd> navigate
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
        )}

        {/* Result */}
        {result && quizQ.data && (
          <ResultScreen
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

      {/* Sticky nav */}
      {activeAttempt && current && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <Button variant="outline" className="gap-1 rounded-full" onClick={goPrev} disabled={currentIdx === 0}>
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <Button variant="ghost" className="gap-1 rounded-full" onClick={skipQuestion}>
              <SkipForward className="h-4 w-4" /> Skip
            </Button>
            {currentIdx < total - 1 ? (
              <Button className="gap-1 rounded-full" onClick={goNext} disabled={!answeredCurrent && !feedback}>
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

/* ---------- pieces ---------- */

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">{children}</kbd>;
}

function Pill({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium tabular-nums text-foreground">
      {icon}
      {value}
      <span className="hidden text-muted-foreground sm:inline">{label}</span>
    </span>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: React.ReactNode; tone: "positive" | "negative" | "muted" }) {
  const toneClass =
    tone === "positive" ? "text-success" : tone === "negative" ? "text-destructive" : "text-foreground";
  return (
    <div className="rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm">
      <div className={`font-display text-2xl font-semibold tabular-nums ${toneClass}`}>{value}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function OptionButton({
  letter, text, selected, isCorrectOption, revealed, disabled, onClick,
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

function ScoreRing({ pct }: { pct: number }) {
  const r = 68;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-44 w-44">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" strokeWidth="14" className="stroke-muted" />
        <motion.circle
          cx="80" cy="80" r={r} fill="none" strokeWidth="14" strokeLinecap="round"
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

function ResultScreen({
  quizTitle, passingPct, result, questions, optionsByQ, answers, elapsed, attemptNumber, onRetry, retryPending,
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
}) {
  const [showReview, setShowReview] = useState(false);
  const pct = Number(result.pct ?? 0);

  const summary = useMemo(() => {
    let correct = 0, wrong = 0, skipped = 0;
    for (const q of questions) {
      const a = answers[q.id];
      if (!a || a.status === "skipped") skipped++;
      else if (a.status === "correct") correct++;
      else wrong++;
    }
    const answered = correct + wrong;
    return { correct, wrong, skipped, accuracy: answered ? Math.round((correct / answered) * 100) : 0 };
  }, [questions, answers]);

  const message =
    pct >= 90 ? "🏆 Excellent!" : pct >= 75 ? "🎉 Very Good!" : pct >= 50 ? "👍 Good, keep practicing." : "📚 Needs Improvement.";

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
      aria-labelledby="quiz-result-heading"
    >
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-10">
          <ScoreRing pct={pct} />
          <div className="text-center sm:text-left">
            <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Attempt {Math.max(1, attemptNumber)} · {quizTitle}
            </div>
            <h1 id="quiz-result-heading" className="mt-2 font-display text-3xl font-semibold text-foreground">
              {message}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground tabular-nums">
              Score {result.score} / {result.max_score} · Pass mark {passingPct}%
            </p>
            <Badge variant={result.passed ? "default" : "secondary"} className="mt-3 rounded-full px-3 py-1">
              {result.passed ? "Passed" : "Did not pass"}
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

        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={onRetry} disabled={retryPending} className="gap-1.5 rounded-full">
            <RotateCcw className="h-4 w-4" /> {retryPending ? "Starting…" : "Retry quiz"}
          </Button>
          <Button variant="outline" className="gap-1.5 rounded-full" onClick={() => setShowReview((v) => !v)}>
            <ListChecks className="h-4 w-4" /> {showReview ? "Hide review" : "Review answers"}
          </Button>
          <Button asChild variant="outline" className="gap-1.5 rounded-full">
            <Link to="/courses"><Target className="h-4 w-4" /> Next unit</Link>
          </Button>
          <Button asChild variant="ghost" className="gap-1.5 rounded-full">
            <Link to="/dashboard"><LayoutDashboard className="h-4 w-4" /> Back to dashboard</Link>
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
                  <li key={q.id} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
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
                        {status === "correct" ? "Correct" : status === "wrong" ? "Wrong" : "Skipped"}
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
                            {picked && <span className="ml-auto text-xs text-muted-foreground">your answer</span>}
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
