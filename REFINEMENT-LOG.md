# Mulberry Grove — Refinement Pass (Homepage, Phase 1)

Improvement pass on the existing React/Vite project. No inner pages were created, and no
client copy was rewritten. Only approved excerpts were shortened, verbatim.

## 1. Files modified

| File | Change |
|---|---|
| `src/components/layout/Header.tsx` | Rewritten. Static navigation labels, fixed header/logo size, mobile menu opens and closes. |
| `src/components/layout/Footer.tsx` | Rewritten. Static navigation labels, tighter spacing, `#contact` anchor removed. |
| `src/components/ui/NavLabel.tsx` | **New.** Shared navigation label. Plain text in Phase 1; one switch to link in Phase 2. |
| `src/data/siteConfig.ts` | Rewritten. Navigation items have `futureRoute` only (no `href`). Added `navigationEnabled = false`. |
| `src/data/content.ts` | Added `vision.summary`, `vision.stats`, `location.summary`. Added an organization note. All other content kept. |
| `src/data/siteImages.ts` | Added `communityTeaser` (Pexels 997133). All other entries kept. |
| `src/App.tsx` | Rewritten. New section order. GSAP ScrollTrigger no longer used. |
| `src/components/sections/Hero.tsx` | Gold rule draws before the headline. Lines rise with a skew. Slider unchanged. |
| `src/components/sections/WelcomeSection.tsx` | Rewritten. Compact. Staggered image masks. |
| `src/components/sections/VisionSection.tsx` | Rewritten. Compact masterplan preview. No pinning. Figures count once. |
| `src/components/sections/ResidentialSection.tsx` | Rewritten. Cards 5:4 on desktop, 4:3 on mobile. Entrances staggered from opposite edges. |
| `src/components/sections/CommunityLocationSection.tsx` | **New.** Combined Community & Location teaser with one coordinated reveal. |
| `src/components/sections/RetailSection.tsx` | Rewritten. Compact. Directional mask. Link removed. |
| `src/components/sections/PartnersSection.tsx` | Rewritten. Divider lines draw. Text staggers. Three panels kept. |
| `src/index.css` | Header and logo rules, `nav-static`, `hero-rule`, `plan-preview`, reveal groups, coordinated reveal, section spacing, scroll padding, reduced-motion rules. |
| `REFINEMENT-LOG.md` | **New.** This document. |
| `DESIGN-SYSTEM.md`, `CONTENT-SOURCES.md`, `IMAGE-SOURCES.md`, `CLIENT-APPROVAL-CHECKLIST.md` | Banner added pointing to this log, listing what changed. |

**Reserved for Phase 2 (kept complete, not rendered on the homepage):**
`DiscoveryNavigation.tsx`, `DevelopmentGallery.tsx`, `FinalCTA.tsx`, `CommunityGallery.tsx`, `LocationSection.tsx`.
Their source content stays in `content.ts` and `siteImages.ts`.

## 2. Sections

**Before (11 sections):** Hero · Discovery navigation · Welcome · Vision (sticky story) · Residential · Partners · Community photo carousel · Retail · Location · Development gallery · Final CTA · Footer.

**After (8 sections):**

| # | Section | Notes |
|---|---|---|
| 01 | Hero | Slider kept. Three slides. |
| 02 | Gather Together | Compact two-image composition. |
| 03 | Peace of Place (masterplan) | Plan preview, approved excerpt, three figures, lightbox. |
| 04 | Come Home (residential) | Two cards, shorter. Company attribution kept. |
| 05 | Community & Location | **Combined** from the former Community carousel and Location section. |
| 06 | Experiences Every Day (retail) | Compact navy split. |
| 07 | Development Partners | Three company panels: Woodruff, Stone Martin, Greystone. |
| 08 | Footer | Logo, tagline, static navigation, contacts, partner links, copyright. |

**Removed from the homepage:** Discovery navigation strip, Development gallery, Final CTA band, the second horizontal photo carousel, the sticky masterplan scroll story.

## 3. Navigation

- Vision, Residential, Community, Retail and Contact Us are **plain text** in the header, the mobile menu and the footer. They have no `href`, cannot be tabbed to, and keep their visual styling. Hover underlines were removed so they don't look clickable.
- Phase 2 hook: `navigationEnabled` in `siteConfig.ts` turns the labels into links to `futureRoute` (`/vision`, `/residential`, `/community`, `/retail`, `/contact-us`). Leave it `false` until those pages exist.
- The logo links to Home (`/`), and on the homepage it returns to the top.
- Mobile menu: opens and closes from the button, closes with Esc, moves focus back to the button, and makes the page inert while open.
- Removed the Retail call-to-action, which pointed at its own section.
- Kept: hero "View Masterplan" (scrolls to `#masterplan`), masterplan lightbox, map lightbox, and the three partner websites and residential "Learn More" links (new tab, `rel="noopener noreferrer"`).

## 4. Logo fix (sticky header)

**Cause:** the header height and logo size changed at the scroll threshold, with a height transition, so the wordmark shrank and the box reflowed.

**Fix:**
- The logo is one size in every state: 68px high on desktop (96px header), 56px on mobile (80px header).
- Only colour and background change on scroll (0.45s). The logo colour follows `currentColor`, so white becomes navy.
- Clearance is 14px above and below on desktop, 12px on mobile.
- The SVG artwork is unchanged. Its geometry was checked in the browser: nothing lies outside the `viewBox`, and overflow is visible. Proportions are fixed at 403:285.
- Verified at scroll positions 0, 23, 24, 25, 150 and 700px, at 1440, 1024 and 390 wide.
  - Header height is constant.
  - Logo is constant.
  - Fill is white at 0–24px and navy from 25px.

## 5. Animation changes

| Section | Motion |
|---|---|
| Hero | Gold rule draws in. Headline lines rise with a skew (expo ease). The image still reveals from 1.06 to 1. Slides keep the directional wipe with soft zoom. Autoplay (9s) and pause remain. |
| Gather Together | Heading and copy stagger. Large photo unmasks from below. Small photo slides in from the left, 0.3s later. |
| Peace of Place | Plan unmasks from below. Stat rules draw, and each figure counts up once. CTA fades in. No pinning. |
| Come Home | Cards unmask from opposite edges, staggered. Hover: slow image zoom and arrow nudge. |
| Community & Location | One coordinated reveal: photo unmasks from the top, text fades, map rises last. |
| Experiences Every Day | Photo unmasks from the left. Gold rule draws. Heading and copy rise. |
| Development Partners | Each panel's divider draws across, then its text rises, staggered by panel. |
| Footer | None. |

- **Reduced motion:** all reveals show their final state. Autoplay and the pause button are removed. Line draws and the map pulse are off. Smooth scrolling is disabled.
- **Scroll-jacking:** none. The masterplan no longer pins.
- **Libraries:** GSAP core only. ScrollTrigger is no longer imported. The production build is 856 KB (401 KB gzipped), down from 907 KB (421 KB gzipped).

## 6. Height at the same viewport (document height)

| Viewport | Before | After | Change |
|---|---|---|---|
| 1440 × 900 (desktop) | 11,547 px | **6,496 px** | **−43.7 %** |
| 390 × 844 (mobile) | 12,740 px | 9,717 px | −23.7 % |

Desktop section heights at 1440: Hero 900 · Gather Together 740 · Masterplan 860 · Residential 1,264 · Community & Location 955 · Retail 574 · Partners 530 · Footer 674.

## 7. Test results

- TypeScript (`tsc --noEmit`): pass. Production build (`npm run build`): pass.
- Console errors: none. Failed requests: none. Broken images: none. Single `<h1>`.
- Horizontal overflow: none at 1440, 1280, 1024, 768, 390 and 360.
- Header: state changes match the threshold. Logo geometry is stable. Visual crops checked, top and scrolled, desktop and mobile.
- Navigation: keyboard order is skip link → logo → View Masterplan → hero controls. The five labels are not in the order. Clicking a label does nothing.
- Lightboxes: masterplan (1463 px natural width) opens and closes. Location map opens.
- Mobile menu: open, close, Esc and toggle all pass. `aria-expanded` updates correctly.
- Reduced motion: confirmed final states and no pause control.
- Section order matches the brief.
- Visual review at 1440 and 390 for all sections.

## 8. Unresolved issues / approvals still needed

1. **"Naturally Inspired"** (community heading) and **"Idyllically Located."** (location heading) are still awaiting client approval. The first is an excerpt of the approved supporting line.
2. **Development Partners** has no visible headline. The name is for the team only. Client wording is still needed.
3. **Retail** has no link. Once the Retail page is approved, add its link through `navigationEnabled` / `futureRoute`.
4. **Masterplan** shows two of the three approved paragraph sentences as the summary, plus the three figures. The full paragraph is kept in `content.ts` (`vision.chapters`).
5. **Community map** is small on desktop (it opens to full size). The client may prefer a larger map.
6. **Mobile length** is 9,717 px. The 40–50 % target applied to desktop. Further mobile compression would mean dropping approved text, so it was not done.
7. **Photography** is still temporary stock. The Stone Martin and Greystone photographs are illustrative, not Mulberry Grove.
8. **Phone numbers** for Stone Martin and Greystone are still unpublished, awaiting client confirmation.
9. **Browsers:** tested in headless Chromium only. Safari, Firefox and physical devices remain untested.

---

# Pass 3 — Interaction and motion redesign

Requested changes to six areas. Design system, approved copy, original logo and the
non-interactive navigation are unchanged. No new visible text was written.

## 1. What changed

| Area | Change |
|---|---|
| **Hero** | Three thumbnails sit bottom-right. Changing slide makes the chosen thumbnail grow into the full-screen image. The outgoing image eases forward. Each thumbnail carries the autoplay progress bar. On phones the arrows are hidden (thumbnails, swipe and pause remain). |
| **Gather Together** | Three images instead of two: a tall one set lower on the left, a small one above a larger one on the right. Each uses the site's existing image reveal, opening from a different edge in sequence. |
| **Come Home** | The two cards share the row equally. Hovering or keyboard-focusing one widens it (about 62 % / 38 %) and reveals its description and link. On touch devices and below 1024px, cards stay equal and the description is always shown. |
| **Development Partners** | A full-screen image stays pinned while the page scrolls: image → Woodruff card → image changes → Stone Martin card → image changes → Greystone card. Background changes use an upward wipe with a settling zoom. A 01/02/03 index jumps to each partner. |
| **Gallery (new)** | A perspective row of nine images on a 3D ribbon: it sinks into the distance at the bottom-left, runs flat through the centre and climbs away at the top-right. Scrolling moves the images along it, left to right. Nothing is pinned. |
| **Footer** | Redesigned: large tagline, rule, contacts on the left, a light panel with the large original logo and the navigation labels. On screens where it fits, it stays fixed underneath the page and the last section slides up to uncover it. The logo arrives leaf by leaf, then the wordmark. |

Section order is now: Hero · Gather Together · Peace of Place · Come Home · Community & Location ·
Experiences Every Day · Development Partners · Gallery · Footer.

## 2. Files

- **Rewritten:** `Hero.tsx`, `WelcomeSection.tsx`, `ResidentialSection.tsx`, `PartnersSection.tsx`, `Footer.tsx`, `Logo.tsx`, `App.tsx`
- **New:** `GallerySection.tsx`
- **Edited:** `index.css` (new "Pass 3" block), `siteImages.ts` (thumbnail sizes, `welcome.tertiary`, `partners`, `gallery`), `content.ts` (partner image keys, one screen-reader label)

## 3. How the scroll effects behave

- **No scroll-jacking.** The partners story uses CSS `position: sticky`. Scroll position selects one of six states, and each change then plays as a timed transition, so text is never left half-visible.
- **Footer reveal fallback.** The reveal is used only when the footer fits in the window below the header. Otherwise it is an ordinary footer, so nothing can be cut off.
- **Reveal order.** The footer is uncovered from the bottom up, so each part animates as the page edge passes it. The tagline is last.
- **Keyboard.** Focusing a partner's link scrolls the story to that partner. Focusing a footer link scrolls to the end so it is never hidden under the page. Focusing a residential card's link expands that card.
- **Reduced motion.** Partners become three plain panels with no pinning. The gallery ribbon is shown still. The footer is ordinary. Hero autoplay is off.

## 4. Measurements

| Viewport | Original | Pass 2 | Pass 3 |
|---|---|---|---|
| 1440 × 900 | 11,547 px | 6,496 px | **9,525 px** |
| 390 × 844 | 12,740 px | 9,717 px | **11,723 px** |

The page is longer than after Pass 2. The pinned partners story is 300 % of the screen height
(2,700 px at 900 px tall; it was 530 px), the gallery adds 702 px, and the three-image
composition adds about 100 px. This partly reverses the 40–50 % shortening target from Pass 2.

Footer reveal by window size: active at 1920×1080, 1440×900, 1440×780, 1366×700, 1366×650 and
1024×768. Ordinary footer at 1280×620, 768×1024 and 390×844.

## 5. Test results (headless Chromium)

- TypeScript and production build pass. Latest build is 873 KB (406 KB gzipped).
- No console errors, failed requests or broken images. One `<h1>`.
- No horizontal overflow at 1440, 1280, 1024, 768, 390 or 360.
- Hero: thumbnail click, arrows, pause, keyboard and touch all change slide.
- Residential: 625 / 625 px by default, 769 / 481 px on hover or focus.
- Partners: all six states reached; index buttons and keyboard focus jump correctly.
- Footer: logo animation applies to all 47 original shapes; it replays after being covered again.
- Unchanged from Pass 2 and re-verified: header logo fixed at 68 px, navigation labels are plain text, masterplan lightbox, partner links, contact links, mobile menu.
- Mobile: all touch targets are at least 40 px.

## 6. Open points

1. **Page length.** See §4. If the manager's shortening target still applies, the partners story is the place to cut (for example 220 % instead of 300 %).
2. **Partner background photos** are illustrative stock. The Stone Martin and Greystone images are not homes or apartments at Mulberry Grove.
3. **Gallery** has no heading or captions (none are approved). Its nine photos repeat the reserved community set.
4. **Footer panel** uses Cool Gray `#D9D9D6` with a navy logo. Confirm this colourway against the Brand Guide.
5. **Logo animation** only sequences the arrival of the original shapes; the artwork is not altered. Confirm the client is comfortable with an animated logo.
6. **Browsers.** Tested in headless Chromium only. The ribbon and the footer reveal should be checked in Safari and on real phones.
7. Open points from Pass 2 §8 still apply.

## 7. Follow-up audit

The current homepage was compared at 1440 × 900 with the live Brixsa homepage. The reference uses a full-screen hero with three selectable, short image previews at the lower right; this homepage uses the same composition pattern while retaining Mulberry Grove copy, palette and imagery.

- **Partners accessibility fix:** only the active company panel is now in the accessibility tree and keyboard order (`aria-hidden` + `inert` on inactive panels). Its role copy is announced when the active panel changes. The three visible index buttons remain the keyboard-accessible way to jump between partners.
- **Hero interaction rechecked:** all three thumbnails load, thumbnail selection completes the image expansion, the correct slide becomes active and no request/console errors occur.
- **Current production build:** 873 KB (406 KB gzipped); TypeScript passes.
- **Current responsive sweep:** no horizontal overflow at 1440, 1280, 1024, 768, 390 or 360 px. Mobile navigation opens/closes; no external-page links were added to the disabled navigation labels.
- **Current document height:** 9,525 px at 1440 × 900 and 11,723 px at 390 × 844 (unchanged by the accessibility fix).

## 8. Latest revision

- Removed the hero's previous, next and pause buttons. The three image thumbnails remain in the same position; swipe and keyboard navigation also remain available. Autoplay stays at nine seconds and stops when a visitor selects a thumbnail or focuses the hero.
- Replaced the separate image-only and card-only partner scroll states with three coordinated scenes. The image and its corresponding card now transition together; rapid scrolling queues the latest scene until the current transition finishes. A small threshold buffer prevents flicker when scrolling around a scene boundary.
- Removed the perspective gallery from the homepage while retaining `GallerySection.tsx` and its image configuration for possible future use. The footer reveal now directly follows the partners story.
- Verified partner scenes forward, backward, through fast scroll changes and through the existing index buttons. Inactive cards remain inaccessible to keyboard and screen readers.
- Verified the three hero thumbnails, automatic rotation, manual stop, keyboard navigation, mobile menu, reduced-motion fallback and footer reveal. No console errors, broken images or horizontal overflow at 1440, 1280, 1024, 768, 390 or 360 px.
- Document height is 8,823 px at 1440 × 900 and 11,313 px at 390 × 844. The client-supplied copy, existing visual design and remaining animations are unchanged.


## 9. Footer alignment revision

- Moved the large Mulberry Grove logo panel from the right side to the upper-left of the footer, filling the previously empty area below the rule.
- Removed the bottom alignment on the contact column so General Inquiries and the Single Family Homes / Apartment Homes columns now start on the same top line as the logo panel.
- The panel stretches to the same row height, so top and bottom edges align equally on desktop. Mobile order is unchanged (panel first, contacts below).
- All footer copy, links, reveal animation and logo animation are unchanged. Verified at 1440 and 390 px: panel, contacts and partner columns share the same top coordinate; no overflow or console errors.
