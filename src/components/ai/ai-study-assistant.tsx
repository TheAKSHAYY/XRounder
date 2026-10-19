import React, { useState } from "react";
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

interface AiStudyAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topicTitle: string;
  unitNumber: number;
  subjectTitle: string;
  courseTitle?: string;
  contextText?: string;
  onLoadCustomQuiz?: (questions: GeneratedQuizQuestion[]) => void;
}

type AssistantMode = "ask" | "explain" | "revision" | "quiz";
type AssistantLang = "en" | "hinglish" | "hi";

const QUICK_PROMPTS = [
  "Explain in simple terms with an example",
  "What are the most frequent university exam questions?",
  "Differences table between core terms",
  "Key 2-mark definitions for exam revision",
];

export function AiStudyAssistant({
  open,
  onOpenChange,
  topicTitle,
  unitNumber,
  subjectTitle,
  courseTitle = "Bachelor of Computer Applications (BCA)",
  contextText = "",
  onLoadCustomQuiz,
}: AiStudyAssistantProps) {
  const [mode, setMode] = useState<AssistantMode>("ask");
  const [lang, setLang] = useState<AssistantLang>("en");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<GeminiAssistantResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const { speak, isPlaying, stop } = useSpeech();

  const handleRunAction = async (targetMode: AssistantMode, customQuery?: string) => {
    playPopSound();
    setIsLoading(true);
    setResponse(null);
    stop();

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
          language: lang,
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
      speak(response.content);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0 gap-0 border-primary/20 bg-card overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-linear-to-r from-primary/10 via-card to-card p-4 sm:p-5 border-b border-border/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-xs">
              <Bot className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <DialogTitle className="font-display text-base sm:text-lg font-bold text-foreground truncate">
                  AI Study Coach · Gemini Flash
                </DialogTitle>
                <Badge
                  variant="outline"
                  className="font-mono text-[9px] font-bold text-primary border-primary/30 uppercase px-1.5 py-0 shrink-0"
                >
                  Free Tier
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate max-w-sm sm:max-w-md">
                Unit {unitNumber}: {topicTitle} ({subjectTitle})
              </p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl shrink-0">
            {(
              [
                { id: "en", label: "EN" },
                { id: "hinglish", label: "Hinglish" },
                { id: "hi", label: "हिंदी" },
              ] as const
            ).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  playPopSound();
                  setLang(l.id);
                }}
                className={cn(
                  "px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer",
                  lang === l.id
                    ? "bg-card text-primary shadow-xs"
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
                  placeholder={`Ask anything about "${topicTitle}"...`}
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

              {/* Quick Prompt Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono mr-1">
                  Quick:
                </span>
                {QUICK_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuery(p);
                      handleRunAction("ask", p);
                    }}
                    className="rounded-full border border-border/70 bg-surface px-2.5 py-1 text-[11px] text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-primary animate-pulse" />
              </div>
              <div className="text-xs font-semibold text-foreground">
                Grounding answer in {topicTitle} curriculum…
              </div>
              <p className="text-[11px] text-muted-foreground">
                Running Gemini model on official syllabus context
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
                    {response.modelUsed}
                  </Badge>
                  {response.isDemoFallback && (
                    <Badge variant="outline" className="text-[10px] text-muted-foreground">
                      Syllabus Direct
                    </Badge>
                  )}
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
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="max-w-md">
                <h4 className="font-display text-sm font-bold text-foreground">
                  Your Personal University Exam Coach
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Ask any doubt about <strong>{topicTitle}</strong>, request step-by-step explanations, or generate exam practice sets in English, Hindi, or Hinglish.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
