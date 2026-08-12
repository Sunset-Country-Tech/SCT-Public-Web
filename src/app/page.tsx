import { CTASection, FAQSection, Hero, HowItWorks, Pillars, ServiceAreaPreview, ServicesGrid } from "@/components/MarketingSections";

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <ServicesGrid />
      <HowItWorks />
      <ServiceAreaPreview />
      <FAQSection />
      <CTASection />
    </>
  );
}
