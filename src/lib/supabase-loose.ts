import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Escape hatch for tables/RPCs that exist in the database but are not yet in
 * the generated `Database` types (e.g. tables added by a migration that landed
 * after the last type generation).
 *
 * Prefer this over a bare `as any`: query-builder method names, chaining and
 * the `{ data, error }` result shape stay type-checked — only row shapes are
 * unknown, so callers must annotate the returned rows themselves.
 *
 * Remove a call site as soon as the table appears in
 * `src/integrations/supabase/types.ts`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LooseSupabaseClient = SupabaseClient<any, "public", any>;

export function loose(client: unknown): LooseSupabaseClient {
  return client as LooseSupabaseClient;
}
