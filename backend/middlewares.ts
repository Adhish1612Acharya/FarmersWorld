import {
  applicationSchema,
  signUpFormValidation,
  loginFormValidation,
  profileInfoValidate,
  profilephotoValidate,
  rejectReasonValidate,
} from "./schemaValidation";
import expressError from "./utils/expressError";
import { Request, Response, NextFunction } from "express";
import { User } from "./types/UserType.js";

import Farmer, { farmersDocument } from "./models/Farmers";
import helperFunction from "./types/helperFunction";
import { ZodError } from "zod";
import { Req } from "./types/express";
import multer from "multer";
import { storage } from "./cloudConfig";
const upload = multer({ storage });

export const validateApplicationSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const adhaar = JSON.parse(req.body.adhaar);
    const farmersId = JSON.parse(req.body.farmersId);
    const image = req.file?.path ? req.file.path : req.body.image;
    const dataToValidate = {
      adhaar,
      farmersId,
      image,
    };
    applicationSchema.parse(dataToValidate);
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

export const validateProfileForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const passportSizePhoto = req.file?.path
      ? req.file?.path
      : req.body.passportSizePhoto;

    const adhaar = JSON.parse(req.body.adhaar);
    const dataToValidate = {
      username: req.body.username,
      adhaar: adhaar,
      farmersId: parseInt(req.body.farmersId),
      contactNo: parseInt(req.body.contactNo),
      passportSizePhoto: passportSizePhoto,
    };
    profileInfoValidate.parse(dataToValidate);
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      const errorMsg = error.errors.map((el) => el.message).join(",");
      throw new expressError(400, errorMsg);
    } else {
      next(error);
    }
  }
};

export const validateProfilePhoto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profilePhoto = req.file ? req.file.path : req.body.image;
    profilephotoValidate.parse({ image: profilePhoto });
    next();
  } catch (error) {
    console.log("validationerror");
    console.log(error);
    if (error instanceof ZodError) {
      const errorMsg = error.errors.map((el) => el.message).join(",");
      throw new expressError(400, errorMsg);
    } else {
      next(error);
    }
  }
};

export const validateRejectedReason = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.params;
    if (status === "rejected") {
      rejectReasonValidate.parse(req.body);
    }
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      const errorMsg = error.errors.map((el) => el.message).join(",");
      throw new expressError(400, errorMsg);
    } else {
      next(error);
    }
  }
};

export const multerErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer error:", err);
    next(err);
  } else if (err) {
    console.error("Unknown error:", err);
    next(err);
  }
  next();
};

export const getRequestLoginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.mdata = {
    login: req.isAuthenticated(),
  };
  next();
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
  try {
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
  } catch (err) {
    console.log("UserRole middleware");
    console.log(err);
  }
};

export const UserAdminRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("middleware body", req.body);
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
        helperFunction.isPopulatedApplication(application) &&
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
