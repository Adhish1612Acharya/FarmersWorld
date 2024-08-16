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
exports.applicationApprovement = exports.getApplicationDetails = exports.getApplications = exports.isLoggedIn = exports.loginFailure = exports.login = exports.signUp = void 0;
const Application_1 = __importDefault(require("../models/Application"));
const Admin_1 = __importDefault(require("../models/Admin"));
const Scheme_1 = __importDefault(require("../models/Scheme"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let signUpError = false;
        let { username, email, password } = req.body;
        let admin = new Admin_1.default({
            username: username,
            email: email,
        });
        let registeredAdmin = yield Admin_1.default.register(admin, password).catch((err) => {
            console.log("signUpError");
            console.log(err);
            signUpError = true;
            res.json("signUpError");
        });
        if (!signUpError && registeredAdmin) {
            req.login(registeredAdmin, (err) => {
                if (err) {
                    console.log(err);
                    res.json("signUpError");
                }
                else {
                    res.json({
                        signUpStatus: "directSignUp",
                        redirect: `/admin`,
                    });
                }
            });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        loginStatus: "directLogin",
        redirect: "/admin",
    });
});
exports.login = login;
const loginFailure = (req, res) => {
    res.json("failureLogin");
};
exports.loginFailure = loginFailure;
const isLoggedIn = (req, res) => {
    res.json("Logged In");
};
exports.isLoggedIn = isLoggedIn;
const getApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schemeId } = req.params;
    let result = yield Scheme_1.default.findById(schemeId)
        .populate({
        path: "applications",
        match: { processing: true },
    })
        .catch((err) => {
        console.log("Scheme not found error");
        console.log(err);
    });
    if (!result) {
        res.json("schemeNotFound");
    }
    else {
        res.json(result);
    }
});
exports.getApplications = getApplications;
const getApplicationDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { applicationId } = req.params;
    let application = yield Application_1.default.findById(applicationId)
        .populate("schemeName")
        .populate("applicant")
        .catch((err) => {
        console.log("Application not found error");
        console.log(err);
    });
    if (!application) {
        res.json("applicationNotFound");
    }
    else {
        res.json(application);
    }
});
exports.getApplicationDetails = getApplicationDetails;
const applicationApprovement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { applicationId, status } = req.params;
    let application;
    if (status === "approved") {
        application = yield Application_1.default.findByIdAndUpdate(applicationId, {
            processing: false,
            approved: true,
        }, { new: true } // This option returns the updated document
        ).catch((err) => {
            console.log("Application not found");
            console.log(err);
        });
        if (!application) {
            res.json("applicationNotFound");
        }
        else {
            res.json("approved");
        }
    }
    else if (status === "rejected") {
        const { rejectReason } = req.body;
        console.log("rejectReasonControoler", rejectReason);
        application = yield Application_1.default.findByIdAndUpdate(applicationId, {
            processing: false,
            approved: false,
            rejectReason: rejectReason,
        }, { new: true }).catch((err) => {
            console.log("Application not found");
            console.log(err);
        });
        console.log(application);
        if (!application) {
            res.json("applicationNotFound");
        }
        else {
            res.json("rejected");
        }
    }
    else {
        res.status(400).json("Invalid request");
    }
});
exports.applicationApprovement = applicationApprovement;
exports.default = {
    signUp: exports.signUp,
    login: exports.login,
    loginFailure: exports.loginFailure,
    isLoggedIn: exports.isLoggedIn,
    getApplications: exports.getApplications,
    getApplicationDetails: exports.getApplicationDetails,
    applicationApprovement: exports.applicationApprovement,
};
