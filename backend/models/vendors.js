'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vendors.hasMany(models.Products,{
        foreignKey:'vendorId',
        onDelete:'CASCADE'
      })
      Vendors.hasMany(models.Orders, {
        foreignKey: "vendorId",
        onDelete: "CASCADE",
      });
    }
    toJSON(){
      return{
        ...this.get(),
        password:undefined,
        isAccepted:undefined,
        createdAt:undefined,
      }
    }
  }
  Vendors.init({
    vendorId:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    email: DataTypes.STRING,
    vendorName: DataTypes.STRING,
    password: DataTypes.STRING,
    brandLogo: DataTypes.STRING,
    isAccepted: DataTypes.ENUM('Accepted','Rejected','Pending'),
    createdAt:{
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Vendors',
    tableName:'Vendors',
    timestamps:false
  });
  return Vendors;
};