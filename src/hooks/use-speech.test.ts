import { describe, it, expect } from "vitest";
import {
  cleanTextForSpeech,
  buildArticleSpeechText,
  splitIntoSpeakableChunks,
  findBestVoiceForMode,
} from "./use-speech";

describe("use-speech audio engine", () => {
  describe("buildArticleSpeechText", () => {
    it("preserves article title as a heading and cleans course code noise", () => {
      const title = "Unit 1 Master Exam Revision Notes: Operating System Architecture";
      const body = "An operating system manages computer hardware and software resources.";
      const result = buildArticleSpeechText(title, body, "en");

      expect(result).toContain("[HEADING] Operating System Architecture.");
      expect(result).not.toContain("Master Exam Revision Notes");
      expect(result).toContain("manages computer hardware");
    });

    it("strictly excludes interactive cards, knowledge checks, and quiz options", () => {
      const title = "Deadlock Prevention";
      const body = `
Deadlock is a condition where a set of processes are blocked because each process is holding a resource and waiting for another resource.

### Instant Knowledge Check
Which of the following conditions is NOT required for deadlock?
* **A)** Mutual Exclusion
* **B)** Hold and Wait
* **C)** Preemption Allowed
* **D)** Circular Wait
Answer: C. Preemption Allowed.

## Safe State and Banker's Algorithm
The Banker's algorithm is a deadlock avoidance algorithm.
      `.trim();

      const result = buildArticleSpeechText(title, body, "en");

      // Verify article content is included
      expect(result).toContain("Deadlock is a condition where a set of processes");
      expect(result).toContain("Safe State and Banker's Algorithm");
      expect(result).toContain("The Banker's algorithm is a deadlock avoidance algorithm");

      // Verify interactive check questions and options are completely stripped
      expect(result).not.toContain("Instant Knowledge Check");
      expect(result).not.toContain("Which of the following conditions is NOT required");
      expect(result).not.toContain("Mutual Exclusion");
      expect(result).not.toContain("Preemption Allowed");
      expect(result).not.toContain("Answer: C");
    });

    it("strictly excludes code blocks and ASCII diagrams", () => {
      const title = "Paging and Segmentation";
      const body = `
Paging is a memory management scheme that eliminates the need for contiguous allocation of physical memory.

\`\`\`c
int main() {
    printf("Memory address translation\\n");
    return 0;
}
\`\`\`

+-------------------+
| Page Table Entry  |
+-------------------+

Segmentation divides the memory into logical segments visible to the programmer.
      `.trim();

      const result = buildArticleSpeechText(title, body, "en");

      expect(result).toContain("Paging is a memory management scheme");
      expect(result).toContain("Segmentation divides the memory into logical segments");
      expect(result).not.toContain("printf");
      expect(result).not.toContain("main()");
      expect(result).not.toContain("+-------------------+");
    });

    it("converts markdown callouts into spoken key takeaways", () => {
      const title = "Virtual Memory";
      const body = `
Virtual memory creates an illusion of a very large memory.

> [!TIP]
> Page fault rate directly determines the effective access time of memory.

Page replacement algorithms like LRU decide which page to swap out.
      `.trim();

      const result = buildArticleSpeechText(title, body, "en");

      expect(result).toContain("Key Takeaway: Page fault rate directly determines the effective access time");
      expect(result).not.toContain("[!TIP]");
    });

    it("strips university marks boilerplate and question numbers", () => {
      const title = "Process Synchronization";
      const body = `
### Q1. [15 Marks] Explain Peterson's Solution for Critical Section Problem.
Peterson's solution is a classical software-based solution to the critical section problem.
      `.trim();

      const result = buildArticleSpeechText(title, body, "en");

      expect(result).not.toContain("[15 Marks]");
      expect(result).toContain("Peterson's solution is a classical software-based solution");
    });
  });

  describe("cleanTextForSpeech", () => {
    it("expands standard technical abbreviations for clear pronunciation", () => {
      const text = "The CPU and ALU communicate with the RAM through the OS, e.g. for GUI tasks.";
      const cleaned = cleanTextForSpeech(text, "en");

      expect(cleaned).toContain("C P U");
      expect(cleaned).toContain("A L U");
      expect(cleaned).toContain("Ram");
      expect(cleaned).toContain("Operating System");
      expect(cleaned).toContain("for example");
      expect(cleaned).toContain("G U I");
    });

    it("strips emojis and markdown symbols", () => {
      const text = "⚡ Interactive lesson 🚀 with **bold text** and [clickable link](https://xrounder.in)";
      const cleaned = cleanTextForSpeech(text, "en");

      expect(cleaned).not.toContain("⚡");
      expect(cleaned).not.toContain("🚀");
      expect(cleaned).toContain("bold text");
      expect(cleaned).toContain("clickable link");
      expect(cleaned).not.toContain("https://xrounder.in");
    });

    it("formats Hinglish mode smoothly", () => {
      const text = "Ye algorithm CPU scheduling ke liye use hota hai aur efficiency badhata hai.";
      const cleaned = cleanTextForSpeech(text, "hinglish");

      expect(cleaned).toContain("C P U");
      expect(cleaned).toContain("hota");
      expect(cleaned).toContain("aur");
      expect(cleaned).toContain("hai");
    });
  });

  describe("splitIntoSpeakableChunks", () => {
    it("splits long articles into safe bite-sized chunks under 160 chars without cutting mid-word", () => {
      const text = `
[HEADING] Introduction to Operating Systems.

An operating system acts as an intermediary between the user of a computer and the computer hardware. The purpose of an operating system is to provide an environment in which a user can execute programs in a convenient and efficient manner.

Operating systems can be explored from two viewpoints: the user and the system. From the user's point of view, the operating system is designed mostly for ease of use.
      `.trim();

      const chunks = splitIntoSpeakableChunks(text);

      expect(chunks.length).toBeGreaterThan(1);
      expect(chunks[0].isHeading).toBe(true);
      expect(chunks[0].text).toBe("Introduction to Operating Systems.");

      for (const chunk of chunks) {
        expect(chunk.text.length).toBeLessThanOrEqual(180);
        expect(chunk.text.trim().length).toBeGreaterThan(0);
      }
    });

    it("correctly identifies headings vs paragraph bodies", () => {
      const text = "[HEADING] Section 1: Process Management.\n\nProcesses require resources like CPU time, memory, and files.";
      const chunks = splitIntoSpeakableChunks(text);

      expect(chunks[0].isHeading).toBe(true);
      expect(chunks[0].text).toContain("Section 1: Process Management.");
      expect(chunks[1].isHeading).toBe(false);
      expect(chunks[1].text).toContain("Processes require resources");
    });
  });

  describe("findBestVoiceForMode", () => {
    const mockVoices = [
      { name: "Microsoft David", lang: "en-US", voiceURI: "david" } as SpeechSynthesisVoice,
      { name: "Google US English", lang: "en-US", voiceURI: "google-en" } as SpeechSynthesisVoice,
      { name: "Microsoft Ravi Online (Natural) - English (India)", lang: "en-IN", voiceURI: "ravi-natural" } as SpeechSynthesisVoice,
      { name: "Microsoft Swara Online (Natural) - Hindi (India)", lang: "hi-IN", voiceURI: "swara-natural" } as SpeechSynthesisVoice,
    ];

    it("selects natural en-IN voice for Hinglish mode", () => {
      const voice = findBestVoiceForMode(mockVoices, "hinglish");
      expect(voice).toBeDefined();
      expect(voice?.lang).toBe("en-IN");
    });

    it("selects Hindi voice for Hindi mode", () => {
      const voice = findBestVoiceForMode(mockVoices, "hi");
      expect(voice).toBeDefined();
      expect(voice?.lang).toBe("hi-IN");
    });

    it("selects natural voice for English mode", () => {
      const voice = findBestVoiceForMode(mockVoices, "en");
      expect(voice).toBeDefined();
      expect(voice?.name).toContain("Natural");
    });
  });
});
