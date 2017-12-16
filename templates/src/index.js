require('dotenv').config();

const { router, get, post, put, del } = require('./helpers');
const { getList, getDetails, create, update, remove } = require('./{{name}}.controller');
const { validator } = require('./{{name}}.middleware');

const notfound = (req, res) => {
  res.send(404, 'Not found route');
};

module.exports = router(
  get('/api/{{name}}s', getList),
  post('/api/{{name}}s', validator(create)),
  get('/api/{{name}}s/:id', getDetails),
  put('/api/{{name}}s/:id', validator(update)),
  del('/api/{{name}}s/:id', remove),
  get('/*', notfound),
);
