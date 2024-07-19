import mongoose, { Schema, Document, Mongoose } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export interface farmersDocument extends Document {
  email: string;
  adhaar: number;
  farmersId: number;
  applications: mongoose.Types.ObjectId[];
  profile: boolean;
  role: string;
}

const farmersSchema = new Schema<farmersDocument>({
  email: {
    type: String,
    required: true,
  },
  adhaar: {
    type: Number,
  },
  farmersId: {
    type: Number,
  },
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
  profile: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "farmer",
  },
});

farmersSchema.plugin(passportLocalMongoose);

const Farmer = mongoose.model<farmersDocument>("Farmer", farmersSchema);

export default Farmer;
