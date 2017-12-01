const { send } = require('micro');
const { get, post, put, del } = require('microrouter');

const wrap = (method, cb) => (path, fn) => {
  const newFn = (req, res) => {
    res.send = (...args) => send(res, ...args);

    return fn(req, res);
  };

  return cb(path, newFn);
};

module.exports = {
  get: wrap('get', get),
  post: wrap('post', post),
  put: wrap('put', put),
  del: wrap('del', del),
};
