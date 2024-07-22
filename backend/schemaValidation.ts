import { z } from "zod";

export const applicationSchema = z.object({
  adhaar: z.string().regex(/^d{12}$/, "Enter a valid 12 digit Number"),
  farmersId: z.string().regex(/^d{12}$/, "Enter a valid 12 digit Number"),
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
