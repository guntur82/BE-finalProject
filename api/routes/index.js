const route = require('express').Router();

route.get('/api', (req, res) => {
  // 200 = berhasil
  res.status(200).json({
    message: 'Dashboard',
  });
});

const userRoutes = require('./user');
const brandRoutes = require('./brand');
const itemRoutes = require('./item');
const warnaRoutes = require('./warna');
const kodeWarnaRoutes = require('./kodeWarna');
const wishlistRoutes = require('./wishlist');
const cartRoutes = require('./cart');
route.use('/api/user', userRoutes);
route.use('/api/brand', brandRoutes);
route.use('/api/item', itemRoutes);
route.use('/api/warna', warnaRoutes);
route.use('/api/kodewarna', kodeWarnaRoutes);
route.use('/api/wishlist', wishlistRoutes);
route.use('/api/cart', cartRoutes);

module.exports = route;
