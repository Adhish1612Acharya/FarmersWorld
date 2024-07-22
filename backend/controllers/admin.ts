import { Request, Response } from "express";
import Application from "../models/Application";
import Admin from "../models/Admin";
import Scheme from "../models/Scheme";

export const signUp = async (req: Request, res: Response) => {
  try {
    let signUpError = false;
    let { username, email, password } = req.body;
    let admin = new Admin({
      username: username,
      email: email,
    });

    let registeredAdmin = await Admin.register(admin, password).catch((err) => {
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
        } else {
          res.json({
            signUpStatus: "directSignUp",
            redirect: `/admin`,
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req: Request, res: Response) => {
  res.json({
    loginStatus: "directLogin",
    redirect: "/admin",
  });
};

export const loginFailure = (req: Request, res: Response) => {
  res.json("failureLogin");
};

export const isLoggedIn = (req: Request, res: Response) => {
  res.json("Logged In");
};

export const getApplications = async (req: Request, res: Response) => {
  const { schemeId } = req.params;
  let result = await Scheme.findById(schemeId as string)
    .populate({
      path: "applications",
      match: { processing: true },
    })
    .catch((err: any) => {
      console.log("Scheme not found error");
      console.log(err);
    });
  if (!result) {
    res.json("schemeNotFound");
  } else {
    res.json(result);
  }
};

export const getApplicationDetails = async (req: Request, res: Response) => {
  let { applicationId } = req.params;
  let application = await Application.findById(applicationId)
    .populate("schemeName")
    .catch((err) => {
      console.log("Application not found error");
      console.log(err);
    });
  if (!application) {
    res.json("applicationNotFound");
  } else {
    res.json(application);
  }
};

export const applicationApprovement = async (req: Request, res: Response) => {
  let { applicationId, status } = req.params;
  let application;
  if (status === "approved") {
    application = await Application.findByIdAndUpdate(
      applicationId,
      {
        processing: false,
        approved: true,
      },
      { new: true } // This option returns the updated document
    ).catch((err) => {
      console.log("Application not found");
      console.log(err);
    });
    if (!application) {
      res.json("applicationNotFound");
    } else {
      res.json("approved");
    }
  } else if (status === "rejected") {
    application = await Application.findByIdAndUpdate(
      applicationId,
      {
        processing: false,
        approved: false,
      },
      { new: true } // This option returns the updated document
    ).catch((err) => {
      console.log("Application not found");
      console.log(err);
    });
    if (!application) {
      res.json("applicationNotFound");
    } else {
      res.json("rejected");
    }
  } else {
    res.status(400).json("Invalid request");
  }
};

export default {
  signUp,
  login,
  loginFailure,
  isLoggedIn,
  getApplications,
  getApplicationDetails,
  applicationApprovement,
};
