/**
 * XRounder Gemini AI Study Assistant Server Integration
 *
 * Runs strictly server-side using TanStack Start createServerFn.
 * Protects GEMINI_API_KEY from ever reaching the client browser.
 * Configurable model via GEMINI_MODEL (defaults to free-tier gemini-1.5-flash / gemini-2.0-flash).
 */

/* eslint-disable no-control-regex */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { optionalSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { SlidingWindowRateLimiter } from "@/lib/rate-limiter";

// 10 requests per minute per user (burst protection)
export const geminiUserMinuteLimiter = new SlidingWindowRateLimiter({
  windowMs: 60_000,
  maxRequests: 10,
});

// 60 requests per hour per user (quota exhaustion protection)
export const geminiUserHourLimiter = new SlidingWindowRateLimiter({
  windowMs: 3_600_000,
  maxRequests: 60,
});

export const GeminiAssistantInput = z.object({
  action: z.enum(["ask", "explain", "revision", "quiz"]).default("ask"),
  query: z
    .string()
    .trim()
    .max(500, "Query cannot exceed 500 characters")
    .optional()
    .transform((q) => (q ? q.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") : undefined)),
  topicTitle: z
    .string()
    .trim()
    .min(1, "Topic title is required")
    .max(150, "Topic title cannot exceed 150 characters")
    .transform((t) => t.replace(/[\x00-\x1F\x7F]/g, "")),
  unitNumber: z.coerce.number().int().min(1).max(10),
  subjectTitle: z
    .string()
    .trim()
    .min(1, "Subject title is required")
    .max(150, "Subject title cannot exceed 150 characters")
    .transform((s) => s.replace(/[\x00-\x1F\x7F]/g, "")),
  courseTitle: z
    .string()
    .trim()
    .max(150)
    .optional()
    .default("Bachelor of Computer Applications (BCA)")
    .transform((c) => (c ? c.replace(/[\x00-\x1F\x7F]/g, "") : c)),
  context: z
    .string()
    .max(50000, "Context cannot exceed 50,000 characters")
    .optional()
    .transform((c) => {
      if (!c) return undefined;
      const sanitized = c.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
      return sanitized.length > 4000 ? sanitized.slice(0, 4000) : sanitized;
    }),
  language: z.enum(["en", "hinglish", "hi"]).default("en"),
});

export type GeminiAssistantInputType = z.infer<typeof GeminiAssistantInput>;

export interface GeneratedQuizQuestion {
  prompt: string;
  difficulty: "easy" | "medium" | "hard";
  topic_title: string;
  explanation: string;
  options: Array<{
    text: string;
    is_correct: boolean;
  }>;
}

export interface GeminiAssistantResponse {
  success: boolean;
  content: string;
  modelUsed: string;
  action: string;
  quiz?: GeneratedQuizQuestion[];
  isDemoFallback?: boolean;
}

export const askGeminiStudyAssistant = createServerFn({ method: "POST" })
  .middleware([optionalSupabaseAuth])
  .validator((input: unknown) => GeminiAssistantInput.parse(input))
  .handler(async ({ data, context }): Promise<GeminiAssistantResponse> => {
    const userId = context.userId || "guest-student";

    // 1. Enforce per-user sliding window rate limits
    const minuteCheck = geminiUserMinuteLimiter.check(userId);
    if (!minuteCheck.allowed) {
      return {
        success: false,
        modelUsed: "rate-limiter",
        action: data.action,
        content: `⚠️ You are asking questions too fast. Please wait ${minuteCheck.retryAfterSeconds} seconds before sending another AI query.`,
      };
    }

    const hourCheck = geminiUserHourLimiter.check(userId);
    if (!hourCheck.allowed) {
      return {
        success: false,
        modelUsed: "rate-limiter",
        action: data.action,
        content: `⚠️ Hourly Sparky AI query quota reached. Please take a quick study break and try again in ${Math.ceil(hourCheck.retryAfterSeconds / 60)} minutes.`,
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const configuredModel = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";

    // 1. Language instruction
    const langInstruction =
      data.language === "hi"
        ? "Respond in clear, intellectually rigorous Hindi with English technical terms in parentheses. Follow logical first-principles explanation with step-by-step deductions and structured formatting."
        : data.language === "hinglish"
          ? "Respond in natural, articulate Hinglish (Roman script) used by top Indian engineering mentors. Maintain high intellectual and technical rigor: explain the underlying cause-and-effect logic, the exact problem it solves, and the step-by-step execution flow. Avoid superficial fluff or excessive slang; focus on deep logical clarity, dry-run mechanics, and precise technical keywords."
          : "Respond in rigorous, structured, academic English suitable for university computer science and computer applications examinations. Follow deductive, first-principles reasoning with clear step-by-step causal logic.";

    // 2. Action-specific prompts
    let taskPrompt = "";
    if (data.action === "explain") {
      taskPrompt = `Deconstruct the syllabus topic "${data.topicTitle}" from Unit ${data.unitNumber} of ${data.subjectTitle} using first-principles logical reasoning.
${data.context ? `Ground your explanation strictly in this verified study material:\n${data.context.slice(0, 4000)}` : ""}

Structure your response into these 5 clear logical sections:
### 1. 🎯 Exact Definition & The Problem It Solves
- Provide an unambiguous 2-sentence technical definition with standard notation and variables.
- **The Core Problem:** Why does this concept exist? What computational bottleneck, design flaw, or limitation occurs if you do NOT use it?

### 2. ⚙️ Step-by-Step Mechanism & Logical Flow
- Break down the underlying mechanism into a numbered, causal sequence: Input ➔ Condition/Evaluation ➔ State Transformation ➔ Output.
- State the key invariants (the logical rules that must always hold true during execution).

### 3. 🔍 Concrete Walkthrough / Trace Example
- Provide a concrete, minimal trace (e.g. small code snippet, dry-run trace table with sample input values, or state progression).
- Show the exact intermediate values at each step rather than speaking in vague generalities.

### 4. ⚠️ Edge Cases, Failure Modes & Common Misconceptions
- What boundary conditions cause errors, memory issues, or performance drops (e.g., null pointers, stack overflow, worst-case complexity)?
- Point out the specific trap where students lose marks in university exams.

### 5. 📝 University Exam Blueprint
- **2-Marks Precision Answer:** Exactly what to write in 2-3 lines to get full marks.
- **5/10-Marks Architecture Plan:** Key subheadings, essential diagram layout, and scoring keywords examiners look for.`;
    } else if (data.action === "revision") {
      taskPrompt = `Generate a high-density, logical Revision Brief for "${data.topicTitle}" (Unit ${data.unitNumber}, ${data.subjectTitle}):
${data.context ? `Study Material Grounding:\n${data.context.slice(0, 3000)}` : ""}

Structure:
### 1. 📌 Core Axioms & Invariants (2-Marks Blueprint)
- Exact technical definitions, formulas, and operational constraints.

### 2. ⚖️ Comparison & Trade-off Matrix
- Markdown comparison table evaluating ${data.topicTitle} against its primary alternative or related concept across logical parameters: Time Complexity, Space Complexity, Working Principle, Advantages, Disadvantages, Primary Use Case.

### 3. ⚡ Causal Flow / Execution Rules
- 3 to 5 critical rules that govern how this concept executes under the hood.

### 4. 🚫 Examiner Trap Warnings
- 3 common logical errors or incomplete answers that examiners penalize.`;
    } else if (data.action === "quiz") {
      taskPrompt = `Generate a rigorous 10-Question MCQ practice set for "${data.topicTitle}" from Unit ${data.unitNumber} of ${data.subjectTitle}.

LOGICAL CRITERIA:
- Questions must test deep understanding of mechanism, tracing, trade-offs, and boundary conditions — NOT trivial rote trivia.
- Distribution:
  * 4 Conceptual/Definition Questions (core principle, properties, and invariants).
  * 4 Mechanism/Trace Questions (predict output, evaluate conditions, or identify state change).
  * 2 Analytical/Problem-Solving Questions (trade-offs, worst-case scenarios, or counter-examples).
- Distractors (incorrect options) must represent genuine, common student misconceptions rather than obvious filler options.
- Explanations must provide deductive reasoning explaining why the correct choice is logically necessary and why the main distractor fails.

Study Material:
${data.context ? data.context.slice(0, 5000) : `${data.topicTitle} from ${data.subjectTitle}`}

Output MUST be a single raw JSON array without markdown formatting or code fences:
[
  {
    "prompt": "Question text here?",
    "difficulty": "easy" | "medium" | "hard",
    "topic_title": "${data.topicTitle}",
    "explanation": "Deductive logical explanation of why option is correct and alternatives are incorrect.",
    "options": [
      { "text": "Option A", "is_correct": true },
      { "text": "Option B", "is_correct": false },
      { "text": "Option C", "is_correct": false },
      { "text": "Option D", "is_correct": false }
    ]
  }
]`;
    } else {
      // Default: "ask"
      taskPrompt = `Student Query: "${data.query || "Please explain this topic."}"
Syllabus Context: ${data.subjectTitle} > Unit ${data.unitNumber}: ${data.topicTitle}.
${data.context ? `Grounding Material:\n${data.context.slice(0, 3500)}` : ""}

Answer using this first-principles logical structure:
1. **Direct Answer:** Direct, unambiguous answer in the first 1-2 sentences.
2. **Logical Justification & Mechanism:** Why this is true from first principles, tracing cause to effect.
3. **Illustrative Example / Trace:** Minimal concrete walkthrough or code snippet showing the concept in action.
4. **Key Takeaway for Exams:** What examiners specifically look for regarding this question.`;
    }

    const systemPrompt = `You are Sparky, the elite AI Academic Study Coach for ${data.courseTitle} students.
You combine the pedagogical clarity of Richard Feynman with the analytical precision of a computer science professor.

CORE PEDAGOGICAL PRINCIPLES:
1. Reason from First Principles: Never state a conclusion without explaining WHY it holds and WHAT problem it solves.
2. Causal Logic: Always show the chain of causation (Input -> Condition -> State Transformation -> Output).
3. Concrete Over Abstract: Always support conceptual statements with minimal code, dry-run traces, or sample values.
4. Exam Precision: Align answers with university examination rubrics (marking schemes, keyword density, diagrams).
5. Tone: ${langInstruction}
6. Zero Hallucination: Never fabricate past paper questions, non-existent syllabus terms, or speculative claims.`;

    // 3. Fallback if GEMINI_API_KEY is not configured
    if (!apiKey) {
      if (data.action === "quiz") {
        return {
          success: true,
          modelUsed: "local-curated-generator",
          action: data.action,
          isDemoFallback: true,
          content: `Generated 10 syllabus-calibrated practice questions for Unit ${data.unitNumber}: ${data.topicTitle}.`,
          quiz: getDeterministicFallbackQuiz(data),
        };
      }

      return {
        success: true,
        modelUsed: "local-curriculum-engine",
        action: data.action,
        isDemoFallback: true,
        content: getDeterministicFallbackAnswer(data),
      };
    }

    // 4. Live Gemini API Call with verified model list and auto-fallback
    const candidateModels = [
      configuredModel,
      "gemini-flash-lite-latest",
      "gemini-3.5-flash-lite",
      "gemini-flash-latest",
      "gemini-3.8-flash",
      "gemini-3.7-flash",
      "gemini-3.6-flash",
    ].filter((v, i, a) => Boolean(v) && a.indexOf(v) === i);

    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout per candidate model

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${systemPrompt}\n\n${taskPrompt}` }],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 2048,
              ...(data.action === "quiz" ? { responseMimeType: "application/json" } : {}),
            },
          }),
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          const errorText = await res.text();
          console.warn(
            `Gemini API model ${model} returned error (${res.status}):`,
            errorText.slice(0, 200),
          );

          // If 404, 429, 500, 503, continue trying the other candidate models
          continue;
        }

        const json = await res.json();
        const textResponse =
          json.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response generated by the AI model.";

        // If quiz generation, parse and validate JSON
        if (data.action === "quiz") {
          try {
            const cleanedJson = textResponse
              .replace(/^```json\s*/i, "")
              .replace(/^```\s*/i, "")
              .replace(/\s*```$/i, "")
              .trim();
            const parsed = JSON.parse(cleanedJson);
            if (Array.isArray(parsed) && parsed.length >= 5) {
              return {
                success: true,
                modelUsed: model,
                action: data.action,
                content: `Successfully generated ${parsed.length} syllabus-aligned practice questions for Unit ${data.unitNumber}.`,
                quiz: parsed as GeneratedQuizQuestion[],
              };
            }
          } catch (jsonErr) {
            console.warn(
              "Failed to parse Gemini quiz JSON, trying next model or fallback:",
              jsonErr,
            );
            continue;
          }
        }

        return {
          success: true,
          modelUsed: model,
          action: data.action,
          content: textResponse,
        };
      } catch (err: unknown) {
        console.warn(`Call failed for model ${model}:`, err);
        // Continue to next candidate model
        continue;
      }
    }

    return {
      success: true,
      modelUsed: "local-curriculum-engine",
      action: data.action,
      isDemoFallback: true,
      content: getDeterministicFallbackAnswer(data),
      quiz: data.action === "quiz" ? getDeterministicFallbackQuiz(data) : undefined,
    };
  });

function extractKeyPointsFromContext(context?: string | null): {
  definitions: string[];
  points: string[];
} {
  const definitions: string[] = [];
  const points: string[] = [];
  if (!context) return { definitions, points };

  const lines = context.split("\n");
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("### Q") || line.startsWith("**Model Answer:**")) {
      definitions.push(
        line
          .replace(/^###\s*Q\d+\.\s*(\[\d+(?:\/\d+)?\s*Marks\]\s*)?/i, "")
          .replace(/^\*\*Model Answer:\*\*\s*/i, ""),
      );
    } else if (
      line.startsWith("- **") ||
      line.startsWith("1. **") ||
      line.startsWith("2. **") ||
      line.startsWith("3. **")
    ) {
      points.push(line.replace(/^[-*+]\s*/, ""));
    }
  }

  return { definitions, points };
}

export function getDeterministicFallbackAnswer(
  data: Partial<GeminiAssistantInputType> & {
    topicTitle: string;
    unitNumber: number;
    subjectTitle: string;
  },
): string {
  const { definitions, points } = extractKeyPointsFromContext(data.context);
  const coreDef =
    definitions[0] ||
    points[0] ||
    `${data.topicTitle} is an essential technical concept within ${data.subjectTitle} (Unit ${data.unitNumber}).`;
  const keyMechanisms = points.slice(0, 4);

  if (data.language === "hinglish") {
    if (data.action === "explain") {
      return `### 📘 ${data.topicTitle} — First-Principles Logical Breakdown
**Syllabus Context:** ${data.subjectTitle} · Unit ${data.unitNumber}

#### 1. 🎯 Exact Definition & The Problem It Solves
> **Formal Definition:** ${coreDef.replace(/\*\*/g, "")}
* **Core Problem Statement:** ${data.topicTitle} ke bina system me deterministic state transition, memory bounds, ya computational efficiency maintain karna complex ho jata hai. Ye specific bottleneck ko resolve karne ke liye standard computer science curriculum me introduce kiya gaya hai.

#### 2. ⚙️ Step-by-Step Mechanism
${
  keyMechanisms.length > 0
    ? keyMechanisms.map((p, idx) => `**Step ${idx + 1}:** ${p}`).join("\n\n")
    : `1. **Initialization:** System parameters aur boundary limits define hote hain.\n2. **Execution:** Pre-defined condition logic ke according deterministic state transformations hoti hain.\n3. **Verification & Output:** Result syllabus constraints ke according return hota hai.`
}

#### 3. 🔍 Concrete Walkthrough & Invariants
* **Key Invariant:** Har state transition par data integrity aur type invariants maintain rehne chahiye.
* **Trace Logic:** Execution sequence sequentially evaluate hoti hai — stopping conditions reach hone par hi loop ya call stack terminate hota hai.

#### 4. ⚠️ Common Edge Cases & Exam Pitfalls
* **Boundary Pitfalls:** Off-by-one errors, null/empty state checks, aur buffer limits mention na karne par marks deduct hote hain.
* **Scoring Trap:** Vague generic sentences ke bajaye exact technical terminology aur standard variable names use karein.

#### 5. 📝 University Exam Blueprint
* **2-Marks:** Direct 2-sentence formal definition + 1 primary formula/invariant.
* **5/10-Marks:** Formal Definition ➔ Labeled Architecture Diagram ➔ Step-by-Step Execution Sequence ➔ Concrete Example Trace ➔ Trade-off Table.`;
    }

    if (data.action === "revision") {
      return `### ⚡ High-Yield Logical Revision: ${data.topicTitle}
**${data.subjectTitle} · Unit ${data.unitNumber}**

| Dimension | Logical Specification |
| :--- | :--- |
| **Topic** | ${data.topicTitle} |
| **Primary Invariant** | ${coreDef.slice(0, 110).replace(/\*\*/g, "")}... |
| **Exam Weightage** | 2-Marks (Definition) & 5-Marks (Architecture/Mechanism) |

#### 📌 Core Rules & Formulations
${
  keyMechanisms.length > 0
    ? keyMechanisms.map((p) => `- **Rule:** ${p}`).join("\n")
    : `- Formal mathematical/operational definition exact terms ke saath likhein.\n- Comparison tables me Time Complexity ($O(1), O(n)$) aur Space Footprint zaroor mention karein.\n- Boundary conditions explicitly document karein.`
}

#### 🚫 Examiner Red Flags (Marks Deducted If Missing)
1. Missing exact technical nomenclature in the initial definition.
2. Abstract hand-waving without clear input-to-output causal mechanics.
3. Omitting worst-case complexity or edge cases.`;
    }

    return `### 💡 Analytical Answer: "${data.query || data.topicTitle}"
**Syllabus Context:** Unit ${data.unitNumber} — ${data.subjectTitle}

**Direct Answer:**
${coreDef}

**Logical Justification:**
${keyMechanisms.length > 0 ? keyMechanisms.join(" ") : `${data.topicTitle} operates under deterministic computational rules defined in the ${data.subjectTitle} syllabus.`}

**University Exam Blueprint:**
1. ✅ Lead with the unambiguous formal definition.
2. ✅ Trace the causal mechanism step-by-step.
3. ✅ Conclude with 1 concrete technical example showing inputs and outputs.`;
  }

  if (data.language === "hi") {
    return `### 📘 ${data.topicTitle} — विश्लेषणात्मक अध्ययन गाइड
**पाठ्यक्रम:** ${data.subjectTitle} (Unit ${data.unitNumber})

#### 1. 🎯 सटीक परिभाषा और मूल उद्देश्य
> **परिभाषा:** ${coreDef.replace(/\*\*/g, "")}
* **मूल समस्या (The Problem It Solves):** ${data.topicTitle} का मुख्य उद्देश्य system में computational efficiency, modularity और deterministic state transitions सुनिश्चित करना है।

#### 2. ⚙️ चरणबद्ध कार्यप्रणाली (Step-by-Step Mechanism)
${
  keyMechanisms.length > 0
    ? keyMechanisms.map((p, idx) => `**चरण ${idx + 1}:** ${p}`).join("\n\n")
    : `1. **प्रारंभ (Input):** आवश्यक parameters और constraints को initialize किया जाता है।\n2. **प्रक्रिया (Execution):** नियमों के अनुसार state transformation होती है।\n3. **परिणाम (Output):** पूर्व-निर्धारित शर्तों के अनुसार अंतिम परिणाम प्राप्त होता है।`
}

#### 3. ⚠️ मुख्य सीमाएं (Edge Cases) और परीक्षा सुझाव
* **सावधानी:** Boundary conditions (जैसे null values, stack overflow या limit conditions) स्पष्ट रूप से लिखें।
* **2 अंक:** 2-3 पंक्तियों में सटीक तकनीकी परिभाषा।
* **5/10 अंक:** परिभाषा ➔ नामांकित चित्र (Labeled Diagram) ➔ कार्यप्रणाली ➔ तुलनात्मक तालिका।`;
  }

  // Default English
  return `### 📘 ${data.topicTitle} — First-Principles Analytical Breakdown
**Curriculum:** ${data.courseTitle} > ${data.subjectTitle} > Unit ${data.unitNumber}

#### 1. 🎯 Formal Definition & Operational Objective
> **Definition:** ${coreDef.replace(/\*\*/g, "")}
* **The Problem It Solves:** ${data.topicTitle} addresses core computational bottlenecks and ensures deterministic state management within ${data.subjectTitle}. Without it, managing state transitions, memory overhead, or modular abstraction becomes mathematically intractable.

#### 2. ⚙️ Step-by-Step Causal Mechanism
${
  keyMechanisms.length > 0
    ? keyMechanisms.map((p, idx) => `**Phase ${idx + 1}:** ${p}`).join("\n\n")
    : `1. **Pre-condition Setup:** Inputs and boundary constraints are validated.\n2. **Algorithmic State Transition:** Operations execute under strict invariants.\n3. **Post-condition Verification:** Outputs conform to theoretical constraints.`
}

#### 3. 🔍 Concrete Walkthrough & Invariants
* **Invariant:** Every intermediate operation must maintain data structure integrity and type constraints.
* **Predictable Execution:** Execution terminates deterministically once termination criteria are satisfied.

#### 4. ⚠️ Edge Cases, Failure Modes & Examiner Traps
* **Boundary Conditions:** Examiners strictly penalize answers that overlook empty states, index bounds, or resource saturation.
* **Precision Rule:** Use formal academic nomenclature rather than ambiguous colloquial descriptions.

#### 5. 📝 University Exam Scoring Blueprint
* **2-Marks:** Direct formal definition + primary complexity metric ($O(1), O(n)$, etc.).
* **5-Marks:** Formal Definition ➔ Labeled Architecture/Block Diagram ➔ Step-by-Step Trace ➔ Real-World Case.
* **10-Marks:** Comprehensive mathematical/code formulation, failure mode analysis, and a structured comparison matrix.`;
}

function extractQuestionsFromNotes(
  notesText: string,
  _topicTitle: string,
): Array<{ prompt: string; answer: string }> {
  const questions: Array<{ prompt: string; answer: string }> = [];
  if (!notesText) return questions;
  const lines = notesText.split("\n");
  let currentQ: string | null = null;
  let currentAnswer = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.match(/^###\s*Q\d+\./i)) {
      if (currentQ && currentAnswer) {
        questions.push({
          prompt: currentQ.replace(/^###\s*Q\d+\.\s*(\[\d+(?:\/\d+)?\s*Marks\]\s*)?/i, "").trim(),
          answer: currentAnswer.trim(),
        });
      }
      currentQ = line;
      currentAnswer = "";
    } else if (currentQ) {
      if (line.startsWith("**Model Answer:**") || line.startsWith("###")) {
        currentAnswer += " " + line.replace("**Model Answer:**", "").trim();
      } else if (line.startsWith("## ") || line.startsWith("---")) {
        if (currentQ && currentAnswer) {
          questions.push({
            prompt: currentQ.replace(/^###\s*Q\d+\.\s*(\[\d+(?:\/\d+)?\s*Marks\]\s*)?/i, "").trim(),
            answer: currentAnswer.trim(),
          });
          currentQ = null;
          currentAnswer = "";
        }
      } else if (line) {
        currentAnswer += " " + line;
      }
    }
  }

  if (currentQ && currentAnswer) {
    questions.push({
      prompt: currentQ.replace(/^###\s*Q\d+\.\s*(\[\d+(?:\/\d+)?\s*Marks\]\s*)?/i, "").trim(),
      answer: currentAnswer.trim(),
    });
  }

  return questions;
}

export function getDeterministicFallbackQuiz(
  data: Pick<GeminiAssistantInputType, "topicTitle" | "unitNumber" | "subjectTitle"> &
    Partial<GeminiAssistantInputType>,
): GeneratedQuizQuestion[] {
  const extracted = extractQuestionsFromNotes(data.context || "", data.topicTitle);
  const quiz: GeneratedQuizQuestion[] = [];

  // Collect keyword phrases from the context for natural distractors
  const contextKeywords: string[] = [];
  if (data.context) {
    const matches = data.context.match(/\*\*([^*]{5,60})\*\*/g) || [];
    for (const m of matches) {
      const cleaned = m.replace(/\*\*/g, "").trim();
      if (cleaned && cleaned.length > 4 && !contextKeywords.includes(cleaned)) {
        contextKeywords.push(cleaned);
      }
    }
  }
  // Simple topic-related filler distractors (generic but relevant sounding)
  const topicWord = data.topicTitle.split(" ")[0] || "System";
  const genericDistractors = [
    `A manual paper-based method unrelated to ${topicWord}`,
    `A hardware component used only for data storage`,
    `An external audit tool that bypasses ${topicWord}`,
    `A legacy technique used before computers were introduced`,
    `None of the above`,
  ];

  /** Pull a short, readable answer snippet from a raw answer string */
  function cleanAnswer(raw: string, maxLen = 90): string {
    let t = raw
      .replace(/^[-*+]\s*/, "")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .trim();
    if (t.length > maxLen) {
      const firstSent = t.split(/[.?!]/)[0].trim();
      t = firstSent && firstSent.length > 15 ? firstSent : t.slice(0, maxLen - 3) + "...";
    }
    return t;
  }

  if (extracted.length >= 3) {
    // Build a pool of short answer texts to use as distractors
    const answerPool = extracted.map((e) => cleanAnswer(e.answer));

    for (let i = 0; i < Math.min(10, extracted.length); i++) {
      const item = extracted[i];
      const correctText = cleanAnswer(item.answer);

      // Pick 3 distractors: prefer other answers from notes, then keywords, then generic
      const otherFromNotes = answerPool
        .filter((_, idx) => idx !== i && answerPool[idx] !== correctText)
        .slice(0, 2);
      const keywordDistractors = contextKeywords
        .filter((k) => k !== correctText && !otherFromNotes.includes(k))
        .slice(0, 2);
      const allDistractors = [...otherFromNotes, ...keywordDistractors, ...genericDistractors]
        .filter((d) => d !== correctText)
        .slice(0, 3);

      const options = [
        { text: correctText, is_correct: true },
        { text: allDistractors[0] || genericDistractors[0], is_correct: false },
        { text: allDistractors[1] || genericDistractors[1], is_correct: false },
        { text: allDistractors[2] || genericDistractors[2], is_correct: false },
      ].sort(() => 0.5 - Math.random());

      // Make the question prompt simpler and more readable
      const prompt = item.prompt.endsWith("?") ? item.prompt : `${item.prompt}?`;

      quiz.push({
        prompt,
        difficulty: i < 5 ? "easy" : i < 8 ? "medium" : "hard",
        topic_title: data.topicTitle,
        explanation: cleanAnswer(item.answer, 220),
        options,
      });
    }
  }

  // If fewer than 10 questions were generated from notes, fill with academically rigorous questions
  const simpleFillers: Array<{ q: string; correct: string; wrong: string[]; explanation: string }> =
    [
      {
        q: `In the study of ${data.subjectTitle}, what is the primary operational objective of ${data.topicTitle}?`,
        correct: `To provide a structured, deterministic mechanism to manage state and solve domain problems in ${data.topicTitle}`,
        wrong: [
          `To bypass memory protection bounds and execute instructions without verification`,
          `To eliminate all CPU cache requirements across operations`,
          `To act exclusively as an offline archival format without runtime execution`,
        ],
        explanation: `${data.topicTitle} is formally introduced in Unit ${data.unitNumber} to establish predictable, disciplined computational execution under verified system constraints.`,
      },
      {
        q: `Which of the following best defines a key invariant or property of ${data.topicTitle}?`,
        correct: `Maintaining valid state transitions and satisfying boundary conditions during execution`,
        wrong: [
          `Unrestricted modification of read-only operating system memory buffers`,
          `Arbitrary execution order with non-deterministic output for identical inputs`,
          `Guaranteed zero time complexity regardless of problem size or resource limits`,
        ],
        explanation: `A fundamental principle of ${data.topicTitle} is preserving deterministic behavior and ensuring that data invariants remain consistent throughout the operation.`,
      },
      {
        q: `When analyzing trade-offs for ${data.topicTitle}, what is an essential architectural consideration?`,
        correct: `Balancing computational throughput and resource utilization against worst-case limits`,
        wrong: [
          `Assuming best-case performance will hold across all possible input distributions`,
          `Ignoring asymptotic complexity ($O(n), O(\\log n)$) entirely`,
          `Evaluating architectural quality solely by the total line count of the source code`,
        ],
        explanation: `Rigorous computer science analysis requires evaluating both theoretical asymptotic bounds and practical space/time constraints for ${data.topicTitle}.`,
      },
      {
        q: `What is a common error or misconception students make when answering questions on ${data.topicTitle}?`,
        correct: `Failing to account for boundary limits, null states, or termination conditions`,
        wrong: [
          `Using standard academic definitions and labeled architectural diagrams`,
          `Stating explicit time and space complexity metrics in examination answers`,
          `Structuring explanations with sequential input-to-output causal logic`,
        ],
        explanation: `Examiners heavily penalize answers that treat algorithms or systems as abstract black boxes without demonstrating how edge cases and termination conditions are handled.`,
      },
    ];

  let fillerIdx = 0;
  while (quiz.length < 10) {
    const filler = simpleFillers[fillerIdx % simpleFillers.length];
    fillerIdx++;
    const idx = quiz.length + 1;
    quiz.push({
      prompt: filler.q,
      difficulty: idx <= 5 ? "easy" : idx <= 8 ? "medium" : "hard",
      topic_title: data.topicTitle,
      explanation: filler.explanation,
      options: [
        { text: filler.correct, is_correct: true },
        { text: filler.wrong[0], is_correct: false },
        { text: filler.wrong[1], is_correct: false },
        { text: filler.wrong[2], is_correct: false },
      ].sort(() => 0.5 - Math.random()),
    });
  }

  return quiz;
}
