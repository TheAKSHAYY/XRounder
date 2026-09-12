import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Sparkles,
  Target,
  TrendingUp,
  RefreshCw,
  AlertTriangle,
  Code2,
  Monitor,
  Calculator,
  Layers,
  HelpCircle,
  Compass,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────── 1. Hero Section */

export function Hero({ user, loading }: { user: unknown; loading: boolean }) {
  // Desktop mouse parallax coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(media.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isReducedMotion || window.innerWidth < 1024) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    },
    [isReducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  // Parallax offsets (subtle: 2-5px)
  const cardTransform = isReducedMotion
    ? "none"
    : `translate3d(${mousePos.x * 10}px, ${mousePos.y * 10}px, 0) rotateX(${-mousePos.y * 3}deg) rotateY(${mousePos.x * 3}deg)`;

  const badgeTransform1 = isReducedMotion
    ? "none"
    : `translate3d(${mousePos.x * -14}px, ${mousePos.y * -14}px, 0)`;

  const badgeTransform2 = isReducedMotion
    ? "none"
    : `translate3d(${mousePos.x * 18}px, ${mousePos.y * 18}px, 0)`;

  const badgeTransform3 = isReducedMotion
    ? "none"
    : `translate3d(${mousePos.x * -12}px, ${mousePos.y * 14}px, 0)`;

  const badgeTransform4 = isReducedMotion
    ? "none"
    : `translate3d(${mousePos.x * 16}px, ${mousePos.y * -12}px, 0)`;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-background via-surface/30 to-background py-14 sm:py-20 lg:py-24"
    >
      {/* Background ambient lighting and subtle micro-grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_10%,rgba(99,102,241,0.08),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 right-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/2 left-4 -z-10 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto w-full sm:max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left: Value Proposition & Storytelling */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Personalized Semester OS · For BCA Students</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-5xl leading-[1.12]">
                Learn smarter. <br />
                <span className="bg-gradient-to-r from-primary via-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-primary dark:to-violet-400">
                  Know what to study next.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                XRounder helps BCA students learn their syllabus, practice concepts, identify weak
                areas and improve through targeted revision and retests.
              </p>
            </div>

            {/* Quick Core Message Strip */}
            <div className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-xs text-foreground/90">
              <span className="font-bold text-primary">Core difference: </span>
              Most platforms hand you notes. XRounder tells you what to study next.
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {loading ? (
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-44 rounded-xl" />
                  <Skeleton className="h-12 w-40 rounded-xl" />
                </div>
              ) : user ? (
                <Button
                  asChild
                  size="lg"
                  className="btn-cta h-12 px-7 text-sm font-semibold rounded-xl shadow-xs"
                >
                  <Link to="/dashboard">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="btn-cta h-12 px-7 text-sm font-semibold rounded-xl shadow-xs"
                  >
                    <Link to="/auth" search={{ mode: "signup" }}>
                      Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 px-6 text-sm font-semibold rounded-xl border-border/80 hover:bg-muted"
                  >
                    <Link to="/courses">Explore BCA Syllabus</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Micro value badges */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Free syllabus browsing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Semester-aligned notes & MCQs
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                No credit card required
              </span>
            </div>
          </div>

          {/* Right: Layered Product Preview (Explicit Product Illustration) */}
          <div className="lg:col-span-6 relative">
            {/* Visual Container */}
            <div className="relative mx-auto max-w-lg lg:max-w-none pt-4 pb-6">
              {/* Illustration Label Pill */}
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Product Preview · Illustrative Workflow
                </span>
                <Badge
                  variant="outline"
                  className="text-[10px] font-mono border-border text-muted-foreground"
                >
                  Demo
                </Badge>
              </div>

              {/* Main Central Card: "Your Next Best Action" */}
              <div
                style={{ transform: cardTransform, transition: "transform 0.25s ease-out" }}
                className="relative rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xl ring-1 ring-border/50"
              >
                {/* Header Window Bar */}
                <div className="flex items-center justify-between border-b border-border/70 pb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-xs font-semibold text-muted-foreground">
                      XRounder Intelligence Engine
                    </span>
                  </div>
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
                    Semester 5
                  </span>
                </div>

                {/* Central Next Best Action Box */}
                <div className="mt-4 rounded-xl border border-primary/25 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary">
                        <Target className="h-4 w-4" />
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                        Your Next Best Action
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                      Weakness Detected
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                    🎯 Revise Subnetting & Supernetting
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Computer Networks · Semester 5 · Unit 3
                  </p>

                  <div className="mt-3 flex items-center justify-between rounded-lg bg-surface p-2.5 text-xs border border-border/60">
                    <span className="text-muted-foreground">
                      Accuracy on last quiz: <strong className="text-amber-600">44%</strong>
                    </span>
                    <span className="font-semibold text-foreground">5 key questions missed</span>
                  </div>

                  <div className="mt-4 flex items-center gap-2.5">
                    <Button
                      asChild
                      size="sm"
                      className="btn-cta h-9 px-4 text-xs font-semibold rounded-lg shadow-xs"
                    >
                      <Link to="/courses">
                        Start Revision <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <span className="text-[11px] text-muted-foreground">~8 min read</span>
                  </div>
                </div>

                {/* Secondary Progress Bar */}
                <div className="mt-4 rounded-xl border border-border/60 bg-surface/80 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">Overall Semester Completion</span>
                    <span className="font-bold text-primary">68%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "68%" }} />
                  </div>
                </div>
              </div>

              {/* Surrounding Floating Diagnostic Badges (Multi-depth Parallax) */}
              {/* Badge 1: Mastered topic (top-right) */}
              <div
                style={{ transform: badgeTransform1, transition: "transform 0.25s ease-out" }}
                className="hidden sm:flex absolute -top-2 -right-4 z-20 items-center gap-2 rounded-xl border border-emerald-500/30 bg-card/95 px-3.5 py-2 shadow-lg backdrop-blur-sm"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[11px] font-bold text-foreground">OSI Reference Model</p>
                  <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Mastered · 100%
                  </p>
                </div>
              </div>

              {/* Badge 2: Needs practice (bottom-left) */}
              <div
                style={{ transform: badgeTransform2, transition: "transform 0.25s ease-out" }}
                className="hidden sm:flex absolute -bottom-3 -left-4 z-20 items-center gap-2 rounded-xl border border-amber-500/30 bg-card/95 px-3.5 py-2 shadow-lg backdrop-blur-sm"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[11px] font-bold text-foreground">Subnet Masks</p>
                  <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                    Needs Practice · 44%
                  </p>
                </div>
              </div>

              {/* Badge 3: Diagnostic score (top-left) */}
              <div
                style={{ transform: badgeTransform3, transition: "transform 0.25s ease-out" }}
                className="hidden lg:flex absolute -top-3 -left-6 z-20 items-center gap-2 rounded-xl border border-violet-500/30 bg-card/95 px-3 py-1.5 shadow-md backdrop-blur-sm"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400">
                  <FlaskConical className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs font-bold text-foreground">72% Quiz Score</span>
              </div>

              {/* Badge 4: Measured Improvement (bottom-right) */}
              <div
                style={{ transform: badgeTransform4, transition: "transform 0.25s ease-out" }}
                className="hidden lg:flex absolute -bottom-3 -right-6 z-20 items-center gap-2 rounded-xl border border-rose-500/30 bg-card/95 px-3 py-1.5 shadow-md backdrop-blur-sm"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  +29% Retest Gain
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 2. Trust / Value Strip */

export function ValueStrip() {
  const values = [
    {
      icon: GraduationCap,
      label: "Structured BCA Syllabus",
      desc: "Organized semester by semester",
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
    },
    {
      icon: FlaskConical,
      label: "Practice & Assessments",
      desc: "Topic-level instant feedback",
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    },
    {
      icon: AlertTriangle,
      label: "Weakness-Based Revision",
      desc: "Pinpoint what needs work",
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
    },
    {
      icon: TrendingUp,
      label: "Track Improvement",
      desc: "Measurable progress per unit",
      color: "text-rose-600 dark:text-rose-400 bg-rose-500/10",
    },
  ];

  return (
    <section className="border-b border-border/60 bg-surface/50 py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.label}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/80 p-3 sm:p-4 shadow-2xs"
              >
                <div
                  className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", v.color)}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xs sm:text-sm font-bold text-foreground truncate">
                    {v.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 3. The Problem */

export function TheProblem() {
  return (
    <section className="border-b border-border/60 bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            The Problem
          </span>
          <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Most platforms leave you stranded after the score.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Reading notes and taking a quiz is only half the battle. What happens when your score is
            65%?
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 items-stretch">
          {/* Traditional Loop */}
          <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-surface/60 p-6 sm:p-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                Traditional Study Sites
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                The Dead-End Loop
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                You read a 50-page PDF, take a random quiz, see a number like 65%, and have no idea
                which sub-topic pulled you down or what you should do next.
              </p>

              {/* Diagram */}
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-lg bg-muted px-3 py-1.5 text-foreground/80">Notes</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="rounded-lg bg-muted px-3 py-1.5 text-foreground/80">Quiz</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="rounded-lg bg-muted px-3 py-1.5 text-foreground/80">Score</span>
                <ChevronRight className="h-3.5 w-3.5 text-rose-500" />
                <span className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 font-bold text-rose-600 dark:text-rose-400">
                  What now? 🤔
                </span>
              </div>
            </div>

            <p className="mt-6 pt-4 border-t border-border/60 text-xs text-muted-foreground">
              Result: You re-read topics you already understand, wasting valuable exam preparation
              time.
            </p>
          </div>

          {/* XRounder Loop */}
          <div className="flex flex-col justify-between rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-6 sm:p-8 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
                The XRounder Loop
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                The Continuous Intelligence Loop
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                XRounder monitors your quiz attempts, detects the exact concepts you missed, and
                generates a concrete revision action with an immediate retest to lock in progress.
              </p>

              {/* Diagram */}
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-lg bg-surface px-2.5 py-1.5 text-foreground border border-border">
                  Notes
                </span>
                <ChevronRight className="h-3.5 w-3.5 text-primary/60" />
                <span className="rounded-lg bg-surface px-2.5 py-1.5 text-foreground border border-border">
                  Quiz
                </span>
                <ChevronRight className="h-3.5 w-3.5 text-primary/60" />
                <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-amber-700 dark:text-amber-300">
                  Weakness Detected
                </span>
                <ChevronRight className="h-3.5 w-3.5 text-primary/60" />
                <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-emerald-700 dark:text-emerald-300">
                  Retest & Master
                </span>
              </div>
            </div>

            <p className="mt-6 pt-4 border-t border-primary/20 text-xs font-medium text-primary">
              Result: Every study session directly closes a weakness and increases your examination
              score.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 4. The 7-Step Learning Loop */

export function LearningLoop() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: "01",
      title: "Learn",
      tagline: "Understand the concept",
      desc: "Study concise unit notes and watch topic video lectures mapped directly to university syllabus units.",
      icon: BookOpen,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      step: "02",
      title: "Practice",
      tagline: "Apply what you learned",
      desc: "Solve topic-wise MCQs right after reading, while the core theoretical principles are still fresh.",
      icon: FlaskConical,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      step: "03",
      title: "Assess",
      tagline: "Test your understanding",
      desc: "Take scored unit quizzes under realistic conditions with per-question rationale and speed metrics.",
      icon: HelpCircle,
      color: "text-violet-500 bg-violet-500/10 border-violet-500/20",
    },
    {
      step: "04",
      title: "Find Weakness",
      tagline: "Know what needs work",
      desc: "XRounder flags topics where accuracy is lowest so mistakes are clearly highlighted, never hidden.",
      icon: AlertTriangle,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      step: "05",
      title: "Revise",
      tagline: "Focus on weak concepts",
      desc: "Your dashboard generates targeted revision tasks sending you directly back to the exact unit notes.",
      icon: RefreshCw,
      color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    },
    {
      step: "06",
      title: "Retest",
      tagline: "Prove improvement",
      desc: "Re-take diagnostic quizzes on your weak topics to mathematically verify your conceptual comprehension.",
      icon: Target,
      color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    },
    {
      step: "07",
      title: "Improve",
      tagline: "Move forward with confidence",
      desc: "Watch your mastery rings fill up, study streaks grow, and semester progress update in real time.",
      icon: TrendingUp,
      color: "text-primary bg-primary/10 border-primary/20",
    },
  ];

  return (
    <section id="learning-loop" className="border-b border-border/60 bg-surface/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            The Learning Loop
          </span>
          <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            A closed loop, not a content dump.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Seven steps that repeat for every topic until weak concepts become guaranteed
            examination marks.
          </p>
        </div>

        {/* Desktop Connected Horizontal Flow */}
        <div className="mt-12 hidden lg:block">
          <div className="grid grid-cols-7 gap-2">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  type="button"
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={cn(
                    "group relative flex flex-col items-center p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer",
                    isActive
                      ? "border-primary/50 bg-card shadow-md scale-105"
                      : "border-border/70 bg-surface hover:border-border hover:bg-card",
                  )}
                >
                  <span className="font-mono text-[11px] font-bold text-muted-foreground group-hover:text-primary">
                    {s.step}
                  </span>
                  <div
                    className={cn(
                      "mt-2 grid h-10 w-10 place-items-center rounded-xl transition-all",
                      s.color,
                      isActive && "scale-110 shadow-xs",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-display text-sm font-bold text-foreground">{s.title}</h3>
                </button>
              );
            })}
          </div>

          {/* Active Step Detail Preview Card */}
          <div className="mt-6 rounded-2xl border border-primary/30 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <span className="font-mono text-2xl font-black text-primary">
                {steps[activeStep].step}
              </span>
              <div>
                <h4 className="font-display text-lg font-bold text-foreground">
                  {steps[activeStep].title} —{" "}
                  <span className="text-muted-foreground font-normal">
                    {steps[activeStep].tagline}
                  </span>
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">{steps[activeStep].desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="mt-8 space-y-3 lg:hidden">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-2xs"
              >
                <div
                  className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", s.color)}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">{s.step}</span>
                    <h3 className="font-display text-sm font-bold text-foreground">{s.title}</h3>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-foreground/80">{s.tagline}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 5. Interactive Quiz Result Demo */

export function InteractiveQuizResultDemo() {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4>(1);

  const stages = [
    { num: 1, title: "1. The Quiz Score" },
    { num: 2, title: "2. Topic Breakdown" },
    { num: 3, title: "3. Next Action" },
    { num: 4, title: "4. Retest & Gain" },
  ];

  return (
    <section className="border-b border-border/60 bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Interactive Product Demo
          </span>
          <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            A score is not the end.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Experience how XRounder transforms an average quiz attempt into a targeted recovery
            plan.
          </p>
          <div className="mt-2">
            <span className="inline-block rounded-md bg-muted px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              Demonstration scenario · Not platform statistics
            </span>
          </div>
        </div>

        {/* Stepper Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {stages.map((st) => (
            <button
              type="button"
              key={st.num}
              onClick={() => setActiveStage(st.num as 1 | 2 | 3 | 4)}
              className={cn(
                "rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer",
                activeStage === st.num
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-surface text-muted-foreground border border-border/60 hover:bg-muted",
              )}
            >
              {st.title}
            </button>
          ))}
        </div>

        {/* Demo Display Card */}
        <div className="mt-6 mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md">
          {activeStage === 1 && (
            <div className="space-y-6 text-center animate-fade-in-up">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                <FlaskConical className="h-3.5 w-3.5" /> Unit 3 Diagnostic Quiz Complete
              </div>

              {/* Accuracy Circle */}
              <div className="mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-amber-500/40 bg-amber-500/5">
                <span className="font-display text-3xl font-extrabold text-foreground">72%</span>
                <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                  Good Progress
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-display text-lg font-bold text-foreground">
                  Solid performance with 2 weak sub-topics identified
                </h4>
                <p className="text-xs text-muted-foreground">
                  Computer Networks · 10 Questions Answered
                </p>
              </div>

              <Button
                onClick={() => setActiveStage(2)}
                size="sm"
                className="btn-cta h-10 rounded-xl px-5 text-xs font-semibold"
              >
                Inspect Topic Performance <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          )}

          {activeStage === 2 && (
            <div className="space-y-5 animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h4 className="font-display text-sm font-bold text-foreground">
                  Diagnostic Topic Breakdown
                </h4>
                <span className="font-mono text-xs text-muted-foreground">Unit 3 MCQs</span>
              </div>

              <div className="space-y-3 text-xs">
                {/* Topic 1 */}
                <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <div>
                      <span className="font-bold text-foreground">OSI Reference Model</span>
                      <p className="text-[11px] text-muted-foreground">4/4 correct</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
                  >
                    Strong
                  </Badge>
                </div>

                {/* Topic 2 */}
                <div className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <div>
                      <span className="font-bold text-foreground">IPv4 Addressing & Classes</span>
                      <p className="text-[11px] text-muted-foreground">2/3 correct</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] text-amber-700 dark:text-amber-300 border-amber-500/40"
                  >
                    Needs Practice
                  </Badge>
                </div>

                {/* Topic 3 */}
                <div className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/5 p-3">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-rose-600" />
                    <div>
                      <span className="font-bold text-foreground">Subnet Masking & CIDR</span>
                      <p className="text-[11px] text-muted-foreground">1/3 correct</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] text-rose-700 dark:text-rose-300 border-rose-500/40"
                  >
                    Weak Area
                  </Badge>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => setActiveStage(3)}
                  size="sm"
                  className="btn-cta h-10 rounded-xl px-5 text-xs font-semibold"
                >
                  Generate Next Best Action <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}

          {activeStage === 3 && (
            <div className="space-y-5 animate-fade-in-up">
              <div className="flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/5 p-3.5">
                <Sparkles className="h-4 w-4 text-primary shrink-0" />
                <p className="text-xs font-semibold text-primary">
                  Intelligence engine generated 1 high-priority revision task
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Prescribed Revision
                </span>
                <h4 className="mt-1 font-display text-base font-bold text-foreground">
                  Read Unit 3.2 — Subnetting & CIDR Notation
                </h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Review calculation formulas for network ID, broadcast IP, and usable hosts before
                  re-testing.
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                  <span className="text-[11px] text-muted-foreground">Estimated read: 6 mins</span>
                  <Button
                    onClick={() => setActiveStage(4)}
                    size="sm"
                    className="btn-cta h-9 px-4 text-xs font-semibold rounded-lg"
                  >
                    Simulate Retest <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeStage === 4 && (
            <div className="space-y-6 text-center animate-fade-in-up">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" /> Retest Complete · Gap Closed!
              </div>

              {/* Before vs After Comparison */}
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="rounded-xl border border-border bg-surface p-3">
                  <span className="text-[11px] text-muted-foreground">First Attempt</span>
                  <p className="font-display text-2xl font-black text-muted-foreground">52%</p>
                </div>
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-3">
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                    Retest Score
                  </span>
                  <p className="font-display text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    81%
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-primary/5 p-3 text-xs text-primary font-bold">
                🎉 Score improved by +29% with targeted revision
              </div>

              <Button
                onClick={() => setActiveStage(1)}
                variant="outline"
                size="sm"
                className="h-9 px-4 text-xs font-semibold rounded-xl"
              >
                Replay Demonstration
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 6. Dynamic BCA Syllabus Explorer */

type SubjectVisual = {
  icon: typeof Code2;
  color: string;
};

function getSubjectVisual(title: string): SubjectVisual {
  const lower = title.toLowerCase();
  if (
    lower.includes("programming") ||
    lower.includes(" c ") ||
    lower.includes("java") ||
    lower.includes("python")
  ) {
    return { icon: Code2, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
  }
  if (
    lower.includes("math") ||
    lower.includes("discrete") ||
    lower.includes("calculus") ||
    lower.includes("numerical")
  ) {
    return { icon: Calculator, color: "text-violet-500 bg-violet-500/10 border-violet-500/20" };
  }
  if (
    lower.includes("english") ||
    lower.includes("communication") ||
    lower.includes("environment")
  ) {
    return { icon: BookOpen, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
  }
  if (
    lower.includes("network") ||
    lower.includes("web") ||
    lower.includes("internet") ||
    lower.includes("os")
  ) {
    return { icon: Compass, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" };
  }
  if (
    lower.includes("management") ||
    lower.includes("organization") ||
    lower.includes("principle")
  ) {
    return { icon: Layers, color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20" };
  }
  return { icon: Monitor, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" };
}

export function CourseDiscovery() {
  // 1. Fetch published BCA Course
  const courseQuery = useQuery({
    queryKey: ["homepage", "bca_course"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, code, title, slug, total_semesters")
        .eq("status", "published")
        .is("deleted_at", null)
        .order("sort_order")
        .limit(1);
      if (error) throw error;
      return data?.[0] ?? null;
    },
    staleTime: 60_000,
  });

  const course = courseQuery.data;

  // 2. Fetch published Semesters for this course dynamically
  const semestersQuery = useQuery({
    queryKey: ["homepage", "semesters", course?.id],
    enabled: !!course?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("semesters")
        .select("id, number, title")
        .eq("course_id", course!.id)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("number");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 60_000,
  });

  const semesters = useMemo(() => semestersQuery.data ?? [], [semestersQuery.data]);
  const [selectedSemesterId, setSelectedSemesterId] = useState<string | null>(null);

  // Default to first semester when loaded
  useEffect(() => {
    if (semesters.length > 0 && !selectedSemesterId) {
      setSelectedSemesterId(semesters[0].id);
    }
  }, [semesters, selectedSemesterId]);

  const activeSemester = useMemo(
    () => semesters.find((s) => s.id === selectedSemesterId) ?? semesters[0],
    [semesters, selectedSemesterId],
  );

  // 3. Fetch published Subjects for the active semester dynamically
  const subjectsQuery = useQuery({
    queryKey: ["homepage", "subjects", activeSemester?.id],
    enabled: !!activeSemester?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subjects")
        .select("id, code, title, slug, credits")
        .eq("semester_id", activeSemester.id)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 60_000,
  });

  const subjects = useMemo(() => subjectsQuery.data ?? [], [subjectsQuery.data]);

  return (
    <section id="syllabus" className="border-b border-border/60 bg-surface/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Academic Curriculum
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Your syllabus. Organized properly.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore semester subjects, syllabus breakdowns, and university exam papers.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-xl self-start sm:self-auto"
          >
            <Link to="/courses">
              Explore Full Catalog <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Dynamic Semester Selection Tabs */}
        {semestersQuery.isLoading ? (
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-28 rounded-xl" />
            ))}
          </div>
        ) : semesters.length > 0 ? (
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {semesters.map((sem) => (
              <button
                type="button"
                key={sem.id}
                onClick={() => setSelectedSemesterId(sem.id)}
                className={cn(
                  "shrink-0 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer",
                  activeSemester?.id === sem.id
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-surface text-muted-foreground border border-border/60 hover:bg-muted",
                )}
              >
                Semester {sem.number}
              </button>
            ))}
          </div>
        ) : null}

        {/* Dynamic Subjects Grid */}
        {subjectsQuery.isLoading ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-2xl" />
            ))}
          </div>
        ) : subjects.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No published subjects for this semester yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((sub) => {
              const visual = getSubjectVisual(sub.title);
              const Icon = visual.icon;
              const linkUrl =
                course && activeSemester
                  ? `/courses/${course.slug}/${activeSemester.number}/${sub.slug}`
                  : "/courses";

              return (
                <Link
                  key={sub.id}
                  to={linkUrl}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        {sub.code}
                      </span>
                      <div
                        className={cn(
                          "grid h-7 w-7 place-items-center rounded-lg border",
                          visual.color,
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    <h3 className="mt-3 font-display text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {sub.title.trim()}
                    </h3>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                    <span className="text-muted-foreground">
                      {sub.credits ? `${sub.credits} Credits` : "Full Syllabus"}
                    </span>
                    <span className="font-semibold text-primary inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Open subject <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 7. Why XRounder (4 Pillars) */

export function WhyXRounder() {
  const pillars = [
    {
      icon: Target,
      title: "Structured learning",
      desc: "Know exactly where you stand in every syllabus unit at all times, without guessing.",
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      icon: FlaskConical,
      title: "Targeted practice",
      desc: "Practice unit-level MCQs that match your university exam format with full rationale.",
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      icon: AlertTriangle,
      title: "Weakness detection",
      desc: "Pinpoint the specific sub-topic costing you marks on every test you submit.",
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      icon: Sparkles,
      title: "Next-best actions",
      desc: "Open your dashboard and immediately know what to study next in under five seconds.",
      color: "text-violet-500 bg-violet-500/10",
    },
  ];

  return (
    <section id="how-it-works" className="border-b border-border/60 bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Why XRounder?
          </span>
          <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Built for how university students actually study.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Four core architectural pillars engineered to turn study hours into exam performance.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:border-primary/40 shadow-2xs"
              >
                <div>
                  <div className={cn("grid h-11 w-11 place-items-center rounded-xl", p.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 8. Final High-Conversion CTA */

export function CTA({ user, loading }: { user: unknown; loading: boolean }) {
  return (
    <section className="py-16 sm:py-20 bg-surface/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-8 sm:p-14 shadow-lg">
          <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
            Start Today · Free Access
          </span>

          <h2 className="mt-4 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Ready to learn smarter? <br />
            <span className="text-primary">Know exactly what to study next.</span>
          </h2>

          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-muted-foreground">
            Get instant access to syllabus-aligned notes, past university papers, and diagnostic MCQ
            practice.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {loading ? (
              <Skeleton className="h-12 w-44 rounded-xl" />
            ) : user ? (
              <Button
                asChild
                size="lg"
                className="btn-cta h-12 px-8 text-sm font-semibold rounded-xl shadow-xs"
              >
                <Link to="/dashboard">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  size="lg"
                  className="btn-cta h-12 px-8 text-sm font-semibold rounded-xl shadow-xs"
                >
                  <Link to="/auth" search={{ mode: "signup" }}>
                    Start Learning Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 text-sm font-semibold rounded-xl border-border/80"
                >
                  <Link to="/courses">Explore BCA Syllabus</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── Compatibility Stubs */
export function Features() {
  return null;
}
export function LearningWorkflow() {
  return null;
}
export function TrustBar() {
  return null;
}
export function WhyChoose() {
  return null;
}
export function Journey() {
  return null;
}
export function Benefits() {
  return null;
}
export function Testimonials() {
  return null;
}
export function FAQ() {
  return null;
}
export function Contact() {
  return null;
}
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
