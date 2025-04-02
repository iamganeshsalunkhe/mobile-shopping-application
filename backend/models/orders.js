'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.products,{
        foreignKey:'productId'
      });
      Orders.belongsTo(models.customers,{
        foreignKey:'customerId'
      })
    }
  }
  Orders.init({
    orderId:{type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    productId:DataTypes.INTEGER,
    customerId:DataTypes.INTEGER,
    amountPaid: DataTypes.STRING,
    dateOfOrderPlaced: DataTypes.DATE,
    transactionId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orders',
    tableName:"Orders"
  });
  return Orders;
};