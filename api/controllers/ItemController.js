const { item, brand, user, kodeWarna, historyItem } = require('../models');
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class ItemController {
  static async getData(req, res) {
    try {
      let result = await item.findAll({
        include: [brand, user],
        order: [['id', 'asc']],
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getHistory(req, res) {
    try {
      // res.status(200).json('sample');
      let result = await historyItem.findAll({
        include: [item, user],
        order: [['id', 'asc']],
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // progress
  static async filter(req, res) {
    try {
      let { data, order } = req.body;
      let result = await item.findAll({
        include: [brand, user],
        order: [data ? [data, order] : ['name', 'desc']],
      });
      res.status(200).json(result);
    } catch (error) {
      res, json(error);
    }
  }

  static async create(req, res) {
    try {
      const { name, harga, stok, deskripsi, tanggal, brandId } = req.body;
      let userId = req.userData.id;
      let gambar = req.file ? req.file.filename : '';
      let result = await item.create({
        name,
        harga,
        gambar,
        stok,
        deskripsi,
        tanggal,
        userId,
        brandId,
      });
      let i = 0;
      while (req.body[`warna.${i}`]) {
        let warnaId = req.body[`warna.${i}`];
        let itemId = result.id;
        let result_warna = await kodeWarna.create({
          itemId,
          warnaId,
        });
        i++;
      }
      res.status(201).json({
        message: `success`,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async update(req, res) {
    try {
      const id = req.params.id;
      const { name, harga, stok, deskripsi, tanggal, brandId } = req.body;
      let userId = req.userData.id;
      let dataExist = await item.findByPk(id);
      let gambar = req.file ? req.file.filename : dataExist.gambar;
      if (req.file) {
        if (
          fs.existsSync(`${__dirname}/../public/uploads/${dataExist.gambar}`)
        ) {
          fs.unlink(
            `${__dirname}/../public/uploads/${dataExist.gambar}`,
            () => {
              console.log('file has been deleted');
            }
          );
        }
      }
      let result = await item.update(
        {
          name,
          harga,
          gambar,
          stok,
          deskripsi,
          tanggal,
          userId,
          brandId,
        },
        {
          where: { id },
        }
      );
      let i = 0;
      console.log(req.body);
      let itemId = id;
      let destory = await kodeWarna.destroy({
        where: { itemId },
      });
      while (req.body[`warna.${i}`]) {
        let warnaId = req.body[`warna.${i}`];
        let result_warna = await kodeWarna.create({
          itemId,
          warnaId,
        });
        i++;
      }
      result[0] === 1
        ? res.status(200).json({
            message: `success`,
          })
        : // 404 not found
          res.status(404).json({
            message: `not found`,
          });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async delete(req, res) {
    try {
      const id = req.params.id;
      let dataExist = await item.findByPk(id);
      if (fs.existsSync(`${__dirname}/../public/uploads/${dataExist.gambar}`)) {
        fs.unlink(`${__dirname}/../public/uploads/${dataExist.gambar}`, () => {
          console.log('file has been deleted');
        });
      }
      let result = await item.destroy({
        where: { id },
      });
      let result_warna = await kodeWarna.destroy({
        where: { itemId: id },
      });
      result === 1
        ? res.status(200).json({
            message: `data has been deleted`,
          })
        : // 404 not found
          res.status(404).json({
            message: `data not found`,
          });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getInformation(req, res) {
    try {
      const id = +req.params.id;
      let result = await item.findByPk(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async addItem(req, res) {
    try {
      const { id, stok, tanggal } = req.body;
      let userId = req.userData.id;
      let dataExist = await item.findByPk(id);
      let result = await item.update(
        {
          stok: +stok + dataExist.stok,
        },
        {
          where: { id },
        }
      );
      let result_history = await historyItem.create({
        jumlah: stok,
        tanggal,
        userId,
        itemId: id,
      });
      result[0] === 1
        ? res.status(200).json({
            message: `success`,
          })
        : // 404 not found
          res.status(404).json({
            message: `not found`,
          });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async searchItem(req, res) {
    try {
      let search = req.params.search;
      let result = await item.findAll({
        where: {
          name: { [Sequelize.Op.iLike]: '%' + search + '%' },
        },
        include: [brand, user],
        order: [['id', 'asc']],
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = ItemController;
