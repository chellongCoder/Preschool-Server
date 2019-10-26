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
    queryInterface.createTable('activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      acti_time_from: {
        allowNull: false,
        type: Sequelize.DATE
      },
      acti_time_to: {
        allowNull: false,
        type: Sequelize.DATE
      },
      regis_time_from: {
        allowNull: false,
        type: Sequelize.DATE
      },
      regis_time_to: {
        allowNull: false,
        type: Sequelize.DATE
      },
      notice_class: {
        allowNull: false,
        type: Sequelize.STRING //mang id class [1, 2, 3]
      },
      content: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      regis_status: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      img: {
        allowNull: true,
        type: Sequelize.INTEGER // map voi bang image
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
