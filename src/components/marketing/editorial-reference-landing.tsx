import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, FileText, Trophy, ArrowRight, Menu } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { BrandLockup } from "@/components/brand-mark";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface SubjectItem {
  code: string;
  title: string;
  slug: string;
  credits: number;
  type: "Theory" | "Practical";
}

interface SemesterData {
  number: number;
  title: string;
  subjects: SubjectItem[];
}

const SEMESTERS_DATA: SemesterData[] = [
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

export function EditorialReferenceLanding() {
  const { user, loading } = useAuth();
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentSemester =
    SEMESTERS_DATA.find((s) => s.number === selectedSemester) ?? SEMESTERS_DATA[0];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#F5F3EB] text-[#201F1B] font-sans selection:bg-[#747A52]/20 selection:text-[#201F1B]">
      {/* ─── Subtle CSS Background Grain / Speckles ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.032]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ─── 1. Floating Pill-Shaped Navbar ─── */}
      <header className="fixed top-3 sm:top-6 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none">
        <nav
          className="pointer-events-auto mx-auto max-w-4xl h-13 sm:h-16 rounded-full border border-[#D5D1C5] bg-[#F5F3EB]/95 backdrop-blur-md px-3 sm:px-6 shadow-[0_2px_12px_rgba(32,31,27,0.04)] flex items-center justify-between transition-all"
          aria-label="Main Navigation"
        >
          {/* Left: XRounder Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#201F1B] rounded-full shrink-0"
            aria-label="XRounder Home"
          >
            <BrandLockup className="h-7 sm:h-8" tone="dark" />
          </Link>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-7 text-[13px] sm:text-[14px] font-medium text-[#625F56]">
            <a
              href="#features"
              onClick={(e) => scrollToSection(e, "features")}
              className="hover:text-[#201F1B] transition-colors"
            >
              Features
            </a>
            <Link to="/courses" className="hover:text-[#201F1B] transition-colors">
              Courses
            </Link>
            <Link
              to="/courses/$courseSlug"
              params={{ courseSlug: "bca" }}
              className="hover:text-[#201F1B] transition-colors"
            >
              Resources
            </Link>
            <Link to="/developer" className="hover:text-[#201F1B] transition-colors">
              About
            </Link>
          </div>

          {/* Right: Authentication Actions */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="h-8 w-24 animate-pulse rounded-full bg-[#D5D1C5]/50" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center rounded-full bg-[#201F1B] text-white px-4 py-2 text-[14px] font-medium hover:bg-[#33312B] transition-colors shadow-2xs"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-[13px] font-medium text-[#625F56] hover:text-[#201F1B] transition-colors px-2 py-1"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/auth"
                  search={{ mode: "signin" }}
                  className="text-[14px] font-medium text-[#625F56] hover:text-[#201F1B] transition-colors px-2"
                >
                  Log in
                </Link>
                <Link
                  to="/auth"
                  search={{ mode: "signup" }}
                  className="inline-flex items-center justify-center rounded-full bg-[#201F1B] text-white px-4 py-2 text-[14px] font-medium hover:bg-[#33312B] transition-colors shadow-2xs"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Drawer Button */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            {!loading && !user && (
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                className="inline-flex items-center justify-center rounded-full bg-[#201F1B] text-white px-3 py-1.5 text-[12px] sm:text-[13px] font-medium hover:bg-[#33312B] transition-colors shadow-2xs"
              >
                Sign up
              </Link>
            )}
            {!loading && user && (
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-[#201F1B] text-white px-3 py-1.5 text-[12px] sm:text-[13px] font-medium"
              >
                Dashboard
              </Link>
            )}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="p-1.5 sm:p-2 rounded-full text-[#201F1B] hover:bg-[#EFECE1] transition-colors focus:outline-none"
                  aria-label="Open Navigation Menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] max-w-xs bg-[#F5F3EB] border-l border-[#D5D1C5] p-6 flex flex-col justify-between"
              >
                <div>
                  <SheetHeader className="text-left pb-4 border-b border-[#D5D1C5]">
                    <SheetTitle>
                      <BrandLockup className="h-7" tone="dark" />
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col gap-4 text-base font-medium text-[#201F1B]">
                    <a
                      href="#features"
                      onClick={(e) => scrollToSection(e, "features")}
                      className="py-1.5 hover:text-[#747A52] transition-colors"
                    >
                      Features
                    </a>
                    <Link
                      to="/courses"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1.5 hover:text-[#747A52] transition-colors"
                    >
                      Courses
                    </Link>
                    <Link
                      to="/courses/$courseSlug"
                      params={{ courseSlug: "bca" }}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1.5 hover:text-[#747A52] transition-colors"
                    >
                      Resources
                    </Link>
                    <Link
                      to="/developer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1.5 hover:text-[#747A52] transition-colors"
                    >
                      About
                    </Link>
                    <a
                      href="#faq"
                      onClick={(e) => scrollToSection(e, "faq")}
                      className="py-1.5 hover:text-[#747A52] transition-colors"
                    >
                      FAQ
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#D5D1C5] flex flex-col gap-3">
                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-flex items-center justify-center rounded-full bg-[#201F1B] text-white py-2.5 text-[14px] font-medium"
                      >
                        Go to Dashboard
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleSignOut();
                        }}
                        className="text-center text-[13px] font-medium text-[#625F56] hover:text-[#201F1B] py-1"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth"
                        search={{ mode: "signup" }}
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-flex items-center justify-center rounded-full bg-[#201F1B] text-white py-2.5 text-[14px] font-medium shadow-2xs"
                      >
                        Sign up
                      </Link>
                      <Link
                        to="/auth"
                        search={{ mode: "signin" }}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center text-[14px] font-medium text-[#625F56] hover:text-[#201F1B] py-1"
                      >
                        Log in
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* ─── 2. Centered Editorial Hero Section ─── */}
      <section className="relative z-10 pt-32 sm:pt-40 md:pt-44 pb-20 sm:pb-28 px-4 sm:px-6 text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* DM Serif Display Headline: responsive 40–76px, approx 1.05 line-height, tight letter spacing, regular weight (400) */}
        <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4.75rem)] font-normal leading-[1.05] tracking-[-0.035em] text-[#201F1B] max-w-3xl break-words px-1 sm:px-0">
          <span className="block">Learn smarter,</span>
          <span className="block mt-1 sm:mt-2">
            <em className="italic font-normal">one step</em> at a time.
          </span>
        </h1>

        {/* Clean Sans-Serif Subtitle */}
        <p className="mt-5 sm:mt-6 text-[16px] sm:text-[19px] text-[#625F56] font-sans font-normal tracking-tight leading-[1.5] max-w-xl mx-auto px-2">
          Learn with AI. Practice with MCQs. Prepare with confidence.
        </p>

        {/* Dual Pill CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto">
          <Link
            to="/courses/$courseSlug"
            params={{ courseSlug: "bca" }}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#201F1B] text-white px-7 sm:px-8 py-3 text-[14px] font-medium shadow-[0_2px_8px_rgba(32,31,27,0.12)] hover:bg-[#33312B] transition-all active:scale-[0.98]"
          >
            Start Learning
          </Link>
          <Link
            to="/courses"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-transparent text-[#201F1B] border border-[#D5D1C5] px-7 sm:px-8 py-3 text-[14px] font-medium hover:bg-black/5 hover:border-[#201F1B]/40 transition-all active:scale-[0.98]"
          >
            Explore Courses
          </Link>
        </div>

        {/* Three Subtle Inline Highlights: single row on desktop, clean wrapping on mobile */}
        <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-[13px] sm:text-[14px] text-[#625F56] font-medium font-sans">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#747A52]" aria-hidden="true" />
            <span>AI Learning</span>
          </span>
          <span className="hidden sm:inline text-[#D5D1C5]" aria-hidden="true">
            •
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#747A52]" aria-hidden="true" />
            <span>MCQ Practice</span>
          </span>
          <span className="hidden sm:inline text-[#D5D1C5]" aria-hidden="true">
            •
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#747A52]" aria-hidden="true" />
            <span>Exam Preparation</span>
          </span>
        </div>
      </section>

      {/* ─── 3. The Guided Learning Method (Features) ─── */}
      <section
        id="features"
        className="relative z-10 border-t border-[#D5D1C5] bg-[#F5F3EB] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#747A52] font-sans">
              The 3-Step Method
            </span>
            <h2 className="mt-2 font-serif text-[28px] sm:text-[36px] text-[#201F1B] font-normal tracking-[-0.025em]">
              How XRounder guides your learning
            </h2>
            <p className="mt-2 text-[14px] sm:text-[16px] text-[#625F56] font-sans">
              Every course, semester, and unit follows the same predictable learning path.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-xl border border-[#D5D1C5] bg-[#FFFFFF] p-6 shadow-2xs transition-all hover:border-[#747A52]/70">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#201F1B] text-white font-medium text-sm">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-wider text-[#747A52] font-sans">
                Step 1
              </span>
              <h3 className="mt-1 font-sans text-[17px] font-semibold text-[#201F1B] tracking-tight">
                Understand Concepts
              </h3>
              <p className="mt-2 text-[14px] text-[#625F56] leading-[1.6] font-sans">
                Study official syllabus topics in order. Clear explanations, core definitions, and
                annotated notes without unnecessary filler.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-[#D5D1C5] bg-[#FFFFFF] p-6 shadow-2xs transition-all hover:border-[#747A52]/70">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#201F1B] text-white font-medium text-sm">
                <FileText className="h-4 w-4" />
              </div>
              <span className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-wider text-[#747A52] font-sans">
                Step 2
              </span>
              <h3 className="mt-1 font-sans text-[17px] font-semibold text-[#201F1B] tracking-tight">
                Prepare for Exams
              </h3>
              <p className="mt-2 text-[14px] text-[#625F56] leading-[1.6] font-sans">
                Review high-yield university topics, mark distribution blueprints, and revision
                summaries tailored for semester examinations.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-[#D5D1C5] bg-[#FFFFFF] p-6 shadow-2xs transition-all hover:border-[#747A52]/70">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#201F1B] text-white font-medium text-sm">
                <Trophy className="h-4 w-4" />
              </div>
              <span className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-wider text-[#747A52] font-sans">
                Step 3
              </span>
              <h3 className="mt-1 font-sans text-[17px] font-semibold text-[#201F1B] tracking-tight">
                Practice What You Learn
              </h3>
              <p className="mt-2 text-[14px] text-[#625F56] leading-[1.6] font-sans">
                Test your understanding with explained MCQs and timed exams. Identify weak topics
                before the university exam day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Semester Navigator (Authentic BCA Curriculum) ─── */}
      <section id="courses" className="relative z-10 border-t border-[#D5D1C5] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-[#D5D1C5] pb-6">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#747A52] font-sans">
                Curriculum Structure
              </span>
              <h2 className="mt-1 font-serif text-[24px] sm:text-[32px] font-normal text-[#201F1B] tracking-[-0.02em]">
                Choose your semester to begin
              </h2>
              <p className="mt-1 text-[14px] text-[#625F56] font-sans">
                MJPRU Bachelor of Computer Applications · Semesters 1 to 6
              </p>
            </div>

            <Link
              to="/courses/$courseSlug"
              params={{ courseSlug: "bca" }}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#201F1B] hover:text-[#747A52] transition-colors shrink-0 font-sans"
            >
              <span>View Full BCA Syllabus</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Minimal Pill Semester Switcher (Rule 4: Muted Olive for Selected Elements) */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setSelectedSemester(num)}
                className={cn(
                  "rounded-full px-4 py-2 text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer border font-sans",
                  selectedSemester === num
                    ? "border-[#747A52] bg-[#747A52] text-white shadow-2xs"
                    : "border-[#D5D1C5] bg-[#FFFFFF] text-[#625F56] hover:bg-[#EFECE1] hover:text-[#201F1B]",
                )}
              >
                Semester {num}
              </button>
            ))}
          </div>

          {/* Subject Grid for Chosen Semester */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {currentSemester.subjects.map((subj) => (
              <Link
                key={subj.code}
                to="/courses/$courseSlug/$semesterNumber/$subjectSlug"
                params={{
                  courseSlug: "bca",
                  semesterNumber: String(currentSemester.number),
                  subjectSlug: subj.slug,
                }}
                className="group flex flex-col justify-between rounded-xl border border-[#D5D1C5] bg-[#FFFFFF] p-5 transition-all hover:border-[#747A52]/70 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#747A52]">
                      {subj.code}
                    </span>
                    <span className="text-[11px] font-medium text-[#625F56] font-sans">
                      {subj.credits} Credits · {subj.type}
                    </span>
                  </div>
                  <h4 className="mt-2 font-sans text-[15px] font-semibold text-[#201F1B] group-hover:text-[#747A52] transition-colors tracking-tight">
                    {subj.title}
                  </h4>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#D5D1C5]/70 pt-3 text-[13px] text-[#625F56] font-sans">
                  <span>Theory & Practice Units</span>
                  <span className="inline-flex items-center gap-1 font-medium text-[#201F1B] group-hover:translate-x-0.5 transition-transform">
                    Open Subject <ArrowRight className="h-3 w-3 text-[#747A52]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Launch Entire Selected Semester */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/courses/$courseSlug/$semesterNumber"
              params={{
                courseSlug: "bca",
                semesterNumber: String(selectedSemester),
              }}
              className="inline-flex items-center justify-center rounded-full bg-[#201F1B] text-white px-6 py-2.5 text-[14px] font-medium hover:bg-[#33312B] transition-colors shadow-2xs font-sans"
            >
              Open All Semester {selectedSemester} Subjects
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 5. Frequently Asked Questions (Minimal Editorial Accordion) ─── */}
      <section
        id="faq"
        className="relative z-10 border-t border-[#D5D1C5] bg-[#F5F3EB] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#747A52] font-sans">
              Questions & Answers
            </span>
            <h2 className="mt-1 font-serif text-[24px] sm:text-[32px] font-normal text-[#201F1B] tracking-[-0.02em]">
              Frequently asked questions
            </h2>
            <p className="mt-1 text-[14px] text-[#625F56] font-sans">
              Clear answers about learning with XRounder.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-10 w-full space-y-3 font-sans">
            <AccordionItem
              value="faq-1"
              className="rounded-xl border border-[#D5D1C5] bg-[#FFFFFF] px-5 shadow-2xs"
            >
              <AccordionTrigger className="text-[15px] sm:text-[16px] font-medium text-[#201F1B] hover:no-underline py-4 text-left font-sans">
                Is XRounder free to use?
              </AccordionTrigger>
              <AccordionContent className="text-[14px] text-[#625F56] leading-[1.6] pb-4 font-sans">
                Yes. XRounder provides full guest access. You can study syllabus notes, explore
                previous semester questions, and take unit practice tests with no fee or
                subscription.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="faq-2"
              className="rounded-xl border border-[#D5D1C5] bg-[#FFFFFF] px-5 shadow-2xs"
            >
              <AccordionTrigger className="text-[15px] sm:text-[16px] font-medium text-[#201F1B] hover:no-underline py-4 text-left font-sans">
                Which university syllabus is this based on?
              </AccordionTrigger>
              <AccordionContent className="text-[14px] text-[#625F56] leading-[1.6] pb-4 font-sans">
                The content is aligned with Mahatma Jyotiba Phule Rohilkhand University (MJPRU
                Bareilly) Bachelor of Computer Applications (BCA) curriculum under the NEP 2020
                framework.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="faq-3"
              className="rounded-xl border border-[#D5D1C5] bg-[#FFFFFF] px-5 shadow-2xs"
            >
              <AccordionTrigger className="text-[15px] sm:text-[16px] font-medium text-[#201F1B] hover:no-underline py-4 text-left font-sans">
                Do I need an account before studying?
              </AccordionTrigger>
              <AccordionContent className="text-[14px] text-[#625F56] leading-[1.6] pb-4 font-sans">
                No. You can click <strong>Start Learning</strong> and begin reading any subject unit
                or attempting practice questions right away as a guest. Creating an account is
                optional and helps save your quiz streaks and bookmarks across devices.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="faq-4"
              className="rounded-xl border border-[#D5D1C5] bg-[#FFFFFF] px-5 shadow-2xs"
            >
              <AccordionTrigger className="text-[15px] sm:text-[16px] font-medium text-[#201F1B] hover:no-underline py-4 text-left font-sans">
                How does practice testing work?
              </AccordionTrigger>
              <AccordionContent className="text-[14px] text-[#625F56] leading-[1.6] pb-4 font-sans">
                Every unit includes diagnostic practice questions and exam simulations. When you
                submit answers, XRounder provides instant evaluations and explanations to pinpoint
                topics that require additional revision before exams.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ─── 6. Understated Editorial Footer ─── */}
      <footer
        id="about"
        className="relative z-10 border-t border-[#D5D1C5] bg-[#F5F3EB] py-12 px-4 sm:px-6"
      >
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <BrandLockup className="h-7" tone="dark" />
            <p className="text-[12px] text-[#625F56] mt-1 font-sans">
              Learn smarter, one step at a time.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[13px] text-[#625F56] font-sans">
            <Link to="/courses" className="hover:text-[#201F1B] transition-colors">
              Courses
            </Link>
            <Link
              to="/courses/$courseSlug"
              params={{ courseSlug: "bca" }}
              className="hover:text-[#201F1B] transition-colors"
            >
              BCA Syllabus
            </Link>
            <Link to="/roadmap" className="hover:text-[#201F1B] transition-colors">
              Roadmap
            </Link>
            <Link to="/developer" className="hover:text-[#201F1B] transition-colors">
              Developer
            </Link>
            <Link to="/privacy" className="hover:text-[#201F1B] transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-[#201F1B] transition-colors">
              Terms
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-[#D5D1C5]/60 pt-6 text-center text-xs text-[#625F56]/80 font-mono">
          © {new Date().getFullYear()} XRounder. Crafted for university students.
        </div>
      </footer>
    </div>
  );
}
