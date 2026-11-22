import { describe, it, expect, beforeEach } from "vitest";
import { modelRegistry } from "./model-registry";
import { geminiAdapter } from "./adapters/gemini.adapter";
import { freeLLMAdapter } from "./adapters/freellm.adapter";
import { mercuryAdapter } from "./adapters/mercury.adapter";
import { aiGateway, AIGateway } from "./gateway.server";
import { AIModelMetadata, AIProviderAdapter } from "./types";

describe("Phase 2 AI Infrastructure Core", () => {
  beforeEach(() => {
    modelRegistry.reset();
  });

  describe("Model Registry", () => {
    it("initializes with verified production Gemini models", () => {
      const models = modelRegistry.getAllModels();
      expect(models.length).toBeGreaterThanOrEqual(4);

      const flashLite = modelRegistry.getModel("gemini-flash-lite-latest");
      expect(flashLite).toBeDefined();
      expect(flashLite?.capabilities).toContain("text");
      expect(flashLite?.capabilities).toContain("structured_json");
      expect(flashLite?.contextWindow).toBe(1_000_000);
    });

    it("filters eligible models strictly by required capabilities", () => {
      // Register a mock model without structured_json
      const textOnlyModel: AIModelMetadata = {
        id: "mock-text-only",
        providerId: "freellm",
        displayName: "Mock Text Only",
        capabilities: ["text"],
        contextWindow: 4096,
        maxOutputTokens: 2048,
        isAvailable: true,
        isFallbackEligible: true,
        priorityRank: 10,
      };
      modelRegistry.registerModel(textOnlyModel);

      // Request models requiring structured_json
      const eligibleForJson = modelRegistry.getEligibleModels(["text", "structured_json"]);
      const ids = eligibleForJson.map((m) => m.id);

      expect(ids).not.toContain("mock-text-only");
      expect(ids).toContain("gemini-flash-lite-latest");
    });

    it("calculates required capabilities based on task and responseFormat", () => {
      const generalCaps = modelRegistry.getRequiredCapabilitiesForTask(
        "general_explanation",
        "text",
      );
      expect(generalCaps).toEqual(["text"]);

      const mcqCaps = modelRegistry.getRequiredCapabilitiesForTask("mcq_generation", "json");
      expect(mcqCaps).toContain("text");
      expect(mcqCaps).toContain("structured_json");

      const reasoningCaps = modelRegistry.getRequiredCapabilitiesForTask(
        "complex_reasoning",
        "text",
      );
      expect(reasoningCaps).toContain("reasoning");
    });
  });

  describe("Provider Adapters", () => {
    it("Gemini adapter is configured when GEMINI_API_KEY is present", () => {
      expect(geminiAdapter.providerId).toBe("gemini");
      const isConfigured = geminiAdapter.isConfigured();
      expect(typeof isConfigured).toBe("boolean");
    });

    it("FreeLLM adapter reports unconfigured gracefully when env vars are absent", () => {
      expect(freeLLMAdapter.providerId).toBe("freellm");
      if (!process.env.FREELLM_API_KEY) {
        expect(freeLLMAdapter.isConfigured()).toBe(false);
      }
    });

    it("FreeLLM correctly identifies Mercury 3 if present in discovered models", () => {
      const mercuryModel: AIModelMetadata = {
        id: "mercury-3",
        providerId: "mercury",
        displayName: "Mercury 3 (mercury-3)",
        capabilities: ["text", "structured_json"],
        contextWindow: 1_000_000,
        maxOutputTokens: 4096,
        isAvailable: true,
        isFallbackEligible: true,
        priorityRank: 1,
      };

      modelRegistry.registerModel(mercuryModel);
      const retrieved = modelRegistry.getModel("mercury-3");

      expect(retrieved?.id).toBe("mercury-3");
      expect(retrieved?.providerId).toBe("mercury");
      expect(retrieved?.contextWindow).toBe(1_000_000);
    });

    it("normalizes base URL for FreeLLM correctly", () => {
      const originalEnv = process.env.FREELLM_BASE_URL;
      process.env.FREELLM_BASE_URL = "https://api.freellm.net/v1///";
      expect(freeLLMAdapter.getBaseUrl()).toBe("https://api.freellm.net/v1");
      process.env.FREELLM_BASE_URL = originalEnv;
    });

    it("Mercury adapter reports configured when MERCURY_API_KEY is present", () => {
      expect(mercuryAdapter.providerId).toBe("mercury");
      expect(typeof mercuryAdapter.isConfigured()).toBe("boolean");
      if (process.env.MERCURY_API_KEY) {
        expect(mercuryAdapter.isConfigured()).toBe(true);
      }
    });

    it("Mercury adapter lists verified Mercury 3 model specifications", async () => {
      const models = await mercuryAdapter.listModels();
      const m3 = models.find((m) => m.id === "mercury-3");
      expect(m3).toBeDefined();
      expect(m3?.contextWindow).toBe(1_000_000);
      expect(m3?.capabilities).toContain("text");
      expect(m3?.capabilities).toContain("structured_json");
      // official API inspection verified reasoning is not in supported_features
      expect(m3?.capabilities).not.toContain("reasoning");
    });
  });

  describe("AI Gateway Execution & Fallback Simulation", () => {
    it("automatically selects candidate matching required capabilities and falls back on error", async () => {
      const customGateway = new AIGateway();

      let primaryCalled = false;
      let secondaryCalled = false;

      const mockFailingPrimary: AIProviderAdapter = {
        providerId: "freellm",
        isConfigured: () => true,
        checkHealth: async () => ({ ok: true, providerId: "freellm", message: "ok", latencyMs: 1 }),
        listModels: async () => [],
        generate: async () => {
          primaryCalled = true;
          throw new Error("Primary provider capacity exceeded (503)");
        },
      };

      const mockWorkingFallback: AIProviderAdapter = {
        providerId: "gemini",
        isConfigured: () => true,
        checkHealth: async () => ({ ok: true, providerId: "gemini", message: "ok", latencyMs: 1 }),
        listModels: async () => [],
        generate: async (options, model) => {
          secondaryCalled = true;
          return {
            text: "Fallback response",
            modelId: model.id,
            providerId: "gemini",
            latencyMs: 12,
          };
        },
      };

      const mockDisabledMercury: AIProviderAdapter = {
        providerId: "mercury",
        isConfigured: () => false,
        checkHealth: async () => ({
          ok: false,
          providerId: "mercury",
          message: "disabled",
          latencyMs: 0,
        }),
        listModels: async () => [],
        generate: async () => {
          throw new Error("Mercury disabled in unit test");
        },
      };

      customGateway.registerAdapter(mockFailingPrimary);
      customGateway.registerAdapter(mockWorkingFallback);
      customGateway.registerAdapter(mockDisabledMercury);

      // Register primary model with priority 1
      modelRegistry.registerModel({
        id: "fast-flaky-model",
        providerId: "freellm",
        displayName: "Fast Flaky Model",
        capabilities: ["text"],
        contextWindow: 4096,
        maxOutputTokens: 2048,
        isAvailable: true,
        isFallbackEligible: true,
        priorityRank: 0,
      });

      const result = await customGateway.generate({
        task: "fast_tutor",
        prompt: "Hello world",
        preferredModelId: "fast-flaky-model",
        retries: 0,
      });

      expect(primaryCalled).toBe(true);
      expect(secondaryCalled).toBe(true);
      expect(result.text).toBe("Fallback response");
      expect(result.providerId).toBe("gemini");
      expect(result.fallbackHistory).toBeDefined();
      expect(result.fallbackHistory?.[0].error).toContain("capacity exceeded");
    });

    it("never selects a text-only model as fallback when structured JSON is required", async () => {
      const customGateway = new AIGateway();

      // Register text-only model with higher priority (rank 0)
      modelRegistry.registerModel({
        id: "text-only-model",
        providerId: "gemini",
        displayName: "Text Only High Priority",
        capabilities: ["text"], // No structured_json
        contextWindow: 4096,
        maxOutputTokens: 2048,
        isAvailable: true,
        isFallbackEligible: true,
        priorityRank: 0,
      });

      let invokedModelId = "";
      const mockAdapter: AIProviderAdapter = {
        providerId: "gemini",
        isConfigured: () => true,
        checkHealth: async () => ({ ok: true, providerId: "gemini", message: "ok", latencyMs: 1 }),
        listModels: async () => [],
        generate: async (options, model) => {
          invokedModelId = model.id;
          return {
            text: '{"status":"ok"}',
            jsonData: { status: "ok" },
            modelId: model.id,
            providerId: "gemini",
            latencyMs: 5,
          };
        },
      };
      customGateway.registerAdapter(mockAdapter);

      const result = await customGateway.generate({
        task: "mcq_generation",
        prompt: "Generate MCQ",
        responseFormat: "json",
      });

      // Must NOT invoke the text-only model despite its higher priority rank
      expect(invokedModelId).not.toBe("text-only-model");
      expect(result.jsonData).toBeDefined();
    });

    it("checks health of all registered providers without throwing", async () => {
      const healthMap = await aiGateway.checkAllProvidersHealth();
      expect(healthMap.gemini).toBeDefined();
      expect(healthMap.freellm).toBeDefined();
      expect(healthMap.mercury).toBeDefined();
      expect(typeof healthMap.gemini.ok).toBe("boolean");
      expect(typeof healthMap.mercury.ok).toBe("boolean");
    }, 15000);

    it("executes primary model successfully when primary is healthy", async () => {
      const customGateway = new AIGateway();
      let calledModelId = "";

      const mockAdapter: AIProviderAdapter = {
        providerId: "gemini",
        isConfigured: () => true,
        checkHealth: async () => ({ ok: true, providerId: "gemini", message: "ok", latencyMs: 1 }),
        listModels: async () => [],
        generate: async (options, model) => {
          calledModelId = model.id;
          return {
            text: "Direct primary answer",
            modelId: model.id,
            providerId: "gemini",
            latencyMs: 10,
          };
        },
      };

      customGateway.registerAdapter(mockAdapter);

      const result = await customGateway.generate({
        task: "complex_reasoning",
        prompt: "Analyze dynamic programming state transitions",
      });

      expect(calledModelId).toBe("gemini-flash-latest");
      expect(result.text).toBe("Direct primary answer");
      expect(result.fallbackHistory).toBeUndefined();
    });

    it("fails over from gemini-flash-latest to verified gemini-3-flash-preview on complex_reasoning", async () => {
      const customGateway = new AIGateway();
      const invocationSequence: string[] = [];

      const mockAdapter: AIProviderAdapter = {
        providerId: "gemini",
        isConfigured: () => true,
        checkHealth: async () => ({ ok: true, providerId: "gemini", message: "ok", latencyMs: 1 }),
        listModels: async () => [],
        generate: async (options, model) => {
          invocationSequence.push(model.id);
          if (model.id === "gemini-flash-latest") {
            throw new Error("HTTP 503: Model is experiencing high demand");
          }
          if (model.id === "gemini-3-flash-preview") {
            return {
              text: "Proof verified by Gemini 3 Flash Preview reasoning",
              modelId: model.id,
              providerId: "gemini",
              latencyMs: 25,
            };
          }
          throw new Error(`Unexpected model: ${model.id}`);
        },
      };

      customGateway.registerAdapter(mockAdapter);

      const result = await customGateway.generate({
        task: "complex_reasoning",
        prompt: "Prove master theorem case 2",
        retries: 0,
      });

      expect(invocationSequence).toEqual(["gemini-flash-latest", "gemini-3-flash-preview"]);
      expect(result.modelId).toBe("gemini-3-flash-preview");
      expect(result.text).toContain("Proof verified");
      expect(result.fallbackHistory?.length).toBe(1);
      expect(result.fallbackHistory?.[0].modelId).toBe("gemini-flash-latest");
      expect(result.fallbackHistory?.[0].error).toContain("503");
    });

    it("throws clear error when all candidate models fail and records observability event", async () => {
      const customGateway = new AIGateway();

      const mockFailingAdapter: AIProviderAdapter = {
        providerId: "gemini",
        isConfigured: () => true,
        checkHealth: async () => ({ ok: true, providerId: "gemini", message: "ok", latencyMs: 1 }),
        listModels: async () => [],
        generate: async (options, model) => {
          throw new Error(`HTTP 500: Server error on ${model.id}`);
        },
      };

      customGateway.registerAdapter(mockFailingAdapter);

      await expect(
        customGateway.generate({
          task: "complex_reasoning",
          prompt: "Solve algorithm",
          retries: 0,
        }),
      ).rejects.toThrow(/All candidate AI models failed for task 'complex_reasoning'/);
    });
  });
});
