import type { ComponentType } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bookmark,
  GraduationCap,
  HelpCircle,
  LifeBuoy,
  Mail,
  Search,
} from "lucide-react";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { StudentHero } from "@/components/student/student-hero";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/help")({
  head: () => ({
    meta: [
      { title: "Help & support · BCA Gurukul" },
      {
        name: "description",
        content: "Guides, shortcuts and support contacts for studying on BCA Gurukul.",
      },
      { property: "og:title", content: "Help & support · BCA Gurukul" },
      {
        property: "og:description",
        content: "Guides, shortcuts and support contacts for BCA Gurukul students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HelpPage,
});

const GUIDES: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
  to?: string;
  href?: string;
  cta: string;
}[] = [
  {
    icon: GraduationCap,
    title: "Find your subjects",
    body: "Pick your course, open a semester, then work through subjects unit by unit.",
    to: "/courses",
    cta: "Browse courses",
  },
  {
    icon: Search,
    title: "Search the library",
    body: "Search notes, papers and quizzes by keyword — results respect your access.",
    to: "/search",
    cta: "Open search",
  },
  {
    icon: Bookmark,
    title: "Save for revision",
    body: "Bookmark anything you want to revisit; it collects in one revision list.",
    to: "/bookmarks",
    cta: "View bookmarks",
  },
  {
    icon: HelpCircle,
    title: "Track your progress",
    body: "Mark units complete as you finish them to keep your dashboard accurate.",
    to: "/dashboard",
    cta: "Go to dashboard",
  },
];

const FAQS = [
  {
    q: "Why can't I see a subject or unit?",
    a: "Content appears only once your teacher publishes it. If a semester looks empty, it hasn't been published yet.",
  },
  {
    q: "How is my progress calculated?",
    a: "Each unit you mark complete counts towards its subject, and subjects roll up into your semester progress.",
  },
  {
    q: "Can I retake a quiz?",
    a: "Yes. Quizzes can be attempted again — your latest attempt is shown on the results screen.",
  },
  {
    q: "I found wrong or missing content.",
    a: "Email support with the subject and unit name and we'll pass it to the teacher who owns it.",
  },
];

function HelpPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
      <Breadcrumbs items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Help" }]} />

      <StudentHero
        className="mt-5"
        eyebrow="Support"
        title={
          <>
            How can we <span className="text-primary">help</span>?
          </>
        }
        description="Short guides for everyday tasks, answers to common questions, and a way to reach a human."
        action={
          <Button
            asChild
            size="lg"
            className="h-12 w-full gap-2 rounded-full px-6 text-sm font-semibold sm:w-auto"
          >
            <a href="mailto:support@bcagurukul.app">
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              Email support
            </a>
          </Button>
        }
      />

      <section className="mt-14" aria-labelledby="help-guides">
        <h2 id="help-guides" className="text-h2 text-foreground">
          Quick guides
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {GUIDES.map(({ icon: Icon, title, body, to, cta }) => (
            <li key={title} className="flex">
              <Link
                to={to!}
                className="group flex h-full w-full flex-col rounded-lg border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-h3 text-foreground">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
                <div className="flex-1" />
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {cta}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="help-faq">
        <h2 id="help-faq" className="text-h2 text-foreground">
          Frequently asked
        </h2>
        <dl className="mt-6 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="px-5 py-4 sm:px-6">
              <dt className="text-sm font-semibold text-foreground">{q}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10 rounded-lg border border-border bg-surface-muted px-6 py-8 text-center">
        <LifeBuoy className="mx-auto h-6 w-6 text-primary" aria-hidden />
        <h2 className="mt-3 text-h3 text-foreground">Still stuck?</h2>
        <p className="mx-auto mt-1.5 max-w-prose text-sm text-muted-foreground">
          Send us the subject and unit you were on and we'll get back within one business day.
        </p>
        <Button asChild variant="outline" className="mt-5 rounded-full">
          <a href="mailto:support@bcagurukul.app">support@bcagurukul.app</a>
        </Button>
      </section>
    </div>
  );
}
