import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { NavLabel } from "@/components/ui/NavLabel";
import { content } from "@/data/content";
import { contact, copyright, navigation, partners } from "@/data/siteConfig";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";

/** Link row: 44px touch target on phones/tablets, tighter on desktop. */
const ROW = "inline-flex min-h-11 items-center lg:min-h-8";

function WebsiteLink({ href, company }: { href: string; company: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(ROW, "gap-2 text-sm uppercase tracking-[0.16em] text-white")}>
      <span className="text-link pb-1">
        {content.footer.websiteLabel}
        <span className="sr-only"> — {company}</span>
      </span>
      <ArrowUpRight size={16} className="text-gold" />
      <span className="sr-only"> {content.a11y.newTab}</span>
    </a>
  );
}

/**
 * Shared site footer.
 *
 * REVEAL — when the footer fits in the window below the header, it stays fixed
 * to the bottom of the screen underneath the page; the last section slides up
 * and uncovers it. If it does not fit (phones, short windows) or reduced motion
 * is requested, it is an ordinary footer, so nothing can be hidden.
 *
 * The footer is uncovered from the bottom up, so each part animates as the edge
 * of the page passes it: the contact column fades in, the light panel opens and
 * the large original logo arrives leaf by leaf, then the rule draws and the
 * tagline rises.
 *
 * Contact details come from `contact` in src/data/siteConfig.ts (live site).
 * Navigation labels are non-interactive in Phase 1.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const footer = ref.current;
    const main = document.getElementById("main");
    if (!footer || !main) return;
    let raf = 0;

    const measure = () => {
      raf = 0;
      const viewport = window.innerHeight;
      const header = document.querySelector<HTMLElement>(".mg-header")?.offsetHeight ?? 0;
      setReveal(!reduced && footer.offsetHeight <= viewport - header + 1);

      const edge = main.getBoundingClientRect().bottom; // bottom edge of the page above
      footer.querySelectorAll<HTMLElement>("[data-fr]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const line = rect.top + Math.min(rect.height * 0.4, 140);
        if (line < viewport && edge < line) el.classList.add("is-shown");
        else if (edge > rect.bottom + 40) el.classList.remove("is-shown"); // covered again: replay next time
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : undefined;
    observer?.observe(footer);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
    };
  }, [reduced]);

  /** Keyboard: a focused footer link must never sit hidden under the page. */
  const bringIntoView = () => {
    const main = document.getElementById("main");
    const header = document.querySelector<HTMLElement>(".mg-header")?.offsetHeight ?? 0;
    if (reveal && main && main.getBoundingClientRect().bottom > header + 1) {
      window.scrollTo({ top: document.documentElement.scrollHeight });
    }
  };

  const year = new Date().getFullYear();
  const residential = [
    { label: content.footer.singleFamilyLabel, name: partners.stoneMartin.name, href: partners.stoneMartin.mulberryGroveUrl },
    { label: content.footer.apartmentLabel, name: partners.greystone.name, href: partners.greystone.mulberryGroveUrl },
  ];

  return (
    <footer id="site-footer" ref={ref} className={cn("mg-footer on-dark bg-navy text-white", reveal && "is-reveal")} onFocus={bringIntoView}>
      <Container className="mg-footer__inner">
        {/* Tagline */}
        <p data-fr className="mg-footer__tagline">
          <span>{content.brand.tagline}</span>
        </p>
        <div data-fr aria-hidden="true" className="mg-footer__rule mt-4 lg:mt-5" />

        <div className="mg-footer__grid mt-8 grid gap-y-10 lg:mt-7 lg:grid-cols-12 lg:gap-x-8">
          {/* Light panel: large original logo + navigation labels (upper left) */}
          <div data-fr className="mg-footer__panel order-first flex flex-col lg:order-first lg:col-span-5">
            <div className="grid flex-1 place-items-center px-8 py-10 lg:py-5">
              <Logo animated className="[--logo-h:clamp(7rem,min(15vw,24vh),13.5rem)]" />
            </div>
            <nav aria-label={content.a11y.footerNav} className="border-t border-navy/15 px-6 py-1.5">
              <ul className="flex flex-wrap items-center gap-x-5 xl:justify-between">
                {navigation.map((item) => (
                  <li key={item.label}>
                    <NavLabel item={item} className="inline-flex min-h-10 items-center text-xs font-medium uppercase tracking-[0.14em] text-navy" />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact + residential partners (top-aligned with the panel) */}
          <div
            data-fr
            className="mg-footer__fade grid gap-y-8 lg:order-last lg:col-span-7 xl:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] xl:gap-x-10"
            style={{ "--d": "0.1s" } as CSSProperties}
          >
            <div>
              <h2 className="eyebrow text-gold">{content.footer.generalLabel}</h2>
              <p className="mt-3 font-display text-[clamp(1.5rem,2vw,1.875rem)] leading-tight">{contact.company}</p>

              <address className="mt-5 grid gap-x-6 gap-y-5 not-italic sm:grid-cols-2">
                {contact.people.map((person) => (
                  <div key={person.email}>
                    <p className="text-base">{person.name}</p>
                    <p className="text-sm text-white/70">{person.title}</p>
                    <p className="mt-1">
                      <a href={person.phoneHref} className={cn(ROW, "text-base")}>
                        <span className="text-link pb-0.5">{person.phoneDisplay}</span>
                      </a>
                    </p>
                    <p>
                      <a href={`mailto:${person.email}`} className={cn(ROW, "break-all text-sm text-white/85")}>
                        <span className="text-link pb-0.5">{person.email}</span>
                      </a>
                    </p>
                  </div>
                ))}
              </address>

              <div className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-1">
                <a href={`mailto:${contact.generalEmail}`} className={cn(ROW, "break-all text-sm text-white/85")}>
                  <span className="text-link pb-0.5">{contact.generalEmail}</span>
                </a>
                <WebsiteLink href={contact.website} company={contact.company} />
              </div>
            </div>

            <div className="grid content-start gap-x-8 gap-y-6 border-t border-white/20 pt-7 sm:grid-cols-2 xl:grid-cols-1 xl:border-l xl:border-t-0 xl:pl-10 xl:pt-0">
              {residential.map((group) => (
                <div key={group.name}>
                  <h2 className="eyebrow text-gold">{group.label}</h2>
                  <p className="mt-3 font-display text-2xl leading-tight">{group.name}</p>
                  <WebsiteLink href={group.href} company={group.name} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 py-4 lg:mt-6">
          <p className="text-[0.8125rem] tracking-[0.04em] text-white/70">
            © {year} {copyright.holder}
          </p>
        </div>
      </Container>
    </footer>
  );
}
