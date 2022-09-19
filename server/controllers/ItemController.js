const { item, brand, user } = require('../models');
const fs = require('fs');
class ItemController {
  static async getData(req, res) {
    try {
      let result = await item.findAll({
        include: [brand, user],
        order: [['id', 'asc']],
      });
      res.json(result);
    } catch (error) {
      res.json('err = ' + error);
    }
  }
  static async filter(req, res) {
    try {
      let { data, order } = req.body;
      let result = await item.findAll({
        include: [brand, user],
        order: [data ? [data, order] : ['name', 'desc']],
      });
      res.json(result);
    } catch (error) {
      res, json('err = ' + error);
    }
  }
  static async create(req, res) {
    try {
      const { name, harga, gambar, stock, userId, brandId } = req.body;
      let result = await item.create({
        name,
        harga,
        gambar,
        stock,
        userId,
        brandId,
      });
      // res.json(result);
      res.json('success');
    } catch (error) {
      res.json(error);
    }
  }
  static async update(req, res) {
    try {
      const id = req.params.id;
      const { name, harga, gambar, stock, userId, brandId } = req.body;
      let exist = await item.findByPk(id);
      let image = '';
      if (gambar !== '') {
        if (fs.existsSync(`${__dirname}/../public/uploads/${exist.gambar}`)) {
          fs.unlink(`${__dirname}/../public/uploads/${exist.gambar}`, () => {
            console.log('file has been deleted');
          });
        }
        image = gambar;
      } else {
        image = exist.gambar;
      }
      let result = await item.update(
        {
          name,
          harga,
          gambar: image,
          stock,
          userId,
          brandId,
        },
        {
          where: { id },
        }
      );
      // res.json(result);
      res.json('success');
    } catch (error) {
      res.json('err = ' + error);
    }
  }
  static async delete(req, res) {
    try {
      const id = req.params.id;
      let exist = await item.findByPk(id);
      if (fs.existsSync(`${__dirname}/../public/uploads/${exist.gambar}`)) {
        fs.unlink(`${__dirname}/../public/uploads/${exist.gambar}`, () => {
          console.log('file has been deleted');
        });
      }
      let result = await item.destroy({
        where: { id },
      });
      // res.json(result);
      res.json('success');
    } catch (error) {
      res.json('err = ' + error);
    }
  }

  static async getInformation(req, res) {
    try {
      const id = +req.params.id;
      let result = await item.findByPk(id);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = ItemController;
