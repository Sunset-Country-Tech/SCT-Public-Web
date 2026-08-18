import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export function Logo({ stacked = false }: { stacked?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center rounded-[8px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sunset-orange)]" aria-label="Sunset Country Tech home">
      <Image src={stacked ? "/brand/provided-logo-stacked.png" : "/brand/provided-logo-horizontal.png"} alt="Sunset Country Tech" width={stacked ? 314 : 1148} height={stacked ? 384 : 372} className={stacked ? "h-40 w-auto" : "h-14 w-auto sm:h-16"} priority={!stacked} />
    </Link>
  );
}

export function GradientButton({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return (
    <Link
      href={href}
      className={secondary ? "inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sunset-orange)]" : "inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FF8A00,#FF5E7D,#7861FF)] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sunset-orange)]"}
    >
      {children}
    </Link>
  );
}

export function SectionHeading({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">{eyebrow}</p> : null}
      <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {copy ? <p className="mt-4 text-pretty text-base leading-8 text-slate-300 sm:text-lg">{copy}</p> : null}
    </div>
  );
}

export function ServiceIcon({ icon, label }: { icon: string; label?: string }) {
  return (
    <span className="inline-flex h-14 w-14 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.03]">
      <Image src={icon} alt={label ?? ""} aria-hidden={label ? undefined : true} width={96} height={96} className="h-11 w-11 object-contain" />
    </span>
  );
}

export function CircuitPattern({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-[url('/brand/circuit-pattern.svg')] bg-right-bottom bg-no-repeat opacity-[0.13] ${className}`} />;
}

export function BrandDivider() {
  return <span aria-hidden="true" className="block h-1 w-28 rounded-full bg-[linear-gradient(90deg,#FF8A00,#FF5E7D,#7861FF)]" />;
}
