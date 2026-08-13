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

/** Slug that always produces a value — used for generated DB records. */
export function slugifyOrGenerated(input: string): string {
  return slugify(input, `item-${Date.now().toString(36)}`);
}
