import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type FeatureFlagRow = {
  key: string;
  module: string | null;
  description: string | null;
  enabled: boolean | null;
};

/**
 * Loads all feature flags from public.feature_flags.
 * Cached with 60s staleTime.
 */
export function useFeatureFlags() {
  return useQuery({
    queryKey: ["feature-flags"],
    staleTime: 60_000,
    queryFn: async (): Promise<Record<string, boolean>> => {
      const { data, error } = await supabase.from("feature_flags").select("key, enabled");

      if (error) {
        console.warn("[feature-flags] Failed to fetch feature flags:", error.message);
        return {};
      }

      const map: Record<string, boolean> = {};
      for (const row of data ?? []) {
        if (row.key) {
          map[row.key] = row.enabled ?? false;
        }
      }
      return map;
    },
  });
}

/**
 * Checks a specific feature flag by key with a safe fallback.
 *
 * @param key Flag key, e.g. "module.quizzes", "module.notes", "module.papers"
 * @param defaultValue Fallback value if flag is not defined or query is loading (defaults to true for production resilience)
 */
export function useFeatureFlag(key: string, defaultValue = true): boolean {
  const { data, isLoading } = useFeatureFlags();

  if (isLoading || !data) {
    return defaultValue;
  }

  if (key in data) {
    return Boolean(data[key]);
  }

  return defaultValue;
}
