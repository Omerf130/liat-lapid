import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "נא להזין כתובת אימייל")
    .email("כתובת אימייל לא תקינה"),
  password: z
    .string()
    .min(6, "הסיסמה חייבת להכיל לפחות 6 תווים"),
});

export type LoginInput = z.infer<typeof loginSchema>;
