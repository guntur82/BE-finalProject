'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      item.belongsTo(models.brand);
      item.belongsTo(models.user);
      item.hasMany(models.transaksi);
    }
  }
  item.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      harga: { type: DataTypes.INTEGER, isDecimal: true },
      gambar: { type: DataTypes.STRING },
      stock: { type: DataTypes.INTEGER, isNumeric: true },
      userId: { type: DataTypes.INTEGER, isNumeric: true },
      brandId: { type: DataTypes.INTEGER, isNumeric: true },
    },
    {
      sequelize,
      modelName: 'item',
    }
  );
  return item;
};
