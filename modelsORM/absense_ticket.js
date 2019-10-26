'use strict';
module.exports = (sequelize, DataTypes) => {
  const absense_ticket = sequelize.define('absense_tickets', {
    std_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    reason: DataTypes.TEXT,
    status_accept: DataTypes.INTEGER,
  }, {});
  return absense_ticket;
};