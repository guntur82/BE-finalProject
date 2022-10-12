const userRoutes = require('express').Router();
const { UserController } = require('../controllers');
const multer = require('../helpers/multer');
const { auth } = require('../middleware/auth');

userRoutes.get('/', UserController.getAllUsers);
userRoutes.get('/user', UserController.user); //flutter
userRoutes.get('/tokenIsValid', UserController.tokenIsValid); //flutter
userRoutes.post('/', multer.single('gambar'), UserController.register);
userRoutes.post(
  '/update',
  multer.single('picture'),
  UserController.updateUserDetail
);
userRoutes.post('/loginadmin', UserController.loginAdmin);
userRoutes.post('/login', UserController.login);
userRoutes.put('/:id', multer.single('gambar'), UserController.updateUser);
userRoutes.delete('/:id', UserController.deleteUser);
userRoutes.post('/account', UserController.getUser);
userRoutes.get('/:id', UserController.detailUser);

module.exports = userRoutes;
