import express from "express";
const router = express.Router();

import { findUserRole } from "../middlewares";

import commonController from "../controllers/common";

router.get("/loginCheck", findUserRole, commonController.checkLogin);

router.get("/logOut", commonController.logout);

export default router;
