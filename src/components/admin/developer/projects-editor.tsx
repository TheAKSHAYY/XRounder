import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

type ProjectRow = {
  id: string;
  name: string;
  description: string | null;
  thumbnail_url: string | null;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  category: string | null;
  status: string;
  featured: boolean;
  sort_order: number;
};

export function ProjectsEditor() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-dev-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("developer_projects")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ProjectRow[];
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-dev-projects"] });
    qc.invalidateQueries({ queryKey: ["dev-projects"] });
  };

  const upsert = useMutation({
    mutationFn: async (row: Partial<ProjectRow> & { name: string }) => {
      if (row.id) {
        const { error } = await supabase.from("developer_projects").update(row).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("developer_projects").insert(row);
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
      const { error } = await supabase.from("developer_projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Removed");
      invalidate();
    },
  });

  const seedFlagshipProject = useMutation({
    mutationFn: async () => {
      const existing = (data ?? []).find((p) =>
        (p.name || "").toLowerCase().includes("xrounder"),
      );
      const row = {
        name: "XRounder",
        description:
          "Enterprise-grade Learning Management System for BCA students — multi-course hierarchy (Course → Semester → Subject → Unit) with notes, past papers, server-graded quizzes, admin CMS, role-based access, and real-time updates. Built solo, production-ready.",
        category: "SaaS · EdTech",
        tech_stack: [
          "TanStack Start",
          "React 19",
          "TypeScript",
          "Supabase",
          "PostgreSQL",
          "Tailwind v4",
          "shadcn/ui",
          "Cloudflare Workers",
        ],
        thumbnail_url: "/og-image.png",
        live_url: typeof window !== "undefined" ? window.location.origin : null,
        github_url: null,
        featured: true,
        status: "published",
        sort_order: 0,
      } as Partial<ProjectRow> & { name: string };
      if (existing) {
        const { error } = await supabase
          .from("developer_projects")
          .update(row)
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("developer_projects").insert(row);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("XRounder added as featured project");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-base font-semibold">Projects</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => seedFlagshipProject.mutate()}
            disabled={seedFlagshipProject.isPending}
          >
            {seedFlagshipProject.isPending ? "Adding…" : "✨ Seed XRounder"}
          </Button>
          <ProjectDialog
            onSubmit={(v) => upsert.mutate(v)}
            trigger={
              <Button size="sm">
                <Plus className="mr-1 h-4 w-4" /> Add project
              </Button>
            }
          />
        </div>
      </div>

      <ul className="divide-y divide-border">
        {(data ?? []).map((p) => (
          <li key={p.id} className="flex items-center gap-3 py-3">
            <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
              {p.thumbnail_url && (
                <img src={p.thumbnail_url} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate font-medium">{p.name}</span>
                {p.featured && <Badge className="text-[10px]">Featured</Badge>}
                <Badge variant="outline" className="text-[10px]">
                  {p.status}
                </Badge>
              </div>
              {p.description && (
                <div className="truncate text-xs text-muted-foreground">{p.description}</div>
              )}
            </div>
            <ProjectDialog
              initial={p}
              onSubmit={(v) => upsert.mutate({ ...v, id: p.id })}
              trigger={
                <Button size="icon" variant="ghost">
                  <Pencil className="h-4 w-4" />
                </Button>
              }
            />
            <Button size="icon" variant="ghost" onClick={() => remove.mutate(p.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </li>
        ))}
        {(data ?? []).length === 0 && (
          <li className="py-6 text-center text-sm text-muted-foreground">No projects yet.</li>
        )}
      </ul>
    </div>
  );
}

function ProjectDialog({
  initial,
  onSubmit,
  trigger,
}: {
  initial?: ProjectRow;
  onSubmit: (v: Partial<ProjectRow> & { name: string }) => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail_url ?? "");
  const [tech, setTech] = useState((initial?.tech_stack ?? []).join(", "));
  const [github, setGithub] = useState(initial?.github_url ?? "");
  const [live, setLive] = useState(initial?.live_url ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [status, setStatus] = useState(initial?.status ?? "published");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [order, setOrder] = useState(initial?.sort_order ?? 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit project" : "Add project"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Field label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Description">
            <Textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Thumbnail URL">
              <Input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
            </Field>
            <Field label="Category">
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Web · Mobile · AI"
              />
            </Field>
            <Field label="GitHub URL">
              <Input value={github} onChange={(e) => setGithub(e.target.value)} />
            </Field>
            <Field label="Live URL">
              <Input value={live} onChange={(e) => setLive(e.target.value)} />
            </Field>
          </div>
          <Field label="Tech stack (comma-separated)">
            <Input
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              placeholder="React, TypeScript, Supabase"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Status">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Sort order">
              <Input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
              />
            </Field>
            <div className="flex items-end gap-2">
              <Switch checked={featured} onCheckedChange={setFeatured} />
              <Label>Featured</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              if (!name) return toast.error("Name required");
              onSubmit({
                name,
                description: description || null,
                thumbnail_url: thumbnail || null,
                tech_stack: tech
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
                github_url: github || null,
                live_url: live || null,
                category: category || null,
                status,
                featured,
                sort_order: order,
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
