'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Chores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      complete: {
        type: Sequelize.BOOLEAN
      },
      mon: {
        type: Sequelize.BOOLEAN
      },
      tue: {
        type: Sequelize.BOOLEAN
      },
      wed: {
        type: Sequelize.BOOLEAN
      },
      thu: {
        type: Sequelize.BOOLEAN
      },
      fri: {
        type: Sequelize.BOOLEAN
      },
      sat: {
        type: Sequelize.BOOLEAN
      },
      sun: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ParentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Parents',
          key: 'id'
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Chores');
  }
};