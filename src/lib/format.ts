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
