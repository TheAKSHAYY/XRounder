import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  FlaskConical,
  Target,
  RefreshCw,
  Volume2,
  VolumeX,
  Headphones,
  Play,
  Pause,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  playCelebrationSound,
  playCorrectSound,
  playWrongSound,
  playPopSound,
} from "@/lib/sound-fx";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useSpeech, type SpeechLanguageMode } from "@/hooks/use-speech";

export interface QuestionOption {
  text: string;
  is_correct: boolean;
  letter?: string;
}

export interface PracticeQuestion {
  id?: string;
  prompt: string;
  passage?: string;
  explanation: string;
  difficulty?: "easy" | "medium" | "hard" | string;
  topic_title?: string;
  options: QuestionOption[];
}

interface UnitPracticeQuizProps {
  questions: PracticeQuestion[];
  unitNumber: number;
  unitTitle: string;
  subjectTitle: string;
  quizId?: string;
  onAttemptSaved?: () => void;
}

export function UnitPracticeQuiz({
  questions = [],
  unitNumber,
  unitTitle,
  subjectTitle,
  quizId,
  onAttemptSaved,
}: UnitPracticeQuizProps) {
  const { user } = useAuth();

  // Generator: picks exactly 5 Easy, 3 Medium, 2 Hard
  const generateBalancedSet = useCallback((pool: PracticeQuestion[]): PracticeQuestion[] => {
    if (!pool || pool.length === 0) return [];
    if (pool.length <= 10) return [...pool];

    const easyPool = pool.filter((q) => q.difficulty === "easy");
    const mediumPool = pool.filter((q) => q.difficulty === "medium");
    const hardPool = pool.filter((q) => q.difficulty === "hard");

    const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

    const pickedEasy = shuffle(easyPool.length >= 5 ? easyPool : pool).slice(0, 5);
    const pickedMedium = shuffle(mediumPool.length >= 3 ? mediumPool : pool).slice(0, 3);
    const pickedHard = shuffle(hardPool.length >= 2 ? hardPool : pool).slice(0, 2);

    const combined = [...pickedEasy, ...pickedMedium, ...pickedHard];
    if (combined.length < 10) {
      const remaining = pool.filter((q) => !combined.includes(q));
      combined.push(...shuffle(remaining).slice(0, 10 - combined.length));
    }

    return shuffle(combined.slice(0, 10));
  }, []);

  const [activeSet, setActiveSet] = useState<PracticeQuestion[]>(() =>
    generateBalancedSet(questions),
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedSec, setElapsedSec] = useState(0);

  // Centralized Browser TTS hook with Hinglish and natural voice capabilities
  const {
    isSupported,
    isPlaying,
    isPaused,
    languageMode,
    setLanguageMode,
    rate,
    speak,
    playQuestion,
    pause,
    resume,
    stop,
  } = useSpeech();

  const [autoReadEnabled, setAutoReadEnabled] = useState(false);
  const [includeOptionsInSpeech, setIncludeOptionsInSpeech] = useState(true);

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  // Synchronize when questions array updates from parent (e.g. AI quiz)
  useEffect(() => {
    if (questions && questions.length > 0) {
      stop();
      setActiveSet(generateBalancedSet(questions));
      setCurrentIndex(0);
      setSelectedAnswers({});
      setIsSubmitted(false);
      setStartTime(Date.now());
    }
  }, [questions, generateBalancedSet, stop]);

  // Current active question
  const currentQ = activeSet[currentIndex];
  const total = activeSet.length;

  /**
   * Centralized TTS reader that extracts ONLY the question prompt, passage,
   * and optionally options A-D. Never reads UI buttons, question numbers, timers, or scores.
   */
  const playCurrentQuestion = useCallback(() => {
    if (!currentQ || !isSupported) return;
    stop();
    playQuestion(
      {
        prompt: currentQ.prompt,
        passage: currentQ.passage,
        options: currentQ.options,
        includeOptions: includeOptionsInSpeech,
        languageMode,
      },
      {
        customRate: rate,
      },
    );
  }, [currentQ, isSupported, stop, playQuestion, includeOptionsInSpeech, languageMode, rate]);

  const handleTogglePlayPause = () => {
    playPopSound();
    if (isPlaying) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      playCurrentQuestion();
    }
  };

  // Handle auto-reading on question change if enabled and unanswered
  useEffect(() => {
    if (autoReadEnabled && !isSubmitted && selectedAnswers[currentIndex] === undefined && currentQ) {
      const timer = setTimeout(() => {
        playCurrentQuestion();
      }, 400);
      return () => {
        clearTimeout(timer);
        stop();
      };
    }
  }, [currentIndex, autoReadEnabled, isSubmitted, currentQ, selectedAnswers, playCurrentQuestion, stop]);

  // Restart with fresh balanced set
  const handleGenerateNewSet = useCallback(() => {
    stop();
    playPopSound();
    setActiveSet(generateBalancedSet(questions));
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setStartTime(Date.now());
  }, [questions, generateBalancedSet, stop]);

  // Retake exact set
  const handleRetakeExact = useCallback(() => {
    stop();
    playPopSound();
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setStartTime(Date.now());
  }, [stop]);

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentIndex] !== undefined) return; // already answered

    stop();

    const isCorrect = currentQ.options[optionIndex]?.is_correct;
    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));

    // If auto-read is enabled, speak short feedback without leaking explanation prematurely
    if (autoReadEnabled) {
      const correctIdx = currentQ.options.findIndex((o) => o.is_correct);
      const correctLetter = ["A", "B", "C", "D"][correctIdx] || "";
      const resultSpeech = isCorrect
        ? "Correct!"
        : `Incorrect. The correct answer is Option ${correctLetter}.`;
      setTimeout(() => {
        speak(resultSpeech, { mode: languageMode });
      }, 300);
    }
  };

  const handleNext = () => {
    stop();
    playPopSound();
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrev = () => {
    stop();
    playPopSound();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Score calculations
  const results = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    activeSet.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      if (selected !== undefined) {
        if (q.options[selected]?.is_correct) {
          correct++;
        } else {
          wrong++;
        }
      }
    });
    const attempted = correct + wrong;
    const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passed = scorePct >= 60;
    return { correct, wrong, attempted, total, scorePct, passed };
  }, [activeSet, selectedAnswers, total]);

  const handleSubmitQuiz = async () => {
    stop();
    setIsSubmitted(true);
    const duration = Math.round((Date.now() - startTime) / 1000);
    setElapsedSec(duration);

    if (results.scorePct >= 70) {
      playCelebrationSound();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
      });
    }

    // Persist attempt to Supabase if signed in and quizId exists
    if (user?.id && quizId) {
      try {
        await supabase.from("quiz_attempts").insert({
          quiz_id: quizId,
          user_id: user.id,
          score: results.correct,
          max_score: total,
          pct: results.scorePct,
          passed: results.passed,
          submitted_at: new Date().toISOString(),
        });
        if (onAttemptSaved) onAttemptSaved();
      } catch (e) {
        console.error("Failed to persist quiz attempt:", e);
      }
    }
  };

  if (activeSet.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-card">
        <FlaskConical className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
        <h4 className="font-display text-base font-bold text-foreground">Question Bank Loading</h4>
        <p className="text-xs text-muted-foreground mt-1">
          Preparing the 10-question practice set for Unit {unitNumber}...
        </p>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // VIEW 1: RESULTS VIEW
  // ══════════════════════════════════════════════════════════════
  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-border/60">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div
                className={cn(
                  "grid h-16 w-16 place-items-center rounded-2xl text-2xl font-bold font-mono shadow-inner",
                  results.passed
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
                )}
              >
                {results.scorePct}%
              </div>
              <div>
                <Badge
                  variant={results.passed ? "success" : "warning"}
                  className="mb-1 text-xs font-bold"
                >
                  {results.passed ? "✓ Practice Set Mastered" : "Needs Review"}
                </Badge>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-foreground">
                  {results.correct} / {results.total} Questions Correct
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Unit {unitNumber}: {unitTitle} · Completed in {Math.floor(elapsedSec / 60)}m{" "}
                  {elapsedSec % 60}s
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetakeExact}
                className="rounded-xl h-10 px-4 text-xs font-semibold cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Retry This Set
              </Button>
              <Button
                size="sm"
                onClick={handleGenerateNewSet}
                className="btn-squishy rounded-xl h-10 px-5 text-xs font-bold shadow-xs cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Next 10 Questions
              </Button>
            </div>
          </div>

          {/* Detailed Question-by-Question Review */}
          <div className="mt-8 space-y-4">
            <h4 className="font-display text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" /> Detailed Answer Key &amp; Explanations
            </h4>

            <div className="space-y-3.5">
              {activeSet.map((q, idx) => {
                const userChoice = selectedAnswers[idx];
                const isCorrect = userChoice !== undefined && q.options[userChoice]?.is_correct;
                const correctOpt = q.options.find((o) => o.is_correct);

                return (
                  <div
                    key={idx}
                    className={cn(
                      "rounded-2xl border p-4 sm:p-5 transition-all",
                      isCorrect
                        ? "border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10"
                        : "border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 flex-wrap" data-tts-ignore="true">
                        <span className="font-mono text-xs font-bold text-muted-foreground">
                          Q{idx + 1}.
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] uppercase font-bold",
                            q.difficulty === "easy"
                              ? "text-emerald-600 border-emerald-500/30"
                              : q.difficulty === "hard"
                                ? "text-rose-600 border-rose-500/30"
                                : "text-amber-600 border-amber-500/30",
                          )}
                        >
                          {q.difficulty || "medium"}
                        </Badge>
                        {q.topic_title && (
                          <span className="text-[11px] font-medium text-muted-foreground truncate max-w-[280px]">
                            {q.topic_title}
                          </span>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5" data-tts-ignore="true">
                        {isSupported && (
                          <button
                            type="button"
                            onClick={() => {
                              playPopSound();
                              stop();
                              const cLetter = correctOpt
                                ? ["A", "B", "C", "D"][q.options.indexOf(correctOpt)]
                                : "";
                              speak(
                                `${q.prompt}. Correct answer: Option ${cLetter}: ${correctOpt?.text || ""}. Explanation: ${q.explanation || ""}`,
                                { mode: languageMode },
                              );
                            }}
                            className="p-1 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                            aria-label={`Listen to Question ${idx + 1} review`}
                            title="Listen to review"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-4 w-4" /> Correct (+1)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                            <XCircle className="h-4 w-4" /> Incorrect (0)
                          </span>
                        )}
                      </div>
                    </div>

                    {q.passage && (
                      <div
                        data-tts="passage"
                        className="mb-2 text-xs italic text-muted-foreground bg-muted/20 p-2.5 rounded-xl border border-border/60"
                      >
                        {q.passage}
                      </div>
                    )}

                    <p
                      data-tts="question"
                      className="font-display text-sm font-semibold text-foreground leading-snug"
                    >
                      {q.prompt}
                    </p>

                    <div className="mt-3 grid gap-2 sm:grid-cols-2 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const isUserPick = userChoice === oIdx;
                        const isThisCorrect = opt.is_correct;

                        return (
                          <div
                            key={oIdx}
                            data-tts="option"
                            className={cn(
                              "flex items-center gap-2.5 rounded-xl border p-2.5",
                              isThisCorrect
                                ? "border-emerald-500 bg-emerald-500/15 font-semibold text-emerald-900 dark:text-emerald-200"
                                : isUserPick
                                  ? "border-rose-500 bg-rose-500/15 font-medium text-rose-900 dark:text-rose-200"
                                  : "border-border/60 bg-muted/30 text-muted-foreground",
                            )}
                          >
                            <span
                              data-tts="option-letter"
                              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-background/80 font-mono text-[10px] font-bold"
                            >
                              {["A", "B", "C", "D"][oIdx]}
                            </span>
                            <span data-tts="option-text" className="min-w-0 flex-1">
                              {opt.text}
                            </span>
                            {isThisCorrect && (
                              <Check
                                data-tts-ignore="true"
                                className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <div
                        data-tts="explanation"
                        className="mt-3.5 rounded-xl border border-border/60 bg-surface/80 p-3 text-xs text-foreground/90 leading-relaxed"
                      >
                        <strong data-tts-ignore="true" className="text-primary font-bold">
                          Explanation:{" "}
                        </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // VIEW 2: ACTIVE QUESTION RUNNER
  // ══════════════════════════════════════════════════════════════
  const userSelected = selectedAnswers[currentIndex];
  const isAnswered = userSelected !== undefined;

  return (
    <div
      data-tts-container="quiz-runner"
      className="rounded-3xl border border-border/80 bg-card p-5 sm:p-8 shadow-soft"
    >
      {/* Top Runner Header (strictly ignored by TTS) */}
      <div
        data-tts-ignore="true"
        className="flex items-center justify-between gap-3 border-b border-border/60 pb-4 mb-4"
      >
        <div className="flex items-center gap-2.5 flex-wrap">
          <Badge
            variant="outline"
            className="text-xs font-mono font-bold rounded-lg text-primary border-primary/30"
          >
            Question {currentIndex + 1} of {total}
          </Badge>

          <Badge
            variant="outline"
            className={cn(
              "text-[10px] uppercase font-bold",
              currentQ.difficulty === "easy"
                ? "text-emerald-600 border-emerald-500/30 bg-emerald-500/10"
                : currentQ.difficulty === "hard"
                  ? "text-rose-600 border-rose-500/30 bg-rose-500/10"
                  : "text-amber-600 border-amber-500/30 bg-amber-500/10",
            )}
          >
            {currentQ.difficulty || "medium"}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {currentQ.topic_title && (
            <span className="hidden sm:inline-block text-xs font-medium text-muted-foreground truncate max-w-xs">
              {currentQ.topic_title}
            </span>
          )}
        </div>
      </div>

      {/* Dedicated Accessible Audio Control Bar */}
      {isSupported && (
        <div
          data-tts-ignore="true"
          className="flex flex-wrap items-center justify-between gap-3 p-3 mb-5 rounded-2xl border border-border/70 bg-surface/60 shadow-2xs"
        >
          <div className="flex items-center gap-2">
            {/* Play / Pause / Resume */}
            <Button
              type="button"
              size="sm"
              variant={isPlaying ? "default" : "outline"}
              onClick={handleTogglePlayPause}
              className="rounded-xl h-8 px-3 text-xs font-bold gap-1.5 cursor-pointer shadow-xs transition-transform active:scale-95"
              aria-label={
                isPlaying
                  ? isPaused
                    ? "Resume reading question"
                    : "Pause reading question"
                  : "Read question aloud"
              }
              title={isPlaying ? (isPaused ? "Resume" : "Pause") : "Listen to question"}
            >
              {isPlaying && !isPaused ? (
                <>
                  <Pause className="h-3 w-3 fill-current" />
                  <span>Pause</span>
                </>
              ) : isPlaying && isPaused ? (
                <>
                  <Play className="h-3 w-3 fill-current" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3 w-3" />
                  <span>Read Question</span>
                </>
              )}
            </Button>

            {/* Stop button */}
            {isPlaying && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  playPopSound();
                  stop();
                }}
                className="rounded-xl h-8 px-2 text-xs font-bold text-muted-foreground hover:text-destructive cursor-pointer"
                aria-label="Stop reading"
                title="Stop reading"
              >
                <Square className="h-3 w-3 fill-current" />
                <span className="hidden sm:inline ml-1">Stop</span>
              </Button>
            )}

            {/* Language / Pronunciation Mode: English vs Hinglish vs Hindi */}
            <div className="flex items-center rounded-xl border border-border/80 bg-background/80 p-0.5 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setLanguageMode("en");
                  if (isPlaying) stop();
                }}
                className={cn(
                  "rounded-lg px-2 py-0.5 transition-all cursor-pointer",
                  languageMode === "en"
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
                title="Natural English voice"
              >
                English
              </button>
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setLanguageMode("hinglish");
                  if (isPlaying) stop();
                }}
                className={cn(
                  "rounded-lg px-2 py-0.5 transition-all cursor-pointer flex items-center gap-1",
                  languageMode === "hinglish"
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
                title="Indian English / Hinglish voice for authentic technical and Hindi pronunciation"
              >
                <span>🇮🇳 Hinglish</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Option Reading Mode: Question only vs Question + Options */}
            <button
              type="button"
              onClick={() => {
                playPopSound();
                setIncludeOptionsInSpeech(!includeOptionsInSpeech);
                if (isPlaying) stop();
              }}
              className={cn(
                "rounded-xl px-2.5 py-1 text-[11px] font-semibold border transition-all cursor-pointer",
                includeOptionsInSpeech
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border/80 bg-background/60 text-muted-foreground hover:text-foreground",
              )}
              title="Toggle whether options A-D are read aloud"
            >
              <span>Options: {includeOptionsInSpeech ? "Read A-D" : "Skip"}</span>
            </button>

            {/* Auto-Read Toggle */}
            <button
              type="button"
              onClick={() => {
                playPopSound();
                const next = !autoReadEnabled;
                setAutoReadEnabled(next);
                if (!next) stop();
              }}
              className={cn(
                "flex items-center gap-1 rounded-xl px-2.5 py-1 text-[11px] font-semibold border transition-all cursor-pointer",
                autoReadEnabled
                  ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                  : "border-border/80 bg-background/60 text-muted-foreground hover:text-foreground",
              )}
              title="Automatically reads question on navigation without revealing answer"
            >
              <Headphones className="h-3 w-3" />
              <span>Auto-Read: {autoReadEnabled ? "ON" : "OFF"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Progress Bar (strictly ignored by TTS) */}
      <div
        data-tts-ignore="true"
        className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden mb-6"
      >
        <div
          className="h-full bg-primary transition-all duration-200"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      {/* Passage if present */}
      {currentQ.passage && (
        <div
          data-tts="passage"
          className="mb-4 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans"
        >
          <strong data-tts-ignore="true" className="text-primary font-sans font-bold block mb-1">
            Passage:
          </strong>
          {currentQ.passage}
        </div>
      )}

      {/* Question Prompt with Speaker */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <h3
          data-tts="question"
          className="font-sans text-lg sm:text-xl font-semibold text-foreground leading-snug flex-1"
        >
          {currentQ.prompt}
        </h3>
        {isSupported && (
          <button
            type="button"
            data-tts-ignore="true"
            onClick={() => {
              playPopSound();
              stop();
              playQuestion(
                {
                  prompt: currentQ.prompt,
                  passage: currentQ.passage,
                  includeOptions: false,
                  languageMode,
                },
                { customRate: rate },
              );
            }}
            className="shrink-0 p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
            aria-label="Read question prompt aloud"
            title="Read question prompt aloud"
          >
            <Volume2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 4 Options (A, B, C, D) with Individual Speaker Buttons */}
      <div data-tts-container="options" className="grid gap-3 sm:grid-cols-2 mb-6">
        {currentQ.options.map((opt, optIdx) => {
          const letter = ["A", "B", "C", "D"][optIdx];
          const isChosen = userSelected === optIdx;
          const isCorrect = opt.is_correct;

          let cardStyle =
            "border-border/80 bg-surface/50 hover:border-primary/50 hover:bg-surface text-foreground";
          if (isAnswered) {
            if (isCorrect) {
              cardStyle =
                "border-emerald-500 bg-emerald-500/15 text-emerald-950 dark:text-emerald-200 font-semibold shadow-xs";
            } else if (isChosen) {
              cardStyle =
                "border-rose-500 bg-rose-500/15 text-rose-950 dark:text-rose-200 font-medium";
            } else {
              cardStyle = "border-border/40 bg-muted/20 opacity-60 text-muted-foreground";
            }
          }

          return (
            <button
              key={optIdx}
              type="button"
              data-tts="option"
              disabled={isAnswered}
              onClick={() => handleSelectOption(optIdx)}
              className={cn(
                "group relative flex items-start gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer disabled:cursor-default",
                cardStyle,
              )}
            >
              <span
                data-tts="option-letter"
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition-colors",
                  isAnswered && isCorrect
                    ? "bg-emerald-500 text-white"
                    : isAnswered && isChosen
                      ? "bg-rose-500 text-white"
                      : "bg-muted group-hover:bg-primary/20 group-hover:text-primary text-muted-foreground",
                )}
              >
                {letter}
              </span>

              <div
                data-tts="option-text"
                className="min-w-0 flex-1 pt-0.5 text-xs sm:text-sm leading-relaxed"
              >
                {opt.text}
              </div>

              {/* Individual Option TTS Button */}
              {isSupported && (
                <span
                  role="button"
                  tabIndex={0}
                  data-tts-ignore="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    playPopSound();
                    stop();
                    speak(`Option ${letter}: ${opt.text}`, { mode: languageMode });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      stop();
                      speak(`Option ${letter}: ${opt.text}`, { mode: languageMode });
                    }
                  }}
                  className="p-1 rounded-lg text-muted-foreground/60 hover:text-primary hover:bg-background/80 transition-colors cursor-pointer shrink-0"
                  aria-label={`Read Option ${letter} aloud`}
                  title={`Read Option ${letter}`}
                >
                  <Volume2 className="h-3.5 w-3.5" />
                </span>
              )}

              {isAnswered && isCorrect && (
                <Check
                  data-tts-ignore="true"
                  className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1"
                />
              )}
              {isAnswered && isChosen && !isCorrect && (
                <XCircle
                  data-tts-ignore="true"
                  className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-1"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Immediate Explanation Card if answered with Audio Speaker */}
      {isAnswered && (
        <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5 text-xs sm:text-sm text-foreground/90 leading-relaxed animate-fade-in">
          <div data-tts-ignore="true" className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-primary">
              <Sparkles className="h-4 w-4 text-primary" /> Explanation &amp; Key Concept:
            </div>
            {isSupported && (
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  stop();
                  speak(currentQ.explanation, { mode: languageMode });
                }}
                className="p-1 rounded-lg text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                aria-label="Read explanation aloud"
                title="Read explanation"
              >
                <Volume2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div data-tts="explanation">{currentQ.explanation}</div>
        </div>
      )}

      {/* Navigation Footer (strictly ignored by TTS) */}
      <div
        data-tts-ignore="true"
        className="flex items-center justify-between gap-3 pt-4 border-t border-border/60"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="rounded-xl h-10 px-3.5 text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Previous
        </Button>

        <div className="flex items-center gap-2">
          {currentIndex < total - 1 ? (
            <Button
              size="sm"
              onClick={handleNext}
              disabled={!isAnswered}
              className="btn-squishy rounded-xl h-10 px-5 text-xs font-bold shadow-xs cursor-pointer"
            >
              Next Question <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleSubmitQuiz}
              disabled={!isAnswered}
              className="btn-squishy btn-cta rounded-xl h-10 px-6 text-xs font-bold shadow-xs cursor-pointer"
            >
              Submit Practice Set <Check className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
