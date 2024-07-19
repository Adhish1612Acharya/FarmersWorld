import {
  applicationSchema,
  signUpFormValidation,
  loginFormValidation,
} from "./schemaValidation";
import expressError from "./utils/expressError";
import { Request, Response, NextFunction } from "express";
import { ValidationErrorItem } from "joi";
import { User } from "./types/UserType.js";

import Farmer, { farmersDocument } from "./models/Farmers";
import isPopulatedApplication from "./types/helperFunction";

export const validateApplicationSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { error } = applicationSchema.validate(req.body);
  if (error) {
    let errorMsg = error.details
      .map((el: ValidationErrorItem) => el.message)
      .join(",");
    throw new expressError(400, errorMsg);
  } else {
    next();
  }
};

export const validateSignUpForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { error } = signUpFormValidation.validate(req.body);
  if (error) {
    let errMsg = error.details
      .map((el: ValidationErrorItem) => el.message)
      .join(",");
    errMsg;
    throw new expressError(400, errMsg);
  } else {
    next();
  }
};

export const validateLoginForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { error } = loginFormValidation.validate(req.body);
  if (error) {
    let errMsg = error.details
      .map((el: ValidationErrorItem) => el.message)
      .join(",");
    throw new expressError(400, errMsg);
  } else {
    next();
  }
};

export const redirect = (req: Request, res: Response, next: NextFunction) => {
  res.locals.redirect = (req.session as any).redirect;
  next();
};

export const findUserRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return res.json(req.user.role);
  } else {
    return next();
  }
};

export const UserRole = (req: Request, res: Response, next: NextFunction) => {
  let { route } = req.body;
  if (req.isAuthenticated()) {
    if ((req.user as User).role === "admin") {
      res.json("roleIsAdmin");
    } else if ((req.user as User).role === "farmer") {
      return next();
    }
  } else {
    if (route !== undefined) {
      (req.session as any).redirect = route;
    }
    res.json("notLogin");
  }
};

export const UserAdminRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    if ((req.user as User).role === "farmer") {
      res.json("roleIsFarmer");
    } else if ((req.user as User).role === "admin") {
      return next();
    }
  } else {
    res.json("notLogin");
  }
};

export const loginFormIsLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    return res.json("notLogIn");
  } else {
    return next();
  }
};

export const checkApplicationApplied = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { id } = req.params;
  let farmersApplication = (await Farmer.findById(req.user?._id).populate({
    path: "applications",
    populate: {
      path: "schemeName",
      model: "Scheme",
      match: { _id: id },
    },
  })) as farmersDocument | null;

  const applications = farmersApplication?.applications;

  let applied: boolean = false;
  if (applications) {
    for (const application of applications) {
      if (
        isPopulatedApplication(application) &&
        application.schemeName != null
      ) {
        if (
          application.schemeName._id.equals(id) &&
          application.processing === true
        ) {
          applied = true;
        }
      }
    }
  }

  if (applied) {
    res.json("alreadyApplied");
  } else {
    next();
  }
};

export const populateBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body = JSON.parse(JSON.stringify(req.body));
  next();
};
