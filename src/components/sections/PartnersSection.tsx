import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { PrimaryLink } from "@/components/ui/PrimaryLink";
import { SiteImg } from "@/components/ui/SiteImg";
import { content } from "@/data/content";
import { siteImages } from "@/data/siteImages";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";

// Let the image wipe and its card settle before starting a queued transition.
const TRANSITION_MS = 1350;
const SWITCH_HYSTERESIS = 0.015;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * 07 — Development Partners: who does what.
 * A full-screen image stays pinned while the page scrolls. Each company has
 * one state: its image and card change together. Native scrolling remains in
 * control; rapid changes are queued until the current reveal has finished.
 * Reduced motion: no pinning — three plain panels instead.
 */
export function PartnersSection() {
  const reduced = usePrefersReducedMotion();
  return reduced ? <PartnersStatic /> : <PartnersPinned />;
}

function PartnersPinned() {
  const { partners } = content;
  const wrapRef = useRef<HTMLElement>(null);
  const activeRef = useRef(-1);
  const targetRef = useRef(-1);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    let transitionTimer = 0;

    const applyTarget = () => {
      if (transitionTimer || targetRef.current === activeRef.current) return;
      activeRef.current = targetRef.current;
      setActive(targetRef.current);
      transitionTimer = window.setTimeout(() => {
        transitionTimer = 0;
        applyTarget();
      }, TRANSITION_MS);
    };

    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const stage = wrap.querySelector<HTMLElement>(".partners__stage");
      const distance = Math.max(1, wrap.offsetHeight - (stage?.offsetHeight ?? window.innerHeight));
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      let next = rect.top > window.innerHeight * 0.85 ? -1 : Math.min(partners.items.length - 1, Math.floor(progress * partners.items.length));

      // A small buffer prevents flickering when scroll position hovers at a boundary.
      const currentTarget = targetRef.current;
      if (next >= 0 && currentTarget >= 0) {
        if (next > currentTarget && progress < (currentTarget + 1) / partners.items.length + SWITCH_HYSTERESIS) next = currentTarget;
        if (next < currentTarget && progress > currentTarget / partners.items.length - SWITCH_HYSTERESIS) next = currentTarget;
      }
      targetRef.current = next;
      applyTarget();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(transitionTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [partners.items.length]);

  /** Move the native scroll position to the selected partner's scene. */
  const jumpTo = useCallback((i: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const stage = wrap.querySelector<HTMLElement>(".partners__stage");
    const distance = Math.max(1, wrap.offsetHeight - (stage?.offsetHeight ?? window.innerHeight));
    const top = wrap.getBoundingClientRect().top + window.scrollY + ((i + 0.5) / partners.items.length) * distance;
    window.scrollTo({ top, behavior: "instant" });
  }, [partners.items.length]);

  const imageIndex = Math.max(0, active);

  return (
    <section ref={wrapRef} className="partners on-dark" aria-labelledby="partners-heading">
      <h2 id="partners-heading" className="sr-only">
        {partners.srHeading}
      </h2>

      <div className="partners__stage">
        {partners.items.map((item, i) => (
          <div key={item.name} className={cn("partners__bg", i <= imageIndex && "is-on")} style={{ zIndex: i }}>
            <SiteImg image={siteImages.partners[item.imageKey]} sizes="100vw" decorative />
          </div>
        ))}
        <div aria-hidden="true" className="partners__shade" />

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {active >= 0 ? `${partners.items[active].name}. ${partners.items[active].role}` : ""}
        </p>

        <Container className="relative z-10 h-full">
          <div className="partners__index">
            {partners.items.map((item, i) => (
              <button key={item.name} type="button" aria-label={item.name} aria-current={i === imageIndex ? "true" : undefined} onClick={() => jumpTo(i)}>
                {pad(i + 1)}
              </button>
            ))}
          </div>

          <ol>
            {partners.items.map((item, i) => (
              <li
                key={item.name}
                className={cn("partners__card", active === i && "is-active")}
                aria-hidden={active !== i}
                inert={active !== i}
              >
                <p className="eyebrow text-navy">
                  <span aria-hidden="true" className="mr-3 text-ink/45">
                    {pad(i + 1)} / {pad(partners.items.length)}
                  </span>
                  {item.category}
                </p>
                <h3 className="display-md mt-4 text-navy">{item.name}</h3>
                <p className="mt-4 text-base leading-relaxed text-ink/80">{item.role}</p>
                <div className="mt-5">
                  <PrimaryLink href={item.href} external srSuffix={item.name} className="text-navy">
                    {partners.linkLabel}
                  </PrimaryLink>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </section>
  );
}

/** Reduced-motion version: three plain panels, no pinning. */
function PartnersStatic() {
  const { partners } = content;
  return (
    <section className="mg-section bg-cool/45" aria-labelledby="partners-heading">
      <Container>
        <h2 id="partners-heading" className="sr-only">
          {partners.srHeading}
        </h2>
        <ul className="grid gap-y-12 md:grid-cols-3 md:gap-x-8 lg:gap-x-14">
          {partners.items.map((item) => (
            <li key={item.name} className="group relative flex flex-col border-t border-navy pt-7">
              <p className="eyebrow text-navy">{item.category}</p>
              <h3 className="display-md mt-5 text-navy">{item.name}</h3>
              <p className="mt-5 max-w-[23rem] text-base leading-relaxed text-ink/80">{item.role}</p>
              <div className="mt-auto pt-8">
                <PrimaryLink href={item.href} external stretched srSuffix={item.name} className="text-navy">
                  {partners.linkLabel}
                </PrimaryLink>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
