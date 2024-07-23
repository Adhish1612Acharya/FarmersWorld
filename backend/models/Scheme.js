"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var govtSchemesSchema = new mongoose_1.Schema({
    heading: {
        type: String,
        required: true,
        maxLength: 30,
    },
    shortDescription: {
        type: String,
        required: true,
        maxLength: 50,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 20000,
    },
    schemeType: {
        type: String,
        enum: ["schemes", "subsidies", "products", "newTech"],
    },
    applications: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Application",
            default: [],
        },
    ],
});
var Scheme = mongoose_1.default.model("Scheme", govtSchemesSchema);
exports.default = Scheme;
