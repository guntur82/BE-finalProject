const brandRoutes = require('express').Router();
const { BrandController } = require('../controllers');
const multer = require('../helpers/multer');

brandRoutes.get('/', BrandController.getData);
brandRoutes.post('/', multer.single('gambar'), BrandController.create);
brandRoutes.put('/:id', multer.single('gambar'), BrandController.update); //post diganti put
brandRoutes.delete('/:id', BrandController.delete); //get di ganti delete
brandRoutes.get('/:id', BrandController.getInformation);

module.exports = brandRoutes;
