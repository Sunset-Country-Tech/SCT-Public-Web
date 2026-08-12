export const metadata = {
  title: "Privacy",
  description: "Privacy information for Sunset Country Tech enquiries.",
};

export default function PrivacyPage() {
  return (
    <section className="bg-slate-50 px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">Privacy</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
          <p>Sunset Country Tech only asks for information needed to understand and respond to your enquiry, such as your name, contact details, suburb, service type and description of the issue.</p>
          <p>Information submitted through the contact form is used to respond to your request and arrange suitable support. Do not send passwords, banking details or sensitive access codes through the form.</p>
          <p>Uploaded photos should only show the device or issue you want help with. Avoid including private documents or personal information in images.</p>
          <p>Business details, retention periods and third-party service details can be updated here when the final contact and hosting setup is confirmed.</p>
        </div>
      </div>
    </section>
  );
}
