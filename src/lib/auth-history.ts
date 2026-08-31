import { supabase } from "@/integrations/supabase/client";

const ACTIVE_LOGIN_KEY = "xr_active_login_history_id";
const DEDUPE_WINDOW_MS = 10_000; // 10-second idempotency window to prevent duplicate records for a single login

let inFlightPromise: Promise<string | null> | null = null;
let lastRecordedUserId: string | null = null;
let lastRecordedTimestamp = 0;
let lastRecordedHistoryId: string | null = null;

/**
 * Persistently records a single login event for the given user.
 * Includes concurrency locking and deduplication so multiple callers
 * (e.g. form handler + SIGNED_IN listener + OAuth callback) never create duplicate rows.
 * Does NOT store passwords, tokens, or sensitive credentials.
 */
export async function recordLoginHistory(userId: string): Promise<string | null> {
  if (!userId) return null;

  const now = Date.now();

  // Deduplication: If already recorded recently for the same user, return existing record ID
  if (
    lastRecordedUserId === userId &&
    now - lastRecordedTimestamp < DEDUPE_WINDOW_MS &&
    lastRecordedHistoryId
  ) {
    return lastRecordedHistoryId;
  }

  // Concurrency lock: If a record operation is currently in flight for this user, wait on it
  if (inFlightPromise && lastRecordedUserId === userId) {
    return await inFlightPromise;
  }

  lastRecordedUserId = userId;
  lastRecordedTimestamp = now;

  inFlightPromise = (async () => {
    try {
      const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : null;
      const { data, error } = await supabase
        .from("login_history")
        .insert({
          user_id: userId,
          login_at: new Date().toISOString(),
          user_agent: userAgent,
        })
        .select("id")
        .maybeSingle();

      if (error) {
        if (import.meta.env.DEV) {
          console.warn("[auth-history] Could not record login history:", error.message);
        }
        return null;
      }

      const historyId = data?.id ?? null;
      lastRecordedHistoryId = historyId;

      if (historyId && typeof window !== "undefined") {
        try {
          window.sessionStorage.setItem(ACTIVE_LOGIN_KEY, historyId);
        } catch {
          // Ignore storage exceptions
        }
      }
      return historyId;
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn("[auth-history] Exception recording login history:", err);
      }
      return null;
    } finally {
      inFlightPromise = null;
    }
  })();

  return await inFlightPromise;
}

/**
 * Updates the existing login record with a logout timestamp upon user sign-out.
 */
export async function recordLogoutHistory(historyId?: string | null): Promise<void> {
  let targetId = historyId;

  if (!targetId && typeof window !== "undefined") {
    try {
      targetId = window.sessionStorage.getItem(ACTIVE_LOGIN_KEY);
    } catch {
      targetId = null;
    }
  }

  // Fallback to in-memory record ID if not in sessionStorage
  if (!targetId) {
    targetId = lastRecordedHistoryId;
  }

  if (targetId) {
    try {
      await supabase
        .from("login_history")
        .update({ logout_at: new Date().toISOString() })
        .eq("id", targetId);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn("[auth-history] Exception recording logout history:", err);
      }
    }
  }

  // Reset tracking state on logout
  lastRecordedUserId = null;
  lastRecordedHistoryId = null;
  lastRecordedTimestamp = 0;

  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.removeItem(ACTIVE_LOGIN_KEY);
    } catch {
      // Ignore storage exceptions
    }
  }
}

/**
 * Returns the currently tracked login history record ID, if any.
 */
export function getActiveLoginHistoryId(): string | null {
  if (typeof window === "undefined") return lastRecordedHistoryId;
  try {
    return window.sessionStorage.getItem(ACTIVE_LOGIN_KEY) || lastRecordedHistoryId;
  } catch {
    return lastRecordedHistoryId;
  }
}
