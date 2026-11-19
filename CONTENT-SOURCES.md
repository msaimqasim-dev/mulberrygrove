# Mulberry Grove — Content Sources (Phase 1: Homepage)

> **Refinement pass:** 02 Discovery and 11 Final CTA are no longer rendered (kept for Phase 2). 05 now combines Community & Location using approved excerpts. The Retail link was removed. Masterplan copy is now the first two sentences of the approved paragraph, plus the three approved figures. Navigation labels are plain text. See `REFINEMENT-LOG.md`.
>
> **Pass 3:** no new visible copy. A Gallery section (images only) was added, and the footer was rearranged using the same approved text.
>
> **Latest revision:** the Gallery section is no longer rendered. The partner copy and all visible client wording remain unchanged; new hero-control guidance is screen-reader-only functionality.

All visible copy is stored in `src/data/content.ts` and `src/data/siteConfig.ts`.
Nothing was written for this build; every visible string is quoted from one of the sources below.

## Sources consulted

| Key | Source | Status |
|---|---|---|
| **LIVE** | https://experiencemulberrygrove.com/ (official live site) | Fetched and read 18 Nov 2026 |
| **TEST** | https://mulberry.business-website.com/ (client test site) | Fetched and read 18 Nov 2026 |
| **BRIEF** | Project brief relaying the client's instructions (incl. Angela's 16 Nov 2026 notes) | Supplied in the prompt |
| **PARTNER** | stonemartinbuilders.com · greystoneproperties.net/mulberry-grove · woodruffrealestateservices.com | Used only to verify links resolve and company context — **no copy imported** |
| **ARCHIVE** | "Melburry Grove Data.zip" (Brand Guide PDF, Presentation PDF, content .docx, outline .docx, image folders) | **NOT PRESENT in the workspace — not inspected.** Nothing in this build claims to come from it |

Because the archive was unavailable, the logo, location map and master plan were taken from **LIVE**, where the client already publishes them.

---

## Section-by-section mapping

### Header / navigation
| Text | Source |
|---|---|
| Vision · Residential · Community · Retail · Contact Us | BRIEF (final navigation). LIVE nav reads: Vision, Community, Location, Residential, Retail, Contact |

### 01 Hero
| Text | Source |
|---|---|
| "Simply Beautiful Living." | LIVE (hero headline); TEST (page title) |
| "Thoughtfully Planned - Ideally Located - Naturally Inspired" | BRIEF (exact punctuation). TEST shows it as "Thoughtfully Planned . . . Ideally Located . . . Naturally Inspired" |
| "View Masterplan" | LIVE ("view masterplan >") / BRIEF |

### 02 Discovery navigation
| Text | Source |
|---|---|
| "Single-Family Homes", "Apartment Homes", "Retail" | BRIEF; LIVE uses "single-family homes", "apartment homes", "Retail" |

### 03 Welcome
| Text | Source |
|---|---|
| "Gather Together." | LIVE |
| "Discover a small-town setting designed to connect nature and community like never before. A place where living simply and beautifully is inevitable. Where new homes are built with an appreciation for the land and your fellow neighbors. Where local shops are right around the corner and the shopkeeper knows you by name. And where spaces are created for family and friends to gather, learn and grow. Welcome to Mulberry Grove." | LIVE — complete and verbatim. Typeset in three tiers (first sentence as lead, middle as body, last sentence as closing line); order and wording unchanged |

### 04 Vision / master plan
| Text | Source |
|---|---|
| "Peace of Place." | LIVE |
| "Just north of Columbus, GA and encompassing over 1,000 acres, … allowing for a slower pace and a true sense of place." (full paragraph) | LIVE — complete and verbatim, split into three consecutive scroll chapters at sentence boundaries |
| "Over 1,000 acres" · "30 acres of lakes" · "138 acres of greenway" | The three figures stated in that paragraph (BRIEF confirms these and no others) |
| "View Masterplan" | LIVE / BRIEF |
| Master plan image | LIVE ("view masterplan" link target) |

### 05 Residential
| Text | Source |
|---|---|
| "Come Home." + intro paragraph ("From residences to own … look no further than Mulberry Grove.") | LIVE — verbatim |
| "Single-Family Homes" / "Stone Martin Builders" / "Proudly delivering exquisite homes across the southeast. … Discover your ideal home today." | LIVE — verbatim |
| "Apartment Homes" / "Greystone Properties" / "Our mission is to provide superior apartment communities … Experience the Greystone Properties difference." | LIVE — verbatim |
| "Learn More" (×2) | LIVE ("learn more >") / BRIEF |
| Link → `stonemartinbuilders.com/find-my-home/harris-county/mulberry-grove` | BRIEF (LIVE still points to an older Stone Martin URL) |
| Link → `greystoneproperties.net/mulberry-grove` | BRIEF — required link (LIVE points to `greystoneatmulberrygrove.com`) |

**Deliberately not shown** (present on LIVE, time-sensitive): "phase 1 – 5 Homesite Remaining", "phase 2 – Coming Soon", "delivering 2023", "phase 1 - now leasing".

### 06 The companies involved
| Text | Source |
|---|---|
| "General Inquiries", "Single-Family Homes", "Apartment Homes" (category labels) | LIVE footer group labels ("general inquiries", "single family homes", "apartment homes") |
| "Woodruff Real Estate Services, LLC" — "Landowner and the contact associated with property, commercial land, and lots." | BRIEF — client-defined role |
| "Stone Martin Builders" — "Builder/developer partner for single-family homes." | BRIEF — client-defined role (LIVE: "Stone Martin – Builder") |
| "Greystone Properties" — "Apartment community at Mulberry Grove." | BRIEF — client-defined role ("Apartment phase/community at Mulberry Grove"), shortened |
| "Website" (link label) | LIVE footer link label |
| *(no visible section headline)* | No client-approved headline exists. The section is named "The companies involved" for screen readers only |

### 07 Community / lifestyle
| Text | Source |
|---|---|
| "Naturally Inspired" | Third phrase of the approved supporting line (BRIEF / TEST) |
| "Paths and trails for hiking and biking. Lakes and parks for relaxation and recreation." | LIVE — excerpt of "Peace of Place" (as directed by BRIEF) |
| "All of it perfectly suited to its natural surroundings, allowing for a slower pace and a true sense of place." | LIVE — excerpt of "Peace of Place" (as directed by BRIEF) |

No amenity names, captions or claims are attached to the photographs.

### 08 Retail
| Text | Source |
|---|---|
| "Experiences Every Day." + paragraph ("Mulberry Grove is a master planned community … just a little bit sweeter.") | LIVE — verbatim |
| "Retail" (CTA) | Navigation label (BRIEF) |

### 09 Location
| Text | Source |
|---|---|
| "Idyllically Located." + paragraph ("At home in Harris County, … makes for the perfect base.") | LIVE — verbatim |
| "Harris County, Georgia" · "Interstate I-185" · "Exit 19" · "Intersection of I-185 and Georgia Highway 315" | BRIEF location details; consistent with TEST ("…Harris County, Georgia located at the Mulberry Grove Exit on Interstate I-185 (exit 19) at the intersection of I-185 and Ga. Hwy 315") |
| Location map | LIVE (`map-location-mulberry-grove.svg`), unaltered |

**Deliberately omitted:** LIVE's drive-time list (20 min Columbus, 20 min Ft Benning, 30 min Lagrange, 50 min Peachtree City, 60 min Auburn, 70 min ATL airport) — pending verification, per BRIEF.

### 10 Development image story
| Text | Source |
|---|---|
| "Thoughtfully Planned" | First phrase of the approved supporting line (BRIEF / TEST) |
| *(no captions, dates or milestones)* | None supplied / verified |

### 11 Final CTA
| Text | Source |
|---|---|
| "Simply Beautiful Living." | LIVE |
| "Vision", "Residential", "Contact Us" | Navigation labels (BRIEF) |

### Footer
| Text | Source |
|---|---|
| "Simply Beautiful Living." | LIVE |
| "General Inquiries" / "Woodruff Real Estate Services, LLC" | LIVE footer |
| "Tra Dykes – Broker" · 706.221.3632 · TDykes@thewoodruffco.com | LIVE (name, title, number, `mailto:`) = BRIEF |
| "Julie Quigley – Associate Broker" · 706.786.6700 · julieq@thewoodruffco.com | LIVE = BRIEF |
| info@woodruffrealestateservices.com | LIVE (`mailto:` behind "Email") = BRIEF |
| "Website" → woodruffrealestateservices.com | LIVE = BRIEF |
| "Single Family Homes" / "Stone Martin Builders" / "Website" | LIVE footer labels; link per BRIEF |
| "Apartment Homes" / "Greystone Properties" / "Website" | LIVE footer labels; link per BRIEF |
| "© 2026 Woodruff Real Estate Services, LLC" | LIVE footer |

### Page metadata
| Text | Source |
|---|---|
| `<title>` "Mulberry Grove – Simply Beautiful Living" | TEST page title |
| Meta description: "Discover a small-town setting designed to connect nature and community like never before. A place where living simply and beautifully is inevitable." | LIVE — first two sentences of "Gather Together." |

---

## Non-visible functional strings (accessibility only)

Not marketing content; read by screen readers or shown only on keyboard focus:
"Skip to content", "Menu", "Previous", "Next", "Pause", "Play", "Close", "Zoom", "(opens in a new tab)", "Primary"/"Footer" (navigation names), "The companies involved" (section name), slide position ("2 / 3"), and image `alt` descriptions (which describe what is pictured and never name Mulberry Grove for stock photos).

Decorative numerals: "01–03" in the discovery strip and slide counters ("01 / 03", "01 / 05").

---

## Conflicts & discrepancies found (not silently resolved)

| # | Finding | How the build handles it |
|---|---|---|
| 1 | **Acreage:** LIVE copy says "over 1,000 acres"; TEST says "1,100-acre"; the master plan says "Total Land Area: 1100 Acres" | Uses approved copy "Over 1,000 acres" (consistent with all three) |
| 2 | **Lakes:** copy says "30 acres of lakes"; the master plan's land-use table lists "Lakes 27.61 Ac." | Uses approved copy "30"; flagged for confirmation |
| 3 | **Greenway:** copy "138 acres"; master plan "Greenway System 138.7 Ac." | Consistent |
| 4 | **Supporting line punctuation:** TEST ". . ." vs BRIEF " - " | BRIEF wording used |
| 5 | **Residential links:** LIVE links are older URLs | BRIEF links used; all verified to return HTTP 200 |
| 6 | **Residential phone/email on LIVE footer:** "Stone Martin – Builder 706.801.4265" (mulberrygrove@stonemartinbuilders.com); "April Durham – 706.221.7175" (mail@greystoneproperties.net) | **Not published.** Outside the BRIEF's approved contact list; awaiting confirmation |
| 7 | **Greystone management:** Angela describes Greystone as apartment property manager; Greystone's page credits **RAM Partners, LLC** (verified on the page 18 Nov 2026) | No "property manager" claim is made anywhere |
| 8 | **Ownership wording:** TEST: "a joint venture offered by MGDC Turner, LLC and The George C. Woodruff Company, Inc."; master plan title block: "Prepared for: W.C. Bradley Co. & The Woodruff Companies"; Angela: Woodruff Real Estate Services = landowner | Only Angela's simple role wording is used. No legal structure is stated |
| 9 | **Entitlement figures on TEST** (2,198 residential units; 2,416,600 SF retail/commercial; "only mixed-use development on I-185 with water, sewer, and zoning entitlements") | Not used |
| 10 | **Master plan date:** "March 12, 2007; Revised 9/9/19" | Shown as supplied on LIVE; flagged for confirmation that it is still the plan to publish |
| 11 | **"Location" nav item** exists on LIVE but not in the new navigation | Section kept on the homepage (`#location`); not in the nav |
| 12 | **"Privacy Policy"** link exists in LIVE footer | Not included — no page exists in Phase 1 |

Outstanding approvals are consolidated in `CLIENT-APPROVAL-CHECKLIST.md`.
