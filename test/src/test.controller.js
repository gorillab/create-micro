const { NOT_FOUND, INTERNAL_SERVER_ERROR, OK } = require('http-status-codes');
const { json } = require('micro');

const { arrayDifferent } = require('./helpers');
const testModel = require('./config/mysql').load('test');

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

  res.send(OK, tests);
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
    return res.send(NOT_FOUND, {
      code: NOT_FOUND,
      message: 'test not found',
    });
  }

  return res.send(OK, test);
};

const create = async (req, res) => {
  const { name, description } = await json(req);
  try {
    const test = await testModel.create({
      name,
      description,
    });

    res.send(OK, test);
  } catch (err) {
    res.send(INTERNAL_SERVER_ERROR, {
      code: INTERNAL_SERVER_ERROR,
      message: 'Create test failed!',
    });
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
    return res.send(NOT_FOUND, {
      code: NOT_FOUND,
      message: 'test not found',
    });
  }

  await test.update({
    name,
    description,
    updatedAt: new Date(),
  });

  return res.send(OK, test);
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
    return res.send(NOT_FOUND, {
      code: NOT_FOUND,
      message: 'test not found',
    });
  }

  await test.update({
    updatedAt: new Date(),
    isDeleted: true,
  });

  return res.send(OK, test);
};

module.exports = {
  getList,
  getDetails,
  create,
  update,
  remove,
};
