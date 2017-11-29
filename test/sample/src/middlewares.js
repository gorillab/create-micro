const { router, get, post, put, del } = require('microrouter');
const { send, json, text } = require('micro');

// exports.decorate = fn => async (req, res) => {
//   await fn(req, res, { send, json, text });
// }

const get2 = (...args) => {
  get(...args);
};

module.exports = {
   get2,
};
