import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Flame,
  FlaskConical,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Trophy,
  Zap,
  Heart,
  Smile,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatTitleCase } from "@/lib/format";
import {
  playCelebrationSound,
  playComboSound,
  playCorrectSound,
  playWrongSound,
  playPopSound,
  playCuteGiggleSound,
} from "@/lib/sound-fx";
import { SoundToggle } from "@/components/ui/sound-toggle";
import { StudyMascot } from "@/components/gamification/study-mascot";
import { EducationalContentRenderer } from "@/components/content/educational-content-renderer";
import type {
  UnitContentItem,
  PyqQuestion,
} from "@/routes/courses.$courseSlug.$semesterNumber.$subjectSlug.$unitNumber";

export type TopicRow = { id: string; title: string; sort_order: number };

interface BiteSizedLessonModeProps {
  articles: UnitContentItem[];
  topics?: TopicRow[];
  unit: { number: number; title: string; summary: string | null };
  subject: { code: string; title: string };
  courseSlug: string;
  semesterNumber: string;
  subjectSlug: string;
  unitNumber: string;
  pyqQuestions?: PyqQuestion[];
  primaryQuizId?: string;
  isCompleted: boolean;
  onCompleteUnit: () => void;
  onSwitchToReader: () => void;
}

// Default interactive bite-sized syllabus cards when no dense text notes are loaded
const DEFAULT_UNIT_TOPIC_CARDS = [
  {
    id: "topic-1-intro",
    title: "Introduction to Computers & The IPO Cycle",
    emoji: "💻",
    tagline: "The foundation of modern computing",
    concept:
      "A computer is an electronic system that takes raw data as Input, processes it under programmed logic, and produces meaningful Information as Output.",
    analogy:
      "Think of baking cookies: Flour & Sugar (Input) ➔ The Oven (Processing) ➔ Warm Delicious Cookie (Output)! 🍪",
    keyPoints: [
      "Data = Raw, unprocessed facts without context (e.g. 42, 'apple').",
      "Information = Structured data with meaning (e.g. 'Temperature: 42°C').",
      "Hardware is what you can touch; Software is the instructions running inside.",
    ],
    check: {
      question: "Which of the following represents unprocessed raw facts?",
      options: ["Raw Data", "Processed Information", "Software Output"],
      correctIndex: 0,
      explanation:
        "Data represents raw, unorganized facts. Once processed and given context, it becomes Information!",
    },
  },
  {
    id: "topic-2-characteristics",
    title: "Characteristics of Computers",
    emoji: "⚡",
    tagline: "Why computers revolutionized the planet",
    concept:
      "Computers excel at extreme speed, pinpoint accuracy, tireless diligence, and vast storage capacity without ever getting tired or bored.",
    analogy:
      "A human counting to 1 billion takes ~31 years. A modern CPU counts to 1 billion in under 0.3 seconds! 🚀",
    keyPoints: [
      "Speed: Performs billions of calculations per second (measured in GHz).",
      "Accuracy & GIGO: High precision governed by 'Garbage In, Garbage Out'.",
      "Diligence: Zero fatigue, boredom, or distraction during repetitive tasks.",
      "Versatility: Can play 3D games, diagnose diseases, and fly spacecraft.",
    ],
    check: {
      question: "What does the computer science principle 'GIGO' stand for?",
      options: [
        "Garbage In, Garbage Out",
        "Gigabytes In, Gigabytes Out",
        "Global Input, Global Output",
      ],
      correctIndex: 0,
      explanation:
        "GIGO (Garbage In, Garbage Out) means that erroneous or poor-quality input data will inevitably produce faulty output!",
    },
  },
  {
    id: "topic-3-generations",
    title: "Generations of Computers",
    emoji: "⏳",
    tagline: "From giant room-sized tubes to pocket AI",
    concept:
      "Computer evolution is categorized across 5 distinct generations, each powered by a major breakthrough in electronic circuitry.",
    analogy:
      "In 1946, ENIAC weighed 30 tons and filled a whole room. Today, your smartphone is 10,000x faster and fits in your pocket! 📱",
    keyPoints: [
      "1st Gen (1940s-50s): Vacuum Tubes · Giant, hot, magnetic drum memory.",
      "2nd Gen (1950s-60s): Transistors · Smaller, faster, magnetic core memory.",
      "3rd Gen (1960s-70s): Integrated Circuits (ICs) · Multiple components on one chip.",
      "4th Gen (1970s-Present): Microprocessors (VLSI/ULSI) · The personal computer era.",
      "5th Gen (Present & Future): AI, Neural Networks, & Quantum Computing.",
    ],
    check: {
      question: "Which electronic component powered the 1st Generation of computers?",
      options: ["Vacuum Tubes", "Transistors", "Integrated Circuits (ICs)"],
      correctIndex: 0,
      explanation:
        "First generation computers relied on fragile, power-hungry Vacuum Tubes before transistors were invented!",
    },
  },
  {
    id: "topic-4-types",
    title: "Types & Classification of Computers",
    emoji: "🏢",
    tagline: "From supercomputers to pocket microcomputers",
    concept:
      "Computers are classified by size, computing power, and purpose: Supercomputers, Mainframes, Minicomputers, and Microcomputers.",
    analogy:
      "Supercomputers are like rocket ships (space & weather); Microcomputers are like bicycles (personal everyday transport)! 🚲",
    keyPoints: [
      "Supercomputers: Highest processing power (weather forecasting, molecular modeling).",
      "Mainframes: Massive multi-user systems handling bank transactions and airline bookings.",
      "Minicomputers: Mid-range multi-user servers for research labs and mid-sized businesses.",
      "Microcomputers: Personal computers, laptops, smartphones, and tablets.",
    ],
    check: {
      question: "Which type of computer processes massive concurrent transactions for major banks?",
      options: ["Mainframe Computer", "Microcomputer", "Single-purpose calculator"],
      correctIndex: 0,
      explanation:
        "Mainframes are engineered for massive reliability, high I/O throughput, and thousands of concurrent enterprise transactions!",
    },
  },
  {
    id: "topic-5-applications",
    title: "Real-World Applications of Computers",
    emoji: "🌐",
    tagline: "How computing shapes human society",
    concept:
      "Computing technology touches every pillar of human civilization: healthcare, banking, education, scientific research, and global entertainment.",
    analogy:
      "From ATM cash withdrawals to robot-assisted surgery, computers turn complex human needs into reliable automation! 🏥",
    keyPoints: [
      "Healthcare: Diagnostic imaging (CT/MRI), robotic surgery, electronic health records.",
      "Banking & Finance: ATMs, electronic fund transfers (UPI/NEFT), algorithmic trading.",
      "Education: Interactive online learning, simulation laboratories, digital libraries.",
      "Science & Engineering: Computer-Aided Design (CAD), climate simulation, aerospace.",
    ],
    check: {
      question: "In engineering and architecture, what does CAD stand for?",
      options: [
        "Computer-Aided Design",
        "Calculated Automated Diagram",
        "Central Application Database",
      ],
      correctIndex: 0,
      explanation:
        "CAD (Computer-Aided Design) is the industry standard software used by engineers and architects to create 2D and 3D precision models!",
    },
  },
];

export function BiteSizedLessonMode({
  articles = [],
  topics = [],
  unit,
  subject,
  courseSlug,
  semesterNumber,
  subjectSlug,
  unitNumber,
  pyqQuestions = [],
  primaryQuizId,
  isCompleted,
  onCompleteUnit,
  onSwitchToReader,
}: BiteSizedLessonModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCardIds, setCompletedCardIds] = useState<Set<string>>(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [sessionXp, setSessionXp] = useState(0);
  const [mascotCheer, setMascotCheer] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Use curated articles if available; otherwise use default snappy syllabus cards
  const cards = useMemo(() => {
    if (articles.length > 0) {
      return articles.map((a, i) => ({
        id: a.id,
        title: a.title,
        emoji: ["💡", "⚡", "⏳", "🖥️", "🌐", "🎯"][i % 6],
        tagline: "Core Curriculum Topic",
        concept:
          a.description || "Master the key definitions, diagrams, and principles for this topic.",
        analogy: null,
        keyPoints: [
          "Understand the core definition and university marking criteria.",
          "Identify how this concept connects to real-world software applications.",
          "Review past exam questions and key formulas.",
        ],
        bodyMarkdown: a.body,
        check: {
          question: `Key Concept Check for ${a.title}: Have you grasped the primary mechanism?`,
          options: ["Understood completely! (+20 XP)", "Reviewing key points"],
          correctIndex: 0,
          explanation:
            "Great job! Locking in this concept builds your foundation for the semester exam.",
        },
      }));
    }

    // Default bite-sized cards matching unit topics
    return DEFAULT_UNIT_TOPIC_CARDS;
  }, [articles]);

  const total = cards.length;
  const currentCard = cards[currentIndex] || cards[0];

  const currentPyq = useMemo(() => {
    if (!pyqQuestions.length) return null;
    return pyqQuestions[currentIndex % pyqQuestions.length];
  }, [pyqQuestions, currentIndex]);

  const scrollToCardTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNext = () => {
    playPopSound();
    if (currentIndex < total - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      playComboSound(nextIdx + 1);
      setCompletedCardIds((prev) => new Set(prev).add(currentCard.id));
      setSessionXp((prev) => prev + 25);
      setMascotCheer(`Awesome work on Topic ${currentIndex + 1}! Let's roll! 🚀`);
      scrollToCardTop();
    } else {
      // Completed final card!
      setCompletedCardIds((prev) => new Set(prev).add(currentCard.id));
      setSessionXp((prev) => prev + 50);
      playCelebrationSound();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        disableForReducedMotion: true,
      });
      onCompleteUnit();
    }
  };

  const handlePrev = () => {
    playPopSound();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollToCardTop();
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentCard.id]: optionIndex }));
    const isCorrect = optionIndex === currentCard.check.correctIndex;

    if (isCorrect) {
      playCorrectSound();
      setSessionXp((prev) => prev + 20);
      setMascotCheer("Spot on! You nailed it! 🌟 (+20 XP)");
      confetti({
        particleCount: 28,
        spread: 55,
        origin: { y: 0.75 },
        disableForReducedMotion: true,
        colors: ["#ffd166", "#06d6a0", "#ff70a6"],
      });
    } else {
      playWrongSound();
      setMascotCheer("Oops, not quite! Read the explanation below and give it another shot! 🐾");
    }
  };

  const isAnswered = selectedAnswers[currentCard.id] !== undefined;
  const isCorrect = selectedAnswers[currentCard.id] === currentCard.check.correctIndex;
  const isLastCard = currentIndex === total - 1;

  return (
    <div ref={containerRef} className="space-y-6 min-w-0 max-w-full">
      {/* ─── Top Segmented Micro-Bar & Dopamine Stats ─── */}
      <div className="rounded-3xl border border-primary/20 bg-card/90 backdrop-blur-md p-4 sm:p-5 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary font-mono text-xs font-bold ring-1 ring-primary/25">
              {currentIndex + 1}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Card {currentIndex + 1} of {total}
                </span>
                <span className="text-muted-foreground/40">·</span>
                <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  <Flame className="h-3.5 w-3.5 fill-amber-500" />+{sessionXp} XP earned
                </span>
              </div>
              <h3 className="font-display text-sm sm:text-base font-bold text-foreground truncate max-w-xs sm:max-w-md">
                {currentCard.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <SoundToggle className="h-8 rounded-xl px-2.5 text-xs" />
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchToReader}
              className="h-8 rounded-xl text-xs font-semibold cursor-pointer text-muted-foreground hover:text-foreground btn-squishy"
            >
              <BookOpen className="h-3.5 w-3.5 mr-1 text-primary" />
              Full Reader
            </Button>
          </div>
        </div>

        {/* Segmented Micro-Step Bars */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5">
          {cards.map((c, idx) => {
            const isDone = completedCardIds.has(c.id) || idx < currentIndex;
            const isCur = idx === currentIndex;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  playPopSound();
                  setCurrentIndex(idx);
                  playComboSound(idx + 1);
                  scrollToCardTop();
                }}
                className={cn(
                  "group relative h-2.5 flex-1 min-w-5 rounded-full transition-all duration-300 cursor-pointer",
                  isCur
                    ? "bg-primary shadow-[0_0_12px_oklch(0.65_0.19_35)] ring-2 ring-primary/40 scale-y-110"
                    : isDone
                      ? "bg-emerald-500/80 hover:bg-emerald-500"
                      : "bg-muted/70 hover:bg-muted-foreground/30",
                )}
                title={`Topic ${idx + 1}: ${c.title}`}
              >
                <span className="sr-only">Topic {idx + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Active Cute Bite-Sized Card ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard.id}
          initial={{ opacity: 0, y: 12, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.99 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-3xl border border-primary/25 bg-card p-6 sm:p-9 shadow-md relative overflow-hidden"
        >
          {/* Subtle Ambient Shimmer */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

          {/* Card Header with Cute Mascot Greeting */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{currentCard.emoji}</span>
              <div>
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/30 font-mono text-[10px] font-bold rounded-lg uppercase tracking-wider"
                >
                  Topic {currentIndex + 1} · {currentCard.tagline}
                </Badge>
                <h2 className="font-display text-xl sm:text-2xl font-black text-foreground tracking-tight mt-0.5">
                  {currentCard.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Sparkles className="h-3.5 w-3.5" /> +25 XP
              </span>
            </div>
          </div>

          {/* Mascot Cheerful Callout */}
          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-3.5 sm:p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">🐾</span>
              <p className="text-xs font-semibold text-foreground">
                {mascotCheer ||
                  "Ready to master this concept? Give it a quick read & tap the check!"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                playCuteGiggleSound();
                setMascotCheer("Teehee! Sparky is cheering for you! 🌟");
              }}
              className="text-[11px] font-mono font-bold text-primary hover:underline shrink-0 cursor-pointer"
            >
              *Poke Sparky*
            </button>
          </div>

          {/* Snappy Concept Bite */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-muted/40 p-4 sm:p-5 border border-border/60 text-sm text-foreground/90 font-medium leading-relaxed">
              <span className="font-bold text-foreground block mb-1">💡 The Big Picture:</span>
              {currentCard.concept}
            </div>

            {currentCard.analogy && (
              <div className="rounded-2xl bg-amber-400/10 p-4 border border-amber-400/20 text-xs sm:text-sm text-foreground leading-relaxed">
                <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">
                  🍪 Everyday Analogy:
                </span>
                {currentCard.analogy}
              </div>
            )}

            {/* If there is legacy Markdown body, render it compactly */}
            {(currentCard as any).bodyMarkdown && (
              <div className="pt-2">
                <EducationalContentRenderer
                  title={currentCard.title}
                  content={(currentCard as any).bodyMarkdown}
                  anchorId={`card-${currentCard.id}`}
                />
              </div>
            )}

            {/* Key Bullet Highlights */}
            {currentCard.keyPoints && (
              <div className="mt-4 rounded-2xl border border-border/70 bg-card p-4 sm:p-5 space-y-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Key Exam Takeaways
                </div>
                <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-muted-foreground">
                  {currentCard.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold">·</span>
                      <span className="text-foreground/90">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ─── Instant Dopamine Tap Check ─── */}
          <div className="mt-8 rounded-2xl sm:rounded-3xl border border-primary/20 bg-card p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary font-mono">
                <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span>Instant Knowledge Check</span>
              </div>
              <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                +20 XP
              </Badge>
            </div>

            <p className="text-xs sm:text-sm font-bold text-foreground leading-snug mb-4">
              {currentCard.check.question}
            </p>

            <div className="grid gap-2.5 sm:grid-cols-2">
              {currentCard.check.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentCard.id] === optIdx;
                const isThisCorrect = optIdx === currentCard.check.correctIndex;

                let optClass = "border-border/80 bg-card hover:bg-muted/50 text-foreground";
                if (isAnswered) {
                  if (isSelected && isThisCorrect) {
                    optClass =
                      "border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/30";
                  } else if (isSelected && !isThisCorrect) {
                    optClass =
                      "border-destructive bg-destructive/15 text-destructive ring-2 ring-destructive/30";
                  } else if (isThisCorrect) {
                    optClass =
                      "border-emerald-500/60 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={cn(
                      "flex items-center justify-between gap-3 p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer btn-squishy text-left",
                      optClass,
                    )}
                  >
                    <span>{opt}</span>
                    {isAnswered && isThisCorrect && (
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box on answer */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={cn(
                  "mt-4 rounded-xl p-3.5 text-xs leading-relaxed border",
                  isCorrect
                    ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-800 dark:text-emerald-300"
                    : "bg-amber-400/10 border-amber-400/25 text-foreground",
                )}
              >
                <span className="font-bold block mb-1">
                  {isCorrect ? "🎉 Correct!" : "💡 Why that is:"}
                </span>
                {currentCard.check.explanation}
              </motion.div>
            )}
          </div>

          {/* ─── Bottom Navigation Actions ─── */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-border/60">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-2xl text-xs font-semibold cursor-pointer h-11 px-5 btn-squishy"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Previous Topic
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-mono">
              <span className="font-bold text-foreground">{currentIndex + 1}</span>
              <span>/</span>
              <span>{total}</span>
            </div>

            {isLastCard ? (
              <Button
                type="button"
                onClick={handleNext}
                className="btn-squishy btn-cta rounded-xl font-bold text-xs h-12 px-7 cursor-pointer"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Finish Unit &amp; Claim +120 XP
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                className="rounded-2xl font-bold text-xs h-11 px-6 cursor-pointer shadow-sm btn-squishy"
              >
                Next Topic
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ─── Exam PYQ Quick Practice Card ─── */}
      {currentPyq && (
        <div className="rounded-2xl border border-primary/20 bg-card/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="h-5 w-5 text-primary shrink-0" />
            <div>
              <span className="font-mono text-[10px] font-bold uppercase text-primary">
                University PYQ Insight ({currentPyq.points || 5} Marks)
              </span>
              <p className="font-semibold text-foreground line-clamp-1">{currentPyq.prompt}</p>
            </div>
          </div>
          {primaryQuizId && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-xl text-xs font-bold btn-squishy shrink-0"
            >
              <Link to="/quizzes/$quizId" params={{ quizId: primaryQuizId }}>
                Solve Quiz <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
