import { useState } from "react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Container } from "@/components/ui/Container";
import { ExpandIcon } from "@/components/ui/Icons";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/data/content";
import { siteImages } from "@/data/siteImages";

/**
 * PHASE 2 RESERVED — not rendered on the homepage (refinement pass). The homepage uses
 * CommunityLocationSection. Kept for the Location content in the inner pages.
 *
 * 09 — Location ("Idyllically Located.").
 * Uses the client's own location map (vector, unaltered). The only addition
 * is a soft pulse over the map's existing Exit 19 marker. Drive-time tables
 * are intentionally omitted pending verification.
 */
export function LocationSection() {
  const { location } = content;
  const map = siteImages.location.map;
  const [open, setOpen] = useState(false);

  return (
    <section id="location" className="mg-section bg-white" aria-labelledby="location-heading">
      <Container>
        <div className="grid items-start gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6 lg:pt-[clamp(0rem,3vw,3.5rem)]">
            <SectionHeading id="location-heading" className="text-navy">
              {location.heading}
            </SectionHeading>
            <AnimatedReveal delay={0.15} className="mt-8 max-w-[35rem] lg:mt-12">
              <p className="body-lg text-ink/75">{location.body}</p>
            </AnimatedReveal>
            <AnimatedReveal as="ul" delay={0.25} className="mt-10 grid max-w-[35rem] border-t border-[var(--rule)] sm:grid-cols-2 sm:gap-x-8">
              {location.facts.map((fact) => (
                <li key={fact} className="border-b border-[var(--rule)] py-4 font-display text-[1.375rem] leading-snug text-navy">
                  {fact}
                </li>
              ))}
            </AnimatedReveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <ImageReveal image={map} sizes="(min-width: 1024px) 38vw, 92vw" from="top" className="aspect-[695/915] w-full border border-[var(--rule)] bg-[#ebebea]">
              <span aria-hidden="true" className="map-pulse" />
              <button
                type="button"
                className="absolute inset-0 z-[2] cursor-zoom-in"
                aria-haspopup="dialog"
                aria-label={`${location.mapTitle} — ${content.a11y.zoom}`}
                onClick={() => setOpen(true)}
              >
                <span aria-hidden="true" className="absolute right-3 top-3 grid h-11 w-11 place-items-center bg-navy text-white">
                  <ExpandIcon />
                </span>
              </button>
            </ImageReveal>
          </div>
        </div>
      </Container>

      <Lightbox open={open} onClose={() => setOpen(false)} image={map} label={location.mapTitle} zoomWidth="min(1390px, 220vw)" />
    </section>
  );
}
