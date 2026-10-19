import { useState, useEffect, useRef, useCallback } from "react";

export type SpeechLanguageMode = "en" | "hinglish" | "hi";

export interface SpeechVoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
  isNatural: boolean;
}

export interface QuestionSpeechOptions {
  prompt: string;
  passage?: string;
  options?: Array<{ letter?: string; text: string }>;
  includeOptions?: boolean;
  languageMode?: SpeechLanguageMode;
}

/**
 * Explicit allowlist of approved data-tts selectors.
 * Unapproved DOM elements (navigation, buttons, badges, timers, scores) are strictly rejected.
 */
export const APPROVED_TTS_SELECTORS = [
  '[data-tts="question"]',
  '[data-tts="prompt"]',
  '[data-tts="passage"]',
  '[data-tts="option-text"]',
  '[data-tts="option"]',
  '[data-tts="article"]',
  '[data-tts="explanation"]',
].join(", ");

/**
 * Strips HTML tags, accessibility hidden content, UI boilerplate, and formats text for natural speech.
 */
export function cleanTextForSpeech(raw: string, mode: SpeechLanguageMode = "en"): string {
  if (!raw) return "";

  let text = raw
    // Strip HTML tags
    .replace(/<[^>]*>/g, " ")
    // Strip markdown images and links
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    // Strip code blocks and inline code
    .replace(/```[\s\S]*?```/g, "Code block.")
    .replace(/`([^`]+)`/g, "$1")
    // Strip markdown formatting
    .replace(/^#+\s+/gm, "")
    .replace(/\|.*?\|/g, " ")
    .replace(/-{3,}/g, "")
    .replace(/\*{1,3}(.*?)\*{1,3}/g, "$1")
    .replace(/_{1,3}(.*?)_{1,3}/g, "$1")
    .replace(/^\s*[-*+]\s+/gm, "")
    // Strip raw question numbering prefixes like "Q1.", "Q. 1:", "Question 1 of 10:", etc.
    .replace(/^(?:Q(?:uestion)?\.?\s*\d+(?:\s*(?:of|\/)\s*\d+)?[:.-]?\s*)/i, "")
    // Strip callout tags
    .replace(/>\s*\[!.*?\]/g, "")
    .replace(/>/g, "")
    // Strip math delimiters and clean math symbols
    .replace(/\$+(.*?)\$+/g, "$1")
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1 divided by $2")
    .replace(/\\cdot/g, " multiplied by ")
    .replace(/\\times/g, " times ")
    .replace(/!=/g, " is not equal to ")
    .replace(/>=/g, " is greater than or equal to ")
    .replace(/<=/g, " is less than or equal to ");

  // Normalizations for natural technical & educational pronunciation
  const techReplacements: Record<string, string> = {
    "\\be\\.g\\.\\b": "for example",
    "\\bi\\.e\\.\\b": "that is",
    "\\betc\\.\\b": "etcetera",
    "\\bvs\\.?\\b": "versus",
    "\\bCPU\\b": "C P U",
    "\\bALU\\b": "A L U",
    "\\bCU\\b": "C U",
    "\\bRAM\\b": "Ram",
    "\\bROM\\b": "Rom",
    "\\bI/O\\b": "Input Output",
    "\\bOS\\b": "Operating System",
    "\\bGUI\\b": "G U I",
    "\\bCLI\\b": "C L I",
    "\\bVLSI\\b": "V L S I",
    "\\bULSI\\b": "U L S I",
    "\\bIC\\b": "Integrated Circuit",
    "\\bICs\\b": "Integrated Circuits",
    "\\bENIAC\\b": "Eniac",
    "\\bEDVAC\\b": "Edvac",
    "\\bUNIVAC\\b": "Univac",
  };

  for (const [pattern, replacement] of Object.entries(techReplacements)) {
    text = text.replace(new RegExp(pattern, "gi"), replacement);
  }

  // Hinglish cadence smoothing
  if (mode === "hinglish") {
    text = text
      .replace(/\bka\b/gi, "ka")
      .replace(/\bhai\b/gi, "hai")
      .replace(/\bhot[aei]\b/gi, "hota")
      .replace(/\baur\b/gi, "aur")
      .replace(/\bya\b/gi, "ya");
  }

  // Strip emojis, symbols, and duplicate spaces
  return text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Backward-compatible export alias */
export const cleanMarkdownForSpeech = cleanTextForSpeech;

/**
 * Extracts speakable text exclusively from an approved element matching data-tts attributes.
 * Never accesses document.body or unapproved UI nodes.
 */
export function extractTextFromApprovedElement(
  element: HTMLElement | null,
  mode: SpeechLanguageMode = "en",
): string {
  if (!element || typeof window === "undefined") return "";

  // Clone element to safely remove unapproved children without mutating DOM
  const clone = element.cloneNode(true) as HTMLElement;

  // Remove strictly prohibited elements: buttons, navigations, svgs, badges, tooltips, hidden elements
  const prohibited = clone.querySelectorAll(
    "button, nav, svg, [aria-hidden='true'], [data-tts-ignore='true'], .sr-only, .badge, [role='tooltip'], [role='status']",
  );
  prohibited.forEach((el) => el.remove());

  return cleanTextForSpeech(clone.textContent || "", mode);
}

/**
 * Builds speech payload strictly containing question prompt, optional passage, and optional options.
 * Excludes question numbers, scores, badges, timer, or UI chrome.
 */
export function buildQuestionSpeechText(options: QuestionSpeechOptions): string {
  const parts: string[] = [];

  if (options.passage) {
    const cleanPassage = cleanTextForSpeech(options.passage, options.languageMode);
    if (cleanPassage) parts.push(`Passage: ${cleanPassage}`);
  }

  const cleanPrompt = cleanTextForSpeech(options.prompt, options.languageMode);
  if (cleanPrompt) parts.push(cleanPrompt);

  if (options.includeOptions && options.options && options.options.length > 0) {
    options.options.forEach((opt, idx) => {
      const letter = opt.letter || ["A", "B", "C", "D"][idx] || `Option ${idx + 1}`;
      const cleanOpt = cleanTextForSpeech(opt.text, options.languageMode);
      if (cleanOpt) {
        parts.push(`Option ${letter}: ${cleanOpt}`);
      }
    });
  }

  return parts.join(". ");
}

/**
 * Finds the highest quality, most natural sounding voice for the requested mode.
 */
export function findBestVoiceForMode(
  voices: SpeechSynthesisVoice[],
  mode: SpeechLanguageMode,
  customVoiceURI?: string,
): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  if (customVoiceURI) {
    const found = voices.find((v) => v.voiceURI === customVoiceURI || v.name === customVoiceURI);
    if (found) return found;
  }

  const isNatural = (v: SpeechSynthesisVoice) =>
    /natural|online|neural|google|premium|enhanced/i.test(v.name);

  if (mode === "hi") {
    const hiVoices = voices.filter((v) => v.lang.startsWith("hi"));
    const bestHi = hiVoices.find(isNatural) || hiVoices[0];
    if (bestHi) return bestHi;
  }

  if (mode === "hinglish") {
    // For Hinglish, en-IN or hi-IN voices pronounce English tech keywords and Hindi terms smoothly
    const enInVoices = voices.filter((v) => v.lang.startsWith("en-IN") || v.lang === "en_IN");
    const hiVoices = voices.filter((v) => v.lang.startsWith("hi"));

    const bestEnIn = enInVoices.find(isNatural) || enInVoices[0];
    if (bestEnIn) return bestEnIn;

    const bestHi = hiVoices.find(isNatural) || hiVoices[0];
    if (bestHi) return bestHi;
  }

  // Default English: prefer natural en-IN, en-US, or en-GB voices
  const enVoices = voices.filter((v) => v.lang.startsWith("en"));
  const preferredEn =
    enVoices.find((v) => v.lang.startsWith("en-IN") && isNatural(v)) ||
    enVoices.find((v) => isNatural(v)) ||
    enVoices.find((v) => v.lang.startsWith("en-IN")) ||
    enVoices.find((v) => v.lang.startsWith("en-US")) ||
    enVoices[0] ||
    voices[0];

  return preferredEn || null;
}

export function useSpeech() {
  const [isSupported, setIsSupported] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [languageMode, setLanguageMode] = useState<SpeechLanguageMode>("hinglish");
  const [voices, setVoices] = useState<SpeechVoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState<number>(1.0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);

      const updateVoices = () => {
        const available = window.speechSynthesis.getVoices();
        if (!available || available.length === 0) return;

        const options: SpeechVoiceOption[] = available.map((v) => ({
          voice: v,
          name: v.name,
          lang: v.lang,
          isNatural: /natural|online|neural|google|premium|enhanced/i.test(v.name),
        }));
        setVoices(options);

        // Pick the best voice for the active language mode
        const best = findBestVoiceForMode(available, languageMode);
        if (best) setSelectedVoice(best);
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;

      return () => {
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, [languageMode]);

  // Synchronize voice when languageMode changes
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const available = window.speechSynthesis.getVoices();
      if (available && available.length > 0) {
        const best = findBestVoiceForMode(available, languageMode);
        if (best) setSelectedVoice(best);
      }
    }
  }, [languageMode]);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    }
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isPlaying]);

  const resume = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  const speak = useCallback(
    (
      text: string,
      options?: {
        onEnd?: () => void;
        onStart?: () => void;
        customRate?: number;
        customVoice?: SpeechSynthesisVoice;
        mode?: SpeechLanguageMode;
      },
    ) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      const activeMode = options?.mode || languageMode;
      const cleaned = cleanTextForSpeech(text, activeMode);
      if (!cleaned) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(cleaned);
      const activeVoice = options?.customVoice || selectedVoice;
      if (activeVoice) {
        utterance.voice = activeVoice;
        utterance.lang = activeVoice.lang;
      }

      utterance.rate = options?.customRate ?? rate;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        options?.onStart?.();
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        utteranceRef.current = null;
        options?.onEnd?.();
      };

      utterance.onerror = (e) => {
        if (e.error !== "interrupted" && e.error !== "canceled") {
          console.warn("SpeechSynthesis error:", e.error);
        }
        setIsPlaying(false);
        setIsPaused(false);
        utteranceRef.current = null;
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [rate, selectedVoice, languageMode],
  );

  /**
   * Reads only the approved question content (passage, prompt, and optional options).
   * Never speaks question numbers, score, timer, or UI navigation chrome.
   */
  const playQuestion = useCallback(
    (
      questionData: QuestionSpeechOptions,
      options?: {
        onEnd?: () => void;
        onStart?: () => void;
        customRate?: number;
      },
    ) => {
      const speechText = buildQuestionSpeechText({
        ...questionData,
        languageMode: questionData.languageMode || languageMode,
      });
      speak(speechText, {
        ...options,
        mode: questionData.languageMode || languageMode,
      });
    },
    [speak, languageMode],
  );

  return {
    isSupported,
    isPlaying,
    isPaused,
    voices,
    selectedVoice,
    setSelectedVoice,
    languageMode,
    setLanguageMode,
    rate,
    setRate,
    speak,
    playQuestion,
    stop,
    pause,
    resume,
  };
}
