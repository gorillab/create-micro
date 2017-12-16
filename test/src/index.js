require('dotenv').config();

const { NOT_FOUND } = require('http-status-codes');

const { router, get, post, put, del } = require('./helpers/custom-microrouter');
const { getList, getDetails, create, update, remove } = require('./test.controller');
const { validate } = require('./test.middleware');

const error404 = (req, res) => {
  res.send(NOT_FOUND, {
    code: NOT_FOUND,
    message: 'Not found',
  });
};

module.exports = router(
  get('/api/tests', getList),
  post('/api/tests', validate(create)),
  get('/api/tests/:id', getDetails),
  put('/api/tests/:id', validate(update)),
  del('/api/tests/:id', remove),
  get('/*', error404),
);
