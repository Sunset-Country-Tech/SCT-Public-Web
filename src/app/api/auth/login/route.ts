import { NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  createSessionId,
  getAuthSecret,
  signSession,
  verifyCsrfToken,
} from "@/lib/auth-cookie";
import { loginSchema, safeReturnTo, verifyStaffCredentials } from "@/lib/server/auth";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  current.count += 1;
  return current.count > 8;
}

function hasValidOrigin(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return process.env.NODE_ENV !== "production";
  }

  return origin === new URL(request.url).origin;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    returnTo: safeReturnTo(formData.get("returnTo")),
    csrfToken: formData.get("csrfToken"),
  });

  if (!parsed.success || !hasValidOrigin(request) || !(await verifyCsrfToken(parsed.data.csrfToken, getAuthSecret()))) {
    const returnTo = parsed.success ? parsed.data.returnTo : "/";
    return NextResponse.redirect(new URL(`/login?error=1&returnTo=${encodeURIComponent(returnTo)}`, request.url), {
      status: 303,
    });
  }

  const rateLimitKey = `${getClientIp(request)}:${parsed.data.email}`;
  if (isRateLimited(rateLimitKey)) {
    return NextResponse.redirect(new URL("/login?error=rate-limited", request.url), { status: 303 });
  }

  const staffUser = await verifyStaffCredentials(parsed.data.email, parsed.data.password);
  if (!staffUser) {
    return NextResponse.redirect(new URL(`/login?error=1&returnTo=${encodeURIComponent(parsed.data.returnTo)}`, request.url), {
      status: 303,
    });
  }

  attempts.delete(rateLimitKey);

  const { returnTo } = parsed.data;
  const now = Date.now();
  const response = NextResponse.redirect(new URL(returnTo, request.url));
  response.cookies.set({
    name: AUTH_COOKIE,
    value: await signSession(
      {
        sub: staffUser.id,
        email: staffUser.email,
        name: staffUser.name,
        role: staffUser.role,
        iat: now,
        exp: now + 1000 * 60 * 60 * 12,
        jti: createSessionId(),
      },
      getAuthSecret(),
    ),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
