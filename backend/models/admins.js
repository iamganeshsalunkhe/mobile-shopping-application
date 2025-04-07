'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admins.init({
    adminId:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt:{
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Admins',
    tableName:'Admins',
    timestamps:false
  });
  return Admins;
};