import {
  AIGenerationOptions,
  AIGenerationResult,
  AIModelMetadata,
  AIProviderAdapter,
  AIProviderHealth,
  AIProviderId,
} from "../types";

export class FreeLLMAdapter implements AIProviderAdapter {
  public readonly providerId: AIProviderId = "freellm";

  public getBaseUrl(): string {
    const raw =
      process.env.FREELLM_BASE_URL ||
      (typeof process !== "undefined" ? process.env?.FREELLM_BASE_URL : undefined) ||
      "";
    // Normalize trailing slashes
    return raw.trim().replace(/\/+$/, "");
  }

  public getApiKey(): string | undefined {
    return (
      process.env.FREELLM_API_KEY ||
      (typeof process !== "undefined" ? process.env?.FREELLM_API_KEY : undefined)
    );
  }

  public isConfigured(): boolean {
    const key = this.getApiKey();
    const baseUrl = this.getBaseUrl();
    if (!key || key.trim().length === 0 || baseUrl.length === 0) {
      return false;
    }

    const isProduction =
      process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
    const isLoopback = /^(https?:\/\/)?(127\.0\.0\.1|localhost)(:\d+)?/i.test(baseUrl);

    // In production, local loopback addresses are inaccessible from Cloudflare/Vercel serverless edges
    if (isProduction && isLoopback && process.env.FREELLM_ALLOW_LOCALHOST !== "true") {
      return false;
    }

    return true;
  }

  /**
   * Healthcheck that hits the standard /models endpoint to verify connectivity
   * and introspect available models.
   */
  public async checkHealth(): Promise<AIProviderHealth> {
    const startTime = Date.now();
    const apiKey = this.getApiKey();
    const baseUrl = this.getBaseUrl();

    if (!baseUrl || !apiKey) {
      return {
        ok: false,
        providerId: "freellm",
        message: "FREELLM_BASE_URL and/or FREELLM_API_KEY are not configured in environment",
        latencyMs: 0,
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const modelsUrl = baseUrl.endsWith("/v1") ? `${baseUrl}/models` : `${baseUrl}/v1/models`;

      const response = await fetch(modelsUrl, {
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
          providerId: "freellm",
          message: `FreeLLM returned HTTP ${response.status}: ${errorText.slice(0, 150)}`,
          latencyMs,
        };
      }

      const data = (await response.json()) as { data?: Array<{ id: string }> };
      const modelNames = (data.data || []).map((m) => m.id);

      return {
        ok: true,
        providerId: "freellm",
        message: `Connected successfully. Found ${modelNames.length} models.`,
        latencyMs,
        discoveredModels: modelNames,
      };
    } catch (err) {
      return {
        ok: false,
        providerId: "freellm",
        message: `FreeLLM healthcheck failed: ${err instanceof Error ? err.message : String(err)}`,
        latencyMs: Date.now() - startTime,
      };
    }
  }

  /**
   * Discovers and transforms available models from the provider's /models endpoint.
   */
  public async listModels(): Promise<AIModelMetadata[]> {
    if (!this.isConfigured()) {
      return [];
    }

    try {
      const health = await this.checkHealth();
      if (!health.ok || !health.discoveredModels) {
        return [];
      }

      return health.discoveredModels.map((id, index) => {
        const isMercury = id.toLowerCase().includes("mercury");
        return {
          id,
          providerId: isMercury ? "mercury" : "freellm",
          displayName: isMercury ? `Mercury 3 (${id})` : `FreeLLM: ${id}`,
          capabilities: ["text", "structured_json"],
          contextWindow: isMercury ? 1_000_000 : 32_768,
          maxOutputTokens: 4096,
          isAvailable: true,
          isFallbackEligible: true,
          priorityRank: isMercury ? 1 : 10 + index,
        };
      });
    } catch {
      return [];
    }
  }

  /**
   * Generates completions using standard OpenAI /v1/chat/completions format.
   */
  public async generate(
    options: AIGenerationOptions,
    model: AIModelMetadata,
  ): Promise<AIGenerationResult> {
    const apiKey = this.getApiKey();
    const baseUrl = this.getBaseUrl();

    if (!apiKey || !baseUrl) {
      throw new Error("FreeLLM API key or Base URL is not configured");
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
      model: model.id,
      messages,
      temperature: options.temperature ?? 0.3,
      max_tokens: options.maxTokens ?? model.maxOutputTokens ?? 4096,
    };

    if (options.responseFormat === "json") {
      payload.response_format = { type: "json_object" };
    }

    const completionsUrl = baseUrl.endsWith("/v1")
      ? `${baseUrl}/chat/completions`
      : `${baseUrl}/v1/chat/completions`;

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
        throw new Error(
          `FreeLLM chat completion error (${response.status}): ${errorText.slice(0, 200)}`,
        );
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
            `Failed to parse structured JSON from FreeLLM response: ${String(jsonErr)}`,
          );
        }
      }

      return {
        text: rawText,
        jsonData,
        modelId: model.id,
        providerId: model.providerId,
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
        throw new Error(`FreeLLM request timed out after ${timeoutMs}ms (model: ${model.id})`);
      }
      throw err;
    }
  }
}

export const freeLLMAdapter = new FreeLLMAdapter();
