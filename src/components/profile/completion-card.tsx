import { CheckCircle2, CircleDashed } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { COMPLETION_FIELDS } from "@/lib/profile";

type MissingField = (typeof COMPLETION_FIELDS)[number];

export function CompletionCard({
  pct,
  filled,
  total,
  missing,
  onJump,
}: {
  pct: number;
  filled: number;
  total: number;
  missing: MissingField[];
  onJump: (section: MissingField["section"]) => void;
}) {
  const done = missing.length === 0;

  return (
    <section
      aria-labelledby="completion-heading"
      className="rounded-xl border border-border bg-surface p-4 shadow-soft"
    >
      <h2 id="completion-heading" className="text-h3 text-foreground">
        Profile completion
      </h2>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-serif text-3xl font-semibold tabular-nums text-foreground">
          {pct}%
        </span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {filled}/{total} fields
        </span>
      </div>
      <ProgressBar value={pct} label="Profile completion" className="mt-2" size="md" />

      {done ? (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-success">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden /> Your profile is complete.
        </p>
      ) : (
        <>
          <p className="mt-3 text-sm text-muted-foreground">
            Complete your profile to unlock a better learning experience.
          </p>
          <ul className="mt-3 space-y-1.5">
            {missing.slice(0, 5).map((f) => (
              <li key={f.key} className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                <CircleDashed className="h-3 w-3 shrink-0" aria-hidden />
                <span className="truncate">{f.label}</span>
              </li>
            ))}
            {missing.length > 5 && (
              <li className="text-xs text-muted-foreground">+{missing.length - 5} more</li>
            )}
          </ul>
          <Button
            size="sm"
            className="tap-target mt-4 w-full"
            onClick={() => onJump(missing[0]!.section)}
          >
            Complete profile
          </Button>
        </>
      )}
    </section>
  );
}
