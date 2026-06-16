import { connectDB } from "@/lib/db";
import { withAdmin, jsonError, jsonSuccess } from "@/lib/api-utils";
import ContactSubmission from "@/models/ContactSubmission";

export async function GET(request: Request) {
  return withAdmin(async () => {
    try {
      const { searchParams } = new URL(request.url);
      const unreadOnly = searchParams.get("unread") === "true";

      await connectDB();

      const filter = unreadOnly ? { read: false } : {};
      const submissions = await ContactSubmission.find(filter)
        .sort({ createdAt: -1 })
        .lean();

      const unreadCount = await ContactSubmission.countDocuments({ read: false });

      return jsonSuccess({ submissions, unreadCount });
    } catch (error) {
      console.error("Get submissions error:", error);
      return jsonError("שגיאה בטעינת פניות", 500);
    }
  });
}
