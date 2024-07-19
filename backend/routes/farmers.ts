import express from "express";
const router = express.Router();
import {
  validateSignUpForm,
  validateLoginForm,
  redirect,
  UserRole,
} from "../middlewares";
import wrapAsync from "../utils/wrapAsync";
import passport from "passport";
import farmersController from "../controllers/farmers";

//signup route
router.post(
  "/signUp",
  validateSignUpForm,
  redirect,
  wrapAsync(farmersController.signUp)
);

//login route
router.post(
  "/login",
  validateLoginForm,
  redirect,
  passport.authenticate("farmer", {
    failureRedirect: "/api/farmers/loginFailure",
  }),
  farmersController.login
);

router.get("/loginFailure", farmersController.loginFailure);

//route to get all the applications of the farmer
router.get(
  "/getApplications",
  UserRole,
  wrapAsync(farmersController.getFarmerApplications)
);

//route to get details of  application of the farmer
router.get(
  "/getApplications/:applicationId",
  UserRole,
  wrapAsync(farmersController.getFarmerApplicationDetails)
);

//route to get particular status applications of the farmer
router.get(
  "/getApplications/filter/:status",
  UserRole,
  wrapAsync(farmersController.getfilterFarmerApplicationDetails)
);

export default router;
