'use strict';
module.exports = (sequelize, DataTypes) => {
  const classroom = sequelize.define('activity', {
    title: DataTypes.STRING,
    acti_time_from: DataTypes.DATE,
    acti_time_to: DataTypes.DATE,
    regis_time_from: DataTypes.DATE,
    regis_time_to: DataTypes.DATE,
    content: DataTypes.STRING,
    regis_status: DataTypes.INTEGER
  }, {});
  return classroom;
};