import mongoose, { Schema, Document } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { farmersDocument } from "./Farmers";

export interface adminDocument extends Document, farmersDocument {
  email: string;
  role: string;
}

const adminSchema = new Schema<adminDocument>({
  email: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/, "Invalid email"],
  },
  role: {
    type: String,
    default: "admin",
  },
});

adminSchema.plugin(passportLocalMongoose);

const Admin = mongoose.model<adminDocument>("Admin", adminSchema);

export default Admin;
