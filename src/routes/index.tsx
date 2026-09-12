import { useEffect } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

import { useAuth, getAuthState, waitForAuth } from "@/hooks/use-auth";
import { getCachedPostAuthRoute, resolvePostAuthRoute } from "@/lib/post-auth";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  Hero,
  ValueStrip,
  TheProblem,
  LearningLoop,
  InteractiveQuizResultDemo,
  CourseDiscovery,
  WhyXRounder,
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
      { title: "XRounder — Learn Smarter. Know What to Study Next." },
      {
        name: "description",
        content:
          "The structured learning platform for BCA students. Syllabus-aligned notes, diagnostic MCQs, weakness detection, and targeted revision for university exams.",
      },
      { property: "og:title", content: "XRounder — Learn Smarter. Know What to Study Next." },
      {
        property: "og:description",
        content:
          "The structured learning platform for BCA students. Syllabus-aligned notes, diagnostic MCQs, weakness detection, and targeted revision for university exams.",
      },
      { property: "og:url", content: "https://www.xrounder.in/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.xrounder.in/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "XRounder — Learn Smarter. Know What to Study Next." },
      {
        name: "twitter:description",
        content:
          "The structured learning platform for BCA students. Syllabus-aligned notes, diagnostic MCQs, weakness detection, and targeted revision for university exams.",
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

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <SiteHeader marketing />
      <main className="flex flex-col">
        {/* 1. Hero Section + Layered Product Preview */}
        <Hero user={user} loading={loading} />

        {/* 2. Trust & Value Strip */}
        <ValueStrip />

        {/* 3. The Problem — Dead-end vs Continuous Loop */}
        <TheProblem />

        {/* 4. The 7-Step Learning Loop */}
        <LearningLoop />

        {/* 5. Interactive Quiz Result Demo */}
        <InteractiveQuizResultDemo />

        {/* 6. Dynamic BCA Syllabus Explorer */}
        <CourseDiscovery />

        {/* 7. Why XRounder — 4 Core Pillars */}
        <WhyXRounder />

        {/* 8. Final High-Conversion CTA */}
        <CTA user={user} loading={loading} />
      </main>
      <SiteFooter />
    </div>
  );
}
