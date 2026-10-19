import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CheckCircle2, FileText, GraduationCap, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface SemesterPreview {
  number: number;
  title: string;
  subjects: Array<{
    code: string;
    title: string;
    slug: string;
    credits: number;
    type: "Theory" | "Practical";
  }>;
}

const SEMESTERS_DATA: SemesterPreview[] = [
  {
    number: 1,
    title: "Semester 1",
    subjects: [
      {
        code: "BCA-101N",
        title: "Computer Fundamentals & PC Software",
        slug: "computer-fundamentals-and-pc-software-theory",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-103N",
        title: "Programming with C",
        slug: "programming-with-c-theory",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-105N",
        title: "Basic Mathematics",
        slug: "basic-mathematics-theory",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-107N",
        title: "Communicative English",
        slug: "communicative-english",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-109N",
        title: "Principles of Management",
        slug: "principle-of-management-wc5k",
        credits: 4,
        type: "Theory",
      },
    ],
  },
  {
    number: 2,
    title: "Semester 2",
    subjects: [
      {
        code: "BCA-102N",
        title: "Data Structures using C",
        slug: "data-structures-using-c-theory",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-104N",
        title: "Digital Electronics",
        slug: "digital-electronics-theory",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-106N",
        title: "Discrete Mathematics",
        slug: "discrete-mathematics-theory",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-108N",
        title: "Financial Accounting & Management",
        slug: "financial-accounting-and-management-theory",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-110N",
        title: "Environmental Studies",
        slug: "environmental-studies",
        credits: 4,
        type: "Theory",
      },
    ],
  },
  {
    number: 3,
    title: "Semester 3",
    subjects: [
      {
        code: "BCA-201N",
        title: "Object Oriented Programming Using Java",
        slug: "object-oriented-programming-using-java",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-203N",
        title: "Computer Oriented Numerical Analysis",
        slug: "computer-oriented-numerical-analysis",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-205N",
        title: "Computer Organization & Architecture",
        slug: "computer-organization-and-architecture",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-413E",
        title: "Information System for Business",
        slug: "information-system-for-business",
        credits: 4,
        type: "Theory",
      },
    ],
  },
  {
    number: 4,
    title: "Semester 4",
    subjects: [
      {
        code: "BCA-202N",
        title: "Operating Systems",
        slug: "operating-systems",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-204N",
        title: "Optimization Techniques",
        slug: "optimization-techniques",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-206N",
        title: "Software Engineering",
        slug: "software-engineering",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-421E",
        title: "Web Technology",
        slug: "web-technology",
        credits: 4,
        type: "Theory",
      },
    ],
  },
  {
    number: 5,
    title: "Semester 5",
    subjects: [
      {
        code: "BCA-301N",
        title: "Database Management System",
        slug: "database-management-system",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-303N",
        title: "Python Programming",
        slug: "python-programming",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-305N",
        title: "Computer Graphics",
        slug: "computer-graphics",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-511E",
        title: "Cloud Computing",
        slug: "cloud-computing",
        credits: 4,
        type: "Theory",
      },
    ],
  },
  {
    number: 6,
    title: "Semester 6",
    subjects: [
      {
        code: "BCA-302N",
        title: "Computer Networks & Cyber Security",
        slug: "computer-networks-and-cyber-security",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-304N",
        title: "Artificial Intelligence",
        slug: "artificial-intelligence",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-306N",
        title: "Dot Net Framework and C#",
        slug: "dot-net-framework-and-c-sharp",
        credits: 4,
        type: "Theory",
      },
      {
        code: "BCA-611E",
        title: "Mobile Computing",
        slug: "mobile-computing",
        credits: 4,
        type: "Theory",
      },
    ],
  },
];

export function GuidedLandingHero({ user, loading }: { user: unknown; loading: boolean }) {
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const currentSemester =
    SEMESTERS_DATA.find((s) => s.number === selectedSemester) ?? SEMESTERS_DATA[0];

  return (
    <div className="flex flex-col">
      {/* ─── Hero Section: Clear, Minimal, High-Impact ─── */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-background via-surface/40 to-background py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          {/* Subtle Syllabus Alignment Badge */}
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-medium text-primary">
            <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span className="truncate sm:overflow-visible">
              <span className="hidden sm:inline">Official MJPRU BCA Curriculum · </span>
              2024–25 NEP Syllabus
            </span>
          </div>

          {/* Canonical Headline */}
          <h1 className="mt-6 font-display text-[27px] font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-tight">
            <span>Learn your BCA, </span>
            <span className="block sm:inline text-primary">one step at a time.</span>
          </h1>

          {/* Canonical Supporting Copy */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl font-normal leading-relaxed">
            Understand concepts. Prepare for exams. Practice what you learn.
          </p>

          {/* Single Visually Dominant Primary CTA */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {loading ? (
              <div className="h-12 w-48 animate-pulse rounded-xl bg-muted" />
            ) : user ? (
              <Button
                asChild
                size="lg"
                className="btn-squishy btn-cta h-12 rounded-xl px-8 text-base font-bold shadow-md cursor-pointer"
              >
                <Link to="/courses/$courseSlug" params={{ courseSlug: "bca" }}>
                  Continue Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className="btn-squishy btn-cta h-12 rounded-xl px-8 text-base font-bold shadow-md cursor-pointer"
              >
                <Link to="/courses/$courseSlug" params={{ courseSlug: "bca" }}>
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>

          {/* Restrained Trust Notes */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Free guest access
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              All 6 semesters
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              No login required to start
            </span>
          </div>
        </div>
      </section>

      {/* ─── The 3-Step Guided Learning Process ─── */}
      <section id="how-it-works" className="border-b border-border/60 bg-surface/30 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
              The Guided Flow
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              How XRounder guides your learning
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Every course, semester, and unit follows the same predictable learning path.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft-xs transition-all hover:border-primary/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="mt-4 inline-block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Step 1
              </span>
              <h3 className="mt-1 font-display text-lg font-bold text-foreground">
                Understand Concepts
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Study official syllabus topics in order. Clear explanations, core definitions, and
                annotated lecture notes without filler.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft-xs transition-all hover:border-primary/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                <FileText className="h-5 w-5" />
              </div>
              <span className="mt-4 inline-block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Step 2
              </span>
              <h3 className="mt-1 font-display text-lg font-bold text-foreground">
                Prepare for Exams
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Review high-yield university topics, mark distribution blueprints, and revision
                summaries tailored for semester examinations.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft-xs transition-all hover:border-primary/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                <Trophy className="h-5 w-5" />
              </div>
              <span className="mt-4 inline-block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Step 3
              </span>
              <h3 className="mt-1 font-display text-lg font-bold text-foreground">
                Practice What You Learn
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Test your understanding with explained MCQs and timed exams. Identify weak topics
                before the university exam day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Authentic 6-Semester Degree Navigator ─── */}
      <section id="syllabus" className="border-b border-border/60 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                Curriculum Structure
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Choose your semester to begin
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                All 6 semesters aligned with the Mahatma Jyotiba Phule Rohilkhand University
                syllabus.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="btn-squishy rounded-xl text-xs font-semibold shrink-0 cursor-pointer"
            >
              <Link to="/courses/$courseSlug" params={{ courseSlug: "bca" }}>
                <span>View Full 6-Semester Catalog</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {/* Clean Semester Selector Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setSelectedSemester(num)}
                className={cn(
                  "btn-squishy rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer border",
                  selectedSemester === num
                    ? "border-primary bg-primary text-primary-foreground shadow-xs"
                    : "border-border/80 bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                Semester {num}
              </button>
            ))}
          </div>

          {/* Subjects for Chosen Semester */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {currentSemester.subjects.map((subj) => (
              <Link
                key={subj.code}
                to="/courses/$courseSlug/$semesterNumber/$subjectSlug"
                params={{
                  courseSlug: "bca",
                  semesterNumber: String(currentSemester.number),
                  subjectSlug: subj.slug,
                }}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-soft-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary">{subj.code}</span>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-semibold text-muted-foreground"
                    >
                      {subj.credits} Credits
                    </Badge>
                  </div>
                  <h4 className="mt-2 font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {subj.title}
                  </h4>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs font-medium text-muted-foreground">
                  <span>Theory & Practice Units</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                    Open Subject <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Direct Semester Launch Action */}
          <div className="mt-8 flex justify-center">
            <Button
              asChild
              className="btn-squishy btn-cta h-11 rounded-xl px-6 text-sm font-bold shadow-xs cursor-pointer"
            >
              <Link
                to="/courses/$courseSlug/$semesterNumber"
                params={{
                  courseSlug: "bca",
                  semesterNumber: String(selectedSemester),
                }}
              >
                Open Semester {selectedSemester} Subjects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Frequently Asked Questions: Plain, Helpful Answers ─── */}
      <section id="faq" className="border-b border-border/60 bg-surface/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
              Questions & Answers
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Everything you need to know about learning with XRounder.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-10 w-full space-y-3">
            <AccordionItem
              value="faq-1"
              className="rounded-2xl border border-border/80 bg-card px-5 shadow-2xs"
            >
              <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground hover:no-underline py-4">
                Is XRounder free to use?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                Yes. XRounder provides completely free guest access. You can read verified syllabus
                notes, access previous examination papers, and attempt unit practice quizzes without
                any fees or forced subscription.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="faq-2"
              className="rounded-2xl border border-border/80 bg-card px-5 shadow-2xs"
            >
              <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground hover:no-underline py-4">
                Which university syllabus is this based on?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                The content is strictly aligned with Mahatma Jyotiba Phule Rohilkhand University
                (MJPRU Bareilly) Bachelor of Computer Applications (BCA) curriculum, effective from
                the 2024–25 academic session under the National Education Policy (NEP 2020).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="faq-3"
              className="rounded-2xl border border-border/80 bg-card px-5 shadow-2xs"
            >
              <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground hover:no-underline py-4">
                Do I need to create an account before studying?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                No. You can click <strong>Start Learning</strong> and immediately begin reading any
                subject unit or taking practice quizzes as a guest. Signing in is optional and
                allows you to save your progress, bookmark notes, and view diagnostic score history.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="faq-4"
              className="rounded-2xl border border-border/80 bg-card px-5 shadow-2xs"
            >
              <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground hover:no-underline py-4">
                How does practice testing work?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                Each unit includes practice MCQs and timed exams. When you submit your answers,
                XRounder provides immediate grading and step-by-step explanations, identifying any
                weak topics so you know what to revise before university exams.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ─── Final High-Conversion Action CTA ─── */}
      <section className="py-16 sm:py-20 bg-background text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Ready to begin learning?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
            Explore your semester, study syllabus-aligned units, and practice with confidence.
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              asChild
              size="lg"
              className="btn-squishy btn-cta h-12 rounded-xl px-8 text-base font-bold shadow-md cursor-pointer"
            >
              <Link to="/courses/$courseSlug" params={{ courseSlug: "bca" }}>
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
