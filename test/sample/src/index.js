require('dotenv').config();

const { router } = require('microrouter');
const { get, post, put, del } = require('./helpers.js');
const { getList, getDetails, create, update, remove } = require('./sample.controller.js');
const { validator } = require('./sample.middleware.js');

const notfound = (req, res) => {
  res.send(404, 'Not found route');
};

module.exports = router(
  get('/api/samples', getList),
  post('/api/samples', validator(create)),
  get('/api/samples/:id', getDetails),
  put('/api/samples/:id', validator(update)),
  del('/api/samples/:id', remove),
  get('/*', notfound),
);
