import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AlertTriangle, Info, CheckCircle2, XCircle, X } from "lucide-react";

import { listActiveAnnouncements, type Announcement } from "@/lib/announcements.functions";
import { Button } from "@/components/ui/button";

const SEVERITY: Record<
  Announcement["severity"],
  { icon: typeof Info; wrap: string; iconCls: string }
> = {
  info: { icon: Info, wrap: "border-primary/30 bg-primary/5", iconCls: "text-primary" },
  success: {
    icon: CheckCircle2,
    wrap: "border-emerald-500/30 bg-emerald-500/5",
    iconCls: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    icon: AlertTriangle,
    wrap: "border-amber-500/30 bg-amber-500/5",
    iconCls: "text-amber-600 dark:text-amber-400",
  },
  critical: {
    icon: XCircle,
    wrap: "border-destructive/30 bg-destructive/5",
    iconCls: "text-destructive",
  },
};

function readDismissed(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    return new Set(JSON.parse(localStorage.getItem("bg:dismissed-announcements") ?? "[]"));
  } catch {
    return new Set();
  }
}

function writeDismissed(set: Set<string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem("bg:dismissed-announcements", JSON.stringify(Array.from(set)));
}

export function AnnouncementBanner({
  audience = "students",
}: {
  audience?: "students" | "admins";
}) {
  const list = useServerFn(listActiveAnnouncements);
  const [dismissed, setDismissed] = useState<Set<string>>(() => readDismissed());

  const { data } = useQuery({
    queryKey: ["announcements", "active"],
    queryFn: () => list(),
    staleTime: 60_000,
  });

  const visible = (data ?? [])
    .filter((a) => a.audience === "all" || a.audience === audience)
    .filter((a) => !dismissed.has(a.id));

  if (visible.length === 0) return null;

  return (
    <div className="space-y-2">
      {visible.map((a) => {
        const meta = SEVERITY[a.severity];
        const Icon = meta.icon;
        return (
          <div
            key={a.id}
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${meta.wrap}`}
          >
            <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${meta.iconCls}`} />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-foreground">{a.title}</div>
              <p className="mt-0.5 text-sm text-muted-foreground whitespace-pre-wrap">{a.body}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => {
                const next = new Set(dismissed);
                next.add(a.id);
                writeDismissed(next);
                setDismissed(next);
              }}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
