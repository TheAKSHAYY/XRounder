import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { loose } from "@/lib/supabase-loose";

type AdminClient = SupabaseClient<Database>;

/**
 * Returns the service-role Supabase client, or `null` when the server has no
 * `SUPABASE_SERVICE_ROLE_KEY` configured.
 *
 * Super Admin features are built on RLS (super_admin policies) so they keep
 * working without the service key; the admin client is only used to enrich
 * data that lives in `auth.users` (emails, last sign-in) and for Auth Admin
 * operations such as banning a user.
 */
export async function tryAdminClient(): Promise<AdminClient | null> {
  if (!process.env["SUPABASE_SERVICE_ROLE_KEY"] || !process.env["SUPABASE_URL"]) return null;
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Touch a property so a misconfigured client fails here, not later.
    void supabaseAdmin.auth;
    return supabaseAdmin as unknown as AdminClient;
  } catch {
    return null;
  }
}

/** True when privileged Auth Admin operations are available on this server. */
export async function hasAdminClient(): Promise<boolean> {
  return (await tryAdminClient()) !== null;
}

/**
 * Best-effort audit-log write. Uses the service-role client when available and
 * falls back to the caller's client; never throws, so a missing audit row can
 * not fail the operation the user asked for.
 */
export async function logAudit(
  userClient: AdminClient,
  entry: {
    actor_id: string | null;
    action: string;
    entity_type?: string | null;
    entity_id?: string | null;
    metadata?: Record<string, unknown>;
  },
): Promise<void> {
  try {
    const admin = await tryAdminClient();
    const client = loose(admin ?? userClient);
    await client.from("audit_logs").insert({
      actor_id: entry.actor_id,
      action: entry.action,
      entity_type: entry.entity_type ?? null,
      entity_id: entry.entity_id ?? null,
      metadata: entry.metadata ?? {},
    });
  } catch {
    // Auditing must never block the primary action.
  }
}
