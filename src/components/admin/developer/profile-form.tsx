import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Field } from "./shared";

type ProfileRow = {
  full_name: string | null;
  professional_title: string | null;
  short_intro: string | null;
  bio: string | null;
  education: string | null;
  current_goal: string | null;
  career_objective: string | null;
  interests: string | null;
  email: string | null;
  photo_url: string | null;
  resume_url: string | null;
  github_username: string | null;
  hero_cta_primary_label: string | null;
  hero_cta_secondary_label: string | null;
  enabled: boolean;
};

export function ProfileForm() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-dev-profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("developer_profile")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return data as ProfileRow | null;
    },
  });

  const [form, setForm] = useState<ProfileRow | null>(null);
  const current = form ?? data ?? null;

  const save = useMutation({
    mutationFn: async (row: ProfileRow) => {
      const { error } = await supabase
        .from("developer_profile")
        .update(row)
        .eq("id", 1);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Profile saved");
      qc.invalidateQueries({ queryKey: ["admin-dev-profile"] });
      qc.invalidateQueries({ queryKey: ["dev-profile"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!current) return <div className="text-sm text-muted-foreground">Loading…</div>;

  function set<K extends keyof ProfileRow>(k: K, v: ProfileRow[K]) {
    setForm({ ...(current as ProfileRow), [k]: v });
  }

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Switch
            checked={current.enabled}
            onCheckedChange={(v) => set("enabled", v)}
          />
          <Label className="text-sm">Show developer page publicly</Label>
        </div>
        <Button
          onClick={() => save.mutate(current)}
          disabled={save.isPending}
        >
          {save.isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <Input
            value={current.full_name ?? ""}
            onChange={(e) => set("full_name", e.target.value)}
          />
        </Field>
        <Field label="Professional title">
          <Input
            value={current.professional_title ?? ""}
            onChange={(e) => set("professional_title", e.target.value)}
            placeholder="Full-stack developer · BCA student"
          />
        </Field>
        <Field label="Email" className="sm:col-span-2">
          <Input
            type="email"
            value={current.email ?? ""}
            onChange={(e) => set("email", e.target.value)}
          />
        </Field>
        <Field label="Photo URL">
          <Input
            value={current.photo_url ?? ""}
            onChange={(e) => set("photo_url", e.target.value)}
            placeholder="https://…"
          />
        </Field>
        <Field label="Resume URL (PDF)">
          <Input
            value={current.resume_url ?? ""}
            onChange={(e) => set("resume_url", e.target.value)}
            placeholder="https://…"
          />
        </Field>
        <Field label="GitHub username">
          <Input
            value={current.github_username ?? ""}
            onChange={(e) => set("github_username", e.target.value)}
            placeholder="TheAKSHAYY"
          />
        </Field>
        <Field label="Hero primary CTA label">
          <Input
            value={current.hero_cta_primary_label ?? ""}
            onChange={(e) => set("hero_cta_primary_label", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Short intro (hero subtitle)">
        <Textarea
          rows={3}
          value={current.short_intro ?? ""}
          onChange={(e) => set("short_intro", e.target.value)}
        />
      </Field>

      <Field label="Bio">
        <Textarea
          rows={5}
          value={current.bio ?? ""}
          onChange={(e) => set("bio", e.target.value)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Education">
          <Textarea
            rows={3}
            value={current.education ?? ""}
            onChange={(e) => set("education", e.target.value)}
          />
        </Field>
        <Field label="Current goal">
          <Textarea
            rows={3}
            value={current.current_goal ?? ""}
            onChange={(e) => set("current_goal", e.target.value)}
          />
        </Field>
        <Field label="Career objective">
          <Textarea
            rows={3}
            value={current.career_objective ?? ""}
            onChange={(e) => set("career_objective", e.target.value)}
          />
        </Field>
        <Field label="Interests">
          <Textarea
            rows={3}
            value={current.interests ?? ""}
            onChange={(e) => set("interests", e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}
