'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      addressId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId:Sequelize.INTEGER,
      
      fullName: {
        type: Sequelize.STRING
      },
      contactNumber: {
        type: Sequelize.STRING
      },
      addressLine: {
        allowNull:false,
        type: Sequelize.STRING
      },
      city: {
        allowNull:false,
        type: Sequelize.STRING
      },
      state: {
        allowNull:false,
        type: Sequelize.STRING
      },
      postalCode: {
        allowNull:false,
        type: Sequelize.STRING
      },
      country: {
        defaultValue:'INDIA',
        type: Sequelize.STRING
      },
      addressType: {
        type: Sequelize.ENUM('Shipping', "Billing")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  }
};