export const metadata = {
  title: "Website Terms",
  description: "Website terms for Sunset Country Tech.",
};

export default function TermsPage() {
  return (
    <section className="bg-slate-50 px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">Website Terms</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
          <p>This website provides general information about Sunset Country Tech services. Service availability depends on the issue, location, parts, scheduling and whether remote or on-site help is appropriate.</p>
          <p>Submitting an enquiry does not create a booking or guarantee that a job can be accepted. Quotes, parts and next steps are discussed after the issue is reviewed.</p>
          <p>Do not submit passwords, private access codes or banking details through the contact form. If secure access is needed, it should be arranged separately.</p>
          <p>These terms can be updated as business details, contact methods and service policies are finalised.</p>
        </div>
      </div>
    </section>
  );
}
