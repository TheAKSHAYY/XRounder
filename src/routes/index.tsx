import { useState, useEffect } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

import { useAuth, getAuthState, waitForAuth } from "@/hooks/use-auth";
import { getCachedPostAuthRoute, resolvePostAuthRoute } from "@/lib/post-auth";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  Hero,
  ComparisonMatrix,
  TheProblem,
  DegreeRoadmapExplorer,
  Testimonials,
  FAQSection,
  CTA,
} from "@/components/marketing/landing-sections";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    // Fast path: a known session + cached home page redirects with zero network waits.
    const sync = getAuthState();
    if (sync.isAuthenticated && sync.user) {
      const cached = getCachedPostAuthRoute(sync.user.id);
      if (cached) throw redirect({ to: cached });
    }
    const auth = await waitForAuth();
    if (auth.isAuthenticated && auth.user) {
      const cached = getCachedPostAuthRoute(auth.user.id);
      throw redirect({ to: cached ?? (await resolvePostAuthRoute(auth.user.id)) });
    }
  },

  head: () => ({
    meta: [
      { title: "XRounder — Master BCA. Zero Exam Panic." },
      {
        name: "description",
        content:
          "The structured learning platform for BCA students. 100% NEP 2020 syllabus-aligned notes, 5-year solved university papers, and 3-minute diagnostic quizzes.",
      },
      { property: "og:title", content: "XRounder — Master BCA. Zero Exam Panic." },
      {
        property: "og:description",
        content:
          "The structured learning platform for BCA students. 100% NEP 2020 syllabus-aligned notes, 5-year solved university papers, and 3-minute diagnostic quizzes.",
      },
      { property: "og:url", content: "https://www.xrounder.in/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.xrounder.in/images/landing/sparky-hero.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "XRounder — Master BCA. Zero Exam Panic." },
      {
        name: "twitter:description",
        content:
          "The structured learning platform for BCA students. 100% NEP 2020 syllabus-aligned notes, 5-year solved university papers, and 3-minute diagnostic quizzes.",
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
  const { user, loading, status, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeSemester, setActiveSemester] = useState<number>(1);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    const cached = getCachedPostAuthRoute(user.id);
    if (cached) {
      navigate({ to: cached, replace: true });
      return;
    }
    let cancelled = false;
    void resolvePostAuthRoute(user.id)
      .then((dest) => {
        if (!cancelled) navigate({ to: dest, replace: true });
      })
      .catch(() => {
        if (!cancelled) navigate({ to: "/dashboard", replace: true });
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user, navigate]);

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

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <SiteHeader marketing />
      <main className="flex flex-col">
        {/* 1. Hero: Gamified Quest Hub & Interactive Exam Rescue Machine */}
        <Hero
          user={user}
          loading={loading}
          activeSemester={activeSemester}
          onSelectSemester={setActiveSemester}
        />

        {/* 2. The 2 AM WhatsApp Group Nightmare vs XRounder Superpower */}
        <ComparisonMatrix />

        {/* 3. The 3 Pillars of Exam Domination (Notes, Quizzes, Gamification with 3D Assets) */}
        <TheProblem />

        {/* 4. Unified 6-Semester BCA Degree Roadmap & Live Curriculum Explorer */}
        <DegreeRoadmapExplorer
          activeSemester={activeSemester}
          onSelectSemester={setActiveSemester}
        />

        {/* 5. Student Social Proof & Reviews */}
        <Testimonials />

        {/* 6. BCA Student FAQs Accordion */}
        <FAQSection />

        {/* 7. Final High-Conversion Action CTA */}
        <CTA user={user} loading={loading} activeSemester={activeSemester} />
      </main>
      <SiteFooter />
    </div>
  );
}
