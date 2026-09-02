import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  FlaskConical,
  GraduationCap,
  Layers,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useGuest } from "@/hooks/use-guest";
import { GUEST_LIMITS, countGuestView } from "@/lib/guest";
import { useGuestLearningPrefs, type LearningPrefs } from "@/lib/learning-prefs";
import { AuthPromptDialog } from "@/components/guest/auth-prompt-dialog";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
        content: "Browse courses, notes, papers and sample quiz questions with no account needed.",
      },
      { property: "og:url", content: "https://www.xrounder.in/explore" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.xrounder.in/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Explore as a guest · XRounder" },
      {
        name: "twitter:description",
        content: "Browse courses, notes, papers and sample quiz questions with no account needed.",
      },
      { name: "twitter:image", content: "https://www.xrounder.in/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.xrounder.in/explore" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.xrounder.in/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Explore",
              item: "https://www.xrounder.in/explore",
            },
          ],
        }),
      },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const { isGuest, isAuthenticated, bookmarks, startGuestMode } = useGuest();
  const { prefs: guestPrefs, setPrefs: saveGuestPrefs } = useGuestLearningPrefs();
  const [prompt, setPrompt] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const navigate = useNavigate();

  // Entering /explore opts into guest mode if not logged in.
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

  // Query subjects for the guest's selected semester if available
  const guestSemesterQuery = useQuery({
    queryKey: ["guest", "semester-subjects", guestPrefs?.semesterId],
    enabled: !!guestPrefs?.semesterId,
    queryFn: async () => {
      const semId = guestPrefs!.semesterId;
      const [semRes, subjRes] = await Promise.all([
        supabase
          .from("semesters")
          .select("id, number, title, course_id, courses(title, slug)")
          .eq("id", semId)
          .maybeSingle(),
        supabase
          .from("subjects")
          .select("id, code, slug, title, credits")
          .eq("semester_id", semId)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("sort_order")
          .order("code")
          .limit(8),
      ]);
      if (semRes.error) throw semRes.error;
      if (subjRes.error) throw subjRes.error;
      return {
        semester: semRes.data,
        subjects: subjRes.data ?? [],
      };
    },
  });

  function handleWizardComplete(prefs: LearningPrefs) {
    saveGuestPrefs(prefs);
    setWizardOpen(false);
  }

  const guestCourseSlug = (guestSemesterQuery.data?.semester?.courses as { slug?: string } | null)
    ?.slug;
  const guestSemNumber = guestSemesterQuery.data?.semester?.number;
  const guestSubjects = guestSemesterQuery.data?.subjects ?? [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full sm:max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        {/* ─── Hero Section ─── */}
        <section className="rounded-3xl border border-border bg-surface p-6 shadow-soft sm:p-10">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-full border-accent/40 text-accent">
              {isAuthenticated ? "You're signed in" : "Guest mode"}
            </Badge>
            {guestPrefs && (
              <Badge variant="secondary" className="rounded-full">
                {guestPrefs.courseCode ?? "Course"} · Year {guestPrefs.year} · Sem{" "}
                {guestPrefs.semesterNumber ?? 1}
              </Badge>
            )}
          </div>

          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Explore XRounder — no account needed
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Browse published courses, read unit notes, open past papers and preview quiz questions.
            Personalize your learning path anytime or create a free account to track progress.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              type="button"
              size="lg"
              className="h-12 rounded-full px-8 gap-2"
              onClick={() => setWizardOpen(true)}
            >
              <Sparkles className="h-4 w-4" />
              {guestPrefs ? "Change learning path" : "Personalize your journey"}
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-8">
              <Link to="/courses">
                Browse all courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {!isAuthenticated && (
              <Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-6">
                <Link to="/auth" search={{ mode: "signup" }}>
                  Create free account
                </Link>
              </Button>
            )}
          </div>
        </section>

        {/* ─── Guest Personalized Semester Rail ─── */}
        {guestPrefs && (
          <section className="mt-10 rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                  Your personalized semester
                </span>
                <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
                  {guestPrefs.courseTitle ?? "Course"} · Semester {guestPrefs.semesterNumber ?? 1}
                </h2>
              </div>
              {guestCourseSlug && guestSemNumber && (
                <Button asChild size="sm" className="rounded-xl">
                  <Link
                    to="/courses/$courseSlug/$semesterNumber"
                    params={{ courseSlug: guestCourseSlug, semesterNumber: String(guestSemNumber) }}
                  >
                    Open semester <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>

            {guestSemesterQuery.isLoading ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-28 rounded-2xl" />
                ))}
              </div>
            ) : guestSubjects.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Subjects for this semester are being prepared. You can explore all available courses
                below.
              </p>
            ) : (
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {guestSubjects.map((s) => (
                  <Link
                    key={s.id}
                    to="/courses/$courseSlug/$semesterNumber/$subjectSlug"
                    params={{
                      courseSlug: guestCourseSlug ?? "",
                      semesterNumber: String(guestSemNumber ?? 1),
                      subjectSlug: s.slug,
                    }}
                    className="flex flex-col justify-between p-4 rounded-xl border border-border bg-background hover:border-primary/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase text-muted-foreground">
                          {s.code}
                        </span>
                        {s.credits && (
                          <span className="text-[10px] font-medium text-muted-foreground">
                            {s.credits} cr
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 font-semibold text-sm text-foreground line-clamp-2">
                        {s.title}
                      </h3>
                    </div>
                    <span className="mt-4 text-xs font-medium text-primary">Open units →</span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ─── What you can do ─── */}
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-foreground">
            What you can do now
          </h2>
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

        {/* ─── Course Catalog ─── */}
        <section className="mt-10">
          <div className="flex items-end justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Start with a course
            </h2>
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

      {/* Guest Learning Path Personalization Dialog */}
      <Dialog open={wizardOpen} onOpenChange={setWizardOpen}>
        <DialogContent className="max-w-2xl p-6 sm:p-8">
          <DialogHeader className="sr-only">
            <DialogTitle>Personalize your learning path</DialogTitle>
          </DialogHeader>
          <OnboardingWizard
            initialCourseId={guestPrefs?.courseId}
            initialYear={guestPrefs?.year}
            initialSemesterId={guestPrefs?.semesterId}
            onComplete={handleWizardComplete}
            onSkip={() => setWizardOpen(false)}
            isGuest
            submitLabel="Save preferences"
          />
        </DialogContent>
      </Dialog>

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
