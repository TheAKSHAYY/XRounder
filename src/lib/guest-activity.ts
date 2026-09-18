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
  getGuestState,
  subscribeGuest,
  updateGuestState,
  type GuestNoteActivity,
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
      updatedAt: Date.now(),
    };
    return { ...s, notes: { ...s.notes, [input.noteId]: next } };
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
  updateGuestState((s) => {
    const prev = s.topics[input.quizId];
    const next: GuestTopicActivity = {
      quizId: input.quizId,
      title: input.quizTitle ?? prev?.title ?? "Practice quiz",
      subjectTitle: input.subjectTitle ?? prev?.subjectTitle ?? null,
      unitTitle: input.unitTitle ?? prev?.unitTitle ?? null,
      seen: (prev?.seen ?? 0) + 1,
      answered: (prev?.answered ?? 0) + (input.answered ? 1 : 0),
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

export type GuestActivitySummary = {
  hasActivity: boolean;
  notesOpened: number;
  notesRead: number;
  questionsPreviewed: number;
  questionsAnswered: number;
  topicsTouched: number;
  /** Average reading completion across every note opened. */
  readingProgress: number;
  lastActivityAt: number | null;
  continueNote: GuestNoteActivity | null;
  weakTopics: GuestWeakTopic[];
};

const EMPTY_SUMMARY: GuestActivitySummary = {
  hasActivity: false,
  notesOpened: 0,
  notesRead: 0,
  questionsPreviewed: 0,
  questionsAnswered: 0,
  topicsTouched: 0,
  readingProgress: 0,
  lastActivityAt: null,
  continueNote: null,
  weakTopics: [],
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

  return {
    hasActivity: true,
    notesOpened: notes.length,
    notesRead,
    questionsPreviewed: topics.reduce((sum, t) => sum + t.seen, 0),
    questionsAnswered: topics.reduce((sum, t) => sum + t.answered, 0),
    topicsTouched: topics.length,
    readingProgress,
    lastActivityAt: Math.max(lastNote?.updatedAt ?? 0, lastTopic?.updatedAt ?? 0) || null,
    continueNote: unfinished[0] ?? lastNote,
    weakTopics,
  };
}

/** Reactive guest activity summary for components. */
export function useGuestActivity(): GuestActivitySummary {
  return useSyncExternalStore(
    subscribeGuest,
    () => summarizeGuestActivity(),
    () => EMPTY_SUMMARY,
  );
}
