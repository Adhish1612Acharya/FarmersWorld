import express, { NextFunction } from "express";
const router = express.Router();
import {
  validateSignUpForm,
  validateLoginForm,
  redirect,
  UserRole,
  validateProfileForm,
  populateBody,
  validateProfilePhoto,
  multerErrorHandler,
} from "../middlewares";
import wrapAsync from "../utils/wrapAsync";
import passport from "passport";
import farmersController from "../controllers/farmers";
import multer from "multer";
import { storage } from "../cloudConfig";
const upload = multer({ storage });

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

//route to get farmers profile details
router.get("/profile", UserRole, wrapAsync(farmersController.getProfileInfo));

//routr to edit/add/complete farmers profile details
router.put(
  "/profile",
  UserRole,
  upload.single("passportSizePhoto"),
  populateBody,
  multerErrorHandler,
  validateProfileForm,
  wrapAsync(farmersController.editProfileInfo)
);

router.patch(
  "/profile/photo",
  UserRole,
  upload.single("image"),
  populateBody,
  validateProfilePhoto,
  wrapAsync(farmersController.editProfilePhoto)
);

router.delete(
  "/profile/photo",
  UserRole,
  wrapAsync(farmersController.deleteProfilePhoto)
);

export default router;
