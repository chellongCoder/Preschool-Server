'use strict';
module.exports = (sequelize, DataTypes) => {
  const study_result = sequelize.define('study_result', {
    stdID: DataTypes.INTEGER,
    classID: DataTypes.INTEGER,
    rate: DataTypes.INTEGER,
    semester: DataTypes.INTEGER,
    review: DataTypes.TEXT,
  }, {});
  return study_result;
};