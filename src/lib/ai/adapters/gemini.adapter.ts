import {
  AIGenerationOptions,
  AIGenerationResult,
  AIModelMetadata,
  AIProviderAdapter,
  AIProviderHealth,
  AIProviderId,
} from "../types";

export class GeminiAdapter implements AIProviderAdapter {
  public readonly providerId: AIProviderId = "gemini";

  private getApiKey(): string | undefined {
    return (
      process.env.GEMINI_API_KEY ||
      (typeof process !== "undefined" ? process.env?.GEMINI_API_KEY : undefined)
    );
  }

  public isConfigured(): boolean {
    const key = this.getApiKey();
    return Boolean(key && key.trim().length > 0);
  }

  public async checkHealth(): Promise<AIProviderHealth> {
    const startTime = Date.now();
    const apiKey = this.getApiKey();

    if (!apiKey) {
      return {
        ok: false,
        providerId: "gemini",
        message: "GEMINI_API_KEY environment variable is not configured",
        latencyMs: 0,
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      // Lightweight ping to models endpoint
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`,
        {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        },
      );
      clearTimeout(timeoutId);

      const latencyMs = Date.now() - startTime;
      if (!response.ok) {
        const errorText = await response.text();
        return {
          ok: false,
          providerId: "gemini",
          message: `Gemini API returned status ${response.status}: ${errorText.slice(0, 150)}`,
          latencyMs,
        };
      }

      const data = (await response.json()) as { models?: Array<{ name: string }> };
      const modelNames = (data.models || []).map((m) => m.name.replace(/^models\//, ""));

      return {
        ok: true,
        providerId: "gemini",
        message: "Gemini API is healthy and connected",
        latencyMs,
        discoveredModels: modelNames.slice(0, 10),
      };
    } catch (err) {
      return {
        ok: false,
        providerId: "gemini",
        message: `Gemini healthcheck failed: ${err instanceof Error ? err.message : String(err)}`,
        latencyMs: Date.now() - startTime,
      };
    }
  }

  public async listModels(): Promise<AIModelMetadata[]> {
    return [
      {
        id: "gemini-flash-lite-latest",
        providerId: "gemini",
        displayName: "Gemini Flash-Lite (Latest)",
        capabilities: ["text", "structured_json", "vision"],
        contextWindow: 1_000_000,
        maxOutputTokens: 8_192,
        isAvailable: true,
        isFallbackEligible: true,
        priorityRank: 1,
      },
      {
        id: "gemini-3.5-flash-lite",
        providerId: "gemini",
        displayName: "Gemini 3.5 Flash-Lite",
        capabilities: ["text", "structured_json", "vision"],
        contextWindow: 1_000_000,
        maxOutputTokens: 8_192,
        isAvailable: true,
        isFallbackEligible: true,
        priorityRank: 2,
      },
      {
        id: "gemini-flash-latest",
        providerId: "gemini",
        displayName: "Gemini Flash (Latest)",
        capabilities: ["text", "structured_json", "vision", "reasoning"],
        contextWindow: 1_000_000,
        maxOutputTokens: 8_192,
        isAvailable: true,
        isFallbackEligible: true,
        priorityRank: 3,
      },
    ];
  }

  public async generate(
    options: AIGenerationOptions,
    model: AIModelMetadata,
  ): Promise<AIGenerationResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error("Gemini API key is not configured on the server");
    }

    const startTime = Date.now();
    const timeoutMs = options.timeoutMs ?? 10000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    // Build contents payload
    const contents: Array<{ role?: string; parts: Array<{ text: string }> }> = [];

    if (options.messages && options.messages.length > 0) {
      for (const msg of options.messages) {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        });
      }
    } else {
      contents.push({
        parts: [{ text: options.prompt }],
      });
    }

    const generationConfig: Record<string, unknown> = {
      temperature: options.temperature ?? 0.3,
      maxOutputTokens: options.maxTokens ?? model.maxOutputTokens ?? 4096,
    };

    if (options.responseFormat === "json") {
      generationConfig.responseMimeType = "application/json";
    }

    const payload: Record<string, unknown> = {
      contents,
      generationConfig,
    };

    if (options.systemPrompt) {
      payload.systemInstruction = {
        parts: [{ text: options.systemPrompt }],
      };
    }

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        model.id,
      )}:generateContent?key=${encodeURIComponent(apiKey)}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const latencyMs = Date.now() - startTime;

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error (${response.status}): ${errorText.slice(0, 200)}`);
      }

      const data = (await response.json()) as {
        candidates?: Array<{
          content?: {
            parts?: Array<{ text?: string }>;
          };
        }>;
        usageMetadata?: {
          promptTokenCount?: number;
          candidatesTokenCount?: number;
          totalTokenCount?: number;
        };
      };

      const rawText = (data.candidates?.[0]?.content?.parts || [])
        .map((p) => p.text || "")
        .join("")
        .trim();
      let jsonData: unknown = undefined;

      if (options.responseFormat === "json") {
        try {
          // Clean possible markdown code fences if model returned them
          const cleaned = rawText
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();
          jsonData = JSON.parse(cleaned);
        } catch (jsonErr) {
          throw new Error(
            `Failed to parse structured JSON from Gemini response: ${String(jsonErr)}`,
          );
        }
      }

      return {
        text: rawText,
        jsonData,
        modelId: model.id,
        providerId: "gemini",
        latencyMs,
        usage: {
          promptTokens: data.usageMetadata?.promptTokenCount,
          completionTokens: data.usageMetadata?.candidatesTokenCount,
          totalTokens: data.usageMetadata?.totalTokenCount,
        },
      };
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isAbort = (err as { name?: string })?.name === "AbortError";
      if (isAbort) {
        throw new Error(`Gemini request timed out after ${timeoutMs}ms (model: ${model.id})`);
      }
      throw err;
    }
  }
}

export const geminiAdapter = new GeminiAdapter();
