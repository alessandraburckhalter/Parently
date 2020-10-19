'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Points', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ChildrenId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Children',
          key: 'id'
        }
      },
      ChoreId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Chores',
          key: 'id'
        },
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Points');
  }
};