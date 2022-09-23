const { brand } = require('../models');
const fs = require('fs');
class BrandController {
  static async getData(req, res) {
    try {
      let result = await brand.findAll({
        order: [['id', 'asc']],
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async create(req, res) {
    try {
      const { nama } = req.body;
      const dataExist = await brand.findOne({ where: { nama } });
      let logo = req.file ? req.file.filename : '';
      if (dataExist !== null) {
        if (fs.existsSync(`${__dirname}/../public/uploads/${logo}`)) {
          fs.unlink(`${__dirname}/../public/uploads/${logo}`, () => {
            console.log('file has been deleted');
          });
        }
        res.status(201).json('logo');
      } else {
        let result = await brand.create({
          nama,
          logo,
        });
        res.status(201).json(result);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async update(req, res) {
    try {
      const id = req.params.id;
      const { nama } = req.body;
      let dataExist = await brand.findByPk(id);
      let logo = req.file ? req.file.filename : dataExist.logo;
      if (req.file) {
        if (fs.existsSync(`${__dirname}/../public/uploads/${dataExist.logo}`)) {
          fs.unlink(`${__dirname}/../public/uploads/${dataExist.logo}`, () => {
            console.log('file has been deleted');
          });
        }
      }
      let result = await brand.update(
        {
          nama,
          logo,
        },
        {
          where: { id },
        }
      );
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
      let dataExist = await brand.findByPk(id);
      if (dataExist) {
        if (fs.existsSync(`${__dirname}/../public/uploads/${dataExist.logo}`)) {
          fs.unlink(`${__dirname}/../public/uploads/${dataExist.logo}`, () => {
            console.log('file has been deleted');
          });
        }
      }
      let result = await brand.destroy({
        where: { id },
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
      let result = await brand.findByPk(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = BrandController;
