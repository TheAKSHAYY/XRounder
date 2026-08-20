import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useRoles } from "@/hooks/use-roles";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileHeader } from "@/components/profile/profile-header";
import {
  PersonalInfoCard,
  validatePersonal,
  type PersonalForm,
} from "@/components/profile/personal-info-card";
import { AcademicCard, type AcademicForm } from "@/components/profile/academic-card";
import { LearningStatsCard } from "@/components/profile/learning-stats-card";
import { AchievementsCard } from "@/components/profile/achievements-card";
import { CompletionCard } from "@/components/profile/completion-card";
import { QuickActionsCard } from "@/components/profile/quick-actions-card";
import { AccountCard } from "@/components/profile/account-card";
import { SecurityCard, type SessionRow } from "@/components/profile/security-card";
import { deleteMyAccount } from "@/lib/account.functions";
import {
  computeAchievements,
  computeCompletion,
  DEFAULT_NOTIFICATION_PREFS,
  EMPTY_STATS,
  fetchLearningStats,
  fetchProfile,
  type NotificationPrefs,
  type ProfileRow,
} from "@/lib/profile";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Your profile · XRounder" },
      {
        name: "description",
        content:
          "Manage your XRounder student profile: personal and academic details, learning statistics, achievements and account security.",
      },
      { property: "og:title", content: "Your profile · XRounder" },
      {
        property: "og:description",
        content:
          "Manage your XRounder student profile: personal and academic details, learning statistics, achievements and account security.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

const EMPTY_PERSONAL: PersonalForm = {
  full_name: "",
  display_name: "",
  bio: "",
  phone: "",
  date_of_birth: "",
  gender: "",
  college: "",
  university: "",
  roll_number: "",
};

const EMPTY_ACADEMIC: AcademicForm = {
  current_course_id: "",
  current_semester_id: "",
  current_year: "",
  academic_session: "",
};

function personalFromProfile(p: ProfileRow | null | undefined): PersonalForm {
  return {
    full_name: p?.full_name ?? "",
    display_name: p?.display_name ?? "",
    bio: p?.bio ?? "",
    phone: p?.phone ?? "",
    date_of_birth: p?.date_of_birth ?? "",
    gender: p?.gender ?? "",
    college: p?.college ?? "",
    university: p?.university ?? "",
    roll_number: p?.roll_number ?? "",
  };
}

function academicFromProfile(p: ProfileRow | null | undefined): AcademicForm {
  return {
    current_course_id: p?.current_course_id ?? "",
    current_semester_id: p?.current_semester_id ?? "",
    current_year: p?.current_year != null ? String(p.current_year) : "",
    academic_session: p?.academic_session ?? "",
  };
}

/** Strips keys whose columns don't exist yet (before the migration is run). */
function pickSupported<T extends Record<string, unknown>>(
  patch: T,
  profile: ProfileRow | null | undefined,
  optionalKeys: string[],
) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(patch)) {
    if (optionalKeys.includes(k) && profile && !(k in profile)) continue;
    out[k] = v;
  }
  return out;
}

const OPTIONAL_KEYS = [
  "phone",
  "date_of_birth",
  "gender",
  "college",
  "university",
  "roll_number",
  "academic_session",
  "current_year",
  "notification_prefs",
];

function ProfilePage() {
  const { user } = useAuth();
  const { isSuperAdmin, isAdmin, isInstructor } = useRoles();
  const qc = useQueryClient();
  const router = useRouter();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const deleteAccount = useServerFn(deleteMyAccount);

  /* ------------------------------------------------------------- queries */

  const profileQuery = useQuery({
    queryKey: ["profile-full", user?.id],
    enabled: !!user?.id,
    queryFn: () => fetchProfile(user!.id),
  });
  const profile = profileQuery.data;

  const statsQuery = useQuery({
    queryKey: ["profile-stats", user?.id],
    enabled: !!user?.id,
    staleTime: 30_000,
    queryFn: () => fetchLearningStats(user!.id),
  });
  const stats = statsQuery.data ?? EMPTY_STATS;

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

  const [academic, setAcademic] = useState<AcademicForm>(EMPTY_ACADEMIC);

  const semestersQuery = useQuery({
    queryKey: ["profile-semesters", academic.current_course_id],
    enabled: !!academic.current_course_id,
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("semesters")
        .select("id, number, title")
        .eq("course_id", academic.current_course_id)
        .is("deleted_at", null)
        .order("number");
      if (error) throw error;
      return (data ?? []).map((s) => ({ id: s.id, label: `Semester ${s.number} — ${s.title}` }));
    },
  });

  const subjectsQuery = useQuery({
    queryKey: ["profile-subject-count", academic.current_semester_id],
    enabled: !!academic.current_semester_id,
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { count, error } = await supabase
        .from("subjects")
        .select("id", { count: "exact", head: true })
        .eq("semester_id", academic.current_semester_id)
        .is("deleted_at", null);
      if (error) throw error;
      return count ?? 0;
    },
  });

  const sessionsQuery = useQuery({
    queryKey: ["profile-sessions", user?.id],
    enabled: !!user?.id,
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_sessions")
        .select("id, device_kind, city, country, last_seen_at")
        .eq("user_id", user!.id)
        .is("revoked_at", null)
        .order("last_seen_at", { ascending: false })
        .limit(6);
      if (error) return [] as SessionRow[];
      return (data ?? []) as SessionRow[];
    },
  });

  /* ---------------------------------------------------------------- form */

  const [personal, setPersonal] = useState<PersonalForm>(EMPTY_PERSONAL);
  const [prefs, setPrefs] = useState<NotificationPrefs>(DEFAULT_NOTIFICATION_PREFS);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [savedPersonal, setSavedPersonal] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setPersonal(personalFromProfile(profile));
    setAcademic(academicFromProfile(profile));
    setAvatarUrl(profile.avatar_url ?? "");
    setPrefs({ ...DEFAULT_NOTIFICATION_PREFS, ...(profile.notification_prefs ?? {}) });
  }, [profile]);

  const basePersonal = useMemo(() => personalFromProfile(profile), [profile]);
  const baseAcademic = useMemo(() => academicFromProfile(profile), [profile]);
  const personalDirty = JSON.stringify(personal) !== JSON.stringify(basePersonal);
  const academicDirty = JSON.stringify(academic) !== JSON.stringify(baseAcademic);
  const errors = useMemo(() => validatePersonal(personal), [personal]);

  // Unsaved-changes protection on tab close / reload.
  useEffect(() => {
    if (!personalDirty && !academicDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [personalDirty, academicDirty]);

  function invalidateProfile() {
    if (!user) return;
    qc.invalidateQueries({ queryKey: ["profile-full", user.id] });
    qc.invalidateQueries({ queryKey: ["profile-mini", user.id] });
  }

  async function updateProfile(patch: Record<string, unknown>) {
    if (!user) throw new Error("Not signed in");
    const payload = pickSupported(patch, profile, OPTIONAL_KEYS);
    const { error } = await supabase
      .from("profiles")
      // Extra columns are typed loosely until the generated types are refreshed.
      .update(payload as never)
      .eq("user_id", user.id);
    if (error) throw error;
  }

  const savePersonal = useMutation({
    mutationFn: () =>
      updateProfile({
        full_name: personal.full_name.trim() || null,
        display_name: personal.display_name.trim() || null,
        bio: personal.bio.trim() || null,
        phone: personal.phone.trim() || null,
        date_of_birth: personal.date_of_birth || null,
        gender: personal.gender || null,
        college: personal.college.trim() || null,
        university: personal.university.trim() || null,
        roll_number: personal.roll_number.trim() || null,
      }),
    onSuccess: () => {
      setSavedPersonal(true);
      toast.success("Profile saved");
      invalidateProfile();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const saveAcademic = useMutation({
    mutationFn: () =>
      updateProfile({
        current_course_id: academic.current_course_id || null,
        current_semester_id: academic.current_semester_id || null,
        current_year: academic.current_year ? Number(academic.current_year) : null,
        academic_session: academic.academic_session.trim() || null,
      }),
    onSuccess: () => {
      toast.success("Academic details saved");
      invalidateProfile();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const savePrefs = useMutation({
    mutationFn: (next: NotificationPrefs) => updateProfile({ notification_prefs: next }),
    onSuccess: () => invalidateProfile(),
    onError: (e: Error) => {
      toast.error(e.message);
      setPrefs({ ...DEFAULT_NOTIFICATION_PREFS, ...(profile?.notification_prefs ?? {}) });
    },
  });

  const saveLocale = useMutation({
    mutationFn: (locale: string) => updateProfile({ locale }),
    onSuccess: () => {
      toast.success("Language updated");
      invalidateProfile();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  /* -------------------------------------------------------------- avatar */

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

    // Optimistic local preview while the upload runs.
    const preview = URL.createObjectURL(file);
    setAvatarUrl(preview);
    setUploading(true);

    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${user.id}/avatar-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("avatars")
      .upload(path, file, { contentType: file.type, upsert: true });

    if (upErr) {
      setUploading(false);
      setAvatarUrl(profile?.avatar_url ?? "");
      URL.revokeObjectURL(preview);
      toast.error(upErr.message);
      return;
    }

    const publicUrl = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
    try {
      await updateProfile({ avatar_url: publicUrl });
      setAvatarUrl(publicUrl);
      toast.success("Profile photo updated");
      invalidateProfile();
    } catch (err) {
      setAvatarUrl(profile?.avatar_url ?? "");
      toast.error((err as Error).message);
    } finally {
      URL.revokeObjectURL(preview);
      setUploading(false);
    }
  }

  async function onRemovePhoto() {
    if (!user) return;
    setUploading(true);
    try {
      await updateProfile({ avatar_url: null });
      setAvatarUrl("");
      toast.success("Profile photo removed");
      invalidateProfile();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  /* ------------------------------------------------------------ security */

  const [changingPassword, setChangingPassword] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function onChangePassword(password: string) {
    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password });
    setChangingPassword(false);
    if (error) {
      toast.error(error.message);
      return false;
    }
    toast.success("Password updated");
    return true;
  }

  async function onSignOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    await router.invalidate();
    navigate({ to: "/auth", replace: true });
  }

  async function onDeleteAccount() {
    setDeleting(true);
    try {
      await deleteAccount({});
      await qc.cancelQueries();
      qc.clear();
      await supabase.auth.signOut();
      toast.success("Your account has been deleted");
      navigate({ to: "/", replace: true });
    } catch (err) {
      toast.error((err as Error).message || "Could not delete your account");
    } finally {
      setDeleting(false);
    }
  }

  /* ---------------------------------------------------------------- misc */

  function jumpTo(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    el?.querySelector<HTMLElement>("input, select, textarea, button")?.focus({
      preventScroll: true,
    });
  }

  const completion = useMemo(
    () =>
      computeCompletion({
        ...(profile ?? ({ user_id: user?.id ?? "" } as ProfileRow)),
        ...personal,
        ...academic,
        current_year: academic.current_year ? Number(academic.current_year) : null,
        avatar_url: avatarUrl || null,
      } as ProfileRow),
    [profile, personal, academic, avatarUrl, user?.id],
  );

  const achievements = useMemo(() => computeAchievements(stats), [stats]);

  const role = isSuperAdmin
    ? "Super Admin"
    : isAdmin
      ? "Admin"
      : isInstructor
        ? "Instructor"
        : "Student";

  const displayName =
    personal.full_name || personal.display_name || user?.email?.split("@")[0] || "Your profile";
  const initials = (personal.full_name || personal.display_name || user?.email || "U")
    .trim()
    .slice(0, 2)
    .toUpperCase();

  const semesterLabel =
    (semestersQuery.data ?? []).find((s) => s.id === academic.current_semester_id)?.label ?? null;
  const courseLabel =
    (coursesQuery.data ?? []).find((c) => c.id === academic.current_course_id)?.label ?? null;

  if (profileQuery.isLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 sm:pt-10">
        <Skeleton className="h-4 w-40" />
        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-4">
            <Skeleton className="h-44 rounded-xl" />
            <Skeleton className="h-72 rounded-xl" />
            <Skeleton className="h-52 rounded-xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
          </div>
        </div>
        <span className="sr-only" aria-live="polite">
          Loading your profile
        </span>
      </div>
    );
  }

  if (profileQuery.isError) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-h2 text-foreground">We couldn’t load your profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {(profileQuery.error as Error).message}
        </p>
        <button
          type="button"
          onClick={() => profileQuery.refetch()}
          className="tap-target mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          {profileQuery.isFetching && <Loader2 className="h-4 w-4 animate-spin" />} Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 sm:pt-10">
      <Breadcrumbs items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Profile" }]} />

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="sr-only"
        onChange={onPickFile}
      />

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="min-w-0 space-y-4">
          <ProfileHeader
            name={displayName}
            email={user?.email ?? null}
            role={role}
            avatarUrl={avatarUrl}
            initials={initials}
            semesterLine={semesterLabel ?? courseLabel}
            collegeLine={personal.college || personal.university || null}
            completion={completion.pct}
            uploading={uploading}
            onPickPhoto={() => fileRef.current?.click()}
            onRemovePhoto={onRemovePhoto}
            onEdit={() => jumpTo("personal")}
          />

          <PersonalInfoCard
            form={personal}
            errors={errors}
            email={user?.email ?? null}
            saving={savePersonal.isPending}
            saved={savedPersonal}
            dirty={personalDirty}
            onChange={(patch) => {
              setSavedPersonal(false);
              setPersonal((prev) => ({ ...prev, ...patch }));
            }}
            onSubmit={(e) => {
              e.preventDefault();
              if (Object.keys(validatePersonal(personal)).length > 0) {
                toast.error("Please fix the highlighted fields.");
                return;
              }
              savePersonal.mutate();
            }}
            onReset={() => {
              setPersonal(basePersonal);
              setSavedPersonal(false);
            }}
          />

          <AcademicCard
            form={academic}
            courses={coursesQuery.data ?? []}
            semesters={semestersQuery.data ?? []}
            subjectCount={subjectsQuery.data ?? null}
            overallProgress={stats.overallProgress}
            loading={coursesQuery.isLoading}
            saving={saveAcademic.isPending}
            dirty={academicDirty}
            college={personal.college}
            university={personal.university}
            onChange={(patch) => setAcademic((prev) => ({ ...prev, ...patch }))}
            onSubmit={(e) => {
              e.preventDefault();
              saveAcademic.mutate();
            }}
          />

          <LearningStatsCard stats={stats} loading={statsQuery.isLoading} />
          <AchievementsCard achievements={achievements} loading={statsQuery.isLoading} />
        </div>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-20">
          <CompletionCard
            pct={completion.pct}
            filled={completion.filled}
            total={completion.total}
            missing={completion.missing}
            onJump={(section) => jumpTo(section === "photo" ? "photo" : section)}
          />
          <QuickActionsCard onJump={jumpTo} />
          <AccountCard
            prefs={prefs}
            locale={profile?.locale ?? "en"}
            savingPrefs={savePrefs.isPending}
            onTogglePref={(key, value) => {
              const next = { ...prefs, [key]: value };
              setPrefs(next);
              savePrefs.mutate(next);
            }}
            onLocaleChange={(locale) => saveLocale.mutate(locale)}
            onSignOut={onSignOut}
          />
          <SecurityCard
            lastSignInAt={user?.last_sign_in_at ?? null}
            sessions={sessionsQuery.data ?? []}
            sessionsLoading={sessionsQuery.isLoading}
            changingPassword={changingPassword}
            deleting={deleting}
            onChangePassword={onChangePassword}
            onDeleteAccount={onDeleteAccount}
          />
        </aside>
      </div>
    </div>
  );
}
