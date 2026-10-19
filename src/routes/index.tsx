import { createFileRoute } from "@tanstack/react-router";

import { EditorialReferenceLanding } from "@/components/marketing/editorial-reference-landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XRounder — Learn smarter, one step at a time." },
      {
        name: "description",
        content:
          "Learn with AI. Practice with MCQs. Prepare with confidence. Syllabus-aligned notes, past papers, and diagnostic quizzes.",
      },
      { property: "og:title", content: "XRounder — Learn smarter, one step at a time." },
      {
        property: "og:description",
        content:
          "Learn with AI. Practice with MCQs. Prepare with confidence. Syllabus-aligned notes, past papers, and diagnostic quizzes.",
      },
      { property: "og:url", content: "https://www.xrounder.in/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.xrounder.in/images/landing/sparky-hero.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "XRounder — Learn smarter, one step at a time." },
      {
        name: "twitter:description",
        content:
          "Learn with AI. Practice with MCQs. Prepare with confidence. Syllabus-aligned notes, past papers, and diagnostic quizzes.",
      },
      { name: "twitter:image", content: "https://www.xrounder.in/images/landing/sparky-hero.jpg" },
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
                "The structured learning platform for BCA students. Notes, past papers, video lectures, and MCQ practice — organized by semester and subject.",
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
  return <EditorialReferenceLanding />;
}
