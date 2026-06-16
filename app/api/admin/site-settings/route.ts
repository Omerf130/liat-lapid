import { connectDB } from "@/lib/db";
import { withAdmin, jsonError, jsonSuccess } from "@/lib/api-utils";
import { siteSettingsSchema } from "@/lib/validators";
import { revalidatePublicContent } from "@/lib/revalidate";
import SiteSettings from "@/models/SiteSettings";

export async function GET() {
  return withAdmin(async () => {
    try {
      await connectDB();
      const doc = await SiteSettings.findOne({ key: "main" }).lean();
      return jsonSuccess({ settings: doc ?? null });
    } catch (error) {
      console.error("Get site settings error:", error);
      return jsonError("שגיאה בטעינת הגדרות", 500);
    }
  });
}

export async function PUT(request: Request) {
  return withAdmin(async () => {
    try {
      const body = await request.json();
      const parsed = siteSettingsSchema.safeParse(body);

      if (!parsed.success) {
        return jsonError(
          parsed.error.issues[0]?.message ?? "נתונים לא תקינים",
          400
        );
      }

      await connectDB();

      const updated = await SiteSettings.findOneAndUpdate(
        { key: "main" },
        { $set: parsed.data },
        { new: true, upsert: true, runValidators: true }
      ).lean();

      revalidatePublicContent();

      return jsonSuccess({ settings: updated });
    } catch (error) {
      console.error("Update site settings error:", error);
      return jsonError("שגיאה בשמירת הגדרות", 500);
    }
  });
}
