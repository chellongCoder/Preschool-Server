'use strict';
module.exports = (sequelize, DataTypes) => {
  const classroom = sequelize.define('class', {
    class_name: DataTypes.STRING,
    grade: DataTypes.INTEGER,
    homeroom_teacher: DataTypes.INTEGER,
    number_student: DataTypes.INTEGER,
    schoolId: DataTypes.INTEGER
  }, {});
  classroom.associate = function (models) {
    // associations can be defined here
    classroom.belongsTo(models.school, {
      foreignKey: 'schoolId',
      as: 'school'
    })
    classroom.belongsTo(models.teacher, {
      foreignKey: 'homeroom_teacher',
      as: 'homeroomTeacher'
    })
    classroom.hasMany(models.student, {
      foreignKey: 'class_id',
      as: 'students'
    })
  };
  return classroom;
};