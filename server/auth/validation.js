const Joi = require("@hapi/joi");

//register validation

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .required()
      .min(6),
    email: Joi.string()
      .required()
      .email()
      .min(6)
  });
  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    password: Joi.string()
      .required()
      .min(6),
    email: Joi.string()
      .required()
      .email()
      .min(6)
  });
  return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
