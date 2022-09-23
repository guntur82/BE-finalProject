const { item, warna, kodeWarna } = require('../models');
class WarnaController {
  static async getData(req, res) {
    try {
      let result = await kodeWarna.findAll({
        order: [['id', 'asc']],
        include: [item, warna],
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getInformation(req, res) {
    try {
      const id = +req.params.id;
      let result = await kodeWarna.findAll({
        where: { itemId: id },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = WarnaController;
