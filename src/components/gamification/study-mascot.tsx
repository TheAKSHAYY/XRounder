import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Sparkles, MessageCircle, X, Volume2, VolumeX, Flame, Heart } from "lucide-react";
import { playCuteGiggleSound, playPopSound, isSoundEnabled, setSoundEnabled } from "@/lib/sound-fx";
import { cn } from "@/lib/utils";

export type MascotMood = "idle" | "happy" | "celebrating" | "thinking";

const CHEER_QUOTES = [
  "You're doing amazing! Keep going! 🚀",
  "Every topic you master makes you unstoppable! 🧠",
  "Ooh, your study streak is looking fiery today! 🔥",
  "Poke me whenever you need some lucky brainpower! ✨",
  "1% better every day = 37x better in a year! 📈",
  "University exams? Pfft, you've got this in the bag! 🎓",
  "Take a deep breath. You're building your future! 💖",
  "High five! Let's conquer this next concept together! 🐾",
];

const POKE_RESPONSES = [
  "Teehee! That tickles! (≧◡≦)",
  "*Boop!* Supercharged brain boost activated! ⚡",
  "I believe in you 1000%! Let's get that XP! 🌟",
  "Yay! Your study companion is always by your side! 🐾",
  "Woohoo! +10 cuteness aura unlocked! 💖",
];

interface StudyMascotProps {
  mood?: MascotMood;
  customMessage?: string | null;
  className?: string;
  hideDock?: boolean;
}

export function StudyMascot({
  mood = "idle",
  customMessage,
  className,
  hideDock = false,
}: StudyMascotProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [speechText, setSpeechText] = useState<string>(CHEER_QUOTES[0]);
  const [showSpeech, setShowSpeech] = useState(true);
  const [isPoked, setIsPoked] = useState(false);
  const [pokesCount, setPokesCount] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  // Set message when customMessage updates
  useEffect(() => {
    if (customMessage) {
      setSpeechText(customMessage);
      setShowSpeech(true);
    }
  }, [customMessage]);

  // Periodic blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Rotate quotes periodically when idle
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      if (!customMessage) {
        setSpeechText((prev) => {
          const others = CHEER_QUOTES.filter((q) => q !== prev);
          return others[Math.floor(Math.random() * others.length)];
        });
      }
    }, 14000);
    return () => clearInterval(quoteInterval);
  }, [customMessage]);

  const handlePoke = () => {
    setIsPoked(true);
    setPokesCount((c) => c + 1);
    playCuteGiggleSound();

    const randomPoke = POKE_RESPONSES[pokesCount % POKE_RESPONSES.length];
    setSpeechText(randomPoke);
    setShowSpeech(true);

    confetti({
      particleCount: 22,
      spread: 45,
      origin: { x: 0.88, y: 0.85 },
      ticks: 120,
      disableForReducedMotion: true,
      colors: ["#ff8fa3", "#ffd166", "#06d6a0", "#118ab2", "#a06cd5"],
    });

    setTimeout(() => setIsPoked(false), 600);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playPopSound();
  };

  // Inline mascot badge
  if (hideDock) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <button
          type="button"
          onClick={handlePoke}
          className="group relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
          title="Click Sparky for lucky cheer!"
        >
          <MascotSvg isBlinking={isBlinking} isPoked={isPoked} mood={mood} size={54} />
        </button>
        <div className="rounded-2xl border border-primary/25 bg-primary/5 px-3.5 py-2 text-xs font-medium text-foreground max-w-xs shadow-2xs">
          {speechText}
        </div>
      </div>
    );
  }

  return (
    <aside
      aria-label="Study Companion Mascot"
      className={cn("fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none", className)}
    >
      <div className="flex flex-col items-end">
        {/* Speech Bubble */}
        <AnimatePresence>
          {showSpeech && !isMinimized && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.92 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative mb-2 max-w-[240px] sm:max-w-[280px] rounded-2xl border border-primary/25 bg-card/95 p-3.5 shadow-lg backdrop-blur-md"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-amber-500 animate-spin" />
                  Sparky · Study Pal
                </span>
                <button
                  type="button"
                  onClick={() => setShowSpeech(false)}
                  className="text-muted-foreground/70 hover:text-foreground cursor-pointer"
                  title="Dismiss message"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-1 text-xs text-foreground/90 font-medium leading-relaxed">
                {speechText}
              </p>

              {/* Little Speech Tail */}
              <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-r border-b border-primary/25 bg-card" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Avatar and Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Sound Toggle beside mascot */}
          {!isMinimized && (
            <button
              type="button"
              onClick={toggleSound}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-card/90 text-muted-foreground shadow-sm hover:text-foreground hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={soundOn ? "Mute cute study audio" : "Enable cute study audio"}
            >
              {soundOn ? (
                <Volume2 className="h-3.5 w-3.5 text-primary" />
              ) : (
                <VolumeX className="h-3.5 w-3.5" />
              )}
            </button>
          )}

          {/* Interactive Mascot Body */}
          <button
            type="button"
            onClick={handlePoke}
            className={cn(
              "group relative flex items-center justify-center rounded-3xl border border-primary/25 bg-linear-to-b from-card via-card to-primary/10 p-2 shadow-xl backdrop-blur-md transition-transform duration-200 cursor-pointer active:scale-90",
              isPoked && "animate-cute-wiggle",
            )}
            title="Poke Sparky for encouragement!"
          >
            <MascotSvg
              isBlinking={isBlinking}
              isPoked={isPoked}
              mood={mood}
              size={isMinimized ? 44 : 64}
            />

            {/* Glowing Aura */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-amber-400/20 blur-md group-hover:bg-amber-400/35 transition-colors" />
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────────────────────────
   Pure SVG Vector Mascot: "Sparky the Cosmic Study Dino"
   Zero dependencies, 0ms load time, ultra-cute expressions
   ───────────────────────────────────────────────────────────── */

export function MascotSvg({
  isBlinking = false,
  isPoked = false,
  mood = "idle",
  size = 64,
  className,
}: {
  isBlinking?: boolean;
  isPoked?: boolean;
  mood?: MascotMood;
  size?: number;
  className?: string;
}) {
  const isHappy = mood === "happy" || mood === "celebrating" || isPoked;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-transform duration-150", isPoked && "scale-110", className)}
    >
      <defs>
        {/* Soft Pastel Gradient Body */}
        <linearGradient
          id="sparkyBody"
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

        <linearGradient id="capGrad" x1="30" y1="8" x2="70" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4361ee" />
          <stop offset="100%" stopColor="#3a0ca3" />
        </linearGradient>

        <filter id="cuteShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Main Fluffy Body */}
      <ellipse cx="50" cy="56" rx="36" ry="34" fill="url(#sparkyBody)" filter="url(#cuteShadow)" />

      {/* Soft Belly Highlight */}
      <ellipse cx="50" cy="64" rx="22" ry="18" fill="#fff7d6" opacity="0.85" />

      {/* Rosy Cheeks */}
      <circle cx="28" cy="58" r="5.5" fill="#ff70a6" opacity="0.65" />
      <circle cx="72" cy="58" r="5.5" fill="#ff70a6" opacity="0.65" />

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

      {/* Tiny Graduation Cap on Top */}
      <g transform="translate(0, -2)">
        <polygon points="50,14 74,21 50,28 26,21" fill="url(#capGrad)" />
        <rect x="42" y="24" width="16" height="6" rx="2" fill="#2b2d42" />
        {/* Gold Tassel */}
        <circle cx="50" cy="21" r="2" fill="#ffd166" />
        <path d="M 50 21 Q 62 23 66 31" stroke="#ffd166" strokeWidth="1.6" fill="none" />
        <circle cx="66" cy="32" r="1.8" fill="#ffd166" />
      </g>

      {/* Tiny Happy Feet */}
      <ellipse cx="38" cy="88" rx="8" ry="4.5" fill="#e07a5f" />
      <ellipse cx="62" cy="88" rx="8" ry="4.5" fill="#e07a5f" />

      {/* Little Star Sparkle on Cheek when poked */}
      {isPoked && (
        <path
          d="M 76 43 L 78 46 L 81 46 L 79 48 L 80 51 L 76 49 L 72 51 L 73 48 L 71 46 L 74 46 Z"
          fill="#ffd166"
          className="animate-spin"
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
      mood={mood}
      isPoked={isPoked}
      isBlinking={false}
      className={className}
    />
  );
}
