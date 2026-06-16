import { connectDB } from "@/lib/db";
import { jsonError, jsonSuccess } from "@/lib/api-utils";
import { contactSchema } from "@/lib/validators";
import ContactSubmission from "@/models/ContactSubmission";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(
        parsed.error.issues[0]?.message ?? "נתונים לא תקינים",
        400
      );
    }

    await connectDB();

    await ContactSubmission.create({
      name: parsed.data.name.trim(),
      phone: parsed.data.phone.trim(),
      email: parsed.data.email.trim().toLowerCase(),
      message: parsed.data.message.trim(),
      consent: parsed.data.consent,
      read: false,
    });

    return jsonSuccess({ message: "הפנייה נשלחה בהצלחה" });
  } catch (error) {
    console.error("Contact form error:", error);
    return jsonError("שגיאה בשליחת הטופס", 500);
  }
}
