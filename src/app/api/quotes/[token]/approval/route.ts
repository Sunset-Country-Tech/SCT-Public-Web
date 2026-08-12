import { NextResponse } from "next/server";
import { quotes } from "@/lib/operations-data";
import { buildQuoteApprovalAudit, quoteApprovalSchema } from "@/lib/quote-approval";

export const runtime = "nodejs";

export async function POST(request: Request, props: RouteContext<"/api/quotes/[token]/approval">) {
  const { token } = await props.params;
  const quote = quotes.find((item) => item.token === token);

  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const parsed = quoteApprovalSchema.safeParse({
    token,
    name: formData.get("name"),
    comment: formData.get("comment"),
    decision: formData.get("decision"),
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL(`/q/${token}?error=validation`, request.url), { status: 303 });
  }

  const audit = buildQuoteApprovalAudit(parsed.data, {
    ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip"),
  });

  const result = encodeURIComponent(parsed.data.decision.toLowerCase().replace(/\s+/g, "-"));
  const response = NextResponse.redirect(new URL(`/q/${token}?result=${result}`, request.url), { status: 303 });
  response.headers.set("x-sct-audit-event", audit.auditEvent);

  return response;
}
