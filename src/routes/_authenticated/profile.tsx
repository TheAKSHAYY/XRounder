import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useRoles } from "@/hooks/use-roles";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Your profile · BCA Gurukul" },
      {
        name: "description",
        content: "Update your name, avatar and bio for your BCA Gurukul account.",
      },
      { property: "og:title", content: "Your profile · BCA Gurukul" },
      {
        property: "og:description",
        content: "Update your name, avatar and bio for your BCA Gurukul account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const { isSuperAdmin, isAdmin } = useRoles();
  const qc = useQueryClient();

  const profile = useQuery({
    queryKey: ["profile-full", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, display_name, bio, avatar_url, locale, timezone, created_at")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const [fullName, setFullName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile.data) return;
    setFullName(profile.data.full_name ?? "");
    setDisplayName(profile.data.display_name ?? "");
    setBio(profile.data.bio ?? "");
    setAvatarUrl(profile.data.avatar_url ?? "");
  }, [profile.data]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim() || null,
        display_name: displayName.trim() || null,
        bio: bio.trim() || null,
        avatar_url: avatarUrl.trim() || null,
      })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Profile updated");
    qc.invalidateQueries({ queryKey: ["profile-full", user.id] });
    qc.invalidateQueries({ queryKey: ["profile-mini", user.id] });
  }

  const role = isSuperAdmin ? "Super Admin" : isAdmin ? "Admin" : "Student";
  const initials =
    (fullName || displayName || user?.email || "U").trim().slice(0, 2).toUpperCase();

  if (profile.isLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center" aria-busy="true" aria-live="polite">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <span className="sr-only">Loading your profile</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
      <Breadcrumbs items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Profile" }]} />

      <div className="mt-5 flex flex-col gap-4 rounded-lg border border-border bg-surface p-6 sm:flex-row sm:items-center">
        <Avatar className="h-16 w-16 shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${fullName || displayName || "Your"} avatar`}
              className="h-full w-full rounded-full object-cover"
            />
          ) : null}
          <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h1 className="text-h1 text-foreground">
            {fullName || displayName || "Your profile"}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="truncate">{user?.email}</span>
            <Badge variant="secondary" className="text-[10px]">
              {role}
            </Badge>
          </div>
        </div>
      </div>

      <form
        onSubmit={onSave}
        aria-label="Profile details"
        className="mt-6 space-y-5 rounded-lg border border-border bg-surface p-6 shadow-sm"
      >
        <h2 className="text-h3 text-foreground">Your details</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="full">Full name</Label>
            <Input id="full" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="display">Display name</Label>
            <Input
              id="display"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatar">Avatar URL</Label>
          <Input
            id="avatar"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://…"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell others about yourself"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}
