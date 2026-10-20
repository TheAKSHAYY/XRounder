import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Bot,
  MessageSquare,
  BookOpen,
  Zap,
  Target,
  Send,
  Loader2,
  Copy,
  Check,
  RefreshCw,
  X,
  Volume2,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { playPopSound, playCorrectSound } from "@/lib/sound-fx";
import {
  askGeminiStudyAssistant,
  type GeminiAssistantResponse,
  type GeneratedQuizQuestion,
} from "@/lib/gemini.functions";
import { EducationalContentRenderer } from "@/components/content/educational-content-renderer";
import { useSpeech } from "@/hooks/use-speech";
import { toast } from "sonner";

import { MascotSvg } from "@/components/gamification/study-mascot";

export type AssistantMode = "ask" | "explain" | "revision" | "quiz";
export type AssistantLang = "en" | "hinglish" | "hi";

interface AiStudyAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topicTitle: string;
  unitNumber: number;
  subjectTitle: string;
  courseTitle?: string;
  contextText?: string;
  initialAction?: AssistantMode;
  initialLang?: AssistantLang;
  onLoadCustomQuiz?: (questions: GeneratedQuizQuestion[]) => void;
}

export const SMART_STUDENT_PROMPTS = [
  {
    label: "🚀 Hinglish me samjhao",
    text: "Is concept ko bilkul simple Hinglish me samjhao real-life college student example ke sath",
    targetLang: "hinglish" as const,
  },
  {
    label: "💡 हिंदी में व्याख्या",
    text: "इस विषय को मुख्य बिंदुओं और सरल हिंदी में समझाएं",
    targetLang: "hi" as const,
  },
  {
    label: "🎯 3 University Exam Questions",
    text: "What are the 3 most frequent university exam questions from this topic with model answers?",
    targetLang: null,
  },
  {
    label: "⚡ 2-Min Revision Notes",
    text: "Give 2-minute exam revision bullet points with keywords to score full marks",
    targetLang: null,
  },
  {
    label: "📋 Comparison Table",
    text: "Provide a detailed comparison table of the key terms in this topic",
    targetLang: null,
  },
];

export function AiStudyAssistant({
  open,
  onOpenChange,
  topicTitle,
  unitNumber,
  subjectTitle,
  courseTitle = "Bachelor of Computer Applications (BCA)",
  contextText = "",
  initialAction,
  initialLang,
  onLoadCustomQuiz,
}: AiStudyAssistantProps) {
  const [mode, setMode] = useState<AssistantMode>(initialAction || "ask");
  // Default to Hinglish for accessible Indian university learning
  const [lang, setLang] = useState<AssistantLang>(initialLang || "hinglish");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<GeminiAssistantResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const { speak, isPlaying, stop } = useSpeech();

  // Reset or initialize when opened with specific action/lang
  useEffect(() => {
    if (open) {
      if (initialLang) setLang(initialLang);
      if (initialAction && initialAction !== "ask") {
        setMode(initialAction);
        handleRunAction(initialAction, undefined, initialLang || lang);
      }
    }
  }, [open, initialAction, initialLang]);

  const handleRunAction = async (
    targetMode: AssistantMode,
    customQuery?: string,
    overrideLang?: AssistantLang,
  ) => {
    playPopSound();
    setIsLoading(true);
    setResponse(null);
    stop();

    const activeLang = overrideLang || lang;
    if (overrideLang && overrideLang !== lang) {
      setLang(overrideLang);
    }

    try {
      const res = await askGeminiStudyAssistant({
        data: {
          action: targetMode,
          query: customQuery || query || undefined,
          topicTitle,
          unitNumber,
          subjectTitle,
          courseTitle,
          context: contextText,
          language: activeLang,
        },
      });

      setResponse(res);
      playCorrectSound();
    } catch (err: unknown) {
      console.error("AI Assistant error:", err);
      toast.error("Failed to fetch response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response?.content) return;
    navigator.clipboard.writeText(response.content);
    setCopied(true);
    toast.success("Answer copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeakResponse = () => {
    if (isPlaying) {
      stop();
    } else if (response?.content) {
      speak(response.content, { mode: lang === "hi" ? "hinglish" : lang });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0 gap-0 border-primary/20 bg-card overflow-hidden shadow-2xl">
        {/* Header featuring Sparky mascot */}
        <div className="bg-linear-to-r from-primary/10 via-card to-card p-4 sm:p-5 border-b border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 border border-primary/20 shadow-xs overflow-hidden">
              <MascotSvg
                size={36}
                mood={isLoading ? "thinking" : response ? "celebrating" : isPlaying ? "reading" : "happy"}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <DialogTitle className="font-display text-base sm:text-lg font-bold text-foreground truncate">
                  Sparky AI Study Coach
                </DialogTitle>
                <Badge
                  variant="outline"
                  className="font-mono text-[9px] font-bold text-primary border-primary/30 uppercase px-1.5 py-0 shrink-0"
                >
                  Gemini Flash
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate max-w-sm sm:max-w-md">
                Unit {unitNumber}: {topicTitle} ({subjectTitle})
              </p>
            </div>
          </div>

          {/* Prominent Language Selector */}
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl shrink-0 border border-border/60 self-start sm:self-auto">
            {(
              [
                { id: "hinglish", label: "🇮🇳 Hinglish", title: "Hinglish (सरल भाषा)" },
                { id: "hi", label: "हिंदी", title: "सरल हिंदी (Devanagari)" },
                { id: "en", label: "English", title: "Academic English" },
              ] as const
            ).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  playPopSound();
                  setLang(l.id);
                  if (response && mode !== "ask") {
                    handleRunAction(mode, undefined, l.id);
                  }
                }}
                title={l.title}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer",
                  lang === l.id
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Navigation Bar */}
        <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/20 px-4 py-2 overflow-x-auto scrollbar-none">
          {[
            { id: "ask", label: "Ask Question", icon: MessageSquare },
            { id: "explain", label: "Explain Topic", icon: BookOpen },
            { id: "revision", label: "Smart Revision", icon: Zap },
            { id: "quiz", label: "Generate Quiz", icon: Target },
          ].map((m) => {
            const Icon = m.icon;
            const isActive = mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  playPopSound();
                  setMode(m.id as AssistantMode);
                  if (m.id !== "ask") {
                    handleRunAction(m.id as AssistantMode);
                  }
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all shrink-0 cursor-pointer",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Body Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 min-h-[300px]">
          {/* Ask Question Input Box */}
          {mode === "ask" && (
            <div className="space-y-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (query.trim()) handleRunAction("ask", query);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Ask anything about "${topicTitle}" (Hinglish, Hindi, or English)...`}
                  className="flex-1 rounded-2xl border border-border/80 bg-background px-4 py-2.5 text-xs sm:text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="btn-squishy rounded-2xl h-10 px-4 font-bold text-xs shrink-0 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5 mr-1" /> Ask
                    </>
                  )}
                </Button>
              </form>

              {/* Quick Student Prompt Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono mr-1">
                  1-Tap:
                </span>
                {SMART_STUDENT_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuery(p.text);
                      handleRunAction("ask", p.text, p.targetLang || undefined);
                    }}
                    className="rounded-full border border-border/80 bg-surface px-3 py-1 text-[11px] font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer shadow-2xs"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading Indicator with Animated Sparky */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
              <div className="relative">
                <div className="h-14 w-14 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-0 m-auto h-9 w-9 flex items-center justify-center">
                  <MascotSvg size={30} mood="thinking" />
                </div>
              </div>
              <div className="text-xs font-semibold text-foreground">
                Sparky is preparing your {lang === "hinglish" ? "Hinglish" : lang === "hi" ? "Hindi" : "English"} explanation…
              </div>
              <p className="text-[11px] text-muted-foreground">
                Grounded in official {subjectTitle} Unit {unitNumber} university curriculum
              </p>
            </div>
          )}

          {/* AI Response Card */}
          {response && !isLoading && (
            <div className="rounded-2xl border border-border/80 bg-muted/15 p-4 sm:p-6 space-y-4 animate-fade-in-up">
              {/* Top Response Metadata Bar */}
              <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-mono text-primary border-primary/30">
                    {lang === "hinglish" ? "🇮🇳 Hinglish" : lang === "hi" ? "हिन्दी" : "English"}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground">
                    {response.modelUsed}
                  </Badge>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleSpeakResponse}
                    className="h-8 px-2 text-xs font-medium cursor-pointer"
                    title={isPlaying ? "Stop speech" : "Listen aloud"}
                  >
                    <Volume2 className={cn("h-3.5 w-3.5 mr-1", isPlaying && "text-primary animate-pulse")} />
                    {isPlaying ? "Stop" : "Listen"}
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleCopy}
                    className="h-8 px-2 text-xs font-medium cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              {/* Quick Language Switch / Re-generate Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-card border border-border/80 p-2.5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Languages className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Explain this in:</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleRunAction(mode, query || undefined, "hinglish")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                      lang === "hinglish"
                        ? "bg-primary text-primary-foreground shadow-2xs ring-1 ring-primary/40"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span>🇮🇳 Hinglish</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRunAction(mode, query || undefined, "hi")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                      lang === "hi"
                        ? "bg-primary text-primary-foreground shadow-2xs ring-1 ring-primary/40"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span>📖 हिंदी (Hindi)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRunAction(mode, query || undefined, "en")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                      lang === "en"
                        ? "bg-primary text-primary-foreground shadow-2xs ring-1 ring-primary/40"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span>English</span>
                  </button>
                </div>
              </div>

              {/* Formatted Content */}
              <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed">
                <EducationalContentRenderer content={response.content} />
              </div>

              {/* Generated Quiz Action Button (if quiz generated) */}
              {response.quiz && response.quiz.length > 0 && (
                <div className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-xs text-foreground">
                      🎯 {response.quiz.length} Practice Questions Generated
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Balanced 5 Easy, 3 Medium, and 2 Hard questions from {topicTitle}.
                    </p>
                  </div>

                  {onLoadCustomQuiz && (
                    <Button
                      size="sm"
                      onClick={() => {
                        onLoadCustomQuiz(response.quiz!);
                        onOpenChange(false);
                      }}
                      className="btn-squishy rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                    >
                      Launch in MCQ Engine
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Initial State / Prompt helper */}
          {!response && !isLoading && (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
              <div className="h-16 w-16 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-xs">
                <MascotSvg size={46} mood="happy" />
              </div>
              <div className="max-w-md space-y-1.5">
                <h4 className="font-display text-base sm:text-lg font-bold text-foreground">
                  Namaste! Main hoon Sparky — Your AI Study Coach
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Aap <strong>{topicTitle}</strong> ko Hinglish, Hindi ya English me samajh sakte hain. Instant generate karne ke liye tap karein:
                </p>
              </div>

              {/* Quick Starter Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl text-left pt-1">
                {/* 1. Hinglish Hero Card */}
                <button
                  type="button"
                  onClick={() => {
                    setMode("explain");
                    handleRunAction("explain", undefined, "hinglish");
                  }}
                  className="rounded-2xl border-2 border-primary/40 bg-primary/10 hover:bg-primary/15 p-3.5 transition-all cursor-pointer group shadow-xs active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs text-primary">
                      <BookOpen className="h-4 w-4" />
                      <span>🇮🇳 Hinglish Me Samjhao</span>
                    </div>
                    <Badge variant="outline" className="text-[9px] font-bold text-primary border-primary/40 uppercase">
                      Senior Style
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                    Conversational Hindi-English breakdown with real-life college student analogies.
                  </p>
                </button>

                {/* 2. Hindi Hero Card */}
                <button
                  type="button"
                  onClick={() => {
                    setMode("explain");
                    handleRunAction("explain", undefined, "hi");
                  }}
                  className="rounded-2xl border-2 border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/15 p-3.5 transition-all cursor-pointer group shadow-xs active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs text-amber-700 dark:text-amber-400">
                      <Sparkles className="h-4 w-4" />
                      <span>📖 सरल हिंदी में व्याख्या</span>
                    </div>
                    <Badge variant="outline" className="text-[9px] font-bold text-amber-600 dark:text-amber-400 border-amber-500/40 uppercase">
                      Devanagari
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                    शुद्ध एवं सरल हिंदी में मुख्य बिंदु, परिभाषाएं और उदाहरण (तकनीकी शब्दों सहित).
                  </p>
                </button>

                {/* 3. Exam Revision Card */}
                <button
                  type="button"
                  onClick={() => {
                    setMode("revision");
                    handleRunAction("revision", undefined, lang);
                  }}
                  className="rounded-2xl border border-border/80 bg-card hover:border-primary/40 p-3 transition-all cursor-pointer group active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-foreground">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span>⚡ 2-Min Exam Revision</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    High-yield bullet points & scoring keywords for university exams.
                  </p>
                </button>

                {/* 4. Top 3 Exam Questions */}
                <button
                  type="button"
                  onClick={() => {
                    setQuery("What are the 3 most frequent university exam questions from this topic with model answers?");
                    handleRunAction("ask", "What are the 3 most frequent university exam questions from this topic with model answers?", lang);
                  }}
                  className="rounded-2xl border border-border/80 bg-card hover:border-primary/40 p-3 transition-all cursor-pointer group active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-foreground">
                    <Target className="h-4 w-4 text-emerald-500" />
                    <span>🎯 Top 3 Exam Questions</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Frequently asked semester exam questions with scoring blueprint.
                  </p>
                </button>

                {/* 5. Custom 10-MCQ Quiz */}
                <button
                  type="button"
                  onClick={() => {
                    setMode("quiz");
                    handleRunAction("quiz", undefined, lang);
                  }}
                  className="sm:col-span-2 rounded-2xl border border-border/80 bg-card hover:border-primary/40 p-3 transition-all cursor-pointer group active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-foreground">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>📝 Generate 10-Question MCQ Practice Test</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Interactive university-pattern test (5 Easy, 3 Medium, 2 Hard) with explanations.
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
