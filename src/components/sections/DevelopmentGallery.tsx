import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Container } from "@/components/ui/Container";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/data/content";
import { siteImages } from "@/data/siteImages";

/**
 * PHASE 2 RESERVED — not rendered on the homepage (refinement pass). Kept for the inner pages.
 *
 * 10 — Development image story.
 * One dominant photograph with partial previews of its neighbours, a counter
 * and a progress line. CONCEPT ONLY for now: temporary aerial stock with no
 * captions, years, milestones or before/after claims. When the client's real
 * aerial sequence and verified chronology arrive, replace
 * `siteImages.development` (captions can then be added to the config).
 */
export function DevelopmentGallery() {
  const { development } = content;
  const items = siteImages.development.map((image) => ({ image }));

  return (
    <section className="mg-section bg-paper" aria-labelledby="development-heading">
      <Container>
        <SectionHeading id="development-heading" className="text-navy">
          {development.heading}
        </SectionHeading>
      </Container>

      <AnimatedReveal className="mt-10 lg:mt-16">
        <ImageGallery variant="spotlight" items={items} label={development.heading} sizes="(min-width: 768px) 72vw, 84vw" />
      </AnimatedReveal>
    </section>
  );
}
