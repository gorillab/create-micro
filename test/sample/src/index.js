require('dotenv').config();

const Validation = require('micro-joi')
const Joi = require('joi');
const { send, json, text } = require('micro');
const { router, get, post, put, del } = require('microrouter');
const { list, detail, create, update, remove } = require('./sample.controller.js');
const { get2, decorate } = require('./middlewares.js');

const validator = Validation(Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
}))

const notfound = (req, res) => {
  send(res, 404, 'Not found route')
};

console.log(get2('string222', function() {
  console.log(1);
}));

module.exports = router(
  get('/api/sample', decorate(list)),
  get2('/api/sample2', list),
  post('/api/sample', validator(create)),
  get('/api/sample/:id', detail),
  put('/api/sample/:id', validator(update)),
  del('/api/sample/:id', remove),
  get('/*', notfound)
)
