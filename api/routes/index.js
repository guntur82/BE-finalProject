const route = require('express').Router();

route.get('/api', (req, res) => {
  // 200 = berhasil
  res.status(200).json({
    message: 'Dashboard',
  });
});

const userRoutes = require('./user');
route.use('/api/user', userRoutes);

module.exports = route;
