# Mulberry Grove — Design System (Phase 1: Homepage)

> **Refinement pass:** the section list (§5), the header/logo rules (§3, §5) and the animation table (§6) changed. See `REFINEMENT-LOG.md` for the current version.
>
> **Pass 3:** hero thumbnails, three-image welcome, expanding residential cards, pinned partners story, perspective gallery and footer reveal were added. See `REFINEMENT-LOG.md` → "Pass 3".
>
> **Latest revision:** the hero uses thumbnail controls only, partner images and cards transition together, and the perspective gallery is no longer rendered on the homepage. See `REFINEMENT-LOG.md` for details.

Tokens live in `src/index.css` (`@theme` + `:root`). Components live in `src/components`.
Anything marked **PROVISIONAL** needs client approval (see `CLIENT-APPROVAL-CHECKLIST.md`).

---

## 1. Color

| Token | Value | Role |
|---|---|---|
| `--color-navy` | `#003C71` | **Brand — Primary Navy.** Headings, logo on light, retail section, footer, primary buttons |
| `--color-cool` | `#D9D9D6` | **Brand — Cool Gray.** Partner band (45 % tint), image placeholders |
| `--color-gold` | `#D0C883` | **Brand — Muted Gold.** Accents only: hero CTA, hairline accents, eyebrows on navy, progress |
| `#FFFFFF` | white | Supporting — page background |
| `--color-paper` | `#F8F8F5` | Supporting — alternate section background |
| `--color-ink` | `#1C2530` | Supporting — body text (at 75–80 % for paragraphs), image overlays |

Rules
- No colors outside this table. No gradients except dark, transparent **ink** overlays that keep text legible on photographs.
- Gold is never used for text on white (insufficient contrast). Gold on navy = 6.5 : 1; navy on gold = 6.5 : 1; navy on white = 11.1 : 1.
- Hairlines: `--rule` (ink 14 %) on light, white 20–25 % on navy.

## 2. Typography — PROVISIONAL pairing

| Use | Family | Class | Size (fluid) |
|---|---|---|---|
| Hero / closing headline | Cormorant Garamond 400 | `.display-hero` | 44 → **110 px** (`clamp(2.75rem, 7.4vw + .4rem, 6.875rem)`), line-height 0.95 |
| Section headings | Cormorant Garamond 400 | `.display-section` | 44 → **76 px** (`clamp(2.75rem, 5.3vw, 4.75rem)`), line-height 1 |
| Sub-headings / company names | Cormorant Garamond 400 | `.display-md` | 30 → 42 px |
| Lead paragraph | Cormorant Garamond 400 | `.lead` | 24 → 32 px |
| Body | DM Sans 400 | `.body-lg` | 16 → **18 px**, line-height 1.75 |
| Eyebrow / labels / nav / buttons | DM Sans 500 | `.eyebrow`, `.nav-link`, `.btn` | 12–13 px, uppercase, tracking 0.14–0.22 em |

- **Luxury Platinum is the logo typeface only.** It is never typed; the logo is always the original artwork (`src/components/ui/Logo.tsx`).
- Eyebrows are used only where the wording is client terminology.
- Fonts load from Google Fonts with `display=swap` (two families, five files).

## 3. Logo

- Source: original SVG lockup (tree symbol + wordmark) from the client's live site — `src/assets/brand/mulberry-grove-logo.svg`, unmodified.
- Proportions locked at 403 : 285 (`aspect-ratio`), sized only by `--logo-h`. Never stretched, cropped or redrawn.
- Colorways used: **white** (over photography / navy) and **navy `#003C71`** (on white). Both already appear on the client's live site (white hero logo, navy favicon). Same paths — only `fill` changes.
- Clear space: header padding keeps ≥ ½ logo-height free on all sides. *Exact clear-space rule to be checked against the Brand Guide PDF (not available in the workspace).*

## 4. Grid & layout

| | Value |
|---|---|
| Reference width | 1440 px |
| Content max-width | **1320 px** (`--container`) |
| Side padding | `--gutter: clamp(1.25rem, 5.5vw, 6.75rem)` → 20 px (mobile) · 42 px (768) · 56 px (1024) · 79 px (1440) · 106 px (1920) |
| Columns | 12-column grid from 1024 px, 32 px gutters; 2–3 columns at 768 px; single column below |
| Section spacing | `--section-y: clamp(4rem, 9vw, 8.75rem)` → 64 px (mobile) · 130 px (1440) · 140 px max |
| Corners | Square everywhere. No shadows, no glass, no pills |

Breakpoints: `sm 640` · `md 768` · `lg 1024` · `xl 1280`. Verified at 1440, 1280, 1024, 768, 390 and 360 px (no horizontal overflow).

## 5. Components

**UI (`src/components/ui`)**

| Component | Purpose |
|---|---|
| `Container` | Centered 1320 px column with responsive gutters |
| `SectionHeading` | Editorial H2/H3 that rises from behind a mask |
| `AnimatedReveal` | Fade + 28 px rise on scroll, optional stagger delay |
| `ImageReveal` | Directional mask reveal + settling zoom; frame reserves space (no layout shift) |
| `PrimaryLink` | The one CTA: `text` (underline + arrow), `gold`, `navy`, `outline-light`; `external` adds new-tab + `rel="noopener noreferrer"` + screen-reader note; `stretched` makes a card fully clickable |
| `ImageGallery` | Horizontal gallery on native scroll. `editorial` (mixed crops, drag to explore) and `spotlight` (dominant image + neighbors, counter, progress). Touch swipe, mouse drag, arrow buttons, ← → Home End |
| `Lightbox` | Native `<dialog>` enlarged view with zoom; focus-trapped, Esc closes |
| `CountUp` | Counts to an approved figure once; width reserved; final value exposed to assistive tech |
| `SiteImg` | Renders an entry from `siteImages.ts` (srcset, lazy, alt) |
| `Logo`, `Icons` | Original logo artwork; hairline arrow/control icons |

**Layout:** `Header` (transparent → white on scroll, accessible mobile menu), `Footer`.

**Sections (`src/components/sections`)** in page order: `Hero`, `WelcomeSection`, `VisionSection`, `ResidentialSection`, `CommunityLocationSection`, `RetailSection`, `PartnersSection`, then `Footer`. Other section components are retained for future use.

**Data (`src/data`)** — the only files a content/image revision should touch:
`content.ts` (all copy) · `siteImages.ts` (all images) · `siteConfig.ts` (navigation, partner URLs, contact object).

## 6. Animation principles

| Kind | Duration | Easing | Tool |
|---|---|---|---|
| Text reveal | 0.8–0.9 s | `cubic-bezier(.16,1,.3,1)` | CSS + IntersectionObserver |
| Image reveal (mask) | 1.0 s (+1.5 s settle from scale 1.12) | `cubic-bezier(.65,0,.35,1)` | CSS + IntersectionObserver |
| Hover (arrows, underlines, zoom) | 0.3–0.45 s (image zoom 1.2 s) | ease-out | CSS |
| Hero intro | image 2 s (scale 1.06 → 1), lines 0.9 s staggered 0.12 s, then supporting line, CTA, controls | power2/3 out | GSAP |
| Hero slide change | 1.5 s thumbnail-to-full-screen reveal with soft zoom | expo in-out | GSAP |
| Hero autoplay | 9 s per slide; selecting a thumbnail or focusing the hero stops rotation; pauses off-screen and in background tabs | linear progress | GSAP |
| Partner story | Three coordinated image and card transitions, with rapid changes queued | CSS easing | CSS + native scroll |

- The partners story uses CSS `position: sticky`; native scrolling is never hijacked. The masterplan is a compact, unpinned preview.
- Everything else scrolls normally with a single, once-only reveal per element.
- No parallax stacks, repeated rotations or layout-shifting animation.
- `prefers-reduced-motion: reduce` → reveals show their final state, hero autoplay is disabled, slide changes are instant, partners are presented as static panels and smooth scrolling is off.
- Only one animation library (GSAP core).

## 7. Accessibility & performance baseline

- One `<h1>`; `<h2>` per section; `<h3>` for cards/companies. Landmarks: `header`, `nav` (labeled), `main`, `footer`.
- Skip link, visible focus rings (navy on light, gold on dark), all touch targets ≥ 44 px.
- Carousels: buttons + keyboard + touch; nothing is drag-only. Autoplay can be paused.
- Images: descriptive `alt`, `loading="lazy"` below the fold, reserved aspect ratios, responsive `srcset`; hero image prioritized, later slides deferred.
- No third-party scripts. No analytics, forms or tracking in Phase 1.
