/**
 * Core AI Infrastructure Types
 * Centralized contracts for multi-model AI routing, providers, and capabilities.
 */

export type AIProviderId = "gemini" | "freellm" | "mercury";

export type AITaskType =
  | "general_explanation"
  | "notes_generation"
  | "mcq_generation"
  | "complex_reasoning"
  | "fast_tutor"
  | "study_plan"
  | "diagram_mermaid";

export type AICapability = "text" | "structured_json" | "vision" | "streaming" | "reasoning";

export interface AIModelMetadata {
  id: string;
  providerId: AIProviderId;
  displayName: string;
  capabilities: AICapability[];
  contextWindow: number;
  maxOutputTokens: number;
  isAvailable: boolean;
  isFallbackEligible: boolean;
  priorityRank: number; // Lower is higher priority
  pricing?: {
    inputCostPer1M: number;
    outputCostPer1M: number;
  };
}

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIGenerationOptions {
  task: AITaskType;
  prompt: string;
  systemPrompt?: string;
  messages?: AIMessage[];
  temperature?: number;
  maxTokens?: number;
  responseFormat?: "text" | "json";
  jsonSchema?: Record<string, unknown>;
  preferredModelId?: string;
  preferredProviderId?: AIProviderId;
  timeoutMs?: number;
  retries?: number;
  userId?: string;
}

export interface AITokenUsage {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
}

export interface AIFallbackAttempt {
  modelId: string;
  providerId: AIProviderId;
  error: string;
  durationMs: number;
}

export type AIErrorCategory =
  | "timeout"
  | "rate_limit"
  | "auth_error"
  | "invalid_json"
  | "provider_unavailable"
  | "model_not_found"
  | "context_length_exceeded"
  | "no_eligible_model"
  | "unknown";

export interface AIObservabilityEvent {
  requestId: string;
  task: AITaskType;
  selectedProvider: AIProviderId;
  selectedModel: string;
  durationMs: number;
  success: boolean;
  tokenUsage?: AITokenUsage;
  fallbackCount: number;
  fallbackAttempts: AIFallbackAttempt[];
  errorCategory?: AIErrorCategory;
  errorMessage?: string;
  timestamp: string;
}

export interface AITaskRoutingPolicy {
  task: AITaskType;
  primaryProvider: AIProviderId;
  primaryModelId: string;
  requiredCapabilities: AICapability[];
  defaultTimeoutMs: number;
  maxOutputTokens: number;
  maxRetries: number;
  temperature: number;
  allowedProviders: AIProviderId[];
  fallbackCandidateIds: string[];
}

export interface AIGenerationResult {
  text: string;
  jsonData?: unknown;
  modelId: string;
  providerId: AIProviderId;
  latencyMs: number;
  usage?: AITokenUsage;
  fallbackHistory?: AIFallbackAttempt[];
  observability?: AIObservabilityEvent;
}

export interface AIProviderHealth {
  ok: boolean;
  providerId: AIProviderId;
  message: string;
  latencyMs: number;
  discoveredModels?: string[];
}

export interface AIProviderAdapter {
  readonly providerId: AIProviderId;
  isConfigured(): boolean;
  checkHealth(): Promise<AIProviderHealth>;
  listModels(): Promise<AIModelMetadata[]>;
  generate(options: AIGenerationOptions, model: AIModelMetadata): Promise<AIGenerationResult>;
}
