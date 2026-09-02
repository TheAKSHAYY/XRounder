import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  Download,
  ExternalLink,
  FileText,
  FileType,
  FlaskConical,
  GraduationCap,
  ListOrdered,
  Timer,
} from "lucide-react";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { slugify } from "@/lib/slug";
import { parseMarkdownToBlocks } from "@/components/admin/visual-article-editor";
import { EducationalContentRenderer } from "@/components/content/educational-content-renderer";

type UnitDetailData = {
  course: { id: string; title: string };
  sem: { id: string; number: number; title: string };
  subject: { id: string; code: string; title: string };
  unit: { id: string; number: number; title: string; summary: string | null };
  items: UnitContentItem[];
  siblings: SiblingUnit[];
  quizzes: QuizRow[];
};

async function fetchUnitDetails(
  queryClient: any,
  courseSlug: string,
  semesterNumber: string,
  subjectSlug: string,
  unitNumber: string,
): Promise<UnitDetailData> {
  const queryKey = ["public", "unit", courseSlug, semesterNumber, subjectSlug, unitNumber];
  return await queryClient.ensureQueryData({
    queryKey,
    queryFn: async () => {
      const { data: course } = await supabase
        .from("courses")
        .select("id, title")
        .eq("slug", courseSlug)
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();
      if (!course) throw notFound();

      const { data: sem } = await supabase
        .from("semesters")
        .select("id, number, title")
        .eq("course_id", course.id)
        .eq("number", Number(semesterNumber))
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();
      if (!sem) throw notFound();

      const { data: subject } = await supabase
        .from("subjects")
        .select("id, code, title")
        .eq("semester_id", sem.id)
        .eq("slug", subjectSlug)
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();
      if (!subject) throw notFound();

      const { data: unit } = await supabase
        .from("units")
        .select("id, number, title, summary")
        .eq("subject_id", subject.id)
        .eq("number", Number(unitNumber))
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();
      if (!unit) throw notFound();

      const contentFilter =
        Number(unitNumber) === 1
          ? `unit_id.eq.${unit.id},unit_id.is.null`
          : `unit_id.eq.${unit.id}`;

      const [
        { data: contentItemsRes },
        { data: legacyNotesRes },
        { data: siblingsRes },
        { data: quizzesRes },
      ] = await Promise.all([
        supabase
          .from("content_items")
          .select(
            "id, type, title, description, file_path, file_bucket, file_mime, file_size_bytes, file_url, tags, created_at",
          )
          .eq("subject_id", subject.id)
          .or(contentFilter)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("created_at", { ascending: true }),
        supabase
          .from("notes")
          .select(
            "id, title, summary, body, file_path, file_bucket, file_mime, file_size_bytes, created_at",
          )
          .eq("unit_id", unit.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("sort_order")
          .order("created_at"),
        supabase
          .from("units")
          .select("id, number")
          .eq("subject_id", subject.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("number"),
        supabase
          .from("quizzes")
          .select("id, title, time_limit_minutes")
          .eq("unit_id", unit.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("order_index"),
      ]);

      const items: UnitContentItem[] = (contentItemsRes ?? []).map((c) => ({
        id: c.id,
        type: (c.type ?? "note") as UnitContentItem["type"],
        title: c.title,
        description: c.description,
        body: c.description,
        file_path: c.file_path,
        file_bucket: c.file_bucket,
        file_mime: c.file_mime,
        file_size_bytes: c.file_size_bytes,
        file_url: c.file_url,
        tags: c.tags ?? [],
        created_at: c.created_at ?? "",
      }));

      const itemIds = new Set(items.map((i) => i.id));
      for (const n of legacyNotesRes ?? []) {
        if (!itemIds.has(n.id)) {
          items.push({
            id: n.id,
            type: n.file_mime === "application/pdf" ? "pdf" : "note",
            title: n.title,
            description: n.summary,
            body: n.body || n.summary,
            file_path: n.file_path,
            file_bucket: n.file_bucket,
            file_mime: n.file_mime,
            file_size_bytes: n.file_size_bytes,
            file_url: null,
            created_at: n.created_at ?? "",
          });
        }
      }

      return {
        course,
        sem,
        subject,
        unit,
        items,
        siblings: (siblingsRes ?? []) as SiblingUnit[],
        quizzes: (quizzesRes ?? []) as QuizRow[],
      };
    },
  });
}

export const Route = createFileRoute(
  "/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber",
)({
  loader: async ({ params, context: { queryClient } }) => {
    const data = await fetchUnitDetails(
      queryClient,
      params.courseSlug,
      params.semesterNumber,
      params.subjectSlug,
      params.unitNumber,
    );
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    const course = loaderData?.course;
    const unit = loaderData?.unit;
    const subject = loaderData?.subject;
    const title =
      unit && subject
        ? `Unit ${unit.number}: ${unit.title} — ${subject.title} · XRounder`
        : `Unit ${params.unitNumber} Learning Hub · XRounder`;
    const description = unit?.summary
      ? unit.summary
      : subject
        ? `Study Unit ${params.unitNumber} of ${subject.title} on XRounder. Exam notes, attachments, and practice MCQs.`
        : "Unit notes, syllabus-aligned learning materials, and practice MCQs on XRounder.";
    const url = `https://www.xrounder.in/courses/${params.courseSlug}/${params.semesterNumber}/${params.subjectSlug}/${params.unitNumber}`;

    const schemas: any[] = [
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
            item: `https://www.xrounder.in/courses/${params.courseSlug}/${params.semesterNumber}/${params.subjectSlug}`,
          },
          {
            "@type": "ListItem",
            position: 6,
            name: unit ? `Unit ${unit.number}: ${unit.title}` : `Unit ${params.unitNumber}`,
            item: url,
          },
        ],
      },
    ];

    if (unit && subject) {
      schemas.push({
        "@type": "LearningResource",
        name: `Unit ${unit.number}: ${unit.title}`,
        description: description,
        learningResourceType: "Study Guide",
        educationalLevel: "Undergraduate",
        url: url,
        isPartOf: {
          "@type": "Course",
          name: subject.title,
          courseCode: subject.code,
        },
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
        { property: "og:type", content: "article" },
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
  component: UnitDetail,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background p-6 text-center">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Unit not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested unit does not exist or has not been published yet.
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

export type UnitContentItem = {
  id: string;
  type: "note" | "pdf" | "ppt" | "video" | "assignment" | "link";
  title: string;
  description: string | null;
  body?: string | null;
  file_path: string | null;
  file_bucket: string | null;
  file_mime: string | null;
  file_size_bytes: number | null;
  file_url: string | null;
  tags?: string[];
  created_at: string;
};

type SiblingUnit = { id: string; number: number };

type QuizRow = { id: string; title: string; time_limit_minutes: number | null };

type PyqQuestion = {
  id: string;
  prompt: string;
  explanation: string | null;
  exam_name: string | null;
  year: number | null;
  points: number;
  difficulty: string | null;
};

function estimateReadMinutes(items: UnitContentItem[]) {
  const words = items.reduce((total, n) => {
    const text = `${n.title ?? ""} ${n.description ?? ""} ${n.body ?? ""}`.trim();
    if (!text) return total;
    return total + text.split(/\s+/).length;
  }, 0);
  if (words === 0) return 0;
  return Math.max(1, Math.round(words / 200));
}

function getVideoEmbedUrl(
  url: string | null | undefined,
): { isEmbed: boolean; src: string } | null {
  if (!url || !url.trim()) return null;
  const trimmed = url.trim();
  try {
    const ytMatch = trimmed.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    );
    if (ytMatch && ytMatch[1]) {
      return { isEmbed: true, src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}` };
    }
    const vimeoMatch = trimmed.match(/(?:vimeo\.com\/)(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return { isEmbed: true, src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
    }
    return { isEmbed: false, src: trimmed };
  } catch {
    return { isEmbed: false, src: trimmed };
  }
}

function UnitDetail() {
  const { courseSlug, semesterNumber, subjectSlug, unitNumber } = Route.useParams();
  const loaderData = Route.useLoaderData();
  const { user } = useAuth();
  const qc = useQueryClient();

  const [activeTab, setActiveTab] = useState<"LEARN" | "NOTES" | "PRACTICE">("LEARN");

  /* ─────────── Data Query ─────────── */

  const dataQuery = useQuery({
    queryKey: ["public", "unit", courseSlug, semesterNumber, subjectSlug, unitNumber],
    queryFn: async () => {
      const { data: course } = await supabase
        .from("courses")
        .select("id, title")
        .eq("slug", courseSlug)
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();
      if (!course) throw notFound();

      const { data: sem } = await supabase
        .from("semesters")
        .select("id, number, title")
        .eq("course_id", course.id)
        .eq("number", Number(semesterNumber))
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();
      if (!sem) throw notFound();

      const { data: subject } = await supabase
        .from("subjects")
        .select("id, code, title")
        .eq("semester_id", sem.id)
        .eq("slug", subjectSlug)
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();
      if (!subject) throw notFound();

      const { data: unit } = await supabase
        .from("units")
        .select("id, number, title, summary")
        .eq("subject_id", subject.id)
        .eq("number", Number(unitNumber))
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();
      if (!unit) throw notFound();

      const contentFilter =
        unit.number === 1 ? `unit_id.eq.${unit.id},unit_id.is.null` : `unit_id.eq.${unit.id}`;

      const [
        { data: contentItemsRes },
        { data: legacyNotesRes },
        { data: siblingsRes },
        { data: quizzesRes },
      ] = await Promise.all([
        supabase
          .from("content_items")
          .select(
            "id, type, title, description, file_path, file_bucket, file_mime, file_size_bytes, file_url, tags, created_at",
          )
          .eq("subject_id", subject.id)
          .or(contentFilter)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("created_at", { ascending: true }),
        supabase
          .from("notes")
          .select(
            "id, title, summary, body, file_path, file_bucket, file_mime, file_size_bytes, created_at",
          )
          .eq("unit_id", unit.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("sort_order")
          .order("created_at"),
        supabase
          .from("units")
          .select("id, number")
          .eq("subject_id", subject.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("number"),
        supabase
          .from("quizzes")
          .select("id, title, time_limit_minutes")
          .eq("unit_id", unit.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("order_index"),
      ]);

      const items: UnitContentItem[] = (contentItemsRes ?? []).map((c) => ({
        id: c.id,
        type: (c.type ?? "note") as UnitContentItem["type"],
        title: c.title,
        description: c.description,
        body: c.description,
        file_path: c.file_path,
        file_bucket: c.file_bucket,
        file_mime: c.file_mime,
        file_size_bytes: c.file_size_bytes,
        file_url: c.file_url,
        tags: c.tags ?? [],
        created_at: c.created_at ?? "",
      }));

      // Add legacy notes that are not duplicated by ID in content_items
      const itemIds = new Set(items.map((i) => i.id));
      for (const n of legacyNotesRes ?? []) {
        if (!itemIds.has(n.id)) {
          items.push({
            id: n.id,
            type: n.file_mime === "application/pdf" ? "pdf" : "note",
            title: n.title,
            description: n.summary,
            body: n.body || n.summary,
            file_path: n.file_path,
            file_bucket: n.file_bucket,
            file_mime: n.file_mime,
            file_size_bytes: n.file_size_bytes,
            file_url: null,
            created_at: n.created_at ?? "",
          });
        }
      }

      return {
        course,
        sem,
        subject,
        unit,
        items,
        siblings: (siblingsRes ?? []) as SiblingUnit[],
        quizzes: (quizzesRes ?? []) as QuizRow[],
      };
    },
    initialData: loaderData,
  });

  const unitId = dataQuery.data?.unit.id;
  const primaryQuiz = dataQuery.data?.quizzes[0];

  // 2. Fetch Quiz Questions & PYQ Insights
  const quizDetailsQuery = useQuery({
    queryKey: ["unit-quiz-details", primaryQuiz?.id],
    enabled: !!primaryQuiz?.id,
    queryFn: async () => {
      const { data: qst, error } = await supabase
        .from("quiz_questions")
        .select("id, prompt, explanation, exam_name, year, points, difficulty")
        .eq("quiz_id", primaryQuiz!.id);
      if (error) throw error;
      return (qst ?? []) as PyqQuestion[];
    },
  });

  // 3. Fetch User Quiz Attempts for Accuracy
  const userAttemptQuery = useQuery({
    queryKey: ["unit-user-attempt", primaryQuiz?.id, user?.id],
    enabled: !!primaryQuiz?.id && !!user?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("quiz_attempts")
        .select("id, pct, score, max_score, passed")
        .eq("quiz_id", primaryQuiz!.id)
        .eq("user_id", user!.id)
        .order("completed_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data;
    },
  });

  // 4. Progress tracking
  const progressQuery = useQuery({
    queryKey: ["student", "unit-progress", user?.id, unitId],
    enabled: !!user?.id && !!unitId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("progress_tracking")
        .select("id, status, progress_pct, completed_at")
        .eq("user_id", user!.id)
        .eq("unit_id", unitId!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const completeMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id || !unitId) throw new Error("Not signed in");
      const existing = progressQuery.data;
      const now = new Date().toISOString();
      if (existing) {
        const { error } = await supabase
          .from("progress_tracking")
          .update({
            status: "completed",
            progress_pct: 100,
            completed_at: now,
            last_activity_at: now,
          })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("progress_tracking").insert({
          user_id: user.id,
          unit_id: unitId,
          status: "completed",
          progress_pct: 100,
          completed_at: now,
          last_activity_at: now,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["student", "unit-progress", user?.id, unitId] });
      qc.invalidateQueries({ queryKey: ["student", "subject-progress"] });
      qc.invalidateQueries({ queryKey: ["student", "sem-progress"] });
      qc.invalidateQueries({ queryKey: ["student-detailed-progress"] });
      qc.invalidateQueries({ queryKey: ["student-streak"] });
    },
  });

  /* ─────────── Derived Content Filters ─────────── */

  const items = dataQuery.data?.items ?? [];
  const readArticles = useMemo(
    () => items.filter((i: UnitContentItem) => i.type === "note" || (!i.file_path && i.body)),
    [items],
  );
  const referenceMaterials = useMemo(
    () => items.filter((i: UnitContentItem) => i.type === "pdf" || i.type === "ppt" || i.file_path),
    [items],
  );

  const pyqQuestions = useMemo(
    () =>
      (quizDetailsQuery.data ?? []).filter(
        (q: PyqQuestion) => q.exam_name || q.year || q.points >= 5,
      ),
    [quizDetailsQuery.data],
  );

  const readMinutes = useMemo(() => estimateReadMinutes(readArticles), [readArticles]);

  const toc = useMemo(
    () =>
      readArticles.flatMap((n: UnitContentItem) => {
        const articleSlugId = `content-${slugify(n.title)}-${n.id.slice(0, 6)}`;
        const blocks = parseMarkdownToBlocks(n.body || n.description || "");
        const subheadings = blocks
          .filter((b) => b.type === "heading2" || b.type === "heading3")
          .map((b) => ({
            id: `heading-${slugify(b.content)}-${b.id}`,
            title: b.content,
            isSub: b.type === "heading3",
          }));

        return [{ id: articleSlugId, title: n.title, isSub: false }, ...subheadings];
      }),
    [readArticles],
  );

  const { prevUnit, nextUnit } = useMemo(() => {
    const list = dataQuery.data?.siblings ?? [];
    const idx = list.findIndex((u: SiblingUnit) => u.number === Number(unitNumber));
    return {
      prevUnit: idx > 0 ? list[idx - 1] : null,
      nextUnit: idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null,
    };
  }, [dataQuery.data?.siblings, unitNumber]);

  const isCompleted = progressQuery.data?.status === "completed";

  /* ─────────── Scroll Progress & Active Section ─────────── */

  const articleRef = useRef<HTMLElement | null>(null);
  const [readPct, setReadPct] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(toc[0]?.id ?? null);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = Math.max(1, rect.height - viewport);
      const scrolled = Math.min(total, Math.max(0, -rect.top));
      const pct = Math.round((scrolled / total) * 100);
      setReadPct(pct);

      let current: string | null = toc[0]?.id ?? null;
      for (const item of toc) {
        const node = document.getElementById(item.id);
        if (!node) continue;
        if (node.getBoundingClientRect().top - 120 <= 0) current = item.id;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [toc]);

  if (dataQuery.isLoading) {
    return (
      <div className="min-h-dvh bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-4 h-10 w-3/4" />
          <Skeleton className="mt-3 h-4 w-1/2" />
          <div className="mt-10 space-y-4">
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
        </main>
      </div>
    );
  }

  if (dataQuery.isError || !dataQuery.data) {
    return (
      <div className="min-h-dvh bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
          <EmptyState
            icon={AlertCircle}
            tone="accent"
            title="This unit is not available yet"
            description="The unit may still be in draft or unpublished. Content will appear here once published."
            primaryAction={{ label: "Browse courses", to: "/courses", icon: BookOpen }}
          />
        </main>
      </div>
    );
  }

  const { subject, unit } = dataQuery.data;

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <SiteHeader />

      {/* ─── Compact Reading Header ─── */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <Link
                to="/courses/$courseSlug/$semesterNumber/$subjectSlug"
                params={{ courseSlug, semesterNumber, subjectSlug }}
                className="inline-flex items-center gap-1.5 rounded-md text-[11px] font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="truncate">
                  {subject.code} · {subject.title}
                </span>
              </Link>
              <div className="mt-0.5 flex items-center gap-3 truncate">
                <span className="font-mono text-[10px] uppercase font-bold text-primary">
                  Unit {unit.number}
                </span>
                <h1 className="truncate font-display text-sm font-semibold text-foreground sm:text-base">
                  {unit.title}
                </h1>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {readMinutes > 0 && (
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium text-muted-foreground">
                  <Timer className="h-3 w-3" aria-hidden />
                  {readMinutes} min read
                </span>
              )}
              {isCompleted ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3 py-1 text-[11px] font-semibold">
                  <Check className="h-3 w-3" /> Completed
                </span>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => completeMutation.mutate()}
                  disabled={completeMutation.isPending || !user}
                  className="rounded-full h-8 text-xs font-semibold"
                >
                  <Check className="h-3 w-3 mr-1" /> Mark Complete
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Reading progress bar */}
        <div className="h-0.5 w-full bg-transparent">
          <div
            className="h-full bg-primary transition-all duration-150 ease-out"
            style={{ width: `${readPct}%` }}
          />
        </div>
      </div>

      {/* ─── Main Content Hub ─── */}
      <main className="flex-1 mx-auto w-full sm:max-w-6xl px-4 sm:px-8 pb-24 pt-4 sm:pt-8 min-w-0">
        <Breadcrumbs
          className="mb-4 sm:mb-6"
          items={[
            { label: "Courses", to: "/courses" },
            { label: "Course", to: "/courses/$courseSlug", params: { courseSlug } },
            {
              label: `Semester ${semesterNumber}`,
              to: "/courses/$courseSlug/$semesterNumber",
              params: { courseSlug, semesterNumber },
            },
            {
              label: subject.title,
              to: "/courses/$courseSlug/$semesterNumber/$subjectSlug",
              params: { courseSlug, semesterNumber, subjectSlug },
            },
            { label: `Unit ${unit.number}` },
          ]}
        />

        {/* Unit Header Block */}
        <div className="mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl border border-border/80 bg-linear-to-br from-primary/8 via-surface to-card p-4 sm:p-8 shadow-soft">
          <Badge
            variant="outline"
            className="mb-2 text-xs font-mono font-bold rounded-lg text-primary border-primary/30"
          >
            Unit {unit.number} Learning Hub
          </Badge>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {unit.title}
          </h2>
          {unit.summary && (
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
              {unit.summary}
            </p>
          )}

          {/* Three Pillar Tabs */}
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
            <button
              type="button"
              onClick={() => setActiveTab("LEARN")}
              className={cn(
                "flex flex-1 sm:flex-initial items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all text-center",
                activeTab === "LEARN"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <BookOpen className="h-4 w-4 shrink-0" /> Read &amp; Master ({readArticles.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("NOTES")}
              className={cn(
                "flex flex-1 sm:flex-initial items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all text-center",
                activeTab === "NOTES"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <FileType className="h-4 w-4 shrink-0" /> Notes ({referenceMaterials.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("PRACTICE")}
              className={cn(
                "flex flex-1 sm:flex-initial items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all text-center",
                activeTab === "PRACTICE"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <FlaskConical className="h-4 w-4 shrink-0" /> Practice (
              {quizDetailsQuery.data?.length ?? 0})
            </button>
          </div>
        </div>

        {/* ─── TAB 1: READ & MASTER ─── */}
        {activeTab === "LEARN" && (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] min-w-0">
            <article ref={articleRef} className="min-w-0 max-w-full overflow-hidden">
              {/* Mobile Collapsible "On this page" TOC */}
              {toc.length > 1 && (
                <div className="mb-6 rounded-2xl border border-border/80 bg-card p-3.5 shadow-soft lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileTocOpen(!mobileTocOpen)}
                    className="flex w-full items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    <span className="flex items-center gap-2 text-foreground">
                      <ListOrdered className="h-4 w-4 text-primary" /> On this page
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        mobileTocOpen && "rotate-180",
                      )}
                    />
                  </button>
                  {mobileTocOpen && (
                    <nav className="mt-3 border-t border-border/60 pt-3">
                      <ol className="space-y-1.5 text-xs">
                        {toc.map((item: any, i: number) => (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              onClick={() => setMobileTocOpen(false)}
                              className={cn(
                                "flex gap-2 rounded-xl py-2 px-2.5 transition-colors",
                                item.isSub && "pl-5 text-muted-foreground/80",
                                activeSection === item.id
                                  ? "bg-primary/10 font-bold text-primary"
                                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                              )}
                            >
                              {!item.isSub && (
                                <span className="font-mono text-muted-foreground/60">{i + 1}.</span>
                              )}
                              <span className="truncate">{item.title}</span>
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  )}
                </div>
              )}

              {readArticles.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  tone="accent"
                  title="Educational article in progress"
                  description="The online learning content for this unit is currently being drafted. Check back soon."
                  primaryAction={{
                    label: "View reference notes",
                    onClick: () => setActiveTab("NOTES"),
                    icon: FileType,
                  }}
                />
              ) : (
                <div className="space-y-12 min-w-0 max-w-full">
                  {readArticles.map((item: UnitContentItem, i: number) => (
                    <EducationalContentRenderer
                      key={item.id}
                      title={item.title}
                      content={item.body || item.description || ""}
                      anchorId={toc[i]?.id ?? `content-${item.id}`}
                    />
                  ))}
                </div>
              )}

              {/* End of Lesson Action Loop */}
              <div className="mt-12 rounded-2xl sm:rounded-3xl border border-primary/30 bg-linear-to-r from-primary/10 via-surface to-card p-6 sm:p-8 shadow-soft">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
                      <FlaskConical className="h-6 w-6" />
                    </div>
                    <div>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-bold uppercase text-primary border-primary/30 mb-1"
                      >
                        Interactive Knowledge Check
                      </Badge>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        Ready to test yourself on Unit {unit.number}?
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 max-w-md">
                        You've covered the core concepts. Practice instant MCQs to measure your
                        accuracy and prepare for university exams.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                    {!isCompleted && (
                      <Button
                        variant="outline"
                        onClick={() => completeMutation.mutate()}
                        disabled={completeMutation.isPending || !user}
                        className="rounded-2xl h-11 px-5 text-xs font-bold"
                      >
                        <Check className="h-4 w-4 mr-1.5" /> Mark Unit Complete
                      </Button>
                    )}

                    {primaryQuiz && (
                      <Button asChild className="rounded-2xl h-11 px-6 font-bold text-xs shadow-sm">
                        <Link to="/quizzes/$quizId" params={{ quizId: primaryQuiz.id }}>
                          Practice Unit MCQs <ArrowRight className="h-4 w-4 ml-1.5" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Next / Previous Unit Navigation */}
              <nav
                aria-label="Unit navigation"
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                {prevUnit ? (
                  <Link
                    to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                    params={{
                      courseSlug,
                      semesterNumber,
                      subjectSlug,
                      unitNumber: String(prevUnit.number),
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 flex-1"
                  >
                    <ArrowLeft className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase text-muted-foreground">
                        Previous Unit
                      </div>
                      <div className="font-bold text-sm text-foreground truncate">
                        Unit {prevUnit.number}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="hidden sm:block flex-1" />
                )}

                {primaryQuiz && (
                  <Button
                    asChild
                    variant="secondary"
                    className="rounded-2xl h-12 px-5 font-bold text-xs shrink-0 shadow-xs"
                  >
                    <Link to="/quizzes/$quizId" params={{ quizId: primaryQuiz.id }}>
                      <FlaskConical className="h-4 w-4 mr-2" /> Practice MCQs
                    </Link>
                  </Button>
                )}

                {nextUnit ? (
                  <Link
                    to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                    params={{
                      courseSlug,
                      semesterNumber,
                      subjectSlug,
                      unitNumber: String(nextUnit.number),
                    }}
                    className="flex items-center justify-end text-right gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 flex-1"
                  >
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase text-muted-foreground">
                        Next Unit
                      </div>
                      <div className="font-bold text-sm text-foreground truncate">
                        Unit {nextUnit.number}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </Link>
                ) : (
                  <div className="hidden sm:block flex-1" />
                )}
              </nav>
            </article>

            {/* Desktop Sticky TOC */}
            {toc.length > 1 && (
              <aside className="hidden lg:block self-start sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
                <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <ListOrdered className="h-3.5 w-3.5 text-primary" /> Table of Contents
                  </div>
                  <nav>
                    <ol className="space-y-1 text-xs">
                      {toc.map((item: any, i: number) => {
                        const active = activeSection === item.id;
                        return (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              className={cn(
                                "flex gap-2 rounded-xl py-1.5 px-2.5 transition-colors",
                                item.isSub && "pl-5 text-muted-foreground/80",
                                active
                                  ? "bg-primary/10 font-bold text-primary"
                                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                              )}
                            >
                              {!item.isSub && (
                                <span className="font-mono text-muted-foreground/60">{i + 1}.</span>
                              )}
                              <span className="truncate">{item.title}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ol>
                  </nav>
                </div>
              </aside>
            )}
          </div>
        )}

        {/* ─── TAB 2: REFERENCE NOTES ─── */}
        {activeTab === "NOTES" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
              <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2 mb-1">
                <FileType className="h-5 w-5 text-primary" /> College Reference Notes &amp; Slides
              </h3>
              <p className="text-xs text-muted-foreground mb-6">
                Official documents, presentation slides, and university lecture PDFs for Unit{" "}
                {unit.number}.
              </p>

              {referenceMaterials.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-8 text-center">
                  <FileText className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
                  <div className="text-sm font-semibold text-foreground">
                    Reference notes coming soon
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                    You can study the complete online article in the Read &amp; Master tab above
                    while official PDFs are uploaded.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveTab("LEARN")}
                    className="mt-4 rounded-xl text-xs font-semibold"
                  >
                    Read Online Article
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {referenceMaterials.map((item: UnitContentItem) => (
                    <ReferenceCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── TAB 3: PRACTICE & PYQ INSIGHTS ─── */}
        {activeTab === "PRACTICE" && (
          <div className="space-y-8">
            {/* Unit MCQ Card */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-bold uppercase text-primary border-primary/30 mb-2"
                  >
                    Unit {unit.number} Question Bank
                  </Badge>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Interactive Unit Quiz
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span>{quizDetailsQuery.data?.length ?? 0} Questions</span>
                    {userAttemptQuery.data && (
                      <span className="font-semibold text-primary">
                        · Your best accuracy:{" "}
                        {userAttemptQuery.data.pct ??
                          Math.round(
                            ((userAttemptQuery.data.score || 0) /
                              (userAttemptQuery.data.max_score || 1)) *
                              100,
                          )}
                        %
                      </span>
                    )}
                  </div>
                </div>

                {primaryQuiz ? (
                  <Button
                    asChild
                    size="lg"
                    className="rounded-2xl h-12 px-6 font-bold text-xs shrink-0 shadow-sm"
                  >
                    <Link to="/quizzes/$quizId" params={{ quizId: primaryQuiz.id }}>
                      <FlaskConical className="h-4 w-4 mr-2" /> Practice Unit MCQs
                    </Link>
                  </Button>
                ) : (
                  <div className="text-xs text-muted-foreground font-medium">
                    No quiz attached to this unit yet.
                  </div>
                )}
              </div>
            </div>

            {/* Important Exam Questions / PYQ Insights */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">
                  Important Exam Questions (PYQ Insights)
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                Frequently repeated university exam questions from Unit {unit.number}.
              </p>

              {pyqQuestions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-6 text-center text-xs text-muted-foreground">
                  PYQ questions for Unit {unit.number} are being indexed from university papers.
                </div>
              ) : (
                <div className="space-y-3">
                  {pyqQuestions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="rounded-2xl border border-border/70 bg-muted/20 p-4 transition-colors hover:border-primary/40"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-muted-foreground">
                            Q{idx + 1}.
                          </span>
                          {q.points && (
                            <Badge
                              variant="outline"
                              className="text-[10px] font-bold rounded-md bg-card"
                            >
                              {q.points} Marks
                            </Badge>
                          )}
                          {q.year && (
                            <Badge
                              variant="outline"
                              className="text-[10px] font-bold rounded-md bg-card text-primary border-primary/30"
                            >
                              {q.year} {q.exam_name || "Exam"}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-foreground leading-snug">{q.prompt}</h4>

                      {q.explanation && (
                        <div className="mt-2 text-xs text-muted-foreground border-l-2 border-primary/40 pl-3 py-0.5">
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

/* ─────────── ReferenceCard ─────────── */

function ReferenceCard({ item }: { item: UnitContentItem }) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(item.file_url ?? null);

  useEffect(() => {
    if (item.file_url) {
      setPdfUrl(item.file_url);
      return;
    }
    if (!item.file_path) return;
    let active = true;
    (async () => {
      try {
        const { data } = await supabase.storage
          .from(item.file_bucket ?? "notes")
          .createSignedUrl(item.file_path!, 60 * 60);
        if (active && data?.signedUrl) setPdfUrl(data.signedUrl);
      } catch {
        const { data: pubData } = supabase.storage
          .from(item.file_bucket ?? "notes")
          .getPublicUrl(item.file_path!);
        if (active && pubData?.publicUrl) setPdfUrl(pubData.publicUrl);
      }
    })();
    return () => {
      active = false;
    };
  }, [item.file_path, item.file_bucket, item.file_url]);

  return (
    <div className="rounded-2xl border border-border/80 bg-muted/20 p-5 flex flex-col justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <FileType className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-bold text-sm text-foreground truncate">{item.title}</div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {item.file_size_bytes ? `${Math.round(item.file_size_bytes / 1024)} KB · ` : ""}
            {item.file_mime ?? "Reference Material"}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-border/60">
        {pdfUrl ? (
          <>
            <Button
              asChild
              size="sm"
              variant="default"
              className="flex-1 rounded-xl text-xs font-bold h-9"
            >
              <a href={pdfUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Open Document
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-xl text-xs font-bold h-9"
            >
              <a href={pdfUrl} download target="_blank" rel="noreferrer">
                <Download className="h-3.5 w-3.5" />
              </a>
            </Button>
          </>
        ) : (
          <div className="text-xs text-muted-foreground">Document url is being processed.</div>
        )}
      </div>
    </div>
  );
}
