import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Code2,
  Download,
  ExternalLink,
  Github,
  Home,
  Layers,
  Mail,
  MapPin,
  Rocket,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ContactForm } from "@/components/developer/contact-form";

import { platformIcon } from "./portfolio.types";
import type { Achievement, Profile, Project, Skill, Social } from "./portfolio.types";

export function StatPill({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Rocket;
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-surface/80 p-3 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <div className="mt-1 font-display text-2xl font-semibold text-foreground">{value}</div>
    </div>
  );
}

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </div>
      <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export function InfoCard({ title, body, className }: { title: string; body: string; className?: string }) {
  return (
    <div className={"rounded-2xl border border-border bg-surface p-6 " + (className || "")}>
      <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

export function HeroSection({
  profile,
  name,
  initials,
  socials,
  projects,
  skills,
  achievements,
  marqueeChips,
}: {
  profile: Profile;
  name: string;
  initials: string;
  socials: Social[];
  projects: Project[];
  skills: Skill[];
  achievements: Achievement[];
  marqueeChips: string[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-14rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute left-[6%] top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-[6%] bottom-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for opportunities
          </span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-foreground sm:text-6xl">
            Hi, I'm{" "}
            <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {name.split(" ")[0]}
            </span>
            .
          </h1>
          {profile.professional_title && (
            <p className="mt-4 font-display text-xl text-foreground/80">
              {profile.professional_title}
            </p>
          )}
          {profile.short_intro && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {profile.short_intro}
            </p>
          )}

          {/* Stats strip */}
          <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
            <StatPill icon={Rocket} value={projects.length} label="Projects" />
            <StatPill icon={Code2} value={skills.length} label="Skills" />
            <StatPill icon={Trophy} value={achievements.length} label="Wins" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="shadow-lg shadow-primary/20">
              <a href="#projects">
                {profile.hero_cta_primary_label || "View Projects"}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
            {profile.resume_url && (
              <Button asChild variant="outline" size="lg">
                <a href={profile.resume_url} target="_blank" rel="noreferrer">
                  <Download className="mr-1.5 h-4 w-4" />
                  {profile.hero_cta_secondary_label || "Resume"}
                </a>
              </Button>
            )}
            <Button asChild variant="ghost" size="lg">
              <a href="#contact">
                <Mail className="mr-1.5 h-4 w-4" /> Say hi
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to="/">
                <Home className="mr-1.5 h-4 w-4" /> Home
              </Link>
            </Button>
          </div>

          {/* Quick social row */}
          {socials.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {socials.slice(0, 6).map((s) => {
                const Icon = platformIcon(s.platform);
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    title={s.label || s.platform}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Portrait card */}
        <div className="relative mx-auto w-full max-w-sm animate-scale-in">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-linear-to-br from-accent/40 via-primary/25 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-surface p-2 shadow-2xl">
            <div className="aspect-square w-full overflow-hidden rounded-[1.6rem] bg-muted">
              {profile.photo_url ? (
                <img
                  src={profile.photo_url}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Avatar className="h-full w-full rounded-[1.6rem]">
                  <AvatarFallback className="h-full w-full rounded-[1.6rem] bg-primary/10 font-display text-7xl text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            {/* Floating status card */}
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-border bg-surface p-3 shadow-lg sm:block">
              <div className="flex items-center gap-2 text-xs">
                <Zap className="h-3.5 w-3.5 text-accent" />
                <span className="font-medium text-foreground">Currently building</span>
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">BCA Gurukul LMS</div>
            </div>
            {profile.education && (
              <div className="absolute -top-3 -right-3 hidden rounded-full border border-border bg-surface px-3 py-1.5 text-xs shadow-lg sm:flex sm:items-center sm:gap-1.5">
                <MapPin className="h-3 w-3 text-primary" />
                <span className="text-muted-foreground">{profile.education.split(",")[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Marquee of tech chips */}
      {marqueeChips.length > 0 && (
        <div className="relative overflow-hidden border-t border-border/60 bg-surface-muted/40 py-4">
          <div className="flex animate-[marquee_35s_linear_infinite] gap-3 whitespace-nowrap">
            {[...marqueeChips, ...marqueeChips].map((c, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function FeaturedProjectSection({ featured }: { featured: Project }) {
  return (
    <section id="projects" className="border-b border-border/60 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Featured" title="Flagship project" />
        <article className="mt-12 overflow-hidden rounded-3xl border border-border bg-surface shadow-xl">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative aspect-video w-full overflow-hidden bg-muted lg:aspect-auto">
              {featured.thumbnail_url ? (
                <img
                  src={featured.thumbnail_url}
                  alt={featured.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full min-h-[20rem] place-items-center bg-linear-to-br from-primary/10 via-accent/10 to-transparent">
                  <Layers className="h-16 w-16 text-primary/40" />
                </div>
              )}
              <Badge className="absolute left-4 top-4 gap-1 bg-accent text-accent-foreground hover:bg-accent">
                <Star className="h-3 w-3" /> Featured
              </Badge>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              {featured.category && (
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {featured.category}
                </div>
              )}
              <h3 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                {featured.name}
              </h3>
              {featured.description && (
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {featured.description}
                </p>
              )}
              {featured.tech_stack && featured.tech_stack.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {featured.tech_stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {featured.live_url && (
                  <Button asChild size="lg">
                    <a href={featured.live_url} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-1.5 h-4 w-4" /> Visit live
                    </a>
                  </Button>
                )}
                {featured.github_url && (
                  <Button asChild variant="outline" size="lg">
                    <a href={featured.github_url} target="_blank" rel="noreferrer">
                      <Github className="mr-1.5 h-4 w-4" /> Source
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export function ProjectGridSection({ projects }: { projects: Project[] }) {
  return (
    <section className="border-b border-border/60 bg-surface-muted/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Work" title="More things I've built" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {p.thumbnail_url ? (
                  <img
                    src={p.thumbnail_url}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full place-items-center bg-linear-to-br from-primary/10 to-accent/10 text-primary/40">
                    <Sparkles className="h-10 w-10" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                {p.category && (
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {p.category}
                  </div>
                )}
                <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                  {p.name}
                </h3>
                {p.description && (
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {p.description}
                  </p>
                )}
                {p.tech_stack && p.tech_stack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tech_stack.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                  {p.github_url && (
                    <Button asChild size="sm" variant="ghost">
                      <a href={p.github_url} target="_blank" rel="noreferrer">
                        <Github className="mr-1 h-3.5 w-3.5" /> Code
                      </a>
                    </Button>
                  )}
                  {p.live_url && (
                    <Button asChild size="sm" variant="ghost">
                      <a href={p.live_url} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-1 h-3.5 w-3.5" /> Live
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section className="border-b border-border/60 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="About" title="Behind the keyboard" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {profile.bio && <InfoCard title="Bio" body={profile.bio} className="lg:col-span-3" />}
          {profile.education && <InfoCard title="Education" body={profile.education} />}
          {profile.current_goal && <InfoCard title="Current Goal" body={profile.current_goal} />}
          {profile.career_objective && (
            <InfoCard title="Career Objective" body={profile.career_objective} />
          )}
          {profile.interests && (
            <InfoCard title="Interests" body={profile.interests} className="lg:col-span-3" />
          )}
        </div>
      </div>
    </section>
  );
}

export function SkillsSection({ skillGroups }: { skillGroups: Record<string, Skill[]> }) {
  return (
    <section className="border-b border-border/60 bg-surface-muted/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Skills" title="Tools of the trade" />
        <div className="mt-12 space-y-8">
          {Object.entries(skillGroups).map(([cat, list]) => (
            <div key={cat}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {cat}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {list.map((s, i) => (
                  <span
                    key={s.id}
                    style={{ animationDelay: `${i * 30}ms` }}
                    className="animate-fade-in rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:border-primary/30"
                  >
                    {s.icon && <span className="mr-1.5">{s.icon}</span>}
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  return (
    <section className="border-b border-border/60 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Milestones" title="Achievements & badges" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => (
            <a
              key={a.id}
              href={a.url || "#"}
              target={a.url ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex gap-4 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/20 text-accent-foreground">
                <Award className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  {a.kind}
                </div>
                <div className="font-display text-base font-semibold text-foreground">
                  {a.title}
                </div>
                {a.issuer && (
                  <div className="text-xs text-muted-foreground">{a.issuer}</div>
                )}
                {a.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {a.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GithubSection({ githubUsername }: { githubUsername: string }) {
  return (
    <section className="border-b border-border/60 bg-surface-muted/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="GitHub" title="Open-source on display" />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface p-4">
            <img
              src={`https://ghchart.rshah.org/2f4858/${githubUsername}`}
              alt={`${githubUsername} GitHub contributions`}
              className="w-full"
              loading="lazy"
            />
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-foreground text-background">
                <Github className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">GitHub</div>
                <div className="font-display text-lg font-semibold">@{githubUsername}</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Follow along with my projects, contributions, and experiments.
            </p>
            <Button asChild className="mt-5 w-full">
              <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">
                <Github className="mr-1.5 h-4 w-4" /> View Profile
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ profile, socials }: { profile: Profile; socials: Social[] }) {
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="Contact" title="Let's build something together" />
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          Open to collaborations, feedback, and a friendly hello.
        </p>
        <div className="mt-10"><ContactForm /></div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {profile.email && (
            <Button asChild variant="outline" size="sm">
              <a href={`mailto:${profile.email}`}>
                <Mail className="mr-1.5 h-4 w-4" /> Email directly
              </a>
            </Button>
          )}
          {profile.resume_url && (
            <Button asChild variant="ghost" size="sm">
              <a href={profile.resume_url} target="_blank" rel="noreferrer">
                <Download className="mr-1.5 h-4 w-4" /> Resume
              </a>
            </Button>
          )}
          {socials.slice(0, 4).map((s) => {
            const Icon = platformIcon(s.platform);
            return (
              <Button asChild key={s.id} variant="ghost" size="sm">
                <a href={s.url} target="_blank" rel="noreferrer">
                  <Icon className="mr-1.5 h-4 w-4" />
                  <span className="capitalize">{s.platform}</span>
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
