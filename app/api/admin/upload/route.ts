import { put } from "@vercel/blob";
import { withAdmin, jsonError, jsonSuccess } from "@/lib/api-utils";

export async function POST(request: Request) {
  return withAdmin(async () => {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return jsonError("BLOB_READ_WRITE_TOKEN לא מוגדר בשרת", 500);
    }

    try {
      const formData = await request.formData();
      const file = formData.get("file");

      if (!file || !(file instanceof File)) {
        return jsonError("לא נבחר קובץ", 400);
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        return jsonError("סוג קובץ לא נתמך. השתמשו ב-JPG, PNG, WebP או GIF", 400);
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        return jsonError("הקובץ גדול מדי (מקסימום 5MB)", 400);
      }

      const ext = file.name.split(".").pop() ?? "jpg";
      const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const blob = await put(filename, file, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      return jsonSuccess({ url: blob.url });
    } catch (error) {
      console.error("Upload error:", error);
      return jsonError("שגיאה בהעלאת הקובץ", 500);
    }
  });
}
