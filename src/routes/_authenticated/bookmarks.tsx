import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BookMarked, Compass, FileText, ListChecks, StickyNote } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { StatChip } from "@/components/ui/stat-chip";
import { StudentHero } from "@/components/student/student-hero";

type Bookmark = {
  id: string;
  kind: "note" | "paper" | "quiz" | "unit";
  ref_id: string;
  title: string | null;
  created_at: string;
};

export const Route = createFileRoute("/_authenticated/bookmarks")({
  head: () => ({
    meta: [
      { title: "Your bookmarks · BCA Gurukul" },
      {
        name: "description",
        content: "Every note, paper and quiz you saved for revision, in one place.",
      },
      { property: "og:title", content: "Your bookmarks · BCA Gurukul" },
      {
        property: "og:description",
        content: "Every note, paper and quiz you saved for revision, in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BookmarksPage,
});

const KIND_META = {
  note: { label: "Note", icon: StickyNote },
  paper: { label: "Paper", icon: FileText },
  quiz: { label: "Quiz", icon: ListChecks },
  unit: { label: "Unit", icon: BookMarked },
} as const;

function routeFor(b: Bookmark): { to: string; params?: Record<string, string> } {
  switch (b.kind) {
    case "note":
      return { to: "/notes/$noteId", params: { noteId: b.ref_id } };
    case "paper":
      return { to: "/papers/$paperId", params: { paperId: b.ref_id } };
    case "quiz":
      return { to: "/quizzes/$quizId", params: { quizId: b.ref_id } };
    default:
      return { to: "/courses" };
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

function BookmarksPage() {
  const { user } = useAuth();
  const q = useQuery({
    queryKey: ["all-bookmarks", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("student_bookmarks", { _limit: 200 });
      if (error) throw error;
      return (data ?? []) as Bookmark[];
    },
  });

  const items = q.data ?? [];
  const counts = {
    note: items.filter((i) => i.kind === "note").length,
    paper: items.filter((i) => i.kind === "paper").length,
    quiz: items.filter((i) => i.kind === "quiz").length,
  };

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
      <Breadcrumbs items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Bookmarks" }]} />

      <StudentHero
        className="mt-5"
        loading={q.isLoading}
        eyebrow="Revision list"
        title={
          <>
            Saved for <span className="text-primary">later</span>.
          </>
        }
        description={
          items.length === 0
            ? "Bookmark notes, papers and quizzes as you study and they'll gather here."
            : `${items.length} saved item${items.length === 1 ? "" : "s"} across your subjects.`
        }
        aside={
          items.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              <StatChip variant="chip" icon={StickyNote} value={counts.note} label="notes" />
              <StatChip variant="chip" icon={FileText} value={counts.paper} label="papers" />
              <StatChip variant="chip" icon={ListChecks} value={counts.quiz} label="quizzes" />
            </div>
          ) : undefined
        }
      />

      <section className="mt-12" aria-labelledby="bookmarks-list">
        <h2 id="bookmarks-list" className="text-h2 text-foreground">
          All bookmarks
        </h2>

        {q.isLoading ? (
          <div className="mt-6 space-y-2" aria-live="polite" aria-busy="true">
            <Skeleton className="h-14 rounded-lg" />
            <Skeleton className="h-14 rounded-lg" />
            <Skeleton className="h-14 rounded-lg" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            className="mt-6"
            icon={BookMarked}
            title="No bookmarks yet"
            description="Open any note, paper or quiz and tap the bookmark icon to save it for revision."
            primaryAction={{ label: "Browse courses", to: "/courses", icon: Compass }}
            secondaryAction={{ label: "Search library", to: "/search" }}
          />
        ) : (
          <ul className="mt-6 space-y-2">
            {items.map((b) => {
              const r = routeFor(b);
              const meta = KIND_META[b.kind] ?? KIND_META.unit;
              const Icon = meta.icon;
              return (
                <li key={b.id}>
                  <Link
                    {...(r as never)}
                    aria-label={`${meta.label}: ${b.title ?? "Untitled"}`}
                    className="group flex items-center gap-4 rounded-lg border border-border bg-surface px-4 py-3.5 transition-colors hover:border-primary/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {b.title ?? "Untitled"}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-muted-foreground">
                        {meta.label} · saved {formatDate(b.created_at)}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
