'use strict';

const helpers = require('../helpers/utils');
const staircaseConfigJSONLocation = helpers.getFullPath('../models/staircase.json');

const rootController = function (req, res) {
  const staircaseConfigJSON = helpers.readJSONSync(staircaseConfigJSONLocation);

  res.render('staircase', {
    title: 'Staircase',
    color: staircaseConfigJSON._color,
    animationModes: staircaseConfigJSON._animationModes,
    animationMode: staircaseConfigJSON._animationMode,
    workModes: staircaseConfigJSON._workModes,
    workMode: staircaseConfigJSON._workMode
  });
};

module.exports = rootController;
