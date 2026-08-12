import { CTASection } from "@/components/MarketingSections";

export const metadata = {
  title: "About",
  description: "About Sunset Country Tech, a practical local technology help business for Mildura and Sunraysia.",
};

const values = ["Friendly support", "Clear communication", "Practical solutions", "Local service", "No unnecessary jargon"];

export default function AboutPage() {
  return (
    <>
      <section className="bg-[#0D1220] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">About</p>
          <h1 className="max-w-4xl text-balance text-5xl font-bold sm:text-6xl">Technology should make life easier.</h1>
          <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-slate-300">
            <p>Sunset Country Tech provides practical technology help for people, homes and small businesses across Mildura and Sunraysia.</p>
            <p>Sometimes something needs fixing. Sometimes something needs setting up. Sometimes you just want someone to explain how it works.</p>
          </div>
          <h2 className="mt-10 max-w-3xl text-3xl font-bold text-white">We don&apos;t just fix technology. We help you understand it.</h2>
        </div>
      </section>
      <section className="bg-slate-50 px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((value) => <div key={value} className="rounded-[8px] border border-slate-200 bg-white p-5 text-center font-bold shadow-sm">{value}</div>)}
        </div>
      </section>
      <CTASection />
    </>
  );
}
