const brandRoutes = require('express').Router();
const { BrandController } = require('../controllers');

brandRoutes.get('/', BrandController.getData);
brandRoutes.post('/create', BrandController.create);
brandRoutes.put('/update/:id', BrandController.update); //post diganti put
brandRoutes.delete('/delete/:id', BrandController.delete); //get di ganti delete
brandRoutes.get('/information/:id', BrandController.getInformation);

module.exports = brandRoutes;
