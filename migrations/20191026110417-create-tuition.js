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
    queryInterface.createTable('tuitions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stdID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      semester: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      schFee: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      isPaid: {
        allowNull: false,
        type: Sequelize.INTEGER // 0 or 1
      },
    })
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
