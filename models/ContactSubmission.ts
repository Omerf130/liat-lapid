import mongoose, { Schema, type Model } from "mongoose";

export interface IContactSubmission {
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    consent: { type: Boolean, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ContactSubmissionSchema.index({ createdAt: -1 });
ContactSubmissionSchema.index({ read: 1 });

const ContactSubmission: Model<IContactSubmission> =
  mongoose.models.ContactSubmission ??
  mongoose.model<IContactSubmission>(
    "ContactSubmission",
    ContactSubmissionSchema
  );

export default ContactSubmission;
