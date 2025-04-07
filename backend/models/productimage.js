'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductImage.belongsTo(models.products,{
        foreignKey:'productId',
        onDelete:'CASCADE'
      })
    }
  }
  ProductImage.init({
    productImageId:
    {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductImage',
    tableName:'ProductImage',
     timestamps:false
  });
  return ProductImage;
};