// const { user } = require('../models');
const { user } = require('../models');
const { decryptPass } = require('../helpers/bcrypt');
const { tokenGenerator, tokenVerifier } = require('../helpers/jsonwebtoken');

class UserController {
  static async getAllUsers(req, res) {
    try {
      let users = await user.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let emailFound = await user.findOne({
        where: { email },
      });
      if (emailFound) {
        if (decryptPass(password, emailFound.password)) {
          let access_token = tokenGenerator(emailFound);
          res.status(200).json({
            access_token,
          });
          // verifytoken belum dipake
          let verifyToken = tokenVerifier(access_token);
          console.log(verifyToken);
        } else {
          res.status(403).json({ message: `Invalid password` });
        }
      } else {
        res.status(404).json({ message: `User ${email} not found` });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async register(req, res) {
    try {
      const { name, email, password, no_hp, level, alamat } = req.body;
      let gambar = req.file ? req.file.path : '';
      let result = await user.create({
        name,
        email,
        password,
        no_hp,
        level,
        alamat,
        gambar,
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async updateUser(req, res) {
    try {
      const id = +req.params.id;
      let result = await user.update(req.body, {
        where: { id },
        individualHooks: true,
      });
      result[0] === 1
        ? res.status(200).json({
            message: `User id ${id} has been updated`,
          })
        : // 404 not found
          res.status(404).json({
            message: `User id ${id} not found`,
          });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async deleteUser(req, res) {
    try {
      const id = +req.params.id;
      let result = await user.destroy({ where: { id } });
      result === 1
        ? res.status(200).json({
            message: `User id ${id} has been deleted`,
          })
        : // 404 not found
          res.status(404).json({
            message: `User id ${id} not found`,
          });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getUser(req, res) {
    try {
      // const id = +req.params.id;
      // let result = await user.findByPk(id);
      let verifyToken = tokenVerifier(req.body.token);
      res.status(200).json(verifyToken);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
