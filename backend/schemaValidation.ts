let Joi = require("joi");

export const applicationSchema = Joi.object({
  adhaar: Joi.number().required(),
  farmersId: Joi.number().required(),
  image: Joi.string().required(),
});

export const signUpFormValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginFormValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
