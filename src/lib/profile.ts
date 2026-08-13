import { supabase } from "@/integrations/supabase/client";

/** Profile row shape used by the profile screen. Extra columns are optional so
 *  the page keeps working before `.lovable/profile_fields_migration.sql` runs. */
export type ProfileRow = {
  user_id: string;
  full_name: string | null;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  locale: string | null;
  timezone: string | null;
  current_course_id: string | null;
  current_semester_id: string | null;
  created_at?: string | null;
  phone?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  college?: string | null;
  university?: string | null;
  roll_number?: string | null;
  academic_session?: string | null;
  current_year?: number | null;
  notification_prefs?: NotificationPrefs | null;
};

export type NotificationPrefs = {
  quiz_reminders?: boolean;
  new_material?: boolean;
  announcements?: boolean;
  exam_reminders?: boolean;
  achievements?: boolean;
  email_updates?: boolean;
};

export const NOTIFICATION_PREF_KEYS = [
  {
    key: "quiz_reminders",
    label: "Quiz reminders",
    hint: "Nudges for quizzes you started but never finished.",
  },
  {
    key: "new_material",
    label: "New study material",
    hint: "When notes or papers land in your subjects.",
  },
  {
    key: "announcements",
    label: "Announcements",
    hint: "Important updates from your faculty and admins.",
  },
  {
    key: "exam_reminders",
    label: "Exam prep reminders",
    hint: "Reminders as exam season approaches.",
  },
  { key: "achievements", label: "Achievements", hint: "When you unlock a new badge or streak." },
  {
    key: "email_updates",
    label: "Email updates",
    hint: "A short digest of your activity by email.",
  },
] as const satisfies ReadonlyArray<{ key: keyof NotificationPrefs; label: string; hint: string }>;

export const DEFAULT_NOTIFICATION_PREFS: Required<NotificationPrefs> = {
  quiz_reminders: true,
  new_material: true,
  announcements: true,
  exam_reminders: true,
  achievements: true,
  email_updates: true,
};

/* ------------------------------------------------------------------ profile */

export async function fetchProfile(userId: string): Promise<ProfileRow | null> {
  // `select("*")` keeps this working whether or not the extra columns exist yet.
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return (data as ProfileRow | null) ?? null;
}

export type ProfileFieldKey =
  | "full_name"
  | "display_name"
  | "avatar_url"
  | "bio"
  | "phone"
  | "date_of_birth"
  | "gender"
  | "college"
  | "university"
  | "roll_number"
  | "current_course_id"
  | "current_semester_id";

export const COMPLETION_FIELDS: ReadonlyArray<{
  key: ProfileFieldKey;
  label: string;
  section: "personal" | "academic" | "photo";
}> = [
  { key: "full_name", label: "Full name", section: "personal" },
  { key: "display_name", label: "Display name", section: "personal" },
  { key: "avatar_url", label: "Profile photo", section: "photo" },
  { key: "bio", label: "Short bio", section: "personal" },
  { key: "phone", label: "Phone number", section: "personal" },
  { key: "date_of_birth", label: "Date of birth", section: "personal" },
  { key: "gender", label: "Gender", section: "personal" },
  { key: "college", label: "College", section: "academic" },
  { key: "university", label: "University", section: "academic" },
  { key: "roll_number", label: "Enrollment / roll number", section: "academic" },
  { key: "current_course_id", label: "Course", section: "academic" },
  { key: "current_semester_id", label: "Current semester", section: "academic" },
];

export function computeCompletion(profile: ProfileRow | null | undefined) {
  const missing = COMPLETION_FIELDS.filter((f) => {
    const value = profile?.[f.key];
    return value === null || value === undefined || String(value).trim() === "";
  });
  const filled = COMPLETION_FIELDS.length - missing.length;
  return {
    pct: Math.round((filled / COMPLETION_FIELDS.length) * 100),
    filled,
    total: COMPLETION_FIELDS.length,
    missing,
  };
}

/* -------------------------------------------------------------- statistics */

export type LearningStats = {
  attempts: number;
  completed: number;
  avgScore: number;
  bestScore: number;
  questionsSolved: number;
  bookmarks: number;
  streakDays: number;
  learningMinutes: number;
  unitsStarted: number;
  unitsCompleted: number;
  overallProgress: number;
  lastActivityAt: string | null;
};

export const EMPTY_STATS: LearningStats = {
  attempts: 0,
  completed: 0,
  avgScore: 0,
  bestScore: 0,
  questionsSolved: 0,
  bookmarks: 0,
  streakDays: 0,
  learningMinutes: 0,
  unitsStarted: 0,
  unitsCompleted: 0,
  overallProgress: 0,
  lastActivityAt: null,
};

/** Local-timezone day key (YYYY-MM-DD). Using UTC here broke streaks for
 *  users ahead of/behind UTC (e.g. IST late-evening activity). */
export function localDayKey(value: string | Date): string {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Consecutive days of activity ending today (or yesterday — a streak stays
 *  alive until the day after the last activity has passed). */
export function computeStreak(dates: Array<string | Date>): number {
  const days = new Set(dates.filter(Boolean).map((d) => localDayKey(d)));
  days.delete("");
  if (days.size === 0) return 0;

  const cursor = new Date();

  if (!days.has(localDayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(localDayKey(cursor))) return 0;
  }

  let streak = 0;
  while (days.has(localDayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export async function fetchLearningStats(userId: string): Promise<LearningStats> {
  const [attemptsRes, bookmarksRes, progressRes, viewsRes] = await Promise.all([
    supabase
      .from("quiz_attempts")
      .select("id, pct, score, max_score, submitted_at, started_at, time_spent_seconds")
      .eq("user_id", userId),
    supabase.from("bookmarks").select("id", { count: "exact", head: true }).eq("user_id", userId),
    supabase
      .from("progress_tracking")
      .select("progress_pct, status, last_activity_at")
      .eq("user_id", userId),
    supabase.from("note_views").select("created_at").eq("user_id", userId).limit(500),
  ]);

  if (attemptsRes.error) throw attemptsRes.error;
  if (progressRes.error) throw progressRes.error;

  const attempts = attemptsRes.data ?? [];
  const submitted = attempts.filter((a) => !!a.submitted_at);

  let questionsSolved = 0;
  if (attempts.length > 0) {
    const { count } = await supabase
      .from("quiz_attempt_answers")
      .select("id", { count: "exact", head: true })
      .in(
        "attempt_id",
        attempts.map((a) => a.id),
      );
    questionsSolved = count ?? 0;
  }

  const pcts = submitted
    .map((a) =>
      a.pct != null
        ? Number(a.pct)
        : a.score != null && a.max_score
          ? (Number(a.score) / Number(a.max_score)) * 100
          : null,
    )
    .filter((n): n is number => n != null && Number.isFinite(n));

  const progress = progressRes.data ?? [];
  const unitsCompleted = progress.filter((p) => p.status === "completed").length;
  const overall =
    progress.length > 0
      ? progress.reduce((sum, p) => sum + Number(p.progress_pct ?? 0), 0) / progress.length
      : 0;

  const activityDates = [
    ...submitted.map((a) => a.submitted_at as string),
    ...attempts.map((a) => a.started_at as string),
    ...progress.map((p) => p.last_activity_at as string),
    ...((viewsRes.data ?? []) as { created_at: string }[]).map((v) => v.created_at),
  ].filter(Boolean);

  const learningSeconds = attempts.reduce((sum, a) => sum + Number(a.time_spent_seconds ?? 0), 0);

  return {
    attempts: attempts.length,
    completed: submitted.length,
    avgScore: pcts.length ? Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length) : 0,
    bestScore: pcts.length ? Math.round(Math.max(...pcts)) : 0,
    questionsSolved,
    bookmarks: bookmarksRes.count ?? 0,
    streakDays: computeStreak(activityDates),
    learningMinutes: Math.round(learningSeconds / 60),
    unitsStarted: progress.length,
    unitsCompleted,
    overallProgress: Math.round(overall),
    lastActivityAt: activityDates.length > 0 ? activityDates.sort().slice(-1)[0]! : null,
  };
}

/* ------------------------------------------------------------ achievements */

export type Achievement = {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  progress: number;
  requirement: string;
};

export function computeAchievements(stats: LearningStats): Achievement[] {
  const pct = (value: number, target: number) => Math.min(100, Math.round((value / target) * 100));

  return [
    {
      id: "first-quiz",
      title: "First Quiz",
      description: "You attempted your very first quiz.",
      unlocked: stats.attempts >= 1,
      progress: pct(stats.attempts, 1),
      requirement: "Attempt 1 quiz",
    },
    {
      id: "ten-quizzes",
      title: "10 Quizzes Completed",
      description: "Consistency is how marks are made.",
      unlocked: stats.completed >= 10,
      progress: pct(stats.completed, 10),
      requirement: "Complete 10 quizzes",
    },
    {
      id: "hundred-questions",
      title: "100 Questions Solved",
      description: "A hundred questions down.",
      unlocked: stats.questionsSolved >= 100,
      progress: pct(stats.questionsSolved, 100),
      requirement: "Answer 100 questions",
    },
    {
      id: "seven-day-streak",
      title: "7 Day Streak",
      description: "A full week of studying without a break.",
      unlocked: stats.streakDays >= 7,
      progress: pct(stats.streakDays, 7),
      requirement: "Study 7 days in a row",
    },
    {
      id: "top-performer",
      title: "Top Performer",
      description: "Scored 90% or higher on a quiz.",
      unlocked: stats.bestScore >= 90,
      progress: pct(stats.bestScore, 90),
      requirement: "Score 90% on any quiz",
    },
    {
      id: "semester-completed",
      title: "Semester Completed",
      description: "Every unit you started is finished.",
      unlocked: stats.unitsStarted > 0 && stats.overallProgress >= 100,
      progress: stats.overallProgress,
      requirement: "Reach 100% unit progress",
    },
  ];
}

export function formatLearningTime(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`;
}
