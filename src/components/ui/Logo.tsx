import { useEffect, useRef } from "react";
import logoSvg from "@/assets/brand/mulberry-grove-logo.svg?raw";
import { content } from "@/data/content";
import { cn } from "@/utils/cn";

/**
 * ORIGINAL Mulberry Grove logo lockup (tree symbol + wordmark), taken
 * unmodified from the client's live website. The artwork paths are never
 * redrawn or re-typed; only the fill colour follows `currentColor` so the same
 * artwork can appear in white (over imagery / navy) or brand navy (on light).
 *
 * Size with the `--logo-h` CSS variable; proportions are locked at 403:285.
 *
 * `animated` — entrance for the large footer logo. The original shapes simply
 * arrive in sequence (leaves outward from the trunk, then the wordmark left to
 * right) and end exactly as drawn. It plays when an ancestor has `.is-shown`.
 */
const markup = logoSvg
  .replace('<g fill="#fff">', '<g fill="currentColor">')
  .replace("<svg ", '<svg aria-hidden="true" focusable="false" ');

/** Stable object: React must not re-insert the SVG on re-render (that would drop the animation state). */
const HTML = { __html: markup };

interface Props {
  className?: string;
  animated?: boolean;
}

export function Logo({ className, animated = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!animated) return;
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;
    // Trunk base of the tree symbol within the 403 × 285 artwork.
    const baseX = 201.5;
    const baseY = 162;
    svg.querySelectorAll<SVGPathElement>("path").forEach((path) => {
      const box = path.getBBox();
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      const isLeaf = cy < 180;
      const delay = isLeaf ? Math.hypot(cx - baseX, cy - baseY) * 5 : 700 + (cy < 240 ? 0 : 170) + (cx / 403) * 380;
      path.classList.add(isLeaf ? "is-leaf" : "is-letter");
      path.style.setProperty("--ld", `${Math.round(delay)}ms`);
    });
  }, [animated]);

  return (
    <span
      ref={ref}
      role="img"
      aria-label={content.brand.name}
      className={cn("mg-logo", animated && "mg-logo--anim", className)}
      dangerouslySetInnerHTML={HTML}
    />
  );
}
