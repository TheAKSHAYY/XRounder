import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Download, FileText, Lock, Sparkles } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PdfViewer } from "@/components/pdf-viewer";
import { EmptyState } from "@/components/ui/empty-state";
import { useAuth } from "@/hooks/use-auth";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";

export const Route = createFileRoute("/notes/$noteId")({
  head: () => ({ meta: [{ title: "Study Note · XRounder" }] }),
  component: NoteViewer,
});

type NoteData = {
  id: string;
  title: string;
  summary: string | null;
  body: string | null;
  file_path: string | null;
  file_bucket: string | null;
  file_mime: string | null;
  file_url: string | null;
};

function NoteViewer() {
  const { noteId } = Route.useParams();
  const { user, loading: authLoading } = useAuth();

  const noteQuery = useQuery({
    queryKey: ["public", "note", noteId],
    queryFn: async (): Promise<NoteData | null> => {
      // 1. Try content_items table
      const { data: item } = await supabase
        .from("content_items")
        .select("id, title, description, file_path, file_bucket, file_mime, file_url")
        .eq("id", noteId)
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();

      if (item) {
        return {
          id: item.id,
          title: item.title,
          summary: item.description,
          body: item.description,
          file_path: item.file_path,
          file_bucket: item.file_bucket,
          file_mime: item.file_mime,
          file_url: item.file_url,
        };
      }

      // 2. Fallback to legacy notes table
      const { data: note, error: ne } = await supabase
        .from("notes")
        .select("id, title, summary, body, file_path, file_bucket, file_mime")
        .eq("id", noteId)
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();

      if (ne) throw ne;
      if (!note) return null;

      return {
        id: note.id,
        title: note.title,
        summary: note.summary,
        body: note.body || note.summary,
        file_path: note.file_path,
        file_bucket: note.file_bucket,
        file_mime: note.file_mime,
        file_url: null,
      };
    },
  });

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (noteQuery.data?.file_url) {
      setPdfUrl(noteQuery.data.file_url);
      return;
    }
    if (!noteQuery.data?.file_path) {
      setPdfUrl(null);
      return;
    }
    let active = true;
    (async () => {
      try {
        const { data, error } = await supabase.storage
          .from(noteQuery.data!.file_bucket ?? "notes")
          .createSignedUrl(noteQuery.data!.file_path!, 60 * 60);
        if (!error && active && data?.signedUrl) {
          setPdfUrl(data.signedUrl);
        }
      } catch {
        if (active) {
          const { data: pubData } = supabase.storage
            .from(noteQuery.data!.file_bucket ?? "notes")
            .getPublicUrl(noteQuery.data!.file_path!);
          if (pubData?.publicUrl) setPdfUrl(pubData.publicUrl);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [noteQuery.data?.file_path, noteQuery.data?.file_bucket, noteQuery.data?.file_url]);

  // record view (best-effort, signed-in users only)
  useEffect(() => {
    if (!noteQuery.data?.id) return;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      await supabase.from("note_views").insert({
        note_id: noteQuery.data!.id,
        user_id: u.user.id,
        kind: "view",
      });
    })();
  }, [noteQuery.data?.id]);

  const recordDownload = async () => {
    if (!noteQuery.data?.id) return;
    const { data: u } = await supabase.auth.getUser();
    if (u.user) {
      await supabase.from("note_views").insert({
        note_id: noteQuery.data.id,
        user_id: u.user.id,
        kind: "download",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined" && window.history.length > 1) {
              window.history.back();
            } else {
              window.location.href = "/courses";
            }
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {noteQuery.isLoading && (
          <div className="mt-8 rounded-2xl border border-border bg-surface p-12 text-center text-sm text-muted-foreground">
            Opening study note…
          </div>
        )}

        {!noteQuery.isLoading && !noteQuery.data && (
          <div className="mt-8">
            <EmptyState
              icon={Lock}
              tone="accent"
              title={user || authLoading ? "This note is unavailable" : "Sign in to view this note"}
              description={
                user || authLoading
                  ? "This note may be unpublished, deleted, or restricted by the course admin."
                  : "Some study notes are available only to signed-in students. Sign in once, then this PDF will open here."
              }
              primaryAction={
                user || authLoading
                  ? { label: "Browse courses", to: "/courses", icon: FileText }
                  : { label: "Sign in", to: "/auth", icon: Lock }
              }
              secondaryAction={{ label: "Back to catalog", to: "/courses" }}
            />
          </div>
        )}

        {noteQuery.data && (
          <article className="mt-8">
            {/* Header */}
            <div className="border-b border-border/70 pb-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  <Sparkles className="h-3 w-3" /> Syllabus Note
                </span>
              </div>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                {noteQuery.data.title}
              </h1>
              {noteQuery.data.summary && (
                <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {noteQuery.data.summary}
                </p>
              )}
            </div>

            {/* Distraction-free body */}
            {noteQuery.data.body && (
              <div className="prose prose-neutral dark:prose-invert mt-8 max-w-[68ch] whitespace-pre-wrap text-foreground leading-relaxed text-base font-normal">
                {noteQuery.data.body}
              </div>
            )}

            {/* Embedded PDF Viewer */}
            {pdfUrl && (
              <section className="mt-10 pt-8 border-t border-border/70">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">
                      Document Preview
                    </h2>
                    <p className="text-xs text-muted-foreground">Original PDF document</p>
                  </div>
                  <a href={pdfUrl} target="_blank" rel="noreferrer" onClick={recordDownload}>
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Button>
                  </a>
                </div>
                <PdfViewer url={pdfUrl} title={noteQuery.data.title} />
              </section>
            )}

            {!noteQuery.data.body && !pdfUrl && (
              <p className="mt-8 rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted-foreground">
                This note has no written text or PDF attachments yet.
              </p>
            )}
          </article>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
