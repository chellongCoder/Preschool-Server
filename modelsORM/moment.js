'use strict';
module.exports = (sequelize, DataTypes) => {
  const moment = sequelize.define('moment', {
    content: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER,
    status_accept: DataTypes.INTEGER
  }, {});
  return moment;
};