import { CheckCircle2, FileText, MessageSquare, XCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { quotes, settings } from "@/lib/operations-data";
import { calculateTotals, formatCurrency } from "@/lib/workflows";

export const dynamic = "force-dynamic";

export default async function QuoteApprovalPage(props: PageProps<"/q/[token]">) {
  const { token } = await props.params;
  const searchParams = await props.searchParams;
  const quote = quotes.find((item) => item.token === token);

  if (!quote) {
    notFound();
  }

  const totals = calculateTotals(quote.items, { gstRegistered: settings.gstRegistered });
  const result = typeof searchParams.result === "string" ? searchParams.result : null;
  const error = typeof searchParams.error === "string" ? searchParams.error : null;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-950">
      <section className="mx-auto max-w-3xl rounded-[8px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF8A00]">Secure Quote Approval</p>
          <h1 className="mt-2 text-3xl font-black">Sunset Country Tech</h1>
          <p className="mt-1 text-sm text-slate-600">{quote.number} for {quote.customer} • Job {quote.job}</p>
        </div>
        <div className="p-6">
          <div className="rounded-[8px] bg-slate-50 p-4">
            <p className="font-bold">Quote notes</p>
            <p className="mt-1 text-sm text-slate-600">{quote.notes}</p>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="border-b border-slate-200 py-3 pr-3 text-xs font-bold uppercase text-slate-500">Description</th>
                  <th className="border-b border-slate-200 px-3 py-3 text-xs font-bold uppercase text-slate-500">Qty</th>
                  <th className="border-b border-slate-200 px-3 py-3 text-xs font-bold uppercase text-slate-500">Unit</th>
                  <th className="border-b border-slate-200 py-3 pl-3 text-right text-xs font-bold uppercase text-slate-500">Total</th>
                </tr>
              </thead>
              <tbody>
                {quote.items.map((item) => (
                  <tr key={item.description}>
                    <td className="border-b border-slate-100 py-3 pr-3">{item.description}</td>
                    <td className="border-b border-slate-100 px-3 py-3">{item.quantity}</td>
                    <td className="border-b border-slate-100 px-3 py-3">{formatCurrency(item.unitPrice)}</td>
                    <td className="border-b border-slate-100 py-3 pl-3 text-right font-bold">{formatCurrency(item.quantity * item.unitPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 space-y-2 rounded-[8px] bg-[#0D1220] p-4 text-white">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span>{settings.gstRegistered ? "GST" : "GST not applied"}</span><span>{formatCurrency(totals.tax)}</span></div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-xl font-black"><span>Total</span><span>{formatCurrency(totals.total)}</span></div>
          </div>
          {result ? (
            <p className="mt-5 rounded-[8px] bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
              Your response has been recorded: {result.replace(/-/g, " ")}.
            </p>
          ) : null}
          {error ? (
            <p className="mt-5 rounded-[8px] bg-red-50 p-4 text-sm font-bold text-red-700">
              Please enter your name before submitting a quote response.
            </p>
          ) : null}
          <form action={`/api/quotes/${token}/approval`} method="post" className="mt-6 grid gap-3">
            <label className="text-sm font-bold">Your name<input name="name" required className="mt-1 h-11 w-full rounded-[8px] border border-slate-200 px-3" /></label>
            <label className="text-sm font-bold">Comment<textarea name="comment" className="mt-1 min-h-24 w-full rounded-[8px] border border-slate-200 p-3" placeholder="Optional comment or request for contact" /></label>
            <div className="grid gap-3 sm:grid-cols-3">
              <button name="decision" value="Approved" className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-emerald-600 font-black text-white"><CheckCircle2 className="h-4 w-4" /> Approve</button>
              <button name="decision" value="Declined" className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-red-600 font-black text-white"><XCircle className="h-4 w-4" /> Decline</button>
              <button name="decision" value="Contact Requested" className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-200 font-black"><MessageSquare className="h-4 w-4" /> Contact me</button>
            </div>
          </form>
          <p className="mt-5 flex items-center gap-2 text-xs text-slate-500">
            <FileText className="h-4 w-4" />
            Approval actions are designed to record timestamp, name, decision, comment, IP policy and audit history without exposing internal records.
          </p>
        </div>
      </section>
    </main>
  );
}
