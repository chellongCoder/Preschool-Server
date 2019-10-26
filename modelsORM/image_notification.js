'use strict';
module.exports = (sequelize, DataTypes) => {
  const classroom = sequelize.define('image_notification', {
    imageID: DataTypes.INTEGER,
    notificationID: DataTypes.INTEGER
  }, {});
  return classroom;
};
