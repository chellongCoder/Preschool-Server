'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('image', {
    path: DataTypes.STRING,
  }, {});
  Image.associate = function (models) {
    Image.belongsToMany(models.moment, {
      through: models.image_moment,
      as: 'moment',
      foreignKey: 'imageID',
      otherKey: 'momentID'
    })
  }
  Image.associate = function (models) {
    Image.belongsToMany(models.notification, {
      through: models.image_notification,
      as: 'notification',
      foreignKey: 'imageID',
      otherKey: 'notificationID'
    })
  }
  Image.associate = function (models) {
    Image.belongsToMany(models.activity, {
      through: models.image_activity,
      as: 'activity',
      foreignKey: 'imageID',
      otherKey: 'activityID'
    })
  }
  return Image;
};