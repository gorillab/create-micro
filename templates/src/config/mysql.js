const mysql = {
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
  native: false,
  logging: false,
  timezone: '+07:00',
};

module.exports = mysql;
