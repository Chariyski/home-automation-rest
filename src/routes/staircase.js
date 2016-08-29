var express = require('express');
var staircaseRoute = express.Router();
var staircaseController = require('../controllers/staircase')();

staircaseRoute.route('/').post(staircaseController.post);
staircaseRoute.route('/').get(staircaseController.get);

module.exports = staircaseRoute;
