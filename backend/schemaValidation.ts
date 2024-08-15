import { z } from "zod";

const applicationImage = z.object({
  originalname: z.string(), // Original file name
  mimetype: z.string().refine((mime) => mime.startsWith("image/"), {
    message: "File must be an image",
  }),
  size: z.number().max(5 * 1024 * 1024, {
    // 5MB limit
    message: "File size must be less than 5MB",
  }),
  path: z.string(),
});

export const applicationSchema = z.object({
  adhaar: z.number().refine((value) => /^[1-9]\d{11}$/.test(value.toString())),
  farmersId: z
    .number()
    .refine((value) => /^[1-9]\d{11}$/.test(value.toString())),
  image: z.union([
    applicationImage,
    z.string().regex(/^(?!\s*$)(?!.*\s).+/, "Image is required"),
  ]),
});

export const signUpFormValidation = z.object({
  username: z.string().regex(/^\S+$/, "Enter a valid username"),
  email: z
    .string()
    .regex(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*@gmail.com$/, "Enter a valid email"),
  password: z.string().regex(/^\S+$/, "Enter a valid password"),
});

export const loginFormValidation = z.object({
  username: z.string().regex(/^\S+$/, "Enter a valid username"),
  password: z.string().regex(/^\S+$/, "Enter a valid password"),
});

export const profileInfoValidate = z.object({
  username: z.string(),
  adhaar: z.object({
    number: z.number().refine((value) => /^\d{12}$/.test(value.toString()), {
      message: "Invalid adhaar number",
    }),
    name: z.string().regex(/^(?!.*\d)(?!\s)(?!.*\s$).+/),
  }),
  farmersId: z.number().refine((value) => /^\d{12}$/.test(value.toString()), {
    message: "Invalid farmersId",
  }),
  contactNo: z
    .number()
    .refine((value) => /^(?!(\d)\1{9})[6,7,8,9]\d{9}$/.test(value.toString()), {
      message: "invalid contact number",
    }),
  passportSizePhoto: z.string().regex(/^(?!\s*$).+/, "Image is required"),
});

export const profilephotoValidate = z.object({
  image: z.string().regex(/^(?!\s*$).+/, "Image is required"),
});

export const rejectReasonValidate = z.object({
  rejectReason: z
    .string()
    .trim()
    .regex(/^(?!\s*$).+/),
});
