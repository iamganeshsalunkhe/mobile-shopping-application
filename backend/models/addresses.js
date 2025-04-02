'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Addresses.init({
    fullName: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
    addressLine: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    addressType: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Addresses',
  });
  return Addresses;
};