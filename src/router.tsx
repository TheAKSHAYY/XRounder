import { QueryClient } from "@tanstack/react-query";
import {
  createRouter,
  createRootRoute,
  createRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import appCss from "./styles.css?url";

type EnvCheck = { ok: true } | { ok: false; missing: string[] };

function checkSupabaseEnv(): EnvCheck {
  const isBrowser = typeof window !== "undefined";
  const url = isBrowser
    ? import.meta.env.VITE_SUPABASE_URL
    : process.env.SUPABASE_URL;
  const key = isBrowser
    ? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
    : process.env.SUPABASE_PUBLISHABLE_KEY;

  const missing: string[] = [];
  if (!url) missing.push(isBrowser ? "VITE_SUPABASE_URL" : "SUPABASE_URL");
  if (!key)
    missing.push(
      isBrowser ? "VITE_SUPABASE_PUBLISHABLE_KEY" : "SUPABASE_PUBLISHABLE_KEY",
    );

  return missing.length ? { ok: false, missing } : { ok: true };
}

function ConfigMissing({ missing }: { missing: string[] }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-foreground">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold tracking-tight">
          Configuration missing
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Supabase environment variables are missing. Set the variables below
          and restart the app.
        </p>
        <ul className="mt-4 space-y-2 text-left">
          {missing.map((name) => (
            <li
              key={name}
              className="rounded-md bg-muted px-3 py-2 font-mono text-sm"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FallbackShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function createFallbackRouter(missing: string[]) {
  const queryClient = new QueryClient();
  const rootRoute = createRootRoute({
    component: () => <ConfigMissing missing={missing} />,
    shellComponent: FallbackShell,
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Configuration missing — BCA Gurukul" },
      ],
      links: [{ rel: "stylesheet", href: appCss }],
    }),
  });
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <ConfigMissing missing={missing} />,
  });
  const fallbackTree = rootRoute.addChildren([indexRoute]);

  return createRouter({
    routeTree: fallbackTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
}

export const getRouter = () => {
  const envCheck = checkSupabaseEnv();
  if (!envCheck.ok) {
    return createFallbackRouter(envCheck.missing);
  }

  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
