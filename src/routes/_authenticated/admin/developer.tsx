import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/admin/ui/page-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/admin/developer/profile-form";
import { SocialEditor } from "@/components/admin/developer/social-editor";
import { ProjectsEditor } from "@/components/admin/developer/projects-editor";
import { SkillsEditor } from "@/components/admin/developer/skills-editor";
import { AchievementsEditor } from "@/components/admin/developer/achievements-editor";

export const Route = createFileRoute("/_authenticated/admin/developer")({
  component: DeveloperAdmin,
});

function DeveloperAdmin() {
  return (
    <PageContainer width="narrow" className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">Developer portfolio</h1>
        <p className="text-sm text-muted-foreground">
          Edit every section that appears at <code>/developer</code>. All changes are live on the
          public site.
        </p>
      </header>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="social" className="mt-6">
          <SocialEditor />
        </TabsContent>
        <TabsContent value="projects" className="mt-6">
          <ProjectsEditor />
        </TabsContent>
        <TabsContent value="skills" className="mt-6">
          <SkillsEditor />
        </TabsContent>
        <TabsContent value="achievements" className="mt-6">
          <AchievementsEditor />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
