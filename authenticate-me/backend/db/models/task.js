'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    listId: DataTypes.INTEGER,
    body: DataTypes.STRING
  }, {});
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.List, {
      foreignKey: "id"
    });
  };
  return Task;
};
