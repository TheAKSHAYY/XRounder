import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Search,
  Users,
  GraduationCap,
  Ban,
  Undo2,
  BookOpen,
  Calendar,
  Building,
  CheckCircle2,
  XCircle,
  Eye,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { setUserSuspended } from "@/lib/announcements.functions";
import { PageHeader } from "@/components/admin/ui/page-header";
import { PageContainer } from "@/components/admin/ui/page-container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatShortDate, formatDateTime } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/users")({
  head: () => ({ meta: [{ title: "Student Directory · Admin" }] }),
  component: AdminStudentsPage,
});

type StudentRow = {
  user_id: string;
  full_name: string | null;
  email?: string | null;
  avatar_url: string | null;
  university: string | null;
  college: string | null;
  academic_session: string | null;
  current_course_id: string | null;
  current_semester_id: string | null;
  suspended: boolean;
  suspended_reason: string | null;
  created_at: string;
  courses?: { title: string; code: string } | null;
  semesters?: { number: number; title: string } | null;
};

function AdminStudentsPage() {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "suspended">("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentRow | null>(null);

  const suspendFn = useServerFn(setUserSuspended);
  const qc = useQueryClient();

  // 1. Fetch Students
  const studentsQuery = useQuery({
    queryKey: ["admin", "students-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select(
          `
          user_id,
          full_name,
          avatar_url,
          university,
          college,
          academic_session,
          current_course_id,
          current_semester_id,
          suspended,
          suspended_reason,
          created_at,
          courses:courses(title, code),
          semesters:semesters(number, title)
        `,
        )
        .order("created_at", { ascending: false })
        .limit(200);

      if (error) throw error;
      return (data ?? []) as unknown as StudentRow[];
    },
  });

  // 2. Fetch Courses for filter
  const coursesQuery = useQuery({
    queryKey: ["admin", "courses-filter"],
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, title, code")
        .is("deleted_at", null)
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  // Suspend Mutation
  const suspendMut = useMutation({
    mutationFn: (vars: { userId: string; suspended: boolean; reason?: string }) =>
      suspendFn({ data: vars }),
    onSuccess: (_d, vars) => {
      toast.success(vars.suspended ? "Student suspended" : "Student account reinstated");
      qc.invalidateQueries({ queryKey: ["admin", "students-list"] });
      if (selectedStudent && selectedStudent.user_id === vars.userId) {
        setSelectedStudent((prev) => (prev ? { ...prev, suspended: vars.suspended } : null));
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const students = studentsQuery.data ?? [];
  const q = search.toLowerCase().trim();

  const filtered = students.filter((s) => {
    const matchesSearch =
      !q ||
      (s.full_name ?? "").toLowerCase().includes(q) ||
      (s.university ?? "").toLowerCase().includes(q) ||
      (s.college ?? "").toLowerCase().includes(q);

    const matchesCourse = courseFilter === "all" || s.current_course_id === courseFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "suspended" && s.suspended) ||
      (statusFilter === "active" && !s.suspended);

    return matchesSearch && matchesCourse && matchesStatus;
  });

  return (
    <PageContainer>
      <PageHeader
        title="Student Directory"
        description="Inspect registered students, view academic enrollments, and manage account statuses."
      />

      {/* Filters & Search Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students by name, university..."
            className="pl-9 h-10 rounded-xl bg-card"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="h-10 text-xs rounded-xl w-44 bg-card">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {(coursesQuery.data ?? []).map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.code} — {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(val: any) => setStatusFilter(val)}>
            <SelectTrigger className="h-10 text-xs rounded-xl w-36 bg-card">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Student List */}
      {studentsQuery.isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-16 rounded-2xl" />
          <Skeleton className="h-16 rounded-2xl" />
          <Skeleton className="h-16 rounded-2xl" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          <Users className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
          No students found matching your search and filter criteria.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border/70 bg-muted/40 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-3.5">Student</th>
                  <th className="px-4 py-3.5">Program &amp; Semester</th>
                  <th className="px-4 py-3.5">University / College</th>
                  <th className="px-4 py-3.5">Joined</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((s) => {
                  const courseName = s.courses?.code || s.courses?.title || "Not selected";
                  const semName = s.semesters?.number ? `Sem ${s.semesters.number}` : "—";

                  return (
                    <tr key={s.user_id} className="transition-colors hover:bg-muted/30">
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-sm text-foreground">
                          {s.full_name || "Anonymous Student"}
                        </div>
                        <div className="text-[11px] font-mono text-muted-foreground">
                          ID: {s.user_id.slice(0, 8)}…
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="font-medium text-foreground flex items-center gap-1.5">
                          <GraduationCap className="h-3.5 w-3.5 text-primary" /> {courseName}
                        </div>
                        <div className="text-[11px] text-muted-foreground">{semName}</div>
                      </td>

                      <td className="px-4 py-3.5 text-muted-foreground max-w-xs truncate">
                        {s.university || s.college || "—"}
                      </td>

                      <td className="px-4 py-3.5 text-muted-foreground">
                        {formatShortDate(s.created_at)}
                      </td>

                      <td className="px-4 py-3.5">
                        {s.suspended ? (
                          <Badge variant="destructive" className="text-[10px] rounded-full">
                            Suspended
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-[10px] rounded-full text-emerald-600 border-emerald-500/30 bg-emerald-500/10"
                          >
                            Active
                          </Badge>
                        )}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedStudent(s)}
                            className="h-8 w-8 p-0 rounded-lg"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          {s.suspended ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={suspendMut.isPending}
                              onClick={() =>
                                suspendMut.mutate({ userId: s.user_id, suspended: false })
                              }
                              className="h-8 px-2.5 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10 rounded-lg"
                              title="Reinstate student"
                            >
                              <Undo2 className="mr-1 h-3.5 w-3.5" /> Restore
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={suspendMut.isPending}
                              onClick={() =>
                                suspendMut.mutate({
                                  userId: s.user_id,
                                  suspended: true,
                                  reason: "Suspended by admin",
                                })
                              }
                              className="h-8 px-2.5 text-xs text-destructive hover:bg-destructive/10 rounded-lg"
                              title="Suspend student"
                            >
                              <Ban className="mr-1 h-3.5 w-3.5" /> Suspend
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
        {selectedStudent && (
          <DialogContent className="sm:max-w-lg rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-display text-xl font-bold">Student Details</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Overview of enrolled course, academic session, and status.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-sm">
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="font-bold text-base text-foreground">
                  {selectedStudent.full_name || "Anonymous Student"}
                </div>
                <div className="text-xs text-muted-foreground font-mono mt-0.5">
                  User ID: {selectedStudent.user_id}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Registered on: {formatDateTime(selectedStudent.created_at)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/60 p-3 bg-card">
                  <span className="block text-[10px] uppercase font-bold text-muted-foreground">
                    Course
                  </span>
                  <span className="font-semibold text-foreground">
                    {selectedStudent.courses?.title || "Not selected"}
                  </span>
                </div>

                <div className="rounded-xl border border-border/60 p-3 bg-card">
                  <span className="block text-[10px] uppercase font-bold text-muted-foreground">
                    Semester
                  </span>
                  <span className="font-semibold text-foreground">
                    {selectedStudent.semesters?.title
                      ? `Semester ${selectedStudent.semesters.number}`
                      : "Not selected"}
                  </span>
                </div>

                <div className="rounded-xl border border-border/60 p-3 bg-card">
                  <span className="block text-[10px] uppercase font-bold text-muted-foreground">
                    University
                  </span>
                  <span className="font-semibold text-foreground truncate block">
                    {selectedStudent.university || selectedStudent.college || "—"}
                  </span>
                </div>

                <div className="rounded-xl border border-border/60 p-3 bg-card">
                  <span className="block text-[10px] uppercase font-bold text-muted-foreground">
                    Academic Session
                  </span>
                  <span className="font-semibold text-foreground">
                    {selectedStudent.academic_session || "2026–2027"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/60">
                <div>
                  <span className="text-xs font-semibold text-foreground block">
                    Account Status
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {selectedStudent.suspended
                      ? "Suspended from student platform"
                      : "Active student access"}
                  </span>
                </div>

                {selectedStudent.suspended ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      suspendMut.mutate({ userId: selectedStudent.user_id, suspended: false })
                    }
                    className="rounded-xl h-9 text-xs text-emerald-600"
                  >
                    <Undo2 className="mr-1.5 h-3.5 w-3.5" /> Re-instate Access
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      suspendMut.mutate({
                        userId: selectedStudent.user_id,
                        suspended: true,
                        reason: "Suspended by admin",
                      })
                    }
                    className="rounded-xl h-9 text-xs text-destructive hover:bg-destructive/10"
                  >
                    <Ban className="mr-1.5 h-3.5 w-3.5" /> Suspend Student
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </PageContainer>
  );
}
