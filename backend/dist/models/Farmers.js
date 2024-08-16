"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const farmersSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        match: [/^\S+$/, "Invalid username"],
    },
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/, "Invalid email"],
    },
    adhaar: {
        name: {
            type: String,
            default: "",
        },
        number: {
            type: Number,
            match: [/^\d{12}$/, "Invalid adhaar number"],
            default: 0,
        },
    },
    farmersId: {
        type: Number,
        match: [/^\d{12}$/, "Invalid farmersId"],
        default: 0,
    },
    profilePhoto: {
        type: String,
        default: "",
    },
    passportSizePhoto: {
        type: String,
        default: "",
    },
    contactNo: {
        type: Number,
        match: [/^\+91[6-9]\d{9}$/, "Invalid contact number"],
        default: 0,
    },
    applications: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Application",
        },
    ],
    profileComplete: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "farmer",
    },
});
farmersSchema.plugin(passport_local_mongoose_1.default);
const Farmer = mongoose_1.default.model("Farmer", farmersSchema);
exports.default = Farmer;
