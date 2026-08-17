import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Megaphone,
  Plus,
  Pencil,
  Trash2,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import {
  listAnnouncementsAdmin,
  upsertAnnouncement,
  deleteAnnouncement,
  type Announcement,
} from "@/lib/announcements.functions";
import { PageContainer } from "@/components/admin/ui/page-container";
import { PageHeader } from "@/components/admin/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/admin/announcements")({
  head: () => ({ meta: [{ title: "Announcements · Admin · BCA Gurukul" }] }),
  component: AnnouncementsPage,
});

const SEVERITY_META: Record<
  Announcement["severity"],
  { label: string; icon: typeof Info; tone: string }
> = {
  info: { label: "Info", icon: Info, tone: "bg-primary/10 text-primary border-primary/30" },
  success: {
    label: "Success",
    icon: CheckCircle2,
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  },
  warning: {
    label: "Warning",
    icon: AlertTriangle,
    tone: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
  },
  critical: {
    label: "Critical",
    icon: XCircle,
    tone: "bg-destructive/10 text-destructive border-destructive/30",
  },
};

type FormState = {
  id?: string;
  title: string;
  body: string;
  severity: Announcement["severity"];
  audience: Announcement["audience"];
  published: boolean;
  ends_at: string;
};

const EMPTY: FormState = {
  title: "",
  body: "",
  severity: "info",
  audience: "all",
  published: true,
  ends_at: "",
};

function AnnouncementsPage() {
  const qc = useQueryClient();
  const list = useServerFn(listAnnouncementsAdmin);
  const upsert = useServerFn(upsertAnnouncement);
  const del = useServerFn(deleteAnnouncement);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "announcements"],
    queryFn: () => list(),
  });

  const saveMut = useMutation({
    mutationFn: (f: FormState) =>
      upsert({
        data: {
          id: f.id,
          title: f.title,
          body: f.body,
          severity: f.severity,
          audience: f.audience,
          published: f.published,
          ends_at: f.ends_at ? new Date(f.ends_at).toISOString() : null,
        },
      }),
    onSuccess: () => {
      toast.success(form.id ? "Announcement updated" : "Announcement published");
      qc.invalidateQueries({ queryKey: ["admin", "announcements"] });
      setOpen(false);
      setForm(EMPTY);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Announcement deleted");
      qc.invalidateQueries({ queryKey: ["admin", "announcements"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function edit(a: Announcement) {
    setForm({
      id: a.id,
      title: a.title,
      body: a.body,
      severity: a.severity,
      audience: a.audience,
      published: a.published,
      ends_at: a.ends_at ? new Date(a.ends_at).toISOString().slice(0, 16) : "",
    });
    setOpen(true);
  }

  return (
    <PageContainer>
      <PageHeader
        title="Announcements"
        description="Publish site-wide messages. Students see active ones on their dashboard."
        actions={
          <Button
            onClick={() => {
              setForm(EMPTY);
              setOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> New announcement
          </Button>
        }
      />

      <div className="overflow-hidden rounded-xl border border-border/70 bg-surface">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted-foreground">Loading…</div>
        ) : (data?.length ?? 0) === 0 ? (
          <div className="flex flex-col items-center gap-2 p-12 text-center">
            <Megaphone className="h-10 w-10 text-muted-foreground/60" />
            <p className="font-medium text-foreground">No announcements yet</p>
            <p className="text-sm text-muted-foreground">
              Publish an update to notify students on their dashboard.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border/60">
            {data!.map((a) => {
              const meta = SEVERITY_META[a.severity];
              const Icon = meta.icon;
              const expired = a.ends_at && new Date(a.ends_at) < new Date();
              return (
                <li key={a.id} className="flex items-start gap-4 p-4">
                  <div className={`mt-0.5 rounded-lg border p-2 ${meta.tone}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-foreground">{a.title}</span>
                      <Badge variant="outline" className={meta.tone}>
                        {meta.label}
                      </Badge>
                      <Badge variant="outline">{a.audience}</Badge>
                      {!a.published && <Badge variant="secondary">Draft</Badge>}
                      {expired && <Badge variant="secondary">Expired</Badge>}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{a.body}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(a.created_at).toLocaleString()}
                      {a.ends_at && ` · ends ${new Date(a.ends_at).toLocaleString()}`}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => edit(a)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm(`Delete "${a.title}"?`)) deleteMut.mutate(a.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit announcement" : "New announcement"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                rows={4}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Severity</Label>
                <Select
                  value={form.severity}
                  onValueChange={(v) =>
                    setForm({ ...form, severity: v as Announcement["severity"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Audience</Label>
                <Select
                  value={form.audience}
                  onValueChange={(v) =>
                    setForm({ ...form, audience: v as Announcement["audience"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Everyone</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="admins">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Ends at (optional)</Label>
              <Input
                type="datetime-local"
                value={form.ends_at}
                onChange={(e) => setForm({ ...form, ends_at: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.published}
                onCheckedChange={(v) => setForm({ ...form, published: v })}
              />
              <Label>Published</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveMut.mutate(form)} disabled={saveMut.isPending}>
              {saveMut.isPending ? "Saving…" : form.id ? "Save" : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
