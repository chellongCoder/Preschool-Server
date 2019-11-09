'use strict';
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    last_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    birthday: DataTypes.DATEONLY,
    address: DataTypes.STRING,
    weight: DataTypes.DECIMAL(10, 1),
    height: DataTypes.DECIMAL(10, 1),
    parent_id: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER,
    school_id: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
  }, {});
  student.associate = function(models) {
    student.belongsTo(models.parent, {foreignKey: 'parent_id', as: 'parent'})
    student.belongsTo(models.school, {foreignKey: 'school_id', as: 'school'})
    student.belongsToMany(models.class, {
      through: models.qrcode_checkin,
      as: 'class',
      foreignKey: 'studentID',
      otherKey: 'classID'
    })
  };
  return student;
};