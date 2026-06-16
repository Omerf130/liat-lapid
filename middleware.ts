import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";

const AUTH_COOKIE_NAME = "admin_token";

interface TokenPayload extends JWTPayload {
  email?: string;
}

async function isValidToken(token: string): Promise<boolean> {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return false;
  }

  try {
    const { payload } = await jwtVerify<TokenPayload>(
      token,
      new TextEncoder().encode(secret)
    );
    return Boolean(payload.sub && payload.email);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const loginUrl = new URL("/admin/login", request.url);

  if (!token || !(await isValidToken(token))) {
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
