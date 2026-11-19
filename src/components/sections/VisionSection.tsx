import { useState, type CSSProperties } from "react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { ExpandIcon } from "@/components/ui/Icons";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { PrimaryLink } from "@/components/ui/PrimaryLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/data/content";
import { siteImages } from "@/data/siteImages";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/utils/cn";

/**
 * 03 — Masterplan ("Peace of Place.").
 * Compact editorial layout with no scroll pinning: the real client plan as a
 * preview, the approved heading and excerpt, the three approved figures counted
 * once, and an accessible enlarged view. Text comes first on mobile.
 */
export function VisionSection() {
  const { vision } = content;
  const plan = siteImages.vision.masterplan;
  const [open, setOpen] = useState(false);
  const stats = useInView<HTMLDListElement>({ threshold: 0.3 });

  return (
    <section id="vision" className="mg-section bg-paper" aria-labelledby="vision-heading">
      <Container>
        <div id="masterplan" className="grid items-center gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          {/* Plan preview */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <ImageReveal image={plan} sizes="(min-width: 1024px) 26vw, 80vw" className="plan-preview">
              <button
                type="button"
                className="absolute inset-0 z-[2] cursor-zoom-in"
                aria-haspopup="dialog"
                aria-label={`${vision.cta.label} — ${vision.planTitle}`}
                onClick={() => setOpen(true)}
              >
                <span aria-hidden="true" className="absolute right-3 top-3 grid h-11 w-11 place-items-center bg-navy text-white">
                  <ExpandIcon />
                </span>
              </button>
            </ImageReveal>
          </div>

          {/* Copy + figures */}
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <SectionHeading id="vision-heading" className="text-navy">
              {vision.heading}
            </SectionHeading>
            <AnimatedReveal delay={0.15} className="mt-8 max-w-[36rem] lg:mt-10">
              <p className="body-lg text-ink/80">{vision.summary}</p>
            </AnimatedReveal>

            <dl ref={stats.ref} className={cn("rg mt-12 grid grid-cols-3 gap-x-5 lg:mt-14 lg:gap-x-8", stats.inView && "is-visible")}>
              {vision.stats.map((stat, i) => (
                <div key={stat.label} className="relative flex flex-col-reverse gap-4 pt-7" style={{ "--d": `${0.2 + i * 0.12}s` } as CSSProperties}>
                  <span aria-hidden="true" className="rg-line absolute inset-x-0 top-0 h-px bg-navy" />
                  <dt className="rg-rise rg-late text-[0.6875rem] font-medium uppercase leading-snug tracking-[0.16em] text-ink/70 lg:text-xs">
                    {stat.label}
                  </dt>
                  <dd className="rg-rise flex flex-col font-display text-[clamp(2.5rem,4vw,3.75rem)] leading-none text-navy">
                    {stat.prefix && (
                      <span className="mb-2 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ink/70">{stat.prefix}</span>
                    )}
                    <CountUp value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>

            <AnimatedReveal delay={0.5} className="mt-12">
              <PrimaryLink variant="navy" onClick={() => setOpen(true)}>
                {vision.cta.label}
              </PrimaryLink>
            </AnimatedReveal>
          </div>
        </div>
      </Container>

      <Lightbox open={open} onClose={() => setOpen(false)} image={plan} label={vision.planTitle} />
    </section>
  );
}
