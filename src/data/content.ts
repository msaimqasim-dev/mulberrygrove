/**
 * CLIENT-APPROVED COPY — single source of truth for all visible homepage text.
 *
 * Every string below is taken from client material (live site, test site or
 * the client's written instructions). Nothing here is invented marketing copy.
 * Section-by-section sources are mapped in CONTENT-SOURCES.md.
 *
 * Do not change wording in this file without client approval.
 */
import { anchors, partners } from "./siteConfig";

/*
 * ORGANIZATION
 *  • Used on the homepage (Phase 1): brand, hero, welcome, vision (summary + stats),
 *    residential, community + location (excerpts), retail, partners, footer, a11y.
 *  • RESERVED FOR PHASE 2 — kept complete, not rendered on the homepage:
 *    discovery, finalCta, development, vision.chapters, vision.cta,
 *    community/location full text (location.body), retail.cta.
 */
export const content = {
  brand: {
    name: "Mulberry Grove",
    tagline: "Simply Beautiful Living.",
  },

  /* 01 — Hero ------------------------------------------------------------ */
  hero: {
    /** "Simply Beautiful Living." — split only for the line-by-line reveal. */
    headlineLines: ["Simply Beautiful", "Living."],
    /** "Thoughtfully Planned - Ideally Located - Naturally Inspired" */
    supportingParts: ["Thoughtfully Planned", "Ideally Located", "Naturally Inspired"],
    supportingSeparator: " - ",
    cta: { label: "View Masterplan", href: anchors.masterplan },
  },

  /* 02 — Discovery navigation ------------------------------------------- */
  discovery: [
    { label: "Single-Family Homes", href: anchors.singleFamily },
    { label: "Apartment Homes", href: anchors.apartments },
    { label: "Retail", href: anchors.retail },
  ],

  /* 03 — Welcome ---------------------------------------------------------
     One client paragraph, typeset in three tiers. Read in order
     (lead + body + closing) it is the exact, complete client text. */
  welcome: {
    heading: "Gather Together.",
    lead: "Discover a small-town setting designed to connect nature and community like never before.",
    body: "A place where living simply and beautifully is inevitable. Where new homes are built with an appreciation for the land and your fellow neighbors. Where local shops are right around the corner and the shopkeeper knows you by name. And where spaces are created for family and friends to gather, learn and grow.",
    closing: "Welcome to Mulberry Grove.",
  },

  /* 04 — Vision / master plan -------------------------------------------
     One client paragraph split into three consecutive scroll "chapters".
     Read in order it is the exact, complete client text. Figures are the
     three stated in that paragraph — no others. */
  vision: {
    heading: "Peace of Place.",
    /** Homepage excerpt: the first two sentences of the approved paragraph, verbatim. */
    summary:
      "Just north of Columbus, GA and encompassing over 1,000 acres, Mulberry Grove introduces a thoughtfully planned community that is worlds away from the hustle and bustle of everyday life. Nestled among 30 acres of lakes and 138 acres of greenway, our community will offer a neighborhood environment complete with beautiful residences, convenient retail, community spaces and abundant greenspace.",
    /** The three approved figures, counted once on the homepage. */
    stats: [
      { prefix: "Over", value: 1000, label: "acres" },
      { prefix: "", value: 30, label: "acres of lakes" },
      { prefix: "", value: 138, label: "acres of greenway" },
    ],
    chapters: [
      {
        text: "Just north of Columbus, GA and encompassing over 1,000 acres, Mulberry Grove introduces a thoughtfully planned community that is worlds away from the hustle and bustle of everyday life.",
        stats: [{ prefix: "Over", value: 1000, label: "acres" }],
      },
      {
        text: "Nestled among 30 acres of lakes and 138 acres of greenway, our community will offer a neighborhood environment complete with beautiful residences, convenient retail, community spaces and abundant greenspace.",
        stats: [
          { prefix: "", value: 30, label: "acres of lakes" },
          { prefix: "", value: 138, label: "acres of greenway" },
        ],
      },
      {
        text: "Paths and trails for hiking and biking. Lakes and parks for relaxation and recreation. All of it perfectly suited to its natural surroundings, allowing for a slower pace and a true sense of place.",
        stats: [],
      },
    ],
    cta: { label: "View Masterplan" },
    /** Image description (alt/dialog label) — from the plan's own title block. */
    planTitle: "Mulberry Grove Master Plan",
  },

  /* 05 — Residential ---------------------------------------------------- */
  residential: {
    heading: "Come Home.",
    intro:
      "From residences to own to apartments for lease, Mulberry Grove is creating dwelling places designed with your unique needs in mind. With classic, traditional and craftsman-style architecture, each new home provides a warm and welcoming lifestyle that connects to the surrounding community. Whether you’re a young family searching for a first home or an empty nester looking for a simpler way of life, look no further than Mulberry Grove.",
    cards: [
      {
        id: "single-family-homes",
        title: "Single-Family Homes",
        company: partners.stoneMartin.name,
        description:
          "Proudly delivering exquisite homes across the southeast. Your one-of-a-kind design is nestled into a neighborhood with stunning scenery, a functional layout and premier amenities. Celebrate life in a community that fits your unique style of living. Discover your ideal home today.",
        cta: { label: "Learn More", href: partners.stoneMartin.mulberryGroveUrl },
        imageKey: "singleFamily",
      },
      {
        id: "apartment-homes",
        title: "Apartment Homes",
        company: partners.greystone.name,
        description:
          "Our mission is to provide superior apartment communities where living is a pleasure. Anticipating and exceeding your expectations, all of our communities are convenient to all of the attractions, shopping, restaurants, great schools and much more. Experience the Greystone Properties difference.",
        cta: { label: "Learn More", href: partners.greystone.mulberryGroveUrl },
        imageKey: "apartments",
      },
    ],
  },

  /* 06 — The companies involved -----------------------------------------
     Role wording follows the client's (Angela's) simple role distinctions.
     Category labels are the live site's contact-group labels.
     NOTE: no "property manager" claim is made for Greystone, and no legal
     ownership structure is stated. See CLIENT-APPROVAL-CHECKLIST.md §4. */
  partners: {
    /** Not displayed — screen-reader section name only (pending approval). */
    srHeading: "The companies involved",
    linkLabel: "Website",
    items: [
      {
        category: "General Inquiries",
        name: partners.woodruff.name,
        role: "Landowner and the contact associated with property, commercial land, and lots.",
        href: partners.woodruff.website,
        imageKey: "woodruff",
      },
      {
        category: "Single-Family Homes",
        name: partners.stoneMartin.name,
        role: "Builder/developer partner for single-family homes.",
        href: partners.stoneMartin.website,
        imageKey: "stoneMartin",
      },
      {
        category: "Apartment Homes",
        name: partners.greystone.name,
        role: "Apartment community at Mulberry Grove.",
        href: partners.greystone.website,
        imageKey: "greystone",
      },
    ],
  },

  /* 07 — Community / lifestyle ------------------------------------------
     Heading = third phrase of the approved supporting line.
     Text = excerpts of the approved "Peace of Place" paragraph. */
  community: {
    heading: "Naturally Inspired",
    lead: "Paths and trails for hiking and biking. Lakes and parks for relaxation and recreation.",
    body: "All of it perfectly suited to its natural surroundings, allowing for a slower pace and a true sense of place.",
  },

  /* 08 — Retail --------------------------------------------------------- */
  retail: {
    heading: "Experiences Every Day.",
    body: "Mulberry Grove is a master planned community that sits ready to serve its residents by providing development opportunities for a mix of local, regional and national brands. By offering a wide range of services and amenities all within walking distance, Mulberry Grove is ready to make life easier and just a little bit sweeter.",
    /** CTA uses the existing navigation label. Phase 1: #retail. */
    cta: { label: "Retail", href: anchors.retail },
  },

  /* 09 — Location ------------------------------------------------------- */
  location: {
    heading: "Idyllically Located.",
    /** Homepage excerpt: one sentence of the approved location paragraph, verbatim. */
    summary:
      "Surrounded by local farms and hamlets, our community sits right off Highway 185 with a dedicated exit, making access to nearby cities and employment centers a breeze.",
    body: "At home in Harris County, Mulberry Grove’s location is the perfect mix of laid-back living and modern conveniences. Surrounded by local farms and hamlets, our community sits right off Highway 185 with a dedicated exit, making access to nearby cities and employment centers a breeze. A quick 20 minutes to the south, Columbus offers an abundance of great local shopping and dining options. And with a strong public school system in Harris County, nearby universities and an abundance of recreational amenities, the quality of life makes for the perfect base.",
    /** Client-supplied location details. Drive-time table intentionally omitted. */
    facts: [
      "Harris County, Georgia",
      "Interstate I-185",
      "Exit 19",
      "Intersection of I-185 and Georgia Highway 315",
    ],
    mapTitle: "Mulberry Grove location map",
  },

  /* 10 — Development image story ----------------------------------------
     Heading = first phrase of the approved supporting line.
     No captions, years or milestones until verified client photography and
     chronology are supplied. */
  development: {
    heading: "Thoughtfully Planned",
  },

  /* 11 — Final CTA ------------------------------------------------------ */
  finalCta: {
    heading: "Simply Beautiful Living.",
    links: [
      { label: "Vision", href: anchors.vision },
      { label: "Residential", href: anchors.residential },
      { label: "Contact Us", href: anchors.contact },
    ],
  },

  /* Footer — group labels are the live site's own footer labels --------- */
  footer: {
    generalLabel: "General Inquiries",
    singleFamilyLabel: "Single Family Homes",
    apartmentLabel: "Apartment Homes",
    websiteLabel: "Website",
  },

  /* Non-visible accessibility labels (screen readers / focus only).
     These are functional UI strings, not marketing content. */
  a11y: {
    skipToContent: "Skip to content",
    home: "Mulberry Grove — Home",
    primaryNav: "Primary",
    footerNav: "Footer",
    menu: "Menu",
    heroSlides: "Choose a hero image",
    heroSlidesHelp: "Choose a photograph to stop automatic rotation and change slides. You can also use the arrow keys.",
    heroSlidesHelpReduced: "Choose a photograph to change slides. You can also use the arrow keys.",
    previous: "Previous",
    next: "Next",
    pause: "Pause",
    play: "Play",
    close: "Close",
    gallery: "Gallery",
    zoom: "Zoom",
    newTab: "(opens in a new tab)",
    slideOf: (current: number, total: number) => `${current} / ${total}`,
  },
} as const;

export type ResidentialImageKey = (typeof content.residential.cards)[number]["imageKey"];
