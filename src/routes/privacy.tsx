import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · XRounder" },
      {
        name: "description",
        content: "How XRounder collects, uses, and protects student data.",
      },
      { property: "og:title", content: "Privacy Policy · XRounder" },
      {
        property: "og:description",
        content: "How XRounder collects, uses, and protects student data.",
      },
      { property: "og:url", content: "https://www.xrounder.in/privacy" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.xrounder.in/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Privacy Policy · XRounder" },
      {
        name: "twitter:description",
        content: "How XRounder collects, uses, and protects student data.",
      },
      { name: "twitter:image", content: "https://www.xrounder.in/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.xrounder.in/privacy" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.xrounder.in/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Privacy Policy",
              item: "https://www.xrounder.in/privacy",
            },
          ],
        }),
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <h1 className="mt-6 font-display text-4xl font-semibold text-foreground">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: 30 June 2026</p>

        <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
          <h2>What we collect</h2>
          <p>
            We collect only what we need to give you a working learning experience: your name, email
            or phone number, the course and semester you select, and your in-app activity (notes
            opened, quiz attempts, bookmarks).
          </p>

          <h2>How we use it</h2>
          <p>
            Personal data powers your dashboard, progress tracking, and notifications. Aggregated
            activity helps us improve content. We never sell your data.
          </p>

          <h2>Who can see it</h2>
          <p>
            Only you and authorised XRounder administrators can see your profile and progress.
            Public content (courses, notes, papers) is visible to everyone.
          </p>

          <h2>Your controls</h2>
          <p>
            You can update your profile at any time from{" "}
            <Link to="/profile">your profile page</Link>, or email{" "}
            <a href="mailto:hello@xrounder.app">hello@xrounder.app</a> to request a data export or
            account deletion.
          </p>

          <h2>Security</h2>
          <p>
            Authentication, storage, and database access are managed by Supabase with row-level
            security. Sessions are encrypted in transit (HTTPS) and at rest.
          </p>

          <h2>Contact</h2>
          <p>
            Questions? Reach us at <a href="mailto:hello@xrounder.app">hello@xrounder.app</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
