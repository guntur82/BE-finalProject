'use strict';
const { encryptPass } = require('../helpers/bcrypt');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      no_hp: DataTypes.STRING,
      level: DataTypes.STRING,
      alamat: DataTypes.STRING,
      gambar: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: function (user, options) {
          user.password = encryptPass(user.password);
        },
        beforeUpdate: function (user, options) {
          user.password = encryptPass(user.password);
        },
      },
      sequelize,
      modelName: 'user',
    }
  );
  return user;
};
