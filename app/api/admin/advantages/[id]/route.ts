import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { withAdmin, jsonError, jsonSuccess } from "@/lib/api-utils";
import { advantageSchema } from "@/lib/validators";
import { revalidatePublicContent } from "@/lib/revalidate";
import Advantage from "@/models/Advantage";

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
      const parsed = advantageSchema.safeParse(body);

      if (!parsed.success) {
        return jsonError(
          parsed.error.issues[0]?.message ?? "נתונים לא תקינים",
          400
        );
      }

      await connectDB();

      const updated = await Advantage.findByIdAndUpdate(id, parsed.data, {
        new: true,
        runValidators: true,
      }).lean();

      if (!updated) {
        return jsonError("יתרון לא נמצא", 404);
      }

      revalidatePublicContent();
      return jsonSuccess({ advantage: updated });
    } catch (error) {
      console.error("Update advantage error:", error);
      return jsonError("שגיאה בעדכון יתרון", 500);
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

      const deleted = await Advantage.findByIdAndDelete(id).lean();
      if (!deleted) {
        return jsonError("יתרון לא נמצא", 404);
      }

      revalidatePublicContent();
      return jsonSuccess({ deleted: true });
    } catch (error) {
      console.error("Delete advantage error:", error);
      return jsonError("שגיאה במחיקת יתרון", 500);
    }
  });
}
