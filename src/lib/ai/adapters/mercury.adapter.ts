import {
  AIGenerationOptions,
  AIGenerationResult,
  AIModelMetadata,
  AIProviderAdapter,
  AIProviderHealth,
  AIProviderId,
} from "../types";

export class MercuryAdapter implements AIProviderAdapter {
  public readonly providerId: AIProviderId = "mercury";

  public getBaseUrl(): string {
    const raw =
      process.env.MERCURY_BASE_URL ||
      (typeof process !== "undefined" ? process.env?.MERCURY_BASE_URL : undefined) ||
      "https://api.inceptionlabs.ai/v1";
    return raw.trim().replace(/\/+$/, "");
  }

  public getApiKey(): string | undefined {
    return (
      process.env.MERCURY_API_KEY ||
      (typeof process !== "undefined" ? process.env?.MERCURY_API_KEY : undefined)
    );
  }

  public isConfigured(): boolean {
    const key = this.getApiKey();
    return Boolean(key && key.trim().length > 0);
  }

  public async checkHealth(): Promise<AIProviderHealth> {
    const startTime = Date.now();
    const apiKey = this.getApiKey();
    const baseUrl = this.getBaseUrl();

    if (!apiKey) {
      return {
        ok: false,
        providerId: "mercury",
        message: "MERCURY_API_KEY is not configured",
        latencyMs: 0,
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(`${baseUrl}/models`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const latencyMs = Date.now() - startTime;

      if (!response.ok) {
        const errorText = await response.text();
        return {
          ok: false,
          providerId: "mercury",
          message: `Inception Labs returned HTTP ${response.status}: ${errorText.slice(0, 150)}`,
          latencyMs,
        };
      }

      const data = (await response.json()) as { data?: Array<{ id: string }> };
      const modelNames = (data.data || []).map((m) => m.id);

      return {
        ok: true,
        providerId: "mercury",
        message: `Inception Labs (Mercury 3) is healthy. Models: ${modelNames.join(", ")}`,
        latencyMs,
        discoveredModels: modelNames,
      };
    } catch (err) {
      return {
        ok: false,
        providerId: "mercury",
        message: `Mercury healthcheck failed: ${err instanceof Error ? err.message : String(err)}`,
        latencyMs: Date.now() - startTime,
      };
    }
  }

  public async listModels(): Promise<AIModelMetadata[]> {
    return [
      {
        id: "mercury-3",
        providerId: "mercury",
        displayName: "Inception: Mercury 3 (Diffusion LLM)",
        capabilities: ["text", "structured_json"],
        contextWindow: 1_000_000,
        maxOutputTokens: 131_072,
        isAvailable: this.isConfigured(),
        isFallbackEligible: true,
        priorityRank: 1, // Ultra-fast diffusion throughput (1,000+ tok/s)
        pricing: {
          inputCostPer1M: 0.1,
          outputCostPer1M: 0.35,
        },
      },
      {
        id: "mercury-decide",
        providerId: "mercury",
        displayName: "Inception: Mercury Decide (Decisions Only)",
        capabilities: [],
        contextWindow: 65_536,
        maxOutputTokens: 50_000,
        isAvailable: false, // Incompatible with standard chat completions
        isFallbackEligible: false,
        priorityRank: 99,
      },
    ];
  }

  public async generate(
    options: AIGenerationOptions,
    model: AIModelMetadata,
  ): Promise<AIGenerationResult> {
    const apiKey = this.getApiKey();
    const baseUrl = this.getBaseUrl();

    if (!apiKey) {
      throw new Error("MERCURY_API_KEY is not configured on the server");
    }

    const startTime = Date.now();
    const timeoutMs = options.timeoutMs ?? 15000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const messages: Array<{ role: string; content: string }> = [];

    if (options.systemPrompt) {
      messages.push({ role: "system", content: options.systemPrompt });
    }

    if (options.messages && options.messages.length > 0) {
      for (const msg of options.messages) {
        messages.push({ role: msg.role, content: msg.content });
      }
    } else {
      messages.push({ role: "user", content: options.prompt });
    }

    const payload: Record<string, unknown> = {
      model: model.id || "mercury-3",
      messages,
      temperature: options.temperature ?? 0.3,
      max_tokens: options.maxTokens ?? 4096,
    };

    if (options.responseFormat === "json") {
      payload.response_format = { type: "json_object" };
    }

    const completionsUrl = `${baseUrl}/chat/completions`;

    try {
      const response = await fetch(completionsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const latencyMs = Date.now() - startTime;

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Mercury API error (${response.status}): ${errorText.slice(0, 200)}`);
      }

      const data = (await response.json()) as {
        choices?: Array<{
          message?: {
            content?: string;
          };
        }>;
        usage?: {
          prompt_tokens?: number;
          completion_tokens?: number;
          total_tokens?: number;
        };
      };

      const rawText = data.choices?.[0]?.message?.content?.trim() || "";
      let jsonData: unknown = undefined;

      if (options.responseFormat === "json") {
        try {
          const cleaned = rawText
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();
          jsonData = JSON.parse(cleaned);
        } catch (jsonErr) {
          throw new Error(
            `Failed to parse structured JSON from Mercury response: ${String(jsonErr)}`,
          );
        }
      }

      return {
        text: rawText,
        jsonData,
        modelId: model.id,
        providerId: "mercury",
        latencyMs,
        usage: {
          promptTokens: data.usage?.prompt_tokens,
          completionTokens: data.usage?.completion_tokens,
          totalTokens: data.usage?.total_tokens,
        },
      };
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isAbort = (err as { name?: string })?.name === "AbortError";
      if (isAbort) {
        throw new Error(`Mercury request timed out after ${timeoutMs}ms (model: ${model.id})`);
      }
      throw err;
    }
  }
}

export const mercuryAdapter = new MercuryAdapter();
