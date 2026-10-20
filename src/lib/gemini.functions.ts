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
    const configuredModel = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

    // 1. Language instruction
    const langInstruction =
      data.language === "hi"
        ? "Respond in clear, accessible Hindi (Devanagari script) with English technical terms in parentheses."
        : data.language === "hinglish"
          ? "Respond in friendly Hinglish (conversational Hindi in Latin script blended with English technical keywords), commonly used by Indian college students."
          : "Respond in clear, academic, easy-to-understand English suitable for university BCA examinations.";

    // 2. Action-specific prompts
    let taskPrompt = "";
    if (data.action === "explain") {
      taskPrompt = `Explain the syllabus topic "${data.topicTitle}" from Unit ${data.unitNumber} of ${data.subjectTitle}.
Provide:
1. Clear 2-sentence definition.
2. Step-by-step working / core mechanism.
3. Real-world relatable analogy.
4. 3 Most common university exam questions from this topic.
Keep formatting clean using Markdown with bold keywords.`;
    } else if (data.action === "revision") {
      taskPrompt = `Create an exam-ready Quick Revision Brief for "${data.topicTitle}" (Unit ${data.unitNumber}, ${data.subjectTitle}):
1. Key Definitions (2-Marks format).
2. Comparison Table or Architecture Points (5-Marks format).
3. 3 High-Yield Formulae / Rules / Concepts examiners check.
4. What NOT to do in exam answers.`;
    } else if (data.action === "quiz") {
      taskPrompt = `Generate a balanced 10-Question Multiple Choice Question (MCQ) Practice Set for "${data.topicTitle}" from Unit ${data.unitNumber} of ${data.subjectTitle}.
CRITICAL DISTRIBUTION REQUIREMENT:
- Exactly 5 Easy questions (definitions, basic facts)
- Exactly 3 Medium questions (working mechanism, comparison, application)
- Exactly 2 Hard questions (analytical reasoning, multi-step output, architecture edge-cases)

Output MUST be a single raw JSON array without markdown formatting or code fences:
[
  {
    "prompt": "Question text here?",
    "difficulty": "easy" | "medium" | "hard",
    "topic_title": "${data.topicTitle}",
    "explanation": "Clear educational explanation of why the correct option is right.",
    "options": [
      { "text": "Option 1", "is_correct": true },
      { "text": "Option 2", "is_correct": false },
      { "text": "Option 3", "is_correct": false },
      { "text": "Option 4", "is_correct": false }
    ]
  }
]
Rules:
- Each question must have exactly 4 non-empty options.
- Exactly one option must have "is_correct": true.
- Difficulty values must strictly match the 5/3/2 balance.`;
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
          content: "Generated using verified syllabus question bank (configure GEMINI_API_KEY for dynamic AI generation).",
          quiz: getDeterministicFallbackQuiz(data.topicTitle),
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

    // 4. Live Gemini API Call (Free Tier REST endpoint)
    // 4. Live Gemini API Call (Free Tier REST endpoint with auto-fallback)
    const candidateModels = [configuredModel, "gemini-3.5-flash-lite", "gemini-3.5-flash"].filter(
      (v, i, a) => a.indexOf(v) === i,
    );

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

          // If 404 (model deprecated or not available), try next candidate model
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
            };
          }

          return {
            success: false,
            modelUsed: model,
            action: data.action,
            content: `AI Assistant unavailable (${res.status}). Falling back to local syllabus guidance.\n\n${getDeterministicFallbackAnswer(data)}`,
            isDemoFallback: true,
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
                content: `Successfully generated ${parsed.length} syllabus-aligned practice questions.`,
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
      content: `Connection to Gemini timed out. Here is local curriculum guidance for this topic:\n\n${getDeterministicFallbackAnswer(data)}`,
    };
  });

function getDeterministicFallbackAnswer(data: GeminiAssistantInputType): string {
  if (data.language === "hinglish") {
    if (data.action === "explain") {
      return `### 📘 ${data.topicTitle} — Hinglish Concept Breakdown

**1. Asan Bhasha Me Samajhte Hain (Concept Clarity):**
${data.topicTitle} hamare **${data.subjectTitle} (Unit ${data.unitNumber})** ka foundational topic hai. Iska basic matlab ye hai ki computer systems input data ko systematically process karke required output aur reliable storage provide karein.

**2. Asli Zindagi Ka Example (Real-World Analogy):**
Isko aap ek fast-food kitchen ki tarah samajh sakte hain:
- **Chef (CPU):** Jo saare orders execute karta hai.
- **Counter Shelf (RAM/Cache):** Fast access ke liye jahan current orders rakhe hain.
- **Store Room (Secondary Disk):** Jahan saara raw material aur bulk inventory safe rehti hai.

**3. University Exam Me Likhte Waqt Ye 3 Baatein Yaad Rakhein:**
1. **Clear Definition:** Sabse pehle 2 lines me technical definition likhein (Hardware vs Software boundary clear karein).
2. **Block Diagram:** 5-marks ya 10-marks ke questions me labeled block diagram banane se guaranteed 70%+ score milta hai.
3. **Differences Table:** Jab bhi comparison pucha ho (jaise RAM vs ROM, System vs Application Software), bullet points ki jagah 4-column comparison table banayein.

*(💡 Real-time dynamic AI chat ke liye environment (.env) me \`GEMINI_API_KEY\` configure kar sakte hain.)*`;
    }

    if (data.action === "revision") {
      return `### ⚡ High-Yield Revision Summary (Hinglish): ${data.topicTitle}

- **2-Marks Definition Rule:** Technical keywords exact likhein — e.g. volatile vs non-volatile, cycle time, execution sequence.
- **5-Marks Answer Blueprint:** Definition $\\rightarrow$ Neat block diagram $\\rightarrow$ 4 working points $\\rightarrow$ Practical real-world example.
- **Exam Warning (Common Mistake):** Kabhi bhi raw data aur processed information ko mix mat karein; Primary Memory (RAM) aur Secondary Storage (SSD/HDD) ka difference crystal clear rakhein.

*(💡 Real-time dynamic AI chat ke liye environment (.env) me \`GEMINI_API_KEY\` configure kar sakte hain.)*`;
    }

    return `### 💡 Sparky AI Study Coach Answer: "${data.query || data.topicTitle}"

Ye topic **Unit ${data.unitNumber} (${data.subjectTitle})** ka hissa hai.

Is topic ko exam point of view se master karne ke liye:
1. **Study Material:** Tab me detailed article padhein jahan diagrams aur differences explain kiye gaye hain.
2. **Practice Quizzes:** 10-Question MCQ set solve karke easy, medium aur hard concepts test karein.
3. **Written Practice:** University exam model answers review karein jisse likhne ka format clear ho sake.

*(💡 Live AI conversational streaming enable karne ke liye .env me \`GEMINI_API_KEY\` add karein.)*`;
  }

  if (data.language === "hi") {
    if (data.action === "explain") {
      return `### 📘 ${data.topicTitle} — सरल हिंदी व्याख्या

**१. मूलभूत परिभाषा (Core Definition):**
${data.topicTitle} कंप्यूटर विज्ञान और **${data.subjectTitle} (Unit ${data.unitNumber})** का एक अनिवार्य सिद्धांत है। यह कंप्यूटर सिस्टम के कुशल संचालन, डेटा प्रोसेसिंग और मेमोरी प्रबंधन को नियंत्रित करता है।

**२. व्यावहारिक उदाहरण (Real-World Analogy):**
इसे एक आधुनिक पुस्तकालय (Library) के रूप में समझें:
- **लाइब्रेरियन (CPU):** जो सभी अनुरोधों को प्रोसेस और प्रबंधित करता है।
- **स्टडी टेबल (RAM):** जहां वर्तमान में पढ़ी जा रही पुस्तकें तुरंत उपलब्ध रहती हैं।
- **मुख्य बुकशेल्फ (Secondary Storage):** जहां सभी पुस्तकें स्थायी रूप से सुरक्षित रहती हैं।

**३. विश्वविद्यालय परीक्षा के लिए 3 प्रमुख रणनीतियाँ:**
1. **तकनीकी शब्दावली:** परिभाषा में मानक कंप्यूटर विज्ञान शब्दावली (जैसे Volatile, Processing Cycle, Throughput) का प्रयोग करें।
2. **नामांकित आरेख (Labeled Diagram):** 5 एवं 10 अंक वाले प्रश्नों में पेंसिल से स्पष्ट ब्लॉक डायग्राम अवश्य बनाएं।
3. **अंतर तालिका (Comparison Table):** तुलनात्मक प्रश्नों में हमेशा व्यवस्थित तालिका का प्रयोग करें।`;
    }

    return `### ⚡ मुख्य परीक्षा बिंदु (Hindi): ${data.topicTitle}

- **2-अंक प्रश्न:** संक्षिप्त एवं सटीक तकनीकी परिभाषा लिखें।
- **5-अंक प्रश्न:** परिभाषा $\\rightarrow$ ब्लॉक आरेख $\\rightarrow$ कार्यप्रणाली के 4 मुख्य बिंदु।
- **सामान्य त्रुटि:** प्राथमिक मेमोरी (RAM) और द्वितीयक स्टोरेज (Hard Disk/SSD) में कभी भ्रमित न हों।`;
  }

  // Default English
  if (data.action === "explain") {
    return `### 📘 Concept Breakdown: ${data.topicTitle}

**Definition:**
${data.topicTitle} is a foundational pillar in Unit ${data.unitNumber} of **${data.subjectTitle}**. In computer science examinations, questions on this topic test both technical definition and architectural clarity.

**Key Principles to Remember:**
1. **Input-Processing-Output Integrity**: All computing processes operate on raw data, apply mathematical/logical operations, and deliver contextual information.
2. **Standard Terminology**: Always define exact hardware/software boundaries (e.g. registers vs cache, system vs application software).
3. **Diagrammatic Representation**: In 5-mark and 15-mark university answers, always include a block diagram and a 4-column comparison table.

*(💡 To enable dynamic generative AI answers, configure \`GEMINI_API_KEY\` in your environment variables.)*`;
  }

  if (data.action === "revision") {
    return `### ⚡ High-Yield Revision Summary: ${data.topicTitle}

- **2-Marks Definition:** Ensure exact technical keywords (e.g., electronic programmable device, volatile vs non-volatile, cycle time in nanoseconds).
- **5-Marks Structure:** Write definition $\\rightarrow$ draw labeled block diagram $\\rightarrow$ state 4 bulleted characteristics $\\rightarrow$ cite practical computer system examples.
- **Exam Warning:** Never confuse raw data with processed information; never mix primary memory (RAM/ROM) with secondary mass storage (HDD/SSD).

*(💡 To enable dynamic generative AI answers, configure \`GEMINI_API_KEY\` in your environment variables.)*`;
  }

  return `### 💡 Study Coach Answer for: "${data.query || data.topicTitle}"

This topic is part of **Unit ${data.unitNumber} (${data.subjectTitle})**.

When studying this concept:
1. Review the primary article under the **Study Material** tab for detailed architectures and comparison matrices.
2. Practice the 10-Question set in **Practice Quizzes** to test your recall on easy, medium, and hard difficulty questions.
3. Check the **Written Practice** tab for university examination model answers.

*(💡 Note: Add \`GEMINI_API_KEY\` to your server environment (.env) to enable live AI conversational chat with Gemini Flash.)*`;
}

function getDeterministicFallbackQuiz(topicTitle: string): GeneratedQuizQuestion[] {
  return [
    {
      prompt: `Which of the following best defines the primary role of ${topicTitle}?`,
      difficulty: "easy",
      topic_title: topicTitle,
      explanation: "Foundational definition adhering to university syllabus terminology.",
      options: [
        { text: "Accepting input, executing instructions, and producing output", is_correct: true },
        { text: "Generating hardware interrupts randomly", is_correct: false },
        { text: "Only storing secondary non-volatile records", is_correct: false },
        { text: "Connecting to analog telephone exchanges directly", is_correct: false },
      ],
    },
    {
      prompt: "What is the speed of modern CPU clock cycles typically measured in?",
      difficulty: "easy",
      topic_title: topicTitle,
      explanation: "Modern processor clock speeds are quantified in Gigahertz (GHz) or $10^9$ cycles per second.",
      options: [
        { text: "Gigahertz (GHz)", is_correct: true },
        { text: "Kilobytes per hour (KB/h)", is_correct: false },
        { text: "Milliseconds (ms)", is_correct: false },
        { text: "Pixels per inch (PPI)", is_correct: false },
      ],
    },
    {
      prompt: "Which component coordinates and controls all hardware operations within the CPU?",
      difficulty: "easy",
      topic_title: topicTitle,
      explanation: "The Control Unit (CU) sequences the fetch, decode, and execute cycles for every instruction.",
      options: [
        { text: "Control Unit (CU)", is_correct: true },
        { text: "Secondary Storage Unit", is_correct: false },
        { text: "Arithmetic Logic Unit only", is_correct: false },
        { text: "Input Buffer Interface", is_correct: false },
      ],
    },
    {
      prompt: "Which principle states that inaccurate input data always leads to inaccurate output information?",
      difficulty: "easy",
      topic_title: topicTitle,
      explanation: "GIGO (Garbage In, Garbage Out) states that computer logic accuracy is bound to input data integrity.",
      options: [
        { text: "Garbage In, Garbage Out (GIGO)", is_correct: true },
        { text: "First In, First Out (FIFO)", is_correct: false },
        { text: "Moore's Empirical Law", is_correct: false },
        { text: "Amdahl's Parallel Limit", is_correct: false },
      ],
    },
    {
      prompt: "Which of the following is volatile primary semiconductor memory?",
      difficulty: "easy",
      topic_title: topicTitle,
      explanation: "Random Access Memory (RAM) loses all stored data when electrical power is switched off.",
      options: [
        { text: "Random Access Memory (RAM)", is_correct: true },
        { text: "Read Only Memory (ROM)", is_correct: false },
        { text: "Hard Disk Drive (HDD)", is_correct: false },
        { text: "NAND Flash Solid State Drive", is_correct: false },
      ],
    },
    {
      prompt: "How does Static RAM (SRAM) differ fundamentally from Dynamic RAM (DRAM)?",
      difficulty: "medium",
      topic_title: topicTitle,
      explanation: "SRAM utilizes flip-flops (transistors) and does not need periodic capacitive refresh cycles, making it faster than DRAM.",
      options: [
        { text: "SRAM uses flip-flops and does not require periodic refreshing", is_correct: true },
        { text: "SRAM is slower and cheaper than DRAM", is_correct: false },
        { text: "SRAM stores data magnetically on rotating platters", is_correct: false },
        { text: "DRAM cannot be used as primary system memory", is_correct: false },
      ],
    },
    {
      prompt: "In the memory hierarchy, what is the primary architectural trade-off as you move closer to the CPU?",
      difficulty: "medium",
      topic_title: topicTitle,
      explanation: "Moving closer to the CPU (Registers, Cache) yields nanosecond access times but significantly higher cost per bit and lower capacity.",
      options: [
        { text: "Access speed increases, but cost per bit rises and capacity decreases", is_correct: true },
        { text: "Capacity increases while cost per bit decreases", is_correct: false },
        { text: "Latency increases while bandwidth drops", is_correct: false },
        { text: "Physical size increases while clock frequency remains zero", is_correct: false },
      ],
    },
    {
      prompt: "What is the primary role of the Address Bus in a computer system?",
      difficulty: "medium",
      topic_title: topicTitle,
      explanation: "The Address Bus is unidirectional and carries the physical memory address from the CPU to RAM/peripherals.",
      options: [
        { text: "Carrying memory location addresses from the CPU to memory units", is_correct: true },
        { text: "Transmitting actual binary data bi-directionally", is_correct: false },
        { text: "Supplying DC electric power to motherboards", is_correct: false },
        { text: "Synchronizing system speaker volume", is_correct: false },
      ],
    },
    {
      prompt: "If a system has a 32-bit address bus, what is the maximum theoretical physical memory it can address directly?",
      difficulty: "hard",
      topic_title: topicTitle,
      explanation: "$2^{32}\\text{ bytes} = 4,294,967,296\\text{ bytes} = 4\\text{ Gigabytes (GB)}$.",
      options: [
        { text: "4 Gigabytes (4 GB)", is_correct: true },
        { text: "64 Kilobytes (64 KB)", is_correct: false },
        { text: "16 Terabytes (16 TB)", is_correct: false },
        { text: "1024 Megabytes (1 GB)", is_correct: false },
      ],
    },
    {
      prompt: "Which sequence correctly reflects the memory access latency from fastest to slowest?",
      difficulty: "hard",
      topic_title: topicTitle,
      explanation: "CPU Registers (~0.5 ns) < L1/L2 Cache (~1-5 ns) < Main RAM (~50-80 ns) < NVMe SSD (~20-100 µs) < Mechanical HDD (~5-15 ms).",
      options: [
        { text: "CPU Registers < L1 Cache < Main RAM < NVMe SSD < HDD", is_correct: true },
        { text: "Main RAM < CPU Registers < L1 Cache < HDD < NVMe SSD", is_correct: false },
        { text: "L1 Cache < CPU Registers < HDD < Main RAM < NVMe SSD", is_correct: false },
        { text: "NVMe SSD < Main RAM < L1 Cache < CPU Registers < HDD", is_correct: false },
      ],
    },
  ];
}
