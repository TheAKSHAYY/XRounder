import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUp,
  Award,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Github,
  GraduationCap,
  Mail,
  Share2,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { ContactForm } from "@/components/developer/contact-form";
import { PortfolioCommand } from "@/components/developer/portfolio-command";

import { platformIcon } from "./portfolio.types";
import type { Achievement, Profile, Project, Skill, Social } from "./portfolio.types";
import type { ContributionDay } from "./use-github-data";
import { useGithubContributions, useGithubLanguages, useGithubUser } from "./use-github-data";

/* ── Design-system primitives ─────────────────────────────────────────────
 * One shell for every section, one chip, one section heading. Mobile-first:
 * px-5 / py-14 on phones, wider gutters and rhythm from `sm:` upward.
 */

export function Section({
  id,
  children,
  className,
  muted = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-16 border-b border-border/50 px-5 py-14 sm:px-8 sm:py-20 lg:py-24",
        muted && "bg-surface-muted/30",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="text-[0.7rem] font-semibold tracking-[0.16em] text-accent uppercase">
        {eyebrow}
      </div>
      <h2 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export function Chip({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "accent" | "outline";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium",
        tone === "default" && "border-border bg-surface text-foreground",
        tone === "accent" && "border-accent/30 bg-accent/10 text-accent",
        tone === "outline" && "border-dashed border-border bg-transparent text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0">
      <div className="font-display text-lg font-semibold text-foreground sm:text-xl">{value}</div>
      <div className="truncate text-[0.7rem] text-muted-foreground sm:text-xs">{label}</div>
    </div>
  );
}

/* ── Navigation ──────────────────────────────────────────────────────────── */

const NAV = [
  { href: "#top", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

/** Scroll spy + read-progress, both cheap (one rAF-throttled scroll listener). */
function useScrollState() {
  const [state, setState] = useState({ active: "top", progress: 0, scrolled: false });

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const progress = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
        let active = "top";
        for (const item of NAV) {
          const el = document.getElementById(item.href.slice(1));
          if (el && el.getBoundingClientRect().top <= 140) active = item.href.slice(1);
        }
        setState({ active, progress, scrolled: doc.scrollTop > 400 });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return state;
}

export function PortfolioNav({
  name,
  profile,
  projects,
  socials,
}: {
  name: string;
  profile?: Profile;
  projects?: Project[];
  socials?: Social[];
}) {
  const { active, progress, scrolled } = useScrollState();

  return (
    <>
      <nav
        aria-label="Portfolio sections"
        className="sticky top-0 z-30 border-b border-border/50 bg-background/85 backdrop-blur-md"
      >
        <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-5 py-2.5 sm:px-8">
          <Link
            to="/"
            className="shrink-0 font-display text-sm font-semibold text-foreground hover:text-primary"
          >
            {name.split(" ")[0]}
          </Link>
          <div className="-mx-1 flex min-w-0 flex-1 gap-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {NAV.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                    isActive
                      ? "bg-surface text-foreground"
                      : "text-muted-foreground hover:bg-surface hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          {profile && (
            <PortfolioCommand profile={profile} projects={projects ?? []} socials={socials ?? []} />
          )}
        </div>
        <div
          aria-hidden
          className="h-0.5 origin-left bg-primary transition-transform duration-150"
          style={{ transform: `scaleX(${progress})` }}
        />
      </nav>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={cn(
          "fixed right-4 bottom-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-foreground shadow-lg transition-all",
          scrolled ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <ArrowUp className="h-4 w-4" aria-hidden />
      </button>
    </>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */

export function HeroSection({
  profile,
  name,
  initials,
  socials,
  projects,
  githubUsername,
}: {
  profile: Profile;
  name: string;
  initials: string;
  socials: Social[];
  projects: Project[];
  skills: Skill[];
  achievements: Achievement[];
  githubUsername: string | null;
}) {
  const ghUser = useGithubUser(githubUsername);
  const liveProjects = projects.filter((p) => p.live_url).length;
  const githubUrl = githubUsername ? `https://github.com/${githubUsername}` : null;

  const stats: { value: string; label: string }[] = [];
  if (liveProjects > 0)
    stats.push({
      value: String(liveProjects),
      label: liveProjects === 1 ? "Live product" : "Live products",
    });
  if (ghUser.data) {
    stats.push({ value: String(ghUser.data.public_repos), label: "Public repos" });
    if (ghUser.data.followers > 0)
      stats.push({ value: String(ghUser.data.followers), label: "GitHub followers" });
  }
  if (stats.length < 3 && profile.education)
    stats.push({ value: "BCA", label: "Student, 5th sem" });

  return (
    <header id="top" className="relative overflow-hidden border-b border-border/50">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[110px] sm:h-[26rem] sm:w-[26rem]" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70 motion-reduce:hidden" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Open to internships
            </span>

            <h1 className="mt-5 font-display text-[2rem] leading-[1.12] font-semibold text-foreground sm:text-5xl">
              {name.trim()} — building production-ready web systems.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              BCA student and Java-focused developer. I design and ship full-stack products
              end-to-end — most recently <span className="text-foreground">XRounder</span>, a live
              learning platform I built and maintain solo — while working toward becoming a strong
              software engineer.
            </p>

            {stats.length > 0 && (
              <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4 border-t border-border/60 pt-5">
                {stats.slice(0, 4).map((s) => (
                  <StatCell key={s.label} value={s.value} label={s.label} />
                ))}
              </dl>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <Button asChild size="lg" className="h-11 flex-1 sm:flex-none">
                <a href="#projects">
                  View Projects
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
              {githubUrl && (
                <Button asChild variant="outline" size="lg" className="h-11 flex-1 sm:flex-none">
                  <a href={githubUrl} target="_blank" rel="noreferrer">
                    <Github className="mr-1.5 h-4 w-4" /> GitHub
                  </a>
                </Button>
              )}
              {profile.resume_url && (
                <Button asChild variant="ghost" size="lg" className="h-11">
                  <a href={profile.resume_url} target="_blank" rel="noreferrer">
                    Resume
                  </a>
                </Button>
              )}
            </div>

            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap items-center gap-2">
                {socials.slice(0, 5).map((s) => {
                  const Icon = platformIcon(s.platform);
                  return (
                    <li key={s.id}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label || s.platform}
                        className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        <Icon className="h-4 w-4" aria-hidden />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Portrait */}
          <div className="order-first mx-auto w-full max-w-[16rem] sm:max-w-xs lg:order-none lg:max-w-sm">
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-surface">
              <div className="aspect-square w-full bg-muted">
                {profile.photo_url ? (
                  <img
                    src={profile.photo_url}
                    alt={`Portrait of ${name.trim()}`}
                    className="h-full w-full object-cover"
                    width={512}
                    height={512}
                  />
                ) : (
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className="h-full w-full rounded-none bg-primary/10 font-display text-6xl text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              {profile.professional_title && (
                <p className="border-t border-border/70 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  {profile.professional_title.replace(/\s*\|\s*/g, " · ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Featured project ────────────────────────────────────────────────────── */

function prettyHost(url: string | null | undefined) {
  if (!url) return null;
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/** XRounder is this project itself — its canonical URL is known, not invented. */
function resolveLiveUrl(p: Project) {
  if (p.live_url) return p.live_url;
  if (/xrounder/i.test(p.name)) return "https://www.xrounder.in";
  return null;
}

export function FeaturedProjectSection({ featured }: { featured: Project }) {
  const tech = featured.tech_stack ?? [];
  const liveUrl = resolveLiveUrl(featured);
  const host = prettyHost(liveUrl);
  return (
    <Section id="projects">
      <SectionHeading eyebrow="Featured work" title={featured.name} />

      <Reveal className="mt-7">
        <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_18px_40px_-24px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted sm:aspect-[16/7]">
            {featured.thumbnail_url ? (
              <img
                src={featured.thumbnail_url}
                alt={`${featured.name} interface`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                loading="lazy"
              />
            ) : (
              <div
                aria-hidden
                className="grid h-full place-items-center bg-linear-to-br from-primary/10 via-accent/10 to-transparent"
              >
                <span className="font-display text-3xl font-semibold text-foreground/25 sm:text-5xl">
                  {featured.name}
                </span>
              </div>
            )}
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background/80 px-2 py-1 text-[0.7rem] font-medium text-foreground backdrop-blur">
              <Star className="h-3 w-3 text-accent" aria-hidden /> Flagship
            </span>
          </div>

          <div className="p-5 sm:p-8">
            {featured.category && (
              <div className="text-[0.7rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {featured.category}
              </div>
            )}
            {featured.description && (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {featured.description}
              </p>
            )}

            <dl className="mt-6 grid gap-4 border-t border-border/60 pt-5 sm:grid-cols-2">
              <div>
                <dt className="text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase">
                  My contribution
                </dt>
                <dd className="mt-1 text-sm text-foreground">
                  Built solo — data model, backend, admin CMS and full front-end.
                </dd>
              </div>
              <div>
                <dt className="text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase">
                  Status
                </dt>
                <dd className="mt-1 text-sm text-foreground">
                  {liveUrl ? "Live and actively maintained" : "In development"}
                </dd>
              </div>
              {host && (
                <div>
                  <dt className="text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase">
                    Live at
                  </dt>
                  <dd className="mt-1 text-sm">
                    <a
                      href={liveUrl!}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {host}
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            {tech.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {tech.map((t) => (
                  <li key={t}>
                    <Chip>{t}</Chip>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-wrap gap-2.5">
              {liveUrl && (
                <Button asChild size="lg" className="h-11 flex-1 sm:flex-none">
                  <a href={liveUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-1.5 h-4 w-4" /> Live demo
                  </a>
                </Button>
              )}
              {featured.github_url && (
                <Button asChild variant="outline" size="lg" className="h-11 flex-1 sm:flex-none">
                  <a href={featured.github_url} target="_blank" rel="noreferrer">
                    <Github className="mr-1.5 h-4 w-4" /> Source
                  </a>
                </Button>
              )}
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}

/* ── Secondary projects ──────────────────────────────────────────────────── */

export function ProjectGridSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string | null>(null);

  // Tech chips derived from the projects themselves — no extra data needed.
  const techs = Array.from(
    projects.reduce((map, p) => {
      for (const t of p.tech_stack ?? []) map.set(t, (map.get(t) ?? 0) + 1);
      return map;
    }, new Map<string, number>()),
  )
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10)
    .map(([t]) => t);

  const visible = filter ? projects.filter((p) => (p.tech_stack ?? []).includes(filter)) : projects;

  return (
    <Section muted>
      <SectionHeading eyebrow="More work" title="Other projects" />
      {techs.length > 1 && (
        <div
          className="mt-5 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter projects by tech"
        >
          <button
            type="button"
            onClick={() => setFilter(null)}
            aria-pressed={filter === null}
            className={cn(
              "rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
              filter === null
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-surface text-muted-foreground hover:text-foreground",
            )}
          >
            All ({projects.length})
          </button>
          {techs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(filter === t ? null : t)}
              aria-pressed={filter === t}
              className={cn(
                "rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
                filter === t
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      )}
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {visible.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_18px_40px_-24px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
              {p.category && (
                <div className="text-[0.7rem] tracking-wide text-muted-foreground uppercase">
                  {p.category}
                </div>
              )}
              <h3 className="mt-1 font-display text-lg font-semibold text-foreground">{p.name}</h3>
              {p.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              )}
              {p.tech_stack && p.tech_stack.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.tech_stack.slice(0, 6).map((t) => (
                    <li key={t}>
                      <Chip>{t}</Chip>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto flex flex-wrap gap-2 border-t border-border/60 pt-4">
                {p.live_url && (
                  <Button asChild size="lg" className="h-11 flex-1 sm:flex-none">
                    <a href={p.live_url} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-1.5 h-4 w-4" /> Live demo
                    </a>
                  </Button>
                )}
                {p.github_url && (
                  <Button asChild size="lg" variant="outline" className="h-11 flex-1 sm:flex-none">
                    <a href={p.github_url} target="_blank" rel="noreferrer">
                      <Github className="mr-1.5 h-4 w-4" /> Code
                    </a>
                  </Button>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── About ───────────────────────────────────────────────────────────────── */

function shortBio(bio: string) {
  const sentences = bio.split(/(?<=\.)\s+/);
  return sentences.slice(0, 3).join(" ");
}

export function AboutSection({ profile }: { profile: Profile }) {
  const items = [
    { key: "education", label: "Education", icon: GraduationCap, body: profile.education },
    { key: "focus", label: "Current focus", icon: BookOpen, body: profile.current_goal },
    { key: "goal", label: "Career goal", icon: Award, body: profile.career_objective },
    { key: "interests", label: "Interests", icon: Star, body: profile.interests },
  ].filter((i) => Boolean(i.body));

  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="A little background" />
      {profile.bio && (
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {shortBio(profile.bio)}
        </p>
      )}
      {items.length > 0 && (
        <Accordion type="single" collapsible className="mt-6 max-w-2xl">
          {items.map((item) => (
            <AccordionItem key={item.key} value={item.key} className="border-border/60">
              <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
                <span className="flex items-center gap-2.5">
                  <item.icon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {item.label}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                {item.body}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Section>
  );
}

/* ── Skills ──────────────────────────────────────────────────────────────── */

const CATEGORY_LABEL: Record<string, string> = {
  language: "Languages",
  framework: "Frameworks & development",
  tool: "Tools & infrastructure",
  learning: "Currently learning",
  other: "Other",
};

export function SkillsSection({ skillGroups }: { skillGroups: Record<string, Skill[]> }) {
  const order = ["language", "framework", "tool", "learning"];
  const entries = Object.entries(skillGroups).sort(
    (a, b) =>
      (order.indexOf(a[0]) + 1 || 99) - (order.indexOf(b[0]) + 1 || 99) || a[0].localeCompare(b[0]),
  );

  return (
    <Section id="skills" muted>
      <SectionHeading eyebrow="Skills" title="What I work with" />
      <div className="mt-7 space-y-7">
        {entries.map(([cat, list]) => {
          const learning = cat.toLowerCase().includes("learn");
          return (
            <div key={cat}>
              <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {CATEGORY_LABEL[cat.toLowerCase()] ?? cat}
                {learning && <span className="ml-2 font-normal normal-case">(in progress)</span>}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {list.map((s) => (
                  <li key={s.id}>
                    <Chip tone={learning ? "outline" : "default"} className="px-3 py-1.5 text-sm">
                      {s.icon && <span aria-hidden>{s.icon}</span>}
                      {s.name}
                    </Chip>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ── Achievements ────────────────────────────────────────────────────────── */

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  return (
    <Section>
      <SectionHeading eyebrow="Milestones" title="Achievements" />
      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {achievements.map((a) => {
          const Wrapper = a.url ? "a" : "div";
          return (
            <li key={a.id}>
              <Wrapper
                {...(a.url ? { href: a.url, target: "_blank", rel: "noreferrer" } : {})}
                className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary/30"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                  <Award className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.7rem] tracking-wide text-muted-foreground uppercase">
                    {a.kind}
                  </span>
                  <span className="block font-display text-base font-semibold text-foreground">
                    {a.title}
                  </span>
                  {a.issuer && (
                    <span className="block text-xs text-muted-foreground">{a.issuer}</span>
                  )}
                  {a.description && (
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {a.description}
                    </span>
                  )}
                </span>
              </Wrapper>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/* ── GitHub ──────────────────────────────────────────────────────────────── */

const LEVEL_BG = [
  "bg-border/60",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/70",
  "bg-primary",
] as const;

/** Real GitHub contribution heatmap — renders nothing when data is unavailable. */
function ContributionGraph({ username }: { username: string }) {
  const { data } = useGithubContributions(username);
  if (!data || data.days.length === 0) return null;

  // Column = calendar week. First column is padded so rows align to weekdays.
  const lead = new Date(data.days[0]!.date).getDay();
  const cells: (ContributionDay | null)[] = [
    ...Array.from({ length: lead }, () => null),
    ...data.days,
  ];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const months: { label: string; index: number }[] = [];
  weeks.forEach((week, i) => {
    const first = week[0];
    if (!first) return;
    const d = new Date(first.date);
    if (d.getDate() <= 7) {
      months.push({ label: d.toLocaleString("en", { month: "short" }), index: i });
    }
  });

  return (
    <div className="mt-5 border-t border-border/60 pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Contributions
        </h3>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{data.total.toLocaleString()}</span> in the
          last year
        </p>
      </div>

      <div className="-mx-1 mt-3 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="min-w-max">
          <div className="mb-1 flex gap-[3px] text-[0.6rem] text-muted-foreground">
            {weeks.map((_, i) => {
              const month = months.find((m) => m.index === i);
              return (
                <span key={i} className="w-[10px] shrink-0">
                  {month ? month.label : ""}
                </span>
              );
            })}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((week, i) => (
              <div key={i} className="flex w-[10px] shrink-0 flex-col gap-[3px]">
                {week.map((day, di) =>
                  !day ? (
                    <span key={di} className="h-[10px] w-[10px]" aria-hidden />
                  ) : (
                    <span
                      key={day.date}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                      className={cn("h-[10px] w-[10px] rounded-[2px]", LEVEL_BG[day.level])}
                    />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end gap-1 text-[0.65rem] text-muted-foreground">
        <span>Less</span>
        {LEVEL_BG.map((bg) => (
          <span key={bg} className={cn("h-[10px] w-[10px] rounded-[2px]", bg)} aria-hidden />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

/** Language mix computed from the user's own public repos. */
function LanguageMix({ username }: { username: string }) {
  const { languages } = useGithubLanguages(username);
  if (languages.length === 0) return null;

  return (
    <div className="mt-5 border-t border-border/60 pt-5">
      <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        Most-used languages
      </h3>
      <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-border/60">
        {languages.map((l, i) => (
          <span
            key={l.name}
            className={cn("h-full", LEVEL_BG[Math.max(1, 4 - i)])}
            style={{ width: `${l.pct}%` }}
            aria-hidden
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        {languages.map((l, i) => (
          <li key={l.name} className="inline-flex items-center gap-1.5">
            <span
              className={cn("h-2 w-2 rounded-full", LEVEL_BG[Math.max(1, 4 - i)])}
              aria-hidden
            />
            <span className="text-foreground">{l.name}</span>
            <span>{Math.round(l.pct)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Streaks / cadence derived from the same real contribution days. */
function ActivityStats({ username }: { username: string }) {
  const { data } = useGithubContributions(username);
  if (!data || data.days.length === 0) return null;

  const days = data.days.filter((d) => new Date(d.date) <= new Date());
  const activeDays = days.filter((d) => d.count > 0).length;

  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    if (run > longest) longest = run;
  }

  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i]!.count > 0) current++;
    else break;
  }

  const best = days.reduce((a, b) => (b.count > a.count ? b : a), days[0]!);
  const last30 = days.slice(-30).reduce((sum, d) => sum + d.count, 0);

  const items = [
    { label: "Current streak", value: `${current}d` },
    { label: "Longest streak", value: `${longest}d` },
    { label: "Active days / yr", value: String(activeDays) },
    { label: "Last 30 days", value: String(last30) },
    { label: "Best day", value: `${best.count}` },
  ];

  return (
    <div className="mt-5 border-t border-border/60 pt-5">
      <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        Coding cadence
      </h3>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-5">
        {items.map((s) => (
          <div key={s.label} className="min-w-0">
            <dd className="font-display text-lg font-semibold text-foreground">{s.value}</dd>
            <dt className="truncate text-[0.7rem] text-muted-foreground">{s.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function GithubSection({ githubUsername }: { githubUsername: string }) {
  const user = useGithubUser(githubUsername);
  const profileUrl = `https://github.com/${githubUsername}`;

  return (
    <Section id="github" muted>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="GitHub" title="Code & activity" />
        <Button asChild variant="outline" className="h-11">
          <a href={profileUrl} target="_blank" rel="noreferrer">
            <Github className="mr-1.5 h-4 w-4" /> View GitHub
          </a>
        </Button>
      </div>

      <div className="mt-7 rounded-2xl border border-border bg-surface p-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-foreground text-background">
            <Github className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <div className="truncate font-display text-base font-semibold text-foreground">
              @{githubUsername}
            </div>
            <div className="text-xs text-muted-foreground">
              {user.data
                ? `${user.data.public_repos} public repositories${
                    user.data.followers > 0 ? ` · ${user.data.followers} followers` : ""
                  }`
                : "Projects, experiments and daily commits"}
            </div>
          </div>
        </div>

        <ContributionGraph username={githubUsername} />
        <ActivityStats username={githubUsername} />
        <LanguageMix username={githubUsername} />
      </div>
    </Section>
  );
}

/* ── Contact ─────────────────────────────────────────────────────────────── */

export function ContactSection({ profile, socials }: { profile: Profile; socials: Social[] }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    if (!profile.email) return;
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the mailto link below still works */
    }
  };

  const [shared, setShared] = useState(false);
  const sharePage = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShared(true);
      window.setTimeout(() => setShared(false), 2000);
    } catch {
      /* share/clipboard unavailable — nothing to do */
    }
  };

  return (
    <Section id="contact" className="border-b-0">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something together"
        description="Internships, collaborations, feedback on my work — my inbox is open."
      />
      <div className="mt-7 max-w-2xl">
        <ContactForm />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {profile.email && (
          <>
            <Button asChild variant="outline" size="sm">
              <a href={`mailto:${profile.email}`}>
                <Mail className="mr-1.5 h-4 w-4" /> {profile.email}
              </a>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email address"}
            >
              {copied ? (
                <Check className="mr-1.5 h-4 w-4 text-accent" aria-hidden />
              ) : (
                <Copy className="mr-1.5 h-4 w-4" aria-hidden />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
          </>
        )}
        <Button type="button" variant="ghost" size="sm" onClick={sharePage}>
          <Share2 className="mr-1.5 h-4 w-4" aria-hidden /> {shared ? "Link copied" : "Share"}
        </Button>
        {socials.slice(0, 4).map((s) => {
          const Icon = platformIcon(s.platform);
          return (
            <Button asChild key={s.id} variant="ghost" size="sm">
              <a href={s.url} target="_blank" rel="noreferrer">
                <Icon className="mr-1.5 h-4 w-4" aria-hidden />
                <span className="capitalize">{s.platform}</span>
              </a>
            </Button>
          );
        })}
      </div>
    </Section>
  );
}
