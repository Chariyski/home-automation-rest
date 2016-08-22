'use strict';

var helpers = require('../helpers/utils');
var staircaseConfigJSONLocation = helpers.getFullPath('../models/staircase.json');

var rootController = function (req, res) {
  var staircaseConfigJSON = helpers.readJSONSync(staircaseConfigJSONLocation);

  res.render('staircase', {
    title: 'Staircase',
    color: staircaseConfigJSON.color,
    animationModes: staircaseConfigJSON.animationModes,
    animationMode: staircaseConfigJSON.animationMode,
    workModes: staircaseConfigJSON.workModes,
    workMode: staircaseConfigJSON.workMode
  });
};

module.exports = rootController;
