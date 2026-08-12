"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { business } from "@/config/business";
import { navItems } from "@/lib/site-data";
import { GradientButton, Logo } from "./Brand";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0D1220]/90 backdrop-blur-xl">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[8px] focus:bg-white focus:px-4 focus:py-2 focus:text-slate-950">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`rounded-full px-3 py-2 text-sm font-semibold transition hover:bg-white/10 ${pathname === item.href ? "text-[var(--sunset-orange)]" : "text-slate-200"}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <GradientButton href="/contact">Get Tech Help</GradientButton>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/15 text-white lg:hidden"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-[#0D1220] px-4 py-5 shadow-2xl lg:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-[8px] px-4 py-3 text-base font-semibold text-white hover:bg-white/10">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-[linear-gradient(135deg,#FF8A00,#FF5E7D,#7861FF)] px-5 py-3 text-center text-sm font-bold text-white">
              Get Tech Help
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0A0F1B] text-white">
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-44 bg-[url('/brand/circuit-pattern.svg')] bg-right-bottom bg-no-repeat opacity-10" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-md text-lg font-semibold">{business.tagline}</p>
          <p className="mt-2 text-sm text-slate-300">{business.servicesLine}</p>
          <div className="mt-5 grid gap-1 text-sm text-slate-300">
            <p>{business.phone || "[PHONE]"}</p>
            <p>{business.email || "[EMAIL]"}</p>
            <p>{business.website || "[WEBSITE]"}</p>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--sunset-orange)]">Pages</h2>
          <nav className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-300">
            {navItems.map((item) => <Link key={item.href} href={item.href} className="hover:text-white">{item.label}</Link>)}
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </nav>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--sunset-orange)]">Service Areas</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">{business.suburbs.join(" • ")}</p>
          <p className="mt-4 text-sm text-slate-400">Surrounding areas may also be available by arrangement.</p>
          <div className="mt-5 flex gap-3 text-sm font-semibold">
            <a href="#" aria-label="Facebook placeholder" className="rounded-full border border-white/15 px-4 py-2 hover:bg-white/10">Facebook</a>
            <a href="#" aria-label="Instagram placeholder" className="rounded-full border border-white/15 px-4 py-2 hover:bg-white/10">Instagram</a>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Sunset Country Tech
      </div>
    </footer>
  );
}
