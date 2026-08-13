/**
 * Canonical slug helper. Lowercases, collapses non-alphanumerics to dashes,
 * trims dashes and caps length at 60 chars.
 *
 * Pass `fallback` when an empty result is not acceptable (e.g. DB slugs).
 */
export function slugify(input: string, fallback?: string): string {
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return slug || fallback || "";
}
