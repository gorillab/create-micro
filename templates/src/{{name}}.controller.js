const { json } = require('micro');

const items = [{
  id: Date.now().toString(),
  name: 'foo',
}];

const getList = async (req, res) => {
  res.send(items);
};

const getDetails = async (req, res) => {
  const { id } = req.params;

  const foundItem = items.find(item => item.id === id);

  if (!foundItem) {
    return res.sendNotFoundError();
  }

  return res.send(foundItem);
};

const create = async (req, res) => {
  const { name } = await json(req);

  const newItem = {
    id: Date.now().toString(),
    name,
  };

  items.push(newItem);

  res.send(newItem);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = await json(req);

  const foundItem = items.find(item => item.id === id);

  if (!foundItem) {
    return res.sendNotFoundError();
  }

  foundItem.name = name;

  return res.send(foundItem);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const foundIndex = items.findIndex(item => item.id === id);

  if (foundIndex === -1) {
    return res.sendNotFoundError();
  }

  const removedItem = items.splice(foundIndex, 1)[0];

  return res.send(removedItem);
};

module.exports = {
  getList,
  getDetails,
  create,
  update,
  remove,
};
