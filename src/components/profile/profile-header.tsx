import { Camera, GraduationCap, Loader2, Pencil, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";

export function ProfileHeader({
  name,
  email,
  role,
  avatarUrl,
  initials,
  semesterLine,
  collegeLine,
  completion,
  uploading,
  onPickPhoto,
  onRemovePhoto,
  onEdit,
}: {
  name: string;
  email: string | null;
  role: string;
  avatarUrl: string;
  initials: string;
  semesterLine: string | null;
  collegeLine: string | null;
  completion: number;
  uploading: boolean;
  onPickPhoto: () => void;
  onRemovePhoto: () => void;
  onEdit: () => void;
}) {
  return (
    <section
      id="photo"
      aria-labelledby="profile-name"
      className="rounded-xl border border-border bg-surface p-4 shadow-soft sm:p-5"
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
        <div className="relative shrink-0">
          <Avatar className="h-16 w-16 border border-border sm:h-20 sm:w-20">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${name} avatar`}
                className="h-full w-full rounded-full object-cover"
              />
            ) : null}
            <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={onPickPhoto}
            disabled={uploading}
            aria-label="Change profile photo"
            className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border border-border bg-background text-foreground shadow-soft-xs transition hover:bg-muted disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Camera className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h1 id="profile-name" className="min-w-0 truncate text-h2 text-foreground">
              {name}
            </h1>
            <Badge variant="secondary" className="shrink-0 text-[10px]">
              {role}
            </Badge>
          </div>
          <p className="mt-1 truncate text-sm text-muted-foreground [overflow-wrap:anywhere]">
            {email}
          </p>
          {(semesterLine || collegeLine) && (
            <p className="mt-1 flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
              <GraduationCap className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="truncate">
                {[semesterLine, collegeLine].filter(Boolean).join(" · ")}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Profile {completion}% complete</span>
          {completion < 100 && (
            <span className="text-muted-foreground">Finish it to personalise your learning</span>
          )}
        </div>
        <ProgressBar value={completion} label="Profile completion" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" className="tap-target" onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" /> Edit profile
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="tap-target"
          onClick={onPickPhoto}
          disabled={uploading}
        >
          <Camera className="mr-2 h-4 w-4" /> {avatarUrl ? "Change photo" : "Upload photo"}
        </Button>
        {avatarUrl && (
          <Button
            size="sm"
            variant="ghost"
            className="tap-target"
            onClick={onRemovePhoto}
            disabled={uploading}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Remove
          </Button>
        )}
      </div>
    </section>
  );
}
