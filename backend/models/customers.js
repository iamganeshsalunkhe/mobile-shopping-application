'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customers.hasMany(models.addresses,{
        foreignKey:'customerId'
      });
      Customers.hasMany(models.orders,{
        foreignKey:'customerId'
      })
    }
  }
  Customers.init({
    customerId:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    email: DataTypes.STRING,
    fullName: DataTypes.STRING,
    password: DataTypes.STRING,
    contactNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customers',
  });
  return Customers;
};