'use strict';
module.exports = (sequelize, DataTypes) => {
  const classroom = sequelize.define('image', {
    path: DataTypes.STRING,
  }, {});
  return classroom;
};