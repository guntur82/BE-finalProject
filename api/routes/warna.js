const warnaRoutes = require('express').Router();
const { WarnaController } = require('../controllers');

warnaRoutes.get('/', WarnaController.getData);
warnaRoutes.post('/', WarnaController.create);
warnaRoutes.put('/:id', WarnaController.update); //post diganti put
warnaRoutes.delete('/:id', WarnaController.delete); //get di ganti delete
warnaRoutes.get('/:id', WarnaController.getInformation);

module.exports = warnaRoutes;
