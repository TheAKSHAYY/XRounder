import { useEffect, useMemo, useRef } from "react";
import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";
import { BookOpen, ArrowRight, ArrowLeft, Layers, Search, Sparkles, X } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorPanel, RouteErrorScreen } from "@/components/ui/error-panel";
import { useGuestLearningPrefs } from "@/lib/learning-prefs";
import { formatTitleCase } from "@/lib/format";

type CourseItem = {
  id: string;
  code: string;
  title: string;
  slug: string;
  description: string | null;
  duration_years: number | null;
  total_semesters: number | null;
};

async function fetchPublicCourses(): Promise<CourseItem[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("id, code, title, slug, description, duration_years, total_semesters")
    .eq("status", "published")
    .is("deleted_at", null)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as CourseItem[];
}

export const Route = createFileRoute("/courses/")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData({
      queryKey: ["public", "courses"],
      queryFn: fetchPublicCourses,
    });
  },

  head: () => ({
    meta: [
      { title: "Academic Programs & Degree Courses · XRounder" },
      {
        name: "description",
        content:
          "Browse syllabus-aligned degree courses, notes, previous year papers, and practice questions for BCA, B.Tech, and university exams on XRounder.",
      },
      { property: "og:title", content: "Academic Programs & Degree Courses · XRounder" },
      {
        property: "og:description",
        content:
          "Browse every XRounder degree program with semester-by-semester subjects, notes, past papers, and practice MCQs.",
      },
      { property: "og:url", content: "https://www.xrounder.in/courses" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.xrounder.in/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Academic Programs & Degree Courses · XRounder" },
      {
        name: "twitter:description",
        content:
          "Browse syllabus-aligned degree courses, notes, previous year papers, and practice questions on XRounder.",
      },
      { name: "twitter:image", content: "https://www.xrounder.in/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.xrounder.in/courses" }],
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
              name: "Courses",
              item: "https://www.xrounder.in/courses",
            },
          ],
        }),
      },
    ],
  }),
  component: CoursesIndex,
  errorComponent: ({ error }) => <CoursesRouteError error={error} />,
});

function CoursesRouteError({ error }: { error: unknown }) {
  const router = useRouter();
  return (
    <RouteErrorScreen
      title="We couldn't load the course catalog"
      error={error}
      onRetry={() => router.invalidate()}
    />
  );
}

function CoursesIndex() {
  const initialCourses = Route.useLoaderData();
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/courses" });
  const search = q;
  const inputRef = useRef<HTMLInputElement>(null);
  const { prefs: guestPrefs } = useGuestLearningPrefs();

  const setSearch = (value: string) =>
    navigate({ search: { q: value }, replace: true, resetScroll: false });

  // "/" jumps straight into search, Escape clears it — keyboard-first browsing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing =
        el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && el === inputRef.current) {
        setSearch("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["public", "courses"],
    queryFn: fetchPublicCourses,
    initialData: initialCourses,
  });

  const courses: CourseItem[] = (data ?? []) as CourseItem[];

  // Real published-semester counts, so a card never advertises content that
  // isn't live yet.
  const { data: semCounts } = useQuery({
    queryKey: ["public", "course-semester-counts"],
    enabled: courses.length > 0,
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("semesters")
        .select("course_id")
        .eq("status", "published");
      if (error) throw error;
      const map: Record<string, number> = {};
      for (const r of (rows ?? []) as { course_id: string }[]) {
        map[r.course_id] = (map[r.course_id] ?? 0) + 1;
      }
      return map;
    },
  });

  const filteredCourses = useMemo(() => {
    if (!search.trim()) return courses;
    const q = search.toLowerCase();
    return courses.filter(
      (c: CourseItem) =>
        c.title.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q)),
    );
  }, [courses, search]);

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <SiteHeader />
      
      {/* ─── Hero Header with Atmospheric Grid ─── */}
      <section className="relative overflow-hidden border-b border-border/70 gaming-grid-bg py-10 sm:py-14">
        <div className="mx-auto w-full sm:max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Breadcrumbs items={[{ label: "Courses" }]} />
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined" && window.history.length > 1) {
                  window.history.back();
                } else {
                  navigate({ to: "/" });
                }
              }}
              className="btn-squishy inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/80 backdrop-blur-sm px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-2xs hover:border-primary/50 hover:bg-muted cursor-pointer transition-all"
              title="Return to your previous page"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-primary" />
              <span>Back to where you were</span>
            </button>
          </div>

          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold font-mono uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" /> University Curriculum
              </div>
              <h1 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                Degree Programs
              </h1>
              <p className="mt-2.5 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                Explore syllabus-aligned notes, past university papers, video lectures, and MCQ
                practice for each semester — with zero exam panic.
              </p>
            </div>

            {/* Search bar */}
            <div className="w-full md:w-80 shrink-0">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by degree or code…"
                  aria-label="Search degree programs"
                  className="pl-9 pr-9 h-11 rounded-xl bg-card/90 backdrop-blur-sm border-border/80 shadow-xs focus:border-primary/60"
                />
                {search ? (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground md:block">
                    /
                  </kbd>
                )}
              </div>
              {search && (
                <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
                  {filteredCourses.length} of {courses.length} programs match “{search}”
                </p>
              )}
            </div>
          </div>

          {/* ─── Active Enrolled Path Reminder (if set) ─── */}
          {guestPrefs && (
            <div className="mt-6 flex items-center justify-between p-4 rounded-2xl border border-primary/25 bg-card/80 backdrop-blur-sm shadow-xs">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-2xs">
                  <Sparkles className="h-4.5 w-4.5" />
                </span>
                <div>
                  <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider">
                    Your Selected Semester
                  </span>
                  <p className="text-sm font-bold text-foreground">
                    {guestPrefs.courseTitle ?? "Course"} · Year {guestPrefs.year} · Semester{" "}
                    {guestPrefs.semesterNumber ?? 1}
                  </p>
                </div>
              </div>
              <Link to="/onboarding" className="text-xs font-semibold text-primary hover:underline">
                Change
              </Link>
            </div>
          )}
        </div>
      </section>

      <main className="mx-auto w-full sm:max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        {/* ─── Program Cards Grid ─── */}
        <section aria-label="Course catalog">
          {isError ? (
            <ErrorPanel
              title="We couldn't load the programs"
              error={error}
              onRetry={() => refetch()}
              retrying={isFetching}
            />
          ) : isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-56 rounded-3xl" />
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                No programs found
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {search
                  ? `No matches for "${search}". Try another keyword.`
                  : "Curriculums are currently being uploaded."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((c: CourseItem) => (
                <Link
                  key={c.id}
                  to="/courses/$courseSlug"
                  params={{ courseSlug: c.slug }}
                  className="hud-card interactive-card group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-7 shadow-soft-xs hover:border-primary/50 transition-all duration-200"
                >
                  {/* Decorative subtle ambient glow & top sheen */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-60 transition-opacity duration-200 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 blur-2xl transition-all duration-200 group-hover:bg-primary/10"
                  />

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/25 px-2.5 py-0.5 rounded-md">
                        {c.code}
                      </span>
                      <span className="text-xs text-muted-foreground font-semibold">
                        {c.duration_years ? `${c.duration_years} Years` : "Degree"}
                      </span>
                    </div>

                    <h2 className="mt-4 font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {formatTitleCase(c.title)}
                    </h2>

                    {c.description && (
                      <p className="mt-2.5 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                        {c.description}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-muted/80 border border-border/60 px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        Unit Notes
                      </span>
                      <span className="rounded-full bg-muted/80 border border-border/60 px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        Past Papers
                      </span>
                      <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                        15/15 Blueprints
                      </span>
                      <span className="rounded-full bg-muted/80 border border-border/60 px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        MCQs
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
                    <span className="flex items-center gap-1.5 text-muted-foreground font-semibold">
                      <Layers className="h-3.5 w-3.5 text-primary" />
                      {(semCounts?.[c.id] ?? 0) > 0
                        ? `${semCounts![c.id]} of ${c.total_semesters ?? 6} Semesters live`
                        : "6 Semesters"}
                    </span>
                    <span className="btn-squishy font-bold text-primary inline-flex items-center gap-1 group-hover:underline">
                      {(semCounts?.[c.id] ?? 0) > 0 ? "View semesters" : "Preview program"}{" "}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
