import { useState } from "react";
import { KeyRound, Loader2, Monitor, ShieldAlert, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmDialog } from "@/components/admin/ui/confirm-dialog";
import { formatDateTime } from "@/lib/format";

export type SessionRow = {
  id: string;
  device_kind: string;
  city: string | null;
  country: string | null;
  last_seen_at: string;
};

export function SecurityCard({
  lastSignInAt,
  sessions,
  sessionsLoading,
  changingPassword,
  deleting,
  onChangePassword,
  onDeleteAccount,
}: {
  lastSignInAt: string | null | undefined;
  sessions: SessionRow[];
  sessionsLoading: boolean;
  changingPassword: boolean;
  deleting: boolean;
  onChangePassword: (password: string) => Promise<boolean>;
  onDeleteAccount: () => void;
}) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    const ok = await onChangePassword(password);
    if (ok) {
      setPassword("");
      setConfirm("");
    }
  }

  return (
    <section
      id="security"
      aria-labelledby="security-heading"
      className="rounded-xl border border-border bg-surface p-4 shadow-soft"
    >
      <h2 id="security-heading" className="text-h3 text-foreground">
        Security
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Last sign-in: <span className="text-foreground">{formatDateTime(lastSignInAt)}</span>
      </p>

      <form onSubmit={submitPassword} className="mt-4 space-y-3" aria-label="Change password">
        <div className="flex items-center gap-1.5 text-eyebrow text-muted-foreground">
          <KeyRound className="h-3 w-3" aria-hidden /> Change password
        </div>
        <div className="min-w-0 space-y-2">
          <Label htmlFor="new-password">New password</Label>
          <Input
            id="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            disabled={changingPassword}
          />
        </div>
        <div className="min-w-0 space-y-2">
          <Label htmlFor="confirm-password">Confirm new password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            disabled={changingPassword}
          />
        </div>
        {error && (
          <p className="text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
        <Button
          type="submit"
          size="sm"
          variant="secondary"
          className="tap-target w-full sm:w-auto"
          disabled={changingPassword || !password || !confirm}
        >
          {changingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update password
        </Button>
      </form>

      <div className="mt-5">
        <div className="flex items-center gap-1.5 text-eyebrow text-muted-foreground">
          <Monitor className="h-3 w-3" aria-hidden /> Active devices
        </div>
        {sessionsLoading ? (
          <div className="mt-2 space-y-2">
            <Skeleton className="h-10 rounded-lg" />
            <Skeleton className="h-10 rounded-lg" />
          </div>
        ) : sessions.length === 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">
            No device records yet — this device will appear after your next sign-in.
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-border/70 rounded-lg border border-border/70 bg-background">
            {sessions.map((s) => (
              <li key={s.id} className="min-w-0 px-3 py-2.5">
                <div className="truncate text-sm font-medium capitalize text-foreground">
                  {s.device_kind || "Unknown device"}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {[s.city, s.country].filter(Boolean).join(", ") || "Location unknown"} ·{" "}
                  {formatDateTime(s.last_seen_at)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
        <div className="flex items-center gap-1.5 text-sm font-medium text-destructive">
          <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden /> Danger zone
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Deleting your account removes your profile, progress and quiz history permanently.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="tap-target mt-3 w-full border-destructive/40 text-destructive hover:bg-destructive/10 sm:w-auto"
          onClick={() => setConfirmDelete(true)}
          disabled={deleting}
        >
          {deleting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="mr-2 h-4 w-4" />
          )}
          Delete account
        </Button>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete your account?"
        description="This permanently deletes your account, profile and learning history. This cannot be undone."
        confirmLabel="Delete permanently"
        destructive
        onConfirm={onDeleteAccount}
      />
    </section>
  );
}
