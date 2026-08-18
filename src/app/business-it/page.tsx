import { CTASection, PageHero } from "@/components/MarketingSections";
import { businessItNeeds } from "@/lib/site-data";

export const metadata = {
  title: "Business IT",
  description: "Practical small business IT support in Mildura and Sunraysia without a large managed-service arrangement.",
};

export default function BusinessItPage() {
  return (
    <>
      <PageHero
        eyebrow="Business IT"
        title="Practical IT support for local businesses."
        copy="Everyday technology support for small businesses that need help without being pushed into a large managed-service arrangement."
      />
      <section className="bg-slate-50 px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {businessItNeeds.map(([title, items]) => (
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
