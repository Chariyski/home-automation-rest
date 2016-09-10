'use strict';

const helpers = require('../helpers/utils');
const staircaseConfigJSONLocation = helpers.getFullPath('../models/staircase.json');

const rootController = function (req, res) {
  const staircaseConfigJSON = helpers.readJSONSync(staircaseConfigJSONLocation);

  res.render('staircase', {
    title: 'Home',
    color: staircaseConfigJSON.color,
    animationModes: staircaseConfigJSON.animationModes,
    animationMode: staircaseConfigJSON.animationMode,
    workModes: staircaseConfigJSON.workModes,
    workMode: staircaseConfigJSON.workMode
  });
};

module.exports = rootController;
