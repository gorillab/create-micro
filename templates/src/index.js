require('dotenv').config();

const { NOT_FOUND } = require('http-status-codes');

const { router, get, post, put, del } = require('./helpers/custom-microrouter');
const { getList, getDetails, create, update, remove } = require('./{{name}}.controller');
const { validate } = require('./{{name}}.middleware');

const notFoundError = (req, res) => {
  res.send(NOT_FOUND, {
    code: NOT_FOUND,
    message: 'Not found',
  });
};

module.exports = router(
  get('/{{name}}s', getList),
  post('/{{name}}s', validate(create)),
  get('/{{name}}s/:id', getDetails),
  put('/{{name}}s/:id', validate(update)),
  del('/{{name}}s/:id', remove),
  get('/*', notFoundError),
);
