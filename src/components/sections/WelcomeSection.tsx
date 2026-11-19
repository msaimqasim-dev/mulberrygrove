import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/data/content";
import { siteImages } from "@/data/siteImages";

/**
 * 02 — Gather Together.
 * Three-image composition: one tall photograph set lower on the left, a small
 * one above a larger one on the right. Each uses the site's image reveal
 * (directional mask + settling zoom), opening from a different edge in sequence.
 * The approved paragraph is typeset in three tiers and reads exactly as supplied.
 */
export function WelcomeSection() {
  const { welcome } = content;
  const images = siteImages.welcome;

  return (
    <section className="mg-section bg-white" aria-labelledby="welcome-heading">
      <Container>
        <div className="grid items-center gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:pr-4">
            <SectionHeading id="welcome-heading" className="text-navy">
              {welcome.heading}
            </SectionHeading>
            <AnimatedReveal delay={0.15} className="mt-8 max-w-[35rem] lg:mt-10">
              <p className="lead text-ink">{welcome.lead}</p>
            </AnimatedReveal>
            <AnimatedReveal delay={0.25} className="mt-6 max-w-[33rem]">
              <p className="body-lg text-ink/75">{welcome.body}</p>
            </AnimatedReveal>
            <AnimatedReveal delay={0.35} className="mt-8 flex items-center gap-5">
              <span aria-hidden="true" className="h-px w-12 shrink-0 bg-gold" />
              <p className="font-display text-[clamp(1.375rem,1.8vw,1.625rem)] italic leading-tight text-navy">{welcome.closing}</p>
            </AnimatedReveal>
          </div>

          <div className="trio lg:col-span-7">
            <ImageReveal image={images.primary} sizes="(min-width: 1024px) 25vw, 44vw" from="bottom" className="trio__a" />
            <div className="trio__col">
              <ImageReveal image={images.tertiary} sizes="(min-width: 1024px) 19vw, 34vw" from="left" delay={0.2} className="trio__b" />
              <ImageReveal image={images.secondary} sizes="(min-width: 1024px) 27vw, 48vw" from="top" delay={0.4} className="trio__c" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
