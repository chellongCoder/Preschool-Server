'use strict';
module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define('notification', {
    title: DataTypes.STRING,
    author: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});
  return notification;
};