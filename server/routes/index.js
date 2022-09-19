const route = require('express').Router();

route.get('/', (req, res) => {
  res.json({
    message: 'Home Page',
  });
  // res.render('index.ejs')
});

const userRoutes = require('./user');
const brandRoutes = require('./brand');
const itemRoutes = require('./item');
const transaksiRoutes = require('./transaksi');

route.use('/user', userRoutes);
route.use('/brand', brandRoutes);
route.use('/item', itemRoutes);
route.use('/transaksi', transaksiRoutes);

module.exports = route;
