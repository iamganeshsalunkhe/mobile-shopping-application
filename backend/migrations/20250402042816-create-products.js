'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productName: {
        allowNull:false,
        type: Sequelize.STRING
      },
      price: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      specification: {
        type: Sequelize.TEXT
      },
      soldOut: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};