import { useEffect } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { useAuth, waitForAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  CTA,
  CourseDiscovery,
  Features,
  Hero,
  LearningWorkflow,
} from "@/components/marketing/landing-sections";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    // If a session exists, seamlessly redirect to student dashboard
    const auth = await waitForAuth();
    if (auth.isAuthenticated && auth.user) {
      throw redirect({ to: "/dashboard" });
    }
  },
  head: () => ({
    meta: [
      { title: "XRounder — Learn Smarter, Semester by Semester" },
      {
        name: "description",
        content:
          "The structured learning platform for every student. Notes, past papers, video lectures, and MCQ practice — organized by semester and subject.",
      },
      { property: "og:title", content: "XRounder — Learn Smarter, Semester by Semester" },
      {
        property: "og:description",
        content:
          "The structured learning platform for every student. Notes, past papers, video lectures, and MCQ practice — organized by semester and subject.",
      },
      { property: "og:url", content: "https://www.xrounder.in/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.xrounder.in/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "XRounder — Learn Smarter, Semester by Semester" },
      {
        name: "twitter:description",
        content:
          "The structured learning platform for every student. Notes, past papers, video lectures, and MCQ practice — organized by semester and subject.",
      },
      { name: "twitter:image", content: "https://www.xrounder.in/og-image.png" },
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
                "The structured learning platform for every student. Notes, past papers, video lectures, and MCQ practice — organized by semester and subject.",
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
                "Structured semester-by-semester learning platform with syllabus-aligned notes, past university papers, and practice exams.",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

type HomepageSection = { id: string; type: string; position: number };

const DEFAULT_HOMEPAGE_SECTIONS: HomepageSection[] = [
  { id: "default-hero", type: "hero", position: 10 },
  { id: "default-features", type: "features", position: 20 },
  { id: "default-courses", type: "courses", position: 30 },
  { id: "default-workflow", type: "workflow", position: 40 },
  { id: "default-cta", type: "cta", position: 50 },
];

function Index() {
  const { user, loading, status, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const { data: sections = DEFAULT_HOMEPAGE_SECTIONS } = useQuery({
    queryKey: ["homepage_sections", "public"],
    enabled: status === "unauthenticated",
    queryFn: async (): Promise<HomepageSection[]> => {
      try {
        const { data, error } = await supabase.rpc("list_homepage_sections_public");
        if (error) {
          if (import.meta.env.DEV) {
            console.warn(
              "[homepage] Failed to load CMS sections via RPC, using defaults:",
              error.message,
            );
          }
          return DEFAULT_HOMEPAGE_SECTIONS;
        }
        if (!data || data.length === 0) {
          return DEFAULT_HOMEPAGE_SECTIONS;
        }
        return (data as Array<{ id: string; type: string; position: number }>).map((s) => ({
          id: s.id,
          type: s.type,
          position: s.position,
        }));
      } catch (err) {
        if (import.meta.env.DEV) {
          console.warn("[homepage] Exception loading CMS sections, using defaults:", err);
        }
        return DEFAULT_HOMEPAGE_SECTIONS;
      }
    },
    initialData: DEFAULT_HOMEPAGE_SECTIONS,
    staleTime: 60_000,
  });

  // If auth state is loading or user is authenticated (while redirect to dashboard is running),
  // show a minimal clean loading state and NEVER briefly render "Continue as Guest" or landing page.
  if (status === "loading" || (isAuthenticated && user)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-sm font-medium text-muted-foreground">
            {isAuthenticated ? "Redirecting to dashboard…" : "Loading XRounder…"}
          </span>
        </div>
      </div>
    );
  }

  const list = sections && sections.length > 0 ? sections : DEFAULT_HOMEPAGE_SECTIONS;

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <SiteHeader marketing />
      <main>
        {list.map((s) => {
          switch (s.type) {
            case "hero":
              return <Hero key={s.id} user={user} loading={loading} />;
            case "features":
              return <Features key={s.id} />;
            case "courses":
              return <CourseDiscovery key={s.id} />;
            case "workflow":
              return <LearningWorkflow key={s.id} />;
            case "cta":
              return <CTA key={s.id} user={user} loading={loading} />;
            default:
              return null;
          }
        })}
      </main>
      <SiteFooter />
    </div>
  );
}
