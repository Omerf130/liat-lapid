import { connectDB } from "@/lib/db";
import { withAdmin, jsonError, jsonSuccess } from "@/lib/api-utils";
import { practiceAreaSchema } from "@/lib/validators";
import { revalidatePracticeAreaSlug } from "@/lib/revalidate";
import PracticeArea from "@/models/PracticeArea";

export async function GET() {
  return withAdmin(async () => {
    try {
      await connectDB();
      const areas = await PracticeArea.find().sort({ order: 1 }).lean();
      return jsonSuccess({ practiceAreas: areas });
    } catch (error) {
      console.error("Get practice areas error:", error);
      return jsonError("שגיאה בטעינת תחומי עיסוק", 500);
    }
  });
}

export async function POST(request: Request) {
  return withAdmin(async () => {
    try {
      const body = await request.json();
      const parsed = practiceAreaSchema.safeParse(body);

      if (!parsed.success) {
        return jsonError(
          parsed.error.issues[0]?.message ?? "נתונים לא תקינים",
          400
        );
      }

      await connectDB();

      const existing = await PracticeArea.findOne({ slug: parsed.data.slug });
      if (existing) {
        return jsonError("slug כבר קיים", 409);
      }

      const area = await PracticeArea.create(parsed.data);
      revalidatePracticeAreaSlug(area.slug);

      return jsonSuccess({ practiceArea: area.toObject() });
    } catch (error) {
      console.error("Create practice area error:", error);
      return jsonError("שגיאה ביצירת תחום עיסוק", 500);
    }
  });
}
