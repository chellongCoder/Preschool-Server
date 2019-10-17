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
    queryInterface.createTable('images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      path: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      mm_id: {
        allowNull: false,
        type: Sequelize.STRING // mang moment_id [1, 2, 3]
      },
      act_id: {
        allowNull: false,
        type: Sequelize.STRING // mang activitiy_id [1, 2, 3]
      },
      noti_id: {
        allowNull: false,
        type: Sequelize.STRING // mang notification_id [1, 2, 3]
      },
      wp_id: {
        allowNull: false,
        type: Sequelize.STRING // mang week_plan_id [1, 2, 3]
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      img: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      notice_class: { // mang class_id [1, 2, 3]
        allowNull: false,
        type: Sequelize.STRING 
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
