"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.Products, {
        foreignKey: "productId",
        onDelete: "CASCADE",
      });
      Orders.belongsTo(models.Customers, {
        foreignKey: "customerId",
        onDelete: "CASCADE",
      });
    }
  }
  Orders.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
      amountPaid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      dateOfOrderPlaced: DataTypes.DATE,
      transactionId: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Orders",
      tableName: "Orders",
      timestamps: true,
    }
  );
  return Orders;
};
