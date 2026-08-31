import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  ChevronRight,
  GraduationCap,
  Layers,
  Loader2,
  Sparkles,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { LearningPrefs } from "@/lib/learning-prefs";

export type OnboardingWizardProps = {
  initialCourseId?: string;
  initialYear?: number;
  initialSemesterId?: string;
  onComplete: (prefs: LearningPrefs) => Promise<void> | void;
  onSkip?: () => void;
  isGuest?: boolean;
  submitLabel?: string;
};

type CourseItem = {
  id: string;
  code: string;
  title: string;
  slug: string;
  description: string | null;
  duration_years: number | null;
  total_semesters: number | null;
};

type SemesterItem = {
  id: string;
  course_id: string;
  number: number;
  title: string;
  description: string | null;
};

export function OnboardingWizard({
  initialCourseId,
  initialYear,
  initialSemesterId,
  onComplete,
  onSkip,
  isGuest = false,
  submitLabel = "Go to my dashboard",
}: OnboardingWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId ?? "");
  const [selectedYear, setSelectedYear] = useState<number>(initialYear ?? 1);
  const [selectedSemesterId, setSelectedSemesterId] = useState<string>(initialSemesterId ?? "");
  const [saving, setSaving] = useState(false);

  // 1. Fetch published courses
  const coursesQuery = useQuery({
    queryKey: ["onboarding", "courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, code, title, slug, description, duration_years, total_semesters")
        .eq("status", "published")
        .is("deleted_at", null)
        .order("sort_order", { ascending: true })
        .order("title");
      if (error) throw error;
      return (data ?? []) as CourseItem[];
    },
  });

  const courses = coursesQuery.data ?? [];
  const selectedCourse = useMemo(
    () => courses.find((c) => c.id === selectedCourseId) ?? null,
    [courses, selectedCourseId],
  );

  // Calculate available academic years based on course duration
  const availableYears = useMemo(() => {
    if (!selectedCourse) return [1, 2, 3];
    const totalSems = selectedCourse.total_semesters ?? 6;
    const yearsCount = selectedCourse.duration_years
      ? Math.round(Number(selectedCourse.duration_years))
      : Math.max(1, Math.ceil(totalSems / 2));
    return Array.from({ length: yearsCount }, (_, i) => i + 1);
  }, [selectedCourse]);

  // 2. Fetch semesters for selected course
  const semestersQuery = useQuery({
    queryKey: ["onboarding", "semesters", selectedCourseId],
    enabled: !!selectedCourseId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("semesters")
        .select("id, course_id, number, title, description")
        .eq("course_id", selectedCourseId)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("number", { ascending: true });
      if (error) throw error;
      return (data ?? []) as SemesterItem[];
    },
  });

  const allSemesters = semestersQuery.data ?? [];

  // Filter semesters matching the selected academic year (e.g. Year 1 = Sem 1 & 2)
  const availableSemesters = useMemo(() => {
    if (!allSemesters.length) return [];
    const minSem = (selectedYear - 1) * 2 + 1;
    const maxSem = selectedYear * 2;
    const filtered = allSemesters.filter((s) => s.number >= minSem && s.number <= maxSem);
    return filtered.length > 0 ? filtered : allSemesters;
  }, [allSemesters, selectedYear]);

  const selectedSemester = useMemo(
    () => allSemesters.find((s) => s.id === selectedSemesterId) ?? null,
    [allSemesters, selectedSemesterId],
  );

  // Handle completion
  async function handleFinish() {
    if (!selectedCourse || !selectedSemester) return;
    setSaving(true);
    try {
      const prefs: LearningPrefs = {
        courseId: selectedCourse.id,
        courseTitle: selectedCourse.title,
        courseCode: selectedCourse.code,
        year: selectedYear,
        semesterId: selectedSemester.id,
        semesterNumber: selectedSemester.number,
        semesterTitle: selectedSemester.title,
      };
      await onComplete(prefs);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ─── Top progress bar ─── */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          <span className="inline-flex items-center gap-1.5 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Step {step} of 3
          </span>
          <span>
            {step === 1 && "Choose Program"}
            {step === 2 && "Choose Year"}
            {step === 3 && "Choose Semester"}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                s <= step ? "bg-primary" : "bg-muted",
              )}
            />
          ))}
        </div>
      </div>

      {/* ─── Step 1: Program / Course Selection ─── */}
      {step === 1 && (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              What program are you studying?
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Select your academic degree to get syllabus-aligned subjects, units, and past papers.
            </p>
          </div>

          {coursesQuery.isLoading ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <Skeleton className="h-28 rounded-2xl" />
              <Skeleton className="h-28 rounded-2xl" />
              <Skeleton className="h-28 rounded-2xl" />
              <Skeleton className="h-28 rounded-2xl" />
            </div>
          ) : courses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted-foreground">
              No courses published yet. Please check back soon.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {courses.map((c) => {
                const active = c.id === selectedCourseId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelectedCourseId(c.id);
                      setSelectedSemesterId("");
                      // Reset year if it exceeds course years
                      const maxYear = Math.ceil((c.total_semesters ?? 6) / 2);
                      if (selectedYear > maxYear) setSelectedYear(1);
                    }}
                    className={cn(
                      "group relative flex flex-col items-start p-5 text-left rounded-2xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      active
                        ? "border-primary bg-primary/5 shadow-soft ring-1 ring-primary"
                        : "border-border bg-surface hover:border-primary/40 hover:bg-surface-muted",
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                        {c.code}
                      </span>
                      {active ? (
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      ) : (
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-base font-semibold text-foreground leading-snug">
                      {c.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <GraduationCap className="h-3.5 w-3.5 text-muted-foreground/70" />
                      <span>{c.total_semesters ?? 6} Semesters</span>
                      {c.duration_years && <span>· {c.duration_years} Years</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border">
            {onSkip && isGuest ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onSkip}
                className="text-muted-foreground"
              >
                Skip for now
              </Button>
            ) : (
              <div />
            )}
            <Button
              type="button"
              size="lg"
              className="gap-2 px-6"
              disabled={!selectedCourseId}
              onClick={() => setStep(2)}
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      )}

      {/* ─── Step 2: Academic Year Selection ─── */}
      {step === 2 && (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              {selectedCourse?.code} · {selectedCourse?.title}
            </span>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Which year are you in?
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              We will filter your semesters and subjects for this academic year.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {availableYears.map((yearNum) => {
              const active = selectedYear === yearNum;
              const suffix =
                yearNum === 1 ? "st" : yearNum === 2 ? "nd" : yearNum === 3 ? "rd" : "th";
              const semsInYear = `Semesters ${(yearNum - 1) * 2 + 1} & ${yearNum * 2}`;

              return (
                <button
                  key={yearNum}
                  type="button"
                  onClick={() => {
                    setSelectedYear(yearNum);
                    setSelectedSemesterId("");
                  }}
                  className={cn(
                    "group relative flex flex-col items-start p-6 text-left rounded-2xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    active
                      ? "border-primary bg-primary/5 shadow-soft ring-1 ring-primary"
                      : "border-border bg-surface hover:border-primary/40 hover:bg-surface-muted",
                  )}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary font-display font-semibold text-lg">
                      {yearNum}
                    </span>
                    {active && (
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {yearNum}
                    {suffix} Year
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{semsInYear}</p>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => setStep(1)}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              type="button"
              size="lg"
              className="gap-2 px-6"
              disabled={!selectedYear}
              onClick={() => setStep(3)}
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      )}

      {/* ─── Step 3: Semester Selection ─── */}
      {step === 3 && (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              {selectedCourse?.code} · Year {selectedYear}
            </span>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Select your current semester
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your dashboard will immediately showcase all notes, units, and practice for this
              semester.
            </p>
          </div>

          {semestersQuery.isLoading ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <Skeleton className="h-32 rounded-2xl" />
              <Skeleton className="h-32 rounded-2xl" />
            </div>
          ) : availableSemesters.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted-foreground">
              No semesters available for this selection yet.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {availableSemesters.map((s) => {
                const active = s.id === selectedSemesterId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSemesterId(s.id)}
                    className={cn(
                      "group relative flex flex-col items-start p-6 text-left rounded-2xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      active
                        ? "border-primary bg-primary/5 shadow-soft ring-1 ring-primary"
                        : "border-border bg-surface hover:border-primary/40 hover:bg-surface-muted",
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary font-display font-bold text-xl">
                        S{s.number}
                      </span>
                      {active ? (
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      ) : (
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                      Semester {s.number}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {s.title || `Standard curriculum for Semester ${s.number}`}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="gap-2"
              disabled={saving}
              onClick={() => setStep(2)}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              type="button"
              size="lg"
              className="gap-2 px-7"
              disabled={!selectedSemesterId || saving}
              onClick={handleFinish}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                </>
              ) : (
                <>
                  {submitLabel} <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
