import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Search, Shield, ShieldCheck, GraduationCap, UserCog, Ban, Undo2 } from "lucide-react";
import { toast } from "sonner";

import { listUsers, grantRole, revokeRole, type AppRole } from "@/lib/superadmin.functions";
import { setUserSuspended } from "@/lib/announcements.functions";
import { PageHeader } from "@/components/admin/ui/page-header";
import { PageContainer } from "@/components/admin/ui/page-container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/admin/superadmin/users")({
  head: () => ({ meta: [{ title: "Users & Roles · Super Admin" }] }),
  component: UsersPage,
});

const ROLE_META: Record<AppRole, { label: string; icon: typeof Shield; tone: string }> = {
  super_admin: { label: "Super admin", icon: ShieldCheck, tone: "bg-primary/10 text-primary border-primary/30" },
  admin: { label: "Admin", icon: Shield, tone: "bg-accent/15 text-accent-foreground border-accent/30" },
  instructor: { label: "Instructor", icon: UserCog, tone: "bg-muted text-foreground border-border" },
  student: { label: "Student", icon: GraduationCap, tone: "bg-muted/60 text-muted-foreground border-border" },
};

const ASSIGNABLE: AppRole[] = ["admin", "instructor", "super_admin"];

function UsersPage() {
  const [search, setSearch] = useState("");
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
    mutationFn: (vars: { userId: string; role: AppRole }) => grant({ data: vars }),
    onSuccess: (_d, vars) => {
      toast.success(`${ROLE_META[vars.role].label} granted`);
      qc.invalidateQueries({ queryKey: ["superadmin", "users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const revokeMut = useMutation({
    mutationFn: (vars: { userId: string; role: AppRole }) => revoke({ data: vars }),
    onSuccess: (_d, vars) => {
      toast.success(`${ROLE_META[vars.role].label} revoked`);
      qc.invalidateQueries({ queryKey: ["superadmin", "users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const suspendMut = useMutation({
    mutationFn: (vars: { userId: string; suspended: boolean; reason?: string }) => suspendFn({ data: vars }),
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
        <div className="text-sm text-muted-foreground">{filtered.length} of {users?.length ?? 0}</div>
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
                          <div className="text-xs text-muted-foreground">{u.email ?? u.user_id.slice(0, 8)}</div>
                        </div>
                        {u.suspended && (
                          <Badge variant="outline" className="border-destructive/40 bg-destructive/10 text-destructive">
                            <Ban className="mr-1 h-3 w-3" /> Suspended
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        {u.roles.length === 0 && <span className="text-xs text-muted-foreground">student</span>}
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
                              onClick={() =>
                                has
                                  ? revokeMut.mutate({ userId: u.user_id, role })
                                  : grantMut.mutate({ userId: u.user_id, role })
                              }
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
                            onClick={() => {
                              const reason = prompt(`Suspend ${u.email ?? u.user_id}? Enter reason (optional):`);
                              if (reason === null) return;
                              suspendMut.mutate({ userId: u.user_id, suspended: true, reason: reason || undefined });
                            }}
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
    </PageContainer>
  );
}
