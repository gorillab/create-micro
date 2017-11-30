const sampleModel = require('./config/mysql.js').load('sample');

exports.list = async (req, res, { send }) => {
  const samples = await sampleModel.findAll({
    raw: true,
  });

  send(res, 200, samples);
};

exports.detail = async (req, res, { send }) => {
  const { id } = req.params;
  const sample = await sampleModel.findOne({
    where: {
      id: id,
    },
    raw: true,
  })

  send(res, 200, sample);
};

exports.create = async (req, res, { send, json }) => {
  const { name, description } = await json(req);
  try {
    const sample = await sampleModel.create({
      name,
      description,
    });

    send(res, 200, sample);
  } catch (err) {

    send(res, 500, 'Create sample failed!');
  }
};

exports.update = async (req, res, { send , json }) => {
  const { id } = req.params;
  const { name, description } = await json(req);

  const sample = await sampleModel.findOne({
    where: {
      id: id,
    }
  });

  if (!sample) {
    return send(res, 404, 'sample not found');
  }

  await sample.update({
    name,
    description,
    updatedAt: new Date(),
  });

  send(res, 200, sample);
};

exports.remove = async (req, res, { send }) => {
  const { id } = req.params;

  const sample = await sampleModel.findOne({
    where: {
      id: id,
    }
  });

  if (!sample) {
    return send(res, 404, 'sample not found');
  }

  await sample.update({
    updatedAt: new Date(),
    isDeleted: true,
  });

  send(res, 200, 'Ok');
};
