/**
 * Content Sanitizer & Textbook Restructuring Engine for XRounder
 *
 * Converts formal report-style notes, legacy exam checklists, UUIDs, and raw Q&A sheets
 * into clean, textbook-style educational documentation aligned with high-quality academic standards.
 */

export interface SanitizedContentResult {
  title: string;
  body: string;
  topics: string[];
}

export interface SplitTopicItem {
  id: string;
  topicTitle: string;
  title: string;
  body: string;
  sortOrder: number;
}

/**
 * Strips internal metadata, UUIDs, administrative banners, checklists, and report-style titles
 * from student-facing study material.
 */
export function sanitizeEducationalMarkdown(raw: string): string {
  if (!raw || !raw.trim()) return "";

  let text = raw;

  // 1. Remove UUID patterns and Unit Identifiers
  text = text
    .replace(/\*\*Unit Identifier:\*\*\s*`?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`?/gi, "")
    .replace(/Unit Identifier:\s*`?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`?/gi, "")
    .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, "");

  // 2. Remove Target Examination, Weightage banners, and University metadata
  text = text
    .replace(/\*\*Target Examination:\*\*[^\n]*/gi, "")
    .replace(/Target Examination:[^\n]*/gi, "")
    .replace(/\|\s*\*\*Weightage:\*\*[^\n]*/gi, "")
    .replace(/\*\*Weightage:\*\*[^\n]*/gi, "")
    .replace(/Weightage:[^\n]*/gi, "");

  // 3. Remove Report-style Header titles e.g. "## Unit 2 Master Exam Revision Notes: Title"
  // Transform into a clean primary title if not already present
  text = text.replace(
    /^##\s+Unit\s+\d+\s+Master\s+Exam\s+Revision\s+Notes:\s*(.*)$/gim,
    "# $1"
  );

  // If the document begins with "# CODE: Subject Title\n# Clean Title", drop the subject prefix header
  text = text.replace(/^#\s+[A-Z0-9-]{3,10}:\s*[^\n]+\n+(#\s+[^\n]+)/i, "$1");

  // 4. Remove official syllabus checklist block and [x] checkboxes
  // Matches "### 📋 Official MJPRU Syllabus Topic Checklist" up to the next horizontal rule or section
  text = text.replace(
    /###?\s*(?:📋\s*)?(?:Official\s+)?[A-Z\s]*Syllabus\s+(?:Topic\s+)?Checklist[\s\S]*?(?:---\n|##\s)/i,
    (match) => {
      // Keep the trailing "## " if matched
      return match.endsWith("## ") ? "## " : "";
    }
  );

  // Strip any leftover `- [x] **Topic**` or `- [ ] **Topic**` lines
  text = text.replace(/^\s*-\s*\[[ xX]\]\s*(?:\*\*)?(.*?)(?:\*\*)?\s*$/gm, "");

  // 5. Remove Administrative footers and verification stamps
  text = text
    .replace(/\*Verified against official.*?XRounder.*?\*/gi, "")
    .replace(/Verified against official[^\n]*/gi, "");

  // 6. Clean Exam Section Labels into Textbook Subheadings
  text = text
    .replace(/##\s*📌?\s*Section A:\s*High-Yield Very Short Answer Questions[^\n]*/gi, "## Core Definitions & Key Concepts")
    .replace(/##\s*📌?\s*Section B:\s*Conceptual Short Answer Questions[^\n]*/gi, "## Conceptual & Architectural Analysis")
    .replace(/##\s*📌?\s*Section C:\s*Comprehensive Long Answer Descriptive Questions[^\n]*/gi, "## In-Depth Analysis & Implementation")
    .replace(/##\s*💡?\s*Exam Hall Strategy & Examiner Insights[^\n]*/gi, "## Important Exam Points & Quick Revision");

  // Remove targets under section headers e.g. "*Target: Write precise...*"
  text = text.replace(/^\*Target:\s*[^\n]*\*\s*$/gm, "");

  // 7. Transform Question Headings into Textbook Topic Headings
  // e.g. "### Q1. [2 Marks] Define an Operating System and its primary purpose."
  //   -> "### Operating System Overview & Definition"
  text = text.replace(
    /^###\s*Q\d+\.\s*(?:\[\d+(?:\/\d+)?\s*Marks\])?\s*(?:Explain|Describe|Define|Distinguish between|Differentiate between|Provide an exhaustive analysis of|Elaborate on)?\s*(.*?)(?:[:?.-])?\s*$/gim,
    (m, title) => {
      const cleanTitle = title.trim();
      if (!cleanTitle) return m;
      // Capitalize first letter
      return `### ${cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1)}`;
    }
  );

  // Strip "**Model Answer:**" and "**Comprehensive University Solution:**"
  text = text
    .replace(/\*\*Model Answer:\*\*\s*/gi, "")
    .replace(/\*\*Comprehensive University Solution:\*\*\s*/gi, "")
    .replace(/Model Answer:\s*/gi, "");

  // 8. Clean up formatting artifacts: redundant horizontal rules, excessive newlines
  text = text
    .replace(/---\s*\n\s*---/g, "---")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return text;
}

/**
 * Extracts syllabus topic headings from a unit markdown or syllabus checklist.
 */
export function extractTopicsFromMarkdown(raw: string): string[] {
  const topics: string[] = [];

  // Check if there was a checklist of topics in the raw source
  const checklistRegex = /-\s*\[[ xX]\]\s*\*\*(.*?)\*\*/g;
  let match: RegExpExecArray | null;
  while ((match = checklistRegex.exec(raw)) !== null) {
    const t = match[1].trim().replace(/^Topic \d+[:\s-]*/i, "");
    if (t && !topics.includes(t)) {
      topics.push(t);
    }
  }

  // If no checklist, extract H2 and major H3 headings
  if (topics.length === 0) {
    const headingRegex = /^##\s+([^#\n]+)/gm;
    while ((match = headingRegex.exec(raw)) !== null) {
      const heading = match[1].trim().replace(/^📌\s*/, "").replace(/^Section [A-C]:\s*/, "");
      if (
        heading &&
        !heading.toLowerCase().includes("checklist") &&
        !heading.toLowerCase().includes("exam revision notes") &&
        !topics.includes(heading)
      ) {
        topics.push(heading);
      }
    }
  }

  return topics;
}

/**
 * Intelligently splits a monolithic unit document into clean, textbook-style topic chapters.
 * If the document is already a single focused topic, returns it as a single item.
 */
export function splitUnitContentIntoTopics(
  unitNumber: number,
  unitTitle: string,
  rawContent: string,
  syllabusTopics?: Array<{ id: string; title: string }>
): SplitTopicItem[] {
  const cleaned = sanitizeEducationalMarkdown(rawContent);

  // If syllabus topics are provided and match the content, split by topics
  if (syllabusTopics && syllabusTopics.length > 1) {
    // Attempt to split content by syllabus topics
    const results: SplitTopicItem[] = [];

    // Check if sections in cleaned text match topics
    const sections = cleaned.split(/(?=^###?\s+)/m);
    if (sections.length > 1) {
      // Map sections to nearest topic
      syllabusTopics.forEach((st, idx) => {
        const topicNorm = st.title.toLowerCase().replace(/[^a-z0-9]/g, "");
        const matchedSection = sections.find((s) => {
          const firstLine = s.split("\n")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
          return firstLine.includes(topicNorm) || topicNorm.includes(firstLine);
        });

        if (matchedSection) {
          results.push({
            id: `u${unitNumber}-topic-${idx + 1}`,
            topicTitle: st.title,
            title: st.title,
            body: matchedSection.trim(),
            sortOrder: idx + 1,
          });
        }
      });

      if (results.length >= 2) {
        return results;
      }
    }
  }

  // Check if content has natural H2 or H3 subdivisions
  const h2Parts = cleaned.split(/(?=^##\s+)/m);
  if (h2Parts.length > 2) {
    const items: SplitTopicItem[] = [];
    let order = 1;

    for (const part of h2Parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;

      const firstLine = trimmed.split("\n")[0].replace(/^##\s+/, "").trim();
      // Skip title block if it's just the document header
      if (trimmed.startsWith("# ") && !trimmed.startsWith("## ")) {
        continue;
      }

      items.push({
        id: `u${unitNumber}-sec-${order}`,
        topicTitle: firstLine,
        title: firstLine,
        body: trimmed,
        sortOrder: order++,
      });
    }

    if (items.length >= 2) {
      return items;
    }
  }

  // Fallback: Return single cleaned document
  return [
    {
      id: `u${unitNumber}-full`,
      topicTitle: unitTitle,
      title: unitTitle,
      body: cleaned,
      sortOrder: 1,
    },
  ];
}
