import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { prefetchPortfolioData } from "@/components/developer/use-portfolio-data";
import { supabase } from "@/integrations/supabase/client";

vi.mock("@/integrations/supabase/client", () => {
  return {
    supabase: {
      from: vi.fn(),
    },
  };
});

describe("Developer SSR Data Prefetching", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("prefetches profile and portfolio data into QueryClient successfully", async () => {
    const queryClient = new QueryClient();

    // Mock successful supabase response
    vi.mocked(supabase.from).mockImplementation((table: string) => {
      if (table === "developer_profile") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({
                data: { id: 1, full_name: "Test Dev", enabled: true, professional_title: "Engineer" },
                error: null,
              }),
            }),
          }),
        } as any;
      }
      return {
        select: () => ({
          eq: () => ({
            order: () => ({
              order: async () => ({ data: [], error: null }),
              then: (resolve: any) => resolve({ data: [], error: null }),
            }),
          }),
          order: () => ({
            order: async () => ({ data: [], error: null }),
          }),
        }),
      } as any;
    });

    await expect(prefetchPortfolioData(queryClient)).resolves.not.toThrow();
    const cachedProfile = queryClient.getQueryData(["dev-profile"]);
    expect(cachedProfile).toEqual(
      expect.objectContaining({ full_name: "Test Dev", enabled: true })
    );
  });

  it("handles database downtime or network failure gracefully without throwing in loader", async () => {
    const queryClient = new QueryClient();

    // Mock network failure / database outage
    vi.mocked(supabase.from).mockImplementation(() => {
      return {
        select: () => ({
          eq: () => ({
            maybeSingle: async () => {
              throw new Error("Connection timed out to Supabase database");
            },
          }),
        }),
      } as any;
    });

    // prefetchPortfolioData must NOT throw unhandled rejection (wrapped in Promise.allSettled)
    await expect(prefetchPortfolioData(queryClient)).resolves.not.toThrow();
  });

  it("prefetches disabled or empty profile without throwing", async () => {
    const queryClient = new QueryClient();

    vi.mocked(supabase.from).mockImplementation((table: string) => {
      if (table === "developer_profile") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({
                data: { id: 1, full_name: "Test Dev", enabled: false },
                error: null,
              }),
            }),
          }),
        } as any;
      }
      return {
        select: () => ({
          eq: () => ({
            order: () => ({
              order: async () => ({ data: [], error: null }),
              then: (resolve: any) => resolve({ data: [], error: null }),
            }),
          }),
          order: () => ({
            order: async () => ({ data: [], error: null }),
          }),
        }),
      } as any;
    });

    await expect(prefetchPortfolioData(queryClient)).resolves.not.toThrow();
    const cachedProfile = queryClient.getQueryData(["dev-profile"]);
    expect(cachedProfile).toEqual(
      expect.objectContaining({ enabled: false })
    );
  });
});
