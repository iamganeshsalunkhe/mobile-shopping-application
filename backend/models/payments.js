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
      status:DataTypes.ENUM("PENDING","SUCCESS","FAILED")
    },
    {
      sequelize,
      tableName: "Payments",
      modelName: "Payments",
    }
  );
  return Payments;
};
