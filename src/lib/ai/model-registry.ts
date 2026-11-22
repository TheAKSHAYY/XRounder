import { AICapability, AIModelMetadata, AITaskType } from "./types";

/**
 * Base curated registry of known verified models.
 * Dynamically extended at runtime when providers report active models.
 */
export const KNOWN_MODELS: AIModelMetadata[] = [
  // Google Gemini verified production models
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
  {
    id: "gemini-3-flash-preview",
    providerId: "gemini",
    displayName: "Gemini 3 Flash Preview (Reasoning)",
    capabilities: ["text", "structured_json", "vision", "reasoning"],
    contextWindow: 1_048_576,
    maxOutputTokens: 65_536,
    isAvailable: true,
    isFallbackEligible: true,
    priorityRank: 4,
  },
];

class ModelRegistry {
  private models: Map<string, AIModelMetadata> = new Map();

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.models.clear();
    for (const model of KNOWN_MODELS) {
      this.models.set(model.id, { ...model });
    }
  }

  public registerModel(model: AIModelMetadata, force = false): void {
    const existing = this.models.get(model.id);
    if (existing && !force) {
      // Do not allow dynamic third-party proxy discovery to overwrite official curated native models
      if (existing.providerId === "gemini" || existing.providerId === "mercury") {
        return;
      }
    }
    this.models.set(model.id, { ...model });
  }

  public getModel(modelId: string): AIModelMetadata | undefined {
    return this.models.get(modelId);
  }

  public getAllModels(): AIModelMetadata[] {
    return Array.from(this.models.values());
  }

  public getAvailableModels(): AIModelMetadata[] {
    return this.getAllModels().filter((m) => m.isAvailable);
  }

  /**
   * Returns models satisfying all required capabilities, sorted by priority.
   */
  public getEligibleModels(
    requiredCapabilities: AICapability[] = ["text"],
    preferredProvider?: string,
  ): AIModelMetadata[] {
    return this.getAvailableModels()
      .filter((model) => requiredCapabilities.every((cap) => model.capabilities.includes(cap)))
      .sort((a, b) => {
        // Preferred provider takes precedence
        if (preferredProvider) {
          if (a.providerId === preferredProvider && b.providerId !== preferredProvider) return -1;
          if (b.providerId === preferredProvider && a.providerId !== preferredProvider) return 1;
        }
        return a.priorityRank - b.priorityRank;
      });
  }

  /**
   * Determine required capabilities based on task.
   */
  public getRequiredCapabilitiesForTask(
    task: AITaskType,
    responseFormat?: "text" | "json",
  ): AICapability[] {
    const caps: AICapability[] = ["text"];
    if (responseFormat === "json" || task === "mcq_generation" || task === "study_plan") {
      caps.push("structured_json");
    }
    if (task === "complex_reasoning") {
      caps.push("reasoning");
    }
    return caps;
  }
}

export const modelRegistry = new ModelRegistry();
