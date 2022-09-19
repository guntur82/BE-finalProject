const { user } = require('../models');
class UserController {
  static async getUser(req, res) {
    try {
      let result = await user.findAll({
        order: [['id', 'asc']],
      });
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  }

  static async createUser(req, res) {
    try {
      const { name, no_hp, alamat } = req.body;
      let result = await user.create({
        name,
        no_hp,
        alamat,
      });
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  }

  static async updateUser(req, res) {
    try {
      const id = +req.params.id;
      const { name, no_hp, alamat } = req.body;

      let result = await user.update(
        {
          name,
          no_hp,
          alamat,
        },
        {
          where: { id },
        }
      );

      result[0] === 1
        ? res.json({
            message: `id ${id} has update`,
          })
        : res.json({
            message: `id ${id} not update`,
          });
    } catch (err) {
      res.json(err);
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = +req.params.id;

      let result = await user.destroy({
        where: { id },
      });

      result === 1
        ? res.json({
            message: `id ${id} deleted`,
          })
        : res.json({
            message: `id ${id}  not deleted`,
          });
    } catch (err) {
      res.json(err);
    }
  }

  static async getInformation(req, res) {
    try {
      const id = +req.params.id;
      let result = await user.findByPk(id);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = UserController;
