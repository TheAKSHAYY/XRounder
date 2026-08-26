import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Bookmark,
  Compass,
  FileText,
  Flame,
  GraduationCap,
  ListChecks,
  PlayCircle,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { cn } from "@/lib/utils";
import { computeStreak } from "@/lib/profile";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · XRounder" }] }),
  component: DashboardPage,
});

type EnrichedProgress = {
  id: string;
  unit_id: string;
  unit_number: number;
  unit_title: string;
  subject_title: string;
  subject_slug: string;
  semester_number: number;
  course_slug: string;
  status: "not_started" | "in_progress" | "completed";
  progress_pct: number;
  last_activity_at: string;
};

type BookmarkRow = {
  id: string;
  kind: "note" | "paper" | "quiz" | "unit";
  ref_id: string;
  title: string | null;
  created_at: string;
};

type QuizAttemptRow = {
  id: string;
  quiz_id: string;
  pct: number | null;
  score: number | null;
  max_score: number | null;
  passed: boolean | null;
  submitted_at: string | null;
  quizzes: { title: string | null } | null;
};

type WeakTopic = {
  quizId: string;
  title: string;
  subjectTitle: string;
  unitTitle: string;
  avgPct: number;
  attemptsCount: number;
  lastAttempt: string;
};

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return "Burning the midnight oil";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Late-night study mode";
}

function calcStreak(dates: string[]): number {
  return computeStreak(dates);
}

function DashboardPage() {
  const { user } = Route.useRouteContext();

  const fullName = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "there";
  const firstName = fullName.split(" ")[0];

  // 1. Profile query
  const profileQuery = useQuery({
    queryKey: ["dashboard-profile", user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("current_course_id, current_semester_id, current_year, onboarded_at")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  // 2. Active semester context query
  const contextQuery = useQuery({
    queryKey: [
      "dashboard-context",
      profileQuery.data?.current_course_id,
      profileQuery.data?.current_semester_id,
    ],
    enabled: !!profileQuery.data?.current_semester_id,
    queryFn: async () => {
      const semId = profileQuery.data!.current_semester_id!;
      const [semRes, subjRes] = await Promise.all([
        supabase
          .from("semesters")
          .select("id, number, title, course_id, courses(title, slug)")
          .eq("id", semId)
          .maybeSingle(),
        supabase
          .from("subjects")
          .select("id, code, slug, title, credits")
          .eq("semester_id", semId)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("sort_order")
          .order("code")
          .limit(12),
      ]);
      if (semRes.error) throw semRes.error;
      if (subjRes.error) throw subjRes.error;
      return {
        semester: semRes.data,
        subjects: subjRes.data ?? [],
      };
    },
  });

  // 3. Enriched continue learning progress query
  const progressQuery = useQuery({
    queryKey: ["student-detailed-progress", user.id],
    queryFn: async (): Promise<EnrichedProgress[]> => {
      try {
        const { data, error } = await supabase
          .from("progress_tracking")
          .select(`
            id,
            unit_id,
            status,
            progress_pct,
            last_activity_at,
            units:units!inner (
              id,
              number,
              title,
              subject_id,
              subjects:subjects!inner (
                id,
                slug,
                title,
                semester_id,
                semesters:semesters!inner (
                  id,
                  number,
                  course_id,
                  courses:courses!inner (
                    id,
                    slug,
                    title
                  )
                )
              )
            )
          `)
          .eq("user_id", user.id)
          .order("last_activity_at", { ascending: false })
          .limit(10);

        if (error || !data || data.length === 0) {
          const { data: rpcData } = await supabase.rpc("student_progress", { _limit: 10 });
          return (rpcData ?? []).map((r) => ({
            id: r.id,
            unit_id: r.unit_id,
            unit_number: 1,
            unit_title: r.unit_title ?? "Unit",
            subject_title: r.subject_title ?? "Subject",
            subject_slug: "",
            semester_number: 1,
            course_slug: "",
            status: r.status,
            progress_pct: Number(r.progress_pct ?? 0),
            last_activity_at: r.last_activity_at,
          }));
        }

        return data.map((r: any) => ({
          id: r.id,
          unit_id: r.unit_id,
          unit_number: r.units?.number ?? 1,
          unit_title: r.units?.title ?? "Unit",
          subject_title: r.units?.subjects?.title ?? "Subject",
          subject_slug: r.units?.subjects?.slug ?? "",
          semester_number: r.units?.subjects?.semesters?.number ?? 1,
          course_slug: r.units?.subjects?.semesters?.courses?.slug ?? "",
          status: r.status,
          progress_pct: Number(r.progress_pct ?? 0),
          last_activity_at: r.last_activity_at,
        }));
      } catch {
        return [];
      }
    },
  });

  // 4. Bookmarks query
  const bookmarksQuery = useQuery({
    queryKey: ["student-bookmarks", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("student_bookmarks", { _limit: 5 });
      if (error) throw error;
      return (data ?? []) as BookmarkRow[];
    },
  });

  // 5. Quiz attempts query
  const quizAttemptsQuery = useQuery({
    queryKey: ["student-quiz-attempts", user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quiz_attempts")
        .select("id, quiz_id, pct, score, max_score, passed, submitted_at, quizzes(title)")
        .eq("user_id", user.id)
        .not("submitted_at", "is", null)
        .order("submitted_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      return (data ?? []) as unknown as QuizAttemptRow[];
    },
  });

  // 6. Streak query
  const streakQuery = useQuery({
    queryKey: ["student-streak", user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("progress_tracking")
        .select("last_activity_at")
        .eq("user_id", user.id)
        .order("last_activity_at", { ascending: false })
        .limit(60);
      if (error) throw error;
      return calcStreak((data ?? []).map((r: { last_activity_at: string }) => r.last_activity_at));
    },
  });

  // 7. Weak topics query
  const weakTopicsQuery = useQuery({
    queryKey: ["student-weak-topics", user.id],
    queryFn: async (): Promise<WeakTopic[]> => {
      try {
        const { data, error } = await supabase
          .from("quiz_attempts")
          .select(`
            id,
            quiz_id,
            pct,
            score,
            max_score,
            passed,
            submitted_at,
            quizzes:quizzes!inner (
              id,
              title,
              unit_id,
              units:units (
                id,
                number,
                title,
                subject_id,
                subjects:subjects (
                  id,
                  title,
                  slug
                )
              )
            )
          `)
          .eq("user_id", user.id)
          .not("submitted_at", "is", null)
          .order("submitted_at", { ascending: false })
          .limit(20);

        if (error || !data) return [];

        const topicMap = new Map<string, WeakTopic>();

        for (const a of data as any[]) {
          const q = a.quizzes;
          if (!q) continue;
          const qId = a.quiz_id;
          const pct =
            typeof a.pct === "number"
              ? Math.round(a.pct)
              : a.max_score
                ? Math.round(((a.score ?? 0) / a.max_score) * 100)
                : 0;

          const existing = topicMap.get(qId);
          if (!existing) {
            topicMap.set(qId, {
              quizId: qId,
              title: q.title ?? "Practice Quiz",
              subjectTitle: q.units?.subjects?.title ?? "Subject",
              unitTitle: q.units?.title ? `Unit ${q.units.number}` : "",
              avgPct: pct,
              attemptsCount: 1,
              lastAttempt: a.submitted_at,
            });
          } else {
            existing.avgPct = Math.round(
              (existing.avgPct * existing.attemptsCount + pct) / (existing.attemptsCount + 1),
            );
            existing.attemptsCount += 1;
          }
        }

        return Array.from(topicMap.values())
          .filter((t) => t.avgPct < 70)
          .sort((a, b) => a.avgPct - b.avgPct)
          .slice(0, 3);
      } catch {
        return [];
      }
    },
  });

  const bookmarks = bookmarksQuery.data ?? [];
  const progress = progressQuery.data ?? [];
  const attempts = quizAttemptsQuery.data ?? [];
  const streak = streakQuery.data ?? 0;
  const weakTopics = weakTopicsQuery.data ?? [];
  const semester = contextQuery.data?.semester ?? null;
  const semesterSubjects = contextQuery.data?.subjects ?? [];
  const courseTitle = (semester?.courses as { title?: string; slug?: string } | null)?.title;
  const courseSlug = (semester?.courses as { title?: string; slug?: string } | null)?.slug;

  const avgScore = useMemo(() => {
    const scored = attempts.filter((a) => typeof a.pct === "number");
    if (!scored.length) return null;
    const sum = scored.reduce((acc, a) => acc + Number(a.pct ?? 0), 0);
    return Math.round(sum / scored.length);
  }, [attempts]);

  const completedUnitsCount = useMemo(
    () => progress.filter((p) => p.status === "completed").length,
    [progress],
  );

  const semesterProgressPct = useMemo(() => {
    if (!progress.length) return 0;
    const sum = progress.reduce((acc, p) => acc + (p.progress_pct || 0), 0);
    return Math.round(sum / Math.max(1, progress.length));
  }, [progress]);

  const pickUp = progress.find((p) => p.status !== "completed") ?? progress[0] ?? null;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 sm:pt-10">
      <div className="mb-6">
        <AnnouncementBanner audience="students" />
      </div>

      {/* ─── Focus Header ─── */}
      <section className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {greeting()} 👋
          </p>
          <h1 className="mt-1 truncate font-display text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            {firstName}
          </h1>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {semester && (
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground shadow-xs">
              <GraduationCap className="h-3.5 w-3.5 text-primary" />
              <Link
                to="/courses/$courseSlug/$semesterNumber"
                params={{
                  courseSlug: courseSlug ?? "",
                  semesterNumber: String(semester.number),
                }}
                className="hover:text-primary transition-colors font-medium"
              >
                {courseTitle ? `${courseTitle} · ` : ""}
                Semester {semester.number}
              </Link>
              <Link
                to="/onboarding"
                className="text-[11px] text-muted-foreground hover:text-primary transition-colors underline ml-1"
                title="Switch Semester"
              >
                Change
              </Link>
            </div>
          )}

          {!semester && !profileQuery.isLoading && (
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-primary/40 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Set up semester
            </Link>
          )}

          <div
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-xs",
              streak > 0
                ? "bg-accent/15 text-accent-foreground border border-accent/30"
                : "bg-muted text-muted-foreground",
            )}
            title={streak > 0 ? `${streak}-day study streak` : "Study today to start your streak"}
          >
            <Flame className={cn("h-3.5 w-3.5", streak > 0 ? "text-accent-foreground" : "text-muted-foreground")} />
            <span>{streakQuery.isLoading ? "—" : `${streak}d streak`}</span>
          </div>
        </div>
      </section>

      {/* ─── Semester Progress Snapshot ─── */}
      {semester && (
        <section className="mt-6 rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Semester Overview
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-foreground">
                {completedUnitsCount} unit{completedUnitsCount === 1 ? "" : "s"} completed · {semesterSubjects.length} subject{semesterSubjects.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-36 sm:w-48">
                <div className="flex justify-between text-[11px] font-medium text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span className="font-semibold text-foreground">{semesterProgressPct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${semesterProgressPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Primary Action: Continue Learning & Today's Practice ─── */}
      <section className="mt-6 grid gap-5 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-8">
          <ContinueHero
            loading={progressQuery.isLoading || profileQuery.isLoading}
            pickUp={pickUp}
            semester={semester}
            courseSlug={courseSlug}
          />
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary font-mono inline-flex items-center gap-1">
                <Zap className="h-3.5 w-3.5" /> Today's Practice
              </span>
              <span className="text-[11px] text-muted-foreground font-medium">Daily Goal</span>
            </div>

            <h3 className="mt-3 font-display text-lg font-bold text-foreground">
              Master 1 Syllabus Unit
            </h3>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              Read unit notes, test yourself with practice MCQs, and identify areas to revise before exams.
            </p>

            <div className="mt-4 rounded-xl bg-muted/60 p-3 border border-border/40 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">MCQs Solved:</span>
                <span className="font-semibold text-foreground">
                  {attempts.length > 0 ? `${attempts.length} attempts` : "None yet"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-semibold text-foreground">
                  {avgScore !== null ? `${avgScore}%` : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-border/60 flex flex-col gap-2">
            <Button asChild className="w-full justify-between rounded-xl text-xs font-semibold h-10 shadow-xs">
              <Link to="/mock-test">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                  Custom Mock Test
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>

            {semester && courseSlug && (
              <Button asChild variant="outline" className="w-full justify-between rounded-xl text-xs font-semibold h-9">
                <Link
                  to="/courses/$courseSlug/$semesterNumber"
                  params={{ courseSlug, semesterNumber: String(semester.number) }}
                >
                  <span>Semester Syllabus</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ─── Weak Topics / Revision Spotlight ─── */}
      {weakTopics.length > 0 && (
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Weak Topics · Priority Revision
                </h2>
                <p className="text-xs text-muted-foreground">
                  Topics where your accuracy was under 70%. Practice these to boost exam scores.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {weakTopics.map((topic) => (
              <div
                key={topic.quizId}
                className="flex flex-col justify-between rounded-2xl border border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/10 p-4 transition-all hover:border-amber-500/60"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-muted-foreground">{topic.subjectTitle}</span>
                    <Badge variant="outline" className="border-amber-500/40 text-amber-700 dark:text-amber-300 text-[10px]">
                      {topic.avgPct}% Accuracy
                    </Badge>
                  </div>
                  <h3 className="mt-2 font-display text-sm font-semibold text-foreground line-clamp-1">
                    {topic.title}
                  </h3>
                  {topic.unitTitle && (
                    <p className="text-[11px] text-muted-foreground mt-0.5">{topic.unitTitle}</p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">
                    {topic.attemptsCount} attempt{topic.attemptsCount === 1 ? "" : "s"}
                  </span>
                  <Button asChild size="sm" variant="outline" className="h-8 rounded-lg text-xs font-semibold border-amber-500/40 hover:bg-amber-500/10">
                    <Link to="/quizzes/$quizId" params={{ quizId: topic.quizId }}>
                      <RotateCcw className="mr-1.5 h-3 w-3" />
                      Practice Weak Topic
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Your Semester Subjects Rail ─── */}
      <section className="mt-10">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              {semester ? `Semester ${semester.number} Subjects` : "Your subjects"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {semester
                ? "Select a subject to open its syllabus units, notes, and practice MCQs."
                : "Choose your course and semester to see your subjects here."}
            </p>
          </div>
          {semester && courseSlug && (
            <Link
              to="/courses/$courseSlug/$semesterNumber"
              params={{ courseSlug, semesterNumber: String(semester.number) }}
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              View all units <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>

        {contextQuery.isLoading || profileQuery.isLoading ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
          </div>
        ) : !semester ? (
          <div className="mt-5">
            <EmptyState
              icon={Compass}
              tone="accent"
              variant="panel"
              title="Set your current semester"
              description="Tell us your course and semester once — we'll personalize your dashboard, subjects, and recommendations."
              primaryAction={{ label: "Set semester", to: "/onboarding", icon: ArrowRight }}
              secondaryAction={{ label: "Browse all courses", to: "/courses" }}
            />
          </div>
        ) : semesterSubjects.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Subjects for this semester are being published soon.
          </div>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {semesterSubjects.map((s) => (
              <Link
                key={s.id}
                to="/courses/$courseSlug/$semesterNumber/$subjectSlug"
                params={{
                  courseSlug: courseSlug ?? "",
                  semesterNumber: String(semester.number),
                  subjectSlug: s.slug,
                }}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {s.code}
                    </span>
                    {s.credits != null && (
                      <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                        {s.credits} Credits
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2.5 font-display text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {s.title}
                  </h3>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-3 text-xs font-semibold text-primary">
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    Open Syllabus
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ─── Secondary: Recent Practice & Saved Bookmarks ─── */}
      <section className="mt-10 grid gap-5 lg:grid-cols-5">
        {/* Recent Quiz Practice */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs lg:col-span-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-base font-bold text-foreground">
                Recent Practice
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {avgScore !== null
                  ? `Average ${avgScore}% across ${attempts.length} attempt${attempts.length === 1 ? "" : "s"}`
                  : "Complete a quiz to track your accuracy here."}
              </p>
            </div>
            {avgScore !== null && (
              <span
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-xs font-bold",
                  avgScore >= 70
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                )}
              >
                <Trophy className="mr-1 inline h-3 w-3" />
                {avgScore}% Avg
              </span>
            )}
          </div>

          {quizAttemptsQuery.isLoading ? (
            <div className="mt-5 space-y-2.5">
              <Skeleton className="h-14 rounded-xl" />
              <Skeleton className="h-14 rounded-xl" />
            </div>
          ) : attempts.length === 0 ? (
            <div className="mt-5">
              <EmptyState
                icon={ListChecks}
                variant="panel"
                title="No quizzes taken yet"
                description="Practice unit MCQs to test knowledge and build confidence."
                primaryAction={{ label: "Browse courses", to: "/courses", icon: ArrowRight }}
              />
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-border/50">
              {attempts.map((a) => {
                const pct =
                  typeof a.pct === "number"
                    ? Math.round(a.pct)
                    : a.max_score
                      ? Math.round(((a.score ?? 0) / a.max_score) * 100)
                      : null;

                return (
                  <li
                    key={a.id}
                    className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-bold",
                          a.passed
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-destructive/10 text-destructive",
                        )}
                      >
                        {pct !== null ? `${pct}%` : "—"}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {a.quizzes?.title ?? "Practice Quiz"}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {a.submitted_at
                            ? new Date(a.submitted_at).toLocaleDateString(undefined, {
                                day: "numeric",
                                month: "short",
                              })
                            : ""}
                          {" · "}
                          {a.passed ? "Passed" : "Needs Review"}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/quizzes/$quizId"
                      params={{ quizId: a.quiz_id }}
                      className="shrink-0 text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Retake <ArrowRight className="h-3 w-3" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Saved Bookmarks */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-base font-bold text-foreground inline-flex items-center gap-1.5">
              <Bookmark className="h-4 w-4 text-primary" />
              Saved Bookmarks
            </h3>
            {bookmarks.length > 0 && (
              <Link to="/bookmarks" className="text-xs font-semibold text-primary hover:underline">
                View all →
              </Link>
            )}
          </div>

          {bookmarksQuery.isLoading ? (
            <div className="mt-4 space-y-2">
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-12 rounded-xl" />
            </div>
          ) : bookmarks.length === 0 ? (
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Bookmark key notes, previous year papers, and quizzes while studying for quick revision.
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {bookmarks.map((b) => (
                <li key={b.id}>
                  <BookmarkLink kind={b.kind} refId={b.ref_id} title={b.title} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

/* ──────────────────────────────────────────────── Continue Learning Hero */

function ContinueHero({
  loading,
  pickUp,
  semester,
  courseSlug,
}: {
  loading: boolean;
  pickUp: EnrichedProgress | null;
  semester: { id: string; number: number; title: string | null } | null;
  courseSlug: string | undefined;
}) {
  if (loading) {
    return <Skeleton className="h-60 rounded-2xl" />;
  }

  // In-progress state — the primary personal semester OS case
  if (pickUp && pickUp.subject_slug && pickUp.course_slug) {
    return (
      <article className="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary via-primary/95 to-primary/90 p-6 sm:p-8 text-primary-foreground shadow-sm">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/25 blur-3xl"
        />
        <div className="relative grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ring-1 ring-primary-foreground/20">
              <PlayCircle className="h-3.5 w-3.5" /> Continue where you left off
            </span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
              {pickUp.subject_title}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold leading-tight sm:text-3xl">
              Unit {pickUp.unit_number}: {pickUp.unit_title}
            </h2>

            <div className="mt-5 max-w-md">
              <div className="flex items-center justify-between text-xs font-medium text-primary-foreground/80">
                <span>Unit Progress</span>
                <span className="font-bold text-primary-foreground">
                  {Math.round(Number(pickUp.progress_pct))}%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-foreground/20">
                <div
                  className="h-full rounded-full bg-primary-foreground transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, Number(pickUp.progress_pct)))}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2.5 sm:flex-col">
            <Button asChild size="lg" variant="secondary" className="shadow-sm font-semibold rounded-xl h-11">
              <Link
                to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                params={{
                  courseSlug: pickUp.course_slug,
                  semesterNumber: String(pickUp.semester_number),
                  subjectSlug: pickUp.subject_slug,
                  unitNumber: String(pickUp.unit_number),
                }}
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Resume Unit
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground rounded-xl h-11"
            >
              <Link to="/bookmarks">
                <Bookmark className="mr-2 h-4 w-4" />
                Saved Notes
              </Link>
            </Button>
          </div>
        </div>
      </article>
    );
  }

  // Personalized "start your semester" state
  if (semester && courseSlug) {
    return (
      <article className="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary via-primary/95 to-primary/90 p-6 sm:p-8 text-primary-foreground shadow-sm">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/25 blur-3xl"
        />
        <div className="relative max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ring-1 ring-primary-foreground/20">
            <Sparkles className="h-3.5 w-3.5" /> Ready for your semester
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight sm:text-3xl">
            Start Semester {semester.number}
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/85 leading-relaxed">
            Open your first subject to read structured syllabus notes, solve MCQs, and track your progress.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button asChild size="lg" variant="secondary" className="rounded-xl font-semibold shadow-sm h-11">
              <Link
                to="/courses/$courseSlug/$semesterNumber"
                params={{ courseSlug, semesterNumber: String(semester.number) }}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Open Semester Subjects
              </Link>
            </Button>
          </div>
        </div>
      </article>
    );
  }

  // First-time state
  return (
    <article className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
        <Sparkles className="h-3.5 w-3.5" /> Welcome to XRounder
      </span>
      <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
        Select your course & semester
      </h2>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground leading-relaxed">
        Set up your course and semester once to get a personalized semester dashboard with syllabus notes, practice quizzes, and progress tracking.
      </p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <Button asChild size="lg" className="rounded-xl font-semibold h-11">
          <Link to="/onboarding">
            Get started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-xl font-semibold h-11">
          <Link to="/courses">Browse courses</Link>
        </Button>
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────── Bookmark helper */

function BookmarkLink({
  kind,
  refId,
  title,
}: {
  kind: "note" | "paper" | "quiz" | "unit";
  refId: string;
  title: string | null;
}) {
  const label = title ?? "Untitled";
  const Icon =
    kind === "note"
      ? FileText
      : kind === "paper"
        ? FileText
        : kind === "quiz"
          ? ListChecks
          : BookOpen;
  const kindLabel =
    kind === "note" ? "Note" : kind === "paper" ? "Paper" : kind === "quiz" ? "Quiz" : "Unit";

  const inner = (
    <div className="group flex items-center gap-3 rounded-xl border border-border/70 bg-card px-3.5 py-2.5 transition-colors hover:border-primary/40 hover:bg-muted/40">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-foreground">{label}</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{kindLabel}</p>
      </div>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
    </div>
  );

  if (kind === "note")
    return (
      <Link to="/notes/$noteId" params={{ noteId: refId }}>
        {inner}
      </Link>
    );
  if (kind === "paper")
    return (
      <Link to="/papers/$paperId" params={{ paperId: refId }}>
        {inner}
      </Link>
    );
  if (kind === "quiz")
    return (
      <Link to="/quizzes/$quizId" params={{ quizId: refId }}>
        {inner}
      </Link>
    );
  return <Link to="/courses">{inner}</Link>;
}
