import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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

type SocialRow = {
  id: string;
  platform: string;
  url: string;
  label: string | null;
  enabled: boolean;
  sort_order: number;
};

const PLATFORMS = [
  "github",
  "linkedin",
  "instagram",
  "twitter",
  "youtube",
  "portfolio",
  "email",
  "other",
];

export function SocialEditor() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-dev-social"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("developer_social_links")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as SocialRow[];
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-dev-social"] });
    qc.invalidateQueries({ queryKey: ["dev-social"] });
  };

  const upsert = useMutation({
    mutationFn: async (row: Partial<SocialRow> & { platform: string; url: string }) => {
      if (row.id) {
        const { error } = await supabase
          .from("developer_social_links")
          .update(row)
          .eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("developer_social_links").insert(row);
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
      const { error } = await supabase.from("developer_social_links").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Removed");
      invalidate();
    },
  });

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">Social links</h3>
        <SocialDialog
          onSubmit={(v) => upsert.mutate(v)}
          trigger={
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" /> Add link
            </Button>
          }
        />
      </div>

      <ul className="divide-y divide-border">
        {(data ?? []).map((s) => (
          <li key={s.id} className="flex items-center gap-3 py-3">
            <Badge variant="secondary" className="capitalize">
              {s.platform}
            </Badge>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm">{s.url}</div>
              {s.label && <div className="truncate text-xs text-muted-foreground">{s.label}</div>}
            </div>
            <Switch
              checked={s.enabled}
              onCheckedChange={(v) =>
                upsert.mutate({ id: s.id, platform: s.platform, url: s.url, enabled: v })
              }
            />
            <SocialDialog
              initial={s}
              onSubmit={(v) => upsert.mutate({ ...v, id: s.id })}
              trigger={
                <Button size="icon" variant="ghost">
                  <Pencil className="h-4 w-4" />
                </Button>
              }
            />
            <Button size="icon" variant="ghost" onClick={() => remove.mutate(s.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </li>
        ))}
        {(data ?? []).length === 0 && (
          <li className="py-6 text-center text-sm text-muted-foreground">No links yet.</li>
        )}
      </ul>
    </div>
  );
}

function SocialDialog({
  initial,
  onSubmit,
  trigger,
}: {
  initial?: SocialRow;
  onSubmit: (v: {
    platform: string;
    url: string;
    label: string | null;
    sort_order: number;
    enabled: boolean;
  }) => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState(initial?.platform ?? "github");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [label, setLabel] = useState(initial?.label ?? "");
  const [order, setOrder] = useState(initial?.sort_order ?? 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit link" : "Add link"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Field label="Platform">
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PLATFORMS.map((p) => (
                  <SelectItem key={p} value={p} className="capitalize">
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="URL">
            <Input value={url} onChange={(e) => setUrl(e.target.value)} />
          </Field>
          <Field label="Display label (optional)">
            <Input value={label} onChange={(e) => setLabel(e.target.value)} />
          </Field>
          <Field label="Sort order">
            <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
          </Field>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              if (!url) return toast.error("URL required");
              onSubmit({
                platform,
                url,
                label: label || null,
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
