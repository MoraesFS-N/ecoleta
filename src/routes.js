const express= require('express');
const routes = express.Router();

const PointController = require('./controllers/PointController');

routes.get('/', PointController.index);
routes.get('/create-point', PointController.createPoint);
routes.post('/save-point', PointController.savePoint);
routes.get('/search', PointController.search);

module.exports = routes;