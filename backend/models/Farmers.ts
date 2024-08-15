import mongoose, { Schema, Document, Mongoose } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { string } from "zod";

export interface adhaarObj {
  number: number;
  name: string;
}

export interface farmersDocument extends Document {
  username: string;
  email: string;
  adhaar: adhaarObj;
  farmersId: number;
  profilePhoto: string;
  contactNo: number;
  passportSizePhoto: string;
  applications: mongoose.Types.ObjectId[];
  profileComplete: boolean;
  role: string;
}

const farmersSchema = new Schema<farmersDocument>({
  username: {
    type: String,
    required: true,
    match: [/^\S+$/, "Invalid username"],
  },
  email: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/, "Invalid email"],
  },
  adhaar: {
    name: {
      type: String,
      default: "",
    },
    number: {
      type: Number,
      match: [/^\d{12}$/, "Invalid adhaar number"],
      default: 0,
    },
  },
  farmersId: {
    type: Number,
    match: [/^\d{12}$/, "Invalid farmersId"],
    default: 0,
  },
  profilePhoto: {
    type: String,
    default: "",
  },
  passportSizePhoto: {
    type: String,
    default: "",
  },
  contactNo: {
    type: Number,
    match: [/^\+91[6-9]\d{9}$/, "Invalid contact number"],
    default: 0,
  },
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
  profileComplete: {
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
