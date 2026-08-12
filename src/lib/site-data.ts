import {
  BookOpenCheck,
  BriefcaseBusiness,
  Camera,
  Cpu,
  GraduationCap,
  HardDrive,
  Home,
  MonitorCog,
  Network,
  Printer,
  Router,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/digital-literacy", label: "Digital Literacy" },
  { href: "/business-it", label: "Business IT" },
  { href: "/3d-printing", label: "3D Printing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const serviceCards = [
  { title: "Computer Repairs", description: "Desktop, laptop, software and hardware troubleshooting.", icon: Wrench },
  { title: "Computer Upgrades", description: "SSD, RAM, storage and performance improvements.", icon: HardDrive },
  { title: "PC Builds", description: "Custom builds, gaming upgrades and practical component advice.", icon: Cpu },
  { title: "Home Tech Support", description: "Friendly help with devices, accounts, email and setup.", icon: Home },
  { title: "Wi-Fi & Networking", description: "Routers, mesh Wi-Fi, Ethernet and coverage problems.", icon: Router },
  { title: "Printers", description: "Printer setup, connection problems, scanning and troubleshooting.", icon: Printer },
  { title: "Security Cameras", description: "Camera, smart doorbell and basic home security setup.", icon: Camera },
  { title: "Smart Home", description: "Smart devices, streaming gear and Home Assistant support.", icon: MonitorCog },
  { title: "Digital Literacy", description: "One-on-one technology help at your own pace.", icon: GraduationCap },
  { title: "Business IT", description: "Everyday IT support for small local businesses.", icon: BriefcaseBusiness },
  { title: "3D Printing", description: "Custom clips, brackets, mounts, enclosures and prototypes.", icon: Sparkles },
  { title: "Remote Support", description: "Help from a distance when an on-site visit is not needed.", icon: Network },
];

export const pillarCards = [
  {
    label: "FIX IT",
    title: "Computer repairs, troubleshooting and upgrades.",
    items: ["Laptop and desktop repairs", "Slow computers", "SSD and RAM upgrades", "Software issues", "PC repairs"],
    href: "/services#repairs",
    cta: "Repair Services",
    icon: Wrench,
  },
  {
    label: "SET IT UP",
    title: "New technology without the headache.",
    items: ["Computers", "Printers", "Wi-Fi", "Routers", "Cameras", "Smart devices"],
    href: "/services#installations",
    cta: "Setup & Installation",
    icon: Router,
  },
  {
    label: "LEARN IT",
    title: "Feel more confident using technology.",
    items: ["Computer basics", "Email", "Internet", "Online safety", "Smartphones", "Digital skills"],
    href: "/digital-literacy",
    cta: "Digital Literacy",
    icon: BookOpenCheck,
  },
  {
    label: "IMPROVE IT",
    title: "Make your technology work better.",
    items: ["PC upgrades", "Better Wi-Fi", "Networking", "Custom setups", "3D printing"],
    href: "/services#solutions",
    cta: "Explore Solutions",
    icon: ShieldCheck,
  },
];

export const faqs = [
  ["What types of technology do you work with?", "Computers, printers, Wi-Fi, smart home devices, cameras, phones, tablets, software, accounts and custom technology setups."],
  ["Do you only repair computers?", "No. Repairs are one part of the service. Sunset Country Tech also helps with setup, learning, installations, Wi-Fi, business IT and 3D printing."],
  ["Do you offer home visits?", "Yes, on-site help may be available across Mildura and Sunraysia depending on the job and location."],
  ["Can you help with Wi-Fi problems?", "Yes. That can include router setup, mesh Wi-Fi, weak signal, Ethernet and device connection issues."],
  ["Can you help me learn how to use my computer?", "Yes. Digital literacy sessions are friendly, practical and paced around what you want to do."],
  ["What is digital literacy?", "It means building confidence with everyday technology: devices, email, online safety, files, forms, apps and more."],
  ["Can you help small businesses?", "Yes. The focus is practical support for small businesses that need help without a large managed-service arrangement."],
  ["Can you make custom 3D printed parts?", "Yes. Custom parts, brackets, mounts, clips, enclosures and simple prototypes may be available after reviewing the design and use case."],
  ["Do you offer remote support?", "Yes, remote support can be suitable for software, email, account, setup and troubleshooting problems."],
  ["What areas do you service?", "Mildura, Irymple, Red Cliffs, Merbein, Nichols Point, Buronga, Gol Gol, Wentworth and surrounding areas by arrangement."],
  ["How do quotes work?", "Describe what is happening first. The next step depends on the issue, parts required, travel and whether remote or on-site help is best."],
];

export const contactServices = [
  "Computer Repair",
  "Computer Upgrade",
  "PC Build",
  "Home Tech Support",
  "Digital Literacy",
  "Wi-Fi / Networking",
  "Printer",
  "Security Cameras",
  "Smart Home",
  "Business IT",
  "3D Printing",
  "Remote Support",
  "Other",
];

export const literacyGroups: Array<[string, string[]]> = [
  ["Getting Started", ["Mouse and keyboard", "Windows", "macOS", "Files and folders", "Apps"]],
  ["Internet & Email", ["Browsing", "Search", "Email", "Attachments", "Video calls", "Online forms"]],
  ["Staying Safe Online", ["Passwords", "MFA", "Scam awareness", "Suspicious emails", "Remote access scams", "Updates", "Backups"]],
  ["Everyday Technology", ["Smartphones", "Tablets", "Photos", "Printing", "Scanning", "Cloud storage", "Online services"]],
  ["Productivity", ["Word", "Excel", "PowerPoint"]],
  ["More Technical Skills", ["PC building", "Networking", "3D printing", "CAD", "Beginner coding"]],
];

export const serviceGroups: Array<[string, string[]]> = [
  ["Repairs", ["Desktop repairs", "Laptop repairs", "Computer troubleshooting", "Hardware problems", "Software problems", "Windows problems", "Slow computers", "SSD upgrades", "RAM upgrades", "Storage upgrades", "PC maintenance", "Gaming PC upgrades", "Custom PC builds"]],
  ["IT Support", ["New computer setup", "Printer setup", "Email setup", "Software installation", "File transfers", "Backup setup", "Remote support", "Home visits", "Small business support"]],
  ["Installations", ["Wi-Fi setup", "Mesh Wi-Fi", "Router setup", "Ethernet", "Home networking", "Security camera setup", "Smart doorbells", "Smart home devices", "Streaming devices"]],
  ["3D Printing", ["Custom parts", "Replacement clips", "Brackets", "Mounts", "Small enclosures", "Prototypes", "Technology accessories", "Basic CAD design"]],
];
