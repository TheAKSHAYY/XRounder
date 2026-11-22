/**
 * In-Memory Sliding-Window Rate Limiter
 *
 * Lightweight, zero-dependency per-user and per-IP abuse prevention
 * designed for edge, serverless, and Node.js environments.
 */

export interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
  retryAfterSeconds: number;
}

export class SlidingWindowRateLimiter {
  private records = new Map<string, number[]>();
  private windowMs: number;
  private maxRequests: number;
  private lastCleanup = Date.now();

  constructor(options: RateLimitOptions) {
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
  }

  public check(key: string): RateLimitResult {
    const now = Date.now();
    this.cleanupIfNeeded(now);

    const timestamps = this.records.get(key) || [];
    const windowStart = now - this.windowMs;
    const validTimestamps = timestamps.filter((t) => t > windowStart);

    if (validTimestamps.length >= this.maxRequests) {
      const oldestInWindow = validTimestamps[0];
      const resetMs = Math.max(0, oldestInWindow + this.windowMs - now);
      const retryAfterSeconds = Math.max(1, Math.ceil(resetMs / 1000));
      return {
        allowed: false,
        remaining: 0,
        resetMs,
        retryAfterSeconds,
      };
    }

    validTimestamps.push(now);
    this.records.set(key, validTimestamps);

    return {
      allowed: true,
      remaining: Math.max(0, this.maxRequests - validTimestamps.length),
      resetMs: this.windowMs,
      retryAfterSeconds: 0,
    };
  }

  private cleanupIfNeeded(now: number) {
    // Run cleanup once every 60 seconds or if map exceeds 5000 items
    if (now - this.lastCleanup > 60_000 || this.records.size > 5000) {
      const cutoff = now - this.windowMs;
      for (const [key, times] of this.records.entries()) {
        const filtered = times.filter((t) => t > cutoff);
        if (filtered.length === 0) {
          this.records.delete(key);
        } else {
          this.records.set(key, filtered);
        }
      }
      this.lastCleanup = now;
    }
  }

  public reset(key?: string) {
    if (key) {
      this.records.delete(key);
    } else {
      this.records.clear();
    }
  }

  public getRecordCount(): number {
    return this.records.size;
  }
}
