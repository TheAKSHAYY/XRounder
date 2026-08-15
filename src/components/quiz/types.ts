export type Option = { id: string; question_id: string; text: string; order_index: number };
export type Question = {
  id: string;
  quiz_id: string;
  type: "single" | "multiple" | "true_false";
  prompt: string;
  explanation: string | null;
  points: number;
  order_index: number;
};
export type Attempt = {
  id: string;
  submitted_at: string | null;
  score: number | null;
  max_score: number | null;
  pct: number | null;
  passed: boolean | null;
  time_spent_seconds?: number | null;
};
export type Feedback = {
  is_correct: boolean;
  correct_option_ids: string[];
  explanation: string | null;
};
export type AnswerState = {
  selected: string[];
  status: "correct" | "wrong" | "skipped";
  correct_option_ids: string[];
  explanation: string | null;
};

export function fmtDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}
