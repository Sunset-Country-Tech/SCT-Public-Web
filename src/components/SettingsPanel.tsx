"use client";

import {
  BadgeCheck,
  CircleDollarSign,
  KeyRound,
  Plus,
  Save,
  Shield,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { can, type Role } from "@/lib/workflows";

export type OperationsSettings = {
  businessName: string;
  tradingName: string;
  abn: string;
  phone: string;
  email: string;
  website: string;
  tagline: string;
  currency: string;
  gstRegistered: boolean;
  gstRate: number;
  labourRate: number;
  travelRate: number;
  serviceAreas: string[];
  jobStatuses: string[];
  jobTypes: string[];
  priorities: string[];
  tags: string[];
  numbering: {
    job: string;
    quote: string;
    invoice: string;
    receipt: string;
    warranty: string;
    digitalLiteracy: string;
    threeDPrinting: string;
  };
  documentTerms: string;
  warrantyPolicy: string;
  emailProvider: string;
  smsProvider: string;
  accountingProvider: string;
  calendarProvider: string;
  fileStorage: string;
};

type SettingsPanelProps = {
  settings: OperationsSettings;
  onChange: (settings: OperationsSettings) => void;
  role: Role;
};

const sections = ["Business", "Finance", "Jobs", "Documents", "Users", "Integrations"] as const;

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-bold text-slate-800">
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-10 w-full rounded-[8px] border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#FF8A00] disabled:bg-slate-100"
    />
  );
}

function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="h-10 w-full rounded-[8px] border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#FF8A00] disabled:bg-slate-100"
    />
  );
}

function ListEditor({
  title,
  items,
  placeholder,
  disabled,
  onChange,
}: {
  title: string;
  items: string[];
  placeholder: string;
  disabled: boolean;
  onChange: (items: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function addItem() {
    const value = draft.trim();
    if (!value || items.some((item) => item.toLowerCase() === value.toLowerCase())) {
      return;
    }
    onChange([...items, value]);
    setDraft("");
  }

  return (
    <div className="rounded-[8px] border border-slate-200 p-4">
      <p className="font-black">{title}</p>
      <div className="mt-3 flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addItem();
            }
          }}
          disabled={disabled}
          placeholder={placeholder}
          className="h-10 min-w-0 flex-1 rounded-[8px] border border-slate-200 px-3 text-sm outline-none focus:border-[#FF8A00] disabled:bg-slate-100"
        />
        <button
          type="button"
          onClick={addItem}
          disabled={disabled}
          className="grid h-10 w-10 place-items-center rounded-[8px] bg-[#FF8A00] text-[#0D1220] disabled:opacity-40"
          aria-label={`Add ${title}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            {item}
            <button
              type="button"
              onClick={() => onChange(items.filter((candidate) => candidate !== item))}
              disabled={disabled}
              className="rounded-full p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-800 disabled:hidden"
              aria-label={`Remove ${item}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SettingsPanel({ settings, onChange, role }: SettingsPanelProps) {
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]>("Business");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [previewRole, setPreviewRole] = useState<Role>("Technician");
  const [invite, setInvite] = useState({ email: "", name: "", role: "Technician" as Role });
  const [invites, setInvites] = useState<typeof invite[]>([]);
  const canWrite = can(role, "settings:write");
  const invoiceLabel = settings.gstRegistered ? "Tax Invoice" : "Invoice";

  const permissionPreview = useMemo(
    () => [
      ["Customers", can(previewRole, "customers:write")],
      ["Jobs", can(previewRole, "jobs:write")],
      ["Quotes", can(previewRole, "quotes:write")],
      ["Invoices", can(previewRole, "invoices:write")],
      ["Payments", can(previewRole, "payments:write")],
      ["Settings", can(previewRole, "settings:write")],
    ],
    [previewRole],
  );

  function update<Key extends keyof OperationsSettings>(key: Key, value: OperationsSettings[Key]) {
    onChange({ ...settings, [key]: value });
    setSavedAt(null);
  }

  function updateNumbering<Key extends keyof OperationsSettings["numbering"]>(
    key: Key,
    value: OperationsSettings["numbering"][Key],
  ) {
    onChange({ ...settings, numbering: { ...settings.numbering, [key]: value } });
    setSavedAt(null);
  }

  function saveSettings() {
    window.localStorage.setItem("sct-operations-settings", JSON.stringify(settings));
    setSavedAt(new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" }));
  }

  return (
    <section className="rounded-[8px] border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-950">Settings</h2>
          <p className="mt-1 text-sm text-slate-500">Configure business details, finance rules, workflow lists, documents, users and integrations.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {savedAt ? <span className="text-xs font-bold text-emerald-700">Saved {savedAt}</span> : null}
          <button
            type="button"
            onClick={saveSettings}
            disabled={!canWrite}
            className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-[#FF8A00] px-4 text-sm font-black text-[#0D1220] disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Save className="h-4 w-4" />
            Save Settings
          </button>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 overflow-x-auto border-b border-slate-200 p-3 lg:block lg:border-b-0 lg:border-r">
          {sections.map((section) => (
            <button
              key={section}
              type="button"
              onClick={() => setActiveSection(section)}
              className={`whitespace-nowrap rounded-[8px] px-3 py-2 text-left text-sm font-bold lg:mb-1 lg:block lg:w-full ${
                activeSection === section ? "bg-[#0D1220] text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {section}
            </button>
          ))}
        </nav>

        <div className="p-5">
          {!canWrite ? (
            <div className="mb-5 rounded-[8px] bg-amber-50 p-4 text-sm font-semibold text-amber-900">
              Your current role can view settings, but cannot save changes.
            </div>
          ) : null}

          {activeSection === "Business" ? (
            <div className="grid gap-4 xl:grid-cols-2">
              <Field label="Business name"><TextInput disabled={!canWrite} value={settings.businessName} onChange={(event) => update("businessName", event.target.value)} /></Field>
              <Field label="Trading name"><TextInput disabled={!canWrite} value={settings.tradingName} onChange={(event) => update("tradingName", event.target.value)} /></Field>
              <Field label="ABN"><TextInput disabled={!canWrite} value={settings.abn} onChange={(event) => update("abn", event.target.value)} /></Field>
              <Field label="Phone"><TextInput disabled={!canWrite} value={settings.phone} onChange={(event) => update("phone", event.target.value)} /></Field>
              <Field label="Email"><TextInput disabled={!canWrite} value={settings.email} onChange={(event) => update("email", event.target.value)} /></Field>
              <Field label="Website"><TextInput disabled={!canWrite} value={settings.website} onChange={(event) => update("website", event.target.value)} /></Field>
              <div className="xl:col-span-2">
                <Field label="Footer tagline"><TextInput disabled={!canWrite} value={settings.tagline} onChange={(event) => update("tagline", event.target.value)} /></Field>
              </div>
              <div className="xl:col-span-2">
                <ListEditor title="Service areas" items={settings.serviceAreas} placeholder="Add suburb or region" disabled={!canWrite} onChange={(items) => update("serviceAreas", items)} />
              </div>
            </div>
          ) : null}

          {activeSection === "Finance" ? (
            <div className="grid gap-4 xl:grid-cols-3">
              <div className="rounded-[8px] border border-slate-200 p-4 xl:col-span-3">
                <label className="flex items-center gap-3 text-sm font-black">
                  <input
                    type="checkbox"
                    checked={settings.gstRegistered}
                    onChange={(event) => update("gstRegistered", event.target.checked)}
                    disabled={!canWrite}
                    className="h-5 w-5 accent-[#FF8A00]"
                  />
                  GST registered
                </label>
                <p className="mt-2 text-sm text-slate-600">Document label preview: <span className="font-black">{invoiceLabel}</span>. Totals update across quotes and invoices immediately.</p>
              </div>
              <Field label="Currency"><SelectInput disabled={!canWrite} value={settings.currency} onChange={(event) => update("currency", event.target.value)}><option>AUD</option><option>NZD</option><option>USD</option></SelectInput></Field>
              <Field label="GST rate"><TextInput disabled={!canWrite || !settings.gstRegistered} type="number" min="0" step="0.01" value={settings.gstRate} onChange={(event) => update("gstRate", Number(event.target.value))} /></Field>
              <Field label="Default labour rate"><TextInput disabled={!canWrite} type="number" min="0" value={settings.labourRate} onChange={(event) => update("labourRate", Number(event.target.value))} /></Field>
              <Field label="Default travel rate"><TextInput disabled={!canWrite} type="number" min="0" value={settings.travelRate} onChange={(event) => update("travelRate", Number(event.target.value))} /></Field>
              <div className="rounded-[8px] bg-slate-50 p-4 xl:col-span-2">
                <CircleDollarSign className="h-6 w-6 text-[#FF8A00]" />
                <p className="mt-3 font-black">Finance behavior</p>
                <p className="mt-1 text-sm text-slate-600">When GST is off, generated documents avoid Tax Invoice wording and tax lines calculate as zero.</p>
              </div>
            </div>
          ) : null}

          {activeSection === "Jobs" ? (
            <div className="grid gap-4 xl:grid-cols-2">
              <ListEditor title="Job statuses" items={settings.jobStatuses} placeholder="Add status" disabled={!canWrite} onChange={(items) => update("jobStatuses", items)} />
              <ListEditor title="Job types" items={settings.jobTypes} placeholder="Add job type" disabled={!canWrite} onChange={(items) => update("jobTypes", items)} />
              <ListEditor title="Priorities" items={settings.priorities} placeholder="Add priority" disabled={!canWrite} onChange={(items) => update("priorities", items)} />
              <ListEditor title="Customer tags" items={settings.tags} placeholder="Add tag" disabled={!canWrite} onChange={(items) => update("tags", items)} />
            </div>
          ) : null}

          {activeSection === "Documents" ? (
            <div className="grid gap-4 xl:grid-cols-3">
              {Object.entries(settings.numbering).map(([key, value]) => (
                <Field key={key} label={`${key} prefix`}>
                  <TextInput disabled={!canWrite} value={value} onChange={(event) => updateNumbering(key as keyof OperationsSettings["numbering"], event.target.value)} />
                </Field>
              ))}
              <div className="xl:col-span-3">
                <Field label="Default terms"><textarea disabled={!canWrite} value={settings.documentTerms} onChange={(event) => update("documentTerms", event.target.value)} className="min-h-28 w-full rounded-[8px] border border-slate-200 p-3 text-sm outline-none focus:border-[#FF8A00] disabled:bg-slate-100" /></Field>
              </div>
              <div className="xl:col-span-3">
                <Field label="Warranty policy"><textarea disabled={!canWrite} value={settings.warrantyPolicy} onChange={(event) => update("warrantyPolicy", event.target.value)} className="min-h-28 w-full rounded-[8px] border border-slate-200 p-3 text-sm outline-none focus:border-[#FF8A00] disabled:bg-slate-100" /></Field>
              </div>
            </div>
          ) : null}

          {activeSection === "Users" ? (
            <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[8px] border border-slate-200 p-4">
                <KeyRound className="h-6 w-6 text-[#7861FF]" />
                <p className="mt-3 font-black">Invite staff account</p>
                <div className="mt-4 grid gap-3">
                  <TextInput disabled={!canWrite} placeholder="Name" value={invite.name} onChange={(event) => setInvite({ ...invite, name: event.target.value })} />
                  <TextInput disabled={!canWrite} placeholder="Email" value={invite.email} onChange={(event) => setInvite({ ...invite, email: event.target.value })} />
                  <SelectInput disabled={!canWrite} value={invite.role} onChange={(event) => setInvite({ ...invite, role: event.target.value as Role })}>
                    {(["Owner", "Admin", "Technician", "Support", "Accounts", "Read Only"] as Role[]).map((item) => <option key={item}>{item}</option>)}
                  </SelectInput>
                  <button
                    type="button"
                    disabled={!canWrite || !invite.email || !invite.name}
                    onClick={() => {
                      setInvites([...invites, invite]);
                      setInvite({ email: "", name: "", role: "Technician" });
                    }}
                    className="h-10 rounded-[8px] bg-[#0D1220] text-sm font-black text-white disabled:opacity-40"
                  >
                    Queue Invite
                  </button>
                </div>
              </div>
              <div className="rounded-[8px] border border-slate-200 p-4">
                <Shield className="h-6 w-6 text-[#FF5E7D]" />
                <p className="mt-3 font-black">Permission preview</p>
                <div className="mt-3 max-w-xs">
                  <SelectInput value={previewRole} onChange={(event) => setPreviewRole(event.target.value as Role)}>
                    {(["Owner", "Admin", "Technician", "Support", "Accounts", "Read Only"] as Role[]).map((item) => <option key={item}>{item}</option>)}
                  </SelectInput>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {permissionPreview.map(([label, allowed]) => (
                    <div key={label as string} className="flex items-center justify-between rounded-[8px] bg-slate-50 p-3 text-sm">
                      <span className="font-bold">{label as string}</span>
                      <span className={allowed ? "font-black text-emerald-700" : "font-black text-slate-400"}>{allowed ? "Allowed" : "View only"}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  {invites.map((item) => (
                    <div key={item.email} className="flex items-center justify-between rounded-[8px] border border-slate-200 p-3 text-sm">
                      <span><strong>{item.name}</strong> • {item.email} • {item.role}</span>
                      <button type="button" onClick={() => setInvites(invites.filter((candidate) => candidate.email !== item.email))} className="text-red-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {activeSection === "Integrations" ? (
            <div className="grid gap-4 xl:grid-cols-2">
              <Field label="Email provider"><SelectInput disabled={!canWrite} value={settings.emailProvider} onChange={(event) => update("emailProvider", event.target.value)}><option>none</option><option>smtp</option><option>api</option></SelectInput></Field>
              <Field label="SMS provider"><SelectInput disabled={!canWrite} value={settings.smsProvider} onChange={(event) => update("smsProvider", event.target.value)}><option>none</option><option>sms-gate</option><option>api</option></SelectInput></Field>
              <Field label="Accounting provider"><SelectInput disabled={!canWrite} value={settings.accountingProvider} onChange={(event) => update("accountingProvider", event.target.value)}><option>none</option><option>hnry-export</option><option>xero</option><option>myob</option><option>csv</option></SelectInput></Field>
              <Field label="Calendar provider"><SelectInput disabled={!canWrite} value={settings.calendarProvider} onChange={(event) => update("calendarProvider", event.target.value)}><option>none</option><option>google-calendar</option><option>outlook-calendar</option></SelectInput></Field>
              <Field label="File storage"><TextInput disabled={!canWrite} value={settings.fileStorage} onChange={(event) => update("fileStorage", event.target.value)} /></Field>
              <div className="rounded-[8px] bg-emerald-50 p-4 text-sm text-emerald-900">
                <p className="font-black"><BadgeCheck className="mr-2 inline h-4 w-4" />Integration adapters stay decoupled</p>
                <p className="mt-2">Changing provider settings here affects configuration only; API keys should remain environment secrets.</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
