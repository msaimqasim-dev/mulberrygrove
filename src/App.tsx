import { useEffect } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CommunityLocationSection } from "@/components/sections/CommunityLocationSection";
import { Hero } from "@/components/sections/Hero";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { ResidentialSection } from "@/components/sections/ResidentialSection";
import { RetailSection } from "@/components/sections/RetailSection";
import { VisionSection } from "@/components/sections/VisionSection";
import { WelcomeSection } from "@/components/sections/WelcomeSection";

/**
 * MULBERRY GROVE — HOMEPAGE (Phase 1).
 * Section order:
 *   01 Hero · 02 Gather Together · 03 Peace of Place (masterplan) ·
 *   04 Come Home (residential) · 05 Community & Location · 06 Experiences Every Day
 *   (retail) · 07 Development Partners (pinned story) · 08 Footer (reveal)
 * Only "/" exists. Navigation labels are non-interactive until Phase 2.
 */
export default function App() {
  useEffect(() => {
    // Honour a deep link such as /#masterplan on first load.
    if (window.location.hash.length > 1) {
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      target?.scrollIntoView();
    }
  }, []);

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <WelcomeSection />
        <VisionSection />
        <ResidentialSection />
        <CommunityLocationSection />
        <RetailSection />
        <PartnersSection />
      </main>
      <Footer />
    </>
  );
}
