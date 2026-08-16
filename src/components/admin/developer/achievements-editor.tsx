import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Field } from "./shared";

type AchievementRow = {
  id: string;
  title: string;
  kind: string;
  issuer: string | null;
  description: string | null;
  date_awarded: string | null;
  url: string | null;
  image_url: string | null;
  sort_order: number;
  enabled: boolean;
};

const ACH_KINDS = ["certificate", "award", "hackathon", "open-source", "badge"];

export function AchievementsEditor() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-dev-achievements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("developer_achievements")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as AchievementRow[];
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-dev-achievements"] });
    qc.invalidateQueries({ queryKey: ["dev-achievements"] });
  };

  const upsert = useMutation({
    mutationFn: async (row: Partial<AchievementRow> & { title: string }) => {
      if (row.id) {
        const { error } = await supabase
          .from("developer_achievements")
          .update(row)
          .eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("developer_achievements").insert(row);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Saved");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("developer_achievements").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">Achievements</h3>
        <AchievementDialog
          onSubmit={(v) => upsert.mutate(v)}
          trigger={
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" /> Add achievement
            </Button>
          }
        />
      </div>

      <ul className="divide-y divide-border">
        {(data ?? []).map((a) => (
          <li key={a.id} className="flex items-center gap-3 py-3">
            <Badge variant="secondary" className="capitalize">
              {a.kind}
            </Badge>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{a.title}</div>
              {a.issuer && <div className="truncate text-xs text-muted-foreground">{a.issuer}</div>}
            </div>
            <AchievementDialog
              initial={a}
              onSubmit={(v) => upsert.mutate({ ...v, id: a.id })}
              trigger={
                <Button size="icon" variant="ghost">
                  <Pencil className="h-4 w-4" />
                </Button>
              }
            />
            <Button size="icon" variant="ghost" onClick={() => remove.mutate(a.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </li>
        ))}
        {(data ?? []).length === 0 && (
          <li className="py-6 text-center text-sm text-muted-foreground">No achievements yet.</li>
        )}
      </ul>
    </div>
  );
}

function AchievementDialog({
  initial,
  onSubmit,
  trigger,
}: {
  initial?: AchievementRow;
  onSubmit: (v: Partial<AchievementRow> & { title: string }) => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [kind, setKind] = useState(initial?.kind ?? "certificate");
  const [issuer, setIssuer] = useState(initial?.issuer ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [date, setDate] = useState(initial?.date_awarded ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [image, setImage] = useState(initial?.image_url ?? "");
  const [order, setOrder] = useState(initial?.sort_order ?? 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit achievement" : "Add achievement"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Field label="Title">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Kind">
              <Select value={kind} onValueChange={setKind}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ACH_KINDS.map((k) => (
                    <SelectItem key={k} value={k} className="capitalize">
                      {k}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Issuer">
              <Input value={issuer} onChange={(e) => setIssuer(e.target.value)} />
            </Field>
            <Field label="Date awarded">
              <Input type="date" value={date ?? ""} onChange={(e) => setDate(e.target.value)} />
            </Field>
            <Field label="Sort order">
              <Input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
              />
            </Field>
            <Field label="Link URL">
              <Input value={url} onChange={(e) => setUrl(e.target.value)} />
            </Field>
            <Field label="Image URL">
              <Input value={image} onChange={(e) => setImage(e.target.value)} />
            </Field>
          </div>
          <Field label="Description">
            <Textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              if (!title) return toast.error("Title required");
              onSubmit({
                title,
                kind,
                issuer: issuer || null,
                description: description || null,
                date_awarded: date || null,
                url: url || null,
                image_url: image || null,
                sort_order: order,
                enabled: initial?.enabled ?? true,
              });
              setOpen(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
