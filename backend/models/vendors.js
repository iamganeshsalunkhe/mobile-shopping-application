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
    }
  }
  Vendors.init({
    email: DataTypes.STRING,
    vendorName: DataTypes.STRING,
    password: DataTypes.STRING,
    brandLogo: DataTypes.STRING,
    isAccepted: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Vendors',
  });
  return Vendors;
};