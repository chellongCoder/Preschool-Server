'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('activity', {
    title: DataTypes.STRING,
    acti_time_from: DataTypes.DATE,
    acti_time_to: DataTypes.DATE,
    regis_time_from: DataTypes.DATE,
    regis_time_to: DataTypes.DATE,
    content: DataTypes.STRING,
    regis_status: DataTypes.INTEGER
  }, {});
  Activity.associate = function (models) {
    Activity.belongsToMany(models.image, {
      through: models.image_activity,
      as: 'image',
      foreignKey: 'activityID',
      otherKey: 'imageID'
    })
  }
  return Activity;
};