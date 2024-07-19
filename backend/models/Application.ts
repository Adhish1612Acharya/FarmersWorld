import mongoose, { Schema, Document, Types } from "mongoose";

export interface applicationDocument extends Document {
  adhaar: string;
  farmersId: string;
  image: string;
  applicant: Types.ObjectId;
  schemeName: Types.ObjectId;
  approved: boolean;
  processing: boolean;
}

const applicationSchema = new Schema<applicationDocument>({
  adhaar: {
    type: String,
    required: true,
  },
  farmersId: {
    type: String,
    required: true,
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
});

const Application = mongoose.model<applicationDocument>(
  "Application",
  applicationSchema
);

export default Application;
