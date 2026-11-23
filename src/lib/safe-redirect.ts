/**
 * Shared Safe Internal Redirect & URL Validator
 *
 * Protects against CWE-601: Open Redirect Vulnerabilities across auth flows,
 * login pages, OAuth callback handlers, and route guards.
 */

const ALLOWED_HOSTS = new Set(["www.xrounder.in", "xrounder.in", "localhost", "127.0.0.1"]);

/**
 * Checks whether a given string is a safe, internal relative path or same-origin URL.
 */
export function isSafeInternalPath(target: unknown): target is string {
  if (typeof target !== "string") return false;
  const trimmed = target.trim();
  if (!trimmed) return false;

  // Reject ASCII control characters (CR, LF, TAB, null-byte, etc.)
  // eslint-disable-next-line no-control-regex
  if (/[\x00-\x1F\x7F]/.test(trimmed)) return false;

  // Reject protocol-relative or Windows-path trickery (//, /\, \\, \)
  if (
    trimmed.startsWith("//") ||
    trimmed.startsWith("/\\") ||
    trimmed.startsWith("\\\\") ||
    trimmed.startsWith("\\")
  ) {
    return false;
  }

  // Reject executable or dangerous schemes
  if (/^(?:javascript|data|vbscript|file):/i.test(trimmed)) {
    return false;
  }

  // Handle absolute HTTP(S) URLs
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      if (typeof window !== "undefined" && window.location?.origin) {
        if (url.origin === window.location.origin) {
          return true;
        }
      } else {
        if (ALLOWED_HOSTS.has(url.hostname)) {
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  // Must begin with a single "/"
  if (!trimmed.startsWith("/")) {
    return false;
  }

  // Verify that URL parsing relative to localhost doesn't escape origin
  try {
    const dummyBase = "http://localhost";
    const parsed = new URL(trimmed, dummyBase);
    if (parsed.origin !== dummyBase || !parsed.pathname.startsWith("/")) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitizes an untrusted redirect parameter.
 * Returns a guaranteed safe internal relative path (e.g. "/dashboard").
 */
export function sanitizeRedirectUrl(target: unknown, fallback: string = "/dashboard"): string {
  const safeFallback =
    typeof fallback === "string" && isSafeInternalPath(fallback) ? fallback : "/dashboard";

  if (typeof target !== "string") {
    return safeFallback;
  }

  const trimmed = target.trim();
  if (!trimmed) {
    return safeFallback;
  }

  // If an absolute URL from same origin is provided, extract its relative portion
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      const isSameOrigin =
        typeof window !== "undefined" && window.location?.origin
          ? url.origin === window.location.origin
          : ALLOWED_HOSTS.has(url.hostname);

      if (isSameOrigin) {
        const relativePath = `${url.pathname}${url.search}${url.hash}`;
        if (isSafeInternalPath(relativePath)) {
          return relativePath;
        }
      }
    } catch {
      // Ignore URL parse error and fall back
    }
    return safeFallback;
  }

  if (isSafeInternalPath(trimmed)) {
    return trimmed;
  }

  return safeFallback;
}
