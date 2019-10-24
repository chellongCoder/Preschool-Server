'use strict';
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    last_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    birthday: DataTypes.DATEONLY,
    address: DataTypes.STRING,
    parent_id: DataTypes.INTEGER,
    grade: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER,
    school_id: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
  }, {});
  student.associate = function(models) {
    // associations can be defined here
    student.belongsTo(models.class, {foreignKey: 'class_id', as: 'class'})
    student.belongsTo(models.parent, {foreignKey: 'parent_id', as: 'parent'})
  };
  return student;
};