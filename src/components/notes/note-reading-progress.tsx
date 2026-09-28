import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpenCheck, FlaskConical, PartyPopper, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { READ_THRESHOLD, recordGuestNoteProgress } from "@/lib/guest-activity";

/** How far down the page the reader has scrolled, 0–100. */
export function useReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const next = scrollable <= 0 ? 100 : (window.scrollY / scrollable) * 100;
      setPct((prev) => Math.max(prev, Math.max(0, Math.min(100, Math.round(next)))));
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return pct;
}

/**
 * Reading progress for the current note plus an honest weak-topic hint:
 * a half-read note is itself the gap, and the unit quiz is the next step.
 */
export function NoteReadingProgress({
  noteId,
  title,
  href,
  subjectTitle,
  unitTitle,
  quizId,
}: {
  noteId: string;
  title: string;
  href: string;
  subjectTitle?: string | null;
  unitTitle?: string | null;
  quizId?: string | null;
}) {
  const pct = useReadingProgress();

  // Record in 5% steps so the guest store isn't written on every scroll frame.
  const step = Math.floor(pct / 5) * 5;
  useEffect(() => {
    if (!noteId) return;
    recordGuestNoteProgress({ noteId, title, href, subjectTitle, unitTitle, pct: step });
  }, [noteId, title, href, subjectTitle, unitTitle, step]);

  const finished = pct >= READ_THRESHOLD;

  return (
    <section className="mt-10 rounded-3xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
          <BookOpenCheck className="h-4 w-4 text-primary" aria-hidden />
          Your reading progress
        </div>
        <span className="text-sm font-bold text-primary">{pct}%</span>
      </div>
      <ProgressBar value={pct} label="Reading progress" size="md" className="mt-3" />
      <p className="mt-3 text-xs text-muted-foreground">
        {finished
          ? "You've read this note end to end. Test it now so it actually sticks."
          : `${100 - pct}% left on this page — finishing it closes the gap for ${
              unitTitle || subjectTitle || "this unit"
            }.`}
      </p>

      {finished && quizId ? (
        /* ─── Note → Quiz handoff: prominent card once the note is fully read ─── */
        <div className="mt-4 overflow-hidden rounded-2xl border border-primary/30 bg-linear-to-br from-primary/10 via-accent/5 to-card p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <PartyPopper className="h-3.5 w-3.5" aria-hidden /> Unit read — nice work!
              </div>
              <p className="font-display text-lg font-bold text-foreground sm:text-xl">
                Test yourself with 5 quick MCQs
              </p>
              <p className="max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
                A quick check right after reading is the fastest way to lock{" "}
                {unitTitle || title} into memory — and it shows exactly what to revise.
              </p>
            </div>
            <Button
              asChild
              variant="cta"
              size="lg"
              className="h-12 shrink-0 rounded-2xl px-6 text-sm font-bold shadow-xs"
            >
              <Link to="/quizzes/$quizId" params={{ quizId }}>
                <FlaskConical className="mr-2 h-4 w-4" /> Start the unit quiz
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-border/70 bg-background p-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-accent">
            <Target className="h-3.5 w-3.5" aria-hidden /> Weak topic hint
          </div>
          <p className="mt-2 text-sm text-foreground">
            {finished
              ? `${unitTitle || title} is covered. Practise the unit questions to confirm it isn't a weak topic.`
              : `${unitTitle || title} still counts as a weak topic until you finish this note and answer its questions.`}
          </p>
          {quizId && (
            <Button asChild size="sm" className="mt-3 rounded-full px-5">
              <Link to="/quizzes/$quizId" params={{ quizId }}>
                <FlaskConical className="mr-2 h-4 w-4" /> Practise this unit
              </Link>
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
