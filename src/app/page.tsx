import { CTASection, CustomerNeeds, FAQSection, Hero, HowItWorks, NoFakeReviewsNotice, Pillars, ServiceAreaPreview, ServicesGrid, SupportMethods, TrustStrip } from "@/components/MarketingSections";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CustomerNeeds />
      <Pillars />
      <ServicesGrid />
      <SupportMethods />
      <ServiceAreaPreview />
      <HowItWorks />
      <NoFakeReviewsNotice />
      <FAQSection />
      <CTASection />
    </>
  );
}
