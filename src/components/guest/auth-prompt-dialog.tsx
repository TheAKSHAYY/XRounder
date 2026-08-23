import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Single reusable prompt shown whenever a guest reaches for a feature that
 * needs an account (bookmarks, progress, full quizzes) or when a gentle
 * conversion nudge is due.
 */
export function AuthPromptDialog({
  open,
  onOpenChange,
  title = "Create a free account to keep this",
  description = "Guest mode is great for exploring. Sign up free to save bookmarks, track progress and take full quizzes — it takes seconds.",
  benefits = ["Save notes & papers", "Track progress and streaks", "Full quizzes with results"],
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title?: string;
  description?: string;
  benefits?: string[];
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" aria-hidden />
          </div>
          <DialogTitle className="font-display text-xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {b}
            </li>
          ))}
        </ul>

        <DialogFooter className="mt-2 gap-2 sm:flex-row">
          <Button asChild className="rounded-full">
            <Link to="/auth" search={{ mode: "signup" }}>
              Create free account
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/auth" search={{ mode: "signin" }}>
              Sign in
            </Link>
          </Button>
          <Button variant="ghost" className="rounded-full" onClick={() => onOpenChange(false)}>
            Keep exploring
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
