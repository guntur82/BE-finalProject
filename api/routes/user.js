const userRoutes = require('express').Router();
const { UserController } = require('../controllers');
const multer = require('../helpers/multer');

userRoutes.get('/', UserController.getAllUsers);
userRoutes.post('/', multer.single('gambar'), UserController.register);
userRoutes.post('/login', UserController.login);
userRoutes.put('/:id', UserController.updateUser);
userRoutes.delete('/:id', UserController.deleteUser);
userRoutes.post('/account', UserController.getUser);

module.exports = userRoutes;
