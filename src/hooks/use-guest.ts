import { useCallback, useEffect, useSyncExternalStore } from "react";

import { useAuth } from "@/hooks/use-auth";
import {
  clearGuestState,
  getGuestState,
  startGuestMode,
  subscribeGuest,
  type GuestState,
} from "@/lib/guest";

const SERVER_SNAPSHOT: GuestState = {
  active: false,
  startedAt: null,
  mcqSeen: {},
  bookmarks: [],
  views: 0,
  lastPromptAt: null,
};

/**
 * Reactive guest state. `isGuest` is true only when guest mode is on AND
 * there is no Supabase session — a real session always wins, and signing in
 * wipes the temporary guest state.
 */
export function useGuest() {
  const { user, loading } = useAuth();
  const state = useSyncExternalStore(
    subscribeGuest,
    getGuestState,
    () => SERVER_SNAPSHOT,
  );

  useEffect(() => {
    if (user && state.active) clearGuestState();
  }, [user, state.active]);

  const start = useCallback(() => startGuestMode(), []);

  return {
    ...state,
    isGuest: !loading && !user && state.active,
    isAuthenticated: !!user,
    loading,
    startGuestMode: start,
    clearGuestState,
  };
}
