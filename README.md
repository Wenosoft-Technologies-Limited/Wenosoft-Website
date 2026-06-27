# Wenosoft Clarity

The marketing site for **Wenosoft Technologies** — _Clarity out of complexity_.

A pure React + TypeScript single-page application, bundled by Webpack 5, styled with Tailwind CSS v4, and deployed to Netlify.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [npm scripts](#npm-scripts)
- [Architecture](#architecture)
  - [Entry point](#entry-point)
  - [Routing](#routing)
  - [Layout shell](#layout-shell)
  - [Per-route SEO](#per-route-seo)
  - [Error & 404 handling](#error--404-handling)
  - [Styling system](#styling-system)
  - [Brand assets](#brand-assets)
  - [Path aliases](#path-aliases)
- [Build pipeline](#build-pipeline)
  - [webpack.common.js](#webpackcommonjs)
  - [webpack.dev.js](#webpackdevjs)
  - [webpack.prod.js](#webpackprodjs)
  - [PostCSS / Tailwind](#postcss--tailwind)
  - [SWC](#swc)
- [Adding a new page](#adding-a-new-page)
- [Adding a new component](#adding-a-new-component)
- [Working with images](#working-with-images)
- [TypeScript configuration](#typescript-configuration)
- [Linting & formatting](#linting--formatting)
- [Deployment (Netlify)](#deployment-netlify)
- [Performance notes](#performance-notes)
- [Browser support](#browser-support)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Tech stack

| Layer            | Choice                                                   | Why                                                                       |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------- |
| UI runtime       | **React 19** + **TypeScript 5.8**                        | Standard modern UI stack, strict types end-to-end.                        |
| Bundler          | **Webpack 5**                                            | Full control, mature, well-understood by every senior frontend engineer.  |
| TS/JSX transform | **SWC** (`swc-loader`)                                   | Rust-based compiler — much faster than Babel for our `.ts`/`.tsx` files.  |
| Dev server       | **webpack-dev-server 5** + **React Refresh**             | HMR that preserves component state across edits.                          |
| Routing          | **react-router-dom 7** (`createBrowserRouter`)           | Data-router API with built-in error boundaries per route subtree.         |
| Styling          | **Tailwind CSS v4** + **tw-animate-css**                 | Utility-first, configured via `@theme` in CSS — no `tailwind.config.js`.  |
| SEO              | Tiny custom `Seo` hook                                   | Zero dependencies, React-19 compatible, ~80 lines, no abandoned packages. |
| Quality          | **ESLint 9 (flat config)** + **Prettier 3** + strict TSC | Catches issues at three layers: lint, format, types.                      |
| Hosting          | **Netlify**                                              | Build + atomic deploys + CDN out of the box.                              |

---

## Project structure

```
.
├── netlify.toml                # Netlify build/headers/redirects config
├── package.json
├── postcss.config.js           # PostCSS plugins (Tailwind v4)
├── tsconfig.json               # Strict TypeScript config
├── eslint.config.mjs           # Flat ESLint 9 config (ESM)
├── webpack.common.js           # Shared webpack config
├── webpack.dev.js              # Dev-mode overrides (HMR, source maps, dev server)
├── webpack.prod.js             # Prod overrides (minify, split chunks, hashing)
├── .nvmrc                      # Node version pin (20)
├── .gitignore
├── .prettierrc
├── .prettierignore
│
├── public/                     # Static files copied to dist root verbatim
│   ├── index.html              # HTML template (HtmlWebpackPlugin injects scripts)
│   ├── robots.txt
│   └── sitemap.xml
│
└── src/
    ├── main.tsx                # App entry — mounts <App /> into #root
    ├── App.tsx                 # Router definition (createBrowserRouter)
    ├── styles.css              # Tailwind v4 + design tokens + global styles
    ├── env.d.ts                # Module declarations for image/css imports
    │
    ├── assets/                 # Source images (fingerprinted by webpack on build)
    │   ├── wenosoft-banner.png
    │   ├── wenosoft-brand-story.png
    │   ├── wenosoft-icon-dark.png
    │   ├── wenosoft-icon-purple.png
    │   ├── wenosoft-icon-showcase.png
    │   ├── wenosoft-logo-reveal.png
    │   └── wenosoft-wordmark-purple.png
    │
    ├── config/
    │   └── site.ts             # Site-wide constants (SITE, CONTACT)
    │
    ├── components/
    │   ├── brand/              # Logo lockup + mark
    │   │   ├── LogoLockup.tsx
    │   │   └── LogoMark.tsx
    │   ├── layout/             # Structural layout
    │   │   ├── RootLayout.tsx          # <Header /> + <Outlet /> + <Footer />
    │   │   ├── RouteErrorBoundary.tsx  # 404 + runtime error UI
    │   │   ├── ScrollToTop.tsx         # Scrolls to top on route change
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   └── Section.tsx             # Reusable content section wrapper
    │   ├── seo/
    │   │   └── Seo.tsx                 # Per-route <head> management (custom)
    │   └── ui-brand/
    │       └── CTAButton.tsx           # Branded button/link primitives
    │
    └── pages/                  # Top-level route components
        ├── HomePage.tsx
        ├── AboutPage.tsx
        ├── ServicesPage.tsx
        ├── ContactPage.tsx
        └── NotFoundPage.tsx
```

---

## Prerequisites

- **Node.js ≥ 20** (LTS). The version is pinned in [.nvmrc](.nvmrc) and [netlify.toml](netlify.toml).
- **npm** (ships with Node).

If you use `nvm`/`nvm-windows`:

```powershell
nvm install 20
nvm use 20
```

---

## Getting started

```powershell
# 1. Install dependencies
npm install

# 2. Start the dev server (opens http://localhost:3000 automatically)
npm run dev
```

Hot Module Replacement is enabled — edits to any `.tsx` file update the running app without losing component state.

---

## npm scripts

| Script               | What it does                                                           |
| -------------------- | ---------------------------------------------------------------------- |
| `npm run dev`        | Starts webpack-dev-server on port 3000 with HMR + React Refresh.       |
| `npm run build`      | Produces an optimized production bundle in `dist/`.                    |
| `npm run type-check` | Runs `tsc --noEmit` — type-checks the entire project without bundling. |
| `npm run lint`       | Runs ESLint over `src/**/*.{ts,tsx}` using the flat config.            |
| `npm run format`     | Runs Prettier on the repo and writes changes in place.                 |

Run `npm run type-check && npm run lint && npm run build` before pushing to be sure CI will be green.

---

## Architecture

### Entry point

[src/main.tsx](src/main.tsx) imports the global stylesheet, then mounts `<App />` into the `#root` element from [public/index.html](public/index.html). `<StrictMode>` is enabled to surface unsafe lifecycle patterns during development.

### Routing

Routes are declared with [`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router) in [src/App.tsx](src/App.tsx). The shape:

```
<RootLayout>           ← persistent header / footer
  <RouteErrorBoundary> ← catches errors from any child route
    /          → HomePage
    /about     → AboutPage
    /services  → ServicesPage
    /contact   → ContactPage
    *          → NotFoundPage
```

The error boundary is **nested inside** the layout, so when a child page throws, the header and footer remain visible.

[`ScrollToTop`](src/components/layout/ScrollToTop.tsx) is mounted at the router root and resets `window.scrollY` on every `pathname` change.

### Layout shell

[RootLayout](src/components/layout/RootLayout.tsx) renders the persistent UI chrome:

- A "Skip to content" link for keyboard users.
- [`<Header />`](src/components/layout/Header.tsx) — sticky nav with active-route highlighting via `NavLink` and a mobile drawer.
- `<main id="main-content">` containing the `<Outlet />` (route content).
- [`<Footer />`](src/components/layout/Footer.tsx) — navigation + contact info.

### Per-route SEO

The custom [Seo](src/components/seo/Seo.tsx) component is a `useEffect`-based document-head manager. Mount it once per page:

```tsx
<Seo
  title="Services — Wenosoft Technologies"
  description="..."
  path="/services"
  ogImage={someAssetImport} // optional — absolute URL or root-relative path
  noIndex // optional — disables indexing for 404 etc.
/>
```

It manages:

- `document.title`
- `<meta name="description">`
- `<link rel="canonical">`
- Open Graph: `og:type`, `og:url`, `og:title`, `og:description`, `og:image`
- Twitter Cards: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `<meta name="robots">` when `noIndex` is set

Every tag it owns is marked with `data-seo`, so it never touches anything declared in [public/index.html](public/index.html) by accident.

> **SPA SEO caveat:** because tags are written after JS executes, social crawlers that don't run JS (Facebook, LinkedIn, X/Twitter previewer) will see the static defaults in `index.html`, not the per-route values. JS-aware crawlers like Googlebot see the correct per-route metadata. If true per-route social previews become a requirement later, the site will need SSR / SSG.

### Error & 404 handling

[RouteErrorBoundary](src/components/layout/RouteErrorBoundary.tsx) handles two cases:

- `isRouteErrorResponse(error) && status === 404` → friendly 404 card.
- Any other error → "Something didn't load" with a "Try again" (reloads) and "Go home" link.

There is also an explicit [`NotFoundPage`](src/pages/NotFoundPage.tsx) bound to the `*` route — it sets `noIndex` and shows the same friendly card.

### Styling system

- **Tailwind CSS v4** — configured _inside_ [src/styles.css](src/styles.css) via `@theme inline { ... }`. No `tailwind.config.js` exists.
- **Design tokens** are CSS variables defined in `:root` (e.g. `--indigo-deep`, `--electric-violet`, `--soft-lavender`) and exposed as Tailwind color utilities (e.g. `bg-electric-violet`, `text-soft-lavender`).
- **Custom utilities** (`text-display`, `text-heading`, `text-caption`, `bg-grid-pattern`, `glow-violet`) are declared with `@utility`.
- **Type system** uses two Funnel font families loaded from Google Fonts in `public/index.html` and registered as `--font-display` and `--font-sans`.
- **Animations** come from `tw-animate-css`.

### Brand assets

- `LogoMark` ([src/components/brand/LogoMark.tsx](src/components/brand/LogoMark.tsx)) — the "W" mark, with `default` (purple), `dark`, and `white` variants.
- `LogoLockup` ([src/components/brand/LogoLockup.tsx](src/components/brand/LogoLockup.tsx)) — `LogoMark` + wordmark, wrapped in a `<Link to="/">` so it acts as a home link.

### Path aliases

`@/*` resolves to `src/*` in both TypeScript ([tsconfig.json](tsconfig.json)) and Webpack ([webpack.common.js](webpack.common.js)):

```ts
import { CONTACT } from "@/config/site";
import { Section } from "@/components/layout/Section";
import banner from "@/assets/wenosoft-banner.png";
```

---

## Build pipeline

The three webpack configs split responsibility so you change exactly one file per concern.

### webpack.common.js

The shared base:

- **Entry**: `src/main.tsx`
- **Output**: `dist/`, `publicPath: "/"`, cleaned on every build.
- **Resolve**: `.ts/.tsx/.js/.jsx`, alias `@` → `src/`.
- **Asset rules**: PNG/JPG/SVG/etc go to `dist/assets/img/[name].[contenthash:8][ext]`; fonts go to `dist/assets/fonts/...`.
- **Plugins**:
  - `HtmlWebpackPlugin` — uses `public/index.html` as the template and injects `<script>`/`<link>` tags with `scriptLoading: "defer"`. Also copies `src/assets/wenosoft-icon-purple.png` as the favicon.
  - `CopyWebpackPlugin` — copies everything in `public/` (except `index.html`) to the build output.
  - `ForkTsCheckerWebpackPlugin` — runs `tsc` in a worker thread so type errors surface in dev/build output without blocking SWC compilation.

### webpack.dev.js

Merged on top of common for development:

- `mode: "development"`, `devtool: "eval-cheap-module-source-map"` (fast rebuilds + readable stack traces).
- **TS/JSX**: `swc-loader` with `transform.react.development: true` and `refresh: true`.
- **CSS**: `style-loader → css-loader → postcss-loader` (CSS injected into the DOM via `<style>` tags).
- **React Refresh** plugin enables stateful HMR.
- **devServer**:
  - Port `3000`, opens browser, hot reload enabled.
  - `historyApiFallback: true` — direct visits to `/about` etc. are served `index.html`.
  - `client.overlay` shows errors in-browser.

### webpack.prod.js

Production overrides:

- `mode: "production"`, `devtool: "source-map"`, `bail: true` (fail fast on errors).
- **Output filenames** include `[contenthash:8]` for long-term caching.
- **TS/JSX**: `swc-loader` with React refresh disabled.
- **CSS**: `MiniCssExtractPlugin.loader → css-loader → postcss-loader` — CSS becomes its own `assets/css/[name].[hash].css` file.
- **Minification**: `TerserPlugin` for JS (2 compress passes), `CssMinimizerPlugin` for CSS.
- **Code splitting** via `optimization.splitChunks`:
  - `react-vendor` — React, React DOM, React Router, scheduler.
  - `vendor` — everything else from `node_modules`.
  - `main` — your application code.
  - `runtime` — separate chunk for webpack's runtime so vendor chunk hashes stay stable across releases.

### PostCSS / Tailwind

[postcss.config.js](postcss.config.js) is a one-liner that loads `@tailwindcss/postcss`. Tailwind v4 reads the CSS file at build time, discovers utility classes used in `src/**/*`, and emits only what's used.

### SWC

There is **no** `.swcrc`. SWC options are passed inline through `swc-loader` in [webpack.dev.js](webpack.dev.js) and [webpack.prod.js](webpack.prod.js):

```js
{
  jsc: {
    parser: { syntax: "typescript", tsx: true, dynamicImport: true },
    transform: {
      react: { runtime: "automatic", development: <env>, refresh: <env> },
    },
    target: "es2022",
  },
  module: { type: "es6" },
}
```

`target: "es2022"` keeps the bundle small; the `browserslist` field in [package.json](package.json) is what governs how aggressive downleveling can be in tooling that consumes it.

---

## Adding a new page

1. Create a component in `src/pages/`:

   ```tsx
   // src/pages/PricingPage.tsx
   import { Seo } from "@/components/seo/Seo";
   import { Section } from "@/components/layout/Section";
   import { SITE } from "@/config/site";

   const TITLE = `Pricing — ${SITE.name}`;
   const DESCRIPTION = "Simple, transparent pricing for our engagements.";

   export function PricingPage() {
     return (
       <>
         <Seo title={TITLE} description={DESCRIPTION} path="/pricing" />
         <Section eyebrow="Pricing" title="Built for the work you actually need.">
           {/* ... */}
         </Section>
       </>
     );
   }
   ```

2. Register the route in [src/App.tsx](src/App.tsx):

   ```tsx
   import { PricingPage } from "@/pages/PricingPage";
   // ...
   { path: "/pricing", element: <PricingPage /> },
   ```

3. Add the page to the nav in [src/components/layout/Header.tsx](src/components/layout/Header.tsx) and [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx) if it should appear there.

4. Add a `<url>` entry to [public/sitemap.xml](public/sitemap.xml).

---

## Adding a new component

Pick the right folder:

| Folder                     | Use for                                                         |
| -------------------------- | --------------------------------------------------------------- |
| `src/components/layout/`   | Structural components (Header, Footer, Section, layout shells). |
| `src/components/ui-brand/` | Branded primitives (buttons, links, cards).                     |
| `src/components/brand/`    | Logo, wordmark, marketing-specific brand pieces.                |
| `src/components/seo/`      | Anything that writes to `<head>`.                               |

Component conventions:

- Named exports (no `default`).
- File name matches the component name (`MyThing.tsx` exports `MyThing`).
- Props typed with a `Props` interface; never use `React.FC`.
- Keep styling with Tailwind utilities; only add custom CSS if it can't be expressed with utilities.

---

## Working with images

Import images as ES modules — webpack returns the URL string at build time:

```tsx
import banner from "@/assets/wenosoft-banner.png";

<img
  src={banner}
  alt="Wenosoft Technologies storefront signage"
  width={1400}
  height={900}
  loading="lazy"
  decoding="async"
/>;
```

Webpack fingerprints the URL (`wenosoft-banner.2a86b852.png`) so it can be cached forever. The `width`/`height` attributes are important — they prevent layout shift on slow connections.

For `<img>` performance:

- Above the fold: `loading="eager" fetchPriority="high"`
- Below the fold: `loading="lazy" decoding="async"`

---

## TypeScript configuration

[tsconfig.json](tsconfig.json) is strict by design:

- `strict: true` (turns on all strict flags)
- `noUnusedLocals` + `noUnusedParameters`
- `noImplicitReturns`
- `noFallthroughCasesInSwitch`
- `noImplicitOverride`
- `forceConsistentCasingInFileNames`

If you have a deliberately unused parameter, prefix with `_` (e.g. `_event`) — the ESLint rule respects that.

---

## Linting & formatting

- **ESLint 9 flat config** in [eslint.config.mjs](eslint.config.mjs): `@eslint/js` recommended + `typescript-eslint` recommended + `react`, `react-hooks`, `react-refresh` plugins + Prettier integration.
- **Prettier** is wired through `eslint-plugin-prettier` so a single `npm run lint` reports both code-quality and formatting issues.

The rules of thumb:

- Run `npm run format` before committing.
- Run `npm run lint` to verify nothing else is wrong.

---

## Deployment (Netlify)

Push the repo to GitHub (or GitLab/Bitbucket), then in Netlify:

1. **Add new site → Import an existing project**, pick the repo.
2. Netlify reads [netlify.toml](netlify.toml) — no manual build settings required.
3. Click **Deploy**.

What [netlify.toml](netlify.toml) does:

| Block                                | Effect                                                                                    |
| ------------------------------------ | ----------------------------------------------------------------------------------------- |
| `[build]`                            | Runs `npm run build`, serves `dist/`.                                                     |
| `[build.environment]`                | Pins `NODE_VERSION = "20"` so Netlify matches `.nvmrc`.                                   |
| `[[redirects]] /* → /index.html 200` | SPA fallback — direct visits to `/about` etc. don't 404.                                  |
| `[[headers]] /assets/*`              | `Cache-Control: public, max-age=31536000, immutable` — hashed files cached forever.       |
| `[[headers]] /index.html` & `/`      | `Cache-Control: public, max-age=0, must-revalidate` — users always get the latest deploy. |
| `[[headers]] /*`                     | Security: `X-Frame-Options DENY`, `X-Content-Type-Options nosniff`, HSTS, etc.            |

After deploy, in Netlify dashboard:

- **Domain management** → add `wenosoft.com` and verify DNS.
- **Site settings → Build & deploy → Continuous deployment** — leave on `main` (or whichever branch you ship from).

Deploy previews and atomic rollbacks come for free.

---

## Performance notes

The production build is split:

```
assets/js/runtime.[hash].js       ~2 KiB    (webpack runtime)
assets/js/react-vendor.[hash].js  ~270 KiB  (React + Router)
assets/js/main.[hash].js          ~30 KiB   (app code)
assets/css/main.[hash].css        ~35 KiB   (Tailwind + brand)
```

Total compressed initial payload is well under 100 KiB gzip.

> **Image budget warning**: the brand PNGs in `src/assets/` (`wenosoft-banner.png` 1.69 MiB, `wenosoft-icon-showcase.png` 1.63 MiB, `wenosoft-logo-reveal.png` 543 KiB) exceed webpack's 500 KiB asset budget. They work, but for Largest Contentful Paint you should convert them to WebP or AVIF at appropriate dimensions. Tools: `sharp`, `squoosh`, or Netlify's [Image CDN](https://docs.netlify.com/image-cdn/overview/).

---

## Browser support

Defined in the `browserslist` field of [package.json](package.json):

- **Production**: `> 0.5%, not dead, not op_mini all`
- **Development**: last 2 versions of Chrome, Firefox, Safari, Edge.

If you change targets, also bump `jsc.target` in the swc-loader options inside [webpack.dev.js](webpack.dev.js) and [webpack.prod.js](webpack.prod.js).

---

## Troubleshooting

**`npm install` fails with `ERESOLVE`**
Make sure Node ≥ 20: `node -v`. If a dep introduces a peer conflict, the senior-engineer path is to find a compatible replacement, not `--legacy-peer-deps`.

**`npm run dev` opens but the page is blank**
Check the browser console. The most common cause is a thrown error in a page component — the error overlay should show it. If `#root` is missing, verify [public/index.html](public/index.html) wasn't edited.

**`/about` works in `npm run dev` but 404s in production**
Your server must rewrite unknown paths to `/index.html`. Netlify is configured via [netlify.toml](netlify.toml); for other hosts add the equivalent rewrite.

**Type-check passes but build fails with a strange Tailwind class**
Tailwind v4 only includes classes it sees in the source. If you build a class name dynamically (`` `bg-${color}-500` ``), Tailwind can't see it. Either spell the full class or add an `@source` directive to [src/styles.css](src/styles.css).

**Images don't update after I replaced them**
Webpack hashes by content, so a replaced file gets a new hash and the browser fetches the new asset. If a stale image lingers, hard-refresh (Ctrl + Shift + R) or clear the service worker (none is registered, but proxies can cache).

**`npm run build` warns about asset size**
Those warnings are the three large PNGs called out under [Performance notes](#performance-notes). Convert them to WebP/AVIF to silence the warning.

---

## License

Copyright © Wenosoft Technologies. All rights reserved.
