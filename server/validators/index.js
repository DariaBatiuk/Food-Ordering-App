const { Joi, celebrate } = require('celebrate');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    uid: Joi.string().required(),
  }),
});

module.exports = {
  validateCreateUser,
};
