import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, getAuthSecret, verifySession } from "@/lib/auth-cookie";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/operations")) {
    return NextResponse.next();
  }

  const session = await verifySession(
    request.cookies.get(AUTH_COOKIE)?.value,
    getAuthSecret(),
  );

  if (session) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("returnTo", `${pathname}${request.nextUrl.search}`);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/operations/:path*"],
};
