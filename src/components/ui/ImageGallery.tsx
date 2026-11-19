import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { content } from "@/data/content";
import type { SiteImage } from "@/data/siteImages";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";
import { Container } from "./Container";
import { ArrowLeft, ArrowRight } from "./Icons";
import { SiteImg } from "./SiteImg";

export interface GalleryItem {
  image: SiteImage;
  shape?: "landscape" | "portrait";
  align?: "start" | "end";
}

interface Props {
  items: readonly GalleryItem[];
  /**
   * editorial — mixed crops, free horizontal exploration.
   * spotlight — one dominant image with partial previews of its neighbours.
   */
  variant: "editorial" | "spotlight";
  /** Accessible name for the gallery. */
  label: string;
  sizes: string;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Horizontal image gallery built on native scrolling, so every input works:
 *  • touch — native swipe (with scroll snapping)
 *  • mouse — drag to explore, or the arrow buttons
 *  • keyboard — focus the track and use ← → Home End, or the arrow buttons
 * No scroll-jacking: vertical page scrolling is never intercepted.
 */
export function ImageGallery({ items, variant, label, sizes, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });
  const frame = useRef(0);
  const settle = useRef<number | undefined>(undefined);
  const reduced = usePrefersReducedMotion();

  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /** scrollLeft that brings item `i` into its resting position. */
  const leftFor = useCallback(
    (i: number) => {
      const track = trackRef.current;
      const el = itemRefs.current[i];
      if (!track || !el) return 0;
      if (variant === "spotlight") return el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2;
      const first = itemRefs.current[0];
      return el.offsetLeft - (first ? first.offsetLeft : 0);
    },
    [variant],
  );

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const left = track.scrollLeft;
    let nearest = 0;
    let best = Infinity;
    itemRefs.current.forEach((_, i) => {
      const distance = Math.abs(leftFor(i) - left);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setActive(nearest);
    setAtStart(left <= 2);
    setAtEnd(left >= max - 2);
    setProgress(variant === "spotlight" ? (nearest + 1) / items.length : max > 0 ? Math.min(1, left / max) : 0);
  }, [items.length, leftFor, variant]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const schedule = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };
    measure();
    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame.current);
      window.clearTimeout(settle.current);
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [measure]);

  const scrollToLeft = (left: number) => trackRef.current?.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });

  const goToIndex = (i: number) => scrollToLeft(leftFor(Math.max(0, Math.min(items.length - 1, i))));

  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    if (variant === "spotlight") goToIndex(active + dir);
    else scrollToLeft(track.scrollLeft + dir * track.clientWidth * 0.62);
  };

  /* ---- Keyboard ---------------------------------------------------------- */
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      scrollToLeft(0);
    } else if (e.key === "End") {
      e.preventDefault();
      const track = trackRef.current;
      if (track) scrollToLeft(track.scrollWidth);
    }
  };

  /* ---- Mouse drag (touch uses native scrolling) -------------------------- */
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { down: true, moved: false, startX: e.clientX, startLeft: track.scrollLeft };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const track = trackRef.current;
    if (!state.down || !track) return;
    const dx = e.clientX - state.startX;
    if (!state.moved && Math.abs(dx) > 4) {
      state.moved = true;
      window.clearTimeout(settle.current);
      rootRef.current?.setAttribute("data-dragging", "");
      track.setPointerCapture(e.pointerId);
    }
    if (state.moved) track.scrollLeft = state.startLeft - dx;
  };

  const onPointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const track = trackRef.current;
    if (!state.down || !track) return;
    state.down = false;
    if (!state.moved) return;
    if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
    const release = () => rootRef.current?.removeAttribute("data-dragging");
    if (variant === "spotlight") {
      // Glide to the nearest image, then hand control back to scroll snapping.
      let nearest = 0;
      let best = Infinity;
      itemRefs.current.forEach((_, i) => {
        const distance = Math.abs(leftFor(i) - track.scrollLeft);
        if (distance < best) {
          best = distance;
          nearest = i;
        }
      });
      track.scrollTo({ left: leftFor(nearest), behavior: reduced ? "auto" : "smooth" });
      settle.current = window.setTimeout(release, 500);
    } else {
      release();
    }
  };

  const shownProgress = variant === "spotlight" ? progress : 0.14 + progress * 0.86;

  return (
    <div ref={rootRef} className={cn("gallery", `gallery--${variant}`, className)}>
      <div
        ref={trackRef}
        className="gallery__track"
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        {items.map((item, i) => (
          <figure
            key={item.image.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={cn("gallery__item", variant === "spotlight" && i === active && "is-active")}
            data-shape={item.shape ?? "landscape"}
            data-align={item.align}
            onClick={() => {
              if (variant === "spotlight" && !drag.current.moved && i !== active) goToIndex(i);
            }}
          >
            <SiteImg image={item.image} sizes={sizes} />
          </figure>
        ))}
      </div>

      <Container className="mt-7 flex items-center gap-5 md:mt-10 md:gap-8">
        {variant === "spotlight" && (
          <p className="shrink-0 font-display text-2xl leading-none text-navy tabular-nums" aria-live="polite">
            <span className="sr-only">{content.a11y.slideOf(active + 1, items.length)}</span>
            <span aria-hidden="true">
              {pad(active + 1)}
              <span className="mx-2 text-ink/35">/</span>
              <span className="text-ink/50">{pad(items.length)}</span>
            </span>
          </p>
        )}
        <div className="gallery__progress flex-1" aria-hidden="true">
          <span style={{ transform: `scaleX(${shownProgress})` }} />
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" className="icon-btn" aria-label={content.a11y.previous} disabled={variant === "spotlight" ? active === 0 : atStart} onClick={() => step(-1)}>
            <ArrowLeft />
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label={content.a11y.next}
            disabled={variant === "spotlight" ? active === items.length - 1 : atEnd}
            onClick={() => step(1)}
          >
            <ArrowRight />
          </button>
        </div>
      </Container>
    </div>
  );
}
