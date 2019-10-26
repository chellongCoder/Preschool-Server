'use strict';
module.exports = (sequelize, DataTypes) => {
  const meal_type = sequelize.define('meal_type', {
    breakfast: DataTypes.STRING,
    breakfast_sub: DataTypes.STRING,
    lunch: DataTypes.STRING,
    lunch_sub: DataTypes.STRING,
    date_meal: DataTypes.DATE,
  }, {});
  return meal_type;
};