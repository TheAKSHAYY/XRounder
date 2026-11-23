import { describe, it, expect } from "vitest";
import {
  StudyPlanInput,
  StudyPlanSchema,
  getDeterministicFallbackStudyPlan,
} from "./study-plan.functions";

describe("study-plan schema & fallback generator tests", () => {
  it("validates valid input schema", () => {
    const valid = {
      goal: "I keep getting subnetting questions wrong",
      level: "beginner" as const,
      minutesPerDay: 45,
    };
    const parsed = StudyPlanInput.parse(valid);
    expect(parsed.goal).toBe("I keep getting subnetting questions wrong");
    expect(parsed.level).toBe("beginner");
    expect(parsed.minutesPerDay).toBe(45);
  });

  it("rejects goals shorter than 6 characters", () => {
    const tooShort = {
      goal: "Math",
      level: "beginner" as const,
      minutesPerDay: 45,
    };
    expect(() => StudyPlanInput.parse(tooShort)).toThrow();
  });

  it("rejects minutes outside valid range [10..240]", () => {
    const tooFew = {
      goal: "Operating Systems Revision",
      level: "beginner" as const,
      minutesPerDay: 5,
    };
    const tooMany = {
      goal: "Operating Systems Revision",
      level: "beginner" as const,
      minutesPerDay: 300,
    };
    expect(() => StudyPlanInput.parse(tooFew)).toThrow();
    expect(() => StudyPlanInput.parse(tooMany)).toThrow();
  });

  it("generates a structured, valid deterministic study plan matching schema", () => {
    const plan = getDeterministicFallbackStudyPlan(
      "I keep getting subnetting questions wrong",
      "beginner",
      45,
    );

    // Validate that the returned plan satisfies StudyPlanSchema
    const validated = StudyPlanSchema.parse(plan);
    expect(validated.title).toContain("subnetting");
    expect(validated.focusAreas.length).toBe(4);
    expect(validated.steps.length).toBe(4);

    const totalMinutes = validated.steps.reduce((acc, s) => acc + s.minutes, 0);
    expect(totalMinutes).toBe(45);

    expect(validated.checkYourself.length).toBe(3);
    expect(validated.practiceIdea.length).toBeGreaterThan(10);
  });

  it("handles advanced level with longer study duration", () => {
    const plan = getDeterministicFallbackStudyPlan(
      "Revise B-Trees and AVL Trees for finals",
      "advanced",
      90,
    );

    const validated = StudyPlanSchema.parse(plan);
    expect(validated.title).toContain("B-Trees");
    expect(validated.summary).toContain("advanced");

    const totalMinutes = validated.steps.reduce((acc, s) => acc + s.minutes, 0);
    expect(totalMinutes).toBe(90);
  });
});
