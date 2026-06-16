import { NextResponse } from "next/server";
import { requireAdmin, type AdminSession } from "./auth";

export function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export function jsonSuccess<T extends Record<string, unknown>>(data: T) {
  return NextResponse.json({ ok: true, ...data });
}

export async function withAdmin(
  handler: (session: AdminSession) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const session = await requireAdmin();
    return await handler(session);
  } catch {
    return jsonError("לא מורשה", 401);
  }
}
