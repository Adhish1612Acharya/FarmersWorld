import {
  applicationSchema,
  signUpFormValidation,
  loginFormValidation,
} from "./schemaValidation";
import expressError from "./utils/expressError";
import { Request, Response, NextFunction } from "express";
import { User } from "./types/UserType.js";

import Farmer, { farmersDocument } from "./models/Farmers";
import isPopulatedApplication from "./types/helperFunction";
import { ZodError } from "zod";

export const validateApplicationSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    applicationSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMsg = error.errors.map((el) => el.message).join(",");
      throw new expressError(400, errorMsg);
    } else {
      next(error);
    }
  }
};

export const validateSignUpForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    signUpFormValidation.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMsg = error.errors.map((el) => el.message).join(",");
      throw new expressError(400, errorMsg);
    } else {
      next(error);
    }
  }
};

export const validateLoginForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    loginFormValidation.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMsg = error.errors.map((el) => el.message).join(",");
      throw new expressError(400, errorMsg);
    } else {
      next(error);
    }
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
