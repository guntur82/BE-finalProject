const userRoutes = require('express').Router();
const { UserController } = require('../controllers');
const multer = require('../helpers/multer');

userRoutes.get('/', UserController.getAllUsers);
userRoutes.post('/', multer.single('gambar'), UserController.register);
userRoutes.post('/loginadmin', UserController.loginAdmin);
userRoutes.post('/login', UserController.login);
userRoutes.put('/:id', multer.single('gambar'), UserController.updateUser);
userRoutes.delete('/:id', UserController.deleteUser);
userRoutes.post('/account', UserController.getUser);
userRoutes.get('/:id', UserController.detailUser);

module.exports = userRoutes;
