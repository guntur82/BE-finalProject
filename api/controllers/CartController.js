const { cart, item, user } = require('../models');
class CartController {
  static async getData(req, res) {
    try {
      let result = await cart.findAll({
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
      /**
       * status barang = 0 => masuk cart
       * status barang = 1 => sudah melakukan transaksi
       *
       * status_pengiriman = 0 => masih list di admin
       * status_pengiriman = 1 => sudah di terima admin dan otw ketempat user
       *
       * sb = 0, sp = 0 => cart (user)
       * sb = 1, sp = 0 => sudah melakukan pembayaran (user)
       * sb = 1, sp = 1 => sudah diterima admin dan sedang dikirim (admin)
       * sb = 0, sp = 1 => barang sudah sampai (user)
       *
       */
      // status barang bisa 0/1 gimana user,mau beli lngsung atau cart dlu
      const { tanggal, jumlah, itemId, status_barang } = req.body;
      let ratting = 0;
      let status_pengiriman = 0;
      let userId = req.userData.id;
      const dataExist = await cart.findOne({
        where: { userId, itemId, status_barang: 0 },
      });
      if (dataExist !== null) {
        let result = await cart.update(
          {
            jumlah: +jumlah + dataExist.jumlah,
          },
          {
            where: { userId, itemId },
          }
        );
        res.status(201).json({
          message: `add`,
        });
      } else {
        let result = await cart.create({
          tanggal,
          jumlah,
          ratting,
          status_barang,
          status_pengiriman,
          itemId,
          userId,
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
      let userId = req.userData.id;
      // const { tanggal, jumlah, ratting, itemId,status_barang,status_pengiriman} = req.body;
      // itemId hrusnya ntar array inputnya
      // simulasi pake 2 data
      let i = 0;
      while (req.body[`itemId.${i}`]) {
        const { ratting, status_barang, tanggal } = req.body;
        let itemId = req.body[`itemId.${i}`];
        const dataExist = await cart.findAll({
          where: { userId, itemId, status_barang: 0, status_pengiriman: 0 },
        });
        // kalo mau beli barang yang di cart dengan status sb = 0, sp = 0
        if (dataExist) {
          let result = await cart.update(
            {
              tanggal,
              status_barang,
            },
            {
              where: { userId, itemId },
            }
          );
          result[0] === 1
            ? res.status(200).json({
                message: `success barang`,
              })
            : // 404 not found
              res.status(404).json({
                message: `not found`,
              });
        } else {
          // kasih rating kalo barang sudah sampai dengan status sb = 0, sp = 1
          let result = await cart.update(
            {
              status_barang,
              ratting,
            },
            {
              where: { userId, itemId },
            }
          );
          result[0] === 1
            ? res.status(200).json({
                message: `success rating`,
              })
            : // 404 not found
              res.status(404).json({
                message: `not found`,
              });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateAdmin(req, res) {
    try {
      const id = +req.params.id;
      const { status_barang, status_pengiriman } = req.body;
      let result = await cart.update(
        {
          status_barang,
          status_pengiriman,
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
      const { itemId } = req.body;
      let userId = req.userData.id;
      let result = await cart.destroy({
        where: { userId, itemId, status_barang: 0 },
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
  static async deleteAdmin(req, res) {
    try {
      const id = +req.params.id;
      let result = await cart.destroy({
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
      let userId = req.userData.id;
      let result = await cart.findAll({
        include: [item, user],
        order: [['id', 'asc']],
        where: { userId },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = CartController;
