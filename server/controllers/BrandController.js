const { brand } = require('../models');
const fs = require('fs');
class BrandController {
  static async getData(req, res) {
    try {
      let result = await brand.findAll({
        order: [['id', 'asc']],
      });
      res.json(result);
    } catch (error) {
      res.json('err = ' + error);
    }
  }
  static async create(req, res) {
    try {
      const { name, homepage, logo } = req.body;
      let result = await brand.create({
        name,
        homepage,
        logo,
      });
      res.json('success');
      // res.json(result);
    } catch (error) {
      res.json('err = ' + error);
    }
  }
  static async update(req, res) {
    try {
      const id = req.params.id;
      const { name, homepage, logo } = req.body;
      let exist = await brand.findByPk(id);
      let gambar = '';
      if (logo !== '') {
        if (fs.existsSync(`${__dirname}/../public/uploads/${exist.logo}`)) {
          fs.unlink(`${__dirname}/../public/uploads/${exist.logo}`, () => {
            console.log('file has been deleted');
          });
        }
        gambar = logo;
      } else {
        gambar = exist.logo;
      }
      let result = await brand.update(
        {
          name,
          homepage,
          logo: gambar,
        },
        {
          where: { id },
        }
      );
      res.json('success');
      // res.json(result);
    } catch (error) {
      res.json('err = ' + error);
    }
  }
  static async delete(req, res) {
    try {
      const id = req.params.id;
      let exist = await brand.findByPk(id);
      if (fs.existsSync(`${__dirname}/../public/uploads/${exist.logo}`)) {
        fs.unlink(`${__dirname}/../public/uploads/${exist.logo}`, () => {
          console.log('file has been deleted');
        });
      }
      let result = await brand.destroy({
        where: { id },
      });
      res.json('success');
      // res.json(result);
    } catch (error) {
      res.json('err = ' + error);
    }
  }
  static async getInformation(req, res) {
    try {
      const id = +req.params.id;
      let result = await brand.findByPk(id);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = BrandController;
