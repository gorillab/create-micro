const Sequelize = require('sequelize');

const options = require('../config/mysql');

const sequelizeDB = new Sequelize(`mysql://${process.env.MYSQL_URL}`, options);

const load = name => require(`../${name}.model`)(sequelizeDB, Sequelize);  // eslint-disable-line

module.exports = {
  load,
};
