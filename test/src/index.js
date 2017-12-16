require('dotenv').config();

const { NOT_FOUND } = require('http-status-codes');

const { router, get, post, put, del } = require('./helpers');
const { getList, getDetails, create, update, remove } = require('./test.controller');
const { validator } = require('./test.middleware');

const error404 = (req, res) => {
  res.send(NOT_FOUND, {
    code: NOT_FOUND,
    message: 'Not found',
  });
};

module.exports = router(
  get('/api/tests', getList),
  post('/api/tests', validator(create)),
  get('/api/tests/:id', getDetails),
  put('/api/tests/:id', validator(update)),
  del('/api/tests/:id', remove),
  get('/*', error404),
);
