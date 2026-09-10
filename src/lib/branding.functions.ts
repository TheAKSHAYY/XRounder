import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertSuperAdmin } from "@/lib/role-guards.server";
import { loose } from "@/lib/supabase-loose";
import { logAudit } from "@/lib/admin-client.server";

export const brandingInputSchema = z.object({
  site_name: z.string().min(1, "Site name is required").max(80),
  tagline: z.string().max(200).optional().nullable(),
  logo_text: z.string().max(40).optional().nullable(),
  logo_url: z.string().url().optional().or(z.literal("")).nullable(),
  favicon_url: z.string().url().optional().or(z.literal("")).nullable(),
  support_email: z.string().email().optional().or(z.literal("")).nullable(),
  footer_text: z.string().max(300).optional().nullable(),
  seo_title: z.string().max(120).optional().nullable(),
  seo_description: z.string().max(300).optional().nullable(),
  og_image_url: z.string().url().optional().or(z.literal("")).nullable(),
  primary_color: z.string().max(80).optional().nullable(),
  secondary_color: z.string().max(80).optional().nullable(),
  accent_color: z.string().max(80).optional().nullable(),
  font_heading: z.string().max(60).optional().nullable(),
  font_body: z.string().max(60).optional().nullable(),
  radius_rem: z.coerce.number().min(0).max(2).optional().nullable(),
});

export type BrandingInput = z.infer<typeof brandingInputSchema>;

export const updateBrandingSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: BrandingInput) => brandingInputSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context.supabase, context.userId);
    const sb = loose(context.supabase);

    const payload = {
      site_name: data.site_name,
      tagline: data.tagline || null,
      logo_text: data.logo_text || null,
      logo_url: data.logo_url || null,
      favicon_url: data.favicon_url || null,
      support_email: data.support_email || null,
      footer_text: data.footer_text || null,
      seo_title: data.seo_title || null,
      seo_description: data.seo_description || null,
      og_image_url: data.og_image_url || null,
      primary_color: data.primary_color || null,
      secondary_color: data.secondary_color || null,
      accent_color: data.accent_color || null,
      font_heading: data.font_heading || null,
      font_body: data.font_body || null,
      radius_rem: data.radius_rem ?? null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await sb.from("branding").update(payload).eq("id", 1);
    if (error) throw new Error(error.message);

    await logAudit(context.supabase, {
      actor_id: context.userId,
      action: "branding.update",
      entity_type: "branding",
      entity_id: "1",
      metadata: { site_name: payload.site_name },
    });

    return { ok: true };
  });

export const toggleMaintenanceMode = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (d: { enabled: boolean; message?: string }) =>
      z.object({ enabled: z.boolean(), message: z.string().optional() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context.supabase, context.userId);
    const sb = loose(context.supabase);

    const { data: existing } = await sb.from("maintenance").select("id").limit(1).maybeSingle();

    if (existing) {
      const { error } = await sb
        .from("maintenance")
        .update({
          enabled: data.enabled,
          message: data.message ?? "We'll be right back.",
          updated_by: context.userId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", (existing as { id: number }).id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await sb.from("maintenance").insert({
        id: 1,
        enabled: data.enabled,
        message: data.message ?? "We'll be right back.",
        updated_by: context.userId,
      });
      if (error) throw new Error(error.message);
    }

    await logAudit(context.supabase, {
      actor_id: context.userId,
      action: data.enabled ? "maintenance.enable" : "maintenance.disable",
      entity_type: "system",
      entity_id: "maintenance",
      metadata: { enabled: data.enabled, message: data.message },
    });

    return { ok: true };
  });
