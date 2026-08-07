import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ArrowRight, GraduationCap, Library, Bell, Layers, CalendarClock } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { EmptyState } from "@/components/ui/empty-state";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { StatChip } from "@/components/ui/stat-chip";
import { StudentHero } from "@/components/student/student-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Courses · BCA Gurukul" },
      {
        name: "description",
        content: "Browse all programs offered on BCA Gurukul — structured semester-by-semester learning paths.",
      },
      { property: "og:title", content: "All courses · BCA Gurukul" },
      {
        property: "og:description",
        content: "Browse every BCA Gurukul program with semester-by-semester subjects, notes, papers and quizzes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoursesIndex,
});

function CoursesIndex() {
  const { data, isLoading } = useQuery({
    queryKey: ["public", "courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, code, title, slug, description, duration_years, total_semesters")
        .eq("status", "published")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const courses = data ?? [];
  const totalSemesters = courses.reduce((sum, c) => sum + (c.total_semesters ?? 0), 0);
  const longestYears = courses.reduce((max, c) => Math.max(max, c.duration_years ?? 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <Breadcrumbs items={[{ label: "Courses" }]} />

        <StudentHero
          className="mt-4"
          eyebrow="Catalog"
          title="All courses"
          description="Pick a program to see its semester-by-semester breakdown, subjects, and study material."
          aside={
            <span className="hidden h-14 w-14 place-items-center rounded-xl bg-primary/10 text-primary md:grid">
              <GraduationCap className="h-7 w-7" aria-hidden />
            </span>
          }
        >
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <StatChip
              variant="tile"
              label="Programs"
              value={courses.length}
              loading={isLoading}
              icon={Library}
            />
            <StatChip
              variant="tile"
              label="Semesters mapped"
              value={totalSemesters}
              loading={isLoading}
              icon={Layers}
            />
            <StatChip
              variant="tile"
              label="Longest program"
              value={longestYears ? `${longestYears} yrs` : "—"}
              loading={isLoading}
              icon={CalendarClock}
            />
          </div>
        </StudentHero>

        <section className="mt-10" aria-label="Course catalog">
          <h2 className="text-h2 text-foreground">Programs</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-border bg-surface p-6">
                  <Skeleton className="h-11 w-11 rounded-xl" />
                  <Skeleton className="mt-4 h-3 w-16" />
                  <Skeleton className="mt-2 h-6 w-40" />
                  <Skeleton className="mt-3 h-4 w-full" />
                </div>
              ))}

            {!isLoading && courses.length === 0 && (
              <div className="col-span-full">
                <EmptyState
                  icon={Library}
                  tone="accent"
                  title="Courses are being curated"
                  description="We're building each program semester by semester — notes, past papers, video lectures and timed MCQ practice, all syllabus-aligned. The catalog opens here the moment it's live."
                  tip="Sign up free and we'll email you the day your course goes live — no spam, just one ping."
                  primaryAction={{ label: "Get notified", to: "/auth", icon: Bell }}
                  secondaryAction={{ label: "Back to home", to: "/" }}
                />
              </div>
            )}

            {courses.map((c) => (
              <Link
                key={c.id}
                to="/courses/$courseSlug"
                params={{ courseSlug: c.slug }}
                className="group rounded-lg border border-border bg-surface p-6 transition hover:border-primary/50 hover:shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" aria-hidden />
                </div>
                <div className="mt-4 text-eyebrow text-muted-foreground">{c.code}</div>
                <h3 className="mt-1 text-h3 text-foreground">{c.title}</h3>
                {c.description && (
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{c.description}</p>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <StatChip variant="chip" label="semesters" value={c.total_semesters ?? 0} icon={Layers} />
                  {c.duration_years ? (
                    <StatChip variant="chip" label="years" value={c.duration_years} icon={CalendarClock} tone="accent" />
                  ) : null}
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

