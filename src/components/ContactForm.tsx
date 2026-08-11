"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

const serviceOptions = [
  "Computer Repair",
  "Tech Support",
  "IT Tutoring",
  "Networking / Wi-Fi",
  "Security Cameras",
  "Smart Home",
  "Business IT",
  "3D Printing",
  "Other",
];

type FormStatus = "idle" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

    if (!endpoint) {
      await new Promise((resolve) => setTimeout(resolve, 450));
      setStatus("success");
      form.reset();
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[8px] border border-white/10 bg-white p-6 text-slate-950 shadow-2xl shadow-black/30"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Name
          <input
            required
            name="name"
            autoComplete="name"
            placeholder="Your name"
            className="min-h-12 rounded-[8px] border border-slate-300 px-4 text-base font-normal outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-200"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Email
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="min-h-12 rounded-[8px] border border-slate-300 px-4 text-base font-normal outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-200"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Phone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Add your phone number"
            className="min-h-12 rounded-[8px] border border-slate-300 px-4 text-base font-normal outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-200"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Service required
          <select
            required
            name="service"
            defaultValue=""
            className="min-h-12 rounded-[8px] border border-slate-300 bg-white px-4 text-base font-normal outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-200"
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
          Suburb
          <input
            required
            name="suburb"
            autoComplete="address-level2"
            placeholder="Mildura, Irymple, Red Cliffs..."
            className="min-h-12 rounded-[8px] border border-slate-300 px-4 text-base font-normal outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-200"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
          Description of issue
          <textarea
            required
            name="message"
            minLength={15}
            rows={6}
            placeholder="Describe what is happening, what device is involved, and anything you have already tried."
            className="rounded-[8px] border border-slate-300 px-4 py-3 text-base font-normal outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-200"
          />
        </label>
      </div>

      <p className="mt-5 rounded-[8px] bg-amber-50 p-4 text-sm leading-6 text-slate-700">
        No problem is too simple to ask about. If you&apos;re unsure what service you need,
        just describe what&apos;s happening.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500 disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto"
      >
        <Send aria-hidden="true" className="h-5 w-5" />
        {isSubmitting ? "Sending..." : "Send Enquiry"}
      </button>

      {status === "success" ? (
        <p role="status" className="mt-4 text-sm font-semibold text-emerald-700">
          Thanks. Your enquiry is ready to be sent through the configured form endpoint.
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="mt-4 text-sm font-semibold text-red-700">
          Something went wrong sending the form. Please try again, or use the contact details once they are added.
        </p>
      ) : null}
    </form>
  );
}
