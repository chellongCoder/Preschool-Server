'use strict';
module.exports = (sequelize, DataTypes) => {
  const school = sequelize.define('school', {
    school_name: DataTypes.STRING,
    school_year: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.TEXT,
    userID: DataTypes.INTEGER,
  }, {});
  school.associate = function (models) {

  };
  return school;
};