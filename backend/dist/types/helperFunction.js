"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Helper function to check if an object is of type applicationDocument &
 { schemeName: govtSchemesDocument }*/
const isPopulatedApplication = (application) => {
    return (typeof application === "object" &&
        application !== null &&
        "adhaar" in application &&
        "schemeName" in application &&
        typeof application.schemeName === "object");
};
exports.default = isPopulatedApplication;
