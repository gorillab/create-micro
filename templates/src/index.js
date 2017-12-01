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
  get('/api/{{name}}', getList),
  post('/api/{{name}}', validator(create)),
  get('/api/{{name}}/:id', getDetails),
  put('/api/{{name}}/:id', validator(update)),
  del('/api/{{name}}/:id', remove),
  get('/*', notfound)
)
