import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ExpandIcon } from "@/components/ui/Icons";
import { Lightbox } from "@/components/ui/Lightbox";
import { SiteImg } from "@/components/ui/SiteImg";
import { content } from "@/data/content";
import { siteImages } from "@/data/siteImages";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/utils/cn";

/**
 * 05 — Community & Location: one combined teaser.
 * A single coordinated editorial reveal: the photograph unmasks from the top,
 * the copy fades in, and the client's own location map rises last.
 * Copy is approved excerpts only; the full paragraphs stay in content.ts.
 */
export function CommunityLocationSection() {
  const { community, location } = content;
  const photo = siteImages.communityTeaser;
  const map = siteImages.location.map;
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "0px 0px -15% 0px" });
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <section id="community" className="mg-section bg-white" aria-label="Community and location">
      <Container>
        <div ref={ref} className={cn("coord grid items-stretch gap-y-14 lg:grid-cols-12 lg:gap-x-8", inView && "is-visible")}>
          {/* Photograph */}
          <div className="lg:col-span-5">
            <div className="coord__mask relative h-full min-h-[22rem] lg:min-h-[30rem]">
              <SiteImg image={photo} sizes="(min-width: 1024px) 40vw, 92vw" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>

          {/* Copy */}
          <div className="coord__text lg:col-span-4 lg:py-1">
            <h2 className="display-md text-navy">{community.heading}</h2>
            <p className="lead mt-5 text-ink">{community.lead}</p>
            <p className="body-lg mt-5 text-ink/75">{community.body}</p>

            <div className="mt-10 border-t border-[var(--rule)] pt-10">
              <h2 className="display-md text-navy">{location.heading}</h2>
              <p className="body-lg mt-5 text-ink/75">{location.summary}</p>
              <ul className="mt-7 grid grid-cols-2 gap-x-6 border-t border-[var(--rule)]">
                {location.facts.map((fact) => (
                  <li key={fact} className="border-b border-[var(--rule)] py-3 font-display text-[1.125rem] leading-snug text-navy">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Client location map (unaltered artwork) */}
          <div className="coord__map lg:col-span-3 lg:self-end">
            <div className="relative aspect-[695/915] w-full border border-[var(--rule)] bg-[#ebebea]">
              <SiteImg image={map} sizes="(min-width: 1024px) 22vw, 90vw" className="absolute inset-0 h-full w-full object-contain" />
              <button
                type="button"
                className="absolute inset-0 z-[2] cursor-zoom-in"
                aria-haspopup="dialog"
                aria-label={`${location.mapTitle} — ${content.a11y.zoom}`}
                onClick={() => setMapOpen(true)}
              >
                <span aria-hidden="true" className="absolute right-3 top-3 grid h-11 w-11 place-items-center bg-navy text-white">
                  <ExpandIcon />
                </span>
              </button>
            </div>
          </div>
        </div>
      </Container>

      <Lightbox open={mapOpen} onClose={() => setMapOpen(false)} image={map} label={location.mapTitle} zoomWidth="min(1390px, 220vw)" />
    </section>
  );
}
