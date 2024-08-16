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
exports.deleteProfilePhoto = exports.editProfilePhoto = exports.editProfileInfo = exports.getProfileInfo = exports.getfilterFarmerApplicationDetails = exports.getFarmerApplicationDetails = exports.getFarmerApplications = exports.isLoggedIn = exports.logout = exports.loginFailure = exports.login = exports.signUp = void 0;
const Farmers_1 = __importDefault(require("../models/Farmers"));
const Application_1 = __importDefault(require("../models/Application"));
const helperFunction_1 = __importDefault(require("../types/helperFunction"));
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
                var _a;
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({
                        signUpStatus: "success signUp",
                        redirect: res.locals.redirect,
                        profilePhoto: (_a = req.user) === null || _a === void 0 ? void 0 : _a.profilePhoto,
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
const login = (req, res) => {
    var _a, _b;
    if (res.locals.redirect === undefined) {
        res.json({
            loginStatus: "directLogin",
            redirect: "/",
            profilePhoto: (_a = req.user) === null || _a === void 0 ? void 0 : _a.profilePhoto,
        });
    }
    else {
        res.json({
            loginStatus: "successLogin",
            redirect: res.locals.redirect,
            profilePhoto: (_b = req.user) === null || _b === void 0 ? void 0 : _b.profilePhoto,
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
            applications: allApplications.reverse(),
            status: statFeatures.reverse(),
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
        const details = yield Application_1.default.findById(applicationId)
            .populate({ path: "applicant", select: "adhaar  contactNo" })
            .populate({
            path: "schemeName",
            select: "heading",
        })
            .catch((err) => {
            console.log("Application not found error");
        });
        let schemeNameHeading;
        let nameInAdhaar;
        let phoneNo;
        if (!details) {
            res.json("applicationNotFound");
        }
        else {
            if (details &&
                helperFunction_1.default.isPopulatedScheme(details.schemeName) &&
                helperFunction_1.default.isPopulatedAdhaar(details.applicant)) {
                schemeNameHeading = details.schemeName.heading;
                nameInAdhaar = details.applicant.adhaar.name;
                phoneNo = details.applicant.contactNo;
            }
            const applicationDetails = {
                _id: details === null || details === void 0 ? void 0 : details._id,
                adhaar: details === null || details === void 0 ? void 0 : details.adhaar,
                farmersId: details === null || details === void 0 ? void 0 : details.farmersId,
                image: details === null || details === void 0 ? void 0 : details.image,
                schemeName: schemeNameHeading,
                approved: details === null || details === void 0 ? void 0 : details.approved,
                processing: details === null || details === void 0 ? void 0 : details.processing,
                name: nameInAdhaar,
                contactNo: phoneNo,
                rejectReason: details.rejectReason,
            };
            res.json(applicationDetails);
        }
    }
    catch (err) {
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
                model: "Scheme",
            },
        });
        if ((data === null || data === void 0 ? void 0 : data.applications.length) === 0) {
            res.json({ login: req.isAuthenticated(), details: "noApplications" });
        }
        else {
            res.json({
                login: req.isAuthenticated(),
                details: data === null || data === void 0 ? void 0 : data.applications.reverse(),
            });
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
            res.json({ login: req.isAuthenticated(), details: "noApplications" });
        }
        else {
            res.json({
                login: req.isAuthenticated(),
                details: data === null || data === void 0 ? void 0 : data.applications.reverse(),
            });
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
            res.json({ login: req.isAuthenticated(), details: "noApplications" });
        }
        else {
            res.json({
                login: req.isAuthenticated(),
                details: data === null || data === void 0 ? void 0 : data.applications.reverse(),
            });
        }
    }
});
exports.getfilterFarmerApplicationDetails = getfilterFarmerApplicationDetails;
const getProfileInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const profileInfo = yield Farmers_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).populate("applications");
    const allApplications = profileInfo === null || profileInfo === void 0 ? void 0 : profileInfo.applications;
    let applicationStatNo = {
        all: 0,
        approved: 0,
        rejected: 0,
        processing: 0,
    };
    if ((allApplications === null || allApplications === void 0 ? void 0 : allApplications.length) !== 0) {
        for (let application of allApplications) {
            if (application.processing === true) {
                applicationStatNo.processing = applicationStatNo.processing + 1;
            }
            else if (application.approved === true) {
                applicationStatNo.approved = applicationStatNo.approved + 1;
            }
            else {
                applicationStatNo.rejected = applicationStatNo.rejected + 1;
            }
        }
        applicationStatNo.all = allApplications.length;
    }
    const profileData = {
        profilePhoto: profileInfo === null || profileInfo === void 0 ? void 0 : profileInfo.profilePhoto,
        userAccountName: profileInfo === null || profileInfo === void 0 ? void 0 : profileInfo.username,
        name: profileInfo === null || profileInfo === void 0 ? void 0 : profileInfo.adhaar.name,
        adhaarNo: profileInfo === null || profileInfo === void 0 ? void 0 : profileInfo.adhaar.number,
        fuid: profileInfo === null || profileInfo === void 0 ? void 0 : profileInfo.farmersId,
        passportSizePhoto: profileInfo === null || profileInfo === void 0 ? void 0 : profileInfo.passportSizePhoto,
        phoneContact: profileInfo === null || profileInfo === void 0 ? void 0 : profileInfo.contactNo,
        email: profileInfo === null || profileInfo === void 0 ? void 0 : profileInfo.email,
        applicationStatNo: applicationStatNo,
    };
    res.json({
        message: "profileInfoSent",
        profileInfo: profileData,
        profileCompleteStatus: profileInfo === null || profileInfo === void 0 ? void 0 : profileInfo.profileComplete,
    });
});
exports.getProfileInfo = getProfileInfo;
const editProfileInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { username, adhaar, farmersId, contactNo } = req.body;
        const parsedAdhaar = JSON.parse(adhaar);
        const passportSizePhoto = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path)
            ? (_b = req.file) === null || _b === void 0 ? void 0 : _b.path
            : req.body.passportSizePhoto;
        const userProfile = yield Farmers_1.default.findByIdAndUpdate((_c = req.user) === null || _c === void 0 ? void 0 : _c._id, {
            username,
            adhaar: parsedAdhaar,
            farmersId,
            contactNo,
            passportSizePhoto,
            profileComplete: true,
        }, { new: true });
        const profileData = {
            userAccountName: userProfile === null || userProfile === void 0 ? void 0 : userProfile.username,
            name: userProfile === null || userProfile === void 0 ? void 0 : userProfile.adhaar.name,
            adhaarNo: userProfile === null || userProfile === void 0 ? void 0 : userProfile.adhaar.number,
            fuid: userProfile === null || userProfile === void 0 ? void 0 : userProfile.farmersId,
            passportSizePhoto: userProfile === null || userProfile === void 0 ? void 0 : userProfile.passportSizePhoto,
            phoneContact: userProfile === null || userProfile === void 0 ? void 0 : userProfile.contactNo,
        };
        res.json({
            message: "profileEdited",
            profileInfo: profileData,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.editProfileInfo = editProfileInfo;
const editProfilePhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let updatedFarmerProfile = "";
    if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
        const data = yield Farmers_1.default.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, {
            profilePhoto: (_c = req.file) === null || _c === void 0 ? void 0 : _c.path,
        }, { new: true });
        updatedFarmerProfile = (data === null || data === void 0 ? void 0 : data.profilePhoto) ? data === null || data === void 0 ? void 0 : data.profilePhoto : "";
    }
    else {
        updatedFarmerProfile = req.body.image;
    }
    res.json({
        message: "profilePhotoUpdated",
        updatedProfilePhoto: updatedFarmerProfile,
    });
});
exports.editProfilePhoto = editProfilePhoto;
const deleteProfilePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield Farmers_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, {
        profilePhoto: "",
    }, { new: true });
    console.log();
    res.json({
        message: "profilePhotoDeleted",
        updatedPhoto: user === null || user === void 0 ? void 0 : user.profilePhoto,
    });
});
exports.deleteProfilePhoto = deleteProfilePhoto;
exports.default = {
    signUp: exports.signUp,
    login: exports.login,
    loginFailure: exports.loginFailure,
    logout: exports.logout,
    isLoggedIn: exports.isLoggedIn,
    getFarmerApplications: exports.getFarmerApplications,
    getFarmerApplicationDetails: exports.getFarmerApplicationDetails,
    getfilterFarmerApplicationDetails: exports.getfilterFarmerApplicationDetails,
    getProfileInfo: exports.getProfileInfo,
    editProfileInfo: exports.editProfileInfo,
    editProfilePhoto: exports.editProfilePhoto,
    deleteProfilePhoto: exports.deleteProfilePhoto,
};
