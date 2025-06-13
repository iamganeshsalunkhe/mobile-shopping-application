"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      orderId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "productId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Customers",
          key: "customerId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      vendorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Vendors",
          key: "vendorId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      addressId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Addresses",
          key: "addressId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      amountPaid: {
        type: Sequelize.STRING,
      },
      dateOfOrderPlaced: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      transactionId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
