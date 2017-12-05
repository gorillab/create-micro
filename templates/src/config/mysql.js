const Sequelize = require('sequelize');

const sequelizeDB = new Sequelize(`mysql://${process.env.MYSQL_URL}`, {
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
