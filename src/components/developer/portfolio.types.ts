export type Profile = {
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

export type Social = { id: string; platform: string; url: string; label: string | null };
export type Project = {
  id: string;
  name: string;
  description: string | null;
  thumbnail_url: string | null;
  tech_stack: string[] | null;
  github_url: string | null;
  live_url: string | null;
  category: string | null;
  featured: boolean;
};
export type Skill = { id: string; name: string; category: string; icon: string | null };
export type Achievement = {
  id: string;
  title: string;
  kind: string;
  issuer: string | null;
  description: string | null;
  date_awarded: string | null;
  url: string | null;
  image_url: string | null;
};

export function platformIcon(p: string) {
  const k = p.toLowerCase();
  if (k.includes("github")) return "github";
  return "unused";
}
