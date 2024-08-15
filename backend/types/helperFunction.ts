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
import { Types } from "mongoose";

const isPopulatedScheme = (
  schemeName: Types.ObjectId | { heading: string }
): schemeName is { heading: string } => {
  return (schemeName as { heading: string }).heading !== undefined;
};

const isPopulatedAdhaar = (
  applicant: Types.ObjectId | { adhaar: { name: string }; contactNo: number }
): applicant is { adhaar: { name: string }; contactNo: number } => {
  return (
    (applicant as { adhaar: { name: string }; contactNo: number }) !== undefined
  );
};

export default { isPopulatedScheme, isPopulatedAdhaar, isPopulatedApplication };
