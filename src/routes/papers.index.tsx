import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileStack,
  Filter,
  GraduationCap,
  Layers,
  Search,
  Sparkles,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatTitleCase } from "@/lib/format";

type PaperItem = {
  id: string;
  title: string;
  year: number;
  exam_type: string;
  paper_number: string | null;
  description: string | null;
  file_size_bytes: number | null;
  subject_id: string;
  subject_title: string;
  subject_code: string;
  subject_slug: string;
  semester_number: number;
  course_slug: string;
};

export const Route = createFileRoute("/papers/")({
  head: () => ({
    meta: [
      {
        title: "Previous Year Question Papers (PYQs) · BCA University Archive · XRounder",
      },
      {
        name: "description",
        content:
          "Browse, read, and download official university previous year question papers (2016-2026) for BCA across all semesters, organized subject-wise and year-wise.",
      },
      {
        property: "og:title",
        content: "Previous Year Question Papers (PYQs) · BCA University Archive · XRounder",
      },
      {
        property: "og:description",
        content:
          "Official semester examination papers, paper codes, and multi-year compilations for BCA subjects.",
      },
      { property: "og:url", content: "https://www.xrounder.in/papers" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://www.xrounder.in/papers" }],
  }),
  component: PapersIndexPage,
});

function PapersIndexPage() {
  const [selectedSemester, setSelectedSemester] = useState<number | "all">("all");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const papersQuery = useQuery({
    queryKey: ["public", "all-papers-catalog"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("papers")
        .select(`
          id,
          title,
          year,
          exam_type,
          paper_number,
          description,
          file_size_bytes,
          subject_id,
          subjects (
            id,
            title,
            code,
            slug,
            semesters (
              number,
              courses (
                slug
              )
            )
          )
        `)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("year", { ascending: false });

      if (error) throw error;

      const flat: PaperItem[] = (data ?? []).map((row: any) => {
        const sub = row.subjects;
        const sem = sub?.semesters;
        const course = sem?.courses;

        return {
          id: row.id,
          title: row.title,
          year: row.year,
          exam_type: row.exam_type,
          paper_number: row.paper_number,
          description: row.description,
          file_size_bytes: row.file_size_bytes,
          subject_id: row.subject_id,
          subject_title: sub?.title || "Unknown Subject",
          subject_code: sub?.code || "",
          subject_slug: sub?.slug || "",
          semester_number: sem?.number ?? 1,
          course_slug: course?.slug || "bca",
        };
      });

      return flat;
    },
    staleTime: 5 * 60 * 1000,
  });

  const allPapers = papersQuery.data ?? [];

  // Derived available years
  const availableYears = useMemo(() => {
    const set = new Set<number>();
    allPapers.forEach((p) => set.add(p.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [allPapers]);

  // Filtered papers
  const filteredPapers = useMemo(() => {
    return allPapers.filter((p) => {
      if (selectedSemester !== "all" && p.semester_number !== selectedSemester) return false;
      if (selectedYear !== "all" && p.year !== selectedYear) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchCode = (p.paper_number || "").toLowerCase().includes(q);
        const matchSub = p.subject_title.toLowerCase().includes(q);
        const matchSubCode = p.subject_code.toLowerCase().includes(q);
        const matchDesc = (p.description || "").toLowerCase().includes(q);
        if (!matchTitle && !matchCode && !matchSub && !matchSubCode && !matchDesc) {
          return false;
        }
      }
      return true;
    });
  }, [allPapers, selectedSemester, selectedYear, searchQuery]);

  // Group filtered papers by Subject
  const papersBySubject = useMemo(() => {
    const map = new Map<
      string,
      {
        subject_id: string;
        subject_title: string;
        subject_code: string;
        subject_slug: string;
        semester_number: number;
        course_slug: string;
        papers: PaperItem[];
      }
    >();

    for (const p of filteredPapers) {
      if (!map.has(p.subject_id)) {
        map.set(p.subject_id, {
          subject_id: p.subject_id,
          subject_title: p.subject_title,
          subject_code: p.subject_code,
          subject_slug: p.subject_slug,
          semester_number: p.semester_number,
          course_slug: p.course_slug,
          papers: [],
        });
      }
      map.get(p.subject_id)!.papers.push(p);
    }

    // Sort subjects by semester, then by code
    return Array.from(map.values()).sort(
      (a, b) =>
        a.semester_number - b.semester_number || a.subject_code.localeCompare(b.subject_code),
    );
  }, [filteredPapers]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Courses", to: "/courses" },
            { label: "Previous Year Papers" },
          ]}
        />

        {/* ─── Hero Header ─── */}
        <section className="mt-6 rounded-3xl border border-border/80 bg-surface/50 p-6 sm:p-10 shadow-soft-xs relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <FileStack className="h-3.5 w-3.5" />
              <span>Official University Papers Archive (2016–2026)</span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Previous Year Question Papers
            </h1>

            <p className="mt-3 text-sm text-muted-foreground sm:text-base leading-relaxed">
              Explore 200+ university semester question papers and consolidated all-in-one
              compilations. Organized semester-wise, subject-wise, and year-wise with complete paper
              codes.
            </p>

            {/* Quick Stat Highlights */}
            <div className="mt-6 flex flex-wrap gap-4 pt-2 border-t border-border/60 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="font-semibold text-foreground">{allPapers.length} Papers</span>
                <span className="text-muted-foreground">Cataloged</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">6 Semesters</span>
                <span className="text-muted-foreground">BCA Curriculum</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-500" />
                <span className="font-semibold text-foreground">2016 – 2026</span>
                <span className="text-muted-foreground">10 Year Coverage</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Filters & Search ─── */}
        <section className="mt-8 space-y-4">
          {/* Semester Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground shrink-0 flex items-center gap-1.5 mr-2">
              <Filter className="h-3.5 w-3.5" /> Semester:
            </span>
            <Button
              size="sm"
              variant={selectedSemester === "all" ? "default" : "outline"}
              onClick={() => setSelectedSemester("all")}
              className="rounded-full text-xs shrink-0 cursor-pointer"
            >
              All Semesters
            </Button>
            {[1, 2, 3, 4, 5, 6].map((sem) => (
              <Button
                key={sem}
                size="sm"
                variant={selectedSemester === sem ? "default" : "outline"}
                onClick={() => setSelectedSemester(sem)}
                className="rounded-full text-xs shrink-0 cursor-pointer"
              >
                Semester {sem}
              </Button>
            ))}
          </div>

          {/* Search + Year Select Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by subject, paper code (e.g. 21301, 44901), or title..."
                className="w-full rounded-2xl border border-border bg-surface pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Year Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <span className="text-xs font-bold text-muted-foreground shrink-0 hidden sm:inline">
                Year:
              </span>
              <Button
                size="sm"
                variant={selectedYear === "all" ? "secondary" : "ghost"}
                onClick={() => setSelectedYear("all")}
                className="rounded-xl text-xs h-9 shrink-0"
              >
                All
              </Button>
              {availableYears.map((yr) => (
                <Button
                  key={yr}
                  size="sm"
                  variant={selectedYear === yr ? "default" : "ghost"}
                  onClick={() => setSelectedYear(yr)}
                  className="rounded-xl text-xs h-9 shrink-0 tabular-nums"
                >
                  {yr}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Results List ─── */}
        <section className="mt-8">
          {papersQuery.isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-3xl border border-border p-6 space-y-4">
                  <Skeleton className="h-6 w-48 rounded-lg" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Skeleton className="h-20 rounded-2xl" />
                    <Skeleton className="h-20 rounded-2xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : papersBySubject.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-12 text-center bg-surface/30">
              <FileStack className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-60" />
              <h3 className="font-display text-lg font-bold text-foreground">
                No question papers match your filters
              </h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                Try selecting a different semester, clearing the search keyword, or selecting "All
                Years".
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelectedSemester("all");
                  setSelectedYear("all");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-full text-xs"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {papersBySubject.map((group) => (
                <div
                  key={group.subject_id}
                  className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-soft-xs"
                >
                  {/* Subject Group Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="font-mono text-[11px] font-bold">
                          Sem {group.semester_number}
                        </Badge>
                        <span className="font-mono text-xs font-semibold text-primary">
                          {group.subject_code}
                        </span>
                      </div>
                      <h2 className="mt-1 font-display text-xl font-bold text-foreground">
                        {formatTitleCase(group.subject_title)}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {group.papers.length} {group.papers.length === 1 ? "paper" : "papers"}
                      </span>
                      {group.subject_slug && (
                        <Button asChild size="sm" variant="ghost" className="h-8 rounded-xl text-xs gap-1">
                          <Link
                            to="/courses/$courseSlug/$semesterNumber/$subjectSlug"
                            params={{
                              courseSlug: group.course_slug,
                              semesterNumber: String(group.semester_number),
                              subjectSlug: group.subject_slug,
                            }}
                          >
                            <span>Subject Notes</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Papers Grid for this Subject */}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.papers.map((p) => {
                      const isMerged =
                        p.exam_type === "other" ||
                        p.title.toLowerCase().includes("compilation") ||
                        p.title.toLowerCase().includes("all-in-one");

                      return (
                        <Link
                          key={p.id}
                          to="/papers/$paperId"
                          params={{ paperId: p.id }}
                          className={cn(
                            "group flex items-start justify-between gap-3 rounded-2xl border p-4 transition-all duration-200 hover:shadow-soft-sm interactive-card",
                            isMerged
                              ? "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/60"
                              : "border-border/80 bg-surface hover:border-primary/50",
                          )}
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <span
                              className={cn(
                                "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                                isMerged
                                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                                  : "bg-primary/10 text-primary",
                              )}
                            >
                              <FileStack className="h-5 w-5" />
                            </span>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <Badge
                                  variant={isMerged ? "warning" : "default"}
                                  className="text-[10px] font-bold px-2 py-0"
                                >
                                  {isMerged ? "Merged All-in-One" : `${p.year} Exam`}
                                </Badge>
                                {p.paper_number && (
                                  <Badge
                                    variant="outline"
                                    className="font-mono text-[10px] px-1.5 py-0 bg-muted/30"
                                  >
                                    Code: {p.paper_number}
                                  </Badge>
                                )}
                              </div>

                              <h3 className="mt-1.5 font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                {p.title}
                              </h3>

                              {p.description && (
                                <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1">
                                  {p.description}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0 pt-1">
                            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
