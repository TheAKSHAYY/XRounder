import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileText,
  FlaskConical,
  GraduationCap,
  Layers,
  PlayCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────── 1. Hero */

export function Hero({ user, loading }: { user: unknown; loading: boolean }) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "notes" | "quiz">("dashboard");

  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-surface/30 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Personal Semester Operating System
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-5xl leading-[1.12]">
              Your entire semester.{" "}
              <span className="text-primary">One focused study system.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Syllabus-aligned notes, unit-wise MCQs, previous-year papers and progress tracking — built around exactly what you need to learn and revise.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {loading ? (
                <Skeleton className="h-12 w-44 rounded-xl" />
              ) : user ? (
                <Button asChild size="lg" className="h-12 px-7 text-sm font-semibold rounded-xl shadow-xs">
                  <Link to="/dashboard">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="h-12 px-7 text-sm font-semibold rounded-xl shadow-xs">
                  <Link to="/courses">
                    Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}

              <Button asChild variant="outline" size="lg" className="h-12 px-6 text-sm font-semibold rounded-xl">
                <Link to="/explore">
                  Explore as Guest
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Unit-by-unit syllabus</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Weak topic tracking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>100% free student access</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Product UI Preview */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-md ring-1 ring-border/50">
              {/* Window Header Bar */}
              <div className="flex items-center justify-between border-b border-border/70 pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    XRounder · Semester OS
                  </span>
                </div>
                <Badge variant="outline" className="text-[11px] font-mono border-primary/30 text-primary">
                  Semester 5
                </Badge>
              </div>

              {/* Product Preview Tabs */}
              <div className="mt-3.5 flex flex-wrap items-center gap-1.5 border-b border-border/70 pb-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("dashboard")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    activeTab === "dashboard"
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <TrendingUp className="h-3.5 w-3.5" /> Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("notes")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    activeTab === "notes"
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <FileText className="h-3.5 w-3.5" /> Notes Reader
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("quiz")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    activeTab === "quiz"
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <FlaskConical className="h-3.5 w-3.5" /> MCQ Solver
                </button>
              </div>

              {/* Dynamic Interactive Card Content */}
              <div className="mt-3.5 min-h-[260px] rounded-xl bg-background p-4 border border-border/60">
                {activeTab === "dashboard" && (
                  <div className="space-y-3.5">
                    {/* Top Greeting in Preview */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                          Good morning, Alex 👋
                        </span>
                        <h4 className="font-display font-bold text-sm text-foreground">
                          Computer Networks · Semester 5
                        </h4>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-bold text-accent-foreground">
                        🔥 4d streak
                      </span>
                    </div>

                    {/* Continue Learning card */}
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-primary flex items-center gap-1">
                          <PlayCircle className="h-3.5 w-3.5" /> Continue Learning
                        </span>
                        <span className="font-semibold text-foreground">62% complete</span>
                      </div>
                      <p className="mt-1 font-semibold text-xs text-foreground">
                        Unit 3 — Routing & IP Addressing
                      </p>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "62%" }} />
                      </div>
                    </div>

                    {/* Weak topics preview */}
                    <div className="rounded-xl border border-amber-500/20 bg-amber-50/40 dark:bg-amber-950/20 p-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-700 dark:text-amber-300">
                          Weak Area: Exception Handling
                        </span>
                        <span className="font-semibold text-amber-600 dark:text-amber-400">42%</span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        Recommended: Practice 5 quick revision MCQs
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "notes" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-sm text-foreground">
                        Conditional Statements & Branching
                      </h4>
                      <span className="text-[11px] font-mono text-muted-foreground">Unit 2.1</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      In C programming, conditional statements execute specific code blocks
                      based on whether an expression evaluates to non-zero (true) or zero (false).
                    </p>
                    <div className="rounded-lg bg-surface p-2.5 font-mono text-[11px] text-foreground border border-border/60">
                      <span className="text-primary font-bold">if</span> (score &gt;= 50) &#123;
                      <br />
                      &nbsp;&nbsp;printf(<span className="text-emerald-600">"Status: Passed\n"</span>);
                      <br />
                      &#125;
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                      <span>Estimated reading time: 4 mins</span>
                      <span className="text-primary font-semibold">100% Syllabus Aligned</span>
                    </div>
                  </div>
                )}

                {activeTab === "quiz" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                        Question 3 of 10
                      </span>
                      <Badge variant="outline" className="text-[10px] text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40">
                        Immediate Feedback
                      </Badge>
                    </div>
                    <p className="text-xs font-medium text-foreground">
                      Which keyword is used to terminate a loop prematurely in C?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="rounded-lg border border-border/80 bg-surface px-3 py-2 text-muted-foreground">
                        A. continue
                      </div>
                      <div className="rounded-lg border border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 px-3 py-2 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center justify-between">
                        <span>B. break</span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      </div>
                      <div className="rounded-lg border border-border/80 bg-surface px-3 py-2 text-muted-foreground">
                        C. exit
                      </div>
                      <div className="rounded-lg border border-border/80 bg-surface px-3 py-2 text-muted-foreground">
                        D. return
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 2. Core Capabilities */

export function Features() {
  const capabilities = [
    {
      icon: FileText,
      title: "1. Learn",
      subtitle: "Concise Unit Notes & Lectures",
      desc: "Structured syllabus breakdowns with crystal clear explanations, code examples, diagrams, and video lectures.",
      href: "/courses",
      action: "Explore Notes",
    },
    {
      icon: FlaskConical,
      title: "2. Practice",
      subtitle: "Topic-Wise MCQ Practice",
      desc: "Instant evaluation, detailed rationale for correct answers, and automated mistake tracking to master weak topics.",
      href: "/courses",
      action: "Start Practice",
    },
    {
      icon: BookOpen,
      title: "3. Prepare",
      subtitle: "University Past Papers",
      desc: "Original previous year question papers rendered directly in-browser with our high-speed PDF viewer.",
      href: "/courses",
      action: "View Papers",
    },
    {
      icon: TrendingUp,
      title: "4. Track",
      subtitle: "Progress & Study Streaks",
      desc: "Continuous tracking of completed units, quiz performance, and active daily streaks across your entire semester.",
      href: "/explore",
      action: "See Progress",
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 border-b border-border/70 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Core Capabilities
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need for your semester, all in one place.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:border-primary/40 shadow-xs"
              >
                <div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                    {cap.title}
                  </h3>
                  <p className="mt-0.5 font-semibold text-xs text-primary">
                    {cap.subtitle}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60">
                  <Link
                    to={cap.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    {cap.action} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 3. Live Course Discovery Grid */

export function CourseDiscovery() {
  const coursesQ = useQuery({
    queryKey: ["homepage", "courses", "live"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, code, title, slug, description, duration_years, total_semesters")
        .eq("status", "published")
        .is("deleted_at", null)
        .order("sort_order")
        .limit(6);
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 60_000,
  });

  const courses = coursesQ.data ?? [];

  return (
    <section id="curriculum" className="py-16 sm:py-20 border-b border-border/70 bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Degree Programs
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Published Academic Curriculums
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Select your academic degree to explore full semester structures and subjects.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="rounded-lg self-start sm:self-auto">
            <Link to="/courses">
              View all programs <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {coursesQ.isLoading ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-44 rounded-2xl" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted-foreground">
            No published courses available yet.
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Link
                key={course.id}
                to="/courses/$courseSlug"
                params={{ courseSlug: course.slug }}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                      {course.code}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {course.duration_years ? `${course.duration_years} Years` : "Degree"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  {course.description && (
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {course.total_semesters ?? 6} Semesters
                  </span>
                  <span className="font-semibold text-primary inline-flex items-center gap-1">
                    Open curriculum <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 4. Learning Workflow */

export function LearningWorkflow() {
  const steps = [
    {
      num: "01",
      title: "Choose Program & Semester",
      desc: "Select your university degree and current semester to filter relevant subjects.",
    },
    {
      num: "02",
      title: "Study Structured Units",
      desc: "Read concise, exam-focused syllabus notes and watch embedded video lectures.",
    },
    {
      num: "03",
      title: "Practice MCQs & Papers",
      desc: "Test your understanding with instant question evaluation and solve previous exams.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 border-b border-border/70 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl text-center mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            How It Works
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A simple, disciplined learning workflow.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.num} className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-surface">
              <span className="font-mono text-2xl font-black text-primary/30">
                {s.num}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 5. Single Strong CTA */

export function CTA({ user, loading }: { user: unknown; loading: boolean }) {
  return (
    <section className="py-16 sm:py-20 bg-surface">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="rounded-3xl border border-border bg-primary/5 p-8 sm:p-12">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to ace your next semester?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-muted-foreground">
            Get instant access to syllabus-aligned notes, previous year papers, and practice questions.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {loading ? (
              <Skeleton className="h-12 w-40 rounded-lg" />
            ) : user ? (
              <Button asChild size="lg" className="h-12 px-8 text-sm font-semibold rounded-lg">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="h-12 px-8 text-sm font-semibold rounded-lg">
                  <Link to="/auth" search={{ mode: "signup" }}>
                    Get Started Free
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-6 text-sm font-semibold rounded-lg">
                  <Link to="/courses">Browse Catalog</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── Compatibility stubs */
export function TrustBar() { return null; }
export function WhyChoose() { return null; }
export function Journey() { return null; }
export function Benefits() { return null; }
export function Testimonials() { return null; }
export function FAQ() { return null; }
export function Contact() { return null; }
export function EmptyLanding({ user, loading }: { user: unknown; loading: boolean }) {
  return <Hero user={user} loading={loading} />;
}
export function LandingSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Skeleton className="h-96 rounded-3xl" />
    </div>
  );
}
