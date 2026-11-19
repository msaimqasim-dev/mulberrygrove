import type { CSSProperties, ReactNode } from "react";
import type { SiteImage } from "@/data/siteImages";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/utils/cn";
import { SiteImg } from "./SiteImg";

interface Props {
  image: SiteImage;
  sizes: string;
  /** Size / aspect-ratio classes for the frame (the frame reserves space). */
  className?: string;
  /** Edge the mask opens from. */
  from?: "bottom" | "top" | "left" | "right";
  delay?: number;
  eager?: boolean;
  zoomOnHover?: boolean;
  children?: ReactNode;
}

/**
 * Image that is unveiled by a directional mask while settling from a soft zoom.
 * The outer frame keeps its dimensions, so there is no layout shift.
 */
export function ImageReveal({ image, sizes, className, from = "bottom", delay = 0, eager = false, zoomOnHover = false, children }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-from={from}
      className={cn("image-reveal", inView && "is-visible", zoomOnHover && "zoom-on-hover", className)}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      <div className="image-reveal__clip">
        <div className="image-reveal__media">
          <SiteImg image={image} sizes={sizes} loading={eager ? "eager" : "lazy"} />
        </div>
      </div>
      {children}
    </div>
  );
}
