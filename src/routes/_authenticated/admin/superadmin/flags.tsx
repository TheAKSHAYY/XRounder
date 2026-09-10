import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Flag, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { listFeatureFlags, updateFeatureFlag, type FeatureFlagRow } from "@/lib/superadmin.functions";
import { PageHeader } from "@/components/admin/ui/page-header";
import { PageContainer } from "@/components/admin/ui/page-container";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { TypedConfirmationDialog } from "@/components/admin/ui/typed-confirmation-dialog";

export const Route = createFileRoute("/_authenticated/admin/superadmin/flags")({
  head: () => ({ meta: [{ title: "Feature Flags · Super Admin" }] }),
  component: FlagsPage,
});

function FlagsPage() {
  const [pendingKill, setPendingKill] = useState<FeatureFlagRow | null>(null);
  const fetchFlags = useServerFn(listFeatureFlags);
  const update = useServerFn(updateFeatureFlag);
  const qc = useQueryClient();

  const { data: flags, isLoading } = useQuery({
    queryKey: ["superadmin", "flags"],
    queryFn: () => fetchFlags(),
  });

  const updateMut = useMutation({
    mutationFn: (vars: {
      key: string;
      enabled?: boolean;
      kill_switch?: boolean;
      reason?: string;
    }) => update({ data: vars }),
    onSuccess: () => {
      toast.success("Flag updated");
      qc.invalidateQueries({ queryKey: ["superadmin", "flags"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const grouped = (flags ?? []).reduce<Record<string, typeof flags>>((acc, f) => {
    const key = f.module ?? "general";
    (acc[key] ||= [] as never).push(f);
    return acc;
  }, {});

  return (
    <PageContainer>
      <PageHeader
        title="Feature flags"
        description="Enable, disable, or kill-switch entire modules without a redeploy."
      />

      {isLoading ? (
        <div className="rounded-xl border border-border/70 bg-surface p-10 text-center text-sm text-muted-foreground">
          Loading…
        </div>
      ) : (flags ?? []).length === 0 ? (
        <div className="rounded-xl border border-border/70 bg-surface p-10 text-center text-sm text-muted-foreground">
          No feature flags configured yet.
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([module, items]) => (
            <section key={module}>
              <h2 className="mb-2 font-serif text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {module}
              </h2>
              <div className="divide-y divide-border/60 rounded-xl border border-border/70 bg-surface">
                {(items ?? []).map((f) => (
                  <div key={f.key} className="flex items-start justify-between gap-4 p-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-muted-foreground" />
                        <code className="font-mono text-sm font-semibold text-foreground">
                          {f.key}
                        </code>
                        {f.kill_switch && (
                          <Badge
                            variant="outline"
                            className="border-destructive/40 bg-destructive/10 text-destructive"
                          >
                            <AlertTriangle className="mr-1 h-3 w-3" /> Killed
                          </Badge>
                        )}
                      </div>
                      {f.description && (
                        <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        Enabled
                        <Switch
                          checked={f.enabled}
                          disabled={updateMut.isPending}
                          onCheckedChange={(v) => updateMut.mutate({ key: f.key, enabled: v })}
                        />
                      </label>
                      <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        Kill
                        <Switch
                          checked={f.kill_switch}
                          disabled={updateMut.isPending}
                          onCheckedChange={(v) => {
                            if (v) {
                              setPendingKill(f);
                            } else {
                              updateMut.mutate({ key: f.key, kill_switch: false });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {pendingKill && (
        <TypedConfirmationDialog
          open={!!pendingKill}
          onOpenChange={(open) => {
            if (!open) setPendingKill(null);
          }}
          title="Activate Emergency Kill Switch"
          description={
            <>
              Activating the emergency kill switch for{" "}
              <strong className="font-mono text-foreground">{pendingKill.key}</strong> will immediately disable the entire module for all users platform-wide.
            </>
          }
          targetResourceName={pendingKill.key}
          requireReason={true}
          reasonLabel="Reason for emergency kill switch (recorded in audit log):"
          confirmButtonText="Activate Kill Switch"
          destructive={true}
          isLoading={updateMut.isPending}
          onConfirm={async (reason) => {
            await updateMut.mutateAsync({
              key: pendingKill.key,
              kill_switch: true,
              reason: reason || undefined,
            });
            setPendingKill(null);
          }}
        />
      )}
    </PageContainer>
  );
}
