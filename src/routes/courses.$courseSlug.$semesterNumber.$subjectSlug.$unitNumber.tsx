import { memo, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
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
  Sparkles,
  Trophy,
  Flame,
  Lightbulb,
  RefreshCw,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  playCelebrationSound,
  playComboSound,
  playCorrectSound,
  playWrongSound,
  playPopSound,
} from "@/lib/sound-fx";
import { SoundToggle } from "@/components/ui/sound-toggle";
import { BiteSizedLessonMode } from "@/components/content/bite-sized-lesson-mode";
import { MascotSvg } from "@/components/gamification/study-mascot";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
import { formatTitleCase } from "@/lib/format";
import { parseMarkdownToBlocks } from "@/components/admin/visual-article-editor";
import { EducationalContentRenderer } from "@/components/content/educational-content-renderer";
import { getCuratedUnitArticles, getCuratedUnitMcqs } from "@/lib/curriculum-content";
import { sanitizeEducationalMarkdown, splitUnitContentIntoTopics } from "@/lib/content-sanitizer";
import { UnitPracticeQuiz, type PracticeQuestion } from "@/components/quiz/unit-practice-quiz";
import { ArticleAudioPlayer } from "@/components/tts/article-audio-player";
import { AiStudyAssistant } from "@/components/ai/ai-study-assistant";
import type { GeneratedQuizQuestion } from "@/lib/gemini.functions";

export type PaperRow = {
  id: string;
  title: string;
  year: number | null;
  exam_type: string | null;
  paper_number: string | null;
  description: string | null;
  file_path: string | null;
  file_bucket: string | null;
};

type UnitDetailData = {
  course: { id: string; title: string };
  sem: { id: string; number: number; title: string };
  subject: { id: string; code: string; title: string };
  unit: { id: string; number: number; title: string; summary: string | null };
  items: UnitContentItem[];
  siblings: SiblingUnit[];
  quizzes: QuizRow[];
  topics: TopicRow[];
  papers: PaperRow[];
};

type TopicRow = { id: string; title: string; sort_order: number };

async function fetchUnitDetails(
  queryClient: QueryClient,
  courseSlug: string,
  semesterNumber: string,
  subjectSlug: string,
  unitNumber: string,
): Promise<UnitDetailData> {
  const queryKey = ["public", "unit", courseSlug, semesterNumber, subjectSlug, unitNumber];
  return await queryClient.ensureQueryData({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select(
          "id, title, semesters!inner(id, number, title, subjects!inner(id, code, title, units!inner(id, number, title, summary)))",
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
        .eq("semesters.subjects.units.number", Number(unitNumber))
        .eq("semesters.subjects.units.status", "published")
        .is("semesters.subjects.units.deleted_at", null)
        .maybeSingle();

      if (error || !data) throw notFound();

      const course = { id: data.id, title: data.title };
      const semRaw = (data.semesters as any[])?.[0];
      if (!semRaw) throw notFound();
      const sem = { id: semRaw.id, number: semRaw.number, title: semRaw.title };

      const subRaw = (semRaw.subjects as any[])?.[0];
      if (!subRaw) throw notFound();
      const subject = { id: subRaw.id, code: subRaw.code, title: subRaw.title };

      const unitRaw = (subRaw.units as any[])?.[0];
      if (!unitRaw) throw notFound();
      const unit = {
        id: unitRaw.id,
        number: unitRaw.number,
        title: unitRaw.title,
        summary: unitRaw.summary ?? null,
      };

      const contentFilter =
        Number(unitNumber) === 1
          ? `unit_id.eq.${unit.id},unit_id.is.null`
          : `unit_id.eq.${unit.id}`;

      const [
        { data: contentItemsRes },
        { data: legacyNotesRes },
        { data: siblingsRes },
        { data: quizzesRes },
        { data: topicsRes },
        { data: papersRes },
      ] = await Promise.all([
        supabase
          .from("content_items")
          .select(
            "id, type, title, description, file_path, file_bucket, file_mime, file_size_bytes, file_url, tags, topic_id, created_at",
          )
          .eq("subject_id", subject.id)
          .or(contentFilter)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("created_at", { ascending: true }),
        supabase
          .from("notes")
          .select(
            "id, title, summary, body, file_path, file_bucket, file_mime, file_size_bytes, topic_id, created_at",
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
          .select("id, title, time_limit_minutes, topic_id")
          .eq("unit_id", unit.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("order_index"),
        supabase
          .from("syllabus_topics")
          .select("id, title, sort_order")
          .eq("unit_id", unit.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("sort_order"),
        supabase
          .from("papers")
          .select("id, title, year, exam_type, paper_number, description, file_path, file_bucket")
          .eq("subject_id", subject.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("year", { ascending: false }),
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
        topic_id: c.topic_id ?? null,
        created_at: c.created_at ?? "",
      }));

      // Include curated syllabus-aligned articles if defined for this unit
      const curated = getCuratedUnitArticles(subject.code, unit.number);
      const existingItemIds = new Set(items.map((it) => it.id));
      for (const art of curated) {
        if (!existingItemIds.has(art.id)) {
          existingItemIds.add(art.id);
          items.push({
            id: art.id,
            type: "note",
            title: art.title,
            description: art.topicTitle,
            body: art.body,
            file_path: null,
            file_bucket: null,
            file_mime: null,
            file_size_bytes: null,
            file_url: null,
            tags: [art.topicTitle],
            topic_id: null,
            created_at: new Date().toISOString(),
          });
        }
      }

      // Include legacy published notes not duplicated by ID in content_items
      for (const n of legacyNotesRes ?? []) {
        if (!existingItemIds.has(n.id)) {
          existingItemIds.add(n.id);
          const isPdf =
            n.file_mime?.includes("pdf") ||
            (n.file_path && n.file_path.toLowerCase().endsWith(".pdf"));

          // If curated articles already provide comprehensive textbook chapters for this unit,
          // only keep the legacy note if it is an actual physical document/PDF attachment.
          if (curated.length > 0 && !isPdf) {
            continue;
          }

          if (isPdf || !n.body) {
            items.push({
              id: n.id,
              type: isPdf ? "pdf" : "note",
              title: n.title,
              description: n.summary ?? null,
              body: n.body ?? n.summary ?? null,
              file_path: n.file_path ?? null,
              file_bucket: n.file_bucket ?? "notes",
              file_mime: n.file_mime ?? null,
              file_size_bytes: n.file_size_bytes ?? null,
              file_url: null,
              tags: [],
              topic_id: n.topic_id ?? null,
              created_at: n.created_at ?? "",
            });
          } else {
            // Split monolithic legacy notes into clean topic-by-topic textbook articles
            const splitTopics = splitUnitContentIntoTopics(
              unit.number,
              unit.title,
              n.body,
              topicsRes ?? undefined,
            );

            if (splitTopics.length > 1) {
              splitTopics.forEach((st) => {
                items.push({
                  id: `${n.id}-${st.id}`,
                  type: "note",
                  title: st.title,
                  description: st.topicTitle,
                  body: st.body,
                  file_path: null,
                  file_bucket: null,
                  file_mime: null,
                  file_size_bytes: null,
                  file_url: null,
                  tags: [st.topicTitle],
                  topic_id: null,
                  created_at: n.created_at ?? new Date().toISOString(),
                });
              });
            } else {
              items.push({
                id: n.id,
                type: "note",
                title: sanitizeEducationalMarkdown(n.title).replace(/^#+\s*/, "") || unit.title,
                description: unit.title,
                body: sanitizeEducationalMarkdown(n.body),
                file_path: null,
                file_bucket: null,
                file_mime: null,
                file_size_bytes: null,
                file_url: null,
                tags: [],
                topic_id: n.topic_id ?? null,
                created_at: n.created_at ?? "",
              });
            }
          }
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
        topics: (topicsRes ?? []) as TopicRow[],
        papers: (papersRes ?? []) as PaperRow[],
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
  topic_id: string | null;
  created_at: string;
};

type SiblingUnit = { id: string; number: number };

type QuizRow = {
  id: string;
  title: string;
  passing_pct?: number | null;
  time_limit_minutes: number | null;
  topic_id: string | null;
};

export type PyqQuestion = {
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

function _getVideoEmbedUrl(
  url: string | null | undefined,
): { isEmbed: boolean; src: string } | null {
  if (!url || !url.trim()) return null;
  const trimmed = url.trim();
  try {
    const ytMatch = trimmed.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/,
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

/* ─────────── Isolated Table of Contents Components (Zero parent re-renders on scroll) ─────────── */

const DesktopStickyToc = memo(function DesktopStickyToc({
  toc,
}: {
  toc: Array<{ id: string; title: string; isSub: boolean }>;
}) {
  const [activeSection, setActiveSection] = useState<string | null>(toc[0]?.id ?? null);

  useEffect(() => {
    if (!toc.length || typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-80px 0px -65% 0px",
        threshold: 0,
      },
    );

    for (const item of toc) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [toc]);

  if (toc.length <= 1) return null;

  return (
    <aside className="hidden lg:block self-start sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
      <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          <ListOrdered className="h-3.5 w-3.5 text-primary" /> Table of Contents
        </div>
        <nav>
          <ol className="space-y-1 text-xs">
            {toc.map((item, i) => {
              const active = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(item.id);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                        setActiveSection(item.id);
                      }
                    }}
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
  );
});

const MobileCollapsibleToc = memo(function MobileCollapsibleToc({
  toc,
}: {
  toc: Array<{ id: string; title: string; isSub: boolean }>;
}) {
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(toc[0]?.id ?? null);

  useEffect(() => {
    if (!toc.length || typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-80px 0px -65% 0px",
        threshold: 0,
      },
    );

    for (const item of toc) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [toc]);

  if (toc.length <= 1) return null;

  return (
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
            {toc.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileTocOpen(false);
                    const target = document.getElementById(item.id);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                      setActiveSection(item.id);
                    }
                  }}
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
  );
});

function UnitDetail() {
  const { courseSlug, semesterNumber, subjectSlug, unitNumber } = Route.useParams();
  const loaderData = Route.useLoaderData();
  const { user } = useAuth();
  const qc = useQueryClient();

  type UnitTabType =
    | "STUDY_MATERIAL"
    | "WRITTEN_PRACTICE"
    | "PRACTICE_QUIZZES"
    | "PHYSICAL_NOTES"
    | "PAPERS";

  const [activeTab, setActiveTab] = useState<UnitTabType>("STUDY_MATERIAL");
  const [selectedTopicId, setSelectedTopicId] = useState<string>("ALL");

  const [studyMode, setStudyMode] = useState<"interactive" | "reader">(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("xrounder_study_mode") as "interactive" | "reader") || "reader"
      );
    }
    return "reader";
  });

  const toggleStudyMode = (mode: "interactive" | "reader") => {
    setStudyMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("xrounder_study_mode", mode);
    }
  };

  const [revealedPyqs, setRevealedPyqs] = useState<Record<string, boolean>>({});
  const [masteredPyqs, setMasteredPyqs] = useState<Record<string, boolean>>({});

  // AI Study Assistant state & custom generated quiz state
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiAssistantTopic, setAiAssistantTopic] = useState<string>("");
  const [aiAssistantContext, setAiAssistantContext] = useState<string>("");
  const [aiAssistantAction, setAiAssistantAction] = useState<"ask" | "explain" | "revision" | "quiz">("ask");
  const [aiAssistantLang, setAiAssistantLang] = useState<"en" | "hinglish" | "hi">("hinglish");
  const [customAiQuizQuestions, setCustomAiQuizQuestions] = useState<PracticeQuestion[] | null>(null);

  const handleLoadCustomQuiz = (questions: GeneratedQuizQuestion[]) => {
    setCustomAiQuizQuestions(questions);
    setActiveTab("PRACTICE_QUIZZES");
    setAiAssistantOpen(false);
    toast.success(`🎯 Loaded ${questions.length} AI-generated questions into the practice engine!`);
  };

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
        { data: topicsRes },
        { data: papersRes },
      ] = await Promise.all([
        supabase
          .from("content_items")
          .select(
            "id, type, title, description, file_path, file_bucket, file_mime, file_size_bytes, file_url, tags, topic_id, created_at",
          )
          .eq("subject_id", subject.id)
          .or(contentFilter)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("created_at", { ascending: true }),
        supabase
          .from("notes")
          .select(
            "id, title, summary, body, file_path, file_bucket, file_mime, file_size_bytes, topic_id, created_at",
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
          .select("id, title, time_limit_minutes, topic_id")
          .eq("unit_id", unit.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("order_index"),
        supabase
          .from("syllabus_topics")
          .select("id, title, sort_order")
          .eq("unit_id", unit.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("sort_order"),
        supabase
          .from("papers")
          .select("id, title, year, exam_type, paper_number, description, file_path, file_bucket")
          .eq("subject_id", subject.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("year", { ascending: false }),
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
        topic_id: c.topic_id ?? null,
        created_at: c.created_at ?? "",
      }));

      // Include curated syllabus-aligned articles if defined for this unit
      const curated = getCuratedUnitArticles(subject.code, unit.number);
      const existingItemIds = new Set(items.map((it) => it.id));
      for (const art of curated) {
        if (!existingItemIds.has(art.id)) {
          existingItemIds.add(art.id);
          items.push({
            id: art.id,
            type: "note",
            title: art.title,
            description: art.topicTitle,
            body: art.body,
            file_path: null,
            file_bucket: null,
            file_mime: null,
            file_size_bytes: null,
            file_url: null,
            tags: [art.topicTitle],
            topic_id: null,
            created_at: new Date().toISOString(),
          });
        }
      }

      // Include legacy published notes not duplicated by ID in content_items
      for (const n of legacyNotesRes ?? []) {
        if (!existingItemIds.has(n.id)) {
          existingItemIds.add(n.id);
          const isPdf =
            n.file_mime?.includes("pdf") ||
            (n.file_path && n.file_path.toLowerCase().endsWith(".pdf"));

          // If curated articles already provide comprehensive textbook chapters for this unit,
          // only keep the legacy note if it is an actual physical document/PDF attachment.
          if (curated.length > 0 && !isPdf) {
            continue;
          }

          if (isPdf || !n.body) {
            items.push({
              id: n.id,
              type: isPdf ? "pdf" : "note",
              title: n.title,
              description: n.summary ?? null,
              body: n.body ?? n.summary ?? null,
              file_path: n.file_path ?? null,
              file_bucket: n.file_bucket ?? "notes",
              file_mime: n.file_mime ?? null,
              file_size_bytes: n.file_size_bytes ?? null,
              file_url: null,
              tags: [],
              topic_id: n.topic_id ?? null,
              created_at: n.created_at ?? "",
            });
          } else {
            // Split monolithic legacy notes into clean topic-by-topic textbook articles
            const splitTopics = splitUnitContentIntoTopics(
              unit.number,
              unit.title,
              n.body,
              topicsRes ?? undefined,
            );

            if (splitTopics.length > 1) {
              splitTopics.forEach((st) => {
                items.push({
                  id: `${n.id}-${st.id}`,
                  type: "note",
                  title: st.title,
                  description: st.topicTitle,
                  body: st.body,
                  file_path: null,
                  file_bucket: null,
                  file_mime: null,
                  file_size_bytes: null,
                  file_url: null,
                  tags: [st.topicTitle],
                  topic_id: null,
                  created_at: n.created_at ?? new Date().toISOString(),
                });
              });
            } else {
              items.push({
                id: n.id,
                type: "note",
                title: sanitizeEducationalMarkdown(n.title).replace(/^#+\s*/, "") || unit.title,
                description: unit.title,
                body: sanitizeEducationalMarkdown(n.body),
                file_path: null,
                file_bucket: null,
                file_mime: null,
                file_size_bytes: null,
                file_url: null,
                tags: [],
                topic_id: n.topic_id ?? null,
                created_at: n.created_at ?? "",
              });
            }
          }
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
        topics: (topicsRes ?? []) as TopicRow[],
        papers: (papersRes ?? []) as PaperRow[],
      };
    },
    initialData: loaderData,
  });

  const unitId = dataQuery.data?.unit.id;
  const unitQuizzes = useMemo(
    () => (dataQuery.data?.quizzes ?? []) as QuizRow[],
    [dataQuery.data?.quizzes],
  );
  const primaryQuiz = unitQuizzes[0];
  const allQuizIds = useMemo(() => unitQuizzes.map((q: QuizRow) => q.id), [unitQuizzes]);

  // 2. Fetch Quiz Questions for all quizzes in this unit
  const quizDetailsQuery = useQuery({
    queryKey: ["unit-quiz-details-all", allQuizIds],
    enabled: allQuizIds.length > 0,
    queryFn: async () => {
      const { data: qst, error } = await supabase
        .from("quiz_questions")
        .select("id, quiz_id, prompt, explanation, exam_name, year, points, difficulty")
        .in("quiz_id", allQuizIds);
      if (error) throw error;
      return (qst ?? []) as Array<PyqQuestion & { quiz_id: string }>;
    },
  });

  // 3. Fetch User Quiz Attempts for all quizzes in this unit
  const userAttemptsQuery = useQuery({
    queryKey: ["unit-user-attempts-all", allQuizIds, user?.id],
    enabled: allQuizIds.length > 0 && !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quiz_attempts")
        .select("id, quiz_id, pct, score, max_score, passed, submitted_at, created_at")
        .in("quiz_id", allQuizIds)
        .eq("user_id", user!.id)
        .not("submitted_at", "is", null)
        .order("submitted_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Array<{
        id: string;
        quiz_id: string;
        pct: number | null;
        score: number | null;
        max_score: number | null;
        passed: boolean | null;
        submitted_at: string | null;
      }>;
    },
  });

  const quizStatsMap = useMemo(() => {
    const qCount = new Map<string, number>();
    for (const q of quizDetailsQuery.data ?? []) {
      qCount.set(q.quiz_id, (qCount.get(q.quiz_id) ?? 0) + 1);
    }

    const bestAttempts = new Map<string, { pct: number; passed: boolean }>();
    for (const att of userAttemptsQuery.data ?? []) {
      const current = bestAttempts.get(att.quiz_id);
      const scorePct =
        typeof att.pct === "number"
          ? Math.round(att.pct)
          : att.max_score
            ? Math.round((Number(att.score ?? 0) / att.max_score) * 100)
            : 0;
      if (!current || scorePct > current.pct) {
        bestAttempts.set(att.quiz_id, { pct: scorePct, passed: !!att.passed });
      }
    }

    return { qCount, bestAttempts };
  }, [quizDetailsQuery.data, userAttemptsQuery.data]);

  const topicsById = useMemo(() => {
    const map = new Map<string, string>();
    for (const t of dataQuery.data?.topics ?? []) {
      map.set(t.id, t.title);
    }
    return map;
  }, [dataQuery.data?.topics]);

  // Backward compatibility alias for single quiz
  const userAttemptQuery = useMemo(() => {
    const best = primaryQuiz ? quizStatsMap.bestAttempts.get(primaryQuiz.id) : undefined;
    return {
      data: best ? { pct: best.pct, passed: best.passed, score: best.pct, max_score: 100 } : null,
    };
  }, [primaryQuiz, quizStatsMap.bestAttempts]);

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
      playCelebrationSound();
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.6 },
        disableForReducedMotion: true,
      });
      setShowCelebrationModal(true);
      qc.invalidateQueries({ queryKey: ["student", "unit-progress", user?.id, unitId] });
      qc.invalidateQueries({ queryKey: ["student", "subject-progress"] });
      qc.invalidateQueries({ queryKey: ["student", "sem-progress"] });
      qc.invalidateQueries({ queryKey: ["student-detailed-progress"] });
      qc.invalidateQueries({ queryKey: ["student-streak"] });
    },
  });

  /* ─────────── Derived Content Filters ─────────── */

  const items = useMemo(() => dataQuery.data?.items ?? [], [dataQuery.data?.items]);
  const papers = useMemo(() => dataQuery.data?.papers ?? [], [dataQuery.data?.papers]);

  const masterRevisionNote = useMemo(() => {
    return (
      items.find(
        (i: UnitContentItem) =>
          !i.file_path &&
          (i.title.toLowerCase().includes("revision") ||
            i.title.toLowerCase().includes("master") ||
            i.title.toLowerCase().includes("complete unit")),
      ) ?? null
    );
  }, [items]);

  const readArticles = useMemo(
    () => items.filter((i: UnitContentItem) => i.type === "note" || (!i.file_path && i.body)),
    [items],
  );

  const referenceMaterials = useMemo(
    () => items.filter((i: UnitContentItem) => i.type === "pdf" || i.type === "ppt" || !!i.file_path),
    [items],
  );

  const calibratedUnitMcqs = useMemo(() => {
    if (!dataQuery.data?.subject?.code || !dataQuery.data?.unit?.number) return [];
    return getCuratedUnitMcqs(dataQuery.data.subject.code, dataQuery.data.unit.number);
  }, [dataQuery.data?.subject?.code, dataQuery.data?.unit?.number]);

  const pyqQuestions = useMemo(
    () =>
      (quizDetailsQuery.data ?? []).filter(
        (q: PyqQuestion) => q.exam_name || q.year || q.points >= 5,
      ),
    [quizDetailsQuery.data],
  );

  const readMinutes = useMemo(() => estimateReadMinutes(readArticles), [readArticles]);

  const toc = useMemo<{ id: string; title: string; isSub: boolean }[]>(
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

  /* ─────────── Scroll Progress (Direct DOM, zero layout reflow, zero re-renders) ─────────── */

  const articleRef = useRef<HTMLElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBadgeRef = useRef<HTMLSpanElement>(null);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const readingMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    let raf = 0;

    const compute = () => {
      const el = articleRef.current;
      if (!el) return;
      // High-performance geometry using cached offsets and compositor scroll position
      // Zero forced synchronous layout reflows (getBoundingClientRect eliminated)
      const elTop = el.offsetTop;
      const elHeight = el.offsetHeight;
      const viewport = window.innerHeight;
      const total = Math.max(1, elHeight - viewport);
      const scrolled = Math.min(total, Math.max(0, window.scrollY - elTop));
      const pct = Math.round((scrolled / total) * 100);

      // Fast direct DOM updates — zero React re-renders during high-frequency scroll
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${pct}%`;
      }
      if (progressBadgeRef.current) {
        progressBadgeRef.current.textContent = `${pct}% read`;
      }

      // Micro-dopamine milestones during focused reading
      if (pct >= 25 && !readingMilestones.current.has(25)) {
        readingMilestones.current.add(25);
        playComboSound(1);
      }
      if (pct >= 50 && !readingMilestones.current.has(50)) {
        readingMilestones.current.add(50);
        playComboSound(2);
        toast.success("🔥 50% read — Halfway through this unit! Keep the momentum going!", {
          duration: 3500,
        });
      }
      if (pct >= 75 && !readingMilestones.current.has(75)) {
        readingMilestones.current.add(75);
        playComboSound(3);
      }
      if (pct >= 96 && !readingMilestones.current.has(100)) {
        readingMilestones.current.add(100);
        playCelebrationSound();
        toast.success("🏆 All topics read! Tap 'Mark Complete' to lock in +120 XP!", {
          duration: 4500,
        });
      }
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
  }, []);

  // Sparky interactive AI study buddy event bridge
  useEffect(() => {
    const handleSparkyEvent = (e: Event) => {
      const custom = e as CustomEvent<{ action?: "ask" | "explain" | "revision" | "quiz"; lang?: "en" | "hinglish" | "hi"; topicTitle?: string }>;
      const detail = custom.detail || {};
      const unitObj = dataQuery.data?.unit;
      const currTitle =
        detail.topicTitle ||
        (selectedTopicId !== "ALL"
          ? readArticles.find((a: UnitContentItem) => a.id === selectedTopicId)?.title || unitObj?.title || ""
          : unitObj?.title || "");
      const currContext =
        selectedTopicId !== "ALL"
          ? readArticles.find((a: UnitContentItem) => a.id === selectedTopicId)?.body || ""
          : readArticles.map((a: UnitContentItem) => `${a.title}\n${a.body || ""}`).join("\n\n");

      setAiAssistantTopic(currTitle);
      setAiAssistantContext(currContext);
      if (detail.action) setAiAssistantAction(detail.action);
      if (detail.lang) setAiAssistantLang(detail.lang);
      setAiAssistantOpen(true);
    };

    window.addEventListener("open-sparky-ai", handleSparkyEvent);
    return () => window.removeEventListener("open-sparky-ai", handleSparkyEvent);
  }, [selectedTopicId, readArticles, dataQuery.data?.unit]);

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

  const { course, subject, unit } = dataQuery.data;

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <SiteHeader />

      {/* ─── Compact Reading Header ─── */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 shadow-xs backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-3 py-2 sm:px-6 md:px-8 sm:py-2.5">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-4">
            {/* Top row on mobile / Left breadcrumb on desktop */}
            <div className="flex items-center justify-between gap-2 min-w-0">
              <Link
                to="/courses/$courseSlug/$semesterNumber/$subjectSlug"
                params={{ courseSlug, semesterNumber, subjectSlug }}
                className="inline-flex items-center gap-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground shrink-0 max-w-[200px] sm:max-w-xs truncate"
              >
                <ChevronLeft className="h-4 w-4 shrink-0 text-primary" />
                <span className="truncate">{subject.code}</span>
                <span className="hidden md:inline text-muted-foreground/60">·</span>
                <span className="hidden md:inline truncate">{subject.title}</span>
              </Link>

              {/* Mobile Action Controls placed on the top-right row */}
              <div className="flex md:hidden items-center gap-1.5 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    playPopSound();
                    const currTitle =
                      selectedTopicId !== "ALL"
                        ? readArticles.find((a: UnitContentItem) => a.id === selectedTopicId)?.title || unit.title
                        : unit.title;
                    const currContext =
                      selectedTopicId !== "ALL"
                        ? readArticles.find((a: UnitContentItem) => a.id === selectedTopicId)?.body || ""
                        : readArticles.map((a: UnitContentItem) => `${a.title}\n${a.body || ""}`).join("\n\n");
                    setAiAssistantTopic(currTitle);
                    setAiAssistantContext(currContext);
                    setAiAssistantOpen(true);
                  }}
                  className="rounded-full h-7 px-2.5 text-[11px] font-bold border-primary/40 text-primary hover:bg-primary/10 cursor-pointer shadow-xs gap-1"
                  title="Ask Sparky AI Coach"
                >
                  <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                  <span>AI Coach</span>
                </Button>
                <SoundToggle />
                {isCompleted ? (
                  <span
                    className="inline-flex items-center justify-center rounded-full bg-success/15 text-success border border-success/30 h-7 w-7 text-[10px] font-semibold"
                    title="Unit Completed"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                ) : !user ? (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="rounded-full h-7 px-2 text-[10px] font-semibold"
                    title="Sign in to save progress"
                  >
                    <Link to="/auth" search={{ mode: "signin" }}>
                      <Check className="h-3 w-3 mr-0.5" />
                      <span>Sign In</span>
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => completeMutation.mutate()}
                    disabled={completeMutation.isPending}
                    className="rounded-full h-7 w-7 p-0 text-[10px] font-semibold cursor-pointer"
                    title="Mark Unit Complete"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>

            {/* Title row on mobile / Desktop Title & Controls inline */}
            <div className="flex items-center justify-between gap-3 min-w-0">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="font-mono text-[10px] uppercase font-bold text-accent shrink-0">
                  Unit {unit.number}
                </span>
                <span className="text-muted-foreground/40 hidden md:inline">/</span>
                <h1 className="truncate font-display text-xs sm:text-sm md:text-base font-semibold text-foreground">
                  {formatTitleCase(unit.title)}
                </h1>
              </div>

              {/* Desktop Only Actions */}
              <div className="hidden md:flex shrink-0 items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    playPopSound();
                    const currTitle =
                      selectedTopicId !== "ALL"
                        ? readArticles.find((a: UnitContentItem) => a.id === selectedTopicId)?.title || unit.title
                        : unit.title;
                    const currContext =
                      selectedTopicId !== "ALL"
                        ? readArticles.find((a: UnitContentItem) => a.id === selectedTopicId)?.body || ""
                        : readArticles.map((a: UnitContentItem) => `${a.title}\n${a.body || ""}`).join("\n\n");
                    setAiAssistantTopic(currTitle);
                    setAiAssistantContext(currContext);
                    setAiAssistantOpen(true);
                  }}
                  className="rounded-full h-8 px-3 text-xs font-bold border-primary/40 text-primary hover:bg-primary/10 cursor-pointer shadow-xs gap-1.5"
                  title="Open Sparky AI Study Coach"
                >
                  <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                  <span>Ask AI Coach</span>
                </Button>
                <SoundToggle />
                {readMinutes > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium text-muted-foreground">
                    <Timer className="h-3 w-3" aria-hidden />
                    {readMinutes} min read
                  </span>
                )}
                <span
                  ref={progressBadgeRef}
                  className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-surface px-2.5 py-1 text-[11px] font-mono font-semibold text-accent"
                >
                  0% read
                </span>
                {isCompleted ? (
                  <span
                    className="inline-flex items-center justify-center rounded-full bg-success/15 text-success border border-success/30 px-3 py-1 text-[11px] font-semibold"
                    title="Unit Completed"
                  >
                    <Check className="h-3.5 w-3.5 mr-1" />
                    <span>Completed</span>
                  </span>
                ) : !user ? (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="rounded-full h-8 px-3 text-xs font-semibold"
                    title="Sign in to save progress"
                  >
                    <Link to="/auth" search={{ mode: "signin" }}>
                      <Check className="h-3.5 w-3.5 mr-1" />
                      <span>Sign in to save</span>
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => completeMutation.mutate()}
                    disabled={completeMutation.isPending}
                    className="rounded-full h-8 px-3 text-xs font-semibold cursor-pointer"
                    title="Mark Unit Complete"
                  >
                    <Check className="h-3.5 w-3.5 mr-1" />
                    <span>Mark Complete</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reading progress bar */}
        <div className="h-1 w-full bg-muted/40 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-accent transition-all duration-150 ease-out"
            style={{ width: "0%" }}
          />
        </div>
      </div>

      {/* ─── Main Content Hub ─── */}
      <main className="flex-1 mx-auto w-full sm:max-w-6xl px-4 sm:px-8 pb-24 pt-4 sm:pt-8 min-w-0">
        <Breadcrumbs
          className="mb-4 sm:mb-6"
          items={[
            { label: "Courses", to: "/courses" },
            {
              label: course?.title ?? "Course",
              to: "/courses/$courseSlug",
              params: { courseSlug },
            },
            {
              label: `Semester ${semesterNumber}`,
              to: "/courses/$courseSlug/$semesterNumber",
              params: { courseSlug, semesterNumber },
            },
            {
              label: formatTitleCase(subject.title),
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
          <h2 className="font-display text-2xl sm:text-4xl font-normal text-foreground tracking-tight">
            {formatTitleCase(unit.title)}
          </h2>

          {/* Five Distinct Study Resource Pillars */}
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                setActiveTab("STUDY_MATERIAL");
              }}
              className={cn(
                "btn-squishy flex flex-1 sm:flex-initial items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all text-center cursor-pointer",
                activeTab === "STUDY_MATERIAL"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <BookOpen className="h-4 w-4 shrink-0" /> Study Material ({readArticles.length})
            </button>

            <button
              type="button"
              onClick={() => {
                playPopSound();
                setActiveTab("WRITTEN_PRACTICE");
              }}
              className={cn(
                "btn-squishy flex flex-1 sm:flex-initial items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all text-center cursor-pointer",
                activeTab === "WRITTEN_PRACTICE"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <FileText className="h-4 w-4 shrink-0" /> Written Practice ({pyqQuestions.length > 0 ? pyqQuestions.length : "Exam Focus"})
            </button>

            <button
              type="button"
              onClick={() => {
                playPopSound();
                setActiveTab("PRACTICE_QUIZZES");
              }}
              className={cn(
                "btn-squishy flex flex-1 sm:flex-initial items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all text-center cursor-pointer",
                activeTab === "PRACTICE_QUIZZES"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <FlaskConical className="h-4 w-4 shrink-0" /> Practice Quizzes ({calibratedUnitMcqs.length > 0 ? `${calibratedUnitMcqs.length} MCQs` : (quizDetailsQuery.data?.length ?? 0)})
            </button>

            <button
              type="button"
              onClick={() => {
                playPopSound();
                setActiveTab("PHYSICAL_NOTES");
              }}
              className={cn(
                "btn-squishy flex flex-1 sm:flex-initial items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all text-center cursor-pointer",
                activeTab === "PHYSICAL_NOTES"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <FileType className="h-4 w-4 shrink-0" /> Physical Notes ({referenceMaterials.length})
            </button>

            <button
              type="button"
              onClick={() => {
                playPopSound();
                setActiveTab("PAPERS");
              }}
              className={cn(
                "btn-squishy flex flex-1 sm:flex-initial items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all text-center cursor-pointer",
                activeTab === "PAPERS"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <GraduationCap className="h-4 w-4 shrink-0" /> Previous Year Papers ({papers.length})
            </button>
          </div>
        </div>

        {/* ─── TAB 1: STUDY MATERIAL ─── */}
        {activeTab === "STUDY_MATERIAL" && (
          <div className="space-y-6">
            {readArticles.length > 0 && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/80 bg-muted/40 p-2 sm:px-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleStudyMode("reader")}
                      className={cn(
                        "flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
                        studyMode === "reader"
                          ? "bg-card text-primary shadow-xs ring-1 ring-border"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      📖 Article Reader ({readArticles.length} Topics)
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleStudyMode("interactive")}
                      className={cn(
                        "flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
                        studyMode === "interactive"
                          ? "bg-card text-primary shadow-xs ring-1 ring-border"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Zap className="h-3.5 w-3.5 text-amber-500" />⚡ Interactive Cards
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
                      {studyMode === "reader"
                        ? "Curated GeeksforGeeks-style educational articles"
                        : "Bite-sized cards with instant checks & XP"}
                    </span>
                  </div>
                </div>

                {/* Topic Selector Pills */}
                {studyMode === "reader" && readArticles.length > 1 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    <button
                      type="button"
                      onClick={() => {
                        playPopSound();
                        setSelectedTopicId("ALL");
                      }}
                      className={cn(
                        "rounded-xl px-3 py-1.5 text-xs font-semibold shrink-0 transition-all cursor-pointer",
                        selectedTopicId === "ALL"
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "border border-border/80 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                      )}
                    >
                      All Topics (Continuous)
                    </button>
                    {readArticles.map((art: UnitContentItem, idx: number) => (
                      <button
                        key={art.id}
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setSelectedTopicId(art.id);
                        }}
                        className={cn(
                          "rounded-xl px-3 py-1.5 text-xs font-semibold shrink-0 transition-all max-w-[220px] truncate cursor-pointer",
                          selectedTopicId === art.id
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "border border-border/80 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                        )}
                        title={art.title}
                      >
                        {idx + 1}.{" "}
                        {art.title
                          .replace(/^[A-Z0-9-]{3,10}:\s*/i, "")
                          .replace(/^Unit \d+ Master Exam Revision Notes:\s*/i, "")
                          .replace(/^Topic \d+[:\s-]*/i, "")
                          .replace(/^#+\s*/, "")
                          .trim()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {studyMode === "interactive" ? (
              <BiteSizedLessonMode
                articles={readArticles}
                topics={dataQuery.data.topics ?? []}
                unit={dataQuery.data.unit}
                subject={dataQuery.data.subject}
                courseSlug={courseSlug}
                semesterNumber={semesterNumber}
                subjectSlug={subjectSlug}
                unitNumber={unitNumber}
                pyqQuestions={pyqQuestions}
                primaryQuizId={primaryQuiz?.id}
                isCompleted={isCompleted}
                onCompleteUnit={() => completeMutation.mutate()}
                onSwitchToReader={() => toggleStudyMode("reader")}
              />
            ) : selectedTopicId !== "ALL" ? (
              (() => {
                const focusedIdx = readArticles.findIndex((a: UnitContentItem) => a.id === selectedTopicId);
                const focusedArticle = focusedIdx >= 0 ? readArticles[focusedIdx] : readArticles[0];
                const prevArt = focusedIdx > 0 ? readArticles[focusedIdx - 1] : null;
                const nextArt =
                  focusedIdx >= 0 && focusedIdx < readArticles.length - 1
                    ? readArticles[focusedIdx + 1]
                    : null;

                return (
                  <div className="space-y-6">
                    <ArticleAudioPlayer
                      text={`${focusedArticle.title}. ${focusedArticle.body || focusedArticle.description || ""}`}
                      title={focusedArticle.title}
                      onAskAi={() => {
                        playPopSound();
                        setAiAssistantTopic(focusedArticle.title);
                        setAiAssistantContext(focusedArticle.body || focusedArticle.description || "");
                        setAiAssistantOpen(true);
                      }}
                    />

                    <EducationalContentRenderer
                      title={focusedArticle.title}
                      content={focusedArticle.body || focusedArticle.description || ""}
                    />

                    {/* Single Topic Navigation Controls */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border/60 pt-6">
                      {prevArt ? (
                        <button
                          type="button"
                          onClick={() => {
                            playPopSound();
                            setSelectedTopicId(prevArt.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card p-3.5 text-left transition-all hover:border-primary/40 flex-1 cursor-pointer"
                        >
                          <ArrowLeft className="h-4 w-4 text-primary shrink-0" />
                          <div className="min-w-0">
                            <div className="text-[10px] font-bold uppercase text-muted-foreground">
                              Previous Topic
                            </div>
                            <div className="font-bold text-xs text-foreground truncate">
                              {prevArt.title}
                            </div>
                          </div>
                        </button>
                      ) : (
                        <div className="hidden sm:block flex-1" />
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setSelectedTopicId("ALL");
                        }}
                        className="rounded-xl border border-border/80 bg-muted/40 px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
                      >
                        View All Topics
                      </button>

                      {nextArt ? (
                        <button
                          type="button"
                          onClick={() => {
                            playPopSound();
                            setSelectedTopicId(nextArt.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="flex items-center justify-end gap-2.5 rounded-2xl border border-border/80 bg-card p-3.5 text-right transition-all hover:border-primary/40 flex-1 cursor-pointer"
                        >
                          <div className="min-w-0">
                            <div className="text-[10px] font-bold uppercase text-muted-foreground">
                              Next Topic
                            </div>
                            <div className="font-bold text-xs text-foreground truncate">
                              {nextArt.title}
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                        </button>
                      ) : (
                        <div className="hidden sm:block flex-1" />
                      )}
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] min-w-0">
                <article ref={articleRef} className="min-w-0 max-w-full overflow-hidden">
                  {/* Mobile Collapsible "On this page" TOC */}
                  <MobileCollapsibleToc toc={toc} />

                  {readArticles.length === 0 ? (
                    <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft text-center space-y-4">
                      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">
                          Study Material in preparation
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                          Detailed syllabus articles for Unit {unit.number} are being indexed. You can practice interactive quizzes or review university question papers below.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            playPopSound();
                            setActiveTab("PRACTICE_QUIZZES");
                          }}
                          className="rounded-xl text-xs font-bold"
                        >
                          <FlaskConical className="h-3.5 w-3.5 mr-1.5" /> Practice Quizzes
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            playPopSound();
                            setActiveTab("PHYSICAL_NOTES");
                          }}
                          className="rounded-xl text-xs font-semibold"
                        >
                          <FileType className="h-3.5 w-3.5 mr-1.5" /> Physical Notes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-12 min-w-0 max-w-full">
                      {readArticles.map((item: UnitContentItem, i: number) => (
                        <div key={item.id} className="space-y-4">
                          <ArticleAudioPlayer
                            text={`${item.title}. ${item.body || item.description || ""}`}
                            title={item.title}
                            onAskAi={() => {
                              playPopSound();
                              setAiAssistantTopic(item.title);
                              setAiAssistantContext(item.body || item.description || "");
                              setAiAssistantOpen(true);
                            }}
                          />

                          <EducationalContentRenderer
                            title={item.title}
                            content={item.body || item.description || ""}
                            anchorId={toc[i]?.id ?? `content-${item.id}`}
                          />
                          {/* Topic Checkpoint */}
                          {i < readArticles.length - 1 && (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-border/70 bg-surface/70 px-4 py-3 text-xs">
                              <div className="flex items-center gap-2 text-foreground font-semibold">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20 text-success text-[11px]">
                                  ✓
                                </span>
                                <span>
                                  Topic {i + 1} covered:{" "}
                                  <span className="text-muted-foreground font-normal">
                                    {item.title}
                                  </span>
                                </span>
                              </div>
                              <a
                                href={`#${toc[i + 1]?.id ?? `content-${readArticles[i + 1].id}`}`}
                                className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-primary hover:underline cursor-pointer"
                              >
                                <span>Next: {formatTitleCase(readArticles[i + 1].title)}</span>
                                <span>↓</span>
                              </a>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* End of Lesson Action Loop */}
                      <div className="mt-12 rounded-2xl sm:rounded-3xl border border-primary/20 bg-card p-6 sm:p-8 shadow-xs">
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
                                Practice Ready
                              </Badge>
                              <h3 className="font-display text-lg font-bold text-foreground">
                                Ready to practice Unit {unit.number}?
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1 max-w-md">
                                You've read the core concepts. Take the balanced 10-question practice set to test your mastery!
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                            <Button
                              onClick={() => {
                                playPopSound();
                                setActiveTab("PRACTICE_QUIZZES");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="btn-squishy btn-cta rounded-2xl h-11 px-6 font-bold text-xs shadow-sm cursor-pointer"
                            >
                              <FlaskConical className="h-4 w-4 mr-1.5" /> Start Practice Quiz
                            </Button>

                            {!isCompleted &&
                              (user ? (
                                <Button
                                  variant="ghost"
                                  onClick={() => completeMutation.mutate()}
                                  disabled={completeMutation.isPending}
                                  className="rounded-2xl h-11 px-4 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                                >
                                  <Check className="h-4 w-4 mr-1.5" /> Mark Unit Complete
                                </Button>
                              ) : (
                                <Button
                                  asChild
                                  variant="ghost"
                                  className="rounded-2xl h-11 px-4 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                                >
                                  <Link to="/auth" search={{ mode: "signup" }}>
                                    <Check className="h-4 w-4 mr-1.5" /> Save progress
                                  </Link>
                                </Button>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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
                <DesktopStickyToc toc={toc} />
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 2: WRITTEN PRACTICE ─── */}
        {activeTab === "WRITTEN_PRACTICE" && (
          <div className="space-y-8">
            {/* University Exam Weightage & Format Blueprint */}
            <div className="rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-card to-card p-6 sm:p-7 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-bold uppercase text-primary border-primary/30 mb-2"
                  >
                    Official University Examination Pattern
                  </Badge>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                    Written Examination Blueprint — Unit {unit.number}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                    Odd-semester BCA university examinations follow a 3-tier written format. Focus your preparation on exact definitions, block diagrams, and working mechanisms.
                  </p>
                </div>
                <Badge variant="default" className="text-xs font-bold rounded-xl px-3 py-1.5 shrink-0">
                  Total External: 70 Marks
                </Badge>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/80 bg-background/80 p-4">
                  <div className="text-[11px] font-mono font-bold text-primary uppercase">
                    Section A · 2 Marks Each
                  </div>
                  <div className="font-bold text-sm text-foreground mt-0.5">
                    Very Short Answer / Definitions
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Precise definitions, distinguishing characteristics, and direct technical terms.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/80 p-4">
                  <div className="text-[11px] font-mono font-bold text-primary uppercase">
                    Section B · 5 Marks Each
                  </div>
                  <div className="font-bold text-sm text-foreground mt-0.5">
                    Short Answer / Conceptual
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Block diagrams, comparison tables, step-by-step algorithms, and workings.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-background/80 p-4">
                  <div className="text-[11px] font-mono font-bold text-primary uppercase">
                    Section C · 15 Marks Each
                  </div>
                  <div className="font-bold text-sm text-foreground mt-0.5">
                    Descriptive / Deep Dive
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Full system architecture, hardware hierarchies, comprehensive analysis, and flowcharts.
                  </p>
                </div>
              </div>
            </div>

            {/* Master Unit Revision Note & Model Answers */}
            {masterRevisionNote && (
              <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft space-y-4">
                <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-4">
                  <div>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-bold uppercase text-primary border-primary/30 mb-1"
                    >
                      Master Revision Guide
                    </Badge>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                      {masterRevisionNote.title}
                    </h3>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">Exam High-Yield</span>
                </div>
                <EducationalContentRenderer
                  content={masterRevisionNote.body || masterRevisionNote.description || ""}
                />
              </div>
            )}

            {/* Important University Exam Questions / PYQ Insights */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">
                  Important University Exam Questions &amp; Model Answers
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                University exam questions from Unit {unit.number} with scoring guidelines and model points.
              </p>

              {pyqQuestions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-6 text-center text-xs text-muted-foreground">
                  Written practice questions for Unit {unit.number} are being indexed from university papers.
                </div>
              ) : (
                <div className="space-y-4">
                  {pyqQuestions.map((q, idx) => {
                    const isRevealed = revealedPyqs[q.id];
                    const isMastered = masteredPyqs[q.id];
                    return (
                      <div
                        key={q.id}
                        className={cn(
                          "rounded-2xl border p-4 sm:p-5 transition-all",
                          isMastered
                            ? "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/5"
                            : "border-border/70 bg-muted/20 hover:border-primary/40",
                        )}
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

                          {isMastered && (
                            <Badge className="bg-emerald-600 text-white text-[10px] font-bold">
                              ✓ Mastered (+10 XP)
                            </Badge>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-foreground leading-snug">
                          {q.prompt}
                        </h4>

                        {!isRevealed ? (
                          <div className="mt-3">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setRevealedPyqs((prev) => ({ ...prev, [q.id]: true }));
                                playComboSound(1);
                              }}
                              className="rounded-xl text-xs font-semibold cursor-pointer border-primary/30 text-primary hover:bg-primary/10"
                            >
                              <Lightbulb className="h-3.5 w-3.5 mr-1.5" />
                              Reveal Model Answer &amp; Key Points
                            </Button>
                          </div>
                        ) : (
                          <div className="mt-3 space-y-3 pt-2">
                            <div className="rounded-xl bg-card border border-primary/20 p-3.5 text-xs text-muted-foreground leading-relaxed">
                              <div className="font-bold text-foreground mb-1 flex items-center gap-1.5">
                                <Check className="h-4 w-4 text-emerald-500" />
                                Model Answer &amp; Scoring Criteria:
                              </div>
                              {q.explanation ||
                                "Structure your answer with definition, block diagram, and bulleted comparison points for maximum marks."}
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs text-muted-foreground font-medium mr-1">
                                Self-Assess:
                              </span>
                              <Button
                                type="button"
                                size="sm"
                                variant={isMastered ? "default" : "outline"}
                                onClick={() => {
                                  setMasteredPyqs((prev) => ({ ...prev, [q.id]: true }));
                                  playCorrectSound();
                                  confetti({
                                    particleCount: 25,
                                    spread: 50,
                                    origin: { y: 0.75 },
                                    disableForReducedMotion: true,
                                  });
                                }}
                                className={cn(
                                  "rounded-xl text-xs font-bold cursor-pointer transition-transform active:scale-95",
                                  isMastered && "bg-emerald-600 hover:bg-emerald-700 text-white",
                                )}
                              >
                                <Check className="h-3.5 w-3.5 mr-1" /> I Knew This (+10 XP)
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setMasteredPyqs((prev) => ({ ...prev, [q.id]: false }));
                                  playWrongSound();
                                }}
                                className="rounded-xl text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                              >
                                Need to Revise
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── TAB 3: PRACTICE QUIZZES ─── */}
        {activeTab === "PRACTICE_QUIZZES" && (
          <div className="space-y-6">
            {/* Header & AI Quiz Generator Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <Badge
                  variant="outline"
                  className="text-[10px] font-bold uppercase text-primary border-primary/30 mb-1"
                >
                  MCQ Practice Engine
                </Badge>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  Unit {unit.number} Syllabus Practice Set
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  10-Question Balanced Set: 5 Easy · 3 Medium · 2 Hard with verified explanations
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  playPopSound();
                  const currContext = readArticles
                    .map((a: UnitContentItem) => `${a.title}\n${a.body || ""}`)
                    .join("\n\n");
                  setAiAssistantTopic(`Unit ${unit.number}: ${unit.title}`);
                  setAiAssistantContext(currContext);
                  setAiAssistantOpen(true);
                }}
                className="rounded-2xl border-primary/30 text-primary hover:bg-primary/10 h-11 px-4 text-xs font-bold cursor-pointer shrink-0 shadow-xs"
              >
                <Sparkles className="h-4 w-4 mr-1.5 text-primary" />
                Generate Custom AI Quiz
              </Button>
            </div>

            {/* Custom AI Quiz Alert Banner if active */}
            {customAiQuizQuestions && customAiQuizQuestions.length > 0 && (
              <div className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-primary/30 bg-primary/10 text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary shrink-0" />
                  <span className="font-semibold text-primary">
                    Currently practicing custom AI-generated quiz ({customAiQuizQuestions.length} Questions)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setCustomAiQuizQuestions(null);
                    toast.info("Restored standard syllabus question bank");
                  }}
                  className="text-xs font-bold text-foreground hover:underline cursor-pointer shrink-0"
                >
                  Reset to Standard Bank
                </button>
              </div>
            )}

            {/* Dedicated 10-Question Balanced MCQ Practice Engine */}
            <UnitPracticeQuiz
              questions={
                customAiQuizQuestions && customAiQuizQuestions.length > 0
                  ? customAiQuizQuestions
                  : calibratedUnitMcqs
              }
              unitNumber={unit.number}
              unitTitle={unit.title}
              subjectTitle={subject.title}
              quizId={primaryQuiz?.id}
            />

            {/* Complete 50-Question Bank Banner */}
            {primaryQuiz && (
              <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-bold uppercase text-primary border-primary/30 mb-2"
                    >
                      Unit {unit.number} Comprehensive Bank
                    </Badge>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Full Question Bank ({quizDetailsQuery.data?.length ?? 50} Questions)
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-md">
                      Practice all questions from the entire question bank with timed exam simulation.
                      {userAttemptQuery.data && (
                        <span className="font-semibold text-primary block mt-1">
                          Your best accuracy: {userAttemptQuery.data.pct}%
                        </span>
                      )}
                    </p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="btn-squishy rounded-2xl h-12 px-6 font-bold text-xs shrink-0 shadow-sm cursor-pointer"
                  >
                    <Link
                      to="/quizzes/$quizId"
                      params={{ quizId: primaryQuiz.id }}
                      onClick={() => playPopSound()}
                    >
                      <FlaskConical className="h-4 w-4 mr-2" /> Launch Full 50-Q Bank
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Multiple Topic Diagnostic Quizzes */}
            {unitQuizzes.length > 1 && (
              <div className="space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    Unit {unit.number} Topic Quizzes ({unitQuizzes.length} Quizzes)
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                    Syllabus-Linked Diagnostic Checks
                  </h3>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  {unitQuizzes.map((quiz: QuizRow, qIdx: number) => {
                    const topicTitle = quiz.topic_id ? topicsById.get(quiz.topic_id) : null;
                    const qCount = quizStatsMap.qCount.get(quiz.id) ?? 3;
                    const bestAttempt = quizStatsMap.bestAttempts.get(quiz.id);
                    const passMark = quiz.passing_pct ?? 40;
                    const isMastered = bestAttempt && bestAttempt.pct >= passMark;

                    return (
                      <div
                        key={quiz.id}
                        className={cn(
                          "group relative flex flex-col justify-between rounded-2xl border p-4 sm:p-5 transition-all shadow-xs",
                          isMastered
                            ? "border-success/40 bg-success/5 dark:bg-success/5"
                            : bestAttempt
                              ? "border-warning/30 bg-warning/5 dark:bg-warning/5"
                              : "border-border/80 bg-card hover:border-primary/40",
                        )}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground truncate max-w-[200px]">
                              {topicTitle ? `Topic · ${topicTitle}` : `Quiz ${qIdx + 1}`}
                            </span>
                            {bestAttempt ? (
                              <Badge
                                variant={isMastered ? "success" : "warning"}
                                className="text-[10px] font-bold rounded-full px-2 shrink-0"
                              >
                                {isMastered
                                  ? `✓ ${bestAttempt.pct}% Mastered`
                                  : `${bestAttempt.pct}% · Retest`}
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="text-[10px] font-medium text-muted-foreground shrink-0"
                              >
                                Not attempted
                              </Badge>
                            )}
                          </div>

                          <h4 className="font-display text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                            {quiz.title}
                          </h4>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {qCount} Questions · Pass mark {quiz.passing_pct}% · Instant explanations
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
                          <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                            <Zap className="h-3 w-3 text-amber-500" /> +35 XP
                          </span>
                          <Button
                            asChild
                            size="sm"
                            className="btn-squishy rounded-xl font-bold text-xs shadow-2xs cursor-pointer"
                            variant={isMastered ? "outline" : "default"}
                          >
                            <Link
                              to="/quizzes/$quizId"
                              params={{ quizId: quiz.id }}
                              onClick={() => playPopSound()}
                            >
                              <FlaskConical className="h-3.5 w-3.5 mr-1" />
                              {bestAttempt ? "Retest" : "Start"}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 4: PHYSICAL NOTES ─── */}
        {activeTab === "PHYSICAL_NOTES" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
              <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2 mb-1">
                <FileType className="h-5 w-5 text-primary" /> College Reference Notes &amp; Slides
              </h3>
              <p className="text-xs text-muted-foreground mb-6">
                Official documents, presentation slides, and university lecture PDFs for Unit {unit.number}.
              </p>

              {referenceMaterials.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-8 text-center">
                  <FileText className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
                  <div className="text-sm font-semibold text-foreground">
                    Physical notes and slides coming soon
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                    You can study the complete curriculum in the <strong>Study Material</strong> tab above while lecture scans are being uploaded.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      playPopSound();
                      setActiveTab("STUDY_MATERIAL");
                    }}
                    className="mt-4 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Open Study Material
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

        {/* ─── TAB 5: PREVIOUS YEAR PAPERS ─── */}
        {activeTab === "PAPERS" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">
                  Official University Question Papers
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                Original university examination question papers for {formatTitleCase(subject.title)}. Authentic university archive records only.
              </p>

              {papers.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-8 text-center">
                  <GraduationCap className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
                  <div className="text-sm font-semibold text-foreground">
                    University papers being cataloged
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                    Official semester examination papers for {subject.title} are being scanned and verified from university archives.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      playPopSound();
                      setActiveTab("WRITTEN_PRACTICE");
                    }}
                    className="mt-4 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    View Written Practice Questions
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {papers.map((paper: PaperRow) => (
                    <div
                      key={paper.id}
                      className="rounded-2xl border border-border/80 bg-muted/20 p-5 flex flex-col justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {paper.year && (
                              <Badge variant="outline" className="text-[10px] font-bold text-primary border-primary/30">
                                {paper.year}
                              </Badge>
                            )}
                            {paper.exam_type && (
                              <Badge variant="outline" className="text-[10px] font-medium text-muted-foreground">
                                {paper.exam_type}
                              </Badge>
                            )}
                          </div>
                          <div className="font-bold text-sm text-foreground line-clamp-1">{paper.title}</div>
                          {paper.paper_number && (
                            <div className="text-xs text-muted-foreground mt-0.5">
                              Paper Code: {paper.paper_number}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-border/60">
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 rounded-xl text-xs font-bold h-9 cursor-pointer"
                        >
                          <Link to="/papers/$paperId" params={{ paperId: paper.id }}>
                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> View Question Paper
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── Unit Completion Celebration Modal (Dopamine Reward) ─── */}
        <Dialog open={showCelebrationModal} onOpenChange={setShowCelebrationModal}>
          <DialogContent className="sm:max-w-md border-primary/30 bg-card p-6 sm:p-8 text-center overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -top-20 -left-20 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-amber-500/20 blur-3xl" />

            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500 text-white shadow-md ring-4 ring-amber-500/20">
              <Trophy className="h-10 w-10 animate-bounce" />
              <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-md">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>

            <DialogHeader className="mt-4 space-y-1 text-center">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-500">
                Unit {unit.number} Conquered
              </span>
              <DialogTitle className="font-display text-2xl font-black text-foreground sm:text-3xl">
                Unit Mastered! 🎉
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                You’ve completed all core topics in{" "}
                <span className="font-semibold text-foreground">{formatTitleCase(unit.title)}</span>
                .
              </DialogDescription>
            </DialogHeader>

            {/* Reward Badges / XP Boost */}
            <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-3.5">
              <div className="flex flex-col items-center justify-center rounded-xl bg-card p-2.5 text-center shadow-2xs">
                <span className="font-mono text-lg font-black text-primary">+120 XP</span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  Knowledge Claimed
                </span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl bg-card p-2.5 text-center shadow-2xs">
                <div className="flex items-center gap-1 font-mono text-lg font-black text-amber-500">
                  <Flame className="h-4 w-4 fill-amber-500" />
                  <span>Active</span>
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">
                  Streak Safeguarded
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="mt-6 flex flex-col gap-2.5">
              {pyqQuestions.length > 0 && (
                <Button
                  asChild
                  size="lg"
                  className="btn-squishy btn-cta w-full rounded-xl font-bold cursor-pointer"
                  onClick={() => setShowCelebrationModal(false)}
                >
                  <a href="#unit-pyq-questions">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Review Exam PYQs ({pyqQuestions.length} Qs)
                  </a>
                </Button>
              )}

              {nextUnit ? (
                <Button
                  asChild
                  variant={pyqQuestions.length ? "outline" : "default"}
                  size="lg"
                  className="w-full rounded-2xl font-bold cursor-pointer"
                  onClick={() => setShowCelebrationModal(false)}
                >
                  <Link
                    to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                    params={{
                      courseSlug,
                      semesterNumber,
                      subjectSlug,
                      unitNumber: String(nextUnit.number),
                    }}
                  >
                    Continue to Unit {nextUnit.number}: {nextUnit.title}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full rounded-2xl font-bold cursor-pointer"
                  onClick={() => setShowCelebrationModal(false)}
                >
                  <Link
                    to="/courses/$courseSlug/$semesterNumber/$subjectSlug"
                    params={{ courseSlug, semesterNumber, subjectSlug }}
                  >
                    Back to Subject Syllabus
                  </Link>
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCelebrationModal(false)}
                className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Keep Reviewing Notes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Gemini AI Study Coach Modal Dialog */}
        <AiStudyAssistant
          open={aiAssistantOpen}
          onOpenChange={setAiAssistantOpen}
          topicTitle={aiAssistantTopic || unit.title}
          unitNumber={unit.number}
          subjectTitle={subject.title}
          courseTitle={course?.title}
          contextText={aiAssistantContext}
          initialAction={aiAssistantAction}
          initialLang={aiAssistantLang}
          onLoadCustomQuiz={handleLoadCustomQuiz}
        />
      </main>

      <SiteFooter />
    </div>
  );
}

/* ─────────── ReferenceCard ─────────── */

function ReferenceCard({ item }: { item: UnitContentItem }) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(item.file_url ?? null);
  const [loading, setLoading] = useState<boolean>(!item.file_url && !!item.file_path);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    if (item.file_url) {
      setPdfUrl(item.file_url);
      setLoading(false);
      setError(null);
      return;
    }
    if (!item.file_path) {
      setPdfUrl(null);
      setLoading(false);
      setError(null);
      return;
    }
    let active = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const bucket = item.file_bucket ?? "notes";
        const { data, error: err } = await supabase.storage
          .from(bucket)
          .createSignedUrl(item.file_path!, 60 * 60);

        if (!active) return;

        if (err) {
          if (bucket === "avatars") {
            const { data: pubData } = supabase.storage.from(bucket).getPublicUrl(item.file_path!);
            if (pubData?.publicUrl) {
              setPdfUrl(pubData.publicUrl);
              setLoading(false);
              return;
            }
          }
          setError(err.message || "Failed to load document");
          setPdfUrl(null);
        } else if (data?.signedUrl) {
          setPdfUrl(data.signedUrl);
          setError(null);
        } else {
          setError("Document link unavailable");
          setPdfUrl(null);
        }
      } catch (e: unknown) {
        if (active) {
          const message = e instanceof Error ? e.message : "Failed to load document";
          setError(message);
          setPdfUrl(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [item.file_path, item.file_bucket, item.file_url, retryCount]);

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
        ) : loading ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Loading document link…
          </div>
        ) : error ? (
          <div className="flex items-center justify-between w-full gap-2">
            <span className="text-xs text-destructive truncate flex items-center gap-1">
              <AlertCircle className="h-3 w-3 shrink-0" /> Failed to load
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRetryCount((c) => c + 1)}
              className="h-7 px-2 text-xs font-semibold gap-1 text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-3 w-3" /> Retry
            </Button>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground">Document not available.</div>
        )}
      </div>
    </div>
  );
}
