'use strict';
console.log(process.env.NODE_ENV)
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(1024),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'open'
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};
