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
exports.getfilterFarmerApplicationDetails = exports.getFarmerApplicationDetails = exports.getFarmerApplications = exports.isLoggedIn = exports.logout = exports.loginFailure = exports.login = exports.signUp = void 0;
const Farmers_1 = __importDefault(require("../models/Farmers"));
const Application_1 = __importDefault(require("../models/Application"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let signUpError = false;
        let { username, email, password } = req.body;
        let NewFarmer = new Farmers_1.default({
            username: username,
            email: email,
        });
        let registerFarmer = yield Farmers_1.default.register(NewFarmer, password).catch((err) => {
            console.log("signUpError");
            console.log(err);
            signUpError = true;
            res.json("signUpError");
        });
        if (!signUpError && registerFarmer) {
            req.login(registerFarmer, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (res.locals.redirect === undefined) {
                        res.json({
                            signUpStatus: "directSignUp",
                            redirect: "/",
                        });
                    }
                    else {
                        res.json({
                            signUpStatus: "success signUp",
                            redirect: res.locals.redirect,
                        });
                    }
                }
            });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.signUp = signUp;
const login = (req, res) => {
    if (res.locals.redirect === undefined) {
        res.json({
            loginStatus: "directLogin",
            redirect: "/",
        });
    }
    else {
        res.json({
            loginStatus: "successLogin",
            redirect: res.locals.redirect,
        });
    }
};
exports.login = login;
const loginFailure = (req, res) => {
    console.log("failureLogin");
    res.json("failureLogin");
};
exports.loginFailure = loginFailure;
const logout = (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log(err);
            res.json("Some error occured");
        }
        else {
            console.log("loggedOut");
            res.send("loggedOut");
        }
    });
};
exports.logout = logout;
const isLoggedIn = (req, res) => {
    res.json("LoggedIn");
};
exports.isLoggedIn = isLoggedIn;
const getFarmerApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let data = yield Farmers_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).populate({
            path: "applications",
            populate: { path: "schemeName" },
        });
        const allApplications = data === null || data === void 0 ? void 0 : data.applications;
        let statFeatures = [];
        let applicationStatNo = {
            all: 0,
            approved: 0,
            rejected: 0,
            processing: 0,
        };
        if (allApplications.length !== 0) {
            for (let application of allApplications) {
                if (application.processing === true) {
                    statFeatures.push({ status: "Processing", color: "yellow" });
                    applicationStatNo.processing = applicationStatNo.processing + 1;
                }
                else if (application.approved === true) {
                    statFeatures.push({ status: "Approved", color: "green" });
                    applicationStatNo.approved = applicationStatNo.approved + 1;
                }
                else {
                    statFeatures.push({ status: "Rejected", color: "red" });
                    applicationStatNo.rejected = applicationStatNo.rejected + 1;
                }
            }
            applicationStatNo.all = statFeatures.length;
        }
        res.json({
            applications: allApplications,
            status: statFeatures,
            statTypeNo: applicationStatNo,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getFarmerApplications = getFarmerApplications;
const getFarmerApplicationDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { applicationId } = req.params;
        let details = yield Application_1.default.findById(applicationId)
            .populate("schemeName")
            .catch((err) => {
            console.log("application not found error");
            console.log(err);
        });
        if (!details) {
            res.json("applicationNotFound");
        }
        else {
            res.json(details);
        }
    }
    catch (err) {
        console.log("application not forund error");
        console.log(err);
    }
});
exports.getFarmerApplicationDetails = getFarmerApplicationDetails;
const getfilterFarmerApplicationDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let { status } = req.params;
    if (status === "processing") {
        let data = yield Farmers_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).populate({
            path: "applications",
            match: { processing: true },
            populate: {
                path: "schemeName",
                model: "Scheme", //  'Scheme' is the name of the model
            },
        });
        if ((data === null || data === void 0 ? void 0 : data.applications.length) === 0) {
            res.json("noApplications");
        }
        else {
            res.json(data === null || data === void 0 ? void 0 : data.applications);
        }
    }
    else if (status === "approved") {
        let data = yield Farmers_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id).populate({
            path: "applications",
            match: { approved: true },
            populate: {
                path: "schemeName",
                model: "Scheme",
            },
        });
        if ((data === null || data === void 0 ? void 0 : data.applications.length) === 0) {
            res.json("noApplications");
        }
        else {
            res.json(data === null || data === void 0 ? void 0 : data.applications);
        }
    }
    else if (status === "rejected") {
        let data = yield Farmers_1.default.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c._id).populate({
            path: "applications",
            match: { $and: [{ approved: false }, { processing: false }] },
            populate: {
                path: "schemeName",
                model: "Scheme",
            },
        });
        if ((data === null || data === void 0 ? void 0 : data.applications.length) === 0) {
            res.json("noApplications");
        }
        else {
            res.json(data === null || data === void 0 ? void 0 : data.applications);
        }
    }
});
exports.getfilterFarmerApplicationDetails = getfilterFarmerApplicationDetails;
exports.default = {
    signUp: exports.signUp,
    login: exports.login,
    loginFailure: exports.loginFailure,
    logout: exports.logout,
    isLoggedIn: exports.isLoggedIn,
    getFarmerApplications: exports.getFarmerApplications,
    getFarmerApplicationDetails: exports.getFarmerApplicationDetails,
    getfilterFarmerApplicationDetails: exports.getfilterFarmerApplicationDetails,
};
