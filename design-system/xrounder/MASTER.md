# Design System Master File — XRounder

> **LOGIC:** When building or modifying a specific page, first check `design-system/pages/[page-name].md`.  
> If that file exists, its rules **override** this Master file.  
> If not, strictly follow the rules below.

---

**Project:** XRounder  
**Category:** Educational Learning Platform (BCA University Curriculum, Syllabus Notes, Diagnostic MCQs & Exam Prep)  
**Framework:** TanStack Start + Tailwind CSS v4 + Radix UI  
**Design Intelligence:** `ui-ux-pro-max` + `gravitas` Reliability Invariants  
**Last Updated:** 2026-10-15

---

## 1. Global Color Tokens (OKLCH)

All colors are defined in OKLCH for perceptual uniformity and reliable contrast ratios across light and dark modes.

### Light Mode (`:root`)

| Role                     | Token / CSS Variable     | OKLCH Value             | Approximate Hex | Notes                                |
| ------------------------ | ------------------------ | ----------------------- | --------------- | ------------------------------------ |
| **Background**           | `--background`           | `oklch(0.988 0.003 85)` | `#FBF9F7`       | Warm off-white                       |
| **Foreground**           | `--foreground`           | `oklch(0.18 0.012 275)` | `#1C1929`       | Neutral deep ink (>14:1 contrast)    |
| **Surface**              | `--surface` / `--card`   | `oklch(1 0 0)`          | `#FFFFFF`       | Crisp pure white surface             |
| **Surface Muted**        | `--surface-muted`        | `oklch(0.96 0.004 85)`  | `#F4F2EE`       | Subtle panel tint                    |
| **Primary**              | `--primary`              | `oklch(0.38 0.16 275)`  | `#2E2270`       | Deep authoritative indigo            |
| **Primary Foreground**   | `--primary-foreground`   | `oklch(0.99 0.002 85)`  | `#FFFFFF`       | White on primary (>10:1 contrast)    |
| **Secondary**            | `--secondary`            | `oklch(0.95 0.006 275)` | `#EFEFF7`       | Soft slate tint                      |
| **Secondary Foreground** | `--secondary-foreground` | `oklch(0.24 0.015 275)` | `#29253B`       | High-contrast label                  |
| **Accent / CTA**         | `--accent`               | `oklch(0.65 0.19 35)`   | `#E8593C`       | Restrained energetic coral           |
| **Accent Foreground**    | `--accent-foreground`    | `oklch(0.99 0.002 85)`  | `#FFFFFF`       | White on coral (>4.5:1 contrast)     |
| **Quiz / Practice**      | `--quiz`                 | `oklch(0.52 0.21 290)`  | `#6B3CE6`       | Violet-purple for diagnostic actions |
| **Success**              | `--success`              | `oklch(0.62 0.17 145)`  | `#2EA858`       | Streak & completion green            |
| **Warning**              | `--warning`              | `oklch(0.75 0.16 75)`   | `#D99414`       | Alerts & weak topic highlights       |
| **Destructive**          | `--destructive`          | `oklch(0.55 0.22 25)`   | `#D32F2F`       | Critical warnings / errors           |
| **Muted**                | `--muted`                | `oklch(0.95 0.004 85)`  | `#EFECE6`       | Dividers & light backgrounds         |
| **Muted Foreground**     | `--muted-foreground`     | `oklch(0.48 0.01 275)`  | `#6B677A`       | Secondary text (≥4.5:1 on white)     |
| **Border / Input**       | `--border`, `--input`    | `oklch(0.91 0.004 85)`  | `#E4E1DA`       | Deliberate structural borders        |
| **Ring**                 | `--ring`                 | `oklch(0.38 0.16 275)`  | `#2E2270`       | Matches primary focus indicator      |

### Dark Mode (`.dark`)

| Role                   | Token / CSS Variable   | OKLCH Value            | Design Intent                                           |
| ---------------------- | ---------------------- | ---------------------- | ------------------------------------------------------- |
| **Background**         | `--background`         | `oklch(0.1 0.008 60)`  | Warm near-black charcoal (not generic cold blue/indigo) |
| **Foreground**         | `--foreground`         | `oklch(0.96 0.006 75)` | Warm off-white, easy on student eyes                    |
| **Surface**            | `--surface` / `--card` | `oklch(0.14 0.01 60)`  | Layered warm stone elevated surface                     |
| **Surface Muted**      | `--surface-muted`      | `oklch(0.17 0.01 60)`  | Subtle muted panels                                     |
| **Primary**            | `--primary`            | `oklch(0.78 0.14 75)`  | Rich warm amber-gold with supreme authority on dark     |
| **Primary Foreground** | `--primary-foreground` | `oklch(0.1 0.008 60)`  | Dark charcoal on amber-gold                             |
| **Accent / CTA**       | `--accent`             | `oklch(0.72 0.17 35)`  | Luminous coral without eye strain                       |
| **Muted Foreground**   | `--muted-foreground`   | `oklch(0.67 0.008 75)` | Readable warm secondary text (≥4.5:1 contrast)          |
| **Border / Input**     | `--border`, `--input`  | `oklch(1 0 0 / 9%)`    | Subtle translucent separation borders                   |
| **Ring**               | `--ring`               | `oklch(0.78 0.14 75)`  | Amber focus ring matches primary                        |

---

## 2. Typography Hierarchy

| Font Family        | Variable / Utility                              | Primary Use Case                                            |
| ------------------ | ----------------------------------------------- | ----------------------------------------------------------- |
| **Manrope**        | `--font-display`, `.font-display`               | Primary headings, hero text, section headers                |
| **Fraunces**       | `--font-serif`, `.font-serif`, `.prose-article` | Educational article body, bookish accents, subtitle italics |
| **Inter**          | `--font-sans`                                   | UI labels, buttons, navigation, metadata                    |
| **JetBrains Mono** | `--font-mono`                                   | Code blocks, inline code, semester numbers, streaks, tags   |

### Central Type Scale Utilities (from `src/styles.css`)

```css
.text-h1       /* clamp(2rem, 1.5rem + 2vw, 3rem) — Page title, 1 per page */
.text-h2       /* clamp(1.4rem, 1.2rem + 1vw, 2rem) — Section titles */
.text-h3       /* clamp(1.05rem, 0.98rem + 0.35vw, 1.25rem) — Card / subsection titles */
.text-h4       /* 1rem, weight 600 — Label-weight headings */
.text-eyebrow  /* 0.6875rem, uppercase, 0.14em tracking — Kicker tags above titles */
.prose-article /* max-width: 68ch, line-height: 1.82, Fraunces serif — Long-form study body */
```

---

## 3. Spacing, Radii & Layout Tokens

- **Radius Scale:** Base radius `--radius: 0.625rem` (10px)
  - Small: `calc(var(--radius) - 4px)` = 6px
  - Medium: `calc(var(--radius) - 2px)` = 8px
  - Large: `var(--radius)` = 10px
  - 2XL: `calc(var(--radius) + 8px)` = 18px (Cards & Hero banners)
- **Grid & Max Width:** Standard container `max-w-6xl` (1152px) with horizontal insets `px-4 sm:px-6`.
- **Rhythm:** Multiples of 4px / 8px (`gap-2`, `gap-3`, `gap-4`, `gap-6`, `p-4`, `p-6`).
- **Reading Measure:** Maximum `68ch` for continuous prose text in `.prose-article`.

---

## 4. Component Standards

### A. Buttons & CTAs

- **Primary CTA:** `.btn-cta` with minimum height `h-11` (44px) or `h-12` (48px) on touch screens.
- **Micro-interaction:** `transition-transform hover:scale-[1.02] active:scale-[0.98]` with `cursor-pointer`.
- **Touch target minimum:** All clickable icons and text links must provide ≥44x44pt hit area.

### B. Cards & Surfaces

- Clean border delineation with `border border-border/80 bg-card rounded-2xl shadow-xs`.
- Hover lifts: Subtle lift without layout shift (`transition-all duration-200 hover:border-primary/40`).

### C. Keyboard Accessibility & Focus

- Every interactive element has visible focus:
  ```css
  :focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  ```

### D. Icons & Semantics

- Primary Icon Set: **Phosphor** (`@phosphor-icons/react`) or **Lucide** (`lucide-react`) with strict stroke consistency (1.5px / 2px).
- **Rule:** Never use bare emojis (🚀, 💡, 📝) as structural navigation or system icons. Use vector SVGs with `aria-hidden="true"` when paired with visible labels, or descriptive `aria-label` when standalone.

---

## 5. Pre-Delivery Verification Checklist (Gravitas & UI/UX Pro Max)

Before concluding any UI engineering task on XRounder:

- [ ] Primary text contrast ≥4.5:1 against light and dark surfaces.
- [ ] No layout shift on hover or focus transitions.
- [ ] Focus rings clearly visible on keyboard `Tab` navigation.
- [ ] Touch targets ≥44px on mobile viewports.
- [ ] `prefers-reduced-motion` respected for animated items.
- [ ] No mobile horizontal scrollbar (`overflow-x: hidden` safety maintained).
- [ ] Code changes verified with executable command output (`npm run build` / `npm run lint`).
