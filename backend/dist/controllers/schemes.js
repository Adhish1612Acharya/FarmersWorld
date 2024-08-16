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
exports.checkApplied = exports.applyScheme = exports.filterSchemeDetail = exports.singleScheme = exports.allSchemes = void 0;
const Farmers_1 = __importDefault(require("../models/Farmers"));
const Scheme_1 = __importDefault(require("../models/Scheme"));
const Application_1 = __importDefault(require("../models/Application"));
const mongoose_1 = require("mongoose");
const expressError_1 = __importDefault(require("../utils/expressError"));
const helperFunction_1 = __importDefault(require("../types/helperFunction"));
const allSchemes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const loginStatus = (_a = req.mdata) === null || _a === void 0 ? void 0 : _a.login;
    let schemes = yield Scheme_1.default.find({})
        .populate("applications")
        .catch((err) => {
        console.log(err);
    });
    if (schemes) {
        if (req.isAuthenticated()) {
            if (req.user.role === "admin") {
                let count = [];
                for (let scheme of schemes) {
                    let applications = scheme.applications;
                    let number = 0;
                    for (let application of applications) {
                        if (application.processing === true) {
                            number++;
                        }
                    }
                    count.push(number);
                }
                res.json({
                    schemes: schemes,
                    login: loginStatus,
                    role: req.user.role,
                    count: count,
                });
            }
            else {
                res.json({
                    schemes: schemes,
                    login: loginStatus,
                    role: req.user.role,
                });
            }
        }
        else {
            res.json({ schemes: schemes, login: loginStatus });
        }
    }
    else {
        res.json("noData");
    }
});
exports.allSchemes = allSchemes;
const singleScheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let { id } = req.params;
        let { route } = req.query;
        const loginStatus = (_a = req.mdata) === null || _a === void 0 ? void 0 : _a.login;
        let data = (yield Scheme_1.default.findById(id).catch((err) => {
            console.log("get scheme info error");
        }));
        let applied = false;
        if (!data) {
            res.json("noSchemeFound");
        }
        else {
            if (req.isAuthenticated()) {
                let farmersApplication = (yield Farmers_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id).populate({
                    path: "applications",
                    populate: {
                        path: "schemeName",
                        model: "Scheme",
                        match: { _id: id },
                    },
                }));
                const applications = farmersApplication === null || farmersApplication === void 0 ? void 0 : farmersApplication.applications;
                if (applications) {
                    for (const application of applications) {
                        if (helperFunction_1.default.isPopulatedApplication(application) &&
                            application.schemeName != null &&
                            application.schemeName._id.equals(id) &&
                            application.processing === true) {
                            applied = true;
                        }
                    }
                }
                const profileInfo = {
                    adhaar: farmersApplication === null || farmersApplication === void 0 ? void 0 : farmersApplication.adhaar.number,
                    farmersId: farmersApplication === null || farmersApplication === void 0 ? void 0 : farmersApplication.farmersId,
                    image: farmersApplication === null || farmersApplication === void 0 ? void 0 : farmersApplication.passportSizePhoto,
                    profileComplete: farmersApplication === null || farmersApplication === void 0 ? void 0 : farmersApplication.profileComplete,
                };
                res.json({
                    applied: applied,
                    schemeDetail: data,
                    login: loginStatus,
                    profileInfo: profileInfo,
                    role: (_c = req.user) === null || _c === void 0 ? void 0 : _c.role,
                });
            }
            else {
                req.session.redirect = route;
                res.json({
                    applied: applied,
                    schemeDetail: data,
                    login: loginStatus,
                });
            }
        }
    }
    catch (err) {
        throw new expressError_1.default(500, "Some error occured");
    }
});
exports.singleScheme = singleScheme;
const filterSchemeDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter } = req.params;
        let schemes = yield Scheme_1.default.find({ schemeType: filter }).populate("applications");
        if (!schemes) {
            res.json("noSchemesFound");
        }
        else {
            if (req.isAuthenticated() && req.user.role === "admin") {
                let count = [];
                for (let scheme of schemes) {
                    let applications = scheme.applications;
                    let number = 0;
                    for (let application of applications) {
                        if (application.processing === true) {
                            number++;
                        }
                    }
                    count.push(number);
                }
                res.json({
                    role: "admin",
                    count: count,
                    schemes: schemes,
                    login: true,
                });
            }
            else {
                res.json({
                    role: "farmer",
                    schemes: schemes,
                    login: req.isAuthenticated(),
                });
            }
        }
    }
    catch (err) {
        console.log(err);
        console.log("filter error");
        res.json("NoSchemesFound");
    }
});
exports.filterSchemeDetail = filterSchemeDetail;
const applyScheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        let { id } = req.params;
        let newApplication = new Application_1.default(req.body);
        if (((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) !== undefined) {
            newApplication.image = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
        }
        newApplication.applicant = new mongoose_1.Types.ObjectId((_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
        newApplication.schemeName = new mongoose_1.Types.ObjectId(id);
        let savedApplication = (yield newApplication.save());
        let farmer = (yield Farmers_1.default.findById((_d = req.user) === null || _d === void 0 ? void 0 : _d._id));
        farmer.applications.push(new mongoose_1.Types.ObjectId(savedApplication._id));
        yield farmer.save();
        let scheme = yield Scheme_1.default.findByIdAndUpdate(id, {
            $push: { applications: savedApplication },
        }).catch((err) => {
            console.log("Scheme Not found");
            console.log(err);
        });
        if (!scheme) {
            res.json("No scheme Found");
        }
        else {
            res.json({ status: "applied", id: savedApplication._id });
        }
    }
    catch (err) {
        console.log(err);
        res.json("errorOccured");
    }
});
exports.applyScheme = applyScheme;
const checkApplied = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("notApplied");
});
exports.checkApplied = checkApplied;
exports.default = {
    allSchemes: exports.allSchemes,
    singleScheme: exports.singleScheme,
    filterSchemeDetail: exports.filterSchemeDetail,
    applyScheme: exports.applyScheme,
    checkApplied: exports.checkApplied,
};
