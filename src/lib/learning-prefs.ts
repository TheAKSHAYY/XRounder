import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const GUEST_PREFS_KEY = "xr.learning_prefs";

export type LearningPrefs = {
  courseId: string;
  year: number;
  semesterId: string;
  courseTitle?: string;
  courseCode?: string;
  semesterNumber?: number;
  semesterTitle?: string;
  updatedAt?: number;
};

const listeners = new Set<() => void>();

export function getGuestLearningPrefs(): LearningPrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(GUEST_PREFS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LearningPrefs>;
    if (!parsed.courseId || !parsed.semesterId) return null;
    return {
      courseId: parsed.courseId,
      year: Number(parsed.year) || 1,
      semesterId: parsed.semesterId,
      courseTitle: parsed.courseTitle,
      courseCode: parsed.courseCode,
      semesterNumber: parsed.semesterNumber,
      semesterTitle: parsed.semesterTitle,
      updatedAt: parsed.updatedAt || Date.now(),
    };
  } catch {
    return null;
  }
}

export function setGuestLearningPrefs(prefs: LearningPrefs) {
  if (typeof window === "undefined") return;
  try {
    const payload = {
      ...prefs,
      updatedAt: Date.now(),
    };
    window.localStorage.setItem(GUEST_PREFS_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota or private mode errors */
  }
  listeners.forEach((fn) => fn());
}

export function clearGuestLearningPrefs() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(GUEST_PREFS_KEY);
  } catch {
    /* ignore */
  }
  listeners.forEach((fn) => fn());
}

export function subscribeLearningPrefs(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/**
 * Safely syncs guest localStorage preferences to an authenticated user's profile.
 * Precedence Rule:
 * Authenticated Profile Preferences > Guest LocalStorage Preferences > Default.
 * If the user's profile already has a course & semester configured, keep the profile values.
 * Otherwise, migrate the guest selections to the profile.
 */
export async function syncGuestPrefsToProfile(userId: string): Promise<boolean> {
  if (!userId) return false;
  const guestPrefs = getGuestLearningPrefs();
  if (!guestPrefs) return false;

  try {
    const { data: profile, error: fetchErr } = await supabase
      .from("profiles")
      .select("current_course_id, current_semester_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchErr) return false;

    // If profile is already customized, don't overwrite with guest prefs
    if (profile?.current_course_id && profile?.current_semester_id) {
      clearGuestLearningPrefs();
      return false;
    }

    // Save guest prefs to profile
    const { error: updateErr } = await supabase
      .from("profiles")
      .update({
        current_course_id: guestPrefs.courseId,
        current_semester_id: guestPrefs.semesterId,
        current_year: guestPrefs.year,
        onboarded_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (!updateErr) {
      clearGuestLearningPrefs();
      return true;
    }
  } catch {
    /* ignore sync errors */
  }
  return false;
}

/**
 * Hook to reactively consume guest learning preferences in components.
 */
export function useGuestLearningPrefs() {
  const [prefs, setPrefs] = useState<LearningPrefs | null>(() => getGuestLearningPrefs());

  useEffect(() => {
    const unsub = subscribeLearningPrefs(() => {
      setPrefs(getGuestLearningPrefs());
    });
    return () => {
      unsub();
    };
  }, []);

  return {
    prefs,
    setPrefs: setGuestLearningPrefs,
    clearPrefs: clearGuestLearningPrefs,
  };
}
