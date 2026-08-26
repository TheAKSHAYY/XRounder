import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Compass,
  FileText,
  FlaskConical,
  Layers,
  ListChecks,
  Search,
  StickyNote,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { formatShortDate } from "@/lib/format";
import { useAuth } from "@/hooks/use-auth";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
      { title: "Saved Bookmarks · XRounder" },
      {
        name: "description",
        content: "Every note, paper, and quiz you saved for quick revision in one organized place.",
      },
      { property: "og:title", content: "Saved Bookmarks · XRounder" },
      {
        property: "og:description",
        content: "Every note, paper, and quiz you saved for revision in one organized place.",
      },
    ],
  }),
  component: BookmarksPage,
});

const KIND_META = {
  note: { label: "Notes", singular: "Note", icon: FileText, color: "text-blue-500 bg-blue-500/10" },
  paper: { label: "Past Papers", singular: "Paper", icon: BookOpen, color: "text-amber-500 bg-amber-500/10" },
  quiz: { label: "MCQ Quizzes", singular: "Quiz", icon: FlaskConical, color: "text-emerald-500 bg-emerald-500/10" },
  unit: { label: "Syllabus Units", singular: "Unit", icon: Layers, color: "text-primary bg-primary/10" },
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

type FilterTab = "all" | "note" | "paper" | "quiz" | "unit";

function BookmarksPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const bookmarksQuery = useQuery({
    queryKey: ["all-bookmarks", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("student_bookmarks", { _limit: 200 });
      if (error) throw error;
      return (data ?? []) as Bookmark[];
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (bookmarkId: string) => {
      const { error } = await supabase.from("bookmarks").delete().eq("id", bookmarkId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Bookmark removed");
      qc.invalidateQueries({ queryKey: ["all-bookmarks"] });
      qc.invalidateQueries({ queryKey: ["student-bookmarks"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to remove bookmark");
    },
  });

  const allItems = bookmarksQuery.data ?? [];

  const counts = useMemo(
    () => ({
      all: allItems.length,
      note: allItems.filter((i) => i.kind === "note").length,
      paper: allItems.filter((i) => i.kind === "paper").length,
      quiz: allItems.filter((i) => i.kind === "quiz").length,
      unit: allItems.filter((i) => i.kind === "unit").length,
    }),
    [allItems],
  );

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesTab = activeTab === "all" || item.kind === activeTab;
      const matchesQuery =
        !searchQuery.trim() ||
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase().trim()));
      return matchesTab && matchesQuery;
    });
  }, [allItems, activeTab, searchQuery]);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-28 pt-6 sm:px-6 sm:pt-10">
      <Breadcrumbs items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Saved Bookmarks" }]} />

      {/* Header */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <BookMarked className="h-3.5 w-3.5" /> Revision Library
          </span>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Saved for Revision
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Quickly jump back to your bookmarked notes, past papers, and practice questions.
          </p>
        </div>

        {/* Quick Search */}
        {allItems.length > 0 && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filter bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs rounded-xl bg-card"
            />
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-border/70 scrollbar-none">
        {(
          [
            { id: "all", label: "All Items", count: counts.all },
            { id: "note", label: "Notes", count: counts.note },
            { id: "paper", label: "Past Papers", count: counts.paper },
            { id: "quiz", label: "MCQ Quizzes", count: counts.quiz },
            { id: "unit", label: "Units", count: counts.unit },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <span>{tab.label}</span>
            <span
              className={cn(
                "rounded-full px-1.5 py-0.2 text-[10px] font-bold",
                activeTab === tab.id
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content List */}
      <section className="mt-6" aria-labelledby="bookmarks-heading">
        <h2 id="bookmarks-heading" className="sr-only">
          Bookmarks List
        </h2>

        {bookmarksQuery.isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl" />
          </div>
        ) : allItems.length === 0 ? (
          <EmptyState
            className="mt-8"
            icon={BookMarked}
            title="No bookmarks yet"
            description="Tap the bookmark icon on any note, paper, or quiz to save it here for fast revision before exams."
            primaryAction={{ label: "Browse courses", to: "/courses", icon: Compass }}
            secondaryAction={{ label: "Search syllabus", to: "/search" }}
          />
        ) : filteredItems.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No bookmarks match "{searchQuery}" in this category.
          </div>
        ) : (
          <ul className="space-y-2.5">
            {filteredItems.map((b) => {
              const r = routeFor(b);
              const meta = KIND_META[b.kind] ?? KIND_META.unit;
              const Icon = meta.icon;

              return (
                <li
                  key={b.id}
                  className="group relative flex items-center justify-between gap-3 rounded-2xl border border-border/80 bg-card p-3.5 sm:p-4 transition-all hover:border-primary/50 hover:shadow-xs"
                >
                  <Link
                    {...(r as any)}
                    className="flex min-w-0 flex-1 items-center gap-3.5 focus-visible:outline-none"
                  >
                    <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", meta.color)}>
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {b.title ?? "Untitled Resource"}
                      </h3>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {meta.singular} · Saved {formatShortDate(b.created_at)}
                      </p>
                    </div>
                  </Link>

                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        removeMutation.mutate(b.id);
                      }}
                      className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      title="Remove bookmark"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <Button asChild size="sm" variant="outline" className="h-8 rounded-lg text-xs font-semibold px-3 hidden sm:inline-flex">
                      <Link {...(r as any)}>
                        Open <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
