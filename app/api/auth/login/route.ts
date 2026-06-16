import { NextResponse } from "next/server";
import {
  authenticateAdmin,
  AUTH_COOKIE_NAME,
  getAuthCookieOptions,
  signToken,
} from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message ?? "נתונים לא תקינים",
        },
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { ok: false, error: "JWT_SECRET לא מוגדר בשרת" },
        { status: 500 }
      );
    }

    const session = await authenticateAdmin(
      parsed.data.email,
      parsed.data.password
    );

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "אימייל או סיסמה שגויים" },
        { status: 401 }
      );
    }

    const token = await signToken(session);
    const response = NextResponse.json({
      ok: true,
      email: session.email,
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, getAuthCookieOptions());
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { ok: false, error: "שגיאה בהתחברות" },
      { status: 500 }
    );
  }
}
