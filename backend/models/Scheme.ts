import mongoose, { Schema, Document, Types } from "mongoose";

export interface govtSchemesDocument extends Document {
  heading: string;
  shortDescription: string;
  image: {
    type: String;
    required: true;
  };
  description: string;
  schemeType: "schemes" | "subsidies" | "products" | "newTech";
  applications: Types.ObjectId[];
}

const govtSchemesSchema = new Schema<govtSchemesDocument>({
  heading: {
    type: String,
    required: true,
    maxLength: 30,
  },
  shortDescription: {
    type: String,
    required: true,
    maxLength: 50,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 20000,
  },
  schemeType: {
    type: String,
    enum: ["schemes", "subsidies", "products", "newTech"],
  },
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Application",
      default: [],
    },
  ],
});

const Scheme = mongoose.model<govtSchemesDocument>("Scheme", govtSchemesSchema);

export default Scheme;
