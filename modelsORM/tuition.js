'use strict';
module.exports = (sequelize, DataTypes) => {
  const study_result = sequelize.define('tuition', {
    stdID: DataTypes.INTEGER,
    semester: DataTypes.INTEGER,
    schFee: DataTypes.INTEGER,
    isPaid: DataTypes.INTEGER
  }, {});
  return study_result;
};