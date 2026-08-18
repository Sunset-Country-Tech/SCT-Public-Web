import { CTASection, PageHero } from "@/components/MarketingSections";
import { literacyGroups } from "@/lib/site-data";

export const metadata = {
  title: "Digital Literacy",
  description: "Friendly one-on-one digital literacy, computer help and technology skills support across Mildura and Sunraysia.",
};

export default function DigitalLiteracyPage() {
  return (
    <>
      <PageHero
        eyebrow="Digital Literacy"
        title="Feel more confident with technology."
        copy="Whether you're learning the basics, using a new device or trying to stay safer online, Sunset Country Tech can help you build practical technology skills at your own pace."
      >
          <p className="mt-6 inline-flex rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 font-bold text-white">No tests. No judgement. No unnecessary jargon.</p>
      </PageHero>
      <section className="bg-slate-50 px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">What you can learn</p>
            <h2 className="mt-3 text-3xl font-bold">Everyday skills, taught calmly and practically.</h2>
          </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {literacyGroups.map(([title, items]) => (
            <article key={title} className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold">{title}</h2>
              <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-700">
                {items.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </article>
          ))}
        </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
