"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderItems", {
      orderItemsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subOrderId: {
        type: Sequelize.INTEGER,
        references: {
          model: "SubOrders",
          key: "subOrderId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      productName: {
        type: Sequelize.STRING,
      },
      productPrice: {
        type: Sequelize.STRING,
      },
      quantity:{
        type:Sequelize.INTEGER,
        defaultValue:1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("OrderItems");
  },
};
