import {
  AICapability,
  AIGenerationOptions,
  AIModelMetadata,
  AITaskRoutingPolicy,
  AITaskType,
  AIErrorCategory,
} from "./types";
import { modelRegistry } from "./model-registry";

/**
 * Production Task-Based AI Routing Policies
 *
 * Each task policy defines verified primary models, required capabilities,
 * maximum output tokens, bounded timeouts, retries, and prioritized fallback chains.
 */
export const TASK_ROUTING_POLICIES: Record<AITaskType, AITaskRoutingPolicy> = {
  // 1. Fast Conversational Tutoring (Sparky AI Coach)
  // Low-latency interactive Q&A. Prefers Mercury 3 (diffusion throughput ~700ms),
  // falling back to Gemini Flash-Lite.
  fast_tutor: {
    task: "fast_tutor",
    primaryProvider: "mercury",
    primaryModelId: "mercury-3",
    requiredCapabilities: ["text"],
    defaultTimeoutMs: 8_000,
    maxOutputTokens: 1_024,
    maxRetries: 1,
    temperature: 0.2,
    allowedProviders: ["mercury", "gemini", "freellm"],
    fallbackCandidateIds: [
      "gemini-flash-lite-latest",
      "gemini-3.5-flash-lite",
      "gemini-flash-latest",
      "auto",
    ],
  },

  // 2. General Syllabus Concept Explanations
  // First-principles Feynman pedagogical breakdowns.
  general_explanation: {
    task: "general_explanation",
    primaryProvider: "mercury",
    primaryModelId: "mercury-3",
    requiredCapabilities: ["text"],
    defaultTimeoutMs: 12_000,
    maxOutputTokens: 2_048,
    maxRetries: 1,
    temperature: 0.3,
    allowedProviders: ["mercury", "gemini", "freellm"],
    fallbackCandidateIds: [
      "gemini-flash-latest",
      "gemini-flash-lite-latest",
      "gemini-3.5-flash-lite",
      "auto",
    ],
  },

  // 3. Complex Algorithmic Reasoning
  // Deep deductive logic, dry-run code execution traces, and formal proofs.
  // Requires models with verified deep reasoning capabilities.
  complex_reasoning: {
    task: "complex_reasoning",
    primaryProvider: "gemini",
    primaryModelId: "gemini-flash-latest",
    requiredCapabilities: ["text", "reasoning"],
    defaultTimeoutMs: 16_000,
    maxOutputTokens: 4_096,
    maxRetries: 1,
    temperature: 0.2,
    allowedProviders: ["gemini"],
    fallbackCandidateIds: ["gemini-3-flash-preview"],
  },

  // 4. Comprehensive Exam Notes Generation
  // High-volume structured markdown revision notes with university marking blueprints.
  notes_generation: {
    task: "notes_generation",
    primaryProvider: "gemini",
    primaryModelId: "gemini-flash-latest",
    requiredCapabilities: ["text"],
    defaultTimeoutMs: 18_000,
    maxOutputTokens: 4_096,
    maxRetries: 1,
    temperature: 0.3,
    allowedProviders: ["gemini", "mercury", "freellm"],
    fallbackCandidateIds: ["mercury-3", "gemini-flash-lite-latest", "gemini-3.5-flash-lite"],
  },

  // 5. MCQ & Quiz Generation
  // Structured multiple-choice exam questions with verified answer keys and distractors.
  // STRICT REQUIREMENT: structured_json capability is mandatory.
  mcq_generation: {
    task: "mcq_generation",
    primaryProvider: "gemini",
    primaryModelId: "gemini-flash-lite-latest",
    requiredCapabilities: ["text", "structured_json"],
    defaultTimeoutMs: 14_000,
    maxOutputTokens: 2_048,
    maxRetries: 1,
    temperature: 0.1,
    allowedProviders: ["gemini", "mercury"],
    fallbackCandidateIds: [
      "mercury-3",
      "gemini-3.5-flash-lite",
      "gemini-flash-latest",
      "gemini-3-flash-preview",
    ],
  },

  // 6. Semester & Unit Study Plan Generation
  // Strict schema-validated milestone roadmaps.
  // STRICT REQUIREMENT: structured_json capability is mandatory.
  study_plan: {
    task: "study_plan",
    primaryProvider: "gemini",
    primaryModelId: "gemini-flash-lite-latest",
    requiredCapabilities: ["text", "structured_json"],
    defaultTimeoutMs: 15_000,
    maxOutputTokens: 2_500,
    maxRetries: 1,
    temperature: 0.2,
    allowedProviders: ["gemini", "mercury"],
    fallbackCandidateIds: ["mercury-3", "gemini-3.5-flash-lite", "gemini-flash-latest"],
  },

  // 7. Visual Mermaid Architecture Diagrams & Flowcharts
  // Synthesizes precise syntax for flowcharts, sequence diagrams, and class diagrams.
  diagram_mermaid: {
    task: "diagram_mermaid",
    primaryProvider: "mercury",
    primaryModelId: "mercury-3",
    requiredCapabilities: ["text"],
    defaultTimeoutMs: 10_000,
    maxOutputTokens: 1_500,
    maxRetries: 1,
    temperature: 0.1,
    allowedProviders: ["mercury", "gemini", "freellm"],
    fallbackCandidateIds: ["gemini-flash-latest", "gemini-flash-lite-latest"],
  },
};

export class TaskRouter {
  /**
   * Retrieves the routing policy for a given task.
   */
  public getPolicy(task: AITaskType): AITaskRoutingPolicy {
    const policy = TASK_ROUTING_POLICIES[task];
    if (!policy) {
      throw new Error(`Unknown AI task type '${task}'. No routing policy configured.`);
    }
    return policy;
  }

  /**
   * Resolves the candidate execution list for a given request.
   * Guarantees that every candidate satisfies all required capabilities.
   */
  public resolveRoute(options: AIGenerationOptions): {
    policy: AITaskRoutingPolicy;
    candidates: AIModelMetadata[];
    timeoutMs: number;
    maxTokens: number;
    temperature: number;
    maxRetries: number;
  } {
    const policy = this.getPolicy(options.task);

    // Determine strict required capabilities
    const requiredCaps: AICapability[] = [...policy.requiredCapabilities];
    if (options.responseFormat === "json" && !requiredCaps.includes("structured_json")) {
      requiredCaps.push("structured_json");
    }

    const candidateMap = new Map<string, AIModelMetadata>();

    // 1. If user explicitly provided a preferred model, evaluate it first
    if (options.preferredModelId) {
      const explicit = modelRegistry.getModel(options.preferredModelId);
      if (explicit && explicit.isAvailable) {
        const satisfies = requiredCaps.every((cap) => explicit.capabilities.includes(cap));
        if (satisfies) {
          candidateMap.set(explicit.id, explicit);
        } else {
          console.warn(
            `[TaskRouter] Preferred model '${options.preferredModelId}' does not support required capabilities [${requiredCaps.join(
              ", ",
            )}] for task '${options.task}'. Skipping preference.`,
          );
        }
      }
    }

    // 2. Add primary model from policy if available & matching
    const primary = modelRegistry.getModel(policy.primaryModelId);
    if (primary && primary.isAvailable) {
      const satisfies = requiredCaps.every((cap) => primary.capabilities.includes(cap));
      if (satisfies && !candidateMap.has(primary.id)) {
        candidateMap.set(primary.id, primary);
      }
    }

    // 3. Add fallback candidates defined in the policy
    for (const fallbackId of policy.fallbackCandidateIds) {
      if (candidateMap.has(fallbackId)) continue;
      const model = modelRegistry.getModel(fallbackId);
      if (model && model.isAvailable && model.isFallbackEligible) {
        const satisfies = requiredCaps.every((cap) => model.capabilities.includes(cap));
        const providerAllowed = policy.allowedProviders.includes(model.providerId);
        if (satisfies && providerAllowed) {
          candidateMap.set(model.id, model);
        }
      }
    }

    // 4. Fill in any other eligible models registered in modelRegistry
    const allEligibles = modelRegistry.getEligibleModels(
      requiredCaps,
      options.preferredProviderId || policy.primaryProvider,
    );
    for (const model of allEligibles) {
      if (policy.allowedProviders.includes(model.providerId) && !candidateMap.has(model.id)) {
        candidateMap.set(model.id, model);
      }
    }

    const candidates = Array.from(candidateMap.values());

    if (candidates.length === 0) {
      throw new Error(
        `[TaskRouter] No eligible AI models found satisfying capabilities [${requiredCaps.join(
          ", ",
        )}] for task '${options.task}'. ErrorCategory: no_eligible_model`,
      );
    }

    return {
      policy,
      candidates,
      timeoutMs: options.timeoutMs ?? policy.defaultTimeoutMs,
      maxTokens: options.maxTokens ?? policy.maxOutputTokens,
      temperature: options.temperature ?? policy.temperature,
      maxRetries: options.retries ?? policy.maxRetries,
    };
  }

  /**
   * Categorizes errors into standard operational buckets for logging and auditability.
   */
  public classifyError(error: unknown): AIErrorCategory {
    const name =
      typeof error === "object" && error !== null && "name" in error
        ? String((error as { name?: unknown }).name)
        : "";
    const msg =
      typeof error === "object" && error !== null && "message" in error
        ? String((error as { message?: unknown }).message)
        : String(error);
    const lower = `${name} ${msg}`.toLowerCase();

    if (
      lower.includes("timeout") ||
      lower.includes("timed out") ||
      lower.includes("aborterror") ||
      lower.includes("und_err_connect_timeout")
    ) {
      return "timeout";
    }

    if (
      lower.includes("429") ||
      lower.includes("rate limit") ||
      lower.includes("resource_exhausted") ||
      lower.includes("quota")
    ) {
      return "rate_limit";
    }

    if (
      lower.includes("401") ||
      lower.includes("403") ||
      lower.includes("unauthenticated") ||
      lower.includes("api_key_invalid") ||
      lower.includes("forbidden") ||
      lower.includes("not configured")
    ) {
      return "auth_error";
    }

    if (
      lower.includes("json") ||
      lower.includes("syntaxerror") ||
      lower.includes("failed to parse structured json")
    ) {
      return "invalid_json";
    }

    if (
      lower.includes("500") ||
      lower.includes("502") ||
      lower.includes("503") ||
      lower.includes("504") ||
      lower.includes("unavailable") ||
      lower.includes("high demand") ||
      lower.includes("fetch failed")
    ) {
      return "provider_unavailable";
    }

    if (lower.includes("404") || lower.includes("not found")) {
      return "model_not_found";
    }

    if (
      lower.includes("context length") ||
      lower.includes("maximum context") ||
      lower.includes("token limit")
    ) {
      return "context_length_exceeded";
    }

    if (lower.includes("no eligible ai models") || lower.includes("no_eligible_model")) {
      return "no_eligible_model";
    }

    return "unknown";
  }
}

export const taskRouter = new TaskRouter();

/**
 * Validates and cleans Mermaid diagram syntax.
 * Rejects empty or malformed diagrams missing valid headers or structure.
 */
export function validateMermaidDiagram(text: string): {
  valid: boolean;
  cleaned: string;
  error?: string;
} {
  if (!text || text.trim().length === 0) {
    return { valid: false, cleaned: "", error: "Mermaid diagram output is empty" };
  }

  // Strip markdown code fences if model wrapped them
  let cleaned = text.trim();
  cleaned = cleaned
    .replace(/^```mermaid\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  // Supported diagram header types
  const validHeaderRegex =
    /^(graph\s+(TD|TB|BT|RL|LR)|flowchart\s+(TD|TB|BT|RL|LR)|sequenceDiagram|classDiagram|stateDiagram(-v2)?|erDiagram|xychart-beta|gantt|pie)/m;

  if (!validHeaderRegex.test(cleaned)) {
    return {
      valid: false,
      cleaned,
      error:
        "Mermaid diagram is missing a valid diagram declaration header (e.g. 'flowchart TD', 'sequenceDiagram', 'classDiagram', 'erDiagram')",
    };
  }

  // Verify diagram has meaningful structure (at least 2 lines)
  const lines = cleaned
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) {
    return {
      valid: false,
      cleaned,
      error: "Mermaid diagram is incomplete (fewer than 2 statements)",
    };
  }

  return { valid: true, cleaned };
}

/**
 * Sanitizes errors before returning them to frontend callers.
 * Strips secrets, API keys, Bearer tokens, and internal file paths.
 */
export function sanitizeErrorMessage(errorText: string): string {
  if (!errorText) return "An unexpected AI provider error occurred";

  return errorText
    .replace(/(key=)[^\s&"']+/gi, "$1[REDACTED]")
    .replace(/(Bearer\s+)[^\s"']+/gi, "$1[REDACTED]")
    .replace(/sk_[a-zA-Z0-9_-]+/gi, "sk_[REDACTED]")
    .replace(/freellmapi-[a-zA-Z0-9_-]+/gi, "freellmapi-[REDACTED]")
    .replace(/[a-zA-Z]:\\[^\s:"']+/gi, "[LOCAL_PATH]")
    .replace(/\/Users\/[^\s:"']+/gi, "[LOCAL_PATH]")
    .replace(/\/home\/[^\s:"']+/gi, "[LOCAL_PATH]")
    .slice(0, 300);
}
