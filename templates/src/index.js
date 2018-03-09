const { isProduction } = require('./helpers/env');
const dotenv = require('dotenv');

if (!isProduction()) {
  dotenv.config();
}

const { router, get, post, put, del } = require('./helpers/custom-microrouter');
const { getList, getDetails, create, update, remove } = require('./{{name}}.controller');
const { validate } = require('./{{name}}.middleware');

module.exports = router(
  get('/{{name}}s', getList),
  post('/{{name}}s', validate(create)),
  get('/{{name}}s/:id', getDetails),
  put('/{{name}}s/:id', validate(update)),
  del('/{{name}}s/:id', remove),
  get('/*', (req, res) => res.sendNotFoundError()),
);
