# Hafiz Aryan Siregar — Portfolio

Personal portfolio website for **Hafiz Aryan Siregar**, built with Next.js (App Router, static export) and deployed to GitHub Pages.

- **Primary Domain:** `https://hafizaryansiregar.my.id` (visitors on `hafizaryan.github.io` are redirected client-side via `GithubIoRedirect`)
- **Locales:** English (`/en/`) and Indonesian (`/id/`)
- **Theme:** Light mode only

---

## Tech Stack

| Layer | Technology | Notes |
| --- | --- | --- |
| Framework | Next.js `^15.5.4` | App Router, `output: "export"`, `trailingSlash: true`, `images.unoptimized: true` |
| UI Library | React `^19.1.1` | Server Components by default; `"use client"` only where interactivity/browser APIs are needed |
| Language | TypeScript `^5.7.3` | Strict mode enabled (`tsconfig.json`), `@/*` path alias mapped to `./src/*` |
| Styling | Tailwind CSS `^4.1.13` | Configured via `@tailwindcss/postcss` and CSS tokens in `src/app/globals.css` |
| i18n | `next-intl` `^4.3.4` | Static routing for `en` (default) and `id` with `localePrefix: "always"` |
| Animations | `aos` `^2.3.4` | Initialized in `src/components/aos-provider.tsx` |
| Typography & Icons | `next/font/google`, Font Awesome 6.7.2, Devicon | `Schibsted_Grotesk` (sans) + `JetBrains_Mono` (mono) |

---

## Project Structure

```text
.
├── .github/workflows/deploy.yml   # GitHub Actions: Node 22 -> npm ci -> npm run build -> deploy out/
├── messages/
│   ├── en.json                    # English copy & metadata
│   └── id.json                    # Indonesian copy & metadata
├── public/
│   ├── CNAME                      # GitHub Pages CNAME (copied to out/)
│   ├── skills/                    # Local skill icons (vscode.svg, metamuse.png)
│   └── ...                        # Favicons & site.webmanifest
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx         # Locale validation, generateStaticParams, metadata, NextIntlClientProvider, AosProvider
│   │   │   └── page.tsx           # Main landing page composing all sections + JSON-LD Person schema
│   │   ├── globals.css            # Tailwind v4 import, CSS theme tokens, custom component styles
│   │   ├── icon.png               # App icon (also imported by Navbar)
│   │   ├── layout.tsx             # Root HTML shell, Google Fonts, icon CDNs, SiteSkeleton, GithubIoRedirect
│   │   ├── page.tsx               # Root "/" meta-refresh redirect to /en/
│   │   ├── robots.ts              # Static robots.txt generator
│   │   └── sitemap.ts             # Static sitemap.xml generator (/en/, /id/)
│   ├── assets/
│   │   └── foto-profil-siluet-hero.png
│   ├── components/
│   │   ├── about.tsx              # About section
│   │   ├── aos-provider.tsx       # Client wrapper initializing AOS
│   │   ├── bootcamp.tsx           # Bootcamp timeline section
│   │   ├── contact.tsx            # Contact card (mailto, GitHub, LinkedIn)
│   │   ├── education.tsx          # Education section
│   │   ├── experience.tsx         # Work experience section
│   │   ├── footer.tsx             # Fixed reveal footer + desktop Back-to-Top + mobile EN/ID toggle
│   │   ├── github-io-redirect.tsx # Redirects hafizaryan.github.io -> hafizaryansiregar.my.id
│   │   ├── hero.tsx               # Full-height hero poster with silhouette, wordmark, and tagline
│   │   ├── locale-switch.tsx      # Desktop EN/ID switcher used inside Navbar
│   │   ├── mobile-dock.tsx        # Bottom navigation dock (mobile only, < 768px)
│   │   ├── navbar.tsx             # Floating pill top navbar (desktop only, >= 768px)
│   │   ├── projects.tsx           # Sticky stacked project cards + scroll-linked scale progress
│   │   ├── recommendations.tsx    # LinkedIn recommendations carousel/quote view
│   │   ├── site-skeleton.tsx      # Initial loading overlay tailored for mobile and desktop layouts
│   │   └── skills.tsx             # Categorized tech & AI tools grid
│   └── i18n/
│       ├── navigation.ts          # next-intl navigation helpers (usePathname, useRouter)
│       ├── request.ts             # next-intl request config loading messages/<locale>.json
│       └── routing.ts             # Locale list (["en", "id"]), defaultLocale: "en", localePrefix: "always"
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- **Node.js 22** (matches CI in `.github/workflows/deploy.yml`)
- **npm**

### Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Typecheck
npx tsc --noEmit

# Build static export into ./out
npm run build
```

> **Windows PowerShell note:** If `npm` is blocked by execution policy (`npm.ps1 cannot be loaded`), run `npm.cmd` and `npx.cmd` instead.
>
> **Dev server note:** Do not run `npm run build` while `npm run dev` is running in the same workspace, as both write to `.next/` and can cause missing-manifest errors in `next dev`.

---

## Navigation & Responsive Behavior

- **Desktop (`>= 768px`):**
  - Floating pill top navbar (`src/components/navbar.tsx`, `max-w-[1120px]`) with scroll-spy, `LocaleSwitch`, and `#contact` CTA.
  - Floating Back-to-Top button (`src/components/footer.tsx`) at `bottom-6 right-6` after scrolling past `#top`.
- **Mobile (`< 768px`):**
  - Top navbar is hidden.
  - Bottom navigation dock (`src/components/mobile-dock.tsx`) handles section navigation (`about`, `experience`, `projects`, `contact`).
  - Always-visible floating `EN` / `ID` toggle button (`src/components/footer.tsx`) sits at `bottom-24 right-6` above the bottom dock.

---

## Internationalization (i18n)

- Translation strings live in `messages/en.json` and `messages/id.json`.
- Both files should keep identical key structures.
- Static pages are generated for every locale in `src/i18n/routing.ts` via `generateStaticParams()` in `src/app/[locale]/layout.tsx` and `src/app/[locale]/page.tsx`.

---

## Deployment

Pushing to the `main` branch triggers `.github/workflows/deploy.yml`:

1. Checks out the repository and sets up Node.js 22 with npm cache.
2. Runs `npm ci` and `npm run build` to generate the static site in `out/`.
3. Uploads `out/` (including `public/CNAME`) and deploys to GitHub Pages.

---

## Notes for AI Assistants

When modifying this repository, keep these invariants in mind:

1. **Static export only:** `next.config.ts` uses `output: "export"`. Do not introduce server-only runtime features (API routes, dynamic SSR without `generateStaticParams`, middleware, or `next/image` server optimization).
2. **Keep `en.json` and `id.json` in sync:** Whenever adding, renaming, or removing translation keys in `messages/en.json`, update `messages/id.json` (and vice versa).
3. **Light mode only:** Dark mode (`next-themes` and `.dark` CSS rules) was intentionally removed; do not reintroduce `dark:` variants unless dark mode support is explicitly requested.
4. **Skeleton parity:** `src/components/site-skeleton.tsx` mirrors both the mobile layout (no top bar, bottom dock + floating language button) and the desktop layout (floating pill top bar + full-height hero). Update it if the above-the-fold layout changes.
5. **Verify before finishing:** Run `npx tsc --noEmit` (and `npm run build` when `next dev` is not running) to confirm static export succeeds cleanly.
