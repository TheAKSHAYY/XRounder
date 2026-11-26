import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export const SITEMAP_BASE_URL = "https://www.xrounder.in";

export interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export function formatSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${escapeXml(`${SITEMAP_BASE_URL}${e.path}`)}</loc>`,
      e.lastmod ? `    <lastmod>${escapeXml(e.lastmod.split("T")[0])}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${escapeXml(e.changefreq)}</changefreq>` : null,
      e.priority ? `    <priority>${escapeXml(e.priority)}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

export const STATIC_SITEMAP_ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/courses", changefreq: "daily", priority: "0.9" },
  { path: "/papers", changefreq: "daily", priority: "0.9" },
  { path: "/explore", changefreq: "weekly", priority: "0.8" },
  { path: "/mock-test", changefreq: "weekly", priority: "0.8" },
  { path: "/developer", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

let cachedSitemapXml: string | null = null;
let cachedSitemapTimestamp = 0;

export function _getCachedSitemap(): { xml: string | null; timestamp: number } {
  return { xml: cachedSitemapXml, timestamp: cachedSitemapTimestamp };
}

export function _setCachedSitemap(xml: string | null, timestamp = Date.now()) {
  cachedSitemapXml = xml;
  cachedSitemapTimestamp = timestamp;
}

export function _resetSitemapCache() {
  cachedSitemapXml = null;
  cachedSitemapTimestamp = 0;
}

export async function fetchAllSitemapEntries(supabase: SupabaseClient<Database>): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [...STATIC_SITEMAP_ENTRIES];
  const pathSet = new Set<string>(entries.map((e) => e.path));

  // 1. Published courses → /courses/:courseSlug
  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select("id, slug, updated_at")
    .eq("status", "published")
    .is("deleted_at", null);

  if (coursesError) throw coursesError;

  const courseMap = new Map<string, string>();
  for (const c of courses ?? []) {
    if (!c.slug) continue;
    courseMap.set(c.id, c.slug);
    const p = `/courses/${c.slug}`;
    if (!pathSet.has(p)) {
      pathSet.add(p);
      entries.push({
        path: p,
        lastmod: c.updated_at ?? undefined,
        changefreq: "weekly",
        priority: "0.8",
      });
    }
  }

  // 2. Published semesters → /courses/:courseSlug/:semesterNumber
  if (courseMap.size > 0) {
    const { data: semesters, error: semError } = await supabase
      .from("semesters")
      .select("id, course_id, number, updated_at")
      .in("course_id", Array.from(courseMap.keys()))
      .eq("status", "published")
      .is("deleted_at", null);

    if (semError) throw semError;

    const semMap = new Map<string, { courseSlug: string; number: number }>();
    for (const s of semesters ?? []) {
      const courseSlug = courseMap.get(s.course_id);
      if (!courseSlug || s.number == null) continue;
      semMap.set(s.id, { courseSlug, number: s.number });
      const p = `/courses/${courseSlug}/${s.number}`;
      if (!pathSet.has(p)) {
        pathSet.add(p);
        entries.push({
          path: p,
          lastmod: s.updated_at ?? undefined,
          changefreq: "weekly",
          priority: "0.8",
        });
      }
    }

    // 3. Published subjects → /courses/:courseSlug/:semesterNumber/:subjectSlug
    if (semMap.size > 0) {
      const { data: subjects, error: subjError } = await supabase
        .from("subjects")
        .select("id, semester_id, slug, updated_at")
        .in("semester_id", Array.from(semMap.keys()))
        .eq("status", "published")
        .is("deleted_at", null);

      if (subjError) throw subjError;

      const subjectMap = new Map<
        string,
        { courseSlug: string; semesterNumber: number; slug: string }
      >();
      for (const subj of subjects ?? []) {
        const semInfo = semMap.get(subj.semester_id);
        if (!semInfo || !subj.slug) continue;
        subjectMap.set(subj.id, {
          courseSlug: semInfo.courseSlug,
          semesterNumber: semInfo.number,
          slug: subj.slug,
        });
        const p = `/courses/${semInfo.courseSlug}/${semInfo.number}/${subj.slug}`;
        if (!pathSet.has(p)) {
          pathSet.add(p);
          entries.push({
            path: p,
            lastmod: subj.updated_at ?? undefined,
            changefreq: "weekly",
            priority: "0.7",
          });
        }
      }

      // 4. Published units → /courses/:courseSlug/:semesterNumber/:subjectSlug/:unitNumber
      if (subjectMap.size > 0) {
        const { data: units, error: unitsError } = await supabase
          .from("units")
          .select("id, subject_id, number, updated_at")
          .in("subject_id", Array.from(subjectMap.keys()))
          .eq("status", "published")
          .is("deleted_at", null);

        if (unitsError) throw unitsError;

        for (const u of units ?? []) {
          const subjInfo = subjectMap.get(u.subject_id);
          if (!subjInfo || u.number == null) continue;
          const p = `/courses/${subjInfo.courseSlug}/${subjInfo.semesterNumber}/${subjInfo.slug}/${u.number}`;
          if (!pathSet.has(p)) {
            pathSet.add(p);
            entries.push({
              path: p,
              lastmod: u.updated_at ?? undefined,
              changefreq: "weekly",
              priority: "0.7",
            });
          }
        }
      }
    }
  }

  // 5. Published question papers → /papers/:paperId
  const { data: papers, error: papersError } = await supabase
    .from("papers")
    .select("id, updated_at")
    .eq("status", "published")
    .is("deleted_at", null);

  if (papersError) throw papersError;

  for (const p of papers ?? []) {
    if (!p.id) continue;
    const paperPath = `/papers/${p.id}`;
    if (!pathSet.has(paperPath)) {
      pathSet.add(paperPath);
      entries.push({
        path: paperPath,
        lastmod: p.updated_at ?? undefined,
        changefreq: "weekly",
        priority: "0.7",
      });
    }
  }

  // 6. Published public study notes → /notes/:noteId
  const { data: notes, error: notesError } = await supabase
    .from("notes")
    .select("id, updated_at")
    .eq("status", "published")
    .eq("visibility", "public")
    .is("deleted_at", null);

  if (notesError) throw notesError;

  for (const n of notes ?? []) {
    if (!n.id) continue;
    const notePath = `/notes/${n.id}`;
    if (!pathSet.has(notePath)) {
      pathSet.add(notePath);
      entries.push({
        path: notePath,
        lastmod: n.updated_at ?? undefined,
        changefreq: "weekly",
        priority: "0.7",
      });
    }
  }

  // 7. Published public quizzes with questions → /quizzes/:quizId
  const { data: quizzes, error: quizzesError } = await supabase
    .from("quizzes")
    .select("id, updated_at, quiz_questions!inner(id)")
    .eq("status", "published")
    .eq("is_public", true)
    .is("deleted_at", null)
    .limit(1, { referencedTable: "quiz_questions" });

  if (quizzesError) throw quizzesError;

  for (const q of quizzes ?? []) {
    if (!q.id) continue;
    const quizPath = `/quizzes/${q.id}`;
    if (!pathSet.has(quizPath)) {
      pathSet.add(quizPath);
      entries.push({
        path: quizPath,
        lastmod: q.updated_at ?? undefined,
        changefreq: "weekly",
        priority: "0.7",
      });
    }
  }

  return entries;
}

export async function generateSitemapResponse(customClient?: SupabaseClient<Database>): Promise<Response> {
  try {
    let client = customClient;

    if (!client) {
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

      if (supabaseUrl && supabaseKey) {
        client = createClient<Database>(supabaseUrl, supabaseKey, {
          auth: {
            storage: undefined,
            persistSession: false,
            autoRefreshToken: false,
          },
        });
      }
    }

    if (!client) {
      throw new Error("Supabase credentials not configured for sitemap generation");
    }

    const entries = await fetchAllSitemapEntries(client);

    // Safeguard: An active platform should have well over 50 educational resources
    if (entries.length < 50) {
      throw new Error(`Sitemap generated fewer than expected entries (${entries.length}). Potential incomplete fetch.`);
    }

    const xml = formatSitemapXml(entries);

    // Cache the last-known-good generation in module memory
    cachedSitemapXml = xml;
    cachedSitemapTimestamp = Date.now();

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "X-Sitemap-Source": "live-db",
        "X-Sitemap-Count": String(entries.length),
      },
    });
  } catch (error) {
    console.error("[sitemap] Dynamic generation error:", error);

    // Resilience strategy:
    // 1. If we have a previously cached last-known-good sitemap in memory, serve it
    //    so search crawlers do not see a drop in indexed pages during short DB blips.
    if (cachedSitemapXml) {
      console.warn("[sitemap] Serving last-known-good cached sitemap due to upstream failure.");
      return new Response(cachedSitemapXml, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=300, s-maxage=600",
          "X-Sitemap-Source": "cache-fallback",
        },
      });
    }

    // 2. Cold-boot failure with no cached sitemap:
    //    CRITICAL: Never return a truncated static-only sitemap (which tells Google that 697 resources
    //    were deleted, triggering de-indexing). Instead return 503 Service Unavailable with Retry-After: 300,
    //    instructing Googlebot to preserve the current index and retry crawling in 5 minutes.
    return new Response(
      "Sitemap temporarily unavailable due to upstream database maintenance. Please retry in 300 seconds.",
      {
        status: 503,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Retry-After": "300",
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
