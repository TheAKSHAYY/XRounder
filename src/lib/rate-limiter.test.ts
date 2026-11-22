import { describe, it, expect } from "vitest";
import { SlidingWindowRateLimiter } from "./rate-limiter";

describe("SlidingWindowRateLimiter tests", () => {
  it("allows requests up to the max limit within the window", () => {
    const limiter = new SlidingWindowRateLimiter({
      windowMs: 60_000,
      maxRequests: 3,
    });

    const res1 = limiter.check("user-1");
    expect(res1.allowed).toBe(true);
    expect(res1.remaining).toBe(2);

    const res2 = limiter.check("user-1");
    expect(res2.allowed).toBe(true);
    expect(res2.remaining).toBe(1);

    const res3 = limiter.check("user-1");
    expect(res3.allowed).toBe(true);
    expect(res3.remaining).toBe(0);

    // 4th request exceeds limit
    const res4 = limiter.check("user-1");
    expect(res4.allowed).toBe(false);
    expect(res4.remaining).toBe(0);
    expect(res4.retryAfterSeconds).toBeGreaterThanOrEqual(1);
  });

  it("isolates rate limits between different users", () => {
    const limiter = new SlidingWindowRateLimiter({
      windowMs: 60_000,
      maxRequests: 2,
    });

    limiter.check("user-a");
    limiter.check("user-a");
    expect(limiter.check("user-a").allowed).toBe(false);

    // user-b has their own quota
    expect(limiter.check("user-b").allowed).toBe(true);
    expect(limiter.check("user-b").allowed).toBe(true);
    expect(limiter.check("user-b").allowed).toBe(false);
  });

  it("resets correctly when requested", () => {
    const limiter = new SlidingWindowRateLimiter({
      windowMs: 60_000,
      maxRequests: 1,
    });

    limiter.check("user-test");
    expect(limiter.check("user-test").allowed).toBe(false);

    limiter.reset("user-test");
    expect(limiter.check("user-test").allowed).toBe(true);
  });
});
