import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { StoreTypes } from "@/components/landing/StoreTypes";
import { ForOwners } from "@/components/landing/ForOwners";
import { Newsletter } from "@/components/landing/Newsletter";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <Hero />
      <Features />
      <HowItWorks />
      <StoreTypes />
      <ForOwners />
      <Newsletter />
      <CtaBanner />
      <Footer />
    </div>
  );
}
