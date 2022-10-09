const cartRoutes = require('express').Router();
const { CartController } = require('../controllers');
const { auth } = require('../middleware/auth');
// kondisi pembeli hanya user
cartRoutes.get('/', CartController.getData);
cartRoutes.get('/info/', auth, CartController.getInformation);
cartRoutes.post('/decreaseCart', auth, CartController.decreaseCart);
cartRoutes.post('/', auth, CartController.create);
cartRoutes.get('/list', auth, CartController.listCart);
cartRoutes.put('/', auth, CartController.update); //post diganti put
cartRoutes.put('/update/:id', CartController.updateAdmin); //post diganti put
cartRoutes.delete('/', auth, CartController.delete); //get di ganti delete
cartRoutes.delete('/delete/:id', CartController.deleteAdmin); //get di ganti delete

module.exports = cartRoutes;
