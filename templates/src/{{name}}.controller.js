const { json } = require('micro');

const {{name}}Model = require('./config/mysql.js').load('{{name}}');

const getList = async (req, res) => {
  const {{name}}s = await {{name}}Model.findAll({
    where: {
      isDeleted: false,
    },
    raw: true,
  });

  res.send(200, {{name}}s);
};

const getDetails = async (req, res) => {
  const { id } = req.params;
  const {{name}} = await {{name}}Model.findOne({
    where: {
      id,
      isDeleted: false,
    },
    raw: true,
  });

  if (!{{name}}) {
    return res.send(404, '{{name}} not found');
  }

  res.send(200, {{name}});
};

const create = async (req, res) => {
  const { name, description } = await json(req);
  try {
    const {{name}} = await {{name}}Model.create({
      name,
      description,
    });

    res.send(200, {{name}});
  } catch (err) {
    res.send(500, 'Create {{name}} failed!');
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = await json(req);

  const {{name}} = await {{name}}Model.findOne({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!{{name}}) {
    return res.send(404, '{{name}} not found');
  }

  await {{name}}.update({
    name,
    description,
    updatedAt: new Date(),
  });

  return res.send(200, {{name}});
};

const remove = async (req, res) => {
  const { id } = req.params;

  const {{name}} = await {{name}}Model.findOne({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!{{name}}) {
    return res.send(404, '{{name}} not found');
  }

  await {{name}}.update({
    updatedAt: new Date(),
    isDeleted: true,
  });

  return res.send(200, 'Ok');
};

module.exports = {
  getList,
  getDetails,
  create,
  update,
  remove,
};
