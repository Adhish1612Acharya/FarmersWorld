import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync";
import {
  validateApplicationSchema,
  UserRole,
  checkApplicationApplied,
  populateBody,
} from "../middlewares";

import schemesController from "../controllers/schemes";
import { storage } from "../cloudConfig";
import multer from "multer";
const upload = multer({ storage });
const cloudinary = require("../cloudConfig").cloudinary;

router.post("/", wrapAsync(schemesController.allSchemes));

router.post("/:id", wrapAsync(schemesController.singleScheme));

router.post("/filter/:filter", wrapAsync(schemesController.filterSchemeDetail));

router.post(
  "/:id/apply",
  UserRole,
  upload.single("image"),
  populateBody,
  validateApplicationSchema,
  checkApplicationApplied,
  wrapAsync(schemesController.applyScheme)
);

export default router;
