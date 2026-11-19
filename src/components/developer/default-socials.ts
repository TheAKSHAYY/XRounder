import type { Social } from "./portfolio.types";

/**
 * Social links that are not (yet) stored in the CMS database.
 *
 * The admin CMS (`developer_social_links`) stays the source of truth: a row
 * added there for the same platform wins and this entry is ignored. These
 * exist only so a link is never missing from the page while it waits to be
 * entered in the admin panel.
 */
export const FALLBACK_SOCIALS: Social[] = [
  {
    id: "fallback-snapchat",
    platform: "snapchat",
    url: "https://www.snapchat.com/add/sly.akshay",
    label: "Snapchat",
  },
];

/**
 * Append fallback socials whose platform is not already present in the
 * database rows. Matching is case-insensitive on the platform name, so
 * "Snapchat", "snapchat" and "Snap Chat" all count as taken.
 */
export function mergeSocials(rows: Social[], fallbacks: Social[] = FALLBACK_SOCIALS): Social[] {
  const seen = new Set(
    rows.map((s) =>
      s.platform
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ""),
    ),
  );
  const extra = fallbacks.filter(
    (s) => !seen.has(s.platform.toLowerCase().replace(/[^a-z0-9]/g, "")),
  );
  return extra.length ? [...rows, ...extra] : rows;
}
