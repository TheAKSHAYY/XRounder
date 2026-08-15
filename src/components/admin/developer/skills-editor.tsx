import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "./shared";

type SkillRow = {
  id: string;
  name: string;
  category: string;
  icon: string | null;
  sort_order: number;
  enabled: boolean;
};

const SKILL_CATEGORIES = ["language", "framework", "database", "tool", "technology"];

export function SkillsEditor() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-dev-skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("developer_skills")
        .select("*")
        .order("category")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as SkillRow[];
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-dev-skills"] });
    qc.invalidateQueries({ queryKey: ["dev-skills"] });
  };

  const [name, setName] = useState("");
  const [category, setCategory] = useState("language");

  const add = useMutation({
    mutationFn: async () => {
      if (!name.trim()) throw new Error("Name required");
      const { error } = await supabase
        .from("developer_skills")
        .insert({ name: name.trim(), category });
      if (error) throw error;
    },
    onSuccess: () => {
      setName("");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("developer_skills")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-wrap items-end gap-3">
        <Field label="New skill" className="flex-1 min-w-[200px]">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="React"
          />
        </Field>
        <Field label="Category">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SKILL_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c} className="capitalize">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Button onClick={() => add.mutate()} disabled={add.isPending}>
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>

      <div className="space-y-4">
        {SKILL_CATEGORIES.map((cat) => {
          const list = (data ?? []).filter((s) => s.category === cat);
          if (list.length === 0) return null;
          return (
            <div key={cat}>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {cat}
              </h4>
              <div className="flex flex-wrap gap-2">
                {list.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1 text-sm"
                  >
                    {s.name}
                    <button
                      onClick={() => remove.mutate(s.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        {(data ?? []).length === 0 && (
          <p className="text-sm text-muted-foreground">No skills yet.</p>
        )}
      </div>
    </div>
  );
}
