import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, BookOpen, FlaskConical, Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useGuestActivity } from "@/lib/guest-activity";

type SampleSubject = { id: string; title: string; code?: string | null };

/**
 * Real, honest progress for a visitor on /explore.
 *
 * If they've actually read notes or previewed questions, everything here is
 * computed from that activity. If they haven't started yet, we show a clearly
 * labelled sample snapshot so the page still explains what XRounder tracks.
 */
export function GuestProgressPanel({ sampleSubjects = [] }: { sampleSubjects?: SampleSubject[] }) {
  const activity = useGuestActivity();

  if (!activity.hasActivity) {
    return <SampleSnapshot subjects={sampleSubjects} />;
  }

  const stats = [
    { label: "Notes opened", value: `${activity.notesOpened}`, icon: BookOpen },
    { label: "Notes finished", value: `${activity.notesRead}`, icon: Target },
    { label: "Questions tried", value: `${activity.questionsAnswered}`, icon: FlaskConical },
    { label: "Topics practised", value: `${activity.topicsTouched}`, icon: Target },
  ];

  return (
    <section className="mt-10 rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            Your progress so far
          </span>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            Built from what you've actually studied
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            This lives in your browser only. Create a free account to keep it, get scored quizzes and
            accuracy-based weak topics.
          </p>
        </div>
        <Badge variant="outline" className="shrink-0 whitespace-nowrap rounded-full">
          Live · this browser
        </Badge>
      </div>

      <div className="mt-6 max-w-md">
        <ProgressBar value={activity.readingProgress} label="Reading completion" />
        <p className="mt-2 text-[11px] font-medium text-muted-foreground">
          Average across the {activity.notesOpened} note
          {activity.notesOpened === 1 ? "" : "s"} you opened ·{" "}
          <span className="tabular-nums text-foreground">{activity.readingProgress}%</span>
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-background p-4">
            <s.icon className="h-4 w-4 text-primary" aria-hidden />
            <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-foreground">
              {s.value}
            </p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {activity.continueNote && (
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-primary/25 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
              Continue where you left off
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-foreground">
              {activity.continueNote.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {activity.continueNote.pct}% read
              {activity.continueNote.subjectTitle ? ` · ${activity.continueNote.subjectTitle}` : ""}
            </p>
          </div>
          <Button asChild size="sm" className="shrink-0 rounded-xl">
            <a href={activity.continueNote.href}>
              Resume <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}

      {activity.weakTopics.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-warning" aria-hidden />
            <h3 className="font-display text-lg font-semibold text-foreground">
              Needs your attention
            </h3>
          </div>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {activity.weakTopics.map((t) => (
              <li
                key={t.key}
                className="flex flex-col justify-between rounded-2xl border border-border bg-background p-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground line-clamp-2">{t.title}</p>
                  {(t.subjectTitle || t.unitTitle) && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {[t.subjectTitle, t.unitTitle].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.reason}</p>
                </div>
                <a
                  href={t.href}
                  className="mt-4 text-xs font-semibold text-primary hover:underline"
                >
                  Work on this →
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function SampleSnapshot({ subjects }: { subjects: SampleSubject[] }) {
  const named = subjects.slice(0, 3);

  return (
    <section className="mt-10 rounded-3xl border border-dashed border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Sample snapshot
          </span>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            This is what your progress will look like
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Open a note or preview a few quiz questions and this panel switches to your own numbers —
            reading completion, topics practised and what needs attention.
          </p>
        </div>
        <Badge variant="secondary" className="shrink-0 whitespace-nowrap rounded-full">
          Example only
        </Badge>
      </div>

      <div className="mt-6 max-w-md opacity-70">
        <ProgressBar value={62} label="Reading completion" />
        <p className="mt-2 text-[11px] font-medium text-muted-foreground">
          Sample student · <span className="tabular-nums text-foreground">62%</span>
        </p>
      </div>

      {named.length > 0 && (
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {named.map((s, i) => (
            <li
              key={s.id}
              className="rounded-2xl border border-border bg-background p-4 opacity-70"
            >
              <p className="text-sm font-semibold text-foreground line-clamp-2">{s.title}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Sample: {[78, 54, 41][i] ?? 50}% explored
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild className="rounded-xl">
          <Link to="/courses">
            Start with a note <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-xl">
          <Link to="/mock-test">Try practice questions</Link>
        </Button>
      </div>
    </section>
  );
}
