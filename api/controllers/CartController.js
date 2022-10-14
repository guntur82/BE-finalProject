const { cart, item, user, transaksi } = require('../models');

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
  static async getDataTransaksi(req, res) {
    try {
      let result = await cart.findAll({
        include: [item, user],
        order: [
          ['status_pengiriman', 'asc'],
          ['id', 'asc'],
        ],
        where: { status_barang: 1 },
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
       * sb = 0, sp = 1 => barang sudah sampai (user) + rating
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
          msg: `add`,
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
        const dataExistItem = await item.findByPk(result.itemId);
        let resultItem = await item.update(
          {
            stok: dataExistItem.stok - result.jumlah,
          },
          {
            where: { id: itemId },
          }
        );
        let resultTransaksi = await transaksi.create({
          kode_transaksi: kodeTransaksi,
          tanggal,
          totalHarga: dataExistItem.harga * result.jumlah,
          cartId: result.id,
        });
        res.status(201).json({
          msg: `success`,
        });
        // res.status(201).json(
        //   {
        //     message: `success`,
        //   },
        // );
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async decreaseCart(req, res) {
    try {
      const { jumlah, itemId } = req.body;
      let userId = req.userData.id;
      let jumlah_cart = +jumlah;
      const dataExist = await cart.findOne({
        where: { userId, itemId, status_barang: 0 },
      });
      if (dataExist.jumlah === 1) {
        let result = await cart.destroy({
          where: { userId, itemId },
        });
        res.status(201).json({
          msg: `remove`,
        });
      } else if (dataExist !== null) {
        let result = await cart.update(
          {
            jumlah: dataExist.jumlah - jumlah_cart,
          },
          {
            where: { userId, itemId },
          }
        );
        res.status(201).json({
          msg: `decrease`,
        });
      } else {
        res.status(201).json({
          msg: `no data`,
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
      let result = '';

      const { itemList, ratting, status_barang, tanggal } = req.body;
      let kodeTransaksi =
        Math.random().toString(16).slice(2) + '-' + new Date().getTime();
      while (itemList[i]) {
        let itemId = itemList[i];
        console.log(itemId);
        const dataExist = await cart.findOne({
          where: { userId, itemId, status_barang: 0, status_pengiriman: 0 },
        });
        // // kalo mau beli barang yang di cart dengan status sb = 0, sp = 0
        if (dataExist) {
          const dataExistItem = await item.findByPk(itemId);
          if (dataExistItem.stok >= dataExist.jumlah) {
            let resultItem = await item.update(
              {
                stok: dataExistItem.stok - dataExist.jumlah,
              },
              {
                where: { id: itemId },
              }
            );
            let resultTransaksi = await transaksi.create({
              kode_transaksi: kodeTransaksi,
              tanggal,
              totalHarga: dataExistItem.harga * dataExist.jumlah,
              cartId: dataExist.id,
            });
            result = await cart.update(
              {
                tanggal,
                status_barang,
              },
              {
                where: { userId, itemId },
              }
            );
          } else {
            res.status(400).json({ message: `stok yang dimiliki kurang!` });
          }
        } else {
          // kasih rating kalo barang sudah sampai dengan status sb = 0, sp = 1
          result = await cart.update(
            {
              status_barang,
              ratting,
            },
            {
              where: { userId, itemId },
            }
          );
        }
        i++;
      }
      res.status(200).json({
        message: `success`,
      });
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
  static async getDataTransaksiUser(req, res) {
    try {
      let result = await transaksi.findAll({
        include: [cart],
        order: [['id', 'asc']],
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async listCart(req, res) {
    try {
      // untuk nyari itemnya di looping aja
      let userId = req.userData.id;
      const result = await cart.findAll({
        order: [['id', 'asc']],
        where: { userId, status_barang: 0, status_pengiriman: 0 },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async listCartTransaction(req, res) {
    try {
      // untuk nyari itemnya di looping aja
      let userId = req.userData.id;
      const result = await cart.findAll({
        order: [['id', 'asc']],
        where: { userId, status_barang: 1, status_pengiriman: 0 },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = CartController;
