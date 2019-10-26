'use strict';
module.exports = (sequelize, DataTypes) => {
  const classroom = sequelize.define('image_moment', {
    imageID: DataTypes.INTEGER,
    momentID: DataTypes.INTEGER
  }, {});
  return classroom;
};
