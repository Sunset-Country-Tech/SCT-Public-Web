import bcrypt from "bcryptjs";
import { z } from "zod";
import { roleValues, type Role } from "@/lib/workflows";

export const loginSchema = z.object({
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(256),
  returnTo: z.string().default("/"),
  csrfToken: z.string().min(24).max(256),
});

const staffUserSchema = z.object({
  id: z.string().trim().min(1).max(120),
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  name: z.string().trim().min(1).max(120),
  role: z.enum(roleValues),
  passwordHash: z.string().min(20),
  active: z.boolean().default(true),
});

export type StaffUser = z.infer<typeof staffUserSchema>;

const staffUsersSchema = z.array(staffUserSchema).min(1);

export function getConfiguredStaffUsers(): StaffUser[] {
  const raw = process.env.INTERNAL_USERS_JSON;

  if (raw) {
    return staffUsersSchema.parse(JSON.parse(raw));
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("INTERNAL_USERS_JSON is required in production.");
  }

  return [
    {
      id: "dev-owner",
      email: "owner@sunsetcountry.tech",
      name: "Development Owner",
      role: "Owner",
      passwordHash:
        "$2b$12$AaTOUWJQBb1KpyNpA0uOlurGrPr43.67hJpHCFI/vUx734nNy.1.i",
      active: true,
    },
  ];
}

export async function verifyStaffCredentials(email: string, candidate: string) {
  const staffUser = getConfiguredStaffUsers().find((user) => user.email === email && user.active);

  if (!staffUser) {
    await bcrypt.compare(candidate, "$2b$12$AaTOUWJQBb1KpyNpA0uOlurGrPr43.67hJpHCFI/vUx734nNy.1.i");
    return null;
  }

  const matches = await bcrypt.compare(candidate, staffUser.passwordHash);
  return matches ? staffUser : null;
}

export function safeReturnTo(value: unknown) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  return value;
}

export function isRole(value: string): value is Role {
  return roleValues.some((role) => role === value);
}
