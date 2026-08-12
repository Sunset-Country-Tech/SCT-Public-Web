import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateTotals,
  can,
  nextNumber,
  quoteApprovalTransition,
} from "../src/lib/workflows";

test("invoice totals do not apply GST when the business is not GST registered", () => {
  const totals = calculateTotals(
    [{ description: "Labour", quantity: 2, unitPrice: 100, taxRate: 0.1 }],
    { gstRegistered: false },
  );

  assert.deepEqual(totals, { subtotal: 200, tax: 0, total: 200 });
});

test("invoice totals apply configured tax when GST is enabled", () => {
  const totals = calculateTotals(
    [{ description: "Labour", quantity: 2, unitPrice: 100, taxRate: 0.1 }],
    { gstRegistered: true },
  );

  assert.deepEqual(totals, { subtotal: 200, tax: 20, total: 220 });
});

test("numbering advances within the current year and prefix", () => {
  assert.equal(
    nextNumber("SCT", 2026, ["SCT-2026-0001", "SCT-2026-0009", "SCT-2025-0030"]),
    "SCT-2026-0010",
  );
});

test("role permissions keep read-only users from write actions", () => {
  assert.equal(can("Owner", "settings:write"), true);
  assert.equal(can("Read Only", "settings:write"), false);
  assert.equal(can("Technician", "jobs:write"), true);
  assert.equal(can("Technician", "payments:write"), false);
});

test("quote approval updates quote and job workflow states", () => {
  assert.deepEqual(quoteApprovalTransition("Approved"), {
    quoteStatus: "Approved",
    jobStatus: "Awaiting Parts",
    auditEvent: "Quote approved by customer",
  });

  assert.deepEqual(quoteApprovalTransition("Declined"), {
    quoteStatus: "Declined",
    jobStatus: "Awaiting Quote",
    auditEvent: "Quote declined by customer",
  });
});
