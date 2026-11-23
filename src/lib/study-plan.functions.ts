/**
 * Personalised study plan generation.
 *
 * A student types a topic, question or goal; the model returns an ordered
 * next-step plan. Runs entirely server-side so the AI key never reaches the
 * browser. Nothing is stored — the plan is returned to the caller only.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const StudyPlanInput = z.object({
  goal: z.string().trim().min(6).max(600),
  level: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
  minutesPerDay: z.number().int().min(10).max(240).default(45),
});

export const StudyPlanSchema = z.object({
  title: z.string(),
  summary: z.string(),
  focusAreas: z.array(z.string()),
  steps: z.array(
    z.object({
      title: z.string(),
      action: z.string(),
      minutes: z.number(),
      why: z.string(),
    }),
  ),
  practiceIdea: z.string(),
  checkYourself: z.array(z.string()),
});

export type StudyPlan = z.infer<typeof StudyPlanSchema>;

export function getDeterministicFallbackStudyPlan(
  goal: string,
  level: string,
  minutesPerDay: number,
): StudyPlan {
  const stepCount = 4;
  const baseMinutes = Math.max(5, Math.floor(minutesPerDay / stepCount));
  const remaining = Math.max(5, minutesPerDay - baseMinutes * (stepCount - 1));

  return {
    title: `Targeted Study Plan: ${goal.slice(0, 45)}`,
    summary: `Structured ${level}-level plan designed to master "${goal}" step-by-step within your ${minutesPerDay}-minute daily study budget.`,
    focusAreas: [
      "Core Definitions & Foundations",
      "Step-by-Step Mechanisms",
      "High-Yield University Questions",
      "Self-Assessment & Quick Revision",
    ],
    steps: [
      {
        title: "Phase 1: Concept Grounding",
        action: `Review fundamental definitions, terms, and context for "${goal}" from your official syllabus notes.`,
        minutes: baseMinutes,
        why: "Builds a clear mental model before attempting complex problems.",
      },
      {
        title: "Phase 2: Working & Mechanisms",
        action: `Trace the core logic, architecture points, or code implementation for ${goal}.`,
        minutes: baseMinutes,
        why: "Deepens technical understanding and prevents memory confusion in exams.",
      },
      {
        title: "Phase 3: Active Question Practice",
        action: "Attempt 3-5 standard 2-mark and 5-mark university exam questions on this topic.",
        minutes: remaining,
        why: "Trains answer structuring and active recall under real exam conditions.",
      },
      {
        title: "Phase 4: Synthesis & Self-Check",
        action: "Summarize the 3 most critical rules or takeaways without referencing your notes.",
        minutes: baseMinutes,
        why: "Validates retention and highlights any remaining gaps to re-read.",
      },
    ],
    practiceIdea: `Write out a 1-page summary sheet for "${goal}" with key bullet points, 1 comparison table, and 3 model exam answers.`,
    checkYourself: [
      `Can you explain the primary purpose of "${goal}" in under 2 sentences?`,
      "Can you identify the 3 most frequent exam questions asked on this topic?",
      "Do you know the common mistakes examiners penalize in answers?",
    ],
  };
}

async function generateWithGemini(
  goal: string,
  level: string,
  minutesPerDay: number,
  apiKey: string,
): Promise<StudyPlan | null> {
  const configuredModel = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";
  const candidateModels = [
    configuredModel,
    "gemini-flash-lite-latest",
    "gemini-3.5-flash-lite",
    "gemini-flash-latest",
    "gemini-3.8-flash",
    "gemini-3.7-flash",
  ].filter((v, i, a) => Boolean(v) && a.indexOf(v) === i);

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are an academic study coach for university students on the XRounder platform.
XRounder's study loop: Learn notes -> Practice questions -> Detect weak topics -> Revise -> Retest.
Create a structured next-step study plan:
Student Goal/Topic: "${goal}"
Current Level: ${level}
Daily Study Time Available: ${minutesPerDay} minutes.

CRITICAL REQUIREMENTS:
- Use at most 5 steps.
- The step durations (in minutes) MUST sum up to roughly ${minutesPerDay} minutes.
- Return ONLY a JSON object conforming exactly to this structure:
{
  "title": string,
  "summary": string,
  "focusAreas": string[],
  "steps": [{ "title": string, "action": string, "minutes": number, "why": string }],
  "practiceIdea": string,
  "checkYourself": string[]
}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1500,
            responseMimeType: "application/json",
          },
        }),
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        continue;
      }

      const json = await res.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) continue;

      const cleaned = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
      const parsed = JSON.parse(cleaned);
      const validated = StudyPlanSchema.parse(parsed);
      return {
        ...validated,
        focusAreas: validated.focusAreas.slice(0, 4),
        steps: validated.steps.slice(0, 5),
        checkYourself: validated.checkYourself.slice(0, 3),
      };
    } catch (err) {
      console.warn(`Study plan generation failed with model ${model}:`, err);
      continue;
    }
  }
  return null;
}

export const generateStudyPlan = createServerFn({ method: "POST" })
  .validator((input: unknown) => StudyPlanInput.parse(input))
  .handler(async ({ data }): Promise<StudyPlan> => {
    const geminiKey = process.env.GEMINI_API_KEY;

    // 1. Try Gemini Live API if configured
    if (geminiKey) {
      const plan = await generateWithGemini(data.goal, data.level, data.minutesPerDay, geminiKey);
      if (plan) {
        return plan;
      }
    }

    // 2. Fallback to curriculum-calibrated deterministic study plan
    return getDeterministicFallbackStudyPlan(data.goal, data.level, data.minutesPerDay);
  });
