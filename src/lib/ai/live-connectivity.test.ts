import { describe, it, expect } from "vitest";
import { aiGateway } from "./gateway.server";

describe("Live AI Gateway End-to-End Connectivity", () => {
  it("reports healthy status for all configured providers", async () => {
    const health = await aiGateway.checkAllProvidersHealth();
    console.log("Live Providers Health Check:", JSON.stringify(health, null, 2));

    expect(health.mercury).toBeDefined();
    expect(health.mercury.ok).toBe(true);

    expect(health.freellm).toBeDefined();
    expect(health.freellm.ok).toBe(true);
  }, 20000);

  it("generates structured output with Mercury 3 diffusion LLM", async () => {
    const result = await aiGateway.generate({
      task: "fast_tutor",
      prompt: 'Return a JSON object: {"greeting": "Hello from Mercury 3", "speed": "diffusion"}',
      responseFormat: "json",
      preferredProviderId: "mercury",
      preferredModelId: "mercury-3",
      maxTokens: 100,
      timeoutMs: 15000,
      retries: 0,
    });

    console.log("Mercury 3 Generation Result:", {
      modelId: result.modelId,
      providerId: result.providerId,
      latencyMs: result.latencyMs,
      jsonData: result.jsonData,
      usage: result.usage,
    });

    expect(["mercury", "gemini"]).toContain(result.providerId);
    expect(result.jsonData).toBeDefined();
    expect((result.jsonData as { greeting?: string })?.greeting).toBeDefined();
  }, 45000);

  it("generates text via FreeLLM proxy", async () => {
    const result = await aiGateway.generate({
      task: "general_explanation",
      prompt: "Reply with exactly: FREELLM_ONLINE",
      preferredProviderId: "freellm",
      preferredModelId: "auto",
      maxTokens: 50,
      timeoutMs: 25000,
      retries: 0,
    });

    console.log("FreeLLM Generation Result:", {
      modelId: result.modelId,
      providerId: result.providerId,
      latencyMs: result.latencyMs,
      text: result.text.slice(0, 100),
      usage: result.usage,
    });

    expect(["freellm", "mercury", "gemini"]).toContain(result.providerId);
    expect(result.text).toBeDefined();
    if (result.providerId !== "freellm") {
      expect(result.fallbackHistory?.length).toBeGreaterThan(0);
    }
  }, 45000);
});
