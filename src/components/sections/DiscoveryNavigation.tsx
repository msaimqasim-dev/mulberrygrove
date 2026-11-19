import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";
import { content } from "@/data/content";
import { cn } from "@/utils/cn";

/**
 * PHASE 2 RESERVED — not rendered on the homepage (refinement pass). Kept for the inner pages.
 *
 * 02 — Discovery strip directly beneath the hero.
 * Three client-termed interests, each jumping to its homepage section.
 */
export function DiscoveryNavigation() {
  return (
    <nav aria-label={content.brand.name} className="border-b border-[var(--rule)] bg-white">
      <Container>
        <ul className="grid md:-mx-[clamp(1.25rem,2.4vw,2.5rem)] md:grid-cols-3">
          {content.discovery.map((item, i) => (
            <AnimatedReveal as="li" key={item.label} delay={i * 0.1} className={cn("border-[var(--rule)]", i > 0 && "border-t md:border-t-0 md:border-l")}>
              <a href={item.href} className="discovery-item">
                <span className="flex items-baseline gap-4">
                  <span aria-hidden="true" className="eyebrow text-ink/45">
                    0{i + 1}
                  </span>
                  <span className="font-display text-[clamp(1.75rem,2.5vw,2.375rem)] leading-none text-navy">{item.label}</span>
                </span>
                <ArrowRight size={20} className="shrink-0 text-navy" />
              </a>
            </AnimatedReveal>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
