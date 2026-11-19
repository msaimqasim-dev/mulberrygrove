import type { ReactNode } from "react";
import { content } from "@/data/content";
import { cn } from "@/utils/cn";
import { ArrowRight, ArrowUpRight } from "./Icons";

interface Props {
  /** Omit `href` to render a <button>. */
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  /** "text" = underlined label + arrow; others are solid / outlined buttons. */
  variant?: "text" | "gold" | "navy" | "outline-light";
  /** External partner link: opens in a new tab with a secure rel. */
  external?: boolean;
  /** Extra context for screen readers when several links share a label. */
  srSuffix?: string;
  /** Makes the nearest positioned ancestor (e.g. a card) fully clickable. */
  stretched?: boolean;
  className?: string;
}

/** The single call-to-action component used across the site. */
export function PrimaryLink({ href, onClick, children, variant = "text", external = false, srSuffix, stretched = false, className }: Props) {
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const classes = cn(variant === "text" ? "link-arrow" : `btn btn--${variant}`, stretched && "stretched-link", className);

  const inner = (
    <>
      <span className={variant === "text" ? "link-arrow__label" : undefined}>
        {children}
        {srSuffix && <span className="sr-only"> — {srSuffix}</span>}
      </span>
      <Arrow size={18} />
      {external && <span className="sr-only"> {content.a11y.newTab}</span>}
    </>
  );

  if (!href) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {inner}
      </button>
    );
  }

  return (
    <a href={href} className={classes} onClick={onClick} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  );
}
