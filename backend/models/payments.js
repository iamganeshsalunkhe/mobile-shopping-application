"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payments.belongsTo(models.Orders,{
        foreignKey:'paymentId',
        onDelete:"CASCADE"
      });
      Payments.belongsTo(models.Customers,{
        foreignKey:"customerId",
        onDelete:"CASCADE"
      })
    }
  }
  Payments.init(
    {
      paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      orderId:DataTypes.INTEGER,
      customerId:DataTypes.INTEGER,
      razorpayPaymentId: DataTypes.STRING,
      razorpayOrderId: DataTypes.STRING,
      razorpaySignature: DataTypes.STRING,
      amountPaid: DataTypes.INTEGER,
      currency: {
        type: DataTypes.STRING,
        defaultValue: "INR",
      },
      paymentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      method: DataTypes.STRING,
      status:DataTypes.ENUM("CREATED","CAPTURED","FAILED")
    },
    {
      sequelize,
      tableName: "Payments",
      modelName: "Payments",
    }
  );
  return Payments;
};
