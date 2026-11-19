import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/** Centred content column: max 1320px + responsive gutters (see --gutter). */
export function Container({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mg-container", className)} {...rest}>
      {children}
    </div>
  );
}
