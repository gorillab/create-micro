module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sample', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    tableName: 'sample',
  });
};
