import { useEffect, useState } from "react";
import { Command as CommandIcon, ExternalLink, Link2, Mail, Moon, Sun } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useTheme } from "@/components/theme/theme-provider";
import { platformIcon } from "./portfolio.types";
import type { Profile, Project, Social } from "./portfolio.types";

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "github", label: "GitHub activity" },
  { id: "contact", label: "Contact" },
];

/**
 * ⌘K / Ctrl+K quick-jump palette for the portfolio: sections, live projects,
 * socials, copy-email and theme toggle — all client-side, no new data.
 */
export function PortfolioCommand({
  profile,
  projects,
  socials,
}: {
  profile: Profile;
  projects: Project[];
  socials: Social[];
}) {
  const [open, setOpen] = useState(false);
  const { resolved, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    window.setTimeout(fn, 60);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const linkedProjects = projects.filter((p) => p.live_url || p.github_url);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open quick navigation (Ctrl or Command + K)"
        className="hidden shrink-0 items-center gap-1.5 rounded-md border border-border bg-surface px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
      >
        <CommandIcon className="h-3.5 w-3.5" aria-hidden />
        <span className="font-medium">K</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Jump to a section, project or link…" />
        <CommandList>
          <CommandEmpty>No matches.</CommandEmpty>
          <CommandGroup heading="Sections">
            {SECTIONS.map((s) => (
              <CommandItem
                key={s.id}
                value={`section ${s.label}`}
                onSelect={() => run(() => scrollTo(s.id))}
              >
                <Link2 className="mr-2 h-4 w-4" aria-hidden />
                {s.label}
              </CommandItem>
            ))}
          </CommandGroup>

          {linkedProjects.length > 0 && (
            <CommandGroup heading="Projects">
              {linkedProjects.map((p) => (
                <CommandItem
                  key={p.id}
                  value={`project ${p.name}`}
                  onSelect={() =>
                    run(() =>
                      window.open(p.live_url || p.github_url || "#", "_blank", "noreferrer"),
                    )
                  }
                >
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
                  {p.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandGroup heading="Actions">
            {profile.email && (
              <CommandItem
                value="copy email address"
                onSelect={() => run(() => navigator.clipboard?.writeText(profile.email ?? ""))}
              >
                <Mail className="mr-2 h-4 w-4" aria-hidden />
                Copy email
              </CommandItem>
            )}
            <CommandItem
              value="toggle theme dark light"
              onSelect={() => run(() => setTheme(resolved === "dark" ? "light" : "dark"))}
            >
              {resolved === "dark" ? (
                <Sun className="mr-2 h-4 w-4" aria-hidden />
              ) : (
                <Moon className="mr-2 h-4 w-4" aria-hidden />
              )}
              Switch to {resolved === "dark" ? "light" : "dark"} mode
            </CommandItem>
            {socials.map((s) => {
              const Icon = platformIcon(s.platform);
              return (
                <CommandItem
                  key={s.id}
                  value={`open ${s.platform}`}
                  onSelect={() => run(() => window.open(s.url, "_blank", "noreferrer"))}
                >
                  <Icon className="mr-2 h-4 w-4" aria-hidden />
                  <span className="capitalize">Open {s.platform}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
