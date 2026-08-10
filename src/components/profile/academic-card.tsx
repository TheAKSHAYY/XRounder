import { BookOpen, Building2, CalendarDays, GraduationCap, Layers, Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type AcademicForm = {
  current_course_id: string;
  current_semester_id: string;
  current_year: string;
  academic_session: string;
};

type Option = { id: string; label: string };

function InfoChip({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-border/70 bg-background px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-eyebrow text-muted-foreground">
        <Icon className="h-3 w-3 shrink-0" aria-hidden />
        <span className="truncate">{label}</span>
      </div>
      <div className="mt-1 truncate text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}

export function AcademicCard({
  form,
  courses,
  semesters,
  subjectCount,
  overallProgress,
  loading,
  saving,
  dirty,
  college,
  university,
  onChange,
  onSubmit,
}: {
  form: AcademicForm;
  courses: Option[];
  semesters: Option[];
  subjectCount: number | null;
  overallProgress: number;
  loading: boolean;
  saving: boolean;
  dirty: boolean;
  college: string;
  university: string;
  onChange: (patch: Partial<AcademicForm>) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const courseLabel =
    courses.find((c) => c.id === form.current_course_id)?.label ?? "Not set";
  const semesterLabel =
    semesters.find((s) => s.id === form.current_semester_id)?.label ?? "Not set";

  return (
    <form
      id="academic"
      onSubmit={onSubmit}
      aria-label="Academic information"
      className="rounded-xl border border-border bg-surface p-4 shadow-soft sm:p-5"
    >
      <h2 className="text-h3 text-foreground">Academic information</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Drives which course content and papers you see across the app.
      </p>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)
          ) : (
            <>
              <InfoChip icon={BookOpen} label="Course" value={courseLabel} />
              <InfoChip icon={Layers} label="Semester" value={semesterLabel} />
              <InfoChip
                icon={GraduationCap}
                label="Year"
                value={form.current_year || "Not set"}
              />
              <InfoChip
                icon={CalendarDays}
                label="Session"
                value={form.academic_session || "Not set"}
              />
              <InfoChip icon={Building2} label="College" value={college || "Not set"} />
              <InfoChip icon={Building2} label="University" value={university || "Not set"} />
            </>
          )}
        </div>
        <div className="hidden shrink-0 flex-col items-center gap-1 sm:flex">
          <ProgressRing value={overallProgress} size={84} thickness={7} label="Overall progress" />
          <span className="text-xs text-muted-foreground">
            {subjectCount ?? 0} subjects
          </span>
        </div>
      </div>

      <fieldset disabled={saving} className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <Label htmlFor="course">Course</Label>
          <Select
            value={form.current_course_id || undefined}
            onValueChange={(v) => onChange({ current_course_id: v, current_semester_id: "" })}
          >
            <SelectTrigger id="course">
              <SelectValue placeholder="Choose your course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="semester">Current semester</Label>
          <Select
            value={form.current_semester_id || undefined}
            onValueChange={(v) => onChange({ current_semester_id: v })}
            disabled={!form.current_course_id || semesters.length === 0}
          >
            <SelectTrigger id="semester">
              <SelectValue
                placeholder={form.current_course_id ? "Choose a semester" : "Pick a course first"}
              />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="year">Current year</Label>
          <Select
            value={form.current_year || undefined}
            onValueChange={(v) => onChange({ current_year: v })}
          >
            <SelectTrigger id="year">
              <SelectValue placeholder="Choose year" />
            </SelectTrigger>
            <SelectContent>
              {["1", "2", "3", "4"].map((y) => (
                <SelectItem key={y} value={y}>
                  Year {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="session">Academic session</Label>
          <Input
            id="session"
            value={form.academic_session}
            onChange={(e) => onChange({ academic_session: e.target.value })}
            placeholder="e.g. 2025-26"
          />
        </div>
      </fieldset>

      <div className="mt-5 flex justify-end">
        <Button type="submit" className="tap-target w-full sm:w-auto" disabled={saving || !dirty}>
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {saving ? "Saving…" : "Save academic details"}
        </Button>
      </div>
    </form>
  );
}
