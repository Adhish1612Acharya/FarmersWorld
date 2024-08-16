"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectReasonValidate = exports.profilephotoValidate = exports.profileInfoValidate = exports.loginFormValidation = exports.signUpFormValidation = exports.applicationSchema = void 0;
const zod_1 = require("zod");
const applicationImage = zod_1.z.object({
    originalname: zod_1.z.string(), // Original file name
    mimetype: zod_1.z.string().refine((mime) => mime.startsWith("image/"), {
        message: "File must be an image",
    }),
    size: zod_1.z.number().max(5 * 1024 * 1024, {
        // 5MB limit
        message: "File size must be less than 5MB",
    }),
    path: zod_1.z.string(),
});
exports.applicationSchema = zod_1.z.object({
    adhaar: zod_1.z.number().refine((value) => /^[1-9]\d{11}$/.test(value.toString())),
    farmersId: zod_1.z
        .number()
        .refine((value) => /^[1-9]\d{11}$/.test(value.toString())),
    image: zod_1.z.union([
        applicationImage,
        zod_1.z.string().regex(/^(?!\s*$)(?!.*\s).+/, "Image is required"),
    ]),
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
exports.profileInfoValidate = zod_1.z.object({
    username: zod_1.z.string(),
    adhaar: zod_1.z.object({
        number: zod_1.z.number().refine((value) => /^\d{12}$/.test(value.toString()), {
            message: "Invalid adhaar number",
        }),
        name: zod_1.z.string().regex(/^(?!.*\d)(?!\s)(?!.*\s$).+/),
    }),
    farmersId: zod_1.z.number().refine((value) => /^\d{12}$/.test(value.toString()), {
        message: "Invalid farmersId",
    }),
    contactNo: zod_1.z
        .number()
        .refine((value) => /^(?!(\d)\1{9})[6,7,8,9]\d{9}$/.test(value.toString()), {
        message: "invalid contact number",
    }),
    passportSizePhoto: zod_1.z.string().regex(/^(?!\s*$).+/, "Image is required"),
});
exports.profilephotoValidate = zod_1.z.object({
    image: zod_1.z.string().regex(/^(?!\s*$).+/, "Image is required"),
});
exports.rejectReasonValidate = zod_1.z.object({
    rejectReason: zod_1.z
        .string()
        .trim()
        .regex(/^(?!\s*$).+/),
});
