const { warna } = require('../models');
class WarnaController {
  static async getData(req, res) {
    try {
      let result = await warna.findAll({
        order: [['id', 'asc']],
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async create(req, res) {
    try {
      const { nama_warna } = req.body;
      const dataExist = await warna.findOne({ where: { nama_warna } });
      if (dataExist !== null) {
        res.status(201).json('warna');
      } else {
        let result = await warna.create({
          nama_warna,
        });
        res.status(201).json({
          message: `success`,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async update(req, res) {
    try {
      const id = req.params.id;
      const { nama_warna } = req.body;
      let result = await warna.update(
        {
          nama_warna,
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
      let result = await warna.destroy({
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
      let result = await warna.findByPk(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = WarnaController;
