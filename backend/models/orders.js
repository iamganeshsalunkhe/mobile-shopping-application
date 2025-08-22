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
      Orders.belongsTo(models.Customers, {
        foreignKey: "customerId",
        onDelete: "CASCADE",
      });
      Orders.belongsTo(models.Addresses, {
        foreignKey: "addressId",
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
      customerId: DataTypes.INTEGER,
      paymentId:DataTypes.INTEGER,
      status:{
        type:DataTypes.ENUM("PENDING_PAYMENT","PAID","CANCELLED","SHIPPED","DELIVERED")
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      addressId: DataTypes.INTEGER,
      shippingName:DataTypes.STRING,
      shippingPhone:DataTypes.STRING,
      shippingStreet:DataTypes.STRING,
      shippingLandMark:DataTypes.STRING,
      shippingCity:DataTypes.STRING,
      shippingDistrict:DataTypes.STRING,
      shippingState:DataTypes.STRING,
      shippingPincode:DataTypes.STRING,

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
