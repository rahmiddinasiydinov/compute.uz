import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Showcase } from "@/components/sections/Showcase";
import { WhyUs } from "@/components/sections/WhyUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <Showcase />
      <WhyUs />
      <HowItWorks />
      <CtaBanner />
    </>
  );
}
