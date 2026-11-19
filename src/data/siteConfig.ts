/**
 * SITE CONFIGURATION — navigation, homepage anchors, partner URLs and contact details.
 *
 * PHASE 1 (homepage only): the five navigation labels are plain, non-interactive text.
 * Their future routes are kept below for Phase 2. Sources: CONTENT-SOURCES.md.
 */

export const routes = {
  home: "/",
} as const;

/** Homepage section anchors. Navigation labels do NOT link to these. */
export const anchors = {
  main: "#main",
  vision: "#vision",
  masterplan: "#masterplan",
  residential: "#residential",
  singleFamily: "#single-family-homes",
  apartments: "#apartment-homes",
  community: "#community",
  retail: "#retail",
  location: "#location",
  contact: "#contact",
} as const;

export interface NavItem {
  label: string;
  /** Route for the future page (Phase 2). Not rendered as a link in Phase 1. */
  futureRoute: string;
  emphasised?: boolean;
}

/** Primary navigation, in client order. */
export const navigation: NavItem[] = [
  { label: "Vision", futureRoute: "/vision" },
  { label: "Residential", futureRoute: "/residential" },
  { label: "Community", futureRoute: "/community" },
  { label: "Retail", futureRoute: "/retail" },
  { label: "Contact Us", futureRoute: "/contact-us", emphasised: true },
];

/**
 * PHASE 2 SWITCH. Keep `false` until the inner pages are approved and built.
 * When `true`, Header and Footer render each label as a link to its `futureRoute`.
 */
export const navigationEnabled: boolean = false;

/* --------------------------------------------------------------------------
   Partner companies
   Unpublished details (Stone Martin / Greystone phone numbers and emails on the
   live footer) are intentionally absent — see CLIENT-APPROVAL-CHECKLIST.md §5.
   -------------------------------------------------------------------------- */
export const partners = {
  woodruff: {
    name: "Woodruff Real Estate Services, LLC",
    website: "https://www.woodruffrealestateservices.com/",
  },
  stoneMartin: {
    name: "Stone Martin Builders",
    website: "https://www.stonemartinbuilders.com/",
    /** Mulberry Grove community page — used by the Single-Family "Learn More" CTA. */
    mulberryGroveUrl: "https://www.stonemartinbuilders.com/find-my-home/harris-county/mulberry-grove",
  },
  greystone: {
    name: "Greystone Properties",
    /** REQUIRED apartment link supplied by the client. */
    website: "https://greystoneproperties.net/mulberry-grove",
    mulberryGroveUrl: "https://greystoneproperties.net/mulberry-grove",
  },
} as const;

/* --------------------------------------------------------------------------
   Contact details — copied from the LIVE site (experiencemulberrygrove.com),
   which the client confirmed is correct. Do NOT use the test-site footer
   (misspelled name, truncated phone numbers).
   -------------------------------------------------------------------------- */
export interface ContactPerson {
  name: string;
  title: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
}

export const contact = {
  company: partners.woodruff.name,
  people: [
    {
      name: "Tra Dykes",
      title: "Broker",
      phoneDisplay: "706.221.3632",
      phoneHref: "tel:+17062213632",
      email: "TDykes@thewoodruffco.com",
    },
    {
      name: "Julie Quigley",
      title: "Associate Broker",
      phoneDisplay: "706.786.6700",
      phoneHref: "tel:+17067866700",
      email: "julieq@thewoodruffco.com",
    },
  ] satisfies ContactPerson[],
  generalEmail: "info@woodruffrealestateservices.com",
  website: partners.woodruff.website,
} as const;

/** Live-site footer reads "© {year} Woodruff Real Estate Services, LLC". */
export const copyright = {
  holder: partners.woodruff.name,
} as const;
