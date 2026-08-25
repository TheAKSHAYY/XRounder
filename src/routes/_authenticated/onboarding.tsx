import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { clearGuestLearningPrefs, type LearningPrefs } from "@/lib/learning-prefs";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({ meta: [{ title: "Set up your learning path · XRounder" }] }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const router = useRouter();
  const qc = useQueryClient();

  const [initials, setInitials] = useState<{
    courseId?: string;
    year?: number;
    semesterId?: string;
  }>({});

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("current_course_id, current_semester_id, current_year, onboarded_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setInitials({
          courseId: data.current_course_id || undefined,
          year: data.current_year ? Number(data.current_year) : undefined,
          semesterId: data.current_semester_id || undefined,
        });
      }
    })();
  }, [user.id]);

  async function handleComplete(prefs: LearningPrefs) {
    const { error } = await supabase.from("profiles").upsert(
      {
        user_id: user.id,
        current_course_id: prefs.courseId,
        current_semester_id: prefs.semesterId,
        current_year: prefs.year,
        onboarded_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    clearGuestLearningPrefs();
    await qc.invalidateQueries({ queryKey: ["dashboard-profile"] });
    await qc.invalidateQueries({ queryKey: ["dashboard-context"] });
    await qc.invalidateQueries({ queryKey: ["profile-full"] });
    await qc.invalidateQueries({ queryKey: ["student-progress"] });

    toast.success("Your learning path has been set!");
    await router.invalidate();
    navigate({ to: "/dashboard", replace: true });
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6">
        <OnboardingWizard
          initialCourseId={initials.courseId}
          initialYear={initials.year}
          initialSemesterId={initials.semesterId}
          onComplete={handleComplete}
          submitLabel="Enter Dashboard"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
