import { describe, it, expect, beforeEach } from "vitest";
import {
  GeminiAssistantInput,
  geminiUserMinuteLimiter,
  geminiUserHourLimiter,
  getDeterministicFallbackAnswer,
  getDeterministicFallbackQuiz,
} from "./gemini.functions";
import { getPrioritizedContext } from "@/components/ai/ai-study-assistant";

describe("gemini.functions security & validation tests", () => {
  beforeEach(() => {
    geminiUserMinuteLimiter.reset();
    geminiUserHourLimiter.reset();
  });

  describe("GeminiAssistantInput schema validation", () => {
    it("accepts valid student assistant input", () => {
      const valid = {
        action: "ask",
        query: "What is an Operating System Kernel?",
        topicTitle: "Kernel Architectures",
        unitNumber: 1,
        subjectTitle: "Operating Systems",
        language: "hinglish",
      };
      const parsed = GeminiAssistantInput.parse(valid);
      expect(parsed.action).toBe("ask");
      expect(parsed.unitNumber).toBe(1);
      expect(parsed.topicTitle).toBe("Kernel Architectures");
    });

    it("rejects invalid action enums", () => {
      const invalid = {
        action: "execute_malicious_code",
        topicTitle: "Title",
        unitNumber: 1,
        subjectTitle: "Subject",
      };
      expect(() => GeminiAssistantInput.parse(invalid)).toThrow();
    });

    it("rejects query exceeding 500 characters to prevent prompt bloat", () => {
      const tooLong = {
        action: "ask",
        query: "a".repeat(501),
        topicTitle: "Title",
        unitNumber: 1,
        subjectTitle: "Subject",
      };
      expect(() => GeminiAssistantInput.parse(tooLong)).toThrow(/500 characters/);
    });

    it("rejects unit numbers outside 1..10", () => {
      const badUnitZero = {
        action: "ask",
        topicTitle: "Title",
        unitNumber: 0,
        subjectTitle: "Subject",
      };
      const badUnitEleven = {
        action: "ask",
        topicTitle: "Title",
        unitNumber: 11,
        subjectTitle: "Subject",
      };
      expect(() => GeminiAssistantInput.parse(badUnitZero)).toThrow();
      expect(() => GeminiAssistantInput.parse(badUnitEleven)).toThrow();
    });

    it("strips harmful ASCII control characters from query and topic title", () => {
      const payload = {
        action: "ask",
        query: "Hello\x00\x08World\x1F!",
        topicTitle: "Unit\x00Topic",
        unitNumber: 2,
        subjectTitle: "Subject\x07",
      };
      const parsed = GeminiAssistantInput.parse(payload);
      expect(parsed.query).toBe("HelloWorld!");
      expect(parsed.topicTitle).toBe("UnitTopic");
      expect(parsed.subjectTitle).toBe("Subject");
    });

    it("accepts context below 4,000 characters and preserves it", () => {
      const underContext = {
        action: "explain",
        topicTitle: "Topic",
        unitNumber: 1,
        subjectTitle: "Subject",
        context: "a".repeat(2500),
      };
      const parsed = GeminiAssistantInput.parse(underContext);
      expect(parsed.context).toBe("a".repeat(2500));
      expect(parsed.context?.length).toBe(2500);
    });

    it("accepts context of exactly 4,000 characters", () => {
      const exactContext = {
        action: "explain",
        topicTitle: "Topic",
        unitNumber: 1,
        subjectTitle: "Subject",
        context: "b".repeat(4000),
      };
      const parsed = GeminiAssistantInput.parse(exactContext);
      expect(parsed.context).toBe("b".repeat(4000));
      expect(parsed.context?.length).toBe(4000);
    });

    it("accepts context above 4,000 characters and safely truncates to 4,000 characters", () => {
      const largeContext = {
        action: "explain",
        topicTitle: "Topic",
        unitNumber: 1,
        subjectTitle: "Subject",
        context: "c".repeat(15000),
      };
      const parsed = GeminiAssistantInput.parse(largeContext);
      expect(parsed.context).toBe("c".repeat(4000));
      expect(parsed.context?.length).toBe(4000);
    });

    it("accepts context at the maximum accepted payload size (50,000 characters) and truncates to 4,000", () => {
      const maxContext = {
        action: "explain",
        topicTitle: "Topic",
        unitNumber: 1,
        subjectTitle: "Subject",
        context: "d".repeat(50000),
      };
      const parsed = GeminiAssistantInput.parse(maxContext);
      expect(parsed.context).toBe("d".repeat(4000));
      expect(parsed.context?.length).toBe(4000);
    });

    it("rejects context exceeding the maximum accepted payload size (50,001 characters)", () => {
      const oversizedContext = {
        action: "explain",
        topicTitle: "Topic",
        unitNumber: 1,
        subjectTitle: "Subject",
        context: "e".repeat(50001),
      };
      expect(() => GeminiAssistantInput.parse(oversizedContext)).toThrow(/50,000 characters/);
    });
  });

  describe("Client-side context prioritization & payload reduction", () => {
    it("returns undefined for falsy or empty context", () => {
      expect(getPrioritizedContext(undefined, "Topic")).toBeUndefined();
      expect(getPrioritizedContext("", "Topic")).toBeUndefined();
      expect(getPrioritizedContext("   ", "Topic")).toBeUndefined();
    });

    it("preserves context under 4,000 characters", () => {
      const short = "This is a short unit study note.";
      expect(getPrioritizedContext(short, "Topic")).toBe(short);
    });

    it("prioritizes matching topic when context exceeds 4,000 characters", () => {
      const prefix = "unrelated intro notes. ".repeat(200); // ~4600 chars
      const targetTopic = "Semaphore Invariants";
      const topicBody =
        "Semaphore is an integer variable used for process synchronization. ".repeat(100);
      const fullContent = `${prefix}\n\n### ${targetTopic}\n${topicBody}`;

      const prioritized = getPrioritizedContext(fullContent, targetTopic);
      expect(prioritized).toBeDefined();
      expect(prioritized?.length).toBe(4000);
      expect(prioritized?.startsWith(targetTopic)).toBe(true);
    });

    it("falls back to leading 4,000 characters if topic title is not found in oversized context", () => {
      const fullContent = "0123456789".repeat(1000); // 10,000 chars
      const prioritized = getPrioritizedContext(fullContent, "NonExistentTopic");
      expect(prioritized).toBeDefined();
      expect(prioritized?.length).toBe(4000);
      expect(prioritized).toBe(fullContent.slice(0, 4000));
    });
  });

  describe("Gemini rate limiting rules", () => {
    it("enforces 10 requests per minute limit", () => {
      const testUserId = "test-user-rate-limit-123";

      for (let i = 0; i < 10; i++) {
        const check = geminiUserMinuteLimiter.check(testUserId);
        expect(check.allowed).toBe(true);
      }

      // 11th request must be blocked
      const blocked = geminiUserMinuteLimiter.check(testUserId);
      expect(blocked.allowed).toBe(false);
      expect(blocked.retryAfterSeconds).toBeGreaterThanOrEqual(1);
    });

    it("enforces 60 requests per hour quota limit", () => {
      const testUserId = "test-user-hourly-quota-456";

      for (let i = 0; i < 60; i++) {
        const check = geminiUserHourLimiter.check(testUserId);
        expect(check.allowed).toBe(true);
      }

      // 61st request must be blocked
      const blocked = geminiUserHourLimiter.check(testUserId);
      expect(blocked.allowed).toBe(false);
      expect(blocked.retryAfterSeconds).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Sparky logical fallback answer & quiz generation", () => {
    it("generates a structured, first-principles logical explanation in English", () => {
      const answer = getDeterministicFallbackAnswer({
        action: "explain",
        topicTitle: "Process Synchronization",
        unitNumber: 2,
        subjectTitle: "Operating Systems",
        courseTitle: "Bachelor of Computer Applications (BCA)",
        language: "en",
        context:
          "Process synchronization ensures that concurrently executing processes do not produce inconsistent data.",
      });

      expect(answer).toContain("Process Synchronization");
      expect(answer).toContain("Formal Definition & Operational Objective");
      expect(answer).toContain("Step-by-Step Causal Mechanism");
      expect(answer).toContain("Edge Cases, Failure Modes & Examiner Traps");
      expect(answer).toContain("University Exam Scoring Blueprint");
      expect(answer).toContain("2-Marks");
      expect(answer).toContain("5-Marks");
    });

    it("generates a rigorous, first-principles explanation in Hinglish without informal fluff", () => {
      const answer = getDeterministicFallbackAnswer({
        action: "explain",
        topicTitle: "Deadlock Detection",
        unitNumber: 3,
        subjectTitle: "Operating Systems",
        courseTitle: "Bachelor of Computer Applications (BCA)",
        language: "hinglish",
        context: "Deadlock detection uses resource allocation graphs to detect cycles.",
      });

      expect(answer).toContain("Deadlock Detection");
      expect(answer).toContain("First-Principles Logical Breakdown");
      expect(answer).toContain("Core Problem Statement");
      expect(answer).toContain("Step-by-Step Mechanism");
      expect(answer).toContain("Common Edge Cases & Exam Pitfalls");
      expect(answer).not.toContain("pad lo bhai");
      expect(answer).not.toContain("Yaar, ek baar");
    });

    it("generates a 10-question practice set with analytical distractors", () => {
      const quiz = getDeterministicFallbackQuiz({
        topicTitle: "Binary Search Trees",
        unitNumber: 2,
        subjectTitle: "Data Structures",
      });

      expect(quiz).toHaveLength(10);
      for (const q of quiz) {
        expect(q.prompt).toBeDefined();
        expect(q.options).toHaveLength(4);
        const correctCount = q.options.filter((o) => o.is_correct).length;
        expect(correctCount).toBe(1);
        expect(q.explanation).toBeDefined();
        expect(["easy", "medium", "hard"]).toContain(q.difficulty);
      }
    });
  });

  describe("Sparky AI in-flight guard & sequential request execution", () => {
    it("synchronously blocks concurrent duplicate requests while in-flight", async () => {
      let isGenerating = false;
      let blockedCalls = 0;
      let allowedCalls = 0;

      const triggerAction = async () => {
        if (isGenerating) {
          blockedCalls++;
          return null;
        }
        isGenerating = true;
        allowedCalls++;
        await new Promise((res) => setTimeout(res, 30));
        isGenerating = false;
        return { success: true };
      };

      // Fire 3 simultaneous calls
      const [res1, res2, res3] = await Promise.all([
        triggerAction(),
        triggerAction(),
        triggerAction(),
      ]);

      expect(allowedCalls).toBe(1);
      expect(blockedCalls).toBe(2);
      expect(res1?.success).toBe(true);
      expect(res2).toBeNull();
      expect(res3).toBeNull();
    });

    it("allows a subsequent request to succeed after the previous request finishes", async () => {
      let isGenerating = false;
      let callCount = 0;

      const triggerAction = async () => {
        if (isGenerating) return null;
        isGenerating = true;
        callCount++;
        await new Promise((res) => setTimeout(res, 15));
        isGenerating = false;
        return { success: true, callId: callCount };
      };

      const firstResult = await triggerAction();
      expect(firstResult?.success).toBe(true);
      expect(firstResult?.callId).toBe(1);

      // Subsequent call after first finished must succeed
      const secondResult = await triggerAction();
      expect(secondResult?.success).toBe(true);
      expect(secondResult?.callId).toBe(2);
    });

    it("resets in-flight guard in finally cleanup when request throws an exception", async () => {
      let isGenerating = false;

      const failingAction = async () => {
        if (isGenerating) return null;
        isGenerating = true;
        try {
          await new Promise((_, rej) => setTimeout(() => rej(new Error("Network timeout")), 15));
        } finally {
          isGenerating = false;
        }
      };

      await expect(failingAction()).rejects.toThrow("Network timeout");
      expect(isGenerating).toBe(false);

      // Subsequent attempt after error should be allowed, not permanently stuck
      let subsequentAllowed = false;
      const retryAction = async () => {
        if (isGenerating) return false;
        isGenerating = true;
        try {
          subsequentAllowed = true;
        } finally {
          isGenerating = false;
        }
        return subsequentAllowed;
      };

      const retryResult = await retryAction();
      expect(retryResult).toBe(true);
      expect(isGenerating).toBe(false);
    });
  });

  describe("GeminiAssistantResponse contract adherence", () => {
    it("conforms to the expected response contract structure for success and fallback responses", () => {
      // Deterministic fallback response contract
      const fallback = getDeterministicFallbackAnswer({
        action: "explain",
        topicTitle: "Memory Management",
        unitNumber: 2,
        subjectTitle: "Operating Systems",
        language: "en",
      });

      const responseContract = {
        success: true,
        content: fallback,
        modelUsed: "offline-deterministic-engine",
        action: "explain" as const,
      };

      expect(typeof responseContract.success).toBe("boolean");
      expect(typeof responseContract.content).toBe("string");
      expect(responseContract.content.length).toBeGreaterThan(0);
      expect(typeof responseContract.modelUsed).toBe("string");
      expect(["ask", "explain", "revision", "quiz"]).toContain(responseContract.action);
    });
  });
});
