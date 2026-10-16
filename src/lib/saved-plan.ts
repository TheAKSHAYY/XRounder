import { useSyncExternalStore } from "react";
import type { StudyPlan } from "@/lib/study-plan.functions";
import { recordGuestStudyAction } from "@/lib/guest";

const KEY = "xr.plan.v1";

export type SavedPlan = {
  id: string;
  goal: string;
  createdAt: number;
  plan: StudyPlan;
  done: boolean[];
};

let cache: SavedPlan | null | undefined;
const listeners = new Set<() => void>();

function read(): SavedPlan | null {
  if (cache !== undefined) return cache;
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as SavedPlan) : null;
  } catch {
    cache = null;
  }
  return cache;
}

function write(next: SavedPlan | null) {
  cache = next;
  try {
    if (next) window.localStorage.setItem(KEY, JSON.stringify(next));
    else window.localStorage.removeItem(KEY);
  } catch {
    /* ignore quota */
  }
  listeners.forEach((l) => l());
}

export function savePlan(goal: string, plan: StudyPlan) {
  write({
    id: `${Date.now()}`,
    goal,
    createdAt: Date.now(),
    plan,
    done: plan.steps.map(() => false),
  });
}

export function toggleStep(i: number) {
  const cur = read();
  if (!cur) return;
  const done = [...cur.done];
  done[i] = !done[i];
  if (done[i]) recordGuestStudyAction();
  write({ ...cur, done });
}

export function clearPlan() {
  write(null);
}

export function useSavedPlan(): SavedPlan | null {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => null,
  );
}
