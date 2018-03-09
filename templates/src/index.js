const { isProduction } = require('./helpers/env');
const dotenv = require('dotenv');

if (!isProduction()) {
  dotenv.config();
}

const { router, get, post, put, del, all } = require('./helpers/custom-microrouter');
const { getList, getDetails, create, update, remove } = require('./{{originalName}}.controller');
const { validate } = require('./{{originalName}}.middleware');

module.exports = router(
  get('/{{originalName}}', getList),
  post('/{{originalName}}', validate(create)),
  get('/{{originalName}}/:id', getDetails),
  put('/{{originalName}}/:id', validate(update)),
  del('/{{originalName}}/:id', remove),
  all('/*', (req, res) => res.sendNotFoundError()),
);
