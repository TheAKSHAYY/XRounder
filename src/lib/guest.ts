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

export type GuestState = {
  active: boolean;
  startedAt: number | null;
  /** quizId -> questions previewed */
  mcqSeen: Record<string, number>;
  /** contentId -> label, tab-local "saved" items */
  bookmarks: { id: string; label: string; href: string }[];
  /** Route views since the last conversion prompt. */
  views: number;
  lastPromptAt: number | null;
};

const EMPTY: GuestState = {
  active: false,
  startedAt: null,
  mcqSeen: {},
  bookmarks: [],
  views: 0,
  lastPromptAt: null,
};

const listeners = new Set<() => void>();
let cache: GuestState | null = null;

function read(): GuestState {
  if (typeof window === "undefined") return EMPTY;
  if (cache) return cache;
  try {
    const raw = window.sessionStorage.getItem(KEY);
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
      window.sessionStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* private mode — in-memory only */
    }
  }
  listeners.forEach((l) => l());
}

export function subscribeGuest(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getGuestState(): GuestState {
  return read();
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

export function guestMcqSeen(quizId: string): number {
  return read().mcqSeen[quizId] ?? 0;
}

export function guestMcqRemaining(quizId: string): number {
  return Math.max(0, GUEST_LIMITS.mcqPerQuiz - guestMcqSeen(quizId));
}

export function toggleGuestBookmark(item: { id: string; label: string; href: string }):
  | { ok: true; saved: boolean }
  | { ok: false; reason: "limit" } {
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
