import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  Flame,
  Sparkles,
  Trophy,
  Zap,
  Target,
  CheckCircle2,
  Crown,
  BookOpenCheck,
  Lock,
  ArrowRight,
  Award,
  X,
  HelpCircle,
} from "lucide-react";
import { computeStudentXP, evaluateBadges, type StudentBadge } from "@/lib/gamification";
import { playCelebrationSound, playPopSound, playCuteGiggleSound } from "@/lib/sound-fx";
import { SoundToggle } from "@/components/ui/sound-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SparkyAvatar } from "@/components/gamification/study-mascot";
import { cn } from "@/lib/utils";

interface StudentGamificationCardProps {
  completedUnitsCount: number;
  attemptsCount: number;
  highestPct: number;
  perfectScoresCount: number;
  passedCount: number;
  streakDays: number;
  firstName: string;
}

const SPARKY_CHEERS = [
  "You're a rockstar! Let's power through another concept! 🚀",
  "High five! Sparky believes in your study power 1000%! 🐾",
  "Every question answered is one step closer to exam mastery! 🧠",
  "Ooh, looking sharp today! Keep that learning momentum! ✨",
];

export function StudentGamificationCard({
  completedUnitsCount,
  attemptsCount,
  highestPct,
  perfectScoresCount,
  passedCount,
  streakDays,
  firstName,
}: StudentGamificationCardProps) {
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<StudentBadge | null>(null);
  const [sparkyMood, setSparkyMood] = useState<"idle" | "happy" | "celebrating">("happy");
  const [sparkyQuoteIdx, setSparkyQuoteIdx] = useState(0);
  const [isSparkyPoked, setIsSparkyPoked] = useState(false);

  const levelInfo = computeStudentXP({
    completedUnitsCount,
    attemptsCount,
    passedCount,
    perfectScoresCount,
    streakDays,
  });

  const badges = evaluateBadges({
    completedUnitsCount,
    attemptsCount,
    highestPct,
    perfectScoresCount,
    streakDays,
  });

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const handleCelebrate = () => {
    playCelebrationSound();
    setSparkyMood("celebrating");
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      disableForReducedMotion: true,
    });
    setTimeout(() => setSparkyMood("happy"), 2500);
  };

  const handlePokeSparky = () => {
    setIsSparkyPoked(true);
    playCuteGiggleSound();
    setSparkyMood("celebrating");
    setSparkyQuoteIdx((prev) => (prev + 1) % SPARKY_CHEERS.length);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.4 },
      colors: ["#ffd166", "#06d6a0", "#ff8fa3", "#118ab2"],
      disableForReducedMotion: true,
    });
    setTimeout(() => {
      setIsSparkyPoked(false);
      setSparkyMood("happy");
    }, 1200);
  };

  const handleBadgeClick = (badge: StudentBadge) => {
    setSelectedBadge(badge);
    if (badge.unlocked) {
      playCuteGiggleSound();
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.5 },
        disableForReducedMotion: true,
      });
    } else {
      playPopSound();
    }
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="h-5 w-5" />;
      case "Target":
        return <Target className="h-5 w-5" />;
      case "Flame":
        return <Flame className="h-5 w-5" />;
      case "Crown":
        return <Crown className="h-5 w-5" />;
      case "BookOpenCheck":
        return <BookOpenCheck className="h-5 w-5" />;
      case "Trophy":
      default:
        return <Trophy className="h-5 w-5" />;
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-card via-card to-primary/5 p-5 sm:p-6 shadow-sm">
      {/* Decorative background ambient glows */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
        <div className="flex items-center gap-3">
          {/* Level Circle */}
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-black shadow-sm ring-2 ring-primary/20">
            <span className="font-mono text-lg">L{levelInfo.level}</span>
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white text-[10px]">
              ★
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base font-bold text-foreground">
                {levelInfo.title}
              </h2>
              <Badge variant="secondary" className="font-mono text-[10px] font-semibold">
                {levelInfo.currentXP.toLocaleString()} XP
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {levelInfo.xpForNextLevel - levelInfo.currentXP} XP needed to reach Level{" "}
              {levelInfo.level + 1}
            </p>
          </div>
        </div>

        {/* Right action tools: Sound toggle & Badges preview button */}
        <div className="flex items-center gap-2">
          <SoundToggle />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              playPopSound();
              setShowBadgesModal(true);
            }}
            className="btn-squishy h-8 gap-1.5 rounded-full px-3 text-xs font-semibold cursor-pointer border-border hover:border-primary/50"
          >
            <Award className="h-3.5 w-3.5 text-amber-500" />
            <span>
              Badges ({unlockedCount}/{badges.length})
            </span>
          </Button>
        </div>
      </div>

      {/* Level XP Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground mb-1.5">
          <span>Level {levelInfo.level} Progress</span>
          <span className="font-mono font-bold text-foreground">{levelInfo.levelProgressPct}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-muted/80 overflow-hidden p-0.5 border border-border/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(4, levelInfo.levelProgressPct)}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-primary shadow-xs"
          />
        </div>
      </div>

      {/* Sparky Study Buddy Greeting Banner */}
      <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-3 sm:px-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={handlePokeSparky}
            className="btn-squishy shrink-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
            title="Poke Sparky for cheer!"
          >
            <SparkyAvatar
              size={44}
              mood={sparkyMood}
              isPoked={isSparkyPoked}
              className={cn("transition-transform", isSparkyPoked && "animate-cute-wiggle")}
            />
          </button>
          <div className="min-w-0">
            <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider block">
              Sparky · Study Pal
            </span>
            <p className="text-xs text-foreground font-medium truncate">
              {firstName ? `Hey ${firstName}! ` : ""}
              {SPARKY_CHEERS[sparkyQuoteIdx]}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePokeSparky}
          className="btn-squishy shrink-0 text-xs font-bold font-mono text-primary hover:underline px-2 py-1 rounded-lg bg-primary/10 cursor-pointer"
        >
          Poke ✨
        </button>
      </div>

      {/* Mini Badges Shelf */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Achievements &amp; Badges
          </span>
          <span className="text-[10px] text-muted-foreground">Tap any badge to inspect</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {badges.map((badge) => {
            const isSelected = selectedBadge?.id === badge.id;
            return (
              <button
                type="button"
                key={badge.id}
                onClick={() => handleBadgeClick(badge)}
                className={cn(
                  "btn-squishy group relative flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition-all cursor-pointer",
                  badge.unlocked
                    ? "border-amber-500/30 bg-amber-500/5 hover:border-amber-500 hover:shadow-xs"
                    : "border-border/40 bg-muted/20 opacity-60 grayscale hover:opacity-90",
                  isSelected && "ring-2 ring-primary border-primary",
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
                    badge.unlocked
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {getBadgeIcon(badge.icon)}
                </div>
                <span className="mt-1.5 truncate max-w-full text-[11px] font-bold text-foreground">
                  {badge.title}
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight line-clamp-1">
                  {badge.unlocked ? "Unlocked" : "Locked"}
                </span>

                {!badge.unlocked && (
                  <div className="absolute top-1.5 right-1.5 text-muted-foreground/60">
                    <Lock className="h-3 w-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Badge Detailed Drawer */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-3.5 text-xs text-foreground shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 shadow-2xs">
                  {getBadgeIcon(selectedBadge.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-sm">{selectedBadge.title}</span>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 border-amber-300 dark:border-amber-500/40 bg-amber-100/60 dark:bg-transparent font-bold"
                    >
                      {selectedBadge.tier}
                    </Badge>
                    <span className="font-semibold text-[11px] text-muted-foreground">
                      {selectedBadge.unlocked ? "✨ Unlocked!" : "🔒 Locked"}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-0.5">{selectedBadge.description}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="btn-squishy text-muted-foreground hover:text-foreground p-1 rounded-lg cursor-pointer"
                title="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Motivation & Quick Quest */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-primary/5 border border-primary/15 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">
              Daily Goal: Take 1 quiz or complete 1 unit today
            </p>
            <p className="text-[11px] text-muted-foreground">
              Earn +50 Bonus XP and advance your streak!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {streakDays > 0 ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30 px-3 py-1 font-mono text-xs font-bold shadow-2xs">
              <Flame className="h-3.5 w-3.5 animate-pulse text-amber-500 fill-amber-500" />
              {streakDays} Day Streak!
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground">
              Start Streak Today
            </span>
          )}

          <Button
            size="sm"
            onClick={handleCelebrate}
            variant="ghost"
            className="btn-squishy h-8 gap-1 rounded-full text-xs font-semibold cursor-pointer hover:bg-primary/10 text-primary"
            title="Cheer yourself on!"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Cheer</span>
          </Button>
        </div>
      </div>

      {/* Badges Modal Showcase */}
      <AnimatePresence>
        {showBadgesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.18 }}
              className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-border/80 bg-card p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Study Badges ({unlockedCount}/{badges.length} Unlocked)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBadgesModal(false)}
                  className="btn-squishy rounded-xl p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {badges.map((b) => (
                  <div
                    key={b.id}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-2xl border p-3.5 transition-all",
                      b.unlocked
                        ? "border-amber-500/30 bg-amber-500/5 text-foreground"
                        : "border-border/60 bg-muted/20 opacity-60 text-muted-foreground",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                          b.unlocked
                            ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {getBadgeIcon(b.icon)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-foreground">{b.title}</span>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border border-border">
                            {b.tier}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{b.description}</p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      {b.unlocked ? (
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Unlocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                          <Lock className="h-3.5 w-3.5" /> Locked
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex justify-end">
                <Button
                  onClick={() => setShowBadgesModal(false)}
                  className="btn-squishy btn-cta rounded-xl px-5 text-xs font-bold"
                >
                  Close Showcase
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
