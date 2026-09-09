import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

import type { Achievement, Profile, Project, Skill, Social } from "./portfolio.types";

/** Public portfolio reads: fail fast so the page can show a retry instead of endless skeletons. */
const PUBLIC_READ = { retry: 1, staleTime: 60_000 } as const;

export function usePortfolioData() {
  const profileQ = useQuery({
    queryKey: ["dev-profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("developer_profile")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
    ...PUBLIC_READ,
  });
  const socialQ = useQuery({
    queryKey: ["dev-social"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("developer_social_links")
        .select("id,platform,url,label")
        .eq("enabled", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Social[];
    },
    ...PUBLIC_READ,
  });
  const projectsQ = useQuery({
    queryKey: ["dev-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("developer_projects")
        .select(
          "id,name,description,thumbnail_url,tech_stack,github_url,live_url,category,featured",
        )
        .eq("status", "published")
        .order("featured", { ascending: false })
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Project[];
    },
    ...PUBLIC_READ,
  });
  const skillsQ = useQuery({
    queryKey: ["dev-skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("developer_skills")
        .select("id,name,category,icon")
        .eq("enabled", true)
        .order("category", { ascending: true })
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Skill[];
    },
    ...PUBLIC_READ,
  });
  const achievementsQ = useQuery({
    queryKey: ["dev-achievements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("developer_achievements")
        .select("*")
        .eq("enabled", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Achievement[];
    },
    ...PUBLIC_READ,
  });

  return { profileQ, socialQ, projectsQ, skillsQ, achievementsQ };
}
