import assert from "node:assert/strict";
import test from "node:test";
import { buildQuoteApprovalAudit, quoteApprovalSchema } from "../src/lib/quote-approval";

test("quote approval validation rejects missing customer names", () => {
  const parsed = quoteApprovalSchema.safeParse({
    token: "sample-approval-token",
    name: "",
    decision: "Approved",
  });

  assert.equal(parsed.success, false);
});

test("contact requests do not approve or decline the quote", () => {
  const audit = buildQuoteApprovalAudit(
    {
      token: "sample-approval-token",
      name: "Mia Thompson",
      decision: "Contact Requested",
      comment: "Please call me first.",
    },
    { ipAddress: "203.0.113.10" },
  );

  assert.equal(audit.quoteStatus, "Viewed");
  assert.equal(audit.jobStatus, "Awaiting Approval");
  assert.equal(audit.auditEvent, "Customer requested contact about quote");
  assert.equal(audit.ipAddress, "203.0.113.10");
});
