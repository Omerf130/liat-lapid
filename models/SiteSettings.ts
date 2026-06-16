import mongoose, { Schema, type Model } from "mongoose";
import type { SiteSettingsData } from "@/lib/types";

export interface ISiteSettings extends SiteSettingsData {
  key: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContentCardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "" },
  },
  { _id: false }
);

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    hero: {
      title: { type: String, default: "" },
      subtitle: { type: String, default: "" },
      description: { type: String, default: "" },
      backgroundImageUrl: { type: String, default: "" },
      ctaPrimaryText: { type: String, default: "" },
      ctaSecondaryText: { type: String, default: "" },
    },
    about: {
      pageTitle: { type: String, default: "" },
      shortText: { type: String, default: "" },
      fullContent: { type: String, default: "" },
      imageUrl: { type: String, default: "" },
    },
    employerGuidance: {
      pageTitle: { type: String, default: "" },
      title: { type: String, default: "" },
      shortText: { type: String, default: "" },
      fullContent: { type: String, default: "" },
      imageUrl: { type: String, default: "" },
      cards: { type: [ContentCardSchema], default: [] },
    },
    employeeGuidance: {
      title: { type: String, default: "" },
      content: { type: String, default: "" },
      items: { type: [ContentCardSchema], default: [] },
    },
    lectures: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      items: { type: [ContentCardSchema], default: [] },
    },
    contact: {
      phone: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
      email: { type: String, default: "" },
      address: { type: String, default: "" },
      formTitle: { type: String, default: "" },
      formSubtitle: { type: String, default: "" },
    },
    seo: {
      siteTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      keywords: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ??
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
