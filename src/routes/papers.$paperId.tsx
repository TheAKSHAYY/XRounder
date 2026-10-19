import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ArrowLeft, Download, FileStack, FileText, RefreshCw } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PdfViewer } from "@/components/pdf-viewer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const Route = createFileRoute("/papers/$paperId")({
  head: ({ params }) => {
    const url = `https://www.xrounder.in/papers/${params.paperId}`;
    return {
      meta: [
        { title: "University Question Paper · XRounder" },
        {
          name: "description",
          content:
            "View and download semester examination question papers, previous year papers, and solutions on XRounder.",
        },
        { property: "og:title", content: "University Question Paper · XRounder" },
        {
          property: "og:description",
          content:
            "View and download semester examination question papers, previous year papers, and solutions on XRounder.",
        },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: "https://www.xrounder.in/og-image.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "University Question Paper · XRounder" },
        {
          name: "twitter:description",
          content:
            "View and download semester examination question papers, previous year papers, and solutions on XRounder.",
        },
        { name: "twitter:image", content: "https://www.xrounder.in/og-image.png" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: PaperViewer,
});

function PaperViewer() {
  const { paperId } = Route.useParams();

  const paperQuery = useQuery({
    queryKey: ["public", "paper", paperId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("papers")
        .select("id, title, year, exam_type, paper_number, description, file_path, file_bucket")
        .eq("id", paperId)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  const paperFilePath = paperQuery.data?.file_path;
  const paperFileBucket = paperQuery.data?.file_bucket;

  useEffect(() => {
    if (!paperFilePath) {
      setPdfUrl(null);
      setPdfError(null);
      setPdfLoading(false);
      return;
    }
    let active = true;
    setPdfLoading(true);
    setPdfError(null);

    (async () => {
      try {
        const bucket = paperFileBucket ?? "papers";
        const filePath = paperFilePath;
        const { data, error } = await supabase.storage
          .from(bucket)
          .createSignedUrl(filePath, 60 * 60);

        if (!active) return;

        if (error) {
          if (bucket === "avatars") {
            const { data: pubData } = supabase.storage.from(bucket).getPublicUrl(filePath);
            if (pubData?.publicUrl) {
              setPdfUrl(pubData.publicUrl);
              setPdfError(null);
              setPdfLoading(false);
              return;
            }
          }
          setPdfError(error.message || "Failed to generate paper access link.");
          setPdfUrl(null);
        } else if (data?.signedUrl) {
          setPdfUrl(data.signedUrl);
          setPdfError(null);
        } else {
          setPdfError("Document link was not returned by storage service.");
          setPdfUrl(null);
        }
      } catch (err: unknown) {
        if (active) {
          const message =
            err instanceof Error ? err.message : "Unexpected network error loading document.";
          setPdfError(message);
          setPdfUrl(null);
        }
      } finally {
        if (active) setPdfLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [paperFilePath, paperFileBucket, retryCount]);

  const recordDownload = async () => {
    if (!paperQuery.data?.id) return;
    const { data: u } = await supabase.auth.getUser();
    if (u.user) {
      await supabase
        .from("paper_downloads")
        .insert({ paper_id: paperQuery.data.id, user_id: u.user.id });
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

        {paperQuery.data && (
          <article className="mt-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <FileStack className="h-3.5 w-3.5" /> Previous-year paper
            </div>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-normal text-foreground leading-tight">
              {paperQuery.data.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge>{paperQuery.data.year}</Badge>
              <Badge variant="outline">{paperQuery.data.exam_type.replace("_", " ")}</Badge>
              {paperQuery.data.paper_number && (
                <Badge variant="outline">#{paperQuery.data.paper_number}</Badge>
              )}
            </div>
            {paperQuery.data.description && (
              <p className="mt-4 max-w-3xl text-muted-foreground">{paperQuery.data.description}</p>
            )}

            {paperQuery.data.file_path ? (
              <section className="mt-8">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold text-foreground">Paper PDF</h2>
                  {pdfUrl && (
                    <a href={pdfUrl} target="_blank" rel="noreferrer" onClick={recordDownload}>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </a>
                  )}
                </div>

                {pdfLoading && (
                  <div className="rounded-2xl border border-border/70 bg-surface/50 p-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary animate-pulse mb-3">
                      <FileText className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      Loading question paper preview…
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Generating secure document link
                    </p>
                  </div>
                )}

                {pdfError && (
                  <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive mb-3">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      Unable to load paper document
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                      {pdfError}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRetryCount((c) => c + 1)}
                      className="mt-4 rounded-xl gap-1.5 text-xs font-semibold"
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Retry
                    </Button>
                  </div>
                )}

                {pdfUrl && !pdfLoading && !pdfError && (
                  <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                    <PdfViewer url={pdfUrl} title={paperQuery.data.title} />
                  </div>
                )}
              </section>
            ) : (
              <p className="mt-8 rounded-xl border border-dashed border-border bg-surface p-6 text-sm text-muted-foreground">
                No PDF attached for this paper yet.
              </p>
            )}
          </article>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
