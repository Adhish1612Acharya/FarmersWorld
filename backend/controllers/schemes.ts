import { Request, Response } from "express";
import Farmer, { farmersDocument } from "../models/Farmers";
import Scheme, { govtSchemesDocument } from "../models/Scheme";
import Application, { applicationDocument } from "../models/Application";
import { Types } from "mongoose";
import expressError from "../utils/expressError";
import isPopulatedApplication from "../types/helperFunction";

export const allSchemes = async (req: Request, res: Response) => {
  let schemes = await Scheme.find({})
    .populate("applications")
    .catch((err: any) => {
      console.log(err);
    });
  if (schemes) {
    if (req.isAuthenticated()) {
      if (req.user.role === "admin") {
        let count: number[] = [];
        for (let scheme of schemes) {
          let applications =
            scheme.applications as unknown as applicationDocument[];
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
          login: req.isAuthenticated(),
          role: req.user.role,
          count: count,
        });
      } else {
        res.json({
          schemes: schemes,
          login: req.isAuthenticated(),
          role: req.user.role,
        });
      }
    } else {
      res.json({ schemes: schemes, login: req.isAuthenticated() });
    }
  } else {
    res.json("noData");
  }
};

export const singleScheme = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let { route } = req.body;
    let data = (await Scheme.findById(id).catch((err: any) => {
      console.log("get scheme info error");
    })) as govtSchemesDocument;

    if (!data) {
      res.json("noSchemeFound");
    } else {
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
            application.schemeName != null &&
            application.schemeName._id.equals(id) &&
            application.processing === true
          ) {
            applied = true;
          }
        }
      }
      if (req.isAuthenticated()) {
        res.json({
          applied: applied,
          schemeDetail: data,
          login: req.isAuthenticated(),
          role: req.user?._id,
        });
      } else {
        (req.session as any).redirect = route;
        res.json({
          applied: applied,
          schemeDetail: data,
          login: req.isAuthenticated(),
        });
      }
    }
  } catch (err) {
    throw new expressError(500, "Some error occured");
  }
};

export const filterSchemeDetail = async (req: Request, res: Response) => {
  try {
    const { filter } = req.params;
    let schemes = await Scheme.find({ schemeType: filter }).populate(
      "applications"
    );
    if (!schemes) {
      res.json("noSchemesFound");
    } else {
      if (req.isAuthenticated() && req.user.role === "admin") {
        let count: number[] = [];
        for (let scheme of schemes) {
          let applications =
            scheme.applications as unknown as applicationDocument[];
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
        });
      } else {
        res.json({
          role: "farmer",
          schemes: schemes,
        });
      }
    }
  } catch (err) {
    console.log(err);
    console.log("filter error");
    res.json("NoSchemesFound");
  }
};

export const applyScheme = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let newApplication = new Application(req.body);
    newApplication.applicant = new Types.ObjectId(req.user?._id as string);
    newApplication.schemeName = new Types.ObjectId(id as string);
    let savedApplication = (await newApplication.save()) as applicationDocument;

    let farmer = (await Farmer.findById(req.user?._id)) as farmersDocument;
    farmer.applications.push(
      new Types.ObjectId(savedApplication._id as string)
    );
    await farmer.save();
    let scheme = await Scheme.findByIdAndUpdate(id, {
      $push: { applications: savedApplication },
    }).catch((err: any) => {
      console.log("Scheme Not found");
      console.log(err);
    });
    if (!scheme) {
      res.json("No scheme Found");
    } else {
      res.json("applied");
    }
  } catch (err) {
    console.log(err);
    res.json("errorOccured");
  }
};

export const checkApplied = async (req: Request, res: Response) => {
  res.json("notApplied");
};

export default {
  allSchemes,
  singleScheme,
  filterSchemeDetail,
  applyScheme,
  checkApplied,
};
