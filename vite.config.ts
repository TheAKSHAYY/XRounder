// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/tanstack/vite";
import path from "node:path";

const mcp = mcpPlugin();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mcpAny = mcp as any;
const originalConfigResolved = mcpAny.configResolved;
if (typeof originalConfigResolved === "function") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mcpAny.configResolved = function (this: unknown, config: any, ...args: any[]) {
    const originalRoot = config.root;
    // Normalize Vite's forward-slash root to the OS-specific path (fixes Windows bug in mcpPlugin)
    config.root = path.resolve(config.root);
    const result = originalConfigResolved.call(this, config, ...args);
    config.root = originalRoot;
    return result;
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [mcp],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react-dom") || id.includes("react/")) {
                return "vendor-react";
              }
              if (id.includes("@tanstack/react-router") || id.includes("@tanstack/router-core")) {
                return "vendor-router";
              }
              if (id.includes("@tanstack/react-query") || id.includes("@tanstack/query-core")) {
                return "vendor-query";
              }
              if (id.includes("@supabase/")) {
                return "vendor-supabase";
              }
              if (id.includes("lucide-react")) {
                return "vendor-lucide";
              }
              if (id.includes("sonner")) {
                return "vendor-sonner";
              }
              if (id.includes("zod")) {
                return "vendor-zod";
              }
            }
          },
        },
      },
    },
  },
});
