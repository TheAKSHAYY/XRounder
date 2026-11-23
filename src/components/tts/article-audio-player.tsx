import React, { useState, useEffect, useMemo, useRef } from "react";
import { Volume2, Play, Pause, Square, Gauge, Settings2, Sparkles } from "lucide-react";
import { useSpeech, buildArticleSpeechText, type SpeechLanguageMode } from "@/hooks/use-speech";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { playPopSound } from "@/lib/sound-fx";

export interface ArticleAudioPlayerProps {
  articleId?: string;
  title?: string;
  content?: string;
  text?: string; // Backward compatibility
  className?: string;
  onAskAi?: () => void;
  compact?: boolean;
  courseId?: string;
  unitId?: string;
  topicId?: string;
  studyMode?: string;
}

const SPEED_OPTIONS = [0.8, 1.0, 1.25, 1.5];

export function ArticleAudioPlayer({
  articleId,
  title = "Article",
  content,
  text,
  className,
  onAskAi,
  compact = false,
  courseId: _courseId,
  unitId: _unitId,
  topicId: _topicId,
  studyMode: _studyMode = "reader",
}: ArticleAudioPlayerProps) {
  const {
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
    currentChunk,
    totalChunks,
    progress,
    speak,
    pause,
    resume,
    stop,
  } = useSpeech();

  const [showSettings, setShowSettings] = useState(false);
  const activeArticleIdRef = useRef<string | undefined>(articleId);
  const rawText = content || text || "";

  // 1. Build structured speech payload strictly from active article content
  const speechText = useMemo(() => {
    return buildArticleSpeechText(title, rawText, languageMode);
  }, [title, rawText, languageMode]);

  // 2. Stop narration when active topic changes to prevent stale audio bleeding
  useEffect(() => {
    if (activeArticleIdRef.current !== undefined && activeArticleIdRef.current !== articleId) {
      activeArticleIdRef.current = articleId;
      stop();
    } else {
      activeArticleIdRef.current = articleId;
    }
  }, [articleId, stop]);

  // 3. Stop narration on component unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  if (!isSupported) return null;

  const handleTogglePlay = () => {
    playPopSound();
    if (isPlaying) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      // Always stop previous speech before dispatching new narration
      stop();
      speak(speechText, { mode: languageMode });
    }
  };

  const handleStop = () => {
    playPopSound();
    stop();
  };

  const cycleSpeed = () => {
    playPopSound();
    const currIdx = SPEED_OPTIONS.indexOf(rate);
    const nextIdx = (currIdx + 1) % SPEED_OPTIONS.length;
    const nextRate = SPEED_OPTIONS[nextIdx];
    setRate(nextRate);
    if (isPlaying && !isPaused) {
      speak(speechText, { customRate: nextRate, mode: languageMode });
    }
  };

  const handleLanguageChange = (newMode: SpeechLanguageMode) => {
    playPopSound();
    setLanguageMode(newMode);
    if (isPlaying) {
      stop();
      const updatedText = buildArticleSpeechText(title, rawText, newMode);
      speak(updatedText, { mode: newMode });
    }
  };

  return (
    <div
      data-tts-ignore="true"
      className={cn(
        "rounded-2xl border border-primary/20 bg-linear-to-r from-primary/5 via-card to-card p-3 sm:px-4 sm:py-3 shadow-2xs transition-all",
        isPlaying && "border-primary/45 ring-1 ring-primary/25 bg-primary/5",
        compact && "p-2.5 sm:px-3.5 sm:py-2.5",
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        {/* Left: Speaker Status & Active Topic Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={handleTogglePlay}
            className={cn(
              "grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-xl transition-all cursor-pointer",
              isPlaying
                ? "bg-primary text-primary-foreground shadow-xs animate-pulse"
                : "bg-primary/10 text-primary hover:bg-primary/20",
            )}
            title={isPlaying ? (isPaused ? "Resume Audio" : "Pause Audio") : "Play Article Audio"}
          >
            <Volume2 className="h-4 w-4" />
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-display text-xs font-bold text-foreground truncate max-w-[190px] sm:max-w-xs">
                {title}
              </span>
              <Badge
                variant="outline"
                className="font-mono text-[9px] font-bold text-primary border-primary/30 uppercase px-1.5 py-0 shrink-0"
              >
                {languageMode === "hinglish" ? "🇮🇳 Hinglish Mode" : "Natural Audio"}
              </Badge>
              {selectedVoice && (
                <span className="text-[10px] text-muted-foreground hidden lg:inline truncate max-w-[140px]">
                  · {selectedVoice.name}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[11px] text-muted-foreground truncate">
                {isPlaying
                  ? isPaused
                    ? "Audio paused — tap resume to continue"
                    : totalChunks > 0
                      ? `Narrating section ${currentChunk} of ${totalChunks}...`
                      : "Playing aloud via browser speech engine"
                  : "Listen to this educational article hands-free"}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Player Controls & Language Switcher */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 shrink-0 pt-1.5 sm:pt-0 border-t border-border/40 sm:border-0">
          {/* Language Selector: English vs Hinglish */}
          <div className="flex items-center rounded-lg border border-border/80 bg-background/80 p-0.5 text-[11px] font-semibold shrink-0">
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              className={cn(
                "rounded-md px-2 py-0.5 transition-all cursor-pointer text-[10.5px]",
                languageMode === "en"
                  ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title="Standard English narration"
            >
              English
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("hinglish")}
              className={cn(
                "rounded-md px-2 py-0.5 transition-all cursor-pointer flex items-center gap-1 text-[10.5px]",
                languageMode === "hinglish"
                  ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title="Indian English voice for natural pronunciation"
            >
              <span>🇮🇳 Hinglish</span>
            </button>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Speed Toggle */}
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={cycleSpeed}
              className="h-7 px-1.5 text-[11px] font-mono font-bold text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
              title="Adjust speaking rate"
            >
              <Gauge className="h-3 w-3 mr-0.5" />
              {rate}x
            </Button>

            {/* Voice Settings Dropdown */}
            {voices.length > 1 && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  playPopSound();
                  setShowSettings(!showSettings);
                }}
                className={cn(
                  "h-7 w-7 p-0 text-muted-foreground hover:text-foreground cursor-pointer shrink-0",
                  showSettings && "bg-muted text-foreground",
                )}
                title="Voice selection"
              >
                <Settings2 className="h-3 w-3" />
              </Button>
            )}

            {/* Stop Button */}
            {isPlaying && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleStop}
                className="h-7 w-7 p-0 rounded-lg text-destructive hover:bg-destructive/10 cursor-pointer shrink-0"
                title="Stop narration"
              >
                <Square className="h-3 w-3 fill-current" />
              </Button>
            )}

            {/* Play / Pause / Resume Button */}
            <Button
              type="button"
              size="sm"
              onClick={handleTogglePlay}
              className={cn(
                "btn-squishy rounded-xl text-xs font-bold h-7 sm:h-8 px-3 shadow-2xs cursor-pointer gap-1.5 shrink-0 transition-transform active:scale-95",
                isPlaying && !isPaused
                  ? "bg-muted text-foreground hover:bg-muted/80"
                  : "bg-primary text-primary-foreground",
              )}
            >
              {isPlaying && !isPaused ? (
                <>
                  <Pause className="h-3 w-3 fill-current" /> Pause
                </>
              ) : isPaused ? (
                <>
                  <Play className="h-3 w-3 fill-current" /> Resume
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 fill-current" /> Play Audio
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar when Active */}
      {isPlaying && totalChunks > 0 && (
        <div className="mt-2.5 h-1 w-full bg-muted/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      )}

      {/* Ask AI Coach Shortcut Bar */}
      {onAskAi && !compact && (
        <div className="mt-2.5 pt-2 border-t border-border/40 flex flex-col xs:flex-row xs:items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground truncate">
            <Sparkles className="h-3 w-3 text-primary shrink-0 animate-pulse" />
            <span className="truncate">Need this explained in Hinglish or Hindi?</span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAskAi}
            className="rounded-lg border-primary/30 text-primary hover:bg-primary/10 h-6 px-2.5 text-[11px] font-bold cursor-pointer shrink-0 shadow-2xs gap-1 transition-transform active:scale-95 w-full xs:w-auto"
            title="Ask Sparky AI Coach about this topic"
          >
            <Sparkles className="h-3 w-3 text-primary" />
            <span>Ask Sparky AI</span>
          </Button>
        </div>
      )}

      {/* Voice Selection Panel */}
      {showSettings && voices.length > 1 && (
        <div className="mt-2.5 pt-2.5 border-t border-border/60 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-muted-foreground">Custom Voice:</span>
          <select
            value={selectedVoice?.name || ""}
            onChange={(e) => {
              const matched = voices.find((v) => v.voice.name === e.target.value);
              if (matched) {
                setSelectedVoice(matched.voice);
                if (isPlaying) {
                  speak(speechText, { customVoice: matched.voice, mode: languageMode });
                }
              }
            }}
            className="rounded-md border border-border bg-background px-2 py-0.5 text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
          >
            {voices.map((v) => (
              <option key={v.name} value={v.voice.name}>
                {v.name} {v.isNatural ? "★" : ""}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
