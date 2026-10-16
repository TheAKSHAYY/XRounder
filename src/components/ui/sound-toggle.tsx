import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isSoundEnabled, setSoundEnabled, playCorrectSound } from "@/lib/sound-fx";
import { Button } from "@/components/ui/button";

export function SoundToggle({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isSoundEnabled());
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    setSoundEnabled(next);
    if (next) {
      playCorrectSound();
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      className={
        className ??
        "h-8 w-8 rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
      }
      title={
        enabled ? "Sound effects enabled (Click to mute)" : "Sound effects muted (Click to enable)"
      }
      aria-label={enabled ? "Mute sounds" : "Unmute sounds"}
    >
      {enabled ? (
        <Volume2 className="h-4 w-4 text-primary" />
      ) : (
        <VolumeX className="h-4 w-4 opacity-50" />
      )}
    </Button>
  );
}
