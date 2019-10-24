'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return Promise.all([
    queryInterface.addColumn(
      'students',
      'school_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        after: "parent_id"
      }
    ),
    queryInterface.addColumn(
      'students',
      'class_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        after: "parent_id"
      }
    )
   ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
