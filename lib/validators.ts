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

export const contactSchema = z.object({
  name: z.string().min(2, "נא להזין שם מלא"),
  phone: z.string().min(9, "נא להזין מספר טלפון תקין"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  message: z.string().min(10, "נא להזין הודעה (לפחות 10 תווים)"),
  consent: z.literal(true, {
    message: "יש לאשר את מדיניות הפרטיות",
  }),
});

export const contentCardSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  icon: z.string().optional().default(""),
});

export const siteSettingsSchema = z.object({
  hero: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      backgroundImageUrl: z.string(),
      ctaPrimaryText: z.string(),
      ctaSecondaryText: z.string(),
    })
    .optional(),
  about: z
    .object({
      pageTitle: z.string(),
      shortText: z.string(),
      fullContent: z.string(),
      imageUrl: z.string(),
    })
    .optional(),
  employerGuidance: z
    .object({
      pageTitle: z.string(),
      title: z.string(),
      shortText: z.string(),
      fullContent: z.string(),
      imageUrl: z.string(),
      cards: z.array(contentCardSchema),
    })
    .optional(),
  employeeGuidance: z
    .object({
      title: z.string(),
      content: z.string(),
      items: z.array(contentCardSchema),
    })
    .optional(),
  lectures: z
    .object({
      title: z.string(),
      description: z.string(),
      items: z.array(contentCardSchema),
    })
    .optional(),
  contact: z
    .object({
      phone: z.string(),
      whatsapp: z.string(),
      email: z.string(),
      address: z.string(),
      formTitle: z.string(),
      formSubtitle: z.string(),
    })
    .optional(),
  seo: z
    .object({
      siteTitle: z.string(),
      metaDescription: z.string(),
      keywords: z.string(),
    })
    .optional(),
});

export const practiceAreaSchema = z.object({
  title: z.string().min(1, "נא להזין כותרת"),
  slug: z
    .string()
    .min(1, "נא להזין slug")
    .regex(/^[a-z0-9-]+$/, "slug חייב להכיל אותיות קטנות, מספרים ומקפים בלבד"),
  shortDescription: z.string(),
  fullDescription: z.string(),
  icon: z.string().optional().default(""),
  order: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const advantageSchema = z.object({
  title: z.string().min(1, "נא להזין כותרת"),
  description: z.string(),
  icon: z.string().optional().default(""),
  order: z.number().int().optional().default(0),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
export type PracticeAreaInput = z.infer<typeof practiceAreaSchema>;
export type AdvantageInput = z.infer<typeof advantageSchema>;
