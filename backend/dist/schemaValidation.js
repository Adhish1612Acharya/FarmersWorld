"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginFormValidation = exports.signUpFormValidation = exports.applicationSchema = void 0;
const zod_1 = require("zod");
exports.applicationSchema = zod_1.z.object({
    adhaar: zod_1.z.string().regex(/^\d{12}$/, "Enter a valid 12 digit Number"),
    farmersId: zod_1.z.string().regex(/^\d{12}$/, "Enter a valid 12 digit Number"),
});
exports.signUpFormValidation = zod_1.z.object({
    username: zod_1.z.string().regex(/^\S+$/, "Enter a valid username"),
    email: zod_1.z
        .string()
        .regex(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*@gmail.com$/, "Enter a valid email"),
    password: zod_1.z.string().regex(/^\S+$/, "Enter a valid password"),
});
exports.loginFormValidation = zod_1.z.object({
    username: zod_1.z.string().regex(/^\S+$/, "Enter a valid username"),
    password: zod_1.z.string().regex(/^\S+$/, "Enter a valid password"),
});
