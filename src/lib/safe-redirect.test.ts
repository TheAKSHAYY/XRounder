import { describe, it, expect } from "vitest";
import { isSafeInternalPath, sanitizeRedirectUrl } from "./safe-redirect";

describe("safe-redirect security tests", () => {
  describe("isSafeInternalPath", () => {
    it("accepts valid internal paths", () => {
      expect(isSafeInternalPath("/")).toBe(true);
      expect(isSafeInternalPath("/dashboard")).toBe(true);
      expect(isSafeInternalPath("/courses/bca/1")).toBe(true);
      expect(isSafeInternalPath("/profile?tab=settings")).toBe(true);
      expect(isSafeInternalPath("/notes/123#heading-2")).toBe(true);
    });

    it("rejects non-string or empty inputs", () => {
      expect(isSafeInternalPath(null)).toBe(false);
      expect(isSafeInternalPath(undefined)).toBe(false);
      expect(isSafeInternalPath("")).toBe(false);
      expect(isSafeInternalPath("   ")).toBe(false);
      expect(isSafeInternalPath(123)).toBe(false);
    });

    it("rejects protocol-relative open redirect URLs", () => {
      expect(isSafeInternalPath("//evil.com")).toBe(false);
      expect(isSafeInternalPath("//attacker.org/path")).toBe(false);
      expect(isSafeInternalPath("///triple-slash.com")).toBe(false);
    });

    it("rejects backslash evasion attempts", () => {
      expect(isSafeInternalPath("/\\evil.com")).toBe(false);
      expect(isSafeInternalPath("\\evil.com")).toBe(false);
      expect(isSafeInternalPath("\\\\evil.com")).toBe(false);
    });

    it("rejects dangerous URI schemes (XSS / file access)", () => {
      expect(isSafeInternalPath("javascript:alert(1)")).toBe(false);
      expect(isSafeInternalPath("JAVASCRIPT:alert(document.cookie)")).toBe(false);
      expect(isSafeInternalPath("data:text/html,<script>alert(1)</script>")).toBe(false);
      expect(isSafeInternalPath("vbscript:MsgBox(1)")).toBe(false);
      expect(isSafeInternalPath("file:///etc/passwd")).toBe(false);
    });

    it("rejects ASCII control characters and newline injection", () => {
      expect(isSafeInternalPath("/dashboard\r\n//evil.com")).toBe(false);
      expect(isSafeInternalPath("/dashboard\nSet-Cookie:admin=1")).toBe(false);
      expect(isSafeInternalPath("/dashboard\0evil")).toBe(false);
    });

    it("rejects untrusted external domains", () => {
      expect(isSafeInternalPath("https://evil.com")).toBe(false);
      expect(isSafeInternalPath("http://evil-xrounder.in")).toBe(false);
      expect(isSafeInternalPath("https://xrounder.in.attacker.com")).toBe(false);
      expect(isSafeInternalPath("ftp://malicious.org")).toBe(false);
    });

    it("accepts same-origin canonical domains when absolute", () => {
      expect(isSafeInternalPath("https://www.xrounder.in/courses/bca")).toBe(true);
      expect(isSafeInternalPath("https://xrounder.in/dashboard")).toBe(true);
      expect(isSafeInternalPath("http://localhost:8080/onboarding")).toBe(true);
    });
  });

  describe("sanitizeRedirectUrl", () => {
    it("returns safe internal paths untouched", () => {
      expect(sanitizeRedirectUrl("/courses/bca/6")).toBe("/courses/bca/6");
      expect(sanitizeRedirectUrl("/profile?view=security")).toBe("/profile?view=security");
    });

    it("extracts relative path from same-origin absolute URLs", () => {
      expect(sanitizeRedirectUrl("https://www.xrounder.in/courses/bca/1")).toBe("/courses/bca/1");
      expect(sanitizeRedirectUrl("http://localhost:3000/dashboard?ref=login")).toBe(
        "/dashboard?ref=login",
      );
    });

    it("falls back to default /dashboard when given malicious open redirect", () => {
      expect(sanitizeRedirectUrl("//evil.com")).toBe("/dashboard");
      expect(sanitizeRedirectUrl("https://attacker.com")).toBe("/dashboard");
      expect(sanitizeRedirectUrl("javascript:stealData()")).toBe("/dashboard");
      expect(sanitizeRedirectUrl("/\\evil.com")).toBe("/dashboard");
      expect(sanitizeRedirectUrl("")).toBe("/dashboard");
      expect(sanitizeRedirectUrl(null)).toBe("/dashboard");
    });

    it("respects custom fallback when provided", () => {
      expect(sanitizeRedirectUrl("//evil.com", "/courses")).toBe("/courses");
      expect(sanitizeRedirectUrl("https://phishing.site", "/explore")).toBe("/explore");
    });

    it("guards custom fallback against unsafe strings", () => {
      expect(sanitizeRedirectUrl("//evil.com", "//bad-fallback.com")).toBe("/dashboard");
    });
  });
});
