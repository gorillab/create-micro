require('dotenv').config();
const { router } = require('microrouter');

const { get, post, put, del } = require('./helpers.js');
const { getList, getDetails, create, update, remove } = require('./test.controller.js');
const { validator } = require('./test.middleware.js');

const notfound = (req, res) => {
  res.send(404, 'Not found route');
};

module.exports = router(
  get('/api/tests', getList),
  post('/api/tests', validator(create)),
  get('/api/tests/:id', getDetails),
  put('/api/tests/:id', validator(update)),
  del('/api/tests/:id', remove),
  get('/*', notfound),
);
