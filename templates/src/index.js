const { send, json, text } = require('micro');
const { router, get, post, put, del } = require('microrouter');
const Validation = require('micro-joi')
const Joi = require('joi');

require('dotenv').config();

const {{name}}Model = require('./mysql/index.js').load();

const validator = Validation(Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
}))

const notfound = (req, res) => {
  send(res, 404, 'Not found route')
};

const list = async (req, res) => {
  const {{name}}s = await {{name}}Model.findAll({
    raw: true,
  });

  send(res, 200, {{name}}s);
};

const detail = async (req, res) => {
  const { id } = req.params;
  const {{name}} = await {{name}}Model.findOne({
    where: {
      id: id,
    },
    raw: true,
  })

  send(res, 200, {{name}});
};

const create = async (req, res) => {
  const { name, description } = await json(req);
  try {
    const {{name}} = await {{name}}Model.create({
      name,
      description,
    });

    send(res, 200, {{name}});
  } catch (err) {

    send(res, 500, 'Create {{name}} failed!');
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = await json(req);

  const {{name}} = await {{name}}Model.findOne({
    where: {
      id: id,
    }
  });

  if (!{{name}}) {
    return send(res, 404, '{{name}} not found');
  }

  await {{name}}.update({
    name,
    description,
    updatedAt: new Date(),
  });

  send(res, 200, {{name}});
};

const remove = async (req, res) => {
  const { id } = req.params;

  const {{name}} = await {{name}}Model.findOne({
    where: {
      id: id,
    }
  });

  if (!{{name}}) {
    return send(res, 404, '{{name}} not found');
  }

  await {{name}}.update({
    updatedAt: new Date(),
    isDeleted: true,
  });

  send(res, 200, 'Ok');
};

module.exports = router(
  get('/api/{{name}}', list),
  post('/api/{{name}}', validator(create)),
  get('/api/{{name}}/:id', detail),
  put('/api/{{name}}/:id', validator(update)),
  del('/api/{{name}}/:id', remove),
  get('/*', notfound)
)
