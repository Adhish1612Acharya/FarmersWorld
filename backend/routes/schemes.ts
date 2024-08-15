import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync";
import {
  validateApplicationSchema,
  UserRole,
  checkApplicationApplied,
  populateBody,
  getRequestLoginMiddleware,
} from "../middlewares";

import schemesController from "../controllers/schemes";
import { storage } from "../cloudConfig";
import multer from "multer";
const upload = multer({ storage });
const cloudinary = require("../cloudConfig").cloudinary;

router.get(
  "/",
  getRequestLoginMiddleware,
  wrapAsync(schemesController.allSchemes)
);

router.get(
  "/:id",
  getRequestLoginMiddleware,
  wrapAsync(schemesController.singleScheme)
);

router.get("/filter/:filter", wrapAsync(schemesController.filterSchemeDetail));

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
