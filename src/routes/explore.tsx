import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, Bookmark, FlaskConical, Layers, TrendingUp } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useGuest } from "@/hooks/use-guest";
import { GUEST_LIMITS, countGuestView } from "@/lib/guest";
import { AuthPromptDialog } from "@/components/guest/auth-prompt-dialog";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore as a guest · XRounder" },
      {
        name: "description",
        content:
          "Try XRounder without an account: browse courses, read notes, preview past papers and sample quiz questions. Sign up free when you want to save progress.",
      },
      { property: "og:title", content: "Explore XRounder as a guest" },
      {
        property: "og:description",
        content:
          "Browse courses, notes, papers and sample quiz questions with no account needed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const { isGuest, isAuthenticated, bookmarks, startGuestMode } = useGuest();
  const [prompt, setPrompt] = useState(false);

  // Entering /explore is the act of opting into guest mode.
  useEffect(() => {
    if (!isAuthenticated) startGuestMode();
  }, [isAuthenticated, startGuestMode]);

  useEffect(() => {
    if (countGuestView()) setPrompt(true);
  }, []);

  const coursesQ = useQuery({
    queryKey: ["public", "courses", "explore"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, code, title, slug, description, total_semesters")
        .eq("status", "published")
        .order("sort_order")
        .limit(6);
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 60_000,
  });

  const courses = coursesQ.data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <section className="rounded-3xl border border-border bg-surface p-6 shadow-soft sm:p-10">
          <Badge variant="outline" className="rounded-full border-accent/40 text-accent">
            {isAuthenticated ? "You're signed in" : "Guest mode"}
          </Badge>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Explore XRounder — no account needed
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Browse every published course, read notes, open past papers and preview quiz questions.
            Create a free account whenever you want to save your work.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full px-8">
              <Link to="/courses">
                Browse courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {!isAuthenticated && (
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-8">
                <Link to="/auth" search={{ mode: "signup" }}>
                  Create free account
                </Link>
              </Button>
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-foreground">What you can do now</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <GuestCard
              icon={BookOpen}
              title="Read notes & papers"
              body="Full access to published notes, past papers and video lectures."
              state="Unlocked"
            />
            <GuestCard
              icon={FlaskConical}
              title="Preview quizzes"
              body={`See up to ${GUEST_LIMITS.mcqPerQuiz} questions per quiz. Sign in for scoring and full attempts.`}
              state="Limited"
            />
            <GuestCard
              icon={Bookmark}
              title="Temporary saves"
              body={`Keep up to ${GUEST_LIMITS.bookmarks} items for this tab only (${bookmarks.length} used).`}
              state="Limited"
            />
            <GuestCard
              icon={TrendingUp}
              title="Progress & streaks"
              body="Progress tracking, streaks and stats need a free account."
              state="Sign in"
            />
            <GuestCard
              icon={Layers}
              title="Bookmarks that stick"
              body="Save across devices and revisit anytime once you sign up."
              state="Sign in"
            />
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-foreground">Start with a course</h2>
            <Link to="/courses" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>

          {coursesQ.isLoading ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-36 rounded-2xl" />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No published courses yet — check back soon.
            </p>
          ) : (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/courses/$courseSlug"
                    params={{ courseSlug: c.slug }}
                    className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {c.code}
                    </span>
                    <span className="mt-1 font-display text-lg font-semibold text-foreground">
                      {c.title}
                    </span>
                    {c.description && (
                      <span className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {c.description}
                      </span>
                    )}
                    <span className="mt-4 text-xs text-muted-foreground">
                      {c.total_semesters ?? 0} semesters
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {isGuest && bookmarks.length > 0 && (
          <section className="mt-10 rounded-3xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Your temporary saves
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              These disappear when you close this tab. Sign up to keep them.
            </p>
            <ul className="mt-4 space-y-2">
              {bookmarks.map((b) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm"
                >
                  <span className="truncate text-foreground">{b.label}</span>
                  <a href={b.href} className="shrink-0 text-primary hover:underline">
                    Open
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <SiteFooter />

      <AuthPromptDialog
        open={prompt && !isAuthenticated}
        onOpenChange={setPrompt}
        title="Enjoying XRounder?"
        description="You've explored a few pages as a guest. A free account keeps your bookmarks, progress and quiz results."
      />
    </div>
  );
}

function GuestCard({
  icon: Icon,
  title,
  body,
  state,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  state: "Unlocked" | "Limited" | "Sign in";
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <Badge
          variant={state === "Unlocked" ? "default" : "secondary"}
          className="rounded-full text-[10px] uppercase tracking-wide"
        >
          {state}
        </Badge>
      </div>
      <h3 className="mt-3 font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
