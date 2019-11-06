'use strict';
module.exports = (sequelize, DataTypes) => {
  const moment = sequelize.define('moment', {
    content: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER,
    status_accept: DataTypes.INTEGER
  }, {});
  moment.associate = function (models) {
    moment.belongsToMany(models.image, {
      through: models.image_moment,
      as: 'image',
      foreignKey: 'momentID',
      otherKey: 'imageID'
    })
    moment.belongsTo(models.teacher, {
      foreignKey: 'author_id',
      as: 'teacher'
    })
  }
  return moment;
};