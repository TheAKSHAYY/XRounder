import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Search, Shield, ShieldCheck, GraduationCap, UserCog, Ban, Undo2 } from "lucide-react";
import { toast } from "sonner";

import { listUsers, grantRole, revokeRole, type AppRole, type AdminUserRow } from "@/lib/superadmin.functions";
import { setUserSuspended } from "@/lib/announcements.functions";
import { PageHeader } from "@/components/admin/ui/page-header";
import { PageContainer } from "@/components/admin/ui/page-container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TypedConfirmationDialog } from "@/components/admin/ui/typed-confirmation-dialog";

export const Route = createFileRoute("/_authenticated/admin/superadmin/users")({
  head: () => ({ meta: [{ title: "Staff & Access · Super Admin" }] }),
  component: UsersPage,
});

const ROLE_META: Record<AppRole, { label: string; icon: typeof Shield; tone: string }> = {
  super_admin: {
    label: "Super admin",
    icon: ShieldCheck,
    tone: "bg-primary/10 text-primary border-primary/30",
  },
  admin: {
    label: "Admin",
    icon: Shield,
    tone: "bg-accent/15 text-accent-foreground border-accent/30",
  },
  instructor: {
    label: "Instructor",
    icon: UserCog,
    tone: "bg-muted text-foreground border-border",
  },
  student: {
    label: "Student",
    icon: GraduationCap,
    tone: "bg-muted/60 text-muted-foreground border-border",
  },
};

const ASSIGNABLE: AppRole[] = ["admin", "instructor", "super_admin"];

function UsersPage() {
  const [search, setSearch] = useState("");
  const [pendingRevoke, setPendingRevoke] = useState<{ user: AdminUserRow; role: AppRole } | null>(null);
  const [pendingGrant, setPendingGrant] = useState<{ user: AdminUserRow; role: AppRole } | null>(null);
  const [pendingSuspend, setPendingSuspend] = useState<AdminUserRow | null>(null);

  const fetchUsers = useServerFn(listUsers);
  const grant = useServerFn(grantRole);
  const revoke = useServerFn(revokeRole);
  const suspendFn = useServerFn(setUserSuspended);
  const qc = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ["superadmin", "users"],
    queryFn: () => fetchUsers({ data: {} }),
  });

  const grantMut = useMutation({
    mutationFn: (vars: { userId: string; role: AppRole; reason?: string }) => grant({ data: vars }),
    onSuccess: (_d, vars) => {
      toast.success(`${ROLE_META[vars.role].label} granted`);
      qc.invalidateQueries({ queryKey: ["superadmin", "users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const revokeMut = useMutation({
    mutationFn: (vars: { userId: string; role: AppRole; reason?: string }) => revoke({ data: vars }),
    onSuccess: (_d, vars) => {
      toast.success(`${ROLE_META[vars.role].label} revoked`);
      qc.invalidateQueries({ queryKey: ["superadmin", "users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const suspendMut = useMutation({
    mutationFn: (vars: { userId: string; suspended: boolean; reason?: string }) =>
      suspendFn({ data: vars }),
    onSuccess: (_d, vars) => {
      toast.success(vars.suspended ? "User suspended" : "User reinstated");
      qc.invalidateQueries({ queryKey: ["superadmin", "users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const q = search.toLowerCase().trim();
  const filtered = (users ?? []).filter(
    (u) =>
      !q ||
      (u.email ?? "").toLowerCase().includes(q) ||
      (u.full_name ?? "").toLowerCase().includes(q),
  );

  return (
    <PageContainer>
      <PageHeader
        title="Users & roles"
        description="Grant or revoke admin, instructor, and super admin access. Every change is recorded in the audit log."
      />

      <div className="mb-4 flex items-center gap-3">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="pl-9"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filtered.length} of {users?.length ?? 0}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/70 bg-surface">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted-foreground">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">No users found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Roles</th>
                <th className="px-4 py-3">Last sign-in</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.user_id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-medium text-foreground">{u.full_name ?? "—"}</div>
                        <div className="text-xs text-muted-foreground">
                          {u.email ?? u.user_id.slice(0, 8)}
                        </div>
                      </div>
                      {u.suspended && (
                        <Badge
                          variant="outline"
                          className="border-destructive/40 bg-destructive/10 text-destructive"
                        >
                          <Ban className="mr-1 h-3 w-3" /> Suspended
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {u.roles.length === 0 && (
                        <span className="text-xs text-muted-foreground">student</span>
                      )}
                      {u.roles.map((r) => {
                        const meta = ROLE_META[r];
                        const Icon = meta.icon;
                        return (
                          <Badge key={r} variant="outline" className={meta.tone}>
                            <Icon className="mr-1 h-3 w-3" /> {meta.label}
                          </Badge>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {ASSIGNABLE.map((role) => {
                        const has = u.roles.includes(role);
                        return (
                          <Button
                            key={role}
                            size="sm"
                            variant={has ? "outline" : "secondary"}
                            disabled={grantMut.isPending || revokeMut.isPending}
                            onClick={() => {
                              if (has) {
                                setPendingRevoke({ user: u, role });
                              } else if (role === "super_admin" || role === "admin") {
                                setPendingGrant({ user: u, role });
                              } else {
                                grantMut.mutate({ userId: u.user_id, role });
                              }
                            }}
                          >
                            {has ? `Revoke ${ROLE_META[role].label}` : `+ ${ROLE_META[role].label}`}
                          </Button>
                        );
                      })}
                      {u.suspended ? (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={suspendMut.isPending}
                          onClick={() => suspendMut.mutate({ userId: u.user_id, suspended: false })}
                        >
                          <Undo2 className="mr-1 h-3 w-3" /> Reinstate
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-destructive/40 text-destructive hover:bg-destructive/10"
                          disabled={suspendMut.isPending}
                          onClick={() => setPendingSuspend(u)}
                        >
                          <Ban className="mr-1 h-3 w-3" /> Suspend
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {pendingRevoke && (
        <TypedConfirmationDialog
          open={!!pendingRevoke}
          onOpenChange={(open) => {
            if (!open) setPendingRevoke(null);
          }}
          title={`Revoke ${ROLE_META[pendingRevoke.role].label} Access`}
          description={
            <>
              Revoking <strong className="text-foreground">{ROLE_META[pendingRevoke.role].label}</strong> permissions from{" "}
              <strong className="text-foreground">{pendingRevoke.user.full_name ?? pendingRevoke.user.email ?? pendingRevoke.user.user_id}</strong> will immediately terminate their elevated administrative access.
            </>
          }
          targetResourceName={pendingRevoke.user.email ?? pendingRevoke.user.user_id}
          requireReason={true}
          reasonLabel="Reason for role revocation (recorded in audit log):"
          confirmButtonText="Revoke Role"
          destructive={true}
          isLoading={revokeMut.isPending}
          onConfirm={async (reason) => {
            await revokeMut.mutateAsync({
              userId: pendingRevoke.user.user_id,
              role: pendingRevoke.role,
              reason: reason || undefined,
            });
            setPendingRevoke(null);
          }}
        />
      )}

      {pendingGrant && (
        <TypedConfirmationDialog
          open={!!pendingGrant}
          onOpenChange={(open) => {
            if (!open) setPendingGrant(null);
          }}
          title={`Grant ${ROLE_META[pendingGrant.role].label} Access`}
          description={
            <>
              Granting <strong className="text-foreground">{ROLE_META[pendingGrant.role].label}</strong> privileges to{" "}
              <strong className="text-foreground">{pendingGrant.user.full_name ?? pendingGrant.user.email ?? pendingGrant.user.user_id}</strong> gives them elevated administrative authority across XRounder.
            </>
          }
          targetResourceName={pendingGrant.user.email ?? pendingGrant.user.user_id}
          requireReason={false}
          confirmButtonText={`Grant ${ROLE_META[pendingGrant.role].label}`}
          destructive={false}
          isLoading={grantMut.isPending}
          onConfirm={async (reason) => {
            await grantMut.mutateAsync({
              userId: pendingGrant.user.user_id,
              role: pendingGrant.role,
              reason: reason || undefined,
            });
            setPendingGrant(null);
          }}
        />
      )}

      {pendingSuspend && (
        <TypedConfirmationDialog
          open={!!pendingSuspend}
          onOpenChange={(open) => {
            if (!open) setPendingSuspend(null);
          }}
          title="Suspend User Account"
          description={
            <>
              Suspending account <strong className="text-foreground">{pendingSuspend.full_name ?? pendingSuspend.email ?? pendingSuspend.user_id}</strong> will immediately terminate all active sessions and block further platform access.
            </>
          }
          targetResourceName={pendingSuspend.email ?? pendingSuspend.user_id}
          requireReason={true}
          reasonLabel="Reason for account suspension (recorded in audit log):"
          confirmButtonText="Suspend Account"
          destructive={true}
          isLoading={suspendMut.isPending}
          onConfirm={async (reason) => {
            await suspendMut.mutateAsync({
              userId: pendingSuspend.user_id,
              suspended: true,
              reason: reason || undefined,
            });
            setPendingSuspend(null);
          }}
        />
      )}
    </PageContainer>
  );
}
