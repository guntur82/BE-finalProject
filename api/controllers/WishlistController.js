const { wishList, item, user } = require('../models');
class WishlistController {
  static async getData(req, res) {
    try {
      let result = await wishList.findAll({
        include: [item, user],
        order: [['id', 'asc']],
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async create(req, res) {
    try {
      const { itemId } = req.body;
      let userId = req.userData.id;
      const dataExist = await wishList.findOne({ where: { userId, itemId } });
      if (dataExist !== null) {
        res.status(201).json('wishlist sudah ada');
      } else {
        let result = await wishList.create({
          userId,
          itemId,
        });
        res.status(201).json({
          message: `success`,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async delete(req, res) {
    try {
      // ini masih blm pasti yah pake ID
      const { itemId } = req.body;
      let userId = req.userData.id;
      let result = await wishList.destroy({
        where: { itemId, userId },
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
      // blm pasti juga karna pake params id
      let userId = req.userData.id;
      let result = await wishList.findAll({
        include: [item, user],
        order: [['id', 'asc']],
        where: { userId },
      });
      console.log(result[0].item.name);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getDetail(req, res) {
    try {
      let userId = req.userData.id;
      const { itemId } = req.body;
      let result = await wishList.findOne({
        include: [item, user],
        order: [['id', 'asc']],
        where: { userId, itemId },
      });
      res.status(200).json(result ? true : false);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = WishlistController;
