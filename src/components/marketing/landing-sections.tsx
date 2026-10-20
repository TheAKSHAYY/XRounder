import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Zap,
  Code2,
  Cpu,
  Globe,
  Terminal,
  ShieldCheck,
  Check,
  X,
  Flame,
  Trophy,
  Heart,
  ChevronDown,
  Star,
  Compass,
  MousePointerClick,
  Layers,
  GraduationCap,
  Play,
  Lightbulb,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatTitleCase } from "@/lib/format";
import { SparkyAvatar } from "@/components/gamification/study-mascot";
import {
  playPopSound,
  playCuteGiggleSound,
  playCorrectSound,
  playWrongSound,
} from "@/lib/sound-fx";
import confetti from "canvas-confetti";

/* ──────────────────────────────────────────────────────────── 1. Hero: Gamified Quest Hub & Exam Rescue Machine */

interface SubjectIntel {
  code: string;
  title: string;
  slug: string;
  highYieldTopic: string;
  marksYield: string;
  frequency: string;
  sparkyQuote: string;
  quiz: {
    question: string;
    options: Array<{ id: number; text: string; correct: boolean }>;
    tip: string;
  };
  blueprint: string[];
}

interface SemesterIntel {
  num: number;
  tagline: string;
  badge: string;
  subjects: SubjectIntel[];
}

export function Hero({
  user,
  loading,
  activeSemester = 1,
  onSelectSemester,
}: {
  user: unknown;
  loading: boolean;
  activeSemester?: number;
  onSelectSemester?: (sem: number) => void;
}) {
  const [internalSemester, setInternalSemester] = useState<number>(activeSemester);
  const chosenSemester = activeSemester ?? internalSemester;

  const [chosenSubjectIdx, setChosenSubjectIdx] = useState<number>(0);
  const [hudTab, setHudTab] = useState<"intel" | "quiz" | "blueprint">("intel");
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [sparkyPets, setSparkyPets] = useState(0);

  useEffect(() => {
    setChosenSubjectIdx(0);
    setSelectedQuizOption(null);
  }, [chosenSemester]);

  const semesterHub: Record<number, SemesterIntel> = {
    1: {
      num: 1,
      tagline: "Citadel of Fundamentals",
      badge: "Foundational Code & Logic",
      subjects: [
        {
          code: "BCA-103N",
          title: "Programming with C Theory",
          slug: "programming-with-c-theory",
          highYieldTopic: "Pointers, Dynamic Memory (malloc/free) & Structures",
          marksYield: "15 Marks in Section C",
          frequency: "Appeared in 9 of last 10 university exams",
          sparkyQuote:
            "Pointers look confusing only if you memorize syntax! Look at our 5-minute memory box diagrams and score a clean 15/15 on Q4.",
          quiz: {
            question: "Which operator is used to extract the memory address of a variable in C?",
            options: [
              { id: 0, text: "& (Address-of operator)", correct: true },
              { id: 1, text: "* (Dereference operator)", correct: false },
              { id: 2, text: "-> (Arrow member operator)", correct: false },
            ],
            tip: "& extracts the hex memory address (e.g. &x). The asterisk * dereferences a pointer to read its stored value!",
          },
          blueprint: [
            "1. Pointer Definition & Syntax (2 marks)",
            "2. Memory Architecture & Address Diagram (5 marks)",
            "3. Working Code Example with Output (5 marks)",
            "4. Common Pitfalls & Null Pointer Trap (3 marks)",
          ],
        },
        {
          code: "BCA-101N",
          title: "Computer Fundamentals & PC Software",
          slug: "computer-fundamentals-and-pc-software-theory",
          highYieldTopic: "Von Neumann Architecture & CPU Execution Cycle",
          marksYield: "10-15 Marks in Section B/C",
          frequency: "Guaranteed question in Unit 1",
          sparkyQuote:
            "Fetch-Decode-Execute. Memorize this one cycle with the register block diagram and secure an effortless 10 marks!",
          quiz: {
            question: "Which system bus is strictly unidirectional in computer architecture?",
            options: [
              { id: 0, text: "Address Bus (CPU to Memory)", correct: true },
              { id: 1, text: "Data Bus", correct: false },
              { id: 2, text: "Control Bus", correct: false },
            ],
            tip: "The Address Bus is unidirectional because only the CPU decides memory addresses. The Data Bus is bidirectional!",
          },
          blueprint: [
            "1. Block Diagram of Computer (4 marks)",
            "2. ALU, CU & Register Functions (4 marks)",
            "3. Memory Hierarchy Pyramid (4 marks)",
            "4. Bus Interconnection Roles (3 marks)",
          ],
        },
        {
          code: "BCA-105N",
          title: "Basic Mathematics",
          slug: "basic-mathematics",
          highYieldTopic: "Cramer's Rule & Matrix Inversion (3x3)",
          marksYield: "15 Marks Guaranteed",
          frequency: "Section C staple every single winter exam",
          sparkyQuote:
            "Determinants are pure free marks if you practice the sign matrix (+, -, +). Follow our step-by-step matrix template!",
          quiz: {
            question: "What is the determinant of an identity matrix of any order?",
            options: [
              { id: 0, text: "Always 1", correct: true },
              { id: 1, text: "Always 0", correct: false },
              { id: 2, text: "Equal to matrix size (n)", correct: false },
            ],
            tip: "An identity matrix is diagonal with all 1s. Its determinant is always exactly 1!",
          },
          blueprint: [
            "1. Determinant Expansion Method (3 marks)",
            "2. Minors and Cofactors Matrix (5 marks)",
            "3. Adjoint & Inverse Formula (4 marks)",
            "4. Verification of System of Equations (3 marks)",
          ],
        },
      ],
    },
    2: {
      num: 2,
      tagline: "The Algorithmic Forge",
      badge: "Data Structures & OOP",
      subjects: [
        {
          code: "BCA-201N",
          title: "Data Structures Using C",
          slug: "data-structures-using-c",
          highYieldTopic: "Stack Applications (Infix to Postfix) & Binary Search Tree (BST)",
          marksYield: "15 Marks Guaranteed",
          frequency: "100% past paper occurrence in last 5 years",
          sparkyQuote:
            "Infix to Postfix evaluation using the operator precedence stack table is an exam goldmine. Draw the tabular columns for full 15/15!",
          quiz: {
            question: "Which data structure follows the LIFO (Last In First Out) principle?",
            options: [
              { id: 0, text: "Stack", correct: true },
              { id: 1, text: "Queue", correct: false },
              { id: 2, text: "Binary Search Tree", correct: false },
            ],
            tip: "Stack is LIFO (like a stack of cafeteria plates). Queue is FIFO (First In First Out)!",
          },
          blueprint: [
            "1. Stack Abstract Data Type & Primitives (2 marks)",
            "2. Operator Precedence & Associativity Table (5 marks)",
            "3. Step-by-Step Expression Trace (5 marks)",
            "4. Code Implementation of Infix-to-Postfix (3 marks)",
          ],
        },
        {
          code: "BCA-203N",
          title: "OOP with C++",
          slug: "object-oriented-programming-with-c",
          highYieldTopic: "Polymorphism: Virtual Functions & Operator Overloading",
          marksYield: "15 Marks in Section C",
          frequency: "Asked in 8 of last 9 semester papers",
          sparkyQuote:
            "Draw the virtual table (vtable) and vptr pointer diagram. University examiners reward internal architecture diagrams!",
          quiz: {
            question: "Which keyword prevents a virtual function from being overridden in derived classes?",
            options: [
              { id: 0, text: "final", correct: true },
              { id: 1, text: "const", correct: false },
              { id: 2, text: "static", correct: false },
            ],
            tip: "The 'final' specifier in C++11 locks virtual functions from further override down the inheritance tree!",
          },
          blueprint: [
            "1. Compile-Time vs Runtime Polymorphism (3 marks)",
            "2. Pure Virtual Function & Abstract Base Class (4 marks)",
            "3. Internal VTable & VPtr Architecture (5 marks)",
            "4. Compilable C++ Code Demonstration (3 marks)",
          ],
        },
      ],
    },
    3: {
      num: 3,
      tagline: "Network & Java Architecture",
      badge: "Core Systems & Java",
      subjects: [
        {
          code: "BCA-302N",
          title: "Computer Networks",
          slug: "computer-networks",
          highYieldTopic: "OSI 7 Layers vs TCP/IP Protocol Suite",
          marksYield: "15 Marks in Section C",
          frequency: "Guaranteed every single year without exception",
          sparkyQuote:
            "'Please Do Not Touch Steve's Pet Alligators' — Physical, Data Link, Network, Transport, Session, Presentation, Application!",
          quiz: {
            question: "At which layer of the OSI model does logical IP routing take place?",
            options: [
              { id: 0, text: "Network Layer (Layer 3)", correct: true },
              { id: 1, text: "Transport Layer (Layer 4)", correct: false },
              { id: 2, text: "Data Link Layer (Layer 2)", correct: false },
            ],
            tip: "Routers operate at Layer 3 (Network Layer) using IP addresses. Switches operate at Layer 2 using MAC addresses!",
          },
          blueprint: [
            "1. 7-Layer OSI vs 4-Layer TCP/IP Diagram (5 marks)",
            "2. Key Protocols at each layer (HTTP, TCP, IP, Ethernet) (4 marks)",
            "3. Encapsulation & Header Decapsulation Flow (3 marks)",
            "4. Practical packet flow example (3 marks)",
          ],
        },
        {
          code: "BCA-301N",
          title: "Core Java Programming",
          slug: "core-java-programming",
          highYieldTopic: "Multithreading Life Cycle & Exception Hierarchy",
          marksYield: "15 Marks in Section C",
          frequency: "Standard question in Unit 3",
          sparkyQuote:
            "Thread states: New ➔ Runnable ➔ Blocked ➔ Waiting ➔ Terminated. Draw the state transition bubble chart for instant marks!",
          quiz: {
            question: "Which class is the ultimate root superclass of every class in Java?",
            options: [
              { id: 0, text: "java.lang.Object", correct: true },
              { id: 1, text: "java.lang.Class", correct: false },
              { id: 2, text: "java.lang.System", correct: false },
            ],
            tip: "Every single class in Java implicitly inherits from java.lang.Object!",
          },
          blueprint: [
            "1. Thread Life Cycle State Diagram (5 marks)",
            "2. Thread Class vs Runnable Interface (4 marks)",
            "3. Synchronization & synchronized keyword (3 marks)",
            "4. Producer-Consumer Problem Code (3 marks)",
          ],
        },
      ],
    },
    4: {
      num: 4,
      tagline: "Database & Web Sanctum",
      badge: "DBMS, SQL & Modern Web",
      subjects: [
        {
          code: "BCA-401N",
          title: "DBMS & SQL Architecture",
          slug: "database-management-systems",
          highYieldTopic: "BCNF Normalization & ACID Transaction Properties",
          marksYield: "15 Marks in Section C",
          frequency: "100% past paper occurrence",
          sparkyQuote:
            "1NF to 3NF to BCNF. We give you sample student/course tables to easily prove non-trivial functional dependencies in 4 minutes!",
          quiz: {
            question: "Which ACID property guarantees that either all operations succeed or none do?",
            options: [
              { id: 0, text: "Atomicity", correct: true },
              { id: 1, text: "Consistency", correct: false },
              { id: 2, text: "Isolation", correct: false },
            ],
            tip: "Atomicity is the 'all or nothing' rule. If power fails mid-transaction, all changes roll back safely!",
          },
          blueprint: [
            "1. Update/Delete Anomalies before Normalization (3 marks)",
            "2. 1NF, 2NF, 3NF & BCNF Rules with Table Examples (6 marks)",
            "3. Functional Dependency Closure (3 marks)",
            "4. Solved University Question Walkthrough (3 marks)",
          ],
        },
        {
          code: "BCA-402N",
          title: "Web Technologies",
          slug: "web-technologies",
          highYieldTopic: "DOM Tree Manipulation & Regex Form Validation",
          marksYield: "10-15 Marks in Section B",
          frequency: "Asked in 7 of last 8 university exams",
          sparkyQuote:
            "Event bubbling vs event capturing. Draw the DOM tree propagation diagram for effortless theory marks!",
          quiz: {
            question: "Which method is the standard way to attach an event handler in modern JavaScript?",
            options: [
              { id: 0, text: "addEventListener()", correct: true },
              { id: 1, text: "attachEvent()", correct: false },
              { id: 2, text: "registerListener()", correct: false },
            ],
            tip: "addEventListener() is standard W3C DOM Level 2 event registration supported across all modern browsers!",
          },
          blueprint: [
            "1. DOM Tree Node Hierarchy (3 marks)",
            "2. Event Bubbling vs Capturing Phase Diagram (4 marks)",
            "3. Regex Validation for Email and Phone (5 marks)",
            "4. Compilable HTML + JS Snippet (3 marks)",
          ],
        },
      ],
    },
    5: {
      num: 5,
      tagline: "Intelligence & Python Summit",
      badge: "Python, AI & Cloud",
      subjects: [
        {
          code: "BCA-501N",
          title: "Python Programming",
          slug: "python-programming",
          highYieldTopic: "List Comprehensions, Decorators & Generator Functions",
          marksYield: "15 Marks in Section C",
          frequency: "High yield in Section B & C",
          sparkyQuote:
            "Generators use 'yield' to save memory. Write 4 lines of code to demonstrate an infinite Fibonacci sequence for instant applause!",
          quiz: {
            question: "Which keyword turns a standard Python function into a generator?",
            options: [
              { id: 0, text: "yield", correct: true },
              { id: 1, text: "return", correct: false },
              { id: 2, text: "generate", correct: false },
            ],
            tip: "yield pauses the function execution and yields a value, resuming seamlessly on the next call!",
          },
          blueprint: [
            "1. Iterables vs Iterators vs Generators (3 marks)",
            "2. Decorator Wrapper Syntax (@decorator) (4 marks)",
            "3. RAM Benchmark: yield vs return (4 marks)",
            "4. Real University Programming Solution (4 marks)",
          ],
        },
        {
          code: "BCA-502N",
          title: "Artificial Intelligence & ML",
          slug: "artificial-intelligence",
          highYieldTopic: "A* Search Algorithm & Alpha-Beta Minimax Pruning",
          marksYield: "15 Marks in Section C",
          frequency: "Guaranteed algorithmic numerical problem",
          sparkyQuote:
            "f(n) = g(n) + h(n). Remember: g is actual path cost, h is heuristic estimate. Never overestimate h(n)!",
          quiz: {
            question: "What property must a heuristic h(n) satisfy for A* search to guarantee an optimal path?",
            options: [
              { id: 0, text: "Admissibility (never overestimates cost)", correct: true },
              { id: 1, text: "Strict Monotonicity only", correct: false },
              { id: 2, text: "Linearity", correct: false },
            ],
            tip: "An admissible heuristic never overestimates the true remaining distance to the goal, ensuring optimal search!",
          },
          blueprint: [
            "1. A* Pseudo-Code & Cost Equation f(n)=g(n)+h(n) (4 marks)",
            "2. Step-by-Step State Graph Traversal Table (5 marks)",
            "3. Proof of Heuristic Admissibility (3 marks)",
            "4. Comparison with Dijkstra & Greedy Best-First (3 marks)",
          ],
        },
      ],
    },
    6: {
      num: 6,
      tagline: "Capstone & Cyber Fortress",
      badge: "Cyber Security & Capstone",
      subjects: [
        {
          code: "BCA-601N",
          title: "Information & Cyber Security",
          slug: "information-security",
          highYieldTopic: "RSA Asymmetric Cryptography & Firewall Types",
          marksYield: "15 Marks in Section C",
          frequency: "Guaranteed 15-mark numerical or theory every year",
          sparkyQuote:
            "p, q primes, n = p*q, phi(n) = (p-1)*(q-1). Follow our 4-step small numerical calculation to bag full marks!",
          quiz: {
            question: "In RSA asymmetric cryptography, which key is used to decrypt the received message?",
            options: [
              { id: 0, text: "Recipient's Private Key", correct: true },
              { id: 1, text: "Sender's Public Key", correct: false },
              { id: 2, text: "Recipient's Public Key", correct: false },
            ],
            tip: "The sender encrypts with the recipient's public key. Only the recipient can decrypt with their private key!",
          },
          blueprint: [
            "1. Symmetric vs Asymmetric Cryptography (3 marks)",
            "2. Step-by-Step RSA Key Generation Algorithm (5 marks)",
            "3. Small Numerical Example with primes p=3, q=11 (4 marks)",
            "4. Defense Against Man-in-the-Middle Attacks (3 marks)",
          ],
        },
      ],
    },
  };

  const currentSem = semesterHub[chosenSemester] || semesterHub[1];
  const currentSubj = currentSem.subjects[chosenSubjectIdx] || currentSem.subjects[0];

  const handleSelectSemester = (num: number) => {
    setInternalSemester(num);
    onSelectSemester?.(num);
    setChosenSubjectIdx(0);
    setSelectedQuizOption(null);
    playPopSound();
    confetti({
      particleCount: 24,
      spread: 50,
      origin: { x: 0.5, y: 0.4 },
      colors: ["#F59E0B", "#8B5CF6", "#10B981"],
      disableForReducedMotion: true,
    });
  };

  const handleSelectSubject = (idx: number) => {
    setChosenSubjectIdx(idx);
    setSelectedQuizOption(null);
    playPopSound();
  };

  const handleSelectOption = (id: number) => {
    setSelectedQuizOption(id);
    const isCorrect = currentSubj.quiz.options.find((o) => o.id === id)?.correct;
    if (isCorrect) {
      playCorrectSound();
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { x: 0.7, y: 0.5 },
        disableForReducedMotion: true,
      });
    } else {
      playWrongSound();
    }
  };

  const handlePetSparky = () => {
    setSparkyPets((p) => p + 1);
    playCuteGiggleSound();
    confetti({
      particleCount: 22,
      spread: 45,
      origin: { x: 0.85, y: 0.35 },
      shapes: ["circle"],
      colors: ["#F59E0B", "#EC4899", "#8B5CF6"],
      disableForReducedMotion: true,
    });
  };

  return (
    <section id="hero-rescue-machine" className="gaming-grid-bg relative overflow-hidden border-b border-border/60 py-12 sm:py-20">
      {/* Anchor targets for SiteHeader navigation */}
      <div id="practice" className="absolute -top-20" aria-hidden="true" />

      {/* Ambient Neon Atmosphere Orbs */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.14_75_/_18%),transparent_65%)] blur-3xl animate-glow-pulse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 right-10 -z-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.52_0.21_290_/_15%),transparent_65%)] blur-3xl animate-glow-pulse"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Top Ticker Pill */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400 dark:border-amber-500/30 bg-amber-100/90 dark:bg-amber-500/10 px-4 py-1.5 text-xs font-mono text-amber-950 dark:text-amber-400 font-bold backdrop-blur-md shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            <span>🔥 98.4% BCA Pass Rate · 12,450+ Students Crushing Exams · Zero Backlogs</span>
          </div>
        </div>

        {/* High-Impact Punchy Headline */}
        <div className="mt-6 text-center space-y-4">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.04] max-w-4xl mx-auto">
            From{" "}
            <span className="line-through text-slate-400 dark:text-muted-foreground/60 decoration-rose-500 decoration-wavy decoration-2 sm:decoration-3">
              "Pass Kaise Honge?"
            </span>{" "}
            <br className="hidden sm:inline" />
            To{" "}
            <span className="text-amber-600 dark:text-amber-400">
              9.2 CGPA
            </span>{" "}
            Without The Panic.
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-slate-700 dark:text-muted-foreground mx-auto leading-relaxed font-sans font-normal">
            Stop drowning in 50 messy WhatsApp PDFs at 3 AM. 100% NEP 2020 syllabus-aligned notes, 5-year
            solved university papers, and 5-minute bite-sized lessons that actually stick.
          </p>
        </div>

        {/* Quick HUD Badges Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 rounded-full border border-amber-300/90 dark:border-amber-500/30 bg-amber-100/90 dark:bg-amber-500/10 px-3.5 py-1 text-amber-950 dark:text-amber-400 font-bold shadow-2xs">
            <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span>6 Semesters Unlocked</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-violet-300/90 dark:border-violet-500/30 bg-violet-100/90 dark:bg-violet-500/10 px-3.5 py-1 text-violet-950 dark:text-violet-400 font-bold shadow-2xs">
            <Zap className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
            <span>5-Year Solved PYQs</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-300/90 dark:border-emerald-500/30 bg-emerald-100/90 dark:bg-emerald-500/10 px-3.5 py-1 text-emerald-950 dark:text-emerald-400 font-bold shadow-2xs">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>100% Free Forever</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-sky-300/90 dark:border-sky-500/30 bg-sky-100/90 dark:bg-sky-500/10 px-3.5 py-1 text-sky-950 dark:text-sky-400 font-bold shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
            <span>Sparky AI Companion</span>
          </div>
        </div>

        {/* 🎮 THE CENTERPIECE: THE BCA EXAM RESCUE MACHINE (INTERACTIVE HUD DECK) */}
        <div className="hud-card neon-glow-amber rounded-3xl p-5 sm:p-8 max-w-4xl mx-auto mt-10 transition-all relative">
          {/* HUD Top Bar: Sparky Mascot & Streak HUD */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/90 dark:border-border/60 pb-5">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <picture>
                  <source srcSet="/images/landing/sparky-hero.webp" type="image/webp" />
                  <img
                    src="/images/landing/sparky-hero.jpg"
                    alt="Sparky Study Pal"
                    decoding="async"
                    className="h-13 w-13 rounded-2xl object-cover ring-2 ring-amber-500/40 shadow-lg group-hover:scale-105 transition-transform"
                  />
                </picture>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white shadow-xs">
                  ✓
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-slate-900 dark:text-foreground">
                    Sparky the Study Pal
                  </span>
                  <Badge variant="outline" className="font-mono text-[10px] text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-500/30 bg-amber-100/80 dark:bg-amber-500/10 font-bold">
                    Exam Rescue Online
                  </Badge>
                </div>
                <p className="text-xs text-slate-700 dark:text-muted-foreground mt-0.5 font-sans font-medium">
                  Pick your semester below to reveal high-yield exam predictions & launch Unit 1!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-amber-300 dark:border-amber-500/20 bg-amber-100/70 dark:bg-amber-500/5 px-3 py-1 text-xs font-mono text-amber-950 dark:text-amber-400 font-bold shadow-2xs">
                <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                <span>7-Day Streak · 420 XP</span>
              </div>

              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handlePetSparky}
                className="btn-squishy rounded-xl text-xs font-bold border-amber-300 dark:border-amber-500/30 text-amber-950 dark:text-amber-400 bg-amber-100/70 dark:bg-transparent hover:bg-amber-200/90 dark:hover:bg-amber-500/10 active:scale-95 transition-all cursor-pointer shadow-2xs"
                title="Pet Sparky to gain XP & celebratory confetti"
              >
                <Heart className="h-3.5 w-3.5 mr-1 fill-amber-500 text-amber-500" />
                {sparkyPets > 0 ? `Petted (${sparkyPets})` : "Pet Sparky (+5 XP)"}
              </Button>
            </div>
          </div>

          {/* 6 Semester Selector Grid */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold uppercase tracking-wider text-slate-900 dark:text-primary">
                1. Select Your Degree Semester:
              </span>
              <a
                href="#curriculum-roadmap"
                className="text-primary hover:underline font-mono text-[11px] font-semibold hidden sm:inline-flex items-center gap-1"
              >
                <span>Explore 6-Semester Degree Roadmap</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => handleSelectSemester(num)}
                  className={cn(
                    "hud-chip flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl border font-mono text-xs font-bold transition-all cursor-pointer",
                    chosenSemester === num
                      ? "border-amber-500 bg-amber-500/20 text-amber-950 dark:text-amber-400 shadow-md ring-2 ring-amber-500/40 scale-[1.02]"
                      : "border-slate-300 dark:border-border/70 bg-white dark:bg-card/60 hover:bg-slate-100 dark:hover:bg-muted/60 text-slate-800 dark:text-muted-foreground hover:text-slate-950 dark:hover:text-foreground shadow-2xs",
                  )}
                >
                  <span className="text-sm font-display font-extrabold">Sem {num}</span>
                  <span className="text-[10px] opacity-80 mt-0.5">
                    {chosenSemester === num ? "Active" : "Select"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subject Switcher Chips inside Selected Semester */}
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-800 dark:text-muted-foreground uppercase">
                2. Choose Subject ({currentSem.tagline}):
              </span>
              <Badge variant="outline" className="font-mono text-[10px] border-slate-300 dark:border-border text-slate-800 dark:text-foreground font-semibold">
                {currentSem.badge}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {currentSem.subjects.map((subj, idx) => (
                <button
                  type="button"
                  key={subj.code}
                  onClick={() => handleSelectSubject(idx)}
                  className={cn(
                    "btn-squishy px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs",
                    chosenSubjectIdx === idx
                      ? "border-amber-500 dark:border-primary bg-amber-100/90 dark:bg-primary/10 text-amber-950 dark:text-primary ring-1 ring-amber-500/40 font-bold"
                      : "border-slate-300 dark:border-border/70 bg-white dark:bg-card hover:bg-slate-100 dark:hover:bg-muted/70 text-slate-800 dark:text-muted-foreground hover:text-slate-950 dark:hover:text-foreground font-semibold",
                  )}
                >
                  <span className="font-mono font-bold">{subj.code}</span>
                  <span>{subj.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3 Interactive Power Tabs for the Chosen Subject: 1. Predict -> 2. Diagnose -> 3. Score */}
          <div className="mt-6 rounded-2xl border border-slate-200 dark:border-border/80 bg-slate-50/80 dark:bg-surface-muted/30 p-4 sm:p-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-border/60 pb-3">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-card border border-slate-300/80 dark:border-border/60 shadow-2xs">
                <button
                  type="button"
                  onClick={() => {
                    setHudTab("intel");
                    playPopSound();
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                    hudTab === "intel"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-slate-600 dark:text-muted-foreground hover:text-slate-950 dark:hover:text-foreground",
                  )}
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>Step 1: Predict (Intel)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setHudTab("quiz");
                    playPopSound();
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                    hudTab === "quiz"
                      ? "bg-amber-500 text-white shadow-xs"
                      : "text-slate-600 dark:text-muted-foreground hover:text-slate-950 dark:hover:text-foreground",
                  )}
                >
                  <Flame className="h-3.5 w-3.5" />
                  <span>Step 2: Diagnose (30s Quiz)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setHudTab("blueprint");
                    playPopSound();
                  }}
                  className={cn(
                    "hidden sm:flex px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer items-center gap-1.5",
                    hudTab === "blueprint"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 dark:text-muted-foreground hover:text-slate-950 dark:hover:text-foreground",
                  )}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Step 3: Score 15/15 (Blueprint)</span>
                </button>
              </div>

              <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-bold hidden sm:inline">
                {currentSubj.marksYield}
              </span>
            </div>

            {/* TAB 1: EXAM RESCUE INTEL */}
            {hudTab === "intel" && (
              <div className="pt-4 space-y-4 animate-in fade-in duration-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-800 dark:text-amber-400">
                      {currentSubj.code} · HIGH-YIELD TOPIC
                    </span>
                    <Badge variant="outline" className="text-[10px] text-slate-700 dark:text-muted-foreground border-slate-300 dark:border-border font-semibold">
                      {currentSubj.frequency}
                    </Badge>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mt-1">
                    {currentSubj.highYieldTopic}
                  </h3>
                </div>

                {/* Sparky Speech Bubble */}
                <div className="flex items-start gap-3 rounded-2xl border border-amber-300 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-500/5 p-4 text-xs shadow-2xs">
                  <SparkyAvatar size={38} mood="celebrating" className="shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-bold text-amber-800 dark:text-amber-400 uppercase text-[10px]">
                      Sparky's Exam Hack
                    </span>
                    <p className="mt-1 text-xs text-slate-800 dark:text-foreground leading-relaxed font-sans font-medium">
                      "{currentSubj.sparkyQuote}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DIAGNOSTIC QUIZ */}
            {hudTab === "quiz" && (
              <div className="pt-4 space-y-3.5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-primary">
                    Unit 1 Quick Check · {currentSubj.code}
                  </span>
                  <span className="font-mono text-amber-800 dark:text-amber-400 font-bold">+20 XP Available</span>
                </div>

                <p className="text-sm font-bold text-slate-900 dark:text-foreground leading-snug">
                  {currentSubj.quiz.question}
                </p>

                <div className="grid gap-2">
                  {currentSubj.quiz.options.map((opt) => {
                    const isSelected = selectedQuizOption === opt.id;
                    const isCorrect = opt.correct;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={cn(
                          "btn-squishy flex items-center justify-between rounded-xl p-3 text-xs font-semibold text-left transition-all border cursor-pointer shadow-2xs",
                          isSelected && isCorrect
                            ? "border-emerald-600 bg-emerald-100/90 dark:bg-emerald-500/10 text-emerald-950 dark:text-foreground ring-1 ring-emerald-500/40 font-bold"
                            : isSelected && !isCorrect
                              ? "border-rose-600 bg-rose-100/90 dark:bg-rose-500/10 text-rose-950 dark:text-foreground ring-1 ring-rose-500/40 font-bold"
                              : "border-slate-300 dark:border-border/70 bg-white dark:bg-card hover:bg-slate-100 dark:hover:bg-muted/60 text-slate-800 dark:text-foreground font-semibold",
                        )}
                      >
                        <span className="font-semibold">{opt.text}</span>
                        {isSelected && isCorrect && (
                          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-500 shrink-0 ml-1 stroke-[3]" />
                        )}
                        {isSelected && !isCorrect && (
                          <X className="h-4 w-4 text-rose-600 dark:text-rose-500 shrink-0 ml-1 stroke-[3]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedQuizOption !== null && (
                  <div className="flex items-start gap-3 rounded-2xl border border-indigo-200 dark:border-primary/25 bg-indigo-50/90 dark:bg-primary/5 p-3.5 text-xs text-slate-900 dark:text-foreground animate-in fade-in shadow-2xs">
                    <SparkyAvatar
                      size={34}
                      mood={
                        currentSubj.quiz.options.find((o) => o.id === selectedQuizOption)?.correct
                          ? "celebrating"
                          : "thinking"
                      }
                      className="shrink-0 mt-0.5"
                    />
                    <div>
                      <span className="font-mono text-[10px] font-bold text-indigo-900 dark:text-primary uppercase block">
                        {currentSubj.quiz.options.find((o) => o.id === selectedQuizOption)?.correct
                          ? "🎉 Correct! +20 XP Claimed!"
                          : "💡 Sparky's Rapid Revision"}
                      </span>
                      <p className="mt-0.5 text-xs text-slate-800 dark:text-muted-foreground leading-relaxed font-sans font-medium">
                        {currentSubj.quiz.tip}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: 15-MARK BLUEPRINT */}
            {hudTab === "blueprint" && (
              <div className="pt-4 space-y-3 animate-in fade-in duration-200">
                <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase">
                  How to Score Full 15/15 Marks in {currentSubj.code}:
                </span>
                <div className="grid gap-2 sm:grid-cols-2">
                  {currentSubj.blueprint.map((step, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-300 dark:border-border/70 bg-white dark:bg-card p-3 text-xs font-semibold text-slate-900 dark:text-foreground flex items-center gap-2 shadow-2xs"
                    >
                      <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Console Launch Action Footer */}
          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-muted-foreground font-sans font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Free Guest Access · Zero login required to read Unit 1</span>
            </div>

            {loading ? (
              <div className="h-12 w-56 animate-pulse rounded-2xl bg-muted" />
            ) : user ? (
              <Button
                asChild
                size="lg"
                className="btn-squishy btn-cta h-12 px-8 text-sm font-bold rounded-xl cursor-pointer w-full sm:w-auto"
              >
                <Link to="/dashboard">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className="btn-squishy btn-cta h-12 px-8 text-sm font-bold rounded-xl cursor-pointer w-full sm:w-auto"
              >
                <Link
                  to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                  params={{
                    courseSlug: "bca",
                    semesterNumber: String(chosenSemester),
                    subjectSlug: currentSubj.slug,
                    unitNumber: "1",
                  }}
                >
                  <Play className="mr-2 h-4 w-4 fill-current" />
                  Launch Semester {chosenSemester} (Unit 1 Free)
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 2. Interactive "How to Start" Guided Walkthrough */

export function InteractiveStartGuide() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [chosenSemester, setChosenSemester] = useState<number>(1);
  const [chosenSubject, setChosenSubject] = useState<{
    code: string;
    title: string;
    slug: string;
    unitsCount: number;
  }>({
    code: "BCA-101N",
    title: "Computer Fundamentals and PC Software",
    slug: "computer-fundamentals-and-pc-software-theory",
    unitsCount: 5,
  });

  const semesterSubjectMap: Record<
    number,
    Array<{ code: string; title: string; slug: string; unitsCount: number }>
  > = {
    1: [
      {
        code: "BCA-101N",
        title: "Computer Fundamentals & PC Software",
        slug: "computer-fundamentals-and-pc-software-theory",
        unitsCount: 5,
      },
      {
        code: "BCA-103N",
        title: "Programming with C Theory",
        slug: "programming-with-c-theory",
        unitsCount: 5,
      },
      {
        code: "BCA-105N",
        title: "Basic Mathematics",
        slug: "basic-mathematics",
        unitsCount: 5,
      },
    ],
    2: [
      {
        code: "BCA-201N",
        title: "Data Structures Using C",
        slug: "data-structures-using-c",
        unitsCount: 5,
      },
      {
        code: "BCA-203N",
        title: "OOP with C++",
        slug: "object-oriented-programming-with-c",
        unitsCount: 5,
      },
      {
        code: "BCA-205N",
        title: "Digital Electronics",
        slug: "digital-electronics",
        unitsCount: 5,
      },
    ],
    3: [
      {
        code: "BCA-301N",
        title: "Core Java Programming",
        slug: "core-java-programming",
        unitsCount: 5,
      },
      {
        code: "BCA-302N",
        title: "Computer Networks",
        slug: "computer-networks",
        unitsCount: 5,
      },
      {
        code: "BCA-303N",
        title: "Operating Systems",
        slug: "operating-systems",
        unitsCount: 5,
      },
    ],
    4: [
      {
        code: "BCA-401N",
        title: "DBMS & SQL Architecture",
        slug: "database-management-systems",
        unitsCount: 5,
      },
      {
        code: "BCA-402N",
        title: "Web Technologies & Design",
        slug: "web-technologies",
        unitsCount: 5,
      },
      {
        code: "BCA-403N",
        title: "Software Engineering",
        slug: "software-engineering",
        unitsCount: 5,
      },
    ],
    5: [
      {
        code: "BCA-501N",
        title: "Python Programming",
        slug: "python-programming",
        unitsCount: 5,
      },
      {
        code: "BCA-502N",
        title: "Artificial Intelligence & ML",
        slug: "artificial-intelligence",
        unitsCount: 5,
      },
      {
        code: "BCA-503N",
        title: "Cloud Computing",
        slug: "cloud-computing",
        unitsCount: 5,
      },
    ],
    6: [
      {
        code: "BCA-601N",
        title: "Information & Cyber Security",
        slug: "information-security",
        unitsCount: 5,
      },
      {
        code: "BCA-602N",
        title: "E-Commerce & Digital Marketing",
        slug: "e-commerce",
        unitsCount: 5,
      },
      {
        code: "BCA-603N",
        title: "Major Capstone Project",
        slug: "major-project",
        unitsCount: 4,
      },
    ],
  };

  const handleSelectSemester = (sem: number) => {
    setChosenSemester(sem);
    const firstSubject = semesterSubjectMap[sem]?.[0];
    if (firstSubject) setChosenSubject(firstSubject);
    setActiveStep(2);
    playPopSound();
  };

  const handleSelectSubject = (subj: {
    code: string;
    title: string;
    slug: string;
    unitsCount: number;
  }) => {
    setChosenSubject(subj);
    setActiveStep(3);
    playPopSound();
  };

  return (
    <section id="how-to-start" className="border-b border-border/60 bg-surface-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Compass className="h-3.5 w-3.5" />
            <span>Interactive Student Onboarding</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground">
            Where to Click & How to Start
          </h2>
          <p className="text-sm text-muted-foreground">
            You don't need a tutorial. Pick your semester, tap your subject, and start reading 5-minute units immediately.
          </p>
        </div>

        {/* 3 Step Visual Progression Bar */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
          <div
            onClick={() => setActiveStep(1)}
            className={cn(
              "flex items-center gap-3 rounded-2xl border p-4 transition-all cursor-pointer",
              activeStep === 1
                ? "border-primary bg-card shadow-md ring-2 ring-primary/20"
                : "border-border/70 bg-card/60 opacity-80 hover:opacity-100",
            )}
          >
            <div
              className={cn(
                "h-8 w-8 rounded-xl flex items-center justify-center font-bold text-xs",
                activeStep === 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-muted text-muted-foreground",
              )}
            >
              1
            </div>
            <div>
              <span className="font-display text-xs font-bold text-foreground block">
                Choose Semester
              </span>
              <span className="text-[11px] text-muted-foreground">
                Currently: Sem {chosenSemester}
              </span>
            </div>
          </div>

          <div
            onClick={() => setActiveStep(2)}
            className={cn(
              "flex items-center gap-3 rounded-2xl border p-4 transition-all cursor-pointer",
              activeStep === 2
                ? "border-primary bg-card shadow-md ring-2 ring-primary/20"
                : "border-border/70 bg-card/60 opacity-80 hover:opacity-100",
            )}
          >
            <div
              className={cn(
                "h-8 w-8 rounded-xl flex items-center justify-center font-bold text-xs",
                activeStep === 2
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-muted text-muted-foreground",
              )}
            >
              2
            </div>
            <div>
              <span className="font-display text-xs font-bold text-foreground block">
                Select Subject
              </span>
              <span className="text-[11px] text-muted-foreground truncate max-w-[150px] block">
                {chosenSubject.code}
              </span>
            </div>
          </div>

          <div
            onClick={() => setActiveStep(3)}
            className={cn(
              "flex items-center gap-3 rounded-2xl border p-4 transition-all cursor-pointer",
              activeStep === 3
                ? "border-primary bg-card shadow-md ring-2 ring-primary/20"
                : "border-border/70 bg-card/60 opacity-80 hover:opacity-100",
            )}
          >
            <div
              className={cn(
                "h-8 w-8 rounded-xl flex items-center justify-center font-bold text-xs",
                activeStep === 3
                  ? "bg-emerald-600 text-white"
                  : "bg-surface-muted text-muted-foreground",
              )}
            >
              3
            </div>
            <div>
              <span className="font-display text-xs font-bold text-foreground block">
                Launch & Study
              </span>
              <span className="text-[11px] text-muted-foreground">
                5-Min Bite-Sized Cards
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Stage Card */}
        <div className="mt-8 rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xl max-w-4xl mx-auto">
          {activeStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-primary uppercase">
                    Step 1 of 3: Select Your Degree Semester
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground mt-0.5">
                    Which semester are you preparing for?
                  </h3>
                </div>
                <Badge variant="outline" className="font-mono text-[10px]">
                  All 6 Semesters Free
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => handleSelectSemester(num)}
                    className={cn(
                      "btn-squishy flex flex-col items-center justify-center p-4 rounded-2xl border transition-all cursor-pointer",
                      chosenSemester === num
                        ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/30"
                        : "border-border/80 bg-surface-muted/40 hover:bg-muted/60 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="font-display text-lg font-bold">Sem {num}</span>
                    <span className="text-[10px] text-muted-foreground mt-1">Tap to select</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-primary uppercase">
                    Step 2 of 3: Choose Your Subject
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground mt-0.5">
                    Select a subject in Semester {chosenSemester}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="text-xs text-primary hover:underline font-mono"
                >
                  ← Change Semester
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 pt-2">
                {semesterSubjectMap[chosenSemester]?.map((s) => (
                  <button
                    type="button"
                    key={s.code}
                    onClick={() => handleSelectSubject(s)}
                    className={cn(
                      "btn-squishy text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between",
                      chosenSubject.code === s.code
                        ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                        : "border-border/80 bg-surface-muted/40 hover:bg-muted/60 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-primary block">
                        {s.code}
                      </span>
                      <h4 className="font-display text-sm font-bold text-foreground mt-1">
                        {s.title}
                      </h4>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{s.unitsCount} Units · Solved PYQs</span>
                      <ChevronRight className="h-3.5 w-3.5 text-primary" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    Step 3 of 3: You're Ready to Launch!
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground mt-0.5">
                    {chosenSubject.title} ({chosenSubject.code})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="text-xs text-primary hover:underline font-mono"
                >
                  ← Change Subject
                </button>
              </div>

              {/* Action Cards */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-primary/40 bg-primary/5 p-4 flex flex-col justify-between">
                  <div>
                    <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span className="font-display font-bold text-sm text-foreground block">
                      Bite-Sized Lessons
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      Interactive 5-minute concept cards with analogies & Sparky.
                    </p>
                  </div>
                  <Badge variant="outline" className="mt-4 w-fit text-[10px] text-primary border-primary/30">
                    Recommended Start
                  </Badge>
                </div>

                <div className="rounded-2xl border border-border/70 bg-card p-4 flex flex-col justify-between">
                  <div>
                    <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
                      <Zap className="h-4 w-4" />
                    </div>
                    <span className="font-display font-bold text-sm text-foreground block">
                      3-Min Diagnostic Quiz
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      Spot conceptual weak spots before exam night.
                    </p>
                  </div>
                  <Badge variant="outline" className="mt-4 w-fit text-[10px] text-amber-500 border-amber-500/30">
                    Instant Score
                  </Badge>
                </div>

                <div className="rounded-2xl border border-border/70 bg-card p-4 flex flex-col justify-between">
                  <div>
                    <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <span className="font-display font-bold text-sm text-foreground block">
                      Full Examination Notes
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      LaTeX formulas, diagrams & 15-mark solved questions.
                    </p>
                  </div>
                  <Badge variant="outline" className="mt-4 w-fit text-[10px] text-emerald-500 border-emerald-500/30">
                    Printable Format
                  </Badge>
                </div>
              </div>

              {/* Big High-Converting Launch Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-border/50">
                <span className="text-xs text-muted-foreground font-sans">
                  No login required. Click launch to open Unit 1 immediately.
                </span>

                <Button
                  asChild
                  size="lg"
                  className="btn-squishy btn-cta h-12 px-8 rounded-xl font-bold cursor-pointer w-full sm:w-auto"
                >
                  <Link
                    to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                    params={{
                      courseSlug: "bca",
                      semesterNumber: String(chosenSemester),
                      subjectSlug: chosenSubject.slug,
                      unitNumber: "1",
                    }}
                  >
                    Launch Unit 1 Free <Play className="ml-2 h-4 w-4 fill-current" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 3. Direct Semester Access Strip */

export function ValueStrip() {
  const realms = [
    {
      num: 1,
      realm: "Citadel of Fundamentals",
      note: "C Theory, PC Software & Mathematics",
      icon: Code2,
      xp: "+50 XP Free Quest",
      glow: "hover:border-amber-500/50 hover:shadow-amber-500/10",
      accent: "text-amber-800 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/10",
      badgeClass: "text-amber-900 border-amber-300 bg-amber-100/70 dark:text-amber-400 dark:border-amber-500/30 dark:bg-amber-500/10",
    },
    {
      num: 2,
      realm: "The Algorithmic Forge",
      note: "Data Structures, C++ & Digital Logic",
      icon: Cpu,
      xp: "+50 XP Free Quest",
      glow: "hover:border-sky-500/50 hover:shadow-sky-500/10",
      accent: "text-sky-800 bg-sky-100 dark:text-sky-400 dark:bg-sky-500/10",
      badgeClass: "text-sky-900 border-sky-300 bg-sky-100/70 dark:text-sky-400 dark:border-sky-500/30 dark:bg-sky-500/10",
    },
    {
      num: 3,
      realm: "Network & Java Spire",
      note: "Core Java, Computer Networks & OS",
      icon: Globe,
      xp: "+50 XP Free Quest",
      glow: "hover:border-violet-500/50 hover:shadow-violet-500/10",
      accent: "text-violet-800 bg-violet-100 dark:text-violet-400 dark:bg-violet-500/10",
      badgeClass: "text-violet-900 border-violet-300 bg-violet-100/70 dark:text-violet-400 dark:border-violet-500/30 dark:bg-violet-500/10",
    },
    {
      num: 4,
      realm: "Database & Web Sanctum",
      note: "DBMS & SQL, Web Technologies & SE",
      icon: Terminal,
      xp: "+50 XP Free Quest",
      glow: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
      accent: "text-emerald-800 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10",
      badgeClass: "text-emerald-900 border-emerald-300 bg-emerald-100/70 dark:text-emerald-400 dark:border-emerald-500/30 dark:bg-emerald-500/10",
    },
    {
      num: 5,
      realm: "Intelligence & Python Summit",
      note: "Python Programming, AI/ML & Cloud",
      icon: Sparkles,
      xp: "+50 XP Free Quest",
      glow: "hover:border-rose-500/50 hover:shadow-rose-500/10",
      accent: "text-rose-800 bg-rose-100 dark:text-rose-400 dark:bg-rose-500/10",
      badgeClass: "text-rose-900 border-rose-300 bg-rose-100/70 dark:text-rose-400 dark:border-rose-500/30 dark:bg-rose-500/10",
    },
    {
      num: 6,
      realm: "Capstone & Cyber Fortress",
      note: "Cyber Security, E-Commerce & Projects",
      icon: ShieldCheck,
      xp: "+50 XP Free Quest",
      glow: "hover:border-amber-500/50 hover:shadow-amber-500/10",
      accent: "text-amber-800 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/10",
      badgeClass: "text-amber-900 border-amber-300 bg-amber-100/70 dark:text-amber-400 dark:border-amber-500/30 dark:bg-amber-500/10",
    },
  ];

  return (
    <section id="semesters" className="border-b border-border/60 bg-surface-muted/20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-mono text-primary font-bold">
              <Trophy className="h-3.5 w-3.5" />
              <span>All 6 Degree Semesters Unlocked</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-black text-foreground mt-2">
              Pick Your Quest Realm. Crush Your Exam.
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-muted-foreground font-sans font-medium mt-1">
              100% University syllabus aligned. Complete notes, 5-year solved papers, and bite-sized units.
            </p>
          </div>

          <Link
            to="/courses"
            className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 self-start sm:self-auto font-mono"
          >
            Explore all 32 subjects <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {realms.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.num}
                to="/courses/$courseSlug/$semesterNumber"
                params={{ courseSlug: "bca", semesterNumber: String(r.num) }}
                className={cn(
                  "hud-card btn-squishy group flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 border border-slate-200 dark:border-border/80 bg-white dark:bg-card cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1",
                  r.glow,
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs", r.accent)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-display text-base font-extrabold text-slate-900 dark:text-foreground group-hover:text-primary transition-colors block">
                          Semester {r.num}
                        </span>
                        <span className="font-mono text-[11px] text-slate-600 dark:text-muted-foreground font-semibold">
                          {r.realm}
                        </span>
                      </div>
                    </div>

                    <Badge variant="outline" className={cn("font-mono text-[10px] font-bold whitespace-nowrap shrink-0 shadow-2xs", r.badgeClass)}>
                      {r.xp}
                    </Badge>
                  </div>

                  <p className="mt-4 text-xs text-slate-700 dark:text-muted-foreground leading-relaxed font-sans font-medium">
                    {r.note}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-border/50 flex items-center justify-between text-xs font-bold text-primary">
                  <span>Enter Realm & Solve PYQs</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 4. The 3 Core Pillars with 3D Assets */

export function TheProblem() {
  const [activeTab, setActiveTab] = useState<"notes" | "quizzes" | "gamification">("notes");
  const [xpSimDays, setXpSimDays] = useState(5);

  const calculatedXP = xpSimDays * 55 + 120;
  const currentSimLevel =
    calculatedXP > 500 ? "Level 3: Logic Specialist" : calculatedXP > 250 ? "Level 2: BCA Apprentice" : "Level 1: Novice";

  return (
    <section id="how-it-works" className="border-b border-border/60 bg-surface-muted/20 py-16 sm:py-24 relative">
      {/* Anchor targets */}
      <div id="interactive-pillars" className="absolute -top-20" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
            The XRounder Study System
          </span>
          <h2 className="font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Everything you need for exam night. <br />
            <span className="text-primary italic">Nothing you don't.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-muted-foreground leading-relaxed font-sans font-medium">
            Ditch disorganized WhatsApp PDFs. XRounder pairs concise university notes with gamified
            diagnostic quizzes so you always know where you stand.
          </p>

          {/* Interactive Pillars Navigation Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-surface-muted/90 border border-slate-200 dark:border-border/70 mt-4 shadow-2xs">
            <button
              type="button"
              onClick={() => {
                setActiveTab("notes");
                playPopSound();
              }}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer",
                activeTab === "notes" ? "bg-white dark:bg-card text-slate-900 dark:text-foreground shadow-xs font-bold" : "text-slate-700 dark:text-muted-foreground hover:text-slate-950 dark:hover:text-foreground font-semibold",
              )}
            >
              📖 Exam Blueprint Notes
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("quizzes");
                playPopSound();
              }}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer",
                activeTab === "quizzes" ? "bg-white dark:bg-card text-slate-900 dark:text-foreground shadow-xs font-bold" : "text-slate-700 dark:text-muted-foreground hover:text-slate-950 dark:hover:text-foreground font-semibold",
              )}
            >
              ⚡ Diagnostic Testing
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("gamification");
                playPopSound();
              }}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer",
                activeTab === "gamification" ? "bg-white dark:bg-card text-slate-900 dark:text-foreground shadow-xs font-bold" : "text-slate-700 dark:text-muted-foreground hover:text-slate-950 dark:hover:text-foreground font-semibold",
              )}
            >
              🏆 XP & Badges
            </button>
          </div>
        </div>

        {/* Dynamic Pillar Tab Content */}
        <div className="mt-12">
          {activeTab === "notes" && (
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center rounded-3xl border border-slate-200 dark:border-border/80 bg-white dark:bg-card p-6 sm:p-10 shadow-lg">
              <div className="lg:col-span-6 space-y-5">
                <Badge variant="outline" className="font-mono text-xs font-bold text-primary border-primary/30 bg-primary/5">
                  Pillar 1: Publication-Grade Notes
                </Badge>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-foreground">
                  Written for 15-Mark Answers & Quick Revision
                </h3>
                <p className="text-sm text-slate-700 dark:text-muted-foreground leading-relaxed font-sans font-medium">
                  No 400-page textbook filler. Every unit note is structured with LaTeX mathematical
                  formulas, syntax-highlighted code snippets, clean architectural diagrams, and
                  university exam takeaways.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-2xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-surface-muted/40 p-3.5 shadow-2xs">
                    <span className="font-display font-bold text-slate-900 dark:text-foreground text-sm block">
                      5-Min Cheat Sheets
                    </span>
                    <span className="text-xs text-slate-700 dark:text-muted-foreground font-sans font-medium">
                      Key definitions, differences & diagrams ready to memorize.
                    </span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-surface-muted/40 p-3.5 shadow-2xs">
                    <span className="font-display font-bold text-slate-900 dark:text-foreground text-sm block">
                      5-Year PYQs Solved
                    </span>
                    <span className="text-xs text-slate-700 dark:text-muted-foreground font-sans font-medium">
                      Past university exam questions mapped unit-by-unit.
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-2xl font-bold cursor-pointer bg-primary text-white hover:brightness-105"
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
                      Read Unit 1 Notes Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-border/80 shadow-2xl group">
                  <picture>
                    <source srcSet="/images/landing/exam-notebook.webp" type="image/webp" />
                    <img
                      src="/images/landing/exam-notebook.jpg"
                      alt="University Examination Notebook with 100/100 Grade"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </picture>
                </div>
                <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border/80 p-3.5 shadow-xl flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-500 flex items-center justify-center font-bold text-lg">
                    💯
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 dark:text-foreground block">Exam-Ready Precision</span>
                    <span className="text-slate-600 dark:text-muted-foreground font-sans">NEP 2020 syllabus validated</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "quizzes" && (
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center rounded-3xl border border-slate-200 dark:border-border/80 bg-white dark:bg-card p-6 sm:p-10 shadow-lg">
              <div className="lg:col-span-6 space-y-5">
                <Badge variant="outline" className="font-mono text-xs font-bold text-amber-800 dark:text-amber-400 border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-transparent">
                  Pillar 2: Diagnostic Gap Spotting
                </Badge>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-foreground">
                  Know Exactly What to Revise in 3 Minutes
                </h3>
                <p className="text-sm text-slate-700 dark:text-muted-foreground leading-relaxed font-sans font-medium">
                  Taking a 3-minute quiz before exam night tells you what you actually remember.
                  Sparky flags your conceptual errors and prescribes a 2-minute targeted revision task
                  before you sit for the exam.
                </p>

                <div className="space-y-2.5 font-sans">
                  <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-muted-foreground font-medium">
                    <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-500 flex items-center justify-center font-bold shrink-0">
                      ✓
                    </div>
                    <span>Instant score calculation with passing criteria (70%+ passing target)</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-muted-foreground font-medium">
                    <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-500 flex items-center justify-center font-bold shrink-0">
                      ✓
                    </div>
                    <span>Detailed explanation for every single answer option</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-muted-foreground font-medium">
                    <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-500 flex items-center justify-center font-bold shrink-0">
                      ✓
                    </div>
                    <span>Negative marking mode for realistic exam simulation</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-2xl font-bold cursor-pointer bg-amber-500 text-white hover:bg-amber-600"
                  >
                    <Link to="/courses/$courseSlug" params={{ courseSlug: "bca" }}>
                      Take a Practice Quiz <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-slate-200 dark:border-border/80 bg-slate-50 dark:bg-surface-muted/60 p-6 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase text-primary">
                      Diagnostic Evaluation Simulation
                    </span>
                    <span className="font-mono text-xs text-emerald-700 dark:text-emerald-500 font-bold">Passed (85%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 dark:bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[85%]" />
                  </div>
                  <div className="rounded-xl bg-white dark:bg-card border border-slate-200 dark:border-border/70 p-4 flex items-center gap-3 shadow-xs">
                    <SparkyAvatar size={42} mood="celebrating" />
                    <div className="text-xs">
                      <span className="font-bold text-slate-900 dark:text-foreground block">
                        Sparky's Assessment: Exam Ready!
                      </span>
                      <p className="text-slate-700 dark:text-muted-foreground mt-0.5 font-sans font-medium">
                        Strong grasp of Unit 1. Revise 'Generation Differences' once to lock in 100%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "gamification" && (
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center rounded-3xl border border-slate-200 dark:border-border/80 bg-white dark:bg-card p-6 sm:p-10 shadow-lg">
              <div className="lg:col-span-6 space-y-5">
                <Badge variant="outline" className="font-mono text-xs font-bold text-violet-800 dark:text-violet-400 border-violet-300 dark:border-violet-500/30 bg-violet-50 dark:bg-transparent">
                  Pillar 3: Gamification & Dopamine Loop
                </Badge>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-foreground">
                  Turn Study Hours Into a Level-Up Quest
                </h3>
                <p className="text-sm text-slate-700 dark:text-muted-foreground leading-relaxed font-sans font-medium">
                  Earn XP for reading notes, conquering quizzes, and safeguarding your daily study streak.
                  Level up from *Curious Novice* to *Grand Academician* and collect rare badges.
                </p>

                {/* Interactive Streak Simulator Slider */}
                <div className="rounded-2xl border border-slate-200 dark:border-border/80 bg-slate-50 dark:bg-surface-muted/40 p-4 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-foreground">
                    <span>Simulate Daily Study Streak:</span>
                    <span className="font-mono text-primary font-bold">{xpSimDays} Days Active</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={xpSimDays}
                    onChange={(e) => {
                      setXpSimDays(Number(e.target.value));
                      playPopSound();
                    }}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-border/50 text-xs">
                    <span className="font-mono text-slate-600 dark:text-muted-foreground font-semibold">{currentSimLevel}</span>
                    <span className="font-mono font-bold text-amber-800 dark:text-amber-400">+{calculatedXP} XP Earned</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="btn-squishy btn-cta rounded-xl font-bold cursor-pointer"
                  >
                    <Link to="/courses/$courseSlug" params={{ courseSlug: "bca" }}>
                      Join the Quest <Trophy className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-border/80 shadow-2xl group">
                  <picture>
                    <source srcSet="/images/landing/trophy-gamification.webp" type="image/webp" />
                    <img
                      src="/images/landing/trophy-gamification.jpg"
                      alt="Gamification Trophy with XP Stars and Level Up Flame"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </picture>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 5. The 2 AM WhatsApp Chaos vs XRounder Superpower */

export function ComparisonMatrix() {
  return (
    <section className="border-b border-border/60 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-mono font-bold text-rose-500">
            <span>💀 The 2 AM Exam Night Reality Check</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-foreground">
            Why 50 WhatsApp PDFs Fail BCA Students.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-sans">
            Scrambling through chaotic college WhatsApp groups at 2 AM before exams is a recipe for panic.
            Here is the difference between surviving and scoring 9+ CGPA.
          </p>
        </div>

        {/* 2 Side-by-Side Dual Battle Cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Card 1: The WhatsApp Nightmare */}
          <div className="rounded-3xl border border-rose-300 dark:border-rose-500/30 bg-rose-50/80 dark:bg-rose-950/20 p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-15">
              <X className="h-28 w-28 text-rose-500" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-rose-200 dark:border-rose-500/20 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-rose-700 dark:text-rose-500 uppercase tracking-wider block">
                    The 2 AM Nightmare
                  </span>
                  <span className="font-display text-lg font-bold text-slate-900 dark:text-foreground">
                    "BCA 2024 Exam Help Group"
                  </span>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono font-bold text-rose-700 dark:text-rose-500 border-rose-300 dark:border-rose-500/30 bg-white/80 dark:bg-transparent">
                  99+ Unread
                </Badge>
              </div>

              {/* Realistic College Student Chat Bubbles */}
              <div className="space-y-2.5 pt-2">
                <div className="rounded-2xl rounded-tl-xs bg-white dark:bg-card/70 border border-rose-200/90 dark:border-border/80 p-3.5 text-xs text-slate-900 dark:text-foreground max-w-[88%] shadow-xs">
                  <span className="font-bold text-rose-700 dark:text-rose-400 text-[10px] block font-mono">Rahul (Night before exam, 1:45 AM):</span>
                  <p className="mt-0.5 text-slate-800 dark:text-foreground font-medium font-sans">
                    "Bhai Unit 3 ke notes bhej do koi... please kal subah 9 baje exam hai!"
                  </p>
                </div>

                <div className="rounded-2xl rounded-tl-xs bg-white dark:bg-card/70 border border-rose-200/90 dark:border-border/80 p-3.5 text-xs text-slate-900 dark:text-foreground max-w-[88%] shadow-xs">
                  <span className="font-bold text-amber-800 dark:text-amber-400 text-[10px] block font-mono">Priya (2:12 AM):</span>
                  <p className="mt-0.5 text-slate-800 dark:text-foreground font-medium font-sans">
                    "Ye jo photo bheji hai bohot blurry hai yaar, diagram me labels samajh nahi aa rahe 😭"
                  </p>
                </div>

                <div className="rounded-2xl rounded-tl-xs bg-white dark:bg-card/70 border border-rose-200/90 dark:border-border/80 p-3.5 text-xs text-slate-900 dark:text-foreground max-w-[88%] shadow-xs">
                  <span className="font-bold text-purple-800 dark:text-purple-400 text-[10px] block font-mono">Aman (2:40 AM):</span>
                  <p className="mt-0.5 text-slate-800 dark:text-foreground font-medium font-sans">
                    "Book 480 pages ki hai. Sir ne bola tha 15 marks ka question aayega par notes me page hi gayab hai."
                  </p>
                </div>

                <div className="rounded-2xl rounded-tl-xs bg-white dark:bg-card/70 border border-rose-200/90 dark:border-border/80 p-3.5 text-xs text-slate-900 dark:text-foreground max-w-[88%] shadow-xs">
                  <span className="font-bold text-rose-700 dark:text-rose-400 text-[10px] block font-mono">Karan (3:15 AM):</span>
                  <p className="mt-0.5 text-slate-800 dark:text-foreground font-medium font-sans">
                    "Phone ki battery 11% hai. Subah center ke bahar hi dekhenge kya hoga..."
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-200 dark:border-rose-500/20 flex items-center justify-between text-xs font-mono text-rose-700 dark:text-rose-500 font-bold">
              <span>Result: High Anxiety & Sleep Deprivation</span>
              <span>Passing: Uncertain</span>
            </div>
          </div>

          {/* Card 2: The XRounder Mode */}
          <div className="hud-card neon-glow-amber rounded-3xl border border-amber-400 dark:border-amber-500/40 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden bg-white dark:bg-card">
            <div className="absolute top-0 right-0 p-4 opacity-15">
              <Check className="h-28 w-28 text-emerald-500" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-amber-500/20 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
                    The XRounder Superpower
                  </span>
                  <span className="font-display text-lg font-bold text-slate-900 dark:text-foreground">
                    Exam Domination Room
                  </span>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-transparent">
                  Ready in 5-Mins
                </Badge>
              </div>

              {/* Power Features */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 dark:bg-surface-muted/60 p-3.5 border border-slate-200 dark:border-border/60 shadow-2xs">
                  <div className="h-6 w-6 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <span className="font-display font-bold text-xs text-slate-900 dark:text-foreground block">
                      100% NEP 2020 Syllabus Aligned
                    </span>
                    <span className="text-[11px] text-slate-700 dark:text-muted-foreground font-sans font-medium">
                      Every unit verified against university guidelines. Zero missing topics.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 dark:bg-surface-muted/60 p-3.5 border border-slate-200 dark:border-border/60 shadow-2xs">
                  <div className="h-6 w-6 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <span className="font-display font-bold text-xs text-slate-900 dark:text-foreground block">
                      15-Mark Pre-Formatted Answers
                    </span>
                    <span className="text-[11px] text-slate-700 dark:text-muted-foreground font-sans font-medium">
                      Crisp LaTeX formulas, memory architecture diagrams, and syntax examiners love.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 dark:bg-surface-muted/60 p-3.5 border border-slate-200 dark:border-border/60 shadow-2xs">
                  <div className="h-6 w-6 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <span className="font-display font-bold text-xs text-slate-900 dark:text-foreground block">
                      5-Minute Bite-Sized Lessons
                    </span>
                    <span className="text-[11px] text-slate-700 dark:text-muted-foreground font-sans font-medium">
                      Sparky breaks complex algorithms into bite-sized analogies in plain English.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 dark:bg-surface-muted/60 p-3.5 border border-slate-200 dark:border-border/60 shadow-2xs">
                  <div className="h-6 w-6 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <span className="font-display font-bold text-xs text-slate-900 dark:text-foreground block">
                      3-Minute Diagnostic Checks
                    </span>
                    <span className="text-[11px] text-slate-700 dark:text-muted-foreground font-sans font-medium">
                      Spot exactly what you forgot before exam night and fix it in 2 minutes.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-amber-500/20 flex items-center justify-between text-xs font-mono text-emerald-800 dark:text-emerald-500 font-bold">
              <span>Result: 8 Hours Sleep & 100% Exam Confidence</span>
              <span>Target: 9.2+ CGPA 🏆</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 6. Unified 6-Semester Degree Roadmap & Live Curriculum Explorer */

export interface DegreeRealm {
  num: number;
  realm: string;
  theme: string;
  summary: string;
  icon: typeof Code2;
  credits: string;
  pyqCount: string;
  colorScheme: {
    accent: string;
    border: string;
    bgBadge: string;
    textBadge: string;
    activeGlow: string;
  };
  whyItMatters: string;
  topExamHurdle: string;
}

export const degreeRealms: Record<number, DegreeRealm> = {
  1: {
    num: 1,
    realm: "Citadel of Fundamentals",
    theme: "C Theory, PC Software & Mathematics",
    summary: "Establish pure programming logic, memory architecture, and foundational matrices.",
    icon: Code2,
    credits: "22 Credits",
    pyqCount: "5 Years Solved",
    colorScheme: {
      accent: "text-amber-800 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/10",
      border: "border-amber-500",
      bgBadge: "bg-amber-100/90 dark:bg-amber-500/15",
      textBadge: "text-amber-950 dark:text-amber-300",
      activeGlow: "shadow-amber-500/20",
    },
    whyItMatters:
      "Semester 1 sets your baseline CGPA. C programming pointers and Discrete Math Cramer's rule are high-frequency Section C 15-markers that separate top scorers from backlogs.",
    topExamHurdle: "Pointers & Dynamic Memory (malloc/free) in BCA-103N",
  },
  2: {
    num: 2,
    realm: "The Algorithmic Forge",
    theme: "Data Structures, C++ & Digital Logic",
    summary: "Master trees, stacks, OOP inheritance, and logic gate architectures.",
    icon: Cpu,
    credits: "24 Credits",
    pyqCount: "5 Years Solved",
    colorScheme: {
      accent: "text-sky-800 bg-sky-100 dark:text-sky-400 dark:bg-sky-500/10",
      border: "border-sky-500",
      bgBadge: "bg-sky-100/90 dark:bg-sky-500/15",
      textBadge: "text-sky-950 dark:text-sky-300",
      activeGlow: "shadow-sky-500/20",
    },
    whyItMatters:
      "DSA is the core of technical interviews and BCA's most demanding theoretical exam. Tabular Infix-to-Postfix conversion and BST traversals guarantee 15/15.",
    topExamHurdle: "BST Tree Traversals & Infix-to-Postfix Stacks in BCA-201N",
  },
  3: {
    num: 3,
    realm: "Network & Java Spire",
    theme: "Core Java, Computer Networks & OS",
    summary: "Dive deep into multi-threading, OSI 7-layer stacks, and CPU scheduling algorithms.",
    icon: Globe,
    credits: "22 Credits",
    pyqCount: "5 Years Solved",
    colorScheme: {
      accent: "text-violet-800 bg-violet-100 dark:text-violet-400 dark:bg-violet-500/10",
      border: "border-violet-500",
      bgBadge: "bg-violet-100/90 dark:bg-violet-500/15",
      textBadge: "text-violet-950 dark:text-violet-300",
      activeGlow: "shadow-violet-500/20",
    },
    whyItMatters:
      "Java OOP principles, Round-Robin scheduling in OS, and TCP/IP sliding window protocol account for 45+ marks across all 3 university theory papers.",
    topExamHurdle: "Round-Robin / FCFS Gantt Charts in OS (BCA-303N)",
  },
  4: {
    num: 4,
    realm: "Database & Web Sanctum",
    theme: "DBMS & SQL, Web Technologies & SE",
    summary: "Relational database normalization (1NF-BCNF), full-stack web, and Agile SDLC.",
    icon: Terminal,
    credits: "22 Credits",
    pyqCount: "5 Years Solved",
    colorScheme: {
      accent: "text-emerald-800 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10",
      border: "border-emerald-500",
      bgBadge: "bg-emerald-100/90 dark:bg-emerald-500/15",
      textBadge: "text-emerald-950 dark:text-emerald-300",
      activeGlow: "shadow-emerald-500/20",
    },
    whyItMatters:
      "Normalization decomposition proofs and SQL join syntax are guaranteed 15-mark questions where full marks are awarded for correct tabular steps.",
    topExamHurdle: "BCNF Decomposition & Lossless Join Proofs in BCA-401N",
  },
  5: {
    num: 5,
    realm: "Intelligence & Python Summit",
    theme: "Python Programming, AI/ML & Cloud Computing",
    summary: "High-level automation, state-space search algorithms, and cloud virtualization.",
    icon: Sparkles,
    credits: "20 Credits",
    pyqCount: "5 Years Solved",
    colorScheme: {
      accent: "text-rose-800 bg-rose-100 dark:text-rose-400 dark:bg-rose-500/10",
      border: "border-rose-500",
      bgBadge: "bg-rose-100/90 dark:bg-rose-500/15",
      textBadge: "text-rose-950 dark:text-rose-300",
      activeGlow: "shadow-rose-500/20",
    },
    whyItMatters:
      "A* search heuristics, Minimax game trees, and Python data structures form high-scoring university questions while preparing you directly for modern AI jobs.",
    topExamHurdle: "A* Heuristic Graph Traversal & Alpha-Beta Pruning in BCA-502N",
  },
  6: {
    num: 6,
    realm: "Capstone & Cyber Fortress",
    theme: "Cyber Security, E-Commerce & Major Projects",
    summary: "RSA cryptography, vulnerability auditing, and university project defense viva.",
    icon: ShieldCheck,
    credits: "22 Credits",
    pyqCount: "5 Years Solved",
    colorScheme: {
      accent: "text-amber-800 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/10",
      border: "border-amber-500",
      bgBadge: "bg-amber-100/90 dark:bg-amber-500/15",
      textBadge: "text-amber-950 dark:text-amber-300",
      activeGlow: "shadow-amber-500/20",
    },
    whyItMatters:
      "RSA mathematical key generation and major project viva evaluation dictate your graduation honor roll and final degree CGPA.",
    topExamHurdle: "RSA Encryption Key Generation Math in BCA-601N",
  },
};

export function DegreeRoadmapExplorer({
  activeSemester = 1,
  onSelectSemester,
}: {
  activeSemester?: number;
  onSelectSemester?: (sem: number) => void;
}) {
  const [internalSemester, setInternalSemester] = useState<number>(activeSemester);
  const selectedSemester = activeSemester ?? internalSemester;

  const handleSelectSemester = (num: number) => {
    setInternalSemester(num);
    onSelectSemester?.(num);
    playPopSound();
  };

  const currentRealm = degreeRealms[selectedSemester] || degreeRealms[1];
  const RealmIcon = currentRealm.icon;

  const courseQuery = useQuery({
    queryKey: ["homepage", "bca_course"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, code, title, slug, total_semesters")
        .eq("status", "published")
        .is("deleted_at", null)
        .order("sort_order")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const subjectsQuery = useQuery({
    queryKey: ["homepage", "bca_subjects", courseQuery.data?.id, selectedSemester],
    enabled: !!courseQuery.data?.id,
    queryFn: async () => {
      const { data: semData, error: semErr } = await supabase
        .from("semesters")
        .select("id")
        .eq("course_id", courseQuery.data!.id)
        .eq("number", selectedSemester)
        .maybeSingle();

      if (semErr || !semData) return [];

      const { data, error } = await supabase
        .from("subjects")
        .select("id, code, title, slug, credits, description")
        .eq("semester_id", semData.id)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("code");

      if (error) throw error;
      return data ?? [];
    },
  });

  const scrollToRescueMachine = () => {
    const el = document.getElementById("hero-rescue-machine");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="curriculum-roadmap"
      className="border-b border-slate-200 dark:border-border/60 bg-surface-muted/20 py-16 sm:py-24 relative"
    >
      {/* Anchor targets for SiteHeader navigation */}
      <div id="semesters" className="absolute -top-20" aria-hidden="true" />
      <div id="syllabus" className="absolute -top-20" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-mono text-primary font-bold">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>100% NEP 2020 BCA Curriculum Blueprint</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-black text-slate-900 dark:text-foreground mt-2">
              All 6 Semesters. One Structured Roadmap to 9.2 CGPA.
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-muted-foreground font-sans font-medium mt-1 max-w-2xl">
              Don't study blindly. Every semester has core university subjects, credit weightages, and high-frequency exam hurdles. Select any semester to unlock its curriculum dossier and explore live units.
            </p>
          </div>

          <Link
            to="/courses"
            className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 self-start md:self-auto font-mono shrink-0"
          >
            <span>View All 32 BCA Subjects</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 6-Semester Degree Progression Track */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((num) => {
            const r = degreeRealms[num];
            const Icon = r.icon;
            const isSelected = selectedSemester === num;
            return (
              <button
                type="button"
                key={num}
                onClick={() => handleSelectSemester(num)}
                className={cn(
                  "btn-squishy group flex flex-col justify-between rounded-2xl p-3.5 text-left transition-all border cursor-pointer relative overflow-hidden shadow-2xs",
                  isSelected
                    ? cn("bg-white dark:bg-card border-primary ring-2 ring-primary/30 shadow-md", r.colorScheme.activeGlow)
                    : "bg-white/80 dark:bg-card/60 border-slate-200 dark:border-border/70 hover:border-slate-300 dark:hover:border-border text-slate-700 dark:text-muted-foreground hover:bg-white dark:hover:bg-card",
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={cn("font-display text-sm font-black", isSelected ? "text-primary" : "text-slate-900 dark:text-foreground")}>
                    Sem {num}
                  </span>
                  <div className={cn("h-7 w-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs", r.colorScheme.accent)}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>

                <div className="mt-2.5">
                  <span className={cn("font-mono text-[11px] font-bold line-clamp-1 block", isSelected ? "text-slate-900 dark:text-foreground" : "text-slate-700 dark:text-muted-foreground")}>
                    {r.realm}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-muted-foreground/80 font-mono mt-0.5 block">
                    {r.credits}
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-border/40 flex items-center justify-between text-[10px] font-bold">
                  <span className={isSelected ? "text-primary font-mono" : "text-slate-500 dark:text-muted-foreground"}>
                    {isSelected ? "Active Realm" : "Inspect →"}
                  </span>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Semester Strategic Dossier (The "Why") */}
        <div className="mt-6 rounded-3xl border border-slate-200 dark:border-border/80 bg-white dark:bg-card p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 dark:border-border/60 pb-6">
            <div className="flex items-start gap-4">
              <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0 shadow-md", currentRealm.colorScheme.accent)}>
                <RealmIcon className="h-7 w-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-primary">
                    Semester {selectedSemester} Realm Dossier
                  </span>
                  <Badge variant="outline" className={cn("text-[10px] font-mono font-bold", currentRealm.colorScheme.bgBadge, currentRealm.colorScheme.textBadge)}>
                    +50 XP Free Quest
                  </Badge>
                  <Badge variant="outline" className="text-[10px] font-mono border-slate-300 dark:border-border text-slate-800 dark:text-foreground font-semibold">
                    {currentRealm.credits}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] font-mono border-slate-300 dark:border-border text-slate-800 dark:text-foreground font-semibold">
                    5-Year Solved Papers
                  </Badge>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 dark:text-foreground mt-1">
                  {currentRealm.realm}: {currentRealm.theme}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-muted-foreground mt-1 font-sans font-medium">
                  {currentRealm.summary}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={scrollToRescueMachine}
                className="btn-squishy rounded-xl text-xs font-bold border-amber-300 dark:border-amber-500/30 text-amber-950 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 cursor-pointer shadow-2xs"
              >
                <Zap className="h-3.5 w-3.5 mr-1.5 fill-amber-500 text-amber-500" />
                Test Drive in Exam Machine ↑
              </Button>

              <Button
                asChild
                size="sm"
                className="btn-squishy rounded-xl text-xs font-bold bg-primary text-white hover:brightness-105 cursor-pointer shadow-sm"
              >
                <Link
                  to="/courses/$courseSlug/$semesterNumber"
                  params={{ courseSlug: "bca", semesterNumber: String(selectedSemester) }}
                >
                  Enter Semester {selectedSemester} Hub <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Why This Semester Matters & Exam Bottleneck */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 dark:border-border/60 bg-slate-50/70 dark:bg-surface-muted/40 p-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 dark:text-foreground">
                <Trophy className="h-4 w-4 text-primary" />
                <span>Degree Milestone Strategy:</span>
              </div>
              <p className="mt-2 text-xs text-slate-700 dark:text-muted-foreground leading-relaxed font-sans font-medium">
                {currentRealm.whyItMatters}
              </p>
            </div>

            <div className="rounded-2xl border border-rose-200 dark:border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/15 p-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-800 dark:text-rose-400">
                <Flame className="h-4 w-4 fill-rose-500 text-rose-500" />
                <span>High-Frequency Section C Hurdle:</span>
              </div>
              <p className="mt-2 text-xs text-slate-800 dark:text-rose-200/90 leading-relaxed font-sans font-medium">
                {currentRealm.topExamHurdle}. Our 15-mark pre-formatted blueprints provide step-by-step memory architecture diagrams to score 100% on this question.
              </p>
            </div>
          </div>
        </div>

        {/* Published University Subjects Grid for the Selected Semester */}
        <div className="mt-10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs font-extrabold text-primary uppercase">
                Semester {selectedSemester} Curriculum
              </span>
              <h4 className="font-display text-lg font-bold text-slate-900 dark:text-foreground">
                Published University Subjects & Unit Blueprints
              </h4>
            </div>
            <span className="text-xs text-slate-500 dark:text-muted-foreground font-mono">
              {(subjectsQuery.data ?? []).length} Subjects Active
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjectsQuery.isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-52 rounded-3xl" />
              ))
            ) : (subjectsQuery.data ?? []).length === 0 ? (
              <div className="col-span-full rounded-3xl border border-dashed border-slate-300 dark:border-border p-12 text-center text-sm text-slate-600 dark:text-muted-foreground">
                No subjects published yet for Semester {selectedSemester}.
              </div>
            ) : (
              subjectsQuery.data?.map((subj) => (
                <div
                  key={subj.id}
                  className="group flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-border/80 bg-white dark:bg-card p-6 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold text-primary">
                        {subj.code}
                      </span>
                      {subj.credits && (
                        <Badge variant="outline" className="text-[10px] font-mono border-slate-300 dark:border-border text-slate-800 dark:text-foreground font-bold shadow-2xs">
                          {subj.credits} Credits
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-foreground mt-2 group-hover:text-primary transition-colors">
                      {formatTitleCase(subj.title)}
                    </h3>

                    <p className="mt-2 text-xs text-slate-700 dark:text-muted-foreground line-clamp-2 leading-relaxed font-sans font-medium">
                      {subj.description || "Comprehensive syllabus notes, unit blueprints, and solved question papers."}
                    </p>

                    <div className="mt-4 space-y-1.5 border-t border-slate-100 dark:border-border/40 pt-3 text-[11px] text-slate-600 dark:text-muted-foreground font-sans">
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                        <Check className="h-3.5 w-3.5" />
                        <span>Solved 5-Year Past University Papers</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-muted-foreground font-medium">
                        <BookOpen className="h-3.5 w-3.5 text-primary" />
                        <span>15-Mark Pre-Formatted Answer Blueprints</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-border/50 flex items-center justify-between gap-2">
                    <Link
                      to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
                      params={{
                        courseSlug: "bca",
                        semesterNumber: String(selectedSemester),
                        subjectSlug: subj.slug,
                        unitNumber: "1",
                      }}
                      className="btn-squishy inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground px-3 py-1.5 text-xs font-bold shadow-2xs hover:opacity-90 cursor-pointer"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>Unit 1 Free</span>
                    </Link>

                    <Link
                      to="/courses/$courseSlug/$semesterNumber/$subjectSlug"
                      params={{
                        courseSlug: "bca",
                        semesterNumber: String(selectedSemester),
                        subjectSlug: subj.slug,
                      }}
                      className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 font-mono"
                    >
                      <span>Syllabus</span>
                      <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Backward-compatible alias
export function CourseDiscovery({
  activeSemester = 1,
  onSelectSemester,
}: {
  activeSemester?: number;
  onSelectSemester?: (sem: number) => void;
}) {
  return (
    <DegreeRoadmapExplorer
      activeSemester={activeSemester}
      onSelectSemester={onSelectSemester}
    />
  );
}

/* ──────────────────────────────────────────────────────────── 7. Student Social Proof & Reviews */

export function Testimonials() {
  const testimonials = [
    {
      name: "Rohit Verma",
      role: "BCA Semester 3 Student · IPU",
      quote:
        "The 15-mark notes format literally saved my Computer Networks exam. I studied only Unit 2 and Unit 3 from XRounder the night before and scored 68/75!",
      rating: 5,
    },
    {
      name: "Sneha Patel",
      role: "BCA Semester 2 Student · Bangalore University",
      quote:
        "Sparky is the cutest thing ever. Instead of feeling stressed with 500-page textbooks, doing the 3-minute diagnostic checks feels like playing a game.",
      rating: 5,
    },
    {
      name: "Aman Gupta",
      role: "BCA Semester 5 Student · CCSU",
      quote:
        "Having solved 5-year papers organized by unit instead of random unreadable PDFs saved me dozens of hours of hunting around Telegram and WhatsApp.",
      rating: 5,
    },
  ];

  return (
    <section className="border-b border-border/60 bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-500">
            Student Feedback
          </span>
          <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">
            Loved by BCA students across India.
          </h2>
          <p className="text-sm text-slate-700 dark:text-muted-foreground font-sans font-medium">
            Built by students who hated exam panic, for students who want high marks.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-200 dark:border-border/80 bg-white dark:bg-card p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {Array.from({ length: t.rating }).map((_, r) => (
                    <Star key={r} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-slate-800 dark:text-muted-foreground leading-relaxed italic font-serif font-medium">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-border/50 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs shadow-2xs">
                  {t.name[0]}
                </div>
                <div>
                  <span className="font-display text-xs font-bold text-slate-900 dark:text-foreground block">
                    {t.name}
                  </span>
                  <span className="text-[11px] text-slate-600 dark:text-muted-foreground font-sans font-medium">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 8. BCA Student FAQs */

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is XRounder really 100% free?",
      a: "Yes! All unit notes, bite-sized lessons, solved past papers, and diagnostic quizzes are 100% free forever for students under the NEP 2020 syllabus.",
    },
    {
      q: "Do I need to sign up to read notes?",
      a: "No signup is needed to browse the syllabus or read unit notes. An account is only required if you want to track your XP, preserve daily streaks, and sync your quiz attempt history.",
    },
    {
      q: "Does the curriculum match my university?",
      a: "XRounder follows the standard National Education Policy (NEP 2020) BCA curriculum adopted by major central, state, and private universities across India (IPU, DU, CCSU, AKTU, Bangalore University, etc.).",
    },
    {
      q: "How does Sparky the Study Mascot help me?",
      a: "Sparky assesses your diagnostic quiz answers in real-time, identifies your exact weak points, and points you directly to the 5-minute revision section needed to ace your exam.",
    },
  ];

  return (
    <section className="border-b border-border/60 bg-surface-muted/20 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
            Got Questions?
          </span>
          <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 dark:border-border/80 bg-white dark:bg-card overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpenIndex(isOpen ? null : i);
                    playPopSound();
                  }}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-slate-900 dark:text-foreground cursor-pointer hover:bg-slate-50 dark:hover:bg-muted/40 transition-colors font-display"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-slate-500 dark:text-muted-foreground transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-700 dark:text-muted-foreground leading-relaxed border-t border-slate-200 dark:border-border/40 pt-3 font-sans font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── 9. High-Conversion Final CTA */

export function CTA({
  user,
  loading,
  activeSemester = 1,
}: {
  user: unknown;
  loading: boolean;
  activeSemester?: number;
}) {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,oklch(0.78_0.14_75_/_15%),transparent_70%)] animate-glow-pulse"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Exam Season is Coming · Be Ready</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
          Turn Exam Panic Into <br />
          <span className="text-primary">
            Top University Scores.
          </span>
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-700 dark:text-muted-foreground leading-relaxed font-sans font-medium">
          Join thousands of BCA students mastering their syllabus with structured notes, solved papers,
          and diagnostic checks. Free forever.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {loading ? (
            <div className="h-12 w-48 animate-pulse rounded-2xl bg-muted" />
          ) : user ? (
            <Button
              asChild
              size="lg"
              className="btn-squishy btn-cta h-12 px-8 text-sm font-bold rounded-2xl shadow-lg cursor-pointer"
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
                className="btn-squishy btn-cta h-12 px-8 text-sm font-bold rounded-xl cursor-pointer"
              >
                <Link
                  to="/courses/$courseSlug/$semesterNumber"
                  params={{ courseSlug: "bca", semesterNumber: String(activeSemester) }}
                >
                  Start Semester {activeSemester} Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-squishy h-12 px-6 text-sm font-bold rounded-2xl border-slate-300 dark:border-border/80 text-slate-800 dark:text-foreground hover:bg-slate-100 dark:hover:bg-muted/70 cursor-pointer shadow-2xs"
              >
                <Link to="/courses">Browse All 6 Semesters</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
