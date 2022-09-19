'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaksi.belongsTo(models.item);
    }
  }
  transaksi.init(
    {
      name: DataTypes.STRING,
      alamat: DataTypes.STRING,
      tanggal: DataTypes.STRING,
      jumlah: DataTypes.INTEGER,
      total_harga: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'transaksi',
    }
  );
  return transaksi;
};
