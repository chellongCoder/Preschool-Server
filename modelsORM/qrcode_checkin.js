'use strict';
module.exports = (sequelize, DataTypes) => {
  const qrcode_checkin = sequelize.define('qrcode_checkin', {
    studentID: DataTypes.INTEGER,
    classID: DataTypes.INTEGER
  }, {});
  return qrcode_checkin;
};
