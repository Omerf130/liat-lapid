import mongoose, { Schema, type Model } from "mongoose";

export interface IPracticeArea {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PracticeAreaSchema = new Schema<IPracticeArea>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, default: "" },
    fullDescription: { type: String, default: "" },
    icon: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

PracticeAreaSchema.index({ order: 1 });
PracticeAreaSchema.index({ isActive: 1 });

const PracticeArea: Model<IPracticeArea> =
  mongoose.models.PracticeArea ??
  mongoose.model<IPracticeArea>("PracticeArea", PracticeAreaSchema);

export default PracticeArea;
