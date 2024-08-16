"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const wrapAsync_1 = __importDefault(require("../utils/wrapAsync"));
const middlewares_1 = require("../middlewares");
const admin_1 = __importDefault(require("../controllers/admin"));
const router = express_1.default.Router();
router.post("/signUp", middlewares_1.validateSignUpForm, (0, wrapAsync_1.default)(admin_1.default.signUp));
router.post("/login", middlewares_1.validateLoginForm, passport_1.default.authenticate("admin", {
    failureRedirect: "/api/admin/loginfailure",
}), admin_1.default.login);
router.get("/loginfailure", admin_1.default.loginFailure);
router.get("/schemes/:schemeId/applications", //route to get all applications of that particular scheme
middlewares_1.UserAdminRole, (0, wrapAsync_1.default)(admin_1.default.getApplications));
router.get("/schemes/applications/:applicationId", //route to get application details
middlewares_1.UserAdminRole, (0, wrapAsync_1.default)(admin_1.default.getApplicationDetails));
//route to approve or reject applications
router.put("/schemes/applications/:applicationId/:status", middlewares_1.UserAdminRole, middlewares_1.validateRejectedReason, (0, wrapAsync_1.default)(admin_1.default.applicationApprovement));
exports.default = router;
