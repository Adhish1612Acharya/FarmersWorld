import mongoose from "mongoose";
import { applicationDocument } from "../models/Application";
import { govtSchemesDocument } from "../models/Scheme";

/* Helper function to check if an object is of type applicationDocument &
 { schemeName: govtSchemesDocument }*/
const isPopulatedApplication = (
  application:
    | mongoose.Types.ObjectId
    | (applicationDocument & { schemeName: govtSchemesDocument })
): application is applicationDocument & { schemeName: govtSchemesDocument } => {
  return (
    typeof application === "object" &&
    application !== null &&
    "adhaar" in application &&
    "schemeName" in application &&
    typeof (application as any).schemeName === "object"
  );
};

export default isPopulatedApplication;
