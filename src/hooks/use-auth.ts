import { useSyncExternalStore } from "react";
import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import { recordLoginHistory } from "@/lib/auth-history";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthState {
  session: Session | null;
  user: User | null;
  status: AuthStatus;
  loading: boolean;
  isAuthenticated: boolean;
}

const SERVER_AUTH_STATE: AuthState = {
  session: null,
  user: null,
  status: "loading",
  loading: true,
  isAuthenticated: false,
};

let currentAuthState: AuthState = {
  session: null,
  user: null,
  status: "loading",
  loading: true,
  isAuthenticated: false,
};

const listeners = new Set<() => void>();
let initialized = false;
let initPromise: Promise<AuthState> | null = null;

function emitChange() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error("[useAuth] Listener error:", e);
    }
  });
}

function updateAuthState(session: Session | null, explicitStatus?: AuthStatus) {
  const finalStatus: AuthStatus =
    explicitStatus ?? (session?.user ? "authenticated" : "unauthenticated");

  currentAuthState = {
    session,
    user: session?.user ?? null,
    status: finalStatus,
    loading: finalStatus === "loading",
    isAuthenticated: finalStatus === "authenticated",
  };

  emitChange();
}

function setupAuthListener() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  // 1. Subscribe to auth state changes from Supabase
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      updateAuthState(null, "unauthenticated");
    } else if (session) {
      updateAuthState(session, "authenticated");
      // Record login history only on actual SIGNED_IN event (deduped automatically)
      if (event === "SIGNED_IN" && session.user?.id) {
        recordLoginHistory(session.user.id);
      }
    } else {
      updateAuthState(null, "unauthenticated");
    }
  });

  // 2. Fetch and restore existing session from storage
  initPromise = supabase.auth
    .getSession()
    .then(({ data, error }) => {
      if (error) {
        if (import.meta.env.DEV) {
          console.warn("[useAuth] getSession error:", error.message);
        }
        updateAuthState(null, "unauthenticated");
      } else {
        updateAuthState(data.session);
      }
      return currentAuthState;
    })
    .catch((err) => {
      if (import.meta.env.DEV) {
        console.warn("[useAuth] getSession exception:", err);
      }
      updateAuthState(null, "unauthenticated");
      return currentAuthState;
    });
}

// Immediately initialize listener in browser environment
if (typeof window !== "undefined") {
  setupAuthListener();
}

/**
 * Returns a promise that resolves when the initial auth state has settled.
 * Useful in TanStack Router route beforeLoad hooks.
 */
export async function waitForAuth(): Promise<AuthState> {
  if (typeof window === "undefined") {
    return SERVER_AUTH_STATE;
  }
  if (!initialized) {
    setupAuthListener();
  }
  if (currentAuthState.status !== "loading") {
    return currentAuthState;
  }
  if (initPromise) {
    return await initPromise;
  }
  const { data } = await supabase.auth.getSession();
  updateAuthState(data.session);
  return currentAuthState;
}

export function subscribeAuth(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getAuthState(): AuthState {
  return currentAuthState;
}

/**
 * Clears the in-memory auth state immediately on sign out.
 */
export function clearAuthStore() {
  updateAuthState(null, "unauthenticated");
}

/**
 * Singleton reactive auth hook. Subscribes to the centralized Supabase auth store.
 * Synchronously provides accurate auth state without isolated component lag or flicker.
 */
export function useAuth(): AuthState {
  if (typeof window !== "undefined" && !initialized) {
    setupAuthListener();
  }

  return useSyncExternalStore(subscribeAuth, getAuthState, () => SERVER_AUTH_STATE);
}
