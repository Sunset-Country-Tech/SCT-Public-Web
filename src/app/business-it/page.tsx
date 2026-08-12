import { CTASection } from "@/components/MarketingSections";

export const metadata = {
  title: "Business IT",
  description: "Practical small business IT support in Mildura and Sunraysia without a large managed-service arrangement.",
};

const items = ["PCs", "Printers", "Wi-Fi", "Networking", "Microsoft 365 help", "Google Workspace help", "Backups", "Device setup", "Email", "On-site troubleshooting", "Basic cyber security improvements", "Technology installations"];

export default function BusinessItPage() {
  return (
    <>
      <section className="bg-[#0D1220] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">Business IT</p>
          <h1 className="max-w-4xl text-balance text-5xl font-bold sm:text-6xl">Practical IT support for local businesses.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Sunset Country Tech helps small businesses with everyday technology problems without requiring a large managed-service arrangement.</p>
        </div>
      </section>
      <section className="bg-slate-50 px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => <div key={item} className="rounded-[8px] border border-slate-200 bg-white p-5 text-lg font-bold shadow-sm">{item}</div>)}
        </div>
      </section>
      <CTASection />
    </>
  );
}
