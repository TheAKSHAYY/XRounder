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
  FAQ,
  Features,
  Hero,
  Journey,
  Testimonials,
  TrustBar,
  WhyChoose,
} from "@/components/marketing/landing-sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XRounder — Master any course, semester by semester" },
      {
        name: "description",
        content:
          "The structured learning platform for every student. Notes, past papers, video lectures, and MCQ practice — organized by semester and subject.",
      },
      { property: "og:title", content: "XRounder — Master any course, semester by semester" },
      {
        property: "og:description",
        content:
          "The structured learning platform for every student. Notes, past papers, video lectures, and MCQ practice — organized by semester and subject.",
      },
    ],
  }),
  component: Index,
});

type HomepageSection = { id: string; type: string; position: number };

export const DEFAULT_HOMEPAGE_SECTIONS: HomepageSection[] = [
  { id: "default-hero", type: "hero", position: 10 },
  { id: "default-trust_bar", type: "trust_bar", position: 20 },
  { id: "default-features", type: "features", position: 30 },
  { id: "default-why_choose", type: "why_choose", position: 40 },
  { id: "default-journey", type: "journey", position: 50 },
  { id: "default-benefits", type: "benefits", position: 60 },
  { id: "default-testimonials", type: "testimonials", position: 70 },
  { id: "default-faq", type: "faq", position: 80 },
  { id: "default-cta", type: "cta", position: 90 },
  { id: "default-contact", type: "contact", position: 100 },
];

function Index() {
  const { user, loading } = useAuth();
  const { data: sections = DEFAULT_HOMEPAGE_SECTIONS } = useQuery({
    queryKey: ["homepage_sections", "public"],
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

  const list = sections && sections.length > 0 ? sections : DEFAULT_HOMEPAGE_SECTIONS;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader marketing />
      <main>
        {list.map((s) => {
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
        })}
      </main>
      <SiteFooter marketing />
    </div>
  );
}
