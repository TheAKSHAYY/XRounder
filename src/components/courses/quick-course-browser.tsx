import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Layers,
  GraduationCap,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SparkyAvatar } from "@/components/gamification/study-mascot";
import { playPopSound } from "@/lib/sound-fx";
import { cn } from "@/lib/utils";
import { formatTitleCase } from "@/lib/format";

interface QuickCourseBrowserProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function QuickCourseBrowser({
  trigger,
  open,
  onOpenChange,
  className,
}: QuickCourseBrowserProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? onOpenChange! : setInternalOpen;

  const [selectedSemesterNumber, setSelectedSemesterNumber] = useState<number>(1);

  // Fetch BCA course
  const courseQuery = useQuery({
    queryKey: ["quick-browser-bca-course"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, title, slug, code, description")
        .eq("status", "published")
        .order("sort_order")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60_000,
  });

  const course = courseQuery.data;

  // Fetch Semesters
  const semestersQuery = useQuery({
    queryKey: ["quick-browser-semesters", course?.id],
    enabled: !!course?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("semesters")
        .select("id, number, title")
        .eq("course_id", course!.id)
        .eq("status", "published")
        .order("number");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 5 * 60_000,
  });

  const semesters = semestersQuery.data ?? [];
  const currentSemester = semesters.find((s) => s.number === selectedSemesterNumber);

  // Fetch subjects for selected semester
  const subjectsQuery = useQuery({
    queryKey: ["quick-browser-subjects", currentSemester?.id],
    enabled: !!currentSemester?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subjects")
        .select("id, code, title, slug, sort_order")
        .eq("semester_id", currentSemester!.id)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 5 * 60_000,
  });

  const subjects = subjectsQuery.data ?? [];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            size="sm"
            onClick={() => playPopSound()}
            className={cn("btn-squishy rounded-full gap-1.5 cursor-pointer", className)}
          >
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span>Browse Courses</span>
          </Button>
        )}
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[min(28rem,95vw)] sm:max-w-md p-0 flex flex-col z-50 bg-background/98 backdrop-blur-xl border-l border-border/80 shadow-2xl"
      >
        {/* Header */}
        <div className="p-5 border-b border-border/60 bg-surface/50">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <SheetTitle className="font-display text-base font-bold text-foreground">
                  Browse Curriculum
                </SheetTitle>
                <p className="text-[11px] text-muted-foreground font-medium">
                  {course?.title || "BCA Curriculum"} · Same-Page Explorer
                </p>
              </div>
            </div>

            <SheetClose asChild>
              <button
                type="button"
                onClick={() => playPopSound()}
                className="btn-squishy flex items-center gap-1 rounded-full border border-border/70 bg-card px-3 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                title="Return to where you were"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-primary" />
                <span>Back</span>
              </button>
            </SheetClose>
          </div>

          {/* Sparky Mascot Helper */}
          <div className="mt-3.5 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-2.5">
            <SparkyAvatar size={34} mood="happy" className="shrink-0" />
            <p className="text-xs text-foreground/90 font-medium leading-tight">
              Select any semester or subject below without leaving your current page! 🐾
            </p>
          </div>

          {/* Semester Selector Tabs */}
          <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => {
                  playPopSound();
                  setSelectedSemesterNumber(num);
                }}
                className={cn(
                  "btn-squishy shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer",
                  selectedSemesterNumber === num
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-card text-muted-foreground border border-border/70 hover:bg-muted hover:text-foreground",
                )}
              >
                Sem {num}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects List Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>Semester {selectedSemesterNumber} Subjects</span>
            <span>{subjects.length} courses</span>
          </div>

          {subjectsQuery.isLoading ? (
            <div className="space-y-2.5">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-2xl" />
              ))}
            </div>
          ) : subjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
              No subjects published for Semester {selectedSemesterNumber} yet.
            </div>
          ) : (
            <div className="space-y-2">
              {subjects.map((sub) => (
                <Link
                  key={sub.id}
                  to="/courses/$courseSlug/$semesterNumber/$subjectSlug"
                  params={{
                    courseSlug: course?.slug || "bca",
                    semesterNumber: String(selectedSemesterNumber),
                    subjectSlug: sub.slug,
                  }}
                  onClick={() => setIsOpen(false)}
                  className="btn-squishy group flex items-center justify-between rounded-2xl border border-border/70 bg-card p-3.5 transition-all hover:border-primary/40 hover:bg-muted/40 cursor-pointer"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                        {sub.code}
                      </span>
                    </div>
                    <h4 className="mt-1 font-display text-xs sm:text-sm font-bold text-foreground truncate">
                      {formatTitleCase(sub.title)}
                    </h4>
                  </div>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer with return or full-page links */}
        <div className="p-4 border-t border-border/60 bg-surface/40 flex items-center justify-between gap-3 text-xs">
          <SheetClose asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => playPopSound()}
              className="btn-squishy rounded-xl text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5 mr-1" />
              Back to where I was
            </Button>
          </SheetClose>

          <Link
            to="/courses"
            onClick={() => setIsOpen(false)}
            className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
          >
            All Courses Catalog <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
