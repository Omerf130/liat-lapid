import mongoose from "mongoose";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { withAdmin, jsonError, jsonSuccess } from "@/lib/api-utils";
import ContactSubmission from "@/models/ContactSubmission";

const patchSchema = z.object({
  read: z.boolean(),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  return withAdmin(async () => {
    try {
      const { id } = await params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return jsonError("מזהה לא תקין", 400);
      }

      const body = await request.json();
      const parsed = patchSchema.safeParse(body);

      if (!parsed.success) {
        return jsonError(
          parsed.error.issues[0]?.message ?? "נתונים לא תקינים",
          400
        );
      }

      await connectDB();

      const updated = await ContactSubmission.findByIdAndUpdate(
        id,
        { read: parsed.data.read },
        { new: true }
      ).lean();

      if (!updated) {
        return jsonError("פנייה לא נמצאה", 404);
      }

      return jsonSuccess({ submission: updated });
    } catch (error) {
      console.error("Update submission error:", error);
      return jsonError("שגיאה בעדכון פנייה", 500);
    }
  });
}
