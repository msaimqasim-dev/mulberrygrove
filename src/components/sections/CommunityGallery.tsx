import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Container } from "@/components/ui/Container";
import { ImageGallery, type GalleryItem } from "@/components/ui/ImageGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/data/content";
import { siteImages } from "@/data/siteImages";

/** Editorial rhythm: alternating landscape / portrait crops, staggered top & bottom. */
const LAYOUT: Pick<GalleryItem, "shape" | "align">[] = [
  { shape: "landscape" },
  { shape: "portrait", align: "end" },
  { shape: "landscape" },
  { shape: "portrait", align: "start" },
  { shape: "landscape" },
  { shape: "portrait", align: "end" },
  { shape: "landscape" },
];

/**
 * PHASE 2 RESERVED — not rendered on the homepage (refinement pass): the second
 * horizontal photo carousel was removed. Kept for the Community page.
 *
 * 07 — Community / lifestyle.
 * Copy is limited to approved excerpts; photography is temporary and
 * illustrative (no amenity claims, no captions).
 */
export function CommunityGallery() {
  const { community } = content;
  const items: GalleryItem[] = siteImages.community.map((image, i) => ({ image, ...LAYOUT[i % LAYOUT.length] }));

  return (
    <section id="community" className="mg-section bg-paper" aria-labelledby="community-heading">
      <Container>
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <SectionHeading id="community-heading" className="text-navy lg:col-span-5">
            {community.heading}
          </SectionHeading>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
            <AnimatedReveal delay={0.15}>
              <p className="lead text-ink">{community.lead}</p>
            </AnimatedReveal>
            <AnimatedReveal delay={0.25} className="mt-5">
              <p className="body-lg max-w-[34rem] text-ink/75">{community.body}</p>
            </AnimatedReveal>
          </div>
        </div>
      </Container>

      <AnimatedReveal className="mt-12 lg:mt-20">
        <ImageGallery variant="editorial" items={items} label={community.heading} sizes="(min-width: 1024px) 52vw, 82vw" />
      </AnimatedReveal>
    </section>
  );
}
