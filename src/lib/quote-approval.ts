import { z } from "zod";
import { quoteApprovalTransition } from "@/lib/workflows";

export const quoteApprovalSchema = z.object({
  token: z.string().min(12).max(160),
  name: z.string().trim().min(2).max(120),
  comment: z.string().trim().max(1000).optional(),
  decision: z.enum(["Approved", "Declined", "Contact Requested"]),
});

export type QuoteApprovalInput = z.infer<typeof quoteApprovalSchema>;

export function buildQuoteApprovalAudit(input: QuoteApprovalInput, requestMeta: { ipAddress?: string | null }) {
  const transition =
    input.decision === "Contact Requested"
      ? {
          quoteStatus: "Viewed",
          jobStatus: "Awaiting Approval",
          auditEvent: "Customer requested contact about quote",
        }
      : quoteApprovalTransition(input.decision);

  return {
    ...transition,
    name: input.name,
    comment: input.comment ?? "",
    ipAddress: requestMeta.ipAddress ?? null,
    createdAt: new Date().toISOString(),
  };
}
