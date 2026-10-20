import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useQuery, type QueryClient } from "@tanstack/react-query";
import { ArrowRight, ArrowLeft, BookOpen, Compass, Layers } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorPanel, RouteErrorScreen } from "@/components/ui/error-panel";
import { formatTitleCase } from "@/lib/format";

type CourseItem = {
  id: string;
  code: string;
  title: string;
  description: string | null;
  duration_years: number | null;
  total_semesters: number | null;
};

type SemesterItem = {
  id: string;
  number: number;
  title: string;
  description: string | null;
};

type CourseDetailData = {
  course: CourseItem;
  semesters: SemesterItem[];
};

async function fetchCourseDetails(
  queryClient: QueryClient,
  courseSlug: string,
): Promise<CourseDetailData> {
  const queryKey = ["public", "course-detail", courseSlug];
  return await queryClient.ensureQueryData({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select(
          "id, code, title, description, duration_years, total_semesters, semesters(id, number, title, description, status, deleted_at)",
        )
        .eq("slug", courseSlug)
        .eq("status", "published")
        .maybeSingle();

      if (error) throw error;
      if (!data) throw notFound();

      const course: CourseItem = {
        id: data.id,
        code: data.code,
        title: data.title,
        description: data.description,
        duration_years: data.duration_years,
        total_semesters: data.total_semesters,
      };

      const rawSemesters = (data.semesters ?? []) as Array<
        SemesterItem & { status?: string; deleted_at?: string | null }
      >;
      const semesters: SemesterItem[] = rawSemesters
        .filter((s) => s.status === "published" && !s.deleted_at)
        .sort((a, b) => a.number - b.number)
        .map((s) => ({
          id: s.id,
          number: s.number,
          title: s.title,
          description: s.description,
        }));

      return { course, semesters };
    },
  });
}

export const Route = createFileRoute("/courses/$courseSlug/")({
  loader: async ({ params, context: { queryClient } }) => {
    return await fetchCourseDetails(queryClient, params.courseSlug);
  },
  head: ({ loaderData, params }) => {
    const course = loaderData?.course;
    const title = course
      ? `${course.title} (${course.code}) Syllabus & Semester Notes · XRounder`
      : "Course · XRounder";
    const description = course?.description
      ? course.description
      : course
        ? `Explore semester-wise syllabus, notes, past papers, and practice MCQs for ${course.title}.`
        : "Browse syllabus-aligned degree courses on XRounder.";
    const url = `https://www.xrounder.in/courses/${params.courseSlug}`;

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
            item: url,
          },
        ],
      },
    ];

    if (course) {
      schemas.push({
        "@type": "Course",
        name: course.title,
        description: description,
        courseCode: course.code,
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
  component: CourseDetail,
  errorComponent: ({ error }) => <CourseRouteError error={error} />,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background p-6 text-center">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Course not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested program does not exist or has been unpublished.
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

function CourseRouteError({ error }: { error: unknown }) {
  const router = useRouter();
  return (
    <RouteErrorScreen
      title="We couldn't load this program"
      error={error}
      onRetry={() => router.invalidate()}
    />
  );
}

function CourseDetail() {
  const { courseSlug } = Route.useParams();
  const loaderData = Route.useLoaderData();

  const courseQuery = useQuery({
    queryKey: ["public", "course", courseSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, code, title, description, duration_years, total_semesters")
        .eq("slug", courseSlug)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
    initialData: loaderData?.course,
  });

  const semestersQuery = useQuery({
    queryKey: ["public", "semesters", courseQuery.data?.id],
    enabled: !!courseQuery.data?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("semesters")
        .select("id, number, title, description")
        .eq("course_id", courseQuery.data!.id)
        .eq("status", "published")
        .order("number");
      if (error) throw error;
      return data;
    },
    initialData: loaderData?.semesters,
  });

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <SiteHeader />

      {/* ─── Hero Header with Atmospheric Grid ─── */}
      <section className="relative overflow-hidden border-b border-border/70 gaming-grid-bg py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Breadcrumbs
              items={[
                { label: "Courses", to: "/courses" },
                { label: courseQuery.data?.title ?? "Course" },
              ]}
            />
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined" && window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = "/courses";
                }
              }}
              className="btn-squishy inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/80 backdrop-blur-sm px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-2xs hover:border-primary/50 hover:bg-muted cursor-pointer transition-all"
              title="Return to your previous page"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-primary" />
              <span>Back to where you were</span>
            </button>
          </div>

          {courseQuery.data && (
            <div className="mt-8 flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 border border-primary/25 text-primary shadow-2xs">
                <BookOpen className="h-7 w-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 border border-primary/25 px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                  {courseQuery.data.code}
                </div>
                <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  {courseQuery.data.title}
                </h1>
                {courseQuery.data.description && (
                  <p className="mt-2.5 max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {courseQuery.data.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
        <section>
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <h2 className="flex items-center gap-2 font-display text-xl sm:text-2xl font-bold text-foreground">
              <Layers className="h-5 w-5 text-primary" /> Available Semesters
            </h2>
            <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
              {semestersQuery.data?.length ?? 0} Semesters Published
            </span>
          </div>

          {semestersQuery.isError ? (
            <ErrorPanel
              className="mt-6"
              title="We couldn't load the semesters"
              error={semestersQuery.error}
              onRetry={() => semestersQuery.refetch()}
              retrying={semestersQuery.isFetching}
            >
              <Link
                to="/courses"
                className="inline-flex min-h-10 items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold text-foreground"
              >
                Back to courses
              </Link>
            </ErrorPanel>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {semestersQuery.isLoading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-28 rounded-2xl" />
                ))}
              {semestersQuery.data?.length === 0 && (
                <EmptyState
                  className="col-span-full"
                  icon={Compass}
                  title="Semesters are being prepared"
                  description="Nothing has been published for this program yet. Check back soon, or take a look at the other programs."
                  primaryAction={{
                    label: "Browse other courses",
                    to: "/courses",
                    icon: ArrowRight,
                  }}
                />
              )}
              {semestersQuery.data?.map((s: SemesterItem) => (
                <Link
                  key={s.id}
                  to="/courses/$courseSlug/$semesterNumber"
                  params={{ courseSlug, semesterNumber: String(s.number) }}
                  className="hud-card interactive-card group relative flex items-center justify-between overflow-hidden rounded-2xl p-5 sm:p-6 shadow-soft-xs hover:border-primary/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground font-display text-lg font-bold shadow-2xs group-hover:scale-105 transition-transform">
                      {s.number}
                    </span>
                    <div>
                      <div className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {s.title}
                      </div>
                      {s.description ? (
                        <div className="mt-1 text-xs text-muted-foreground line-clamp-1">
                          {formatTitleCase(s.description)}
                        </div>
                      ) : (
                        <div className="mt-1 text-xs text-muted-foreground">
                          Syllabus-aligned units, past papers & MCQs
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 text-xs font-bold text-primary group-hover:underline">
                    <span className="hidden sm:inline">Open Semester</span>
                    <div className="btn-squishy grid h-9 w-9 place-items-center rounded-full border border-border/80 bg-muted/60 text-primary group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <ArrowRight className="h-4 w-4" />
                    </div>
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
