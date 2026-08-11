import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  ChevronRight,
  Cpu,
  GraduationCap,
  HardDrive,
  HomeIcon,
  MapPin,
  Menu,
  MonitorCog,
  Network,
  Printer,
  Router,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";

const navItems = [
  ["Home", "#home"],
  ["Services", "#services"],
  ["Tutoring", "#tutoring"],
  ["Business IT", "#business-it"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

const serviceCards = [
  {
    title: "Computer Repairs & Upgrades",
    icon: Wrench,
    summary:
      "Laptop and desktop repairs, Windows troubleshooting, SSD and RAM upgrades, PC builds, maintenance and data transfers.",
    items: [
      "Windows and software troubleshooting",
      "SSD, RAM and gaming PC upgrades",
      "Cleaning, maintenance and basic recovery",
    ],
  },
  {
    title: "Home Tech Support",
    icon: HomeIcon,
    summary:
      "Practical help with everyday technology at home, from new computers to printers, backups, smart TVs and device setup.",
    items: [
      "New computer and device setup",
      "Printer, router and internet help",
      "Smart TV, streaming and backup setup",
    ],
  },
  {
    title: "Networking & Installations",
    icon: Network,
    summary:
      "Wi-Fi optimisation, home networking, Ethernet, security cameras, smart doorbells, Starlink/router setup and smart-home installs.",
    items: [
      "Mesh Wi-Fi and Ethernet setup",
      "IP cameras and smart doorbells",
      "Home Assistant and smart-home support",
    ],
  },
  {
    title: "Small Business IT Support",
    icon: BriefcaseBusiness,
    summary:
      "Clear, reliable technical support for small businesses that need computers, printers, email, networks and backups to behave.",
    items: [
      "Computer and device deployment",
      "Email, backup and printer setup",
      "General troubleshooting and improvements",
    ],
  },
];

const categories = [
  {
    title: "Fix It",
    icon: Wrench,
    text: "Computer repairs, troubleshooting and upgrades.",
  },
  {
    title: "Set It Up",
    icon: Printer,
    text: "Wi-Fi, printers, smart devices and technology installations.",
  },
  {
    title: "Learn It",
    icon: GraduationCap,
    text: "Friendly one-on-one IT tutoring.",
  },
  {
    title: "Improve It",
    icon: MonitorCog,
    text: "Upgrades, networking and smarter technology setups.",
  },
];

const tutoringTopics = [
  "Basic computer skills",
  "Windows and macOS",
  "Word, Excel and PowerPoint",
  "Email and internet use",
  "File management",
  "Cybersecurity and scam awareness",
  "PC building",
  "Basic networking",
  "3D printing",
  "Beginner CAD",
  "Beginner coding",
  "IT study support",
];

const businessItems = [
  "Computer setup",
  "Printer setup",
  "Network troubleshooting",
  "Wi-Fi improvements",
  "Email setup",
  "Backups",
  "Device deployment",
  "General technical troubleshooting",
];

const printingItems = [
  "Custom brackets",
  "Replacement clips",
  "Equipment mounts",
  "Small enclosures",
  "Prototype parts",
  "Replacement plastic parts",
  "Simple CAD design",
  "Custom 3D printing jobs",
];

const areas = [
  "Mildura",
  "Irymple",
  "Red Cliffs",
  "Merbein",
  "Nichols Point",
  "Buronga",
  "Gol Gol",
  "Wentworth",
];

const faqs = [
  {
    question: "Do you only repair computers?",
    answer:
      "No. Sunset Country Tech helps with repairs, upgrades, tutoring, Wi-Fi, printers, smart devices, small business support, installations and custom 3D printed parts.",
  },
  {
    question: "Do you offer home visits?",
    answer:
      "Yes, mobile and on-site support is available by arrangement. Remote support may also be suitable for some software and setup issues.",
  },
  {
    question: "Can you help me learn how to use my computer?",
    answer:
      "Yes. One-on-one tutoring is available for beginners, students, adults, seniors and anyone who wants to feel more confident with technology.",
  },
  {
    question: "Do you support small businesses?",
    answer:
      "Yes. Support can include computer setup, email, printers, Wi-Fi, basic networking, backups, device deployment and general troubleshooting.",
  },
  {
    question: "Do you install Wi-Fi and networking equipment?",
    answer:
      "Yes. Services include router setup, mesh Wi-Fi, Ethernet, Wi-Fi optimisation, network troubleshooting and Starlink/router setup.",
  },
  {
    question: "Can you make custom 3D printed replacement parts?",
    answer:
      "Yes. Small practical parts such as brackets, clips, mounts, enclosures and prototype pieces can be discussed, including simple CAD design where needed.",
  },
  {
    question: "What areas do you service?",
    answer:
      "Core service areas include Mildura, Irymple, Red Cliffs, Merbein, Nichols Point, Buronga, Gol Gol and Wentworth. Surrounding areas may be available by arrangement.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Send an enquiry with the device, suburb and a short description of what is happening. If you are unsure what service you need, just explain the problem in your own words.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Sunset Country Tech",
  description:
    "Local technology support for computer repairs, IT support, tutoring, networking, installations, small business IT and 3D printing across the Sunraysia and Mildura region.",
  areaServed: areas,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mildura",
    addressRegion: "VIC",
    addressCountry: "AU",
    streetAddress: "Address available by arrangement",
  },
  telephone: "Phone number to be added",
  email: "Email address to be added",
  url: "Website URL to be added",
  sameAs: ["Facebook URL to be added", "Instagram URL to be added"],
  makesOffer: [
    "Computer repairs",
    "IT support",
    "IT tutoring",
    "Networking and Wi-Fi setup",
    "Small business IT support",
    "3D printing and custom parts",
  ],
};

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-lg leading-8 text-slate-600">{text}</p> : null}
    </div>
  );
}

function ServiceCard({
  title,
  summary,
  items,
  icon: Icon,
}: (typeof serviceCards)[number]) {
  return (
    <article className="group rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-amber-100 text-amber-700">
        <Icon aria-hidden="true" className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-bold text-slate-950">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{summary}</p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PillList({ items }: { items: string[] }) {
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div id="home" className="min-h-screen bg-stone-50 text-slate-900">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/92 text-white shadow-lg shadow-slate-950/15 backdrop-blur">
          <nav
            className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
            aria-label="Main navigation"
          >
            <a href="#home" className="flex items-center gap-3 rounded-[8px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
              <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-gradient-to-br from-amber-400 to-fuchsia-500 text-slate-950 shadow-lg shadow-amber-500/20">
                <Cpu aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold tracking-tight">Sunset Country Tech</span>
            </a>

            <div className="hidden items-center gap-7 lg:flex">
              {navItems.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm font-medium text-slate-200 transition hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                className="rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Get Support
              </a>
            </div>

            <details className="group relative lg:hidden">
              <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-[8px] border border-white/15 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
                <Menu aria-hidden="true" className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </summary>
              <div className="absolute right-0 mt-3 w-64 rounded-[8px] border border-white/10 bg-slate-950 p-3 shadow-2xl">
                {navItems.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="block rounded-[8px] px-4 py-3 text-sm font-medium text-slate-100 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                  >
                    {label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="mt-2 block rounded-full bg-amber-400 px-4 py-3 text-center text-sm font-bold text-slate-950 hover:bg-amber-300"
                >
                  Get Support
                </a>
              </div>
            </details>
          </nav>
        </header>

        <main>
          <section className="relative overflow-hidden bg-slate-950 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.22),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(168,85,247,0.2),transparent_30%),linear-gradient(135deg,#020617_0%,#101827_54%,#2b1538_100%)]" />
            <div className="relative mx-auto grid min-h-[calc(100vh-66px)] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-amber-100 backdrop-blur">
                  <MapPin aria-hidden="true" className="h-4 w-4 text-amber-300" />
                  Local technology help across Sunraysia
                </p>
                <h1 className="mt-7 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Technology problems solved locally.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                  Repairs, IT support, tutoring, networking, installations and custom technology solutions across the Sunraysia region.
                </p>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
                  >
                    Get Tech Help
                    <ArrowRight aria-hidden="true" className="h-5 w-5" />
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
                  >
                    View Services
                    <ChevronRight aria-hidden="true" className="h-5 w-5" />
                  </a>
                </div>
                <div className="mt-10 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
                  {["Mobile/on-site service", "Remote support where appropriate", "Collection/drop-off by arrangement", "No retail storefront required"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <BadgeCheck aria-hidden="true" className="h-5 w-5 text-amber-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-xl">
                <div className="rounded-[8px] border border-white/12 bg-white/8 p-5 shadow-2xl shadow-black/30 backdrop-blur">
                  <Image
                    src="/og.png"
                    alt="Sunset-lit technology workspace with a laptop, router, tools and 3D printed part."
                    width={1792}
                    height={1024}
                    className="mb-4 aspect-[16/9] w-full rounded-[8px] object-cover"
                    priority
                  />
                  <div className="rounded-[8px] bg-slate-950/80 p-4">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-amber-300" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400" />
                      <span className="ml-auto text-xs font-semibold text-slate-400">support.local</span>
                    </div>
                    <div className="grid gap-4 pt-5 sm:grid-cols-2">
                      {categories.map(({ title, text, icon: Icon }) => (
                        <div key={title} className="rounded-[8px] border border-white/10 bg-white/[0.06] p-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/10 text-amber-300">
                            <Icon aria-hidden="true" className="h-5 w-5" />
                          </div>
                          <h2 className="mt-4 text-lg font-bold text-white">{title}</h2>
                          <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-20 sm:py-24" id="services">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow="Services"
                title="Useful technology support without the jargon."
                text="Get something repaired, have new technology installed, improve a setup that is not working well, or learn how to use it yourself."
              />
              <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {serviceCards.map((service) => (
                  <ServiceCard key={service.title} {...service} />
                ))}
              </div>
            </div>
          </section>

          <section className="bg-stone-50 py-20 sm:py-24" id="tutoring">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
              <div>
                <SectionHeading
                  eyebrow="IT Tutoring"
                  title="Friendly lessons for real confidence."
                  text="Tutoring is suitable for beginners, students, adults, seniors and anyone who wants technology to feel less frustrating."
                />
                <p className="mt-6 rounded-[8px] border-l-4 border-amber-400 bg-white p-5 text-lg font-semibold leading-8 text-slate-800 shadow-sm">
                  We do not just fix technology. We help you understand it.
                </p>
              </div>
              <div className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <BookOpen aria-hidden="true" className="h-7 w-7 text-amber-600" />
                  <h3 className="text-2xl font-bold text-slate-950">Lesson topics can include</h3>
                </div>
                <PillList items={tutoringTopics} />
              </div>
            </div>
          </section>

          <section className="bg-slate-950 py-20 text-white sm:py-24" id="business-it">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                  Business IT
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Practical support for small teams.
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Small business technology should be reliable, understandable and set up in a way that suits the people using it every day.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Clear communication", ShieldCheck],
                    ["Flexible appointments", Sparkles],
                    ["Practical solutions", HardDrive],
                    ["Local service", MapPin],
                  ].map(([label, Icon]) => (
                    <div key={label as string} className="rounded-[8px] border border-white/10 bg-white/[0.06] p-5">
                      <Icon aria-hidden="true" className="h-6 w-6 text-amber-300" />
                      <p className="mt-3 font-semibold">{label as string}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[8px] border border-white/10 bg-white/[0.06] p-6">
                <h3 className="text-2xl font-bold">Business help can include</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {businessItems.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-[8px] bg-white/8 p-3 text-slate-100">
                      <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-emerald-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-20 sm:py-24" id="3d-printing">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
              <div>
                <SectionHeading
                  eyebrow="3D Printing"
                  title="Custom parts for the awkward little problems."
                  text="From replacement plastic clips to mounts, brackets, simple enclosures and prototype pieces, custom 3D printing can be a practical way to solve small hardware problems."
                />
                <PillList items={printingItems} />
              </div>
              <div className="rounded-[8px] border border-slate-200 bg-gradient-to-br from-amber-50 via-white to-fuchsia-50 p-6 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-[8px] bg-slate-950 text-amber-300">
                  <Sparkles aria-hidden="true" className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-slate-950">Simple CAD design available</h3>
                <p className="mt-4 leading-7 text-slate-600">
                  If you have a broken part, a rough measurement, a sketch or an idea, Sunset Country Tech can discuss whether a simple custom print is suitable.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-stone-50 py-20 sm:py-24" id="about">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
              <div>
                <SectionHeading
                  eyebrow="About"
                  title="Local help that makes technology easier to live with."
                  text="Sunset Country Tech provides practical, understandable technology support for homes, individuals, students and small businesses across the Sunraysia region."
                />
              </div>
              <div className="space-y-5 text-lg leading-8 text-slate-700">
                <p>
                  Whether you need a computer repaired, a printer connected, Wi-Fi improved, a smart device installed, or a patient lesson on how something works, the aim is the same: clear help without unnecessary jargon.
                </p>
                <p>
                  The service is flexible and local, with mobile/on-site support, remote help where appropriate, and collection or drop-off by arrangement.
                </p>
                <div className="grid gap-4 pt-4 sm:grid-cols-2">
                  {["Local service", "Clear communication", "Practical solutions", "Friendly support"].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-[8px] bg-white p-4 shadow-sm">
                      <BadgeCheck aria-hidden="true" className="h-5 w-5 text-amber-600" />
                      <span className="font-semibold text-slate-900">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-20 sm:py-24" id="service-areas">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow="Service Areas"
                title="Technology support across Mildura and Sunraysia."
                text="Core service areas include the following locations. Surrounding areas may also be available by arrangement."
                align="center"
              />
              <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                {areas.map((area) => (
                  <div key={area} className="flex items-center gap-3 rounded-[8px] border border-slate-200 bg-stone-50 p-4">
                    <MapPin aria-hidden="true" className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-slate-900">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-stone-50 py-20 sm:py-24" id="testimonials">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow="Testimonials"
                title="Ready for real customer feedback."
                text="This section is designed for future testimonials once customers have approved their words for publication."
              />
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {["Customer quote placeholder", "Customer quote placeholder", "Customer quote placeholder"].map((item, index) => (
                  <div key={`${item}-${index}`} className="rounded-[8px] border border-dashed border-slate-300 bg-white p-6 text-slate-600">
                    <p className="font-semibold text-slate-950">{item}</p>
                    <p className="mt-3 text-sm leading-6">
                      Add a real testimonial here after receiving permission from the customer.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white py-20 sm:py-24" id="faq">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow="FAQ"
                title="Common questions"
                text="A few quick answers before you get in touch."
                align="center"
              />
              <div className="mt-10 divide-y divide-slate-200 rounded-[8px] border border-slate-200 bg-white shadow-sm">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group p-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-bold text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500">
                      {faq.question}
                      <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0 text-amber-600 transition group-open:rotate-90" />
                    </summary>
                    <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-slate-950 py-20 text-white sm:py-24" id="contact">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                  Contact
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Tell us what is happening.
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  No problem is too simple to ask about. If you are unsure what service you need, just describe what is happening.
                </p>
                <div className="mt-8 space-y-4 text-slate-200">
                  <p className="flex items-center gap-3">
                    <MapPin aria-hidden="true" className="h-5 w-5 text-amber-300" />
                    Sunraysia/Mildura region. No public street address listed.
                  </p>
                  <p className="flex items-center gap-3">
                    <Router aria-hidden="true" className="h-5 w-5 text-amber-300" />
                    Mobile, remote, collection and drop-off options by arrangement.
                  </p>
                  <p className="flex items-center gap-3">
                    <Camera aria-hidden="true" className="h-5 w-5 text-amber-300" />
                    Placeholders are included for real email, phone and social links.
                  </p>
                </div>
              </div>
              <ContactForm />
            </div>
          </section>
        </main>

        <footer className="bg-slate-950 text-slate-300">
          <div className="mx-auto grid max-w-7xl gap-8 border-t border-white/10 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
            <div>
              <p className="text-xl font-bold text-white">Sunset Country Tech</p>
              <p className="mt-2 text-sm">Repairs &bull; IT Support &bull; Tutoring &bull; Installations</p>
              <p className="mt-5 text-sm">© {new Date().getFullYear()} Sunset Country Tech.</p>
            </div>
            <div>
              <p className="font-semibold text-white">Quick links</p>
              <div className="mt-4 grid gap-2 text-sm">
                {[
                  ["Services", "#services"],
                  ["Tutoring", "#tutoring"],
                  ["Business IT", "#business-it"],
                  ["Service Areas", "#service-areas"],
                  ["Contact", "#contact"],
                ].map(([label, href]) => (
                  <a key={href} href={href} className="hover:text-amber-300">
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-white">Contact placeholders</p>
              <div className="mt-4 grid gap-2 text-sm">
                <span>Email: add real email</span>
                <span>Phone: add real phone</span>
                <span>Facebook: add real link</span>
                <span>Instagram: add real link</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
