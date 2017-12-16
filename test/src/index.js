require('dotenv').config();

const { NOT_FOUND } = require('http-status-codes');

const { router, get, post, put, del } = require('./helpers/custom-microrouter');
const { getList, getDetails, create, update, remove } = require('./test.controller');
const { validate } = require('./test.middleware');

const notFoundError = (req, res) => {
  res.send(NOT_FOUND, {
    code: NOT_FOUND,
    message: 'Not found',
  });
};

module.exports = router(
  get('/tests', getList),
  post('/tests', validate(create)),
  get('/tests/:id', getDetails),
  put('/tests/:id', validate(update)),
  del('/tests/:id', remove),
  get('/*', notFoundError),
);
