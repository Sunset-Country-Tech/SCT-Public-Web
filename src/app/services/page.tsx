import { CTASection, HowItWorks, PageHero, ServicesGrid, SupportMethods } from "@/components/MarketingSections";
import { serviceGroups } from "@/lib/site-data";

export const metadata = {
  title: "Services",
  description: "Computer repairs, IT support, Wi-Fi help, installations, digital literacy and 3D printing services across Mildura and Sunraysia.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Fixing, setting up, explaining and improving technology."
        copy="Practical technology help for individuals, families, seniors, students, home users and small businesses across Mildura and Sunraysia."
      />
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
      <SupportMethods />
      <HowItWorks />
      <CTASection />
    </>
  );
}
