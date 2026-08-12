import {
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  ClipboardCheck,
  CreditCard,
  FileText,
  HardDrive,
  History,
  Home,
  Inbox,
  MessageSquare,
  Package,
  Printer,
  Receipt,
  Search,
  Settings,
  Signature,
  UsersRound,
  Wrench,
} from "lucide-react";
import { roleValues, type LineItem } from "@/lib/workflows";

export const roles = [...roleValues];

export const navItems = [
  { label: "Dashboard", icon: Home },
  { label: "Customers", icon: UsersRound },
  { label: "Jobs", icon: Wrench },
  { label: "Calendar", icon: CalendarDays },
  { label: "Quotes", icon: FileText },
  { label: "Invoices", icon: Receipt },
  { label: "Payments", icon: CreditCard },
  { label: "Digital Literacy", icon: BookOpen },
  { label: "Business IT", icon: BriefcaseBusiness },
  { label: "3D Printing", icon: Printer },
  { label: "Parts", icon: Package },
  { label: "Documents", icon: ClipboardCheck },
  { label: "Communications", icon: MessageSquare },
  { label: "Tasks", icon: Inbox },
  { label: "Reports", icon: Search },
  { label: "Settings", icon: Settings },
] as const;

export const settings = {
  businessName: "Sunset Country Tech",
  tagline: "Repairs • IT Support • Digital Literacy • Installations",
  currency: "AUD",
  gstRegistered: false,
  gstRate: 0.1,
  serviceAreas: ["Mildura", "Irymple", "Red Cliffs", "Merbein", "Buronga", "Gol Gol", "Wentworth"],
  numbering: {
    job: "SCT",
    quote: "Q-SCT",
    invoice: "INV-SCT",
    receipt: "REC-SCT",
    warranty: "WAR-SCT",
    digitalLiteracy: "DL-SCT",
    threeDPrinting: "3DP-SCT",
  },
};

export const customers = [
  {
    id: "CUST-1042",
    name: "Mia Thompson",
    type: "Individual",
    phone: "0400 123 456",
    email: "mia@example.test",
    suburb: "Irymple",
    preferredContact: "SMS",
    tags: ["VIP", "Repeat Customer"],
    lastInteraction: "Today, 10:14",
    notes: "Prefers plain-language summaries and collection after 4 pm.",
  },
  {
    id: "CUST-1043",
    name: "Red Cliffs Dental",
    type: "Business",
    phone: "03 5000 2211",
    email: "admin@redcliffsdental.test",
    suburb: "Red Cliffs",
    preferredContact: "Email",
    tags: ["Business", "Priority"],
    lastInteraction: "Yesterday, 15:30",
    notes: "Three reception computers, shared printer and NAS backup.",
  },
  {
    id: "CUST-1044",
    name: "Leo Nguyen",
    type: "Digital Literacy",
    phone: "0400 987 654",
    email: "leo@example.test",
    suburb: "Mildura",
    preferredContact: "Phone",
    tags: ["Digital Literacy"],
    lastInteraction: "Mon, 09:00",
    notes: "Working on email, files and scam awareness confidence.",
  },
];

export const devices = [
  {
    id: "DEV-661",
    customer: "Mia Thompson",
    type: "Laptop",
    brand: "Lenovo",
    model: "IdeaPad 5",
    serial: "PF4X9SCT",
    warranty: "Unknown",
    history: ["SCT-2026-0008", "SCT-2026-0019"],
  },
  {
    id: "DEV-662",
    customer: "Red Cliffs Dental",
    type: "Printer",
    brand: "Brother",
    model: "MFC-L8900",
    serial: "BR-SCT-221",
    warranty: "Expired",
    history: ["SCT-2026-0017"],
  },
];

export const jobs = [
  {
    number: "SCT-2026-0021",
    customer: "Mia Thompson",
    business: "",
    device: "Lenovo IdeaPad 5",
    type: "Computer Repair",
    status: "Awaiting Approval",
    priority: "High",
    technician: "Cal",
    opened: "2026-08-11",
    due: "2026-08-13",
    location: "Workshop",
    description: "Laptop boots slowly and battery drains quickly.",
    nextAction: "Customer quote approval",
    labourHours: 1.25,
  },
  {
    number: "SCT-2026-0020",
    customer: "Red Cliffs Dental",
    business: "Red Cliffs Dental",
    device: "Brother MFC-L8900",
    type: "Business IT",
    status: "Scheduled",
    priority: "Normal",
    technician: "Ari",
    opened: "2026-08-10",
    due: "2026-08-12",
    location: "On-site",
    description: "Reception printer drops from network during busy periods.",
    nextAction: "Site visit tomorrow",
    labourHours: 0.5,
  },
  {
    number: "SCT-2026-0019",
    customer: "Mia Thompson",
    business: "",
    device: "Lenovo IdeaPad 5",
    type: "Computer Upgrade",
    status: "Ready for Collection",
    priority: "Normal",
    technician: "Cal",
    opened: "2026-08-08",
    due: "2026-08-11",
    location: "Workshop",
    description: "SSD replacement and Windows tune-up.",
    nextAction: "Payment and collection",
    labourHours: 2.1,
  },
];

export const quoteItems: LineItem[] = [
  { description: "Diagnostic and repair labour", quantity: 1.5, unitPrice: 95, taxRate: settings.gstRate },
  { description: "Replacement laptop battery", quantity: 1, unitPrice: 129, taxRate: settings.gstRate },
];

export const quotes = [
  {
    number: "Q-SCT-2026-0007",
    token: "sample-approval-token",
    customer: "Mia Thompson",
    job: "SCT-2026-0021",
    status: "Sent",
    expiry: "2026-08-18",
    viewed: true,
    items: quoteItems,
    notes: "Battery replacement, health check and startup optimisation.",
  },
  {
    number: "Q-SCT-2026-0006",
    token: "business-printer-network",
    customer: "Red Cliffs Dental",
    job: "SCT-2026-0020",
    status: "Draft",
    expiry: "2026-08-20",
    viewed: false,
    items: [
      { description: "On-site network assessment", quantity: 1, unitPrice: 140, taxRate: settings.gstRate },
      { description: "Printer static IP and workstation testing", quantity: 1, unitPrice: 85, taxRate: settings.gstRate },
    ],
    notes: "Draft pending site assessment confirmation.",
  },
];

export const invoices = [
  {
    number: "INV-SCT-2026-0009",
    customer: "Mia Thompson",
    job: "SCT-2026-0019",
    status: "Awaiting Payment",
    due: "2026-08-11",
    total: 318,
    paid: 0,
  },
  {
    number: "INV-SCT-2026-0008",
    customer: "Sunraysia Makers Club",
    job: "3DP-SCT-2026-0004",
    status: "Paid",
    due: "2026-08-09",
    total: 86,
    paid: 86,
  },
];

export const appointments = [
  {
    time: "09:30",
    type: "Digital Literacy",
    customer: "Leo Nguyen",
    location: "Mildura Library",
    staff: "Cal",
  },
  {
    time: "13:00",
    type: "Business IT",
    customer: "Red Cliffs Dental",
    location: "Red Cliffs",
    staff: "Ari",
  },
  {
    time: "16:30",
    type: "Device collection",
    customer: "Mia Thompson",
    location: "Workshop",
    staff: "Cal",
  },
];

export const alerts = [
  "Q-SCT-2026-0007 viewed, awaiting approval",
  "INV-SCT-2026-0009 due today",
  "Part ETA missing for SCT-2026-0021",
  "Leo needs follow-up practice tasks after today",
  "Warranty review due for WAR-SCT-2026-0002",
];

export const parts = [
  {
    name: "Lenovo IdeaPad 5 battery",
    supplier: "Parts Supplier AU",
    job: "SCT-2026-0021",
    status: "Needed",
    eta: "Awaiting quote approval",
    cost: 82,
    sell: 129,
  },
  {
    name: "Cat6 patch leads",
    supplier: "Local electrical wholesaler",
    job: "SCT-2026-0020",
    status: "Ordered",
    eta: "2026-08-12",
    cost: 18,
    sell: 32,
  },
];

export const digitalLiteracy = {
  client: "Leo Nguyen",
  profileNumber: "DL-SCT-2026-0003",
  confidence: "Learning",
  goals: ["Send email with attachments", "Organise files", "Recognise scam messages"],
  topics: ["Email", "Files", "Scam Awareness", "Passwords"],
  skills: [
    { name: "Email attachments", level: "Can do with help", review: "2026-08-25" },
    { name: "File folders", level: "Learning", review: "2026-08-25" },
    { name: "Scam awareness", level: "Mostly independent", review: "2026-09-01" },
  ],
  nextSession: "2026-08-18 09:30",
};

export const businessIt = {
  business: "Red Cliffs Dental",
  site: "Main clinic",
  internetProvider: "NBN provider",
  assets: [
    { type: "Router", make: "Ubiquiti", model: "UXG Lite", ip: "192.168.10.1", location: "Comms shelf" },
    { type: "Printer", make: "Brother", model: "MFC-L8900", ip: "192.168.10.45", location: "Reception" },
    { type: "NAS", make: "Synology", model: "DS224+", ip: "192.168.10.20", location: "Office" },
  ],
  assessment: "Document current printer drops, backup status and Wi-Fi coverage.",
};

export const threeDPrinting = [
  {
    number: "3DP-SCT-2026-0005",
    customer: "Sunraysia Makers Club",
    part: "Camera tripod adaptor",
    material: "PETG",
    colour: "Black",
    status: "Ready to Print",
    designRequired: true,
    charge: 48,
  },
  {
    number: "3DP-SCT-2026-0004",
    customer: "Mia Thompson",
    part: "Router wall clip",
    material: "PLA+",
    colour: "White",
    status: "Complete",
    designRequired: false,
    charge: 38,
  },
];

export const communications = [
  {
    type: "SMS",
    direction: "Outbound",
    customer: "Mia Thompson",
    job: "SCT-2026-0021",
    subject: "Quote ready",
    status: "Delivered",
    time: "Today 11:02",
  },
  {
    type: "Phone",
    direction: "Inbound",
    customer: "Red Cliffs Dental",
    job: "SCT-2026-0020",
    subject: "Printer outage",
    status: "Logged",
    time: "Yesterday 15:30",
  },
];

export const timeline = [
  { icon: History, event: "Job created", detail: "SCT-2026-0021 opened by Support", time: "Today 09:12" },
  { icon: HardDrive, event: "Diagnostic note", detail: "Battery wear high, startup apps excessive", time: "Today 10:02" },
  { icon: FileText, event: "Quote sent", detail: "Q-SCT-2026-0007 sent by email and SMS", time: "Today 11:02" },
  { icon: Camera, event: "Photos attached", detail: "Bottom cover and battery label uploaded", time: "Today 11:08" },
  { icon: Signature, event: "Awaiting signature", detail: "Customer approval link is active", time: "Now" },
];

export const documents = [
  "Device intake receipt",
  "Quote PDF",
  "Diagnostic report",
  "Service report",
  "Invoice",
  "Payment receipt",
  "Warranty receipt",
  "Digital literacy summary",
  "IT site assessment",
  "3D print order",
  "Data transfer authorisation",
];

export const reports = [
  { label: "Jobs by status", value: "14 open", trend: "+3 this week" },
  { label: "Average turnaround", value: "2.8 days", trend: "-0.4 days" },
  { label: "Quote approval rate", value: "78%", trend: "+5%" },
  { label: "Revenue this month", value: "$4,680", trend: "GST off" },
  { label: "Outstanding invoices", value: "$318", trend: "1 due today" },
  { label: "Digital literacy sessions", value: "9", trend: "3 booked" },
];

export const checklist = [
  "Confirm customer and preferred contact",
  "Record device serial and condition photos",
  "Capture data acknowledgement",
  "Add diagnostic notes and internal notes",
  "Create quote or mark no-quote repair",
  "Generate customer document",
  "Record payment and collection signature",
];

export const quickActions = [
  "New Customer",
  "New Job",
  "New Quote",
  "New Appointment",
  "Record Payment",
  "Start Digital Literacy Session",
  "Create 3D Print Job",
];
