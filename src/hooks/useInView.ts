import { useEffect, useRef, useState } from "react";

interface Options {
  /** Shrinks the viewport box so reveals trigger slightly after entering. */
  rootMargin?: string;
  threshold?: number;
  /** Reveal once and stop observing (default). */
  once?: boolean;
}

/**
 * Lightweight IntersectionObserver hook used for all simple scroll reveals.
 * (GSAP is reserved for the hero and the masterplan story.)
 */
export function useInView<T extends Element>({ rootMargin = "0px 0px -12% 0px", threshold = 0.01, once = true }: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, inView };
}
