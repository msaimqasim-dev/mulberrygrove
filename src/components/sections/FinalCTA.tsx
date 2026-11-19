import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { PrimaryLink } from "@/components/ui/PrimaryLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/data/content";
import { siteImages } from "@/data/siteImages";

/**
 * PHASE 2 RESERVED — not rendered on the homepage (refinement pass). Kept for the inner pages.
 *
 * 11 — Final call to action.
 * The approved tagline over a full-width landscape, with three links that use
 * the client's navigation labels.
 */
export function FinalCTA() {
  const { finalCta } = content;

  return (
    <section className="on-dark relative isolate flex min-h-[min(86svh,52rem)] items-center overflow-hidden bg-navy text-white" aria-labelledby="final-cta-heading">
      <ImageReveal image={siteImages.finalCTA.background} sizes="100vw" className="absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/45" />

      <Container className="py-[var(--section-y)] text-center">
        <SectionHeading id="final-cta-heading" size="hero">
          {finalCta.heading}
        </SectionHeading>
        <AnimatedReveal delay={0.3} className="mt-10 lg:mt-14">
          <ul className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {finalCta.links.map((link) => (
              <li key={link.label}>
                <PrimaryLink href={link.href} variant="outline-light" className="min-w-[13.5rem] justify-between">
                  {link.label}
                </PrimaryLink>
              </li>
            ))}
          </ul>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
