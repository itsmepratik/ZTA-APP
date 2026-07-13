import LandingNav from "@/components/landing/LandingNav";
import HeroSection from "@/components/landing/HeroSection";
import TrustBadges from "@/components/landing/TrustBadges";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FooterCTA from "@/components/landing/FooterCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-white scroll-smooth">
      <LandingNav />
      <HeroSection />
      <TrustBadges />
      <FeaturesSection />
      <FooterCTA />
    </main>
  );
}
