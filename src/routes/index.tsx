import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  Benefits,
  CTA,
  Contact,
  EmptyLanding,
  FAQ,
  Features,
  Hero,
  Journey,
  LandingSkeleton,
  Testimonials,
  TrustBar,
  WhyChoose,
} from "@/components/marketing/landing-sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BCA Gurukul — Master your BCA, semester by semester" },
      {
        name: "description",
        content:
          "The structured learning platform for BCA students. Notes, past papers, video lectures, and MCQ practice — organized by semester and subject.",
      },
      { property: "og:title", content: "BCA Gurukul — Master your BCA, semester by semester" },
      {
        property: "og:description",
        content:
          "The structured learning platform for BCA students. Notes, past papers, video lectures, and MCQ practice — organized by semester and subject.",
      },
    ],
  }),
  component: Index,
});

type HomepageSection = { id: string; type: string; position: number; enabled: boolean };

function Index() {
  const { user, loading } = useAuth();
  const { data: sections, isLoading } = useQuery({
    queryKey: ["homepage_sections", "public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_sections")
        .select("id,type,position,enabled")
        .eq("enabled", true)
        .order("position", { ascending: true });
      if (error) throw error;
      return (data ?? []) as HomepageSection[];
    },
    staleTime: 60_000,
  });

  const list = sections ?? [];
  const showEmpty = !isLoading && list.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader marketing />
      <main>
        {isLoading ? (
          <LandingSkeleton />
        ) : showEmpty ? (
          <EmptyLanding user={user} loading={loading} />
        ) : (
          list.map((s) => {
            switch (s.type) {
              case "hero":
                return <Hero key={s.id} user={user} loading={loading} />;
              case "trust_bar":
                return <TrustBar key={s.id} />;
              case "features":
                return <Features key={s.id} />;
              case "why_choose":
                return <WhyChoose key={s.id} />;
              case "journey":
                return <Journey key={s.id} />;
              case "benefits":
                return <Benefits key={s.id} />;
              case "testimonials":
                return <Testimonials key={s.id} />;
              case "faq":
                return <FAQ key={s.id} />;
              case "cta":
                return <CTA key={s.id} user={user} loading={loading} />;
              case "contact":
                return <Contact key={s.id} />;
              default:
                return null;
            }
          })
        )}
      </main>
      <SiteFooter marketing />
    </div>
  );
}
