import { z } from "zod";

import type { Database } from "@/integrations/supabase/types";

export type ContentType = Database["public"]["Enums"]["content_type"];
export type ContentVisibility = Database["public"]["Enums"]["content_visibility"];
export type ContentStatus = "draft" | "published" | "archived";

export type ContentItem = Database["public"]["Tables"]["content_items"]["Row"] & {
  subject?: { id: string; title: string } | null;
  unit?: { id: string; title: string } | null;
};

export const contentListSchema = z.object({
  type: z.string().optional(),
  status: z.string().optional(),
  subjectId: z.string().uuid().optional(),
  search: z.string().optional(),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  sort: z.enum(["created_at", "title", "updated_at"]).default("created_at"),
  dir: z.enum(["asc", "desc"]).default("desc"),
});

export const contentInputSchema = z.object({
  type: z.enum(["note", "pdf", "ppt", "video", "assignment", "link"]),
  title: z.string().min(1).max(300),
  description: z.string().optional().nullable(),
  subject_id: z.string().uuid().optional().nullable(),
  unit_id: z.string().uuid().optional().nullable(),
  file_bucket: z.string().optional().nullable(),
  file_path: z.string().optional().nullable(),
  file_mime: z.string().optional().nullable(),
  file_size_bytes: z.number().optional().nullable(),
  file_url: z.string().url().optional().nullable().or(z.literal("")),
  thumbnail_path: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  visibility: z.enum(["public", "students", "private"]).default("public"),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export const contentBulkPatchSchema = z.object({
  ids: z.array(z.string().uuid()).min(1),
  patch: z.object({
    status: z.enum(["draft", "published", "archived"]).optional(),
    visibility: z.enum(["public", "students", "private"]).optional(),
  }),
});

export const idsSchema = z.object({ ids: z.array(z.string().uuid()).min(1) });
export const idSchema = z.object({ id: z.string().uuid() });

// --- content stats buckets ---------------------------------------------------

export type StatsBucket = {
  notes: number;
  pdfs: number;
  ppts: number;
  videos: number;
  assignments: number;
  links: number;
  mcqs: number;
  total: number;
};

export function emptyBucket(): StatsBucket {
  return { notes: 0, pdfs: 0, ppts: 0, videos: 0, assignments: 0, links: 0, mcqs: 0, total: 0 };
}

export function bumpBucket(b: StatsBucket, type: string) {
  switch (type) {
    case "note":
      b.notes++;
      break;
    case "pdf":
      b.pdfs++;
      break;
    case "ppt":
      b.ppts++;
      break;
    case "video":
      b.videos++;
      break;
    case "assignment":
      b.assignments++;
      break;
    case "link":
      b.links++;
      break;
  }
  b.total++;
}
