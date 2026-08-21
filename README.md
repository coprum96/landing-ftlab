# landing-ftlab

# FinTechLab / SPbU

Production-ready bilingual research laboratory website for **FinTechLab** at Saint Petersburg State University.

**Computational Editorial Research Lab** — dark editorial design, oversized typography, cinematic motion, and a signature Decision Network visualization.

Stack: Next.js · React · TypeScript · Tailwind CSS · GSAP + ScrollTrigger · Lenis · Framer Motion

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to `/en`.

```bash
npm run build   # production build
npm run start   # serve production build
```

---

## Project structure

```
app/
  [locale]/           # /en and /ru routes
    page.tsx           # Homepage
    research|projects|publications|people|about/
  globals.css          # Design tokens + editorial utilities
  layout.tsx           # Fonts (Inter Tight, IBM Plex Mono)
middleware.ts          # Locale redirect (/ → /en)

components/
  layout/              # Header, Footer, MobileMenu, SmoothScroll, PageTransition
  ui/                  # SectionLabel, LanguageSwitch, AnimatedLink, MagneticLink
  motion/              # RevealText, ParallaxMedia, InteractiveMedia, MediaCursor…
  sections/            # Homepage sections
  visual/              # DecisionNetwork canvas, AbstractMedia placeholders
  research/            # (extend with dedicated research UI as needed)

data/                  # Typed content objects (projects, people, publications…)
messages/              # en.json · ru.json interface copy
lib/                   # i18n, animations, hooks, media paths, utils
public/media/          # Drop real images/videos here
```

---

## Replace placeholder media

Until real assets are supplied, the site uses CSS/Canvas abstract visualizations (no copyrighted stock).

| Path | Replace with |
|------|----------------|
| `public/media/projects/{slug}.jpg` | Project posters |
| `public/media/videos/{slug}.mp4` | Muted loop videos |
| `public/media/research/{id}.jpg` | Research area previews |
| `public/media/people/{id}.jpg` | B&W editorial portraits |
| `public/media/field-notes/{id}.jpg` | Field note covers |
| `public/media/hero/` | Optional hero stills |

Project slugs live in `data/projects.ts` (e.g. `protective-knowledge-under-pressure`).

After adding files, enable them on the project object:

```ts
{
  slug: "protective-knowledge-under-pressure",
  hasPoster: true,  // uses /media/projects/{slug}.jpg
  hasVideo: true,   // hover-plays /media/videos/{slug}.mp4
  // ...
}
```

---

## Add a new research project

1. Open `data/projects.ts`.
2. Append an object to the `projects` array:

```ts
{
  id: "p007",
  number: "P/007",
  slug: "your-project-slug",
  categoryKey: "behavioral-security", // or behavioral-finance | human-ai | fintech
  title: {
    en: "English title",
    ru: "Русский заголовок",
  },
  description: {
    en: "Short English description.",
    ru: "Короткое описание на русском.",
  },
  year: 2026,
  status: "active",
  mediaType: "image", // or "video"
  motif: "grid",      // placeholder visual until assets exist
  layout: "half",     // half | wide | full
  hasPoster: false,
  hasVideo: false,
}
```

3. Optionally add poster/video under `public/media/` and set `hasPoster` / `hasVideo` to `true`.

UI strings for the Projects section (headings, status labels) live in `messages/en.json` and `messages/ru.json` under `projects`.

---

## Edit English / Russian text

**Interface & section copy** → `messages/en.json` · `messages/ru.json`  
Keep keys in sync between both files.

**Structured research content** (bilingual fields on each item):

- `data/projects.ts`
- `data/publications.ts`
- `data/people.ts`
- `data/fieldNotes.ts`
- `data/research.ts` (partner placeholders)

Language switcher: `EN / RU` in the header. Switching preserves the current path (`/en/research` → `/ru/research`).

---

## Deployment

### Vercel

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Framework preset: **Next.js** (defaults are fine).
4. Deploy.

Or CLI:

```bash
npx vercel
```

### Cloudflare Pages

**Option A — Cloudflare adapter (recommended for Next.js App Router)**

1. Install the OpenNext Cloudflare adapter per current Cloudflare docs (`@opennextjs/cloudflare`).
2. Connect the repo in Cloudflare Pages / Workers.
3. Build command and output as specified by the adapter docs for your Next.js version.

**Option B — Vercel-style Node**

If you prefer zero adapter setup, deploy to Vercel (above). The app is a standard Next.js site with static generation for all locale routes.

Environment variables: none required for the current build.

---

## Design system notes

- Background `#080808` · text `#F2F0EA` · muted `#9A9993` · accent `#9E1B32` (used sparingly)
- 12-column editorial grid, max width ~1600px
- Custom cursor on desktop only; disabled for touch and `prefers-reduced-motion`
- Lenis smooth scroll disabled when reduced motion is preferred
- Signature motif: **Decision Network** canvas (`components/visual/DecisionNetwork.tsx`)

---

## Accessibility & performance

- Semantic landmarks, keyboard-friendly language switch and experiment modal
- `prefers-reduced-motion` disables Lenis, parallax, custom cursor, and heavy reveals
- Videos are muted, `playsInline`, `preload="none"`, and only wired when `hasVideo: true`
- Lazy/abstract media by default to keep the JS/media footprint small
