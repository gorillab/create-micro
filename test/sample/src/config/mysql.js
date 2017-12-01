const Sequelize = require('sequelize');

const sequelizeDB = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: 'mysql',
    define: {
      timestamps: false,
    },
    native: false,
    logging: false,
    timezone: '+07:00',
  },
);

const load = (name) => require(`../${name}.model.js`)(sequelizeDB, Sequelize);  // eslint-disable-line

module.exports = {
  load,
};
