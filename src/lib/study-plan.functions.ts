/**
 * Personalised study plan generation.
 *
 * A student types a topic, question or goal; the model returns an ordered
 * next-step plan. Runs entirely server-side so the AI key never reaches the
 * browser. Nothing is stored — the plan is returned to the caller only.
 */

import { createOpenAI } from "@ai-sdk/openai";
import { createServerFn } from "@tanstack/react-start";
import { Output, streamText, NoObjectGeneratedError } from "ai";
import { z } from "zod";

import { createLovableAiGatewayRunIdFetch } from "@/lib/ai-gateway.server";

const StudyPlanInput = z.object({
  goal: z.string().trim().min(6).max(600),
  level: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
  minutesPerDay: z.number().int().min(10).max(240).default(45),
});

const StudyPlanSchema = z.object({
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

export const generateStudyPlan = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => StudyPlanInput.parse(input))
  .handler(async ({ data }): Promise<StudyPlan> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured for this app yet.");

    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });

    const result = streamText({
      model: lovable.responses("openai/gpt-6-astra"),
      output: Output.object({ schema: StudyPlanSchema }),
      system: [
        "You are a study coach for university students on the XRounder learning platform.",
        "XRounder's loop is: Learn the notes, Practice questions, Detect weak topics, Revise, Retest.",
        "Return a concrete next-step plan the student can start today.",
        "Use at most 5 steps, at most 4 focus areas and at most 3 self-check questions.",
        "Keep every field short, plain and specific. Never invent XRounder page links or statistics.",
      ].join(" "),
      prompt: [
        `Student goal, topic or question: ${data.goal}`,
        `Current level: ${data.level}`,
        `Study time available per day: about ${data.minutesPerDay} minutes.`,
        "Make the step durations add up to roughly that daily budget.",
      ].join("\n"),
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          store: false,
        },
      },
    });

    try {
      const plan = await result.output;
      return {
        ...plan,
        focusAreas: plan.focusAreas.slice(0, 4),
        steps: plan.steps.slice(0, 5),
        checkYourself: plan.checkYourself.slice(0, 3),
      };
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        throw new Error("The plan could not be generated. Please rephrase your goal and try again.");
      }
      throw error;
    }
  });
