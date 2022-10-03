const userRoutes = require('express').Router();
const { UserController } = require('../controllers');
const multer = require('../helpers/multer');
const { auth } = require('../middleware/auth');

userRoutes.get('/', UserController.getAllUsers);
userRoutes.get('/user', auth, UserController.user); //flutter
userRoutes.post('/', multer.single('gambar'), UserController.register);
userRoutes.post('/loginadmin', UserController.loginAdmin);
userRoutes.post('/login', UserController.login);
userRoutes.put('/:id', multer.single('gambar'), UserController.updateUser);
userRoutes.delete('/:id', UserController.deleteUser);
userRoutes.post('/account', UserController.getUser);
userRoutes.post('/tokenIsValid', UserController.tokenIsValid); //flutter
userRoutes.get('/:id', UserController.detailUser);

module.exports = userRoutes;
