/**
 * Guest study activity — the "real data" behind a guest's progress view.
 *
 * Everything a guest actually does (notes opened + how far they read, quiz
 * questions previewed per topic) is recorded in the same browser-local guest
 * store used by `src/lib/guest.ts`. No Supabase writes, no account needed.
 * Signing in clears it (see `clearGuestState`).
 */

import { useSyncExternalStore } from "react";

import {
  GUEST_DAILY_GOAL,
  getGuestState,
  guestDayKey,
  recordGuestStudyAction,
  subscribeGuest,
  updateGuestState,
  type GuestNoteActivity,
  type GuestState,
  type GuestTopicActivity,
} from "@/lib/guest";

export type { GuestNoteActivity, GuestTopicActivity };

/** A note counts as "read" once the reader reaches this much of the page. */
export const READ_THRESHOLD = 85;

export function recordGuestNoteProgress(input: {
  noteId: string;
  title: string;
  href: string;
  subjectTitle?: string | null;
  unitTitle?: string | null;
  pct: number;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(input.pct)));
  const before = getGuestState().notes[input.noteId]?.pct ?? 0;
  // Finishing a note is one study action towards today's goal.
  if (before < READ_THRESHOLD && pct >= READ_THRESHOLD) recordGuestStudyAction();
  updateGuestState((s) => {
    const prev = s.notes[input.noteId];
    // Progress only ever moves forward — scrolling back up isn't "unreading".
    if (prev && prev.pct >= pct && prev.title === input.title) return s;
    const next: GuestNoteActivity = {
      id: input.noteId,
      title: input.title,
      href: input.href,
      subjectTitle: input.subjectTitle ?? prev?.subjectTitle ?? null,
      unitTitle: input.unitTitle ?? prev?.unitTitle ?? null,
      pct: Math.max(pct, prev?.pct ?? 0),
      visits: prev?.visits ?? 1,
      updatedAt: Date.now(),
    };
    return { ...s, notes: { ...s.notes, [input.noteId]: next } };
  });
}

/**
 * Count one *opening* of a note. Called once per note page mount, so a second
 * visit is an honest "came back to revise this" signal.
 */
export function recordGuestNoteVisit(input: {
  noteId: string;
  title: string;
  href: string;
  subjectTitle?: string | null;
  unitTitle?: string | null;
}) {
  recordGuestStudyAction();
  updateGuestState((s) => {
    const prev = s.notes[input.noteId];
    const next: GuestNoteActivity = {
      id: input.noteId,
      title: input.title,
      href: input.href,
      subjectTitle: input.subjectTitle ?? prev?.subjectTitle ?? null,
      unitTitle: input.unitTitle ?? prev?.unitTitle ?? null,
      pct: prev?.pct ?? 0,
      visits: (prev?.visits ?? 0) + 1,
      updatedAt: Date.now(),
    };
    return { ...s, notes: { ...s.notes, [input.noteId]: next } };
  });
}

/** Count one *practice session* on a quiz. Called once per quiz page mount. */
export function recordGuestTopicSession(input: {
  quizId: string;
  quizTitle?: string | null;
  subjectTitle?: string | null;
  unitTitle?: string | null;
}) {
  recordGuestStudyAction();
  updateGuestState((s) => {
    const prev = s.topics[input.quizId];
    const next: GuestTopicActivity = {
      quizId: input.quizId,
      title: input.quizTitle ?? prev?.title ?? "Practice quiz",
      subjectTitle: input.subjectTitle ?? prev?.subjectTitle ?? null,
      unitTitle: input.unitTitle ?? prev?.unitTitle ?? null,
      seen: prev?.seen ?? 0,
      answered: prev?.answered ?? 0,
      sessions: (prev?.sessions ?? 0) + 1,
      updatedAt: Date.now(),
    };
    return { ...s, topics: { ...s.topics, [input.quizId]: next } };
  });
}

/** Record one previewed quiz question for a topic (quiz). */
export function recordGuestTopicAttempt(input: {
  quizId: string;
  quizTitle?: string | null;
  subjectTitle?: string | null;
  unitTitle?: string | null;
  answered: boolean;
}) {
  if (input.answered) recordGuestStudyAction();
  updateGuestState((s) => {
    const prev = s.topics[input.quizId];
    const next: GuestTopicActivity = {
      quizId: input.quizId,
      title: input.quizTitle ?? prev?.title ?? "Practice quiz",
      subjectTitle: input.subjectTitle ?? prev?.subjectTitle ?? null,
      unitTitle: input.unitTitle ?? prev?.unitTitle ?? null,
      seen: (prev?.seen ?? 0) + 1,
      answered: (prev?.answered ?? 0) + (input.answered ? 1 : 0),
      sessions: prev?.sessions ?? 1,
      updatedAt: Date.now(),
    };
    return { ...s, topics: { ...s.topics, [input.quizId]: next } };
  });
}

export type GuestWeakTopic = {
  key: string;
  title: string;
  subjectTitle: string | null;
  unitTitle: string | null;
  /** 0–100 "explored" score for this topic. Lower = needs attention. */
  coverage: number;
  reason: string;
  href: string;
};

/** One step of the Learn → Practice → Detect → Revise → Retest loop. */
export type GuestJourneyStage = {
  key: "learn" | "practice" | "detect" | "revise" | "retest";
  label: string;
  /** What this step means, stated in terms of what the visitor did. */
  detail: string;
  done: boolean;
  /** True for the single step the visitor should do next. */
  current: boolean;
  /** Where to go to complete this step, when we know a concrete target. */
  href: string | null;
  cta: string;
};

export type GuestActivitySummary = {
  hasActivity: boolean;
  notesOpened: number;
  notesRead: number;
  notesRevisited: number;
  questionsPreviewed: number;
  questionsAnswered: number;
  topicsTouched: number;
  topicsRetested: number;
  /** Average reading completion across every note opened. */
  readingProgress: number;
  lastActivityAt: number | null;
  continueNote: GuestNoteActivity | null;
  weakTopics: GuestWeakTopic[];
  journey: GuestJourneyStage[];
  /** 0–100 completion of the five-step loop. */
  journeyPct: number;
};

function buildJourney(input: {
  notesRead: number;
  notesOpened: number;
  questionsAnswered: number;
  weakTopics: GuestWeakTopic[];
  notesRevisited: number;
  topicsRetested: number;
  continueNote: GuestNoteActivity | null;
  firstTopicHref: string | null;
}): { journey: GuestJourneyStage[]; journeyPct: number } {
  const weak = input.weakTopics[0] ?? null;

  const raw = [
    {
      key: "learn" as const,
      label: "Learn",
      detail: input.notesRead
        ? `${input.notesRead} note${input.notesRead === 1 ? "" : "s"} read end to end`
        : input.notesOpened
          ? "A note is open — finish reading it"
          : "Open a unit note and read it",
      done: input.notesRead > 0,
      href: input.continueNote?.href ?? "/courses",
      cta: input.notesOpened ? "Finish reading" : "Open a note",
    },
    {
      key: "practice" as const,
      label: "Practice",
      detail: input.questionsAnswered
        ? `${input.questionsAnswered} question${input.questionsAnswered === 1 ? "" : "s"} attempted`
        : "Attempt questions from that unit",
      done: input.questionsAnswered > 0,
      href: input.firstTopicHref ?? "/mock-test",
      cta: "Practice questions",
    },
    {
      key: "detect" as const,
      label: "Detect",
      detail: weak
        ? `Weakest right now: ${weak.title}`
        : "We flag the topics you skipped or half-read",
      done: input.weakTopics.length > 0,
      href: weak?.href ?? null,
      cta: "See weak topics",
    },
    {
      key: "revise" as const,
      label: "Revise",
      detail: input.notesRevisited
        ? `${input.notesRevisited} note${input.notesRevisited === 1 ? "" : "s"} revisited`
        : "Go back to the note behind that weak topic",
      done: input.notesRevisited > 0,
      href: weak?.href ?? input.continueNote?.href ?? "/courses",
      cta: "Revise it",
    },
    {
      key: "retest" as const,
      label: "Retest",
      detail: input.topicsRetested
        ? `${input.topicsRetested} topic${input.topicsRetested === 1 ? "" : "s"} practised again`
        : "Practise the same topic again to confirm it improved",
      done: input.topicsRetested > 0,
      href: input.firstTopicHref ?? "/mock-test",
      cta: "Retest now",
    },
  ];

  const nextIdx = raw.findIndex((s) => !s.done);
  const journey: GuestJourneyStage[] = raw.map((s, i) => ({ ...s, current: i === nextIdx }));
  const doneCount = raw.filter((s) => s.done).length;

  return { journey, journeyPct: Math.round((doneCount / raw.length) * 100) };
}

const EMPTY_JOURNEY = buildJourney({
  notesRead: 0,
  notesOpened: 0,
  questionsAnswered: 0,
  weakTopics: [],
  notesRevisited: 0,
  topicsRetested: 0,
  continueNote: null,
  firstTopicHref: null,
});

const EMPTY_SUMMARY: GuestActivitySummary = {
  hasActivity: false,
  notesOpened: 0,
  notesRead: 0,
  notesRevisited: 0,
  questionsPreviewed: 0,
  questionsAnswered: 0,
  topicsTouched: 0,
  topicsRetested: 0,
  readingProgress: 0,
  lastActivityAt: null,
  continueNote: null,
  weakTopics: [],
  journey: EMPTY_JOURNEY.journey,
  journeyPct: 0,
};

export function summarizeGuestActivity(state = getGuestState()): GuestActivitySummary {
  const notes = Object.values(state.notes ?? {});
  const topics = Object.values(state.topics ?? {});

  if (notes.length === 0 && topics.length === 0) return EMPTY_SUMMARY;

  const notesRead = notes.filter((n) => n.pct >= READ_THRESHOLD).length;
  const readingProgress = notes.length
    ? Math.round(notes.reduce((sum, n) => sum + n.pct, 0) / notes.length)
    : 0;

  const unfinished = notes
    .filter((n) => n.pct < READ_THRESHOLD)
    .sort((a, b) => b.updatedAt - a.updatedAt);

  const weakTopics: GuestWeakTopic[] = [
    // Topics where questions were skipped rather than answered.
    ...topics
      .map((t) => {
        const coverage = t.seen ? Math.round((t.answered / t.seen) * 100) : 0;
        return {
          key: `topic-${t.quizId}`,
          title: t.title,
          subjectTitle: t.subjectTitle,
          unitTitle: t.unitTitle,
          coverage,
          reason:
            coverage === 0
              ? `You opened ${t.seen} question${t.seen === 1 ? "" : "s"} here without answering.`
              : `You answered ${t.answered} of ${t.seen} previewed questions.`,
          href: `/quizzes/${t.quizId}`,
        };
      })
      .filter((t) => t.coverage < 80),
    // Notes left half-read are the other honest weakness signal for guests.
    ...unfinished.map((n) => ({
      key: `note-${n.id}`,
      title: n.title,
      subjectTitle: n.subjectTitle,
      unitTitle: n.unitTitle,
      coverage: n.pct,
      reason: `You read ${n.pct}% of this note — finish it to close the gap.`,
      href: n.href,
    })),
  ]
    .sort((a, b) => a.coverage - b.coverage)
    .slice(0, 3);

  const lastNote = [...notes].sort((a, b) => b.updatedAt - a.updatedAt)[0] ?? null;
  const lastTopic = [...topics].sort((a, b) => b.updatedAt - a.updatedAt)[0] ?? null;

  const notesRevisited = notes.filter((n) => (n.visits ?? 1) > 1).length;
  const topicsRetested = topics.filter((t) => (t.sessions ?? 1) > 1).length;
  const questionsAnswered = topics.reduce((sum, t) => sum + t.answered, 0);
  const continueNote = unfinished[0] ?? lastNote;
  const firstTopicHref = lastTopic ? `/quizzes/${lastTopic.quizId}` : null;

  const { journey, journeyPct } = buildJourney({
    notesRead,
    notesOpened: notes.length,
    questionsAnswered,
    weakTopics,
    notesRevisited,
    topicsRetested,
    continueNote,
    firstTopicHref,
  });

  return {
    hasActivity: true,
    notesOpened: notes.length,
    notesRead,
    notesRevisited,
    questionsPreviewed: topics.reduce((sum, t) => sum + t.seen, 0),
    questionsAnswered,
    topicsTouched: topics.length,
    topicsRetested,
    readingProgress,
    lastActivityAt: Math.max(lastNote?.updatedAt ?? 0, lastTopic?.updatedAt ?? 0) || null,
    continueNote,
    weakTopics,
    journey,
    journeyPct,
  };
}

// useSyncExternalStore requires a stable snapshot reference, so the summary is
// memoized against the guest store object and only recomputed when it changes.
let snapshotSource: unknown = null;
let snapshotValue: GuestActivitySummary = EMPTY_SUMMARY;

function getSummarySnapshot(): GuestActivitySummary {
  const state = getGuestState();
  if (state !== snapshotSource) {
    snapshotSource = state;
    snapshotValue = summarizeGuestActivity(state);
  }
  return snapshotValue;
}

/** Reactive guest activity summary for components. */
export function useGuestActivity(): GuestActivitySummary {
  return useSyncExternalStore(subscribeGuest, getSummarySnapshot, () => EMPTY_SUMMARY);
}
