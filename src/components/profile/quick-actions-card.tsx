import { Award, BookMarked, ClipboardList, Search, Settings, User } from "lucide-react";
import { Link } from "@tanstack/react-router";

const ACTIONS = [
  { label: "Edit profile", icon: User, hash: "personal" as const },
  { label: "My bookmarks", icon: BookMarked, to: "/bookmarks" },
  { label: "My results", icon: ClipboardList, to: "/dashboard" },
  { label: "Exam prep", icon: Search, to: "/search" },
  { label: "Achievements", icon: Award, hash: "achievements" as const },
  { label: "Settings", icon: Settings, to: "/settings" },
];

export function QuickActionsCard({ onJump }: { onJump: (id: string) => void }) {
  return (
    <section
      aria-labelledby="quick-actions-heading"
      className="rounded-xl border border-border bg-surface p-4 shadow-soft"
    >
      <h2 id="quick-actions-heading" className="text-h3 text-foreground">
        Quick actions
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {ACTIONS.map((a) => {
          const Icon = a.icon;
          const inner = (
            <>
              <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span className="truncate">{a.label}</span>
            </>
          );
          const cls =
            "tap-target flex min-w-0 items-center gap-2 rounded-lg border border-border/70 bg-background px-3 py-2.5 text-left text-sm text-foreground transition hover:border-primary/40 hover:bg-muted";
          return a.to ? (
            <Link key={a.label} to={a.to} className={cls}>
              {inner}
            </Link>
          ) : (
            <button key={a.label} type="button" onClick={() => onJump(a.hash!)} className={cls}>
              {inner}
            </button>
          );
        })}
      </div>
    </section>
  );
}
