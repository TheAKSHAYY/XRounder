import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Library, Search, Plus, ChevronRight, FileText, FileType, FileImage, Video,
  ClipboardList, Link as LinkIcon, Layers, ExternalLink, Circle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { listSubjectsWithStats } from "@/lib/content.functions";
import { PageHeader } from "@/components/admin/ui/page-header";
import { PageContainer } from "@/components/admin/ui/page-container";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/subjects")({
  head: () => ({ meta: [{ title: "Subjects · Admin · BCA Gurukul" }] }),
  component: SubjectsPage,
});

type Subject = {
  id: string;
  title: string;
  code: string | null;
  status: string;
  unitCount: number;
  semester?: {
    id: string;
    number: number;
    course?: { id: string; title: string; slug: string } | null;
  } | null;
  stats: {
    notes: number; pdfs: number; ppts: number; videos: number;
    assignments: number; links: number; mcqs: number; total: number; drafts: number;
  };
};

const STAT_META: Array<{ key: keyof Subject["stats"]; label: string; icon: LucideIcon }> = [
  { key: "notes", label: "Notes", icon: FileText },
  { key: "pdfs", label: "PDFs", icon: FileType },
  { key: "ppts", label: "Slides", icon: FileImage },
  { key: "videos", label: "Videos", icon: Video },
  { key: "assignments", label: "Assign", icon: ClipboardList },
  { key: "links", label: "Links", icon: LinkIcon },
];

function SubjectsPage() {
  const fetchSubjects = useServerFn(listSubjectsWithStats);
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "subjects-with-stats"],
    queryFn: () => fetchSubjects(),
  });
  const [q, setQ] = useState("");
  const [courseFilter, setCourseFilter] = useState<string | "all">("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const subjects = (data ?? []) as Subject[];

  const courses = useMemo(() => {
    const map = new Map<string, { id: string; title: string }>();
    for (const s of subjects) {
      const c = s.semester?.course;
      if (c) map.set(c.id, { id: c.id, title: c.title });
    }
    return Array.from(map.values());
  }, [subjects]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return subjects.filter((s) => {
      if (courseFilter !== "all" && s.semester?.course?.id !== courseFilter) return false;
      if (!needle) return true;
      return (
        s.title.toLowerCase().includes(needle) ||
        (s.code ?? "").toLowerCase().includes(needle) ||
        (s.semester?.course?.title ?? "").toLowerCase().includes(needle)
      );
    });
  }, [subjects, q, courseFilter]);

  // Group by course → semester
  const grouped = useMemo(() => {
    const byCourse = new Map<
      string,
      { title: string; slug: string; semesters: Map<number, Subject[]> }
    >();
    for (const s of filtered) {
      const c = s.semester?.course;
      const courseKey = c?.id ?? "unassigned";
      const bucket = byCourse.get(courseKey) ?? {
        title: c?.title ?? "Unassigned",
        slug: c?.slug ?? "",
        semesters: new Map<number, Subject[]>(),
      };
      const semNum = s.semester?.number ?? 0;
      const list = bucket.semesters.get(semNum) ?? [];
      list.push(s);
      bucket.semesters.set(semNum, list);
      byCourse.set(courseKey, bucket);
    }
    return Array.from(byCourse.entries()).map(([id, v]) => ({
      id,
      title: v.title,
      slug: v.slug,
      semesters: Array.from(v.semesters.entries())
        .sort(([a], [b]) => a - b)
        .map(([number, subjects]) => ({ number, subjects })),
    }));
  }, [filtered]);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <PageContainer>
      <PageHeader
        title="Subjects"
        description="Every subject grouped by course & semester. Expand to see content coverage at a glance."
        actions={
          <Button asChild size="sm">
            <Link to="/admin/courses"><Plus className="mr-1.5 h-4 w-4" /> New via course</Link>
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search subjects, codes, courses…"
            className="h-9 pl-8"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <FilterPill active={courseFilter === "all"} onClick={() => setCourseFilter("all")}>
            All courses
          </FilterPill>
          {courses.map((c) => (
            <FilterPill
              key={c.id}
              active={courseFilter === c.id}
              onClick={() => setCourseFilter(c.id)}
            >
              {c.title}
            </FilterPill>
          ))}
        </div>
        <div className="ml-auto text-xs text-muted-foreground">
          {filtered.length} of {subjects.length}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Library}
          title={q || courseFilter !== "all" ? "No matching subjects" : "No subjects yet"}
          description={
            q || courseFilter !== "all"
              ? "Try clearing filters or refining your search."
              : "Create a course and semester first, then add subjects."
          }
          primaryAction={{ label: "Go to courses", to: "/admin/courses" }}
        />
      ) : (
        <div className="space-y-6">
          {grouped.map((course) => (
            <section key={course.id}>
              <div className="mb-2.5 flex items-baseline gap-2">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  {course.title}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {course.semesters.reduce((sum, s) => sum + s.subjects.length, 0)} subjects
                </span>
              </div>
              <div className="space-y-4">
                {course.semesters.map((sem) => (
                  <div key={sem.number}>
                    <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <Layers className="h-3 w-3" />
                      Semester {sem.number || "—"}
                      <span className="text-[10px] normal-case tracking-normal opacity-70">
                        · {sem.subjects.length}
                      </span>
                    </div>
                    <div className="grid gap-2">
                      {sem.subjects.map((s) => (
                        <SubjectCard
                          key={s.id}
                          subject={s}
                          expanded={expanded.has(s.id)}
                          onToggle={() => toggle(s.id)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

function FilterPill({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border/70 bg-surface text-muted-foreground hover:border-border hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function SubjectCard({
  subject, expanded, onToggle,
}: { subject: Subject; expanded: boolean; onToggle: () => void }) {
  const coverage = subject.stats.total > 0 || subject.stats.mcqs > 0;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-surface transition-colors",
        expanded ? "border-primary/50 shadow-sm" : "border-border/70 hover:border-border",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            expanded && "rotate-90",
          )}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="truncate font-medium text-foreground">{subject.title}</span>
            {subject.code && (
              <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                {subject.code}
              </span>
            )}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Layers className="h-3 w-3" /> {subject.unitCount} units
            </span>
            <span className="inline-flex items-center gap-1">
              <FileText className="h-3 w-3" /> {subject.stats.total} published
            </span>
            {subject.stats.drafts > 0 && (
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <Circle className="h-2 w-2 fill-current" /> {subject.stats.drafts} draft
              </span>
            )}
            {!coverage && (
              <span className="text-destructive/80">No content yet</span>
            )}
          </div>
        </div>
        <StatusBadge value={subject.status} />
      </button>

      {expanded && (
        <div className="border-t border-border/60 bg-surface-muted/40 px-4 py-3">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {STAT_META.map(({ key, label, icon: Icon }) => {
              const value = subject.stats[key];
              return (
                <div
                  key={key}
                  className={cn(
                    "rounded-lg border border-border/60 bg-surface px-2.5 py-2",
                    value === 0 && "opacity-60",
                  )}
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    <Icon className="h-3 w-3" />
                    {label}
                  </div>
                  <div className="mt-0.5 font-display text-lg font-semibold text-foreground">
                    {value}
                  </div>
                </div>
              );
            })}
          </div>
          {subject.stats.mcqs > 0 && (
            <div className="mt-2 text-xs text-muted-foreground">
              {subject.stats.mcqs} MCQ question{subject.stats.mcqs === 1 ? "" : "s"} in the question bank
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <Button asChild size="sm" variant="outline">
              <Link
                to="/admin/content"
                search={{ subjectId: subject.id }}
              >
                <FileText className="mr-1.5 h-3.5 w-3.5" /> Manage content
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link
                to="/admin/content/new"
                search={{ subjectId: subject.id }}
              >
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Add content
              </Link>
            </Button>
            {subject.semester?.course?.slug && subject.semester?.number ? (
              <Button asChild size="sm" variant="ghost">
                <Link
                  to="/courses/$courseSlug/$semesterNumber"
                  params={{
                    courseSlug: subject.semester.course.slug,
                    semesterNumber: String(subject.semester.number),
                  }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Student view
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
