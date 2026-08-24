import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Lock, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuthPromptDialog } from "@/components/guest/auth-prompt-dialog";
import { GUEST_LIMITS, guestMcqSeen, recordGuestMcq } from "@/lib/guest";
import type { Option, Question } from "@/components/quiz/types";
import { cn } from "@/lib/utils";

/**
 * Read-only quiz preview for guests: up to GUEST_LIMITS.mcqPerQuiz questions,
 * no scoring (server grading is sign-in only), then a conversion screen.
 */
export function GuestQuizPreview({
  quizId,
  questions,
  optionsByQ,
}: {
  quizId: string;
  questions: Question[];
  optionsByQ: Record<string, Option[]>;
}) {
  const limit = GUEST_LIMITS.mcqPerQuiz;
  const previewable = questions.slice(0, limit);
  const [idx, setIdx] = useState(() => Math.min(guestMcqSeen(quizId), previewable.length));
  const [picked, setPicked] = useState<string | null>(null);
  const [promptOpen, setPromptOpen] = useState(false);

  const done = idx >= previewable.length;
  const current = done ? null : previewable[idx];

  function next() {
    recordGuestMcq(quizId);
    setPicked(null);
    setIdx((i) => i + 1);
    if (idx + 1 >= previewable.length) setPromptOpen(true);
  }

  if (done || previewable.length === 0) {
    return (
      <>
        <div className="mt-6 rounded-3xl border border-border bg-surface p-6 text-center sm:p-8">
          <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="h-5 w-5" aria-hidden />
          </div>
          <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
            That's your free preview
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Guests can preview {limit} questions per quiz. Create a free account to take the full
            quiz, get instant scoring and keep your results.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button asChild className="rounded-full px-6">
              <Link to="/auth" search={{ mode: "signup" }}>
                Create free account
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link to="/explore">Keep exploring</Link>
            </Button>
          </div>
        </div>
        <AuthPromptDialog
          open={promptOpen}
          onOpenChange={setPromptOpen}
          title="Take the full quiz"
          description="You've used your guest preview for this quiz. Sign up free to answer every question, get scored instantly and track your progress."
          benefits={[
            "Full quizzes with instant scoring",
            "Attempt history & analytics",
            "Saved bookmarks and progress",
          ]}
        />
      </>
    );
  }

  const options = optionsByQ[current!.id] ?? [];

  return (
    <div className="mt-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <Badge variant="outline" className="rounded-full">
          Preview {idx + 1} / {previewable.length}
        </Badge>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
          <Sparkles className="h-3.5 w-3.5" aria-hidden /> Guest mode
        </span>
      </div>

      <h2 className="mt-4 text-lg font-semibold leading-snug text-foreground">{current!.prompt}</h2>

      <ul className="mt-5 space-y-2">
        {options.map((o) => (
          <li key={o.id}>
            <button
              type="button"
              onClick={() => setPicked(o.id)}
              className={cn(
                "w-full rounded-2xl border px-4 py-3 text-left text-sm transition-colors",
                picked === o.id
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-background hover:bg-muted/60",
              )}
            >
              {o.text}
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-muted-foreground">
        Answers aren't scored in guest mode — sign in for instant feedback and results.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button className="rounded-full px-6" onClick={next}>
          {idx + 1 < previewable.length ? "Next question" : "Finish preview"}
        </Button>
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link to="/auth" search={{ mode: "signup" }}>
            Sign up to take full quiz
          </Link>
        </Button>
      </div>
    </div>
  );
}
