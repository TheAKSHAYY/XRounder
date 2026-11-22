import { describe, it, expect, beforeEach } from "vitest";
import { taskRouter, validateMermaidDiagram, sanitizeErrorMessage } from "./router";
import { modelRegistry } from "./model-registry";
import { freeLLMAdapter } from "./adapters/freellm.adapter";

describe("Phase 3 Intelligent AI Task Router", () => {
  beforeEach(() => {
    modelRegistry.reset();
  });

  describe("Routing Policies Configuration", () => {
    const taskList = [
      "fast_tutor",
      "general_explanation",
      "complex_reasoning",
      "notes_generation",
      "mcq_generation",
      "study_plan",
      "diagram_mermaid",
    ] as const;

    it.each(taskList)("defines a valid routing policy for task '%s'", (task) => {
      const policy = taskRouter.getPolicy(task);
      expect(policy).toBeDefined();
      expect(policy.task).toBe(task);
      expect(policy.primaryModelId).toBeTruthy();
      expect(policy.requiredCapabilities.length).toBeGreaterThan(0);
      expect(policy.defaultTimeoutMs).toBeGreaterThan(0);
      expect(policy.maxOutputTokens).toBeGreaterThan(0);
      expect(policy.maxRetries).toBeGreaterThanOrEqual(1);
      expect(policy.allowedProviders.length).toBeGreaterThan(0);
    });

    it("enforces structured_json capability on mcq_generation and study_plan", () => {
      const mcqPolicy = taskRouter.getPolicy("mcq_generation");
      expect(mcqPolicy.requiredCapabilities).toContain("structured_json");

      const studyPlanPolicy = taskRouter.getPolicy("study_plan");
      expect(studyPlanPolicy.requiredCapabilities).toContain("structured_json");
    });

    it("enforces reasoning capability on complex_reasoning", () => {
      const reasoningPolicy = taskRouter.getPolicy("complex_reasoning");
      expect(reasoningPolicy.requiredCapabilities).toContain("reasoning");
    });
  });

  describe("Route Resolution & Capability Enforcement", () => {
    it("routes fast_tutor with primary model candidate first", () => {
      // Register mock Mercury 3
      modelRegistry.registerModel({
        id: "mercury-3",
        providerId: "mercury",
        displayName: "Mercury 3",
        capabilities: ["text", "structured_json", "reasoning"],
        contextWindow: 1_000_000,
        maxOutputTokens: 4096,
        isAvailable: true,
        isFallbackEligible: true,
        priorityRank: 1,
      });

      const route = taskRouter.resolveRoute({
        task: "fast_tutor",
        prompt: "Explain binary search",
      });

      expect(route.candidates.length).toBeGreaterThan(0);
      expect(route.candidates[0].id).toBe("mercury-3");
      expect(route.timeoutMs).toBe(8000);
      expect(route.maxTokens).toBe(1024);
    });

    it("filters out text-only models when resolving mcq_generation route", () => {
      // Register text-only model
      modelRegistry.registerModel({
        id: "mock-fast-text",
        providerId: "gemini",
        displayName: "Mock Fast Text",
        capabilities: ["text"], // Missing structured_json
        contextWindow: 4096,
        maxOutputTokens: 2048,
        isAvailable: true,
        isFallbackEligible: true,
        priorityRank: 0,
      });

      const route = taskRouter.resolveRoute({
        task: "mcq_generation",
        prompt: "Generate 5 MCQs",
        responseFormat: "json",
      });

      const candidateIds = route.candidates.map((c) => c.id);
      expect(candidateIds).not.toContain("mock-fast-text");

      // Verify all resolved candidates possess structured_json
      for (const candidate of route.candidates) {
        expect(candidate.capabilities).toContain("structured_json");
      }
    });

    it("prioritizes preferredModelId if it satisfies required capabilities", () => {
      const route = taskRouter.resolveRoute({
        task: "general_explanation",
        prompt: "Explain Deadlocks",
        preferredModelId: "gemini-3.5-flash-lite",
      });

      expect(route.candidates[0].id).toBe("gemini-3.5-flash-lite");
    });

    it("ignores preferredModelId if it lacks required task capabilities", () => {
      modelRegistry.registerModel({
        id: "text-only-preferred",
        providerId: "gemini",
        displayName: "Text Only",
        capabilities: ["text"],
        contextWindow: 4096,
        maxOutputTokens: 2048,
        isAvailable: true,
        isFallbackEligible: true,
        priorityRank: 0,
      });

      const route = taskRouter.resolveRoute({
        task: "mcq_generation",
        prompt: "Generate MCQs",
        responseFormat: "json",
        preferredModelId: "text-only-preferred",
      });

      // Must not place incompatible model as candidate 1
      expect(route.candidates[0].id).not.toBe("text-only-preferred");
    });

    it("throws descriptive error when no available models satisfy capabilities", () => {
      // Reset models to text-only
      modelRegistry.reset();
      const all = modelRegistry.getAllModels();
      for (const m of all) {
        m.isAvailable = false;
        modelRegistry.registerModel(m);
      }

      expect(() =>
        taskRouter.resolveRoute({
          task: "complex_reasoning",
          prompt: "Prove P != NP",
        }),
      ).toThrow(/No eligible AI models found/);
    });
  });

  describe("Error Classification Engine", () => {
    it("correctly identifies timeout errors", () => {
      expect(taskRouter.classifyError(new Error("Gemini request timed out after 8000ms"))).toBe(
        "timeout",
      );
      expect(
        taskRouter.classifyError(new Error("ConnectTimeoutError: UND_ERR_CONNECT_TIMEOUT")),
      ).toBe("timeout");
      expect(
        taskRouter.classifyError({ name: "AbortError", message: "The operation was aborted" }),
      ).toBe("timeout");
    });

    it("correctly identifies rate limit errors", () => {
      expect(taskRouter.classifyError(new Error("HTTP 429 Too Many Requests"))).toBe("rate_limit");
      expect(taskRouter.classifyError(new Error("RESOURCE_EXHAUSTED: quota exceeded"))).toBe(
        "rate_limit",
      );
    });

    it("correctly identifies authentication errors", () => {
      expect(taskRouter.classifyError(new Error("HTTP 401 Unauthorized API key"))).toBe(
        "auth_error",
      );
      expect(
        taskRouter.classifyError(new Error("MERCURY_API_KEY is not configured on the server")),
      ).toBe("auth_error");
    });

    it("correctly identifies invalid json errors", () => {
      expect(
        taskRouter.classifyError(
          new Error("Failed to parse structured JSON from Mercury response"),
        ),
      ).toBe("invalid_json");
      expect(taskRouter.classifyError(new SyntaxError("Unexpected token in JSON"))).toBe(
        "invalid_json",
      );
    });

    it("correctly identifies provider unavailable errors", () => {
      expect(taskRouter.classifyError(new Error("Gemini API error (503): High demand"))).toBe(
        "provider_unavailable",
      );
      expect(taskRouter.classifyError(new Error("TypeError: fetch failed"))).toBe(
        "provider_unavailable",
      );
    });
  });

  describe("Production Environment Safety (FreeLLM Loopback Guard)", () => {
    it("deactivates localhost loopback endpoint when running in production mode", () => {
      const origNodeEnv = process.env.NODE_ENV;
      const origBaseUrl = process.env.FREELLM_BASE_URL;
      const origApiKey = process.env.FREELLM_API_KEY;

      process.env.NODE_ENV = "production";
      process.env.FREELLM_BASE_URL = "http://127.0.0.1:31415/v1";
      process.env.FREELLM_API_KEY = "freellm-test-key";
      delete process.env.FREELLM_ALLOW_LOCALHOST;

      // In production, local loopback 127.0.0.1 should not be considered configured
      expect(freeLLMAdapter.isConfigured()).toBe(false);

      // Unless explicitly allowed by flag
      process.env.FREELLM_ALLOW_LOCALHOST = "true";
      expect(freeLLMAdapter.isConfigured()).toBe(true);

      // Or when using a production remote URL
      delete process.env.FREELLM_ALLOW_LOCALHOST;
      process.env.FREELLM_BASE_URL = "https://api.freellm.net/v1";
      expect(freeLLMAdapter.isConfigured()).toBe(true);

      // Restore env
      process.env.NODE_ENV = origNodeEnv;
      process.env.FREELLM_BASE_URL = origBaseUrl;
      process.env.FREELLM_API_KEY = origApiKey;
    });
  });

  describe("Mermaid Diagram Output Validation", () => {
    it("accepts valid flowchart syntax with code fences", () => {
      const input = "```mermaid\nflowchart TD\n  A[Start] --> B[Process]\n  B --> C[End]\n```";
      const result = validateMermaidDiagram(input);
      expect(result.valid).toBe(true);
      expect(result.cleaned).toContain("flowchart TD");
      expect(result.cleaned).not.toContain("```");
    });

    it("accepts valid sequenceDiagram syntax", () => {
      const input = "sequenceDiagram\n  Alice->>Bob: Hello Bob\n  Bob-->>Alice: Hi Alice";
      const result = validateMermaidDiagram(input);
      expect(result.valid).toBe(true);
      expect(result.cleaned).toContain("Alice->>Bob");
    });

    it("rejects empty or whitespace-only diagrams", () => {
      expect(validateMermaidDiagram("").valid).toBe(false);
      expect(validateMermaidDiagram("   \n\n  ").valid).toBe(false);
    });

    it("rejects conversational prose lacking Mermaid header declaration", () => {
      const prose = "Here is the flowchart showing how binary search works:\nA goes to B then C";
      const result = validateMermaidDiagram(prose);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("missing a valid diagram declaration header");
    });

    it("rejects single-line incomplete diagrams", () => {
      const single = "flowchart TD";
      const result = validateMermaidDiagram(single);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("fewer than 2 statements");
    });
  });

  describe("Client Response Credential Sanitization", () => {
    it("redacts API keys and query tokens", () => {
      const raw =
        "Request failed on https://api.google.com/v1beta?key=TEST_MOCK_GEMINI_API_KEY_123456789 with status 403";
      const sanitized = sanitizeErrorMessage(raw);
      expect(sanitized).not.toContain("TEST_MOCK_GEMINI_API_KEY");
      expect(sanitized).toContain("key=[REDACTED]");
    });

    it("redacts Bearer tokens and Inception / FreeLLM secret prefixes", () => {
      const raw =
        "Authorization failed for Bearer my_token, secret sk_mock_test_secret_key_12345 and freellmapi-mock_test_secret_67890";
      const sanitized = sanitizeErrorMessage(raw);
      expect(sanitized).not.toContain("my_token");
      expect(sanitized).not.toContain("sk_mock_test_secret");
      expect(sanitized).not.toContain("freellmapi-mock_test");
      expect(sanitized).toContain("Bearer [REDACTED]");
      expect(sanitized).toContain("sk_[REDACTED]");
      expect(sanitized).toContain("freellmapi-[REDACTED]");
    });

    it("redacts local file paths in stack traces", () => {
      const raw =
        "Error at C:\\Users\\Pc\\OneDrive\\Desktop\\Xrounder\\src\\lib\\ai\\gateway.server.ts:140:15";
      const sanitized = sanitizeErrorMessage(raw);
      expect(sanitized).not.toContain("C:\\Users\\Pc");
      expect(sanitized).toContain("[LOCAL_PATH]");
    });
  });

  describe("Phase 3.1 Routing Regression & Model Safety Suite", () => {
    it("routes complex_reasoning to verified primary gemini-flash-latest and fallback gemini-3-flash-preview", () => {
      const route = taskRouter.resolveRoute({
        task: "complex_reasoning",
        prompt: "Trace the execution of QuickSelect algorithm",
      });

      expect(route.policy.primaryModelId).toBe("gemini-flash-latest");
      expect(route.policy.fallbackCandidateIds).toContain("gemini-3-flash-preview");
      expect(route.policy.fallbackCandidateIds).not.toContain("gemini-3.8-flash");

      const candidateIds = route.candidates.map((c) => c.id);
      expect(candidateIds).toContain("gemini-flash-latest");
      expect(candidateIds).toContain("gemini-3-flash-preview");
      // Must not contain speculative or unverified models
      expect(candidateIds).not.toContain("gemini-3.8-flash");
      expect(candidateIds).not.toContain("dots3-note-preview");
    });

    it("enforces provider match and rejects candidates from disallowed providers", () => {
      // Register a model that has reasoning capability but belongs to a disallowed provider (e.g. freellm)
      modelRegistry.registerModel({
        id: "unauthorized-reasoner",
        providerId: "freellm",
        displayName: "Unauthorized Reasoner",
        capabilities: ["text", "reasoning"],
        contextWindow: 4096,
        maxOutputTokens: 2048,
        isAvailable: true,
        isFallbackEligible: true,
        priorityRank: 0,
      });

      const route = taskRouter.resolveRoute({
        task: "complex_reasoning",
        prompt: "Deduce formal theorem proof",
      });

      // Allowed providers for complex_reasoning is strictly ["gemini"]
      expect(route.policy.allowedProviders).toEqual(["gemini"]);
      const providers = route.candidates.map((c) => c.providerId);
      expect(providers.every((p) => p === "gemini")).toBe(true);
      expect(route.candidates.map((c) => c.id)).not.toContain("unauthorized-reasoner");
    });

    it("rejects invalid or non-existent preferredModelId and safely falls back to policy primary", () => {
      const route = taskRouter.resolveRoute({
        task: "complex_reasoning",
        prompt: "Solve algorithmic recurrence",
        preferredModelId: "completely-fake-hallucinated-model",
      });

      // Candidate 0 must remain the policy verified primary
      expect(route.candidates[0].id).toBe("gemini-flash-latest");
    });

    it("strictly prevents models missing required reasoning capability from entering complex_reasoning candidates", () => {
      // Register high-priority text-only model
      modelRegistry.registerModel({
        id: "fast-text-super-model",
        providerId: "gemini",
        displayName: "Super Fast Text Only",
        capabilities: ["text", "structured_json"], // Missing 'reasoning'
        contextWindow: 1_000_000,
        maxOutputTokens: 8192,
        isAvailable: true,
        isFallbackEligible: true,
        priorityRank: 0,
      });

      const route = taskRouter.resolveRoute({
        task: "complex_reasoning",
        prompt: "Prove NP-completeness",
      });

      const candidateIds = route.candidates.map((c) => c.id);
      expect(candidateIds).not.toContain("fast-text-super-model");
      // All candidates must possess reasoning capability
      for (const candidate of route.candidates) {
        expect(candidate.capabilities).toContain("reasoning");
      }
    });

    it("verifies mcq_generation fallback chain contains verified gemini-3-flash-preview instead of gemini-3.8-flash", () => {
      const policy = taskRouter.getPolicy("mcq_generation");
      expect(policy.fallbackCandidateIds).toContain("gemini-3-flash-preview");
      expect(policy.fallbackCandidateIds).not.toContain("gemini-3.8-flash");
    });
  });
});
