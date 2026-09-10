import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

type Client = SupabaseClient<Database>;

/** Throws unless the user has the `admin` or `super_admin` role. */
export async function assertAdmin(supabase: Client, userId: string): Promise<void> {
  const [adminRes, superRes] = await Promise.all([
    supabase.rpc("has_role", { _user_id: userId, _role: "admin" }),
    supabase.rpc("has_role", { _user_id: userId, _role: "super_admin" }),
  ]);
  if (adminRes.error) throw new Error(`Role verification failed: ${adminRes.error.message}`);
  if (superRes.error) throw new Error(`Role verification failed: ${superRes.error.message}`);
  if (!adminRes.data && !superRes.data) {
    throw new Error("Forbidden: admin required");
  }
}

/** Throws unless the user has the `super_admin` role. */
export async function assertSuperAdmin(supabase: Client, userId: string): Promise<void> {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "super_admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: super_admin required");
}
