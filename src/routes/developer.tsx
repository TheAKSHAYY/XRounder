import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { usePortfolioData } from "@/components/developer/use-portfolio-data";
import type { Skill } from "@/components/developer/portfolio.types";
import {
  AboutSection,
  AchievementsSection,
  ContactSection,
  FeaturedProjectSection,
  GithubSection,
  HeroSection,
  PortfolioNav,
  ProjectGridSection,
  SkillsSection,
} from "@/components/developer/portfolio-sections";

export const Route = createFileRoute("/developer")({
  head: () => ({
    meta: [
      { title: "Developer Portfolio · Engineering — XRounder" },
      {
        name: "description",
        content:
          "Portfolio of the developer behind XRounder — featured projects, tech stack, achievements, GitHub activity, and contact details.",
      },
      { property: "og:title", content: "Developer Portfolio · Engineering — XRounder" },
      {
        property: "og:description",
        content:
          "Featured projects, tech stack, achievements and contact — the maker behind XRounder.",
      },
      { property: "og:url", content: "https://www.xrounder.in/developer" },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Developer Portfolio · Engineering — XRounder" },
      {
        name: "twitter:description",
        content:
          "Portfolio of the developer behind XRounder — featured projects, tech stack, achievements, and contact details.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.xrounder.in/developer" }],
  }),
  component: DeveloperPage,
});

function DeveloperPage() {
  const { profileQ, socialQ, projectsQ, skillsQ, achievementsQ } = usePortfolioData();

  const profile = profileQ.data;
  const loading = profileQ.isLoading;

  if (loading) {
    return (
      <div className="mx-auto w-full sm:max-w-6xl px-4 sm:px-6 py-16">
        <Skeleton className="h-[28rem] w-full rounded-3xl" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!profile || profile.enabled === false) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <Sparkles className="mx-auto h-10 w-10 text-accent" />
        <h1 className="mt-4 font-display text-3xl font-semibold">Developer profile coming soon</h1>
        <p className="mt-3 text-muted-foreground">
          The developer hasn't published their portfolio yet. Check back soon.
        </p>
        <Button asChild className="mt-6 gap-2">
          <Link to="/">
            <Home className="h-4 w-4" aria-hidden />
            Back to home
          </Link>
        </Button>
      </div>
    );
  }

  const name = profile.full_name || "The Developer";
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  const socials = socialQ.data ?? [];
  const projects = projectsQ.data ?? [];
  const skills = skillsQ.data ?? [];
  const achievements = achievementsQ.data ?? [];

  const featured = projects.find((p) => p.featured) ?? projects[0] ?? null;
  const otherProjects = projects.filter((p) => p.id !== featured?.id);

  const skillGroups = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  const githubSocial = socials.find((s) => s.platform.toLowerCase() === "github");
  const githubUsername =
    profile.github_username ||
    (githubSocial ? (githubSocial.url.replace(/\/$/, "").split("/").pop() ?? null) : null);

  return (
    <div className="bg-background">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name,
            jobTitle: profile.professional_title ?? undefined,
            description: profile.short_intro ?? profile.bio ?? undefined,
            email: profile.email ? `mailto:${profile.email}` : undefined,
            url: "https://www.xrounder.in/developer",
            image: profile.photo_url ?? undefined,
            sameAs: socials.map((s) => s.url),
          }),
        }}
      />

      <PortfolioNav name={name} profile={profile} projects={projects} socials={socials} />

      <HeroSection
        profile={profile}
        name={name}
        initials={initials}
        socials={socials}
        projects={projects}
        skills={skills}
        achievements={achievements}
        githubUsername={githubUsername}
      />

      {featured && <FeaturedProjectSection featured={featured} />}

      {otherProjects.length > 0 && <ProjectGridSection projects={otherProjects} />}

      {(profile.bio ||
        profile.education ||
        profile.current_goal ||
        profile.career_objective ||
        profile.interests) && <AboutSection profile={profile} />}

      {skills.length > 0 && <SkillsSection skillGroups={skillGroups} />}

      {achievements.length > 0 && <AchievementsSection achievements={achievements} />}

      {githubUsername && <GithubSection githubUsername={githubUsername} />}

      <ContactSection profile={profile} socials={socials} />
    </div>
  );
}
