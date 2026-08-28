import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

const BASE_URL = "https://www.xrounder.in";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

function escapeXml(unsafe: string): string {
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

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/courses", changefreq: "daily", priority: "0.9" },
          { path: "/explore", changefreq: "weekly", priority: "0.8" },
          { path: "/mock-test", changefreq: "weekly", priority: "0.8" },
          { path: "/developer", changefreq: "monthly", priority: "0.7" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
        ];

        const pathSet = new Set<string>(entries.map((e) => e.path));

        try {
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
            const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
              auth: {
                storage: undefined,
                persistSession: false,
                autoRefreshToken: false,
              },
            });

            // 1. Published courses → /courses/:courseSlug
            const { data: courses } = await supabase
              .from("courses")
              .select("id, slug, updated_at")
              .eq("status", "published")
              .is("deleted_at", null);

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
              const { data: semesters } = await supabase
                .from("semesters")
                .select("id, course_id, number, updated_at")
                .in("course_id", Array.from(courseMap.keys()))
                .eq("status", "published")
                .is("deleted_at", null);

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
                const { data: subjects } = await supabase
                  .from("subjects")
                  .select("id, semester_id, slug, updated_at")
                  .in("semester_id", Array.from(semMap.keys()))
                  .eq("status", "published")
                  .is("deleted_at", null);

                const subjectMap = new Map<string, { courseSlug: string; semesterNumber: number; slug: string }>();
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
                  const { data: units } = await supabase
                    .from("units")
                    .select("id, subject_id, number, updated_at")
                    .in("subject_id", Array.from(subjectMap.keys()))
                    .eq("status", "published")
                    .is("deleted_at", null);

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
          }
        } catch (error) {
          console.error("[sitemap] Failed to fetch dynamic database routes:", error);
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${escapeXml(`${BASE_URL}${e.path}`)}</loc>`,
            e.lastmod ? `    <lastmod>${escapeXml(e.lastmod.split("T")[0])}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${escapeXml(e.changefreq)}</changefreq>` : null,
            e.priority ? `    <priority>${escapeXml(e.priority)}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});


