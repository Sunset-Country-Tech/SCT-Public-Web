import { CTASection, HowItWorks, ServicesGrid } from "@/components/MarketingSections";
import { serviceGroups } from "@/lib/site-data";

export const metadata = {
  title: "Services",
  description: "Computer repairs, IT support, Wi-Fi help, installations, digital literacy and 3D printing services across Mildura and Sunraysia.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0D1220] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">Services</p>
          <h1 className="max-w-4xl text-balance text-5xl font-bold sm:text-6xl">Fixing, setting up, explaining and improving technology.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Sunset Country Tech provides practical technology help for individuals, families, seniors, students, home users and small businesses.</p>
        </div>
      </section>
      <ServicesGrid compact />
      <section className="bg-slate-50 px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {serviceGroups.map(([group, items]) => (
            <article key={group} id={group.toLowerCase().replaceAll(" ", "-")} className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold">{group}</h2>
              <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                {items.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <HowItWorks />
      <CTASection />
    </>
  );
}
