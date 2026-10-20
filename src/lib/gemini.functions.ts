/**
 * XRounder Gemini AI Study Assistant Server Integration
 *
 * Runs strictly server-side using TanStack Start createServerFn.
 * Protects GEMINI_API_KEY from ever reaching the client browser.
 * Configurable model via GEMINI_MODEL (defaults to free-tier gemini-1.5-flash / gemini-2.0-flash).
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GeminiAssistantInput = z.object({
  action: z.enum(["ask", "explain", "revision", "quiz"]).default("ask"),
  query: z.string().trim().max(1000).optional(),
  topicTitle: z.string().trim().min(1).max(200),
  unitNumber: z.number().int().min(1).max(10),
  subjectTitle: z.string().trim().min(1).max(200),
  courseTitle: z.string().trim().max(200).optional().default("Bachelor of Computer Applications (BCA)"),
  context: z.string().max(8000).optional(),
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
  .inputValidator((input: unknown) => GeminiAssistantInput.parse(input))
  .handler(async ({ data }): Promise<GeminiAssistantResponse> => {
    const apiKey = process.env.GEMINI_API_KEY;
    const configuredModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    // 1. Language instruction
    const langInstruction =
      data.language === "hi"
        ? "Respond in clear, accessible Hindi (Devanagari script) with English technical terms in parentheses. Keep it simple and direct."
        : data.language === "hinglish"
          ? "Respond in natural conversational Hinglish — exactly the way Indian college students actually talk to each other. Use relaxed Roman-script Hindi words like 'yaar', 'bhai', 'dekho', 'basically', 'samajh lo', 'easy hai', 'exam me aata hai', 'ek baar padh lo' freely mixed with English technical terms. Do NOT write formal Hindi or translate word-by-word. Sound like a helpful senior student explaining, not a textbook."
          : "Respond in clear, academic, easy-to-understand English suitable for university BCA examinations.";

    // 2. Action-specific prompts
    let taskPrompt = "";
    if (data.action === "explain") {
      taskPrompt = `Explain the syllabus topic "${data.topicTitle}" from Unit ${data.unitNumber} of ${data.subjectTitle}.
Use the study material below as ground truth.
Provide:
1. Clear 2-sentence definition (with exact technical terms).
2. Step-by-step working / core mechanism in simple words.
3. One real-world relatable analogy a student can remember.
4. 3 most common 2-mark and 5-mark exam questions from this topic.
Keep formatting clean using Markdown with bold keywords. Keep language natural and easy to understand.
${data.context ? `\nReference Study Material:\n${data.context.slice(0, 4000)}` : ""}`;
    } else if (data.action === "revision") {
      taskPrompt = `Create an exam-ready Quick Revision Brief for "${data.topicTitle}" (Unit ${data.unitNumber}, ${data.subjectTitle}):
1. Key Definitions (2-Marks format).
2. Comparison Table or Architecture Points (5-Marks format).
3. 3 High-Yield Formulae / Rules / Concepts examiners check.
4. What NOT to do in exam answers.`;
    } else if (data.action === "quiz") {
      taskPrompt = `Generate a 10-Question MCQ practice set for "${data.topicTitle}" from Unit ${data.unitNumber} of ${data.subjectTitle}.

IMPORTANT RULES:
- Questions must be based on the actual study material provided below. Do NOT invent topics not present in the material.
- Distribution: 5 Easy (direct definition/fact), 3 Medium (working/comparison), 2 Hard (application/analysis).
- All 4 options must be plausible, short (under 12 words each), and clearly related to the topic — NO nonsensical or corporate-jargon filler options.
- Correct answer must be directly supported by the study material.
- Explanation must be 1–2 sentences explaining why the answer is correct.

Study Material:
${data.context ? data.context.slice(0, 5000) : `${data.topicTitle} from ${data.subjectTitle}`}

Output MUST be a single raw JSON array without markdown formatting or code fences:
[
  {
    "prompt": "Question text here?",
    "difficulty": "easy" | "medium" | "hard",
    "topic_title": "${data.topicTitle}",
    "explanation": "1-2 sentence explanation of correct answer.",
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
      taskPrompt = `Student Question: "${data.query || "Please explain this topic."}"
Syllabus Context: ${data.subjectTitle} — Unit ${data.unitNumber}: ${data.topicTitle}.
Provide a direct, concise, and helpful answer grounded in this syllabus topic.
${data.context ? `Use this reference study material as ground truth:\n${data.context.slice(0, 3000)}` : ""}`;
    }

    const systemPrompt = `You are the XRounder AI Academic Study Coach for ${data.courseTitle}.
Syllabus Hierarchy: ${data.courseTitle} > ${data.subjectTitle} > Unit ${data.unitNumber} > ${data.topicTitle}.
Guidelines:
- Ground your answers in the official university curriculum.
- ${langInstruction}
- Never fabricate university past paper numbers or non-existent syllabus topics.
- Keep answers information-dense, structured, and geared towards high-scoring university exam preparation.`;

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
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-2.5-flash-lite",
    ].filter((v, i, a) => a.indexOf(v) === i);

    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

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
              temperature: data.action === "quiz" ? 0.2 : 0.4,
              maxOutputTokens: 2048,
            },
          }),
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          const errorText = await res.text();
          console.warn(`Gemini API model ${model} returned error:`, res.status, errorText);

          // If 404 (model not found), try next candidate model
          if (res.status === 404) {
            continue;
          }

          if (res.status === 429) {
            return {
              success: false,
              modelUsed: model,
              action: data.action,
              content:
                "⚠️ Gemini API free-tier quota momentarily reached. Please wait 30 seconds and try again, or refer to the Study Material tab.",
              quiz: data.action === "quiz" ? getDeterministicFallbackQuiz(data) : undefined,
            };
          }

          return {
            success: false,
            modelUsed: model,
            action: data.action,
            content: `AI Assistant unavailable (${res.status}). Falling back to verified syllabus guidance for Unit ${data.unitNumber}.\n\n${getDeterministicFallbackAnswer(data)}`,
            isDemoFallback: true,
            quiz: data.action === "quiz" ? getDeterministicFallbackQuiz(data) : undefined,
          };
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
            console.warn("Failed to parse Gemini quiz JSON, falling back to local set:", jsonErr);
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
      }
    }

    return {
      success: false,
      modelUsed: configuredModel,
      action: data.action,
      isDemoFallback: true,
      content: `Here is verified syllabus guidance for Unit ${data.unitNumber} (${data.topicTitle}):\n\n${getDeterministicFallbackAnswer(data)}`,
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
      definitions.push(line.replace(/^###\s*Q\d+\.\s*(\[\d+(?:\/\d+)?\s*Marks\]\s*)?/i, "").replace(/^\*\*Model Answer:\*\*\s*/i, ""));
    } else if (line.startsWith("- **") || line.startsWith("1. **") || line.startsWith("2. **") || line.startsWith("3. **")) {
      points.push(line.replace(/^[-*+]\s*/, ""));
    }
  }

  return { definitions, points };
}

function getDeterministicFallbackAnswer(data: GeminiAssistantInputType): string {
  const { definitions, points } = extractKeyPointsFromContext(data.context);
  const relevantDef = definitions[0] || points[0] || `${data.topicTitle} is an essential curriculum topic under Unit ${data.unitNumber} of ${data.subjectTitle}.`;
  const relevantKeyPoints = points.slice(0, 4);

  if (data.language === "hinglish") {
    if (data.action === "explain") {
      return `### 📘 ${data.topicTitle} — Simple Hinglish Breakdown

Yaar, ek baar isko ache se samajh lo — exam me aata hai ye definitely!

**Basically kya hai ye? (Core Idea):**
${data.topicTitle} — yeh topic **${data.subjectTitle}** ke Unit ${data.unitNumber} me hai.
${relevantDef ? `> **Simple definition:** ${relevantDef.replace(/\*\*/g, "")}` : `Iska matlab hai: ${data.topicTitle} ek system/concept hai jo ${data.subjectTitle} me use hota hai.`}

**Exam ke liye important points (pad lo bhai):**
${relevantKeyPoints.length > 0
  ? relevantKeyPoints.map((p) => `- ${p}`).join("\n")
  : `- Pehle exact definition yaad kar lo — 2 marks pakke milenge.\n- Diagram ya table bana ke answer likho — 5/10 marks me maximum score aata hai.\n- Real-life example do — examiner khush hota hai isse.`}

**Exam me answer kaise likhein:**
1. **2 Marks wala:** Direct definition + ek key point — 2-3 lines kafi hain.
2. **5 Marks wala:** Definition → Diagram/Points → Real example — structured rakho.
3. **10 Marks wala:** Full explanation + comparison table + diagram — yeh sab daalo.

*(Hinglish me live AI chat ke liye valid Gemini API key chahiye — tab ye aur better explain karega!)*`;
    }

    if (data.action === "revision") {
      return `### ⚡ Last-Minute Revision: ${data.topicTitle}
**${data.subjectTitle} · Unit ${data.unitNumber}**

Bhai last minute me bhi ye padh ke exam me likho — kaam aayega! 💪

- **2-Marks me kya likhein:** ${relevantDef.slice(0, 180).replace(/\*\*/g, "")}
- **5-Marks ka format:**
${relevantKeyPoints.length > 0 ? relevantKeyPoints.map((p) => `  * ${p}`).join("\n") : "  * Definition ➔ Diagram ya numbered points ➔ Real-world example."}
- **Dhyan rakho (common mistake):** Vague ya general likha toh marks cut hote hain — syllabus ke exact technical words use karo.

*(Live AI revision ke liye valid API key chahiye!)*`;
    }

    return `### 💡 Sparky ka jawab: "${data.query || data.topicTitle}"
**Unit ${data.unitNumber} — ${data.subjectTitle}**

${relevantDef ? relevantDef : `${data.topicTitle} ek important topic hai Unit ${data.unitNumber} me — notes me iske baare me pura cover hai.`}

**Aage kya karo:**
1. 📖 Study Material tab me iska full article padho.
2. ✅ Practice Quiz me 10 MCQs solve karo — accuracy check hoga.
3. 🎯 AI se phir se poocho kuch specific doubt ho toh!`;
  }

  if (data.language === "hi") {
    return `### 📘 ${data.topicTitle} — सरल हिंदी गाइड
**विषय:** ${data.subjectTitle} (Unit ${data.unitNumber})

**मुख्य बात (Core Concept):**
${data.topicTitle}, ${data.subjectTitle} के Unit ${data.unitNumber} का एक जरूरी topic है।
${relevantDef ? `> ${relevantDef.replace(/\*\*/g, "")}` : ""}

**परीक्षा के लिए जरूरी points:**
${relevantKeyPoints.length > 0
  ? relevantKeyPoints.map((p) => `• ${p}`).join("\n")
  : `• इस topic की सही definition याद रखें।\n• परीक्षा में diagram और table जरूर बनाएं — ज्यादा marks मिलते हैं।\n• Real-life example देने से answer strong बनता है।`}

**Answer kaise likhein:**
1. **2 अंक:** सीधी definition + एक key point — 2-3 lines में।
2. **5 अंक:** Definition → Diagram/Points → Example → Conclusion।
3. **10 अंक:** पूरी explanation + comparison table + labeled diagram।`;
  }

  // Default English
  return `### 📘 Concept Breakdown: ${data.topicTitle}
**Course Hierarchy:** ${data.courseTitle} > ${data.subjectTitle} > Unit ${data.unitNumber}

**1. Core Definition:**
${data.topicTitle} is a key topic in Unit ${data.unitNumber} of **${data.subjectTitle}**.
${relevantDef ? `> ${relevantDef.replace(/\*\*/g, "")}` : ""}

**2. Key Architectural & Examination Principles:**
${relevantKeyPoints.length > 0
  ? relevantKeyPoints.map((p) => `- ${p}`).join("\n")
  : `- Master the foundational definitions and boundary conditions for ${data.topicTitle}.\n- Structure 5-mark and 10-mark university answers with neat architectural diagrams and comparison tables.`}

**3. University Exam Strategy:**
1. **2-Marks:** Lead with exact academic definition without conversational fluff.
2. **5-Marks:** Provide definition, block diagram, 4 detailed characteristics, and practical real-world example.
3. **10/15-Marks:** Exhaustive architectural breakdown, equations/diagrams, and comparison matrix.`;
}

function extractQuestionsFromNotes(
  notesText: string,
  topicTitle: string,
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
  data: Pick<GeminiAssistantInputType, "topicTitle" | "unitNumber" | "subjectTitle"> & Partial<GeminiAssistantInputType>
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
    let t = raw.replace(/^[-*+]\s*/, "").replace(/\*\*([^*]+)\*\*/g, "$1").trim();
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
      const prompt = item.prompt.endsWith("?")
        ? item.prompt
        : `${item.prompt}?`;

      quiz.push({
        prompt,
        difficulty: i < 5 ? "easy" : i < 8 ? "medium" : "hard",
        topic_title: data.topicTitle,
        explanation: cleanAnswer(item.answer, 220),
        options,
      });
    }
  }

  // If fewer than 10 questions were generated from notes, fill with simple topic-based questions
  const simpleFillers: Array<{ q: string; correct: string; wrong: string[] }> = [
    {
      q: `What is the main purpose of ${data.topicTitle}?`,
      correct: `It helps manage and organize ${data.topicTitle.toLowerCase()} activities efficiently`,
      wrong: [
        `It is used only for hardware maintenance`,
        `It replaces the entire ${data.subjectTitle} curriculum`,
        `It is not related to ${data.subjectTitle}`,
      ],
    },
    {
      q: `${data.topicTitle} is a topic studied in which subject?`,
      correct: data.subjectTitle,
      wrong: [
        `Computer Hardware Repair`,
        `Digital Electronics`,
        `Advanced Database Systems`,
      ],
    },
    {
      q: `Which unit covers ${data.topicTitle}?`,
      correct: `Unit ${data.unitNumber}`,
      wrong: [
        `Unit ${data.unitNumber === 1 ? 2 : 1}`,
        `Unit ${data.unitNumber >= 4 ? 1 : 5}`,
        `This topic is not in the syllabus`,
      ],
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
      explanation: `${filler.correct} — this is a basic fact about ${data.topicTitle} in Unit ${data.unitNumber}.`,
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
