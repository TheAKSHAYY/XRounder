import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  bumpBucket,
  contentBulkPatchSchema,
  contentInputSchema,
  contentListSchema,
  emptyBucket,
  idSchema,
  idsSchema,
  type ContentItem,
  type ContentStatus,
  type ContentType,
  type ContentVisibility,
} from "@/lib/content.schemas";

export type { ContentItem, ContentStatus, ContentType, ContentVisibility };

export const listContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: z.input<typeof contentListSchema>) => contentListSchema.parse(input))
  .handler(async ({ data, context }) => {
    const sb = context.supabase;
    const from = (data.page - 1) * data.pageSize;
    const to = from + data.pageSize - 1;
    let q = sb
      .from("content_items")
      .select(
        "id,type,title,description,status,visibility,subject_id,unit_id,file_path,file_url,tags,view_count,download_count,created_at,updated_at,subject:subjects(id,title),unit:units(id,title)",
        { count: "exact" },
      )
      .is("deleted_at", null);
    if (data.type && data.type !== "all") q = q.eq("type", data.type as ContentType);
    if (data.status && data.status !== "all") q = q.eq("status", data.status);
    if (data.subjectId) q = q.eq("subject_id", data.subjectId);
    if (data.search && data.search.trim()) q = q.ilike("title", `%${data.search.trim()}%`);
    q = q.order(data.sort, { ascending: data.dir === "asc" }).range(from, to);
    const { data: rows, error, count } = await q;
    if (error) throw new Error(error.message);
    return { items: (rows ?? []) as unknown as ContentItem[], total: count ?? 0 };
  });

export const getContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("content_items")
      .select(
        "*,subject:subjects(id,title),unit:units(id,title)",
      )
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Not found");
    return row as unknown as ContentItem;
  });

export const createContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: z.input<typeof contentInputSchema>) => contentInputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const payload = { ...data, created_by: context.userId, file_url: data.file_url || null };
    const { data: row, error } = await context.supabase
      .from("content_items")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const updateContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; patch: Partial<z.input<typeof contentInputSchema>> }) =>
    z.object({ id: z.string().uuid(), patch: contentInputSchema.partial() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const patch = { ...data.patch, file_url: data.patch.file_url || null };
    const { error } = await context.supabase
      .from("content_items")
      .update(patch)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const bulkUpdateContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { ids: string[]; patch: { status?: ContentStatus; visibility?: ContentVisibility } }) =>
    contentBulkPatchSchema.parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("content_items")
      .update(data.patch)
      .in("id", data.ids);
    if (error) throw new Error(error.message);
    return { ok: true, count: data.ids.length };
  });

export const deleteContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { ids: string[] }) =>
    idsSchema.parse(input),
  )
  .handler(async ({ data, context }) => {
    // Soft delete first. Some deployments have an UPDATE policy whose WITH CHECK
    // rejects rows with deleted_at set; in that case fall back to a hard delete
    // (admins have a DELETE policy).
    const { error } = await context.supabase
      .from("content_items")
      .update({ deleted_at: new Date().toISOString() })
      .in("id", data.ids);

    if (error) {
      const isRls =
        error.code === "42501" ||
        /row-level security/i.test(error.message ?? "");
      if (!isRls) throw new Error(error.message);

      const { error: delErr } = await context.supabase
        .from("content_items")
        .delete()
        .in("id", data.ids);
      if (delErr) throw new Error(delErr.message);
      return { ok: true, hardDeleted: true };
    }

    return { ok: true };
  });


export const duplicateContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: src, error: e1 } = await context.supabase
      .from("content_items").select("*").eq("id", data.id).single();
    if (e1) throw new Error(e1.message);
    const copy = {
      ...src,
      id: undefined,
      title: `${src.title} (copy)`,
      status: "draft" as const,
      view_count: 0,
      download_count: 0,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: null,
      created_by: context.userId,
    };
    delete (copy as Record<string, unknown>).id;
    delete (copy as Record<string, unknown>).created_at;
    delete (copy as Record<string, unknown>).updated_at;
    const { data: row, error: e2 } = await context.supabase
      .from("content_items").insert(copy).select("id").single();
    if (e2) throw new Error(e2.message);
    return row;
  });

export const listSubjectsFlat = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("subjects")
      .select("id,title,code,status,semester:semesters(number,course:courses(title))")
      .is("deleted_at", null)
      .order("title");
    if (error) throw new Error(error.message);
    return data ?? [];
  });

// ---------------------------------------------------------------------------
// Content stats — reused by admin dashboards and student subject/unit pages.
// Returns totals by type for a subject, per-unit breakdown, and lastUpdated.
// ---------------------------------------------------------------------------





// Subjects with aggregated content stats, grouped by course + semester.
export const listSubjectsWithStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const sb = context.supabase;
    const [subjectsRes, itemsRes, unitsRes] = await Promise.all([
      sb.from("subjects")
        .select("id,title,code,status,semester:semesters(id,number,course:courses(id,title,slug))")
        .is("deleted_at", null)
        .order("title"),
      sb.from("content_items")
        .select("subject_id,type,status")
        .is("deleted_at", null),
      sb.from("units")
        .select("subject_id")
        .is("deleted_at", null),
    ]);
    if (subjectsRes.error) throw new Error(subjectsRes.error.message);
    if (itemsRes.error) throw new Error(itemsRes.error.message);
    if (unitsRes.error) throw new Error(unitsRes.error.message);

    const statsBySubject = new Map<string, StatsBucket & { drafts: number }>();
    for (const it of itemsRes.data ?? []) {
      if (!it.subject_id) continue;
      const cur = statsBySubject.get(it.subject_id) ?? { ...emptyBucket(), drafts: 0 };
      if (it.status === "published") bumpBucket(cur, it.type);
      else if (it.status === "draft") cur.drafts++;
      statsBySubject.set(it.subject_id, cur);
    }
    const unitCountBySubject = new Map<string, number>();
    for (const u of unitsRes.data ?? []) {
      if (!u.subject_id) continue;
      unitCountBySubject.set(u.subject_id, (unitCountBySubject.get(u.subject_id) ?? 0) + 1);
    }

    return (subjectsRes.data ?? []).map((s) => ({
      id: s.id,
      title: s.title,
      code: s.code,
      status: s.status,
      semester: s.semester,
      unitCount: unitCountBySubject.get(s.id) ?? 0,
      stats: statsBySubject.get(s.id) ?? { ...emptyBucket(), drafts: 0 },
    }));
  });


