import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Layers } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

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

async function fetchCourseDetails(queryClient: any, courseSlug: string): Promise<CourseDetailData> {
  const course = await queryClient.ensureQueryData({
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
      return data as CourseItem;
    },
  });

  if (!course) throw notFound();

  const semesters = await queryClient.ensureQueryData({
    queryKey: ["public", "semesters", course.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("semesters")
        .select("id, number, title, description")
        .eq("course_id", course.id)
        .eq("status", "published")
        .order("number");
      if (error) throw error;
      return (data ?? []) as SemesterItem[];
    },
  });

  return { course, semesters };
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

    const schemas: any[] = [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.xrounder.in/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Courses",
            "item": "https://www.xrounder.in/courses",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": course?.title ?? "Course",
            "item": url,
          },
        ],
      },
    ];

    if (course) {
      schemas.push({
        "@type": "Course",
        "name": course.title,
        "description": description,
        "courseCode": course.code,
        "url": url,
        "provider": {
          "@type": "EducationalOrganization",
          "name": "XRounder",
          "url": "https://www.xrounder.in/",
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
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
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
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background p-6 text-center">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Course not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">The requested program does not exist or has been unpublished.</p>
        <Link to="/courses" className="mt-4 inline-block font-semibold text-primary hover:underline">
          Back to all courses
        </Link>
      </div>
    </div>
  ),
});

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
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <Breadcrumbs
          items={[
            { label: "Courses", to: "/courses" },
            { label: courseQuery.data?.title ?? "Course" },
          ]}
        />

        {courseQuery.data && (
          <div className="mt-6 flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {courseQuery.data.code}
              </div>
              <h1 className="font-display text-4xl font-semibold text-foreground">
                {courseQuery.data.title}
              </h1>
              {courseQuery.data.description && (
                <p className="mt-3 max-w-3xl text-muted-foreground">
                  {courseQuery.data.description}
                </p>
              )}
            </div>
          </div>
        )}

        <section className="mt-10">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
            <Layers className="h-5 w-5 text-primary" /> Semesters
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {semestersQuery.data?.length === 0 && (
              <p className="col-span-full rounded-xl border border-dashed border-border bg-surface p-6 text-sm text-muted-foreground">
                Semesters are being prepared.
              </p>
            )}
            {semestersQuery.data?.map((s: SemesterItem) => (
              <Link
                key={s.id}
                to="/courses/$courseSlug/$semesterNumber"
                params={{ courseSlug, semesterNumber: String(s.number) }}
                className="group rounded-xl border border-border bg-surface p-5 interactive-card shadow-soft-xs hover:border-primary/50"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground font-display text-base">
                    {s.number}
                  </span>
                  <div>
                    <div className="font-display text-base font-semibold text-foreground">
                      {s.title}
                    </div>
                    {s.description && (
                      <div className="text-xs text-muted-foreground">{s.description}</div>
                    )}
                  </div>
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
