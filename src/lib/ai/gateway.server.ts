import {
  AIFallbackAttempt,
  AIGenerationOptions,
  AIGenerationResult,
  AIObservabilityEvent,
  AIProviderAdapter,
  AIProviderHealth,
  AIProviderId,
} from "./types";
import { modelRegistry } from "./model-registry";
import { geminiAdapter } from "./adapters/gemini.adapter";
import { freeLLMAdapter } from "./adapters/freellm.adapter";
import { mercuryAdapter } from "./adapters/mercury.adapter";
import { taskRouter, validateMermaidDiagram, sanitizeErrorMessage } from "./router";

export class AIGateway {
  private adapters: Map<AIProviderId, AIProviderAdapter> = new Map();
  private initialized = false;
  private recentEvents: AIObservabilityEvent[] = [];

  constructor() {
    this.registerAdapter(geminiAdapter);
    this.registerAdapter(freeLLMAdapter);
    this.registerAdapter(mercuryAdapter);
  }

  public registerAdapter(adapter: AIProviderAdapter): void {
    this.adapters.set(adapter.providerId, adapter);
  }

  public getAdapter(providerId: AIProviderId): AIProviderAdapter | undefined {
    return this.adapters.get(providerId);
  }

  /**
   * Initializes dynamic discovery from active providers.
   */
  public async initialize(): Promise<void> {
    if (this.initialized) return;

    // Check Mercury 3 (Inception Labs)
    if (mercuryAdapter.isConfigured()) {
      try {
        const models = await mercuryAdapter.listModels();
        for (const model of models) {
          modelRegistry.registerModel(model);
        }
      } catch (err) {
        console.warn("[AIGateway] Mercury 3 model discovery encountered an issue:", err);
      }
    }

    // Check FreeLLM and discover registered models
    if (freeLLMAdapter.isConfigured()) {
      try {
        const models = await freeLLMAdapter.listModels();
        for (const model of models) {
          modelRegistry.registerModel(model);
        }
      } catch (err) {
        console.warn("[AIGateway] FreeLLM model discovery encountered an issue:", err);
      }
    }

    this.initialized = true;
  }

  /**
   * Check health of all registered providers.
   */
  public async checkAllProvidersHealth(): Promise<Record<string, AIProviderHealth>> {
    const results: Record<string, AIProviderHealth> = {};

    for (const [id, adapter] of this.adapters.entries()) {
      results[id] = await adapter.checkHealth();
    }

    return results;
  }

  /**
   * Returns recent in-memory observability events (retaining last 50).
   */
  public getRecentObservabilityEvents(): AIObservabilityEvent[] {
    return [...this.recentEvents];
  }

  /**
   * Execute an AI generation request with task-based routing, bounded retries,
   * capability-safe fallback, and structured observability logging.
   */
  public async generate(options: AIGenerationOptions): Promise<AIGenerationResult> {
    const requestStart = Date.now();
    const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    await this.initialize();

    // 1. Resolve candidates and policy via task router
    const { candidates, timeoutMs, maxTokens, temperature, maxRetries } =
      taskRouter.resolveRoute(options);

    const mergedOptions: AIGenerationOptions = {
      ...options,
      timeoutMs,
      maxTokens,
      temperature,
    };

    const fallbackHistory: AIFallbackAttempt[] = [];

    // 2. Iterate through prioritized candidate models with fallback
    for (const model of candidates) {
      let adapter = this.getAdapter(model.providerId);
      if (!adapter && model.providerId === "mercury") {
        adapter = this.getAdapter("freellm");
      }

      if (!adapter || !adapter.isConfigured()) {
        continue;
      }

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const attemptStart = Date.now();
        try {
          const result = await adapter.generate(mergedOptions, model);

          // Diagram validation: ensure valid Mermaid syntax
          if (options.task === "diagram_mermaid") {
            const validation = validateMermaidDiagram(result.text);
            if (!validation.valid) {
              throw new Error(`Invalid Mermaid syntax: ${validation.error}`);
            }
            result.text = validation.cleaned;
          }

          const totalDurationMs = Date.now() - requestStart;

          // Build observability event for successful execution
          const obsEvent: AIObservabilityEvent = {
            requestId,
            task: options.task,
            selectedProvider: result.providerId,
            selectedModel: result.modelId,
            durationMs: totalDurationMs,
            success: true,
            tokenUsage: result.usage,
            fallbackCount: fallbackHistory.length,
            fallbackAttempts: fallbackHistory,
            timestamp: new Date().toISOString(),
          };

          this.recordObservability(obsEvent);
          result.observability = obsEvent;

          if (fallbackHistory.length > 0) {
            result.fallbackHistory = fallbackHistory;
          }

          return result;
        } catch (err: unknown) {
          const durationMs = Date.now() - attemptStart;
          const rawErrorMsg = err instanceof Error ? err.message : String(err);
          const sanitizedError = sanitizeErrorMessage(rawErrorMsg);

          // If retries remain for this specific model, brief exponential backoff
          if (attempt < maxRetries) {
            await new Promise((res) => setTimeout(res, 250 * Math.pow(2, attempt)));
            continue;
          }

          // Record fallback attempt with sanitized error
          fallbackHistory.push({
            modelId: model.id,
            providerId: model.providerId,
            error: sanitizedError,
            durationMs,
          });

          console.warn(
            `[AIGateway] Task '${options.task}' on model '${model.id}' failed (${sanitizedError}). Attempting fallback candidate...`,
          );
        }
      }
    }

    // 3. Handle total execution failure across all candidates
    const totalDurationMs = Date.now() - requestStart;
    const failuresSummary = fallbackHistory
      .map((f) => `${f.providerId}/${f.modelId}: ${f.error}`)
      .join(" | ");

    const lastError =
      fallbackHistory[fallbackHistory.length - 1]?.error || "No candidate available";
    const errorCategory = taskRouter.classifyError(lastError);

    const failureEvent: AIObservabilityEvent = {
      requestId,
      task: options.task,
      selectedProvider: candidates[0]?.providerId || "gemini",
      selectedModel: candidates[0]?.id || "unknown",
      durationMs: totalDurationMs,
      success: false,
      fallbackCount: fallbackHistory.length,
      fallbackAttempts: fallbackHistory,
      errorCategory,
      errorMessage: sanitizeErrorMessage(failuresSummary),
      timestamp: new Date().toISOString(),
    };

    this.recordObservability(failureEvent);

    throw new Error(
      `[AIGateway] All candidate AI models failed for task '${options.task}'. Category: ${errorCategory}. Failures: ${failuresSummary}`,
    );
  }

  private recordObservability(event: AIObservabilityEvent): void {
    this.recentEvents.unshift(event);
    if (this.recentEvents.length > 50) {
      this.recentEvents.pop();
    }
  }
}

export const aiGateway = new AIGateway();
