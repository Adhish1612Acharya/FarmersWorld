import mongoose, { Schema, Document, Types } from "mongoose";

export interface applicationDocument extends Document {
  adhaar: string;
  farmersId: string;
  image: string;
  applicant: Types.ObjectId;
  schemeName: Types.ObjectId;
  approved: boolean;
  processing: boolean;
  rejectReason: string;
}

const applicationSchema = new Schema<applicationDocument>({
  adhaar: {
    type: String,
    required: true,
    match: [/^\d{12}$/, "Invalid adhaar"],
  },
  farmersId: {
    type: String,
    required: true,
    match: [/^\d{12}$/, "Invalid farmersId"],
  },
  image: {
    type: String,
    required: true,
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: "Farmer",
  },
  schemeName: {
    type: Schema.Types.ObjectId,
    ref: "Scheme",
  },
  approved: {
    type: Boolean,
    default: false,
  },
  processing: {
    type: Boolean,
    default: true,
  },
  rejectReason: {
    type: String,
    default: "",
  },
});

const Application = mongoose.model<applicationDocument>(
  "Application",
  applicationSchema
);

export default Application;
