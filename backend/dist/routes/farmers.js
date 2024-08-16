"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const middlewares_1 = require("../middlewares");
const wrapAsync_1 = __importDefault(require("../utils/wrapAsync"));
const passport_1 = __importDefault(require("passport"));
const farmers_1 = __importDefault(require("../controllers/farmers"));
const multer_1 = __importDefault(require("multer"));
const cloudConfig_1 = require("../cloudConfig");
const upload = (0, multer_1.default)({ storage: cloudConfig_1.storage });
//signup route
router.post("/signUp", middlewares_1.validateSignUpForm, middlewares_1.redirect, (0, wrapAsync_1.default)(farmers_1.default.signUp));
//login route
router.post("/login", middlewares_1.validateLoginForm, middlewares_1.redirect, passport_1.default.authenticate("farmer", {
    failureRedirect: "/api/farmers/loginFailure",
}), farmers_1.default.login);
router.get("/loginFailure", farmers_1.default.loginFailure);
//route to get all the applications of the farmer
router.get("/getApplications", middlewares_1.UserRole, (0, wrapAsync_1.default)(farmers_1.default.getFarmerApplications));
//route to get details of  application of the farmer
router.get("/getApplications/:applicationId", middlewares_1.UserRole, (0, wrapAsync_1.default)(farmers_1.default.getFarmerApplicationDetails));
//route to get particular status applications of the farmer
router.get("/getApplications/filter/:status", middlewares_1.UserRole, (0, wrapAsync_1.default)(farmers_1.default.getfilterFarmerApplicationDetails));
//route to get farmers profile details
router.get("/profile", middlewares_1.UserRole, (0, wrapAsync_1.default)(farmers_1.default.getProfileInfo));
//routr to edit/add/complete farmers profile details
router.put("/profile", middlewares_1.UserRole, upload.single("passportSizePhoto"), middlewares_1.populateBody, middlewares_1.multerErrorHandler, middlewares_1.validateProfileForm, (0, wrapAsync_1.default)(farmers_1.default.editProfileInfo));
router.patch("/profile/photo", middlewares_1.UserRole, upload.single("image"), middlewares_1.populateBody, middlewares_1.validateProfilePhoto, (0, wrapAsync_1.default)(farmers_1.default.editProfilePhoto));
router.delete("/profile/photo", middlewares_1.UserRole, (0, wrapAsync_1.default)(farmers_1.default.deleteProfilePhoto));
exports.default = router;
