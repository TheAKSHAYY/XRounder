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

const CODE_STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "for",
  "in",
  "of",
  "on",
  "the",
  "to",
  "using",
  "with",
]);

/**
 * Generates a unique, clean SEO slug from `input` without appending random hash suffixes.
 * Appends sequential numeric suffixes (`-2`, `-3`, ...) only when `existingSlugs` contains a collision.
 */
export function buildUniqueSlug(input: string, existingSlugs: Iterable<string>): string {
  const taken = new Set(Array.from(existingSlugs, (s) => s.trim().toLowerCase()).filter(Boolean));
  const base = slugifyOrGenerated(input.trim());
  if (!taken.has(base)) return base;

  let index = 2;
  while (index < 10_000) {
    const suffix = `-${index}`;
    const candidate = `${base.slice(0, 60 - suffix.length).replace(/-+$/, "")}${suffix}`;
    if (!taken.has(candidate)) return candidate;
    index += 1;
  }
  return `${base.slice(0, 50)}-${Date.now().toString(36)}`;
}

/**
 * Derives a clean, readable academic code from a node title without truncating single words awkwardly
 * (prevents codes such as `BUSINESSORGA` or `INTRODUCTION`), deduplicating against `existingCodes`.
 */
export function buildReadableNodeCode(
  title: string,
  fallback: string,
  existingCodes: Iterable<string> = [],
): string {
  const taken = new Set(Array.from(existingCodes, (c) => c.trim().toUpperCase()).filter(Boolean));
  const trimmed = title.trim();

  // Preserve explicit leading course/subject code tokens if provided (e.g. "BCA-106N Business...")
  const explicitMatch = trimmed.match(/^([A-Za-z]{2,6}-\d{2,4}[A-Za-z]?)\b/);
  let baseCode = "";

  if (explicitMatch) {
    baseCode = explicitMatch[1].toUpperCase();
  } else {
    const rawWords = trimmed
      .replace(/[^A-Za-z0-9\s]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const meaningfulWords = rawWords.filter((w) => !CODE_STOPWORDS.has(w.toLowerCase()));
    const sourceWords = meaningfulWords.length > 0 ? meaningfulWords : rawWords;

    if (sourceWords.length >= 2) {
      baseCode = sourceWords
        .map((w) => w[0]!.toUpperCase())
        .join("")
        .slice(0, 6);
    } else if (sourceWords.length === 1) {
      baseCode = sourceWords[0]!.toUpperCase().slice(0, 6);
    }
  }

  const normalizedBase = baseCode || fallback.toUpperCase().slice(0, 8) || "ITEM";
  if (!taken.has(normalizedBase)) return normalizedBase;

  let index = 2;
  while (index < 10_000) {
    const suffix = String(index);
    const candidate = `${normalizedBase.slice(0, Math.max(1, 10 - suffix.length))}${suffix}`;
    if (!taken.has(candidate)) return candidate;
    index += 1;
  }
  return `${normalizedBase.slice(0, 6)}${Date.now().toString(36).toUpperCase().slice(-4)}`;
}
