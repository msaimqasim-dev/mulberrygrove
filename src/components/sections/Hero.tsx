import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { PrimaryLink } from "@/components/ui/PrimaryLink";
import { SiteImg } from "@/components/ui/SiteImg";
import { content } from "@/data/content";
import { siteImages } from "@/data/siteImages";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";

/** Calm autoplay interval (seconds). */
const AUTOPLAY_SECONDS = 9;

/**
 * 01 — Full-viewport cinematic hero.
 *
 * Three thumbnails sit bottom-right. Changing slide makes the chosen thumbnail
 * grow into the full-screen image: the new slide starts clipped to the
 * thumbnail's exact rectangle and scaled to match it, then opens to fill the
 * screen while the outgoing image eases forward.
 *
 * Controls: thumbnails, touch swipe, and the left/right arrow keys. Each
 * thumbnail carries the autoplay progress bar. Selecting a thumbnail or focusing
 * the hero stops autoplay; it also pauses off-screen and in background tabs.
 */
export function Hero() {
  const slides = siteImages.hero;
  const { hero } = content;

  const rootRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressTween = useRef<gsap.core.Tween | null>(null);
  const indexRef = useRef(0);
  const busyRef = useRef(false);
  const pendingSlideRef = useRef<{ target: number; direction: 1 | -1 } | null>(null);
  const pausedRef = useRef(false);
  const onScreenRef = useRef(true);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const goToRef = useRef<(target: number, dir: 1 | -1) => void>(() => {});

  const reduced = usePrefersReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loadRest, setLoadRest] = useState(false);

  const shouldRun = () => !pausedRef.current && onScreenRef.current && !document.hidden;

  const syncPlayState = useCallback(() => {
    const tween = progressTween.current;
    if (!tween) return;
    if (shouldRun()) tween.play();
    else tween.pause();
  }, []);

  /** (Re)starts the autoplay countdown shown on the active thumbnail. */
  const startProgress = useCallback(() => {
    progressTween.current?.kill();
    progressTween.current = null;
    barRefs.current.forEach((bar) => bar && gsap.set(bar, { scaleX: 0 }));
    const bar = barRefs.current[indexRef.current];
    if (!bar) return;
    if (reducedRef.current || pausedRef.current) {
      gsap.set(bar, { scaleX: 1 });
      return;
    }
    progressTween.current = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: AUTOPLAY_SECONDS,
        ease: "none",
        paused: !shouldRun(),
        onComplete: () => goToRef.current(indexRef.current + 1, 1),
      },
    );
  }, []);

  const goTo = useCallback(
    (target: number, dir: 1 | -1) => {
      const root = rootRef.current;
      const count = slides.length;
      const to = ((target % count) + count) % count;
      const from = indexRef.current;
      if (!root) return;
      if (busyRef.current) {
        pendingSlideRef.current = to === from ? null : { target: to, direction: dir };
        return;
      }
      if (to === from) return;
      const fromEl = slideRefs.current[from];
      const toEl = slideRefs.current[to];
      if (!fromEl || !toEl) return;

      indexRef.current = to;
      setIndex(to);
      setLoadRest(true);

      if (reducedRef.current) {
        gsap.set(fromEl, { autoAlpha: 0, zIndex: 0 });
        gsap.set(toEl, { autoAlpha: 1, zIndex: 1, clipPath: "none" });
        startProgress();
        return;
      }

      const fromImg = fromEl.querySelector("img");
      const toImg = toEl.querySelector("img");
      const box = root.getBoundingClientRect();
      const thumb = thumbRefs.current[to]?.getBoundingClientRect();
      busyRef.current = true;

      const timeline = gsap.timeline({
        defaults: { duration: 1.5, ease: "expo.inOut" },
        onComplete: () => {
          gsap.set(fromEl, { autoAlpha: 0, zIndex: 0 });
          if (fromImg) gsap.set(fromImg, { scale: 1, xPercent: 0 });
          gsap.set(toEl, { zIndex: 1, clipPath: "none" });
          busyRef.current = false;
          const pending = pendingSlideRef.current;
          pendingSlideRef.current = null;
          if (pending) goToRef.current(pending.target, pending.direction);
        },
      });

      if (thumb && thumb.width > 0) {
        // Grow the thumbnail into the full-screen image.
        const start = `inset(${thumb.top - box.top}px ${box.right - thumb.right}px ${box.bottom - thumb.bottom}px ${thumb.left - box.left}px)`;
        timeline.set(toEl, { autoAlpha: 1, zIndex: 2, clipPath: start }).to(toEl, { clipPath: "inset(0px 0px 0px 0px)" }, 0);
        if (toImg) {
          timeline.fromTo(
            toImg,
            {
              x: thumb.left + thumb.width / 2 - (box.left + box.width / 2),
              y: thumb.top + thumb.height / 2 - (box.top + box.height / 2),
              scale: Math.max(thumb.width / box.width, thumb.height / box.height),
              xPercent: 0,
            },
            { x: 0, y: 0, scale: 1 },
            0,
          );
        }
      } else {
        // Fallback: directional wipe.
        const hidden = dir === 1 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)";
        timeline.set(toEl, { autoAlpha: 1, zIndex: 2, clipPath: hidden }).to(toEl, { clipPath: "inset(0% 0% 0% 0%)" }, 0);
        if (toImg) timeline.fromTo(toImg, { scale: 1.18, x: 0, y: 0 }, { scale: 1 }, 0);
      }
      if (fromImg) timeline.to(fromImg, { scale: 1.1, ease: "power2.inOut" }, 0);

      startProgress();
    },
    [slides.length, startProgress],
  );
  goToRef.current = goTo;

  const next = () => goTo(indexRef.current + 1, 1);
  const previous = () => goTo(indexRef.current - 1, -1);

  // A thumbnail doubles as a stop control, so autoplay remains user-controllable
  // without introducing a separate button in the hero.
  const stopAutoplay = useCallback(() => {
    if (pausedRef.current) return;
    pausedRef.current = true;
    setPaused(true);
    progressTween.current?.kill();
    progressTween.current = null;
    barRefs.current.forEach((bar, i) => bar && gsap.set(bar, { scaleX: i === indexRef.current ? 1 : 0 }));
  }, []);

  /* ---- Intro sequence ---------------------------------------------------- */
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let mediaStarted = false;
    let fallback = 0;

    const ctx = gsap.context(() => {
      slideRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 });
      });
      if (reduced) return;
      gsap.set("[data-hero-media]", { autoAlpha: 0, scale: 1.06 });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo("[data-hero-rule]", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.out" }, 0.1)
        .fromTo("[data-hero-line]", { yPercent: 112, skewY: 4 }, { yPercent: 0, skewY: 0, duration: 1.2, stagger: 0.14, ease: "expo.out" }, 0.35)
        .fromTo("[data-hero-sub]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.95)
        .fromTo("[data-hero-cta]", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 1.2)
        .fromTo("[data-hero-controls]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 1.3)
        .fromTo("[data-hero-thumb]", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, 1.4);
    }, root);

    // The image reveal waits for the first photograph (never the text).
    const revealMedia = () => {
      if (mediaStarted) return;
      mediaStarted = true;
      window.clearTimeout(fallback);
      setLoadRest(true);
      if (!reduced) {
        ctx.add(() => {
          gsap.to("[data-hero-media]", { autoAlpha: 1, scale: 1, duration: 2, ease: "power2.out" });
        });
      }
      startProgress();
    };

    const firstImg = slideRefs.current[0]?.querySelector("img");
    if (firstImg && firstImg.complete && firstImg.naturalWidth > 0) {
      revealMedia();
    } else {
      firstImg?.addEventListener("load", revealMedia, { once: true });
      fallback = window.setTimeout(revealMedia, 1800);
    }

    return () => {
      window.clearTimeout(fallback);
      firstImg?.removeEventListener("load", revealMedia);
      progressTween.current?.kill();
      progressTween.current = null;
      busyRef.current = false;
      pendingSlideRef.current = null;
      ctx.revert();
    };
  }, [reduced, startProgress]);

  /* ---- Pause autoplay when hidden or scrolled away ------------------------ */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    document.addEventListener("visibilitychange", syncPlayState);
    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          onScreenRef.current = entry.isIntersecting;
          syncPlayState();
        },
        { threshold: 0.25 },
      );
      observer.observe(root);
    }
    return () => {
      document.removeEventListener("visibilitychange", syncPlayState);
      observer?.disconnect();
    };
  }, [syncPlayState]);

  /* ---- Input: keyboard + touch swipe ------------------------------------- */
  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      stopAutoplay();
      if (e.key === "ArrowRight") next();
      else previous();
    }
  };
  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    swipeRef.current = e.pointerType === "mouse" ? null : { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: PointerEvent<HTMLElement>) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      stopAutoplay();
      if (dx < 0) next();
      else previous();
    }
  };

  return (
    <section
      ref={rootRef}
      className="hero on-dark"
      aria-roledescription="carousel"
      aria-labelledby="hero-heading"
      onFocusCapture={stopAutoplay}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (swipeRef.current = null)}
    >
      {/* Slides */}
      <div data-hero-media className="absolute inset-0">
        {slides.map((image, i) => (
          <div
            key={image.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="hero-slide"
            aria-hidden={i !== index}
          >
            {(i === 0 || loadRest) && <SiteImg image={image} sizes="100vw" loading="eager" fetchPriority={i === 0 ? "high" : "low"} />}
          </div>
        ))}
      </div>
      <div className="hero-overlay z-[3]" />

      {/* Copy */}
      <Container className="hero-copy relative z-10 flex h-full flex-col justify-end">
        <span data-hero-rule aria-hidden="true" className="hero-rule" />
        <h1 id="hero-heading" className="display-hero max-w-[16ch]">
          {hero.headlineLines.map((line, i) => (
            <span key={line} className="hero-line-mask">
              <span data-hero-line className="block">
                {line}
                {i < hero.headlineLines.length - 1 ? " " : ""}
              </span>
            </span>
          ))}
        </h1>
        <p data-hero-sub className="hero-sub mt-5 max-w-[60rem] text-white/90 md:mt-7">
          {hero.supportingParts.map((part, i) => (
            <Fragment key={part}>
              {i > 0 && (
                <>
                  {" "}
                  <span className="hero-sub__sep">{hero.supportingSeparator.trim()}</span>{" "}
                </>
              )}
              <span className="whitespace-nowrap">{part}</span>
            </Fragment>
          ))}
        </p>
        <div data-hero-cta className="mt-7 md:mt-9">
          <PrimaryLink href={hero.cta.href} variant="gold">
            {hero.cta.label}
          </PrimaryLink>
        </div>
      </Container>

      {/* Slide thumbnails */}
      <div data-hero-controls className="absolute inset-x-0 bottom-0 z-10">
        <Container>
          <div className="flex items-end justify-end border-t border-white/25 py-4">
            <div>
              <p id="hero-slides-help" className="sr-only">
                {reduced ? content.a11y.heroSlidesHelpReduced : content.a11y.heroSlidesHelp}
              </p>
              <ul className="hero-thumbs" aria-label={content.a11y.heroSlides} aria-describedby="hero-slides-help">
                {slides.map((image, i) => (
                  <li key={image.id} data-hero-thumb>
                    <button
                      ref={(el) => {
                        thumbRefs.current[i] = el;
                      }}
                      type="button"
                      className={cn("hero-thumb", i === index && "is-active")}
                      aria-label={`${content.a11y.slideOf(i + 1, slides.length)}: ${image.alt}`}
                      aria-current={i === index ? "true" : undefined}
                      onClick={() => {
                        stopAutoplay();
                        goTo(i, i > indexRef.current ? 1 : -1);
                      }}
                    >
                      <img src={image.thumbSrc ?? image.src} alt="" loading="eager" decoding="async" draggable={false} />
                      <span className="hero-thumb__bar" aria-hidden="true">
                        <span
                          ref={(el) => {
                            barRefs.current[i] = el;
                          }}
                        />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </Container>
      </div>

      <p className="sr-only" aria-live={paused || reduced ? "polite" : "off"}>
        {content.a11y.slideOf(index + 1, slides.length)}: {slides[index].alt}
      </p>
    </section>
  );
}
