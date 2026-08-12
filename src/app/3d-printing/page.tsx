import { CTASection } from "@/components/MarketingSections";

export const metadata = {
  title: "3D Printing",
  description: "Custom 3D printed parts, clips, brackets, mounts, enclosures and prototypes in Mildura and Sunraysia.",
};

const uses = ["Replacement plastic parts", "Brackets", "Clips", "Mounts", "Enclosures", "Adapters", "Prototypes", "Custom technology parts"];
const process = ["Show us what you need", "Supply or create the design", "Review it", "Print it", "Test the result"];

export default function PrintingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0D1220] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/brand/circuit-pattern.svg')] bg-right-bottom bg-no-repeat opacity-10" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">3D Printing</p>
          <h1 className="max-w-4xl text-balance text-5xl font-bold sm:text-6xl">When the part you need doesn&apos;t exist.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Custom print requests for practical technology parts, small repairs, prototypes and useful pieces around the home or business.</p>
        </div>
      </section>
      <section className="bg-slate-50 px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {uses.map((item) => <div key={item} className="rounded-[8px] border border-slate-200 bg-white p-5 font-bold shadow-sm">{item}</div>)}
          </div>
          <div className="rounded-[8px] bg-[#0D1220] p-6 text-white">
            <h2 className="text-3xl font-bold">Simple print process</h2>
            <ol className="mt-6 grid gap-4">
              {process.map((step, index) => <li key={step} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4 font-bold">{index + 1}. {step}</li>)}
            </ol>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
