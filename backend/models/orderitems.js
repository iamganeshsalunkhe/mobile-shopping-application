"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItems.belongsTo(models.SubOrders,{
        foreignKey:"subOrderId",
        onDelete:"CASCADE"
      });
      OrderItems.belongsTo(models.Products,{
        foreignKey:'productId'
      })
    }
  }
  OrderItems.init(
    {
      orderItemsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
      },
      subOrderId: DataTypes.INTEGER,
      productId:DataTypes.INTEGER,
      productName: DataTypes.STRING,
      productPrice: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      status: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCELLED", "RETURNED"),
    },
    {
      sequelize,
      tableName: "OrderItems",
      modelName: "OrderItems",
      timestamps: true,
    }
  );
  return OrderItems;
};
