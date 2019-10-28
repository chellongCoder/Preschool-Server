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
    queryInterface.changeColumn(
      'students',
      'weight', {
        type: Sequelize.DECIMAL(10, 1),
        allowNull: false,
        after: "address"
      }
    ),
    queryInterface.changeColumn(
      'students',
      'height', {
        type: Sequelize.DECIMAL(10, 1),
        allowNull: false,
        after: "address"
      }
    ),
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
