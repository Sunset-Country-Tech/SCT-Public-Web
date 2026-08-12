import assert from "node:assert/strict";
import test from "node:test";
import {
  createSessionId,
  getAuthSecret,
  signCsrfToken,
  signSession,
  verifyCsrfToken,
  verifySession,
} from "../src/lib/auth-cookie";
import { safeReturnTo, verifyStaffCredentials } from "../src/lib/server/auth";

test("development staff account verifies and supplies a server-side role", async () => {
  const user = await verifyStaffCredentials("owner@sunsetcountry.tech", "sunset-demo-2026");

  assert.equal(user?.email, "owner@sunsetcountry.tech");
  assert.equal(user?.role, "Owner");
});

test("invalid staff credentials are rejected", async () => {
  const user = await verifyStaffCredentials("owner@sunsetcountry.tech", "wrong-password");

  assert.equal(user, null);
});

test("signed sessions reject tampering", async () => {
  const secret = getAuthSecret();
  const token = await signSession(
    {
      sub: "dev-owner",
      email: "owner@sunsetcountry.tech",
      name: "Development Owner",
      role: "Owner",
      iat: Date.now(),
      exp: Date.now() + 60_000,
      jti: createSessionId(),
    },
    secret,
  );

  assert.equal((await verifySession(token, secret))?.sub, "dev-owner");
  assert.equal(await verifySession(`${token}tampered`, secret), null);
});

test("signed csrf tokens verify without a writable page cookie", async () => {
  const secret = getAuthSecret();
  const token = await signCsrfToken(secret);

  assert.equal(await verifyCsrfToken(token, secret), true);
  assert.equal(await verifyCsrfToken(`${token}tampered`, secret), false);
});

test("return targets must stay same-origin relative paths", () => {
  assert.equal(safeReturnTo("/jobs?status=open"), "/jobs?status=open");
  assert.equal(safeReturnTo("https://evil.example"), "/");
  assert.equal(safeReturnTo("//evil.example"), "/");
});
