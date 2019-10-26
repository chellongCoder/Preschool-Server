'use strict';
module.exports = (sequelize, DataTypes) => {
  const classroom = sequelize.define('image_activity', {
    imageID: DataTypes.INTEGER,
    activityID: DataTypes.INTEGER
  }, {});
  return classroom;
};
