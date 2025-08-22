'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubOrders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubOrders.init({
    suborderId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId:DataTypes.STRING,
      vendorId:DataTypes.STRING,
      status:DataTypes.ENUM("PENDING","CONFIRMED","SHIPPED","DELIVERED"),
    subTotal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SubOrders',
  });
  return SubOrders;
};