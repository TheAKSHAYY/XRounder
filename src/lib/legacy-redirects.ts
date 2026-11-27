import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { slugify } from "@/lib/slug";

export const CANONICAL_SITE_ORIGIN = "https://www.xrounder.in";

/** Known legacy subject slugs with random 4-character suffixes mapped to canonical DB slugs. */
export const LEGACY_SUBJECT_SLUG_REDIRECTS: Readonly<Record<string, string>> = {
  "principle-of-management-wc5k": "bca-109n-principle-of-management",
  "data-structures-using-c-9mnb": "bca-102n-data-structures-using-c",
  "business-organization-management-vm81": "bca-106n-business-organization-and-management",
  "business-organization-and-management-vm81": "bca-106n-business-organization-and-management",
  "introduction-to-database-system-sf3n": "bca-104n-introduction-to-database-system",
};

/** Suffixes known to come from the legacy random-hash subject generator. */
export const KNOWN_LEGACY_SUFFIX_PATTERN = /^(.+)-(?:wc5k|9mnb|vm81|sf3n)$/i;

/** General trailing 4-char alphanumeric suffix pattern used in route-level 404 fallback checks. */
export const GENERIC_RANDOM_SUFFIX_PATTERN = /^(.+)-([a-z0-9]{4})$/i;

const TOKEN_NOISE = new Set(["and", "of", "the", "to", "in", "for", "on", "with", "using"]);

export interface ParsedCourseSubjectPath {
  courseSlug: string;
  semesterNumber: string;
  subjectSlug: string;
  unitNumber?: string;
}

export interface SubjectRedirectCandidate {
  slug: string;
  title: string;
}

export function parseCourseSubjectPath(pathname: string): ParsedCourseSubjectPath | null {
  const match = pathname.match(/^\/courses\/([^/]+)\/(\d+)\/([^/]+)(?:\/(\d+))?\/?$/i);
  if (!match) return null;

  try {
    return {
      courseSlug: decodeURIComponent(match[1]!).toLowerCase(),
      semesterNumber: match[2]!,
      subjectSlug: decodeURIComponent(match[3]!),
      unitNumber: match[4],
    };
  } catch {
    return null;
  }
}

export function buildCanonicalCoursePath(
  courseSlug: string,
  semesterNumber: string | number,
  subjectSlug: string,
  unitNumber?: string | number,
): string {
  const base = `/courses/${courseSlug}/${semesterNumber}/${subjectSlug}`;
  return unitNumber !== undefined && unitNumber !== null && String(unitNumber).length > 0
    ? `${base}/${unitNumber}`
    : base;
}

function stripCourseCodePrefix(slug: string): string {
  return slug.toLowerCase().replace(/^[a-z]{2,6}-\d{2,4}[a-z]*-/, "");
}

function normalizeSlugTokens(slug: string): string {
  return slug
    .toLowerCase()
    .split("-")
    .filter((token) => token.length > 0 && !TOKEN_NOISE.has(token))
    .join("-");
}

/**
 * Matches a legacy suffixed `subjectSlug` (such as `foo-vm81` or `bar-sf3n`) against live published
 * subjects in the same semester. Returns `null` if `subjectSlug` already matches a live subject or
 * no unambiguous canonical match exists.
 */
export function matchCanonicalSubjectSlug(
  subjectSlug: string,
  candidates: readonly SubjectRedirectCandidate[],
): string | null {
  const normalizedInput = subjectSlug.trim().toLowerCase();
  if (!normalizedInput) return null;

  // Never redirect if the exact slug is an active canonical subject.
  if (candidates.some((c) => c.slug.toLowerCase() === normalizedInput)) {
    return null;
  }

  const staticTarget = LEGACY_SUBJECT_SLUG_REDIRECTS[normalizedInput];
  if (staticTarget) {
    const matchedStatic = candidates.find((c) => c.slug.toLowerCase() === staticTarget);
    if (matchedStatic) return matchedStatic.slug;
  }

  const suffixMatch = normalizedInput.match(GENERIC_RANDOM_SUFFIX_PATTERN);
  if (!suffixMatch) return null;

  const strippedBase = suffixMatch[1]!.toLowerCase();
  const strippedTokens = normalizeSlugTokens(stripCourseCodePrefix(strippedBase));

  const exactMatches = candidates.filter((c) => {
    const slugLower = c.slug.toLowerCase();
    const withoutCode = stripCourseCodePrefix(slugLower);
    const titleSlug = slugify(c.title);
    return slugLower === strippedBase || withoutCode === strippedBase || titleSlug === strippedBase;
  });

  if (exactMatches.length === 1) {
    return exactMatches[0]!.slug;
  }

  if (strippedTokens) {
    const tokenMatches = candidates.filter((c) => {
      const withoutCodeTokens = normalizeSlugTokens(stripCourseCodePrefix(c.slug));
      const titleTokens = normalizeSlugTokens(slugify(c.title));
      return withoutCodeTokens === strippedTokens || titleTokens === strippedTokens;
    });

    if (tokenMatches.length === 1) {
      return tokenMatches[0]!.slug;
    }
  }

  return null;
}

export function resolveStaticLegacyCoursePath(pathname: string): string | null {
  const parsed = parseCourseSubjectPath(pathname);
  if (!parsed) return null;

  const mappedSlug = LEGACY_SUBJECT_SLUG_REDIRECTS[parsed.subjectSlug.toLowerCase()];
  if (!mappedSlug || mappedSlug === parsed.subjectSlug.toLowerCase()) return null;

  return buildCanonicalCoursePath(
    parsed.courseSlug,
    parsed.semesterNumber,
    mappedSlug,
    parsed.unitNumber,
  );
}

function getSupabaseServerClient(): SupabaseClient<Database> | null {
  const supabaseUrl =
    process.env.SUPABASE_URL ||
    (typeof import.meta !== "undefined" && import.meta.env
      ? import.meta.env.VITE_SUPABASE_URL
      : undefined);
  const supabaseKey =
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    (typeof import.meta !== "undefined" && import.meta.env
      ? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
      : undefined);

  if (!supabaseUrl || !supabaseKey) return null;

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Resolves the canonical subject slug for a missing subject route by inspecting published subjects
 * in the same course and semester. Intended as a route-loader fallback before throwing `notFound()`.
 */
export async function resolveCanonicalSubjectSlugRedirect(
  supabase: SupabaseClient<Database>,
  courseSlug: string,
  semesterNumber: string | number,
  subjectSlug: string,
): Promise<string | null> {
  const normalized = subjectSlug.trim().toLowerCase();
  if (!normalized) return null;

  const { data: course } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", courseSlug)
    .eq("status", "published")
    .is("deleted_at", null)
    .maybeSingle();

  if (!course) {
    return LEGACY_SUBJECT_SLUG_REDIRECTS[normalized] ?? null;
  }

  const { data: sem } = await supabase
    .from("semesters")
    .select("id")
    .eq("course_id", course.id)
    .eq("number", Number(semesterNumber))
    .eq("status", "published")
    .is("deleted_at", null)
    .maybeSingle();

  if (!sem) {
    return LEGACY_SUBJECT_SLUG_REDIRECTS[normalized] ?? null;
  }

  const { data: subjects } = await supabase
    .from("subjects")
    .select("slug, title")
    .eq("semester_id", sem.id)
    .eq("status", "published")
    .is("deleted_at", null);

  if (!subjects || subjects.length === 0) return null;
  return matchCanonicalSubjectSlug(normalized, subjects);
}

export function createPermanentRedirectResponse(location: string): Response {
  return new Response(null, {
    status: 301,
    headers: {
      Location: location,
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

function buildRedirectLocation(requestUrl: URL, canonicalPath: string): string {
  const host = requestUrl.hostname.toLowerCase();
  const origin =
    host === "xrounder.in" || host === "www.xrounder.in"
      ? CANONICAL_SITE_ORIGIN
      : requestUrl.origin;
  return new URL(`${canonicalPath}${requestUrl.search}`, origin).toString();
}

/**
 * Intercepts HTTP GET/HEAD requests to legacy suffixed course/subject/unit URLs
 * (`-wc5k`, `-9mnb`, `-vm81`, `-sf3n`) and returns an immediate `301` redirect to the canonical slug.
 */
export async function maybeResolveLegacyCourseRedirectResponse(
  request: Request,
  customClient?: SupabaseClient<Database>,
): Promise<Response | null> {
  if (request.method !== "GET" && request.method !== "HEAD") return null;

  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return null;
  }

  const parsed = parseCourseSubjectPath(url.pathname);
  if (!parsed) return null;

  const staticPath = resolveStaticLegacyCoursePath(url.pathname);
  if (staticPath) {
    return createPermanentRedirectResponse(buildRedirectLocation(url, staticPath));
  }

  if (!KNOWN_LEGACY_SUFFIX_PATTERN.test(parsed.subjectSlug)) {
    return null;
  }

  const client = customClient ?? getSupabaseServerClient();
  if (!client) return null;

  try {
    const resolvedSlug = await resolveCanonicalSubjectSlugRedirect(
      client,
      parsed.courseSlug,
      parsed.semesterNumber,
      parsed.subjectSlug,
    );
    if (!resolvedSlug || resolvedSlug === parsed.subjectSlug) return null;

    const canonicalPath = buildCanonicalCoursePath(
      parsed.courseSlug,
      parsed.semesterNumber,
      resolvedSlug,
      parsed.unitNumber,
    );
    return createPermanentRedirectResponse(buildRedirectLocation(url, canonicalPath));
  } catch (error) {
    console.warn("[legacy-redirects] Redirect lookup failed, falling back to router:", error);
    return null;
  }
}
