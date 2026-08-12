import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70svh] place-items-center bg-[#0D1220] px-4 py-20 text-center text-white">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--sunset-orange)]">404</p>
        <h1 className="mt-4 text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-slate-300">The page you were looking for is not here.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-[linear-gradient(135deg,#FF8A00,#FF5E7D,#7861FF)] px-6 py-3 text-sm font-bold text-white">Back Home</Link>
      </div>
    </section>
  );
}
