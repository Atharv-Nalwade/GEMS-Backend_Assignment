'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init({
    inviteeId: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    alternateEmail: DataTypes.STRING,
    profilePicture: DataTypes.BLOB('long') // Changed the data type to BLOB('long')
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
