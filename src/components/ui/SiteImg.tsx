import type { ImgHTMLAttributes } from "react";
import type { SiteImage } from "@/data/siteImages";

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "alt"> {
  image: SiteImage;
  /** Decorative usage: empty alt so screen readers skip it. */
  decorative?: boolean;
}

/**
 * Renders an entry from the central image configuration.
 * Lazy by default; pass loading="eager" for above-the-fold imagery.
 */
export function SiteImg({ image, sizes, loading = "lazy", decorative = false, style, ...rest }: Props) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      alt={decorative ? "" : image.alt}
      loading={loading}
      decoding="async"
      draggable={false}
      data-image-id={image.id}
      style={image.focal ? { objectPosition: image.focal, ...style } : style}
      {...rest}
    />
  );
}
