"use client";

import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Clock3,
  Download,
  FileSignature,
  Filter,
  LogOut,
  Menu,
  Plus,
  Save,
  Search,
  Send,
  Upload,
} from "lucide-react";
import { useMemo, useState } from "react";
import { SettingsPanel, type OperationsSettings } from "@/components/SettingsPanel";
import {
  alerts,
  appointments,
  businessIt,
  checklist,
  communications,
  customers,
  devices,
  digitalLiteracy,
  documents,
  invoices,
  jobs,
  navItems,
  parts,
  quickActions,
  quotes,
  reports,
  roles,
  settings as defaultSettings,
  threeDPrinting,
  timeline,
} from "@/lib/operations-data";
import { calculateTotals, can, formatCurrency, nextNumber, quoteApprovalTransition, type Role } from "@/lib/workflows";

type OperationsAppProps = {
  sessionRole?: Role;
};

function StatusBadge({ value }: { value: string }) {
  const tone = value.includes("Paid") || value.includes("Ready") || value.includes("Approved")
    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
    : value.includes("Awaiting") || value.includes("Due") || value.includes("Needed")
      ? "bg-amber-50 text-amber-800 ring-amber-200"
      : value.includes("Scheduled") || value.includes("Sent")
        ? "bg-indigo-50 text-indigo-700 ring-indigo-200"
        : "bg-slate-100 text-slate-700 ring-slate-200";

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tone}`}>
      {value}
    </span>
  );
}

function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[8px] border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
        <h2 className="text-base font-bold text-slate-950">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{detail}</p>
    </div>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  return <div className="overflow-x-auto"><table className="min-w-full text-left text-sm">{children}</table></div>;
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="whitespace-nowrap border-b border-slate-200 px-3 py-3 text-xs font-bold uppercase text-slate-500">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="border-b border-slate-100 px-3 py-3 align-top text-slate-700">{children}</td>;
}

const defaultOperationsSettings: OperationsSettings = {
  businessName: defaultSettings.businessName,
  tradingName: defaultSettings.businessName,
  abn: "",
  phone: "0400 123 456",
  email: "hello@sunsetcountry.tech",
  website: "sunsetcountry.tech",
  tagline: defaultSettings.tagline,
  currency: defaultSettings.currency,
  gstRegistered: defaultSettings.gstRegistered,
  gstRate: defaultSettings.gstRate,
  labourRate: 95,
  travelRate: 45,
  serviceAreas: defaultSettings.serviceAreas,
  jobStatuses: [
    "New",
    "Awaiting Diagnosis",
    "Diagnosing",
    "Awaiting Quote",
    "Awaiting Approval",
    "Awaiting Parts",
    "Scheduled",
    "In Progress",
    "Testing",
    "Ready for Collection",
    "Awaiting Payment",
    "Completed",
    "Collected",
    "Cancelled",
    "Unable to Repair",
  ],
  jobTypes: [
    "Computer Repair",
    "Computer Upgrade",
    "PC Build",
    "Home Tech Support",
    "Remote Support",
    "On-Site Support",
    "Wi-Fi / Networking",
    "Printer",
    "Security Cameras",
    "Smart Home",
    "Business IT",
    "Digital Literacy",
    "3D Printing",
    "Other",
  ],
  priorities: ["Low", "Normal", "High", "Urgent"],
  tags: ["VIP", "Business", "Digital Literacy", "Remote Support", "Warranty", "Repeat Customer"],
  numbering: defaultSettings.numbering,
  documentTerms: "Payment is due on receipt unless otherwise agreed. Approved quote work may require parts availability.",
  warrantyPolicy: "Warranty periods are configured per covered work and part. Warranty does not cover unrelated faults, misuse or customer-supplied parts unless explicitly stated.",
  emailProvider: "none",
  smsProvider: "none",
  accountingProvider: "none",
  calendarProvider: "none",
  fileStorage: "local uploads",
};

export function OperationsApp({ sessionRole = "Owner" }: OperationsAppProps) {
  const [active, setActive] = useState<(typeof navItems)[number]["label"]>("Dashboard");
  const [role, setRole] = useState<Role>(sessionRole);
  const [query, setQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [appSettings, setAppSettings] = useState<OperationsSettings>(() => {
    if (typeof window === "undefined") {
      return defaultOperationsSettings;
    }

    const stored = window.localStorage.getItem("sct-operations-settings");
    if (!stored) {
      return defaultOperationsSettings;
    }

    try {
      return { ...defaultOperationsSettings, ...JSON.parse(stored) };
    } catch {
      window.localStorage.removeItem("sct-operations-settings");
      return defaultOperationsSettings;
    }
  });
  const [jobDraft, setJobDraft] = useState({
    customer: "Mia Thompson",
    type: "Computer Repair",
    priority: "Normal",
    summary: "",
  });

  const totals = calculateTotals(quotes[0].items, { gstRegistered: appSettings.gstRegistered });
  const outstanding = invoices.reduce((sum, invoice) => sum + invoice.total - invoice.paid, 0);
  const approvalPreview = quoteApprovalTransition("Approved");
  const filteredJobs = jobs.filter((job) =>
    [job.number, job.customer, job.device, job.status, job.type].join(" ").toLowerCase().includes(query.toLowerCase()),
  );
  const newJobNumber = useMemo(
    () => nextNumber(appSettings.numbering.job, 2026, jobs.map((job) => job.number)),
    [appSettings.numbering.job],
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-[#0D1220] text-white lg:flex">
        <div className="border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-gradient-to-br from-[#FF8A00] via-[#FF5E7D] to-[#7861FF] font-black text-white">
              SCT
            </div>
            <div>
              <p className="text-lg font-black leading-tight">{appSettings.businessName}</p>
              <p className="text-xs text-slate-300">Internal Operations</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => setActive(label)}
              className={`flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-sm font-semibold transition ${
                active === label ? "bg-[#FF8A00] text-[#0D1220]" : "text-slate-200 hover:bg-white/10"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4 text-xs text-slate-300">
          PostgreSQL + Prisma ready • File storage ready • Provider-neutral integrations
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-[8px] border border-slate-200 lg:hidden"
              onClick={() => setMobileNavOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search customer, phone, job, invoice, serial, part...  Ctrl/Cmd + K"
                className="h-10 w-full rounded-[8px] border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-[#FF8A00] focus:bg-white"
              />
            </div>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as Role)}
              className="hidden h-10 rounded-[8px] border border-slate-200 bg-white px-3 text-sm font-semibold sm:block"
              aria-label="Preview role"
            >
              {roles.map((item) => <option key={item}>{item}</option>)}
            </select>
            <button className="relative grid h-10 w-10 place-items-center rounded-[8px] border border-slate-200" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF5E7D]" />
            </button>
            <a className="hidden h-10 items-center gap-2 rounded-[8px] border border-slate-200 px-3 text-sm font-semibold sm:inline-flex" href="/api/auth/logout">
              <LogOut className="h-4 w-4" />
              Sign out
            </a>
          </div>
          {mobileNavOpen ? (
            <div className="grid grid-cols-2 gap-2 border-t border-slate-200 bg-white p-3 sm:grid-cols-4 lg:hidden">
              {navItems.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setActive(label);
                    setMobileNavOpen(false);
                  }}
                  className={`flex items-center gap-2 rounded-[8px] px-3 py-2 text-left text-xs font-bold ${
                    active === label ? "bg-[#0D1220] text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          ) : null}
        </header>

        <main className="space-y-6 p-4 sm:p-6">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF8A00]">{active}</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-[#0D1220] sm:text-4xl">
                {appSettings.businessName} Operations
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Manage enquiry to warranty across repairs, field service, Digital Literacy, Business IT, 3D printing, communications, documents and finance.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-[#FF8A00] px-4 text-sm font-black text-[#0D1220]">
                <Plus className="h-4 w-4" />
                New Job
              </button>
              <button className="inline-flex h-10 items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-4 text-sm font-bold">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <button className="inline-flex h-10 items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-4 text-sm font-bold">
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>
          </div>

          {active === "Dashboard" ? (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Metric label="Open jobs" value={String(jobs.length)} detail="1 awaiting approval, 1 scheduled" />
                <Metric label="Outstanding invoices" value={formatCurrency(outstanding, appSettings.currency)} detail={appSettings.gstRegistered ? `GST ${Math.round(appSettings.gstRate * 100)}% enabled` : "No GST assumed"} />
                <Metric label="Appointments today" value={String(appointments.length)} detail="On-site, literacy and collection" />
                <Metric label="Quote pending" value={formatCurrency(totals.total, appSettings.currency)} detail={`${quotes[0].number} customer link active`} />
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
                <Panel title="Job Pipeline" action={<StatusBadge value="Live workflow" />}>
                  <Table>
                    <thead><tr><Th>Job</Th><Th>Customer</Th><Th>Type</Th><Th>Status</Th><Th>Next action</Th><Th>Due</Th></tr></thead>
                    <tbody>
                      {filteredJobs.map((job) => (
                        <tr key={job.number}>
                          <Td><span className="font-bold text-[#0D1220]">{job.number}</span><p className="text-xs text-slate-500">{job.device}</p></Td>
                          <Td>{job.customer}</Td>
                          <Td>{job.type}</Td>
                          <Td><StatusBadge value={job.status} /></Td>
                          <Td>{job.nextAction}</Td>
                          <Td>{job.due}</Td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Panel>

                <Panel title="Alerts & Today">
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div key={alert} className="flex gap-3 rounded-[8px] bg-amber-50 p-3 text-sm text-amber-900">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{alert}</span>
                      </div>
                    ))}
                    <div className="border-t border-slate-200 pt-4">
                      {appointments.map((appointment) => (
                        <div key={`${appointment.time}-${appointment.customer}`} className="flex items-start gap-3 py-2">
                          <Clock3 className="mt-0.5 h-4 w-4 text-[#7861FF]" />
                          <div>
                            <p className="text-sm font-bold">{appointment.time} • {appointment.type}</p>
                            <p className="text-xs text-slate-500">{appointment.customer} • {appointment.location} • {appointment.staff}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Panel>
              </div>

              <Panel title="Quick Actions">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
                  {quickActions.map((action) => (
                    <button key={action} className="flex min-h-20 items-center justify-between rounded-[8px] border border-slate-200 bg-slate-50 p-3 text-left text-sm font-bold hover:border-[#FF8A00] hover:bg-white">
                      {action}
                      <ArrowRight className="h-4 w-4 text-[#FF8A00]" />
                    </button>
                  ))}
                </div>
              </Panel>
            </>
          ) : null}

          {active === "Customers" ? (
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Panel title="Customer CRM">
                <Table>
                  <thead><tr><Th>ID</Th><Th>Name</Th><Th>Type</Th><Th>Contact</Th><Th>Area</Th><Th>Tags</Th></tr></thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <Td><span className="font-bold">{customer.id}</span></Td>
                        <Td>{customer.name}<p className="text-xs text-slate-500">{customer.notes}</p></Td>
                        <Td>{customer.type}</Td>
                        <Td><a href={`tel:${customer.phone}`} className="font-semibold text-[#0D1220]">{customer.phone}</a><p><a href={`mailto:${customer.email}`} className="text-xs text-[#7861FF]">{customer.email}</a></p></Td>
                        <Td>{customer.suburb}</Td>
                        <Td><div className="flex flex-wrap gap-1">{customer.tags.map((tag) => <StatusBadge key={tag} value={tag} />)}</div></Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Panel>
              <Panel title="Reusable Devices">
                <div className="space-y-3">
                  {devices.map((device) => (
                    <div key={device.id} className="rounded-[8px] border border-slate-200 p-4">
                      <p className="font-black">{device.brand} {device.model}</p>
                      <p className="text-sm text-slate-600">{device.customer} • {device.type} • Serial {device.serial}</p>
                      <p className="mt-2 text-xs text-slate-500">Service history: {device.history.join(", ")}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          ) : null}

          {active === "Jobs" ? (
            <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
              <Panel title="Guided Intake & Job Creation" action={<StatusBadge value={newJobNumber} />}>
                <div className="grid gap-3">
                  <label className="text-sm font-bold">Customer<select className="mt-1 h-10 w-full rounded-[8px] border border-slate-200 px-3" value={jobDraft.customer} onChange={(event) => setJobDraft({ ...jobDraft, customer: event.target.value })}>{customers.map((customer) => <option key={customer.id}>{customer.name}</option>)}</select></label>
                  <label className="text-sm font-bold">Job type<select className="mt-1 h-10 w-full rounded-[8px] border border-slate-200 px-3" value={jobDraft.type} onChange={(event) => setJobDraft({ ...jobDraft, type: event.target.value })}><option>Computer Repair</option><option>Remote Support</option><option>On-Site Support</option><option>Digital Literacy</option><option>Business IT</option><option>3D Printing</option></select></label>
                  <label className="text-sm font-bold">Customer description<textarea className="mt-1 min-h-28 w-full rounded-[8px] border border-slate-200 p-3" value={jobDraft.summary} onChange={(event) => setJobDraft({ ...jobDraft, summary: event.target.value })} placeholder="Problem, accessories, visible condition, data acknowledgement..." /></label>
                  <div className="grid gap-2">
                    {checklist.map((item) => <label key={item} className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 accent-[#FF8A00]" />{item}</label>)}
                  </div>
                  <button disabled={!can(role, "jobs:write")} className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#0D1220] px-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-45">
                    <Save className="h-4 w-4" />
                    Create Intake, Job and Receipt PDF
                  </button>
                </div>
              </Panel>
              <Panel title="Job Timeline">
                <div className="space-y-4">
                  {timeline.map(({ icon: Icon, event, detail, time }) => (
                    <div key={event} className="flex gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-slate-100 text-[#FF8A00]"><Icon className="h-5 w-5" /></div>
                      <div>
                        <p className="font-bold">{event}<span className="ml-2 text-xs font-medium text-slate-500">{time}</span></p>
                        <p className="text-sm text-slate-600">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          ) : null}

          {active === "Quotes" ? (
            <Panel title="Quotes & Customer Approval">
              <Table>
                <thead><tr><Th>Quote</Th><Th>Customer</Th><Th>Job</Th><Th>Status</Th><Th>Expiry</Th><Th>Total</Th><Th>Approval Link</Th></tr></thead>
                <tbody>
                  {quotes.map((quote) => {
                    const quoteTotals = calculateTotals(quote.items, { gstRegistered: appSettings.gstRegistered });
                    return (
                      <tr key={quote.number}>
                        <Td><span className="font-bold">{quote.number}</span><p className="text-xs text-slate-500">{quote.notes}</p></Td>
                        <Td>{quote.customer}</Td>
                        <Td>{quote.job}</Td>
                        <Td><StatusBadge value={quote.status} /></Td>
                        <Td>{quote.expiry}</Td>
                        <Td>{formatCurrency(quoteTotals.total, appSettings.currency)}</Td>
                        <Td><a className="inline-flex items-center gap-2 rounded-[8px] bg-[#FF8A00] px-3 py-2 text-xs font-black text-[#0D1220]" href={`/q/${quote.token}`}><FileSignature className="h-4 w-4" /> Open</a></Td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <div className="mt-4 rounded-[8px] bg-emerald-50 p-4 text-sm text-emerald-900">
                Approval will set quote status to {approvalPreview.quoteStatus} and job status to {approvalPreview.jobStatus}, with an audit event recorded.
              </div>
            </Panel>
          ) : null}

          {active === "Invoices" || active === "Payments" ? (
            <Panel title="Invoices, Payments & Receipts">
              <Table>
                <thead><tr><Th>Invoice</Th><Th>Customer</Th><Th>Job</Th><Th>Status</Th><Th>Total</Th><Th>Paid</Th><Th>Balance</Th></tr></thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.number}>
                      <Td><span className="font-bold">{invoice.number}</span></Td>
                      <Td>{invoice.customer}</Td>
                      <Td>{invoice.job}</Td>
                      <Td><StatusBadge value={invoice.status} /></Td>
                      <Td>{formatCurrency(invoice.total, appSettings.currency)}</Td>
                      <Td>{formatCurrency(invoice.paid, appSettings.currency)}</Td>
                      <Td>{formatCurrency(invoice.total - invoice.paid, appSettings.currency)}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <Metric label="GST registered" value={appSettings.gstRegistered ? "Yes" : "No"} detail={appSettings.gstRegistered ? "Invoices use Tax Invoice wording" : "Invoices avoid Tax Invoice wording"} />
                <Metric label="Payment methods" value="5" detail="Cash, card, transfer, online, other" />
                <Metric label="Exports" value="Ready" detail="Invoices, payments and customers" />
              </div>
            </Panel>
          ) : null}

          {active === "Calendar" ? (
            <Panel title="Bookings Calendar">
              <div className="grid gap-3 md:grid-cols-3">
                {appointments.map((appointment) => (
                  <div key={`${appointment.time}-${appointment.customer}`} className="rounded-[8px] border border-slate-200 p-4">
                    <p className="text-sm font-bold text-[#FF8A00]">{appointment.time}</p>
                    <p className="mt-1 font-black">{appointment.type}</p>
                    <p className="text-sm text-slate-600">{appointment.customer} • {appointment.location}</p>
                    <p className="mt-3 text-xs font-semibold text-slate-500">Assigned: {appointment.staff}</p>
                  </div>
                ))}
              </div>
            </Panel>
          ) : null}

          {active === "Digital Literacy" ? (
            <Panel title="Digital Literacy Module">
              <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="text-sm font-bold uppercase text-[#FF8A00]">{digitalLiteracy.profileNumber}</p>
                  <h2 className="mt-1 text-2xl font-black">{digitalLiteracy.client}</h2>
                  <p className="mt-2 text-sm text-slate-600">Confidence: {digitalLiteracy.confidence} • Next session {digitalLiteracy.nextSession}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{digitalLiteracy.goals.map((goal) => <StatusBadge key={goal} value={goal} />)}</div>
                </div>
                <Table>
                  <thead><tr><Th>Skill</Th><Th>Progress</Th><Th>Review</Th></tr></thead>
                  <tbody>{digitalLiteracy.skills.map((skill) => <tr key={skill.name}><Td>{skill.name}</Td><Td><StatusBadge value={skill.level} /></Td><Td>{skill.review}</Td></tr>)}</tbody>
                </Table>
              </div>
            </Panel>
          ) : null}

          {active === "Business IT" ? (
            <Panel title="Business IT Sites & Network Assets">
              <div className="mb-5 rounded-[8px] bg-slate-50 p-4">
                <p className="font-black">{businessIt.business} • {businessIt.site}</p>
                <p className="text-sm text-slate-600">{businessIt.assessment}</p>
              </div>
              <Table>
                <thead><tr><Th>Type</Th><Th>Make</Th><Th>Model</Th><Th>IP</Th><Th>Location</Th></tr></thead>
                <tbody>{businessIt.assets.map((asset) => <tr key={`${asset.type}-${asset.ip}`}><Td>{asset.type}</Td><Td>{asset.make}</Td><Td>{asset.model}</Td><Td>{asset.ip}</Td><Td>{asset.location}</Td></tr>)}</tbody>
              </Table>
              <p className="mt-4 text-sm text-slate-500">Credentials are intentionally excluded from plain text fields; use a future encrypted credentials vault if storage is unavoidable.</p>
            </Panel>
          ) : null}

          {active === "3D Printing" ? (
            <Panel title="3D Printing Jobs">
              <Table>
                <thead><tr><Th>Number</Th><Th>Customer</Th><Th>Part</Th><Th>Material</Th><Th>Status</Th><Th>Charge</Th></tr></thead>
                <tbody>{threeDPrinting.map((job) => <tr key={job.number}><Td><span className="font-bold">{job.number}</span></Td><Td>{job.customer}</Td><Td>{job.part}<p className="text-xs text-slate-500">Design required: {job.designRequired ? "Yes" : "No"}</p></Td><Td>{job.material} • {job.colour}</Td><Td><StatusBadge value={job.status} /></Td><Td>{formatCurrency(job.charge, appSettings.currency)}</Td></tr>)}</tbody>
              </Table>
            </Panel>
          ) : null}

          {active === "Parts" ? (
            <Panel title="Parts Tracking">
              <Table>
                <thead><tr><Th>Part</Th><Th>Supplier</Th><Th>Job</Th><Th>Status</Th><Th>ETA</Th><Th>Cost</Th><Th>Sell</Th></tr></thead>
                <tbody>{parts.map((part) => <tr key={part.name}><Td>{part.name}</Td><Td>{part.supplier}</Td><Td>{part.job}</Td><Td><StatusBadge value={part.status} /></Td><Td>{part.eta}</Td><Td>{formatCurrency(part.cost, appSettings.currency)}</Td><Td>{formatCurrency(part.sell, appSettings.currency)}</Td></tr>)}</tbody>
              </Table>
            </Panel>
          ) : null}

          {active === "Documents" ? (
            <Panel title="Server-side PDF Document Queue" action={<button className="inline-flex items-center gap-2 rounded-[8px] border border-slate-200 px-3 py-2 text-xs font-bold"><Upload className="h-4 w-4" /> Upload file</button>}>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {documents.map((document) => (
                  <button key={document} className="flex items-center justify-between rounded-[8px] border border-slate-200 bg-slate-50 p-4 text-left text-sm font-bold">
                    {document}
                    <Send className="h-4 w-4 text-[#FF8A00]" />
                  </button>
                ))}
              </div>
            </Panel>
          ) : null}

          {active === "Communications" ? (
            <Panel title="Communication Log & Provider Adapters">
              <Table>
                <thead><tr><Th>Time</Th><Th>Type</Th><Th>Direction</Th><Th>Customer</Th><Th>Job</Th><Th>Subject</Th><Th>Status</Th></tr></thead>
                <tbody>{communications.map((message) => <tr key={`${message.time}-${message.subject}`}><Td>{message.time}</Td><Td>{message.type}</Td><Td>{message.direction}</Td><Td>{message.customer}</Td><Td>{message.job}</Td><Td>{message.subject}</Td><Td><StatusBadge value={message.status} /></Td></tr>)}</tbody>
              </Table>
            </Panel>
          ) : null}

          {active === "Tasks" ? (
            <Panel title="Internal Tasks">
              <div className="grid gap-3 md:grid-cols-3">
                {["Order battery after approval", "Send digital literacy summary", "Confirm dental site visit"].map((task, index) => (
                  <div key={task} className="rounded-[8px] border border-slate-200 p-4">
                    <p className="font-black">{task}</p>
                    <p className="mt-2 text-sm text-slate-600">Priority {index === 0 ? "High" : "Normal"} • Assigned to {index === 1 ? "Cal" : "Support"}</p>
                  </div>
                ))}
              </div>
            </Panel>
          ) : null}

          {active === "Reports" ? (
            <Panel title="Reports">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {reports.map((report) => <Metric key={report.label} label={report.label} value={report.value} detail={report.trend} />)}
              </div>
            </Panel>
          ) : null}

          {active === "Settings" ? (
            <SettingsPanel settings={appSettings} onChange={setAppSettings} role={role} />
          ) : null}

          <footer className="rounded-[8px] border border-slate-200 bg-white p-4 text-xs text-slate-500">
            {appSettings.businessName} • {appSettings.tagline} • Built for private operational use, with only quote approval links exposed publicly.
          </footer>
        </main>
      </div>
    </div>
  );
}
