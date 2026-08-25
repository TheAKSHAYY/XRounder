import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Download, FileText, Lock } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PdfViewer } from "@/components/pdf-viewer";
import { EmptyState } from "@/components/ui/empty-state";
import { useAuth } from "@/hooks/use-auth";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const Route = createFileRoute("/notes/$noteId")({
  head: () => ({ meta: [{ title: "Note · XRounder" }] }),
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
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to catalog
        </Link>

        {noteQuery.isLoading && (
          <div className="mt-6 rounded-2xl border border-border bg-surface p-8 text-sm text-muted-foreground">
            Opening note…
          </div>
        )}

        {!noteQuery.isLoading && !noteQuery.data && (
          <div className="mt-6">
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
          <article className="mt-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <FileText className="h-3.5 w-3.5" /> Study note
            </div>
            <h1 className="mt-2 font-display text-4xl font-semibold text-foreground">
              {noteQuery.data.title}
            </h1>
            {noteQuery.data.summary && (
              <p className="mt-3 max-w-3xl text-muted-foreground">{noteQuery.data.summary}</p>
            )}

            {noteQuery.data.body && (
              <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-wrap rounded-2xl border border-border bg-surface p-6 text-foreground">
                {noteQuery.data.body}
              </div>
            )}

            {pdfUrl && (
              <section className="mt-8">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    PDF preview
                  </h2>
                  <a href={pdfUrl} target="_blank" rel="noreferrer" onClick={recordDownload}>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </a>
                </div>
                <PdfViewer url={pdfUrl} title={noteQuery.data.title} />
              </section>
            )}

            {!noteQuery.data.body && !pdfUrl && (
              <p className="mt-8 rounded-xl border border-dashed border-border bg-surface p-6 text-sm text-muted-foreground">
                This note has no content yet.
              </p>
            )}
          </article>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
