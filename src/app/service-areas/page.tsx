import { business } from "@/config/business";
import { CTASection, ServiceAreaPreview } from "@/components/MarketingSections";

export const metadata = {
  title: "Service Areas",
  description: "Technology help across Mildura, Irymple, Red Cliffs, Merbein, Nichols Point, Buronga, Gol Gol, Wentworth and nearby areas by arrangement.",
};

export default function ServiceAreasPage() {
  return (
    <>
      <section className="bg-[#0D1220] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">Service Areas</p>
          <h1 className="max-w-4xl text-balance text-5xl font-bold sm:text-6xl">Local tech support across Mildura and Sunraysia.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Support may be available on-site, remotely, by collection/drop-off arrangement or as a digital literacy session.</p>
        </div>
      </section>
      <ServiceAreaPreview />
      <section className="bg-slate-50 px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Areas listed</h2>
          <p className="mt-4 text-lg leading-8 text-slate-700">{business.suburbs.join(", ")}. Surrounding areas may also be available by arrangement.</p>
        </div>
      </section>
      <CTASection />
    </>
  );
}
