import { useEffect, useMemo } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, BookOpen, Check, Compass } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StudentHero } from "@/components/student/student-hero";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";


export const Route = createFileRoute("/courses/$courseSlug/$semesterNumber/")({
  head: () => ({ meta: [{ title: "Semester · BCA Gurukul" }] }),
  component: SemesterDetail,
});

type Subject = {
  id: string;
  code: string;
  slug: string;
  title: string;
};

type UnitRow = { id: string; subject_id: string; number: number };

type ProgressRow = {
  unit_id: string;
  progress_pct: number;
  status: "not_started" | "in_progress" | "completed";
  last_activity_at: string;
};

type SubjectStats = {
  subject: Subject;
  totalUnits: number;
  completedUnits: number;
  pct: number; // 0-100
  lastActivity: string | null;
  resumeUnitNumber: number | null;
  status: "not_started" | "in_progress" | "completed";
};


function SemesterDetail() {
  const { courseSlug, semesterNumber } = Route.useParams();
  const { user } = useAuth();
  const qc = useQueryClient();
  const queryKey = ["public", "sem", courseSlug, semesterNumber];

  const semQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const { data: course, error: ce } = await supabase
        .from("courses")
        .select("id, code, title, slug")
        .eq("slug", courseSlug)
        .eq("status", "published")
        .maybeSingle();
      if (ce) throw ce;
      if (!course) throw notFound();

      const { data: sem, error: se } = await supabase
        .from("semesters")
        .select("id, number, title, description")
        .eq("course_id", course.id)
        .eq("number", Number(semesterNumber))
        .eq("status", "published")
        .maybeSingle();
      if (se) throw se;
      if (!sem) throw notFound();

      const { data: subjects, error: sue } = await supabase
        .from("subjects")
        .select("id, code, slug, title")
        .eq("semester_id", sem.id)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("sort_order")
        .order("code");
      if (sue) throw sue;

      return { course, sem, subjects: (subjects ?? []) as Subject[] };
    },
  });

  const semesterId = semQuery.data?.sem.id;
  const courseId = semQuery.data?.course.id;
  const subjects = semQuery.data?.subjects ?? [];

  // Units + progress for aggregation
  const unitsQuery = useQuery({
    queryKey: ["public", "sem-units", semesterId],
    enabled: !!semesterId && subjects.length > 0,
    queryFn: async () => {
      const subjectIds = subjects.map((s) => s.id);
      const { data, error } = await supabase
        .from("units")
        .select("id, subject_id, number")
        .in("subject_id", subjectIds)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("number");
      if (error) throw error;
      return (data ?? []) as UnitRow[];
    },
  });

  const units = unitsQuery.data ?? [];

  const progressQuery = useQuery({
    queryKey: ["student", "sem-progress", user?.id, semesterId],
    enabled: !!user?.id && units.length > 0,
    queryFn: async () => {
      const unitIds = units.map((u) => u.id);
      const { data, error } = await supabase
        .from("progress_tracking")
        .select("unit_id, progress_pct, status, last_activity_at")
        .eq("user_id", user!.id)
        .in("unit_id", unitIds);
      if (error) throw error;
      return (data ?? []) as ProgressRow[];
    },
  });

  const progress = progressQuery.data ?? [];

  // Live-refresh
  useEffect(() => {
    const channel = supabase
      .channel(`public-sem-${courseSlug}-${semesterNumber}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "subjects", ...(semesterId ? { filter: `semester_id=eq.${semesterId}` } : {}) },
        () => qc.invalidateQueries({ queryKey }),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "semesters", ...(semesterId ? { filter: `id=eq.${semesterId}` } : {}) },
        () => qc.invalidateQueries({ queryKey }),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "courses", ...(courseId ? { filter: `id=eq.${courseId}` } : {}) },
        () => qc.invalidateQueries({ queryKey }),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semesterId, courseId, courseSlug, semesterNumber]);

  // ---------- aggregation ----------
  const stats: SubjectStats[] = useMemo(() => {
    const unitBySubject = new Map<string, UnitRow[]>();
    for (const u of units) {
      const arr = unitBySubject.get(u.subject_id) ?? [];
      arr.push(u);
      unitBySubject.set(u.subject_id, arr);
    }
    const progressByUnit = new Map<string, ProgressRow>();
    for (const p of progress) progressByUnit.set(p.unit_id, p);

    return subjects.map((s) => {
      const unitList = (unitBySubject.get(s.id) ?? []).sort((a, b) => a.number - b.number);
      const total = unitList.length;
      let completed = 0;
      let pctSum = 0;
      let lastActivity: string | null = null;
      let resumeUnit: UnitRow | null = null;

      for (const u of unitList) {
        const p = progressByUnit.get(u.id);
        if (!p) continue;
        pctSum += Number(p.progress_pct ?? 0);
        if (p.status === "completed") completed += 1;
        if (!lastActivity || p.last_activity_at > lastActivity) {
          lastActivity = p.last_activity_at;
          if (p.status !== "completed") resumeUnit = u;
        }
      }
      if (!resumeUnit) {
        resumeUnit = unitList.find((u) => (progressByUnit.get(u.id)?.status ?? "not_started") !== "completed") ?? unitList[0] ?? null;
      }

      const pct = total > 0 ? Math.round(pctSum / total) : 0;
      const status: SubjectStats["status"] =
        total > 0 && completed === total
          ? "completed"
          : lastActivity
            ? "in_progress"
            : "not_started";

      return {
        subject: s,
        totalUnits: total,
        completedUnits: completed,
        pct,
        lastActivity,
        resumeUnitNumber: resumeUnit?.number ?? null,
        status,
      };
    });
  }, [subjects, units, progress]);

  const overall = useMemo(() => {
    const inProgressOrDone = stats.filter((s) => s.status !== "not_started").length;
    const completedSubjects = stats.filter((s) => s.status === "completed").length;
    const avgPct = stats.length
      ? Math.round(stats.reduce((a, s) => a + s.pct, 0) / stats.length)
      : 0;
    // pick a subject to continue: most-recent activity, else first
    const withActivity = stats
      .filter((s) => s.lastActivity)
      .sort((a, b) => (b.lastActivity! > a.lastActivity! ? 1 : -1));
    const resume = withActivity[0] ?? stats[0] ?? null;
    return { inProgressOrDone, completedSubjects, avgPct, resume };
  }, [stats]);

  const firstName = useMemo(() => {
    const fullName =
      (user?.user_metadata?.full_name as string | undefined) ??
      user?.email?.split("@")[0] ??
      null;
    return fullName?.split(" ")[0] ?? null;
  }, [user]);

  const loadingCore = semQuery.isLoading;
  const loadingProgress = unitsQuery.isLoading || (!!user && progressQuery.isLoading);

  const heroCta = useMemo(() => {
    if (stats.length === 0) return null;
    const target = user && overall.resume ? overall.resume : stats[0];
    const label =
      user && overall.resume
        ? overall.resume.status === "not_started"
          ? `Start ${overall.resume.subject.title}`
          : `Continue ${overall.resume.subject.title}`
        : "Start your first subject";
    return { subjectSlug: target.subject.slug, label };
  }, [stats, overall.resume, user]);

  const heroSubtitle = (() => {
    if (stats.length === 0) return "Subjects for this semester haven't been published yet.";
    if (!user) return `${stats.length} subjects in this semester. Sign in to track your progress.`;
    if (overall.completedSubjects === stats.length)
      return `All ${stats.length} subjects completed. Beautifully done.`;
    if (overall.inProgressOrDone === 0)
      return `${stats.length} subjects ready. Pick one to begin.`;
    return `${overall.inProgressOrDone} of ${stats.length} subjects in progress · ${overall.completedSubjects} completed`;
  })();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <Breadcrumbs
          items={[
            { label: "Courses", to: "/courses" },
            {
              label: semQuery.data?.course.title ?? "Course",
              to: "/courses/$courseSlug",
              params: { courseSlug },
            },
            { label: `Semester ${semesterNumber}` },
          ]}
        />

        {/* ─── Hero ─── */}
        <StudentHero
          className="mt-5"
          loading={loadingCore}
          eyebrow={`${semQuery.data?.course.title ?? ""} · Semester ${semQuery.data?.sem.number ?? semesterNumber}`}
          title={
            firstName ? (
              <>
                Welcome back, <span className="text-primary">{firstName}</span>.
              </>
            ) : (
              <>Your learning workspace.</>
            )
          }
          description={heroSubtitle}
          progress={
            user && stats.length > 0
              ? {
                  value: overall.avgPct,
                  label: "Semester progress",
                  caption: "Overall progress",
                }
              : undefined
          }
          action={
            heroCta ? (
              <Button
                asChild
                size="lg"
                className="h-12 w-full gap-2 rounded-full px-6 text-sm font-semibold shadow-sm sm:w-auto"
              >
                <Link
                  to="/courses/$courseSlug/$semesterNumber/$subjectSlug"
                  params={{
                    courseSlug,
                    semesterNumber,
                    subjectSlug: heroCta.subjectSlug,
                  }}
                >
                  <span className="truncate">{heroCta.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </Button>
            ) : undefined
          }
        />

        {/* ─── Subjects ─── */}
        <section className="mt-14">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-h2 text-foreground">Subjects</h2>
            {stats.length > 0 && user && (
              <span className="text-xs font-medium tabular-nums text-muted-foreground">
                {overall.completedSubjects}/{stats.length} completed
              </span>
            )}
          </div>

          {loadingCore ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-48 rounded-lg" />
              <Skeleton className="h-48 rounded-lg" />
              <Skeleton className="h-48 rounded-lg" />
            </div>
          ) : stats.length === 0 ? (
            <EmptyState
              className="mt-6"
              icon={BookOpen}
              title="Subjects are on their way"
              description="Nothing has been published for this semester yet. Explore other semesters in this course while you wait."
              primaryAction={{
                label: "Browse semesters",
                to: "/courses/$courseSlug",
                params: { courseSlug },
                icon: Compass,
              }}
            />
          ) : (
            <ul className="mt-6 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {stats.map((s) => (
                <li key={s.subject.id} className="flex min-w-0">
                  <SubjectCard
                    stats={s}
                    loading={loadingProgress}
                    href={{
                      to: "/courses/$courseSlug/$semesterNumber/$subjectSlug",
                      params: {
                        courseSlug,
                        semesterNumber,
                        subjectSlug: s.subject.slug,
                      },
                    }}
                    showProgress={!!user}
                  />
                </li>
              ))}
            </ul>

          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}



function SubjectCard({
  stats,
  loading,
  href,
  showProgress,
}: {
  stats: SubjectStats;
  loading: boolean;
  href: {
    to: "/courses/$courseSlug/$semesterNumber/$subjectSlug";
    params: { courseSlug: string; semesterNumber: string; subjectSlug: string };
  };
  showProgress: boolean;
}) {
  const { subject, totalUnits, completedUnits, pct, lastActivity, status } = stats;
  const rel = formatRelativeDay(lastActivity);
  const isDone = status === "completed";

  const ctaLabel = !showProgress
    ? "Open"
    : isDone
      ? "Review"
      : status === "in_progress"
        ? "Continue"
        : "Start";

  return (
    <Link
      {...href}
      aria-label={`${subject.title} — ${ctaLabel}`}
      className="group relative flex h-full min-h-[13rem] w-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-surface p-5 interactive-card shadow-soft-xs ring-1 ring-inset ring-border/40 hover:border-primary/40 hover:ring-primary/20 active:border-primary/30 focus-visible:-translate-y-0.5 focus-visible:border-primary/40 focus-visible:shadow-soft-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6"
    >
      {/* Top accent sheen — subtle premium lighting, purely decorative */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent opacity-60 transition-opacity duration-200 group-hover:opacity-100 group-active:via-accent/60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all duration-200 group-hover:bg-primary/10 group-active:scale-95"
      />

      {/* Header: code chip + status badge, never wrapping into the title */}
      <div className="flex min-w-0 items-center gap-2">
        <span className="min-w-0 truncate rounded-md bg-surface-muted px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {subject.code}
        </span>
        {showProgress && (
          <span
            className={
              isDone
                ? "ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary"
                : status === "in_progress"
                  ? "ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground"
                  : "ml-auto inline-flex shrink-0 items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
            }
          >
            {isDone ? (
              <>
                <Check className="h-3 w-3" aria-hidden />
                Done
              </>
            ) : status === "in_progress" ? (
              `${pct}%`
            ) : (
              "New"
            )}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-3 text-h3 text-foreground line-clamp-2 [overflow-wrap:anywhere]">
        {subject.title}
      </h3>

      {/* Progress — promoted directly under title so it's instantly scannable */}
      {showProgress && !isDone && (
        <div className="mt-4">
          {loading ? (
            <Skeleton className="h-1.5 w-full rounded-full" />
          ) : (
            <ProgressBar value={pct} label={`${subject.title} progress`} />
          )}
        </div>
      )}

      {/* Spacer pushes footer to bottom for equal-height alignment */}
      <div className="flex-1" />

      {/* Footer: single meta line + right-aligned CTA */}
      <div className="mt-5 flex items-end justify-between gap-3 border-t border-border/60 pt-4">
        <div className="min-w-0 text-[11px] font-medium text-muted-foreground">
          <div className="tabular-nums">
            {totalUnits === 0
              ? "Units coming soon"
              : showProgress
                ? `${completedUnits} of ${totalUnits} units`
                : `${totalUnits} unit${totalUnits === 1 ? "" : "s"}`}
          </div>
          {showProgress && rel && (
            <div className="mt-0.5 truncate">Last studied {rel}</div>
          )}
        </div>

        <span className="subject-cta inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-transform duration-180 group-active:translate-x-0.5">
          {ctaLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-180 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 group-active:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}



