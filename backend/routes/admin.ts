import express from "express";
import passport from "passport";
import wrapAsync from "../utils/wrapAsync";
import {
  validateLoginForm,
  validateSignUpForm,
  UserAdminRole,
} from "../middlewares";
import adminController from "../controllers/admin";

const router = express.Router();

router.post("/signUp", validateSignUpForm, wrapAsync(adminController.signUp));

router.post(
  "/login",
  validateLoginForm,
  passport.authenticate("admin", {
    failureRedirect: "/api/admin/loginfailure",
  }),
  adminController.login
);

router.get("/loginfailure", adminController.loginFailure);

router.get(
  "/schemes/:schemeId/applications", //route to get all applications of that particular scheme
  UserAdminRole,
  wrapAsync(adminController.getApplications)
);

router.get(
  "/schemes/applications/:applicationId", //route to get application details
  UserAdminRole,
  wrapAsync(adminController.getApplicationDetails)
);

router.put(
  //route to approve or reject applications
  "/schemes/applications/:applicationId/:status",
  UserAdminRole,
  wrapAsync(adminController.applicationApprovement)
);

export default router;
