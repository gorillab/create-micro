require('dotenv').config();

const { NOT_FOUND } = require('http-status-codes');

const { router, get, post, put, del } = require('./helpers/custom-microrouter');
const { getList, getDetails, create, update, remove } = require('./{{name}}.controller');
const { validate } = require('./{{name}}.middleware');

const error404 = (req, res) => {
  res.send(NOT_FOUND, {
    code: NOT_FOUND,
    message: 'Not found',
  });
};

module.exports = router(
  get('/api/{{name}}s', getList),
  post('/api/{{name}}s', validate(create)),
  get('/api/{{name}}s/:id', getDetails),
  put('/api/{{name}}s/:id', validate(update)),
  del('/api/{{name}}s/:id', remove),
  get('/*', error404),
);
