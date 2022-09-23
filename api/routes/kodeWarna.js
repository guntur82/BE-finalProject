const kodewarnaRoutes = require('express').Router();
const { KodeWarnaController } = require('../controllers');

kodewarnaRoutes.get('/', KodeWarnaController.getData);
kodewarnaRoutes.get('/:id', KodeWarnaController.getInformation);

module.exports = kodewarnaRoutes;
