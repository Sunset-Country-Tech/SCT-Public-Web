import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, Send } from "lucide-react";
import { business } from "@/config/business";
import { customerNeeds, faqs, pillarCards, serviceCards, supportMethods } from "@/lib/site-data";
import { BrandDivider, CircuitPattern, GradientButton, SectionHeading, ServiceIcon } from "./Brand";

export function PageHero({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0D1220] px-4 py-20 text-white sm:px-6 lg:px-8">
      <CircuitPattern className="opacity-[0.1]" />
      <div aria-hidden="true" className="absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-[#7861FF]/16 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">{eyebrow}</p>
        <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[1.04] sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-slate-300">{copy}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0D1220] text-white">
      <CircuitPattern className="opacity-[0.16]" />
      <div aria-hidden="true" className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#FF8A00]/18 blur-3xl" />
      <div aria-hidden="true" className="absolute right-0 top-16 h-96 w-96 rounded-full bg-[#7861FF]/16 blur-3xl" />
      <div className="relative mx-auto grid min-h-[calc(100svh-88px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200">
            Local tech help across Mildura and Sunraysia
          </p>
          <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
            Technology problems <span className="text-[var(--sunset-orange)]">solved locally.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-300 sm:text-xl">
            Repairs, IT support, digital literacy, networking, installations and custom technology solutions across Mildura and Sunraysia.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <GradientButton href="/contact">Get Tech Help</GradientButton>
            <GradientButton href="/services" secondary>View Services</GradientButton>
          </div>
          <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ["Friendly", "Plain-language help"],
              ["Flexible", "On-site or remote"],
              ["Practical", "Repair, setup, learn"],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4">
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-8 rounded-full bg-[linear-gradient(135deg,#FF8A00,#FF5E7D,#7861FF)] opacity-25 blur-3xl" />
          <div className="relative rounded-[8px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30">
            <Image src="/brand/provided-logo-stacked.png" alt="Sunset Country Tech" width={314} height={384} className="mx-auto h-auto w-64 max-w-full" priority />
            <div className="mt-8 grid gap-3 text-sm text-slate-300">
              {["Something broken? We can help fix it.", "Something new? We can help set it up.", "Not sure how to use it? We can help you learn.", "Want it to work better? We can help improve it."].map((line) => (
                <p key={line} className="flex items-start gap-3 rounded-[8px] bg-[#0D1220]/70 p-3">
                  <Image src="/brand/provided-logo-icon.png" alt="" aria-hidden="true" width={32} height={30} className="mt-0.5 h-5 w-5 shrink-0 object-contain" />
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const items = [
    { icon: "/brand/icon-installations.png", label: "Local", copy: "Mildura and Sunraysia support" },
    { icon: "/brand/icon-tutoring.png", label: "Clear", copy: "No unnecessary jargon" },
    { icon: "/brand/icon-it-support.png", label: "Flexible", copy: "Remote, on-site or by arrangement" },
    { icon: "/brand/icon-security.png", label: "Careful", copy: "Safe handling and sensible advice" },
  ];

  return (
    <section className="border-y border-white/10 bg-[#0A0F1B] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-[8px] bg-white/[0.035] p-4">
            <Image src={item.icon} alt="" aria-hidden="true" width={64} height={64} className="h-9 w-9 shrink-0 object-contain" />
            <div>
              <p className="text-sm font-bold">{item.label}</p>
              <p className="text-xs leading-5 text-slate-400">{item.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CustomerNeeds() {
  return (
    <section className="bg-slate-50 px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">Start with the problem</p>
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">You do not need to know the right technical words.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">Just describe what is happening. The goal is to work out the most practical next step, whether that is repair, setup, a visit, remote support or a calm explanation.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {customerNeeds.map((need) => (
              <article key={need.title} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold">{need.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{need.copy}</p>
                <p className="mt-4 text-sm font-bold text-slate-950">{need.action}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Pillars() {
  return (
    <section className="bg-[#101827] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Fix It • Set It Up • Learn It • Improve It" title="Local technology help when you need it." copy="No call centres. No unnecessary jargon. Just practical technology help for people, homes and small businesses." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pillarCards.map((card) => (
            <article key={card.label} className="relative overflow-hidden rounded-[8px] border border-white/10 bg-[#0D1220] p-6 shadow-xl shadow-black/20">
              <CircuitPattern className="opacity-[0.08]" />
              <div className="relative">
                <ServiceIcon icon={card.icon} />
                <p className="mt-6 text-sm font-bold tracking-[0.28em] text-[var(--sunset-orange)]">{card.label}</p>
                <h3 className="mt-3 text-xl font-bold">{card.title}</h3>
                <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-300">
                  {card.items.map((item) => <li key={item}>• {item}</li>)}
                </ul>
                <Link href={card.href} className="mt-6 inline-flex text-sm font-bold text-white underline decoration-[var(--sunset-orange)] underline-offset-4">{card.cta}</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-[#0D1220] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Services" title="Practical help for the technology you actually use." copy={compact ? undefined : "Need help with your computer? Wi-Fi not reaching where you need it? Bought something and need help setting it up? Start here."} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {serviceCards.map((service) => (
            <Link key={service.title} href={service.href} className="group rounded-[8px] border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sunset-orange)]">
              <ServiceIcon icon={service.icon} />
              <h3 className="mt-5 text-lg font-bold">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{service.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
                Learn more <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    ["1. Tell us what's happening", "Send an enquiry describing the problem."],
    ["2. We work out the best option", "Remote support, home visit, drop-off or a digital literacy session."],
    ["3. Get it sorted", "Repair, setup, installation, support or training."],
    ["4. Know what happened", "The solution is explained clearly, without unnecessary jargon."],
  ];

  return (
    <section className="bg-slate-50 px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">How it works</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Getting help is simple.</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, copy]) => (
            <article key={title} className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SupportMethods() {
  return (
    <section className="bg-slate-50 px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">Support options</p>
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">Help can happen in the way that suits the job.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">Some problems need hands-on time. Others can be sorted remotely. Some are best handled as a patient learning session. The first step is simply telling us what is going on.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {supportMethods.map(([title, copy]) => (
              <article key={title} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceAreaPreview() {
  return (
    <section className="bg-[#101827] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">Service area</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Helping people and small businesses across Mildura and Sunraysia.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">On-site, remote, collection/drop-off by arrangement and digital literacy sessions may be available depending on what you need.</p>
          <div className="mt-7"><GradientButton href="/service-areas">View Service Areas</GradientButton></div>
        </div>
        <div className="relative overflow-hidden rounded-[8px] border border-white/10 bg-[#0D1220] p-6">
          <CircuitPattern className="opacity-[0.1]" />
          <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
            {business.suburbs.map((suburb) => (
              <div key={suburb} className="flex min-h-24 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.035] p-4 text-center font-bold">
                {suburb}
              </div>
            ))}
          </div>
          <p className="relative mt-5 text-sm text-slate-400">Surrounding areas may also be available by arrangement.</p>
        </div>
      </div>
    </section>
  );
}

export function NoFakeReviewsNotice() {
  return (
    <section className="bg-slate-50 px-4 py-14 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--sunset-orange)]">Reviews</p>
          <h2 className="mt-2 text-2xl font-bold">Testimonials will be added only when they are real.</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">No fake reviews, no invented ratings, no made-up customer numbers.</p>
        </div>
        <Image src="/brand/provided-logo-icon.png" alt="" aria-hidden="true" width={64} height={60} className="h-12 w-12 object-contain" />
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="bg-[#0D1220] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="FAQ" title="A few common questions." />
        <div className="mt-10 divide-y divide-white/10 rounded-[8px] border border-white/10 bg-white/[0.03]">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                {question}
                <span className="text-[var(--sunset-orange)] group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-300">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#101827] px-4 py-20 text-white sm:px-6 lg:px-8">
      <CircuitPattern />
      <div className="relative mx-auto max-w-4xl text-center">
        <BrandDivider />
        <h2 className="mx-auto mt-6 max-w-3xl text-balance text-3xl font-bold sm:text-5xl">What can we help with?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">Not sure which service you need? Just describe what&apos;s happening and we&apos;ll point you in the right direction.</p>
        <div className="mt-8">
          <GradientButton href="/contact"><Send aria-hidden="true" className="mr-2 h-4 w-4" /> Send Enquiry</GradientButton>
        </div>
      </div>
    </section>
  );
}
