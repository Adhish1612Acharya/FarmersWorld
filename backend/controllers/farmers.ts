import { NextFunction, Request, Response } from "express";
import Farmer, { farmersDocument } from "../models/Farmers";
import Application, { applicationDocument } from "../models/Application";
import { applicationStatNo, statBtn } from "../types/variableTypes";
import { govtSchemesDocument } from "../models/Scheme";
import helperFunction from "../types/helperFunction";

export const signUp = async (req: Request, res: Response) => {
  try {
    let signUpError = false;
    let { username, email, password } = req.body;
    let NewFarmer = new Farmer({
      username: username,
      email: email,
    });
    let registerFarmer = await Farmer.register(NewFarmer, password).catch(
      (err) => {
        console.log("signUpError");
        console.log(err);
        signUpError = true;
        res.json("signUpError");
      }
    );
    if (!signUpError && registerFarmer) {
      req.login(registerFarmer, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            signUpStatus: "success signUp",
            redirect: res.locals.redirect,
            profilePhoto: req.user?.profilePhoto,
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const login = (req: Request, res: Response) => {
  if (res.locals.redirect === undefined) {
    res.json({
      loginStatus: "directLogin",
      redirect: "/",
      profilePhoto: req.user?.profilePhoto,
    });
  } else {
    res.json({
      loginStatus: "successLogin",
      redirect: res.locals.redirect,
      profilePhoto: req.user?.profilePhoto,
    });
  }
};

export const loginFailure = (req: Request, res: Response) => {
  console.log("failureLogin");
  res.json("failureLogin");
};

export const logout = (req: Request, res: Response) => {
  req.logOut((err) => {
    if (err) {
      console.log(err);
      res.json("Some error occured");
    } else {
      console.log("loggedOut");
      res.send("loggedOut");
    }
  });
};

export const isLoggedIn = (req: Request, res: Response) => {
  res.json("LoggedIn");
};

export const getFarmerApplications = async (req: Request, res: Response) => {
  try {
    let data = await Farmer.findById(req.user?._id).populate({
      path: "applications",
      populate: { path: "schemeName" },
    });
    const allApplications =
      data?.applications as unknown as applicationDocument[];
    let statFeatures: statBtn[] = [];
    let applicationStatNo: applicationStatNo = {
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
        } else if (application.approved === true) {
          statFeatures.push({ status: "Approved", color: "green" });
          applicationStatNo.approved = applicationStatNo.approved + 1;
        } else {
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
  } catch (err) {
    console.log(err);
  }
};

export const getFarmerApplicationDetails = async (
  req: Request,
  res: Response
) => {
  try {
    let { applicationId } = req.params;

    const details = await Application.findById(applicationId)
      .populate({ path: "applicant", select: "adhaar  contactNo" })
      .populate({
        path: "schemeName",
        select: "heading",
      });
    let schemeNameHeading: string | undefined;
    let nameInAdhaar: string | undefined;
    let phoneNo: number | undefined;

    if (!details) {
      res.json("applicationNotFound");
    } else {
      if (
        details &&
        helperFunction.isPopulatedScheme(details.schemeName) &&
        helperFunction.isPopulatedAdhaar(details.applicant)
      ) {
        schemeNameHeading = details.schemeName.heading;
        nameInAdhaar = details.applicant.adhaar.name;
        phoneNo = details.applicant.contactNo;
      }

      const applicationDetails = {
        _id: details?._id,
        adhaar: details?.adhaar,
        farmersId: details?.farmersId,
        image: details?.image,
        schemeName: schemeNameHeading,
        approved: details?.approved,
        processing: details?.processing,
        name: nameInAdhaar,
        contactNo: phoneNo,
        rejectReason: details.rejectReason,
      };
      res.json(applicationDetails);
    }
  } catch (err) {
    console.log("application not forund error");
    console.log(err);
  }
};

export const getfilterFarmerApplicationDetails = async (
  req: Request,
  res: Response
) => {
  let { status } = req.params;
  if (status === "processing") {
    let data = await Farmer.findById(req.user?._id).populate({
      path: "applications",
      match: { processing: true },
      populate: {
        path: "schemeName",
        model: "Scheme",
      },
    });
    if (data?.applications.length === 0) {
      res.json({ login: req.isAuthenticated(), details: "noApplications" });
    } else {
      res.json({
        login: req.isAuthenticated(),
        details: data?.applications.reverse(),
      });
    }
  } else if (status === "approved") {
    let data = await Farmer.findById(req.user?._id).populate({
      path: "applications",
      match: { approved: true },
      populate: {
        path: "schemeName",
        model: "Scheme",
      },
    });
    if (data?.applications.length === 0) {
      res.json({ login: req.isAuthenticated(), details: "noApplications" });
    } else {
      res.json({
        login: req.isAuthenticated(),
        details: data?.applications.reverse(),
      });
    }
  } else if (status === "rejected") {
    let data = await Farmer.findById(req.user?._id).populate({
      path: "applications",
      match: { $and: [{ approved: false }, { processing: false }] },
      populate: {
        path: "schemeName",
        model: "Scheme",
      },
    });
    if (data?.applications.length === 0) {
      res.json({ login: req.isAuthenticated(), details: "noApplications" });
    } else {
      res.json({
        login: req.isAuthenticated(),
        details: data?.applications.reverse(),
      });
    }
  }
};

export const getProfileInfo = async (req: Request, res: Response) => {
  const profileInfo = await Farmer.findById(req.user?._id).populate(
    "applications"
  );
  const allApplications =
    profileInfo?.applications as unknown as applicationDocument[];
  let applicationStatNo: applicationStatNo = {
    all: 0,
    approved: 0,
    rejected: 0,
    processing: 0,
  };
  if (allApplications?.length !== 0) {
    for (let application of allApplications) {
      if (application.processing === true) {
        applicationStatNo.processing = applicationStatNo.processing + 1;
      } else if (application.approved === true) {
        applicationStatNo.approved = applicationStatNo.approved + 1;
      } else {
        applicationStatNo.rejected = applicationStatNo.rejected + 1;
      }
    }
    applicationStatNo.all = allApplications.length;
  }
  const profileData = {
    profilePhoto: profileInfo?.profilePhoto,
    userAccountName: profileInfo?.username,
    name: profileInfo?.adhaar.name,
    adhaarNo: profileInfo?.adhaar.number,
    fuid: profileInfo?.farmersId,
    passportSizePhoto: profileInfo?.passportSizePhoto,
    phoneContact: profileInfo?.contactNo,
    email: profileInfo?.email,
    applicationStatNo: applicationStatNo,
  };
  res.json({
    message: "profileInfoSent",
    profileInfo: profileData,
    profileCompleteStatus: profileInfo?.profileComplete,
  });
};

export const editProfileInfo = async (req: Request, res: Response) => {
  try {
    const { username, adhaar, farmersId, contactNo } = req.body;

    const parsedAdhaar = JSON.parse(adhaar);

    const passportSizePhoto = req.file?.path
      ? req.file?.path
      : req.body.passportSizePhoto;

    const userProfile = await Farmer.findByIdAndUpdate(
      req.user?._id,
      {
        username,
        adhaar: parsedAdhaar,
        farmersId,
        contactNo,
        passportSizePhoto,
        profileComplete: true,
      },
      { new: true }
    );

    const profileData = {
      userAccountName: userProfile?.username,
      name: userProfile?.adhaar.name,
      adhaarNo: userProfile?.adhaar.number,
      fuid: userProfile?.farmersId,
      passportSizePhoto: userProfile?.passportSizePhoto,
      phoneContact: userProfile?.contactNo,
    };

    res.json({
      message: "profileEdited",
      profileInfo: profileData,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editProfilePhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let updatedFarmerProfile: string | null = "";
  if (req.file?.path) {
    const data = await Farmer.findByIdAndUpdate(
      req.user?._id,
      {
        profilePhoto: req.file?.path,
      },
      { new: true }
    );
    updatedFarmerProfile = data?.profilePhoto ? data?.profilePhoto : "";
  } else {
    updatedFarmerProfile = req.body.image;
  }
  res.json({
    message: "profilePhotoUpdated",
    updatedProfilePhoto: updatedFarmerProfile,
  });
};

export const deleteProfilePhoto = async (req: Request, res: Response) => {
  const user = await Farmer.findByIdAndUpdate(
    req.user?._id,
    {
      profilePhoto: "",
    },
    { new: true }
  );
  console.log();
  res.json({
    message: "profilePhotoDeleted",
    updatedPhoto: user?.profilePhoto,
  });
};

export default {
  signUp,
  login,
  loginFailure,
  logout,
  isLoggedIn,
  getFarmerApplications,
  getFarmerApplicationDetails,
  getfilterFarmerApplicationDetails,
  getProfileInfo,
  editProfileInfo,
  editProfilePhoto,
  deleteProfilePhoto,
};
