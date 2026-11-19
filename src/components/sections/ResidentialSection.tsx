import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Container } from "@/components/ui/Container";
import { ArrowUpRight } from "@/components/ui/Icons";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { PrimaryLink } from "@/components/ui/PrimaryLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/data/content";
import { siteImages } from "@/data/siteImages";

/**
 * 04 — Come Home. (Residential)
 * Two cards, each attributed to its own company:
 * Single-Family Homes → Stone Martin Builders, Apartment Homes → Greystone Properties.
 *
 * Desktop with a mouse: both cards share the row equally. Hovering (or focusing)
 * one widens it and reveals its description and link; the other narrows.
 * Touch devices and small screens: cards keep equal size and the description is
 * always shown, so nothing depends on hover.
 */
export function ResidentialSection() {
  const { residential } = content;

  return (
    <section id="residential" className="mg-section bg-white" aria-labelledby="residential-heading">
      <Container>
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <SectionHeading id="residential-heading" className="text-navy lg:col-span-5">
            {residential.heading}
          </SectionHeading>
          <AnimatedReveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <p className="body-lg text-ink/75">{residential.intro}</p>
          </AnimatedReveal>
        </div>

        <div className="res-row mt-12 lg:mt-16">
          {residential.cards.map((card, i) => (
            <article key={card.id} id={card.id} className="res-card" aria-labelledby={`${card.id}-title`}>
              <ImageReveal
                image={siteImages.residential[card.imageKey]}
                sizes="(min-width: 1024px) 60vw, 92vw"
                from={i === 0 ? "left" : "right"}
                delay={i * 0.18}
                zoomOnHover
                className="res-card__frame"
              >
                <div className="res-card__shade" />
                <span aria-hidden="true" className="res-card__chip absolute right-5 top-5 z-[1] grid h-12 w-12 place-items-center bg-white text-navy md:right-6 md:top-6">
                  <ArrowUpRight />
                </span>

                <div className="res-card__content">
                  <p className="eyebrow whitespace-nowrap text-gold">{card.company}</p>
                  <h3 id={`${card.id}-title`} className="res-card__title">
                    {card.title}
                  </h3>
                  <div className="res-card__more">
                    <div className="res-card__more-inner">
                      <p className="res-card__desc">{card.description}</p>
                      <div className="mt-3">
                        <PrimaryLink href={card.cta.href} external stretched srSuffix={`${card.title}, ${card.company}`} className="text-white">
                          {card.cta.label}
                        </PrimaryLink>
                      </div>
                    </div>
                  </div>
                </div>
              </ImageReveal>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
