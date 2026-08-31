import { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  FileText,
  FileType,
  FlaskConical,
  GraduationCap,
  Plus,
  Trash2,
  Upload,
  Download,
  ExternalLink,
  Save,
  Eye,
  Check,
  XCircle,
  HelpCircle,
  FileImage,
  Layers,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { PageContainer } from "@/components/admin/ui/page-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { BulkImportDialog } from "@/components/mcq/bulk-import-dialog";
import { VisualArticleEditor } from "@/components/admin/visual-article-editor";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/units/$unitId")({
  head: () => ({ meta: [{ title: "Unit Workspace · Admin · XRounder" }] }),
  component: AdminUnitWorkspace,
});

type UnitContext = {
  id: string;
  number: number;
  title: string;
  summary: string | null;
  status: string;
  subjects: {
    id: string;
    title: string;
    code: string;
    slug: string;
    semesters: {
      id: string;
      number: number;
      courses: {
        id: string;
        title: string;
        code: string;
        slug: string;
      };
    };
  };
};

function AdminUnitWorkspace() {
  const { unitId } = Route.useParams();
  const { user } = useAuth();
  const qc = useQueryClient();

  const [activeTab, setActiveTab] = useState<"ARTICLE" | "NOTES" | "MCQS" | "PYQ">("ARTICLE");

  // 1. Fetch Unit and Parent Hierarchy Context
  const unitQuery = useQuery({
    queryKey: ["admin", "unit-context", unitId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("units")
        .select(
          `
          id,
          number,
          title,
          summary,
          status,
          subjects:subjects!inner (
            id,
            title,
            code,
            slug,
            semesters:semesters!inner (
              id,
              number,
              courses:courses!inner (
                id,
                title,
                code,
                slug
              )
            )
          )
        `,
        )
        .eq("id", unitId)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw notFound();
      return data as unknown as UnitContext;
    },
  });

  // 2. Fetch Primary Article (content_items type='note' or notes table)
  const articleQuery = useQuery({
    queryKey: ["admin", "unit-article", unitId, unitQuery.data?.subjects?.id],
    enabled: !!unitId,
    queryFn: async () => {
      const { data: ci } = await supabase
        .from("content_items")
        .select("*")
        .eq("unit_id", unitId)
        .eq("type", "note")
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (ci) return ci;

      // Fallback: If note exists for subject with null unit_id, auto-link it
      if (unitQuery.data?.subjects?.id) {
        const { data: unlinked } = await supabase
          .from("content_items")
          .select("*")
          .eq("subject_id", unitQuery.data.subjects.id)
          .is("unit_id", null)
          .eq("type", "note")
          .is("deleted_at", null)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (unlinked) {
          await supabase.from("content_items").update({ unit_id: unitId }).eq("id", unlinked.id);
          return { ...unlinked, unit_id: unitId };
        }
      }

      // Fallback to legacy notes table
      const { data: n } = await supabase
        .from("notes")
        .select("*")
        .eq("unit_id", unitId)
        .is("deleted_at", null)
        .limit(1)
        .maybeSingle();

      if (n) {
        return {
          id: n.id,
          unit_id: n.unit_id,
          title: n.title,
          description: n.summary || n.body,
          status: n.status,
          type: "note",
          is_legacy: true,
        };
      }

      return null;
    },
  });

  // 3. Fetch Reference Files (content_items type='pdf' or 'ppt')
  const referenceFilesQuery = useQuery({
    queryKey: ["admin", "unit-reference-files", unitId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_items")
        .select("*")
        .eq("unit_id", unitId)
        .in("type", ["pdf", "ppt", "assignment"])
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
  });

  // 4. Fetch Primary Quiz and MCQs
  const quizQuery = useQuery({
    queryKey: ["admin", "unit-primary-quiz", unitId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quizzes")
        .select("*")
        .eq("unit_id", unitId)
        .is("deleted_at", null)
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const questionsQuery = useQuery({
    queryKey: ["admin", "unit-questions", quizQuery.data?.id],
    enabled: !!quizQuery.data?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quiz_questions")
        .select(
          `
          id,
          prompt,
          explanation,
          difficulty,
          points,
          exam_name,
          year,
          order_index,
          quiz_options (
            id,
            text,
            is_correct,
            order_index
          )
        `,
        )
        .eq("quiz_id", quizQuery.data!.id)
        .order("order_index");

      if (error) throw error;
      return data ?? [];
    },
  });

  // Article Form State
  const [articleTitle, setArticleTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [articleStatus, setArticleStatus] = useState<"draft" | "published" | "archived">(
    "published",
  );
  const [isSavingArticle, setIsSavingArticle] = useState(false);

  useEffect(() => {
    if (articleQuery.data) {
      setArticleTitle(articleQuery.data.title || "");
      setArticleBody(articleQuery.data.description || "");
      setArticleStatus((articleQuery.data.status as any) || "published");
    } else if (unitQuery.data) {
      setArticleTitle(`Unit ${unitQuery.data.number}: ${unitQuery.data.title}`);
      setArticleBody("");
      setArticleStatus("published");
    }
  }, [articleQuery.data, unitQuery.data]);

  // Save / Publish Article Mutation
  const saveArticleMutation = useMutation({
    mutationFn: async (targetStatus?: "draft" | "published") => {
      if (!articleTitle.trim()) throw new Error("Article title is required.");
      setIsSavingArticle(true);
      const statusToSave = targetStatus || articleStatus;
      const subjectId = unitQuery.data?.subjects?.id;

      if (articleQuery.data && !(articleQuery.data as any).is_legacy) {
        const { error } = await supabase
          .from("content_items")
          .update({
            unit_id: unitId,
            subject_id: subjectId,
            title: articleTitle.trim(),
            description: articleBody,
            status: statusToSave,
            visibility: "public",
            updated_at: new Date().toISOString(),
          })
          .eq("id", articleQuery.data.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("content_items").insert({
          unit_id: unitId,
          subject_id: subjectId,
          type: "note",
          title: articleTitle.trim(),
          description: articleBody,
          status: statusToSave,
          visibility: "public",
          created_by: user?.id,
        });

        if (error) throw error;
      }
    },
    onSuccess: (_, statusToSave) => {
      toast.success(statusToSave === "published" ? "Article Published!" : "Article Draft Saved!");
      qc.invalidateQueries({ queryKey: ["admin", "unit-article", unitId] });
      qc.invalidateQueries({ queryKey: ["public", "unit"] });
      qc.invalidateQueries({ queryKey: ["admin", "content"] });
      setIsSavingArticle(false);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to save article");
      setIsSavingArticle(false);
    },
  });

  // Reference Document Upload State
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);

  const handleUploadDoc = async (file: File) => {
    try {
      setIsUploadingDoc(true);
      const ext = file.name.split(".").pop()?.toLowerCase();
      const path = `unit-${unitId}/${Date.now()}-${file.name}`;
      const bucket = "notes";

      const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {
        upsert: false,
      });
      if (upErr) throw upErr;

      const { error: insertErr } = await supabase.from("content_items").insert({
        unit_id: unitId,
        type: ext === "ppt" || ext === "pptx" ? "ppt" : "pdf",
        title: file.name.replace(/\.[^/.]+$/, ""),
        file_path: path,
        file_bucket: bucket,
        file_mime: file.type || "application/pdf",
        file_size_bytes: file.size,
        status: "published",
        created_by: user?.id,
      });

      if (insertErr) throw insertErr;

      toast.success(`Uploaded ${file.name}`);
      qc.invalidateQueries({ queryKey: ["admin", "unit-reference-files", unitId] });
    } catch (err: any) {
      toast.error(err.message || "File upload failed");
    } finally {
      setIsUploadingDoc(false);
    }
  };

  const deleteDocMutation = useMutation({
    mutationFn: async (doc: any) => {
      if (doc.file_path && doc.file_bucket) {
        await supabase.storage.from(doc.file_bucket).remove([doc.file_path]);
      }
      const { error } = await supabase.from("content_items").delete().eq("id", doc.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Document deleted");
      qc.invalidateQueries({ queryKey: ["admin", "unit-reference-files", unitId] });
    },
  });

  // MCQ Question & Bulk Import State
  const [bulkImportOpen, setBulkImportOpen] = useState(false);
  const [newMcqOpen, setNewMcqOpen] = useState(false);
  const [mcqPrompt, setMcqPrompt] = useState("");
  const [mcqExplanation, setMcqExplanation] = useState("");
  const [mcqDifficulty, setMcqDifficulty] = useState("medium");
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");
  const [correctOpt, setCorrectOpt] = useState<"A" | "B" | "C" | "D">("A");

  // PYQ Insight State
  const [newPyqOpen, setNewPyqOpen] = useState(false);
  const [pyqPrompt, setPyqPrompt] = useState("");
  const [pyqExplanation, setPyqExplanation] = useState("");
  const [pyqYear, setPyqYear] = useState(new Date().getFullYear());
  const [pyqExamName, setPyqExamName] = useState("End Semester");
  const [pyqMarks, setPyqMarks] = useState(10);

  // Helper to ensure quiz exists
  const ensureQuizId = async () => {
    if (quizQuery.data?.id) return quizQuery.data.id;
    const { data, error } = await supabase
      .from("quizzes")
      .insert({
        unit_id: unitId,
        title: `Unit ${unitQuery.data?.number || 1} Quiz`,
        slug: `unit-${unitQuery.data?.number || 1}-quiz-${Date.now()}`,
        status: "published",
      })
      .select("id")
      .single();

    if (error) throw error;
    qc.invalidateQueries({ queryKey: ["admin", "unit-primary-quiz", unitId] });
    return data.id;
  };

  const createSingleMcqMutation = useMutation({
    mutationFn: async () => {
      if (!mcqPrompt.trim() || !optA.trim() || !optB.trim()) {
        throw new Error("Prompt and at least two options are required.");
      }
      const targetQuizId = await ensureQuizId();
      const options = [
        { text: optA.trim(), is_correct: correctOpt === "A" },
        { text: optB.trim(), is_correct: correctOpt === "B" },
        ...(optC.trim() ? [{ text: optC.trim(), is_correct: correctOpt === "C" }] : []),
        ...(optD.trim() ? [{ text: optD.trim(), is_correct: correctOpt === "D" }] : []),
      ];

      const { error } = await supabase.rpc("admin_create_mcq", {
        _quiz_id: targetQuizId,
        _prompt: mcqPrompt.trim(),
        _options: options as never,
        _explanation: mcqExplanation.trim() || undefined,
        _difficulty: mcqDifficulty,
        _points: 1,
        _negative_marks: 0,
        _tags: [],
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("MCQ added");
      setNewMcqOpen(false);
      setMcqPrompt("");
      setMcqExplanation("");
      setOptA("");
      setOptB("");
      setOptC("");
      setOptD("");
      qc.invalidateQueries({ queryKey: ["admin", "unit-questions", quizQuery.data?.id] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const createPyqMutation = useMutation({
    mutationFn: async () => {
      if (!pyqPrompt.trim()) throw new Error("Question prompt is required.");
      const targetQuizId = await ensureQuizId();
      const options = [
        { text: "Important subjective/exam question", is_correct: true },
        { text: "Reference answer in explanation", is_correct: false },
      ];

      const { error } = await supabase.rpc("admin_create_mcq", {
        _quiz_id: targetQuizId,
        _prompt: pyqPrompt.trim(),
        _options: options as never,
        _explanation: pyqExplanation.trim() || undefined,
        _difficulty: "medium",
        _points: pyqMarks,
        _negative_marks: 0,
        _tags: ["pyq", String(pyqYear)],
        _year: pyqYear,
        _exam_name: pyqExamName,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("PYQ Insight added");
      setNewPyqOpen(false);
      setPyqPrompt("");
      setPyqExplanation("");
      qc.invalidateQueries({ queryKey: ["admin", "unit-questions", quizQuery.data?.id] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("quiz_questions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Question deleted");
      qc.invalidateQueries({ queryKey: ["admin", "unit-questions", quizQuery.data?.id] });
    },
  });

  // Calculate Health & Readiness Scorecard
  const health = useMemo(() => {
    const hasArticle = !!articleQuery.data && !!articleQuery.data.description?.trim();
    const articlePublished = hasArticle && articleQuery.data?.status === "published";
    const refCount = referenceFilesQuery.data?.length ?? 0;
    const allQuestions = questionsQuery.data ?? [];
    const mcqCount = allQuestions.filter((q) => !q.exam_name && !q.year && q.points < 5).length;
    const pyqCount = allQuestions.filter((q) => q.exam_name || q.year || q.points >= 5).length;

    const isReady = articlePublished;

    return {
      hasArticle,
      articlePublished,
      refCount,
      mcqCount,
      pyqCount,
      isReady,
    };
  }, [articleQuery.data, referenceFilesQuery.data, questionsQuery.data]);

  if (unitQuery.isLoading) {
    return (
      <PageContainer>
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-32 rounded-3xl mb-6" />
        <Skeleton className="h-96 rounded-3xl" />
      </PageContainer>
    );
  }

  if (!unitQuery.data) return null;

  const unit = unitQuery.data;
  const subject = unit.subjects;
  const sem = subject.semesters;
  const course = sem.courses;

  const allQuestions = questionsQuery.data ?? [];
  const mcqQuestions = allQuestions.filter((q) => !q.exam_name && !q.year && q.points < 5);
  const pyqQuestions = allQuestions.filter((q) => q.exam_name || q.year || q.points >= 5);

  return (
    <PageContainer>
      {/* ─── Top Header & Navigation ─── */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-1">
            <Link to="/admin/courses" className="hover:text-foreground">
              Courses
            </Link>
            <span>/</span>
            <Link
              to="/admin/courses/$courseId"
              params={{ courseId: course.id }}
              className="hover:text-foreground"
            >
              {course.code}
            </Link>
            <span>/</span>
            <span>Sem {sem.number}</span>
            <span>/</span>
            <span className="text-foreground font-semibold">{subject.code}</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Unit {unit.number} Workspace: {unit.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="rounded-xl text-xs">
            <Link
              to="/courses/$courseSlug/$semesterNumber/$subjectSlug/$unitNumber"
              params={{
                courseSlug: course.slug,
                semesterNumber: String(sem.number),
                subjectSlug: subject.slug,
                unitNumber: String(unit.number),
              }}
              target="_blank"
            >
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> View on Student Platform
            </Link>
          </Button>

          <Button asChild variant="ghost" size="sm" className="rounded-xl text-xs">
            <Link to="/admin/courses/$courseId" params={{ courseId: course.id }}>
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Course Tree
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Content Health & Readiness Scorecard ─── */}
      <div className="mb-6 rounded-3xl border border-border/80 bg-card p-5 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
            {/* Article Status */}
            <div className="rounded-2xl border border-border/60 bg-muted/20 p-3">
              <span className="block text-[10px] uppercase font-bold text-muted-foreground">
                Online Article
              </span>
              <span className="text-sm font-bold flex items-center gap-1.5 mt-0.5">
                {health.articlePublished ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Published
                  </span>
                ) : health.hasArticle ? (
                  <span className="text-amber-600 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" /> Draft Saved
                  </span>
                ) : (
                  <span className="text-muted-foreground">None</span>
                )}
              </span>
            </div>

            {/* Reference Notes */}
            <div className="rounded-2xl border border-border/60 bg-muted/20 p-3">
              <span className="block text-[10px] uppercase font-bold text-muted-foreground">
                Reference Notes
              </span>
              <span className="text-sm font-bold flex items-center gap-1.5 mt-0.5 text-foreground">
                <FileType className="h-3.5 w-3.5 text-primary" /> {health.refCount} PDF/Files
              </span>
            </div>

            {/* MCQs */}
            <div className="rounded-2xl border border-border/60 bg-muted/20 p-3">
              <span className="block text-[10px] uppercase font-bold text-muted-foreground">
                Practice MCQs
              </span>
              <span className="text-sm font-bold flex items-center gap-1.5 mt-0.5 text-foreground">
                <FlaskConical className="h-3.5 w-3.5 text-primary" /> {health.mcqCount} Questions
              </span>
            </div>

            {/* PYQ Insights */}
            <div className="rounded-2xl border border-border/60 bg-muted/20 p-3">
              <span className="block text-[10px] uppercase font-bold text-muted-foreground">
                PYQ Insights
              </span>
              <span className="text-sm font-bold flex items-center gap-1.5 mt-0.5 text-foreground">
                <GraduationCap className="h-3.5 w-3.5 text-primary" /> {health.pyqCount} Questions
              </span>
            </div>
          </div>

          <div className="sm:border-l sm:border-border/60 sm:pl-5 flex flex-col items-center justify-center">
            <span className="block text-[10px] uppercase font-bold text-muted-foreground mb-1">
              Overall Status
            </span>
            {health.isReady ? (
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
                READY FOR STUDENTS
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10 text-xs font-bold px-3 py-1 rounded-full"
              >
                NEEDS ATTENTION
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* ─── Workspace Tabs ─── */}
      <div className="flex items-center gap-2 border-b border-border/60 pb-3 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("ARTICLE")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "ARTICLE"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground",
          )}
        >
          <BookOpen className="h-4 w-4" /> 1. Online Article (
          {health.articlePublished ? "Published" : "Draft"})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("NOTES")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "NOTES"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground",
          )}
        >
          <FileType className="h-4 w-4" /> 2. Reference Notes ({health.refCount})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("MCQS")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "MCQS"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground",
          )}
        >
          <FlaskConical className="h-4 w-4" /> 3. Practice MCQs ({health.mcqCount})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("PYQ")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "PYQ"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground",
          )}
        >
          <GraduationCap className="h-4 w-4" /> 4. PYQ Insights ({health.pyqCount})
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ONLINE ARTICLE EDITOR                                              */}
      {/* ========================================================================= */}
      {activeTab === "ARTICLE" && (
        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">
                Online Educational Article
              </h2>
              <p className="text-xs text-muted-foreground">
                Write or paste the verified Markdown learning material for Unit {unit.number}.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Select value={articleStatus} onValueChange={(v: any) => setArticleStatus(v)}>
                <SelectTrigger className="h-9 w-32 rounded-xl text-xs font-bold bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                disabled={isSavingArticle}
                onClick={() => saveArticleMutation.mutate("draft")}
                className="rounded-xl h-9 text-xs font-bold"
              >
                Save Draft
              </Button>

              <Button
                size="sm"
                disabled={isSavingArticle}
                onClick={() => saveArticleMutation.mutate("published")}
                className="rounded-xl h-9 text-xs font-bold gap-1.5"
              >
                <Save className="h-3.5 w-3.5" />
                {isSavingArticle ? "Saving…" : "Publish Article"}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground">
                Article Title
              </Label>
              <Input
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                placeholder="Unit Title / Focus"
                className="mt-1 h-11 rounded-xl bg-muted/20 font-bold"
              />
            </div>

            <div>
              <Label className="text-xs font-bold uppercase text-muted-foreground mb-2 block">
                Visual Article Content
              </Label>
              <VisualArticleEditor
                value={articleBody}
                onChange={setArticleBody}
                unitTitle={articleTitle}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: REFERENCE NOTES                                                    */}
      {/* ========================================================================= */}
      {activeTab === "NOTES" && (
        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">
                College Reference Notes &amp; Documents
              </h2>
              <p className="text-xs text-muted-foreground">
                Upload official university PDF lecture notes, presentations, or handouts.
              </p>
            </div>

            <div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.ppt,.pptx"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleUploadDoc(f);
                  }}
                  disabled={isUploadingDoc}
                />
                <Button
                  asChild
                  size="sm"
                  className="rounded-xl text-xs font-bold gap-1.5"
                  disabled={isUploadingDoc}
                >
                  <span>
                    <Upload className="h-3.5 w-3.5" />
                    {isUploadingDoc ? "Uploading Document…" : "Upload PDF / Notes"}
                  </span>
                </Button>
              </label>
            </div>
          </div>

          {(referenceFilesQuery.data ?? []).length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/80 bg-muted/10 p-8 text-center text-xs text-muted-foreground">
              <FileType className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
              No reference notes uploaded for Unit {unit.number} yet.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {(referenceFilesQuery.data ?? []).map((file) => (
                <div
                  key={file.id}
                  className="rounded-2xl border border-border/70 bg-muted/20 p-4 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <FileType className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-foreground truncate">{file.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {file.file_size_bytes
                          ? `${Math.round(file.file_size_bytes / 1024)} KB · `
                          : ""}
                        {file.type.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm(`Delete document "${file.title}"?`)) {
                        deleteDocMutation.mutate(file);
                      }
                    }}
                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PRACTICE MCQS                                                      */}
      {/* ========================================================================= */}
      {activeTab === "MCQS" && (
        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">
                Unit {unit.number} MCQ Question Bank
              </h2>
              <p className="text-xs text-muted-foreground">
                Add single MCQs or use Bulk Importer to paste verified JSON / text questions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBulkImportOpen(true)}
                className="rounded-xl text-xs font-bold gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Bulk Import
              </Button>

              <Button
                size="sm"
                onClick={() => setNewMcqOpen(true)}
                className="rounded-xl text-xs font-bold gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" /> Add MCQ
              </Button>
            </div>
          </div>

          {mcqQuestions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/80 bg-muted/10 p-8 text-center text-xs text-muted-foreground">
              <FlaskConical className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
              No practice MCQs added for this unit yet. Use Bulk Import to paste questions quickly.
            </div>
          ) : (
            <div className="space-y-3">
              {mcqQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-border/70 bg-muted/20 p-4 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-muted-foreground">
                        Q{idx + 1}.
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[10px] uppercase font-bold rounded-md"
                      >
                        {q.difficulty || "medium"}
                      </Badge>
                    </div>
                    <div className="text-sm font-bold text-foreground">{q.prompt}</div>

                    {q.quiz_options && (
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                        {(q.quiz_options as any[]).map((opt) => (
                          <div
                            key={opt.id}
                            className={cn(
                              "px-2.5 py-1 rounded-lg border",
                              opt.is_correct
                                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold"
                                : "border-border/60 text-muted-foreground",
                            )}
                          >
                            {opt.is_correct ? "✓ " : "· "} {opt.text}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm("Delete this question?")) {
                        deleteQuestionMutation.mutate(q.id);
                      }
                    }}
                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PYQ INSIGHTS                                                       */}
      {/* ========================================================================= */}
      {activeTab === "PYQ" && (
        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">
                Unit {unit.number} PYQ Insights (Important Exam Questions)
              </h2>
              <p className="text-xs text-muted-foreground">
                Associate verified university past exam questions with this unit.
              </p>
            </div>

            <Button
              size="sm"
              onClick={() => setNewPyqOpen(true)}
              className="rounded-xl text-xs font-bold gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" /> Add PYQ Insight
            </Button>
          </div>

          {pyqQuestions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/80 bg-muted/10 p-8 text-center text-xs text-muted-foreground">
              <GraduationCap className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
              No PYQ questions linked to Unit {unit.number} yet. Add 5-mark and 10-mark repeated
              questions.
            </div>
          ) : (
            <div className="space-y-3">
              {pyqQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-border/70 bg-muted/20 p-4 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-muted-foreground">
                        PYQ #{idx + 1}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-bold rounded-md bg-card text-primary border-primary/30"
                      >
                        {q.year || "Past"} {q.exam_name || "Exam"}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] font-bold rounded-md bg-card">
                        {q.points || 10} Marks
                      </Badge>
                    </div>

                    <div className="text-sm font-bold text-foreground leading-snug">{q.prompt}</div>

                    {q.explanation && (
                      <div className="mt-2 text-xs text-muted-foreground bg-card/60 p-2.5 rounded-xl border border-border/50">
                        <span className="font-semibold text-primary block mb-0.5">
                          Model Answer / Key Points:
                        </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm("Delete this PYQ question?")) {
                        deleteQuestionMutation.mutate(q.id);
                      }
                    }}
                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── Bulk Import Modal ─── */}
      {quizQuery.data?.id && (
        <BulkImportDialog
          open={bulkImportOpen}
          onOpenChange={setBulkImportOpen}
          quizId={quizQuery.data.id}
          onImported={() => {
            qc.invalidateQueries({ queryKey: ["admin", "unit-questions", quizQuery.data?.id] });
          }}
        />
      )}

      {/* ─── Add Single MCQ Dialog ─── */}
      <Dialog open={newMcqOpen} onOpenChange={setNewMcqOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-bold">Add Practice MCQ</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Add a question with 4 options for Unit {unit.number}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label className="text-xs font-bold">Question Prompt</Label>
              <Textarea
                rows={3}
                value={mcqPrompt}
                onChange={(e) => setMcqPrompt(e.target.value)}
                placeholder="What is the main purpose of..."
                className="mt-1 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold">Options (Select correct choice)</Label>
              {(["A", "B", "C", "D"] as const).map((letter) => {
                const val =
                  letter === "A" ? optA : letter === "B" ? optB : letter === "C" ? optC : optD;
                const setVal =
                  letter === "A"
                    ? setOptA
                    : letter === "B"
                      ? setOptB
                      : letter === "C"
                        ? setOptC
                        : setOptD;

                return (
                  <div key={letter} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCorrectOpt(letter)}
                      className={cn(
                        "h-9 w-9 rounded-xl font-bold text-xs flex items-center justify-center transition-colors shrink-0",
                        correctOpt === letter
                          ? "bg-emerald-600 text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80",
                      )}
                    >
                      {letter}
                    </button>
                    <Input
                      value={val}
                      onChange={(e) => setVal(e.target.value)}
                      placeholder={`Option ${letter}`}
                      className="rounded-xl text-xs h-9"
                    />
                  </div>
                );
              })}
            </div>

            <div>
              <Label className="text-xs font-bold">Explanation</Label>
              <Textarea
                rows={2}
                value={mcqExplanation}
                onChange={(e) => setMcqExplanation(e.target.value)}
                placeholder="Explanation of why the selected answer is correct..."
                className="mt-1 rounded-xl text-xs"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setNewMcqOpen(false)}
              className="rounded-xl text-xs"
            >
              Cancel
            </Button>
            <Button
              onClick={() => createSingleMcqMutation.mutate()}
              disabled={createSingleMcqMutation.isPending}
              className="rounded-xl text-xs font-bold"
            >
              Save MCQ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Add PYQ Insight Dialog ─── */}
      <Dialog open={newPyqOpen} onOpenChange={setNewPyqOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-bold">Add PYQ Insight</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Add genuine previous-year university exam questions for Unit {unit.number}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label className="text-xs font-bold">Exam Question Prompt</Label>
              <Textarea
                rows={3}
                value={pyqPrompt}
                onChange={(e) => setPyqPrompt(e.target.value)}
                placeholder="Explain distance vector routing algorithm with example..."
                className="mt-1 rounded-xl text-sm"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="text-xs font-bold">Year</Label>
                <Input
                  type="number"
                  value={pyqYear}
                  onChange={(e) => setPyqYear(Number(e.target.value))}
                  className="rounded-xl text-xs h-9 mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-bold">Exam Type</Label>
                <Input
                  value={pyqExamName}
                  onChange={(e) => setPyqExamName(e.target.value)}
                  placeholder="End Semester"
                  className="rounded-xl text-xs h-9 mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-bold">Marks</Label>
                <Input
                  type="number"
                  value={pyqMarks}
                  onChange={(e) => setPyqMarks(Number(e.target.value))}
                  className="rounded-xl text-xs h-9 mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold">Model Answer / Solution Key Points</Label>
              <Textarea
                rows={3}
                value={pyqExplanation}
                onChange={(e) => setPyqExplanation(e.target.value)}
                placeholder="Key points, diagram references, and bulleted marks criteria..."
                className="mt-1 rounded-xl text-xs"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setNewPyqOpen(false)}
              className="rounded-xl text-xs"
            >
              Cancel
            </Button>
            <Button
              onClick={() => createPyqMutation.mutate()}
              disabled={createPyqMutation.isPending}
              className="rounded-xl text-xs font-bold"
            >
              Save PYQ Insight
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
