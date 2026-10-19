import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  CheckCircle2,
  X,
  XCircle,
  Volume2,
  Play,
  Pause,
  Square,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kbd, MiniStat } from "@/components/quiz/quiz-shared";
import { playPopSound } from "@/lib/sound-fx";
import { useSpeech, type SpeechLanguageMode } from "@/hooks/use-speech";
import { cn } from "@/lib/utils";
import type { Feedback, Option, Question } from "@/components/quiz/types";

function OptionButton({
  letter,
  text,
  selected,
  isCorrectOption,
  revealed,
  disabled,
  onClick,
  onSpeak,
}: {
  letter: string;
  text: string;
  selected: boolean;
  isCorrectOption: boolean;
  revealed: boolean;
  disabled: boolean;
  onClick: () => void;
  onSpeak?: () => void;
}) {
  const wrongPick = revealed && selected && !isCorrectOption;
  const rightPick = revealed && isCorrectOption;

  return (
    <motion.button
      type="button"
      data-tts="option"
      onClick={() => {
        if (!disabled && !revealed) playPopSound();
        onClick();
      }}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      animate={
        rightPick && selected
          ? { scale: [1, 1.04, 1] }
          : wrongPick
            ? { x: [0, -8, 8, -6, 6, 0] }
            : { scale: 1, x: 0 }
      }
      transition={{ duration: wrongPick ? 0.4 : 0.32 }}
      aria-pressed={selected}
      className={cn(
        "group flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition-colors cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        rightPick
          ? "border-success bg-success/15 shadow-[0_0_0_4px_color-mix(in_oklab,var(--success)_18%,transparent)]"
          : wrongPick
            ? "border-destructive bg-destructive/15"
            : selected
              ? "border-accent bg-accent/10 shadow-2xs"
              : "border-border bg-surface hover:border-accent/40 hover:bg-accent/5",
        disabled && !revealed ? "opacity-70" : "",
      )}
    >
      <span
        data-tts="option-letter"
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold",
          rightPick
            ? "border-success bg-success text-success-foreground"
            : wrongPick
              ? "border-destructive bg-destructive text-destructive-foreground"
              : selected
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-background text-muted-foreground",
        )}
        aria-hidden="true"
      >
        {rightPick ? <Check className="h-4 w-4" /> : wrongPick ? <X className="h-4 w-4" /> : letter}
      </span>
      <span data-tts="option-text" className="min-w-0 flex-1 text-base leading-relaxed text-foreground">
        {text}
      </span>

      {onSpeak && (
        <span
          role="button"
          tabIndex={0}
          data-tts-ignore="true"
          onClick={(e) => {
            e.stopPropagation();
            onSpeak();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
              onSpeak();
            }
          }}
          className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-primary hover:bg-background/80 transition-colors cursor-pointer shrink-0"
          aria-label={`Read Option ${letter} aloud`}
          title={`Read Option ${letter}`}
        >
          <Volume2 className="h-3.5 w-3.5" />
        </span>
      )}
    </motion.button>
  );
}

export function QuestionCard({
  current,
  options,
  selection,
  feedback,
  grading,
  instantFeedback,
  onSelectOption,
  onGradeNow,
  onGoNext,
  stats,
}: {
  current: Question;
  options: Option[];
  selection: string[];
  feedback: Feedback | null;
  grading: boolean;
  instantFeedback: boolean;
  onSelectOption: (optionId: string) => void;
  onGradeNow: (sel: string[]) => void;
  onGoNext: () => void;
  stats: { correct: number; wrong: number; skipped: number; accuracy: number };
}) {
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

  const [includeOptionsInSpeech, setIncludeOptionsInSpeech] = useState(true);

  // Stop speech when question changes or on unmount
  useEffect(() => {
    stop();
    return () => {
      stop();
    };
  }, [current.id, stop]);

  /**
   * Centralized TTS: reads strictly prompt, passage, and optional options.
   * Never speaks question numbers, badges, buttons, or navigation chrome.
   */
  const playCurrentQuestion = useCallback(() => {
    if (!current || !isSupported) return;
    stop();
    playQuestion(
      {
        prompt: current.prompt,
        passage: current.passage,
        options: options.map((o, idx) => ({
          letter: String.fromCharCode(65 + idx),
          text: o.text,
        })),
        includeOptions: includeOptionsInSpeech,
        languageMode,
      },
      {
        customRate: rate,
      },
    );
  }, [current, isSupported, stop, playQuestion, options, includeOptionsInSpeech, languageMode, rate]);

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

  return (
    <section>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          data-tts-container="quiz-question"
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -36 }}
          transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
          className="rounded-xl border border-border bg-card p-5 shadow-2xs sm:p-7"
        >
          {/* Header Row: Question Mode & TTS Audio Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div
              data-tts-ignore="true"
              className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
            >
              {current.type === "multiple" ? "Select all that apply" : "Select one answer"}
            </div>

            {/* Centralized TTS Controls */}
            {isSupported && (
              <div
                data-tts-ignore="true"
                className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border/80 bg-background/60 p-1 text-xs"
              >
                {/* Play / Pause / Resume */}
                <button
                  type="button"
                  onClick={handleTogglePlayPause}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 font-semibold text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                  title={isPlaying ? (isPaused ? "Resume" : "Pause") : "Read Question"}
                  aria-label={isPlaying ? (isPaused ? "Resume" : "Pause") : "Read Question"}
                >
                  {isPlaying ? (
                    isPaused ? (
                      <>
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span className="hidden sm:inline">Resume</span>
                      </>
                    ) : (
                      <>
                        <Pause className="h-3.5 w-3.5 fill-current" />
                        <span className="hidden sm:inline">Pause</span>
                      </>
                    )
                  ) : (
                    <>
                      <Volume2 className="h-3.5 w-3.5" />
                      <span>Listen</span>
                    </>
                  )}
                </button>

                {/* Stop Button */}
                {isPlaying && (
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      stop();
                    }}
                    className="flex items-center gap-1 rounded-lg px-2 py-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                    title="Stop audio"
                    aria-label="Stop audio"
                  >
                    <Square className="h-3 w-3 fill-current" />
                    <span className="hidden sm:inline">Stop</span>
                  </button>
                )}

                {/* Language Switcher */}
                <div className="flex items-center gap-0.5 border-l border-border/60 pl-1.5 ml-1">
                  {(["en", "hinglish", "hi"] as SpeechLanguageMode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        playPopSound();
                        setLanguageMode(m);
                        if (isPlaying) stop();
                      }}
                      className={cn(
                        "rounded-md px-1.5 py-0.5 text-[10px] font-bold transition-all cursor-pointer",
                        languageMode === m
                          ? "bg-primary text-primary-foreground shadow-2xs"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                      title={`Listen in ${m === "en" ? "English" : m === "hinglish" ? "Hinglish" : "Hindi"}`}
                    >
                      {m === "en" ? "EN" : m === "hinglish" ? "🇮🇳 Hinglish" : "HI"}
                    </button>
                  ))}
                </div>

                {/* Option Reading Mode: Read A-D vs Skip */}
                <button
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setIncludeOptionsInSpeech(!includeOptionsInSpeech);
                    if (isPlaying) stop();
                  }}
                  className={cn(
                    "border-l border-border/60 pl-1.5 ml-1 text-[10px] font-semibold transition-colors cursor-pointer",
                    includeOptionsInSpeech ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground",
                  )}
                  title="Toggle reading options A-D"
                >
                  Options: {includeOptionsInSpeech ? "A–D" : "Off"}
                </button>
              </div>
            )}
          </div>

          {/* Passage if present */}
          {current.passage && (
            <div
              data-tts="passage"
              className="mb-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans"
            >
              <strong data-tts-ignore="true" className="text-primary font-sans font-bold block mb-1">
                Passage:
              </strong>
              {current.passage}
            </div>
          )}

          {/* Question Prompt with Audio Button */}
          <div className="flex items-start justify-between gap-3">
            <h2
              data-tts="question"
              className="font-sans text-lg sm:text-xl font-semibold leading-snug text-foreground flex-1"
            >
              {current.prompt}
            </h2>
            {isSupported && (
              <button
                type="button"
                data-tts-ignore="true"
                onClick={() => {
                  playPopSound();
                  stop();
                  playQuestion(
                    {
                      prompt: current.prompt,
                      passage: current.passage,
                      includeOptions: false,
                      languageMode,
                    },
                    { customRate: rate },
                  );
                }}
                className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                aria-label="Read prompt aloud"
                title="Read prompt aloud"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Options List */}
          <ul data-tts-container="options" className="mt-6 space-y-3">
            {options.map((o, i) => {
              const letter = String.fromCharCode(65 + i);
              return (
                <li key={o.id}>
                  <OptionButton
                    letter={letter}
                    text={o.text}
                    selected={selection.includes(o.id)}
                    isCorrectOption={!!feedback && feedback.correct_option_ids?.includes(o.id)}
                    revealed={!!feedback}
                    disabled={!!feedback || grading}
                    onClick={() => {
                      stop();
                      onSelectOption(o.id);
                    }}
                    onSpeak={
                      isSupported
                        ? () => {
                            playPopSound();
                            stop();
                            speak(`Option ${letter}: ${o.text}`, { mode: languageMode });
                          }
                        : undefined
                    }
                  />
                </li>
              );
            })}
          </ul>

          {/* Multi-select check button */}
          {current.type === "multiple" && !feedback && (
            <Button
              data-tts-ignore="true"
              className="btn-squishy mt-5 rounded-full cursor-pointer shadow-xs"
              disabled={selection.length === 0 || grading}
              onClick={() => {
                stop();
                playPopSound();
                if (instantFeedback) onGradeNow(selection);
                else onGoNext();
              }}
            >
              {grading ? "Checking…" : "Check answer"}
            </Button>
          )}

          {/* Feedback & Explanation */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "mt-6 rounded-2xl border p-4 text-sm",
                  feedback.is_correct
                    ? "border-success/40 bg-success/10 text-success"
                    : "border-destructive/40 bg-destructive/10 text-destructive",
                )}
                role="status"
                aria-live="polite"
              >
                <div data-tts-ignore="true" className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-semibold">
                    {feedback.is_correct ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 shrink-0" />
                    )}
                    {feedback.is_correct
                      ? "Correct Answer!"
                      : `Wrong Answer! Correct answer: ${options
                          .filter((o) => feedback.correct_option_ids?.includes(o.id))
                          .map((o) => o.text)
                          .join(", ")}`}
                  </div>

                  {isSupported && feedback.explanation && (
                    <button
                      type="button"
                      data-tts-ignore="true"
                      onClick={() => {
                        playPopSound();
                        stop();
                        speak(feedback.explanation || "", { mode: languageMode });
                      }}
                      className="p-1 rounded-lg text-primary hover:bg-primary/10 transition-colors cursor-pointer shrink-0"
                      aria-label="Read explanation aloud"
                      title="Read explanation"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {feedback.explanation && (
                  <p data-tts="explanation" className="mt-2 text-foreground/80">
                    {feedback.explanation}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <p data-tts-ignore="true" className="mt-6 text-xs text-muted-foreground">
            Keys: <Kbd>1</Kbd>–<Kbd>{Math.min(options.length, 9)}</Kbd> answer · <Kbd>S</Kbd> skip ·{" "}
            <Kbd>←</Kbd>/<Kbd>→</Kbd> navigate
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Live stats */}
      <div data-tts-ignore="true" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MiniStat label="Correct" value={stats.correct} tone="positive" />
        <MiniStat label="Wrong" value={stats.wrong} tone="negative" />
        <MiniStat label="Skipped" value={stats.skipped} tone="muted" />
        <MiniStat label="Accuracy" value={`${stats.accuracy}%`} tone="muted" />
      </div>
    </section>
  );
}
