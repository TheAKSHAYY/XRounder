import { createFileRoute, Link } from "@tanstack/react-router";
import { Monitor, Moon, Settings as SettingsIcon, Sun, User } from "lucide-react";

import { useTheme } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings · XRounder" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <SettingsIcon className="h-5 w-5" />
        </span>
        <h1 className="font-display text-2xl font-semibold text-foreground">Settings</h1>
      </div>

      <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground">Appearance</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Choose your preferred theme for reading and navigation.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <ThemeChoice
            active={theme === "light"}
            onClick={() => setTheme("light")}
            icon={Sun}
            label="Light"
            description="Warm off-white, high clarity daylight reading"
          />
          <ThemeChoice
            active={theme === "dark"}
            onClick={() => setTheme("dark")}
            icon={Moon}
            label="Dark"
            description="Warm charcoal, restful for focused night reading"
          />
          <ThemeChoice
            active={theme === "system"}
            onClick={() => setTheme("system")}
            icon={Monitor}
            label="System"
            description="Automatically adapts to your device settings"
          />
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground">Account</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Update your display name, avatar and bio.
        </p>
        <Button asChild className="mt-4" variant="secondary">
          <Link to="/profile">
            <User className="mr-2 h-4 w-4" /> Edit profile
          </Link>
        </Button>
      </section>
    </div>
  );
}

function ThemeChoice({
  active,
  onClick,
  icon: Icon,
  label,
  description,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-start gap-2.5 rounded-2xl border p-4 text-left transition-all duration-200 ${
        active
          ? "border-primary bg-primary/5 text-foreground shadow-xs ring-1 ring-primary/30"
          : "border-border/80 bg-background/60 text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <span
          className={`grid h-8 w-8 place-items-center rounded-xl transition-colors ${
            active
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground group-hover:text-foreground"
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
        {active && <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />}
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground">{label}</div>
        <p className="mt-0.5 text-xs text-muted-foreground leading-normal">{description}</p>
      </div>
    </button>
  );
}
