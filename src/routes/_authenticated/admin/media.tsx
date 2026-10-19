import { useRef, useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Download,
  FileText,
  ImageIcon,
  Loader2,
  Trash2,
  Upload,
  Video,
  Search,
  AlertTriangle,
} from "lucide-react";
import { PageContainer } from "@/components/admin/ui/page-container";
import { PageHeader } from "@/components/admin/ui/page-header";
import { ConfirmDialog } from "@/components/admin/ui/confirm-dialog";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/admin/media")({
  head: () => ({ meta: [{ title: "Media library · Admin · XRounder" }] }),
  component: MediaAdmin,
});

type MediaRow = {
  id: string;
  bucket: string;
  object_key: string;
  filename: string;
  mime_type: string | null;
  kind: "image" | "pdf" | "video" | "audio" | "document" | "other";
  byte_size: number | null;
  alt_text: string | null;
  created_at: string;
};

const BUCKETS = ["media", "notes", "papers", "assignments", "branding"] as const;

function detectKind(mime: string): MediaRow["kind"] {
  if (mime.startsWith("image/")) return "image";
  if (mime === "application/pdf") return "pdf";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "audio";
  if (mime.includes("word") || mime.includes("document") || mime.includes("spreadsheet"))
    return "document";
  return "other";
}

function formatBytes(n: number | null) {
  if (!n) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(1)} ${units[i]}`;
}

function KindIcon({ kind }: { kind: MediaRow["kind"] }) {
  if (kind === "image") return <ImageIcon className="h-5 w-5" />;
  if (kind === "video") return <Video className="h-5 w-5" />;
  return <FileText className="h-5 w-5" />;
}

function MediaAdmin() {
  const qc = useQueryClient();
  const fileInput = useRef<HTMLInputElement>(null);
  const [bucket, setBucket] = useState<(typeof BUCKETS)[number]>("media");
  const [filterBucket, setFilterBucket] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState<{
    row: MediaRow;
    referenceCount: number;
    refTitles: string[];
  } | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "media"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media_assets")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(300);
      if (error) throw error;
      return data as MediaRow[];
    },
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      if (filterBucket !== "all" && row.bucket !== filterBucket) return false;
      if (!q) return true;
      return (
        row.filename.toLowerCase().includes(q) ||
        row.object_key.toLowerCase().includes(q) ||
        row.kind.toLowerCase().includes(q)
      );
    });
  }, [data, filterBucket, search]);

  const uploadFiles = async (files: FileList) => {
    setUploading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id ?? null;
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() ?? "bin";
        const key = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from(bucket)
          .upload(key, file, { contentType: file.type, upsert: false });
        if (upErr) throw upErr;
        const { error: insErr } = await supabase.from("media_assets").insert({
          bucket,
          object_key: key,
          filename: file.name,
          mime_type: file.type,
          kind: detectKind(file.type),
          byte_size: file.size,
          uploaded_by: uid,
        });
        if (insErr) throw insErr;
      }
      toast.success("Uploaded successfully");
      qc.invalidateQueries({ queryKey: ["admin", "media"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const removeMutation = useMutation({
    mutationFn: async (row: MediaRow) => {
      const { error: rmErr } = await supabase.storage.from(row.bucket).remove([row.object_key]);
      if (rmErr) throw rmErr;
      const { error } = await supabase.from("media_assets").delete().eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("File deleted from storage and catalog");
      qc.invalidateQueries({ queryKey: ["admin", "media"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const initiateDelete = async (row: MediaRow) => {
    try {
      const { data: refs } = await supabase
        .from("content_items")
        .select("id, title")
        .or(`file_path.ilike.%${row.object_key}%,file_url.ilike.%${row.object_key}%`)
        .limit(3);
      const count = refs?.length ?? 0;
      const titles = (refs ?? []).map((r) => r.title);
      setMediaToDelete({ row, referenceCount: count, refTitles: titles });
    } catch {
      setMediaToDelete({ row, referenceCount: 0, refTitles: [] });
    }
  };

  const download = async (row: MediaRow) => {
    const { data, error } = await supabase.storage
      .from(row.bucket)
      .createSignedUrl(row.object_key, 60);
    if (error) {
      toast.error(error.message);
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <PageContainer>
      <PageHeader
        breadcrumbs={[{ label: "Media library" }]}
        title="Media library"
        description="Central registry of uploaded media, lecture materials, and branding assets. Uploads are stored with signed URLs."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">Upload to:</span>
              <Select value={bucket} onValueChange={(v) => setBucket(v as typeof bucket)}>
                <SelectTrigger className="h-9 w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BUCKETS.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button size="sm" onClick={() => fileInput.current?.click()} disabled={uploading}>
              {uploading ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-1.5 h-4 w-4" />
              )}
              Upload file
            </Button>
            <input
              ref={fileInput}
              type="file"
              multiple
              hidden
              onChange={(e) => e.target.files && uploadFiles(e.target.files)}
            />
          </div>
        }
      />

      <div className="mt-6 mb-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search filename or path…"
            className="h-9 pl-8"
          />
        </div>
        <Select value={filterBucket} onValueChange={setFilterBucket}>
          <SelectTrigger className="h-9 w-[150px]">
            <SelectValue placeholder="All buckets" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All buckets</SelectItem>
            {BUCKETS.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="ml-auto text-xs text-muted-foreground">
          {filteredData.length} of {data?.length ?? 0} file(s)
        </span>
      </div>

      <section className="mt-4">
        {isLoading && <p className="text-sm text-muted-foreground">Loading media assets…</p>}
        {!isLoading && filteredData.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
            <p className="font-display text-lg text-foreground">
              {search || filterBucket !== "all" ? "No matching files" : "Library is empty"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {search || filterBucket !== "all"
                ? "Try clearing filters or search term."
                : "Upload images, PDFs, videos or documents to start."}
            </p>
          </div>
        )}
        {filteredData.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">File</th>
                  <th className="px-4 py-3">Bucket</th>
                  <th className="px-4 py-3">Kind</th>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredData.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                          <KindIcon kind={row.kind} />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{row.filename}</div>
                          <div className="font-mono text-xs text-muted-foreground">
                            {row.object_key}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{row.bucket}</Badge>
                    </td>
                    <td className="px-4 py-3 capitalize">{row.kind}</td>
                    <td className="px-4 py-3">{formatBytes(row.byte_size)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => download(row)}
                        title="Download signed URL"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => initiateDelete(row)}
                        title="Delete file"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <ConfirmDialog
        open={!!mediaToDelete}
        onOpenChange={(open) => !open && setMediaToDelete(null)}
        title={`Delete "${mediaToDelete?.row.filename}"?`}
        description={
          mediaToDelete?.referenceCount && mediaToDelete.referenceCount > 0
            ? `⚠️ Caution: This file appears to be linked to ${mediaToDelete.referenceCount} content item(s) (${mediaToDelete.refTitles.slice(0, 2).join(", ")}${mediaToDelete.refTitles.length > 2 ? "..." : ""}). Deleting it will permanently break learner-facing material.`
            : `This will remove the file from the "${mediaToDelete?.row.bucket}" storage bucket and database catalog. This action cannot be undone.`
        }
        destructive
        confirmLabel="Delete file"
        onConfirm={() => {
          if (mediaToDelete) {
            removeMutation.mutate(mediaToDelete.row);
            setMediaToDelete(null);
          }
        }}
      />
    </PageContainer>
  );
}
