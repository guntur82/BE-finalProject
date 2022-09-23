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
      item.belongsToMany(models.warna, { through: models.kodeWarna });
      item.belongsTo(models.brand);
      item.belongsTo(models.user);
      item.hasMany(models.cart);
      item.hasMany(models.historyItem);
    }
  }
  item.init(
    {
      name: DataTypes.STRING,
      harga: DataTypes.INTEGER,
      gambar: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
      tanggal: DataTypes.STRING,
      stok: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      brandId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'item',
    }
  );
  return item;
};
