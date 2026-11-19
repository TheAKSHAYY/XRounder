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
 * Corrected links that must win over stale database rows. The CMS cannot be
 * written from here, so until the row is fixed in the admin panel these
 * override the stored URL for the same platform.
 */
export const SOCIAL_OVERRIDES: Social[] = [
  {
    id: "override-instagram",
    platform: "instagram",
    url: "https://www.instagram.com/aree.akshay",
    label: "Instagram",
  },
  {
    id: "override-linkedin",
    platform: "linkedin",
    url: "https://www.linkedin.com/in/akkshay-sharma/",
    label: "LinkedIn",
  },
];

const norm = (platform: string) => platform.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Append fallback socials whose platform is not already present in the
 * database rows. Matching is case-insensitive on the platform name, so
 * "Snapchat", "snapchat" and "Snap Chat" all count as taken.
 */
export function mergeSocials(rows: Social[], fallbacks: Social[] = FALLBACK_SOCIALS): Social[] {
  const overrideMap = new Map(SOCIAL_OVERRIDES.map((s) => [norm(s.platform), s]));
  const corrected = rows.map((s) => overrideMap.get(norm(s.platform)) ?? s);
  const seen = new Set(corrected.map((s) => norm(s.platform)));
  const extra = fallbacks.filter((s) => !seen.has(norm(s.platform)));
  return extra.length ? [...corrected, ...extra] : corrected;
}
