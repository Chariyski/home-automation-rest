const express = require('express');
const staircaseRoute = express.Router();
const staircaseController = require('../controllers/staircase')();

staircaseRoute.route('/').post(staircaseController.post);
staircaseRoute.route('/').get(staircaseController.get);

module.exports = staircaseRoute;
