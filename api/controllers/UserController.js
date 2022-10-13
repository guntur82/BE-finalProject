const { user } = require('../models');
const fs = require('fs');
const { decryptPass, encryptPass } = require('../helpers/bcrypt');
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
  // login admin
  static async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;
      let emailFound = await user.findOne({
        where: { email },
      });
      if (emailFound && emailFound.level === 'Admin') {
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
            ...emailFound.dataValues,
            id: String(emailFound.id),
          });
          // verifytoken belum dipake
          let verifyToken = tokenVerifier(access_token);
          // console.log(verifyToken);
        } else {
          res.status(403).json({ msg: `Invalid password` });
        }
      } else {
        res.status(404).json({ msg: `User ${email} not found` });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async register(req, res) {
    try {
      // register pake fungsi check email buat di flutternya(bebas mau di flutter/express)
      const { name, email, password, no_hp, level, alamat } = req.body;
      const emailExist = await user.findOne({ where: { email } });
      let gambar = req.file ? req.file.filename : '';
      if (emailExist !== null) {
        if (fs.existsSync(`${__dirname}/../public/uploads/${gambar}`)) {
          fs.unlink(`${__dirname}/../public/uploads/${gambar}`, () => {
            console.log('file has been deleted');
          });
        }
        res.json({ msg: 'Email sudah digunakan!' });
      } else {
        let result = await user.create({
          name,
          email,
          password,
          no_hp,
          level,
          alamat,
          gambar,
        });
        res.json(result);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async updateUser(req, res) {
    try {
      const id = +req.params.id;
      const { email, name, password, no_hp, level, alamat } = req.body;
      let dataExist = await user.findOne({ where: id });
      let existPassword = '';
      password === undefined
        ? (existPassword = dataExist.password)
        : (existPassword = encryptPass(password));
      let gambar = '';
      if (req.file) {
        gambar = req.file.filename;
        if (
          fs.existsSync(`${__dirname}/../public/uploads/${dataExist.gambar}`)
        ) {
          fs.unlink(
            `${__dirname}/../public/uploads/${dataExist.gambar}`,
            () => {
              console.log('file has been deleted');
            }
          );
        }
      } else {
        gambar = dataExist.gambar;
      }
      let result = await user.update(
        {
          email,
          name,
          password: existPassword,
          gambar,
          no_hp,
          level,
          alamat,
        },
        {
          where: { id },
          individualHooks: true,
        }
      );
      result[0] === 1
        ? res.status(200).json({
            message: `success`,
          })
        : // 404 not found
          res.status(404).json({
            message: `User id ${id} not found`,
          });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async updateUserDetailWeb(req, res) {
    try {
      const id = +req.params.id;
      const { email, name, password, no_hp, level, alamat } = req.body;
      let dataExist = await user.findOne({ where: id });
      let existPassword = '';
      password === undefined
        ? (existPassword = dataExist.password)
        : (existPassword = encryptPass(password));
      let gambar = '';
      if (req.file) {
        gambar = req.file.filename;
        if (
          fs.existsSync(`${__dirname}/../public/uploads/${dataExist.gambar}`)
        ) {
          fs.unlink(
            `${__dirname}/../public/uploads/${dataExist.gambar}`,
            () => {
              console.log('file has been deleted');
            }
          );
        }
      } else {
        gambar = dataExist.gambar;
      }
      let result = await user.update(
        {
          email,
          name,
          password: existPassword,
          gambar,
          no_hp,
          level,
          alamat,
        },
        {
          where: { id },
          individualHooks: true,
        }
      );
      let resultExist = await user.findByPk(id);
      let access_token = tokenGenerator(resultExist);
      res.status(200).json({
        access_token,
        msg: 'success',
      });
      // result[0] === 1
      //   ? res.status(200).json({
      //       message: `success`,
      //     })
      //   : // 404 not found
      //     res.status(404).json({
      //       message: `User id ${id} not found`,
      //     });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async updateUserDetail(req, res) {
    try {
      const { id, email, name, password, no_hp, level, alamat } = req.body;
      let dataExist = await user.findOne({ where: +id });
      let existPassword = '';
      password === 'kosong'
        ? (existPassword = dataExist.password)
        : (existPassword = encryptPass(password));
      // let gambar = '';
      // if (req.file) {
      //   gambar = req.file.filename;
      //   if (
      //     fs.existsSync(`${__dirname}/../public/uploads/${dataExist.gambar}`)
      //   ) {
      //     fs.unlink(
      //       `${__dirname}/../public/uploads/${dataExist.gambar}`,
      //       () => {
      //         console.log('file has been deleted');
      //       }
      //     );
      //   }
      // } else {
      //   gambar = dataExist.gambar;
      // }
      let result = await user.update(
        {
          email,
          name,
          password: existPassword,
          // gambar,
          no_hp,
          level,
          alamat,
        },
        {
          where: { id },
          individualHooks: true,
        }
      );
      let access_token = '';
      if (result[0] === 1) {
        let newData = await user.findByPk(id);
        access_token = tokenGenerator(newData);
        res.status(200).json({
          access_token,
          ...newData.dataValues,
          id: String(newData.id),
        });
        // res.status(200).json({
        //   message: `success`,
        // });
      } else {
        res.status(404).json({
          message: `User id ${id} not found`,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async deleteUser(req, res) {
    try {
      const id = +req.params.id;
      let dataExist = await user.findByPk(id);
      if (dataExist) {
        if (
          fs.existsSync(`${__dirname}/../public/uploads/${dataExist.gambar}`)
        ) {
          fs.unlink(
            `${__dirname}/../public/uploads/${dataExist.gambar}`,
            () => {
              console.log('file has been deleted');
            }
          );
        }
      }
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

  static async detailUser(req, res) {
    try {
      const id = +req.params.id;
      let result = await user.findByPk(id);
      res.status(200).json(result);
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

  // flutter
  static async tokenIsValid(req, res) {
    try {
      const token = req.header('auth'); // "req.header('auth')"" atau bisa "req.header.auth"
      if (!token) return res.json(false);
      let verifyToken = tokenVerifier(token);
      if (!verifyToken) return res.json(false);
      // verifyToken = {id,name,email,gambar,no_hp,alamat}
      const { id } = verifyToken;
      const users = await user.findByPk(id);
      if (!users) return res.json(false);
      res.json(true);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async user(req, res) {
    try {
      const token = req.header('auth');
      let verifyToken = tokenVerifier(token);
      const id = verifyToken.id;
      const result = await user.findByPk(id);
      // res.json({ ...result.dataValues, token: req.authToken });
      res.json({ ...result.dataValues, token: token, id: String(result.id) });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  // end flutter
}

module.exports = UserController;
