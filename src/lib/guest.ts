/**
 * Guest Mode — lets a visitor explore XRounder without an account.
 *
 * Everything a guest "does" lives in sessionStorage only: it never touches
 * Supabase, is scoped to the browser tab, and is cleared the moment a real
 * session appears (see `clearGuestState`). Auth stays the single source of
 * truth for anything persistent.
 */

export const GUEST_LIMITS = {
  /** Questions a guest may preview per quiz before sign-in is required. */
  mcqPerQuiz: 5,
  /** Bookmarks a guest may hold in the tab (not persisted server-side). */
  bookmarks: 3,
  /** Views before we show a conversion prompt again. */
  promptEveryViews: 6,
} as const;

const KEY = "xr.guest.v1";

/** A note the guest opened, plus how far they actually read it. */
export type GuestNoteActivity = {
  id: string;
  title: string;
  href: string;
  subjectTitle: string | null;
  unitTitle: string | null;
  pct: number;
  /** How many separate times the note was opened — 2+ means a revision. */
  visits?: number;
  updatedAt: number;
};

/** A topic (quiz) the guest practised in preview mode. */
export type GuestTopicActivity = {
  quizId: string;
  title: string;
  subjectTitle: string | null;
  unitTitle: string | null;
  seen: number;
  answered: number;
  /** Separate practice sessions on this quiz — 2+ means a retest. */
  sessions?: number;
  updatedAt: number;
};

export type GuestState = {
  active: boolean;
  startedAt: number | null;
  /** quizId -> questions previewed */
  mcqSeen: Record<string, number>;
  /** contentId -> label, tab-local "saved" items */
  bookmarks: { id: string; label: string; href: string }[];
  /** noteId -> reading activity */
  notes: Record<string, GuestNoteActivity>;
  /** quizId -> practice activity */
  topics: Record<string, GuestTopicActivity>;
  /** Route views since the last conversion prompt. */
  views: number;
  lastPromptAt: number | null;
  /** local date (YYYY-MM-DD) -> number of study actions that day */
  dayCounts?: Record<string, number>;
  /** Study actions the guest aims to do each day. */
  dailyGoal?: number;
};

/** Default number of study actions that counts as "a day done". */
export const GUEST_DAILY_GOAL = 3;

const EMPTY: GuestState = {
  active: false,
  startedAt: null,
  mcqSeen: {},
  bookmarks: [],
  notes: {},
  topics: {},
  views: 0,
  lastPromptAt: null,
  dayCounts: {},
  dailyGoal: GUEST_DAILY_GOAL,
};

/** Local calendar day key, so streaks follow the student's own clock. */
export function guestDayKey(d: Date = new Date()): string {
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

const listeners = new Set<() => void>();
let cache: GuestState | null = null;

function read(): GuestState {
  if (typeof window === "undefined") return EMPTY;
  if (cache) return cache;
  try {
    // localStorage so a guest keeps their previews/bookmarks across reloads
    // and tabs; the old sessionStorage value is migrated once.
    const raw = window.localStorage.getItem(KEY) ?? window.sessionStorage.getItem(KEY);
    cache = raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<GuestState>) } : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: GuestState) {
  cache = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
      window.sessionStorage.removeItem(KEY);
    } catch {
      /* private mode — in-memory only */
    }
  }
  listeners.forEach((l) => l());
}

// Keep other tabs in sync with whatever the guest just did.
if (typeof window !== "undefined") {
  const rehydrate = () => {
    cache = null;
    listeners.forEach((l) => l());
  };
  window.addEventListener("storage", (e) => {
    if (e.key !== KEY) return;
    rehydrate();
  });
  // Coming back to a backgrounded tab picks up anything done elsewhere,
  // so guest progress never needs a manual refresh.
  window.addEventListener("focus", rehydrate);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") rehydrate();
  });
}


export function subscribeGuest(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getGuestState(): GuestState {
  return read();
}

/** Apply a functional update to the guest store and notify subscribers. */
export function updateGuestState(updater: (state: GuestState) => GuestState) {
  const current = read();
  const next = updater(current);
  if (next !== current) write(next);
}

export function startGuestMode() {
  const s = read();
  if (s.active) return;
  write({ ...s, active: true, startedAt: Date.now() });
}

export function clearGuestState() {
  cache = EMPTY;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(KEY);
      window.sessionStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }
  listeners.forEach((l) => l());
}


/** Count one previewed MCQ; returns the new count for that quiz. */
export function recordGuestMcq(quizId: string): number {
  const s = read();
  const next = (s.mcqSeen[quizId] ?? 0) + 1;
  write({ ...s, mcqSeen: { ...s.mcqSeen, [quizId]: next } });
  return next;
}

/** Count one study action towards today's goal / streak. */
export function recordGuestStudyAction(weight = 1) {
  const key = guestDayKey();
  updateGuestState((s) => {
    const counts = s.dayCounts ?? {};
    return { ...s, dayCounts: { ...counts, [key]: (counts[key] ?? 0) + weight } };
  });
}

/** Change how many actions a day needs to keep the streak alive. */
export function setGuestDailyGoal(goal: number) {
  const next = Math.max(1, Math.min(10, Math.round(goal)));
  updateGuestState((s) => (s.dailyGoal === next ? s : { ...s, dailyGoal: next }));
}

export function guestMcqSeen(quizId: string): number {
  return read().mcqSeen[quizId] ?? 0;
}

export function guestMcqRemaining(quizId: string): number {
  return Math.max(0, GUEST_LIMITS.mcqPerQuiz - guestMcqSeen(quizId));
}

export function toggleGuestBookmark(item: {
  id: string;
  label: string;
  href: string;
}): { ok: true; saved: boolean } | { ok: false; reason: "limit" } {
  const s = read();
  const exists = s.bookmarks.some((b) => b.id === item.id);
  if (exists) {
    write({ ...s, bookmarks: s.bookmarks.filter((b) => b.id !== item.id) });
    return { ok: true, saved: false };
  }
  if (s.bookmarks.length >= GUEST_LIMITS.bookmarks) return { ok: false, reason: "limit" };
  write({ ...s, bookmarks: [...s.bookmarks, item] });
  return { ok: true, saved: true };
}

/**
 * Count a page view and report whether a conversion prompt is due.
 * Frequency-limited so guests are nudged, not nagged.
 */
export function countGuestView(): boolean {
  const s = read();
  if (!s.active) return false;
  const views = s.views + 1;
  const due = views % GUEST_LIMITS.promptEveryViews === 0;
  write({ ...s, views, lastPromptAt: due ? Date.now() : s.lastPromptAt });
  return due;
}
