# Trihub — website

Marketing site for **Trihub by Triverse Solutions**: CRM, ERP, automation and custom business software.

React 19 · TypeScript · Vite · Tailwind CSS v4 · Three.js / React Three Fiber · Framer Motion · Lucide

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build → dist/
npm run preview   # serve the production build
```

## Before launch

| What | Where |
| --- | --- |
| Form endpoint (Formspree, CRM webhook, own API). Empty = the demo form opens a pre-filled email to support@trihub.tech | `src/lib/config.ts` → `demoEndpoint` |
| Legal review of the Privacy Policy and Terms of Use (drafted for the DPDP Act 2023 / IT Act 2000; jurisdiction set to Pune) | `src/data/legal.tsx` |
| If analytics, chat or tracking scripts are added, update the Privacy Policy's cookie section | `src/data/legal.tsx` |
| Pricing stays on request. To publish a price, add `price` to a tier | `src/data/pricing.ts` |

Company facts (legal name, CIN, address, socials) live in `src/lib/config.ts` and mirror triversesolutions.co.in.

## Search, answer-engine and generative-engine optimisation

- **Prerendered HTML** — `npm run build` renders every page to static HTML (`scripts/prerender.mjs`), then the client hydrates it. AI crawlers that don't run JavaScript still read all copy, the FAQ and the schema.
- **Pages** — `/`, `/privacy/`, `/terms/`, each with its own title, description, canonical URL and Open Graph tags.
- **JSON-LD graph** (`src/components/seo/StructuredData.tsx`) — Organization (Triverse Solutions: legal name, address, CIN, socials), WebSite, SoftwareApplication (Trihub, published by Triverse), FAQPage, plus WebPage and BreadcrumbList on legal pages.
- **FAQ** (`src/data/faq.ts`) — answer-first questions shown on the page and emitted as FAQPage from the same data.
- **`/llms.txt`** — a plain summary of Trihub for LLMs.
- **`robots.txt`** — explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and others; **`sitemap.xml`** lists all pages.

## Structure

```
src/
  styles/index.css        Design system: tokens (@theme), base, components
  lib/                    config, motion tokens, shared pointer store, utils
  hooks/                  media queries, capabilities (WebGL/quality), in-view, tilt, fit-scale
  data/                   all copy for modules, industries, pricing, nav
  components/
    ui/                   Button (magnetic), Logo, Reveal, SectionHeading, DemoDialog
    layout/               Nav (glass, scroll progress, dark-section aware), Footer
    3d/                   WebGL only — isolated from regular UI
      CoreMark.tsx        the Trihub core (logo mark as a solid)
      HeroScene.tsx       hero orbit + final-CTA "assembly" variant
      SystemScene.tsx     interactive platform for the System section
      labelTexture.ts     module labels drawn to canvas textures
      materials.ts        3D material system
      Studio.tsx          procedural studio lighting (no HDR download)
      SceneMount.tsx      lazy-mount, visibility pausing, poster fallback
  sections/               one file per page section, in page order
```

## Design system

Defined once in `src/styles/index.css` and consumed through Tailwind utilities.

- **Type** — Google Sans Flex (Manrope fallback). Fluid scale: `text-display`, `text-h2`, `text-h3`, `text-lead`, `text-micro`.
- **Color** — canvas `#F7F8FA`, ink `#111318`, ink-2 `#626872`, hairlines `rgb(17 19 24 / .08)`. One accent, `#4F46E5`, used for a single signal per view (active state, live data). Night sections use `#0B0D10`.
- **Radius** — 6 / 10 / 14 / 20 / 28 / 36px.
- **Elevation** — `shadow-xs` → `shadow-float`, soft and low-contrast.
- **Motion** — `ease-out-expo` for entrances, `ease-in-out-quint` for state changes; 150/240/420/700ms.
- **Glass** — nav and floating UI only.

## 3D language

Every 3D element is a product concept, not decoration:

- **The core** is the Trihub logo as a solid. A cube split into three pyramids along its diagonal; the seams form the logo's Y. How far apart the pieces sit tells the story: slightly open in the hero, opening as you scroll away, closing as the final CTA assembles.
- **Module cards** orbit the core and are linked to it by curves. Small indigo packets travel along each link (data flowing into the system). Hovering a card lifts it, slows the orbit, lights its link and reveals what it does. Clicking scrolls to that section.
- **The platform** (System section) turns to bring the selected module to the front and draws arcs to the modules it exchanges data with.
- DOM-based 3D (CSS perspective) is used for the CRM, ERP, custom-software and industry compositions, where crisp text matters more than lighting.

**Materials:** ceramic, frosted, graphite, steel, accent, seam. Studio lighting is generated from Lightformers once, with no bloom or post-processing.

## Performance and accessibility

- three.js (~265 KB gzip) loads only when a 3D section approaches the viewport. The initial bundle is React + Framer Motion + the page (~145 KB gzip).
- Canvases render only while visible. Off-screen or under reduced motion they switch to on-demand rendering.
- Quality tiers: desktop with a fine pointer gets physical materials and contact shadows; touch/small screens get standard materials and a capped DPR.
- No WebGL, a scene error or a still-loading chunk all show a static poster. Every 3D element is `aria-hidden`, and its content exists in the DOM (tabs, lists, panels).
- `prefers-reduced-motion`: parallax, orbits and scroll-scrubbing are disabled; the Problem section shows its resolved state.
- Keyboard: skip link, visible focus rings, arrow-key tab lists, native `<dialog>` with Esc and focus containment.
