"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateBody = exports.checkApplicationApplied = exports.loginFormIsLoggedIn = exports.UserAdminRole = exports.UserRole = exports.findUserRole = exports.redirect = exports.validateLoginForm = exports.validateSignUpForm = exports.validateApplicationSchema = void 0;
const schemaValidation_1 = require("./schemaValidation");
const expressError_1 = __importDefault(require("./utils/expressError"));
const Farmers_1 = __importDefault(require("./models/Farmers"));
const helperFunction_1 = __importDefault(require("./types/helperFunction"));
const zod_1 = require("zod");
const validateApplicationSchema = (req, res, next) => {
    try {
        schemaValidation_1.applicationSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const errorMsg = error.errors.map((el) => el.message).join(",");
            throw new expressError_1.default(400, errorMsg);
        }
        else {
            next(error);
        }
    }
};
exports.validateApplicationSchema = validateApplicationSchema;
const validateSignUpForm = (req, res, next) => {
    try {
        schemaValidation_1.signUpFormValidation.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const errorMsg = error.errors.map((el) => el.message).join(",");
            throw new expressError_1.default(400, errorMsg);
        }
        else {
            next(error);
        }
    }
};
exports.validateSignUpForm = validateSignUpForm;
const validateLoginForm = (req, res, next) => {
    try {
        schemaValidation_1.loginFormValidation.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const errorMsg = error.errors.map((el) => el.message).join(",");
            throw new expressError_1.default(400, errorMsg);
        }
        else {
            next(error);
        }
    }
};
exports.validateLoginForm = validateLoginForm;
const redirect = (req, res, next) => {
    res.locals.redirect = req.session.redirect;
    next();
};
exports.redirect = redirect;
const findUserRole = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.json(req.user.role);
    }
    else {
        return next();
    }
};
exports.findUserRole = findUserRole;
const UserRole = (req, res, next) => {
    let { route } = req.body;
    if (req.isAuthenticated()) {
        if (req.user.role === "admin") {
            res.json("roleIsAdmin");
        }
        else if (req.user.role === "farmer") {
            return next();
        }
    }
    else {
        if (route !== undefined) {
            req.session.redirect = route;
        }
        res.json("notLogin");
    }
};
exports.UserRole = UserRole;
const UserAdminRole = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role === "farmer") {
            res.json("roleIsFarmer");
        }
        else if (req.user.role === "admin") {
            return next();
        }
    }
    else {
        res.json("notLogin");
    }
};
exports.UserAdminRole = UserAdminRole;
const loginFormIsLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.json("notLogIn");
    }
    else {
        return next();
    }
};
exports.loginFormIsLoggedIn = loginFormIsLoggedIn;
const checkApplicationApplied = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let { id } = req.params;
    let farmersApplication = (yield Farmers_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).populate({
        path: "applications",
        populate: {
            path: "schemeName",
            model: "Scheme",
            match: { _id: id },
        },
    }));
    const applications = farmersApplication === null || farmersApplication === void 0 ? void 0 : farmersApplication.applications;
    let applied = false;
    if (applications) {
        for (const application of applications) {
            if ((0, helperFunction_1.default)(application) &&
                application.schemeName != null) {
                if (application.schemeName._id.equals(id) &&
                    application.processing === true) {
                    applied = true;
                }
            }
        }
    }
    if (applied) {
        res.json("alreadyApplied");
    }
    else {
        next();
    }
});
exports.checkApplicationApplied = checkApplicationApplied;
const populateBody = (req, res, next) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    next();
};
exports.populateBody = populateBody;
