import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouterState, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useDragControls } from "motion/react";
import {
  X,
  Volume2,
  VolumeX,
  Compass,
  BookOpen,
  GraduationCap,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  EyeOff,
  Move,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { playCuteGiggleSound, playPopSound, isSoundEnabled, setSoundEnabled } from "@/lib/sound-fx";
import { cn } from "@/lib/utils";

export type MascotMood = "idle" | "happy" | "celebrating" | "thinking" | "reading";

/* ─────────────────────────────────────────────────────────────
   Study Tips Library (High-Yield Active Recall & CS Strategies)
   ───────────────────────────────────────────────────────────── */
const STUDY_TIPS = [
  {
    title: "Paper-First Tracing",
    text: "Trace loops and pointer memory addresses on paper with a table before typing code. It prevents 80% of runtime logic bugs in university exams.",
    tag: "Programming",
  },
  {
    title: "The Feynman 3-Minute Test",
    text: "Can you explain this concept in 3 minutes without technical jargon? If you get stuck, that is the exact gap to review in your notes.",
    tag: "Active Recall",
  },
  {
    title: "Diagram Scoring Advantage",
    text: "In university 15-mark questions, examiners award up to 60% of marks for clear, labeled block diagrams. Always sketch the architecture first.",
    tag: "Exam Technique",
  },
  {
    title: "Active Recall vs. Re-reading",
    text: "Testing yourself on past question blueprints retains 4x more knowledge than passively highlighting textbooks. Close notes and write what you remember.",
    tag: "Memory",
  },
  {
    title: "The 25/5 Study Rhythm",
    text: "Study with 25 minutes of high-focus note reading, followed by 5 minutes of quiz recall. This prevents cognitive overload during long revision sessions.",
    tag: "Productivity",
  },
  {
    title: "Stack vs. Heap Clarity",
    text: "Whenever studying pointers in C, sketch two boxes: Stack (local function variables) and Heap (dynamic malloc memory). Visualizing memory prevents pointer leaks.",
    tag: "C Programming",
  },
  {
    title: "Database Normalization Rule",
    text: "Remember the golden rhyme: 'The key, the whole key, and nothing but the key.' 1NF = atomic, 2NF = full key dependency, 3NF = non-transitive.",
    tag: "DBMS",
  },
  {
    title: "OS Scheduling Gantt Charts",
    text: "Practice FCFS, SJF, and Round Robin Gantt charts on paper. It is a guaranteed 10–15 mark question in university operating systems exams.",
    tag: "Operating Systems",
  },
  {
    title: "Error Log Documentation",
    text: "When a C program gives a segmentation fault or compiler error, write down the error code and exact fix. You will remember it instantly in practical exams.",
    tag: "Coding",
  },
  {
    title: "Discrete Math Truth Tables",
    text: "Always list standard truth table inputs (TT, TF, FT, FF) systematically before evaluating compound propositions to avoid missing row cases.",
    tag: "Mathematics",
  },
];

/* ─────────────────────────────────────────────────────────────
   Curriculum Knowledge Base (Grounded Syllabus Reference)
   ───────────────────────────────────────────────────────────── */
const SYLLABUS_KNOWLEDGE: Record<
  string,
  {
    code: string;
    title: string;
    semester: number;
    unitTopics: Record<
      number,
      {
        title: string;
        concept: string;
        analogy: string;
        examFocus: string;
        pitfall: string;
      }
    >;
  }
> = {
  "computer-fundamentals-and-pc-software-theory": {
    code: "BCA-101N",
    title: "Computer Fundamentals & PC Software",
    semester: 1,
    unitTopics: {
      1: {
        title: "Computer Evolution & Architecture",
        concept:
          "The Von Neumann architecture defines computers using a Central Processing Unit (CPU), memory, and I/O connected via system buses.",
        analogy:
          "Think of the CPU as a master chef, RAM as the kitchen counter (fast but temporary), and the Hard Drive as the pantry (huge storage, slower access).",
        examFocus:
          "Draw the Computer Block Diagram and explain differences between RAM, ROM, and Cache memory.",
        pitfall:
          "Cache memory is ultra-fast SRAM on the CPU die; do not confuse it with Virtual Memory on disk.",
      },
      2: {
        title: "Operating Systems & DOS Management",
        concept:
          "The OS acts as an intermediary between computer hardware and user software, managing CPU scheduling, memory, files, and device drivers.",
        analogy:
          "An operating system is like an airport air-traffic controller: it ensures multiple flights (processes) use the runway (CPU) without collisions.",
        examFocus:
          "Internal vs External DOS commands, and functions of an Operating System (Memory & Process Management).",
        pitfall:
          "Internal commands are built into command.com, while external commands exist as separate .exe or .com files.",
      },
      3: {
        title: "PC Maintenance & Motherboard Ports",
        concept:
          "Hardware maintenance covers motherboard bus types (PCI, PCIe), ports (USB, HDMI), BIOS/CMOS configuration, and power supply (SMPS).",
        analogy:
          "The motherboard is the nervous system of the PC, carrying power and data signals to every organ.",
        examFocus:
          "POST (Power-On Self-Test) routine, BIOS vs CMOS, and troubleshooting common hardware boot failures.",
        pitfall:
          "BIOS is firmware stored on ROM; CMOS is a small battery-backed RAM storing dynamic hardware settings.",
      },
      4: {
        title: "Word Processing & Presentations",
        concept:
          "Structured document creation using templates, mail merge, tables, and presentation slide transitions.",
        analogy:
          "Mail merge is like addressing 100 graduation certificates from a single spreadsheet roster in seconds.",
        examFocus:
          "Step-by-step procedure for Mail Merge in MS Word and slide transitions in PowerPoint.",
        pitfall:
          "A mail merge requires two files: the main document template and the data source file.",
      },
      5: {
        title: "Spreadsheets & Excel Functions",
        concept:
          "Data analysis using formulas, cell referencing (relative, absolute, mixed), charting, and macro automation.",
        analogy:
          "Spreadsheets are dynamic calculators where modifying one input cell cascades formulas across the entire sheet.",
        examFocus:
          "Relative vs Absolute referencing ($A$1 vs A1), VLOOKUP, and IF nested functions.",
        pitfall:
          "Omitting the dollar sign in absolute references causes formulas to shift unexpectedly when copied.",
      },
    },
  },
  "programming-with-c-theory": {
    code: "BCA-103N",
    title: "Programming with C",
    semester: 1,
    unitTopics: {
      1: {
        title: "C Fundamentals & Operators",
        concept:
          "C is a structured, statically-typed compiled language with direct hardware memory manipulation through pointers and system calls.",
        analogy:
          "Variables are labeled containers, and data types specify the container's exact byte capacity (e.g., int is 4 bytes).",
        examFocus:
          "Operator precedence, ternary operator, type casting, and difference between `while` and `do-while` loops.",
        pitfall:
          "Local variables declared inside functions contain garbage memory unless explicitly initialized.",
      },
      2: {
        title: "Control Statements & Branching",
        concept:
          "Decision making constructs (if-else, switch-case) and iteration loops (for, while, do-while) controlling instruction flow.",
        analogy:
          "A switch-case is like a multi-way railway switch guiding trains onto different tracks based on a train code.",
        examFocus:
          "Writing clean loops for prime number checking, Fibonacci series, and switch-case with `break` statements.",
        pitfall:
          "Forgetting `break` in a switch statement causes fall-through into subsequent cases.",
      },
      3: {
        title: "Arrays & String Handling",
        concept:
          "Contiguous memory allocation for homogenous elements and null-terminated (`\\0`) character arrays for text.",
        analogy:
          "An array is an apartment building where each room has the same size and is identified by an index number starting at 0.",
        examFocus:
          "Matrix addition/multiplication using 2D arrays, and string manipulation without using `string.h` library functions.",
        pitfall:
          "String arrays must have an extra byte allocated for the null terminator `\\0`.",
      },
      4: {
        title: "Functions & Recursion",
        concept:
          "Modular programming with parameter passing (Call by Value vs Call by Reference) and self-referential functions.",
        analogy:
          "Recursion is like Russian nesting dolls: each function call opens a smaller doll until reaching the base case.",
        examFocus:
          "Call by value vs Call by reference, recursion base condition, and factorial/tower of hanoi algorithms.",
        pitfall:
          "Missing the base condition in a recursive function leads to infinite stack overflow.",
      },
      5: {
        title: "Pointers & Dynamic Memory",
        concept:
          "Direct memory addressing using pointer variables, dynamic memory allocation via `malloc()`, `calloc()`, `free()`, and structures.",
        analogy:
          "A regular variable is a home with furniture inside; a pointer is a slip of paper containing that home's GPS address.",
        examFocus:
          "Pointer arithmetic, structures vs unions, and memory allocation using `malloc()` vs `calloc()`.",
        pitfall:
          "Failing to call `free()` on dynamically allocated pointers causes memory leaks.",
      },
    },
  },
  "basic-mathematics-theory": {
    code: "BCA-105N",
    title: "Basic Mathematics",
    semester: 1,
    unitTopics: {
      1: {
        title: "Binomial Theorem & Factorization",
        concept:
          "Algebraic expansions using combination coefficients and finding general and middle terms in polynomial expressions.",
        analogy:
          "Pascal's triangle provides a visual geometric map of binomial coefficients line by line.",
        examFocus: "Finding the middle term and independent term of x in binomial expansions.",
        pitfall: "Remember that the r-th term index in (x + y)^n is T_{r+1} = nCr * x^{n-r} * y^r.",
      },
      2: {
        title: "Sequences & Progressions",
        concept:
          "Arithmetic, Geometric, and Harmonic progressions with formulas for n-th term and sum of n terms.",
        analogy:
          "AP is steady linear growth (adding a constant); GP is compounding exponential growth (multiplying by a factor).",
        examFocus: "Sum of infinite GP, relation between AM, GM, and HM (AM >= GM >= HM).",
        pitfall: "Sum of infinite GP is only valid when the common ratio |r| < 1.",
      },
      3: {
        title: "Matrices & Determinants",
        concept:
          "Matrix algebra, determinant evaluation, finding matrix inverse, and solving linear systems via Cramer's Rule.",
        analogy:
          "Matrices represent coordinate transformations; determinants indicate the scaling factor of area or volume.",
        examFocus:
          "Calculating matrix inverse via Adjoint method: A^-1 = adj(A) / |A|, and solving simultaneous equations.",
        pitfall: "A matrix only has an inverse if its determinant is non-zero (|A| != 0).",
      },
      4: {
        title: "Differential Calculus",
        concept:
          "Rates of change, chain rule, product and quotient rules, logarithmic differentiation, and successive differentiation.",
        analogy: "Derivatives measure the instantaneous speedometer reading of a moving vehicle.",
        examFocus:
          "Chain rule problems, implicit differentiation, and finding maxima/minima of single-variable functions.",
        pitfall: "Remember the derivative of ln(x) is 1/x, but d/dx [ln(u)] requires multiplying by du/dx.",
      },
      5: {
        title: "Integral Calculus",
        concept:
          "Antiderivatives, standard formulas, integration by substitution, partial fractions, and integration by parts.",
        analogy:
          "Integration calculates the exact accumulation of water filling a container over time.",
        examFocus: "Integration by parts formula: ∫(u·v)dx = u∫v dx - ∫(u'·∫v dx)dx using the ILATE rule.",
        pitfall: "Do not forget the constant of integration (+ C) for indefinite integrals.",
      },
    },
  },
};

interface StudyMascotProps {
  mood?: MascotMood;
  customMessage?: string | null;
  className?: string;
  hideDock?: boolean;
}

export function StudyMascot({
  mood: initialMood = "idle",
  customMessage,
  className,
  hideDock = false,
}: StudyMascotProps) {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  // State
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sparky_mascot_hidden") === "true";
    }
    return false;
  });
  const [activeTab, setActiveTab] = useState<"next" | "explain" | "exam" | "tip">("next");
  const [currentMood, setCurrentMood] = useState<MascotMood>(initialMood);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [tipIndex, setTipIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  const panelRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragControls = useDragControls();

  // Keep window dimensions for drag constraints
  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleHide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsHidden(true);
    setIsOpen(false);
    setShowSpeechBubble(false);
    playPopSound();
    if (typeof window !== "undefined") {
      localStorage.setItem("sparky_mascot_hidden", "true");
    }
  };

  const handleRestore = () => {
    setIsHidden(false);
    playCuteGiggleSound();
    if (typeof window !== "undefined") {
      localStorage.removeItem("sparky_mascot_hidden");
    }
  };

  // Check reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Initialize sound setting
  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  // Soft periodic blinking
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsBlinking(false);
      return;
    }

    let clearBlink: ReturnType<typeof setTimeout> | undefined;
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      clearBlink = setTimeout(() => setIsBlinking(false), 160);
    }, 4200);
    return () => {
      clearInterval(blinkInterval);
      if (clearBlink) clearTimeout(clearBlink);
    };
  }, [prefersReducedMotion]);

  // Close panel on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        playPopSound();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close panel on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Route Analysis & Learning Context
  const context = useMemo(() => {
    const isHome = pathname === "/";
    const isCourses = pathname === "/courses";
    const isSemester = /^\/courses\/[^/]+\/\d+$/.test(pathname);
    const parts = pathname.split("/").filter(Boolean);
    const isSubject =
      /^\/courses\/[^/]+\/\d+\/[^/]+(?:\/)?$/.test(pathname) ||
      (parts[0] === "courses" && parts.length === 4);
    const isUnitReader =
      /^\/courses\/[^/]+\/\d+\/[^/]+\/\d+/.test(pathname) ||
      (parts[0] === "courses" && parts.length >= 5);
    const isQuiz = pathname.startsWith("/quizzes") || pathname === "/mock-test";
    const isAuth = pathname === "/auth";
    const courseSlug = parts[1] || "bca";
    const semesterNumber = Number(parts[2]) || 1;
    const subjectSlug = parts[3] || "";
    const unitNumber = Number(parts[4]) || 1;

    // Lookup known syllabus metadata
    const knownSubject = SYLLABUS_KNOWLEDGE[subjectSlug];
    const knownUnit = knownSubject?.unitTopics[unitNumber];

    return {
      isHome,
      isCourses,
      isSemester,
      isSubject,
      isUnitReader,
      isQuiz,
      isAuth,
      courseSlug,
      semesterNumber,
      subjectSlug,
      unitNumber,
      knownSubject,
      knownUnit,
    };
  }, [pathname]);

  // Mood sync with route state
  useEffect(() => {
    if (context.isUnitReader) {
      setCurrentMood("reading");
    } else if (context.isQuiz) {
      setCurrentMood("thinking");
    } else {
      setCurrentMood("idle");
    }
  }, [context.isUnitReader, context.isQuiz]);

  // Contextual Greetings & Micro-Interactions (Restrained, once per session)
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (customMessage) {
      setSpeechBubble(customMessage);
      setShowSpeechBubble(true);
      return;
    }

    const hasGreetedSession = sessionStorage.getItem("sparky_has_greeted");
    if (!hasGreetedSession) {
      sessionStorage.setItem("sparky_has_greeted", "true");
      setSpeechBubble("Hey! Ready to learn? Click me anytime for study tips.");
      setShowSpeechBubble(true);
      const timer = setTimeout(() => setShowSpeechBubble(false), 8000);
      return () => clearTimeout(timer);
    }

    // Specific unit arrival hint (once per unit)
    if (context.isUnitReader) {
      const unitKey = `sparky_hint_unit_${context.subjectSlug}_${context.unitNumber}`;
      if (!sessionStorage.getItem(unitKey)) {
        sessionStorage.setItem(unitKey, "true");
        setSpeechBubble(`Let's master Unit ${context.unitNumber} notes today.`);
        setShowSpeechBubble(true);
        const timer = setTimeout(() => setShowSpeechBubble(false), 6000);
        return () => clearTimeout(timer);
      }
    }
  }, [context.isUnitReader, context.subjectSlug, context.unitNumber, customMessage]);

  // Mascot Click Handler
  const handleMascotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDraggingRef.current) return;
    const nextState = !isOpen;
    setIsOpen(nextState);
    setShowSpeechBubble(false);

    if (nextState) {
      playCuteGiggleSound();
      setCurrentMood("happy");
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 400);
    } else {
      playPopSound();
      setCurrentMood(context.isUnitReader ? "reading" : "idle");
    }
  };

  const handleTabChange = (tab: "next" | "explain" | "exam" | "tip") => {
    setActiveTab(tab);
    playPopSound();
    setCurrentMood(tab === "explain" ? "thinking" : tab === "exam" ? "celebrating" : "happy");
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playPopSound();
  };

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % STUDY_TIPS.length);
    playPopSound();
  };

  // Safe collision-avoidance positioning styles
  // On quiz pages: moved safely above the fixed bottom submission bar.
  // On unit reader pages: kept to the right flank, away from central reading notes.
  const positionClasses = useMemo(() => {
    if (context.isQuiz) {
      return "bottom-24 right-4 sm:bottom-24 sm:right-6 md:bottom-24 md:right-8";
    }
    if (context.isUnitReader) {
      return "bottom-8 right-4 sm:bottom-8 sm:right-6 md:bottom-8 md:right-8";
    }
    if (context.isHome) {
      return "bottom-8 right-4 sm:bottom-10 sm:right-8";
    }
    return "bottom-8 right-4 sm:bottom-8 sm:right-6";
  }, [context.isQuiz, context.isUnitReader, context.isHome]);

  // User requested: hide floating mascot on all subjects ("sub") and unit pages ("units")
  if (context.isSubject || context.isUnitReader) {
    return null;
  }

  if (hideDock) {
    return (
      <div className={cn("inline-flex items-center gap-2", className)}>
        <button
          type="button"
          onClick={handleMascotClick}
          id="sparky-mascot-btn-inline"
          className="group relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
          title="Sparky — Your Study Pal"
          aria-label="Sparky study companion"
        >
          <MascotSvg
            isBlinking={isBlinking}
            isPoked={isBouncing}
            mood={currentMood}
            size={48}
          />
        </button>
      </div>
    );
  }

  if (isHidden) {
    return (
      <div className="fixed bottom-4 right-4 z-40 select-none animate-fade-in-up">
        <button
          type="button"
          id="sparky-restore-btn"
          onClick={handleRestore}
          className="group inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-[#F5F3EB]/95 dark:bg-[#201F1B]/95 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-[0_2px_12px_rgba(32,31,27,0.1)] backdrop-blur-md transition-all hover:scale-105 hover:border-accent hover:bg-muted cursor-pointer"
          title="Show Sparky — Your Study Pal"
          aria-label="Restore Sparky study companion"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span>Show Sparky</span>
        </button>
      </div>
    );
  }

  return (
    <motion.aside
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.06}
      dragConstraints={{
        left: -(windowSize.width - 90),
        right: 10,
        top: -(windowSize.height - 120),
        bottom: 10,
      }}
      onDragStart={() => {
        isDraggingRef.current = true;
      }}
      onDragEnd={() => {
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 120);
      }}
      aria-label="Sparky Study Companion"
      className={cn("fixed z-40 select-none touch-none", positionClasses, className)}
      ref={panelRef}
    >
      <div className="relative flex flex-col items-end">
        {/* ========================================================================= */}
        {/* INTERACTION PANEL / POPOVER                                               */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="sparky-panel"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.94, y: 12 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.94, y: 8 }
              }
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="false"
              aria-label="Sparky — Your Study Pal"
              className={cn(
                "relative mb-3 w-[calc(100vw-2rem)] sm:w-[350px] max-w-[370px]",
                "rounded-2xl border border-border bg-[#F5F3EB] dark:bg-[#201F1B]",
                "p-4 shadow-[0_8px_30px_rgba(32,31,27,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
                "text-foreground",
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border/80">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full border border-border bg-surface flex items-center justify-center shrink-0">
                    <MascotSvg size={30} mood={currentMood} isBlinking={isBlinking} />
                  </div>
                  <div>
                    <h2 className="font-display text-base font-normal leading-tight text-foreground">
                      Sparky
                    </h2>
                    <p className="text-[11px] text-muted-foreground italic">Your Study Pal</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                    {context.isUnitReader
                      ? `Unit ${context.unitNumber}`
                      : context.isSubject
                        ? "Subject Hub"
                        : context.isSemester
                          ? `Sem ${context.semesterNumber}`
                          : "Curriculum"}
                  </span>
                  <button
                    type="button"
                    onClick={handleHide}
                    className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    title="Hide Sparky from screen"
                    aria-label="Hide Sparky"
                  >
                    <EyeOff className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    id="sparky-panel-close"
                    onClick={() => setIsOpen(false)}
                    className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    aria-label="Close Sparky panel"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons Tabs */}
              <div className="grid grid-cols-4 gap-1.5 py-3">
                {[
                  { id: "next", label: "What's Next", icon: Compass },
                  { id: "explain", label: "Explain", icon: BookOpen },
                  { id: "exam", label: "Exam Prep", icon: GraduationCap },
                  { id: "tip", label: "Study Tip", icon: Lightbulb },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      id={`sparky-tab-${tab.id}`}
                      type="button"
                      onClick={() => handleTabChange(tab.id as typeof activeTab)}
                      className={cn(
                        "flex flex-col items-center gap-1 py-1.5 px-1 rounded-xl text-[10px] font-medium transition-all cursor-pointer text-center",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-2xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 border border-transparent",
                      )}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate w-full">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Grounded Content Area */}
              <motion.div
                key={activeTab}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                aria-live="polite"
                className="min-h-[140px] rounded-xl border border-border bg-surface p-3.5 text-xs text-foreground shadow-2xs"
              >
                {/* 1. What should I study next? */}
                {activeTab === "next" && (
                  <div className="space-y-2.5">
                    <div className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                      <Compass className="h-3.5 w-3.5 text-accent" />
                      Recommended Next Step
                    </div>

                    {context.isHome && (
                      <>
                        <p className="text-muted-foreground leading-relaxed">
                          Start your BCA journey with Semester 1. We recommend beginning with{" "}
                          <strong className="text-foreground">Computer Fundamentals & PC Software</strong>{" "}
                          (BCA-101N).
                        </p>
                        <Button
                          asChild
                          size="sm"
                          className="btn-cta w-full h-8 rounded-full text-xs font-medium gap-1 mt-1 cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link to="/courses/$courseSlug/$semesterNumber" params={{ courseSlug: "bca", semesterNumber: "1" }}>
                            Go to Semester 1 <ArrowRight className="h-3 w-3 ml-auto" />
                          </Link>
                        </Button>
                      </>
                    )}

                    {context.isCourses && (
                      <>
                        <p className="text-muted-foreground leading-relaxed">
                          Explore the 6-semester MJPRU curriculum. Semester 1 introduces core programming and computer architecture.
                        </p>
                        <Button
                          asChild
                          size="sm"
                          className="btn-cta w-full h-8 rounded-full text-xs font-medium gap-1 mt-1 cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link to="/courses/$courseSlug/$semesterNumber" params={{ courseSlug: "bca", semesterNumber: "1" }}>
                            Open Semester 1 Subjects <ArrowRight className="h-3 w-3 ml-auto" />
                          </Link>
                        </Button>
                      </>
                    )}

                    {context.isSemester && (
                      <>
                        <p className="text-muted-foreground leading-relaxed">
                          Pick your first subject! Starting with{" "}
                          <strong className="text-foreground">BCA-101N (Computer Fundamentals)</strong> gives you the strongest theoretical foundation.
                        </p>
                        <Button
                          asChild
                          size="sm"
                          className="btn-cta w-full h-8 rounded-full text-xs font-medium gap-1 mt-1 cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link
                            to="/courses/$courseSlug/$semesterNumber/$subjectSlug"
                            params={{
                              courseSlug: "bca",
                              semesterNumber: String(context.semesterNumber),
                              subjectSlug: "computer-fundamentals-and-pc-software-theory",
                            }}
                          >
                            Open BCA-101N Hub <ArrowRight className="h-3 w-3 ml-auto" />
                          </Link>
                        </Button>
                      </>
                    )}

                    {context.isSubject && (
                      <>
                        <p className="text-muted-foreground leading-relaxed">
                          Begin with Unit 1 notes. Review the core definitions, study the block diagrams, then take the practice quiz.
                        </p>
                        <Button
                          asChild
                          size="sm"
                          className="btn-cta w-full h-8 rounded-full text-xs font-medium gap-1 mt-1 cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link
                            to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                            params={{
                              courseSlug: context.courseSlug,
                              semesterNumber: String(context.semesterNumber),
                              subjectSlug: context.subjectSlug,
                              unitNumber: "1",
                            }}
                          >
                            Read Unit 1 Notes <ArrowRight className="h-3 w-3 ml-auto" />
                          </Link>
                        </Button>
                      </>
                    )}

                    {context.isUnitReader && (
                      <>
                        <p className="text-muted-foreground leading-relaxed">
                          You are reading Unit {context.unitNumber}! After reviewing the lesson definitions, test your understanding with timed MCQs or proceed to Unit {context.unitNumber + 1}.
                        </p>
                        <div className="flex gap-2 mt-1">
                          <Button
                            asChild
                            size="sm"
                            className="btn-cta flex-1 h-8 rounded-full text-xs font-medium cursor-pointer"
                            onClick={() => setIsOpen(false)}
                          >
                            <Link to="/mock-test">
                              Take Mock Exam <ArrowRight className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </>
                    )}

                    {context.isQuiz && (
                      <>
                        <p className="text-muted-foreground leading-relaxed">
                          Complete all questions in this session. Review any incorrect answers in the unit weakness breakdown to pinpoint revision areas.
                        </p>
                        <span className="text-[11px] text-accent font-medium block">
                          Tip: Take 1 minute per question to mirror university pace.
                        </span>
                      </>
                    )}
                  </div>
                )}

                {/* 2. Explain this topic */}
                {activeTab === "explain" && (
                  <div className="space-y-2">
                    <div className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                      <BookOpen className="h-3.5 w-3.5 text-accent" />
                      {context.knownUnit ? context.knownUnit.title : "Topic Breakdown"}
                    </div>

                    {context.knownUnit ? (
                      <div className="space-y-2 text-[11px] leading-relaxed">
                        <div>
                          <span className="font-semibold text-foreground">💡 Core Concept: </span>
                          <span className="text-muted-foreground">{context.knownUnit.concept}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-foreground">🎯 Analogy: </span>
                          <span className="text-muted-foreground">{context.knownUnit.analogy}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-foreground">📋 Exam Focus: </span>
                          <span className="text-muted-foreground">{context.knownUnit.examFocus}</span>
                        </div>
                      </div>
                    ) : context.isSubject ? (
                      <div className="space-y-2 text-[11px] leading-relaxed">
                        <p className="text-muted-foreground">
                          This subject covers university-prescribed BCA theory with 4 credits. Evaluators look for precise syntax, block diagrams, and step-by-step algorithms.
                        </p>
                        <p className="text-foreground font-medium">
                          Click any unit below to get the 3-part concept breakdown!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 text-[11px] leading-relaxed">
                        <p className="text-muted-foreground">
                          Open any unit reading page (such as BCA-101N Unit 1) and click <em>Explain</em>. Sparky will break down the exact core concept, real-world analogy, and university exam questions for that lesson!
                        </p>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="w-full h-8 rounded-full text-xs font-medium mt-1 cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link
                            to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                            params={{
                              courseSlug: "bca",
                              semesterNumber: "1",
                              subjectSlug: "computer-fundamentals-and-pc-software-theory",
                              unitNumber: "1",
                            }}
                          >
                            Explore BCA-101N Unit 1 Notes
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Help me prepare for exams */}
                {activeTab === "exam" && (
                  <div className="space-y-2 text-[11px] leading-relaxed">
                    <div className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                      <GraduationCap className="h-3.5 w-3.5 text-accent" />
                      University Examination Blueprint
                    </div>

                    <div className="space-y-1.5 text-muted-foreground">
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="font-medium text-foreground">Theory Scheme:</span>
                        <span>70 External + 30 Internal (40% pass)</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="font-medium text-foreground">Section A (Short):</span>
                        <span>5 questions (2 marks each = 10 marks)</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="font-medium text-foreground">Section B (Medium):</span>
                        <span>4 questions (5 marks each = 20 marks)</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-1">
                        <span className="font-medium text-foreground">Section C (Long):</span>
                        <span>Descriptive diagrams & code (40 marks)</span>
                      </div>
                    </div>

                    <div className="pt-1">
                      <Button
                        asChild
                        size="sm"
                        className="btn-cta w-full h-8 rounded-full text-xs font-medium cursor-pointer"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link to="/mock-test">
                          Simulate Timed Exam <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}

                {/* 4. Give me a study tip */}
                {activeTab === "tip" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground flex items-center gap-1.5">
                        <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                        {STUDY_TIPS[tipIndex].title}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {tipIndex + 1} of {STUDY_TIPS.length}
                      </span>
                    </div>

                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {STUDY_TIPS[tipIndex].text}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] uppercase font-mono font-semibold text-accent">
                        #{STUDY_TIPS[tipIndex].tag}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={nextTip}
                        className="h-7 px-2.5 text-xs text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-full cursor-pointer"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" /> Next Tip
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Panel Footer */}
              <div className="flex items-center justify-between pt-3 mt-1 text-[11px] text-muted-foreground border-t border-border/60">
                <span className="truncate">Syllabus aligned · MJPRU Bareilly</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleHide}
                    className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer text-muted-foreground"
                    title="Hide Sparky from screen"
                  >
                    <EyeOff className="h-3.5 w-3.5" />
                    <span className="text-[10px]">Hide</span>
                  </button>
                  <button
                    type="button"
                    onClick={toggleSound}
                    className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer text-muted-foreground"
                    title={soundOn ? "Mute study audio" : "Enable study audio"}
                  >
                    {soundOn ? (
                      <>
                        <Volume2 className="h-3.5 w-3.5 text-accent" />
                        <span className="text-[10px]">Sound on</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="h-3.5 w-3.5" />
                        <span className="text-[10px]">Muted</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* COMPACT SPEECH TOOLTIP                                                    */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {showSpeechBubble && !isOpen && speechBubble && (
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 8, scale: 0.94 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 4, scale: 0.94 }
              }
              transition={{ duration: 0.18 }}
              className="relative mb-2 max-w-[220px] sm:max-w-[260px] rounded-xl border border-border bg-[#F5F3EB] dark:bg-[#201F1B] p-2.5 shadow-[0_4px_16px_rgba(32,31,27,0.08)] text-foreground"
            >
              <div className="flex items-start justify-between gap-1.5">
                <p className="text-xs text-foreground leading-snug">{speechBubble}</p>
                <button
                  type="button"
                  onClick={() => setShowSpeechBubble(false)}
                  className="text-muted-foreground/70 hover:text-foreground p-0.5 rounded cursor-pointer"
                  title="Dismiss"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              {/* Tooltip triangle tail */}
              <div className="absolute -bottom-1 right-5 h-2 w-2 rotate-45 border-r border-b border-border bg-[#F5F3EB] dark:bg-[#201F1B]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* COMPACT SPARKY MASCOT BUTTON (Draggable, Hideable, 48-52px)                */}
        {/* ========================================================================= */}
        <div className="group relative flex items-center justify-center">
          {/* Quick-hide button on hover */}
          {!isOpen && (
            <button
              type="button"
              onClick={handleHide}
              className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity absolute -top-2 -left-2 h-5 w-5 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground shadow-xs cursor-pointer z-10"
              title="Hide Sparky"
              aria-label="Hide Sparky mascot"
            >
              <X className="h-3 w-3" />
            </button>
          )}

          <button
            type="button"
            id="sparky-mascot-btn"
            onPointerDown={(e) => {
              dragControls.start(e);
            }}
            onClick={handleMascotClick}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            title="Sparky — Your Study Pal (Click to open, drag to move anywhere)"
            className={cn(
              "group relative flex items-center justify-center",
              "h-[44px] w-[44px] sm:h-[52px] sm:w-[52px]",
              "rounded-2xl border border-border bg-surface",
              "shadow-[0_2px_8px_rgba(32,31,27,0.08)] hover:shadow-[0_4px_16px_rgba(32,31,27,0.14)]",
              "transition-all duration-200 cursor-grab active:cursor-grabbing outline-none focus-visible:ring-2 focus-visible:ring-accent",
              isOpen && "ring-2 ring-accent border-accent shadow-soft-sm",
              currentMood === "celebrating" &&
                "ring-2 ring-amber-400/50 shadow-[0_0_14px_rgba(251,191,36,0.3)]",
            )}
          >
            {/* Subtle gentle breathing bob for idle state (only when reduced motion is disabled) */}
            <motion.div
              animate={
                prefersReducedMotion || isOpen || context.isUnitReader
                  ? { y: 0 }
                  : { y: [0, -2.5, 0] }
              }
              transition={{
                repeat: Infinity,
                duration: 3.6,
                ease: "easeInOut",
              }}
              className="flex items-center justify-center"
            >
              <motion.div
                animate={
                  prefersReducedMotion ? { scale: 1 } : { scale: isBouncing ? [1, 1.08, 0.98, 1] : 1 }
                }
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                <MascotSvg
                  isBlinking={isBlinking}
                  isPoked={isBouncing}
                  mood={isOpen ? "happy" : currentMood}
                  size={44}
                  className="sm:w-[48px] sm:h-[48px] drop-shadow-2xs"
                />
              </motion.div>
            </motion.div>

            {/* Active indicator dot */}
            {!isOpen && (
              <span
                className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent border-2 border-surface"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

/* ─────────────────────────────────────────────────────────────
   Pure SVG Vector Mascot: "Sparky — Your Study Pal"
   Original Artwork Preserved with Precise Eyes & Mood Expressions
   ───────────────────────────────────────────────────────────── */

export function MascotSvg({
  isBlinking = false,
  isPoked = false,
  mood = "idle",
  size = 52,
  className,
}: {
  isBlinking?: boolean;
  isPoked?: boolean;
  mood?: MascotMood;
  size?: number;
  className?: string;
}) {
  const isHappy = mood === "happy" || mood === "celebrating" || isPoked;
  const isThinking = mood === "thinking";
  const isReading = mood === "reading";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-transform duration-150", isPoked && "scale-105", className)}
    >
      <defs>
        {/* Soft Golden Gradient Body */}
        <linearGradient
          id="sparkyBodyGrad"
          x1="20"
          y1="15"
          x2="80"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffd166" />
          <stop offset="55%" stopColor="#ffb703" />
          <stop offset="100%" stopColor="#fb8500" />
        </linearGradient>

        <linearGradient id="capGradNew" x1="30" y1="8" x2="70" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#303A4E" />
          <stop offset="100%" stopColor="#1E232F" />
        </linearGradient>

        <filter id="cuteShadowNew" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#201F1B" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Main Fluffy Body */}
      <ellipse cx="50" cy="56" rx="36" ry="34" fill="url(#sparkyBodyGrad)" filter="url(#cuteShadowNew)" />

      {/* Soft Belly Highlight */}
      <ellipse cx="50" cy="64" rx="22" ry="18" fill="#fff7d6" opacity="0.88" />

      {/* Rosy Cheeks */}
      <circle cx="28" cy="58" r="5" fill="#ff70a6" opacity="0.6" />
      <circle cx="72" cy="58" r="5" fill="#ff70a6" opacity="0.6" />

      {/* Eyes Expression */}
      {isBlinking ? (
        /* Blinking / Squint */
        <>
          <path
            d="M 33 52 Q 38 56 43 52"
            stroke="#1d3557"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 57 52 Q 62 56 67 52"
            stroke="#1d3557"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : isHappy ? (
        /* Happy Arched Eyes ^ _ ^ */
        <>
          <path
            d="M 33 53 Q 38 46 43 53"
            stroke="#1d3557"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 57 53 Q 62 46 67 53"
            stroke="#1d3557"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : isThinking ? (
        /* Thinking Curious Eyes (looking upward) */
        <>
          <ellipse cx="38" cy="48" rx="5" ry="6" fill="#1d3557" />
          <circle cx="37" cy="46" r="2" fill="#ffffff" />
          <ellipse cx="62" cy="48" rx="5" ry="6" fill="#1d3557" />
          <circle cx="61" cy="46" r="2" fill="#ffffff" />
        </>
      ) : isReading ? (
        /* Calm Reading Eyes */
        <>
          <path
            d="M 33 51 Q 38 55 43 51"
            stroke="#1d3557"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 57 51 Q 62 55 67 51"
            stroke="#1d3557"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : (
        /* Big Anime Sparkle Eyes */
        <>
          {/* Left Eye */}
          <ellipse cx="38" cy="50" rx="5" ry="6.5" fill="#1d3557" />
          <circle cx="36" cy="48" r="2.2" fill="#ffffff" />
          <circle cx="39.5" cy="53" r="1.1" fill="#ffffff" />

          {/* Right Eye */}
          <ellipse cx="62" cy="50" rx="5" ry="6.5" fill="#1d3557" />
          <circle cx="60" cy="48" r="2.2" fill="#ffffff" />
          <circle cx="63.5" cy="53" r="1.1" fill="#ffffff" />
        </>
      )}

      {/* Cute Little Mouth */}
      {isHappy ? (
        /* Open Happy Smile :D */
        <path
          d="M 44 60 Q 50 67 56 60 Z"
          fill="#e63946"
          stroke="#1d3557"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      ) : isThinking ? (
        /* Small thoughtful 'o' */
        <circle cx="50" cy="61" r="2.2" fill="#1d3557" />
      ) : (
        /* Subtle Cat Smile :3 */
        <path
          d="M 45 59 Q 48 62 50 60 Q 52 62 55 59"
          stroke="#1d3557"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* Tiny Academic Cap on Top */}
      <g transform="translate(0, -2)">
        <polygon points="50,14 74,21 50,28 26,21" fill="url(#capGradNew)" />
        <rect x="42" y="24" width="16" height="6" rx="2" fill="#201F1B" />
        {/* Gold Tassel */}
        <circle cx="50" cy="21" r="2" fill="#ffd166" />
        <path d="M 50 21 Q 62 23 66 31" stroke="#ffd166" strokeWidth="1.6" fill="none" />
        <circle cx="66" cy="32" r="1.8" fill="#ffd166" />
      </g>

      {/* Tiny Feet */}
      <ellipse cx="38" cy="88" rx="8" ry="4.5" fill="#e07a5f" />
      <ellipse cx="62" cy="88" rx="8" ry="4.5" fill="#e07a5f" />

      {/* Little Star Sparkle on Cheek when Celebrating or Poked */}
      {(mood === "celebrating" || isPoked) && (
        <path
          d="M 76 43 L 78 46 L 81 46 L 79 48 L 80 51 L 76 49 L 72 51 L 73 48 L 71 46 L 74 46 Z"
          fill="#ffd166"
        />
      )}
    </svg>
  );
}

export function SparkyAvatar({
  size = 44,
  mood = "idle",
  isHappy = false,
  isPoked = false,
  className,
}: {
  size?: number;
  mood?: MascotMood;
  isHappy?: boolean;
  isPoked?: boolean;
  className?: string;
}) {
  return (
    <MascotSvg
      size={size}
      mood={isHappy ? "happy" : mood}
      isPoked={isPoked}
      isBlinking={false}
      className={className}
    />
  );
}
