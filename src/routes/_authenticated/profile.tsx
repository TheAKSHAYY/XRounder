import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save, Trash2, Upload } from "lucide-react";
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
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file (JPG, PNG, WebP or GIF).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image is too large. Maximum size is 5 MB.");
      return;
    }

    setUploading(true);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${user.id}/avatar-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("avatars")
      .upload(path, file, { contentType: file.type, upsert: true });

    if (upErr) {
      setUploading(false);
      toast.error(upErr.message);
      return;
    }

    const publicUrl = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("user_id", user.id);
    setUploading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    setAvatarUrl(publicUrl);
    toast.success("Profile photo updated");
    qc.invalidateQueries({ queryKey: ["profile-full", user.id] });
    qc.invalidateQueries({ queryKey: ["profile-mini", user.id] });
  }

  async function onRemovePhoto() {
    if (!user) return;
    setUploading(true);
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: null })
      .eq("user_id", user.id);
    setUploading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setAvatarUrl("");
    toast.success("Profile photo removed");
    qc.invalidateQueries({ queryKey: ["profile-full", user.id] });
    qc.invalidateQueries({ queryKey: ["profile-mini", user.id] });
  }


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
    <div className="mx-auto w-full max-w-3xl px-4 pb-28 pt-6 sm:px-8 sm:pt-12">
      <Breadcrumbs items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Profile" }]} />

      {/* Identity card */}
      <section className="relative mt-5 overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-24 bg-linear-to-r from-primary/12 via-accent/10 to-transparent"
        />
        <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 p-5 sm:gap-5 sm:p-6">
          <Avatar className="h-16 w-16 shrink-0 ring-2 ring-background sm:h-20 sm:w-20">
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
            <h1 className="truncate text-h2 text-foreground sm:text-h1">
              {fullName || displayName || "Your profile"}
            </h1>
            <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="max-w-full truncate [overflow-wrap:anywhere]">{user?.email}</span>
              <Badge variant="secondary" className="shrink-0 text-[10px]">
                {role}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={onSave} aria-label="Profile details" className="mt-5 space-y-5">
        {/* Avatar editor */}
        <fieldset className="rounded-xl border border-border bg-surface p-5 shadow-soft sm:p-6">
          <legend className="sr-only">Profile photo</legend>
          <h2 className="text-h3 text-foreground">Profile photo</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload a photo from your device. Square images look best (max 5 MB).
          </p>

          <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
            <Avatar className="h-14 w-14 shrink-0 border border-border">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="h-full w-full rounded-full object-cover" />
              ) : null}
              <AvatarFallback className="bg-muted text-sm font-semibold text-muted-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 space-y-2">
              <input
                ref={fileRef}
                id="avatar-file"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="sr-only"
                onChange={onPickFile}
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="tap-target"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="mr-2 h-4 w-4" />
                  )}
                  {avatarUrl ? "Change photo" : "Upload photo"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="tap-target"
                  onClick={onRemovePhoto}
                  disabled={!avatarUrl || uploading}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove photo
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, WebP or GIF. Your photo saves as soon as it finishes uploading.
              </p>
            </div>
          </div>

        </fieldset>

        {/* Details */}
        <fieldset className="rounded-xl border border-border bg-surface p-5 shadow-soft sm:p-6">
          <legend className="sr-only">Your details</legend>
          <h2 className="text-h3 text-foreground">Your details</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5">
            <div className="min-w-0 space-y-2">
              <Label htmlFor="full">Full name</Label>
              <Input
                id="full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                className="w-full"
              />
            </div>
            <div className="min-w-0 space-y-2">
              <Label htmlFor="display">Display name</Label>
              <Input
                id="display"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="nickname"
                className="w-full"
              />
            </div>
            <div className="min-w-0 space-y-2 sm:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="Tell others about yourself"
                className="w-full resize-y"
              />
              <p className="text-xs text-muted-foreground">
                A short intro shown alongside your name.
              </p>
            </div>
          </div>
        </fieldset>

        {/* Actions: full-width on mobile, right-aligned on desktop */}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            className="tap-target w-full sm:w-auto"
            onClick={() => {
              setFullName(profile.data?.full_name ?? "");
              setDisplayName(profile.data?.display_name ?? "");
              setBio(profile.data?.bio ?? "");
              setAvatarUrl(profile.data?.avatar_url ?? "");
            }}
            disabled={saving}
          >
            Reset
          </Button>
          <Button type="submit" disabled={saving} className="tap-target w-full sm:w-auto">
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
