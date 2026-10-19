import React, { useState } from "react";
import { Volume2, Play, Pause, Square, Gauge, Settings2, Sparkles, Check } from "lucide-react";
import { useSpeech, type SpeechLanguageMode } from "@/hooks/use-speech";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { playPopSound } from "@/lib/sound-fx";

interface ArticleAudioPlayerProps {
  text: string;
  title?: string;
  className?: string;
}

const SPEED_OPTIONS = [0.8, 1.0, 1.25, 1.5];

export function ArticleAudioPlayer({ text, title, className }: ArticleAudioPlayerProps) {
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
    speak,
    pause,
    resume,
    stop,
  } = useSpeech();

  const [showSettings, setShowSettings] = useState(false);

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
      speak(text, { mode: languageMode });
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
    setRate(SPEED_OPTIONS[nextIdx]);
    if (isPlaying && !isPaused) {
      speak(text, { customRate: SPEED_OPTIONS[nextIdx], mode: languageMode });
    }
  };

  const handleLanguageChange = (newMode: SpeechLanguageMode) => {
    playPopSound();
    setLanguageMode(newMode);
    if (isPlaying) {
      // Re-trigger with new language mode
      speak(text, { mode: newMode });
    }
  };

  return (
    <div
      data-tts-ignore="true"
      className={cn(
        "rounded-2xl border border-primary/20 bg-linear-to-r from-primary/5 via-card to-card p-3 sm:p-4 shadow-xs transition-all",
        isPlaying && "border-primary/40 ring-1 ring-primary/20",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors",
              isPlaying
                ? "bg-primary text-primary-foreground animate-pulse"
                : "bg-primary/10 text-primary",
            )}
          >
            <Volume2 className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-display text-xs font-bold text-foreground">
                Listen to Article
              </span>
              <Badge
                variant="outline"
                className="font-mono text-[9px] font-bold text-primary border-primary/30 uppercase px-1.5 py-0"
              >
                {languageMode === "hinglish"
                  ? "🇮🇳 Hinglish Mode"
                  : languageMode === "hi"
                    ? "Hindi Voice"
                    : "Natural Audio"}
              </Badge>
              {selectedVoice && (
                <span className="text-[10px] text-muted-foreground/80 hidden md:inline truncate max-w-[160px]">
                  · {selectedVoice.name}
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground truncate max-w-[240px] sm:max-w-md mt-0.5">
              {isPlaying
                ? isPaused
                  ? "Audio paused — tap resume to continue"
                  : "Playing aloud via browser speech synthesizer"
                : title
                  ? `Listen to "${title}"`
                  : "Listen to this educational article hands-free"}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Mode Selector */}
          <div className="flex items-center rounded-xl border border-border/80 bg-background/80 p-0.5 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              className={cn(
                "rounded-lg px-2 py-1 transition-all cursor-pointer",
                languageMode === "en"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title="Standard English voice"
            >
              English
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("hinglish")}
              className={cn(
                "rounded-lg px-2 py-1 transition-all cursor-pointer flex items-center gap-1",
                languageMode === "hinglish"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title="Indian English / Hinglish voice for natural technical pronunciation"
            >
              <span>🇮🇳 Hinglish</span>
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("hi")}
              className={cn(
                "rounded-lg px-2 py-1 transition-all cursor-pointer",
                languageMode === "hi"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title="Hindi pronunciation voice"
            >
              Hindi
            </button>
          </div>

          {/* Speed Toggle */}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={cycleSpeed}
            className="h-8 px-2 text-[11px] font-mono font-bold text-muted-foreground hover:text-foreground cursor-pointer"
            title="Adjust speaking rate"
          >
            <Gauge className="h-3 w-3 mr-1" />
            {rate}x
          </Button>

          {/* Voice Settings Toggle */}
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
                "h-8 w-8 p-0 text-muted-foreground hover:text-foreground cursor-pointer",
                showSettings && "bg-muted text-foreground",
              )}
              title="Voice selection"
            >
              <Settings2 className="h-3.5 w-3.5" />
            </Button>
          )}

          {/* Stop Button (only when active) */}
          {isPlaying && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleStop}
              className="h-8 w-8 p-0 rounded-xl text-destructive hover:bg-destructive/10 cursor-pointer"
              title="Stop speech"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
            </Button>
          )}

          {/* Play / Pause / Resume Button */}
          <Button
            type="button"
            size="sm"
            onClick={handleTogglePlay}
            className={cn(
              "btn-squishy rounded-xl text-xs font-bold h-8 px-3.5 shadow-2xs cursor-pointer gap-1.5",
              isPlaying && !isPaused
                ? "bg-muted text-foreground hover:bg-muted/80"
                : "bg-primary text-primary-foreground",
            )}
          >
            {isPlaying && !isPaused ? (
              <>
                <Pause className="h-3.5 w-3.5 fill-current" /> Pause
              </>
            ) : isPaused ? (
              <>
                <Play className="h-3.5 w-3.5 fill-current" /> Resume
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" /> Play Audio
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Voice Selection Panel */}
      {showSettings && voices.length > 1 && (
        <div className="mt-3 pt-3 border-t border-border/60 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-muted-foreground">Custom Voice:</span>
          <select
            value={selectedVoice?.name || ""}
            onChange={(e) => {
              const matched = voices.find((v) => v.voice.name === e.target.value);
              if (matched) {
                setSelectedVoice(matched.voice);
                if (isPlaying) {
                  speak(text, { customVoice: matched.voice, mode: languageMode });
                }
              }
            }}
            className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
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
