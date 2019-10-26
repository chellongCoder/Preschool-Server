'use strict';
module.exports = (sequelize, DataTypes) => {
  const weekPlan = sequelize.define('week_plan', {
    date_plan: DataTypes.DATE,
    imageID: DataTypes.INTEGER
  }, {});
  return weekPlan;
};