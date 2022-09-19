const transaksiRoutes = require('express').Router();
const { TransaksiController } = require('../controllers');

transaksiRoutes.get('/', TransaksiController.list);
transaksiRoutes.post('/create', TransaksiController.create);
transaksiRoutes.put('/update/:id', TransaksiController.update);
transaksiRoutes.delete('/delete/:id', TransaksiController.delete);
transaksiRoutes.get('/information/:id', TransaksiController.information);

module.exports = transaksiRoutes;
