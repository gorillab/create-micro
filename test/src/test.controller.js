const { json } = require('micro');

const { arrayDifferent } = require('./helpers');
const testModel = require('./config/mysql.js').load('test');

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

  const tests = await testModel.findAndCountAll({
    raw: true,
    where: query,
    offset: skip,
    limit,
    attributes: select,
    order: [[sort, sortDir]],
    include: populate,
  });

  res.send(200, tests);
};

const getDetails = async (req, res) => {
  const { id } = req.params;
  const test = await testModel.findOne({
    where: {
      id,
      isDeleted: false,
    },
    raw: true,
  });

  if (!test) {
    return res.send(404, 'test not found');
  }

  return res.send(200, test);
};

const create = async (req, res) => {
  const { name, description } = await json(req);
  try {
    const test = await testModel.create({
      name,
      description,
    });

    res.send(200, test);
  } catch (err) {
    res.send(500, 'Create test failed!');
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = await json(req);

  const test = await testModel.findOne({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!test) {
    return res.send(404, 'test not found');
  }

  await test.update({
    name,
    description,
    updatedAt: new Date(),
  });

  return res.send(200, test);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const test = await testModel.findOne({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!test) {
    return res.send(404, 'test not found');
  }

  await test.update({
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
