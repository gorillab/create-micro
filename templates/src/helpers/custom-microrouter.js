const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { send } = require('micro');
const { router, get, post, put, del } = require('microrouter');

const { isProduction } = require('./env');

const customRouter = (...routes) => router(...routes.reduce(
  (requestHandlers, route) => requestHandlers.concat(route), []),
);

const wrapRouteHandler = routeHandler => (path, handler) => {
  const newHandler = (req, res) => {
    res.send = (...args) => {
      if (args.length === 1) {
        return send(res, OK, ...args);
      }

      return send(res, ...args);
    };

    res.sendNotFoundError = error => send(res, NOT_FOUND, {
      code: NOT_FOUND,
      message: (error && error.message) || 'Not found',
      error: (!isProduction() && error) || undefined,
    });

    res.sendServerError = error => send(res, INTERNAL_SERVER_ERROR, {
      code: INTERNAL_SERVER_ERROR,
      message: (error && error.message) || 'Internal server error',
      error: (!isProduction() && error) || undefined,
    });

    return handler(req, res);
  };

  return routeHandler(path, newHandler);
};

module.exports = {
  router: customRouter,
  get: wrapRouteHandler(get),
  post: wrapRouteHandler(post),
  put: wrapRouteHandler(put),
  del: wrapRouteHandler(del),
  all: (...params) => [get, post, put, del].map(
    routeHandler => wrapRouteHandler(routeHandler)(...params),
  ),
};
