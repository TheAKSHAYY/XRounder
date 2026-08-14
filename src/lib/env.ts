/**
 * Environment validation for required Supabase configuration.
 *
 * Runs on both the server (SSR) and the browser. Client-visible values come
 * from `import.meta.env.VITE_*` (inlined at build time); server-only fallbacks
 * come from `process.env`.
 */

export type EnvVarCheck = {
  /** Name shown to the developer in the error screen. */
  name: string;
  /** Where the value should be set. */
  hint: string;
  present: boolean;
};

export type EnvValidationResult = {
  valid: boolean;
  missing: EnvVarCheck[];
  invalid: EnvVarCheck[];
};

function readServerEnv(key: string): string | undefined {
  try {
    return typeof process !== "undefined" ? process.env?.[key] : undefined;
  } catch {
    return undefined;
  }
}

function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateSupabaseEnv(): EnvValidationResult {
  const url =
    (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? readServerEnv("SUPABASE_URL");
  const publishableKey =
    (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
    readServerEnv("SUPABASE_PUBLISHABLE_KEY");

  const checks: EnvVarCheck[] = [
    {
      name: "VITE_SUPABASE_URL",
      hint: "Supabase project URL, e.g. https://<project-id>.supabase.co",
      present: isNonEmpty(url),
    },
    {
      name: "VITE_SUPABASE_PUBLISHABLE_KEY",
      hint: "Supabase publishable (anon) key, starts with sb_publishable_ or eyJ",
      present: isNonEmpty(publishableKey),
    },
  ];

  const missing = checks.filter((c) => !c.present);

  const invalid: EnvVarCheck[] = [];
  if (isNonEmpty(url) && !/^https?:\/\/.+/i.test(url.trim())) {
    invalid.push({
      name: "VITE_SUPABASE_URL",
      hint: "Must be a full URL starting with https://",
      present: true,
    });
  }
  if (isNonEmpty(publishableKey) && publishableKey.trim().startsWith("sb_secret_")) {
    invalid.push({
      name: "VITE_SUPABASE_PUBLISHABLE_KEY",
      hint: "This is a secret key — never expose it to the browser. Use the publishable key.",
      present: true,
    });
  }

  return { valid: missing.length === 0 && invalid.length === 0, missing, invalid };
}

export function formatEnvError(result: EnvValidationResult): string {
  const parts: string[] = [];
  if (result.missing.length > 0) {
    parts.push(`Missing: ${result.missing.map((c) => c.name).join(", ")}`);
  }
  if (result.invalid.length > 0) {
    parts.push(`Invalid: ${result.invalid.map((c) => c.name).join(", ")}`);
  }
  return `Supabase configuration problem. ${parts.join(" · ")}`;
}
