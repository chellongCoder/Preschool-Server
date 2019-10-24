'use strict';
module.exports = (sequelize, DataTypes) => {
  const classroom = sequelize.define('parent', {
    last_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    relationship: DataTypes.STRING,
    avatar: DataTypes.STRING,
    emergency_contact: DataTypes.STRING,
    userID: DataTypes.INTEGER,
  }, {});
  
  return classroom;
};