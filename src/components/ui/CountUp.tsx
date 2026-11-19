import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Props {
  value: number;
  /** Seconds. */
  duration?: number;
}

const format = (n: number) => n.toLocaleString("en-US");

/**
 * Counts up to an approved figure once, when first seen.
 * The final value reserves its width (no layout shift) and is what assistive
 * technology reads; reduced-motion users see the final value immediately.
 */
export function CountUp({ value, duration = 1.6 }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>({ rootMargin: "0px 0px -8% 0px", threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className="relative inline-block">
      <span className="sr-only">{format(value)}</span>
      <span aria-hidden="true" className="invisible">
        {format(value)}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {format(reduced ? value : display)}
      </span>
    </span>
  );
}
