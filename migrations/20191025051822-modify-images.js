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
    queryInterface.removeColumn(
      'images',
      'mm_id'
    ),
    queryInterface.removeColumn(
      'images',
      'act_id'
    ),
    queryInterface.removeColumn(
      'images',
      'noti_id'
    ),
    queryInterface.removeColumn(
      'images',
      'wp_id'
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
