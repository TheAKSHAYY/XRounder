import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  Camera,
  Check,
  Edit3,
  GraduationCap,
  KeyRound,
  Loader2,
  LogOut,
  Moon,
  Palette,
  Shield,
  Sun,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useTheme } from "@/components/theme/theme-provider";
import { ConfirmDialog } from "@/components/admin/ui/confirm-dialog";
import {
  DEFAULT_NOTIFICATION_PREFS,
  NOTIFICATION_PREF_KEYS,
  fetchProfile,
  type NotificationPrefs,
  type ProfileRow,
} from "@/lib/profile";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Student Profile · XRounder" },
      {
        name: "description",
        content: "Manage your student identity, academic program, and account preferences.",
      },
      { property: "og:title", content: "Student Profile · XRounder" },
      {
        property: "og:description",
        content: "Manage your student identity, academic program, and account preferences.",
      },
    ],
  }),
  component: ProfilePage,
});

type EditProfileForm = {
  full_name: string;
  university: string;
  current_course_id: string;
  current_semester_id: string;
  academic_session: string;
};

function ProfilePage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const router = useRouter();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { theme, setTheme } = useTheme();

  // Queries
  const profileQuery = useQuery({
    queryKey: ["profile-full", user?.id],
    enabled: !!user?.id,
    queryFn: () => fetchProfile(user!.id),
  });
  const profile = profileQuery.data;

  const coursesQuery = useQuery({
    queryKey: ["profile-courses"],
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, title, code")
        .is("deleted_at", null)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []).map((c) => ({ id: c.id, label: `${c.title} (${c.code})` }));
    },
  });

  // Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<EditProfileForm>({
    full_name: "",
    university: "",
    current_course_id: "",
    current_semester_id: "",
    academic_session: "",
  });

  // Semesters for selected course
  const selectedCourseId = editForm.current_course_id || profile?.current_course_id || "";
  const semestersQuery = useQuery({
    queryKey: ["profile-semesters", selectedCourseId],
    enabled: !!selectedCourseId,
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("semesters")
        .select("id, number, title")
        .eq("course_id", selectedCourseId)
        .is("deleted_at", null)
        .order("number");
      if (error) throw error;
      return (data ?? []).map((s) => ({ id: s.id, number: s.number, label: `Semester ${s.number} — ${s.title}` }));
    },
  });

  // Password & Security State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);

  // Avatar Upload State
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Notification Prefs State
  const [prefs, setPrefs] = useState<NotificationPrefs>(DEFAULT_NOTIFICATION_PREFS);

  useEffect(() => {
    if (!profile) return;
    setAvatarUrl(profile.avatar_url ?? "");
    setPrefs({ ...DEFAULT_NOTIFICATION_PREFS, ...(profile.notification_prefs ?? {}) });
  }, [profile]);

  // Open Edit Modal with fresh data
  const handleOpenEdit = () => {
    setEditForm({
      full_name: profile?.full_name ?? "",
      university: profile?.university ?? profile?.college ?? "",
      current_course_id: profile?.current_course_id ?? "",
      current_semester_id: profile?.current_semester_id ?? "",
      academic_session: profile?.academic_session ?? "",
    });
    setIsEditOpen(true);
  };

  const invalidateProfile = () => {
    if (!user) return;
    qc.invalidateQueries({ queryKey: ["profile-full", user.id] });
    qc.invalidateQueries({ queryKey: ["profile-mini", user.id] });
    qc.invalidateQueries({ queryKey: ["dashboard-profile", user.id] });
    qc.invalidateQueries({ queryKey: ["dashboard-context"] });
  };

  // Save Edit Profile Mutation
  const saveProfileMutation = useMutation({
    mutationFn: async (data: EditProfileForm) => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: data.full_name.trim() || null,
          university: data.university.trim() || null,
          current_course_id: data.current_course_id || null,
          current_semester_id: data.current_semester_id || null,
          academic_session: data.academic_session.trim() || null,
        } as never)
        .eq("user_id", user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      setIsEditOpen(false);
      invalidateProfile();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to save profile");
    },
  });

  // Save Notification Prefs Mutation
  const savePrefsMutation = useMutation({
    mutationFn: async (next: NotificationPrefs) => {
      if (!user) return;
      const { error } = await supabase
        .from("profiles")
        .update({ notification_prefs: next } as never)
        .eq("user_id", user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Notification preferences saved");
      invalidateProfile();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update preferences");
    },
  });

  // Avatar Upload Handler
  const onPickAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file (JPG, PNG, or WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image is too large. Maximum size is 5 MB.");
      return;
    }

    const preview = URL.createObjectURL(file);
    setAvatarUrl(preview);
    setUploading(true);

    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    let bucket = "avatars";
    let path = `${user.id}/avatar-${Date.now()}.${ext}`;

    let { error: upErr } = await supabase.storage
      .from(bucket)
      .upload(path, file, { contentType: file.type, upsert: true });

    // Fallback to 'notes' bucket if 'avatars' bucket is not found on remote instance
    if (
      upErr &&
      (upErr.message?.toLowerCase().includes("not found") ||
        (upErr as any).statusCode === "404" ||
        (upErr as any).statusCode === 404 ||
        (upErr as any).error === "Bucket not found")
    ) {
      bucket = "notes";
      path = `avatars/${user.id}/avatar-${Date.now()}.${ext}`;
      const fallbackRes = await supabase.storage
        .from(bucket)
        .upload(path, file, { contentType: file.type, upsert: true });
      upErr = fallbackRes.error;
    }

    if (upErr) {
      setUploading(false);
      setAvatarUrl(profile?.avatar_url ?? "");
      URL.revokeObjectURL(preview);
      toast.error(upErr.message || "Failed to upload avatar photo");
      return;
    }

    const publicUrl = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
    try {
      const { error: updateErr } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl } as never)
        .eq("user_id", user.id);
      if (updateErr) throw updateErr;

      setAvatarUrl(publicUrl);
      toast.success("Profile photo updated");
      invalidateProfile();
    } catch (err: any) {
      setAvatarUrl(profile?.avatar_url ?? "");
      toast.error(err.message || "Failed to save photo");
    } finally {
      URL.revokeObjectURL(preview);
      setUploading(false);
    }
  };

  const onRemovePhoto = async () => {
    if (!user) return;
    setUploading(true);
    try {
      await supabase
        .from("profiles")
        .update({ avatar_url: null } as never)
        .eq("user_id", user.id);
      setAvatarUrl("");
      toast.success("Profile photo removed");
      invalidateProfile();
    } catch (err: any) {
      toast.error(err.message || "Failed to remove photo");
    } finally {
      setUploading(false);
    }
  };

  // Change Password Handler
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setChangingPassword(false);
    if (error) {
      setPasswordError(error.message);
      return;
    }

    toast.success("Password updated successfully");
    setNewPassword("");
    setConfirmPassword("");
    setIsPasswordModalOpen(false);
  };

  // Sign out
  const onSignOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    await router.invalidate();
    navigate({ to: "/auth", replace: true });
  };

  const fullName = profile?.full_name || user?.user_metadata?.full_name || "Student";
  const email = user?.email || "";
  const initials = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const currentCourse = (coursesQuery.data ?? []).find((c) => c.id === profile?.current_course_id)?.label || "Not specified";
  const currentSemester = (semestersQuery.data ?? []).find((s) => s.id === profile?.current_semester_id)?.label || (profile?.current_semester_id ? `Semester ${profile.current_semester_id}` : "Not specified");
  const universityName = profile?.university || profile?.college || "Not specified";
  const academicSession = profile?.academic_session || "2026–2027";

  if (profileQuery.isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4 pb-28 pt-6 sm:px-6 sm:pt-10">
        <Skeleton className="h-4 w-36 mb-6" />
        <Skeleton className="h-40 rounded-3xl mb-6" />
        <Skeleton className="h-48 rounded-3xl mb-6" />
        <Skeleton className="h-48 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-6 sm:px-6 sm:pt-10">
      <Breadcrumbs items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Profile" }]} />

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        onChange={onPickAvatar}
      />

      {/* ──────────────── 1. Identity Card ──────────────── */}
      <section className="mt-6 rounded-3xl border border-border/80 bg-card p-6 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative group">
            <Avatar className="h-20 w-20 ring-2 ring-primary/20">
              <AvatarImage src={avatarUrl} alt={fullName} className="object-cover" />
              <AvatarFallback className="bg-primary/10 text-primary font-display text-xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
              title="Change photo"
            >
              {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Camera className="h-3.5 w-3.5" />}
            </button>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
                  {fullName}
                </h1>
                <p className="mt-0.5 text-sm text-muted-foreground">{email}</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenEdit}
                className="rounded-xl gap-1.5 h-9 text-xs font-semibold px-4 self-center sm:self-auto"
              >
                <Edit3 className="h-3.5 w-3.5" /> Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 2. Academic Information ──────────────── */}
      <section className="mt-6 rounded-3xl border border-border/80 bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
          <div className="flex items-center gap-2 text-foreground font-display text-base font-bold">
            <GraduationCap className="h-4 w-4 text-primary" /> Academic Details
          </div>
          <button
            type="button"
            onClick={handleOpenEdit}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Update
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-2xl border border-border/50 bg-background/50 p-3.5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Course / Degree
            </span>
            <span className="mt-1 block font-semibold text-foreground">
              {currentCourse}
            </span>
          </div>

          <div className="rounded-2xl border border-border/50 bg-background/50 p-3.5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              University / College
            </span>
            <span className="mt-1 block font-semibold text-foreground">
              {universityName}
            </span>
          </div>

          <div className="rounded-2xl border border-border/50 bg-background/50 p-3.5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Current Semester
            </span>
            <span className="mt-1 block font-semibold text-foreground">
              {currentSemester}
            </span>
          </div>

          <div className="rounded-2xl border border-border/50 bg-background/50 p-3.5">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Academic Session
            </span>
            <span className="mt-1 block font-semibold text-foreground">
              {academicSession}
            </span>
          </div>
        </div>
      </section>

      {/* ──────────────── 3. Settings & Preferences ──────────────── */}
      <section className="mt-6 rounded-3xl border border-border/80 bg-card p-6 shadow-soft space-y-6">
        <div className="flex items-center gap-2 text-foreground font-display text-base font-bold border-b border-border/60 pb-3.5">
          <Shield className="h-4 w-4 text-primary" /> Settings &amp; Preferences
        </div>

        {/* Notifications */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            <Bell className="h-3.5 w-3.5" /> Notifications
          </div>
          <div className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-background/60">
            {NOTIFICATION_PREF_KEYS.map((p) => {
              const checked = prefs[p.key] ?? DEFAULT_NOTIFICATION_PREFS[p.key];
              return (
                <div key={p.key} className="flex items-center justify-between p-3.5">
                  <div>
                    <Label htmlFor={`pref-${p.key}`} className="text-xs font-semibold text-foreground cursor-pointer">
                      {p.label}
                    </Label>
                    <p className="text-[11px] text-muted-foreground">{p.hint}</p>
                  </div>
                  <Switch
                    id={`pref-${p.key}`}
                    checked={checked}
                    disabled={savePrefsMutation.isPending}
                    onCheckedChange={(val) => {
                      const next = { ...prefs, [p.key]: val };
                      setPrefs(next);
                      savePrefsMutation.mutate(next);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Appearance */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            <Palette className="h-3.5 w-3.5" /> Appearance
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/60 p-3.5">
            <div>
              <span className="text-xs font-semibold text-foreground">Theme Mode</span>
              <p className="text-[11px] text-muted-foreground">Choose light, dark, or system preference</p>
            </div>
            <div className="w-36">
              <Select value={theme} onValueChange={(v) => setTheme(v as any)}>
                <SelectTrigger className="h-8 text-xs rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                  <SelectItem value="midnight">Midnight</SelectItem>
                  <SelectItem value="ocean">Ocean</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Security & Actions */}
        <div className="pt-2 border-t border-border/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPasswordModalOpen(true)}
            className="rounded-xl h-10 text-xs font-semibold"
          >
            <KeyRound className="mr-2 h-4 w-4" /> Change Password
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onSignOut}
            className="rounded-xl h-10 text-xs font-semibold text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="mr-2 h-4 w-4" /> Log out
          </Button>
        </div>
      </section>

      {/* ──────────────── Edit Profile Dialog ──────────────── */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold">Edit Student Profile</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Update your name, degree program, and university details.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveProfileMutation.mutate(editForm);
            }}
            className="space-y-4 py-2"
          >
            <div className="space-y-1.5">
              <Label htmlFor="edit-name" className="text-xs font-semibold">
                Full Name
              </Label>
              <Input
                id="edit-name"
                value={editForm.full_name}
                onChange={(e) => setEditForm((prev) => ({ ...prev, full_name: e.target.value }))}
                placeholder="Your full name"
                className="h-10 text-sm rounded-xl"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-email" className="text-xs font-semibold">
                Email Address
              </Label>
              <Input
                id="edit-email"
                value={email}
                disabled
                className="h-10 text-sm rounded-xl bg-muted text-muted-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-course" className="text-xs font-semibold">
                Degree / Course
              </Label>
              <Select
                value={editForm.current_course_id}
                onValueChange={(val) =>
                  setEditForm((prev) => ({ ...prev, current_course_id: val, current_semester_id: "" }))
                }
              >
                <SelectTrigger id="edit-course" className="h-10 text-sm rounded-xl">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {(coursesQuery.data ?? []).map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-semester" className="text-xs font-semibold">
                Current Semester
              </Label>
              <Select
                value={editForm.current_semester_id}
                onValueChange={(val) => setEditForm((prev) => ({ ...prev, current_semester_id: val }))}
                disabled={!editForm.current_course_id}
              >
                <SelectTrigger id="edit-semester" className="h-10 text-sm rounded-xl">
                  <SelectValue placeholder={editForm.current_course_id ? "Select semester" : "Select course first"} />
                </SelectTrigger>
                <SelectContent>
                  {(semestersQuery.data ?? []).map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-university" className="text-xs font-semibold">
                University / College
              </Label>
              <Input
                id="edit-university"
                value={editForm.university}
                onChange={(e) => setEditForm((prev) => ({ ...prev, university: e.target.value }))}
                placeholder="e.g. Guru Gobind Singh Indraprastha University"
                className="h-10 text-sm rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-session" className="text-xs font-semibold">
                Academic Session
              </Label>
              <Input
                id="edit-session"
                value={editForm.academic_session}
                onChange={(e) => setEditForm((prev) => ({ ...prev, academic_session: e.target.value }))}
                placeholder="e.g. 2026–2027"
                className="h-10 text-sm rounded-xl"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
                className="rounded-xl h-10 text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saveProfileMutation.isPending}
                className="rounded-xl h-10 text-xs font-semibold"
              >
                {saveProfileMutation.isPending && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ──────────────── Change Password Dialog ──────────────── */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold">Change Password</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Enter your new password below. It must be at least 8 characters.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="new-pwd" className="text-xs font-semibold">New Password</Label>
              <Input
                id="new-pwd"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="h-10 text-sm rounded-xl"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm-pwd" className="text-xs font-semibold">Confirm Password</Label>
              <Input
                id="confirm-pwd"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="h-10 text-sm rounded-xl"
                autoComplete="new-password"
                required
              />
            </div>

            {passwordError && (
              <p className="text-xs text-destructive">{passwordError}</p>
            )}

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPasswordModalOpen(false)}
                className="rounded-xl h-10 text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={changingPassword || !newPassword || !confirmPassword}
                className="rounded-xl h-10 text-xs font-semibold"
              >
                {changingPassword && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                Update Password
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
