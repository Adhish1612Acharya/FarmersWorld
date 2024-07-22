import { Request, Response } from "express";
import Farmer from "../models/Farmers";
import Application, { applicationDocument } from "../models/Application";
import { applicationStatNo, statBtn } from "../types/variableTypes";

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
          if (res.locals.redirect === undefined) {
            res.json({
              signUpStatus: "directSignUp",
              redirect: "/",
            });
          } else {
            res.json({
              signUpStatus: "success signUp",
              redirect: res.locals.redirect,
            });
          }
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
    });
  } else {
    res.json({
      loginStatus: "successLogin",
      redirect: res.locals.redirect,
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
      applications: allApplications,
      status: statFeatures,
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
    let details = await Application.findById(applicationId)
      .populate("schemeName")
      .catch((err) => {
        console.log("application not found error");
        console.log(err);
      });
    if (!details) {
      res.json("applicationNotFound");
    } else {
      res.json(details);
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
        model: "Scheme", //  'Scheme' is the name of the model
      },
    });
    if (data?.applications.length === 0) {
      res.json("noApplications");
    } else {
      res.json(data?.applications);
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
      res.json("noApplications");
    } else {
      res.json(data?.applications);
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
      res.json("noApplications");
    } else {
      res.json(data?.applications);
    }
  }
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
};
