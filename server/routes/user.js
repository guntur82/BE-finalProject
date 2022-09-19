const userRoutes = require('express').Router();
const { UserController } = require('../controllers');

userRoutes.get('/', UserController.getUser);
userRoutes.post('/create', UserController.createUser);
userRoutes.put('/update/:id', UserController.updateUser); // post gnti jadi put
userRoutes.delete('/delete/:id', UserController.deleteUser); // get ganti jadi delete
userRoutes.get('/information/:id', UserController.getInformation);

module.exports = userRoutes;
