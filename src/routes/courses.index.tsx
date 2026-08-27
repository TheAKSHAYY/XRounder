import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  ArrowRight,
  GraduationCap,
  Layers,
  CalendarClock,
  Search,
  Sparkles,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGuestLearningPrefs } from "@/lib/learning-prefs";

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
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Academic Programs & Degree Courses · XRounder" },
      {
        name: "twitter:description",
        content:
          "Browse syllabus-aligned degree courses, notes, previous year papers, and practice questions on XRounder.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.xrounder.in/courses" }],
  }),
  component: CoursesIndex,
});

function CoursesIndex() {
  const initialCourses = Route.useLoaderData();
  const [search, setSearch] = useState("");
  const { prefs: guestPrefs } = useGuestLearningPrefs();

  const { data, isLoading } = useQuery({
    queryKey: ["public", "courses"],
    queryFn: fetchPublicCourses,
    initialData: initialCourses,
  });

  const courses: CourseItem[] = (data ?? []) as CourseItem[];

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
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <Breadcrumbs items={[{ label: "Courses" }]} />

        {/* ─── Header Section ─── */}
        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/70">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              University Curriculum
            </span>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Degree Programs
            </h1>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              Explore syllabus-aligned notes, past university papers, video lectures, and MCQ practice
              for each semester.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by degree or code…"
              className="pl-9 h-11 rounded-xl bg-surface"
            />
          </div>
        </div>

        {/* ─── Active Enrolled Path Reminder (if set) ─── */}
        {guestPrefs && (
          <div className="mt-6 flex items-center justify-between p-4 rounded-xl border border-primary/20 bg-primary/5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Your Selected Semester
                </span>
                <p className="text-sm font-bold text-foreground">
                  {guestPrefs.courseTitle ?? "Course"} · Year {guestPrefs.year} · Semester {guestPrefs.semesterNumber ?? 1}
                </p>
              </div>
            </div>
            <Link
              to="/onboarding"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Change
            </Link>
          </div>
        )}

        {/* ─── Program Cards Grid ─── */}
        <section className="mt-8" aria-label="Course catalog">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                No programs found
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {search ? `No matches for "${search}". Try another keyword.` : "Curriculums are currently being uploaded."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((c: CourseItem) => (
                <Link
                  key={c.id}
                  to="/courses/$courseSlug"
                  params={{ courseSlug: c.slug }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-xs transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                        {c.code}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {c.duration_years ? `${c.duration_years} Years` : "Degree"}
                      </span>
                    </div>

                    <h2 className="mt-3 font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {c.title}
                    </h2>

                    {c.description && (
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                        {c.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4 text-xs">
                    <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                      <Layers className="h-3.5 w-3.5" />
                      {c.total_semesters ?? 6} Semesters
                    </span>
                    <span className="font-semibold text-primary inline-flex items-center gap-1">
                      View semesters <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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
