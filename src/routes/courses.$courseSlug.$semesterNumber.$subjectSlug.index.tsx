import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery, type QueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  FileStack,
  FileText,
  FileType,
  FlaskConical,
  Link2,
  List,
  ListChecks,
  Map as MapIcon,
  PlayCircle,
  Presentation,
  Search,
  Sparkles,
  Star,
  Trophy,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
import { formatRelativeDay, formatTitleCase } from "@/lib/format";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type PaperRow = {
  id: string;
  title: string;
  year: number;
  exam_type: string;
  paper_number: string | null;
  description?: string | null;
};

type SubjectDetailData = {
  course: { id: string; title: string };
  sem: { id: string; number: number; title: string };
  subject: {
    id: string;
    code: string;
    title: string;
    description: string | null;
    credits: number | null;
  };
  units: UnitRow[];
  papers: PaperRow[];
  contentByUnit: Map<string, ContentBucket>;
  subjectContent: ContentBucket;
};

async function fetchSubjectDetails(
  queryClient: QueryClient,
  courseSlug: string,
  semesterNumber: string,
  subjectSlug: string,
): Promise<SubjectDetailData> {
  const queryKey = ["public", "subject", courseSlug, semesterNumber, subjectSlug];
  return await queryClient.ensureQueryData({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select(
          "id, title, semesters!inner(id, number, title, subjects!inner(id, code, title, description, credits, units(id, number, title, summary, status, deleted_at)))",
        )
        .eq("slug", courseSlug)
        .eq("status", "published")
        .is("deleted_at", null)
        .eq("semesters.number", Number(semesterNumber))
        .eq("semesters.status", "published")
        .is("semesters.deleted_at", null)
        .eq("semesters.subjects.slug", subjectSlug)
        .eq("semesters.subjects.status", "published")
        .is("semesters.subjects.deleted_at", null)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw notFound();

      const course = { id: data.id, title: data.title };
      const semRaw = (data.semesters as any[])?.[0];
      if (!semRaw) throw notFound();
      const sem = { id: semRaw.id, number: semRaw.number, title: semRaw.title };

      const subRaw = (semRaw.subjects as any[])?.[0];
      if (!subRaw) throw notFound();
      const subject = {
        id: subRaw.id,
        code: subRaw.code,
        title: subRaw.title,
        description: subRaw.description,
        credits: subRaw.credits,
      };

      const rawUnits = (subRaw.units ?? []) as Array<
        UnitRow & { status?: string; deleted_at?: string | null }
      >;
      const units: UnitRow[] = rawUnits
        .filter((u) => u.status === "published" && !u.deleted_at)
        .sort((a, b) => (a.number ?? 0) - (b.number ?? 0))
        .map((u) => ({
          id: u.id,
          number: u.number,
          title: u.title,
          summary: u.summary,
        }));

      const unitIds = (units ?? []).map((u) => u.id);
      const [papersRes, contentRes, legacyNotesRes] = await Promise.all([
        supabase
          .from("papers")
          .select("id, title, year, exam_type, paper_number, description")
          .eq("subject_id", subject.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("year", { ascending: false }),
        unitIds.length
          ? supabase
              .from("content_items")
              .select("id, type, unit_id")
              .eq("subject_id", subject.id)
              .eq("status", "published")
              .is("deleted_at", null)
          : Promise.resolve({
              data: [] as Array<{ id: string; type: string; unit_id: string | null }>,
              error: null,
            }),
        unitIds.length
          ? supabase
              .from("notes")
              .select("id, unit_id, file_path, file_mime")
              .in("unit_id", unitIds)
              .eq("status", "published")
              .is("deleted_at", null)
          : Promise.resolve({
              data: [] as Array<{
                id: string;
                unit_id: string;
                file_path: string | null;
                file_mime: string | null;
              }>,
              error: null,
            }),
      ]);

      const contentByUnit = new Map<string, ContentBucket>();
      const subjectContent = emptyContentBucket();
      const countedIds = new Set<string>();

      for (const row of (contentRes.data ?? []) as Array<{
        id: string;
        type: string;
        unit_id: string | null;
      }>) {
        if (countedIds.has(row.id)) continue;
        countedIds.add(row.id);
        const key = row.type as keyof ContentBucket;
        if (key in subjectContent && key !== "total") {
          (subjectContent as Record<string, number>)[key] += 1;
          subjectContent.total++;
        }
        const targetUnitId = row.unit_id || unitIds[0];
        if (targetUnitId) {
          const b = contentByUnit.get(targetUnitId) ?? emptyContentBucket();
          if (key in b && key !== "total") {
            (b as Record<string, number>)[key] += 1;
            b.total++;
          }
          contentByUnit.set(targetUnitId, b);
        }
      }

      for (const row of (legacyNotesRes.data ?? []) as Array<{
        id: string;
        unit_id: string;
        file_path: string | null;
        file_mime: string | null;
      }>) {
        if (countedIds.has(row.id)) continue;
        countedIds.add(row.id);
        const isPdf =
          row.file_mime?.includes("pdf") ||
          (row.file_path && row.file_path.toLowerCase().endsWith(".pdf"));
        const key = isPdf ? "pdf" : "note";
        (subjectContent as Record<string, number>)[key] += 1;
        subjectContent.total++;
        if (row.unit_id) {
          const b = contentByUnit.get(row.unit_id) ?? emptyContentBucket();
          (b as Record<string, number>)[key] += 1;
          b.total++;
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
}

export const Route = createFileRoute("/courses/$courseSlug/$semesterNumber/$subjectSlug/")({
  loader: async ({ params, context: { queryClient } }) => {
    const data = await fetchSubjectDetails(
      queryClient,
      params.courseSlug,
      params.semesterNumber,
      params.subjectSlug,
    );
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    const subject = loaderData?.subject;
    const course = loaderData?.course;
    const title = subject
      ? `${subject.title} (${subject.code}) Notes & Past Papers · XRounder`
      : "Subject · XRounder";
    const description = subject
      ? `Study ${subject.title} (${subject.code}) for ${course?.title ?? "Degree"} Semester ${params.semesterNumber}. Exam-ready unit notes, past papers, and MCQs.`
      : "Syllabus-aligned subject notes and learning resources on XRounder.";
    const url = `https://www.xrounder.in/courses/${params.courseSlug}/${params.semesterNumber}/${params.subjectSlug}`;

    const schemas: Array<Record<string, unknown>> = [
      {
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
            name: "Courses",
            item: "https://www.xrounder.in/courses",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: course?.title ?? "Course",
            item: `https://www.xrounder.in/courses/${params.courseSlug}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `Semester ${params.semesterNumber}`,
            item: `https://www.xrounder.in/courses/${params.courseSlug}/${params.semesterNumber}`,
          },
          {
            "@type": "ListItem",
            position: 5,
            name: subject?.title ?? "Subject",
            item: url,
          },
        ],
      },
    ];

    if (subject) {
      schemas.push({
        "@type": "Course",
        name: subject.title,
        description: description,
        courseCode: subject.code,
        url: url,
        provider: {
          "@type": "EducationalOrganization",
          name: "XRounder",
          url: "https://www.xrounder.in/",
        },
      });
    }

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://www.xrounder.in/og-image.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "https://www.xrounder.in/og-image.png" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": schemas,
          }),
        },
      ],
    };
  },
  component: SubjectDetail,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background p-6 text-center">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Subject not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested subject does not exist or has not been published yet.
        </p>
        <Link
          to="/courses"
          className="mt-4 inline-block font-semibold text-primary hover:underline"
        >
          Back to all courses
        </Link>
      </div>
    </div>
  ),
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
  quiz?: {
    id: string;
    count?: number;
    lastScorePct: number | null;
    needsRevision: boolean;
    isMastered: boolean;
  } | null;
};

type QuizAttemptSummary = {
  quiz_id: string;
  pct: number | null;
  score: number | null;
  max_score: number | null;
  submitted_at: string | null;
};

type QuizUnitRef = {
  id: string;
  unit_id: string;
};

function SubjectDetail() {
  const { courseSlug, semesterNumber, subjectSlug } = Route.useParams();
  const loaderData = Route.useLoaderData();
  const { user } = useAuth();
  const [pathView, setPathView] = useState<"map" | "list">("map");

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
      const [papersRes, contentRes, legacyNotesRes] = await Promise.all([
        supabase
          .from("papers")
          .select("id, title, year, exam_type, paper_number, description")
          .eq("subject_id", subject.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("year", { ascending: false }),
        unitIds.length
          ? supabase
              .from("content_items")
              .select("id, type, unit_id")
              .eq("subject_id", subject.id)
              .eq("status", "published")
              .is("deleted_at", null)
          : Promise.resolve({
              data: [] as Array<{ id: string; type: string; unit_id: string | null }>,
              error: null,
            }),
        unitIds.length
          ? supabase
              .from("notes")
              .select("id, unit_id, file_path, file_mime")
              .in("unit_id", unitIds)
              .eq("status", "published")
              .is("deleted_at", null)
          : Promise.resolve({
              data: [] as Array<{
                id: string;
                unit_id: string;
                file_path: string | null;
                file_mime: string | null;
              }>,
              error: null,
            }),
      ]);

      const contentByUnit = new Map<string, ContentBucket>();
      const subjectContent = emptyContentBucket();
      const countedIds = new Set<string>();

      for (const row of (contentRes.data ?? []) as Array<{
        id: string;
        type: string;
        unit_id: string | null;
      }>) {
        if (countedIds.has(row.id)) continue;
        countedIds.add(row.id);
        const key = row.type as keyof ContentBucket;
        if (key in subjectContent && key !== "total") {
          (subjectContent as Record<string, number>)[key] += 1;
          subjectContent.total++;
        }
        const targetUnitId = row.unit_id || unitIds[0];
        if (targetUnitId) {
          const b = contentByUnit.get(targetUnitId) ?? emptyContentBucket();
          if (key in b && key !== "total") {
            (b as Record<string, number>)[key] += 1;
            b.total++;
          }
          contentByUnit.set(targetUnitId, b);
        }
      }

      for (const row of (legacyNotesRes.data ?? []) as Array<{
        id: string;
        unit_id: string;
        file_path: string | null;
        file_mime: string | null;
      }>) {
        if (countedIds.has(row.id)) continue;
        countedIds.add(row.id);
        const isPdf =
          row.file_mime?.includes("pdf") ||
          (row.file_path && row.file_path.toLowerCase().endsWith(".pdf"));
        const key = isPdf ? "pdf" : "note";
        (subjectContent as Record<string, number>)[key] += 1;
        subjectContent.total++;
        if (row.unit_id) {
          const b = contentByUnit.get(row.unit_id) ?? emptyContentBucket();
          (b as Record<string, number>)[key] += 1;
          b.total++;
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
    initialData: loaderData,
  });

  const subjectId = subjectQuery.data?.subject.id;
  const units = subjectQuery.data?.units ?? [];

  const progressQuery = useQuery({
    queryKey: ["student", "subject-progress", user?.id, subjectId],
    enabled: !!user?.id && units.length > 0,
    queryFn: async () => {
      const unitIds = units.map((u: UnitRow) => u.id);
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

  const unitIds = units.map((u: UnitRow) => u.id);

  const unitQuizzesQuery = useQuery({
    queryKey: ["student", "unit-quizzes-mastery", user?.id, unitIds],
    enabled: units.length > 0,
    queryFn: async () => {
      const { data: qData, error: qErr } = await supabase
        .from("quizzes")
        .select("id, unit_id")
        .in("unit_id", unitIds)
        .eq("status", "published")
        .is("deleted_at", null);
      if (qErr) throw qErr;

      const quizzes: QuizUnitRef[] = (qData ?? []).filter(
        (q): q is QuizUnitRef => typeof q.unit_id === "string",
      );
      const quizIds = quizzes.map((q) => q.id);
      if (!user?.id || quizIds.length === 0) {
        return { quizzes, attemptsByQuiz: new Map<string, QuizAttemptSummary>() };
      }

      const { data: aData, error: aErr } = await supabase
        .from("quiz_attempts")
        .select("quiz_id, pct, score, max_score, submitted_at")
        .eq("user_id", user.id)
        .in("quiz_id", quizIds)
        .not("submitted_at", "is", null)
        .order("submitted_at", { ascending: false });
      if (aErr) throw aErr;

      const attemptsByQuiz = new Map<string, QuizAttemptSummary>();
      for (const a of (aData ?? []) as QuizAttemptSummary[]) {
        if (!attemptsByQuiz.has(a.quiz_id)) {
          attemptsByQuiz.set(a.quiz_id, a);
        }
      }

      return { quizzes, attemptsByQuiz };
    },
  });

  const contentByUnit = subjectQuery.data?.contentByUnit ?? new Map<string, ContentBucket>();
  const unitQuizzesData = unitQuizzesQuery.data;

  const unitStats: UnitStats[] = useMemo(() => {
    const byUnit = new Map<string, ProgressRow>();
    for (const p of progress) byUnit.set(p.unit_id, p);

    const quizzes = unitQuizzesData?.quizzes ?? [];
    const attemptsByQuiz = unitQuizzesData?.attemptsByQuiz ?? new Map<string, QuizAttemptSummary>();

    return units.map((u: UnitRow) => {
      const p = byUnit.get(u.id);
      const unitQuizList = quizzes.filter((q) => q.unit_id === u.id);
      let quizMeta = null;
      if (unitQuizList.length > 0) {
        const q = unitQuizList[0];
        let highestScore: number | null = null;
        let hasMastered = false;
        let hasNeedsRevision = false;
        for (const quizItem of unitQuizList) {
          const att = attemptsByQuiz.get(quizItem.id);
          if (att) {
            const scorePct =
              typeof att.pct === "number"
                ? Math.round(att.pct)
                : att.max_score
                  ? Math.round((Number(att.score ?? 0) / att.max_score) * 100)
                  : null;
            if (scorePct !== null) {
              if (highestScore === null || scorePct > highestScore) highestScore = scorePct;
              if (scorePct >= 70) hasMastered = true;
              else hasNeedsRevision = true;
            }
          }
        }
        quizMeta = {
          id: q.id,
          count: unitQuizList.length,
          lastScorePct: highestScore,
          needsRevision: hasNeedsRevision && !hasMastered,
          isMastered: hasMastered,
        };
      }

      return {
        unit: u,
        status: (p?.status ?? "not_started") as UnitStatus,
        pct: Number(p?.progress_pct ?? 0),
        lastActivity: p?.last_activity_at ?? null,
        content: contentByUnit.get(u.id) ?? emptyContentBucket(),
        quiz: quizMeta,
      };
    });
  }, [units, progress, contentByUnit, unitQuizzesData]);

  const overall = useMemo(() => {
    const total = unitStats.length;
    const completed = unitStats.filter((u) => u.status === "completed").length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    const needsRevUnit = unitStats.find((u) => u.quiz?.needsRevision);

    // Resume unit: first unit needing revision, else most-recent activity that isn't complete, else first non-complete, else first
    const withActivity = unitStats
      .filter((u) => u.lastActivity)
      .sort((a, b) => (b.lastActivity! > a.lastActivity! ? 1 : -1));
    const activeResume = withActivity.find((u) => u.status !== "completed");
    const resume =
      needsRevUnit ??
      activeResume ??
      unitStats.find((u) => u.status !== "completed") ??
      unitStats[0] ??
      null;

    const lastActivity = withActivity[0]?.lastActivity ?? null;

    return { total, completed, pct, resume, lastActivity, needsRevUnit };
  }, [unitStats]);

  const started = overall.completed > 0 || unitStats.some((u) => u.status !== "not_started");

  const loadingCore = subjectQuery.isLoading;
  const loadingProgress = !!user && progressQuery.isLoading;

  const heroCtaLabel = !user
    ? "Start Learning"
    : overall.total === 0
      ? "Coming soon"
      : overall.needsRevUnit
        ? `Revise Unit ${overall.needsRevUnit.unit.number}`
        : overall.completed === overall.total
          ? "Review Learning"
          : started
            ? `Continue Unit ${overall.resume?.unit.number ?? 1}`
            : "Start Unit 1";

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
            { label: formatTitleCase(subjectQuery.data?.subject.title) || "Subject" },
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
          title={formatTitleCase(subjectQuery.data?.subject.title) || "Subject"}
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
            <a href="#past-papers" className="block focus:outline-hidden hover:opacity-90 transition-opacity">
              <StatChip
                variant="tile"
                label="Past papers"
                value={`${subjectQuery.data.papers.length} PYQs`}
              />
            </a>
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
            <StatChip
              variant="chip"
              icon={FileText}
              label="Notes"
              value={subjectQuery.data.subjectContent.note}
            />
            <StatChip
              variant="chip"
              icon={FileType}
              label="PDFs"
              value={subjectQuery.data.subjectContent.pdf}
            />
            <StatChip
              variant="chip"
              icon={Presentation}
              label="Slides"
              value={subjectQuery.data.subjectContent.ppt}
            />
            <StatChip
              variant="chip"
              icon={Video}
              label="Videos"
              value={subjectQuery.data.subjectContent.video}
            />
            <StatChip
              variant="chip"
              icon={ListChecks}
              label="Assignments"
              value={subjectQuery.data.subjectContent.assignment}
            />
            <StatChip
              variant="chip"
              icon={Link2}
              label="Links"
              value={subjectQuery.data.subjectContent.link}
            />
          </section>
        )}

        {/* ─── Mock Test Banner ─── */}
        {subjectQuery.data && overall.total > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-primary/25 bg-linear-to-r from-primary/10 via-surface to-card p-5 sm:p-6 shadow-soft">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                <Sparkles className="h-3.5 w-3.5" /> Exam Preparation
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-foreground">
                Ready for Mid-Sem or Final Exams?
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-xl">
                Test your knowledge across multiple units of {subjectQuery.data.subject.title} with
                timed questions and unit-by-unit weakness analysis.
              </p>
            </div>

            <Button asChild className="rounded-2xl h-11 px-5 font-bold text-xs shrink-0 shadow-sm">
              <Link to="/mock-test">
                <span>Launch Mock Exam</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        )}

        {/* ─── Learning Path / Visual Quest Map ─── */}
        <section className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                  Syllabus Quest Roadmap
                </span>
                {overall.total > 0 && user && (
                  <Badge variant="secondary" className="font-mono text-[11px] font-bold">
                    {overall.completed}/{overall.total} Units
                  </Badge>
                )}
              </div>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Learning Journey
              </h2>
            </div>

            {/* View Mode Toggle: Quest Map vs Classic List */}
            {unitStats.length > 0 && (
              <div className="flex items-center gap-1.5 rounded-2xl border border-border/80 bg-muted/40 p-1">
                <Button
                  type="button"
                  size="sm"
                  variant={pathView === "map" ? "default" : "ghost"}
                  onClick={() => setPathView("map")}
                  className={cn(
                    "h-8 gap-1.5 rounded-xl px-3 text-xs font-semibold cursor-pointer transition-all",
                    pathView === "map"
                      ? "shadow-xs"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <MapIcon className="h-3.5 w-3.5" />
                  <span>Quest Map</span>
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={pathView === "list" ? "default" : "ghost"}
                  onClick={() => setPathView("list")}
                  className={cn(
                    "h-8 gap-1.5 rounded-xl px-3 text-xs font-semibold cursor-pointer transition-all",
                    pathView === "list"
                      ? "shadow-xs"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <List className="h-3.5 w-3.5" />
                  <span>List View</span>
                </Button>
              </div>
            )}
          </div>

          {/* Subject Mastery Milestone Reward Chests */}
          {overall.total > 0 && (
            <div className="mt-6 rounded-3xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-bold text-foreground font-display">
                    Subject Mastery Milestone Chests
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-primary">
                  {overall.pct}% Complete
                </span>
              </div>

              {/* Milestone Progress Bar */}
              <div className="relative h-2 w-full rounded-full bg-muted/80 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${overall.pct}%` }}
                />
              </div>

              {/* 3 Milestone Badges */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div
                  className={cn(
                    "rounded-2xl border p-2.5 transition-all",
                    overall.pct >= 25
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold"
                      : "border-border/60 bg-muted/20 text-muted-foreground opacity-60",
                  )}
                >
                  <div className="flex items-center justify-center gap-1 text-xs">
                    <span>🥉</span>
                    <span>25% Fast Track</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground block mt-0.5">
                    +100 XP
                  </span>
                </div>

                <div
                  className={cn(
                    "rounded-2xl border p-2.5 transition-all",
                    overall.pct >= 50
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold"
                      : "border-border/60 bg-muted/20 text-muted-foreground opacity-60",
                  )}
                >
                  <div className="flex items-center justify-center gap-1 text-xs">
                    <span>🥈</span>
                    <span>50% Mid-Sem Pro</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground block mt-0.5">
                    +200 XP
                  </span>
                </div>

                <div
                  className={cn(
                    "rounded-2xl border p-2.5 transition-all",
                    overall.pct >= 100
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold"
                      : "border-border/60 bg-muted/20 text-muted-foreground opacity-60",
                  )}
                >
                  <div className="flex items-center justify-center gap-1 text-xs">
                    <span>💎</span>
                    <span>100% Exam Master</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground block mt-0.5">
                    +500 XP
                  </span>
                </div>
              </div>
            </div>
          )}

          {loadingCore ? (
            <div className="mt-8 space-y-4">
              <Skeleton className="h-32 rounded-3xl" />
              <Skeleton className="h-32 rounded-3xl" />
              <Skeleton className="h-32 rounded-3xl" />
            </div>
          ) : unitStats.length === 0 ? (
            <EmptyUnits courseSlug={courseSlug} semesterNumber={semesterNumber} />
          ) : pathView === "map" ? (
            /* ─── Visual Quest Map (Roadmap) ─── */
            <div className="mt-8 relative">
              {/* Connected Glow Track */}
              <div
                aria-hidden
                className="absolute left-7 top-8 bottom-8 w-1 bg-border/80 rounded-full hidden sm:block"
              />

              <div className="space-y-6">
                {unitStats.map((s) => {
                  const isDone = s.status === "completed";
                  const inProgress = s.status === "in_progress";
                  const isResume =
                    !!user && overall.resume?.unit.id === s.unit.id && s.status !== "completed";
                  const needsRevision = !!s.quiz?.needsRevision;
                  const isMastered = !!s.quiz?.isMastered;

                  // Determine Stars (0-3)
                  const stars = s.quiz?.lastScorePct
                    ? s.quiz.lastScorePct >= 90
                      ? 3
                      : s.quiz.lastScorePct >= 70
                        ? 2
                        : 1
                    : isDone
                      ? 1
                      : 0;

                  return (
                    <div
                      key={s.unit.id}
                      className={cn(
                        "relative flex flex-col sm:flex-row sm:items-center gap-4 rounded-3xl border p-5 sm:p-6 transition-all duration-300",
                        isResume
                          ? "border-primary/50 bg-linear-to-r from-primary/10 via-card to-card shadow-md ring-2 ring-primary/30"
                          : isDone
                            ? "border-success/30 bg-card hover:border-success/60 shadow-xs"
                            : needsRevision
                              ? "border-warning/40 bg-warning/5 hover:border-warning/70"
                              : "border-border/70 bg-card hover:border-primary/40 shadow-xs",
                      )}
                    >
                      {/* Left Quest Medallion */}
                      <div className="relative flex shrink-0 items-center gap-4">
                        <div
                          className={cn(
                            "relative flex h-14 w-14 items-center justify-center rounded-2xl font-display font-black text-lg transition-transform shadow-md",
                            isMastered
                              ? "bg-amber-500 text-white ring-4 ring-amber-500/20"
                              : isDone
                                ? "bg-success text-success-foreground ring-4 ring-success/20"
                                : isResume
                                  ? "bg-primary text-primary-foreground shadow-md ring-4 ring-primary/30"
                                  : inProgress
                                    ? "bg-primary/20 text-primary ring-2 ring-primary/40"
                                    : "bg-muted text-muted-foreground ring-2 ring-border",
                          )}
                        >
                          {isDone ? (
                            <Check className="h-7 w-7 stroke-[3]" />
                          ) : (
                            <span>U{s.unit.number}</span>
                          )}

                          {isResume && (
                            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                              <span className="relative inline-flex rounded-full h-4 w-4 bg-accent" />
                            </span>
                          )}
                        </div>

                        {/* Mobile Unit Number Label */}
                        <div className="sm:hidden">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                            Unit {s.unit.number} Quest
                          </span>
                          <div className="flex items-center gap-1 text-amber-500 mt-0.5">
                            {[1, 2, 3].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  "h-3.5 w-3.5",
                                  star <= stars
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground/30",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Middle Details */}
                      <div className="min-w-0 flex-1">
                        <div className="hidden sm:flex items-center gap-2">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                            Unit {s.unit.number} Quest
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <div className="flex items-center gap-0.5 text-amber-500">
                            {[1, 2, 3].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  "h-3.5 w-3.5",
                                  star <= stars
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground/30",
                                )}
                              />
                            ))}
                          </div>
                          {isResume && (
                            <Badge
                              variant="default"
                              className="bg-primary text-primary-foreground text-[10px] font-bold rounded-full"
                            >
                              ⚡ Active Quest
                            </Badge>
                          )}
                        </div>

                        <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-foreground">
                          {formatTitleCase(s.unit.title)}
                        </h3>


                        {/* Interactive Unit Pills */}
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="font-mono text-[10px] font-bold bg-primary/10 text-primary border-primary/20"
                          >
                            +120 XP Reward
                          </Badge>
                          {s.content.note > 0 && (
                            <Badge variant="outline" className="text-[10px] font-medium">
                              <FileText className="h-3 w-3 mr-1 text-primary" />
                              Interactive Lesson Ready
                            </Badge>
                          )}
                          {s.content.pdf > 0 && (
                            <Badge variant="outline" className="text-[10px] font-medium">
                              <FileType className="h-3 w-3 mr-1" />
                              College Notes
                            </Badge>
                          )}
                          {s.quiz && (
                            <Badge
                              variant={
                                s.quiz.isMastered
                                  ? "success"
                                  : s.quiz.needsRevision
                                    ? "warning"
                                    : "outline"
                              }
                              className="text-[10px] font-bold"
                            >
                              <FlaskConical className="h-3 w-3 mr-1" />
                              {s.quiz.lastScorePct !== null
                                ? `Quiz: ${s.quiz.lastScorePct}%`
                                : s.quiz.count && s.quiz.count > 1
                                  ? `${s.quiz.count} Topic Quizzes`
                                  : "MCQ Quiz Ready"}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Right Action Button */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/60 shrink-0">
                        <Button
                          asChild
                          variant={isResume ? "cta" : isDone ? "outline" : "default"}
                          className={cn(
                            "btn-squishy rounded-2xl h-11 px-5 font-bold text-xs shadow-xs cursor-pointer",
                            isResume && "shadow-md hover:brightness-105",
                          )}
                        >
                          <Link
                            to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                            params={{
                              courseSlug,
                              semesterNumber,
                              subjectSlug,
                              unitNumber: String(s.unit.number),
                            }}
                          >
                            <span>
                              {isResume ? "Continue Unit" : isDone ? "Review Unit" : "Start Unit"}
                            </span>
                            <ArrowRight className="h-4 w-4 ml-1.5" />
                          </Link>
                        </Button>

                        {s.quiz?.id && (
                          <Link
                            to="/quizzes/$quizId"
                            params={{ quizId: s.quiz.id }}
                            className="text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors underline"
                          >
                            Take Quiz →
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ─── Classic List View ─── */
            <ol className="mt-6 relative">
              <span
                aria-hidden
                className="absolute left-[27px] top-4 bottom-4 hidden w-px bg-border sm:block"
              />
              <div className="space-y-4">
                {unitStats.map((s) => (
                  <li key={s.unit.id} className="relative">
                    <UnitCard
                      stats={s}
                      isResume={
                        !!user && overall.resume?.unit.id === s.unit.id && s.status !== "completed"
                      }
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

        {/* ─── Previous Year Question Papers (PYQs) ─── */}
        {subjectQuery.data && (
          <SubjectPastPapersSection
            papers={subjectQuery.data.papers}
            subjectTitle={subjectQuery.data.subject.title}
            subjectCode={subjectQuery.data.subject.code}
          />
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
  const needsRevision = !!stats.quiz?.needsRevision;
  const isMastered = !!stats.quiz?.isMastered;

  const ctaLabel = !showProgress
    ? "Start Unit"
    : needsRevision
      ? "Revise Unit"
      : isDone
        ? "Review Unit"
        : inProgress
          ? "Continue Unit"
          : "Start Unit";

  return (
    <Link
      to={href.to}
      params={href.params}
      aria-label={`Unit ${unit.number}: ${unit.title} — ${ctaLabel}`}
      aria-current={isResume ? "step" : undefined}
      className={cn(
        "group relative flex items-start gap-4 rounded-lg border bg-surface p-5 pr-4 interactive-card shadow-soft-xs hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6 sm:pl-6",
        needsRevision
          ? "border-warning/60 ring-1 ring-warning/30 bg-warning/5"
          : isResume
            ? "border-primary/60 ring-1 ring-primary/30"
            : "border-border",
      )}
    >
      {/* Medallion */}
      <span
        aria-hidden
        className={cn(
          "relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-sm font-semibold tabular-nums",
          needsRevision
            ? "bg-warning/15 text-warning ring-2 ring-warning/40"
            : isDone
              ? "bg-primary text-primary-foreground"
              : isResume
                ? "bg-primary/15 text-primary ring-2 ring-primary/40"
                : inProgress
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground",
        )}
      >
        {needsRevision ? (
          <AlertTriangle className="h-5 w-5" />
        ) : isDone ? (
          <Check className="h-5 w-5" />
        ) : (
          unit.number
        )}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Unit {unit.number}
          </span>
          {showProgress && (
            <StatusPill
              status={status}
              isResume={isResume}
              needsRevision={needsRevision}
              isMastered={isMastered}
            />
          )}
        </div>
        <h3 className="mt-1.5 font-display text-lg font-normal leading-snug tracking-tight text-foreground">
          {formatTitleCase(unit.title)}
        </h3>

        {/* Unit Readiness Badges */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {stats.content.note > 0 ? (
            <Badge variant="success" className="text-[10px] font-bold rounded-lg">
              <Check className="h-3 w-3 mr-1" /> Notes Ready
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-[10px] font-medium rounded-lg text-muted-foreground bg-muted/40"
            >
              Notes in draft
            </Badge>
          )}

          {stats.content.pdf > 0 && (
            <Badge
              variant="outline"
              className="text-[10px] font-bold rounded-lg bg-primary/10 text-primary border-primary/30"
            >
              <FileType className="h-3 w-3 mr-1" /> College PDF
            </Badge>
          )}

          {stats.quiz?.needsRevision ? (
            <Badge variant="warning" className="text-[10px] font-bold rounded-lg">
              <AlertTriangle className="h-3 w-3 mr-1" /> Quiz: {stats.quiz.lastScorePct}% (Needs
              Revision)
            </Badge>
          ) : stats.quiz?.isMastered ? (
            <Badge variant="success" className="text-[10px] font-bold rounded-lg">
              <Check className="h-3 w-3 mr-1" /> Quiz: {stats.quiz.lastScorePct}% (Mastered)
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-[10px] font-bold rounded-lg bg-card text-foreground"
            >
              <FlaskConical className="h-3 w-3 mr-1 text-primary" /> Practice MCQs
            </Badge>
          )}
        </div>

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
            needsRevision
              ? "bg-warning text-warning-foreground shadow-sm"
              : isResume
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
  needsRevision,
  isMastered,
}: {
  status: UnitStatus;
  isResume: boolean;
  needsRevision?: boolean;
  isMastered?: boolean;
}) {
  if (needsRevision) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 border border-warning/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-warning">
        <AlertTriangle className="h-3 w-3" aria-hidden />
        Needs revision
      </span>
    );
  }
  if (isMastered) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-success/15 border border-success/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success">
        <Check className="h-3 w-3" aria-hidden />
        Mastered
      </span>
    );
  }
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

function SubjectPastPapersSection({
  papers,
  subjectTitle,
  subjectCode,
}: {
  papers: PaperRow[];
  subjectTitle: string;
  subjectCode: string;
}) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const availableYears = useMemo(() => {
    const years = Array.from(new Set(papers.map((p) => p.year))).sort((a, b) => b - a);
    return years;
  }, [papers]);

  const compilationsCount = useMemo(() => {
    return papers.filter(
      (p) =>
        p.exam_type === "other" ||
        p.title.toLowerCase().includes("compilation") ||
        p.title.toLowerCase().includes("all-in-one") ||
        p.title.toLowerCase().includes("merged"),
    ).length;
  }, [papers]);

  const filteredPapers = useMemo(() => {
    return papers.filter((p) => {
      const isComp =
        p.exam_type === "other" ||
        p.title.toLowerCase().includes("compilation") ||
        p.title.toLowerCase().includes("all-in-one") ||
        p.title.toLowerCase().includes("merged");

      if (selectedFilter === "compilations") {
        if (!isComp) return false;
      } else if (selectedFilter !== "all") {
        if (String(p.year) !== selectedFilter) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchCode = (p.paper_number || "").toLowerCase().includes(q);
        const matchDesc = (p.description || "").toLowerCase().includes(q);
        const matchYear = String(p.year).includes(q);
        if (!matchTitle && !matchCode && !matchDesc && !matchYear) return false;
      }
      return true;
    });
  }, [papers, selectedFilter, searchQuery]);

  return (
    <section id="past-papers" className="mt-14 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <FileStack className="h-3.5 w-3.5" /> University Archive
            </span>
            <Badge variant="secondary" className="font-mono text-[11px] font-bold">
              {papers.length} {papers.length === 1 ? "Paper" : "Papers"}
            </Badge>
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Previous Year Question Papers
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Official university exam question papers &amp; consolidated multi-year compilations for {subjectCode}.
          </p>
        </div>

        <Link
          to="/papers"
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 shrink-0"
        >
          <span>All Subjects Archive</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {papers.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted-foreground">
          No previous year question papers archived yet for this subject.
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {/* Filter Pills & Search */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Year / Compilation pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <Button
                type="button"
                size="sm"
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                className="h-8 rounded-full text-xs shrink-0 cursor-pointer"
              >
                All ({papers.length})
              </Button>

              {compilationsCount > 0 && (
                <Button
                  type="button"
                  size="sm"
                  variant={selectedFilter === "compilations" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("compilations")}
                  className={cn(
                    "h-8 rounded-full text-xs shrink-0 cursor-pointer",
                    selectedFilter === "compilations"
                      ? "bg-amber-500 text-white hover:bg-amber-600"
                      : "border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10",
                  )}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  Merged Compilations ({compilationsCount})
                </Button>
              )}

              {availableYears.map((yr) => (
                <Button
                  key={yr}
                  type="button"
                  size="sm"
                  variant={selectedFilter === String(yr) ? "default" : "ghost"}
                  onClick={() => setSelectedFilter(String(yr))}
                  className="h-8 rounded-xl text-xs shrink-0 tabular-nums cursor-pointer"
                >
                  {yr}
                </Button>
              ))}
            </div>

            {/* Search filter input */}
            <div className="relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search year, paper code..."
                className="h-8 w-full rounded-xl border border-border bg-surface pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
              />
            </div>
          </div>

          {/* Cards Grid */}
          {filteredPapers.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-surface p-6 text-center text-xs text-muted-foreground">
              No papers found matching the selected filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredPapers.map((p) => {
                const isMerged =
                  p.exam_type === "other" ||
                  p.title.toLowerCase().includes("compilation") ||
                  p.title.toLowerCase().includes("all-in-one") ||
                  p.title.toLowerCase().includes("merged");

                return (
                  <Link
                    key={p.id}
                    to="/papers/$paperId"
                    params={{ paperId: p.id }}
                    className={cn(
                      "group flex flex-col justify-between gap-3 rounded-2xl border p-4 sm:p-5 interactive-card shadow-soft-xs transition-all duration-200",
                      isMerged
                        ? "border-amber-500/35 bg-amber-500/5 hover:border-amber-500/60"
                        : "border-border/80 bg-surface hover:border-primary/40",
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Badge
                            variant={isMerged ? "warning" : "default"}
                            className="text-[10px] font-bold px-2 py-0"
                          >
                            {isMerged ? "All-In-One Compilation" : `${p.year} University Exam`}
                          </Badge>
                          {p.paper_number && (
                            <Badge
                              variant="outline"
                              className="font-mono text-[10px] px-1.5 py-0 bg-muted/30"
                            >
                              Code: {p.paper_number}
                            </Badge>
                          )}
                        </div>

                        <span className="text-[11px] font-mono font-bold text-muted-foreground shrink-0">
                          {p.year}
                        </span>
                      </div>

                      <h3 className="mt-2 font-display text-sm sm:text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>

                      {p.description && (
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-border/50 pt-3 text-xs font-semibold text-primary">
                      <span>View &amp; Download Paper</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

