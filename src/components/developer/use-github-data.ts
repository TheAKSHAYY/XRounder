import { useQuery } from "@tanstack/react-query";

/**
 * Lightweight, unauthenticated GitHub REST reads. Client-side only (never in a
 * loader) so first render is never blocked, and every consumer treats a failed
 * or rate-limited response as "no data" rather than showing placeholders.
 */

export type GithubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
};

export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  homepage: string | null;
};

const common = {
  staleTime: 30 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  retry: 0,
  refetchOnWindowFocus: false,
} as const;

async function gh<T>(path: string): Promise<T> {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  return (await res.json()) as T;
}

export function useGithubUser(username: string | null | undefined) {
  return useQuery({
    queryKey: ["gh-user", username],
    enabled: Boolean(username),
    queryFn: () => gh<GithubUser>(`/users/${username}`),
    ...common,
  });
}

export function useGithubRepos(username: string | null | undefined, limit = 6) {
  return useQuery({
    queryKey: ["gh-repos", username, limit],
    enabled: Boolean(username),
    queryFn: async () => {
      const repos = await gh<GithubRepo[]>(`/users/${username}/repos?sort=pushed&per_page=30`);
      return repos
        .filter((r) => !r.fork && !r.archived)
        .sort((a, b) => (a.pushed_at < b.pushed_at ? 1 : -1))
        .slice(0, limit);
    },
    ...common,
  });
}
