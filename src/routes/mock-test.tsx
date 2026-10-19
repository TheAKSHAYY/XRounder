import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import confetti from "canvas-confetti";
import {
  FlaskConical,
  Timer,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Award,
  Layers,
  HelpCircle,
  GraduationCap,
  Flag,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { playCelebrationSound, playComboSound, playWrongSound } from "@/lib/sound-fx";
import { SoundToggle } from "@/components/ui/sound-toggle";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mock-test")({
  head: () => ({
    meta: [
      { title: "Custom Mock Test & Exam Simulator · XRounder" },
      {
        name: "description",
        content:
          "Generate customized multi-unit mock exams with realistic timers, question banks, and instant unit-by-unit weakness analytics.",
      },
      { property: "og:title", content: "Custom Mock Test & Exam Simulator · XRounder" },
      {
        property: "og:description",
        content:
          "Generate customized multi-unit mock exams with realistic timers, question banks, and instant unit-by-unit weakness analytics.",
      },
      { property: "og:url", content: "https://www.xrounder.in/mock-test" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.xrounder.in/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Custom Mock Test & Exam Simulator · XRounder" },
      {
        name: "twitter:description",
        content:
          "Generate customized multi-unit mock exams with realistic timers, question banks, and instant unit-by-unit weakness analytics.",
      },
      { name: "twitter:image", content: "https://www.xrounder.in/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.xrounder.in/mock-test" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.xrounder.in/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Mock Test",
              item: "https://www.xrounder.in/mock-test",
            },
          ],
        }),
      },
    ],
  }),
  component: MockTestPage,
});

type CourseLite = { id: string; title: string; code: string; slug: string };
type SemesterLite = { id: string; number: number; title: string; course_id: string };
type SubjectLite = {
  id: string;
  title: string;
  code: string;
  slug: string;
  semester_id: string;
  hasQuizzes?: boolean;
};
type UnitLite = { id: string; number: number; title: string; subject_id: string };

type QuestionOption = {
  id: string;
  text: string;
  is_correct: boolean;
  order_index: number;
};

type MockQuestion = {
  id: string;
  quiz_id: string;
  unit_id: string;
  unit_number: number;
  unit_title: string;
  subject_title: string;
  subject_slug: string;
  course_slug: string;
  semester_number: number;
  prompt: string;
  explanation: string | null;
  difficulty: string | null;
  options: QuestionOption[];
};

type _ExamConfig = {
  courseId: string;
  semesterId: string;
  subjectId: string;
  selectedUnitIds: string[];
  questionCount: number;
  timeLimitMinutes: number; // 0 for untimed
};

type ExamState = "CONFIG" | "TESTING" | "RESULTS";

function MockTestPage() {
  const { user } = useAuth();
  const routerState = useRouterState();
  const searchParams = new URLSearchParams(routerState.location.search);
  const preselectedSubjectId = searchParams.get("subjectId");
  const preselectedUnitId = searchParams.get("unitId");

  const [examState, setExamState] = useState<ExamState>("CONFIG");

  // Selection states
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedSemesterId, setSelectedSemesterId] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(preselectedSubjectId || "");
  const [selectedUnitIds, setSelectedUnitIds] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(15);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(15);

  // Exam runtime states
  const [questions, setQuestions] = useState<MockQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const selectedAnswersRef = useRef<Record<string, string>>({});
  const questionsRef = useRef<MockQuestion[]>([]);
  const submitExamRef = useRef<() => void>(() => {});

  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);

  // 1. Fetch User Profile for auto-selecting course & semester
  const profileQuery = useQuery({
    queryKey: ["mock-test-profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("current_course_id, current_semester_id")
        .eq("user_id", user!.id)
        .maybeSingle();
      return data;
    },
  });

  // 2. Fetch Courses
  const coursesQuery = useQuery({
    queryKey: ["mock-test-courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, title, code, slug")
        .eq("status", "published")
        .is("deleted_at", null)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as CourseLite[];
    },
  });

  // Set default course
  useEffect(() => {
    if (coursesQuery.data && coursesQuery.data.length > 0 && !selectedCourseId) {
      const defaultCourse =
        coursesQuery.data.find((c) => c.id === profileQuery.data?.current_course_id) ||
        coursesQuery.data[0];
      setSelectedCourseId(defaultCourse.id);
    }
  }, [coursesQuery.data, profileQuery.data, selectedCourseId]);

  // 3. Fetch Semesters for selected course
  const semestersQuery = useQuery({
    queryKey: ["mock-test-semesters", selectedCourseId],
    enabled: !!selectedCourseId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("semesters")
        .select("id, number, title, course_id")
        .eq("course_id", selectedCourseId)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("number");
      if (error) throw error;
      return (data ?? []) as SemesterLite[];
    },
  });

  // Set default semester
  useEffect(() => {
    if (semestersQuery.data && semestersQuery.data.length > 0) {
      const defaultSem =
        semestersQuery.data.find((s) => s.id === profileQuery.data?.current_semester_id) ||
        semestersQuery.data[0];
      if (!selectedSemesterId || !semestersQuery.data.some((s) => s.id === selectedSemesterId)) {
        setSelectedSemesterId(defaultSem.id);
      }
    }
  }, [semestersQuery.data, profileQuery.data, selectedSemesterId]);

  // 4. Fetch Subjects for selected semester
  const subjectsQuery = useQuery({
    queryKey: ["mock-test-subjects", selectedSemesterId],
    enabled: !!selectedSemesterId,
    queryFn: async () => {
      const [{ data: subjects, error: subjErr }, { data: quizzes, error: quizErr }] =
        await Promise.all([
          supabase
            .from("subjects")
            .select("id, title, code, slug, semester_id")
            .eq("semester_id", selectedSemesterId)
            .eq("status", "published")
            .is("deleted_at", null)
            .order("code"),
          supabase
            .from("quizzes")
            .select("unit_id, units!inner(subject_id)")
            .eq("status", "published")
            .is("deleted_at", null),
        ]);
      if (subjErr) throw subjErr;
      if (quizErr) {
        console.warn("Could not query quizzes for default subject selection:", quizErr);
      }

      const subjectsWithQuizzes = new Set<string>();
      if (quizzes) {
        for (const q of quizzes) {
          const u = q.units as { subject_id?: string } | null;
          if (u?.subject_id) {
            subjectsWithQuizzes.add(u.subject_id);
          }
        }
      }

      return ((subjects ?? []) as SubjectLite[]).map((s) => ({
        ...s,
        hasQuizzes: subjectsWithQuizzes.has(s.id),
      }));
    },
  });

  // Set default subject (prefer a subject with published quizzes when available)
  useEffect(() => {
    if (subjectsQuery.data && subjectsQuery.data.length > 0) {
      if (!selectedSubjectId || !subjectsQuery.data.some((s) => s.id === selectedSubjectId)) {
        if (preselectedSubjectId && subjectsQuery.data.some((s) => s.id === preselectedSubjectId)) {
          setSelectedSubjectId(preselectedSubjectId);
        } else {
          const preferred = subjectsQuery.data.find((s) => s.hasQuizzes) ?? subjectsQuery.data[0];
          setSelectedSubjectId(preferred.id);
        }
      }
    }
  }, [subjectsQuery.data, selectedSubjectId, preselectedSubjectId]);

  // 5. Fetch Units for selected subject
  const unitsQuery = useQuery({
    queryKey: ["mock-test-units", selectedSubjectId],
    enabled: !!selectedSubjectId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("units")
        .select("id, number, title, subject_id")
        .eq("subject_id", selectedSubjectId)
        .order("number");
      if (error) throw error;
      return (data ?? []) as UnitLite[];
    },
  });

  // Auto-select units when units load (or preselected unit if specified)
  useEffect(() => {
    if (unitsQuery.data && unitsQuery.data.length > 0) {
      if (preselectedUnitId && unitsQuery.data.some((u) => u.id === preselectedUnitId)) {
        setSelectedUnitIds([preselectedUnitId]);
      } else {
        setSelectedUnitIds(unitsQuery.data.map((u) => u.id));
      }
    }
  }, [unitsQuery.data, preselectedUnitId]);

  // Unit Selection Presets
  const handlePresetSelect = (preset: "ALL" | "MID_SEM" | "CUSTOM") => {
    if (!unitsQuery.data) return;
    if (preset === "ALL") {
      setSelectedUnitIds(unitsQuery.data.map((u) => u.id));
    } else if (preset === "MID_SEM") {
      // Pick first 2 units
      const midUnits = unitsQuery.data.slice(0, 2).map((u) => u.id);
      setSelectedUnitIds(midUnits);
    }
  };

  const toggleUnitSelection = (unitId: string) => {
    setSelectedUnitIds((prev) =>
      prev.includes(unitId) ? prev.filter((id) => id !== unitId) : [...prev, unitId],
    );
  };

  // 6. Generate Mock Exam
  const handleStartExam = async () => {
    if (selectedUnitIds.length === 0) {
      toast.error("Please select at least one unit.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Fetch quizzes for selected units
      const { data: quizzes, error: qErr } = await supabase
        .from("quizzes")
        .select(
          `
          id,
          unit_id,
          units:units (
            id,
            number,
            title,
            subjects:subjects (
              id,
              title,
              slug,
              semesters:semesters (
                number,
                courses:courses (
                  slug
                )
              )
            )
          )
        `,
        )
        .in("unit_id", selectedUnitIds)
        .eq("status", "published");

      if (qErr) throw qErr;

      if (!quizzes || quizzes.length === 0) {
        toast.error("No published quizzes found for the selected units.");
        setIsSubmitting(false);
        return;
      }

      const quizIds = quizzes.map((q) => q.id);

      // Fetch questions from these quizzes
      const { data: rawQuestions, error: qstErr } = await supabase
        .from("quiz_questions")
        .select(
          `
          id,
          quiz_id,
          prompt,
          explanation,
          difficulty,
          quiz_options (
            id,
            text,
            is_correct,
            order_index
          )
        `,
        )
        .in("quiz_id", quizIds);

      if (qstErr) throw qstErr;

      if (!rawQuestions || rawQuestions.length === 0) {
        toast.error("No questions available for the selected units yet.");
        setIsSubmitting(false);
        return;
      }

      // Map quiz metadata to questions
      const quizMap = new Map<string, (typeof quizzes)[number]>();
      for (const q of quizzes) {
        quizMap.set(q.id, q);
      }

      const compiledQuestions: MockQuestion[] = rawQuestions
        .filter((q) => q.quiz_options && q.quiz_options.length >= 2)
        .map((q) => {
          const quizMeta = quizMap.get(q.quiz_id);
          const unitData = quizMeta?.units as
            | {
                id: string;
                number: number;
                title: string;
                subjects: {
                  id: string;
                  title: string;
                  slug: string;
                  semesters: {
                    number: number;
                    courses: {
                      slug: string;
                    } | null;
                  } | null;
                } | null;
              }
            | undefined;
          const subjectData = unitData?.subjects;
          const semesterData = subjectData?.semesters;
          const courseData = semesterData?.courses;

          return {
            id: q.id,
            quiz_id: q.quiz_id,
            unit_id: unitData?.id || "",
            unit_number: unitData?.number || 1,
            unit_title: unitData?.title || "General",
            subject_title: subjectData?.title || "Subject",
            subject_slug: subjectData?.slug || "subject",
            semester_number: semesterData?.number || 1,
            course_slug: courseData?.slug || "course",
            prompt: q.prompt,
            explanation: q.explanation,
            difficulty: q.difficulty,
            options: (q.quiz_options as QuestionOption[]).sort(
              (a, b) => a.order_index - b.order_index,
            ),
          };
        });

      // Shuffle and pick desired count
      const shuffled = [...compiledQuestions].sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, Math.min(questionCount, shuffled.length));

      if (selectedQuestions.length === 0) {
        toast.error("Could not compile mock test questions.");
        setIsSubmitting(false);
        return;
      }

      setQuestions(selectedQuestions);
      questionsRef.current = selectedQuestions;
      setCurrentIndex(0);
      setSelectedAnswers({});
      selectedAnswersRef.current = {};
      setFlaggedQuestions({});
      setTimeRemaining(timeLimitMinutes * 60);
      setTimeSpentSeconds(0);
      setExamState("TESTING");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to generate mock exam";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Exam
  const handleSubmitExam = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setExamState("RESULTS");

    // Use latest answers from ref to avoid stale closure
    const currentAnswers = selectedAnswersRef.current;
    const currentQuestions = questionsRef.current;

    // Calculate score
    let correct = 0;
    for (const q of currentQuestions) {
      const chosenOptionId = currentAnswers[q.id];
      const correctOption = q.options.find((o) => o.is_correct);
      if (chosenOptionId && correctOption && chosenOptionId === correctOption.id) {
        correct++;
      }
    }

    const total = currentQuestions.length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    if (pct >= 80) {
      playCelebrationSound();
      confetti({ particleCount: 85, spread: 70, origin: { y: 0.6 } });
    } else if (pct >= 50) {
      playComboSound(3);
    } else {
      playWrongSound();
    }
  }, []);

  useEffect(() => {
    submitExamRef.current = handleSubmitExam;
  }, [handleSubmitExam]);

  // Timer Tick
  useEffect(() => {
    if (examState === "TESTING") {
      timerRef.current = setInterval(() => {
        setTimeSpentSeconds((prev) => prev + 1);
        if (timeLimitMinutes > 0) {
          setTimeRemaining((prev) => {
            if (prev <= 1) {
              if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
              }
              submitExamRef.current();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [examState, timeLimitMinutes]);

  // Diagnostics Calculation for Results
  const diagnostics = useMemo(() => {
    if (examState !== "RESULTS" || questions.length === 0) return null;

    let totalCorrect = 0;
    const unitBreakdown: Record<
      string,
      {
        unitNumber: number;
        unitTitle: string;
        subjectSlug: string;
        courseSlug: string;
        semesterNumber: number;
        total: number;
        correct: number;
      }
    > = {};

    for (const q of questions) {
      const isAnswered = !!selectedAnswers[q.id];
      const correctOption = q.options.find((o) => o.is_correct);
      const isRight = isAnswered && selectedAnswers[q.id] === correctOption?.id;

      if (isRight) totalCorrect++;

      if (!unitBreakdown[q.unit_id]) {
        unitBreakdown[q.unit_id] = {
          unitNumber: q.unit_number,
          unitTitle: q.unit_title,
          subjectSlug: q.subject_slug,
          courseSlug: q.course_slug,
          semesterNumber: q.semester_number,
          total: 0,
          correct: 0,
        };
      }
      unitBreakdown[q.unit_id].total++;
      if (isRight) unitBreakdown[q.unit_id].correct++;
    }

    const scorePct = Math.round((totalCorrect / questions.length) * 100);
    const unitList = Object.values(unitBreakdown).sort((a, b) => a.unitNumber - b.unitNumber);

    return {
      totalQuestions: questions.length,
      totalCorrect,
      totalWrong: questions.length - totalCorrect,
      scorePct,
      passed: scorePct >= 60,
      unitList,
    };
  }, [examState, questions, selectedAnswers]);

  const activeQuestion = questions[currentIndex];

  const formatTimerDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 pb-16">
        {/* ========================================================================= */}
        {/* PHASE 1: CONFIGURATION VIEW                                              */}
        {/* ========================================================================= */}
        {examState === "CONFIG" && (
          <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
            {/* Header Banner */}
            <div className="mb-8 text-center sm:text-left rounded-xl border border-border bg-surface p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent mb-3">
                <Sparkles className="h-3.5 w-3.5" /> Exam Simulation Mode
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-normal tracking-tight text-foreground">
                Custom Multi-Unit Mock Exam
              </h1>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
                Combine questions across multiple syllabus units to simulate real mid-term and
                semester final exams.
              </p>
            </div>

            {/* Config Form Card */}
            <div className="space-y-6 rounded-xl border border-border bg-card p-6 sm:p-8 shadow-2xs">
              {/* Step 1: Course, Semester & Subject Selectors */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-3 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" /> 1. Select Subject
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Course */}
                  <div>
                    <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1.5">
                      Course / Program
                    </label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full h-11 rounded-2xl border border-border bg-muted/30 px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    >
                      {(coursesQuery.data ?? []).map((c) => (
                        <option key={c.id} value={c.id} className="bg-card text-foreground">
                          {c.code} — {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Semester */}
                  <div>
                    <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1.5">
                      Semester
                    </label>
                    <select
                      value={selectedSemesterId}
                      onChange={(e) => setSelectedSemesterId(e.target.value)}
                      className="w-full h-11 rounded-2xl border border-border bg-muted/30 px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    >
                      {(semestersQuery.data ?? []).map((s) => (
                        <option key={s.id} value={s.id} className="bg-card text-foreground">
                          Semester {s.number}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1.5">
                      Subject
                    </label>
                    <select
                      value={selectedSubjectId}
                      onChange={(e) => setSelectedSubjectId(e.target.value)}
                      className="w-full h-11 rounded-2xl border border-border bg-muted/30 px-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    >
                      {(subjectsQuery.data ?? []).map((sb) => (
                        <option key={sb.id} value={sb.id} className="bg-card text-foreground">
                          {sb.code} · {sb.title} {sb.hasQuizzes ? "✓ (Quizzes ready)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Unit Selection */}
              <div className="pt-4 border-t border-border/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                    <Layers className="h-4 w-4" /> 2. Choose Units to Test
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handlePresetSelect("MID_SEM")}
                      className="h-7 text-xs rounded-lg px-2.5"
                    >
                      Mid-Sem (Units 1–2)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handlePresetSelect("ALL")}
                      className="h-7 text-xs rounded-lg px-2.5"
                    >
                      All Units (Finals)
                    </Button>
                  </div>
                </div>

                {unitsQuery.isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Skeleton className="h-12 rounded-xl" />
                    <Skeleton className="h-12 rounded-xl" />
                  </div>
                ) : (unitsQuery.data ?? []).length === 0 ? (
                  <div className="p-4 rounded-xl bg-muted/30 text-xs text-muted-foreground text-center">
                    No units found for this subject.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(unitsQuery.data ?? []).map((u) => {
                      const isChecked = selectedUnitIds.includes(u.id);
                      return (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => toggleUnitSelection(u.id)}
                          className={cn(
                            "flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all",
                            isChecked
                              ? "border-accent bg-accent/10 text-foreground font-medium shadow-2xs"
                              : "border-border/70 bg-card hover:bg-muted/40 text-muted-foreground",
                          )}
                        >
                          <div
                            className={cn(
                              "h-5 w-5 rounded-md border flex items-center justify-center transition-colors shrink-0",
                              isChecked
                                ? "bg-accent border-accent text-accent-foreground"
                                : "border-muted-foreground/40",
                            )}
                          >
                            {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-xs font-mono block text-muted-foreground">
                              Unit {u.number}
                            </span>
                            <span className="text-sm truncate block text-foreground">
                              {u.title}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Step 3: Exam Parameters */}
              <div className="pt-4 border-t border-border/60">
                <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-3 flex items-center gap-2">
                  <Timer className="h-4 w-4" /> 3. Exam Timing &amp; Length
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Number of Questions */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                      Question Count
                    </label>
                    <div className="flex gap-2">
                      {[10, 15, 20, 30].map((count) => (
                        <Button
                          key={count}
                          type="button"
                          variant={questionCount === count ? "default" : "outline"}
                          size="sm"
                          onClick={() => setQuestionCount(count)}
                          className="flex-1 rounded-lg h-10 font-medium"
                        >
                          {count}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Time Limit */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                      Time Limit
                    </label>
                    <div className="flex gap-2">
                      {[
                        { label: "10m", val: 10 },
                        { label: "15m", val: 15 },
                        { label: "30m", val: 30 },
                        { label: "None", val: 0 },
                      ].map((t) => (
                        <Button
                          key={t.val}
                          type="button"
                          variant={timeLimitMinutes === t.val ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTimeLimitMinutes(t.val)}
                          className="flex-1 rounded-lg h-10 font-medium"
                        >
                          {t.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <Button
                  size="lg"
                  disabled={isSubmitting || selectedUnitIds.length === 0}
                  onClick={handleStartExam}
                  className="btn-cta w-full h-12 rounded-full text-sm font-medium gap-2 cursor-pointer shadow-soft-xs"
                >
                  <FlaskConical className="h-5 w-5" />
                  {isSubmitting ? "Generating Mock Exam…" : "Start Mock Exam Now"}
                  <ArrowRight className="h-5 w-5 ml-auto" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHASE 2: ACTIVE EXAM RUNNER                                              */}
        {/* ========================================================================= */}
        {examState === "TESTING" && activeQuestion && (
          <div className="container max-w-4xl mx-auto px-4 py-6">
            {/* Top Bar: Progress & Timer */}
            <div className="sticky top-16 z-30 mb-6 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-md p-4 shadow-soft">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground block">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <div className="text-xs font-semibold text-primary truncate max-w-xs sm:max-w-md">
                    Unit {activeQuestion.unit_number} · {activeQuestion.unit_title}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <SoundToggle className="h-8 rounded-xl px-2.5 text-xs" />
                  {timeLimitMinutes > 0 && (
                    <div className="flex items-center gap-1.5 rounded-xl border border-border/80 bg-muted/40 px-3 py-1.5 font-mono text-sm font-bold text-foreground">
                      <Timer className="h-4 w-4 text-primary animate-pulse" />
                      {formatTimerDisplay(timeRemaining)}
                    </div>
                  )}

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleSubmitExam}
                    className="rounded-xl h-9 text-xs font-bold"
                  >
                    Finish Exam
                  </Button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{
                    width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-2xs mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <Badge variant="outline" className="text-xs font-medium rounded-md bg-muted/40">
                  Unit {activeQuestion.unit_number}
                </Badge>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setFlaggedQuestions((prev) => ({
                      ...prev,
                      [activeQuestion.id]: !prev[activeQuestion.id],
                    }))
                  }
                  className={cn(
                    "h-8 px-2.5 rounded-lg text-xs font-medium gap-1.5",
                    flaggedQuestions[activeQuestion.id]
                      ? "bg-warning/15 text-warning-foreground dark:text-warning border border-warning/30"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Flag className="h-3.5 w-3.5" />
                  {flaggedQuestions[activeQuestion.id] ? "Flagged for Review" : "Flag"}
                </Button>
              </div>

              {/* Prompt */}
              <h2 className="font-sans text-lg sm:text-xl font-semibold text-foreground leading-snug mb-6">
                {activeQuestion.prompt}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {activeQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[activeQuestion.id] === option.id;
                  const optionLetters = ["A", "B", "C", "D", "E"];

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setSelectedAnswers((prev) => {
                          const next = {
                            ...prev,
                            [activeQuestion.id]: option.id,
                          };
                          selectedAnswersRef.current = next;
                          return next;
                        });
                        playComboSound(currentIndex + 1);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3.5 p-4 rounded-xl border text-left transition-all",
                        isSelected
                          ? "border-accent bg-accent/10 text-foreground font-medium shadow-2xs ring-1 ring-accent/40"
                          : "border-border/70 bg-card hover:bg-muted/40 text-foreground",
                      )}
                    >
                      <div
                        className={cn(
                          "h-7 w-7 rounded-lg border flex items-center justify-center text-xs font-semibold shrink-0 transition-colors",
                          isSelected
                            ? "bg-accent border-accent text-accent-foreground"
                            : "border-border bg-muted/40 text-muted-foreground",
                        )}
                      >
                        {optionLetters[idx] || idx + 1}
                      </div>
                      <span className="text-sm sm:text-base leading-snug flex-1">
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation & Question Palette Bar */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <Button
                variant="outline"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="h-11 rounded-xl px-4 font-bold text-xs gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>

              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[60%] py-1">
                {questions.map((q, idx) => {
                  const isAns = !!selectedAnswers[q.id];
                  const isFlag = !!flaggedQuestions[q.id];
                  const isCurr = idx === currentIndex;

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={cn(
                        "h-8 w-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all shrink-0",
                        isCurr && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                        isFlag
                          ? "bg-warning text-warning-foreground"
                          : isAns
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80",
                      )}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {currentIndex < questions.length - 1 ? (
                <Button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="h-11 rounded-xl px-4 font-bold text-xs gap-1.5"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="quiz"
                  onClick={handleSubmitExam}
                  className="h-11 rounded-xl px-5 font-bold text-xs gap-1.5"
                >
                  Submit Exam
                </Button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHASE 3: COMPREHENSIVE DIAGNOSTICS & SCORECARD                            */}
        {/* ========================================================================= */}
        {examState === "RESULTS" && diagnostics && (
          <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
            {/* Scorecard Hero */}
            <div className="rounded-xl border border-border bg-card p-6 sm:p-10 shadow-2xs text-center mb-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Award className="h-7 w-7" />
              </div>

              <h1 className="font-display text-2xl sm:text-4xl font-normal text-foreground">
                {diagnostics.passed
                  ? "Great Job! Exam Completed"
                  : "Exam Complete — Needs Revision"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                You scored{" "}
                <span className="font-bold text-foreground">{diagnostics.totalCorrect}</span> out of{" "}
                <span className="font-bold text-foreground">{diagnostics.totalQuestions}</span>{" "}
                questions ({diagnostics.scorePct}% accuracy) in {Math.floor(timeSpentSeconds / 60)}m{" "}
                {timeSpentSeconds % 60}s.
              </p>

              {/* Stats Strip */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mt-6">
                <div className="rounded-xl border border-border bg-surface p-3">
                  <span className="block text-[10px] uppercase font-bold text-muted-foreground">
                    Score
                  </span>
                  <span className="text-xl font-bold text-foreground">
                    {diagnostics.scorePct}%
                  </span>
                </div>
                <div className="rounded-xl border border-success/20 bg-success/10 p-3">
                  <span className="block text-[10px] uppercase font-bold text-success">
                    Correct
                  </span>
                  <span className="text-xl font-bold text-success">
                    {diagnostics.totalCorrect}
                  </span>
                </div>
                <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3">
                  <span className="block text-[10px] uppercase font-bold text-destructive">
                    Wrong
                  </span>
                  <span className="text-xl font-bold text-destructive">
                    {diagnostics.totalWrong}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                <Button
                  onClick={() => setExamState("CONFIG")}
                  variant="cta"
                  className="rounded-full h-11 px-6 font-medium text-sm gap-2"
                >
                  <RotateCcw className="h-4 w-4" /> Create New Mock Test
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full h-11 px-6 font-medium text-sm"
                >
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </div>

            {/* Unit-by-Unit Performance Breakdown */}
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-2xs mb-8">
              <h2 className="font-display text-lg sm:text-xl font-normal text-foreground mb-2 flex items-center gap-2">
                <Layers className="h-5 w-5 text-accent" /> Unit-by-Unit Performance Analytics
              </h2>
              <p className="text-xs text-muted-foreground mb-6">
                Pinpoint exactly which units need more study before university exams.
              </p>

              <div className="space-y-4">
                {diagnostics.unitList.map((unit) => {
                  const unitPct = Math.round((unit.correct / unit.total) * 100);
                  const isWeak = unitPct < 70;

                  return (
                    <div
                      key={unit.unitNumber}
                      className={cn(
                        "rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors",
                        isWeak ? "border-warning/30 bg-warning/5" : "border-border/60 bg-muted/20",
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant={isWeak ? "warning" : "outline"}
                            className="text-[10px] font-bold rounded-md"
                          >
                            Unit {unit.unitNumber}
                          </Badge>
                          <span className="font-bold text-sm text-foreground truncate">
                            {unit.unitTitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>
                            {unit.correct} / {unit.total} correct ({unitPct}%)
                          </span>
                          {isWeak ? (
                            <span className="inline-flex items-center gap-1 text-warning-foreground dark:text-warning font-medium text-[11px]">
                              <AlertCircle className="h-3.5 w-3.5" /> Needs Revision
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-success font-medium text-[11px]">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Well Mastered
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Direct Revision Button for Weak Units */}
                      <Button
                        asChild
                        size="sm"
                        variant={isWeak ? "warning" : "success"}
                        className="rounded-xl h-9 text-xs font-bold shrink-0"
                      >
                        <Link
                          to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                          params={{
                            courseSlug: unit.courseSlug,
                            semesterNumber: String(unit.semesterNumber),
                            subjectSlug: unit.subjectSlug,
                            unitNumber: String(unit.unitNumber),
                          }}
                        >
                          <BookOpen className="h-3.5 w-3.5 mr-1.5" /> Read Unit {unit.unitNumber}{" "}
                          Notes
                        </Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Question Explanations Review */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
              <h2 className="font-display text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" /> Question Review &amp; Explanations
              </h2>

              <div className="space-y-6 divide-y divide-border/60">
                {questions.map((q, idx) => {
                  const userAnsId = selectedAnswers[q.id];
                  const correctOption = q.options.find((o) => o.is_correct);
                  const isRight = userAnsId && userAnsId === correctOption?.id;

                  return (
                    <div key={q.id} className={idx > 0 ? "pt-6" : ""}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-muted-foreground font-mono">
                          Q{idx + 1}.
                        </span>
                        <Badge variant="outline" className="text-[10px] rounded-md">
                          Unit {q.unit_number}
                        </Badge>
                        {isRight ? (
                          <Badge variant="success" className="text-[10px]">
                            Correct
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="text-[10px]">
                            Incorrect
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-foreground mb-3">
                        {q.prompt}
                      </h3>

                      <div className="space-y-2 mb-3">
                        {q.options.map((opt) => {
                          const isUserChoice = userAnsId === opt.id;
                          const isCorrect = opt.is_correct;

                          return (
                            <div
                              key={opt.id}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm transition-colors",
                                isCorrect
                                  ? "border-success/40 bg-success/10 text-success font-semibold"
                                  : isUserChoice
                                    ? "border-destructive/40 bg-destructive/10 text-destructive font-medium"
                                    : "border-border/60 bg-muted/20 text-muted-foreground",
                              )}
                            >
                              <div
                                className={cn(
                                  "h-5 w-5 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold",
                                  isCorrect
                                    ? "bg-success text-success-foreground"
                                    : isUserChoice
                                      ? "bg-destructive text-white"
                                      : "bg-muted text-muted-foreground",
                                )}
                              >
                                {isCorrect ? "✓" : isUserChoice ? "✕" : "·"}
                              </div>
                              <span className="flex-1">{opt.text}</span>
                            </div>
                          );
                        })}
                      </div>

                      {q.explanation && (
                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
                          <span className="font-bold text-primary block mb-0.5">Explanation:</span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
