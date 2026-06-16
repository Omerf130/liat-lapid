import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { connectDB } from "./db";
import AdminUser from "@/models/AdminUser";

export const AUTH_COOKIE_NAME = "admin_token";
const TOKEN_EXPIRY = "7d";

export interface AdminSession {
  adminId: string;
  email: string;
}

interface TokenPayload extends JWTPayload {
  sub: string;
  email: string;
}

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

export async function signToken(payload: AdminSession): Promise<string> {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.adminId)
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getJwtSecret());
}

export async function verifyToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify<TokenPayload>(token, getJwtSecret());
    if (!payload.sub || !payload.email) {
      return null;
    }
    return {
      adminId: payload.sub,
      email: payload.email,
    };
  } catch {
    return null;
  }
}

export function getAuthCookieOptions(maxAge = 60 * 60 * 24 * 7) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge,
    path: "/",
  };
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  return verifyToken(token);
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function authenticateAdmin(
  email: string,
  password: string
): Promise<AdminSession | null> {
  await connectDB();
  const admin = await AdminUser.findOne({ email: email.toLowerCase().trim() });
  if (!admin) {
    return null;
  }

  const isValid = await verifyPassword(password, admin.passwordHash);
  if (!isValid) {
    return null;
  }

  return {
    adminId: admin._id.toString(),
    email: admin.email,
  };
}
