export type Role =
  | "Owner"
  | "Admin"
  | "Technician"
  | "Support"
  | "Accounts"
  | "Read Only";

export const roleValues = [
  "Owner",
  "Admin",
  "Technician",
  "Support",
  "Accounts",
  "Read Only",
] as const satisfies Role[];

export type Permission =
  | "customers:write"
  | "jobs:write"
  | "quotes:write"
  | "invoices:write"
  | "payments:write"
  | "settings:write"
  | "reports:read";

export type LineItem = {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
};

export type Totals = {
  subtotal: number;
  tax: number;
  total: number;
};

const rolePermissions: Record<Role, Permission[]> = {
  Owner: [
    "customers:write",
    "jobs:write",
    "quotes:write",
    "invoices:write",
    "payments:write",
    "settings:write",
    "reports:read",
  ],
  Admin: [
    "customers:write",
    "jobs:write",
    "quotes:write",
    "invoices:write",
    "payments:write",
    "reports:read",
  ],
  Technician: ["customers:write", "jobs:write", "reports:read"],
  Support: ["customers:write", "jobs:write", "quotes:write", "reports:read"],
  Accounts: ["quotes:write", "invoices:write", "payments:write", "reports:read"],
  "Read Only": ["reports:read"],
};

export function can(role: Role, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

export function formatCurrency(amount: number, currency = "AUD") {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
  }).format(amount);
}

export function calculateTotals(
  items: LineItem[],
  options: { gstRegistered: boolean },
): Totals {
  return items.reduce<Totals>(
    (totals, item) => {
      const lineSubtotal = item.quantity * item.unitPrice;
      const lineTax = options.gstRegistered ? lineSubtotal * item.taxRate : 0;

      return {
        subtotal: totals.subtotal + lineSubtotal,
        tax: totals.tax + lineTax,
        total: totals.total + lineSubtotal + lineTax,
      };
    },
    { subtotal: 0, tax: 0, total: 0 },
  );
}

export function nextNumber(prefix: string, year: number, existingNumbers: string[]) {
  const sequence = existingNumbers
    .map((number) => number.match(new RegExp(`^${prefix}-${year}-(\\d{4})$`))?.[1])
    .filter(Boolean)
    .map(Number);

  const next = sequence.length ? Math.max(...sequence) + 1 : 1;
  return `${prefix}-${year}-${String(next).padStart(4, "0")}`;
}

export function quoteApprovalTransition(decision: "Approved" | "Declined") {
  return {
    quoteStatus: decision,
    jobStatus: decision === "Approved" ? "Awaiting Parts" : "Awaiting Quote",
    auditEvent: `Quote ${decision.toLowerCase()} by customer`,
  };
}
