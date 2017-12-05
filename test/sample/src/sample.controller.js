const { json } = require('micro');

const { arrayDifferent } = require('./helpers');
const sampleModel = require('./config/mysql.js').load('sample');

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

  const samples = await sampleModel.findAndCountAll({
    raw: true,
    where: query,
    offset: skip,
    limit,
    attributes: select,
    order: [[sort, sortDir]],
    include: populate,
  });

  res.send(200, samples);
};

const getDetails = async (req, res) => {
  const { id } = req.params;
  const sample = await sampleModel.findOne({
    where: {
      id,
      isDeleted: false,
    },
    raw: true,
  });

  if (!sample) {
    return res.send(404, 'sample not found');
  }

  return res.send(200, sample);
};

const create = async (req, res) => {
  const { name, description } = await json(req);
  try {
    const sample = await sampleModel.create({
      name,
      description,
    });

    res.send(200, sample);
  } catch (err) {
    res.send(500, 'Create sample failed!');
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = await json(req);

  const sample = await sampleModel.findOne({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!sample) {
    return res.send(404, 'sample not found');
  }

  await sample.update({
    name,
    description,
    updatedAt: new Date(),
  });

  return res.send(200, sample);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const sample = await sampleModel.findOne({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!sample) {
    return res.send(404, 'sample not found');
  }

  await sample.update({
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
