import type { CSSProperties } from "react";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/data/content";
import { siteImages } from "@/data/siteImages";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/utils/cn";

/**
 * 06 — Experiences Every Day. (Retail)
 * Compact navy split. The photograph unmasks from the left, then a gold rule
 * draws, the heading rises and the copy follows. No link is shown: the Retail
 * page does not exist yet, and no tenants, leasing terms or completed areas
 * are claimed.
 */
export function RetailSection() {
  const { retail } = content;
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="retail" className="on-dark bg-navy text-white" aria-labelledby="retail-heading">
      <div className="grid lg:grid-cols-2">
        <ImageReveal
          image={siteImages.retail.primary}
          from="left"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/3] lg:aspect-auto lg:min-h-[30rem]"
        />

        <div
          ref={ref}
          className={cn(
            "rg flex flex-col justify-center px-[var(--gutter)] py-16 lg:py-20 lg:pl-[clamp(3rem,6vw,7rem)] lg:pr-[var(--gutter)]",
            inView && "is-visible",
          )}
        >
          <div className="max-w-[34rem]">
            <span aria-hidden="true" className="rg-line block h-px w-16 bg-gold" />
            <SectionHeading id="retail-heading" delay={0.1} className="mt-8 lg:mt-10">
              {retail.heading}
            </SectionHeading>
            <p className="rg-rise body-lg mt-7 text-white/80 lg:mt-8" style={{ "--d": "0.3s" } as CSSProperties}>
              {retail.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
