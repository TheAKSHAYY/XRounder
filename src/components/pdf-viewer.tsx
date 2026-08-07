import { Download, ExternalLink, FileText, Maximize2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Document viewer: skeleton preview while the embed loads, plus explicit
 * Download / Open actions that stay visible and tappable on mobile.
 */
export function PdfViewer({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-surface-muted px-4 py-3 sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-foreground">
          <FileText className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span className="truncate">{title}</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="tap-target px-2 sm:px-3"
            title="Download"
          >
            <a href={url} download aria-label={`Download ${title}`}>
              <Download className="h-4 w-4 sm:mr-2" aria-hidden />
              <span className="hidden sm:inline">Download</span>
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="tap-target px-2 sm:px-3"
            title="Open full screen"
          >
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${title} full screen`}
            >
              <Maximize2 className="h-4 w-4 sm:mr-2" aria-hidden />
              <span className="hidden sm:inline">Full screen</span>
              <ExternalLink className="ml-2 hidden h-3.5 w-3.5 opacity-60 lg:inline" aria-hidden />
            </a>
          </Button>
        </div>
      </div>

      <div className="relative min-h-[60vh] bg-background">
        {!loaded && (
          <div className="absolute inset-0 space-y-3 p-4" aria-hidden>
            <Skeleton className="mx-auto h-6 w-2/3 rounded-md" />
            <Skeleton className="mx-auto h-4 w-11/12 rounded-md" />
            <Skeleton className="mx-auto h-4 w-10/12 rounded-md" />
            <Skeleton className="mx-auto h-4 w-11/12 rounded-md" />
            <Skeleton className="mx-auto h-40 w-full rounded-lg" />
            <Skeleton className="mx-auto h-4 w-9/12 rounded-md" />
            <Skeleton className="mx-auto h-4 w-10/12 rounded-md" />
            <span className="sr-only">Loading document preview…</span>
          </div>
        )}
        <iframe
          src={`${url}#toolbar=1&navpanes=0&view=FitH`}
          title={title}
          loading="lazy"
          className="h-[60vh] w-full bg-background sm:h-[75vh]"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
