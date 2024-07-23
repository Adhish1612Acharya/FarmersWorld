"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const wrapAsync_1 = __importDefault(require("../utils/wrapAsync"));
const middlewares_1 = require("../middlewares");
const schemes_1 = __importDefault(require("../controllers/schemes"));
const cloudConfig_1 = require("../cloudConfig");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: cloudConfig_1.storage });
const cloudinary = require("../cloudConfig").cloudinary;
router.get("/", (0, wrapAsync_1.default)(schemes_1.default.allSchemes));
router.post("/:id", (0, wrapAsync_1.default)(schemes_1.default.singleScheme));
router.get("/filter/:filter", (0, wrapAsync_1.default)(schemes_1.default.filterSchemeDetail));
router.post("/:id/apply", middlewares_1.UserRole, upload.single("image"), middlewares_1.populateBody, middlewares_1.validateApplicationSchema, middlewares_1.checkApplicationApplied, (0, wrapAsync_1.default)(schemes_1.default.applyScheme));
exports.default = router;
