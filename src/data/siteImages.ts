/** Homepage image sources and crop positions. See IMAGE-SOURCES.md. */
import masterplanPreview from "@/assets/masterplan/mulberry-grove-conceptual-master-plan.webp";
import locationMap from "@/assets/maps/map-location-mulberry-grove.svg";
import mgAerial from "@/assets/images/MG Aerial.jpg?no-inline";
import mgAerial360 from "@/assets/images/optimized/MG Aerial-360.jpg?no-inline";
import mgAerial960 from "@/assets/images/optimized/MG Aerial-960.jpg?no-inline";
import mgAerial1920 from "@/assets/images/optimized/MG Aerial-1920.jpg?no-inline";
import mgAerial2560 from "@/assets/images/optimized/MG Aerial-2560.jpg?no-inline";
import neighborhoodAerial from "@/assets/images/DJI_0390.jpg?no-inline";
import neighborhoodAerial360 from "@/assets/images/optimized/DJI_0390-360.jpg?no-inline";
import neighborhoodAerial960 from "@/assets/images/optimized/DJI_0390-960.jpg?no-inline";
import neighborhoodAerial1920 from "@/assets/images/optimized/DJI_0390-1920.jpg?no-inline";
import neighborhoodAerial2560 from "@/assets/images/optimized/DJI_0390-2560.jpg?no-inline";
import poolside from "@/assets/images/poolside 3.jpg?no-inline";
import poolside360 from "@/assets/images/optimized/poolside 3-360.jpg?no-inline";
import poolside960 from "@/assets/images/optimized/poolside 3-960.jpg?no-inline";
import family from "@/assets/images/Family in field.jpg?no-inline";
import girl from "@/assets/images/Girl with tomatoes.jpg?no-inline";
import dog from "@/assets/images/Dog by window.jpg?no-inline";
import stoneMartinAerial from "@/assets/images/Aerial Stone Martin2.jpg?no-inline";
import apartmentFront from "@/assets/images/front image.jpg?no-inline";
import sunset from "@/assets/images/Sunset.png?no-inline";
import woodruffAerial from "@/assets/images/DJI_0405.jpg?no-inline";
import woodruffAerial960 from "@/assets/images/optimized/DJI_0405-960.jpg?no-inline";
import woodruffAerial1920 from "@/assets/images/optimized/DJI_0405-1920.jpg?no-inline";
import woodruffAerial2560 from "@/assets/images/optimized/DJI_0405-2560.jpg?no-inline";
import apartmentExterior from "@/assets/images/building ext.jpg?no-inline";
import retailAerial from "@/assets/images/DJI_0175-Pano.jpg?no-inline";
import retailAerial640 from "@/assets/images/optimized/DJI_0175-Pano-640.jpg?no-inline";
import retailAerial1280 from "@/assets/images/optimized/DJI_0175-Pano-1280.jpg?no-inline";
import retailAerial1920 from "@/assets/images/optimized/DJI_0175-Pano-1920.jpg?no-inline";
import stoneMartinPartner from "@/assets/images/DJI_0381.jpg?no-inline";
import stoneMartinPartner960 from "@/assets/images/optimized/DJI_0381-960.jpg?no-inline";
import stoneMartinPartner1920 from "@/assets/images/optimized/DJI_0381-1920.jpg?no-inline";
import stoneMartinPartner2560 from "@/assets/images/optimized/DJI_0381-2560.jpg?no-inline";

export interface SiteImage {
  /** Replacement identifier (stable key — see IMAGE-SOURCES.md). */
  id: string;
  src: string;
  srcSet?: string;
  /** Optional higher-resolution file for enlarged views. */
  fullSrc?: string;
  /** Optional small version for thumbnails (falls back to `src`). */
  thumbSrc?: string;
  alt: string;
  /** Original file or source page. */
  source: string;
  credit: string;
  license: string;
  status: "temporary-stock" | "client-asset";
  /** CSS object-position for cropping, e.g. "50% 70%". */
  focal?: string;
}

function client(
  id: string,
  src: string,
  filename: string,
  alt: string,
  options: Pick<SiteImage, "focal" | "srcSet" | "thumbSrc">,
): SiteImage {
  return {
    id,
    src,
    alt,
    source: "src/assets/images/" + filename,
    credit: "Client-provided photography",
    license: "Client-provided",
    status: "client-asset",
    ...options,
  };
}

const PEXELS_LICENSE = "Pexels License — free to use, attribution not required";
const DEFAULT_WIDTHS = [640, 960, 1280, 1920];

/** Build a temporary Pexels stock entry with responsive sizes. */
function stock(
  id: string,
  pexelsId: number,
  alt: string,
  credit: string,
  sourceSlug: string,
  options: { widths?: number[]; focal?: string; ext?: "jpeg" | "png" } = {},
): SiteImage {
  const widths = options.widths ?? DEFAULT_WIDTHS;
  const url = (w: number) =>
    `https://images.pexels.com/photos/${pexelsId}/pexels-photo-${pexelsId}.${options.ext ?? "jpeg"}?auto=compress&cs=tinysrgb&w=${w}`;
  return {
    id,
    src: url(widths[Math.min(2, widths.length - 1)]),
    thumbSrc: url(360),
    srcSet: widths.map((w) => `${url(w)} ${w}w`).join(", "),
    alt,
    source: `https://www.pexels.com/photo/${sourceSlug}-${pexelsId}/`,
    credit: `${credit} / Pexels`,
    license: PEXELS_LICENSE,
    status: "temporary-stock",
    focal: options.focal,
  };
}

const HERO_WIDTHS = [768, 1280, 1920, 2560];

export const siteImages = {
  /* 01 — Hero slider (max. 3 slides) ------------------------------------ */
  hero: [
    client("hero-01", mgAerial, "MG Aerial.jpg", "Aerial view of houses and curving streets surrounded by woodland", {
      focal: "46% 62%",
      thumbSrc: mgAerial360,
      srcSet: [mgAerial960 + " 960w", mgAerial1920 + " 1920w", mgAerial2560 + " 2560w"].join(", "),
    }),
    client("hero-02", neighborhoodAerial, "DJI_0390.jpg", "Aerial view of rows of houses bordered by roads and woodland", {
      focal: "47% 60%",
      thumbSrc: neighborhoodAerial360,
      srcSet: [neighborhoodAerial960 + " 960w", neighborhoodAerial1920 + " 1920w", neighborhoodAerial2560 + " 2560w"].join(", "),
    }),
    client("hero-03", poolside, "poolside 3.jpg", "Swimming pools and blue umbrellas in front of apartment buildings", {
      focal: "50% 42%",
      thumbSrc: poolside360,
      srcSet: [poolside960 + " 960w", poolside + " 1920w"].join(", "),
    }),
  ],

  /* 03 — Welcome --------------------------------------------------------- */
  welcome: {
    primary: client("welcome-primary", family, "Family in field.jpg", "A family with young children standing and kneeling in a grassy field", { focal: "50% 35%" }),
    tertiary: client("welcome-tertiary", girl, "Girl with tomatoes.jpg", "A girl holding a tomato beside a produce display", { focal: "53% 40%" }),
    secondary: client("welcome-secondary", dog, "Dog by window.jpg", "A dog sitting on a sofa and looking out a window", { focal: "51% 55%" }),
  },

  /* 04 — Vision: GENUINE client master plan ------------------------------ */
  vision: {
    masterplan: {
      id: "vision-masterplan",
      src: masterplanPreview,
      /** Full-resolution original on the client's live site (lightbox only;
          falls back to `src` if unreachable). Re-host at launch. */
      fullSrc: "https://experiencemulberrygrove.com/wp-content/uploads/2021/02/19-09-09-mulberry-grove-zoning-master-plan-scaled.jpg",
      alt: "Conceptual Master Plan for Mulberry Grove, Georgia Highway 315 and Mountain Hill Road, Harris County, Georgia",
      source: "https://experiencemulberrygrove.com/ (“view masterplan” link)",
      credit: "Client asset — Conceptual Master Plan, dated March 12, 2007; revised 9/9/19",
      license: "Client-owned",
      status: "client-asset",
    } satisfies SiteImage,
  },

  /* 05 — Residential ----------------------------------------------------- */
  residential: {
    singleFamily: client("residential-single-family", stoneMartinAerial, "Aerial Stone Martin2.jpg", "Aerial view down a residential street lined with houses and lawns", { focal: "51% 62%" }),
    apartments: client("residential-apartments", apartmentFront, "front image.jpg", "Front of a light gray apartment building with a sidewalk and lawn", { focal: "56% 54%" }),
  },

  /* 07 — Community gallery ---------------------------------------------- */
  community: [
    stock("community-01", 34613233, "Willow trees reflected in a calm lake", "女子 正真", "serene-lakeside-view-with-willow-trees-reflection"),
    stock("community-02", 17957752, "A trail winding through green woodland", "Zachary Caraway", "forest-path", { widths: [480, 720, 960] }),
    stock("community-03", 33769426, "A family walking together on a sunlit path", "Seljan Salimova", "happy-family-walking-on-sunlit-path-at-sunset"),
    stock("community-04", 38809842, "A park lake reflecting green trees under a sunny sky", "Emre Gencer", "serene-park-lake-with-reflective-calm-waters", { widths: [480, 720, 960] }),
    stock("community-05", 14039658, "A paved pathway through a green forest", "Byron Ho Jiapeng", "concrete-pathway-in-the-forest"),
    stock("community-06", 9745205, "A woodland trail in fall color", "Nicole Seidl", "a-pathway-in-the-middle-of-forest", { widths: [480, 720, 960] }),
    stock("community-07", 5502647, "Green trees beside a still pond", "Mike van Schoonderwalt", "green-trees-near-the-placid-lake"),
  ],

  /* 07 — Development Partners: full-screen backgrounds -- */
  partners: {
    woodruff: client("partners-woodruff", woodruffAerial, "DJI_0405.jpg", "Aerial view of houses and a road intersection amid dense woodland", {
      focal: "53% 63%",
      srcSet: [woodruffAerial960 + " 960w", woodruffAerial1920 + " 1920w", woodruffAerial2560 + " 2560w"].join(", "),
    }),
    stoneMartin: client("partners-stone-martin", stoneMartinPartner, "DJI_0381.jpg", "Aerial view of houses, curving streets and a pool beside woodland", {
      focal: "62% 60%",
      srcSet: [stoneMartinPartner960 + " 960w", stoneMartinPartner1920 + " 1920w", stoneMartinPartner2560 + " 2560w"].join(", "),
    }),
    greystone: client("partners-greystone", apartmentExterior, "building ext.jpg", "Light gray apartment buildings beside a sidewalk and green lawn", { focal: "41% 52%" }),
  },

  /* 08 — Gallery: perspective image row (temporary stock, no captions) ----- */
  gallery: [
    stock("gallery-01", 34613233, "Willow trees reflected in a calm lake", "女子 正真", "serene-lakeside-view-with-willow-trees-reflection", { widths: [480, 720, 960] }),
    stock("gallery-02", 17957752, "A trail winding through green woodland", "Zachary Caraway", "forest-path", { widths: [480, 720, 960] }),
    stock("gallery-03", 33769426, "A family walking together on a sunlit path", "Seljan Salimova", "happy-family-walking-on-sunlit-path-at-sunset", { widths: [480, 720, 960] }),
    stock("gallery-04", 38809842, "A park lake reflecting green trees under a sunny sky", "Emre Gencer", "serene-park-lake-with-reflective-calm-waters", { widths: [480, 720, 960] }),
    stock("gallery-05", 14039658, "A paved pathway through a green forest", "Byron Ho Jiapeng", "concrete-pathway-in-the-forest", { widths: [480, 720, 960] }),
    stock("gallery-06", 9745205, "A woodland trail in fall color", "Nicole Seidl", "a-pathway-in-the-middle-of-forest", { widths: [480, 720, 960] }),
    stock("gallery-07", 5502647, "Green trees beside a still pond", "Mike van Schoonderwalt", "green-trees-near-the-placid-lake", { widths: [480, 720, 960] }),
    stock("gallery-08", 17287255, "Aerial view of a lake surrounded by dense forest", "Siarhei Nester", "birds-eye-view-of-lake-in-forest", { widths: [480, 720, 960] }),
    stock("gallery-09", 8764288, "Sunlit trees beside a lake", "Darina Belonogova", "green-trees-beside-a-lake", { widths: [480, 720, 960] }),
  ],

  /* 05 — Community & Location teaser ---- */
  communityTeaser: client("community-teaser", sunset, "Sunset.png", "Pink and orange sunset reflected in water framed by woodland", { focal: "59% 58%" }),

  /* 08 — Retail ------------------------------------- */
  retail: {
    primary: client("retail-primary", retailAerial, "DJI_0175-Pano.jpg", "Aerial view of a cleared construction site beside a road and woodland", {
      focal: "50% 64%",
      srcSet: [retailAerial640 + " 640w", retailAerial1280 + " 1280w", retailAerial1920 + " 1920w"].join(", "),
    }),
  },

  /* 09 — Location: GENUINE client map ----------------------------------- */
  location: {
    map: {
      id: "location-map",
      src: locationMap,
      alt: "Map showing Mulberry Grove at Exit 19 on Interstate 185 near Highway 315, north of Columbus, Georgia",
      source: "https://experiencemulberrygrove.com/wp-content/uploads/2020/08/map-location-mulberry-grove.svg",
      credit: "Client asset — location map from the live Mulberry Grove website",
      license: "Client-owned",
      status: "client-asset",
    } satisfies SiteImage,
  },

  /* 10 — Development image story (concept-only, no captions) ------------ */
  development: [
    stock("development-01", 28186689, "Aerial view of open countryside with fields, woodland and a lake", "Stepan Vrany", "aerial-view-of-a-lake-and-farmland-in-the-middle-of-a-forest"),
    stock("development-02", 20434948, "Aerial view of leveled ground beside a road and forest", "Raju Shrestha", "pile-of-stones-on-a-leveled-area-by-the-road"),
    stock("development-03", 14823595, "Aerial view of a road winding through trees beside a pond", "Pok Rie", "abandoned-industrial-district"),
    stock("development-04", 38060014, "Aerial view of land with roads, ponds and buildings", "Bill F", "aerial-view-of-expansive-farmland-during-daytime"),
    stock("development-05", 11701518, "Aerial view of a residential area and road junction surrounded by greenery", "Daniel Ellis", "an-aerial-photography-of-a-residential-area-near-the-highway"),
  ],

  /* 11 — Final CTA ------------------------------------------------------- */
  finalCTA: {
    background: stock("final-cta", 6020280, "Aerial view of a still pond beside woodland on a misty morning", "Ollie Craig", "small-pond-near-woods-and-grassy-meadow-in-misty-autumn", { widths: HERO_WIDTHS }),
  },
} as const;
