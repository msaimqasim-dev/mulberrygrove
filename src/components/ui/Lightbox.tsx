import { useEffect, useRef, useState, type CSSProperties } from "react";
import { content } from "@/data/content";
import type { SiteImage } from "@/data/siteImages";
import { CloseIcon, ZoomIcon } from "./Icons";

interface Props {
  open: boolean;
  onClose: () => void;
  image: SiteImage;
  /** Accessible name for the dialog. */
  label: string;
  /** CSS width applied to the image when zoomed. */
  zoomWidth?: string;
}

/**
 * Accessible enlarged view built on the native <dialog> element
 * (focus is trapped, Esc closes, the page behind is inert).
 * Loads `image.fullSrc` when available and falls back to `image.src`.
 */
export function Lightbox({ open, onClose, image, label, zoomWidth }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      setZoomed(false);
      setSrc(image.fullSrc ?? image.src);
      if (!dialog.open && typeof dialog.showModal === "function") dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else {
      if (dialog.open) dialog.close();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open, image]);

  return (
    <dialog ref={dialogRef} className="mg-lightbox on-dark" aria-label={label} onClose={onClose}>
      <div className="absolute right-[var(--gutter)] top-4 z-10 flex gap-2">
        <button type="button" className="icon-btn icon-btn--light bg-navy" aria-label={content.a11y.zoom} aria-pressed={zoomed} onClick={() => setZoomed((z) => !z)}>
          <ZoomIcon />
        </button>
        <button type="button" className="icon-btn icon-btn--light bg-navy" aria-label={content.a11y.close} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <div
        className="mg-lightbox__scroller"
        data-zoomed={zoomed}
        style={zoomWidth ? ({ "--zoom-w": zoomWidth } as CSSProperties) : undefined}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {src && (
          <img
            className="mg-lightbox__img"
            src={src}
            alt={image.alt}
            onClick={() => setZoomed((z) => !z)}
            onError={() => {
              if (src !== image.src) setSrc(image.src);
            }}
          />
        )}
      </div>
    </dialog>
  );
}
