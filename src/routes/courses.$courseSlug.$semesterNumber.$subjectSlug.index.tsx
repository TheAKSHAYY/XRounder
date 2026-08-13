import { useMemo } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  FileStack,
  FileText,
  FileType,
  Link2,
  ListChecks,
  PlayCircle,
  Presentation,
  Sparkles,
  Video,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatChip } from "@/components/ui/stat-chip";
import { StudentHero } from "@/components/student/student-hero";
import { cn } from "@/lib/utils";
import { formatRelativeDay } from "@/lib/format";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";


export const Route = createFileRoute("/courses/$courseSlug/$semesterNumber/$subjectSlug/")({
  head: () => ({ meta: [{ title: "Subject · BCA Gurukul" }] }),
  component: SubjectDetail,
});

type UnitRow = {
  id: string;
  number: number;
  title: string;
  summary: string | null;
};

type ProgressRow = {
  unit_id: string;
  progress_pct: number;
  status: "not_started" | "in_progress" | "completed";
  last_activity_at: string;
};

type UnitStatus = "not_started" | "in_progress" | "completed";

type ContentBucket = {
  note: number;
  pdf: number;
  ppt: number;
  video: number;
  assignment: number;
  link: number;
  total: number;
};

function emptyContentBucket(): ContentBucket {
  return { note: 0, pdf: 0, ppt: 0, video: 0, assignment: 0, link: 0, total: 0 };
}

type UnitStats = {
  unit: UnitRow;
  status: UnitStatus;
  pct: number;
  lastActivity: string | null;
  content: ContentBucket;
};


function SubjectDetail() {
  const { courseSlug, semesterNumber, subjectSlug } = Route.useParams();
  const { user } = useAuth();

  const subjectQuery = useQuery({
    queryKey: ["public", "subject", courseSlug, semesterNumber, subjectSlug],
    queryFn: async () => {
      const { data: course, error: ce } = await supabase
        .from("courses")
        .select("id, title")
        .eq("slug", courseSlug)
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();
      if (ce) throw ce;
      if (!course) throw notFound();

      const { data: sem, error: se } = await supabase
        .from("semesters")
        .select("id, number, title")
        .eq("course_id", course.id)
        .eq("number", Number(semesterNumber))
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();
      if (se) throw se;
      if (!sem) throw notFound();

      const { data: subject, error: sue } = await supabase
        .from("subjects")
        .select("id, code, title, description, credits")
        .eq("semester_id", sem.id)
        .eq("slug", subjectSlug)
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();
      if (sue) throw sue;
      if (!subject) throw notFound();

      const { data: units, error: ue } = await supabase
        .from("units")
        .select("id, number, title, summary")
        .eq("subject_id", subject.id)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("number");
      if (ue) throw ue;

      const unitIds = (units ?? []).map((u) => u.id);
      const [papersRes, contentRes] = await Promise.all([
        supabase
          .from("papers")
          .select("id, title, year, exam_type, paper_number")
          .eq("subject_id", subject.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("year", { ascending: false }),
        unitIds.length
          ? supabase
              .from("content_items")
              .select("type, unit_id")
              .eq("subject_id", subject.id)
              .eq("status", "published")
              .is("deleted_at", null)
          : Promise.resolve({ data: [] as Array<{ type: string; unit_id: string | null }>, error: null }),
      ]);

      const contentByUnit = new Map<string, ContentBucket>();
      const subjectContent = emptyContentBucket();
      for (const row of (contentRes.data ?? []) as Array<{ type: string; unit_id: string | null }>) {
        const key = (row.type as keyof ContentBucket);
        if (key in subjectContent && key !== "total") {
          (subjectContent as Record<string, number>)[key] += 1;
          subjectContent.total++;
        }
        if (row.unit_id) {
          const b = contentByUnit.get(row.unit_id) ?? emptyContentBucket();
          if (key in b && key !== "total") {
            (b as Record<string, number>)[key] += 1;
            b.total++;
          }
          contentByUnit.set(row.unit_id, b);
        }
      }

      return {
        course,
        sem,
        subject,
        units: (units ?? []) as UnitRow[],
        papers: papersRes.data ?? [],
        contentByUnit,
        subjectContent,
      };
    },
  });

  const subjectId = subjectQuery.data?.subject.id;
  const units = subjectQuery.data?.units ?? [];

  const progressQuery = useQuery({
    queryKey: ["student", "subject-progress", user?.id, subjectId],
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

  const contentByUnit = subjectQuery.data?.contentByUnit ?? new Map<string, ContentBucket>();

  const unitStats: UnitStats[] = useMemo(() => {
    const byUnit = new Map<string, ProgressRow>();
    for (const p of progress) byUnit.set(p.unit_id, p);
    return units.map((u) => {
      const p = byUnit.get(u.id);
      return {
        unit: u,
        status: (p?.status ?? "not_started") as UnitStatus,
        pct: Number(p?.progress_pct ?? 0),
        lastActivity: p?.last_activity_at ?? null,
        content: contentByUnit.get(u.id) ?? emptyContentBucket(),
      };
    });
  }, [units, progress, contentByUnit]);

  const overall = useMemo(() => {
    const total = unitStats.length;
    const completed = unitStats.filter((u) => u.status === "completed").length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Resume unit: most-recent activity that isn't complete, else first non-complete, else first
    const withActivity = unitStats
      .filter((u) => u.lastActivity)
      .sort((a, b) => (b.lastActivity! > a.lastActivity! ? 1 : -1));
    const activeResume = withActivity.find((u) => u.status !== "completed");
    const resume =
      activeResume ??
      unitStats.find((u) => u.status !== "completed") ??
      unitStats[0] ??
      null;

    const lastActivity = withActivity[0]?.lastActivity ?? null;

    return { total, completed, pct, resume, lastActivity };
  }, [unitStats]);

  const started = overall.completed > 0 || unitStats.some((u) => u.status !== "not_started");

  const loadingCore = subjectQuery.isLoading;
  const loadingProgress = !!user && progressQuery.isLoading;

  const heroCtaLabel = !user
    ? "Start Learning"
    : overall.total === 0
      ? "Coming soon"
      : overall.completed === overall.total
        ? "Review Learning"
        : started
          ? "Continue Learning"
          : "Start Learning";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
        <Breadcrumbs
          items={[
            { label: "Courses", to: "/courses" },
            {
              label: subjectQuery.data?.course.title ?? "Course",
              to: "/courses/$courseSlug",
              params: { courseSlug },
            },
            {
              label: subjectQuery.data?.sem.title ?? `Semester ${semesterNumber}`,
              to: "/courses/$courseSlug/$semesterNumber",
              params: { courseSlug, semesterNumber },
            },
            { label: subjectQuery.data?.subject.title ?? "Subject" },
          ]}
        />

        {/* ─── Hero ─── */}
        <StudentHero
          className="mt-5"
          loading={loadingCore}
          eyebrow={
            subjectQuery.data ? (
              <>
                {subjectQuery.data.subject.code}
                {subjectQuery.data.subject.credits != null && (
                  <span className="ml-2 text-muted-foreground/70">
                    · {subjectQuery.data.subject.credits} credits
                  </span>
                )}
              </>
            ) : undefined
          }
          title={subjectQuery.data?.subject.title ?? "Subject"}
          description={subjectQuery.data?.subject.description ?? undefined}
          progress={
            overall.total > 0
              ? {
                  value: user ? overall.pct : 0,
                  label: `${subjectQuery.data?.subject.title ?? "Subject"} progress`,
                  caption: user
                    ? overall.completed === overall.total
                      ? `All ${overall.total} units completed`
                      : `You've completed ${overall.completed} of ${overall.total} units.`
                    : `${overall.total} units in this subject. Sign in to track your progress.`,
                }
              : undefined
          }
          action={
            overall.total > 0 && overall.resume ? (
              <Button
                asChild
                size="lg"
                className="h-12 w-full gap-2 rounded-full px-6 text-sm font-semibold shadow-sm sm:w-auto"
              >
                <Link
                  to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                  params={{
                    courseSlug,
                    semesterNumber,
                    subjectSlug,
                    unitNumber: String(overall.resume.unit.number),
                  }}
                >
                  <span className="truncate">{heroCtaLabel}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </Button>
            ) : undefined
          }
        />

        {/* ─── Quick Stats ─── */}
        {subjectQuery.data && overall.total > 0 && (
          <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatChip
              variant="tile"
              label="Units"
              value={user ? `${overall.completed} / ${overall.total}` : `${overall.total} total`}
            />
            <StatChip
              variant="tile"
              label="Study materials"
              value={subjectQuery.data.subjectContent.total}
            />
            <StatChip
              variant="tile"
              label="Past papers"
              value={subjectQuery.data.papers.length}
            />
            <StatChip
              variant="tile"
              label="Last studied"
              value={user ? (formatRelativeDay(overall.lastActivity) ?? "Not yet") : "—"}
            />
          </section>
        )}

        {/* ─── Content mix ─── */}
        {subjectQuery.data && subjectQuery.data.subjectContent.total > 0 && (
          <section className="mt-4 flex flex-wrap gap-2">
            <StatChip variant="chip" icon={FileText} label="Notes" value={subjectQuery.data.subjectContent.note} />
            <StatChip variant="chip" icon={FileType} label="PDFs" value={subjectQuery.data.subjectContent.pdf} />
            <StatChip variant="chip" icon={Presentation} label="Slides" value={subjectQuery.data.subjectContent.ppt} />
            <StatChip variant="chip" icon={Video} label="Videos" value={subjectQuery.data.subjectContent.video} />
            <StatChip variant="chip" icon={ListChecks} label="Assignments" value={subjectQuery.data.subjectContent.assignment} />
            <StatChip variant="chip" icon={Link2} label="Links" value={subjectQuery.data.subjectContent.link} />
          </section>
        )}


        {/* ─── Learning Path ─── */}
        <section className="mt-14">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-h2 text-foreground">
              Learning path
            </h2>
            {overall.total > 0 && user && (
              <span className="text-xs font-medium tabular-nums text-muted-foreground">
                {overall.completed}/{overall.total} completed
              </span>
            )}
          </div>

          {loadingCore ? (
            <div className="mt-6 space-y-4">
              <Skeleton className="h-28 rounded-lg" />
              <Skeleton className="h-28 rounded-lg" />
              <Skeleton className="h-28 rounded-lg" />
            </div>
          ) : unitStats.length === 0 ? (
            <EmptyUnits courseSlug={courseSlug} semesterNumber={semesterNumber} />
          ) : (
            <ol className="mt-6 relative">
              {/* Connector line */}
              <span
                aria-hidden
                className="absolute left-[27px] top-4 bottom-4 hidden w-px bg-border sm:block"
              />
              <div className="space-y-4">
                {unitStats.map((s) => (
                  <li key={s.unit.id} className="relative">
                    <UnitCard
                      stats={s}
                      isResume={!!user && overall.resume?.unit.id === s.unit.id && s.status !== "completed"}
                      loading={loadingProgress}
                      showProgress={!!user}
                      href={{
                        to: "/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber",
                        params: {
                          courseSlug,
                          semesterNumber,
                          subjectSlug,
                          unitNumber: String(s.unit.number),
                        },
                      }}
                    />
                  </li>
                ))}
              </div>
            </ol>
          )}
        </section>

        {/* ─── Resources ─── */}
        {subjectQuery.data && (
          <section className="mt-14">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-h2 text-foreground">
                Resources
              </h2>
              {subjectQuery.data.papers.length > 0 && (
                <span className="text-xs font-medium text-muted-foreground">
                  Previous-year papers
                </span>
              )}
            </div>

            <div className="mt-6 space-y-3">
              {subjectQuery.data.papers.length === 0 ? (
                <p className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-sm text-muted-foreground">
                  No past papers archived yet for this subject.
                </p>
              ) : (
                subjectQuery.data.papers.map((p) => (
                  <Link
                    key={p.id}
                    to="/papers/$paperId"
                    params={{ paperId: p.id }}
                    className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-5 interactive-card shadow-soft-xs hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                        <FileStack className="h-4 w-4" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <div className="truncate font-display text-base font-semibold text-foreground">
                          {p.title}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-muted-foreground">
                          <span className="tabular-nums text-foreground">{p.year}</span>
                          <span className="capitalize">{p.exam_type.replace("_", " ")}</span>
                          {p.paper_number && <span>Paper #{p.paper_number}</span>}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </Link>
                ))
              )}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

/* ─────────────── components ─────────────── */


function UnitCard({
  stats,
  isResume,
  loading,
  showProgress,
  href,
}: {
  stats: UnitStats;
  isResume: boolean;
  loading: boolean;
  showProgress: boolean;
  href: {
    to: "/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber";
    params: {
      courseSlug: string;
      semesterNumber: string;
      subjectSlug: string;
      unitNumber: string;
    };
  };
}) {
  const { unit, status, pct, lastActivity } = stats;
  const rel = formatRelativeDay(lastActivity);
  const isDone = status === "completed";
  const inProgress = status === "in_progress";

  const ctaLabel = !showProgress
    ? "Open"
    : isDone
      ? "Review"
      : inProgress
        ? "Continue"
        : "Start";

  return (
    <Link
      {...href}
      aria-label={`Unit ${unit.number}: ${unit.title} — ${ctaLabel}`}
      aria-current={isResume ? "step" : undefined}
      className={cn(
        "group relative flex items-start gap-4 rounded-lg border bg-surface p-5 pr-4 interactive-card shadow-soft-xs hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6 sm:pl-6",
        isResume ? "border-primary/60 ring-1 ring-primary/30" : "border-border",
      )}
    >
      {/* Medallion */}
      <span
        aria-hidden
        className={cn(
          "relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-sm font-semibold tabular-nums",
          isDone
            ? "bg-primary text-primary-foreground"
            : isResume
              ? "bg-primary/15 text-primary ring-2 ring-primary/40"
              : inProgress
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground",
        )}
      >
        {isDone ? <Check className="h-5 w-5" /> : unit.number}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Unit {unit.number}
          </span>
          {showProgress && (
            <StatusPill status={status} isResume={isResume} />
          )}
        </div>
        <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug tracking-tight text-foreground">
          {unit.title}
        </h3>
        {unit.summary && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {unit.summary}
          </p>
        )}

        {stats.content.total > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {stats.content.note > 0 && (
              <StatChip variant="chip" icon={FileText} value={stats.content.note} label="notes" />
            )}
            {stats.content.pdf > 0 && (
              <StatChip variant="chip" icon={FileType} value={stats.content.pdf} label="PDFs" />
            )}
            {stats.content.ppt > 0 && (
              <StatChip variant="chip" icon={Presentation} value={stats.content.ppt} label="slides" />
            )}
            {stats.content.video > 0 && (
              <StatChip variant="chip" icon={Video} value={stats.content.video} label="videos" />
            )}
            {stats.content.assignment > 0 && (
              <StatChip variant="chip" icon={ListChecks} value={stats.content.assignment} label="tasks" />
            )}
            {stats.content.link > 0 && (
              <StatChip variant="chip" icon={Link2} value={stats.content.link} label="links" />
            )}
          </div>
        )}

        {showProgress && inProgress && (
          <div className="mt-3 max-w-xs">
            {loading ? (
              <Skeleton className="h-1.5 w-full rounded-full" />
            ) : (
              <ProgressBar value={pct} label={`Unit ${unit.number} progress`} />
            )}
          </div>
        )}

        {showProgress && rel && (
          <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <Clock className="h-3 w-3" aria-hidden /> Last studied · {rel}
          </div>
        )}
      </div>

      <div className="hidden shrink-0 items-center self-center sm:flex">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors",
            isResume
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-transparent text-primary group-hover:bg-primary/5",
          )}
        >
          {ctaLabel}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

function StatusPill({
  status,
  isResume,
}: {
  status: UnitStatus;
  isResume: boolean;
}) {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
        <Check className="h-3 w-3" aria-hidden />
        Done
      </span>
    );
  }
  if (isResume) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
        <PlayCircle className="h-3 w-3" aria-hidden />
        Up next
      </span>
    );
  }
  if (status === "in_progress") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
        In progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
      Not started
    </span>
  );
}

function EmptyUnits({
  courseSlug,
  semesterNumber,
}: {
  courseSlug: string;
  semesterNumber: string;
}) {
  return (
    <EmptyState
      className="mt-6"
      icon={Sparkles}
      title="Units are on their way"
      description="A senior is curating structured, exam-ready units for this subject. As soon as they're published, they'll appear here."
      primaryAction={{
        label: "Back to semester",
        to: "/courses/$courseSlug/$semesterNumber",
        params: { courseSlug, semesterNumber },
        icon: BookOpen,
      }}
    />
  );
}

