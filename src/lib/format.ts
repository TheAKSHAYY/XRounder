/**
 * Shared date/number formatting helpers.
 *
 * These were previously duplicated inline across student and admin screens.
 * Behaviour is intentionally identical to the original implementations.
 */

const DAY_MS = 86_400_000;

/** "Today" / "Yesterday" / "3d ago" / "2w ago" / "12 Aug" */
export function formatRelativeDay(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < DAY_MS) return "Today";
  if (diff < 2 * DAY_MS) return "Yesterday";
  const days = Math.floor(diff / DAY_MS);
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

/** "12 Aug" */
export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

/** "12 Aug 2026, 10:15 AM" — falls back to "Unknown" for missing values. */
export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "Unknown";
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

const KNOWN_ACRONYMS = new Set([
  "BCA",
  "MCA",
  "BTECH",
  "MTECH",
  "OS",
  "COA",
  "ISB",
  "NAST",
  "IT",
  "AI",
  "SQL",
  "PHP",
  "HTML",
  "CSS",
  "CPU",
  "RAM",
  "ROM",
  "LAN",
  "WAN",
  "TCP",
  "IP",
  "UDP",
  "DNS",
  "HTTP",
  "HTTPS",
  "API",
  "UI",
  "UX",
  "MCQ",
  "MCQS",
  "PDF",
  "PDFS",
  "DBMS",
  "RDBMS",
  "OOP",
  "OOPS",
  "OOB",
  "DSA",
  "CN",
  "SE",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
]);

const MINOR_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "but",
  "or",
  "for",
  "nor",
  "on",
  "at",
  "to",
  "by",
  "with",
  "in",
  "of",
  "using",
  "via",
]);

/**
 * Formats all-caps or messy database titles into clean, readable Title Case.
 * Preserves standard technical acronyms (BCA, OS, COA, TCP, IP, etc.).
 */
export function formatTitleCase(str: string | null | undefined): string {
  if (!str) return "";
  const trimmed = str.trim();
  if (!trimmed) return "";

  // If already mixed case, return as-is
  const isAllCaps = trimmed === trimmed.toUpperCase() && trimmed !== trimmed.toLowerCase();
  if (!isAllCaps) return trimmed;

  return trimmed
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      // Strip punctuation for acronym check
      const clean = word.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
      if (KNOWN_ACRONYMS.has(clean)) {
        return word.replace(new RegExp(clean, "i"), clean);
      }
      if (index > 0 && MINOR_WORDS.has(word.toLowerCase())) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
