import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { generateSitemapResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        return await generateSitemapResponse();
      },
    },
  },
});
