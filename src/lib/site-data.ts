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
  { title: "Computer Repairs", description: "Laptop and desktop repairs, slow computers, Windows issues and practical fault finding.", icon: "/brand/icon-repairs.png", href: "/services#repairs" },
  { title: "Computer Upgrades", description: "SSD, RAM, storage and performance upgrades that make older machines feel useful again.", icon: "/brand/icon-computers.png", href: "/services#repairs" },
  { title: "PC Builds", description: "Custom builds, gaming upgrades and component advice without upselling what you do not need.", icon: "/brand/icon-computers.png", href: "/services#repairs" },
  { title: "Home Tech Support", description: "Friendly help with devices, accounts, email, file transfers, backups and new setup.", icon: "/brand/icon-it-support.png", href: "/services#it-support" },
  { title: "Wi-Fi & Networking", description: "Routers, mesh Wi-Fi, Ethernet, coverage issues and devices that will not stay connected.", icon: "/brand/icon-networking.png", href: "/services#installations" },
  { title: "Printers", description: "Printer setup, connection problems, scanning, sharing and everyday troubleshooting.", icon: "/brand/icon-printers.png", href: "/services#it-support" },
  { title: "Security Cameras", description: "Security camera, smart doorbell and basic home monitoring setup by arrangement.", icon: "/brand/icon-security.png", href: "/services#installations" },
  { title: "Smart Home", description: "Smart devices, streaming boxes, doorbells, sensors and Home Assistant support.", icon: "/brand/icon-smart-home.png", href: "/services#installations" },
  { title: "Digital Literacy", description: "One-on-one technology help at your own pace, with no tests and no judgement.", icon: "/brand/icon-tutoring.png", href: "/digital-literacy" },
  { title: "Business IT", description: "Everyday IT support for small local businesses that just need things working.", icon: "/brand/icon-it-support.png", href: "/business-it" },
  { title: "3D Printing", description: "Custom clips, brackets, mounts, enclosures, prototypes and replacement plastic parts.", icon: "/brand/icon-3d-printing.png", href: "/3d-printing" },
  { title: "Remote Support", description: "Help from a distance when a visit is not needed and the issue can be handled online.", icon: "/brand/icon-networking.png", href: "/services#it-support" },
];

export const pillarCards = [
  {
    label: "FIX IT",
    title: "Computer repairs, troubleshooting and upgrades.",
    items: ["Laptop and desktop repairs", "Slow computers", "SSD and RAM upgrades", "Software issues", "PC repairs"],
    href: "/services#repairs",
    cta: "Repair Services",
    icon: "/brand/icon-repairs.png",
  },
  {
    label: "SET IT UP",
    title: "New technology without the headache.",
    items: ["Computers", "Printers", "Wi-Fi", "Routers", "Cameras", "Smart devices"],
    href: "/services#installations",
    cta: "Setup & Installation",
    icon: "/brand/icon-installations.png",
  },
  {
    label: "LEARN IT",
    title: "Feel more confident using technology.",
    items: ["Computer basics", "Email", "Internet", "Online safety", "Smartphones", "Digital skills"],
    href: "/digital-literacy",
    cta: "Digital Literacy",
    icon: "/brand/icon-tutoring.png",
  },
  {
    label: "IMPROVE IT",
    title: "Make your technology work better.",
    items: ["PC upgrades", "Better Wi-Fi", "Networking", "Custom setups", "3D printing"],
    href: "/services#solutions",
    cta: "Explore Solutions",
    icon: "/brand/icon-networking.png",
  },
];

export const customerNeeds = [
  {
    title: "Something is broken",
    copy: "A laptop will not start, a printer has vanished, Windows is playing up, or the computer has become painfully slow.",
    action: "Repair and troubleshooting help",
  },
  {
    title: "Something needs setting up",
    copy: "A new computer, router, printer, camera, phone, tablet or smart device is useful only after it is actually working.",
    action: "Setup and installation support",
  },
  {
    title: "Something is confusing",
    copy: "Email, files, passwords, forms, phones and online services can be learned calmly, one practical step at a time.",
    action: "Digital literacy sessions",
  },
  {
    title: "Something could work better",
    copy: "Wi-Fi can reach further, old PCs can be upgraded, small businesses can tidy their setup, and custom parts can be printed.",
    action: "Improvement and custom solutions",
  },
];

export const supportMethods = [
  ["On-site", "For setup, Wi-Fi, printers, cameras, business visits and jobs that need hands-on access."],
  ["Remote", "For suitable software, email, account, setup and troubleshooting issues."],
  ["Drop-off or collection", "By arrangement when a device needs bench time, parts or a more careful diagnostic."],
  ["Learning sessions", "Patient one-on-one help for people who want to understand what they are doing."],
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
];

export const serviceGroups: Array<[string, string[]]> = [
  ["Repairs", ["Desktop repairs", "Laptop repairs", "Computer troubleshooting", "Hardware problems", "Software problems", "Windows problems", "Slow computers", "SSD upgrades", "RAM upgrades", "Storage upgrades", "PC maintenance", "Gaming PC upgrades", "Custom PC builds"]],
  ["IT Support", ["New computer setup", "Printer setup", "Email setup", "Software installation", "File transfers", "Backup setup", "Remote support", "Home visits", "Small business support"]],
  ["Installations", ["Wi-Fi setup", "Mesh Wi-Fi", "Router setup", "Ethernet", "Home networking", "Security camera setup", "Smart doorbells", "Smart home devices", "Streaming devices"]],
  ["3D Printing", ["Custom parts", "Replacement clips", "Brackets", "Mounts", "Small enclosures", "Prototypes", "Technology accessories", "Basic CAD design"]],
];

export const businessItNeeds: Array<[string, string[]]> = [
  ["Everyday support", ["PCs", "Printers", "Email", "Microsoft 365 help", "Google Workspace help", "Device setup"]],
  ["Site technology", ["Wi-Fi", "Routers", "Networking", "Backups", "Technology installations", "On-site troubleshooting"]],
  ["Basic security", ["Password hygiene", "Multi-factor authentication", "Updates", "Backup checks", "Suspicious email advice", "Safer remote access habits"]],
];
