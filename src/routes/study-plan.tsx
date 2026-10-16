import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Clock, Lightbulb, Loader2, Sparkle, Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateStudyPlan, type StudyPlan } from "@/lib/study-plan.functions";
import { savePlan, useSavedPlan } from "@/lib/saved-plan";
import { ActivePlanPanel } from "@/components/study-plan/active-plan-panel";

const LEVELS = [
  { value: "beginner", label: "Just starting" },
  { value: "intermediate", label: "Know the basics" },
  { value: "advanced", label: "Revising for exams" },
] as const;

const EXAMPLES = [
  "I keep getting subnetting questions wrong",
  "Understand normalization in DBMS before my unit test",
  "Revise Data Structures Unit 3 in a week",
];

export const Route = createFileRoute("/study-plan")({
  component: StudyPlanPage,
  head: () => ({
    meta: [
      { title: "AI Study Plan — XRounder" },
      {
        name: "description",
        content:
          "Tell XRounder a topic, doubt or goal and get a personalised next-step study plan with timings, practice ideas and self-check questions.",
      },
      { property: "og:title", content: "AI Study Plan — XRounder" },
      {
        property: "og:description",
        content: "A personalised next-step study plan built around your topic, level and daily study time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function StudyPlanPage() {
  const runPlan = useServerFn(generateStudyPlan);
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState<(typeof LEVELS)[number]["value"]>("beginner");
  const [minutesPerDay, setMinutesPerDay] = useState(45);

  const mutation = useMutation<StudyPlan, Error>({
    mutationFn: () => runPlan({ data: { goal: goal.trim(), level, minutesPerDay } }),
    onSuccess: (p) => savePlan(goal.trim(), p),
  });

  const plan = mutation.data;
  const saved = useSavedPlan();
  const canSubmit = goal.trim().length >= 6 && !mutation.isPending;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
        Personalised next step
      </span>
      <h1 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
        Tell us what you're stuck on
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
        Give a topic, a doubt or a goal. You'll get an ordered plan for today — what to learn, how
        long to spend, what to practise and how to check yourself.
      </p>

      <form
        className="mt-8 rounded-3xl border border-border bg-surface p-5 sm:p-7"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) mutation.mutate();
        }}
      >
        <Label htmlFor="goal" className="text-sm font-semibold">
          Your topic, question or goal
        </Label>
        <Textarea
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          rows={3}
          maxLength={600}
          placeholder="e.g. I keep getting subnetting questions wrong"
          className="mt-2 resize-none"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setGoal(ex)}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              {ex}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <Label className="text-sm font-semibold">Where are you right now?</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => setLevel(l.value)}
                  aria-pressed={level === l.value}
                  className={
                    level === l.value
                      ? "rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground"
                      : "rounded-full border border-border px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  }
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="minutes" className="text-sm font-semibold">
              Minutes you can study today
            </Label>
            <Input
              id="minutes"
              type="number"
              min={10}
              max={240}
              step={5}
              value={minutesPerDay}
              onChange={(e) => setMinutesPerDay(Number(e.target.value) || 45)}
              className="mt-2 max-w-32"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="submit" size="lg" disabled={!canSubmit} className="h-11 rounded-full px-6">
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Building your plan…
              </>
            ) : (
              <>
                Get my study plan <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          {goal.trim().length > 0 && goal.trim().length < 6 && (
            <span className="text-xs text-muted-foreground">Add a little more detail.</span>
          )}
        </div>

        {mutation.isError && (
          <p className="mt-4 rounded-2xl border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
            {mutation.error.message || "Something went wrong. Please try again."}
          </p>
        )}
      </form>

      {saved && (
        <div className="mt-10">
          <ActivePlanPanel showLink={false} />
        </div>
      )}
      {plan && <PlanView plan={plan} />}
    </main>
  );
}

function PlanView({ plan }: { plan: StudyPlan }) {
  const total = plan.steps.reduce((sum, s) => sum + (Number(s.minutes) || 0), 0);

  return (
    <section className="mt-10 rounded-3xl border border-border bg-background p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-semibold text-foreground">{plan.title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{plan.summary}</p>
        </div>
        {total > 0 && (
          <Badge variant="secondary" className="shrink-0 whitespace-nowrap rounded-full">
            <Clock className="mr-1 h-3 w-3" /> about {total} min
          </Badge>
        )}
      </div>

      {plan.focusAreas.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {plan.focusAreas.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground"
            >
              <Target className="h-3 w-3 shrink-0 text-primary" /> {f}
            </span>
          ))}
        </div>
      )}

      <ol className="mt-6 grid gap-3">
        {plan.steps.map((step, i) => (
          <li key={`${step.title}-${i}`} className="rounded-2xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <span className="min-w-0 text-sm font-semibold text-foreground">{step.title}</span>
              {Number(step.minutes) > 0 && (
                <span className="ml-auto shrink-0 whitespace-nowrap text-xs text-muted-foreground">
                  {step.minutes} min
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{step.action}</p>
            <p className="mt-1 text-xs text-muted-foreground/80">Why: {step.why}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-accent/40 bg-accent/5 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Lightbulb className="h-4 w-4 shrink-0 text-accent" /> Practice this
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{plan.practiceIdea}</p>
        </div>
        {plan.checkYourself.length > 0 && (
          <div className="rounded-2xl border border-border bg-surface p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> Check yourself
            </h3>
            <ul className="mt-2 grid gap-2">
              {plan.checkYourself.map((q) => (
                <li key={q} className="flex gap-2 text-sm text-muted-foreground">
                  <Sparkle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> {q}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
