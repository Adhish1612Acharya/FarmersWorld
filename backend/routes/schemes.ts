import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync";
import {
  validateApplicationSchema,
  UserRole,
  checkApplicationApplied,
} from "../middlewares";

import schemesController from "../controllers/schemes";
// const { storage } = require("../cloudConfig.js");
// const multer = require("multer");
// const Upload = multer({ storage });
// const cloudinary = require("../cloudConfig.js").cloudinary;

router.get("/", wrapAsync(schemesController.allSchemes));

router.post("/:id", wrapAsync(schemesController.singleScheme));

router.get("/filter/:filter", wrapAsync(schemesController.filterSchemeDetail));

router.post(
  "/:id/apply",
  UserRole,
  validateApplicationSchema,
  checkApplicationApplied,
  wrapAsync(schemesController.applyScheme)
);

export default router;
