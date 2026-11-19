import { useEffect, useRef } from "react";
import { SiteImg } from "@/components/ui/SiteImg";
import { content } from "@/data/content";
import { siteImages } from "@/data/siteImages";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** How many image slots the row travels while the section crosses the screen. */
const TRAVEL_SLOTS = 4;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
/** How far each end of the ribbon turns away from the viewer. */
const TURN = (100 * Math.PI) / 180;
const DEG = 180 / Math.PI;
const STEPS = 14;

/**
 * 08 — Gallery: a perspective row of images.
 * The row follows a 3D ribbon: it rises out of the distance at the bottom-left,
 * runs flat and straight across the centre, then lifts away into the distance at
 * the top-right. Scrolling moves the images along that ribbon, left to right.
 * The page scrolls normally (nothing is pinned); the row loops out of sight.
 * Photography is temporary stock with no captions. Reduced motion: the ribbon
 * is shown still.
 */
export function GallerySection() {
  const items = siteImages.gallery;
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const count = items.length;
    let raf = 0;
    let current = 0.5;
    let target = 0.5;
    let active = false;

    /** Position every image on the ribbon for a given scroll progress (0–1). */
    const place = (progress: number) => {
      const first = itemRefs.current[0];
      if (!first) return;
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      const slot = first.offsetWidth * 1.1;
      const flat = Math.min(width * 0.1, slot * 0.5); // half-length of the straight middle
      const bend = width * 0.62; // length of ribbon in each curling end
      const rise = Math.min(height * 0.5, width * 0.24); // how far the ends sink (left) and climb (right)
      const shift = (progress - 0.5) * TRAVEL_SLOTS;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        let t = i - (count - 1) / 2 + shift;
        t = ((((t + count / 2) % count) + count) % count) - count / 2; // loop the row
        const along = t * slot; // distance along the ribbon from its centre
        const side = Math.sign(along);
        const distance = Math.abs(along);
        const arc = Math.min(Math.max(0, distance - flat), bend);
        const u = arc / bend; // 0 at the straight part → 1 at the far end

        // Walk along the curve: it turns gently at first, then more (even spacing kept).
        let dx = 0;
        let dz = 0;
        for (let k = 0; k < STEPS; k++) {
          const v = ((k + 0.5) / STEPS) * u;
          dx += Math.cos(TURN * Math.pow(v, 1.5));
          dz += Math.sin(TURN * Math.pow(v, 1.5));
        }
        const x = side * (Math.min(distance, flat) + (dx * arc) / STEPS);
        const z = -(dz * arc) / STEPS;
        const y = -side * rise * Math.pow(u, 1.6); // left end sinks, right end climbs
        const rotateY = side * TURN * Math.pow(u, 1.5) * DEG;
        const rotateZ = -Math.atan((rise * 1.6 * Math.pow(u, 0.6)) / bend) * DEG;
        const opacity = u > 0.8 ? Math.max(0, 1 - (u - 0.8) / 0.2) : 1;
        const e = u;

        el.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg)`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(100 - Math.round(e * 100));
      });
    };

    const readTarget = () => {
      const rect = stage.getBoundingClientRect();
      const viewport = window.innerHeight;
      return clamp01((viewport - rect.top) / (viewport + rect.height));
    };

    const tick = () => {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.0004) current = target;
      place(current);
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!active) return;
      target = readTarget();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      target = reduced ? 0.5 : readTarget();
      current = target;
      place(current);
    };

    onResize();
    window.addEventListener("resize", onResize);
    if (reduced) return () => window.removeEventListener("resize", onResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) onScroll();
      },
      { rootMargin: "25% 0px" },
    );
    observer.observe(stage);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [items.length, reduced]);

  return (
    <section className="bg-paper" aria-label={content.a11y.gallery}>
      <div ref={stageRef} className="ribbon">
        {items.map((image, i) => (
          <figure
            key={image.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="ribbon__item"
          >
            <SiteImg image={image} sizes="(min-width: 1024px) 20vw, 44vw" />
          </figure>
        ))}
      </div>
    </section>
  );
}
