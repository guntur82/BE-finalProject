const wishlistRoutes = require('express').Router();
const { WishlistController } = require('../controllers');

wishlistRoutes.get('/', WishlistController.getData);
wishlistRoutes.post('/', WishlistController.create);
wishlistRoutes.delete('/:id', WishlistController.delete);
wishlistRoutes.get('/:id', WishlistController.getInformation);

module.exports = wishlistRoutes;
