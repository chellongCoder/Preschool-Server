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
    queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATE
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      parent_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      school_year: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      grade: {
        allowNull: true,
        type: Sequelize.STRING
      },
      class_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      school_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      avatar: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_delete: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      }
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
