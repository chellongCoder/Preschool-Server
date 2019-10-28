'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notification', {
    title: DataTypes.STRING,
    author: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});
  Notification.associate = function (models) {
    Notification.belongsToMany(models.image, {
      through: models.image_notification,
      as: 'image',
      foreignKey: 'notificationID',
      otherKey: 'imageID'
    })
  }
  return Notification;
};