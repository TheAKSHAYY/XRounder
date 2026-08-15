export type SectionKind =
  | "hero"
  | "trust_bar"
  | "about"
  | "features"
  | "why_us"
  | "universities"
  | "popular_courses"
  | "categories"
  | "statistics"
  | "stats"
  | "testimonials"
  | "faculty"
  | "learning_process"
  | "journey"
  | "semester_overview"
  | "benefits"
  | "faq"
  | "blog"
  | "contact"
  | "newsletter"
  | "cta"
  | "footer"
  | "custom_richtext";

export type Section = {
  id: string;
  type: SectionKind;
  position: number;
  enabled: boolean;
  status: "draft" | "published";
  title: string | null;
  content: Record<string, unknown>;
  style: Record<string, unknown>;
  published_content: Record<string, unknown>;
  published_style: Record<string, unknown>;
};

export const KIND_META: Record<SectionKind, { label: string; description: string }> = {
  hero: { label: "Hero", description: "Top-of-page banner with title, subtitle, CTA." },
  trust_bar: { label: "Trust Bar", description: "Compact metrics / social-proof strip." },
  about: { label: "About", description: "Story or mission block." },
  features: { label: "Features", description: "Grid of product features." },
  why_us: { label: "Why Choose Us", description: "Reasons / value props." },
  universities: { label: "Universities", description: "Partner / accreditation list." },
  popular_courses: { label: "Popular Courses", description: "Highlighted courses grid." },
  categories: { label: "Categories", description: "Subject categories grid." },
  statistics: { label: "Statistics", description: "Big numbers row." },
  stats: { label: "Stats (legacy)", description: "Legacy stats block." },
  testimonials: { label: "Testimonials", description: "Student reviews carousel." },
  faculty: { label: "Faculty", description: "Teachers / mentors grid." },
  learning_process: { label: "Learning Process", description: "How it works steps." },
  journey: { label: "Journey", description: "Student journey timeline." },
  semester_overview: { label: "Semester Overview", description: "Semester-wise summary." },
  benefits: { label: "Benefits", description: "Benefit cards." },
  faq: { label: "FAQ", description: "Frequently asked questions." },
  blog: { label: "Blog", description: "Latest blog posts." },
  contact: { label: "Contact", description: "Contact details / form." },
  newsletter: { label: "Newsletter", description: "Email subscription block." },
  cta: { label: "Call to Action", description: "Conversion banner." },
  footer: { label: "Footer", description: "Footer columns & links." },
  custom_richtext: { label: "Custom Rich Text", description: "Free-form rich text." },
};

export const KIND_ORDER: SectionKind[] = [
  "hero",
  "trust_bar",
  "about",
  "features",
  "why_us",
  "universities",
  "popular_courses",
  "categories",
  "statistics",
  "stats",
  "testimonials",
  "faculty",
  "learning_process",
  "journey",
  "semester_overview",
  "benefits",
  "faq",
  "blog",
  "contact",
  "newsletter",
  "cta",
  "footer",
  "custom_richtext",
];
