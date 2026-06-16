import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { ok: false, authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      authenticated: true,
      email: session.email,
    });
  } catch {
    return NextResponse.json(
      { ok: false, authenticated: false },
      { status: 401 }
    );
  }
}
