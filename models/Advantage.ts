import mongoose, { Schema, type Model } from "mongoose";

export interface IAdvantage {
  title: string;
  description: string;
  icon: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const AdvantageSchema = new Schema<IAdvantage>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

AdvantageSchema.index({ order: 1 });

const Advantage: Model<IAdvantage> =
  mongoose.models.Advantage ??
  mongoose.model<IAdvantage>("Advantage", AdvantageSchema);

export default Advantage;
