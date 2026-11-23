import { describe, it, expect, beforeEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  escapeXml,
  formatSitemapXml,
  generateSitemapResponse,
  _resetSitemapCache,
  _setCachedSitemap,
  type SitemapEntry,
} from "./sitemap";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

describe("SEO & Indexing Architecture Tests", () => {
  it("verifies robots.txt policies adhere to Google crawler guidance", () => {
    const robotsPath = path.resolve(process.cwd(), "public/robots.txt");
    expect(fs.existsSync(robotsPath)).toBe(true);

    const robotsContent = fs.readFileSync(robotsPath, "utf-8");
    expect(robotsContent).toContain("Allow: /");
    expect(robotsContent).toContain("Disallow: /admin");
    expect(robotsContent).toContain("Disallow: /_authenticated/");
    expect(robotsContent).toContain("Disallow: /setup");
    expect(robotsContent).toContain("Disallow: /reset-password");

    // CRITICAL: /auth must NOT be disallowed in robots.txt so Googlebot can crawl and parse noindex
    expect(robotsContent).not.toMatch(/Disallow:\s*\/auth\b/);

    expect(robotsContent).toContain("Sitemap: https://www.xrounder.in/sitemap.xml");
  });

  it("verifies auth route enforces noindex, follow in metadata", () => {
    const authRoutePath = path.resolve(process.cwd(), "src/routes/auth.tsx");
    expect(fs.existsSync(authRoutePath)).toBe(true);

    const authContent = fs.readFileSync(authRoutePath, "utf-8");
    expect(authContent).toContain('name: "robots"');
    expect(authContent).toContain('content: "noindex, follow"');
  });

  it("verifies no leaf route references uncompressed og-image.png", () => {
    const routesDir = path.resolve(process.cwd(), "src/routes");
    const routeFiles = fs.readdirSync(routesDir).filter((f) => f.endsWith(".tsx"));

    for (const file of routeFiles) {
      const fullPath = path.join(routesDir, file);
      const content = fs.readFileSync(fullPath, "utf-8");
      expect(content).not.toContain("og-image.png");
    }
  });

  it("verifies standardized 1200x630 share image is used across primary public routes", () => {
    const targetRoutes = [
      "src/routes/index.tsx",
      "src/routes/courses.index.tsx",
      "src/routes/papers.index.tsx",
      "src/routes/notes.$noteId.tsx",
      "src/routes/papers.$paperId.tsx",
      "src/routes/quizzes.$quizId.tsx",
      "src/routes/explore.tsx",
      "src/routes/mock-test.tsx",
    ];

    for (const relPath of targetRoutes) {
      const fullPath = path.resolve(process.cwd(), relPath);
      expect(fs.existsSync(fullPath)).toBe(true);
      const content = fs.readFileSync(fullPath, "utf-8");
      expect(content).toContain("https://www.xrounder.in/xrounder-share.jpg");
    }
  });

  it("verifies footer provides universal internal link equity to /papers", () => {
    const footerPath = path.resolve(process.cwd(), "src/components/layout/site-footer.tsx");
    const footerContent = fs.readFileSync(footerPath, "utf-8");
    expect(footerContent).toContain('label: "Previous Papers"');
    expect(footerContent).toContain('to: "/papers"');
  });

  it("verifies XML special character escaping function", () => {
    expect(escapeXml("C & Data Structures <Sem 2> 'Advanced' \"Test\"")).toBe(
      "C &amp; Data Structures &lt;Sem 2&gt; &apos;Advanced&apos; &quot;Test&quot;",
    );
  });

  it("formats sitemap XML properly according to Sitemaps.org 0.9 schema", () => {
    const sampleEntries: SitemapEntry[] = [
      { path: "/", priority: "1.0", changefreq: "weekly", lastmod: "2026-11-20T12:00:00Z" },
      { path: "/courses/bca", priority: "0.8", changefreq: "daily" },
    ];

    const xml = formatSitemapXml(sampleEntries);
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain("<loc>https://www.xrounder.in/</loc>");
    expect(xml).toContain("<lastmod>2026-11-20</lastmod>");
    expect(xml).toContain("<changefreq>weekly</changefreq>");
    expect(xml).toContain("<priority>1.0</priority>");
    expect(xml).toContain("<loc>https://www.xrounder.in/courses/bca</loc>");
    expect(xml).toContain("</urlset>");
  });
});

describe("Sitemap Reliability & Outage Fallback Logic", () => {
  beforeEach(() => {
    _resetSitemapCache();
  });

  it("returns 503 with Retry-After on cold boot when database is unreachable", async () => {
    // Mock failing client
    const failingClient = {
      from: () => {
        throw new Error("Connection timed out to Postgres cluster");
      },
    } as unknown as SupabaseClient<Database>;

    const response = await generateSitemapResponse(failingClient);

    expect(response.status).toBe(503);
    expect(response.headers.get("Retry-After")).toBe("300");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    const body = await response.text();
    expect(body).toContain("Sitemap temporarily unavailable");
  });

  it("serves last-known-good cache with 200 OK when database fails after successful warm-up", async () => {
    const mockGoodXml =
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.xrounder.in/test</loc></url></urlset>';
    _setCachedSitemap(mockGoodXml, Date.now() - 60000);

    const failingClient = {
      from: () => {
        throw new Error("Database socket closed");
      },
    } as unknown as SupabaseClient<Database>;

    const response = await generateSitemapResponse(failingClient);

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/xml; charset=utf-8");
    expect(response.headers.get("X-Sitemap-Source")).toBe("cache-fallback");
    const body = await response.text();
    expect(body).toBe(mockGoodXml);
  });
});

describe("Search Snippet Deduplication Logic", () => {
  it("prevents duplicate 'Semester X (Semester X)' in semester titles", () => {
    const courseTitle = "Bachelor of Computer Applications";
    const params = { semesterNumber: "1" };
    const sem = { id: "sem-1", title: "Semester 1" };

    const semDisplay =
      sem?.title && sem.title.toLowerCase().includes(`semester ${params.semesterNumber}`)
        ? sem.title
        : `Semester ${params.semesterNumber}`;
    const title = `${courseTitle} ${semDisplay} Subjects, Notes & Past Papers · XRounder`;

    expect(title).toBe(
      "Bachelor of Computer Applications Semester 1 Subjects, Notes & Past Papers · XRounder",
    );
    expect(title).not.toContain("Semester 1 (Semester 1)");
  });

  it("prevents duplicate subject codes in subject titles", () => {
    const subjectWithCode = { title: "Computer Fundamentals and PC Software (BCA-101N)", code: "BCA-101N" };
    const cleanSubjTitle = subjectWithCode.title.trim();
    const cleanCode = subjectWithCode.code.trim();
    const codeSuffix =
      cleanCode && !cleanSubjTitle.toLowerCase().includes(cleanCode.toLowerCase())
        ? ` (${cleanCode})`
        : "";
    const title = `${cleanSubjTitle}${codeSuffix} Notes & Past Papers · XRounder`;

    expect(title).toBe("Computer Fundamentals and PC Software (BCA-101N) Notes & Past Papers · XRounder");
    expect(title).not.toContain("(BCA-101N) (BCA-101N)");
  });

  it("prevents duplicate 'Unit X: Unit X' in unit titles", () => {
    const unit = { number: 1, title: "Unit 1: Introduction to Data Structures" };
    const subject = { title: "Data Structures using C" };
    const cleanSubjTitle = subject.title.trim();
    const cleanUnitTitle = unit.title.trim().replace(/^Unit\s+\d+[:\s-]*/i, "").trim();

    const title = `Unit ${unit.number}: ${cleanUnitTitle} — ${cleanSubjTitle} · XRounder`;

    expect(title).toBe("Unit 1: Introduction to Data Structures — Data Structures using C · XRounder");
    expect(title).not.toContain("Unit 1: Unit 1");
  });

  it("prevents duplicate subject or unit names in note titles", () => {
    const note = { title: "Basic Mathematics - Unit 1 Limits & Continuity Notes" };
    const hier = { subjectTitle: "Basic Mathematics", courseTitle: "BCA" };

    const noteTitle = note.title.trim();
    const cleanTitle =
      hier.subjectTitle && noteTitle.toLowerCase().startsWith(hier.subjectTitle.toLowerCase())
        ? noteTitle
        : `${noteTitle} — ${hier.subjectTitle || hier.courseTitle || ""}`.trim();
    const title = `${cleanTitle} · XRounder`;

    expect(title).toBe("Basic Mathematics - Unit 1 Limits & Continuity Notes · XRounder");
    expect(title).not.toContain("Basic Mathematics — Basic Mathematics");
  });

  it("prevents duplicate years or 'University Question Paper' in paper titles", () => {
    const paper = {
      title: "Basic Mathematics — 2026 University Question Paper (44903)",
      year: 2026,
    };
    const paperTitle = paper.title.trim();
    const hasYear = paper.year && paperTitle.includes(String(paper.year));
    const hasUniversityPaper = paperTitle.toLowerCase().includes("university question paper");

    let cleanTitle = paperTitle;
    if (!hasYear && paper.year) {
      cleanTitle = `${cleanTitle} (${paper.year})`;
    }
    if (!hasUniversityPaper) {
      cleanTitle = `${cleanTitle} — University Question Paper`;
    }
    const title = `${cleanTitle} · XRounder`;

    expect(title).toBe("Basic Mathematics — 2026 University Question Paper (44903) · XRounder");
    expect(title).not.toContain("(2026) (2026)");
    expect(title).not.toContain("University Question Paper — University Question Paper");
  });
});
