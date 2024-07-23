"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const middlewares_1 = require("../middlewares");
const common_1 = __importDefault(require("../controllers/common"));
router.get("/loginCheck", middlewares_1.findUserRole, common_1.default.checkLogin);
router.get("/logOut", common_1.default.logout);
exports.default = router;
