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
    queryInterface.createTable('study_results', {
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
      classID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      rate: { //[1: tot, 2: kha, 3: trung binh, 4: yeu, 5: kem]
        allowNull: false,
        type: Sequelize.INTEGER
      },
      semester: { // -- 1: ki1 , 2: ki 2
        allowNull: false,
        type: Sequelize.INTEGER
      },
      review: {
        allowNull: false,
        type: Sequelize.TEXT
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
