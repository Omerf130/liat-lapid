import { connectDB } from "@/lib/db";
import { withAdmin, jsonError, jsonSuccess } from "@/lib/api-utils";
import { advantageSchema } from "@/lib/validators";
import { revalidatePublicContent } from "@/lib/revalidate";
import Advantage from "@/models/Advantage";

export async function GET() {
  return withAdmin(async () => {
    try {
      await connectDB();
      const advantages = await Advantage.find().sort({ order: 1 }).lean();
      return jsonSuccess({ advantages });
    } catch (error) {
      console.error("Get advantages error:", error);
      return jsonError("שגיאה בטעינת יתרונות", 500);
    }
  });
}

export async function POST(request: Request) {
  return withAdmin(async () => {
    try {
      const body = await request.json();
      const parsed = advantageSchema.safeParse(body);

      if (!parsed.success) {
        return jsonError(
          parsed.error.issues[0]?.message ?? "נתונים לא תקינים",
          400
        );
      }

      await connectDB();
      const advantage = await Advantage.create(parsed.data);
      revalidatePublicContent();

      return jsonSuccess({ advantage: advantage.toObject() });
    } catch (error) {
      console.error("Create advantage error:", error);
      return jsonError("שגיאה ביצירת יתרון", 500);
    }
  });
}
