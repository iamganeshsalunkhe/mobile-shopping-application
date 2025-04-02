'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.hasMany(models.orders,{
        foreignKey:'productId'
      });
      Products.belongsTo(models.vendors,{
        foreignKey:'vendorId'
      });
      Products.hasMany(models.productimage,{
        foreignKey:'productId'
      })
    }
  }
  Products.init({
    productId:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    vendorId:DataTypes.INTEGER,
    productName: DataTypes.STRING,
    price: DataTypes.INTEGER,
    specification: DataTypes.TEXT,
    soldOut: {
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    sequelize,
    modelName: 'Products',
    tableName:'Products'
  });
  return Products;
};