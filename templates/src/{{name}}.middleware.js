const Joi = require('joi');
const Validation = require('micro-joi');

const validate = Validation(Joi.object({
  name: Joi.string().required(),
}));

module.exports = {
  validate,
};
