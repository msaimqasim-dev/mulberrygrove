import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { NavLabel } from "@/components/ui/NavLabel";
import { content } from "@/data/content";
import { anchors, navigation, routes } from "@/data/siteConfig";
import { cn } from "@/utils/cn";

/**
 * Shared site header.
 *  • Transparent over the hero; white with navy logo and text after scrolling.
 *  • The box and the logo keep the same size in every state, so nothing resizes.
 *  • Desktop: inline navigation. Mobile/tablet: full-screen menu that opens and
 *    closes (aria-expanded, Esc, page made inert while open).
 *  • Navigation labels are non-interactive in Phase 1 (see NavLabel).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Colour threshold: the header turns white once the page has moved past 24px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const main = document.getElementById("main");
    const footer = document.getElementById("site-footer");
    document.documentElement.classList.toggle("menu-open", open);
    main?.toggleAttribute("inert", open);
    footer?.toggleAttribute("inert", open);
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  /** The logo returns to Home. On the homepage this scrolls to the top. */
  const goHome = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0 });
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  return (
    <header className={cn("mg-header", scrolled ? "is-scrolled" : "on-dark", open && "is-open on-dark")}>
      <a className="skip-link" href={anchors.main}>
        {content.a11y.skipToContent}
      </a>

      <Container className="flex items-center justify-between gap-8">
        <a href={routes.home} onClick={goHome} aria-label={content.a11y.home} className="mg-logo-link">
          <Logo />
        </a>

        <nav aria-label={content.a11y.primaryNav} className="hidden lg:block">
          <ul className="flex items-center gap-[clamp(1.5rem,2.8vw,2.75rem)]">
            {navigation.map((item) => (
              <li key={item.label}>
                <NavLabel item={item} className={item.emphasised ? "nav-contact" : "nav-link"} />
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={burgerRef}
          type="button"
          className="mg-burger lg:hidden"
          aria-label={content.a11y.menu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </Container>

      <div id="mobile-menu" className="mg-mobile-menu lg:hidden">
        <nav aria-label={content.a11y.primaryNav}>
          <ul className="border-t border-white/20">
            {navigation.map((item, i) => (
              <li key={item.label} className="border-b border-white/20" style={{ "--i": i } as CSSProperties}>
                <NavLabel item={item} className="flex min-h-[4.25rem] items-center py-4 font-display text-[2.125rem] leading-none" />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
