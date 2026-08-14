import { AlertTriangle } from "lucide-react";

import type { EnvValidationResult } from "@/lib/env";

export function EnvErrorScreen({ result }: { result: EnvValidationResult }) {
  const rows = [...result.missing, ...result.invalid];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg rounded-xl border border-destructive/30 bg-card p-6 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h1 className="font-display text-lg font-semibold text-foreground">
              Configuration required
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              BCA Gurukul can&apos;t connect to its backend because some environment values are
              missing or invalid.
            </p>
          </div>
        </div>

        <ul className="mt-5 space-y-3">
          {rows.map((row) => (
            <li key={`${row.name}-${row.present}`} className="rounded-lg bg-muted/50 p-3">
              <code className="text-sm font-semibold text-foreground">{row.name}</code>
              <p className="mt-1 text-xs text-muted-foreground">{row.hint}</p>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-muted-foreground">
          Add these to your <code>.env</code> file (and to the hosting environment), then reload the
          app.
        </p>
      </div>
    </div>
  );
}
