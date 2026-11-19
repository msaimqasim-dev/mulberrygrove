import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/utils/cn";

interface Props {
  as?: "h2" | "h3";
  id?: string;
  size?: "section" | "hero";
  delay?: number;
  className?: string;
  children: ReactNode;
}

/** Large editorial heading that rises from behind a mask when scrolled into view. */
export function SectionHeading({ as: Tag = "h2", id, size = "section", delay = 0, className, children }: Props) {
  const { ref, inView } = useInView<HTMLHeadingElement>();
  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(size === "hero" ? "display-hero" : "display-section", "reveal-mask", inView && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      <span className="reveal-mask__inner">{children}</span>
    </Tag>
  );
}
