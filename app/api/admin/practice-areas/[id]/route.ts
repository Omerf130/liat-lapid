import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { withAdmin, jsonError, jsonSuccess } from "@/lib/api-utils";
import { practiceAreaSchema } from "@/lib/validators";
import { revalidatePracticeAreaSlug, revalidatePublicContent } from "@/lib/revalidate";
import PracticeArea from "@/models/PracticeArea";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  return withAdmin(async () => {
    try {
      const { id } = await params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return jsonError("מזהה לא תקין", 400);
      }

      const body = await request.json();
      const parsed = practiceAreaSchema.safeParse(body);

      if (!parsed.success) {
        return jsonError(
          parsed.error.issues[0]?.message ?? "נתונים לא תקינים",
          400
        );
      }

      await connectDB();

      const duplicate = await PracticeArea.findOne({
        slug: parsed.data.slug,
        _id: { $ne: id },
      });
      if (duplicate) {
        return jsonError("slug כבר קיים", 409);
      }

      const previous = await PracticeArea.findById(id).lean();
      const updated = await PracticeArea.findByIdAndUpdate(
        id,
        parsed.data,
        { new: true, runValidators: true }
      ).lean();

      if (!updated) {
        return jsonError("תחום עיסוק לא נמצא", 404);
      }

      revalidatePracticeAreaSlug(updated.slug);
      if (previous?.slug && previous.slug !== updated.slug) {
        revalidatePracticeAreaSlug(previous.slug);
      }
      revalidatePublicContent();

      return jsonSuccess({ practiceArea: updated });
    } catch (error) {
      console.error("Update practice area error:", error);
      return jsonError("שגיאה בעדכון תחום עיסוק", 500);
    }
  });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  return withAdmin(async () => {
    try {
      const { id } = await params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return jsonError("מזהה לא תקין", 400);
      }

      await connectDB();

      const deleted = await PracticeArea.findByIdAndDelete(id).lean();
      if (!deleted) {
        return jsonError("תחום עיסוק לא נמצא", 404);
      }

      revalidatePracticeAreaSlug(deleted.slug);
      revalidatePublicContent();

      return jsonSuccess({ deleted: true });
    } catch (error) {
      console.error("Delete practice area error:", error);
      return jsonError("שגיאה במחיקת תחום עיסוק", 500);
    }
  });
}
