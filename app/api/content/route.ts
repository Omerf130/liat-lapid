import { NextResponse } from "next/server";
import { getSiteSettings, getPracticeAreas, getAdvantages } from "@/lib/content";

export async function GET() {
  try {
    const [settings, practiceAreas, advantages] = await Promise.all([
      getSiteSettings(),
      getPracticeAreas(),
      getAdvantages(),
    ]);

    return NextResponse.json({
      ok: true,
      source: process.env.MONGODB_URI ? "database" : "defaults",
      hero: settings.hero.title,
      practiceAreasCount: practiceAreas.length,
      advantagesCount: advantages.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
