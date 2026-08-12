import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Send an enquiry to Sunset Country Tech for computer repairs, IT support, digital literacy, Wi-Fi help, business IT or 3D printing.",
};

export default function ContactPage() {
  return (
    <section className="bg-[#0D1220] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">Contact</p>
          <h1 className="text-balance text-5xl font-bold sm:text-6xl">What can we help with?</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">Not sure which service you need? Just describe what&apos;s happening and we&apos;ll point you in the right direction.</p>
          <div className="mt-8 rounded-[8px] border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-slate-300">
            <p>No physical shop address is listed because support is arranged around the job: on-site, remote, collection/drop-off or a digital literacy session.</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
