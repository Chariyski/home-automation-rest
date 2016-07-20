var express = require('express');
var staircaseRoute = express.Router();
var rootController = require('../controllers/staircase')();

staircaseRoute.route('/').post(rootController.post);

module.exports = staircaseRoute;
