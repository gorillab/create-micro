const { json } = require('micro');

const { arrayDifferent } = require('./helpers');
const {{name}}Model = require('./config/mysql.js').load('{{name}}');

const BLACK_LIST = ['isDeleted'];

const getList = async (req, res) => {
  const select = req.query.select
    ? arrayDifferent(req.query.select.split(','), BLACK_LIST)
    : ['name', 'description', 'createdAt', 'updatedAt'];
  const limit = req.query.limit ? +req.query.limit : 25;
  const {
    page = 0,
    skip = page && page > 0 ? (page - 1) * limit : 0,
    search,
    name,
  } = req.query;
  const sort = req.query.sort ? req.query.sort.replace('-', '') : 'name';
  const sortDir = req.query.sort && req.query.sort.charAt(0) === '-' ? 'DESC' : 'ASC';

  const query = {
    isDeleted: false,
  };

  if (name) {
    query.name = name;
  }

  if (search) {
    const q = `%${search}%`;
    query.$or = [{
      name: {
        $like: q,
      },
    }, {
      description: {
        $like: q,
      },
    }];
  }


  const populate = [];

  const {{name}}s = await {{name}}Model.findAndCountAll({
    raw: true,
    where: query,
    offset: skip,
    limit,
    attributes: select,
    order: [[sort, sortDir]],
    include: populate,
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

  return res.send(200, {{name}});
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
