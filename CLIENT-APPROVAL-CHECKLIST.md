# Mulberry Grove — Client Approval Checklist (Phase 1: Homepage)

> **Refinement pass:** the Retail link was removed. Navigation labels are now non-interactive text until Phase 2. Community and Location are one combined teaser. The sticky masterplan story is replaced by a compact preview. Items in §1 and §6 that mention these have changed. See `REFINEMENT-LOG.md` §8.
>
> **Pass 3:** new items to approve are listed in `REFINEMENT-LOG.md` → "Pass 3" §6 (page length, partner photos, gallery, footer panel colour, animated logo).
>
> **Latest revision:** the gallery has been removed from the homepage; the remaining image and logo approvals still apply.

Items to confirm with the client before the homepage is treated as approved.
Detail and evidence for each item: `CONTENT-SOURCES.md`, `IMAGE-SOURCES.md`, `DESIGN-SYSTEM.md`.

> **Workspace note:** the client archive "Melburry Grove Data.zip" (Brand Guide PDF, Presentation PDF, content and outline .docx files, image folders) was **not present** in the project workspace. Copy, logo, map and master plan were therefore taken from the official live site and the project brief. Please supply the archive so the Brand Guide and November outline can be checked directly.

---

## 1. Copy issues

- [ ] **Supporting line punctuation** — built as "Thoughtfully Planned - Ideally Located - Naturally Inspired" (brief). The test site shows ". . ." between phrases. Confirm hyphens (or supply preferred separator).
- [ ] **Section 06 has no visible headline.** No client-approved wording exists. It is named "The companies involved" for screen readers only. Supply a headline if one is wanted.
- [ ] **Section 07 heading "Naturally Inspired"** and **Section 10 heading "Thoughtfully Planned"** reuse phrases from the approved supporting line because no dedicated headings were supplied. Approve or replace.
- [ ] **Section 07 text** repeats two sentences that also appear in Section 04 ("Paths and trails…", "All of it perfectly suited…"), as directed. Confirm the repetition is acceptable or supply distinct community copy.
- [ ] **Section 10 has no body copy or captions** (none supplied). Supply verified captions/chronology with the real aerial photographs.
- [ ] **Three-tier typesetting** of "Gather Together." (first sentence enlarged, "Welcome to Mulberry Grove." set as a closing line) and the three-part split of "Peace of Place." — wording and order are unchanged; confirm the presentation.
- [ ] **Retail CTA "Retail"** currently links to `#retail` (its own section) per brief. It will point to the Retail page in Phase 2. Confirm, or hide it until then.
- [ ] **Meta description** uses the first two sentences of "Gather Together."; **page title** is "Mulberry Grove – Simply Beautiful Living". Confirm.
- [ ] **Omitted on purpose** (from the live site): "phase 1 – 5 Homesite Remaining", "phase 2 – Coming Soon", "delivering 2023", "phase 1 - now leasing", the drive-time list, and the "Privacy Policy" link. Confirm each stays out, or supply current, approved versions.
- [ ] **"Location" is not a navigation item** in the new structure, though the section exists on the homepage. Confirm.

## 2. Images awaiting replacement

- [ ] **All 21 photographs are temporary Pexels stock** (IDs in `IMAGE-SOURCES.md`). None depict Mulberry Grove. Replace via `src/data/siteImages.ts`.
- [ ] **Development image story** — replace with the client's real aerial sequence; add verified captions and dates only then.
- [ ] **Residential cards** — supply approved imagery of Stone Martin homes and Greystone apartments at Mulberry Grove (or approve continued illustrative use).
- [ ] **Retail image** — supply site imagery/renderings. Current image is illustrative and shows no legible business names.
- [ ] **Master plan** — the published plan is the "Conceptual Master Plan, March 12, 2007; Revised 9/9/19" from the live site. Confirm this is the current plan to publish, and supply the highest-resolution original for the enlarged view.
- [ ] **Host the full-resolution master plan with the new site** — the enlarged view currently loads it from the live site URL (with a bundled fallback).
- [ ] **Partner logos** — none are shown. Supply approved originals if logos are wanted.

## 3. Unverified statistics

- [ ] **"Over 1,000 acres"** — approved copy. Test site says "1,100-acre"; master plan says "Total Land Area: 1100 Acres". Confirm preferred wording.
- [ ] **"30 acres of lakes"** — approved copy. The master plan's land-use table lists **"Lakes 27.61 Ac."** Confirm "30".
- [ ] **"138 acres of greenway"** — matches the master plan ("Greenway System 138.7 Ac.").
- [ ] **"A quick 20 minutes to the south, Columbus…"** — inside the approved Location paragraph (kept verbatim). Confirm still accurate.
- [ ] No other figures are displayed. Entitlement numbers on the test site (2,198 residential units; 2,416,600 SF retail/commercial) are **not** used.

## 4. Company-role wording requiring approval

- [ ] **Woodruff Real Estate Services, LLC** — "Landowner and the contact associated with property, commercial land, and lots." Shown under "General Inquiries".
- [ ] **Stone Martin Builders** — "Builder/developer partner for single-family homes."
- [ ] **Greystone Properties** — "Apartment community at Mulberry Grove." **No "property manager" claim is made:** Angela describes Greystone as property manager, but Greystone's own Mulberry Grove page credits RAM Partners, LLC with management. Please confirm the correct description.
- [ ] **Ownership / legal structure** — sources differ: test site ("a joint venture offered by MGDC Turner, LLC and The George C. Woodruff Company, Inc."), master plan title block ("Prepared for: W.C. Bradley Co. & The Woodruff Companies"), Angela ("Woodruff Real Estate Services" as landowner). **None of this is published**; only Angela's simple roles are used. Confirm the wording the client wants public.
- [ ] **Partner links** — Stone Martin: `stonemartinbuilders.com/find-my-home/harris-county/mulberry-grove` (cards, footer) and `stonemartinbuilders.com` (company panel). Greystone: `greystoneproperties.net/mulberry-grove` (everywhere). Woodruff: `woodruffrealestateservices.com`. All return HTTP 200. Confirm destinations.

## 5. Contact details requiring confirmation

Published (footer), copied from the live site and matching the brief:

- [ ] Woodruff Real Estate Services, LLC
- [ ] Tra Dykes – Broker · 706.221.3632 · TDykes@thewoodruffco.com
- [ ] Julie Quigley – Associate Broker · 706.786.6700 · julieq@thewoodruffco.com
- [ ] info@woodruffrealestateservices.com · https://www.woodruffrealestateservices.com/
- [ ] "© 2026 Woodruff Real Estate Services, LLC" (as on the live site; year updates automatically)

**Not published — on the live site footer but outside the brief's approved list:**

- [ ] Stone Martin – Builder · 706.801.4265 · mulberrygrove@stonemartinbuilders.com
- [ ] April Durham · 706.221.7175 · mail@greystoneproperties.net

Confirm whether these should appear. They can be added in `src/data/siteConfig.ts` in minutes. Until then, residential inquiries are routed to each partner's website.

- [ ] The label **"General Inquiries"** is used for Woodruff (live-site footer). The live site also uses "For Commercial Land Sale:" for the same contacts. Confirm preferred label.
- [ ] No contact form is included (none specified; no backend in Phase 1).

## 6. Design decisions needing approval

- [ ] **Typeface pairing** — Cormorant Garamond (headings) + DM Sans (body/navigation). Provisional; the Brand Guide defines only the logo typeface (Luxury Platinum).
- [ ] **Logo usage** — original stacked lockup from the live site, in white (over imagery/navy) and navy `#003C71` (on white). Check colorways, minimum size (54 px tall in the scrolled header) and clear space against the Brand Guide; supply a horizontal lockup if one exists.
- [ ] **Hero** — three slides, 9-second autoplay with pause, identical approved copy on every slide.
- [ ] **Masterplan scroll story** — desktop only; plan stays in view while three text chapters pass and the three figures count up; the plan eases in towards its lakes/parks area mid-sequence. No overlays or phases added.
- [ ] **Location map** — soft pulse over the map's existing Exit 19 marker; map otherwise unaltered; opens enlarged.
- [ ] **Section order** — Hero → Discovery → Welcome → Vision → Residential → Companies → Community → Retail → Location → Development → Final CTA → Footer.
- [ ] **Navigation anchors (Phase 1)** — Vision → `#vision`, Residential → `#residential`, Community → `#community`, Retail → `#retail`, Contact Us → `#contact` (footer). "View Masterplan" → `#masterplan`.
- [ ] **Color use** — navy for the Retail band and footer, Cool Gray tint for the companies band, gold strictly as an accent.
- [ ] **External links open in a new tab.**

## 7. Technical notes for launch (no client decision needed)

- Fonts load from Google Fonts; photographs from the Pexels CDN until replaced. Self-host both for production if preferred.
- No analytics, cookies, schema markup or third-party scripts are included.
- Phase 2 pages are **not** started. Routes to wire up later are noted in `src/data/siteConfig.ts` (`futureRoute`).
