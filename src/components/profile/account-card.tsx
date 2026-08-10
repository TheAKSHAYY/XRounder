import { Bell, Globe, LogOut, Mail, Palette, Shield } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/components/theme/theme-provider";
import {
  DEFAULT_NOTIFICATION_PREFS,
  NOTIFICATION_PREF_KEYS,
  type NotificationPrefs,
} from "@/lib/profile";

const LOCALES = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी (Hindi)" },
];

export function AccountCard({
  prefs,
  locale,
  savingPrefs,
  onTogglePref,
  onLocaleChange,
  onSignOut,
}: {
  prefs: NotificationPrefs;
  locale: string;
  savingPrefs: boolean;
  onTogglePref: (key: keyof NotificationPrefs, value: boolean) => void;
  onLocaleChange: (locale: string) => void;
  onSignOut: () => void;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <section
      id="account"
      aria-labelledby="account-heading"
      className="rounded-xl border border-border bg-surface p-4 shadow-soft"
    >
      <h2 id="account-heading" className="text-h3 text-foreground">
        Account &amp; settings
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Notifications, appearance and language for your account.
      </p>

      <div className="mt-4">
        <div className="flex items-center gap-1.5 text-eyebrow text-muted-foreground">
          <Bell className="h-3 w-3" aria-hidden /> Notification preferences
        </div>
        <ul className="mt-2 divide-y divide-border/70 rounded-lg border border-border/70 bg-background">
          {NOTIFICATION_PREF_KEYS.map((p) => {
            const checked = prefs[p.key] ?? DEFAULT_NOTIFICATION_PREFS[p.key];
            return (
              <li
                key={p.key}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <Label htmlFor={`pref-${p.key}`} className="text-sm font-medium text-foreground">
                    {p.label}
                  </Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">{p.hint}</p>
                </div>
                <Switch
                  id={`pref-${p.key}`}
                  checked={checked}
                  disabled={savingPrefs}
                  onCheckedChange={(v) => onTogglePref(p.key, v)}
                  aria-label={p.label}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <Label htmlFor="theme-select" className="flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5" aria-hidden /> Theme
          </Label>
          <Select value={theme} onValueChange={(v) => setTheme(v as typeof theme)}>
            <SelectTrigger id="theme-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="midnight">Midnight</SelectItem>
              <SelectItem value="ocean">Ocean</SelectItem>
              <SelectItem value="emerald">Emerald</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="high-contrast">High contrast</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="locale-select" className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5" aria-hidden /> Language
          </Label>
          <Select value={locale || "en"} onValueChange={onLocaleChange}>
            <SelectTrigger id="locale-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LOCALES.map((l) => (
                <SelectItem key={l.value} value={l.value}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild variant="outline" size="sm" className="tap-target">
          <Link to="/settings">
            <Shield className="mr-2 h-4 w-4" /> All settings
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm" className="tap-target">
          <Link to="/help">
            <Mail className="mr-2 h-4 w-4" /> Contact support
          </Link>
        </Button>
        <Button variant="ghost" size="sm" className="tap-target ml-auto" onClick={onSignOut}>
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </Button>
      </div>
    </section>
  );
}
