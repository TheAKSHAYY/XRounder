import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { MaintenanceGate } from "@/components/maintenance-gate";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { BrandingApplier } from "@/components/branding/branding-applier";
import { ScrollToTop } from "@/components/scroll-to-top";
import { EnvErrorScreen } from "@/components/env-error-screen";
import { formatEnvError, validateSupabaseEnv } from "@/lib/env";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const THEME_INIT_SCRIPT = `(function(){try{var k='bca-theme';var s=localStorage.getItem(k)||'system';var r=document.documentElement;var isDark=function(t){if(t==='system'){return matchMedia('(prefers-color-scheme: dark)').matches;}return t!=='light';};var dark=isDark(s);if(dark)r.classList.add('dark');if(s!=='system'&&s!=='light'){r.classList.add(s);}r.dataset.theme=s;r.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  const isNotFoundErr =
    (error as any)?.isNotFound ||
    (error as any)?.status === 404 ||
    (error as any)?.name === "NotFoundError" ||
    (error as any)?.constructor?.name === "NotFoundError" ||
    error?.message?.toLowerCase().includes("not found");

  if (isNotFoundErr) {
    return <NotFoundComponent />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        {error?.message && (
          <div className="mt-4 overflow-hidden rounded-md border border-destructive/20 bg-destructive/10 p-3 text-left text-xs font-mono text-destructive">
            <p className="font-semibold">Error Details:</p>
            <p className="mt-1 select-all break-words">{error.message}</p>
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "XRounder — Learn Smarter, Semester by Semester" },
      {
        name: "description",
        content:
          "The structured learning platform for every student. Notes, past papers, video lectures, and MCQ practice — organized by semester and subject.",
      },
      { name: "theme-color", content: "#2a2566" },
      { property: "og:site_name", content: "XRounder" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "XRounder — Learn Smarter, Semester by Semester" },
      {
        property: "og:description",
        content:
          "The structured learning platform for every student. Notes, past papers, video lectures, and MCQ practice — organized by semester and subject.",
      },
      { property: "og:image", content: "https://www.xrounder.in/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "XRounder — Structured Semester Learning Platform" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "XRounder — Learn Smarter, Semester by Semester" },
      {
        name: "twitter:description",
        content:
          "The structured learning platform for every student. Notes, past papers, video lectures, and MCQ practice — organized by semester and subject.",
      },
      { name: "twitter:image", content: "https://www.xrounder.in/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <HeadContent />
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const envResult = validateSupabaseEnv();
if (!envResult.valid) {
  console.error(`[env] ${formatEnvError(envResult)}`);
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  const router = useRouter();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router, queryClient]);

  if (!envResult.valid) {
    return <EnvErrorScreen result={envResult} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrandingApplier />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <MaintenanceGate>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <div id="main-content" tabIndex={-1} className="outline-none">
            <Outlet />
          </div>
        </MaintenanceGate>
        <ScrollToTop />
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
