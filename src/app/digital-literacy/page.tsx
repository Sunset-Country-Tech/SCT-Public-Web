import { CTASection } from "@/components/MarketingSections";
import { literacyGroups } from "@/lib/site-data";

export const metadata = {
  title: "Digital Literacy",
  description: "Friendly one-on-one digital literacy, computer help and technology skills support across Mildura and Sunraysia.",
};

export default function DigitalLiteracyPage() {
  return (
    <>
      <section className="bg-[#0D1220] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">Digital Literacy</p>
          <h1 className="max-w-4xl text-balance text-5xl font-bold sm:text-6xl">Feel more confident with technology.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Whether you&apos;re learning the basics, using a new device or trying to stay safer online, Sunset Country Tech can help you build practical technology skills at your own pace.</p>
          <p className="mt-6 inline-flex rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 font-bold text-white">No tests. No judgement. No unnecessary jargon.</p>
        </div>
      </section>
      <section className="bg-slate-50 px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {literacyGroups.map(([title, items]) => (
            <article key={title} className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold">{title}</h2>
              <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-700">
                {items.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
