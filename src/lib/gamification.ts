export interface StudentBadge {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon identifier
  unlocked: boolean;
  unlockedAt?: string;
  tier: "bronze" | "silver" | "gold" | "diamond";
}

export interface StudentLevelInfo {
  level: number;
  title: string;
  currentXP: number;
  xpForNextLevel: number;
  xpInCurrentLevel: number;
  levelProgressPct: number;
}

const LEVEL_THRESHOLDS = [
  { level: 1, title: "Curious Novice", xp: 0 },
  { level: 2, title: "BCA Apprentice", xp: 150 },
  { level: 3, title: "Code Enthusiast", xp: 400 },
  { level: 4, title: "Logic Specialist", xp: 800 },
  { level: 5, title: "Semester Champion", xp: 1400 },
  { level: 6, title: "Exam Virtuoso", xp: 2200 },
  { level: 7, title: "Master Scholar", xp: 3200 },
  { level: 8, title: "Grand Academician", xp: 4500 },
];

export function computeStudentXP(params: {
  completedUnitsCount: number;
  attemptsCount: number;
  passedCount: number;
  perfectScoresCount: number;
  streakDays: number;
}): StudentLevelInfo {
  const { completedUnitsCount, attemptsCount, passedCount, perfectScoresCount, streakDays } =
    params;

  // XP Breakdown:
  // - Completed unit: 120 XP
  // - Quiz attempt: 25 XP
  // - Quiz passed (>=70%): 60 XP
  // - Perfect quiz (100%): 75 XP
  // - Daily streak: 35 XP per day
  const currentXP =
    completedUnitsCount * 120 +
    attemptsCount * 25 +
    passedCount * 60 +
    perfectScoresCount * 75 +
    streakDays * 35;

  let currentLevel = LEVEL_THRESHOLDS[0];
  let nextLevel = LEVEL_THRESHOLDS[1];

  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (currentXP >= LEVEL_THRESHOLDS[i].xp) {
      currentLevel = LEVEL_THRESHOLDS[i];
      nextLevel = LEVEL_THRESHOLDS[i + 1] ?? {
        level: currentLevel.level + 1,
        title: "Legendary Scholar",
        xp: currentLevel.xp + 1500,
      };
    } else {
      break;
    }
  }

  const baseXP = currentLevel.xp;
  const targetXP = nextLevel.xp;
  const xpInCurrentLevel = Math.max(0, currentXP - baseXP);
  const xpNeeded = targetXP - baseXP;
  const levelProgressPct = Math.min(100, Math.round((xpInCurrentLevel / xpNeeded) * 100));

  return {
    level: currentLevel.level,
    title: currentLevel.title,
    currentXP,
    xpForNextLevel: targetXP,
    xpInCurrentLevel,
    levelProgressPct,
  };
}

export function evaluateBadges(params: {
  completedUnitsCount: number;
  attemptsCount: number;
  highestPct: number;
  perfectScoresCount: number;
  streakDays: number;
}): StudentBadge[] {
  const { completedUnitsCount, attemptsCount, highestPct, perfectScoresCount, streakDays } = params;

  return [
    {
      id: "first_spark",
      title: "First Spark",
      description: "Take your first quiz or start your first unit",
      icon: "Zap",
      unlocked: attemptsCount > 0 || completedUnitsCount > 0,
      tier: "bronze",
    },
    {
      id: "sharp_mind",
      title: "Sharpshooter",
      description: "Score 80% or higher on any practice quiz",
      icon: "Target",
      unlocked: highestPct >= 80,
      tier: "silver",
    },
    {
      id: "flame_keeper",
      title: "Flame Keeper",
      description: "Maintain a study streak of 3 or more days",
      icon: "Flame",
      unlocked: streakDays >= 3,
      tier: "silver",
    },
    {
      id: "perfectionist",
      title: "Flawless Score",
      description: "Achieve a perfect 100% on a quiz",
      icon: "Crown",
      unlocked: perfectScoresCount > 0,
      tier: "gold",
    },
    {
      id: "curriculum_conqueror",
      title: "Unit Conqueror",
      description: "Complete 2 or more complete syllabus units",
      icon: "BookOpenCheck",
      unlocked: completedUnitsCount >= 2,
      tier: "gold",
    },
    {
      id: "exam_warrior",
      title: "Exam Warrior",
      description: "Complete 5 or more practice quiz attempts",
      icon: "Trophy",
      unlocked: attemptsCount >= 5,
      tier: "diamond",
    },
  ];
}
