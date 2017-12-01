const { json } = require('micro');

const sampleModel = require('./config/mysql.js').load('sample');

const getList = async (req, res) => {
  const samples = await sampleModel.findAll({
    where: {
      isDeleted: false,
    },
    raw: true,
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
