import { navigationEnabled, type NavItem } from "@/data/siteConfig";
import { cn } from "@/utils/cn";

interface Props {
  item: NavItem;
  className?: string;
}

/**
 * Navigation label shared by Header and Footer.
 *
 * PHASE 1 — renders as plain text with the intended styling. It is not a link,
 * has no href and cannot receive keyboard focus.
 * PHASE 2 — set `navigationEnabled` to true in siteConfig.ts to link each label
 * to its `futureRoute`.
 */
export function NavLabel({ item, className }: Props) {
  if (navigationEnabled) {
    return (
      <a href={item.futureRoute} className={className}>
        {item.label}
      </a>
    );
  }
  return <span className={cn("nav-static", className)}>{item.label}</span>;
}
