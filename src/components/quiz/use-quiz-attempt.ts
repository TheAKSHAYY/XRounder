import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { notFound } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import confetti from "canvas-confetti";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import type { AnswerState, Attempt, Feedback, Option, Question } from "@/components/quiz/types";

const CORRECT_DELAY = 1000;
const WRONG_DELAY = 1800;

export function useQuizAttempt(quizId: string) {
  const { user } = useAuth();
  const qc = useQueryClient();

  const quizQ = useQuery({
    queryKey: ["public-quiz", quizId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quizzes")
        .select("*")
        .eq("id", quizId)
        .maybeSingle();
      if (error) throw error;
      if (!data || data.status !== "published") throw notFound();
      return data;
    },
  });

  // Subject / unit context for header and results navigation
  const contextQ = useQuery({
    queryKey: ["public-quiz-context", quizQ.data?.unit_id],
    enabled: !!quizQ.data?.unit_id,
    queryFn: async () => {
      const { data } = await supabase
        .from("units")
        .select(`
          id,
          number,
          title,
          subjects:subjects (
            id,
            title,
            slug,
            semesters:semesters (
              id,
              number,
              courses:courses (
                id,
                slug,
                title
              )
            )
          )
        `)
        .eq("id", quizQ.data!.unit_id)
        .maybeSingle();
      const row = data as any;
      if (!row) return null;
      return {
        unitId: row.id,
        unitNumber: row.number,
        unitTitle: row.title,
        unitLabel: `Unit ${row.number} · ${row.title}`,
        subject: row.subjects?.title ?? null,
        subjectSlug: row.subjects?.slug ?? null,
        semesterNumber: row.subjects?.semesters?.number ?? null,
        courseSlug: row.subjects?.semesters?.courses?.slug ?? null,
      };
    },
  });

  const questionsQ = useQuery({
    queryKey: ["public-quiz-questions", quizId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quiz_questions")
        .select("*")
        .eq("quiz_id", quizId)
        .order("order_index");
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
        .from("quiz_attempts")
        .select("*")
        .eq("quiz_id", quizId)
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
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
    let correct = 0,
      wrong = 0,
      skipped = 0,
      points = 0;
    for (const q of questions) {
      const a = answers[q.id];
      if (!a) continue;
      if (a.status === "correct") {
        correct++;
        points += q.points;
      } else if (a.status === "wrong") wrong++;
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

      // Reuse an unfinished attempt instead of creating an orphan on every reload.
      const { data: open } = await supabase
        .from("quiz_attempts")
        .select("*")
        .eq("quiz_id", quizId)
        .eq("user_id", user.id)
        .is("submitted_at", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (open) {
        const { data: prior } = await supabase
          .from("quiz_attempt_answers")
          .select("question_id, selected_option_ids, is_correct")
          .eq("attempt_id", open.id);
        return { attempt: open as Attempt, prior: prior ?? [], resumed: true };
      }

      const { data, error } = await supabase
        .from("quiz_attempts")
        .insert({ quiz_id: quizId, user_id: user.id })
        .select("*")
        .single();
      if (error) throw error;
      return {
        attempt: data as Attempt,
        prior: [] as {
          question_id: string;
          selected_option_ids: string[] | null;
          is_correct: boolean | null;
        }[],
        resumed: false,
      };
    },
    onSuccess: ({ attempt, prior, resumed }) => {
      const restored: Record<string, AnswerState> = {};
      for (const row of prior) {
        const sel = row.selected_option_ids ?? [];
        restored[row.question_id] = {
          selected: sel,
          status: sel.length === 0 ? "skipped" : row.is_correct ? "correct" : "wrong",
          correct_option_ids: [],
          explanation: questions.find((q) => q.id === row.question_id)?.explanation ?? null,
        };
      }
      const firstUnanswered = questions.findIndex((q) => !restored[q.id]);
      setActiveAttempt(attempt);
      setAnswers(restored);
      setSelection([]);
      setFeedback(null);
      setCurrentIdx(firstUnanswered === -1 ? 0 : firstUnanswered);
      setResult(null);
      setElapsed(0);
      setInstantFeedback(true);
      startedAtRef.current = Date.now();
      qc.invalidateQueries({ queryKey: ["public-quiz-attempts", quizId, user?.id] });
      if (resumed && prior.length > 0) toast.success("Resumed your unfinished attempt");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openAttempt = useMemo(
    () => (myAttemptsQ.data ?? []).find((a) => !a.submitted_at) ?? null,
    [myAttemptsQ.data],
  );

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
    onSuccess: async (a) => {
      setResult(a);
      setActiveAttempt(null);
      qc.invalidateQueries({ queryKey: ["public-quiz-attempts", quizId, user?.id] });
      // Reconcile local statuses with the server's authoritative grading
      const { data: graded } = await supabase
        .from("quiz_attempt_answers")
        .select("question_id, selected_option_ids, is_correct")
        .eq("attempt_id", a.id);
      if (graded?.length) {
        setAnswers((prev) => {
          const next = { ...prev };
          for (const row of graded) {
            const sel = row.selected_option_ids ?? [];
            next[row.question_id] = {
              selected: sel,
              status: sel.length === 0 ? "skipped" : row.is_correct ? "correct" : "wrong",
              correct_option_ids: prev[row.question_id]?.correct_option_ids ?? [],
              explanation: prev[row.question_id]?.explanation ?? null,
            };
          }
          return next;
        });
      }
      if ((a.pct ?? 0) >= 80) {
        confetti({
          particleCount: 140,
          spread: 78,
          origin: { y: 0.3 },
          disableForReducedMotion: true,
        });
        setTimeout(
          () =>
            confetti({
              particleCount: 90,
              spread: 100,
              origin: { y: 0.35 },
              disableForReducedMotion: true,
            }),
          320,
        );
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const clearTimer = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  };
  useEffect(() => clearTimer, []);

  const goToIndex = useCallback(
    (i: number, all: Record<string, AnswerState>) => {
      clearTimer();
      const q = questions[i];
      setCurrentIdx(i);
      const prev = q ? all[q.id] : undefined;
      setSelection(prev?.selected ?? []);
      setFeedback(
        prev && prev.status !== "skipped"
          ? {
              is_correct: prev.status === "correct",
              correct_option_ids: prev.correct_option_ids,
              explanation: prev.explanation,
            }
          : null,
      );
    },
    [questions],
  );

  const finish = useCallback(
    (all: Record<string, AnswerState>) => {
      clearTimer();
      submitMutation.mutate(all);
    },
    [submitMutation],
  );

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
          [current.id]: {
            selected: sel,
            status: "wrong",
            correct_option_ids: [],
            explanation: current.explanation,
          },
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
        setSelection((prev) =>
          prev.includes(optionId) ? prev.filter((x) => x !== optionId) : [...prev, optionId],
        );
        return;
      }
      const sel = [optionId];
      setSelection(sel);
      if (instantFeedback) void gradeNow(sel);
      else
        setAnswers((prev) => ({
          ...prev,
          [current.id]: {
            selected: sel,
            status: "wrong",
            correct_option_ids: [],
            explanation: current.explanation,
          },
        }));
    },
    [current, feedback, instantFeedback, gradeNow],
  );

  const skipQuestion = useCallback(() => {
    if (!current) return;
    const all = {
      ...answers,
      [current.id]: {
        selected: [],
        status: "skipped" as const,
        correct_option_ids: [],
        explanation: current.explanation,
      },
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
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
        return;
      }
      if (e.key.toLowerCase() === "s") {
        e.preventDefault();
        skipQuestion();
        return;
      }
      if (/^[1-9]$/.test(e.key)) {
        const opt = opts[parseInt(e.key, 10) - 1];
        if (opt) {
          e.preventDefault();
          selectOption(opt.id);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeAttempt, current, optionsByQ, goNext, goPrev, selectOption, skipQuestion]);

  const progressPct = total ? ((currentIdx + (feedback ? 1 : 0)) / total) * 100 : 0;
  const answeredCurrent = !!current && !!answers[current.id];

  return {
    user,
    quizQ,
    contextQ,
    questionsQ,
    optionsQ,
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
  };
}
