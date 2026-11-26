import { createFileRoute } from "@tanstack/react-router";

import { EditorialReferenceLanding } from "@/components/marketing/editorial-reference-landing";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  loader: async () => {
    const { data } = await supabase
      .from("semesters")
      .select(
        "number, courses!inner(slug), subjects(id, code, slug, title, credits, status, deleted_at, sort_order)",
      )
      .eq("courses.slug", "bca")
      .eq("courses.status", "published")
      .is("courses.deleted_at", null)
      .eq("status", "published")
      .is("deleted_at", null)
      .order("number");

    return (data ?? []).map(({ number, subjects }) => ({
      number,
      subjects: subjects
        .filter((subject) => subject.status === "published" && !subject.deleted_at)
        .sort((a, b) => a.sort_order - b.sort_order || a.code.localeCompare(b.code))
        .map(({ id, code, slug, title, credits }) => ({ id, code, slug, title, credits })),
    }));
  },
  head: () => ({
    meta: [
      { title: "XRounder — MJPRU BCA Notes, Past Papers & MCQ Practice" },
      {
        name: "description",
        content:
          "Free MJPRU BCA study notes, previous year question papers and syllabus-aligned MCQ practice tests organized by semester on XRounder.",
      },
      { property: "og:title", content: "XRounder — MJPRU BCA Notes, Past Papers & MCQ Practice" },
      {
        property: "og:description",
        content:
          "Free MJPRU BCA study notes, previous year question papers and syllabus-aligned MCQ practice tests organized by semester on XRounder.",
      },
      { property: "og:url", content: "https://www.xrounder.in/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.xrounder.in/xrounder-share.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:alt", content: "XRounder — Learn smarter with notes, past papers and MCQ quizzes" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "XRounder — MJPRU BCA Notes, Past Papers & MCQ Practice" },
      {
        name: "twitter:description",
        content:
          "Free MJPRU BCA study notes, previous year question papers and syllabus-aligned MCQ practice tests organized by semester on XRounder.",
      },
      { name: "twitter:image", content: "https://www.xrounder.in/xrounder-share.jpg" },
      { name: "twitter:image:alt", content: "XRounder — Learn smarter with notes, past papers and MCQ quizzes" },
    ],
    links: [{ rel: "canonical", href: "https://www.xrounder.in/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://www.xrounder.in/#website",
              url: "https://www.xrounder.in/",
              name: "XRounder",
              description:
                "The structured learning platform for BCA students. Notes, past papers and MCQ practice — organized by semester and subject.",
              publisher: {
                "@id": "https://www.xrounder.in/#organization",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.xrounder.in/courses?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "EducationalOrganization",
              "@id": "https://www.xrounder.in/#organization",
              name: "XRounder",
              url: "https://www.xrounder.in/",
              logo: "https://www.xrounder.in/xrounder-mark.png",
              sameAs: ["https://github.com/TheAKSHAYY"],
              description:
                "Structured semester-by-semester learning platform with syllabus-aligned notes, past university papers, and practice exams for BCA students.",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <EditorialReferenceLanding semesters={Route.useLoaderData()} />;
}
