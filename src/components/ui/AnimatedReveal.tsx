import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/utils/cn";

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Stagger delay in seconds. */
  delay?: number;
  children: ReactNode;
}

/** Fade + 28px rise as the element enters the viewport (0.8s, once). */
export function AnimatedReveal({ as = "div", delay = 0, className, style, children, ...rest }: Props) {
  const { ref, inView } = useInView<HTMLElement>();
  const Tag = as as ElementType;
  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={{ ...style, "--reveal-delay": `${delay}s` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
