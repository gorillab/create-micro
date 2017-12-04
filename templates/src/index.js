require('dotenv').config();

const Validation = require('micro-joi');
const Joi = require('joi');
const { router } = require('microrouter');
const { get, post, put, del } = require('./middlewares.js');
const { getList, getDetails, create, update, remove } = require('./{{name}}.controller.js');

const validator = Validation(Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
}));

const notfound = (req, res) => {
  res.send(404, 'Not found route');
};

module.exports = router(
  get('/api/{{name}}s', getList),
  post('/api/{{name}}s', validator(create)),
  get('/api/{{name}}s/:id', getDetails),
  put('/api/{{name}}s/:id', validator(update)),
  del('/api/{{name}}s/:id', remove),
  get('/*', notfound),
);
