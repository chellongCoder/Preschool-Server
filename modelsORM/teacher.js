'use strict';
module.exports = (sequelize, DataTypes) => {
  const teacher = sequelize.define('teacher', {
    last_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    schoolID: DataTypes.INTEGER
  }, {});
  teacher.associate = function(models) {
    // associations can be defined here
  };
  return teacher;
};