const wishlistRoutes = require('express').Router();
const { WishlistController } = require('../controllers');
const { auth } = require('../middleware/auth');

wishlistRoutes.get('/', WishlistController.getData);
wishlistRoutes.post('/', auth, WishlistController.create);
// wishlistRoutes.delete('/:id', WishlistController.delete);
wishlistRoutes.delete('/', auth, WishlistController.delete);
wishlistRoutes.get('/info', auth, WishlistController.getInformation);
wishlistRoutes.post('/detail', auth, WishlistController.getDetail);

module.exports = wishlistRoutes;
